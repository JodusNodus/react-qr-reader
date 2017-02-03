import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Reader from './lib'

class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { facingMode: 'front', delay: 1000 }
  }
  render() {
    const { selectFacingMode, selectDelay, legacyMode } = this.props

    const previewStyle = { width: 320 }
    return (
      <div>
        {
          selectFacingMode && (
              <select
                onChange={e => this.setState({ facingMode: e.target.value })}
              >
                <option value="front">Front</option>
                <option value="rear">Rear</option>
              </select>
            )
        }
        {
          selectDelay && (
              <div>
                <button onClick={() => this.setState({ delay: false })}>
                  Disable Delay
                </button>
                <input
                  placeholder="Delay in ms"
                  type="number"
                  value={this.state.delay}
                  onChange={e =>
                    this.setState({ delay: parseInt(e.target.value) })}
                />
              </div>
            )
        }
        <Reader
          style={previewStyle}
          onError={action('Error')}
          onScan={action('Scan')}
          ref="reader"
          facingMode={this.state.facingMode}
          legacyMode={legacyMode}
          delay={this.state.delay}
        />
        {
          legacyMode && (
              <button onClick={() => this.refs.reader.openImageDialog()}>
                Open Image Dialog
              </button>
            )
        }
      </div>
    )
  }
}

storiesOf('QR Reader', module)
  .add('FacingMode not specified', () => <Wrapper />)
  .add('Choose facingMode', () => <Wrapper selectFacingMode />)
  .add('Legacy mode', () => <Wrapper legacyMode />)
  .add('Choose delay', () => <Wrapper selectDelay />)
