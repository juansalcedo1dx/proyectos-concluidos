class UserDefinedEventButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const instanceId = this.getAttribute('instance-id');
        const controlIndex = this.getAttribute('control-index');
        if (!instanceId || !controlIndex) {
            console.warn('No se ha definido el atributo "instance-id" o "control-index" para este botón.');
            return;
        }

        // Crear los estilos y el botón
        const style = document.createElement('style');
        style.textContent = `
            button {
                padding: 15px 25px;
                font-size: 18px;
                cursor: pointer;
                background-color: #007BFF;
                color: #fff;
                border: 2px solid #007BFF;
                border-radius: 10px;
                margin: 10px;
                display: inline-block;
                transition: background-color 0.3s ease;
            }
            button:hover {
                background-color: #0056b3;
            }
            button:focus {
                outline: none;
                border-color: #0056b3;
            }
        `;

        const button = document.createElement('button');
        button.textContent = this.getAttribute('label') || 'Click Me';

        // Escuchar el clic en el botón
        button.addEventListener('click', () => {
            // Emitir un evento único para cada control de índice
            this.dispatchEvent(
                new CustomEvent('user-defined-button-clicked', {
                    detail: {
                        instanceId,
                        timestamp: Date.now(),
                        label: this.getAttribute('label') || 'Click Me',
                        controlIndex, // Emitir el controlIndex
                    },
                    bubbles: true,
                    composed: true,
                })
            );
        });

        // Agregar los elementos al Shadow DOM
        this.shadowRoot.append(style, button);
    }
}

customElements.define('user-defined-event-button', UserDefinedEventButton);
