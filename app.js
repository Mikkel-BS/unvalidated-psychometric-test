(() => {
  const model = window.TEST_MODEL;
  const scoring = window.TEST_SCORING;
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
  const manualSummary = document.querySelector('#manual-summary');
  const reviewButton = document.querySelector('#review-button');

  const totalPages = Math.ceil(model.items.length / PAGE_SIZE);

  function showOnly(section) {
    [intro, questionnaire, results].forEach(el => el.classList.toggle('hidden', el !== section));
    const heading = section.querySelector('h1, h2');
    heading?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'auto' });
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

      model.responseScale.forEach(option => {
        const label = document.createElement('label');
        label.className = 'likert-option';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q-${item.id}`;
        input.value = String(option.value);
        input.setAttribute('aria-label', `${option.value}: ${option.label}`);
        input.checked = answers.get(item.id) === option.value;
        input.addEventListener('change', () => {
          answers.set(item.id, option.value);
          answeredCount.textContent = String(answers.size);
          progressBar.style.width = `${(answers.size / model.items.length) * 100}%`;
          validationMessage.textContent = '';
        });

        const number = document.createElement('span');
        number.className = 'likert-number';
        number.setAttribute('aria-hidden', 'true');
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
    return scoring.scoreAnswers(model, answers);
  }

  function scoreContext(key, score) {
    const trait = model.traits[key];
    const interpretation = model.interpretations[key];
    const pattern = scoring.responsePattern(model, answers, key);
    if (pattern.allNeutral) return { heading: 'All six answers were neutral', reading: 'You chose “Neither agree nor disagree” for every statement on this scale. These answers do not point toward either end.', noteLabel: 'Reading this score', tradeoff: 'A midpoint here does not establish a balanced personality or a mix of behaviours.' };
    if (pattern.sameResponse) return { heading: 'Same response to all six statements', reading: `You chose “${model.responseScale.find(option => option.value === pattern.response).label}” for every statement on this scale. Half of the statements score in the opposite direction, so their contributions cancel out.`, noteLabel: 'Reading this score', tradeoff: 'The resulting midpoint does not establish balance. Review your answers below and consider whether the wording or different situations shaped them.' };
    const range = scoring.range(score);
    if (range === 'middle') return { heading: 'Near the scale midpoint', reading: interpretation.middle, noteLabel: 'Reading this score', tradeoff: 'Your answers show no clear overall lean toward either end. A middle score can come from middle choices, opposing answers, or different situations; it does not identify which explanation fits you.' };
    return { heading: trait[range], reading: interpretation[range], noteLabel: 'A possible tradeoff', tradeoff: interpretation[`${range}Tradeoff`] };
  }

  function renderResults(scores) {
    copyStatus.textContent = '';
    manualSummary.classList.add('hidden');
    manualSummary.value = '';
    const pattern = scoring.responsePattern(model, answers);
    const directional = Object.entries(scores).filter(([, score]) => scoring.range(score) !== 'middle');
    const summary = pattern.allNeutral
      ? 'All 72 answers were neutral. There is no directional profile to interpret from these answers.'
      : pattern.sameResponse
        ? 'You selected the same response for all 72 statements. Oppositely scored items cancel out; the midpoints do not establish a balanced profile.'
        : directional.length
          ? directional.map(([key, score]) => `${model.traits[key].name}: ${model.traits[key][scoring.range(score)].toLowerCase()}`).join(' · ')
          : 'All twelve scores fall near their scale midpoints. Review the individual answers before deciding what those midpoints mean.';
    profileSummary.innerHTML = `
      <div><span>Directions in your answers</span><p>${summary}</p></div>
      <div><span>Use the details</span><p>Each scale has its own meaning. Scores are not directly comparable across traits, and small differences are easy to overread. Open “Your six answers” to see what sits behind a score.</p></div>
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
          const context = scoreContext(key, score);
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
            <div class="trait-track" role="meter" aria-label="${trait.name}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${score}" aria-valuetext="${score} out of 100; ${context.heading}"><span style="width:${score}%"></span></div>
            <div class="trait-interpretation">
              <h4>${context.heading}</h4>
              <p>${context.reading}</p>
              <p><strong>${context.noteLabel}:</strong> ${context.tradeoff}</p>
              <p class="reflection"><strong>Conversation starter:</strong> ${detail.prompt}</p>
            </div>
          `;
          const evidence = document.createElement('details');
          evidence.className = 'answer-review';
          const summary = document.createElement('summary');
          summary.textContent = `Your six answers: ${trait.name}`;
          const list = document.createElement('ul');
          model.items.filter(item => item.trait === key).forEach(item => {
            const li = document.createElement('li');
            const statement = document.createElement('p');
            statement.textContent = item.text;
            const response = document.createElement('strong');
            response.textContent = model.responseScale.find(option => option.value === answers.get(item.id)).label;
            li.append(statement, response);
            list.appendChild(li);
          });
          evidence.append(summary, list);
          row.appendChild(evidence);
          section.appendChild(row);
        });

      resultGroups.appendChild(section);
    });
  }

  function makeSummaryText(scores) {
    const lines = [
      `My Unvalidated Personality Test results (version ${model.version})`,
      '— definitely not normed, validated, or diagnostic —',
      '0–100 scores describe these items, not percentiles. Scales are not directly comparable.',
      ''
    ];
    Object.entries(model.traits).forEach(([key, trait]) => {
      lines.push(`${trait.name}: ${scores[key]}/100 — ${scoreContext(key, scores[key]).heading}`);
    });
    lines.push('', window.location.href.split(/[?#]/)[0]);
    return lines.join('\n');
  }

  async function copySummary() {
    const scores = calculateScores();
    const text = makeSummaryText(scores);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      manualSummary.classList.add('hidden');
      manualSummary.value = '';
      copyStatus.textContent = 'Summary copied.';
    } catch {
      manualSummary.value = text;
      manualSummary.classList.remove('hidden');
      manualSummary.focus();
      manualSummary.select();
      copyStatus.textContent = 'Automatic copying is unavailable. Select and copy the summary below.';
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
      showOnly(questionnaire);
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!validateCurrentPage()) return;

    if (page < totalPages - 1) {
      page += 1;
      renderPage();
      showOnly(questionnaire);
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
    manualSummary.value = '';
    manualSummary.classList.add('hidden');
    renderPage();
    showOnly(questionnaire);
  });

  copyButton.addEventListener('click', copySummary);
  reviewButton.addEventListener('click', () => {
    page = 0;
    renderPage();
    showOnly(questionnaire);
  });
})();
