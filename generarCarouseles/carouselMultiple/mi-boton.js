class MiBoton extends HTMLElement {
    constructor() {
        super();

        // Crear Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Crear el botón
        const button = document.createElement('button');
        button.textContent = 'Click me';

        // Estilos encapsulados
        const style = document.createElement('style');
        style.textContent = `
            /* Reset básico */
            * {
                margin:120;
                padding: 0;
                box-sizing: border-box;
            }

            /* Estilos generales */
            html, body {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                text-align: center;
                background-color: #f5f5f5;
                font-family: Arial, sans-serif;
            }

            /* Estilos del botón */
            button {
                background: red;
                color: #fff;
                border: none;
                position: relative;
                height: 60px;
                font-size: 1.6em;
                padding: 0 2em;
                cursor: pointer;
                transition: 800ms ease all;
                outline: none;
                border-radius: 5px;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
            }

            /* Efecto hover */
            button:hover {
                background: yellow;
                color: #1AAB8A;
                box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
            }

            /* Efectos de línea en los bordes */
            button:before, button:after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                height: 2px;
                width: 0;
                background: #1AAB8A;
                transition: 400ms ease all;
            }

            button:after {
                right: inherit;
                top: inherit;
                left: 0;
                bottom: 0;
            }

            button:hover:before, button:hover:after {
                width: 100%;
                transition: 800ms ease all;
            }
        `;

        // Agregar el botón y los estilos al Shadow DOM
        this.shadowRoot.append(style, button);
    }
}

// Registrar el Custom Element
customElements.define('mi-boton', MiBoton);

// ✅ Exportar correctamente la clase
// export { MiBoton };


