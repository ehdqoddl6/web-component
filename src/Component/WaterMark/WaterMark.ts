
export default class WaterMark extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        const wrapper = document.createElement("div");
        const bg = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='100px' width='100px'>" +
            "<text transform='translate(20, 100) rotate(-45)' fill='rgb(245,45,45)' font-size='20' >" + 'watermark' + "</text></svg>\")";
        wrapper.style.backgroundImage = bg

        wrapper.style.height = '500px';
        wrapper.style.widows = '500px';
        this.shadowRoot?.appendChild(wrapper)
    }
}