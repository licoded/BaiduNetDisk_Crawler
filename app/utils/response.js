const Resp = (success, code, message, content) => {
  if (success) {
    return { success, code, message, content };
  } else {
    return { success, code, message };
  }
};

const ErrorResp = (code, errMsg) => {
  return Resp(false, code, errMsg, null);
};

const SuccessResp = (data, code = 200) => {
  return Resp(true, code, 'ok', data);
};

const ErrorCode = {
  NOT_FOUND: ErrorResp(404, '页面未找到'),
  METHOD_NOT_ALLOWED: ErrorResp(405, '请求的方法不允许'),
};

module.exports = {
  ErrorCode,
  ErrorResp,
  SuccessResp,
};