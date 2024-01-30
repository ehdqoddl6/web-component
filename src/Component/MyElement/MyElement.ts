export default class MyElement extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        console.log('connectedCallback');
    }
}