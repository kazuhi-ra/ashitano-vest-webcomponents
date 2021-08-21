import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { vests } from '../utils/images'
import { normalizeCss } from '../utils/normalizeCss'

@customElement('kazuhira-vest')
export class KazuhiraVest extends LitElement {
  @property({ type: Boolean })
  spin: boolean = false

  @state()
  index: number = Math.floor(Math.random() * vests.length)

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
        .container {
          display: block;
        }
      `,
    ]
  }

  private vestSrc = (index: number) => vests[index]

  private onSpinStarted = (): void => {
    this.timerId = setInterval(() => {
      const vestsLength = Math.floor(Math.random() * vests.length)
      this.index = vestsLength
    }, 20)
  }

  private onSpinStopped = (timerId: NodeJS.Timer): void => {
    this.spin = false
    clearInterval(timerId)
    this.timerId = null

    this.dispatchEvent(
      new CustomEvent('index', {
        detail: { index: this.index, part: 'vest' },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <img
        src=${this.vestSrc(this.index)}
        alt="ベストの画像"
        width="270"
        height="135"
        style="display: block;"
      />
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kazuhira-vest': KazuhiraVest
  }
}
