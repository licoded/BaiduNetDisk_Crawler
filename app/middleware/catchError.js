const { ErrorCode, ErrorResp } = require('../utils/response');

class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 500, code = 200) {
    super();
    this.content = msg;
    this.code = code;
    this.message = errorCode;
  }
}

const catchError = async (ctx, next) => {
  try {
    await next();
    if (parseInt(ctx.status) === 404 && ctx.message === 'Not Found') {
      ctx.body = ErrorCode.NOT_FOUND;
    } else if (parseInt(ctx.status) === 405 && ctx.message === 'Method Not Allowed') {
      ctx.body = ErrorCode.METHOD_NOT_ALLOWED;
    }
  } catch (error) {
    if ((typeof error) === Object && error instanceof HttpException) {
      return ctx.body = ErrorResp(500, error.message);
    } else {
      return ctx.body = ErrorResp(500, error);
    }
  }
};

module.exports = catchError;
