class CustomCartIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.cartCount = 0; // Contador de productos en el carrito
        this.productImageUrl = 'https://via.placeholder.com/50'; // URL de la imagen del producto (puedes cambiarla)
        this.productMessage = 'Producto agregado'; // Mensaje que aparece al agregar un producto
    }

    connectedCallback() {
        // Crear el contenedor del ícono
        const container = document.createElement('div');
        container.classList.add('cart-container');

        // Crear el ícono del carrito de compras (utilizando SVG)
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');

        // Contenido del SVG del carrito moderno (más estilizado y limpio)
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M6 2L3 6h1l2 9h12l2-9h1L18 2H6z'); // Carro
        svg.appendChild(path1);

        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        path2.setAttribute('cx', '7');
        path2.setAttribute('cy', '18');
        path2.setAttribute('r', '2'); // Rueda izquierda
        svg.appendChild(path2);

        const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        path3.setAttribute('cx', '17');
        path3.setAttribute('cy', '18');
        path3.setAttribute('r', '2'); // Rueda derecha
        svg.appendChild(path3);

        // Crear el contador de productos en el carrito
        this.cartCountElement = document.createElement('span');
        this.cartCountElement.classList.add('cart-count');
        this.cartCountElement.textContent = this.cartCount;

        // Crear el submenú
        this.submenu = document.createElement('div');
        this.submenu.classList.add('submenu');
        const productImage = document.createElement('img');
        productImage.classList.add('product-image');
        productImage.src = this.productImageUrl; // Aquí asignamos la imagen del producto
        const message = document.createElement('p');
        message.textContent = this.productMessage; // Mensaje cuando se agrega un producto
        this.submenu.appendChild(productImage);
        this.submenu.appendChild(message);

        // Añadir el SVG y el contador al contenedor
        container.appendChild(svg);
        container.appendChild(this.cartCountElement);

        // Crear los estilos
        const style = document.createElement('style');
        style.textContent = `
            .cart-container {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                background-color: #00bcd4; /* Color azul moderno */
                border-radius: 50%;
                cursor: pointer;
                position: relative;
                transition: background-color 0.3s;
            }

            .cart-container:hover {
                background-color: #008c96; /* Un color azul más oscuro al pasar el ratón */
            }

            svg {
                width: 22px;
                height: 22px;
                color: white; /* Color blanco para el ícono */
            }

            .cart-count {
                position: absolute;
                top: -5px;
                right: -5px;
                background-color: #ff4081; /* Color para el contador */
                color: white;
                font-size: 12px;
                font-weight: bold;
                padding: 2px 6px;
                border-radius: 50%;
                min-width: 18px;
                text-align: center;
            }

            /* Estilos para el submenú */
            .submenu {
                display: none;
                position: absolute;
                top: 60px;  /* Asegurándonos de que esté debajo del ícono */
                left: 50%;  /* Posicionamos en el centro */
                margin-left: ; /* Ajustamos para que el submenú quede centrado */
                width: 200px;  /* Asegúrate de que el submenú tenga un ancho fijo */
                padding: 10px;
                background-color: #fff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
                z-index: 10;
                text-align: center;
                animation: fadeIn 0.3s ease-out;
            }

            .submenu.show {
                display: block; /* Aseguramos que el submenú se muestre */
            }

            .product-image {
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: 5px;
                margin-bottom: 10px;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        
        // Añadir los estilos al Shadow DOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(container);
        this.shadowRoot.appendChild(this.submenu);

        // Agregar un evento al hacer clic en el carrito
        container.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic en el carrito cierre el submenú
            this.addToCart();
        });

        // Agregar un evento al hacer clic en el submenú para evitar que se cierre
        this.submenu.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic dentro del submenú cierre el submenú
        });

        // Cerrar el submenú si se hace clic fuera del carrito o del submenú
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target) && !this.submenu.contains(e.target)) {
                this.closeSubmenu();
            }
        });
    }

    // Método para agregar un producto al carrito
    addToCart() {
        this.cartCount++;
        this.cartCountElement.textContent = this.cartCount;
        this.showSubmenu();
        this.dispatchEvent(new CustomEvent('cart-updated', {
            detail: { cartCount: this.cartCount },
            bubbles: true,
            composed: true
        }));
    }

    // Método para mostrar el submenú
    showSubmenu() {
        this.submenu.classList.add('show');
    }

    // Método para cerrar el submenú
    closeSubmenu() {
        this.submenu.classList.remove('show');
    }

    // Método para vaciar el carrito (opcional)
    clearCart() {
        this.cartCount = 0;
        this.cartCountElement.textContent = this.cartCount;
    }

    // Método para obtener la cantidad de productos en el carrito
    getCartCount() {
        return this.cartCount;
    }
}

// Registrar el CustomElement
customElements.define('custom-cart-icon', CustomCartIcon);
