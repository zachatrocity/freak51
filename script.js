(() => {
  // Mobile browsers lie about 100vh depending on address / nav bars.
  // Use VisualViewport when available to compute a stable "center" height.
  const setVh = () => {
    const vv = window.visualViewport;
    const h = vv?.height || window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${h * 0.01}px`);
  };

  setVh();

  const vv = window.visualViewport;
  if (vv) {
    vv.addEventListener('resize', setVh, { passive: true });
    vv.addEventListener('scroll', setVh, { passive: true });
  }
  window.addEventListener('resize', setVh, { passive: true });
})();
