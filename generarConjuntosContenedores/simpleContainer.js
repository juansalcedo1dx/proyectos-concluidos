class SimpleContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Creamos el contenedor donde se actualizará el contenido dinámico
        this.contentElement = document.createElement("div");
        this.contentElement.classList.add("dynamic-content");

        // Llamamos a la función de renderizado
        this.render();
    }

    connectedCallback() {
        // this.shadowRoot.appendChild(this.contentElement);
    }

    render() {
        // Crear el div contenedor
        const container = document.createElement("div");
        container.classList.add("container");

        // Estilos básicos
        const style = document.createElement("style");
        style.textContent = `
            .container {
                width: 350px;
                height: 220px;
                padding: 10px;
                border: 5px solid green;
                background-color: pink;
                min-height: 50px;
                position: relative;
                box-sizing: border-box;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: flex-start; /* Asegura que el contenido no se desborde */
                align-items: center;
            }

            .dynamic-content {
                width: 100%; /* Asegura que el contenido ocupe todo el ancho disponible */
                max-width: 100%;
                word-wrap: break-word; /* Asegura que el texto largo se divida en palabras */
                margin-top: 0px;
                font-weight: bold;
                background-color: yellow;
                overflow: hidden;
                text-align: center;
                white-space: normal; /* Permite saltos de línea */
            }
        `;

        // Agregar el div al shadowRoot
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);

        // Agregar el espacio donde se inyectará el contenido dinámico
        container.appendChild(this.contentElement);
    }

    // Método público para actualizar el contenido dinámico
    setContent(text) {
        this.contentElement.textContent = text;
    }
}

customElements.define("simple-container", SimpleContainer);










// class SimpleContainer extends HTMLElement {
//     constructor() {
//       super();
//       this.attachShadow({ mode: "open" });
  
//       // Crear un elemento link para cargar el CSS
//       const link = document.createElement("link");
//       link.rel = "stylesheet";
//       link.href = "styles.css";  // Ruta al archivo CSS externo
  
//       // Agregar el link al shadowRoot
//       this.shadowRoot.appendChild(link);
//     }
//   }
//   customElements.define("simple-container", SimpleContainer);
  
