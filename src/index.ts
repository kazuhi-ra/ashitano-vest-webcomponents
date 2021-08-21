import { css, html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import { Part } from './components/stop-button'
import { normalizeCss } from './utils/normalizeCss'

import './components/kazuhira-head'
import './components/kazuhira-vest'
import './components/kazuhira-pants'
import './components/start-button'
import './components/stop-button'

@customElement('ashitano-vest')
export class AshitanoVest extends LitElement {
  @state()
  _isHeadSpinning = false

  @state()
  _isVestSpinning = false

  @state()
  _isPantsSpinning = false

  @state()
  _headIndex = 0

  @state()
  _vestIndex = 0

  @state()
  _pantsIndex = 0

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

  private onStart = () => {
    this._isHeadSpinning = true
    this._isVestSpinning = true
    this._isPantsSpinning = true
  }

  private onStop = (event: CustomEvent<Part>) => {
    const part = event.detail

    switch (part) {
      case 'head':
        this._isHeadSpinning = false
        break
      case 'vest':
        this._isVestSpinning = false
        break
      case 'pants':
        this._isPantsSpinning = false
        break
    }

    if (this.isAllStopped()) {
      this.stopAll()
    }
  }

  private setIndex = (event: CustomEvent<{ index: number; part: string }>) => {
    const { index, part } = event.detail

    switch (part) {
      case 'head':
        this._headIndex = index
        break
      case 'vest':
        this._vestIndex = index
        break
      case 'pants':
        this._pantsIndex = index
        break
    }
  }

  private isAllStopped = () =>
    !(this._isHeadSpinning || this._isVestSpinning || this._isPantsSpinning)

  private stopAll = (): void => {
    this._isHeadSpinning = false
    this._isVestSpinning = false
    this._isPantsSpinning = false
  }

  render() {
    return html`
      <div @start=${this.onStart} @stop=${this.onStop} @index=${this.setIndex}>
        <div>yo</div>
        <kazuhira-head .spin=${this._isHeadSpinning}></kazuhira-head>
        <kazuhira-vest .spin=${this._isVestSpinning}></kazuhira-vest>
        <kazuhira-pants .spin=${this._isPantsSpinning}></kazuhira-pants>
        <start-button .disabled=${!this.isAllStopped()}></start-button>
        <stop-button
          .disabled=${!this._isHeadSpinning}
          part="head"
        ></stop-button>
        <stop-button
          .disabled=${!this._isVestSpinning}
          part="vest"
        ></stop-button>
        <stop-button
          .disabled=${!this._isPantsSpinning}
          part="pants"
        ></stop-button>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ashitano-vest': AshitanoVest
  }
}
