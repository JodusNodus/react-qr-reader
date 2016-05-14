# react-qr-reader
A react component for reading QR codes from the webcam.

## Example

```
import React, { Component }
import QrReader from "react-qr-reader"

class Container extends Component {
  constructor(){
    this.state = {
      result: "No result"
    }
  }
  handleScan(data){
    this.setState({
      result: data
    })
  }
  render(){
    return(
      <div>
        <QrReader height={480} width={640} interval={500} handleScan={this.handleScan.bind(this)}/>
        <p>{this.state.result}</p>
      </div>
    )
  }
}
```

## Props


**height**
Type: `number`, Optional, Default: 240
The vertical resolution of the video stream.

**width**
Type: `number`, Optional, Default: 320
The horizontal resolution of the video stream.

**interval**
Type: `number`, Optional, Default: 250
The interval between scans in milliseconds.

**handleScan**
Type: `function`, Required, Argument: `result`
The function to call when a scan is succesfull.
