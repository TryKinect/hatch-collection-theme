(() => {
  if (customElements.get('hatch-hotline')) return;

  class HatchHotline extends HTMLElement {
    connectedCallback() {
      this.abortController = new AbortController();
      const { signal } = this.abortController;
      this.questions = this.querySelector('.hatch-hotline__questions');
      this.previous = this.querySelector('[data-hotline-direction="previous"]');
      this.next = this.querySelector('[data-hotline-direction="next"]');
      if (!this.questions || !this.previous || !this.next) return;

      this.addEventListener('click', (event) => {
        const button = event.target instanceof Element ? event.target.closest('button') : null;
        if (!button || button.disabled) return;

        if (button.hasAttribute('data-hotline-direction')) {
          this.scrollQuestions(button.dataset.hotlineDirection);
        } else if (button.hasAttribute('data-hatch-question') && window.Kinect) {
          document.dispatchEvent(new CustomEvent('kinect:pdp-question', {
            detail: { question: button.dataset.hatchQuestion },
          }));
        }
      }, { signal });

      this.questions.addEventListener('scroll', () => this.updateControls(), { passive: true, signal });
      this.resizeObserver = new ResizeObserver(() => this.updateControls());
      this.resizeObserver.observe(this.questions);
      this.updateControls();
    }

    disconnectedCallback() {
      this.abortController?.abort();
      this.resizeObserver?.disconnect();
    }

    updateControls() {
      const maxScroll = this.questions.scrollWidth - this.questions.clientWidth;
      const position = Math.abs(this.questions.scrollLeft);
      this.previous.disabled = position <= 2;
      this.next.disabled = position >= maxScroll - 2;
    }

    scrollQuestions(direction) {
      const isRtl = getComputedStyle(this.questions).direction === 'rtl';
      const step = this.questions.querySelector('button').getBoundingClientRect().width + 8;
      const distance = direction === 'next' ? step : -step;
      this.questions.scrollBy({
        left: isRtl ? -distance : distance,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
  }

  customElements.define('hatch-hotline', HatchHotline);

  document.addEventListener('click', async (event) => {
    const trigger = event.target instanceof Element
      ? event.target.closest('[data-hatch-hotline-nav]')
      : null;
    if (!trigger || !window.Kinect) return;

    event.preventDefault();
    event.stopPropagation();

    const drawer = trigger.closest('header-sidebar');
    if (drawer?.open && typeof drawer.hide === 'function') {
      await drawer.hide();
    }

    requestAnimationFrame(() => window.Kinect?.open({ source: 'mobile_nav' }));
  }, { capture: true });
})();
