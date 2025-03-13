export class MiBoton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.button = document.createElement("button"); // Ahora es una propiedad de la clase
        this.button.textContent = this.getAttribute("label") || "Click ";

        const style = document.createElement("style");
        style.textContent = `
            button {
                padding: 10px 20px;
                font-size: 16px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background 0.3s;
            }
            button:hover {
                background-color: #0056b3;
            }
        `;

        this.button.addEventListener("click", () => {
            console.log("Evento 'boton-click' recibido correctamente.");
            alert("¡Botón presionado!");
            this.dispatchEvent(new CustomEvent("boton-click", {
                bubbles: true,
                composed: true
            }));
        });

        this.shadowRoot.append(style, this.button);
    }

    static get observedAttributes() {
        return ["label"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "label" && this.button) {
            this.button.textContent = newValue;
        }
    }
}

customElements.define("mi-boton", MiBoton);
