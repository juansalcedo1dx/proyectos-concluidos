
class VideoToIcon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <div id="video-container">
                <video id="video" autoplay muted>
                    <source src="${this.getAttribute('video-src')}" type="video/mp4">
                    Tu navegador no soporta la etiqueta de video.
                </video>
            </div>
            <div class="icono">
                <div id="icon-container" class="hidden">
                    <div id="icon"></div>
                </div>
            </div>
            <style>
                /* Estilos para el video */
                #video-container {
                    position: fixed; /* Cambié esto a fixed */
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 9999; /* Asegúrate de que el video esté por encima de otros elementos */
                }

                video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 1s ease-in-out;
                    z-index: 9999; /* Asegura que el video esté encima de todo */
                }

                /* Estilos para el icono y su contenedor */
                .icono {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2;
                }
                #icon-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.5s ease-out;
                }
                #icon {
                    width: 50px;
                    height: 50px;
                    background-color: #3498db;
                    border-radius: 50%;
                    transition: all 0.5s ease-in-out;
                    background-size: cover;
                    background-position: center;
                }
                .hidden {
                    display: none;
                }
            </style>
        `;
        this.video = this.shadowRoot.getElementById('video');
        this.iconContainer = this.shadowRoot.getElementById('icon-container');
        this.icon = this.shadowRoot.getElementById('icon');
        
        this.video.addEventListener('ended', this.onVideoEnded.bind(this));
    }

    onVideoEnded() {
        // Captura un fotograma del video
        const canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(this.video, 0, 0, canvas.width, canvas.height);

        // Establece la imagen capturada como fondo del icono
        const frameImage = canvas.toDataURL('image/png');
        this.icon.style.backgroundImage = `url(${frameImage})`;

        // Inicia la animación de reducción del video y lo mueve a la esquina superior derecha
        this.video.style.transition = 'all 1s ease-in-out';
        this.video.style.transform = 'scale(0.05) translate(80vw, -80vh)';
        this.video.style.opacity = 0;
        this.video.style.borderRadius = '50%';

        // Después de que el video se haya reducido y desaparezca
        setTimeout(() => {
            const videoContainer = this.shadowRoot.getElementById('video-container');
            videoContainer.style.position = 'relative';

            this.video.style.display = 'none';
            this.iconContainer.classList.remove('hidden');
            this.iconContainer.style.opacity = 1;

            setTimeout(() => {
                this.icon.style.width = '70px';
                this.icon.style.height = '70px';
            }, 50);
        }, 1000);
    }
}

customElements.define('video-to-icon', VideoToIcon);


