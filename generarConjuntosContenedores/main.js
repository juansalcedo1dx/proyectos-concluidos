        import { MultiContainerManagerTresUno } from "./secciones/1_header/EficienteCreaTresContenedoresUno.js";
        import { MultiContainerManagerTresDos } from "./secciones/2_navbar/EficienteCreaTresContenedoresDos.js";
        import { MultiContainerManagerUnoUno } from "./secciones/3_publicidad/EficienteCreaUnContenedorUno.js";
        import { MultiContainerManagerUnoDos } from "./secciones/4_carrusel/EficienteCreaUnContenedorDos.js";
        import { MultiContainerManagerCuatroUno} from "./secciones/5_targetas/EficienteCreaCuatroContenedoresUno.js"
       
        import './custom_element/simpleContainer.js'; // Importar el custom element
        import './custom_element/MiBoton.js'; // Importar el custom element-->
        import './custom_element/publicidad.js'
        import './custom_element/buscador.js'
        import './custom_element/menuHamburgueza.js'
        import './custom_element/customCarousel2.js'
        import './custom_element/logo.js'
        import './custom_element/carrito.js'
        import './custom_element/buscador2.js'
        document.addEventListener("DOMContentLoaded", () => {
    // Instancias de MultiContainerManager para los contenedores existentes
    const manager = new MultiContainerManagerTresUno("#main-containerTresContenedoresUno");
    const managerDos = new MultiContainerManagerTresDos("#main-containerTresContenedoresDos");
    const managerTres = new MultiContainerManagerUnoUno("#main-containerUnContenedorUno");
    const managerCuatro = new MultiContainerManagerUnoDos("#main-containerUnContenedorDos");
    const managerCinco = new MultiContainerManagerCuatroUno("#main-containerCuatroContenedoresUno");
    
    // Usamos un setInterval para detectar cuándo los contenedores están listos
    const checkContainers = setInterval(() => {
        const containers = document.querySelectorAll("#main-container simple-container")
            }, 100); // Revisamos cada 100ms si los contenedores ya fueron renderizados
        });

