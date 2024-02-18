import MyElement from "./Component/MyElement/MyElement";
import WaterMark from "./Component/WaterMark/WaterMark";
import DataSource from "./Component/DateSource/DataSource";

console.log('Register Web Component');

window.customElements.define('my-element', MyElement);
window.customElements.define('water-mark', WaterMark);

export default {
    DataSource: DataSource,
}

window.DataSource = DataSource;
console.log('DataSource regist');

declare global {
    interface Window {
        DataSource: typeof DataSource;
    }
}