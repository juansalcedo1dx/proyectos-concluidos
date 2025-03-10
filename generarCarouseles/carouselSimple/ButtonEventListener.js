class ButtonEventListener extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.currentIndex = 0; // Índice inicial
      this.indexId = this.getAttribute('index-id'); // Identificador único
    }
  
    static get observedAttributes() {
      return ['event-name', 'numero-de-imagenes', 'index-id'];
    }
  
    connectedCallback() {
      const container = document.createElement('div');
      container.style.padding = '20px';
      container.style.border = '1px solid #ccc';
      container.style.borderRadius = '5px';
      container.style.marginTop = '10px';
      container.style.backgroundColor = '#f9f9f9';
      container.textContent = 'Esperando eventos...';
  
      const indexInfo = document.createElement('p');
      indexInfo.style.marginTop = '10px';
      indexInfo.textContent = `Índice actual: ${this.currentIndex} / Número de imágenes: ${this.getNumeroDeImagenes()}`;
  
      const eventName = this.getAttribute('event-name') || 'user-defined-button-clicked';
  
      this.eventListener = (event) => this.handleCustomEvent(event, indexInfo);
      document.addEventListener(eventName, this.eventListener);
  
      this.shadowRoot.append(container, indexInfo);
    }
  
    disconnectedCallback() {
      const eventName = this.getAttribute('event-name') || 'user-defined-button-clicked';
      document.removeEventListener(eventName, this.eventListener);
    }
  
    getNumeroDeImagenes() {
      return parseInt(this.getAttribute('numero-de-imagenes'), 10) || 1;
    }
  
    handleCustomEvent(event, indexInfo) {
      const container = this.shadowRoot.querySelector('div');
      const { instanceId, timestamp, label, controlIndex } = event.detail;
  
      if (this.indexId === controlIndex) {
        container.textContent = `
          Evento recibido:
          - Instance ID: ${instanceId}
          - Etiqueta del botón: ${label}
          - Hora del clic: ${new Date(timestamp).toLocaleString()}
        `;
  
        const prevIndex = this.currentIndex;
  
        if (label === 'Adelantar') {
          this.currentIndex = (this.currentIndex + 1) % this.getNumeroDeImagenes();
        } else if (label === 'Atrasar') {
          this.currentIndex = (this.currentIndex - 1 + this.getNumeroDeImagenes()) % this.getNumeroDeImagenes();
        }
  
        indexInfo.textContent = `Índice actual: ${this.currentIndex} / Número de imágenes: ${this.getNumeroDeImagenes()}`;
  
        // Emitir evento global si el índice cambia
        if (prevIndex !== this.currentIndex) {
          document.dispatchEvent(new CustomEvent('update-carousel-index', {
            detail: {
              index: this.currentIndex,
              controlIndex: this.indexId // Asociar al carrusel correspondiente
            }
          }));
        }
      }
    }
  }
  
  customElements.define('button-event-listener', ButtonEventListener);
  