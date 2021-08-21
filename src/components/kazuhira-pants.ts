import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { pants } from '../utils/images'
import { normalizeCss } from '../utils/normalizeCss'

@customElement('kazuhira-pants')
export class KazuhiraPants extends LitElement {
  @property({ type: Boolean })
  spin: boolean = false

  @state()
  index: number = Math.floor(Math.random() * pants.length)

  timerId: NodeJS.Timer | null = null

  willUpdate = () => {
    if (this.spin && !this.timerId) {
      this.onSpinStarted()
    }
    if (!this.spin && !!this.timerId) {
      this.onSpinStopped(this.timerId)
    }
  }

  static get styles() {
    return [
      normalizeCss,
      css`
        .pants-image {
          display: block;
        }
      `,
    ]
  }

  private pantsSrc = (index: number) => pants[index]

  private onSpinStarted = (): void => {
    this.timerId = setInterval(() => {
      const pantssLength = Math.floor(Math.random() * pants.length)
      this.index = pantssLength
    }, 20)
  }

  private onSpinStopped = (timerId: NodeJS.Timer): void => {
    this.spin = false
    clearInterval(timerId)
    this.timerId = null

    this.dispatchEvent(
      new CustomEvent('index', {
        detail: { index: this.index, part: 'pants' },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <img
        class="pants-image"
        alt="ズボンの写真"
        src=${this.pantsSrc(this.index)}
        width="270"
        height="209"
      />
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kazuhira-pants': KazuhiraPants
  }
}
