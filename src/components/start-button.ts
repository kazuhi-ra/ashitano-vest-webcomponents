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
      <button .disabled=${this.disabled} @click=${this.clickHandler}>
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
