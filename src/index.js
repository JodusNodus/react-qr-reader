import React, { Component, PropTypes } from 'react'
import jsQR from "jsqr"
import h from "react-hyperscript"

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia

export default class Reader extends Component {
  handleVideo(stream) {
    this.refs.preview.src = window.URL.createObjectURL(stream)
    if(this.props.interval){
      setInterval(this.check.bind(this), this.props.interval)
    }else{
      window.requestAnimationFrame(this.check.bind(this))
    }
  }
  handleVideoErr(e){
    console.error(e)
  }
  componentDidMount(){
    const { height, width, handleError } = this.props
    if (navigator.getUserMedia){
      navigator.getUserMedia({video: { width, height }}, this.handleVideo.bind(this), this.handleVideoErr.bind(this))
    }else{
      handleError()
    }
  }
  check() {
    const { height, width, interval, handleScan } = this.props
    if(!interval)
      window.requestAnimationFrame(this.check.bind(this))

    const ctx = this.refs.canvas.getContext('2d')
    ctx.drawImage(this.refs.preview, 0, 0, width, height)
    const imageData = ctx.getImageData(0, 0, width, height)
    const decoded = jsQR.decodeQRFromImage(imageData.data, imageData.width, imageData.height)
    if(decoded)
      handleScan(decoded)
  }
  render(){
    const { height, width } = this.props
    const previewStyle = {
      height,
      width,
      background: "#efefef"
    }
    const canvasStyle = {
      display: "none"
    }
    return h('section', [
      h("video", { autoplay: true, style: previewStyle, ref: "preview"}),
      h("canvas", {width, height, ref: "canvas", style: canvasStyle})
    ])
  }
}

Reader.defaultProps = {
  height: 240,
  width: 320,
  interval: null
}
Reader.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  handleScan: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  interval: PropTypes.number
}
