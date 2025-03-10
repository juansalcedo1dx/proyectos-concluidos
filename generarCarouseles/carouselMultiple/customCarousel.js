class CustomCarousel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.interval = null; // Para el autoplay

        // Crear estilos
        const style = document.createElement('style');
        style.textContent = `
            .carousel-container {
                position: relative;
                width: 300px;
                height: 200px;
                overflow: hidden;
            }
            .carousel-image {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: cover;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
            }
            .carousel-image.active {
                opacity: 1;
            }
            .controls {
                position: absolute;
                width: 100%;
                top: 50%;
                display: flex;
                justify-content: space-between;
                transform: translateY(-50%);
                pointer-events: none;
            }
            .controls button {
                background: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                padding: 10px;
                cursor: pointer;
                pointer-events: all;
            }
            .carousel-indicators {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 5px;
            }
            .dot {
                width: 10px;
                height: 10px;
                background: #bbb;
                border-radius: 50%;
                cursor: pointer;
                transition: background 0.3s;
            }
            .dot.active {
                background: #333;
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        const images = JSON.parse(this.getAttribute('data-images') || '[]');
        const autoplay = this.hasAttribute('autoplay');
        const intervalTime = parseInt(this.getAttribute('interval')) || 3000;

        this.renderCarousel(images);
        if (autoplay) this.startAutoplay(intervalTime);
    }

    disconnectedCallback() {
        this.stopAutoplay();
    }

    renderCarousel(images) {
        // Crear contenedor de imágenes
        const container = document.createElement('div');
        container.classList.add('carousel-container');

        this.imageElements = images.map((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Image ${index + 1}`;
            img.classList.add('carousel-image');
            if (index === this.currentIndex) img.classList.add('active');
            container.appendChild(img);
            return img;
        });

        // Crear controles de navegación
        const controls = this.createControls();
        const indicators = this.createIndicators(images.length);

        // Insertar elementos en el Shadow DOM
        container.appendChild(controls);
        container.appendChild(indicators);
        this.shadowRoot.appendChild(container);
    }

    createControls() {
        const controls = document.createElement('div');
        controls.classList.add('controls');

        const prevButton = document.createElement('button');
        prevButton.textContent = '❮';
        prevButton.addEventListener('click', () => this.prevImage());

        const nextButton = document.createElement('button');
        nextButton.textContent = '❯';
        nextButton.addEventListener('click', () => this.nextImage());

        controls.appendChild(prevButton);
        controls.appendChild(nextButton);

        return controls;
    }

    createIndicators(imageCount) {
        this.indicators = document.createElement('div');
        this.indicators.classList.add('carousel-indicators');

        this.dots = Array.from({ length: imageCount }).map((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === this.currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToImage(index));
            this.indicators.appendChild(dot);
            return dot;
        });

        return this.indicators;
    }

    updateIndicators() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    goToImage(index) {
        this.imageElements[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.imageElements[this.currentIndex].classList.add('active');
        this.updateIndicators();
    }

    nextImage() {
        this.imageElements[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + 1) % this.imageElements.length;
        this.imageElements[this.currentIndex].classList.add('active');
        this.updateIndicators();
    }

    prevImage() {
        this.imageElements[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex - 1 + this.imageElements.length) % this.imageElements.length;
        this.imageElements[this.currentIndex].classList.add('active');
        this.updateIndicators();
    }

    startAutoplay(intervalTime) {
        this.interval = setInterval(() => this.nextImage(), intervalTime);
    }

    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

customElements.define('custom-carousel', CustomCarousel);
