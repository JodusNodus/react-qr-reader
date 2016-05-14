import React, { Component, PropTypes } from 'react'
import QrCode from "qrcode-reader"
import h from "react-hyperscript"


export default class Reader extends Component {
  handleVideo(stream) {
    this.refs.preview.src = window.URL.createObjectURL(stream)
    setInterval(this.updateCanvas.bind(this), this.props.interval)
  }
  handleVideoErr(e){
    console.error(e)
  }
  componentDidMount(){
    const { height, width, handleScan } = this.props
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia
    if (navigator.getUserMedia)
      navigator.getUserMedia({video: { width, height }}, this.handleVideo.bind(this), this.handleVideoErr.bind(this))

    this.qr = new QrCode()

    this.qr.callback = result => {
      if(result.indexOf("error") < 0)
        handleScan(result)
    }
  }
  updateCanvas() {
    const { height, width } = this.props
    const ctx = this.refs.canvas.getContext('2d')
    ctx.drawImage(this.refs.preview, 0, 0, width, height)
    const data = this.refs.canvas.getContext("2d").getImageData(0, 0, width, height)
    this.qr.decode(data)
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
  interval: 250
}
Reader.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  handleScan: PropTypes.func.isRequired,
  interval: PropTypes.number
}
