import React, { Component } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Reader from './'

class Wrapper extends Component {
  componentDidMount(){
    console.log(this.refs.hello.refs)
  }
  render(){
    return(
      <Reader
        previewHeight={240}
        previewWidth={320}
        handleError={action('Scan')}
        handleScan={action('Scan')}
        ref="hello"
        />
    )
  }
}

storiesOf('QR Reader', module)
.add('with camera', () => (
  <Wrapper/>
))
