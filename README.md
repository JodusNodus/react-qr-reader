<p align="center">
  <img al width="300" height="380" alt="Lib logo" src="./qr-reader-logo.png" style="width: 300px !important;" />
</p>

# React QR Reader [![npm version](https://badge.fury.io/js/%40blackbox-vision%2Freact-qr-reader.svg)](https://badge.fury.io/js/%40blackbox-vision%2Freact-qr-reader) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) [![Known Vulnerabilities](https://snyk.io/test/github/blackboxvision/react-qr-reader/badge.svg)](https://snyk.io/test/github/blackboxvision/react-qr-reader)

:rocket: React QR Reader component. Check out the [demo](https://blackboxvision.github.io/react-qr-reader).

## Table of contents

- [Use Case](#use-case)
- [Compatibility](#compatibility)
- [Installation](#installation)
  - [NPM](#npm)
  - [YARN](#yarn)
- [Example Usage](#example-usage)
- [QrReader API](#component-api)
- [Browser support](#browser-support)
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

## Installation

You can install this library via NPM or YARN.

### NPM

```bash
npm i @blackbox-vision/react-qr-reader @zxing/library
```

### YARN

```bash
yarn add @blackbox-vision/react-qr-reader @zxing/library
```

## Example Usage

After reading and performing the previous steps, you should be able to import the library and use it like in this example:

```javascript
import React, { useState } from 'react';
import { QrReader } from '@blackbox-vision/react-qr-reader';

const Test = (props) => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p>{data}</p>
    </>
  );
};
```

## Component API

The `QrReader` component has the following props:

| Properties | Types                   | Default Value | Description                                                                                       |
| ---------- | ----------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| facingMode | `user` or `environment` | `environment` | Specify which camera should be used (if available).                                               |
| onResult   | `function`              | none          | Scan event handler                                                                                |
| videoId    | `string`                | `video`       | The ID for the video element                                                                      |
| scanDelay  | `number`                | `500`         | The scan period for the QR hook                                                                   |
| ViewFinder | component               | none          | ViewFinder component to rendering over the video element                                          |
| style      | a valid React style     | none          | Styling for the container element. **Warning** The preview will always keep its 1:1 aspect ratio. |
| className  | string                  | none          | ClassName for the container element.                                                              |

## Browser Support

If you need to support older browsers, checkout [this guide](https://github.com/zxing-js/library#browser-support) in how to make it compatible with legacy ones

## Issues

Please, open an [issue](https://github.com/BlackBoxVision/react-qr-reader/issues) following one of the issues templates. We will do our best to fix them.

## Contributing

If you want to contribute to this project see [contributing](https://github.com/BlackBoxVision/react-qr-reader/blob/master/CONTRIBUTING.md) for more information.

## License

Distributed under the **MIT license**. See [LICENSE](https://github.com/BlackBoxVision/react-qr-reader/blob/master/LICENSE) for more information.
