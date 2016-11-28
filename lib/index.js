'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsqr = require('jsqr');

var _jsqr2 = _interopRequireDefault(_jsqr);

require('md-gum-polyfill');

require('webrtc-adapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reader = function (_Component) {
  _inherits(Reader, _Component);

  function Reader(props) {
    _classCallCheck(this, Reader);

    var _this = _possibleConstructorReturn(this, (Reader.__proto__ || Object.getPrototypeOf(Reader)).call(this, props));

    _this.initiate = _this.initiate.bind(_this);
    _this.initiateLegacyMode = _this.initiateLegacyMode.bind(_this);
    _this.check = _this.check.bind(_this);
    _this.handleVideo = _this.handleVideo.bind(_this);
    _this.handleLoadStart = _this.handleLoadStart.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.clearComponent = _this.clearComponent.bind(_this);
    _this.handleReaderLoad = _this.handleReaderLoad.bind(_this);
    _this.openImageDialog = _this.openImageDialog.bind(_this);
    _this.setInterval = _this.setInterval.bind(_this);

    _this.componentWillUnmount = _this.clearComponent;
    return _this;
  }

  _createClass(Reader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.legacyMode) {
        this.initiate();
      } else {
        this.initiateLegacyMode();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (!newProps.legacyMode && this.props.facingMode != newProps.facingMode) {
        this.clearComponent();
        this.initiate();
      } else if (this.props.interval != newProps.interval) {
        this.setInterval(newProps.interval);
      } else if (!this.props.legacyMode && newProps.legacyMode) {
        this.clearComponent();
        this.componentDidUpdate = this.initiateLegacyMode;
      } else if (this.props.legacyMode && !newProps.legacyMode) {
        this.clearComponent();
        this.initiate();
      }
    }
  }, {
    key: 'clearComponent',
    value: function clearComponent() {
      if (this._interval) clearInterval(this._interval);

      if (typeof this.stopCamera === 'function') this.stopCamera();

      if (this.reader) {
        this.reader.removeEventListener('load', this.handleReaderLoad);
        this.reader = undefined;
      }

      if (this.refs.img) {
        this.refs.img.removeEventListener('load', this.check);
      }
    }
  }, {
    key: 'initiate',
    value: function initiate() {
      var _props = this.props,
          handleError = _props.handleError,
          facingMode = _props.facingMode;


      var constrains = {
        video: {
          facingMode: facingMode == 'rear' ? 'environment' : 'user',
          width: { min: 360, ideal: 1280, max: 1920 },
          height: { min: 240, ideal: 720, max: 1080 }
        }
      };

      try {
        navigator.mediaDevices.getUserMedia(constrains).then(this.handleVideo).catch(function (e) {
          return handleError(e.name);
        });
      } catch (e) {
        handleError('Not compatible with getUserMedia.');
      }
    }
  }, {
    key: 'handleVideo',
    value: function handleVideo(stream) {
      var preview = this.refs.preview;


      if (window.URL.createObjectURL) {
        preview.src = window.URL.createObjectURL(stream);
      } else if (window.webkitURL) {
        preview.src = window.webkitURL.createObjectURL(stream);
      } else if (preview.mozSrcObject !== undefined) {
        preview.mozSrcObject = stream;
      } else {
        preview.src = stream;
      }

      var streamTrack = stream.getTracks()[0];
      this.stopCamera = streamTrack.stop.bind(streamTrack);

      preview.addEventListener('loadstart', this.handleLoadStart);
    }
  }, {
    key: 'setInterval',
    value: function (_setInterval) {
      function setInterval(_x) {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function (interval) {
      if (this._interval) {
        clearInterval(this._interval);
      }
      if (interval !== false) {
        this._interval = setInterval(this.check, interval);
      }
    })
  }, {
    key: 'handleLoadStart',
    value: function handleLoadStart() {
      var preview = this.refs.preview;
      preview.play();
      this.setInterval(this.props.interval);

      preview.removeEventListener('loadstart', this.handleLoadStart);
    }
  }, {
    key: 'check',
    value: function check() {
      var _props2 = this.props,
          interval = _props2.interval,
          handleScan = _props2.handleScan,
          legacyMode = _props2.legacyMode,
          maxImageSize = _props2.maxImageSize,
          handleImageNotRecognized = _props2.handleImageNotRecognized;
      var _refs = this.refs,
          preview = _refs.preview,
          canvas = _refs.canvas,
          img = _refs.img;

      var width = Math.floor(legacyMode ? img.naturalWidth : preview.videoWidth);
      var height = Math.floor(legacyMode ? img.naturalHeight : preview.videoHeight);

      if (legacyMode) {
        var ratio = 1.1;
        while ((width > height ? width : height) > maxImageSize) {
          width = Math.floor(width / ratio);
          height = Math.floor(height / ratio);
        }
      }

      canvas.width = width;
      canvas.height = height;

      if (legacyMode || preview && preview.readyState === preview.HAVE_ENOUGH_DATA) {
        var ctx = canvas.getContext('2d');
        ctx.drawImage(legacyMode ? img : preview, 0, 0, width, height);

        var imageData = ctx.getImageData(0, 0, width, height);
        var decoded = _jsqr2.default.decodeQRFromImage(imageData.data, width, height);

        if (decoded) {
          handleScan(decoded);
        } else if (legacyMode && handleImageNotRecognized) {
          handleImageNotRecognized();
        }
      }
    }
  }, {
    key: 'initiateLegacyMode',
    value: function initiateLegacyMode() {
      this.reader = new FileReader();

      this.reader.addEventListener('load', this.handleReaderLoad);

      this.refs.img.addEventListener('load', this.check, false);

      this.componentDidUpdate = undefined;
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(e) {
      this.reader.readAsDataURL(e.target.files[0]);
    }
  }, {
    key: 'handleReaderLoad',
    value: function handleReaderLoad(e) {
      this.refs.img.src = e.target.result;
    }
  }, {
    key: 'openImageDialog',
    value: function openImageDialog() {
      this.refs.input.click();
    }
  }, {
    key: 'render',
    value: function render() {
      var previewStyle = _extends({
        display: 'block',
        objectFit: 'contain'
      }, this.props.previewStyle);
      var canvasStyle = {
        display: 'none'
      };
      var inputStyle = _extends({
        display: 'none'
      }, this.props.inputStyle);

      return _react2.default.createElement(
        'section',
        null,
        this.props.legacyMode ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', { style: inputStyle, id: 'react-qr-reader-input', type: 'file', accept: 'image/*', ref: 'input', onChange: this.handleInputChange }),
          _react2.default.createElement('img', { style: _extends({}, previewStyle, { display: 'none' }), ref: 'img' })
        ) : _react2.default.createElement('video', { style: previewStyle, ref: 'preview' }),
        _react2.default.createElement('canvas', { style: canvasStyle, ref: 'canvas' })
      );
    }
  }]);

  return Reader;
}(_react.Component);

Reader.propTypes = {
  handleScan: _react.PropTypes.func.isRequired,
  handleError: _react.PropTypes.func.isRequired,
  handleImageNotRecognized: _react.PropTypes.func,
  interval: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.bool]),
  previewStyle: _react.PropTypes.object,
  inputStyle: _react.PropTypes.object,
  facingMode: _react.PropTypes.string,
  legacyMode: _react.PropTypes.bool,
  maxImageSize: _react.PropTypes.number
};
Reader.defaultProps = {
  interval: 500,
  previewStyle: {},
  inputStyle: {},
  maxImageSize: 1500
};
exports.default = Reader;