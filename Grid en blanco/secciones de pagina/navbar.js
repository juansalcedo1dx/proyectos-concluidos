class Padre extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        // Escuchar el evento resize para actualizar la grilla al cambiar el tamaño de la pantalla
        window.addEventListener('resize', () => this.render());
    }

    // Función para generar un color aleatorio
    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Función para obtener el estilo dinámico de col-span basado en el punto
    getColSpanStyle(span) {
        const spanParts = span.split('.');
        if (spanParts.length > 1) {
            // Si contiene un punto, usamos minmax() para hacer la columna flexible
            const colSpanValue = spanParts[0]; // El número antes del punto
            return `minmax(0, ${colSpanValue}fr)`;  // Flexible según el contenido
        }
        return `${span}fr`;  // Valor fijo de col-span
    }

    render() {
        const smGridSize = this.getAttribute('sm') || '1x4';  // Default para pantallas móviles (sm)
        const mdGridSize = this.getAttribute('md') || '2x4';  // Default para pantallas medianas (md)
        const lgGridSize = this.getAttribute('lg') || '3x4';  // Default para pantallas grandes (lg)
        const xlGridSize = this.getAttribute('xl') || '4x4';  // Default para pantallas extragrandes (xl)
        const gap = this.getAttribute('gap') || '10px'; // Espaciado entre celdas
        const height = this.getAttribute('height') || 'auto'; // Altura del contenedor principal

        // Obtener el color de fondo desde el atributo 'color'
        const color = this.getAttribute('color') || 'lightgray'; // Default es lightgray si no se especifica

        // Obtener el tamaño de la ventana para aplicar el layout adecuado
        const width = window.innerWidth;

        // Determinar qué tamaño de grid utilizar según el tamaño de la pantalla
        let gridSize = smGridSize;  // Por defecto se usará el layout sm
        if (width >= 1440 && xlGridSize !== 'none') {
            gridSize = xlGridSize;  // Usar el layout xl para pantallas extragrandes
        } else if (width > 1024 && lgGridSize !== 'none') {
            gridSize = lgGridSize;  // Usar el layout lg para pantallas grandes
        } else if (width > 480 && mdGridSize !== 'none') {
            gridSize = mdGridSize;  // Usar el layout md para pantallas medianas
        } else if (smGridSize !== 'none') {
            gridSize = smGridSize;  // Usar el layout sm para pantallas pequeñas
        }

        const [rows, columns] = gridSize.split('x').map(Number);  // Parse rows and columns
        let innerHTML = '';
        const totalCells = rows * columns;

        // Crear los elementos hijos dentro de la grilla
        const children = Array.from(this.children);

        const columnStyles = Array(columns).fill('1fr');  // Establecer un valor por defecto para las columnas

        children.forEach((child, index) => {
            // Obtener los valores de los atributos `row`, `column`, `col-span`, y `row-span`
            const row = child.getAttribute('row') || '1';
            const column = child.getAttribute('column') || (index + 1);  // Columna por defecto
            const colSpan = child.getAttribute('col-span') || '1';  // Por defecto ocupa 1 columna
            const rowSpan = child.getAttribute('row-span') || '1';  // Por defecto ocupa 1 fila

            // Obtener el valor del atributo 'width', 'max-width' y 'min-width' del hijo
            const widthValue = child.getAttribute('width') || 'auto';  // Si no hay valor, se ajusta al layout de la grilla
            const maxWidthValue = child.getAttribute('max-width') || 'none';  // Si no se especifica, no tiene límite máximo
            const minWidthValue = child.getAttribute('min-width') || 'none';  // Si no se especifica, no tiene límite mínimo

            // Verificar si el atributo tiene "none" y si es así, ocultar el hijo
            const isRowNone = row === 'none';
            const isColumnNone = column === 'none';
            const isColSpanNone = colSpan === 'none';
            const isRowSpanNone = rowSpan === 'none';

            // Si algún valor es 'none', ocultamos el elemento con display: none
            if (isRowNone || isColumnNone || isColSpanNone || isRowSpanNone) {
                innerHTML += ` 
                    <div class="grid-item" style="display: none;">
                        ${child.outerHTML}
                    </div>
                `;
            } else {
                // Verificar el valor del atributo 'borde' del hijo
                const border = child.getAttribute('borde'); // Obtener el valor del atributo 'borde'
                
                // Si el valor de 'borde' es 'none', no aplicamos borde, de lo contrario, aplicamos un borde
                const borderStyle = border === 'none' ? '' : `border: 2px solid ${border || this.getRandomColor()};`; // Si 'borde' no es 'none', aplicamos un borde con color

                // Calcular el grid-column y grid-row usando los valores proporcionados
                const gridColumnStart = parseInt(column);
                const gridColumnEnd = gridColumnStart + parseInt(colSpan);
                const gridRowStart = parseInt(row);
                const gridRowEnd = gridRowStart + parseInt(rowSpan);

                // Aplicar el estilo dinámico para el col-span usando minmax() si es necesario
                const colSpanStyle = this.getColSpanStyle(colSpan);

                // Agregar el col-span dinámico a las columnas
                columnStyles[gridColumnStart - 1] = colSpanStyle;  // Actualizar el estilo de la columna correspondiente

                // Crear el contenedor HTML con el diseño adecuado y el borde si es necesario
                innerHTML += ` 
                    <div class="grid-item" style="${borderStyle} grid-column: ${gridColumnStart} / ${gridColumnEnd}; grid-row: ${gridRowStart} / ${gridRowEnd}; width: ${widthValue}; max-width: ${maxWidthValue}; min-width: ${minWidthValue};">
                        ${child.outerHTML}
                    </div>
                `;
            }
        });

        // Configuración del grid-template-columns con flexibilidad
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: ${columnStyles.join(' ')}; /* Usamos el array de columnStyles para establecer las columnas */
                    grid-template-rows: repeat(${rows}, 1fr); /* Configuración de filas */
                    gap: ${gap}; /* Aplicar el gap entre los elementos */
                    background: ${color}; /* Aplicar el color de fondo desde el atributo 'color' */
                    padding-bottom: 5px;
                    height: ${height}; /* Altura configurable */
                    width: 100%; /* Ancho completo para que la grilla se ajuste */
                }

                .grid-item {
                    display: flex;
                    justify-content: center; /* Centrado horizontal */
                    align-items: center; /* Centrado vertical */
                    height: 100%; /* Alto igual al del contenedor padre */
                }
            </style>
            ${innerHTML}
        `;
    }
}

customElements.define('navbar-e', Padre);
