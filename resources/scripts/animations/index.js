const ANIMATION_CLASS = "animate__animated";
const ANIMATION_DIRECTION_CLASS = "animate__fadeIn";
const ANIMATION_DELAY_CLASS = "animate__delay";

export default class Animation {
  constructor(selectors) {
    this.selectors = selectors;
    this.elements = document.querySelectorAll(selectors.join(", "));
    this.init();
  }

  initObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { direction, delay } = entry.target.dataset;

            entry.target.classList.add(ANIMATION_CLASS);
            direction && entry.target.classList.add(`${ANIMATION_DIRECTION_CLASS}${direction}`);
            delay && entry.target.classList.add(`${ANIMATION_DELAY_CLASS}-${delay}s`);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    this.elements.forEach((element) => {
      observer.observe(element);
    });
  }

  init() {
    this.initObserver();
  }
}
