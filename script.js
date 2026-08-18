(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const targets = [...document.querySelectorAll("[data-reveal]")];

  if (reduceMotion.matches || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("reveal-ready");
  targets.forEach((target, index) => {
    target.style.setProperty("--reveal-delay", `${Math.min(index % 5, 3) * 70}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  targets.forEach((target) => observer.observe(target));
})();
