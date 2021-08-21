import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { normalizeCss } from '../utils/normalizeCss'

@customElement('tweet-button')
export class TweetButton extends LitElement {
  @property({ type: Boolean })
  disabled: boolean = false

  @property({ type: String })
  'page-id' = ''

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
      <button .disabled=${this.disabled}>
        ${this.disabled
          ? html` これにする `
          : html`<a
              href=${`http://twitter.com/share?url=https://next-vest.kazuhira.dev/vest/${this['page-id']}&text=@kazuhi_ra 次のベストはこれです&hashtags=あしたのベスト`}
              target="_blank"
            >
              これにする
            </a>`}
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tweet-button': TweetButton
  }
}
