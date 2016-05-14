"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qrcodeReader = require("qrcode-reader");

var _qrcodeReader2 = _interopRequireDefault(_qrcodeReader);

var _reactHyperscript = require("react-hyperscript");

var _reactHyperscript2 = _interopRequireDefault(_reactHyperscript);

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
    key: "handleVideo",
    value: function handleVideo(stream) {
      this.refs.preview.src = window.URL.createObjectURL(stream);
      setInterval(this.updateCanvas.bind(this), this.props.interval);
    }
  }, {
    key: "handleVideoErr",
    value: function handleVideoErr(e) {
      console.error(e);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props;
      var height = _props.height;
      var width = _props.width;
      var handleScan = _props.handleScan;

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
      if (navigator.getUserMedia) navigator.getUserMedia({ video: { width: width, height: height } }, this.handleVideo.bind(this), this.handleVideoErr.bind(this));

      this.qr = new _qrcodeReader2.default();

      this.qr.callback = function (result) {
        if (result.indexOf("error") < 0) handleScan(result);
      };
    }
  }, {
    key: "updateCanvas",
    value: function updateCanvas() {
      var _props2 = this.props;
      var height = _props2.height;
      var width = _props2.width;

      var ctx = this.refs.canvas.getContext('2d');
      ctx.drawImage(this.refs.preview, 0, 0, width, height);
      var data = this.refs.canvas.getContext("2d").getImageData(0, 0, width, height);
      this.qr.decode(data);
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props;
      var height = _props3.height;
      var width = _props3.width;

      var previewStyle = {
        height: height,
        width: width,
        background: "#efefef"
      };
      var canvasStyle = {
        display: "none"
      };
      return (0, _reactHyperscript2.default)('section', [(0, _reactHyperscript2.default)("video", { autoplay: true, style: previewStyle, ref: "preview" }), (0, _reactHyperscript2.default)("canvas", { width: width, height: height, ref: "canvas", style: canvasStyle })]);
    }
  }]);

  return Reader;
}(_react.Component);

exports.default = Reader;


Reader.defaultProps = {
  height: 240,
  width: 320,
  interval: 250
};
Reader.propTypes = {
  height: _react.PropTypes.number,
  width: _react.PropTypes.number,
  handleScan: _react.PropTypes.func.isRequired,
  interval: _react.PropTypes.number
};