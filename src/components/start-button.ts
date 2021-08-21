import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { normalizeCss } from '../utils/normalizeCss'

@customElement('start-button')
export class StartButton extends LitElement {
  @property({ type: Boolean })
  disabled: boolean = false

  static get styles() {
    return [
      normalizeCss,
      css`
        .start-button {
          color: #dedede;
          cursor: pointer;
          width: 260px;
          height: 38px;
          background-color: #3498db;
          box-shadow: 0 4px 0 #2880b9;
          border-radius: 8px;
          line-height: 38px;
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          user-select: none;
          margin: 0 auto;
          border: none;
          font-family: Arial;
        }
      `,
    ]
  }

  private clickHandler = () => {
    this.dispatchEvent(
      new CustomEvent('start', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <button
        class="start-button"
        .disabled=${this.disabled}
        @click=${this.clickHandler}
      >
        START
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'start-button': StartButton
  }
}
