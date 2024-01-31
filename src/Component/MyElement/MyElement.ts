export default class MyElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        console.log('connectedCallback');
        this.attachShadow({ mode: "open" }); // 'this.shadowRoot'을 설정하고 반환합니다
        const wrapper = document.createElement("span");
        wrapper.innerHTML = 'my element';
        this.shadowRoot?.appendChild(wrapper)
    }
}