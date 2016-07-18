import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Reader from './'

class Wrapper extends Component {
  render(){
    const previewStyle = {
      objectFit: 'fill',
      height: 240,
      width: 320,
    }

    return(
      <Reader
        previewStyle={previewStyle}
        handleError={action('Error')}
        handleScan={action('Scan')}
        interval={500}
        ref="reader"
        />
    )
  }
}

storiesOf('QR Reader', module)
.add('with camera', () => (
  <Wrapper/>
))
