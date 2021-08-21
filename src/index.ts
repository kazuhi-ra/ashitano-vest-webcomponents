import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('ashitano-vest')
export class AshitanoVest extends LitElement {
  @property({ type: String })
  static get styles() {
    return css`
      .container {
        display: block;
      }
    `
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
