/* Browser global kept separate so scoring can be tested without a DOM. */
window.TEST_SCORING = (() => {
  function scoreAnswers(model, answers) {
    const buckets = Object.fromEntries(Object.keys(model.traits).map(key => [key, []]));
    for (const item of model.items) {
      const raw = answers.get(item.id);
      if (!Number.isInteger(raw) || raw < 1 || raw > 5) {
        throw new Error(`Missing or invalid response for item ${item.id}`);
      }
      buckets[item.trait].push(item.reverse ? 6 - raw : raw);
    }
    return Object.fromEntries(Object.entries(buckets).map(([key, values]) => {
      if (!values.length) throw new Error(`No items for trait ${key}`);
      // Six responses span 24 possible steps. Round only for presentation.
      const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
      return [key, Math.round((mean - 1) * 25)];
    }));
  }

  function range(score) {
    if (!Number.isFinite(score) || score < 0 || score > 100) throw new Error('Invalid score');
    return score < 40 ? 'low' : score > 60 ? 'high' : 'middle';
  }

  function responsePattern(model, answers, trait) {
    const items = trait ? model.items.filter(item => item.trait === trait) : model.items;
    const values = items.map(item => answers.get(item.id));
    return {
      allNeutral: values.length > 0 && values.every(value => value === 3),
      sameResponse: values.length > 0 && values.every(value => value === values[0]),
      response: values[0]
    };
  }

  return { scoreAnswers, range, responsePattern };
})();
