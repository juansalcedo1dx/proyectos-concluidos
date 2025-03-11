class HamburgerMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: Arial, sans-serif;
            }

            /* Estilos del menú hamburguesa */
            .menu-container {
                position: relative; 
                right: 6px; 
                display: none
                z-index: 9999; /* Asegurándote de que el contenedor esté por encima de otros elementos */
            }

            .hamburger {
                position: relative;
                width: 40px;
                height: 40px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                cursor: pointer;
                transition: transform 0.3s ease;
            }

            .hamburger div {
                height: 5px;
                width: 100%;
                background-color: #333;
                border-radius: 10px;
                transition: transform 0.3s ease, opacity 0.3s ease;
                margin-left:5px;
                margin-top: 8px;
                padding-Top: 2px 
            }

            /* Estilos para el menú */
            .menu {
                position: fixed; /* Cambiado a fixed para que se quede fijo mientras se despliega */
                top: 0;
                left: 0;
                background-color: #333;
                width: 200px;
                height: 100%;
                transform: translateX(-100%); /* Iniciar el menú fuera de la pantalla a la izquierda */
                transition: transform 0.3s ease-in-out;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding-top: 20px;
                z-index: 11; /* Asegúrate de que el menú esté por encima de otros elementos */
            }

            .menu a {
                color: white;
                text-decoration: none;
                padding: 10px 20px;
                font-size: 18px;
                transition: background-color 0.3s ease;
                
            }

            .menu a:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }

            /* Activa el menú cuando se hace clic en el hamburger */
            .menu.active {
                transform: translateX(0); /* Desliza el menú hacia la derecha */
            }

            /* Animación de la hamburguesa para formar una "X" */
            .hamburger.active div:nth-child(1) {
                transform: rotate(45deg) translateY(18px);
            }

            .hamburger.active div:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active div:nth-child(3) {
                transform: rotate(-45deg) translateY(-18px);
            }

            .hamburger.active {
                transform: rotate(-90deg);
            }
        </style>
        <div class="menu-container">
            <div class="hamburger" id="hamburger">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="menu" id="menu">
            <a href="#">Inicio</a>
            <a href="#">Servicios</a>
            <a href="#">Nosotros</a>
            <a href="#">Contacto</a>
        </div>
        `;

        this.menu = this.shadowRoot.getElementById('menu');
        this.hamburger = this.shadowRoot.getElementById('hamburger');

        this.hamburger.addEventListener('click', () => this.toggleMenu());
    }

    toggleMenu() {
        this.menu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }
}




export {HamburgerMenu}
