 class MiBoton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const button = document.createElement("button");
        button.textContent = this.getAttribute("label") || "Click me";

        // Agregar el enlace al archivo de estilos externo
        const style = document.createElement("style");
        style.textContent = `@import url('estilosMiBoton.css');`;  // Importa los estilos externos

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
