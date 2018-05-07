'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _localStorage = require('./localStorage');

var _localStorage2 = _interopRequireDefault(_localStorage);

var _sessionStorage = require('./sessionStorage');

var _sessionStorage2 = _interopRequireDefault(_sessionStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { localStorage: _localStorage2.default, sessionStorage: _sessionStorage2.default };