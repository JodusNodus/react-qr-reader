import React, { Component, PropTypes } from 'react'
import jsQR from 'jsqr'
import 'md-gum-polyfill'
import 'webrtc-adapter'

export default class Reader extends Component {
  constructor(props){
    super(props)

    this.initiate = this.initiate.bind(this)
    this.check = this.check.bind(this)
    this.handleVideo = this.handleVideo.bind(this)
  }
  componentDidMount(){
    this.initiate.apply(this)
  }
  componentWillUnmount(){
    if (this._interval)
      clearInterval(this._interval)

    if (typeof this.stopCamera === 'function')
      this.stopCamera()
  }
  initiate(){
    const { handleError, facingMode } = this.props

    const rearMode = { exact: 'environment' }
    const frontMode = { exact: 'user' }

    const constrains = {
      video: {
        facingMode: !facingMode ? 'user' : facingMode == 'rear' ? rearMode : frontMode,
        width: { min: 360, ideal: 1280, max: 1920 },
        height: { min: 240, ideal: 720, max: 1080 },
      },
    }
    if (navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia(constrains)
      .then(this.handleVideo)
      .catch(e => handleError(e.name))
    }else{
      handleError('Not compatible with getUserMedia')
    }
  }
  handleVideo(stream) {
    const { preview } = this.refs
    if(window.URL.createObjectURL){
      preview.src = window.URL.createObjectURL(stream)
    }else if (window.webkitURL) {
      preview.src = window.webkitURL.createObjectURL(stream)
    } else if (preview.mozSrcObject !== undefined) {
      preview.mozSrcObject = stream
    } else {
      preview.src = stream
    }

    this.stopCamera = stream.getTracks()[0].stop.bind(stream.getTracks()[0])

    preview.addEventListener('loadstart', () => {
      preview.play()
      if(this.props.interval){
        this._interval = setInterval(this.check, this.props.interval)
      }else{
        window.requestAnimationFrame(this.check)
      }
    })
  }
  check() {
    const { interval, handleScan } = this.props
    const { preview, canvas } = this.refs
    const width = preview.videoWidth
    const height = preview.videoHeight

    canvas.width = width
    canvas.height = height

    if(!interval)
      window.requestAnimationFrame(this.check)

    if (preview && preview.readyState === preview.HAVE_ENOUGH_DATA){
      const ctx = canvas.getContext('2d')
      ctx.drawImage(preview, 0, 0, width, height)
      const imageData = ctx.getImageData(0, 0, width, height)
      const decoded = jsQR.decodeQRFromImage(imageData.data, width, height, width)
      if(decoded) handleScan(decoded)
    }
  }
  render(){
    const previewStyle = {
      display: 'block',
      ...this.props.previewStyle,
    }
    const canvasStyle = {
      display: 'none',
    }

    return (
      <section>
        <video style={previewStyle} ref="preview"/>
        <canvas style={canvasStyle} ref="canvas"/>
      </section>
    )
  }
}

Reader.defaultProps = {
  interval: null,
  previewStyle: {},
}
Reader.propTypes = {
  handleScan: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  interval: PropTypes.number,
  previewStyle: PropTypes.object,
  facingMode: PropTypes.string,
}
