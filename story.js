import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Reader from './'

class Wrapper extends Component {
  constructor(props){
    super(props)
    this.state = {
      facingMode: 'front',
    }
  }
  render(){
    const { facingMode, select, legacyMode } = this.props

    const previewStyle = {
      width: 320,
    }
    return(
      <div>
        {select && (
          <select onChange={e => this.setState({
              facingMode: e.target.value,
            })}>
            <option value="front">Front</option>
            <option value="rear">Rear</option>
          </select>
        )}
        <Reader
          previewStyle={previewStyle}
          handleError={action('Error')}
          handleScan={action('Scan')}
          ref="reader"
          facingMode={select ? this.state.facingMode : facingMode}
          legacyMode={legacyMode}
          />
      </div>
    )
  }
}

storiesOf('QR Reader', module)
.add('with front camera', () => (
  <Wrapper facingMode="front"/>
))
.add('with rear camera', () => (
  <Wrapper facingMode="rear"/>
))
.add('facingMode not specified', () => (
  <Wrapper/>
))
.add('facingmode select', () => (
  <Wrapper select={true}/>
))
.add('legacy mode', () => (
  <Wrapper legacyMode={true}/>
))
