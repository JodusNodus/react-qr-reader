[![npm version](https://badge.fury.io/js/react-qr-reader.svg)](https://badge.fury.io/js/react-qr-reader)

## Introduction

A [React](https://facebook.github.io/react/) component for reading QR codes from the webcam. It uses the WebRTC standards for reading webcam data and [jsQR](https://github.com/cozmo/jsQR) is used for detecting QR codes in that data. To optimise the speed and experience, a web-worker is used to offload the heavy QR code algorithm on a separate process. The web worker is inlined and loaded on creation of the component.

## Demo

[https://jodusnodus.github.io/react-qr-reader](https://jodusnodus.github.io/react-qr-reader)

## Known Issues

* Server side rendering won't work so only require the component when rendering in a browser environment.
* Due to browser implementations the camera can only be accessed over https or localhost.
* In Firefox a prompt will be shown to the user asking which camera to use, so `facingMode` will not affect it.
* On IOS 11 it is only supported on Safari and not on Chrome or Firefox due to Apple making the API not available to 3rd party browsers.

## Install

`npm install --save react-qr-reader`

## Example

```js
import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class Test extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

```

## Props

### Events

| Prop        | Argument         | Description                                                                                                     |
| ----------- | ---------------- | --------------------------------------------------------------------------------------------------------------- |
| onScan      | `result`         | Scan event handler. Called every scan with the decoded value or `null` if no QR code was found.                 |
| onError     | `Error`          | Called when an error occurs.                                                                                    |
| onLoad      | `object`         | Called when the component is ready for use. Object properties are `mirrorVideo`: boolean, `streamLabel`: string |
| onImageLoad | img onLoad event | Called when the image in legacyMode is loaded.                                                                  |

### Options

| Prop           | Type                    | Default       | Description                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | ----------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| delay          | number or `false`       | `500`         | The delay between scans in milliseconds. To disable the interval pass in `false`.                                                                                                                                                                                                                                                                                          |
| facingMode     | `user` or `environment` | `environment` | Specify which camera should be used (if available).                                                                                                                                                                                                                                                                                                                        |
| resolution     | number                  | `600`         | The resolution of the video (or image in legacyMode). Larger resolution will increase the accuracy but it will also slow down the processing time.                                                                                                                                                                                                                         |
| style          | a valid React style     | none          | Styling for the container element. **Warning** The preview will always keep its 1:1 aspect ratio.                                                                                                                                                                                                                                                                          |
| className      | string                  | none          | ClassName for the container element.                                                                                                                                                                                                                                                                                                                                       |
| showViewFinder | boolean                 | `true`        | Show or hide the build in view finder. See demo                                                                                                                                                                                                                                                                                                                            |
| constraints    | object                  | `null`          | Use custom camera constraints that the override default behavior. [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints)                                                                                                                                                                                                                                                                                                                            |
| legacyMode     | boolean                 | `false`       | If the device does not allow camera access (e.g. IOS Browsers, Safari) you can enable legacyMode to allow the user to take a picture (On a mobile device) or use an existing one. To trigger the image dialog just call the method `openImageDialog` from the parent component. **Warning** You must call the method from a user action (eg. click event on some element). |

## Dev

### Install dependencies

`npm install`

### Build

`npm run build`

### Demo

`npm run storybook`

### Linting

`npm run lint`

## Tested platforms

* Chrome macOs & Android
* Firefox macOs & Android
* Safari macOs & IOS

## License

The MIT License (MIT)

Copyright (c) 2018 Thomas Billiet

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
