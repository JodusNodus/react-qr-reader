import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import QrReader from './react-qr-reader'

class Demo extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: 'No result',
      error: false,
      facingMode: 'front',
      interval: 500,
    }

    this.handleScan = this.handleScan.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleFacingModeChange = this.handleFacingModeChange.bind(this)
    this.handleIntervalChange = this.handleIntervalChange.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(){
    this.setState({
      error: true,
    })
  }
  handleFacingModeChange(e){
    this.setState({
      facingMode: e.target.value,
    })
  }
  handleIntervalChange(e){
    this.setState({
      interval: parseInt(e.target.value),
    })
  }
  render(){
    if(this.state.error){
      return <h3>Demo could not be displayed.</h3>
    }else{
      return (
        <div>
          <div
            style={{
              margin: '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <select
              value={this.state.facingMode}
              onChange={this.handleFacingModeChange}>
              <option value="front">Front Camera</option>
              <option value="rear">Rear Camera</option>
            </select>
            <span>
              <label htmlFor="interval">Interval in ms: </label>
              <input
                id="interval"
                type="number"
                value={this.state.interval}
                onChange={this.handleIntervalChange}
                />
            </span>
          </div>
          <QrReader
            handleScan={this.handleScan}
            handleError={this.handleError}
            facingMode={this.state.facingMode}
            interval={this.state.interval}
            ref="reader"
            previewStyle={{
              width: '100%',
            }}
            />
          <h3>Decoded QR-Code: {this.state.result}</h3>
        </div>
      )
    }
  }
}

ReactDOM.render(
  <Demo/>,
  document.getElementById('demo-container')
)
