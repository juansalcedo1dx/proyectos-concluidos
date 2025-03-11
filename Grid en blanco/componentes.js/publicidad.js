class AwesomeWebsiteBanner extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Crear un shadow DOM
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          .container {
            background: linear-gradient(to right, #6B46C1, #4A90E2);
            height: 100%;
            color: white;
            overflow: hidden;
            position: relative;
           
            <div class="d-flex">
                <div class="d-flex align-self-start">
                    <img src="#" alt="" width="300" />
                </div>
                <div class="flex-grow-1 ms-3">
                    <h5 class="mt-0">Media heading</h5>
                    <p>
                        This is some content from a media component. You can replace
                        this with any content and adjust it as needed.
                    </p>
                </div>
            </div>
            : 20px
          }
          .background {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }
          .background img {
            object-fit: cover;
            object-position: center;
            width: 100%;
            height: 100%;
          }
          .overlay {
            position: absolute;
            inset: 0;
            background: black;
            opacity: 0.5;
          }
          .content {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            text-align: center;
            
          }
          h1 {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.25rem;
            color: #D1D5DB; /* Gray 300 */
            margin-bottom: 1rem;
          }
          a {
            background-color: #F6E05E; /* Yellow 400 */
            color: #1F2937; /* Gray 900 */
            padding: 0.5rem 1.5rem;
            border-radius: 9999px; /* Full rounded */
            font-size: 1.125rem; /* Text-lg */
            font-weight: 600; /* Semi-bold */
            transition: background-color 0.3s, transform 0.3s;
          }
          a:hover {
            background-color: #FBD38D; /* Yellow 300 */
            transform: scale(1.05);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          }
        </style>
        <div class="container">
          <div class="background">
            <img src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Background Image" />
            <div class="overlay"></div>
          </div>
          <div class="content">
            <h1>Welcome to Our Awesome Website</h1>
            <p>Discover amazing features and services that await you.</p>
            <a href="#">Get Started</a>
          </div>
        </div>
      `;
    }
  }
  
  // Definir el nuevo elemento
  customElements.define('awesome-website-banner', AwesomeWebsiteBanner);

  export{AwesomeWebsiteBanner}
  