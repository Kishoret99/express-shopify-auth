'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
var tslib_1 = require('tslib');
var querystring_1 = tslib_1.__importDefault(require('querystring'));
var redirection_page_1 = tslib_1.__importDefault(require('./redirection-page'));
function createTopLevelRedirect(apiKey, path) {
  return function topLevelRedirect(req, res) {
    var query = req.query;
    var shop = query.shop,
      host = query.host;
    var params = {shop: shop};
    var queryString = querystring_1.default.stringify(params);
    res.send(
      (0, redirection_page_1.default)({
        origin: shop,
        redirectTo: 'https://'
          .concat(req.hostname)
          .concat(path, '?')
          .concat(queryString),
        apiKey: apiKey,
        host: host,
      }),
    );
  };
}
exports.default = createTopLevelRedirect;
