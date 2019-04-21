"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _pubsub2 = _interopRequireDefault(require("./pubsub"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var Store =
/*#__PURE__*/
function () {
  function Store() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Store);

    Object.defineProperty(this, _internalState, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _pubsub, {
      writable: true,
      value: void 0
    });
    if (!(0, _isObject["default"])(initialState)) throw new Error('initial state must be a object');
    _classPrivateFieldLooseBase(this, _internalState)[_internalState] = initialState;
    _classPrivateFieldLooseBase(this, _pubsub)[_pubsub] = new _pubsub2["default"]();
  }

  _createClass(Store, [{
    key: "setState",
    value: function setState(v) {
      if (!(0, _isObject["default"])(v)) throw new Error('paramenter should be a object');
      var oldState = (0, _cloneDeep["default"])(_classPrivateFieldLooseBase(this, _internalState)[_internalState]);
      var value = (0, _cloneDeep["default"])(v);
      var newState = Object.assign(_classPrivateFieldLooseBase(this, _internalState)[_internalState], value);

      _classPrivateFieldLooseBase(this, _pubsub)[_pubsub].publish(newState, oldState);

      _classPrivateFieldLooseBase(this, _internalState)[_internalState] = newState;
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback, config) {
      _classPrivateFieldLooseBase(this, _pubsub)[_pubsub].subscribe(callback, config);
    }
  }, {
    key: "state",
    get: function get() {
      return (0, _cloneDeep["default"])(_classPrivateFieldLooseBase(this, _internalState)[_internalState]);
    }
  }]);

  return Store;
}();

var _internalState = _classPrivateFieldLooseKey("internalState");

var _pubsub = _classPrivateFieldLooseKey("pubsub");

var _default = Store;
exports["default"] = _default;