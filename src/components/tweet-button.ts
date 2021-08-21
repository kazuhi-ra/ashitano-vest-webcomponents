import { css, html, LitElement, noChange } from 'lit'
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
      <button
        style="color: rgb(222, 222, 222); cursor: pointer; width: 120px; height: 36px; background-color: rgb(0, 172, 238); box-shadow: rgb(52 136 191) 0px 4px 0px; border-radius: 8px; line-height: 36px; text-align: center; font-size: 14px; font-weight: bold; user-select: none; margin: 0px auto; border: none;"
        .disabled=${this.disabled}
      >
        ${this.disabled
          ? html` これにする `
          : html`<a
              style="text-decoration: none; color: #fff; font-family: Arial;"
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
