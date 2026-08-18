(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const targets = [...document.querySelectorAll("[data-reveal]")];

  if (reduceMotion.matches || !("IntersectionObserver" in window)) return;

  document.documentElement.classList.add("reveal-ready");
  const groupIndexes = new Map();
  targets.forEach((target) => {
    const group = target.dataset.revealGroup;
    const index = groupIndexes.get(group) || 0;
    target.style.setProperty("--reveal-delay", `${group ? index * 100 : 0}ms`);
    if (group) groupIndexes.set(group, index + 1);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -12% 0px" });

  targets.forEach((target) => observer.observe(target));
})();
