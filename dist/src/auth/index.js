'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.Error =
  exports.GRANTED_STORAGE_ACCESS_COOKIE_NAME =
  exports.TEST_COOKIE_NAME =
  exports.TOP_LEVEL_OAUTH_COOKIE_NAME =
  exports.DEFAULT_ACCESS_MODE =
    void 0;
var tslib_1 = require('tslib');
var cookie_options_1 = tslib_1.__importDefault(require('./cookie-options'));
var create_enable_cookies_1 = tslib_1.__importDefault(
  require('./create-enable-cookies'),
);
var create_top_level_oauth_redirect_1 = tslib_1.__importDefault(
  require('./create-top-level-oauth-redirect'),
);
var create_request_storage_access_1 = tslib_1.__importDefault(
  require('./create-request-storage-access'),
);
var set_user_agent_1 = tslib_1.__importDefault(require('./set-user-agent'));
var shopify_api_1 = tslib_1.__importDefault(require('@shopify/shopify-api'));
var DEFAULT_MYSHOPIFY_DOMAIN = 'myshopify.com';
exports.DEFAULT_ACCESS_MODE = 'online';
exports.TOP_LEVEL_OAUTH_COOKIE_NAME = 'shopifyTopLevelOAuth';
exports.TEST_COOKIE_NAME = 'shopifyTestCookie';
exports.GRANTED_STORAGE_ACCESS_COOKIE_NAME = 'shopify.granted_storage_access';
function hasCookieAccess(_a) {
  var cookies = _a.cookies;
  return Boolean(cookies[exports.TEST_COOKIE_NAME]);
}
function grantedStorageAccess(_a) {
  var cookies = _a.cookies;
  return Boolean(cookies[exports.GRANTED_STORAGE_ACCESS_COOKIE_NAME]);
}
function shouldPerformInlineOAuth(_a) {
  var cookies = _a.cookies;
  return Boolean(cookies[exports.TOP_LEVEL_OAUTH_COOKIE_NAME]);
}
function createShopifyAuth(options) {
  var config = tslib_1.__assign(
    {
      prefix: '',
      myShopifyDomain: DEFAULT_MYSHOPIFY_DOMAIN,
      accessMode: exports.DEFAULT_ACCESS_MODE,
    },
    options,
  );
  var prefix = config.prefix;
  var oAuthStartPath = ''.concat(prefix, '/auth');
  var oAuthCallbackPath = ''.concat(oAuthStartPath, '/callback');
  var inlineOAuthPath = ''.concat(prefix, '/auth/inline');
  var topLevelOAuthRedirect = (0, create_top_level_oauth_redirect_1.default)(
    shopify_api_1.default.Context.API_KEY,
    inlineOAuthPath,
  );
  var enableCookiesPath = ''.concat(oAuthStartPath, '/enable_cookies');
  var enableCookies = (0, create_enable_cookies_1.default)(config);
  var requestStorageAccess = (0, create_request_storage_access_1.default)(
    config,
  );
  (0, set_user_agent_1.default)();
  return function shopifyAuth(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
      var shop, redirectUrl, authQuery, shopifyResponse, e_1, e_2;
      return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            req.cookies.secure = true;
            if (
              !(
                req.path === oAuthStartPath &&
                !hasCookieAccess(req) &&
                !grantedStorageAccess(req)
              )
            )
              return [3 /*break*/, 2];
            return [4 /*yield*/, requestStorageAccess(req, res)];
          case 1:
            _a.sent();
            return [2 /*return*/];
          case 2:
            if (
              !(
                req.path === inlineOAuthPath ||
                (req.path === oAuthStartPath && shouldPerformInlineOAuth(req))
              )
            )
              return [3 /*break*/, 4];
            shop = req.query.shop;
            if (shop == null) {
              res.send(400);
            }
            res.cookie(
              exports.TOP_LEVEL_OAUTH_COOKIE_NAME,
              '',
              (0, cookie_options_1.default)(req),
            );
            return [
              4 /*yield*/,
              shopify_api_1.default.Auth.beginAuth(
                req,
                res,
                shop,
                oAuthCallbackPath,
                config.accessMode === 'online',
              ),
            ];
          case 3:
            redirectUrl = _a.sent();
            res.redirect(redirectUrl);
            return [2 /*return*/];
          case 4:
            if (!(req.path === oAuthStartPath)) return [3 /*break*/, 6];
            return [4 /*yield*/, topLevelOAuthRedirect(req, res)];
          case 5:
            _a.sent();
            return [2 /*return*/];
          case 6:
            if (!(req.path === oAuthCallbackPath)) return [3 /*break*/, 16];
            _a.label = 7;
          case 7:
            _a.trys.push([7, 14, , 15]);
            authQuery = {
              code: req.query.code,
              shop: req.query.shop,
              host: req.query.host,
              state: req.query.state,
              timestamp: req.query.timestamp,
              hmac: req.query.hmac,
            };
            shopifyResponse = void 0;
            _a.label = 8;
          case 8:
            _a.trys.push([8, 10, , 11]);
            return [
              4 /*yield*/,
              shopify_api_1.default.Auth.validateAuthCallback(
                req,
                res,
                authQuery,
              ),
            ];
          case 9:
            shopifyResponse = _a.sent();
            return [3 /*break*/, 11];
          case 10:
            e_1 = _a.sent();
            console.log('error', e_1);
            throw e_1;
          case 11:
            res.locals.shopify = shopifyResponse;
            if (!config.afterAuth) return [3 /*break*/, 13];
            return [4 /*yield*/, config.afterAuth(req, res)];
          case 12:
            _a.sent();
            _a.label = 13;
          case 13:
            return [3 /*break*/, 15];
          case 14:
            e_2 = _a.sent();
            switch (true) {
              case e_2 instanceof
                shopify_api_1.default.Errors.InvalidOAuthError:
                res.status(400).send(e_2.message);
                break;
              case e_2 instanceof shopify_api_1.default.Errors.CookieNotFound:
              case e_2 instanceof shopify_api_1.default.Errors.SessionNotFound:
                // This is likely because the OAuth session cookie expired before the merchant approved the request
                res.redirect(
                  ''.concat(oAuthStartPath, '?shop=').concat(req.query.shop),
                );
                break;
              default:
                res.status(500).send(e_2.message);
                break;
            }
            return [3 /*break*/, 15];
          case 15:
            return [2 /*return*/];
          case 16:
            if (!(req.path === enableCookiesPath)) return [3 /*break*/, 18];
            return [4 /*yield*/, enableCookies(req, res)];
          case 17:
            _a.sent();
            return [2 /*return*/];
          case 18:
            return [4 /*yield*/, next()];
          case 19:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
}
exports.default = createShopifyAuth;
var errors_1 = require('./errors');
Object.defineProperty(exports, 'Error', {
  enumerable: true,
  get: function () {
    return tslib_1.__importDefault(errors_1).default;
  },
});
