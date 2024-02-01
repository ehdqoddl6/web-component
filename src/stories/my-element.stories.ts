import { html } from 'lit';
export default {
  title: 'my-element',
  component: 'my-element'
}

export const myElement = () => html`<style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
    <my-element></my-element>
  </div> `;
