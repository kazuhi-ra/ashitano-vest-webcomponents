import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { normalizeCss } from '../utils/normalizeCss'

export type Part = 'head' | 'vest' | 'pants'

@customElement('stop-button')
export class StopButton extends LitElement {
  @property({ type: Boolean })
  disabled: boolean = false

  @property({ type: String })
  part: Part = 'head'

  static get styles() {
    return [
      normalizeCss,
      css`
        .stop-button {
          margin: 0 auto 4px auto;
          cursor: pointer;
          width: 50px;
          height: 45px;
          background-color: #ef454a;
          box-shadow: 0 4px 0 #bb4038;
          border-radius: 26px;
          line-height: 45px;
          text-align: center;
          font-size: 13px;
          color: #fff;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          border: none;
          font-family: Arial;
        }
      `,
    ]
  }

  private clickHandler = (part: Part) => {
    this.dispatchEvent(
      new CustomEvent('stop', {
        detail: part,
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <button
        class="stop-button"
        .disabled=${this.disabled}
        @click=${() => this.clickHandler(this.part)}
      >
        STOP
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stop-button': StopButton
  }
}
