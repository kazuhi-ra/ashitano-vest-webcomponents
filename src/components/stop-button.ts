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
        .container {
          display: block;
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
