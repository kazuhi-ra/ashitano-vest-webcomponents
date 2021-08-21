import { css, html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import { Part } from './components/stop-button'
import { normalizeCss } from './utils/normalizeCss'

import './components/kazuhira-head'
import './components/kazuhira-vest'
import './components/kazuhira-pants'
import './components/start-button'
import './components/stop-button'
import './components/once-again-button'
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
        .header {
          color: #fff;
          font-size: 19px;
          font-weight: 500;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgb(23, 34, 59);
          font-family: Helvetica Neue, Helvetica, Arial, 游ゴシック体, Yu Gothic,
            YuGothic, Hiragino Kaku Gothic ProN, Meiryo, sans-serif;
        }
        .container {
          width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-image: url(https://next-vest.kazuhira.dev/images/renga2.png);
        }
        .image-wrapper {
          display: flex;
          flex-direction: column;
          margin-top: 24px;
        }
        .stop-button-wrapper {
          width: 230px;
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
        }
        .bottom-button-wrapper {
          width: 258px;
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          margin-bottom: 18px;
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

      this._numberOfPlay++
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
      <div class="header">
        <div>あしたのベスト ポータブル</div>
      </div>
      <div
        class="container"
        @start=${this.onStart}
        @stop=${this.onStop}
        @index=${this.setIndex}
      >
        <div class="image-wrapper">
          <kazuhira-head .spin=${this._isHeadSpinning}></kazuhira-head>
          <kazuhira-vest .spin=${this._isVestSpinning}></kazuhira-vest>
          <kazuhira-pants .spin=${this._isPantsSpinning}></kazuhira-pants>
        </div>

        <div class="stop-button-wrapper">
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

        <div class="bottom-button-wrapper">
          ${this._numberOfPlay === 0
            ? html`<start-button
                .disabled=${!this.isAllStopped()}
              ></start-button>`
            : html` <once-again-button
                  .disabled=${!this.isAllStopped()}
                ></once-again-button>
                <tweet-button
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
