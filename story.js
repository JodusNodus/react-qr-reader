import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Reader from './lib'

class Wrapper extends Component {
  constructor(props){
    super(props)
    this.state = {
      facingMode: 'front',
      interval: 1000,
    }
  }
  render(){
    const { selectFacingMode, selectInterval, legacyMode } = this.props

    const previewStyle = {
      width: 320,
    }
    return(
      <div>
        {selectFacingMode && (
          <select onChange={e => this.setState({
              facingMode: e.target.value,
            })}>
            <option value="front">Front</option>
            <option value="rear">Rear</option>
          </select>
        )}
        {selectInterval && (
          <div>
            <button
              onClick={() => this.setState({
                interval: false,
              })}
              >Disable Interval</button>
            <input
              placeholder="Interval in ms"
              type="number"
              value={this.state.interval}
              onChange={e => this.setState({
                interval: parseInt(e.target.value),
              })}
              />
          </div>
        )}
        <Reader
          previewStyle={previewStyle}
          handleError={action('Error')}
          handleScan={action('Scan')}
          handleImageNotRecognized={action('Image Not Recognised')}
          ref="reader"
          facingMode={this.state.facingMode}
          legacyMode={legacyMode}
          interval={this.state.interval}
          />
        {legacyMode && <button onClick={() => this.refs.reader.openImageDialog()}>Open Image Dialog</button>}
      </div>
    )
  }
}

storiesOf('QR Reader', module)
.add('facingMode not specified', () => (
  <Wrapper/>
))
.add('choose facingmode', () => (
  <Wrapper selectFacingMode />
))
.add('legacy mode', () => (
  <Wrapper legacyMode={true}/>
))
.add('choose interval', () => (
  <Wrapper selectInterval />
))
