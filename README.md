[![npm version](https://badge.fury.io/js/react-qr-reader2.svg)](https://badge.fury.io/js/react-qr-reader2)
Biggest change is in onLoad Prop arguments. Upgrade packages.

## Introduction

This is fork from [react-qr-reader](https://github.com/JodusNodus/react-qr-reader) which has issues fixed mostly.

A [React](https://facebook.github.io/react/) component for reading QR codes from the webcam. It uses the WebRTC standards for reading webcam data and [jsQR](https://github.com/cozmo/jsQR) is used for detecting QR codes in that data. To optimise the speed and experience, a web-worker is used to offload the heavy QR code algorithm on a separate process. The web worker is inlined and loaded on creation of the component.

## Known Issues

* Server side rendering won't work so only require the componont when rendering in a browser environment.
* Due to browser implementations the camera can only be accessed over https or localhost.
* In Firefox a prompt will be shown to the user asking which camera to use, so `facingMode` will not affect it.
* On IOS 11 it is only supported on Safari and not on Chrome or Firefox due to Apple making the API not available to 3rd party browsers.
* Camera wont open in iOS PWA Apps.

## Install

`npm install --save react-qr-reader2`

## Example

```js
import React, { Component } from 'react'
import QrReader from 'react-qr-reader2'

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
| onLoad      | `object`         | Called when the component is ready for use. Object properties are `mirrorVideo`: boolean, `streamTrack`: object |
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

* Chrome Android
* Firefox Android
* Safari IOS
