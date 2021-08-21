import { css, html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import { Part } from './components/stop-button'
import { normalizeCss } from './utils/normalizeCss'

import './components/kazuhira-head'
import './components/kazuhira-vest'
import './components/kazuhira-pants'
import './components/start-button'
import './components/stop-button'
import './components/tweet-button'

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

  @state()
  _numberOfPlay = 0

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

    this._numberOfPlay++
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

  private pageId = (): string =>
    `${this._headIndex + 1}${this._vestIndex + 1}${this._pantsIndex + 1}`

  render() {
    return html`
      <div style="height: 46px; background-color: rgb(23, 34, 59);"></div>
      <div
        style="background-color: gray; width: 320px; display: flex; justyfy-content: center; flex-direction: column;align-items: center;"
        @start=${this.onStart}
        @stop=${this.onStop}
        @index=${this.setIndex}
      >
        <div style="display: flex; flex-direction: column; margin-top: 24px;">
          <kazuhira-head .spin=${this._isHeadSpinning}></kazuhira-head>
          <kazuhira-vest .spin=${this._isVestSpinning}></kazuhira-vest>
          <kazuhira-pants .spin=${this._isPantsSpinning}></kazuhira-pants>
        </div>

        <div
          style="width: 240px; display: flex; justify-content: space-between;"
        >
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

        <div>
          <start-button .disabled=${!this.isAllStopped()}></start-button>
          ${this._numberOfPlay === 0
            ? null
            : html`<tweet-button
                .disabled=${!this.isAllStopped()}
                page-id=${this.pageId()}
              ></tweet-button>`}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ashitano-vest': AshitanoVest
  }
}
