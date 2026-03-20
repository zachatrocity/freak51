(() => {
  const root = document.documentElement;
  const par = document.querySelector('[data-parallax]');
  const spark = document.querySelector('.spark');

  // Tiny parallax (respect reduced-motion)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && par) {
    let raf = 0;

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        par.style.setProperty('--mx', String(x));
        par.style.setProperty('--my', String(y));
        par.style.transform = `translate3d(${x * 4}px, ${y * 3}px, 0)`;
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
  }

  // Neon flicker: lightly randomize ring glow so it feels alive.
  if (!reduce && spark) {
    const tick = () => {
      const a = 0.65 + Math.random() * 0.35;
      const b = 0.18 + Math.random() * 0.22;
      const c = 0.12 + Math.random() * 0.16;

      spark.style.boxShadow = `
        0 0 0 1px rgba(25, 247, 255, ${b}) inset,
        0 0 ${24 + Math.random() * 20}px rgba(255, 79, 216, ${a * 0.55}),
        0 0 ${40 + Math.random() * 28}px rgba(25, 247, 255, ${c + 0.06})
      `;

      // Very occasional hard flicker.
      if (Math.random() < 0.03) {
        spark.style.opacity = '0.25';
        setTimeout(() => (spark.style.opacity = '0.9'), 60 + Math.random() * 120);
      }

      setTimeout(tick, 220 + Math.random() * 420);
    };

    tick();
  }

  // Soft "CRT bloom" on scroll
  const onScroll = () => {
    const y = Math.min(1, window.scrollY / 600);
    root.style.setProperty('--scroll', String(y));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
