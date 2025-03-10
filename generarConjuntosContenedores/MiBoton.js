export class MiBoton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const button = document.createElement("button");
        button.textContent = this.getAttribute("label") || "Click me";

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

        button.addEventListener("click", () => {
            console.log("Evento 'boton-click' recibido correctamente.");
            alert("¡Botón presionado!");
            this.dispatchEvent(new CustomEvent("boton-click", {
                bubbles: true,
                composed: true
            }));
        });

        this.shadowRoot.append(style, button);
    }
}

customElements.define("mi-boton", MiBoton);
