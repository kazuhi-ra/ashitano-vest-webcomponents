import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { normalizeCss } from './utils/normalizeCss'

@customElement('ashitano-vest')
export class AshitanoVest extends LitElement {
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

  render() {
    return html`
      <div>
        <div>yo</div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ashitano-vest': AshitanoVest
  }
}
