import {SearchInput} from './componentes.js/buscador.js'
import {HamburgerMenu} from './componentes.js/menuHamburgueza.js'
import {AwesomeWebsiteBanner} from './componentes.js/publicidad.js'
import {CustomCard} from './componentes.js/targeta.js'
import {CustomCard2} from './componentes.js/targeta2.js'
import {CustomCard3} from './componentes.js/targeta3.js'
import {CustomCard4} from './componentes.js/targeta4.js'
import './secciones de pagina/header.js'
import './secciones de pagina/hero seccion.js'
import './secciones de pagina/navbar.js'
import './secciones de pagina/seccion 1.js'
import './secciones de pagina/carrousel.js'
import './secciones de pagina/publicidad.js'
import './seccion3.js'


//                       buscador
customElements.define('search-input', SearchInput);

//                     menuHamburgueza
customElements.define('hamburger-menu', HamburgerMenu);

//                          publicidad
customElements.define('awesome-website-banner', AwesomeWebsiteBanner);

//                       targeta
customElements.define('custom-card', CustomCard);

//                       targeta2
customElements.define('custom-card2', CustomCard2);

//                       targeta3
customElements.define('custom-card3', CustomCard3);

//                       targeta4
customElements.define('custom-card4', CustomCard4);