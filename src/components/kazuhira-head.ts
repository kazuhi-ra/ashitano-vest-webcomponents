import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { heads } from '../utils/images'
import { normalizeCss } from '../utils/normalizeCss'

@customElement('kazuhira-head')
export class KazuhiraHead extends LitElement {
  @property({ type: Boolean })
  spin: boolean = false

  @state()
  index: number = Math.floor(Math.random() * heads.length)

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

  private headSrc = (index: number) => heads[index]

  private onSpinStarted = (): void => {
    this.timerId = setInterval(() => {
      const headsLength = Math.floor(Math.random() * heads.length)
      this.index = headsLength
    }, 20)
  }

  private onSpinStopped = (timerId: NodeJS.Timer): void => {
    this.spin = false
    clearInterval(timerId)
    this.timerId = null

    this.dispatchEvent(
      new CustomEvent('index', {
        detail: { index: this.index, part: 'head' },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <img
        src=${this.headSrc(this.index)}
        width="270"
        height="108"
        style="display: block;"
      />
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kazuhira-head': KazuhiraHead
  }
}
