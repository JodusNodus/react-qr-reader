import React, { Component, PropTypes } from 'react'
import jsQR from 'jsqr'
import raf from 'raf'
import 'md-gum-polyfill'
import 'webrtc-adapter'

raf.polyfill()

export default class Reader extends Component {
  constructor(props){
    super(props)

    this.initiate = this.initiate.bind(this)
    this.initiateLegacyMode = this.initiateLegacyMode.bind(this)
    this.check = this.check.bind(this)
    this.handleVideo = this.handleVideo.bind(this)
    this.handleLoadStart = this.handleLoadStart.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.clearComponent = this.clearComponent.bind(this)
    this.handleReaderLoad = this.handleReaderLoad.bind(this)

    this.componentWillUnmount = this.clearComponent
  }
  componentDidMount(){
    if(!this.props.legacyMode){
      this.initiate()
    }else{
      this.initiateLegacyMode()
    }
  }
  componentWillReceiveProps(newProps){
    if(!newProps.legacyMode && this.props.facingMode != newProps.facingMode){
      this.clearComponent()
      this.initiate()
    }
    if(!this.props.legacyMode && newProps.legacyMode){
      this.clearComponent()
      this.componentDidUpdate = this.initiateLegacyMode
    }
    if(this.props.legacyMode && !newProps.legacyMode){
      this.clearComponent()
      this.initiate()
    }
  }
  clearComponent(){
    if (this._interval)
      clearInterval(this._interval)

    if (typeof this.stopCamera === 'function')
      this.stopCamera()

    if(this.requestFrameId){
      window.cancelAnimationFrame(this.requestFrameId)
      delete this.requestFrameId
    }

    if(this.reader){
      this.reader.removeEventListener('load', this.handleReaderLoad)
      this.reader = undefined
    }

    if(this.refs.img){
      this.refs.img.removeEventListener('load', this.check)
    }
  }
  initiate(){
    const { handleError, facingMode } = this.props

    const constrains = {
      video: {
        facingMode: facingMode ? {
          exact: facingMode == 'rear' ? 'environment' : 'user',
        } : undefined,
        width: { min: 360, ideal: 1280, max: 1920 },
        height: { min: 240, ideal: 720, max: 1080 },
      },
    }

    try {
      navigator.mediaDevices.getUserMedia(constrains)
      .then(this.handleVideo)
      .catch(e => handleError(e.name))
    } catch (e) {
      handleError('Not compatible with getUserMedia.')
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

    const streamTrack = stream.getTracks()[0]
    this.stopCamera = streamTrack.stop.bind(streamTrack)

    preview.addEventListener('loadstart', this.handleLoadStart)
  }
  handleLoadStart(){
    const preview = this.refs.preview
    preview.play()
    if(this.props.interval){
      this._interval = setInterval(this.check, this.props.interval)
    }else if(!this.requestFrameId){
      this.check()
    }

    preview.removeEventListener('loadstart', this.handleLoadStart)
  }
  check() {
    const { interval, handleScan, legacyMode, maxImageSize } = this.props
    const { preview, canvas, img } = this.refs
    let width = Math.floor(legacyMode ? img.naturalWidth : preview.videoWidth)
    let height = Math.floor(legacyMode ? img.naturalHeight : preview.videoHeight)

    if(legacyMode){
      const ratio = 1.1
      while ((width > height ? width : height) > maxImageSize) {
        width = Math.floor(width / ratio)
        height = Math.floor(height / ratio)
      }
    }

    canvas.width = width
    canvas.height = height

    if(!interval && !legacyMode)
      this.requestFrameId = window.requestAnimationFrame(this.check)

    if (legacyMode || (preview && preview.readyState === preview.HAVE_ENOUGH_DATA)){
      const ctx = canvas.getContext('2d')
      ctx.drawImage(legacyMode ? img : preview, 0, 0, width, height)

      const imageData = ctx.getImageData(0, 0, width, height)
      const decoded = jsQR.decodeQRFromImage(imageData.data, width, height)

      if(decoded)
        handleScan(decoded)
    }
  }
  initiateLegacyMode(){
    this.reader = new FileReader()

    this.reader.addEventListener('load', this.handleReaderLoad)

    this.refs.img.addEventListener('load', this.check, false)

    this.componentDidUpdate = undefined
  }
  handleInputChange(e){
    this.reader.readAsDataURL(e.target.files[0])
  }
  handleReaderLoad(e){
    this.refs.img.src = e.target.result
  }
  render(){
    const previewStyle = {
      display: 'block',
      objectFit: 'contain',
      ...this.props.previewStyle,
    }
    const canvasStyle = {
      display: 'none',
    }

    return (
      <section>
        {this.props.legacyMode ? (
          <div>
            <input style={this.props.inputStyle} type="file" accept="image/*" ref="input" onChange={this.handleInputChange}/>
            <img style={{...previewStyle, display: 'none'}} ref="img"/>
          </div>
        ) : (
          <video style={previewStyle} ref="preview"/>
        )}
        <canvas style={canvasStyle} ref="canvas"/>
      </section>
    )
  }
}

Reader.defaultProps = {
  interval: null,
  previewStyle: {},
  inputStyle: {},
  maxImageSize: 1500,
}
Reader.propTypes = {
  handleScan: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  interval: PropTypes.number,
  previewStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  facingMode: PropTypes.string,
  legacyMode: PropTypes.bool,
  maxImageSize: PropTypes.number,
}
