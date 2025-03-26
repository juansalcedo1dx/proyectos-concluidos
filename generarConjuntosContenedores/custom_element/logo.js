class CustomLogo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Define la ruta de la imagen directamente en el CustomElement
        const logoSrc = './assets/logotipo.png';  // Aquí defines la ruta de tu logo
        const logoAlt = 'Logo';  // Texto alternativo para la imagen

        // Crear los elementos HTML que forman el logo
        const container = document.createElement('div');
        container.classList.add('logo-container');

        // Crear la etiqueta <img> y cargar la imagen
        const logoImage = document.createElement('img');
        logoImage.src = logoSrc;
        logoImage.alt = logoAlt;
        logoImage.classList.add('logo-image');
        container.appendChild(logoImage);

        // Crear los estilos del logo
        const style = document.createElement('style');
        style.textContent = `
            .logo-container {
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: Arial, sans-serif;
                font-size: 24px;
                font-weight: bold;
                
            }
            .logo-image {
                width: 90px;
                padding-Top: 9px;
                cursor: pointer;
                object-fit: contain;
            }
        `;
        
        // Agregar los estilos y el contenido al Shadow DOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);
    }
}

// Registrar el CustomElement
customElements.define('custom-logo', CustomLogo);
