const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ window: {} });
for (const file of ['questions.js', 'scoring.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
const model = context.window.TEST_MODEL;
const { scoreAnswers, responsePattern, range } = context.window.TEST_SCORING;
const answersFor = fn => new Map(model.items.map(item => [item.id, fn(item)]));
const plain = value => JSON.parse(JSON.stringify(value));

test('model has 72 distinct items and complete, balanced scales', () => {
  assert.equal(model.items.length, 72);
  assert.equal(new Set(model.items.map(i => i.id)).size, 72);
  assert.equal(new Set(model.items.map(i => i.text)).size, 72);
  assert.equal(Object.keys(model.traits).length, 12);
  for (const item of model.items) {
    assert.ok(model.traits[item.trait]);
    assert.equal(typeof item.reverse, 'boolean');
    assert.ok(item.text.trim());
  }
  for (const key of Object.keys(model.traits)) {
    const items = model.items.filter(i => i.trait === key);
    assert.equal(items.length, 6, key);
    assert.equal(items.filter(i => i.reverse).length, 3, key);
    for (const field of ['low', 'middle', 'high', 'lowTradeoff', 'highTradeoff', 'prompt']) {
      assert.ok(model.interpretations[key][field].trim(), `${key}: ${field}`);
    }
  }
});

test('keyed endpoints score 0 and 100 on every scale', () => {
  const low = scoreAnswers(model, answersFor(i => i.reverse ? 5 : 1));
  const high = scoreAnswers(model, answersFor(i => i.reverse ? 1 : 5));
  assert.ok(Object.values(low).every(n => n === 0));
  assert.ok(Object.values(high).every(n => n === 100));
});

test('all five uniform response patterns cancel to 50, with neutral distinguished', () => {
  for (let raw = 1; raw <= 5; raw++) {
    const answers = answersFor(() => raw);
    assert.ok(Object.values(scoreAnswers(model, answers)).every(n => n === 50));
    const pattern = responsePattern(model, answers);
    assert.equal(pattern.sameResponse, true);
    assert.equal(pattern.allNeutral, raw === 3);
    for (const key of Object.keys(model.traits)) {
      assert.equal(responsePattern(model, answers, key).allNeutral, raw === 3);
    }
  }
});

test('each item moves only its own trait in the correct direction', () => {
  for (const item of model.items) {
    const answers = answersFor(() => 3);
    answers.set(item.id, 4);
    const scores = scoreAnswers(model, answers);
    assert.equal(scores[item.trait], item.reverse ? 46 : 54);
    for (const key of Object.keys(model.traits)) {
      if (key !== item.trait) assert.equal(scores[key], 50);
    }
  }
});

test('partial, nonnumeric and out-of-range answers are rejected', () => {
  for (const invalid of [undefined, null, NaN, '3', 0, 6, 2.5, Infinity]) {
    const answers = answersFor(() => 3);
    answers.set(1, invalid);
    assert.throws(() => scoreAnswers(model, answers), /Missing or invalid/);
  }
  assert.throws(() => scoreAnswers(model, new Map()), /Missing or invalid/);
});

test('editorial range boundaries are exact and invalid scores are rejected', () => {
  for (const [n, expected] of [[0,'low'],[39,'low'],[40,'middle'],[50,'middle'],[60,'middle'],[61,'high'],[100,'high']]) {
    assert.equal(range(n), expected);
  }
  for (const n of [-1,101,NaN,undefined,'50']) assert.throws(() => range(n));
});

test('mixed answers are not misidentified as all-neutral or identical', () => {
  const answers = answersFor(() => 3);
  answers.set(1, 1);
  answers.set(13, 1);
  assert.equal(scoreAnswers(model, answers).socialEnergy, 50);
  assert.equal(responsePattern(model, answers, 'socialEnergy').allNeutral, false);
  assert.equal(responsePattern(model, answers, 'socialEnergy').sameResponse, false);
  assert.equal(responsePattern(model, answers, 'structure').allNeutral, true);
});

test('every six-response combination stays finite, monotone and symmetric to rounding', () => {
  const items = model.items.filter(i => i.trait === 'socialEnergy');
  const small = { traits: { socialEnergy: model.traits.socialEnergy }, items };
  const seen = new Set();
  for (let code = 0; code < 15625; code++) {
    let digits = code;
    const answers = new Map(items.map(item => {
      const value = digits % 5 + 1;
      digits = Math.floor(digits / 5);
      return [item.id, value];
    }));
    const score = scoreAnswers(small, answers).socialEnergy;
    assert.ok(Number.isInteger(score) && score >= 0 && score <= 100);
    seen.add(score);
    const opposite = new Map([...answers].map(([id,n]) => [id,6-n]));
    assert.ok(Math.abs(score + scoreAnswers(small, opposite).socialEnergy - 100) <= 1);
    const first = items[0];
    if (answers.get(first.id) < 5) {
      answers.set(first.id, answers.get(first.id) + 1);
      assert.ok(scoreAnswers(small, answers).socialEnergy > score);
    }
  }
  assert.equal(seen.size, 25);
});

test('model item order does not affect scoring', () => {
  const answers = answersFor(i => i.id % 5 + 1);
  const reordered = { ...model, items: [...model.items].reverse() };
  assert.deepEqual(plain(scoreAnswers(model, answers)), plain(scoreAnswers(reordered, answers)));
});
