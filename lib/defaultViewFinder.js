'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_PureComponent) {
  _inherits(DefaultViewFinder, _PureComponent);

  function DefaultViewFinder() {
    _classCallCheck(this, DefaultViewFinder);

    return _possibleConstructorReturn(this, (DefaultViewFinder.__proto__ || Object.getPrototypeOf(DefaultViewFinder)).apply(this, arguments));
  }

  _createClass(DefaultViewFinder, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { style: {
          border: '50px solid rgba(0, 0, 0, 0.3)',
          boxShadow: 'inset 0 0 0 5px rgba(255, 0, 0, 0.5)',
          flex: 1
        } });
    }
  }]);

  return DefaultViewFinder;
}(_react.PureComponent);