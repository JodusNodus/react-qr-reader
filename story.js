import React, { Component } from 'react'
import { storiesOf, action } from '@storybook/react'
import Reader from './lib'

class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { facingMode: 'user', delay: 500 }
  }
  render() {
    const { selectFacingMode, selectDelay, legacyMode } = this.props

    return (
      <div style={{ width: '400px', margin: 'auto' }}>
        {
          selectFacingMode && (
              <select
                onChange={e => this.setState({ facingMode: e.target.value })}
              >
                <option value="user">User</option>
                <option value="environment">Environment</option>
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
          onError={action('Error')}
          onScan={action('Scan')}
          onLoad={action('Load')}
          onImageLoad={action('ImageLoad')}
          ref="reader"
          facingMode={this.state.facingMode}
          legacyMode={legacyMode}
          maxImageSize={1000}
          delay={this.state.delay}
          className="reader-container"
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
