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
    this.check = this.check.bind(this)
    this.handleVideo = this.handleVideo.bind(this)
    this.handleLoadStart = this.handleLoadStart.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  componentDidMount(){
    if(!this.props.legacyMode){
      this.initiate()
    }else{
      const img = this.refs.img
      this.reader = new FileReader()

      this.reader.addEventListener('load', (e) => {
        img.src = e.target.result
      })

      img.addEventListener('load', () => {
        this.check()
      }, false)
    }
  }
  componentWillReceiveProps(newProps){
    if(!newProps.legacyMode && this.props.facingMode != newProps.facingMode){
      this.initiate()
    }
  }
  componentWillUnmount(){
    if (this._interval)
      clearInterval(this._interval)

    if (typeof this.stopCamera === 'function')
      this.stopCamera()

    if(this.requestFrameId){
      window.cancelAnimationFrame(this.requestFrameId)
      this.requestFrameId == undefined
    }
  }
  handleInputChange(e){
    this.reader.readAsDataURL(e.target.files[0])
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
    const { interval, handleScan, legacyMode } = this.props
    const { preview, canvas, img } = this.refs
    let width = Math.floor(legacyMode ? img.naturalWidth : preview.videoWidth)
    let height = Math.floor(legacyMode ? img.naturalHeight : preview.videoHeight)
    if((width >= 2000) || (height >= 2000)){
      width = width / 2
      height = height / 2
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
            <img style={previewStyle} ref="img"/>
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
}
Reader.propTypes = {
  handleScan: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  interval: PropTypes.number,
  previewStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  facingMode: PropTypes.string,
  legacyMode: PropTypes.bool,
}
