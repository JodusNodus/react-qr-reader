<p align="center">
  <img al width="300" height="380" alt="Lib logo" src="./qr-reader-logo.png" style="width: 300px !important;" />
</p>

# React QR Reader [![npm version](https://badge.fury.io/js/%40blackbox-vision%2Freact-qr-reader.svg)](https://badge.fury.io/js/%40blackbox-vision%2Freact-qr-reader) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![Known Vulnerabilities](https://snyk.io/test/github/blackboxvision/react-qr-reader/badge.svg)](https://snyk.io/test/github/blackboxvision/react-qr-reader)

:rocket: React QR Reader component. Check out the [demo](https://codesandbox.io/s/qrreader-u2mcu).

## Table of contents

- [Use Case](#use-case)
- [Compatibility](#compatibility)
- [Supporting Older Browsers](#supporting-older-browsers)
- [Installation](#installation)
  - [NPM](#npm)
  - [YARN](#yarn)
- [Example Usage](#example-usage)
- [QrReader API](#component-api)
- [Issues](#issues)
- [Contributing](#contributing)
- [License](#license)

## Use Case

You need a component for Scanning QR codes from a web browser based app.

## Compatibility

This component has been tested in the following browsers:

- Chrome Mac OS & Android
- Firefox Mac OS & Android
- Safari Mac OS & IOS

Since this library does internal use of hooks you need `React >= 16.8.0`.

## Supporting Older Browsers

This library uses the `WebRTC APIs` supported in [modern browsers](https://caniuse.com/#search=webrtc).

If you're supporting older browers you'll need to perform the following steps:

1. Install `webrtc-adapter` library:

```bash
npm i webrtc-adapter
```

2. Import the shim from the root of your app:

```javascript
import 'webrtc-adapter';
```

## Installation

You can install this library via NPM or YARN.

### NPM

```bash
npm i @blackbox-vision/react-qr-reader
```

### YARN

```bash
yarn add @blackbox-vision/react-qr-reader
```

## Example Usage

After reading and performing the previous steps, you should be able to import the library and use it like in this example:

```javascript
import React, { useState } from 'react';
import { QrReader } from '@blackbox-vision/react-qr-reader';

const Test = (props) => {
  const [data, setData] = useState('No result');

  const handleScan = (data) => {
    if (data) {
      setData(data);
    }
  };

  const handleError = (err) => console.error(err);

  return (
    <>
      <QrReader
        debug={(data, type) => {
          console.info('type', type);
          console.info('data', data);
        }}
        onScan={handleScan}
        onError={handleError}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
};
```

## Component API

The `QrReader` component has the following props:

| Properties  | Types                   | Default Value | Description                                                                                                                                                       |
| ----------- | ----------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| facingMode  | `user` or `environment` | `environment` | Specify which camera should be used (if available).                                                                                                               |
| resolution  | number                  | `600`         | The resolution of the video (or image in legacyMode). Larger resolution will increase the accuracy but it will also slow down the processing time.                |
| style       | a valid React style     | none          | Styling for the container element. **Warning** The preview will always keep its 1:1 aspect ratio.                                                                 |
| className   | string                  | none          | ClassName for the container element.                                                                                                                              |
| constraints | object                  | `null`        | Use custom camera constraints that the override default behavior. [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints) |
| debug       | function                | `null`        | Enable debug logs to see what's going on inside the component                                                                                                     |
| ViewFinder  | component               | -             | ViewFinder component to rendering over the video element                                                                                                          |
| onScan      | `decoded`               | none          | Scan event handler. Called every scan with the decoded value or `null` if no QR code was found                                                                    |
| onError     | `err`                   | none          | Called when an error occurs                                                                                                                                       |
| onLoad      | `stream`                | none          | Called when the component is ready for use                                                                                                                        |

## Issues

Please, open an [issue](https://github.com/BlackBoxVision/react-qr-reader/issues) following one of the issues templates. We will do our best to fix them.

## Contributing

If you want to contribute to this project see [contributing](https://github.com/BlackBoxVision/react-qr-reader/blob/master/CONTRIBUTING.md) for more information.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/react-qr-reader/blob/master/LICENSE) for more information.
