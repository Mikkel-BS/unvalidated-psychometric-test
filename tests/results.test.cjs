const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

// Minimal elements support unit checks of copy handling and result copy.
// Rendering, focus and navigation are checked in the real browser separately.
function setup(clipboard) {
  const nodes = new Map();
  function node(selector) {
    if (!nodes.has(selector)) {
      const classes = new Set(['hidden']);
      nodes.set(selector, {
        value: '', textContent: '', innerHTML: '',
        classList: { add: c => classes.add(c), remove: c => classes.delete(c), contains: c => classes.has(c) },
        addEventListener() {}, focus() { this.focused = true; }, select() { this.selected = true; }
      });
    }
    return nodes.get(selector);
  }
  const context = vm.createContext({
    window: { location: { href: 'https://example.test/test/?tracking=x#section' } },
    navigator: { clipboard }, document: { querySelector: node }
  });
  for (const file of ['questions.js', 'scoring.js']) vm.runInContext(fs.readFileSync(path.join(root, file),'utf8'), context);
  const source = fs.readFileSync(path.join(root, 'app.js'),'utf8');
  vm.runInContext(source.replace(/\}\)\(\);\s*$/, 'window.__test = { answers, scoreContext, makeSummaryText, copySummary, calculateScores }; })();'), context);
  const model = context.window.TEST_MODEL;
  const app = context.window.__test;
  for (const item of model.items) app.answers.set(item.id, 3);
  return { model, app, node };
}

test('neutral and identical answers get explicit interpretations', () => {
  const { app, model } = setup();
  assert.equal(app.scoreContext('socialEnergy',50).heading, 'All six answers were neutral');
  for (const item of model.items) app.answers.set(item.id, 5);
  assert.equal(app.scoreContext('socialEnergy',50).heading, 'Same response to all six statements');
  assert.match(app.scoreContext('socialEnergy',50).reading, /cancel out/);
});

test('both endpoint readings and a genuine mixed midpoint use the correct text', () => {
  const { app, model } = setup();
  for (const item of model.items) app.answers.set(item.id,item.reverse ? 1 : 5);
  assert.equal(app.scoreContext('socialEnergy',100).reading,model.interpretations.socialEnergy.high);
  for (const item of model.items) app.answers.set(item.id,item.reverse ? 5 : 1);
  assert.equal(app.scoreContext('socialEnergy',0).reading,model.interpretations.socialEnergy.low);
  for (const item of model.items) app.answers.set(item.id,3);
  app.answers.set(1,1); app.answers.set(13,1);
  assert.equal(app.scoreContext('socialEnergy',50).heading,'Near the scale midpoint');
});

test('summary includes all traits, version, caveat, and a clean URL', () => {
  const { app, model } = setup();
  const text = app.makeSummaryText(app.calculateScores());
  for (const trait of Object.values(model.traits)) assert.ok(text.includes(`${trait.name}: 50/100`));
  assert.ok(text.includes(model.version));
  assert.match(text, /not percentiles/);
  assert.ok(text.endsWith('https://example.test/test/'));
  assert.ok(!text.includes('tracking'));
});

test('successful copy writes the full summary and clears an old fallback', async () => {
  let copied;
  const { app, node } = setup({ writeText: async text => { copied = text; } });
  node('#manual-summary').value = 'old';
  node('#manual-summary').classList.remove('hidden');
  await app.copySummary();
  assert.equal(copied, app.makeSummaryText(app.calculateScores()));
  assert.equal(node('#copy-status').textContent,'Summary copied.');
  assert.equal(node('#manual-summary').value,'');
  assert.equal(node('#manual-summary').classList.contains('hidden'),true);
});

test('unavailable and rejected clipboards offer selectable text without false success', async () => {
  for (const clipboard of [undefined,{ writeText: async () => { throw new Error('blocked'); } }]) {
    const { app, node } = setup(clipboard);
    await app.copySummary();
    assert.equal(node('#manual-summary').value,app.makeSummaryText(app.calculateScores()));
    assert.equal(node('#manual-summary').classList.contains('hidden'),false);
    assert.equal(node('#manual-summary').focused,true);
    assert.equal(node('#manual-summary').selected,true);
    assert.match(node('#copy-status').textContent,/Automatic copying is unavailable/);
  }
});
