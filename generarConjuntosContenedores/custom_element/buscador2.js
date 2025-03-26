class BuscadorComponent extends HTMLElement {
    constructor() {
        super();
        
        // Creamos el Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Agregamos el HTML
        this.shadowRoot.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Poppins', sans-serif;
            }

            body{
                background-color: #1f1f21;
            }

            .contenedor-buscador{
                border-top: 1px solid rgba(255, 255, 255, 0.7);
                border-left: 1px solid rgba(255, 255, 255, 0.7);
                box-shadow: 3px 3px 3px rgba(0,0,0,0.5);
                position: fixed;
                width: 500px;
                min-height: 150px;
                margin-top: 100px;
                border-radius: 8px;
                background-color: #181822;
                color: white;
                left: 50%;
                transform: translateX(-50%);
                z-index: 150;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            .contenedor-buscador .buscador{
                display: flex;
                height: 55px;
                margin: 12px 12px 0;
            }

            .contenedor-buscador .buscador .search{
                border: 2px solid #ed873c;
                border-radius: 8px;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                background-color: #ffffff;
                overflow: hidden;
            }

            .contenedor-buscador .search ion-icon{
                min-width: 28px;
                font-size: 28px;
                margin: 0 5px;
                color: #ed873c;
            }

            .contenedor-buscador .search input{
                width: 100%;
                height: 100%;
                background-color: inherit;
                color: rgb(0, 0, 0);
                font-size: 18px;
                border: none;
                outline: none;
            }

            #btn-cerrar{
                font-size: 17px;
                color: #ed873c;
                margin: auto 8px;
                cursor: pointer;
                display: none;
            }

            #equis-input{
                cursor: pointer;
                display: none;
            }

            .conteiner-button{
                display: flex;
            }

            #btn-abrir{
                width: 50px;
                height: 50px;
                margin: 15px;
                border-radius: 50%;
                cursor: pointer;
                border: 3px solid #ed873c;
                background-color: #ffffff;
                color: rgb(0, 0, 0);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 30px;
            }

            /* Responsive */
            @media (max-width:770px) or (max-height:550px){
                .contenedor-buscador{
                    width: 100%;
                    height: 100vh;
                    margin-top: 80px;
                    top: 0;
                    border: none;
                    border-radius: 0;
                    justify-content: space-between;
                }

                .contenedor-buscador .resultados{
                    height: 100%;
                    max-height: 100%;
                }

                #btn-cerrar{
                    display: block;
                }
            }
        </style>

        <div class="conteiner-button">
            <button id="btn-abrir">
                <ion-icon name="search-outline"></ion-icon>
            </button>
        </div>

        <div class="background"></div>

        <div class="contenedor-buscador">
            <div class="buscador">
                <div class="search">
                    <ion-icon name="search-outline"></ion-icon>
                    <input id="input-buscador" type="text" placeholder="Search">
                    <ion-icon id="equis-input" name="close-outline"></ion-icon>
                </div>
                <span id="btn-cerrar">Cerrar</span>
            </div>

            <div class="resultados"></div>
        </div>
        `;

        // Inicialización de elementos
        this.equisInput = this.shadowRoot.getElementById("equis-input");
        this.inputBuscador = this.shadowRoot.getElementById("input-buscador");
        this.btnCerrar = this.shadowRoot.getElementById("btn-cerrar");
        this.buscador = this.shadowRoot.querySelector(".contenedor-buscador");
        this.btnAbrir = this.shadowRoot.getElementById("btn-abrir");
        this.background = this.shadowRoot.querySelector(".background");

        // Lógica de eventos
        this.inputBuscador.addEventListener("keyup", () => {
            if (this.inputBuscador.value.length > 0) {
                this.equisInput.style.display = "block";
            } else {
                this.equisInput.style.display = "none";
            }
        });

        this.equisInput.addEventListener("click", () => {
            this.inputBuscador.value = "";
            this.equisInput.style.display = "none";
        });

        this.btnCerrar.addEventListener("click", () => {
            this.buscador.style.display = "none";
            this.background.style.display = "none";
        });

        this.btnAbrir.addEventListener("click", () => {
            this.buscador.style.display = "flex";
            this.background.style.display = "block";
        });

        this.background.addEventListener("click", () => {
            this.buscador.style.display = "none";
            this.background.style.display = "none";
        });
    }
}

// Definir el Custom Element
customElements.define('buscador-component', BuscadorComponent);
