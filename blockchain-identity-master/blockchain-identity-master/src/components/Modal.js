import React, { Component } from 'react'
import ReactDOM from 'react-dom'

function freezeVp(e) {
  e.preventDefault()
}

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      o: 1,
      co: 1,
      scale: 1,
      rotate: 0,
      anim: 'is-entering'
    }
  }

  componentDidMount() {
    this.portal = document.createElement('div')
    document.body.appendChild(this.portal)
    document.body.className += ' pl-modal-open'
    document.body.addEventListener('touchmove', freezeVp, false)
    this.renderContent(this.props)

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onClose = this.onClose.bind(this)
    this.doClose = this.doClose.bind(this)

    window.addEventListener('keydown', this.onKeyDown)
    setTimeout(() => {
      if (this.props.onOpen) {
        this.props.onOpen()
      }
      this.setState({ active: true })
    }, 10)
  }

  componentWillUnmount() {
    document.body.className = document.body.className.replace(
      ' pl-modal-open',
      ''
    )
    document.body.removeEventListener('touchmove', freezeVp, false)
    window.removeEventListener('keydown', this.onKeyDown)
    ReactDOM.unmountComponentAtNode(this.portal)
    document.body.removeChild(this.portal)
  }

  render() {
    return null
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.shouldClose && nextProps.shouldClose) {
      this.doClose()
    }
  }

  componentDidUpdate() {
    this.renderContent(this.props)
  }

  renderContent() {
    var content = (
      <>
        <div
          className={`pl-modal-bg ${this.state.anim}${
            this.state.active ? ' is-active' : ''
          }`}
        />
        <div className="pl-modal" onMouseDown={e => this.onClose(e)}>
          <div className="pl-modal-table">
            <div
              className={`pl-modal-cell ${this.state.anim}${
                this.state.active ? ' is-active' : ''
              }`}
            >
              <div
                className={`pl-modal-content ${this.props.className}`}
                style={{ ...this.props.style }}
              >
                {!this.props.closeBtn ? null : (
                  <a
                    href="#"
                    className="close"
                    onClick={e => {
                      e.preventDefault()
                      this.doClose()
                    }}
                  >
                    &times;
                  </a>
                )}
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </>
    )

    ReactDOM.render(content, this.portal)
  }

  onClose(e) {
    if (
      this.props.onClose &&
      String(e.target.className).indexOf('pl-modal-cell') >= 0
    ) {
      this.doClose()
    }
  }

  doClose() {
    this.setState({ anim: 'is-leaving' })
    setTimeout(() => {
      this.setState({
        anim: `is-leaving is-${this.props.submitted ? 'submitted' : 'closed'}`
      })
    }, 10)
    this.onCloseTimeout = setTimeout(() => this.props.onClose(), 500)
  }

  onKeyDown(e) {
    if (e.keyCode === 27) {
      // Esc
      this.doClose()
    }
    if (e.keyCode === 13 && this.props.onPressEnter) {
      // Enter
      this.props.onPressEnter()
    }
  }
}

require('react-styl')(`
  .pl-modal-open
    overflow: hidden
    touch-action: none
  .pl-modal
    position: fixed
    z-index: 2000
    top: 0
    right: 0
    bottom: 0
    left: 0
    overflow-y: auto
    -webkit-transform: translate3d(0, 0, 0)
    .pl-modal-table
      display: table;
      table-layout: fixed;
      height: 100%;
      width: 100%;
      .pl-modal-cell
        display: table-cell;
        height: 100%;
        width: 100%;
        vertical-align: middle;
        padding: 50px;
        .pl-modal-content
          position: relative;
          overflow: hidden;
          border-radius: 2px;
          margin-left: auto;
          margin-right: auto;
          max-width: 520px;
          background-color: #fff

  .pl-modal-cell
      position: relative;
      -webkit-transition-property: opacity,-webkit-transform;
      transition-property: opacity,-webkit-transform;
      transition-property: opacity,transform;
      transition-property: opacity,transform,-webkit-transform

  .pl-modal-cell.is-entering>.pl-modal-content
      opacity: 0;
      -webkit-transform: translateY(50px) scale(.95);
      transform: translateY(50px) scale(.95)

  .pl-modal-cell.is-active.is-entering>.pl-modal-content
      opacity: 1;
      -webkit-transform: translateY(0) scale(1);
      transform: translateY(0) scale(1);
      -webkit-transition-timing-function: cubic-bezier(.15,1.45,.55,1);
      transition-timing-function: cubic-bezier(.15,1.45,.55,1);
      -webkit-transition-duration: .4s;
      transition-duration: .4s

  .pl-modal-cell.is-leaving.is-closed>.pl-modal-content
      opacity: 0;
      -webkit-transform: translateY(50px) scale(.95);
      transform: translateY(50px) scale(.95);
      -webkit-transition-timing-function: ease-in-out;
      transition-timing-function: ease-in-out;
      -webkit-transition-duration: .2s;
      transition-duration: .2s

  .pl-modal-cell.is-leaving.is-submitted>.pl-modal-content
      opacity: 0;
      -webkit-transform: translateY(-300px) translateZ(-70px) rotateX(10deg);
      transform: translateY(-300px) translateZ(-70px) rotateX(10deg);
      -webkit-transition-property: opacity,-webkit-transform;
      transition-property: opacity,-webkit-transform;
      transition-property: opacity,transform;
      transition-property: opacity,transform,-webkit-transform;
      -webkit-transition-timing-function: cubic-bezier(.5,-.33,1,1);
      transition-timing-function: cubic-bezier(.5,-.33,1,1);
      -webkit-transition-duration: .2s;
      transition-duration: .2s

  .pl-modal
      -webkit-transition-property: opacity;
      transition-property: opacity

  .pl-modal-bg
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0
      touch-action: none

  .pl-modal-bg
      background: rgba(0,0,0,.6);
      z-index: 1

  .pl-modal-bg.is-entering
      opacity: 0;
      -webkit-transition-duration: .2s;
      transition-duration: .2s;
      -webkit-transition-timing-function: ease;
      transition-timing-function: ease

  .pl-modal-bg.is-active.is-entering
      opacity: 1

  .pl-modal-bg.is-leaving
      opacity: 1;
      -webkit-transition-delay: .2s;
      transition-delay: .2s;
      -webkit-transition-duration: .2s;
      transition-duration: .2s;
      -webkit-transition-timing-function: ease-in-out;
      transition-timing-function: ease-in-out

  .pl-modal-bg.is-active.is-leaving
      opacity: 0

  .pl-modal-content
      border-radius: 6px;
      background-color: #f5f5f7;
      box-shadow: 0 12px 30px 0 rgba(0,0,0,.5),inset 0 1px 0 0 hsla(0,0%,100%,.65);
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden

`)
