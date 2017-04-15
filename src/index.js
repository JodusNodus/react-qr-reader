const React = require('react')
const { Component, PropTypes } = React
const getDeviceId = require('./getDeviceId')
const havePropsChanged = require('./havePropsChanged')

// Require adapter to support older browser implementations
require('webrtc-adapter')

// Inline worker.js as a string value of workerBlob.
const workerBlob = new Blob([__inline('../lib/worker.js')], {
  type: 'application/javascript',
})

// Props that are allowed to change dynamicly
const propsKeys = ['delay', 'legacyMode', 'facingMode']

module.exports = class Reader extends Component {
  static propTypes = {
    onScan: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    facingMode: PropTypes.string,
    legacyMode: PropTypes.bool,
    maxImageSize: PropTypes.number,
    style: PropTypes.object,
  };
  static defaultProps = { delay: 500, style: {}, maxImageSize: 1500 };

  els = {};

  constructor(props) {
    super(props)

    // Bind function to the class
    this.initiate = this.initiate.bind(this)
    this.initiateLegacyMode = this.initiateLegacyMode.bind(this)
    this.check = this.check.bind(this)
    this.handleVideo = this.handleVideo.bind(this)
    this.handleLoadStart = this.handleLoadStart.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.clearComponent = this.clearComponent.bind(this)
    this.handleReaderLoad = this.handleReaderLoad.bind(this)
    this.openImageDialog = this.openImageDialog.bind(this)
    this.handleWorkerMessage = this.handleWorkerMessage.bind(this)
    this.setRefFactory = this.setRefFactory.bind(this)
  }
  componentDidMount() {
    // Initiate web worker execute handler according to mode.
    this.worker = new Worker(URL.createObjectURL(workerBlob))
    this.worker.onmessage = this.handleWorkerMessage

    if (!this.props.legacyMode) {
      this.initiate()
    } else {
      this.initiateLegacyMode()
    }
  }
  componentWillReceiveProps(nextProps) {
    // React according to change in props
    const changedProps = havePropsChanged(this.props, nextProps, propsKeys)

    for (const prop of changedProps) {
      if (prop == 'facingMode') {
        this.clearComponent()
        this.initiate(nextProps)
        break
      } else if (prop == 'delay') {
        if (this.props.delay == false) {
          this.timeout = setTimeout(this.check, this.props.delay)
        } else if (nextProps.delay == false) {
          clearTimeout(this.timeout)
        }
      } else if (prop == 'legacyMode') {
        if (this.props.legacyMode && !nextProps.legacyMode) {
          this.clearComponent()
          this.initiate(nextProps)
        } else {
          this.clearComponent()
          this.componentDidUpdate = this.initiateLegacyMode
        }
        break
      }
    }
  }
  shouldComponentUpdate(nextProps) {
    // Only render when the `propsKeys` have changed.
    const changedProps = havePropsChanged(this.props, nextProps, propsKeys)
    return changedProps.length > 0
  }
  componentWillUnmount() {
    // Stop web-worker and clear the component
    if (this.worker) {
      this.worker.terminate()
      this.worker = undefined
    }
    this.clearComponent()
  }
  clearComponent() {
    // Remove all event listeners and variables
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
    if (this.stopCamera) {
      this.stopCamera()
    }
    if (this.reader) {
      this.reader.removeEventListener('load', this.handleReaderLoad)
    }
    if (this.els.img) {
      this.els.img.removeEventListener('load', this.check)
    }
  }
  initiate(props = this.props) {
    const { onError, facingMode } = props

    getDeviceId(facingMode)
      .then(deviceId => {
        return navigator.mediaDevices.getUserMedia({
          video: {
            deviceId,
            facingMode: facingMode == 'rear' ? 'environment' : 'user',
            width: { min: 360, ideal: 1280, max: 1920 },
            height: { min: 240, ideal: 720, max: 1080 },
          },
        })
      })
      .then(this.handleVideo)
      .catch(onError)
  }
  handleVideo(stream) {
    const { preview } = this.els

    // Handle different browser implementations of `createObjectURL`
    if (window.URL.createObjectURL) {
      preview.src = window.URL.createObjectURL(stream)
    } else if (window.webkitURL) {
      preview.src = window.webkitURL.createObjectURL(stream)
    } else if (preview.mozSrcObject !== undefined) {
      preview.mozSrcObject = stream
    } else {
      preview.src = stream
    }

    const streamTrack = stream.getTracks()[0]
    // Assign `stopCamera` so the track can be stopped once component is cleared
    this.stopCamera = streamTrack.stop.bind(streamTrack)

    preview.addEventListener('loadstart', this.handleLoadStart)
  }
  handleLoadStart() {
    const preview = this.els.preview
    preview.play()

    if (typeof this.props.delay == 'number') {
      this.timeout = setTimeout(this.check, this.props.delay)
    }

    // Some browsers call loadstart continuously
    preview.removeEventListener('loadstart', this.handleLoadStart)
  }
  check() {
    const { legacyMode, maxImageSize, delay } = this.props
    const { preview, canvas, img } = this.els

    // Get image/video dimensions
    let width = Math.floor(legacyMode ? img.naturalWidth : preview.videoWidth)
    let height = Math.floor(
      legacyMode ? img.naturalHeight : preview.videoHeight
    )

    if (legacyMode) {
      // Downscale image to `maxImageSize`
      const ratio = 1.1
      while ((width > height ? width : height) > maxImageSize) {
        width = Math.floor(width / ratio)
        height = Math.floor(height / ratio)
      }
    }

    canvas.width = width
    canvas.height = height

    const previewIsPlaying = preview &&
      preview.readyState === preview.HAVE_ENOUGH_DATA

    if (legacyMode || previewIsPlaying) {
      const ctx = canvas.getContext('2d')
      ctx.drawImage(legacyMode ? img : preview, 0, 0, width, height)

      const imageData = ctx.getImageData(0, 0, width, height)
      // Send data to web-worker
      this.worker.postMessage(imageData)
    } else {
      // Preview not ready -> check later
      this.timeout = setTimeout(this.check, delay)
    }
  }
  handleWorkerMessage(e) {
    const { onScan, legacyMode, onError, delay } = this.props
    const decoded = e.data

    if (decoded) {
      onScan(decoded)
    } else if (legacyMode) {
      onError(new Error('QR Code not recognised in image.'))
    }
    if (typeof delay == 'number' && this.worker) {
      this.timeout = setTimeout(this.check, delay)
    }
  }
  initiateLegacyMode() {
    this.reader = new FileReader()
    this.reader.addEventListener('load', this.handleReaderLoad)
    this.els.img.addEventListener('load', this.check, false)

    // Reset componentDidUpdate
    this.componentDidUpdate = undefined
  }
  handleInputChange(e) {
    const selectedImg = e.target.files[0]
    this.reader.readAsDataURL(selectedImg)
  }
  handleReaderLoad(e) {
    // Set selected image blob as img source
    this.els.img.src = e.target.result
  }
  openImageDialog() {
    // Function to be executed by parent in user action context to trigger img file uploader
    this.els.input.click()
  }
  setRefFactory(key) {
    return element => {
      this.els[key] = element
    }
  }
  render() {
    const hiddenStyle = { display: 'none' }
    const previewStyle = {
      display: 'block',
      objectFit: 'contain',
      ...this.props.style,
    }

    return (
      <section>
        {this.props.legacyMode
          ? <div>
              <input
                style={hiddenStyle}
                type="file"
                accept="image/*"
                ref={this.setRefFactory('input')}
                onChange={this.handleInputChange}
              />
              <img style={previewStyle} ref={this.setRefFactory('img')} />
            </div>
          : <video style={previewStyle} ref={this.setRefFactory('preview')} />}
        <canvas style={hiddenStyle} ref={this.setRefFactory('canvas')} />
      </section>
    )
  }
}
