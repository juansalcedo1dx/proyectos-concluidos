export class MultiContainerManager {
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

    // Ahora que el shadowRoot está disponible, podemos usar métodos del CE
    parentContainer.setContent("parentContainer: Esta loco.");

    // Agregarlo al DOM después de la configuración
    this.container.appendChild(parentContainer);
    // console.log("🔍 Verificación de parentContainer - Root Node:", parentContainer.getRootNode());

    // Inyectar los estilos
    this.injectStyles(parentContainer, "./styles.css");

    // Crear el contenedor hijo "wrapper" y agregarlo al shadowRoot de "parentContainer"
    const wrapper = document.createElement("simple-container");
    wrapper.id = "wrapper1";
    wrapper.setContent("Wrapper: Esta crazy.");

    // Esperar a que el shadowRoot de wrapper esté listo
    await this.waitForShadowRoot(wrapper);

    // Inyectar los estilos
    this.injectStyles(wrapper, "./styles.css");

    // Obtener el shadowRoot de 'parentContainer' y agregar 'wrapper' dentro del contenedor
    const shadowRootParent = parentContainer.shadowRoot;
    const conta = shadowRootParent.querySelector(".container");
    if (conta) {
      conta.appendChild(wrapper); // Ahora `wrapper` estará dentro del `shadowRoot`
    } else {
      console.error("No se encontró .container dentro de parentContainer");
      return;
    }
    // console.log("🔍 Verificación de wrapper - Root Node:", wrapper.getRootNode());
    // console.log("🔍 Nodo padre de wrapper:", wrapper.parentNode);
    // console.log("🔍 ¿Wrapper está en un Shadow DOM?", wrapper.getRootNode() instanceof ShadowRoot);
    // console.log("🔍 Host del Shadow DOM:", wrapper.getRootNode().host?.tagName);

    // let root = wrapper.getRootNode();
    // while (root instanceof ShadowRoot) {
    //   console.log("📌 Shadow Host encontrado:", root.host.tagName);
    //   root = root.host.getRootNode(); // Subimos un nivel más en la jerarquía
    // }

    // console.log(
    //   "🔍 Shadow Host principal:",
    //   root.host?.tagName || "Está en el Light DOM"
    // );

    // Crear contenedores hijos y agregarlos al shadowRoot de `wrapper`
    // const child1 = document.createElement("simple-container");
    // const child2 = document.createElement("simple-container");
    const child3 = document.createElement("simple-container");
    const child4 = document.createElement("simple-container");
    const child5 = document.createElement("simple-container");

    // child1.id = "child-1";
    // child2.id = "child-2";
    child3.id = "child-3";
    child4.id = "child-4";
    child5.id = "child-5";

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
    child.setContent("child solarium  ");
    // Aplicar estilos a los hijos con inyección de CSS
    [child].forEach((child) => this.injectStyles(child, "./styles.css"));

    if (containerWrapper) {
      // Agregar los contenedores hijos dentro del contenedor de 'wrapper'
      // containerWrapper.appendChild(child1);
      // containerWrapper.appendChild(child2);
      containerWrapper.appendChild(child3);
      containerWrapper.appendChild(child4);
      containerWrapper.appendChild(child5);
    } else {
      console.error("No se encontró .container dentro de wrapper");
      return;
    }

    // Esperar que el shadowRoot de cada 'child' esté listo
    await Promise.all([
      // this.waitForShadowRoot(child1),
      // this.waitForShadowRoot(child2),
      this.waitForShadowRoot(child3),
      this.waitForShadowRoot(child4),
      this.waitForShadowRoot(child5),
    ]);

    // Asignar contenido a cada contenedor hijo
    // child1.setContent("child1 Encabezado");
    // child2.setContent("child2 Izquierdo");
    child3.setContent("child3 Derecho");
    child4.setContent("child4 Principal");
    child5.setContent("child5 Extra  ");

    // Aplicar estilos a los hijos con inyección de CSS
    [child3, child4, child5, child].forEach((child) =>
      this.injectStyles(child, "./styles.css")
    );

    // Crear contenedores pequeños dentro de "Contenido Principal"
    const smallChild1 = document.createElement("simple-container");
    const smallChild2 = document.createElement("simple-container");
    const smallChild3 = document.createElement("simple-container");
    const smallChild4 = document.createElement("simple-container");

    smallChild1.id = "small-child-1";
    smallChild2.id = "small-child-2";
    smallChild3.id = "small-child-3";
    smallChild4.id = "small-child-4";

    const mainContainer = child4.shadowRoot.querySelector(".container");
    if (mainContainer) {
      mainContainer.appendChild(smallChild1);
      mainContainer.appendChild(smallChild2);
      mainContainer.appendChild(smallChild3);
      mainContainer.appendChild(smallChild4);
    } else {
      console.error("No se encontró .container dentro de child4");
      return;
    }

    // let root = smallChild1.getRootNode();
    // while (root instanceof ShadowRoot) {
    //   console.log("📌 Shadow Host encontrado:", root.host.tagName);
    //   root = root.host.getRootNode(); // Subimos un nivel más en la jerarquía
    // }

    // console.log(
    //   "🔍 Shadow Host principal:",
    //   root.host?.tagName || "Está en el Light DOM"
    // );

    // let root = smallChild1.getRootNode();
    // let hierarchy = []; // Guardará los Shadow Hosts encontrados

    // while (root instanceof ShadowRoot) {
    //   hierarchy.push(root.host.tagName); // Guardamos el nombre del Custom Element que contiene el Shadow DOM
    //   root = root.host.getRootNode(); // Subimos un nivel más en la jerarquía
    // }

    // // Mostramos la jerarquía completa
    // if (hierarchy.length > 0) {
    //   console.log(
    //     "📌 Jerarquía de Shadow DOMs:",
    //     hierarchy.reverse().join(" → ")
    //   );
    // } else {
    //   console.log("🔍 Está en el Light DOM");
    // }

    // let root = wrapper.getRootNode();
    // let parentElement = wrapper.parentElement || wrapper.assignedSlot; // Elemento padre directo

    // if (parentElement) {
    //   console.log(
    //     "📌 `wrapper` está dentro de:",
    //     parentElement.tagName,
    //     parentElement
    //   );
    // } else {
    //   console.log(
    //     "🔍 `wrapper` no tiene un padre en el Light DOM, puede estar en el ShadowRoot directamente."
    //   );
    // }

    // // Ahora verificamos la jerarquía de Shadow DOMs
    // let hierarchy = [];
    // while (root instanceof ShadowRoot) {
    //   hierarchy.push({
    //     tag: root.host.tagName,
    //     element: root.host,
    //   });
    //   root = root.host.getRootNode(); // Subimos un nivel más
    // }

    // // Imprimir jerarquía completa
    // if (hierarchy.length > 0) {
    //   console.log("📌 Jerarquía de Shadow DOMs:");
    //   hierarchy.reverse().forEach((item, index) => {
    //     console.log(`${"  ".repeat(index)}→ ${item.tag}`, item.element);
    //   });
    // } else {
    //   console.log("🔍 `wrapper` está en el Light DOM");
    // }

    let element = smallChild1; // Elemento base
    let hierarchy = [];
    let shadowHosts = new Set(); // Para evitar repetir el mismo host
    let level = 0; // Para manejar la indentación

    while (element) {
      let parent = element.parentElement || element.getRootNode().host;
      if (!parent) break; // Si no hay más padres, terminamos

      // Generamos la indentación para cada nivel
      let indent = " ".repeat(level * 2); // Incrementamos el nivel de indentación a medida que subimos en la jerarquía
      let info = `${indent}${parent.tagName.toLowerCase()}`;

      // Añadimos información adicional como id y clase
      if (parent.id) info += `#${parent.id}`;
      if (parent.className) info += `.${parent.className.replace(/\s+/g, ".")}`;

      // Verificar si está en el Shadow DOM o en el Light DOM
      if (parent.getRootNode() instanceof ShadowRoot) {
        info += " (Dentro del Shadow DOM)";
        if (!shadowHosts.has(parent)) {
          hierarchy.push(
            `${indent}🌟 Host del Shadow DOM: ${parent.tagName.toLowerCase()}`
          );
          shadowHosts.add(parent); // Marcar como ya procesado
        }
      } else {
        info += " (Dentro del Light DOM)";
      }

      hierarchy.push(info);
      element = parent; // Subimos un nivel
      level++; // Aumentamos el nivel para la siguiente iteración
    }

    console.log("📌 Jerarquía completa:");
    console.log(hierarchy.reverse().join("\n"));

    await Promise.all([
      this.waitForShadowRoot(smallChild1),
      this.waitForShadowRoot(smallChild2),
      this.waitForShadowRoot(smallChild3),
      this.waitForShadowRoot(smallChild4),
    ]);

    // Asignar contenido a los contenedores pequeños
    smallChild1.setContent("Small1 Comprar");
    smallChild2.setContent("Small2 Pedir");
    smallChild3.setContent("Small3 Contratar");
    smallChild4.setContent("Small4 Descripción");

    // Aplicar estilos a los contenedores pequeños
    [smallChild1, smallChild2, smallChild3, smallChild4].forEach((child) =>
      this.injectStyles(child, "./styles.css")
    );

    const small1 = document.createElement("simple-container");
    const small2 = document.createElement("simple-container");
    const small3 = document.createElement("simple-container");

    small1.id = "small-1";
    small2.id = "small-2";
    small3.id = "small-3";

    const mainContainera = child5.shadowRoot.querySelector(".container");
    if (mainContainera) {
      mainContainera.appendChild(small1);
      mainContainera.appendChild(small2);
      mainContainera.appendChild(small3);
    } else {
      console.error("No se encontró .container dentro de child4");
      return;
    }

    await Promise.all([
      this.waitForShadowRoot(small1),
      this.waitForShadowRoot(small2),
      this.waitForShadowRoot(small3),
    ]);

    // Asignar contenido a los contenedores pequeños
    small1.setContent("Small1 Comprar");
    small2.setContent("Small2 Pedir");
    small3.setContent("Small3 Contratar");

    [small1, small2, small3].forEach((child) =>
      this.injectStyles(child, "./styles.css")
    );

    // Crear un Custom Element "mi-boton"
    const myButton1 = document.createElement("mi-boton");
    // Buscar el contenedor dentro del shadowRoot de smallChild1
    const smallContainer = smallChild1.shadowRoot.querySelector(".container");
    if (smallContainer) {
      smallContainer.appendChild(myButton1);
    } else {
      console.error("No se encontró el contenedor dentro de smallChild1");
    }

    const myButton2 = document.createElement("mi-boton");

    // Buscar el contenedor dentro del shadowRoot de smallChild2
    const smallContainer2 = smallChild2.shadowRoot.querySelector(".container");
    if (smallContainer2) {
      smallContainer2.appendChild(myButton2);
    } else {
      console.error("No se encontró el contenedor dentro de smallChild2");
    }

    const myButton3 = document.createElement("mi-boton");
    // Buscar el contenedor dentro del shadowRoot de smallChild1
    const smallContainer3 = smallChild3.shadowRoot.querySelector(".container");
    if (smallContainer3) {
      smallContainer3.appendChild(myButton3);
    } else {
      console.error("No se encontró el contenedor dentro de smallChild3");
    }

    const myButton4 = document.createElement("mi-boton");
    // Buscar el contenedor dentro del shadowRoot de smallChild1
    const smallContainer4 = smallChild4.shadowRoot.querySelector(".container");
    if (smallContainer4) {
      smallContainer4.appendChild(myButton4);
    } else {
      console.error("No se encontró el contenedor dentro de smallChild4");
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

// const child = document.createElement("simple-container");
// child.id = "child";
// if (containerWrapper) {
//   // Agregar los contenedores hijos dentro del contenedor de 'wrapper'

//   containerWrapper.appendChild(child);
// } else {
//   console.error("No se encontró .container dentro de wrapper");
//   return;
// }
// await Promise.all([this.waitForShadowRoot(child)]);
// child.setContent("child solarium  ");

// // Aplicar estilos a los hijos con inyección de CSS
// [child].forEach((child) => this.injectStyles(child, "./styles.css"));
