import { html } from 'lit';
export default {
  title: 'water-mark',
  component: 'water-mark'
}

export const myElement = () => html`<style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
    <water-mark>
      <div style="width: 100%;height: 100%"></div>
    </water-mark>
  </div> `;
