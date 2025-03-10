class CustomCarousel extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
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
      `;
      this.shadowRoot.appendChild(style);
    }
  
    
  
    connectedCallback() {
      const images = JSON.parse(this.getAttribute('data-images') || '[]');
      this.currentIndex = 0;
  
      // Crear contenedor de imágenes
      const container = document.createElement('div');
      container.classList.add('carousel-container');
  
      // Crear las imágenes
      this.imageElements = images.map((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${index + 1}`;
        img.classList.add('carousel-image');
        if (index === this.currentIndex) img.classList.add('active');
        container.appendChild(img);
        return img;
      });
  
      // Crear estilos
      // const style = document.createElement('style');
      // style.textContent = `
      //   .carousel-container {
      //     position: relative;
      //     width: 300px;
      //     height: 200px;
      //     overflow: hidden;
      //   }
      //   .carousel-image {
      //     position: absolute;
      //     width: 100%;
      //     height: 100%;
      //     object-fit: cover;
      //     opacity: 0;
      //     transition: opacity 0.5s ease-in-out;
      //   }
      //   .carousel-image.active {
      //     opacity: 1;
      //   }
      // `;
  
      this.shadowRoot.append(container);
  
      // Escuchar eventos de actualización
      this.updateListener = this.updateIndex.bind(this);
      document.addEventListener('update-carousel-index', this.updateListener);
    }
  
    disconnectedCallback() {
      document.removeEventListener('update-carousel-index', this.updateListener);
    }
  
    updateIndex(event) {
      const { index, controlIndex } = event.detail;
  
      // Asegurarse de que el evento corresponde a este carrusel
      if (this.getAttribute('index-id') === controlIndex) {
        if (index >= 0 && index < this.imageElements.length) {
          this.imageElements[this.currentIndex].classList.remove('active');
          this.currentIndex = index;
          this.imageElements[this.currentIndex].classList.add('active');
        }
      }
    }
  }
  
  customElements.define('custom-carousel', CustomCarousel);
  