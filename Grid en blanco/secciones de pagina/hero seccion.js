class Padre extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Usamos shadow DOM
    }

    connectedCallback() {
        this.render();
        // Después de que se rendericen los hijos, ajustamos la altura al contenido
        this.adjustHeight();
        // Escuchamos el evento de scroll para ajustar la posición si es necesario
        window.addEventListener('scroll', this.adjustPosition.bind(this));
        window.addEventListener('resize', this.adjustHeight.bind(this)); // Aseguramos que la altura también se ajuste cuando el tamaño cambie
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this.adjustPosition.bind(this)); // Limpiar el evento cuando el componente se elimina
        window.removeEventListener('resize', this.adjustHeight.bind(this)); // Limpiar también el evento de resize
    }

    // Método para obtener la altura inicial del contenedor
    getHeight() {
        return this.getAttribute('height') || 'auto'; // Si no se define, la altura será auto
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

    // Ajusta la altura del contenedor según el contenido de los hijos
    adjustHeight() {
        const gridContainer = this.shadowRoot.querySelector('.grid-container');
        const slot = this.shadowRoot.querySelector('slot');
        const slotContent = slot.assignedNodes();
        const contentHeight = slotContent.reduce((totalHeight, node) => {
            // Solo contar los elementos de tipo Element (contenedores hijos)
            if (node.nodeType === Node.ELEMENT_NODE) {
                totalHeight += node.offsetHeight;
            }
            return totalHeight;
        }, 0);
        gridContainer.style.height = contentHeight > 0 ? `${contentHeight}px` : this.getHeight();
    }

    // Ajusta la posición del contenedor cuando se hace scroll
    adjustPosition() {
        const gridContainer = this.shadowRoot.querySelector('.grid-container');
        const rect = gridContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Comprobamos la posición de los contenedores
        const topContainer = document.querySelector('.top-container'); // Este es el contenedor de arriba que se mueve
        const topContainerRect = topContainer ? topContainer.getBoundingClientRect() : { top: 0 };

        // Ajustamos la posición sin sobreponer el contenedor principal
        if (topContainerRect.bottom < rect.top) {
            gridContainer.style.position = 'sticky'; // Usamos sticky en lugar de absolute
            gridContainer.style.top = `${topContainerRect.bottom + 10}px`; // Desplazamos el contenedor hacia abajo por debajo del contenedor superior
        } else {
            // Si el contenedor superior ya no está cubriendo el contenedor principal, lo devolvemos a su posición normal
            gridContainer.style.position = 'relative';
            gridContainer.style.top = '0';
        }
    }

    render() {
        const gap = this.getGap(); // Obtener el gap
        const bgColor = this.getBgColor(); // Obtener el color de fondo
        const borderColor = this.getBorderColor(); // Obtener el color del borde
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
                    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr)); /* Columnas auto-ajustables con un tamaño mínimo de 100% (ocupa toda la pantalla) */
                    width: 100%; /* Asegura que el contenedor ocupe todo el ancho de la pantalla */
                    background-color: ${bgColor}; /* Color de fondo dinámico según el atributo 'color' */
                    transition: top 0.3s ease-in-out; /* Transición suave al ajustar la posición */
                    padding: 0px;
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
                    background-color: #333; /* Fondo de las tarjetas para visibilidad */
                }
            </style>
            ${innerHTML}
        `;
    }
}

customElements.define('hero-seccion', Padre);
