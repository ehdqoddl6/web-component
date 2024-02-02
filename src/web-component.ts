import MyElement from "./Component/MyElement/MyElement";
import WaterMark from "./Component/WaterMark/WaterMark";

console.log('Register Web Component');

window.customElements.define('my-element', MyElement);
window.customElements.define('water-mark', WaterMark);