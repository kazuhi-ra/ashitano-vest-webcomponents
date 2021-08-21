import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { normalizeCss } from '../utils/normalizeCss'

@customElement('once-again-button')
export class OnceAgainButton extends LitElement {
  @property({ type: Boolean })
  disabled: boolean = false

  static get styles() {
    return [
      normalizeCss,
      css`
        .container {
          display: block;
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
        style="color: #fff; cursor: pointer; width: 120px; height: 36px; background-color: rgb(233, 181, 69); box-shadow: rgb(187 145 55) 0px 4px 0px; border-radius: 8px; line-height: 36px; text-align: center; font-size: 14px; font-weight: bold; user-select: none; margin: 0px auto; border: none;  font-family: Arial;"
        .disabled=${this.disabled}
        @click=${this.clickHandler}
      >
        もう一度
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'once-again-button': OnceAgainButton
  }
}
