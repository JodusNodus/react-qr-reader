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
        <QrReader
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

Type: `number`, Optional, Default: 500

The interval between scans in milliseconds. To disable the interval pass in `false`.

**previewStyle**

Type: `object`, Optional

Styling for the preview element. **Warning** The preview will keep its aspect ratio, to disable this set the CSS property [objectFit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) to `fill`.

**facingMode**

Type: `string`, Optional, Default: user decides.

Specify which camera should be used (if supported).

Options: `front` and `rear`.

**legacyMode**

Type: `boolean`, Optional, Default: `false`.

If the device does not allow camera access (e.g. IOS Browsers, Safari) you can enable legacyMode to allow the user to take a picture (On a mobile device) or use an existing one. To trigger the image dialog just call the method `openImageDialog` from the parent component. **Warning** You must call the method from a user action (eg. click event on some element).

**maxImageSize**

Type: `number`, Optional, Default: `1500`.

If `legacyMode` is active then the image will be resized if it is larger than the given value. Allowing larger images will increase the accuracy but it will also slow down the processing time.

**handleImageNotRecognized**

Type: `function`, Optional

If `legacyMode` is active then the function is called when no QR code was recognized in the image.

## Dev

Install dependencies

`npm install`

Build

`npm run build`

or on file change

`npm run build:watch`

Start hot-reloading web-server (port: 9001)

`npm run storybook`

Linting

`npm run lint`
