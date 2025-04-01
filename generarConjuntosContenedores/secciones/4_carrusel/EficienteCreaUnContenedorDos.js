export class MultiContainerManagerUnoDos {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    // console.log("🔍 Verificación de container - Root Node:", container.getRootNode());

    if (!this.container) {
      console.error(`No se encontró el contenedor ${containerSelector}`);
      return;
    }
    this.init();
  }

  async init() {
    await customElements.whenDefined("simple-container");

    // Crear el contenedor padre
    const parentContainer = document.createElement("simple-container");
    parentContainer.id = "parent-container";

    // Asegurar que el shadowRoot esté listo antes de modificarlo
    await this.waitForShadowRoot(parentContainer);

    // Agregarlo al DOM después de la configuración
    this.container.appendChild(parentContainer);
    // console.log("🔍 Verificación de parentContainer - Root Node:", parentContainer.getRootNode());

    // Inyectar los estilos
    this.injectStyles(parentContainer, [
      "./secciones/4_carrusel/styles-celular.css",
      "./secciones/4_carrusel/styles-tablet.css",
      "./secciones/4_carrusel/styles-pc.css"
    ]);

    // Crear el contenedor hijo "wrapper" y agregarlo al shadowRoot de "parentContainer"
    const wrapper = document.createElement("simple-container");
    wrapper.id = "wrapper1";

    // Esperar a que el shadowRoot de wrapper esté listo
    await this.waitForShadowRoot(wrapper);

    // Inyectar los estilos
    this.injectStyles(wrapper, [
      "./secciones/4_carrusel/styles-celular.css",
      "./secciones/4_carrusel/styles-tablet.css",
      "./secciones/4_carrusel/styles-pc.css"
    ]);

    // Obtener el shadowRoot de 'parentContainer' y agregar 'wrapper' dentro del contenedor
    const shadowRootParent = parentContainer.shadowRoot;
    const conta = shadowRootParent.querySelector(".container");
    if (conta) {
      conta.appendChild(wrapper); // Ahora `wrapper` estará dentro del `shadowRoot`
    } else {
      console.error("No se encontró .container dentro de parentContainer");
      return;
    }

    // Esperamos que el ShadowRoot de 'wrapper' esté listo
    await this.waitForShadowRoot(wrapper);

    // Obtener el shadowRoot de 'wrapper' y buscar el contenedor con clase ".container"
    const shadowRootWrapper = wrapper.shadowRoot;
    const containerWrapper = shadowRootWrapper.querySelector(".container");

    // Crear un contenedor hijo dentro de "wrapper"
    const child = document.createElement("simple-container");
    child.id = "child";
    if (containerWrapper) {
      // Agregar los contenedores hijos dentro del contenedor de 'wrapper'
      containerWrapper.appendChild(child);
    } else {
      console.error("No se encontró .container dentro de wrapper");
      return;
    }
    await Promise.all([this.waitForShadowRoot(child)]);
    
    // Aplicar estilos a los hijos con inyección de CSS
    this.injectStyles(child, [
      "./secciones/4_carrusel/styles-celular.css",
      "./secciones/4_carrusel/styles-tablet.css",
      "./secciones/4_carrusel/styles-pc.css"
    ]);

    // Crear un Custom Element "custom-carousel2"
    const myButton1 = document.createElement("");
    myButton1.setAttribute("label", "Click Estúpido");// Buscar el contenedor dentro del shadowRoot de smallChild1
    const smallContainer = child.shadowRoot.querySelector(".container");
    if (smallContainer) {
      smallContainer.appendChild(myButton1);
    } else {
      console.error("No se encontró el contenedor dentro de Child");
    }
  }

  async waitForShadowRoot(element) {
    return new Promise((resolve) => {
      const checkShadowRoot = () => {
        if (element.shadowRoot) {
          resolve();
        } else {
          requestAnimationFrame(checkShadowRoot);
        }
      };
      checkShadowRoot();
    });
  }

  // Función modificada para aceptar múltiples hojas de estilo
  injectStyles(element, stylesArray) {
    requestAnimationFrame(() => {
      const shadowRoot = element.shadowRoot;

      // Asegurarse de que stylesArray sea un array
      if (!Array.isArray(stylesArray)) {
        console.error("stylesArray debe ser un array de rutas de CSS.");
        return;
      }

      // Iterar sobre el array de rutas de estilos
      for (const stylesheet of stylesArray) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = stylesheet;

        // Agregar el <link> al shadowRoot
        shadowRoot.appendChild(link);

        console.log(
          `Estilos aplicados desde ${stylesheet} en ${
            element.id || element.tagName
          }`
        );
      }
    });
  }
}
