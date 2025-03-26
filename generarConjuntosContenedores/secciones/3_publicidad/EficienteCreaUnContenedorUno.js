export class MultiContainerManagerUnoUno {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.init();
  }

  async init() {
    await customElements.whenDefined("simple-container");

    // Crear el contenedor principal
    const parentContainer = await this.createContainer(
      "simple-container", 
      "parent-container", 
      [
        "./secciones/3_publicidad/styles-celular.css",
        "./secciones/3_publicidad/styles-tablet.css",
        "./secciones/3_publicidad/styles-pc.css"
      ]
    );

    // Inyectar el contenedor principal al DOM
    this.container.appendChild(parentContainer);

    // Crear el contenedor hijo "wrapper" y agregarlo al shadowRoot de "parentContainer"
    const wrapper = await this.createContainer(
      "simple-container", 
      "wrapper1", 
      [
        "./secciones/3_publicidad/styles-celular.css",
        "./secciones/3_publicidad/styles-tablet.css",
        "./secciones/3_publicidad/styles-pc.css"
      ]
    );

    // Obtener el shadowRoot de 'parentContainer' y agregar 'wrapper' dentro del contenedor
    const shadowRootParent = parentContainer.shadowRoot;
    const conta = shadowRootParent.querySelector(".container");
    conta.appendChild(wrapper);

    // Configuración dinámica de los hijos
    const childrenConfig = [
      { id: "child1", customElement: "awesome-website-banner" },
     
   
     // Agrega más configuraciones aquí
    ];

    // Crear hijos de manera dinámica utilizando map
    await Promise.all(childrenConfig.map(async ({ id, customElement }) => {
      await this.createChild(wrapper, id, customElement);
    }));
  }

  // Método para crear un hijo dentro de "wrapper" de forma dinámica
  async createChild(wrapper, childId, customElementName) {
    // Crear el contenedor hijo
    const child = await this.createContainer(
      "simple-container", 
      childId, 
      [
        "./secciones/3_publicidad/styles-celular.css",
        "./secciones/3_publicidad/styles-tablet.css",
        "./secciones/3_publicidad/styles-pc.css"
      ]
    );

    // Obtener el shadowRoot de 'wrapper' y agregar 'child' dentro de él
    const shadowRootWrapper = wrapper.shadowRoot;
    const containerWrapper = shadowRootWrapper.querySelector(".container");
    containerWrapper.appendChild(child);

    // Crear e insertar el custom element dentro del hijo
    if (customElementName) {
      const customElement = document.createElement(customElementName);
      const childContainer = child.shadowRoot.querySelector(".container");
      childContainer.appendChild(customElement);
    }
  }

  // Método para crear un contenedor y configurarlo
  async createContainer(tipoContenedor, idContenedor, estilos) {
    const contenedor = document.createElement(tipoContenedor);
    contenedor.id = idContenedor;

    // Asegurarse de que el shadowRoot esté listo antes de modificarlo
    await this.waitForShadowRoot(contenedor);

    // Inyectar los estilos en el contenedor
    this.injectStyles(contenedor, estilos);

    return contenedor;
  }

  // Función para esperar que el shadowRoot del contenedor esté listo
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

  // Función para inyectar estilos dentro del shadowRoot
  injectStyles(element, stylesArray) {
    requestAnimationFrame(() => {
      const shadowRoot = element.shadowRoot;

      // Iterar sobre el array de rutas de estilos
      for (const stylesheet of stylesArray) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = stylesheet;

        // Asegurarse de que shadowRoot esté presente antes de agregar los estilos
        shadowRoot.appendChild(link);
      }
    });
  }
}
