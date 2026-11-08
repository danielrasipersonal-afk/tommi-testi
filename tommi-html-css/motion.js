// Valinnainen animaatiokerros. Poiskytkentä: index.html → data-motion="off".
// Ilman tätä tiedostoa app.js näyttää näkymät suoraan, kuten ennen kokeilua.
(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let activeTransition = null;
  let hasRendered = false;

  const enabled = () => ['on', 'bold'].includes(root.dataset.motion) && !reducedMotion.matches;

  function stopTransition() {
    activeTransition?.skipTransition();
    activeTransition = null;
  }

  window.tommiMotion = {
    render(update) {
      const animate = hasRendered && enabled() && typeof document.startViewTransition === 'function';
      hasRendered = true;
      stopTransition();

      if (!animate) {
        update();
        return;
      }

      const transition = document.startViewTransition(update);
      activeTransition = transition;
      transition.finished.catch(() => {}).finally(() => {
        if (activeTransition === transition) activeTransition = null;
      });
    }
  };

  // Kytkimen ja käyttöjärjestelmän asetuksen muutos huomioidaan myös kesken siirtymän.
  new MutationObserver(() => {
    if (!enabled()) stopTransition();
  }).observe(root, { attributes: true, attributeFilter: ['data-motion'] });
  reducedMotion.addEventListener('change', () => {
    if (!enabled()) stopTransition();
  });
})();
