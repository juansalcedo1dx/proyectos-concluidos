class SearchInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
.input-container {
    display: flex;
    margin-Left: 95px;
    width: 20rem; /* Hacemos el buscador más largo por defecto */
    transition: all 0.3s ease;
    display: flex;
    align-items: center; /* Alinear verticalmente */
    position: relative;
    
  }
  .input {
    width: 70%;
    padding: 0.5rem 1rem;
    padding-left: 2.5rem; /* Espacio para el icono */
    padding-right: 1rem; /* pr-4 */
    color: #4a5568; /* text-gray-700 */
    background-color: #fff; /* bg-white */
    border: 1px solid #cbd5e0; /* border-gray-300 */
    border-radius: 9999px; /* rounded-full */
    outline: none;
    transition: all 0.3s ease;
  }
  .input:focus {
    border-color: #3b82f6; /* border-blue-500 */
  }
  .icon {
    position: absolute; /* Cambiado a absoluto */
    left: 0.75rem; /* Espacio a la izquierda */
    display: flex;
    align-items: center;
    pointer-events: none; /* Evitar que el icono capture eventos */
  }
  .icon svg {
    width: 1.25rem; /* w-5 */
    height: 1.25rem; /* h-5 */
    color: #cbd5e0; /* text-gray-400 */
    transition: all 0.3s ease;
  }
  .input-container.focused .icon svg {
    color: #3b82f6; /* text-blue-500 */
  }

      </style>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      

      <div class="input-container">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search..."
          class="input"
        />
      </div>
    `;
  }

  connectedCallback() {
    this.inputElement = this.shadowRoot.querySelector('.input');
    this.containerElement = this.shadowRoot.querySelector('.input-container');

    // Cambiar tamaño al enfocar el input
    this.inputElement.addEventListener('focus', () => {
      this.containerElement.classList.add('focused');
      this.containerElement.style.width = '19rem'; /* Más largo cuando está enfocado */
    });

    // Restaurar tamaño cuando se pierde el foco
    this.inputElement.addEventListener('blur', () => {
      this.containerElement.classList.remove('focused');
      this.containerElement.style.width = '16rem'; /* Mantener un tamaño más largo que el original */
    });
  }
}



export {SearchInput}