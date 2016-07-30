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
    const { facingMode, select } = this.props

    const previewStyle = {
      objectFit: 'fill',
      height: 240,
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
.add('facingMode select', () => (
  <Wrapper select={true}/>
))
