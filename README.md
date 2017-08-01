[![npm version](https://badge.fury.io/js/react-qr-reader.svg)](https://badge.fury.io/js/react-qr-reader)

## Introduction
A [React](https://facebook.github.io/react/) component for reading QR codes from the webcam. It uses the WebRTC standards for reading webcam data and [jsQR](https://github.com/cozmo/jsQR) is used for detecting QR codes in that data. To optimise the speed and experience, a web-worker is used to offload the heavy QR code algorithm on a separate process. The web worker is inlined and loaded on creation of the component.

## Demo
[thomasbilliet.com/react-qr-reader](https://thomasbilliet.com/react-qr-reader)

## Known Issues
- Due to browser implementations the camera can only be accessed over https or localhost.
- Not compatible with macOS/iOS Safari. Use `legacyMode` to support these platforms.
- In Firefox a prompt will be shown to the user asking which camera to use, so `facingMode` will not affect it.

## Install
`npm install --save react-qr-reader`

## Example

```js
import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class Test extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
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
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}
```

## Props

**onScan**

Type: `function`, Required, Argument: `result`

Scan event handler. Called every scan with the decoded value or `null` if no QR code was found.

**onError**

Type: `function`, Required, Argument: `error`

Function to call when an error occurs such as:
- Not supported platform
- The lack of available devices

**onLoad**

Type: `function`, Optional

Called when the component is ready for use.

**onImageLoad**

Type: `function`, Optional, Argument: React img onLoad event

Called when the image in legacyMode is loaded.

**delay**

Type: `number`, Optional, Default: `500`

The delay between scans in milliseconds. To disable the interval pass in `false`.

**facingMode**

Type: `string`, Optional

Specify which camera direction should be used (if available). Options: `front` and `rear`.

**legacyMode**

Type: `boolean`, Optional, Default: `false`.

If the device does not allow camera access (e.g. IOS Browsers, Safari) you can enable legacyMode to allow the user to take a picture (On a mobile device) or use an existing one. To trigger the image dialog just call the method `openImageDialog` from the parent component. **Warning** You must call the method from a user action (eg. click event on some element).

**maxImageSize**

Type: `number`, Optional, Default: `1500`.

If `legacyMode` is active then the image will be downscaled to the given value while keepings its aspect ratio. Allowing larger images will increase the accuracy but it will also slow down the processing time.

**style**

Type: `object`, Optional

Styling for the preview element. This will be a `video` or an `img` when `legacymode` is `true`. **Warning** The preview will keep its aspect ratio, to disable this set the CSS property [objectFit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) to `fill`.

**className**

Type: `string`, Optional

ClassName for the container element.

**chooseDeviceId**

Type: `function`, Optional, Arguments: (1) video devices matching `facingMode`, (2) all video devices

Called when choosing which device to use for scanning. By default chooses the first video device matching `facingMode`, if no devices match the first video device found is choosen.

## Dev

### Install dependencies
`npm install`

### Build
`npm run build`

### Demo
`npm run storybook`

### Test
`npm test`

### Linting
`npm run lint`

## Tested platforms
- Chrome 56 and Firefox 53 on macOs 10.12
- Chrome 55 and Firefox 50 on Android 6.0.1

## License
The MIT License (MIT)

Copyright (c) 2017 Thomas Billiet

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
