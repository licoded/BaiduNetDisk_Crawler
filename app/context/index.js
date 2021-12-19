const { SuccessResp, ErrorResp } = require('../utils/response');

// Pay attention to `this` pointer, I use normal function instead of arrow function.

const success = function (...params) {
  this.body = SuccessResp(...params);
}

const error = function (...params) {
  this.body = ErrorResp(...params);
}

module.exports = {
  success,
  error,
};