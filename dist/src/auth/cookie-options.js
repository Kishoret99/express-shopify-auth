'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
function getCookieOptions(req) {
  var header = req.header;
  var userAgent = header['user-agent'];
  var isChrome = userAgent && userAgent.match(/chrome|crios/i);
  var cookieOptions = {};
  if (isChrome) {
    cookieOptions = {
      secure: true,
    };
  }
  return cookieOptions;
}
exports.default = getCookieOptions;
