import { UI } from './UI.js';

class Slider extends UI {

    #NUMBER_OF_SLIDES = null;
    #CHANGE_TIME_SECONDS = null;

    #slider = null;
    #sliderMenu = null;
    #buttons = null;

    #currentSlide = null;

    #indexInterval = null;

    #addListenerOnClick() {
        this.#buttons.forEach(button => button.addEventListener('click', e => this.#clickedButton(e)));
    }
    
    #clickedButton(e) {
        // clearInterval(this.#indexInterval);
        this.#buttons.forEach(button => button.removeEventListener('click', e => this.#clickedButton(e)));
        
        const option = e.target.getAttribute('data-option');
        
        this.setBackground(this.#slider, option);
        this.#currentSlide = option;

        this.#markCurrentSlider();
    }

    #markCurrentSlider() {
        const activeButton = this.#buttons.findIndex(button => button.classList.contains('active'));

        this.#buttons[activeButton].classList.remove('active');
        this.#buttons[this.#currentSlide - 1].classList.add('active');
    }

    #createSliderMenu() {
        for (let i = 0; i < this.#NUMBER_OF_SLIDES; i++) {
            this.#sliderMenu.appendChild(this.createButton(i));
        }

        this.#buttons = [...this.getElements(this.selectors.sliderButton)];
    }

    #changeBackground() {
        this.setBackground(this.#slider, this.#currentSlide);

        this.#markCurrentSlider();
        
        this.#currentSlide++;

        if (this.#currentSlide > this.#NUMBER_OF_SLIDES) {
            this.#currentSlide = 1;
        }
    }

    #changeSlide() {
        this.#indexInterval = setInterval(() => this.#changeBackground(), this.#CHANGE_TIME_SECONDS);
    }

    #startSlider() {
        this.#createSliderMenu();
        this.#addListenerOnClick();
        this.#changeSlide();
    }

    init() {
        this.#NUMBER_OF_SLIDES = 6;
        this.#CHANGE_TIME_SECONDS = 3000;

        this.#slider = this.getElement(this.selectors.slider);
        this.#sliderMenu = this.getElement(this.selectors.sliderMenu);

        this.#currentSlide = 2;

        this.#startSlider();
    }
}

window.onload = () => {
    const slider = new Slider();

    slider.init();
}