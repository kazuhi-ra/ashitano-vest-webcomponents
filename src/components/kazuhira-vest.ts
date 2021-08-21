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

  private vestSrc = (index: number) => vests[index]

  private onSpinStarted = (): void => {
    this.timerId = setInterval(() => {
      const vestsLength = Math.floor(Math.random() * vests.length)
      this.index = vestsLength
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
    return html` <img src=${this.vestSrc(this.index)} /> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kazuhira-vest': KazuhiraVest
  }
}
