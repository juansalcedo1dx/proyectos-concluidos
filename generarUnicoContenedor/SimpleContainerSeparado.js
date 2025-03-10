class SimpleContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Creamos el contenedor donde se actualizará el contenido dinámico
        this.contentElement = document.createElement("div");
        this.contentElement.classList.add("dynamic-content");

        // Crear el texto estático dentro del contenedor
        const staticText = document.createElement("p");
        staticText.textContent = "Este es un contenedor simple con contenido dinámico.";

        // Llamamos a la función de renderizado
        this.render(staticText);
    }

    connectedCallback() {
        // Se puede agregar elementos al shadowRoot si es necesario
    }

    render(staticText) {
        // Crear el div contenedor
        const container = document.createElement("div");
        container.classList.add("container");

        // Crear el elemento <style> e importar los estilos
        const style = document.createElement("style");
        style.textContent = `@import url('estilosSimpleContainer.css');`;

        // Agregar el div al shadowRoot
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);

        // Agregar el texto estático
        container.appendChild(staticText);

        // Agregar el espacio donde se inyectará el contenido dinámico
        container.appendChild(this.contentElement);
    }

    // Método público para actualizar el contenido dinámico
    setContent(text) {
        this.contentElement.textContent = text;
    }
}

customElements.define("simple-container", SimpleContainer);
