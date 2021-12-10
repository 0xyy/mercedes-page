export class UI {
    selectors = {
        slider: '.slider',
        sliderMenu: '.slider-menu',
        sliderButton: '.slider-button',
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    getElements(selector) {
        return document.querySelectorAll(selector);
    }

    setBackground(element, sliderIndex) {
        element.style.backgroundImage = `url("../images/slider${sliderIndex}.jpg")`;
    }

    createButton(elementIndex) {
        const button = document.createElement('div');

        if (elementIndex === 0) {
            button.classList.add('active');
        }

        button.classList.add('slider-button');
        button.dataset.option = elementIndex + 1;
        return button;
    }
}