export class MultiContainerManagerSeccionTres {
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
      this.injectStyles(parentContainer, "./stylesTres.css");
  
      // Crear el contenedor hijo "wrapper" y agregarlo al shadowRoot de "parentContainer"
      const wrapper = document.createElement("simple-container");
      wrapper.id = "wrapper1";
    //   wrapper.setContent("Wrapper: Esta crazy.");
  
      // Esperar a que el shadowRoot de wrapper esté listo
      await this.waitForShadowRoot(wrapper);
  
      // Inyectar los estilos
      this.injectStyles(wrapper, "./stylesTres.css");
  
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
  
      // reacion de un contenedor, compacto. Entre 90 y 105.
  
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
    //   child.setContent("child solarium  ");
      // Aplicar estilos a los hijos con inyección de CSS
      [child].forEach((child) => this.injectStyles(child, "./stylesTres.css"));
  
      // Crear un Custom Element "mi-boton"
      const myButton1 = document.createElement("mi-boton");
      // Buscar el contenedor dentro del shadowRoot de smallChild1
      const smallContainer = child.shadowRoot.querySelector(".container");
      if (smallContainer) {
        smallContainer.appendChild(myButton1);
      } else {
        console.error("No se encontró el contenedor dentro de smallChild1");
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
  
    injectStyles(element, stylesheet) {
      requestAnimationFrame(() => {
        const shadowRoot = element.shadowRoot;
  
        // Crear un <link> para cargar el archivo CSS externo
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
      });
    }
  }
  
 