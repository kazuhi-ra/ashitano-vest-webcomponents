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
    this.onSpinStopped()
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

  private onSpinStopped = (): void => {
    if (!this.spin && !!this.timerId) {
      this.spin = false
      clearInterval(this.timerId)
      this.timerId = null
    }
  }

  render() {
    return html` <img src=${this.headSrc(this.index)} /> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kazuhira-head': KazuhiraHead
  }
}
