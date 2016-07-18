# react-qr-reader
A react component for reading QR codes from the webcam.

[Demo](https://jodusnodus.github.io/react-qr-reader)

## Install
`npm install react-qr-reader`

## Example

```
import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class Test extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: 'No result',
    }
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return(
      <div>
        <Reader
          previewStyle={previewStyle}
          handleError={this.handleError}
          handleScan={this.handleScan.bind(this)}/>
        <p>{this.state.result}</p>
      </div>
    )
  }
}
```

## Props

**handleScan**

Type: `function`, Required, Argument: `result`

The function to call when a scan is succesfull.

**handleError**

Type: `function`, Required, Argument: `error`

The function to call when an error occurs.

**interval**

Type: `number`, Optional, Default: every frame

The interval between scans in milliseconds.

**previewStyle**

Type: `object`, Optional

Styling for the preview element. **Warning** The preview will keep its aspect ratio, to disable this set the CSS property [objectFit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) to `fill`.


## Dev

Install depencies

`npm install`

Build

`npm run build`

or on file change

`npm run build:watch`

Start hot-reloading web-server (port: 9001)

`npm run storybook`

Linting

`npm run lint`
