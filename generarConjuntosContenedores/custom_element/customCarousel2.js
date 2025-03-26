class CustomCarousel2 extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentIndex = 0;
        this.interval = null; // Para el autoplay

        // Definir las imágenes directamente en el archivo JS
        this.images = [
            "assets/arroz.jpeg", 
            "assets/belt.jpeg", 
            "assets/frutillas.jpeg", 
            "assets/mate.jpeg", 
            "assets/nest.jpeg", 
            "assets/pant.jpeg", 
            "assets/sport men.jpeg", 
            "assets/suit men.jpeg", 
            "assets/tomates.jpeg", 
            "assets/t shirt.jpeg", 
            "assets/vegetales.jpeg"
        ];

        // Crear estilos
        const style = document.createElement('style');
        style.textContent = `
            .carousel-container {
                position: relative;
                width: 100%;
                max-width: 460px; /* El contenedor tiene un ancho fijo */
                height: 100px; /* Reducir la altura del contenedor */
                overflow: hidden;
                margin: 0 auto; /* Centra el carrusel horizontalmente */
            }
            .carousel-wrapper {
                display: flex;
                transition: transform 0.5s ease-in-out;
            }
            .carousel-image {
                width: 100px; /* Reducir el tamaño de cada imagen a 100px */
                height: 100px; /* Reducir la altura de cada imagen a 100px */
                object-fit: cover;
                border-radius: 50%; /* Hacer las imágenes completamente redondas */
                border: 1px solid black; /* Borde negro de 1px */
                margin-right: 10px; /* Espacio entre imágenes */
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
                padding: 5px;
                cursor: pointer;
                pointer-events: all;
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        const autoplay = this.hasAttribute('autoplay');
        const intervalTime = parseInt(this.getAttribute('interval')) || 3000;

        this.renderCarousel();
        if (autoplay) this.startAutoplay(intervalTime);
    }

    disconnectedCallback() {
        this.stopAutoplay();
    }

    renderCarousel() {
        // Crear contenedor de imágenes
        const container = document.createElement('div');
        container.classList.add('carousel-container');

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('carousel-wrapper');

        // Duplicar las imágenes para crear un bucle infinito (marquesina)
        const duplicatedImages = [...this.images, ...this.images];  // Duplicamos las imágenes para el ciclo continuo

        // Agregar las imágenes duplicadas al wrapper
        this.imageElements = duplicatedImages.map((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Image ${index + 1}`;
            img.classList.add('carousel-image');
            this.wrapper.appendChild(img);

            return img;
        });

        // Crear controles de navegación
        const controls = this.createControls();

        // Insertar elementos en el Shadow DOM
        container.appendChild(this.wrapper);
        container.appendChild(controls);

        this.shadowRoot.appendChild(container);

        // Iniciar el movimiento continuo de las imágenes
        this.startContinuousScroll();
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

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.imageElements.length;
        this.updateImagePosition();
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.imageElements.length) % this.imageElements.length;
        this.updateImagePosition();
    }

    updateImagePosition() {
        // Desplazar las imágenes en función del índice actual
        this.wrapper.style.transform = `translateX(-${this.currentIndex * (100 + 10)}px)`; // 100px por cada imagen y 10px de margen
    }

    startContinuousScroll() {
        // Controlamos la cantidad de imágenes visibles (4 en total)
        const totalImages = this.imageElements.length;
        const visibleItems = 4; // Mostramos 4 elementos a la vez
        const totalWidth = totalImages * (100 + 10); // Total width de las imágenes duplicadas
        const duration = 14900; // Tiempo para un ciclo completo (menos un segundo)

        this.wrapper.style.transition = `transform ${duration}ms linear`;
        this.wrapper.style.transform = `translateX(-${totalWidth / 2}px)`; // Mueve las imágenes hacia la izquierda

        // Después de completar el ciclo, reiniciamos sin interrupciones
        setTimeout(() => {
            this.wrapper.style.transition = 'none'; // Elimina la transición para evitar un "salto"
            this.wrapper.style.transform = `translateX(0)`; // Reinicia la posición
            setTimeout(() => {
                this.wrapper.style.transition = `transform ${duration}ms linear`; // Reaplica la transición
                this.startContinuousScroll(); // Recurre a la animación
            }, 20); // Pequeño retraso para evitar el "salto" visible
        }, duration - 645); // Esto asegura que el ciclo se reinicie 1 segundo antes de completar la transición
    }

    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

customElements.define('custom-carousel2', CustomCarousel2);
