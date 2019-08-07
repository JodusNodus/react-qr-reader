import { Component } from 'react'
import QrReader from 'react-qr-reader2'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'
const SliderWithTooltip = createSliderWithTooltip(Slider)

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default class QrCodeReader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: '',
      delay: 1000,
      hasZoomCapabilities: false,
      zoomCapabilities: { min: 1, max: 1, step: 1 },
      constraints: {
        advanced: [{ zoom: 1 }],
      },
    }
    this.handleScan = this.handleScan.bind(this)
    this.onChangeZoom = this.onChangeZoom.bind(this)
    this.onLoadQRCodeScanner = this.onLoadQRCodeScanner.bind(this)
  }

  async onLoadQRCodeScanner (args) {
    if (!args) {
      return
    }
    const { streamTrack } = args
    // https://bugs.chromium.org/p/chromium/issues/detail?id=711524
    await timeout(1000)
    const capabilities = streamTrack.getCapabilities()
    if ('zoom' in capabilities) {
      const { min, max, step } = capabilities.zoom
      this.setState({
        streamTrack,
        hasZoomCapabilities: true,
        zoomCapabilities: {
          min,
          max,
          step,
        },
        constraints: {
          advanced: [{ zoom: min }],
        },
      })
    }
  }

  handleScan (data) {
    if (data) {
      this.setState({ result: data })
    }
  }

  handleError (err) {
    console.error(err) // eslint-disable-line no-console
  }

  render () {
    const { delay,
      zoomCapabilities,
      hasZoomCapabilities,
      constraints,
      result
    } = this.state
    const { min, max, step } = zoomCapabilities
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return (
      <div>
        <QrReader
          delay={delay}
          onError={this.handleError}
          onScan={this.handleScan}
          onLoad={this.onLoadQRCodeScanner}
          style={{ width: '100%', ...previewStyle }}
        />
        {hasZoomCapabilities && (
          <div>
            <div>
              zoom {constraints.advanced[0].zoom}, min: {min}, max:{' '}
              {max}, step: {step}
            </div>
            <SliderWithTooltip
              onChange={this.onChangeZoom}
              min={min}
              max={max}
              step={step}
              value={constraints.advanced[0].zoom}
              trackStyle={{ backgroundColor: 'blue', height: 10 }}
              handleStyle={{
                borderColor: 'blue',
                height: 28,
                width: 28,
                marginLeft: -14,
                marginTop: -9,
                backgroundColor: 'black',
              }}
            />
          </div>
        )}
        <p>{result}</p>
      </div>
    )
  }
}
