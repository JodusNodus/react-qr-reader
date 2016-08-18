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

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

require('md-gum-polyfill');

require('webrtc-adapter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_raf2.default.polyfill();

var Reader = function (_Component) {
  _inherits(Reader, _Component);

  function Reader(props) {
    _classCallCheck(this, Reader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Reader).call(this, props));

    _this.initiate = _this.initiate.bind(_this);
    _this.check = _this.check.bind(_this);
    _this.handleVideo = _this.handleVideo.bind(_this);
    _this.handleLoadStart = _this.handleLoadStart.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    return _this;
  }

  _createClass(Reader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.props.legacyMode) {
        this.initiate();
      } else {
        (function () {
          var img = _this2.refs.img;
          _this2.reader = new FileReader();

          _this2.reader.addEventListener('load', function (e) {
            img.src = e.target.result;
          });

          img.addEventListener('load', function () {
            _this2.check();
          }, false);
        })();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (!newProps.legacyMode && this.props.facingMode != newProps.facingMode) {
        this.initiate();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._interval) clearInterval(this._interval);

      if (typeof this.stopCamera === 'function') this.stopCamera();

      if (this.requestFrameId) {
        window.cancelAnimationFrame(this.requestFrameId);
        this.requestFrameId == undefined;
      }
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(e) {
      this.reader.readAsDataURL(e.target.files[0]);
    }
  }, {
    key: 'initiate',
    value: function initiate() {
      var _props = this.props;
      var handleError = _props.handleError;
      var facingMode = _props.facingMode;


      var constrains = {
        video: {
          facingMode: facingMode ? {
            exact: facingMode == 'rear' ? 'environment' : 'user'
          } : undefined,
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
    key: 'handleLoadStart',
    value: function handleLoadStart() {
      var preview = this.refs.preview;
      preview.play();
      if (this.props.interval) {
        this._interval = setInterval(this.check, this.props.interval);
      } else if (!this.requestFrameId) {
        this.check();
      }

      preview.removeEventListener('loadstart', this.handleLoadStart);
    }
  }, {
    key: 'check',
    value: function check() {
      var _props2 = this.props;
      var interval = _props2.interval;
      var handleScan = _props2.handleScan;
      var legacyMode = _props2.legacyMode;
      var _refs = this.refs;
      var preview = _refs.preview;
      var canvas = _refs.canvas;
      var img = _refs.img;

      var width = Math.floor(legacyMode ? img.naturalWidth : preview.videoWidth);
      var height = Math.floor(legacyMode ? img.naturalHeight : preview.videoHeight);
      if (width >= 2000 || height >= 2000) {
        width = width / 2;
        height = height / 2;
      }

      canvas.width = width;
      canvas.height = height;

      if (!interval && !legacyMode) this.requestFrameId = window.requestAnimationFrame(this.check);

      if (legacyMode || preview && preview.readyState === preview.HAVE_ENOUGH_DATA) {
        var ctx = canvas.getContext('2d');
        ctx.drawImage(legacyMode ? img : preview, 0, 0, width, height);

        var imageData = ctx.getImageData(0, 0, width, height);
        var decoded = _jsqr2.default.decodeQRFromImage(imageData.data, width, height);

        if (decoded) handleScan(decoded);
      }
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

      return _react2.default.createElement(
        'section',
        null,
        this.props.legacyMode ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('input', { style: this.props.inputStyle, type: 'file', accept: 'image/*', ref: 'input', onChange: this.handleInputChange }),
          _react2.default.createElement('img', { style: previewStyle, ref: 'img' })
        ) : _react2.default.createElement('video', { style: previewStyle, ref: 'preview' }),
        _react2.default.createElement('canvas', { style: canvasStyle, ref: 'canvas' })
      );
    }
  }]);

  return Reader;
}(_react.Component);

exports.default = Reader;


Reader.defaultProps = {
  interval: null,
  previewStyle: {},
  inputStyle: {}
};
Reader.propTypes = {
  handleScan: _react.PropTypes.func.isRequired,
  handleError: _react.PropTypes.func.isRequired,
  interval: _react.PropTypes.number,
  previewStyle: _react.PropTypes.object,
  inputStyle: _react.PropTypes.object,
  facingMode: _react.PropTypes.string,
  legacyMode: _react.PropTypes.bool
};