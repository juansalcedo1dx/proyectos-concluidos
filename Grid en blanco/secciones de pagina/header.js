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

    render() {
        const smGridSize = this.getAttribute('sm') || '1x4';  // Default para pantallas móviles (sm)
        const mdGridSize = this.getAttribute('md') || '2x4';  // Default para pantallas medianas (md)
        const lgGridSize = this.getAttribute('lg') || '3x4';  // Default para pantallas grandes (lg)
        const xlGridSize = this.getAttribute('xl') || '4x4';  // Default para pantallas extragrandes (xl)
        const gap = this.getAttribute('gap') || '10px'; // Espaciado entre celdas
        const height = this.getAttribute('height') || 'auto'; // Altura del contenedor principal

        // Obtener el color de fondo desde el atributo 'color'
        const color = this.getAttribute('color') || 'lightgray'; // Default es lightgray si no se especifica

        // Obtener la imagen de fondo desde el atributo 'background-image'
        const backgroundImage = this.getAttribute('background-image') || ''; // Imagen de fondo opcional

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

            // Validación para dividir los valores de `row`, `column`, `col-span`, y `row-span` en sm, md, lg y xl
            const rowValues = row.split(','); // Ejemplo: '1,none,none,none'
            const columnValues = column.split(','); // Ejemplo: '1,2,3,4'
            const colSpanValues = colSpan.split(','); // Ejemplo: '1,2,3,4'
            const rowSpanValues = rowSpan.split(','); // Ejemplo: '1,2,3,4'

            // Aplicar el valor adecuado según el tamaño de la pantalla
            const rowValue = width <= 480 ? rowValues[0] : (width <= 1024 ? rowValues[1] : (width <= 1440 ? rowValues[2] : rowValues[3]));  // sm: rowValues[0], md: rowValues[1], lg: rowValues[2], xl: rowValues[3]
            const columnValue = width <= 480 ? columnValues[0] : (width <= 1024 ? columnValues[1] : (width <= 1440 ? columnValues[2] : columnValues[3]));  // sm: columnValues[0], md: columnValues[1], lg: columnValues[2], xl: columnValues[3]
            const colSpanValue = width <= 480 ? colSpanValues[0] : (width <= 1024 ? colSpanValues[1] : (width <= 1440 ? colSpanValues[2] : colSpanValues[3]));  // sm: colSpanValues[0], md: colSpanValues[1], lg: colSpanValues[2], xl: colSpanValues[3]
            const rowSpanValue = width <= 480 ? rowSpanValues[0] : (width <= 1024 ? rowSpanValues[1] : (width <= 1440 ? rowSpanValues[2] : rowSpanValues[3]));  // sm: rowValues[0], md: rowValues[1], lg: rowValues[2], xl: rowValues[3]

            // Verificar si el atributo tiene "none" y si es así, ocultar el hijo
            const isRowNone = rowValue === 'none';
            const isColumnNone = columnValue === 'none';
            const isColSpanNone = colSpanValue === 'none';
            const isRowSpanNone = rowSpanValue === 'none';

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

                const gridColumnStart = parseInt(columnValue);
                const gridColumnEnd = gridColumnStart + parseInt(colSpanValue);
                const gridRowStart = parseInt(rowValue);
                const gridRowEnd = gridRowStart + parseInt(rowSpanValue);

                // Crear el contenedor HTML con el diseño adecuado y el borde si es necesario
                innerHTML += ` 
                    <div class="grid-item" style="${borderStyle} grid-column: ${gridColumnStart} / ${gridColumnEnd}; grid-row: ${gridRowStart} / ${gridRowEnd}; width: ${widthValue}; max-width: ${maxWidthValue}; min-width: ${minWidthValue};">
                        ${child.outerHTML}
                    </div>
                `;
            }
        });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: repeat(${columns}, 1fr); /* Configuración de columnas */
                    grid-template-rows: repeat(${rows}, 1fr); /* Configuración de filas */
                    gap: ${gap}; /* Aplicar el gap entre los elementos */
                    background: ${color}; /* Aplicar el color de fondo desde el atributo 'color' */
                    background-image: ${backgroundImage ? `url(${backgroundImage})` : 'none'}; /* Imagen de fondo */
                    background-size: cover; /* Aseguramos que la imagen de fondo cubra todo el contenedor */
                    background-repeat: no-repeat; /* Evitar la repetición de la imagen */
                    background-position: center; /* Centrar la imagen de fondo */
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

customElements.define('header-e', Padre);
