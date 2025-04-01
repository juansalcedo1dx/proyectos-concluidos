export class MultiContainerManagerTresDos {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);

    if (!this.container) {
      console.error(`No se encontró el contenedor ${containerSelector}`);
      return;
    }
    this.init();
  }

  async init() {
    await customElements.whenDefined("simple-container");

    const parentContainer = document.createElement("simple-container");
    parentContainer.id = "parent-container";
    await this.waitForShadowRoot(parentContainer);
    this.container.appendChild(parentContainer);

    this.injectStyles(parentContainer, [
      "./secciones/2_navbar/styles-celular.css",
      "./secciones/2_navbar/styles-tablet.css",
      "./secciones/2_navbar/styles-pc.css"
    ]);

    const wrapper = document.createElement("simple-container");
    wrapper.id = "wrapper1";
    await this.waitForShadowRoot(wrapper);
    this.injectStyles(wrapper, [
      "./secciones/2_navbar/styles-celular.css",
      "./secciones/2_navbar/styles-tablet.css",
      "./secciones/2_navbar/styles-pc.css"
    ]);
    
    const shadowRootParent = parentContainer.shadowRoot;
    const conta = shadowRootParent.querySelector(".container");
    if (conta) {
      conta.appendChild(wrapper);
    } else {
      console.error("No se encontró .container dentro de parentContainer");
      return;
    }

    await this.waitForShadowRoot(wrapper);

    const shadowRootWrapper = wrapper.shadowRoot;
    const containerWrapper = shadowRootWrapper.querySelector(".container");

    const child = document.createElement("simple-container");
    child.id = "child";
    if (containerWrapper) {
      containerWrapper.appendChild(child);
    } else {
      console.error("No se encontró .container dentro de wrapper");
      return;
    }

    await Promise.all([this.waitForShadowRoot(child)]);

    this.injectStyles(child, [
      "./secciones/2_navbar/styles-celular.css",
      "./secciones/2_navbar/styles-tablet.css",
      "./secciones/2_navbar/styles-pc.css"
    ]);

    const smallChild1 = document.createElement("simple-container");
    const smallChild2 = document.createElement("simple-container");
    const smallChild3 = document.createElement("simple-container");
    const smallChild4 = document.createElement("simple-container");


    smallChild1.id = "small-child-1";
    smallChild2.id = "small-child-2";
    smallChild3.id = "small-child-3";
    smallChild4.id = "small-child-4";
    

    const mainContainer = child.shadowRoot.querySelector(".container");
    if (mainContainer) {
      mainContainer.appendChild(smallChild1);
      mainContainer.appendChild(smallChild2);
      mainContainer.appendChild(smallChild3);
      
      
    } else {
      console.error("No se encontró .container dentro de child");
      return;
    }

    await Promise.all([
      this.waitForShadowRoot(smallChild1),
      this.waitForShadowRoot(smallChild2),
      this.waitForShadowRoot(smallChild3),
      
    ]);

    [smallChild1, smallChild2, smallChild3].forEach((child) =>
      this.injectStyles(child, [
        "./secciones/2_navbar/styles-celular.css",
        "./secciones/2_navbar/styles-tablet.css",
        "./secciones/2_navbar/styles-pc.css"
      ])
    );

    
    const smallContainer = smallChild1.shadowRoot.querySelector(".container");
    const CustomElement1 = document.createElement("search-input");
    if (smallContainer) {
      smallContainer.appendChild(CustomElement1);
    } else {
      console.error("No se encontró el contenedor dentro de smallChild1");
    }

    const smallContainer2 = smallChild2.shadowRoot.querySelector(".container");
    //                                     custom-cart-icon
    const CustomElement2 = document.createElement("");
    if (smallContainer2) {
      smallContainer2.appendChild(CustomElement2);
    } else {
      console.error("No se encontró el contenedor dentro de smallChild2");
    }

    const CustomElement3 = document.createElement("hamburger-menu");
    const smallContainer3 = smallChild3.shadowRoot.querySelector(".container");
    if (smallContainer3) {
      smallContainer3.appendChild(CustomElement3);
    } else {
      console.error("No se encontró el contenedor dentro de smallChild3");
    }

   

    window.addEventListener('resize', this.toggleSearchInputOrIcon.bind(this)); // Detectar cambios en el tamaño de la ventana
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

  injectStyles(element, stylesArray) {
    requestAnimationFrame(() => {
      const shadowRoot = element.shadowRoot;
      if (!Array.isArray(stylesArray)) {
        console.error("stylesArray debe ser un array de rutas de CSS.");
        return;
      }

      for (const stylesheet of stylesArray) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = stylesheet;
        shadowRoot.appendChild(link);
        console.log(`Estilos aplicados desde ${stylesheet} en ${element.id || element.tagName}`);
      }
    });
  }

 



}


