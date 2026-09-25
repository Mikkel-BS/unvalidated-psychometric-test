(() => {
  const model = window.TEST_MODEL;
  const PAGE_SIZE = 6;
  const answers = new Map();
  let page = 0;

  const intro = document.querySelector('#intro');
  const questionnaire = document.querySelector('#questionnaire');
  const results = document.querySelector('#results');
  const startButton = document.querySelector('#start-button');
  const form = document.querySelector('#question-form');
  const questionList = document.querySelector('#question-list');
  const sectionLabel = document.querySelector('#section-label');
  const answeredCount = document.querySelector('#answered-count');
  const progressBar = document.querySelector('#progress-bar');
  const backButton = document.querySelector('#back-button');
  const nextButton = document.querySelector('#next-button');
  const validationMessage = document.querySelector('#validation-message');
  const resultGroups = document.querySelector('#result-groups');
  const profileSummary = document.querySelector('#profile-summary');
  const restartButton = document.querySelector('#restart-button');
  const copyButton = document.querySelector('#copy-button');
  const copyStatus = document.querySelector('#copy-status');

  const totalPages = Math.ceil(model.items.length / PAGE_SIZE);

  function showOnly(section) {
    [intro, questionnaire, results].forEach(el => el.classList.toggle('hidden', el !== section));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function currentItems() {
    const start = page * PAGE_SIZE;
    return model.items.slice(start, start + PAGE_SIZE);
  }

  function renderPage() {
    validationMessage.textContent = '';
    sectionLabel.textContent = `Section ${page + 1} of ${totalPages}`;
    answeredCount.textContent = String(answers.size);
    progressBar.style.width = `${(answers.size / model.items.length) * 100}%`;
    backButton.disabled = page === 0;
    nextButton.textContent = page === totalPages - 1 ? 'See my results' : 'Next';

    questionList.replaceChildren();

    currentItems().forEach(item => {
      const fieldset = document.createElement('fieldset');
      fieldset.className = 'question-card';

      const legend = document.createElement('legend');
      legend.textContent = item.text;
      fieldset.appendChild(legend);

      const scale = document.createElement('div');
      scale.className = 'likert';
      scale.setAttribute('aria-label', `Response to: ${item.text}`);

      model.responseScale.forEach(option => {
        const label = document.createElement('label');
        label.className = 'likert-option';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q-${item.id}`;
        input.value = String(option.value);
        input.checked = answers.get(item.id) === option.value;
        input.addEventListener('change', () => {
          answers.set(item.id, option.value);
          answeredCount.textContent = String(answers.size);
          progressBar.style.width = `${(answers.size / model.items.length) * 100}%`;
          validationMessage.textContent = '';
        });

        const number = document.createElement('span');
        number.className = 'likert-number';
        number.textContent = String(option.value);

        const text = document.createElement('span');
        text.className = 'likert-label';
        text.textContent = option.label;

        label.append(input, number, text);
        scale.appendChild(label);
      });

      fieldset.appendChild(scale);
      questionList.appendChild(fieldset);
    });
  }

  function validateCurrentPage() {
    const missing = currentItems().filter(item => !answers.has(item.id));
    if (!missing.length) return true;
    validationMessage.textContent = `Please answer ${missing.length === 1 ? 'the remaining statement' : `the remaining ${missing.length} statements`} before continuing.`;
    const firstMissing = document.querySelector(`input[name="q-${missing[0].id}"]`);
    firstMissing?.focus();
    return false;
  }

  function calculateScores() {
    const buckets = Object.fromEntries(Object.keys(model.traits).map(key => [key, []]));

    model.items.forEach(item => {
      const raw = answers.get(item.id);
      const keyed = item.reverse ? 6 - raw : raw;
      buckets[item.trait].push(keyed);
    });

    return Object.fromEntries(Object.entries(buckets).map(([trait, values]) => {
      const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
      const score = Math.round(((mean - 1) / 4) * 100);
      return [trait, score];
    }));
  }

  function band(score) {
    if (score < 40) return 'Toward first end';
    if (score <= 60) return 'Near the scale midpoint';
    return 'Toward second end';
  }

  function scoreContext(score, trait, interpretation) {
    if (score < 40) return { heading: `Leaning toward ${trait.low.toLowerCase()}`, reading: interpretation.low, tradeoff: interpretation.lowTradeoff };
    if (score <= 60) return { heading: 'A mixed response pattern', reading: interpretation.middle, tradeoff: 'This midpoint may reflect a genuine mix, context-dependent answers, or uncertainty about these items.' };
    return { heading: `Leaning toward ${trait.high.toLowerCase()}`, reading: interpretation.high, tradeoff: interpretation.highTradeoff };
  }

  function renderResults(scores) {
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const highest = ranked.slice(0, 3).map(([key]) => model.traits[key].name);
    const lowest = ranked.slice(-3).reverse().map(([key]) => model.traits[key].name);

    profileSummary.innerHTML = `
      <div><span>Highest scores in your answers</span><strong>${highest.join(' · ')}</strong></div>
      <div><span>Lowest scores in your answers</span><strong>${lowest.join(' · ')}</strong></div>
    `;

    const groups = ['People', 'Execution', 'Thinking', 'Temperament'];
    resultGroups.replaceChildren();

    groups.forEach(groupName => {
      const section = document.createElement('section');
      section.className = 'panel result-section';

      const heading = document.createElement('div');
      heading.className = 'result-section-heading';
      heading.innerHTML = `<p class="eyebrow">${groupName}</p><h2>${groupName} traits</h2>`;
      section.appendChild(heading);

      Object.entries(model.traits)
        .filter(([, trait]) => trait.group === groupName)
        .forEach(([key, trait]) => {
          const score = scores[key];
          const detail = model.interpretations[key];
          const context = scoreContext(score, trait, detail);
          const row = document.createElement('article');
          row.className = 'trait-result';
          row.innerHTML = `
            <div class="trait-heading">
              <div>
                <h3>${trait.name}</h3>
                <p>${trait.description}</p>
              </div>
              <div class="score-block"><strong>${score}</strong><span>/100</span></div>
            </div>
            <div class="trait-scale-labels"><span>${trait.low}</span><span>${trait.high}</span></div>
            <div class="trait-track" aria-label="${trait.name}: ${score} out of 100"><span style="width:${score}%"></span></div>
            <div class="trait-interpretation">
              <h4>${context.heading}</h4>
              <p>${context.reading}</p>
              <p><strong>A possible tradeoff:</strong> ${context.tradeoff}</p>
              <p class="reflection"><strong>Conversation starter:</strong> ${detail.prompt}</p>
            </div>
          `;
          section.appendChild(row);
        });

      resultGroups.appendChild(section);
    });
  }

  function makeSummaryText(scores) {
    const lines = [
      'My Unvalidated Personality Test results',
      '— definitely not normed, validated, or diagnostic —',
      ''
    ];
    Object.entries(model.traits).forEach(([key, trait]) => {
      lines.push(`${trait.name}: ${scores[key]}/100 — ${scoreContext(scores[key], trait, model.interpretations[key]).heading}`);
    });
    lines.push('', window.location.href.split('#')[0]);
    return lines.join('\n');
  }

  async function copySummary() {
    const scores = calculateScores();
    const text = makeSummaryText(scores);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
      }
      copyStatus.textContent = 'Summary copied.';
    } catch {
      copyStatus.textContent = 'Could not copy automatically. Your browser may block clipboard access.';
    }
  }

  startButton.addEventListener('click', () => {
    page = 0;
    renderPage();
    showOnly(questionnaire);
  });

  backButton.addEventListener('click', () => {
    if (page > 0) {
      page -= 1;
      renderPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateCurrentPage()) return;

    if (page < totalPages - 1) {
      page += 1;
      renderPage();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const scores = calculateScores();
    renderResults(scores);
    showOnly(results);
  });

  restartButton.addEventListener('click', () => {
    answers.clear();
    page = 0;
    copyStatus.textContent = '';
    renderPage();
    showOnly(questionnaire);
  });

  copyButton.addEventListener('click', copySummary);
})();