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

  private pantsSrc = (index: number) => pants[index]

  private onSpinStarted = (): void => {
    this.timerId = setInterval(() => {
      const pantssLength = Math.floor(Math.random() * pants.length)
      this.index = pantssLength
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
    return html` <img src=${this.pantsSrc(this.index)} /> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kazuhira-pants': KazuhiraPants
  }
}
