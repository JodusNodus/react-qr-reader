import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QrReader from 'react-qr-reader';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      legacyMode: false,
      result: 'No result',
      error: false,
      facingMode: 'user',
      delay: 500,
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleFacingModeChange = this.handleFacingModeChange.bind(this);
    this.handleDelayChange = this.handleDelayChange.bind(this);
    this.handleImgSubmit = this.handleImgSubmit.bind(this);
  }
  handleScan(result) {
    if(result){
      this.setState({ result });
    }
  }
  handleError(err) {
    console.error(err)
    this.setState({ legacyMode: true })
  }
  handleLoad() {
    this.setState({ loading: false });
  }
  handleFacingModeChange(e) {
    this.setState({ facingMode: e.target.value });
  }
  handleDelayChange(e) {
    this.setState({ delay: parseInt(e.target.value) });
  }
  handleImgSubmit(){
    this.refs.reader.openImageDialog()
  }
  render() {
    const centerContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 100,
    }
    const hozContainerStyle = {
      margin: "10px",
      display: "flex",
      justifyContent: "space-between",
    };

    if (this.state.error) {
      return (
        <div style={centerContainerStyle}>
          <h3>Error</h3>
        </div>
      )
    } else {
      return (
        <div>
          {this.state.loading && (
            <div style={centerContainerStyle}>
              <h3>Loading</h3>
            </div>
          )}
          <div style={{display: this.state.loading ? 'none' : 'block'}}>
            {!this.state.legacyMode ? (
              <div style={hozContainerStyle}>
                <select
                  value={this.state.facingMode}
                  onChange={this.handleFacingModeChange}
                  >
                  <option value="user">User Camera</option>
                  <option value="environment">Environment Camera</option>
                </select>
                <span>
                  <label htmlFor="delay">Delay in ms: </label>
                  <input
                    id="delay"
                    type="number"
                    value={this.state.delay}
                    onChange={this.handleDelayChange}
                    />
                </span>
              </div>
            ) : (
              <div style={hozContainerStyle}>
                <h3>Webcam not supported</h3>
                <button onClick={this.handleImgSubmit}>Submit an Image</button>
              </div>
            )}
            <div style={{ width: '500px', height: '500px', margin: 'auto' }}>
              <QrReader
                onScan={this.handleScan}
                onError={this.handleError}
                onLoad={this.handleLoad}
                facingMode={this.state.facingMode}
                delay={this.state.delay}
                legacyMode={this.state.legacyMode}
                ref="reader"
              />
            </div>
            <h3>Decoded QR-Code: {this.state.result}</h3>
          </div>
        </div>
      );
    }
  }
}

ReactDOM.render(<Demo />, document.getElementById('demo-container'));
