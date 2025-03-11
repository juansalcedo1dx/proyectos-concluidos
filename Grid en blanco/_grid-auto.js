class CustomGridContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Usamos shadow DOM
    }

    connectedCallback() {
        this.render();
    }

    // Método para obtener el espacio entre los elementos desde el atributo 'gap'
    getGap() {
        return this.getAttribute('gap') || '1rem'; // Espacio por defecto entre los elementos
    }

    // Método para obtener el color de fondo desde el atributo 'color'
    getBgColor() {
        return this.getAttribute('color') || '#FFFFFF'; // Si no se define, el color de fondo será blanco
    }

    // Método para obtener el color del borde desde el atributo 'border-color'
    getBorderColor() {
        return this.getAttribute('border-color') || '#000000'; // Si no se define, el color del borde será negro
    }

    // Método para obtener la altura desde el atributo 'height' del contenedor
    getHeight() {
        // Si no se define el atributo 'height', se toma 'auto' como valor por defecto
        return this.getAttribute('height') || 'auto';
    }

    // Método para verificar si los hijos están vacíos
    areChildrenEmpty() {
        return Array.from(this.children).every(child => {
            // Verifica si el hijo tiene contenido (elementos o texto)
            return !child.innerHTML.trim();  // Si no tiene contenido, se considera vacío
        });
    }

    render() {
        const gap = this.getGap(); // Obtener el gap
        const bgColor = this.getBgColor(); // Obtener el color de fondo
        const borderColor = this.getBorderColor(); // Obtener el color del borde
        const height = this.getHeight(); // Obtener la altura configurada en el atributo 'height'

        // Verificar si todos los hijos están vacíos
        const areChildrenEmpty = this.areChildrenEmpty();

        // Si todos los hijos están vacíos, usar el atributo 'height' proporcionado en la etiqueta
        const containerHeight = areChildrenEmpty ? height : 'auto';

        const innerHTML = `
            <div class="grid-container">
                <!-- Usamos un slot para insertar elementos hijos -->
                <slot></slot>
            </div>
        `;

        // Estilos dentro del shadow DOM
        this.shadowRoot.innerHTML = `
            <style>
                /* Contenedor principal */
                .grid-container {
                    display: grid;
                    gap: ${gap}; /* Espacio entre los elementos */
                    grid-auto-flow: dense; /* Auto-ajuste de elementos en el contenedor */
                    grid-auto-rows: auto; /* Las filas se ajustarán automáticamente a la altura de sus hijos */
                    grid-template-columns: repeat(auto-fill, minmax(19rem, 1fr)); /* Columnas auto-ajustables con un tamaño mínimo de 15rem */
                    width: 100%; /* 100% del ancho */
                    background-color: ${bgColor}; /* Color de fondo dinámico según el atributo 'color' */
                    height: ${containerHeight}; /* Aplicar la altura dinámica basada en los hijos o el atributo 'height' */
                }

                /* Los elementos hijos (contenedores) */
                ::slotted(contenedor-e) {
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 20px;
                    width: 100%; /* Asegura que los hijos ocupen todo el ancho de la celda */
                    height: auto; /* Los elementos hijos se ajustan al contenido */
                    border: 2px solid ${borderColor}; /* Borde dinámico definido por el atributo 'border-color' */
                    box-sizing: border-box; /* Asegura que el borde no afecte el tamaño total */
                    padding: 5px; /* Añade un poco de relleno para que no esté pegado al borde */
                    overflow: hidden; /* Evita que el contenido sobresalga */
                    background-color: white; /* Fondo de las tarjetas para visibilidad */
                }

                /* Responsive: cuando la pantalla es menor a 768px */
                @media (max-width: 768px) {
                    .grid-container {
                        grid-template-columns: repeat(2, 1fr); /* 2 columnas en pantallas medianas */
                    }
                }

                /* Responsive: cuando la pantalla es menor a 480px */
                @media (max-width: 480px) {
                    .grid-container {
                        grid-template-columns: 1fr; /* 1 columna en pantallas pequeñas (móviles) */
                    }
                }
            </style>
            ${innerHTML}
        `;
    }
}

// Definir el Custom Element 'custom-grid-container'
customElements.define('grid-0', CustomGridContainer);
