class AutoSlider {
    constructor(sliderSelector, navSelector, autoScrollInterval = 3000) {
        this.slider = document.querySelector(sliderSelector);
        this.nav = document.querySelector(navSelector);
        this.slides = this.slider.children;
        this.navItems = this.nav.querySelectorAll('a');
        this.currentSlide = 0;
        this.autoScrollInterval = autoScrollInterval;
        this.autoScrollTimer = null;
        
        this.init();
    }

    init() {
        this.navItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index);
                this.resetAutoScroll();
            });
        });

        this.startAutoScroll();

        this.updateActiveNav();

        this.slider.addEventListener('mouseenter', () => this.stopAutoScroll());
        this.slider.addEventListener('mouseleave', () => this.startAutoScroll());
    }

    goToSlide(index) {
        this.currentSlide = index;
        const slideWidth = this.slides[0].offsetWidth;
        this.slider.scrollLeft = slideWidth * index;
        this.updateActiveNav();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(this.currentSlide);
    }

    updateActiveNav() {
        this.navItems.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoScroll() {
        this.autoScrollTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoScrollInterval);
    }

    stopAutoScroll() {
        if (this.autoScrollTimer) {
            clearInterval(this.autoScrollTimer);
            this.autoScrollTimer = null;
        }
    }

    resetAutoScroll() {
        this.stopAutoScroll();
        this.startAutoScroll();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AutoSlider('#slider', '#slider-nav', 3000);
});