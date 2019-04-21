"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PubSub =
/*#__PURE__*/
function () {
  function PubSub() {
    _classCallCheck(this, PubSub);

    this.callbackList = [];
  }

  _createClass(PubSub, [{
    key: "publish",
    value: function publish(newState, oldState) {
      if (!(0, _isObject["default"])(newState)) throw new Error('pubsub.publish -> newState should be and object');
      if (!(0, _isObject["default"])(oldState)) throw new Error('pubsub.publish -> previsouState should be and object');
      this.callbackList.forEach(function (item) {
        var newValue = item.config(newState);
        var oldValue = item.config(oldState);

        if (!(0, _isEqual["default"])(newValue, oldValue)) {
          item.callback(newValue);
        }
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback, config) {
      if (typeof callback !== 'function') throw new Error('pubsub.subscribe -> callback should be a function');
      if (typeof config !== 'function') throw new Error('pubsub.subscribe -> config should be a function');
      this.callbackList = [].concat(_toConsumableArray(this.callbackList), [{
        callback: callback,
        config: config
      }]);
      return true;
    }
  }]);

  return PubSub;
}();

var _default = PubSub;
exports["default"] = _default;