'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsqr = require('jsqr');

var _jsqr2 = _interopRequireDefault(_jsqr);

require('md-gum-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reader = function (_Component) {
  _inherits(Reader, _Component);

  function Reader() {
    _classCallCheck(this, Reader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Reader).apply(this, arguments));
  }

  _createClass(Reader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initiate.apply(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._interval) clearInterval(this._interval);

      if (typeof this.stopCamera === 'function') this.stopCamera();
    }
  }, {
    key: 'initiate',
    value: function initiate() {
      var handleError = this.props.handleError;

      var constrains = {
        video: {
          width: { min: 1024, ideal: 1280, max: 1920 },
          height: { min: 776, ideal: 720, max: 1080 }
        }
      };
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constrains).then(this.handleVideo.bind(this)).catch(function (e) {
          return handleError(e.name);
        });
      } else {
        handleError('Not compatible with getUserMedia');
      }
    }
  }, {
    key: 'handleVideo',
    value: function handleVideo(stream) {
      var _this2 = this;

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

      this.stopCamera = stream.getTracks()[0].stop.bind(stream.getTracks()[0]);

      preview.addEventListener('loadstart', function () {
        preview.play();
        if (_this2.props.interval) {
          _this2._interval = setInterval(_this2.check.bind(_this2), _this2.props.interval);
        } else {
          window.requestAnimationFrame(_this2.check.bind(_this2));
        }
      });
    }
  }, {
    key: 'check',
    value: function check() {
      var _props = this.props;
      var height = _props.height;
      var width = _props.width;
      var interval = _props.interval;
      var handleScan = _props.handleScan;
      var _refs = this.refs;
      var preview = _refs.preview;
      var canvas = _refs.canvas;

      if (!interval) window.requestAnimationFrame(this.check.bind(this));

      if (preview && preview.readyState === preview.HAVE_ENOUGH_DATA) {
        var ctx = canvas.getContext('2d');
        ctx.drawImage(preview, 0, 0, width, height);
        var imageData = ctx.getImageData(0, 0, width, height);
        var decoded = _jsqr2.default.decodeQRFromImage(imageData.data, imageData.width, imageData.height, width);
        if (decoded) handleScan(decoded);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var height = _props2.height;
      var width = _props2.width;

      var previewStyle = {
        display: 'none'
      };
      var canvasStyle = {
        height: height,
        width: width
      };
      return _react2.default.createElement(
        'section',
        null,
        _react2.default.createElement('video', { style: previewStyle, ref: 'preview' }),
        _react2.default.createElement('canvas', { style: canvasStyle, ref: 'canvas' })
      );
    }
  }]);

  return Reader;
}(_react.Component);

exports.default = Reader;


Reader.defaultProps = {
  height: 240,
  width: 320,
  interval: null
};
Reader.propTypes = {
  height: _react.PropTypes.number,
  width: _react.PropTypes.number,
  handleScan: _react.PropTypes.func.isRequired,
  handleError: _react.PropTypes.func.isRequired,
  interval: _react.PropTypes.number
};