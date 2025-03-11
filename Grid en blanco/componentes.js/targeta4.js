class CustomCard4 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .flex {
          display: flex;
        }
        .justify-center {
          justify-content: center;
        }
        .items-center {
          align-items: center;
        }
        .bg-gradient-to-br {
          /* Definir un fondo de gradiente */
        }
        .p-4 {
          padding: 1rem; /* Corregir el padding */
        }
        .max-w-md {
          max-width: 28rem;
        }
        .w-full {
          width: 100%;
        }
        .bg-white {
          background-color: white;
        }
        .rounded-xl {
          border-radius: 0.75rem;
        }
        .shadow-2xl {
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        }
        .overflow-hidden {
          overflow: hidden;
        }
        .transform {
          transform: scale(1);
          transition: transform 0.5s;
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .relative {
          position: relative;
        }
        .absolute {
          position: absolute;
        }
        .h-64 {
          height: 16rem; /* Ajustar el tamaño de la imagen */
        }
        .object-cover {
          object-fit: cover;
        }
        .bg-teal-500 {
          background-color: #38b2ac;
        }
        .text-white {
          color: white;
        }
        .px-2 {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        .py-1 {
          padding-top: 0.2rem;
          padding-bottom: 0.25rem;
        }
        .m-2 {
          margin: 0.5rem;
        }
        .rounded-md {
          border-radius: 0.375rem;
        }
        .text-sm {
          font-size: 0.875rem;
        }
        .font-semibold {
          font-weight: 600;
        }
        .p-6 {
          padding: 1.5rem;
        }
        .text-2xl {
          font-size: 1.5rem;
        }
        .font-bold {
          font-weight: 700;
        }
        .mb-2 {
          margin-bottom: 0.5rem;
        }
        .text-gray-800 {
          color: #2d3748;
        }
        .text-gray-600 {
          color: #718096;
        }
        .flex.justify-between {
          justify-content: space-between;
        }
        .bg-indigo-600 {
          background-color: #4c51bf;
        }
        .hover\:bg-indigo-700:hover {
          background-color: #434190;
        }
        .focus\:outline-none:focus {
          outline: none;
        }
        .focus\:ring-2:focus {
          ring: 2;
        }
        .focus\:ring-indigo-500:focus {
          ring-color: #5a67d8;
        }
        .focus\:ring-opacity-75:focus {
          ring-opacity: 0.75;
        }
        .transition {
          transition: all 0.3s ease-in-out;
        }
      </style>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

      <!-- Contenedor principal con flexbox para centrar -->
      <div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-2 pt-">
        <!-- Tarjeta -->
        <div class="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
          <div class="relative">
            <img class="w-full h-60 object-cover" src="https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Nature scene">
            <div class="absolute bottom-0 right-0 bg-teal-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
              Location
            </div>
          </div>
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-2 text-gray-800">Lorem ipsum dolor sit amet</h2>
            <p class="text-gray-600 mb-4">Fusce orci purus, efficitur vel eros eu, cursus pretium urna. Integer efficitur lorem vitae augue auctor aliquam.</p>
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold text-gray-800">$299</span>
              <a href="#" class="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

  customElements.define('custom-card4', CustomCard4);
  

  export {CustomCard4}