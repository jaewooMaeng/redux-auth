(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("redux-auth");

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STORE_CURRENT_ENDPOINT_KEY = exports.SET_ENDPOINT_KEYS = undefined;
exports.setEndpointKeys = setEndpointKeys;
exports.storeCurrentEndpointKey = storeCurrentEndpointKey;
exports.configure = configure;

var _extend = __webpack_require__(15);

var _extend2 = _interopRequireDefault(_extend);

var _constants = __webpack_require__(20);

var C = _interopRequireWildcard(_constants);

var _authenticate = __webpack_require__(29);

var _ui = __webpack_require__(39);

var _server = __webpack_require__(30);

var _clientSettings = __webpack_require__(72);

var _sessionStorage = __webpack_require__(9);

var _verifyAuth = __webpack_require__(56);

var _verifyAuth2 = _interopRequireDefault(_verifyAuth);

var _parseUrl = __webpack_require__(40);

var _parseUrl2 = _interopRequireDefault(_parseUrl);

var _reactRouterRedux = __webpack_require__(77);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SET_ENDPOINT_KEYS = exports.SET_ENDPOINT_KEYS = "SET_ENDPOINT_KEYS";
var STORE_CURRENT_ENDPOINT_KEY = exports.STORE_CURRENT_ENDPOINT_KEY = "STORE_CURRENT_ENDPOINT_KEY";
function setEndpointKeys(endpoints, currentEndpointKey, defaultEndpointKey) {
  return { type: SET_ENDPOINT_KEYS, endpoints: endpoints, currentEndpointKey: currentEndpointKey, defaultEndpointKey: defaultEndpointKey };
};
function storeCurrentEndpointKey(currentEndpointKey) {
  return { type: STORE_CURRENT_ENDPOINT_KEY, currentEndpointKey: currentEndpointKey };
};

function configure() {
  var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (dispatch) {
    // don't render anything for OAuth redirects
    if (settings.currentLocation && settings.currentLocation.match(/blank=true/)) {
      return Promise.resolve({ blank: true });
    }

    dispatch((0, _authenticate.authenticateStart)());

    var promise = void 0,
        firstTimeLogin = void 0,
        user = void 0,
        headers = void 0,
        mustResetPassword = void 0;

    if (settings.isServer) {
      promise = (0, _verifyAuth2.default)(endpoint, settings).then(function (_ref) {
        var user = _ref.user,
            headers = _ref.headers,
            firstTimeLogin = _ref.firstTimeLogin,
            mustResetPassword = _ref.mustResetPassword,
            currentEndpoint = _ref.currentEndpoint,
            currentEndpointKey = _ref.currentEndpointKey,
            defaultEndpointKey = _ref.defaultEndpointKey;

        dispatch((0, _server.ssAuthTokenUpdate)({
          headers: headers,
          user: user,
          firstTimeLogin: firstTimeLogin,
          mustResetPassword: mustResetPassword
        }));

        dispatch(setEndpointKeys(Object.keys(currentEndpoint), currentEndpointKey, defaultEndpointKey));

        return user;
      }).catch(function (_ref2) {
        var reason = _ref2.reason,
            firstTimeLogin = _ref2.firstTimeLogin,
            mustResetPassword = _ref2.mustResetPassword,
            currentEndpoint = _ref2.currentEndpoint,
            defaultEndpointKey = _ref2.defaultEndpointKey;

        dispatch((0, _server.ssAuthTokenUpdate)({ firstTimeLogin: firstTimeLogin, mustResetPassword: mustResetPassword }));
        dispatch(setEndpointKeys(Object.keys(currentEndpoint || {}), null, defaultEndpointKey));
        return Promise.reject({ reason: reason });
      });
    } else {
      // if the authentication happened server-side, find the resulting auth
      // credentials that were injected into the dom.
      var tokenBridge = document.getElementById("token-bridge");

      if (tokenBridge) {
        var rawServerCreds = tokenBridge.innerHTML;
        if (rawServerCreds) {
          var serverCreds = JSON.parse(rawServerCreds);

          headers = serverCreds.headers;
          user = serverCreds.user;
          firstTimeLogin = serverCreds.firstTimeLogin;
          mustResetPassword = serverCreds.mustResetPassword;


          if (user) {
            dispatch((0, _authenticate.authenticateComplete)(user));

            // do NOT send initial validation request.
            // instead use the credentials that were sent back by the server.
            settings.initialCredentials = serverCreds;
          }

          // sync client dom to prevent React "out of sync" error
          dispatch((0, _server.ssAuthTokenUpdate)({
            user: user,
            headers: headers,
            mustResetPassword: mustResetPassword,
            firstTimeLogin: firstTimeLogin
          }));
        }
      }

      var _getRedirectInfo = (0, _parseUrl2.default)(window.location),
          authRedirectPath = _getRedirectInfo.authRedirectPath,
          authRedirectHeaders = _getRedirectInfo.authRedirectHeaders;

      if (authRedirectPath) {
        dispatch((0, _reactRouterRedux.push)({ pathname: authRedirectPath }));
      }

      if (authRedirectHeaders && authRedirectHeaders.uid && authRedirectHeaders["access-token"]) {
        settings.initialCredentials = Object.assign({}, settings.initialCredentials, { headers: authRedirectHeaders });
      }

      // if tokens were invalidated by server or from the settings, make sure
      // to clear browser credentials
      if (!settings.clientOnly && !settings.initialCredentials || settings.cleanSession) {
        (0, _sessionStorage.destroySession)();
      }

      promise = Promise.resolve((0, _clientSettings.applyConfig)({ dispatch: dispatch, endpoint: endpoint, settings: settings }));
    }

    return promise.then(function (user) {
      dispatch((0, _authenticate.authenticateComplete)(user));

      if (firstTimeLogin) {
        dispatch((0, _ui.showFirstTimeLoginSuccessModal)());
      }

      if (mustResetPassword) {
        dispatch((0, _ui.showPasswordResetSuccessModal)());
      }

      return user;
    }).catch(function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          reason = _ref3.reason;

      dispatch((0, _authenticate.authenticateError)([reason]));

      if (firstTimeLogin) {
        dispatch((0, _ui.showFirstTimeLoginErrorModal)());
      }

      if (mustResetPassword) {
        dispatch((0, _ui.showPasswordResetErrorModal)());
      }

      return Promise.resolve({ reason: reason });
    });
  };
}

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCurrentSettings = setCurrentSettings;
exports.getCurrentSettings = getCurrentSettings;
exports.setCurrentEndpoint = setCurrentEndpoint;
exports.getCurrentEndpoint = getCurrentEndpoint;
exports.setCurrentEndpointKey = setCurrentEndpointKey;
exports.getCurrentEndpointKey = getCurrentEndpointKey;
exports.setDefaultEndpointKey = setDefaultEndpointKey;
exports.getDefaultEndpointKey = getDefaultEndpointKey;
exports.resetConfig = resetConfig;
exports.destroySession = destroySession;
exports.getInitialEndpointKey = getInitialEndpointKey;
exports.getSessionEndpointKey = getSessionEndpointKey;
exports.getSessionEndpoint = getSessionEndpoint;
exports.getDestroyAccountUrl = getDestroyAccountUrl;
exports.getSignOutUrl = getSignOutUrl;
exports.getEmailSignInUrl = getEmailSignInUrl;
exports.getEmailSignUpUrl = getEmailSignUpUrl;
exports.getPasswordResetRequestUrl = getPasswordResetRequestUrl;
exports.getPasswordUpdateUrl = getPasswordUpdateUrl;
exports.getAccountUpdateUrl = getAccountUpdateUrl;
exports.getTokenValidationPath = getTokenValidationPath;
exports.getOAuthUrl = getOAuthUrl;
exports.getConfirmationSuccessUrl = getConfirmationSuccessUrl;
exports.getPasswordResetRedirectUrl = getPasswordResetRedirectUrl;
exports.getApiUrl = getApiUrl;
exports.getTokenFormat = getTokenFormat;
exports.removeData = removeData;
exports.persistData = persistData;
exports.retrieveData = retrieveData;

var _browserCookies = __webpack_require__(73);

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _constants = __webpack_require__(20);

var C = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// even though this code shouldn't be used server-side, node will throw
// errors if "window" is used
var root = Function("return this")() || (42, eval)("this");

// stateful variables that persist throughout session
root.authState = {
  currentSettings: {},
  currentEndpoint: {},
  defaultEndpointKey: null
};

function setCurrentSettings(s) {
  root.authState.currentSettings = s;
}

function getCurrentSettings() {
  return root.authState.currentSettings;
}

function setCurrentEndpoint(e) {
  root.authState.currentEndpoint = e;
}

function getCurrentEndpoint() {
  return root.authState.currentEndpoint;
}

function setCurrentEndpointKey(k) {
  persistData(C.SAVED_CONFIG_KEY, k || getDefaultEndpointKey());
}

function getCurrentEndpointKey() {
  return retrieveData(C.SAVED_CONFIG_KEY) || getDefaultEndpointKey();
}

function setDefaultEndpointKey(k) {
  persistData(C.DEFAULT_CONFIG_KEY, k);
}

function getDefaultEndpointKey() {
  return retrieveData(C.DEFAULT_CONFIG_KEY);
}

// reset stateful variables
function resetConfig() {
  root.authState = root.authState || {};
  root.authState.currentSettings = {};
  root.authState.currentEndpoint = {};
  destroySession();
}

function destroySession() {
  var sessionKeys = [C.SAVED_CREDS_KEY, C.SAVED_CONFIG_KEY];

  for (var key in sessionKeys) {
    key = sessionKeys[key];

    // kill all local storage keys
    if (root.localStorage) {
      root.localStorage.removeItem(key);
    }

    // remove from base path in case config is not specified
    _browserCookies2.default.erase(key, {
      path: root.authState.currentSettings.cookiePath || "/"
    });
  }
}

function unescapeQuotes(val) {
  return val && val.replace(/("|')/g, "");
};

function getInitialEndpointKey() {
  return unescapeQuotes(_browserCookies2.default.get(C.SAVED_CONFIG_KEY) || root.localStorage && root.localStorage.getItem(C.SAVED_CONFIG_KEY));
}

// TODO: make this really work
function getSessionEndpointKey(k) {
  var key = k || getCurrentEndpointKey();
  if (!key) {
    throw "You must configure redux-auth before use.";
  } else {
    return key;
  }
}

function getSessionEndpoint(k) {
  return getCurrentEndpoint()[getSessionEndpointKey(k)];
}

// only should work for current session
function getDestroyAccountUrl(endpointKey) {
  return "" + getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).accountDeletePath;
}

// only should work for current session
function getSignOutUrl(endpointKey) {
  return "" + getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).signOutPath;
}

function getEmailSignInUrl(endpointKey) {
  return "" + getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).emailSignInPath;
}

function getEmailSignUpUrl(endpointKey) {
  return "" + getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).emailRegistrationPath + "?config_name=" + endpointKey;
}

function getPasswordResetRequestUrl(endpointKey) {
  return "" + getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).passwordResetPath + "?config_name=" + endpointKey;
}

function getPasswordUpdateUrl(endpointKey) {
  return "" + getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).passwordUpdatePath;
}

function getAccountUpdateUrl(endpointKey) {
  return "" + getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).accountUpdatePath;
}

function getTokenValidationPath(endpointKey) {
  return "" + getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).tokenValidationPath;
}

function getOAuthUrl(_ref) {
  var provider = _ref.provider,
      params = _ref.params,
      endpointKey = _ref.endpointKey;

  var oAuthUrl = getApiUrl(endpointKey) + getSessionEndpoint(endpointKey).authProviderPaths[provider] + "?auth_origin_url=" + encodeURIComponent(root.location.href) + "&config_name=" + encodeURIComponent(getSessionEndpointKey(endpointKey));

  if (params) {
    for (var key in params) {
      oAuthUrl += "&";
      oAuthUrl += encodeURIComponent(key);
      oAuthUrl += "=";
      oAuthUrl += encodeURIComponent(params[key]);
    }
  }

  return oAuthUrl;
}

function getConfirmationSuccessUrl() {
  return root.authState.currentSettings.confirmationSuccessUrl();
}

function getPasswordResetRedirectUrl() {
  return root.authState.currentSettings.confirmationSuccessUrl();
}

function getApiUrl(key) {
  var configKey = getSessionEndpointKey(key);
  return root.authState.currentEndpoint[configKey].apiUrl;
}

function getTokenFormat() {
  return root.authState.currentSettings.tokenFormat;
}

function removeData(key) {

  switch (root.authState.currentSettings.storage) {
    case "localStorage":
      root.localStorage.removeItem(key);
      break;
    default:
      _browserCookies2.default.erase(key);
  }
}

function persistData(key, val) {
  val = JSON.stringify(val);

  switch (root.authState.currentSettings.storage) {
    case "localStorage":
      root.localStorage.setItem(key, val);
      break;

    default:
      _browserCookies2.default.set(key, val, {
        expires: root.authState.currentSettings.cookieExpiry,
        path: root.authState.currentSettings.cookiePath
      });
      break;
  }
};

function retrieveData(key, storage) {
  var val = null;

  switch (storage || root.authState.currentSettings.storage) {
    case "localStorage":
      val = root.localStorage && root.localStorage.getItem(key);
      break;

    default:
      val = _browserCookies2.default.get(key);
      break;
  }

  // if value is a simple string, the parser will fail. in that case, simply
  // unescape the quotes and return the string.
  try {
    // return parsed json response
    return JSON.parse(val);
  } catch (err) {
    // unescape quotes
    return unescapeQuotes(val);
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("redux-immutablejs");

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAuthorizationHeader = addAuthorizationHeader;

exports.default = function (url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!options.headers) {
    options.headers = {};
  }
  (0, _extend2.default)(options.headers, getAuthHeaders(url));
  return (0, _isomorphicFetch2.default)(url, options).then(function (resp) {
    return updateAuthCredentials(resp);
  });
};

var _isomorphicFetch = __webpack_require__(54);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _constants = __webpack_require__(20);

var C = _interopRequireWildcard(_constants);

var _extend = __webpack_require__(15);

var _extend2 = _interopRequireDefault(_extend);

var _sessionStorage = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isApiRequest = function isApiRequest(url) {
  return url.match((0, _sessionStorage.getApiUrl)((0, _sessionStorage.getSessionEndpointKey)()));
};

/**
 * Add access token as a bearer token in accordance to RFC 6750
 *
 * @param {string} accessToken
 * @param {object} headers
 * @returns {object} New extended headers object, with Authorization property
 */
function addAuthorizationHeader(accessToken, headers) {
  return Object.assign({}, headers, {
    Authorization: "Bearer " + accessToken
  });
}

function getAuthHeaders(url) {
  if (isApiRequest(url)) {
    // fetch current auth headers from storage
    var currentHeaders = (0, _sessionStorage.retrieveData)(C.SAVED_CREDS_KEY) || {},
        nextHeaders = {};

    // bust IE cache
    nextHeaders["If-Modified-Since"] = "Mon, 26 Jul 1997 05:00:00 GMT";

    // set header for each key in `tokenFormat` config
    for (var key in (0, _sessionStorage.getTokenFormat)()) {
      nextHeaders[key] = currentHeaders[key];
    }

    return addAuthorizationHeader(currentHeaders['access-token'], nextHeaders);
  } else {
    return {};
  }
}

function updateAuthCredentials(resp) {
  // check config apiUrl matches the current response url
  if (isApiRequest(resp.url)) {
    // set header for each key in `tokenFormat` config
    var newHeaders = {};

    // set flag to ensure that we don't accidentally nuke the headers
    // if the response tokens aren't sent back from the API
    var blankHeaders = true;

    // set header key + val for each key in `tokenFormat` config
    for (var key in (0, _sessionStorage.getTokenFormat)()) {
      newHeaders[key] = resp.headers.get(key);
    }
    if (!!newHeaders['access-token']) {
      blankHeaders = false;
    }

    // persist headers for next request
    if (!blankHeaders) {
      (0, _sessionStorage.persistData)(C.SAVED_CREDS_KEY, newHeaders);
    }
  }

  return resp;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var ReactIs = require('react-is');

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(80)();
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var bind = __webpack_require__(62);
var isBuffer = __webpack_require__(104);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (_typeof(result[key]) === 'object' && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("extend");

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseResponse = parseResponse;

var _reactRouterDom = __webpack_require__(78);

function parseResponse(response) {
  var json = response.json();
  if (response.status >= 200 && response.status < 300) {
    return json;
  } else {
    return json.then(function (err) {
      return Promise.reject(err);
    });
  }
}

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var INITIAL_CONFIG_KEY = exports.INITIAL_CONFIG_KEY = "default";
var DEFAULT_CONFIG_KEY = exports.DEFAULT_CONFIG_KEY = "defaultConfigKey";
var SAVED_CONFIG_KEY = exports.SAVED_CONFIG_KEY = "currentConfigName";
var SAVED_CREDS_KEY = exports.SAVED_CREDS_KEY = "authHeaders";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function warning() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (false) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("history");

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateStart = authenticateStart;
exports.authenticateComplete = authenticateComplete;
exports.authenticateError = authenticateError;
var AUTHENTICATE_START = exports.AUTHENTICATE_START = "AUTHENTICATE_START";
var AUTHENTICATE_COMPLETE = exports.AUTHENTICATE_COMPLETE = "AUTHENTICATE_COMPLETE";
var AUTHENTICATE_ERROR = exports.AUTHENTICATE_ERROR = "AUTHENTICATE_ERROR";

function authenticateStart() {
  return { type: AUTHENTICATE_START };
}
function authenticateComplete(user) {
  return { type: AUTHENTICATE_COMPLETE, user: user };
}
function authenticateError(errors) {
  return { type: AUTHENTICATE_ERROR, errors: errors };
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ssAuthTokenUpdate = ssAuthTokenUpdate;
var SS_AUTH_TOKEN_UPDATE = exports.SS_AUTH_TOKEN_UPDATE = "SS_AUTH_TOKEN_UPDATE";

function ssAuthTokenUpdate(_ref) {
  var user = _ref.user,
      headers = _ref.headers,
      mustResetPassword = _ref.mustResetPassword,
      firstTimeLogin = _ref.firstTimeLogin,
      endpointKey = _ref.endpointKey;

  return { type: SS_AUTH_TOKEN_UPDATE, user: user, headers: headers, mustResetPassword: mustResetPassword, firstTimeLogin: firstTimeLogin, endpointKey: endpointKey };
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMAIL_SIGN_IN_FORM_UPDATE = exports.EMAIL_SIGN_IN_ERROR = exports.TFA_EMAIL_SIGN_IN_COMPLETE = exports.EMAIL_SIGN_IN_TEMP = exports.EMAIL_SIGN_IN_COMPLETE = exports.EMAIL_SIGN_IN_START = undefined;
exports.emailSignInFormUpdate = emailSignInFormUpdate;
exports.emailSignInStart = emailSignInStart;
exports.emailSignInComplete = emailSignInComplete;
exports.emailSignInTemp = emailSignInTemp;
exports.tfaEmailSignInComplete = tfaEmailSignInComplete;
exports.emailSignInError = emailSignInError;
exports.emailSignIn = emailSignIn;

var _sessionStorage = __webpack_require__(9);

var _configure = __webpack_require__(5);

var _handleFetchResponse = __webpack_require__(17);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMAIL_SIGN_IN_START = exports.EMAIL_SIGN_IN_START = "EMAIL_SIGN_IN_START";
var EMAIL_SIGN_IN_COMPLETE = exports.EMAIL_SIGN_IN_COMPLETE = "EMAIL_SIGN_IN_COMPLETE";
var EMAIL_SIGN_IN_TEMP = exports.EMAIL_SIGN_IN_TEMP = "EMAIL_SIGN_IN_TEMP";
var TFA_EMAIL_SIGN_IN_COMPLETE = exports.TFA_EMAIL_SIGN_IN_COMPLETE = "TFA_EMAIL_SIGN_IN_COMPLETE";
var EMAIL_SIGN_IN_ERROR = exports.EMAIL_SIGN_IN_ERROR = "EMAIL_SIGN_IN_ERROR";
var EMAIL_SIGN_IN_FORM_UPDATE = exports.EMAIL_SIGN_IN_FORM_UPDATE = "EMAIL_SIGN_IN_FORM_UPDATE";

function emailSignInFormUpdate(endpoint, key, value) {
  return { type: EMAIL_SIGN_IN_FORM_UPDATE, endpoint: endpoint, key: key, value: value };
}
function emailSignInStart(endpoint) {
  return { type: EMAIL_SIGN_IN_START, endpoint: endpoint };
}
function emailSignInComplete(endpoint, user) {
  return { type: EMAIL_SIGN_IN_COMPLETE, user: user, endpoint: endpoint };
}
function emailSignInTemp(endpoint, user) {
  return { type: EMAIL_SIGN_IN_TEMP, user: user, endpoint: endpoint };
}
function tfaEmailSignInComplete() {
  console.log("kjsfkhjsahdlaksjdad");
  return { type: TFA_EMAIL_SIGN_IN_COMPLETE };
}
function emailSignInError(endpoint, errors) {
  return { type: EMAIL_SIGN_IN_ERROR, errors: errors, endpoint: endpoint };
}
function emailSignIn(body, endpointKey) {
  return function (dispatch) {
    // save previous endpoint key in case  of failure
    var prevEndpointKey = (0, _sessionStorage.getCurrentEndpointKey)();

    // necessary for fetch to recognize the response as an api request
    (0, _sessionStorage.setCurrentEndpointKey)(endpointKey);
    var currentEndpointKey = (0, _sessionStorage.getCurrentEndpointKey)();

    dispatch((0, _configure.storeCurrentEndpointKey)(currentEndpointKey));
    dispatch(emailSignInStart(currentEndpointKey));

    return (0, _fetch2.default)((0, _sessionStorage.getEmailSignInUrl)(currentEndpointKey), {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(body)
    }).then(_handleFetchResponse.parseResponse).then(function (user) {
      console.log(user);
      if (!user.authenticated) {
        console.log(user.authenticated);
        dispatch(emailSignInTemp(currentEndpointKey, user));
        return user;
      } else {
        console.log(user.authenticated);
        dispatch(emailSignInComplete(currentEndpointKey, user));
        return user;
      }
    }).catch(function (errors) {
      // revert endpoint key to what it was before failed request
      (0, _sessionStorage.setCurrentEndpointKey)(prevEndpointKey);
      dispatch((0, _configure.storeCurrentEndpointKey)(prevEndpointKey));
      dispatch(emailSignInError(currentEndpointKey, errors));
      throw errors;
    });
  };
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIGN_OUT_ERROR = exports.SIGN_OUT_COMPLETE = exports.SIGN_OUT_START = undefined;
exports.signOutStart = signOutStart;
exports.signOutComplete = signOutComplete;
exports.signOutError = signOutError;
exports.signOut = signOut;

var _sessionStorage = __webpack_require__(9);

var _handleFetchResponse = __webpack_require__(17);

var _configure = __webpack_require__(5);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIGN_OUT_START = exports.SIGN_OUT_START = "SIGN_OUT_START";
var SIGN_OUT_COMPLETE = exports.SIGN_OUT_COMPLETE = "SIGN_OUT_COMPLETE";
var SIGN_OUT_ERROR = exports.SIGN_OUT_ERROR = "SIGN_OUT_ERROR";

function signOutStart(endpoint) {
  return { type: SIGN_OUT_START, endpoint: endpoint };
}
function signOutComplete(endpoint, user) {
  return { type: SIGN_OUT_COMPLETE, user: user, endpoint: endpoint };
}
function signOutError(endpoint, errors) {
  return { type: SIGN_OUT_ERROR, endpoint: endpoint, errors: errors };
}
function signOut(endpoint) {
  return function (dispatch) {
    dispatch(signOutStart(endpoint));

    return (0, _fetch2.default)((0, _sessionStorage.getSignOutUrl)(endpoint), { method: "delete" }).then(_handleFetchResponse.parseResponse).then(function (user) {
      dispatch(signOutComplete(endpoint, user));
      dispatch((0, _configure.storeCurrentEndpointKey)(null));
      (0, _sessionStorage.destroySession)();
    }).catch(function (_ref) {
      var errors = _ref.errors;

      dispatch(signOutError(endpoint, errors));
      dispatch((0, _configure.storeCurrentEndpointKey)(null));
      (0, _sessionStorage.destroySession)();
      throw errors;
    });
  };
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMAIL_SIGN_UP_FORM_UPDATE = exports.EMAIL_SIGN_UP_ERROR = exports.EMAIL_SIGN_UP_COMPLETE = exports.EMAIL_SIGN_UP_START = undefined;
exports.emailSignUpFormUpdate = emailSignUpFormUpdate;
exports.emailSignUpStart = emailSignUpStart;
exports.emailSignUpComplete = emailSignUpComplete;
exports.emailSignUpError = emailSignUpError;
exports.emailSignUp = emailSignUp;

var _sessionStorage = __webpack_require__(9);

var _handleFetchResponse = __webpack_require__(17);

var _extend = __webpack_require__(15);

var _extend2 = _interopRequireDefault(_extend);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMAIL_SIGN_UP_START = exports.EMAIL_SIGN_UP_START = "EMAIL_SIGN_UP_START";
var EMAIL_SIGN_UP_COMPLETE = exports.EMAIL_SIGN_UP_COMPLETE = "EMAIL_SIGN_UP_COMPLETE";
var EMAIL_SIGN_UP_ERROR = exports.EMAIL_SIGN_UP_ERROR = "EMAIL_SIGN_UP_ERROR";
var EMAIL_SIGN_UP_FORM_UPDATE = exports.EMAIL_SIGN_UP_FORM_UPDATE = "EMAIL_SIGN_UP_FORM_UPDATE";

function emailSignUpFormUpdate(endpoint, key, value) {
  return { type: EMAIL_SIGN_UP_FORM_UPDATE, endpoint: endpoint, key: key, value: value };
}
function emailSignUpStart(endpoint) {
  return { type: EMAIL_SIGN_UP_START, endpoint: endpoint };
}
function emailSignUpComplete(user, endpoint) {
  return { type: EMAIL_SIGN_UP_COMPLETE, user: user, endpoint: endpoint };
}
function emailSignUpError(errors, endpoint) {
  return { type: EMAIL_SIGN_UP_ERROR, errors: errors, endpoint: endpoint };
}
function emailSignUp(body, endpointKey) {
  return function (dispatch) {
    if (Object.keys(body).length === 0 && body.constructor === Object) {
      return Promise.resolve(dispatch(updateAccountError({}, endpointKey)));
    }
    dispatch(emailSignUpStart(endpointKey));

    var data = new FormData();
    for (var key in body) {
      if (body[key]) {
        data.append(key, body[key]);
      }
    }
    data.append('confirm_success_url', (0, _sessionStorage.getConfirmationSuccessUrl)());

    return (0, _fetch2.default)((0, _sessionStorage.getEmailSignUpUrl)(endpointKey), {
      //headers: {
      //"Accept": "application/json",
      //'Content-Type': 'multipart/form-data',
      //},
      method: "post",
      body: data
    }).then(_handleFetchResponse.parseResponse).then(function (_ref) {
      var data = _ref.data;
      return dispatch(emailSignUpComplete(data, endpointKey));
    }).catch(function (_ref2) {
      var errors = _ref2.errors;

      dispatch(emailSignUpError(errors, endpointKey));
      throw errors;
    });
  };
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAUTH_SIGN_IN_ERROR = exports.OAUTH_SIGN_IN_COMPLETE = exports.OAUTH_SIGN_IN_START = undefined;
exports.oAuthSignInStart = oAuthSignInStart;
exports.oAuthSignInComplete = oAuthSignInComplete;
exports.oAuthSignInError = oAuthSignInError;
exports.oAuthSignIn = oAuthSignIn;

var _constants = __webpack_require__(20);

var C = _interopRequireWildcard(_constants);

var _parseUrl = __webpack_require__(40);

var _sessionStorage = __webpack_require__(9);

var _configure = __webpack_require__(5);

var _handleFetchResponse = __webpack_require__(17);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

var _popup = __webpack_require__(100);

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var OAUTH_SIGN_IN_START = exports.OAUTH_SIGN_IN_START = "OAUTH_SIGN_IN_START";
var OAUTH_SIGN_IN_COMPLETE = exports.OAUTH_SIGN_IN_COMPLETE = "OAUTH_SIGN_IN_COMPLETE";
var OAUTH_SIGN_IN_ERROR = exports.OAUTH_SIGN_IN_ERROR = "OAUTH_SIGN_IN_ERROR";

// hook for rewire
var openPopup = _popup2.default;

function listenForCredentials(endpointKey, popup, provider, resolve, reject) {
  if (!resolve) {
    return new Promise(function (resolve, reject) {
      listenForCredentials(endpointKey, popup, provider, resolve, reject);
    });
  } else {
    var creds = void 0;

    try {
      creds = (0, _parseUrl.getAllParams)(popup.location);
    } catch (err) {}

    if (creds && creds.uid) {
      popup.close();
      (0, _sessionStorage.persistData)(C.SAVED_CREDS_KEY, (0, _parseUrl.normalizeTokenKeys)(creds));
      (0, _fetch2.default)((0, _sessionStorage.getTokenValidationPath)(endpointKey)).then(_handleFetchResponse.parseResponse).then(function (_ref) {
        var data = _ref.data;
        return resolve(data);
      }).catch(function (_ref2) {
        var errors = _ref2.errors;
        return reject({ errors: errors });
      });
    } else if (popup.closed) {
      reject({ errors: "Authentication was cancelled." });
    } else {
      setTimeout(function () {
        listenForCredentials(endpointKey, popup, provider, resolve, reject);
      }, 0);
    }
  }
}

function authenticate(_ref3) {
  var endpointKey = _ref3.endpointKey,
      provider = _ref3.provider,
      url = _ref3.url,
      _ref3$tab = _ref3.tab,
      tab = _ref3$tab === undefined ? false : _ref3$tab;

  var name = tab ? "_blank" : provider;
  var popup = openPopup(provider, url, name);
  return listenForCredentials(endpointKey, popup, provider);
}

function oAuthSignInStart(provider, endpoint) {
  return { type: OAUTH_SIGN_IN_START, provider: provider, endpoint: endpoint };
}
function oAuthSignInComplete(user, endpoint) {
  return { type: OAUTH_SIGN_IN_COMPLETE, user: user, endpoint: endpoint };
}
function oAuthSignInError(errors, endpoint) {
  return { type: OAUTH_SIGN_IN_ERROR, errors: errors, endpoint: endpoint };
}
function oAuthSignIn(_ref4) {
  var provider = _ref4.provider,
      params = _ref4.params,
      endpointKey = _ref4.endpointKey;

  return function (dispatch) {
    // save previous endpoint key in case of failure
    var prevEndpointKey = (0, _sessionStorage.getCurrentEndpointKey)();

    // necessary for `fetch` to recognize the response as an api request
    (0, _sessionStorage.setCurrentEndpointKey)(endpointKey);
    dispatch((0, _configure.storeCurrentEndpointKey)(endpointKey));

    var currentEndpointKey = (0, _sessionStorage.getCurrentEndpointKey)();

    dispatch(oAuthSignInStart(provider, currentEndpointKey));

    var url = (0, _sessionStorage.getOAuthUrl)({ provider: provider, params: params, currentEndpointKey: currentEndpointKey });

    return authenticate({ endpointKey: endpointKey, provider: provider, url: url }).then(function (user) {
      return dispatch(oAuthSignInComplete(user, currentEndpointKey));
    }).catch(function (_ref5) {
      var errors = _ref5.errors;

      // revert endpoint key to what it was before failed request
      (0, _sessionStorage.setCurrentEndpointKey)(prevEndpointKey);
      dispatch((0, _configure.storeCurrentEndpointKey)(prevEndpointKey));
      dispatch(oAuthSignInError(errors, currentEndpointKey));
      throw errors;
    });
  };
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_PASSWORD_MODAL_FORM_UPDATE = exports.UPDATE_PASSWORD_MODAL_ERROR = exports.UPDATE_PASSWORD_MODAL_COMPLETE = exports.UPDATE_PASSWORD_MODAL_START = undefined;
exports.updatePasswordModalFormUpdate = updatePasswordModalFormUpdate;
exports.updatePasswordModalStart = updatePasswordModalStart;
exports.updatePasswordModalComplete = updatePasswordModalComplete;
exports.updatePasswordModalError = updatePasswordModalError;
exports.updatePasswordModal = updatePasswordModal;

var _sessionStorage = __webpack_require__(9);

var _handleFetchResponse = __webpack_require__(17);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE_PASSWORD_MODAL_START = exports.UPDATE_PASSWORD_MODAL_START = "UPDATE_PASSWORD_MODAL_START";
var UPDATE_PASSWORD_MODAL_COMPLETE = exports.UPDATE_PASSWORD_MODAL_COMPLETE = "UPDATE_PASSWORD_MODAL_COMPLETE";
var UPDATE_PASSWORD_MODAL_ERROR = exports.UPDATE_PASSWORD_MODAL_ERROR = "UPDATE_PASSWORD_MODAL_ERROR";
var UPDATE_PASSWORD_MODAL_FORM_UPDATE = exports.UPDATE_PASSWORD_MODAL_FORM_UPDATE = "UPDATE_PASSWORD_MODAL_FORM_UPDATE";

function updatePasswordModalFormUpdate(endpoint, key, value) {
  return { type: UPDATE_PASSWORD_MODAL_FORM_UPDATE, endpoint: endpoint, key: key, value: value };
}
function updatePasswordModalStart(endpoint) {
  return { type: UPDATE_PASSWORD_MODAL_START, endpoint: endpoint };
}
function updatePasswordModalComplete(endpoint, user) {
  return { type: UPDATE_PASSWORD_MODAL_COMPLETE, endpoint: endpoint, user: user };
}
function updatePasswordModalError(endpoint, errors) {
  return { type: UPDATE_PASSWORD_MODAL_ERROR, endpoint: endpoint, errors: errors };
}
function updatePasswordModal(body, endpointKey) {
  return function (dispatch) {
    dispatch(updatePasswordModalStart(endpointKey));

    return (0, _fetch2.default)((0, _sessionStorage.getPasswordUpdateUrl)(endpointKey), {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "put",
      body: JSON.stringify(body)
    }).then(_handleFetchResponse.parseResponse).then(function (_ref) {
      var user = _ref.user;
      return dispatch(updatePasswordModalComplete(endpointKey, user));
    }).catch(function (_ref2) {
      var errors = _ref2.errors;
      return dispatch(updatePasswordModalError(endpointKey, errors));
    });
  };
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DESTROY_ACCOUNT_ERROR = exports.DESTROY_ACCOUNT_COMPLETE = exports.DESTROY_ACCOUNT_START = undefined;
exports.destroyAccountStart = destroyAccountStart;
exports.destroyAccountComplete = destroyAccountComplete;
exports.destroyAccountError = destroyAccountError;
exports.destroyAccount = destroyAccount;

var _sessionStorage = __webpack_require__(9);

var _handleFetchResponse = __webpack_require__(17);

var _configure = __webpack_require__(5);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DESTROY_ACCOUNT_START = exports.DESTROY_ACCOUNT_START = "DESTROY_ACCOUNT_START";
var DESTROY_ACCOUNT_COMPLETE = exports.DESTROY_ACCOUNT_COMPLETE = "DESTROY_ACCOUNT_COMPLETE";
var DESTROY_ACCOUNT_ERROR = exports.DESTROY_ACCOUNT_ERROR = "DESTROY_ACCOUNT_ERROR";

function destroyAccountStart(endpoint) {
  return { type: DESTROY_ACCOUNT_START, endpoint: endpoint };
}
function destroyAccountComplete(message, endpoint) {
  return { type: DESTROY_ACCOUNT_COMPLETE, endpoint: endpoint, message: message };
}
function destroyAccountError(errors, endpoint) {
  return { type: DESTROY_ACCOUNT_ERROR, endpoint: endpoint, errors: errors };
}
function destroyAccount(endpoint) {
  return function (dispatch) {
    dispatch(destroyAccountStart(endpoint));

    return (0, _fetch2.default)((0, _sessionStorage.getDestroyAccountUrl)(endpoint), { method: "delete" }).then(_handleFetchResponse.parseResponse).then(function (_ref) {
      var message = _ref.message;

      dispatch(destroyAccountComplete(message, endpoint));

      // revert current session endpoint to default
      var defaultEndpointKey = (0, _sessionStorage.getDefaultEndpointKey)();

      // set in store
      dispatch((0, _configure.storeCurrentEndpointKey)(defaultEndpointKey));

      // and in session
      (0, _sessionStorage.setCurrentEndpointKey)(defaultEndpointKey);
    }).catch(function (_ref2) {
      var errors = _ref2.errors;
      return dispatch(destroyAccountError(errors, endpoint));
    });
  };
}

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideEmailSignInSuccessModal = hideEmailSignInSuccessModal;
exports.hideEmailSignInErrorModal = hideEmailSignInErrorModal;
exports.hideOAuthSignInSuccessModal = hideOAuthSignInSuccessModal;
exports.hideOAuthSignInErrorModal = hideOAuthSignInErrorModal;
exports.hideSignOutSuccessModal = hideSignOutSuccessModal;
exports.hideSignOutErrorModal = hideSignOutErrorModal;
exports.hideEmailSignUpSuccessModal = hideEmailSignUpSuccessModal;
exports.hideEmailSignUpErrorModal = hideEmailSignUpErrorModal;
exports.showFirstTimeLoginSuccessModal = showFirstTimeLoginSuccessModal;
exports.showPasswordResetSuccessModal = showPasswordResetSuccessModal;
exports.hideFirstTimeLoginSuccessModal = hideFirstTimeLoginSuccessModal;
exports.hidePasswordResetSuccessModal = hidePasswordResetSuccessModal;
exports.showFirstTimeLoginErrorModal = showFirstTimeLoginErrorModal;
exports.showPasswordResetErrorModal = showPasswordResetErrorModal;
exports.hideFirstTimeLoginErrorModal = hideFirstTimeLoginErrorModal;
exports.hidePasswordResetErrorModal = hidePasswordResetErrorModal;
exports.hidePasswordResetRequestSuccessModal = hidePasswordResetRequestSuccessModal;
exports.hidePasswordResetRequestErrorModal = hidePasswordResetRequestErrorModal;
exports.hideUpdatePasswordSuccessModal = hideUpdatePasswordSuccessModal;
exports.hideUpdatePasswordErrorModal = hideUpdatePasswordErrorModal;
exports.hideDestroyAccountSuccessModal = hideDestroyAccountSuccessModal;
exports.hideDestroyAccountErrorModal = hideDestroyAccountErrorModal;
var HIDE_EMAIL_SIGN_IN_SUCCESS_MODAL = exports.HIDE_EMAIL_SIGN_IN_SUCCESS_MODAL = "HIDE_EMAIL_SIGN_IN_SUCCESS_MODAL";
var HIDE_EMAIL_SIGN_IN_ERROR_MODAL = exports.HIDE_EMAIL_SIGN_IN_ERROR_MODAL = "HIDE_EMAIL_SIGN_IN_ERROR_MODAL";
var HIDE_OAUTH_SIGN_IN_SUCCESS_MODAL = exports.HIDE_OAUTH_SIGN_IN_SUCCESS_MODAL = "HIDE_OAUTH_SIGN_IN_SUCCESS_MODAL";
var HIDE_OAUTH_SIGN_IN_ERROR_MODAL = exports.HIDE_OAUTH_SIGN_IN_ERROR_MODAL = "HIDE_OAUTH_SIGN_IN_ERROR_MODAL";
var HIDE_SIGN_OUT_ERROR_MODAL = exports.HIDE_SIGN_OUT_ERROR_MODAL = "HIDE_SIGN_OUT_ERROR_MODAL";
var HIDE_SIGN_OUT_SUCCESS_MODAL = exports.HIDE_SIGN_OUT_SUCCESS_MODAL = "HIDE_SIGN_OUT_SUCCESS_MODAL";
var HIDE_EMAIL_SIGN_UP_SUCCESS_MODAL = exports.HIDE_EMAIL_SIGN_UP_SUCCESS_MODAL = "HIDE_EMAIL_SIGN_UP_SUCCESS_MODAL";
var HIDE_EMAIL_SIGN_UP_ERROR_MODAL = exports.HIDE_EMAIL_SIGN_UP_ERROR_MODAL = "HIDE_EMAIL_SIGN_UP_ERROR_MODAL";
var SHOW_FIRST_TIME_LOGIN_SUCCESS_MODAL = exports.SHOW_FIRST_TIME_LOGIN_SUCCESS_MODAL = "SHOW_FIRST_TIME_LOGIN_SUCCESS_MODAL";
var HIDE_FIRST_TIME_LOGIN_SUCCESS_MODAL = exports.HIDE_FIRST_TIME_LOGIN_SUCCESS_MODAL = "HIDE_FIRST_TIME_LOGIN_SUCCESS_MODAL";
var HIDE_PASSWORD_RESET_SUCCESS_MODAL = exports.HIDE_PASSWORD_RESET_SUCCESS_MODAL = "HIDE_PASSWORD_RESET_SUCCESS_MODAL";
var SHOW_PASSWORD_RESET_SUCCESS_MODAL = exports.SHOW_PASSWORD_RESET_SUCCESS_MODAL = "SHOW_PASSWORD_RESET_SUCCESS_MODAL";
var SHOW_FIRST_TIME_LOGIN_ERROR_MODAL = exports.SHOW_FIRST_TIME_LOGIN_ERROR_MODAL = "SHOW_FIRST_TIME_LOGIN_ERROR_MODAL";
var HIDE_FIRST_TIME_LOGIN_ERROR_MODAL = exports.HIDE_FIRST_TIME_LOGIN_ERROR_MODAL = "HIDE_FIRST_TIME_LOGIN_ERROR_MODAL";
var HIDE_PASSWORD_RESET_ERROR_MODAL = exports.HIDE_PASSWORD_RESET_ERROR_MODAL = "HIDE_PASSWORD_RESET_ERROR_MODAL";
var SHOW_PASSWORD_RESET_ERROR_MODAL = exports.SHOW_PASSWORD_RESET_ERROR_MODAL = "SHOW_PASSWORD_RESET_ERROR_MODAL";
var HIDE_REQUEST_PASSWORD_RESET_SUCCESS_MODAL = exports.HIDE_REQUEST_PASSWORD_RESET_SUCCESS_MODAL = "HIDE_REQUEST_PASSWORD_RESET_SUCCESS_MODAL";
var HIDE_REQUEST_PASSWORD_RESET_ERROR_MODAL = exports.HIDE_REQUEST_PASSWORD_RESET_ERROR_MODAL = "HIDE_REQUEST_PASSWORD_RESET_ERROR_MODAL";
var HIDE_UPDATE_PASSWORD_SUCCESS_MODAL = exports.HIDE_UPDATE_PASSWORD_SUCCESS_MODAL = "HIDE_UPDATE_PASSWORD_SUCCESS_MODAL";
var HIDE_UPDATE_PASSWORD_ERROR_MODAL = exports.HIDE_UPDATE_PASSWORD_ERROR_MODAL = "HIDE_UPDATE_PASSWORD_ERROR_MODAL";
var HIDE_DESTROY_ACCOUNT_SUCCESS_MODAL = exports.HIDE_DESTROY_ACCOUNT_SUCCESS_MODAL = "HIDE_DESTROY_ACCOUNT_SUCCESS_MODAL";
var HIDE_DESTROY_ACCOUNT_ERROR_MODAL = exports.HIDE_DESTROY_ACCOUNT_ERROR_MODAL = "HIDE_DESTROY_ACCOUNT_ERROR_MODAL";

function hideEmailSignInSuccessModal() {
  return { type: HIDE_EMAIL_SIGN_IN_SUCCESS_MODAL };
}
function hideEmailSignInErrorModal() {
  return { type: HIDE_EMAIL_SIGN_IN_ERROR_MODAL };
}
function hideOAuthSignInSuccessModal() {
  return { type: HIDE_OAUTH_SIGN_IN_SUCCESS_MODAL };
}
function hideOAuthSignInErrorModal() {
  return { type: HIDE_OAUTH_SIGN_IN_ERROR_MODAL };
}
function hideSignOutSuccessModal() {
  return { type: HIDE_SIGN_OUT_SUCCESS_MODAL };
}
function hideSignOutErrorModal() {
  return { type: HIDE_SIGN_OUT_ERROR_MODAL };
}
function hideEmailSignUpSuccessModal() {
  return { type: HIDE_EMAIL_SIGN_UP_SUCCESS_MODAL };
}
function hideEmailSignUpErrorModal() {
  return { type: HIDE_EMAIL_SIGN_UP_ERROR_MODAL };
}
function showFirstTimeLoginSuccessModal() {
  return { type: SHOW_FIRST_TIME_LOGIN_SUCCESS_MODAL };
}
function showPasswordResetSuccessModal() {
  return { type: SHOW_PASSWORD_RESET_SUCCESS_MODAL };
}
function hideFirstTimeLoginSuccessModal() {
  return { type: HIDE_FIRST_TIME_LOGIN_SUCCESS_MODAL };
}
function hidePasswordResetSuccessModal() {
  return { type: HIDE_PASSWORD_RESET_SUCCESS_MODAL };
}
function showFirstTimeLoginErrorModal() {
  return { type: SHOW_FIRST_TIME_LOGIN_ERROR_MODAL };
}
function showPasswordResetErrorModal() {
  return { type: SHOW_PASSWORD_RESET_ERROR_MODAL };
}
function hideFirstTimeLoginErrorModal() {
  return { type: HIDE_FIRST_TIME_LOGIN_ERROR_MODAL };
}
function hidePasswordResetErrorModal() {
  return { type: HIDE_PASSWORD_RESET_ERROR_MODAL };
}
function hidePasswordResetRequestSuccessModal() {
  return { type: HIDE_REQUEST_PASSWORD_RESET_SUCCESS_MODAL };
}
function hidePasswordResetRequestErrorModal() {
  return { type: HIDE_REQUEST_PASSWORD_RESET_ERROR_MODAL };
}
function hideUpdatePasswordSuccessModal() {
  return { type: HIDE_UPDATE_PASSWORD_SUCCESS_MODAL };
}
function hideUpdatePasswordErrorModal() {
  return { type: HIDE_UPDATE_PASSWORD_ERROR_MODAL };
}
function hideDestroyAccountSuccessModal() {
  return { type: HIDE_DESTROY_ACCOUNT_SUCCESS_MODAL };
}
function hideDestroyAccountErrorModal() {
  return { type: HIDE_DESTROY_ACCOUNT_ERROR_MODAL };
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeTokenKeys = normalizeTokenKeys;
exports.getAllParams = getAllParams;
exports.default = getRedirectInfo;

var _querystring = __webpack_require__(75);

var _querystring2 = _interopRequireDefault(_querystring);

var _extend = __webpack_require__(15);

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizeTokenKeys(params) {
  // normalize keys
  if (params.token) {
    params["access-token"] = params.token;
    delete params.token;
  }
  if (params.auth_token) {
    params["access-token"] = params.auth_token;
    delete params.auth_token;
  }
  if (params.client_id) {
    params.client = params.client_id;
    delete params.client_id;
  }
  if (params.config) {
    params.endpointKey = params.config;
    delete params.config;
  }

  return params;
};

var getAnchorSearch = function getAnchorSearch(location) {
  var rawAnchor = location.anchor || "",
      arr = rawAnchor.split("?");
  return arr.length > 1 ? arr[1] : null;
};

var getSearchQs = function getSearchQs(location) {
  var rawQs = location.search || "",
      qs = rawQs.replace("?", ""),
      qsObj = qs ? _querystring2.default.parse(qs) : {};

  return qsObj;
};

var getAnchorQs = function getAnchorQs(location) {
  var anchorQs = getAnchorSearch(location),
      anchorQsObj = anchorQs ? _querystring2.default.parse(anchorQs) : {};

  return anchorQsObj;
};

var stripKeys = function stripKeys(obj, keys) {
  for (var q in keys) {
    delete obj[keys[q]];
  }

  return obj;
};

function getAllParams(location) {
  return (0, _extend2.default)({}, getAnchorQs(location), getSearchQs(location));
};

var buildCredentials = function buildCredentials(location, keys) {
  var params = getAllParams(location);
  var authHeaders = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      authHeaders[key] = params[key];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return normalizeTokenKeys(authHeaders);
};

// this method is tricky. we want to reconstruct the current URL with the
// following conditions:
// 1. search contains none of the supplied keys
// 2. anchor search (i.e. `#/?key=val`) contains none of the supplied keys
// 3. all of the keys NOT supplied are presevered in their original form
// 4. url protocol, host, and path are preserved
var getLocationWithoutParams = function getLocationWithoutParams(currentLocation, keys) {
  // strip all values from both actual and anchor search params
  var newSearch = _querystring2.default.stringify(stripKeys(getSearchQs(currentLocation), keys)),
      newAnchorQs = _querystring2.default.stringify(stripKeys(getAnchorQs(currentLocation), keys)),
      newAnchor = (currentLocation.hash || "").split("?")[0];

  if (newSearch) {
    newSearch = "?" + newSearch;
  }

  if (newAnchorQs) {
    newAnchor += "?" + newAnchorQs;
  }

  if (newAnchor && !newAnchor.match(/^#/)) {
    newAnchor = "#/" + newAnchor;
  }

  // reconstruct location with stripped auth keys
  var newLocation = currentLocation.pathname + newSearch + newAnchor;

  return newLocation;
};

function getRedirectInfo(currentLocation) {
  if (!currentLocation) {
    return {};
  } else {
    var authKeys = ["access-token", "token", "auth_token", "config", "client", "client_id", "expiry", "uid", "reset_password", "account_confirmation_success"];

    var authRedirectHeaders = buildCredentials(currentLocation, authKeys);
    var authRedirectPath = getLocationWithoutParams(currentLocation, authKeys);

    if (authRedirectPath !== currentLocation) {
      return { authRedirectHeaders: authRedirectHeaders, authRedirectPath: authRedirectPath };
    } else {
      return {};
    }
  }
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Router = __webpack_require__(42);

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Router2.default; // Written in this round about way for babel-transform-imports

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _warning = __webpack_require__(21);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(23);

var _invariant2 = _interopRequireDefault(_invariant);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * The public API for putting history on context.
 */

var Router = function (_React$Component) {
  _inherits(Router, _React$Component);

  function Router() {
    var _temp, _this, _ret;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props.history.location.pathname)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Router.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      })
    };
  };

  Router.prototype.computeMatch = function computeMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };

  Router.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        history = _props.history;

    (0, _invariant2.default)(children == null || _react2.default.Children.count(children) === 1, "A <Router> may have only one child element");

    // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.
    this.unlisten = history.listen(function () {
      _this2.setState({
        match: _this2.computeMatch(history.location.pathname)
      });
    });
  };

  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    (0, _warning2.default)(this.props.history === nextProps.history, "You cannot change <Router history>");
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unlisten();
  };

  Router.prototype.render = function render() {
    var children = this.props.children;

    return children ? _react2.default.Children.only(children) : null;
  };

  return Router;
}(_react2.default.Component);

Router.propTypes = {
  history: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.node
};
Router.contextTypes = {
  router: _propTypes2.default.object
};
Router.childContextTypes = {
  router: _propTypes2.default.object.isRequired
};

exports.default = Router;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pathToRegexp = __webpack_require__(60);

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compilePath = function compilePath(pattern, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var keys = [];
  var re = (0, _pathToRegexp2.default)(pattern, keys, options);
  var compiledPattern = { re: re, keys: keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

/**
 * Public API for matching a URL pathname to a path pattern.
 */
var matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var parent = arguments[2];

  if (typeof options === "string") options = { path: options };

  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === undefined ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === undefined ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === undefined ? false : _options$sensitive;

  if (path == null) return parent;

  var _compilePath = compilePath(path, { end: exact, strict: strict, sensitive: sensitive }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) return null;

  var url = match[0],
      values = match.slice(1);

  var isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path: path, // the path pattern used to match
    url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
    isExact: isExact, // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

exports.default = matchPath;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REQUEST_PASSWORD_RESET_FORM_UPDATE = exports.REQUEST_PASSWORD_RESET_ERROR = exports.REQUEST_PASSWORD_RESET_COMPLETE = exports.REQUEST_PASSWORD_RESET_START = undefined;
exports.requestPasswordResetFormUpdate = requestPasswordResetFormUpdate;
exports.requestPasswordResetStart = requestPasswordResetStart;
exports.requestPasswordResetComplete = requestPasswordResetComplete;
exports.requestPasswordResetError = requestPasswordResetError;
exports.requestPasswordReset = requestPasswordReset;

var _sessionStorage = __webpack_require__(9);

var _handleFetchResponse = __webpack_require__(17);

var _extend = __webpack_require__(15);

var _extend2 = _interopRequireDefault(_extend);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUEST_PASSWORD_RESET_START = exports.REQUEST_PASSWORD_RESET_START = "REQUEST_PASSWORD_RESET_START";
var REQUEST_PASSWORD_RESET_COMPLETE = exports.REQUEST_PASSWORD_RESET_COMPLETE = "REQUEST_PASSWORD_RESET_COMPLETE";
var REQUEST_PASSWORD_RESET_ERROR = exports.REQUEST_PASSWORD_RESET_ERROR = "REQUEST_PASSWORD_RESET_ERROR";
var REQUEST_PASSWORD_RESET_FORM_UPDATE = exports.REQUEST_PASSWORD_RESET_FORM_UPDATE = "REQUEST_PASSWORD_RESET_FORM_UPDATE";

function requestPasswordResetFormUpdate(endpoint, key, value) {
  return { type: REQUEST_PASSWORD_RESET_FORM_UPDATE, endpoint: endpoint, key: key, value: value };
}
function requestPasswordResetStart(endpoint) {
  return { type: REQUEST_PASSWORD_RESET_START, endpoint: endpoint };
}
function requestPasswordResetComplete(endpoint, message) {
  return { type: REQUEST_PASSWORD_RESET_COMPLETE, endpoint: endpoint, message: message };
}
function requestPasswordResetError(endpoint, errors) {
  return { type: REQUEST_PASSWORD_RESET_ERROR, endpoint: endpoint, errors: errors };
}
function requestPasswordReset(body, endpoint) {
  return function (dispatch) {
    dispatch(requestPasswordResetStart(endpoint));

    return (0, _fetch2.default)((0, _sessionStorage.getPasswordResetRequestUrl)(endpoint), {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify((0, _extend2.default)(body, {
        redirect_url: (0, _sessionStorage.getPasswordResetRedirectUrl)(endpoint)
      }))
    }).then(_handleFetchResponse.parseResponse).then(function (_ref) {
      var message = _ref.message;
      return dispatch(requestPasswordResetComplete(endpoint, message));
    }).catch(function (_ref2) {
      var errors = _ref2.errors;
      return dispatch(requestPasswordResetError(endpoint, errors));
    });
  };
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAccount = exports.updateAccountError = exports.updateAccountComplete = exports.updateAccountStart = exports.updateAccountFormUpdate = exports.UPDATE_ACCOUNT_FORM_UPDATE = exports.UPDATE_ACCOUNT_ERROR = exports.UPDATE_ACCOUNT_COMPLETE = exports.UPDATE_ACCOUNT_START = undefined;

var _sessionStorage = __webpack_require__(9);

var _handleFetchResponse = __webpack_require__(17);

var _extend = __webpack_require__(15);

var _extend2 = _interopRequireDefault(_extend);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE_ACCOUNT_START = exports.UPDATE_ACCOUNT_START = "UPDATE_ACCOUNT_START";
var UPDATE_ACCOUNT_COMPLETE = exports.UPDATE_ACCOUNT_COMPLETE = "UPDATE_ACCOUNT_COMPLETE";
var UPDATE_ACCOUNT_ERROR = exports.UPDATE_ACCOUNT_ERROR = "UPDATE_ACCOUNT_ERROR";
var UPDATE_ACCOUNT_FORM_UPDATE = exports.UPDATE_ACCOUNT_FORM_UPDATE = "UPDATE_ACCOUNT_FORM_UPDATE";

var updateAccountFormUpdate = exports.updateAccountFormUpdate = function updateAccountFormUpdate(endpoint, key, value) {
  return { type: UPDATE_ACCOUNT_FORM_UPDATE, endpoint: endpoint, key: key, value: value };
};
var updateAccountStart = exports.updateAccountStart = function updateAccountStart(endpoint) {
  return { type: UPDATE_ACCOUNT_START, endpoint: endpoint };
};
var updateAccountComplete = exports.updateAccountComplete = function updateAccountComplete(user, endpoint) {
  return { type: UPDATE_ACCOUNT_COMPLETE, user: user, endpoint: endpoint };
};
var updateAccountError = exports.updateAccountError = function updateAccountError(errors, endpoint) {
  return { type: UPDATE_ACCOUNT_ERROR, errors: errors, endpoint: endpoint };
};
var updateAccount = exports.updateAccount = function updateAccount(body, endpointKey) {
  return function (dispatch) {
    if (Object.keys(body).length === 0 && body.constructor === Object) {
      return Promise.resolve(dispatch(updateAccountError({}, endpointKey)));
    }
    dispatch(updateAccountStart(endpointKey));

    var data = new FormData();
    for (var key in body) {
      if (body[key]) {
        data.append(key, body[key]);
      }
    }

    return (0, _fetch2.default)((0, _sessionStorage.getAccountUpdateUrl)(endpointKey), {
      //headers: {
      //"Accept": "application/json",
      //'Content-Type': 'multipart/form-data',
      //},
      method: "put",
      body: data
    }).then(_handleFetchResponse.parseResponse).then(function (_ref) {
      var data = _ref.data;
      return dispatch(updateAccountComplete(data, endpointKey));
    }).catch(function (_ref2) {
      var errors = _ref2.errors;

      dispatch(updateAccountError(errors, endpointKey));
      throw errors;
    });
  };
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_PASSWORD_FORM_UPDATE = exports.UPDATE_PASSWORD_ERROR = exports.UPDATE_PASSWORD_COMPLETE = exports.UPDATE_PASSWORD_START = undefined;
exports.updatePasswordFormUpdate = updatePasswordFormUpdate;
exports.updatePasswordStart = updatePasswordStart;
exports.updatePasswordComplete = updatePasswordComplete;
exports.updatePasswordError = updatePasswordError;
exports.updatePassword = updatePassword;

var _sessionStorage = __webpack_require__(9);

var _handleFetchResponse = __webpack_require__(17);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE_PASSWORD_START = exports.UPDATE_PASSWORD_START = "UPDATE_PASSWORD_START";
var UPDATE_PASSWORD_COMPLETE = exports.UPDATE_PASSWORD_COMPLETE = "UPDATE_PASSWORD_COMPLETE";
var UPDATE_PASSWORD_ERROR = exports.UPDATE_PASSWORD_ERROR = "UPDATE_PASSWORD_ERROR";
var UPDATE_PASSWORD_FORM_UPDATE = exports.UPDATE_PASSWORD_FORM_UPDATE = "UPDATE_PASSWORD_FORM_UPDATE";

function updatePasswordFormUpdate(endpoint, key, value) {
  return { type: UPDATE_PASSWORD_FORM_UPDATE, endpoint: endpoint, key: key, value: value };
}
function updatePasswordStart(endpoint) {
  return { type: UPDATE_PASSWORD_START, endpoint: endpoint };
}
function updatePasswordComplete(endpoint, user) {
  return { type: UPDATE_PASSWORD_COMPLETE, endpoint: endpoint, user: user };
}
function updatePasswordError(endpoint, errors) {
  return { type: UPDATE_PASSWORD_ERROR, endpoint: endpoint, errors: errors };
}
function updatePassword(body, endpoint) {
  return function (dispatch) {
    dispatch(updatePasswordStart(endpoint));

    return (0, _fetch2.default)((0, _sessionStorage.getPasswordUpdateUrl)(endpoint), {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: "put",
      body: JSON.stringify(body)
    }).then(_handleFetchResponse.parseResponse).then(function (_ref) {
      var user = _ref.user;
      return dispatch(updatePasswordComplete(endpoint, user));
    }).catch(function (_ref2) {
      var errors = _ref2.errors;
      return dispatch(updatePasswordError(endpoint, errors));
    });
  };
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(14);
var normalizeHeaderName = __webpack_require__(106);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(63);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(63);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {/* Ignore */}
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseEndpointConfig;

var _constants = __webpack_require__(20);

var C = _interopRequireWildcard(_constants);

var _extend = __webpack_require__(15);

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// base endpoint that other endpoints extend from
var defaultEndpoint = {
  apiUrl: "/api",
  signOutPath: "/auth/sign_out",
  emailSignInPath: "/auth/sign_in",
  emailRegistrationPath: "/auth",
  accountUpdatePath: "/auth",
  accountDeletePath: "/auth",
  passwordResetPath: "/auth/password",
  passwordUpdatePath: "/auth/password",
  tokenValidationPath: "/auth/validate_token",

  authProviderPaths: {
    github: "/auth/github",
    facebook: "/auth/facebook",
    google: "/auth/google_oauth2"
  }
};

function getFirstObjectKey(obj) {
  for (var key in obj) {
    return key;
  }
};

function parseEndpointConfig(endpoint) {
  var defaultEndpointKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  // normalize so opts is always an array of objects
  if (endpoint.constructor !== Array) {
    // single config will always be called 'default' unless set
    // by previous session
    defaultEndpointKey = C.INITIAL_CONFIG_KEY;

    // config should look like {default: {...}}
    var defaultConfig = {};
    defaultConfig[defaultEndpointKey] = endpoint;

    // endpoint should look like [{default: {...}}]
    endpoint = [defaultConfig];
  }

  var currentEndpoint = {};

  // iterate over config items, extend each from defaults
  for (var i = 0; i < endpoint.length; i++) {
    var configName = getFirstObjectKey(endpoint[i]);

    // set first as default config
    if (!defaultEndpointKey) {
      defaultEndpointKey = configName;
    }

    // save config to `configs` hash
    currentEndpoint[configName] = (0, _extend2.default)({}, defaultEndpoint, endpoint[i][configName]);
  }

  return { defaultEndpointKey: defaultEndpointKey, currentEndpoint: currentEndpoint };
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.fetchToken = fetchToken;

var _isomorphicFetch = __webpack_require__(54);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _cookie = __webpack_require__(74);

var _cookie2 = _interopRequireDefault(_cookie);

var _parseUrl = __webpack_require__(40);

var _parseUrl2 = _interopRequireDefault(_parseUrl);

var _constants = __webpack_require__(20);

var C = _interopRequireWildcard(_constants);

var _fetch = __webpack_require__(12);

var _parseEndpointConfig3 = __webpack_require__(55);

var _parseEndpointConfig4 = _interopRequireDefault(_parseEndpointConfig3);

var _url = __webpack_require__(76);

var _url2 = _interopRequireDefault(_url);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseHeaders(headers) {
  // set header for each key in `tokenFormat` config
  var newHeaders = {};

  // set flag to ensure that we don't accidentally nuke the headers
  // if the response tokens aren't sent back from the API
  var blankHeaders = true;

  // set header key + val for each key in `tokenFormat` config
  // TODO: get actual config value
  var _arr = ["access-token", "token-type", "client", "expiry", "uid", "config", "endpointKey"];
  for (var _i = 0; _i < _arr.length; _i++) {
    var key = _arr[_i];
    newHeaders[key] = headers[key];

    if (newHeaders[key]) {
      // normalize -- sometimes headers come back in array form
      if (_typeof(newHeaders[key]) === "object") {
        newHeaders[key] = newHeaders[key][0];
      }

      blankHeaders = false;
    }
  }

  // persist headers for next request
  if (!blankHeaders) {
    return newHeaders;
  }
}

function fetchToken(_ref) {
  var rawEndpoints = _ref.rawEndpoints,
      cookies = _ref.cookies,
      currentLocation = _ref.currentLocation;

  var _getRedirectInfo = (0, _parseUrl2.default)(_url2.default.parse(currentLocation)),
      authRedirectHeaders = _getRedirectInfo.authRedirectHeaders;

  return new Promise(function (resolve, reject) {
    if (cookies || authRedirectHeaders) {
      var rawCookies = _cookie2.default.parse(cookies || "{}");
      var parsedCookies = JSON.parse(rawCookies.authHeaders || "false");
      var firstTimeLogin = void 0,
          mustResetPassword = void 0,
          currentEndpointKey = void 0,
          headers = void 0;

      if (authRedirectHeaders && authRedirectHeaders.uid && authRedirectHeaders["access-token"]) {
        headers = parseHeaders(authRedirectHeaders);
        currentEndpointKey = authRedirectHeaders.endpointKey || null;
        mustResetPassword = JSON.parse(authRedirectHeaders.reset_password || "false");
        firstTimeLogin = JSON.parse(authRedirectHeaders.account_confirmation_success || "false");
      } else if (rawCookies && parsedCookies) {
        headers = parsedCookies;
        currentEndpointKey = JSON.parse(rawCookies[C.SAVED_CONFIG_KEY] || "null");
        mustResetPassword = JSON.parse(parsedCookies.mustResetPassword || "false");
        firstTimeLogin = JSON.parse(parsedCookies.firstTimeLogin || "false");
      }

      if (!headers) {
        return reject({
          reason: "No creds",
          currentEndpoint: currentEndpoint,
          defaultEndpointKey: defaultEndpointKey
        });
      }

      var newHeaders,
          _parseEndpointConfig = (0, _parseEndpointConfig4.default)(rawEndpoints),
          currentEndpoint = _parseEndpointConfig.currentEndpoint,
          defaultEndpointKey = _parseEndpointConfig.defaultEndpointKey,
          _currentEndpoint = currentEndpoint[currentEndpointKey || defaultEndpointKey],
          apiUrl = _currentEndpoint.apiUrl,
          tokenValidationPath = _currentEndpoint.tokenValidationPath,
          validationUrl = "" + apiUrl + tokenValidationPath + "?unbatch=true";


      return (0, _isomorphicFetch2.default)(validationUrl, {
        headers: (0, _fetch.addAuthorizationHeader)(headers['access-token'], headers)
      }).then(function (resp) {
        newHeaders = parseHeaders(resp.headers.raw());
        return resp.json();
      }).then(function (json) {
        if (json.success) {
          return resolve({
            headers: newHeaders,
            user: json.data,
            mustResetPassword: mustResetPassword,
            firstTimeLogin: firstTimeLogin,
            currentEndpoint: currentEndpoint,
            currentEndpointKey: currentEndpointKey,
            defaultEndpointKey: defaultEndpointKey
          });
        } else {
          return reject({
            reason: json.errors,
            mustResetPassword: mustResetPassword,
            firstTimeLogin: firstTimeLogin,
            currentEndpoint: currentEndpoint,
            defaultEndpointKey: defaultEndpointKey
          });
        }
      }).catch(function (reason) {
        return reject({
          reason: reason,
          firstTimeLogin: firstTimeLogin,
          mustResetPassword: mustResetPassword,
          currentEndpoint: currentEndpoint,
          defaultEndpointKey: defaultEndpointKey
        });
      });
    } else {
      var _parseEndpointConfig2 = (0, _parseEndpointConfig4.default)(rawEndpoints),
          _currentEndpoint2 = _parseEndpointConfig2.currentEndpoint,
          _defaultEndpointKey = _parseEndpointConfig2.defaultEndpointKey;

      reject({
        reason: "No creds",
        currentEndpoint: _currentEndpoint2,
        defaultEndpointKey: _defaultEndpointKey
      });
    }
  });
}

function verifyAuth(rawEndpoints, _ref2) {
  var isServer = _ref2.isServer,
      cookies = _ref2.cookies,
      currentLocation = _ref2.currentLocation;

  return new Promise(function (resolve, reject) {
    if (isServer) {
      return fetchToken({ rawEndpoints: rawEndpoints, cookies: cookies, currentLocation: currentLocation }).then(function (res) {
        return resolve(res);
      }).catch(function (res) {
        return reject(res);
      });
    } else {
      // TODO: deal with localStorage
      //Auth.validateToken(getCurrentEndpointKey())
      //.then((user) => resolve(user.data), (err) => reject({reason: err}));
    }
  });
}

exports.default = verifyAuth;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _invariant = __webpack_require__(23);

var _invariant2 = _interopRequireDefault(_invariant);

var _history = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

/**
 * The public API for rendering a history-aware <a>.
 */

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _temp, _this, _ret;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) _this.props.onClick(event);

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();

          var history = _this.context.router.history;
          var _this$props = _this.props,
              replace = _this$props.replace,
              to = _this$props.to;

          if (replace) {
            history.replace(to);
          } else {
            history.push(to);
          }
        }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Link.prototype.render = function render() {
    var _props = this.props,
        replace = _props.replace,
        to = _props.to,
        innerRef = _props.innerRef,
        props = _objectWithoutProperties(_props, ["replace", "to", "innerRef"]); // eslint-disable-line no-unused-vars

    (0, _invariant2.default)(this.context.router, "You should not use <Link> outside a <Router>");

    (0, _invariant2.default)(to !== undefined, 'You must specify the "to" property');

    var history = this.context.router.history;

    var location = typeof to === "string" ? (0, _history.createLocation)(to, null, null, history.location) : to;

    var href = history.createHref(location);
    return _react2.default.createElement("a", _extends({}, props, { onClick: this.handleClick, href: href, ref: innerRef }));
  };

  return Link;
}(_react2.default.Component);

Link.propTypes = {
  onClick: _propTypes2.default.func,
  target: _propTypes2.default.string,
  replace: _propTypes2.default.bool,
  to: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  innerRef: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
};
Link.defaultProps = {
  replace: false
};
Link.contextTypes = {
  router: _propTypes2.default.shape({
    history: _propTypes2.default.shape({
      push: _propTypes2.default.func.isRequired,
      replace: _propTypes2.default.func.isRequired,
      createHref: _propTypes2.default.func.isRequired
    }).isRequired
  }).isRequired
};

exports.default = Link;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Route = __webpack_require__(59);

var _Route2 = _interopRequireDefault(_Route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Route2.default; // Written in this round about way for babel-transform-imports

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _warning = __webpack_require__(21);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(23);

var _invariant2 = _interopRequireDefault(_invariant);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _matchPath = __webpack_require__(43);

var _matchPath2 = _interopRequireDefault(_matchPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var isEmptyChildren = function isEmptyChildren(children) {
  return _react2.default.Children.count(children) === 0;
};

/**
 * The public API for matching a single path and rendering.
 */

var Route = function (_React$Component) {
  _inherits(Route, _React$Component);

  function Route() {
    var _temp, _this, _ret;

    _classCallCheck(this, Route);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props, _this.context.router)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Route.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        }
      })
    };
  };

  Route.prototype.computeMatch = function computeMatch(_ref, router) {
    var computedMatch = _ref.computedMatch,
        location = _ref.location,
        path = _ref.path,
        strict = _ref.strict,
        exact = _ref.exact,
        sensitive = _ref.sensitive;

    if (computedMatch) return computedMatch; // <Switch> already computed the match for us

    (0, _invariant2.default)(router, "You should not use <Route> or withRouter() outside a <Router>");

    var route = router.route;

    var pathname = (location || route.location).pathname;

    return (0, _matchPath2.default)(pathname, { path: path, strict: strict, exact: exact, sensitive: sensitive }, route.match);
  };

  Route.prototype.componentWillMount = function componentWillMount() {
    (0, _warning2.default)(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored");

    (0, _warning2.default)(!(this.props.component && this.props.children && !isEmptyChildren(this.props.children)), "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored");

    (0, _warning2.default)(!(this.props.render && this.props.children && !isEmptyChildren(this.props.children)), "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored");
  };

  Route.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
    (0, _warning2.default)(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    (0, _warning2.default)(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    });
  };

  Route.prototype.render = function render() {
    var match = this.state.match;
    var _props = this.props,
        children = _props.children,
        component = _props.component,
        render = _props.render;
    var _context$router = this.context.router,
        history = _context$router.history,
        route = _context$router.route,
        staticContext = _context$router.staticContext;

    var location = this.props.location || route.location;
    var props = { match: match, location: location, history: history, staticContext: staticContext };

    if (component) return match ? _react2.default.createElement(component, props) : null;

    if (render) return match ? render(props) : null;

    if (typeof children === "function") return children(props);

    if (children && !isEmptyChildren(children)) return _react2.default.Children.only(children);

    return null;
  };

  return Route;
}(_react2.default.Component);

Route.propTypes = {
  computedMatch: _propTypes2.default.object, // private, from <Switch>
  path: _propTypes2.default.string,
  exact: _propTypes2.default.bool,
  strict: _propTypes2.default.bool,
  sensitive: _propTypes2.default.bool,
  component: _propTypes2.default.func,
  render: _propTypes2.default.func,
  children: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  location: _propTypes2.default.object
};
Route.contextTypes = {
  router: _propTypes2.default.shape({
    history: _propTypes2.default.object.isRequired,
    route: _propTypes2.default.object.isRequired,
    staticContext: _propTypes2.default.object
  })
};
Route.childContextTypes = {
  router: _propTypes2.default.object.isRequired
};

exports.default = Route;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isarray = __webpack_require__(86);

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp;
module.exports.parse = parse;
module.exports.compile = compile;
module.exports.tokensToFunction = tokensToFunction;
module.exports.tokensToRegExp = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)',
// Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile(str, options) {
  return tokensToFunction(parse(str, options));
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (_typeof(tokens[i]) === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags(options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys);
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */keys);
  }

  if (isarray(path)) {
    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
  }

  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pathToRegexp = __webpack_require__(60);

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compileGenerator = function compileGenerator(pattern) {
  var cacheKey = pattern;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var compiledGenerator = _pathToRegexp2.default.compile(pattern);

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledGenerator;
    cacheCount++;
  }

  return compiledGenerator;
};

/**
 * Public API for generating a URL pathname from a pattern and parameters.
 */
var generatePath = function generatePath() {
  var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (pattern === "/") {
    return pattern;
  }
  var generator = compileGenerator(pattern);
  return generator(params, { pretty: true });
};

exports.default = generatePath;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);
var settle = __webpack_require__(107);
var buildURL = __webpack_require__(109);
var parseHeaders = __webpack_require__(110);
var isURLSameOrigin = __webpack_require__(111);
var createError = __webpack_require__(64);
var btoa = typeof window !== 'undefined' && window.btoa && window.btoa.bind(window) || __webpack_require__(112);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || request.readyState !== 4 && !xDomain) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(113);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(108);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

/***/ }),
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axiauth = exports.fetch = exports.hideDestroyAccountErrorModal = exports.hideDestroyAccountSuccessModal = exports.hideUpdatePasswordErrorModal = exports.hideUpdatePasswordSuccessModal = exports.hidePasswordResetRequestErrorModal = exports.hidePasswordResetRequestSuccessModal = exports.hidePasswordResetErrorModal = exports.hideFirstTimeLoginErrorModal = exports.showPasswordResetErrorModal = exports.showFirstTimeLoginErrorModal = exports.hidePasswordResetSuccessModal = exports.hideFirstTimeLoginSuccessModal = exports.showPasswordResetSuccessModal = exports.showFirstTimeLoginSuccessModal = exports.hideEmailSignUpErrorModal = exports.hideEmailSignUpSuccessModal = exports.hideSignOutErrorModal = exports.hideSignOutSuccessModal = exports.hideOAuthSignInErrorModal = exports.hideOAuthSignInSuccessModal = exports.hideEmailSignInErrorModal = exports.hideEmailSignInSuccessModal = exports.getSessionEndpoint = exports.getApiUrl = exports.verifyAuth = exports.destroyAccount = exports.updatePasswordModalFormUpdate = exports.updatePasswordModal = exports.updatePasswordFormUpdate = exports.updatePassword = exports.updateAccountFormUpdate = exports.updateAccount = exports.requestPasswordResetFormUpdate = exports.requestPasswordReset = exports.oAuthSignIn = exports.emailSignUpFormUpdate = exports.emailSignUp = exports.signOut = exports.emailSignInFormUpdate = exports.emailSignIn = exports.authenticate = exports.configure = exports.authStateReducer = undefined;

var _configure = __webpack_require__(5);

Object.defineProperty(exports, "configure", {
  enumerable: true,
  get: function get() {
    return _configure.configure;
  }
});

var _authenticate = __webpack_require__(29);

Object.defineProperty(exports, "authenticate", {
  enumerable: true,
  get: function get() {
    return _authenticate.authenticate;
  }
});

var _emailSignIn = __webpack_require__(31);

Object.defineProperty(exports, "emailSignIn", {
  enumerable: true,
  get: function get() {
    return _emailSignIn.emailSignIn;
  }
});
Object.defineProperty(exports, "emailSignInFormUpdate", {
  enumerable: true,
  get: function get() {
    return _emailSignIn.emailSignInFormUpdate;
  }
});

var _signOut = __webpack_require__(32);

Object.defineProperty(exports, "signOut", {
  enumerable: true,
  get: function get() {
    return _signOut.signOut;
  }
});

var _emailSignUp = __webpack_require__(33);

Object.defineProperty(exports, "emailSignUp", {
  enumerable: true,
  get: function get() {
    return _emailSignUp.emailSignUp;
  }
});
Object.defineProperty(exports, "emailSignUpFormUpdate", {
  enumerable: true,
  get: function get() {
    return _emailSignUp.emailSignUpFormUpdate;
  }
});

var _oauthSignIn = __webpack_require__(34);

Object.defineProperty(exports, "oAuthSignIn", {
  enumerable: true,
  get: function get() {
    return _oauthSignIn.oAuthSignIn;
  }
});

var _requestPasswordReset = __webpack_require__(44);

Object.defineProperty(exports, "requestPasswordReset", {
  enumerable: true,
  get: function get() {
    return _requestPasswordReset.requestPasswordReset;
  }
});
Object.defineProperty(exports, "requestPasswordResetFormUpdate", {
  enumerable: true,
  get: function get() {
    return _requestPasswordReset.requestPasswordResetFormUpdate;
  }
});

var _updateAccount = __webpack_require__(45);

Object.defineProperty(exports, "updateAccount", {
  enumerable: true,
  get: function get() {
    return _updateAccount.updateAccount;
  }
});
Object.defineProperty(exports, "updateAccountFormUpdate", {
  enumerable: true,
  get: function get() {
    return _updateAccount.updateAccountFormUpdate;
  }
});

var _updatePassword = __webpack_require__(46);

Object.defineProperty(exports, "updatePassword", {
  enumerable: true,
  get: function get() {
    return _updatePassword.updatePassword;
  }
});
Object.defineProperty(exports, "updatePasswordFormUpdate", {
  enumerable: true,
  get: function get() {
    return _updatePassword.updatePasswordFormUpdate;
  }
});

var _updatePasswordModal = __webpack_require__(35);

Object.defineProperty(exports, "updatePasswordModal", {
  enumerable: true,
  get: function get() {
    return _updatePasswordModal.updatePasswordModal;
  }
});
Object.defineProperty(exports, "updatePasswordModalFormUpdate", {
  enumerable: true,
  get: function get() {
    return _updatePasswordModal.updatePasswordModalFormUpdate;
  }
});

var _destroyAccount = __webpack_require__(36);

Object.defineProperty(exports, "destroyAccount", {
  enumerable: true,
  get: function get() {
    return _destroyAccount.destroyAccount;
  }
});

var _verifyAuth = __webpack_require__(56);

Object.defineProperty(exports, "verifyAuth", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_verifyAuth).default;
  }
});

var _sessionStorage = __webpack_require__(9);

Object.defineProperty(exports, "getApiUrl", {
  enumerable: true,
  get: function get() {
    return _sessionStorage.getApiUrl;
  }
});
Object.defineProperty(exports, "getSessionEndpoint", {
  enumerable: true,
  get: function get() {
    return _sessionStorage.getSessionEndpoint;
  }
});

var _ui = __webpack_require__(39);

Object.defineProperty(exports, "hideEmailSignInSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideEmailSignInSuccessModal;
  }
});
Object.defineProperty(exports, "hideEmailSignInErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideEmailSignInErrorModal;
  }
});
Object.defineProperty(exports, "hideOAuthSignInSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideOAuthSignInSuccessModal;
  }
});
Object.defineProperty(exports, "hideOAuthSignInErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideOAuthSignInErrorModal;
  }
});
Object.defineProperty(exports, "hideSignOutSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideSignOutSuccessModal;
  }
});
Object.defineProperty(exports, "hideSignOutErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideSignOutErrorModal;
  }
});
Object.defineProperty(exports, "hideEmailSignUpSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideEmailSignUpSuccessModal;
  }
});
Object.defineProperty(exports, "hideEmailSignUpErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideEmailSignUpErrorModal;
  }
});
Object.defineProperty(exports, "showFirstTimeLoginSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.showFirstTimeLoginSuccessModal;
  }
});
Object.defineProperty(exports, "showPasswordResetSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.showPasswordResetSuccessModal;
  }
});
Object.defineProperty(exports, "hideFirstTimeLoginSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideFirstTimeLoginSuccessModal;
  }
});
Object.defineProperty(exports, "hidePasswordResetSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.hidePasswordResetSuccessModal;
  }
});
Object.defineProperty(exports, "showFirstTimeLoginErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.showFirstTimeLoginErrorModal;
  }
});
Object.defineProperty(exports, "showPasswordResetErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.showPasswordResetErrorModal;
  }
});
Object.defineProperty(exports, "hideFirstTimeLoginErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideFirstTimeLoginErrorModal;
  }
});
Object.defineProperty(exports, "hidePasswordResetErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.hidePasswordResetErrorModal;
  }
});
Object.defineProperty(exports, "hidePasswordResetRequestSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.hidePasswordResetRequestSuccessModal;
  }
});
Object.defineProperty(exports, "hidePasswordResetRequestErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.hidePasswordResetRequestErrorModal;
  }
});
Object.defineProperty(exports, "hideUpdatePasswordSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideUpdatePasswordSuccessModal;
  }
});
Object.defineProperty(exports, "hideUpdatePasswordErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideUpdatePasswordErrorModal;
  }
});
Object.defineProperty(exports, "hideDestroyAccountSuccessModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideDestroyAccountSuccessModal;
  }
});
Object.defineProperty(exports, "hideDestroyAccountErrorModal", {
  enumerable: true,
  get: function get() {
    return _ui.hideDestroyAccountErrorModal;
  }
});

var _fetch = __webpack_require__(12);

Object.defineProperty(exports, "fetch", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_fetch).default;
  }
});

var _axiauth = __webpack_require__(101);

Object.defineProperty(exports, "axiauth", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_axiauth).default;
  }
});

var _authenticate2 = __webpack_require__(121);

var _authenticate3 = _interopRequireDefault(_authenticate2);

var _configure2 = __webpack_require__(122);

var _configure3 = _interopRequireDefault(_configure2);

var _user = __webpack_require__(123);

var _user2 = _interopRequireDefault(_user);

var _ui2 = __webpack_require__(124);

var _ui3 = _interopRequireDefault(_ui2);

var _emailSignIn2 = __webpack_require__(125);

var _emailSignIn3 = _interopRequireDefault(_emailSignIn2);

var _emailSignUp2 = __webpack_require__(126);

var _emailSignUp3 = _interopRequireDefault(_emailSignUp2);

var _oauthSignIn2 = __webpack_require__(127);

var _oauthSignIn3 = _interopRequireDefault(_oauthSignIn2);

var _requestPasswordReset2 = __webpack_require__(128);

var _requestPasswordReset3 = _interopRequireDefault(_requestPasswordReset2);

var _updateAccount2 = __webpack_require__(129);

var _updateAccount3 = _interopRequireDefault(_updateAccount2);

var _updatePassword2 = __webpack_require__(130);

var _updatePassword3 = _interopRequireDefault(_updatePassword2);

var _updatePasswordModal2 = __webpack_require__(131);

var _updatePasswordModal3 = _interopRequireDefault(_updatePasswordModal2);

var _server = __webpack_require__(132);

var _server2 = _interopRequireDefault(_server);

var _signOut2 = __webpack_require__(133);

var _signOut3 = _interopRequireDefault(_signOut2);

var _destroyAccount2 = __webpack_require__(134);

var _destroyAccount3 = _interopRequireDefault(_destroyAccount2);

var _reduxImmutablejs = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* reducers */
var authStateReducer = exports.authStateReducer = (0, _reduxImmutablejs.combineReducers)({
  configure: _configure3.default,
  emailSignIn: _emailSignIn3.default,
  emailSignUp: _emailSignUp3.default,
  signOut: _signOut3.default,
  authentication: _authenticate3.default,
  requestPasswordReset: _requestPasswordReset3.default,
  oAuthSignIn: _oauthSignIn3.default,
  updateAccount: _updateAccount3.default,
  updatePassword: _updatePassword3.default,
  updatePasswordModal: _updatePasswordModal3.default,
  destroyAccount: _destroyAccount3.default,
  server: _server2.default,
  ui: _ui3.default,
  user: _user2.default
});

/* actions */

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyConfig = applyConfig;

var _constants = __webpack_require__(20);

var C = _interopRequireWildcard(_constants);

var _extend = __webpack_require__(15);

var _extend2 = _interopRequireDefault(_extend);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

var _parseEndpointConfig2 = __webpack_require__(55);

var _parseEndpointConfig3 = _interopRequireDefault(_parseEndpointConfig2);

var _configure = __webpack_require__(5);

var _sessionStorage = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// can't use "window" with node app
var root = Function("return this")() || (42, eval)("this");

var defaultSettings = {
  proxyIf: function proxyIf() {
    return false;
  },
  proxyUrl: "/proxy",
  forceHardRedirect: false,
  storage: "cookies",
  cookieExpiry: 14,
  cookiePath: "/",
  initialCredentials: null,

  passwordResetSuccessUrl: function passwordResetSuccessUrl() {
    return root.location.href;
  },

  confirmationSuccessUrl: function confirmationSuccessUrl() {
    return root.location.href;
  },

  tokenFormat: {
    "access-token": "{{ access-token }}",
    "token-type": "Bearer",
    client: "{{ client }}",
    expiry: "{{ expiry }}",
    uid: "{{ uid }}"
  },

  parseExpiry: function parseExpiry(headers) {
    // convert from ruby time (seconds) to js time (millis)
    return parseInt(headers["expiry"], 10) * 1000 || null;
  },

  handleLoginResponse: function handleLoginResponse(resp) {
    return resp.data;
  },

  handleAccountUpdateResponse: function handleAccountUpdateResponse(resp) {
    return resp.data;
  },

  handleTokenValidationResponse: function handleTokenValidationResponse(resp) {
    return resp.data;
  }
};

// save session configuration
function applyConfig() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      dispatch = _ref.dispatch,
      _ref$endpoint = _ref.endpoint,
      endpoint = _ref$endpoint === undefined ? {} : _ref$endpoint,
      _ref$settings = _ref.settings,
      settings = _ref$settings === undefined ? {} : _ref$settings,
      _ref$reset = _ref.reset,
      reset = _ref$reset === undefined ? false : _ref$reset;

  var currentEndpointKey = void 0;

  if (reset) {
    resetConfig();
  }

  if (settings.initialCredentials) {
    currentEndpointKey = settings.initialCredentials.currentEndpointKey;
  }

  (0, _sessionStorage.setCurrentSettings)((0, _extend2.default)({}, defaultSettings, settings));

  var _parseEndpointConfig = (0, _parseEndpointConfig3.default)(endpoint, (0, _sessionStorage.getInitialEndpointKey)()),
      defaultEndpointKey = _parseEndpointConfig.defaultEndpointKey,
      currentEndpoint = _parseEndpointConfig.currentEndpoint;

  if (!currentEndpointKey) {
    currentEndpointKey = defaultEndpointKey;
  }

  // persist default config key with session storage
  (0, _sessionStorage.setDefaultEndpointKey)(defaultEndpointKey);
  (0, _sessionStorage.setCurrentEndpoint)(currentEndpoint);

  dispatch((0, _configure.setEndpointKeys)(Object.keys(currentEndpoint), currentEndpointKey, defaultEndpointKey));
  (0, _sessionStorage.setCurrentEndpointKey)(currentEndpointKey);

  var savedCreds = (0, _sessionStorage.retrieveData)(C.SAVED_CREDS_KEY);

  if ((0, _sessionStorage.getCurrentSettings)().initialCredentials) {
    // skip initial headers check (i.e. check was already done server-side)
    var _getCurrentSettings$i = (0, _sessionStorage.getCurrentSettings)().initialCredentials,
        user = _getCurrentSettings$i.user,
        headers = _getCurrentSettings$i.headers;

    (0, _sessionStorage.persistData)(C.SAVED_CREDS_KEY, headers);
    //if (headers) persistData(C.SAVED_CREDS_KEY, headers);
    return Promise.resolve(user);
  } else if (savedCreds) {
    // verify session credentials with API
    return (0, _fetch2.default)("" + (0, _sessionStorage.getApiUrl)(currentEndpointKey) + currentEndpoint[currentEndpointKey].tokenValidationPath).then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json().then(function (_ref2) {
          var data = _ref2.data;
          return data;
        });
      }
      (0, _sessionStorage.removeData)(C.SAVED_CREDS_KEY);
      return Promise.reject({ reason: "No credentials." });
    });
  } else {
    return Promise.reject({ reason: "No credentials." });
  }
}

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("browser-cookies");

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("cookie");

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withRouter = exports.matchPath = exports.generatePath = exports.Switch = exports.StaticRouter = exports.Router = exports.Route = exports.Redirect = exports.Prompt = exports.NavLink = exports.MemoryRouter = exports.Link = exports.HashRouter = exports.BrowserRouter = undefined;

var _BrowserRouter2 = __webpack_require__(79);

var _BrowserRouter3 = _interopRequireDefault(_BrowserRouter2);

var _HashRouter2 = __webpack_require__(82);

var _HashRouter3 = _interopRequireDefault(_HashRouter2);

var _Link2 = __webpack_require__(57);

var _Link3 = _interopRequireDefault(_Link2);

var _MemoryRouter2 = __webpack_require__(83);

var _MemoryRouter3 = _interopRequireDefault(_MemoryRouter2);

var _NavLink2 = __webpack_require__(85);

var _NavLink3 = _interopRequireDefault(_NavLink2);

var _Prompt2 = __webpack_require__(87);

var _Prompt3 = _interopRequireDefault(_Prompt2);

var _Redirect2 = __webpack_require__(89);

var _Redirect3 = _interopRequireDefault(_Redirect2);

var _Route2 = __webpack_require__(58);

var _Route3 = _interopRequireDefault(_Route2);

var _Router2 = __webpack_require__(41);

var _Router3 = _interopRequireDefault(_Router2);

var _StaticRouter2 = __webpack_require__(91);

var _StaticRouter3 = _interopRequireDefault(_StaticRouter2);

var _Switch2 = __webpack_require__(93);

var _Switch3 = _interopRequireDefault(_Switch2);

var _generatePath2 = __webpack_require__(95);

var _generatePath3 = _interopRequireDefault(_generatePath2);

var _matchPath2 = __webpack_require__(96);

var _matchPath3 = _interopRequireDefault(_matchPath2);

var _withRouter2 = __webpack_require__(97);

var _withRouter3 = _interopRequireDefault(_withRouter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.BrowserRouter = _BrowserRouter3.default;
exports.HashRouter = _HashRouter3.default;
exports.Link = _Link3.default;
exports.MemoryRouter = _MemoryRouter3.default;
exports.NavLink = _NavLink3.default;
exports.Prompt = _Prompt3.default;
exports.Redirect = _Redirect3.default;
exports.Route = _Route3.default;
exports.Router = _Router3.default;
exports.StaticRouter = _StaticRouter3.default;
exports.Switch = _Switch3.default;
exports.generatePath = _generatePath3.default;
exports.matchPath = _matchPath3.default;
exports.withRouter = _withRouter3.default;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _warning = __webpack_require__(21);

var _warning2 = _interopRequireDefault(_warning);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _history = __webpack_require__(24);

var _Router = __webpack_require__(41);

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter = function (_React$Component) {
  _inherits(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, BrowserRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = (0, _history.createBrowserHistory)(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  BrowserRouter.prototype.componentWillMount = function componentWillMount() {
    (0, _warning2.default)(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { BrowserRouter as Router }`.");
  };

  BrowserRouter.prototype.render = function render() {
    return _react2.default.createElement(_Router2.default, { history: this.history, children: this.props.children });
  };

  return BrowserRouter;
}(_react2.default.Component);

BrowserRouter.propTypes = {
  basename: _propTypes2.default.string,
  forceRefresh: _propTypes2.default.bool,
  getUserConfirmation: _propTypes2.default.func,
  keyLength: _propTypes2.default.number,
  children: _propTypes2.default.node
};

exports.default = BrowserRouter;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(81);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _warning = __webpack_require__(21);

var _warning2 = _interopRequireDefault(_warning);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _history = __webpack_require__(24);

var _Router = __webpack_require__(41);

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * The public API for a <Router> that uses window.location.hash.
 */

var HashRouter = function (_React$Component) {
  _inherits(HashRouter, _React$Component);

  function HashRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, HashRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = (0, _history.createHashHistory)(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  HashRouter.prototype.componentWillMount = function componentWillMount() {
    (0, _warning2.default)(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { HashRouter as Router }`.");
  };

  HashRouter.prototype.render = function render() {
    return _react2.default.createElement(_Router2.default, { history: this.history, children: this.props.children });
  };

  return HashRouter;
}(_react2.default.Component);

HashRouter.propTypes = {
  basename: _propTypes2.default.string,
  getUserConfirmation: _propTypes2.default.func,
  hashType: _propTypes2.default.oneOf(["hashbang", "noslash", "slash"]),
  children: _propTypes2.default.node
};

exports.default = HashRouter;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MemoryRouter = __webpack_require__(84);

var _MemoryRouter2 = _interopRequireDefault(_MemoryRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _MemoryRouter2.default; // Written in this round about way for babel-transform-imports

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _warning = __webpack_require__(21);

var _warning2 = _interopRequireDefault(_warning);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _history = __webpack_require__(24);

var _Router = __webpack_require__(42);

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * The public API for a <Router> that stores location in memory.
 */

var MemoryRouter = function (_React$Component) {
  _inherits(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, MemoryRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = (0, _history.createMemoryHistory)(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  MemoryRouter.prototype.componentWillMount = function componentWillMount() {
    (0, _warning2.default)(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { MemoryRouter as Router }`.");
  };

  MemoryRouter.prototype.render = function render() {
    return _react2.default.createElement(_Router2.default, { history: this.history, children: this.props.children });
  };

  return MemoryRouter;
}(_react2.default.Component);

MemoryRouter.propTypes = {
  initialEntries: _propTypes2.default.array,
  initialIndex: _propTypes2.default.number,
  getUserConfirmation: _propTypes2.default.func,
  keyLength: _propTypes2.default.number,
  children: _propTypes2.default.node
};

exports.default = MemoryRouter;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Route = __webpack_require__(58);

var _Route2 = _interopRequireDefault(_Route);

var _Link = __webpack_require__(57);

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
var NavLink = function NavLink(_ref) {
  var to = _ref.to,
      exact = _ref.exact,
      strict = _ref.strict,
      location = _ref.location,
      activeClassName = _ref.activeClassName,
      className = _ref.className,
      activeStyle = _ref.activeStyle,
      style = _ref.style,
      getIsActive = _ref.isActive,
      ariaCurrent = _ref["aria-current"],
      rest = _objectWithoutProperties(_ref, ["to", "exact", "strict", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "aria-current"]);

  var path = (typeof to === "undefined" ? "undefined" : _typeof(to)) === "object" ? to.pathname : to;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

  return _react2.default.createElement(_Route2.default, {
    path: escapedPath,
    exact: exact,
    strict: strict,
    location: location,
    children: function children(_ref2) {
      var location = _ref2.location,
          match = _ref2.match;

      var isActive = !!(getIsActive ? getIsActive(match, location) : match);

      return _react2.default.createElement(_Link2.default, _extends({
        to: to,
        className: isActive ? [className, activeClassName].filter(function (i) {
          return i;
        }).join(" ") : className,
        style: isActive ? _extends({}, style, activeStyle) : style,
        "aria-current": isActive && ariaCurrent || null
      }, rest));
    }
  });
};

NavLink.propTypes = {
  to: _Link2.default.propTypes.to,
  exact: _propTypes2.default.bool,
  strict: _propTypes2.default.bool,
  location: _propTypes2.default.object,
  activeClassName: _propTypes2.default.string,
  className: _propTypes2.default.string,
  activeStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  isActive: _propTypes2.default.func,
  "aria-current": _propTypes2.default.oneOf(["page", "step", "location", "date", "time", "true"])
};

NavLink.defaultProps = {
  activeClassName: "active",
  "aria-current": "page"
};

exports.default = NavLink;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Prompt = __webpack_require__(88);

var _Prompt2 = _interopRequireDefault(_Prompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Prompt2.default; // Written in this round about way for babel-transform-imports

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _invariant = __webpack_require__(23);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * The public API for prompting the user before navigating away
 * from a screen with a component.
 */

var Prompt = function (_React$Component) {
  _inherits(Prompt, _React$Component);

  function Prompt() {
    _classCallCheck(this, Prompt);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Prompt.prototype.enable = function enable(message) {
    if (this.unblock) this.unblock();

    this.unblock = this.context.router.history.block(message);
  };

  Prompt.prototype.disable = function disable() {
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  };

  Prompt.prototype.componentWillMount = function componentWillMount() {
    (0, _invariant2.default)(this.context.router, "You should not use <Prompt> outside a <Router>");

    if (this.props.when) this.enable(this.props.message);
  };

  Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) this.enable(nextProps.message);
    } else {
      this.disable();
    }
  };

  Prompt.prototype.componentWillUnmount = function componentWillUnmount() {
    this.disable();
  };

  Prompt.prototype.render = function render() {
    return null;
  };

  return Prompt;
}(_react2.default.Component);

Prompt.propTypes = {
  when: _propTypes2.default.bool,
  message: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired
};
Prompt.defaultProps = {
  when: true
};
Prompt.contextTypes = {
  router: _propTypes2.default.shape({
    history: _propTypes2.default.shape({
      block: _propTypes2.default.func.isRequired
    }).isRequired
  }).isRequired
};

exports.default = Prompt;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Redirect = __webpack_require__(90);

var _Redirect2 = _interopRequireDefault(_Redirect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Redirect2.default; // Written in this round about way for babel-transform-imports

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = __webpack_require__(21);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(23);

var _invariant2 = _interopRequireDefault(_invariant);

var _history = __webpack_require__(24);

var _generatePath = __webpack_require__(61);

var _generatePath2 = _interopRequireDefault(_generatePath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * The public API for updating the location programmatically
 * with a component.
 */

var Redirect = function (_React$Component) {
  _inherits(Redirect, _React$Component);

  function Redirect() {
    _classCallCheck(this, Redirect);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Redirect.prototype.isStatic = function isStatic() {
    return this.context.router && this.context.router.staticContext;
  };

  Redirect.prototype.componentWillMount = function componentWillMount() {
    (0, _invariant2.default)(this.context.router, "You should not use <Redirect> outside a <Router>");

    if (this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidMount = function componentDidMount() {
    if (!this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var prevTo = (0, _history.createLocation)(prevProps.to);
    var nextTo = (0, _history.createLocation)(this.props.to);

    if ((0, _history.locationsAreEqual)(prevTo, nextTo)) {
      (0, _warning2.default)(false, "You tried to redirect to the same route you're currently on: " + ("\"" + nextTo.pathname + nextTo.search + "\""));
      return;
    }

    this.perform();
  };

  Redirect.prototype.computeTo = function computeTo(_ref) {
    var computedMatch = _ref.computedMatch,
        to = _ref.to;

    if (computedMatch) {
      if (typeof to === "string") {
        return (0, _generatePath2.default)(to, computedMatch.params);
      } else {
        return _extends({}, to, {
          pathname: (0, _generatePath2.default)(to.pathname, computedMatch.params)
        });
      }
    }

    return to;
  };

  Redirect.prototype.perform = function perform() {
    var history = this.context.router.history;
    var push = this.props.push;

    var to = this.computeTo(this.props);

    if (push) {
      history.push(to);
    } else {
      history.replace(to);
    }
  };

  Redirect.prototype.render = function render() {
    return null;
  };

  return Redirect;
}(_react2.default.Component);

Redirect.propTypes = {
  computedMatch: _propTypes2.default.object, // private, from <Switch>
  push: _propTypes2.default.bool,
  from: _propTypes2.default.string,
  to: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired
};
Redirect.defaultProps = {
  push: false
};
Redirect.contextTypes = {
  router: _propTypes2.default.shape({
    history: _propTypes2.default.shape({
      push: _propTypes2.default.func.isRequired,
      replace: _propTypes2.default.func.isRequired
    }).isRequired,
    staticContext: _propTypes2.default.object
  }).isRequired
};

exports.default = Redirect;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StaticRouter = __webpack_require__(92);

var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _StaticRouter2.default; // Written in this round about way for babel-transform-imports

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _warning = __webpack_require__(21);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(23);

var _invariant2 = _interopRequireDefault(_invariant);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _history = __webpack_require__(24);

var _Router = __webpack_require__(42);

var _Router2 = _interopRequireDefault(_Router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
};

var addBasename = function addBasename(basename, location) {
  if (!basename) return location;

  return _extends({}, location, {
    pathname: addLeadingSlash(basename) + location.pathname
  });
};

var stripBasename = function stripBasename(basename, location) {
  if (!basename) return location;

  var base = addLeadingSlash(basename);

  if (location.pathname.indexOf(base) !== 0) return location;

  return _extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
};

var createURL = function createURL(location) {
  return typeof location === "string" ? location : (0, _history.createPath)(location);
};

var staticHandler = function staticHandler(methodName) {
  return function () {
    (0, _invariant2.default)(false, "You cannot %s with <StaticRouter>", methodName);
  };
};

var noop = function noop() {};

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */

var StaticRouter = function (_React$Component) {
  _inherits(StaticRouter, _React$Component);

  function StaticRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, StaticRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.createHref = function (path) {
      return addLeadingSlash(_this.props.basename + createURL(path));
    }, _this.handlePush = function (location) {
      var _this$props = _this.props,
          basename = _this$props.basename,
          context = _this$props.context;

      context.action = "PUSH";
      context.location = addBasename(basename, (0, _history.createLocation)(location));
      context.url = createURL(context.location);
    }, _this.handleReplace = function (location) {
      var _this$props2 = _this.props,
          basename = _this$props2.basename,
          context = _this$props2.context;

      context.action = "REPLACE";
      context.location = addBasename(basename, (0, _history.createLocation)(location));
      context.url = createURL(context.location);
    }, _this.handleListen = function () {
      return noop;
    }, _this.handleBlock = function () {
      return noop;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  StaticRouter.prototype.getChildContext = function getChildContext() {
    return {
      router: {
        staticContext: this.props.context
      }
    };
  };

  StaticRouter.prototype.componentWillMount = function componentWillMount() {
    (0, _warning2.default)(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { StaticRouter as Router }`.");
  };

  StaticRouter.prototype.render = function render() {
    var _props = this.props,
        basename = _props.basename,
        context = _props.context,
        location = _props.location,
        props = _objectWithoutProperties(_props, ["basename", "context", "location"]);

    var history = {
      createHref: this.createHref,
      action: "POP",
      location: stripBasename(basename, (0, _history.createLocation)(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };

    return _react2.default.createElement(_Router2.default, _extends({}, props, { history: history }));
  };

  return StaticRouter;
}(_react2.default.Component);

StaticRouter.propTypes = {
  basename: _propTypes2.default.string,
  context: _propTypes2.default.object.isRequired,
  location: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};
StaticRouter.defaultProps = {
  basename: "",
  location: "/"
};
StaticRouter.childContextTypes = {
  router: _propTypes2.default.object.isRequired
};

exports.default = StaticRouter;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Switch = __webpack_require__(94);

var _Switch2 = _interopRequireDefault(_Switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Switch2.default; // Written in this round about way for babel-transform-imports

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = __webpack_require__(21);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(23);

var _invariant2 = _interopRequireDefault(_invariant);

var _matchPath = __webpack_require__(43);

var _matchPath2 = _interopRequireDefault(_matchPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * The public API for rendering the first <Route> that matches.
 */

var Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Switch.prototype.componentWillMount = function componentWillMount() {
    (0, _invariant2.default)(this.context.router, "You should not use <Switch> outside a <Router>");
  };

  Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    (0, _warning2.default)(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    (0, _warning2.default)(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
  };

  Switch.prototype.render = function render() {
    var route = this.context.router.route;
    var children = this.props.children;

    var location = this.props.location || route.location;

    var match = void 0,
        child = void 0;
    _react2.default.Children.forEach(children, function (element) {
      if (match == null && _react2.default.isValidElement(element)) {
        var _element$props = element.props,
            pathProp = _element$props.path,
            exact = _element$props.exact,
            strict = _element$props.strict,
            sensitive = _element$props.sensitive,
            from = _element$props.from;

        var path = pathProp || from;

        child = element;
        match = (0, _matchPath2.default)(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive }, route.match);
      }
    });

    return match ? _react2.default.cloneElement(child, { location: location, computedMatch: match }) : null;
  };

  return Switch;
}(_react2.default.Component);

Switch.contextTypes = {
  router: _propTypes2.default.shape({
    route: _propTypes2.default.object.isRequired
  }).isRequired
};
Switch.propTypes = {
  children: _propTypes2.default.node,
  location: _propTypes2.default.object
};

exports.default = Switch;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _generatePath = __webpack_require__(61);

var _generatePath2 = _interopRequireDefault(_generatePath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _generatePath2.default; // Written in this round about way for babel-transform-imports

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matchPath = __webpack_require__(43);

var _matchPath2 = _interopRequireDefault(_matchPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _matchPath2.default; // Written in this round about way for babel-transform-imports

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _withRouter = __webpack_require__(98);

var _withRouter2 = _interopRequireDefault(_withRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _withRouter2.default; // Written in this round about way for babel-transform-imports

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = __webpack_require__(99);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _Route = __webpack_require__(59);

var _Route2 = _interopRequireDefault(_Route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

/**
 * A public higher-order component to access the imperative API
 */
var withRouter = function withRouter(Component) {
  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutProperties(props, ["wrappedComponentRef"]);

    return _react2.default.createElement(_Route2.default, {
      children: function children(routeComponentProps) {
        return _react2.default.createElement(Component, _extends({}, remainingProps, routeComponentProps, {
          ref: wrappedComponentRef
        }));
      }
    });
  };

  C.displayName = "withRouter(" + (Component.displayName || Component.name) + ")";
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: _propTypes2.default.func
  };

  return (0, _hoistNonReactStatics2.default)(C, Component);
};

exports.default = withRouter;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = openPopup;
/* istanbul ignore next */
var settings = "scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no";

/* istanbul ignore next */
function getPopupOffset(_ref) {
  var width = _ref.width,
      height = _ref.height;

  var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  var wTop = window.screenTop ? window.screenTop : window.screenY;

  var left = wLeft + window.innerWidth / 2 - width / 2;
  var top = wTop + window.innerHeight / 2 - height / 2;

  return { top: top, left: left };
}

/* istanbul ignore next */
function getPopupSize(provider) {
  switch (provider) {
    case "facebook":
      return { width: 580, height: 400 };

    case "google":
      return { width: 452, height: 633 };

    case "github":
      return { width: 1020, height: 618 };

    case "linkedin":
      return { width: 527, height: 582 };

    case "twitter":
      return { width: 495, height: 645 };

    case "live":
      return { width: 500, height: 560 };

    case "yahoo":
      return { width: 559, height: 519 };

    default:
      return { width: 1020, height: 618 };
  }
}

/* istanbul ignore next */
function getPopupDimensions(provider) {
  var _getPopupSize = getPopupSize(provider),
      width = _getPopupSize.width,
      height = _getPopupSize.height;

  var _getPopupOffset = getPopupOffset({ width: width, height: height }),
      top = _getPopupOffset.top,
      left = _getPopupOffset.left;

  return "width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
}

/* istanbul ignore next */
function openPopup(provider, url, name) {
  return window.open(url, name, settings + "," + getPopupDimensions(provider));
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAuthorizationHeader = addAuthorizationHeader;

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!options.headers) {
    options.headers = {};
  }
  (0, _extend2.default)(options.headers, getAuthHeaders(options.url));
  //console.log('axiauth req headers', options.headers);
  return (0, _axios2.default)(options).then(function (resp) {
    return updateAuthCredentials(resp);
  }).catch(function (e) {
    if (e.response.status !== 401) {
      updateAuthCredentials(e.response);
    }
    throw e;
  });
};

var _axios = __webpack_require__(102);

var _axios2 = _interopRequireDefault(_axios);

var _constants = __webpack_require__(20);

var C = _interopRequireWildcard(_constants);

var _extend = __webpack_require__(15);

var _extend2 = _interopRequireDefault(_extend);

var _sessionStorage = __webpack_require__(9);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isApiRequest = function isApiRequest(url) {
  return url.match((0, _sessionStorage.getApiUrl)((0, _sessionStorage.getSessionEndpointKey)()));
};

/**
 * Add access token as a bearer token in accordance to RFC 6750
 *
 * @param {string} accessToken
 * @param {object} headers
 * @returns {object} New extended headers object, with Authorization property
 */
function addAuthorizationHeader(accessToken, headers) {
  return Object.assign({}, headers, {
    Authorization: "Bearer " + accessToken
  });
}

function getAuthHeaders(url) {
  if (isApiRequest(url)) {
    // fetch current auth headers from storage
    var currentHeaders = (0, _sessionStorage.retrieveData)(C.SAVED_CREDS_KEY) || {},
        nextHeaders = {};

    // bust IE cache
    nextHeaders["If-Modified-Since"] = "Mon, 26 Jul 1997 05:00:00 GMT";

    // set header for each key in `tokenFormat` config
    for (var key in (0, _sessionStorage.getTokenFormat)()) {
      nextHeaders[key] = currentHeaders[key];
    }

    return addAuthorizationHeader(currentHeaders['access-token'], nextHeaders);
  } else {
    return {};
  }
}

function updateAuthCredentials(resp) {
  // check config apiUrl matches the current response url
  if (isApiRequest(resp.config.url)) {
    // set header for each key in `tokenFormat` config
    var newHeaders = {};

    // set flag to ensure that we don't accidentally nuke the headers
    // if the response tokens aren't sent back from the API
    var blankHeaders = true;

    //console.log('axiauth resp', resp);
    // set header key + val for each key in `tokenFormat` config
    for (var key in (0, _sessionStorage.getTokenFormat)()) {
      newHeaders[key] = resp.headers[key];
    }
    if (!!newHeaders['access-token']) {
      blankHeaders = false;
    }

    // persist headers for next request
    if (!blankHeaders) {
      (0, _sessionStorage.persistData)(C.SAVED_CREDS_KEY, newHeaders);
    }
  }

  return resp;
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(103);

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);
var bind = __webpack_require__(62);
var Axios = __webpack_require__(105);
var defaults = __webpack_require__(47);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(66);
axios.CancelToken = __webpack_require__(119);
axios.isCancel = __webpack_require__(65);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(120);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(47);
var utils = __webpack_require__(14);
var InterceptorManager = __webpack_require__(114);
var dispatchRequest = __webpack_require__(115);
var isAbsoluteURL = __webpack_require__(117);
var combineURLs = __webpack_require__(118);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(64);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;

  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */
  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href);

    // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);

  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */
  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() :

// Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error();
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
  // initialize result and counter
  var block, charCode, idx = 0, map = chars;
  // if the next str index does not exist:
  //   change the mapping table to "="
  //   check if d has no fractional digits
  str.charAt(idx | 0) || (map = '=', idx % 1);
  // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
  output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

module.exports = utils.isStandardBrowserEnv() ?

// Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },

    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },

    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() :

// Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);
var transformData = __webpack_require__(116);
var isCancel = __webpack_require__(65);
var defaults = __webpack_require__(47);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(config.data, config.headers, config.transformRequest);

  // Flatten headers
  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});

  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(response.data, response.headers, config.transformResponse);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return (/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
  );
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(66);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _authenticate = __webpack_require__(29);

var A = _interopRequireWildcard(_authenticate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = _immutable2.default.fromJS({
  loading: false,
  valid: false,
  errors: null
});

exports.default = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, A.AUTHENTICATE_START, function (state) {
  return state.set("loading", true);
}), _defineProperty(_createReducer, A.AUTHENTICATE_COMPLETE, function (state) {
  return state.merge({
    loading: false,
    errors: null,
    valid: true
  });
}), _defineProperty(_createReducer, A.AUTHENTICATE_ERROR, function (state) {
  return state.merge({
    loading: false,
    errors: "Invalid token",
    valid: false
  });
}), _createReducer));

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _configure = __webpack_require__(5);

var A = _interopRequireWildcard(_configure);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = _immutable2.default.fromJS({
  loading: true,
  errors: null,
  config: null,
  endpointKeys: null,
  defaultEndpointKey: null,
  currentEndpointKey: null
});

exports.default = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, A.CONFIGURE_START, function (state) {
  return state.set("loading", true);
}), _defineProperty(_createReducer, A.STORE_CURRENT_ENDPOINT_KEY, function (state, _ref) {
  var currentEndpointKey = _ref.currentEndpointKey;
  return state.merge({ currentEndpointKey: currentEndpointKey });
}), _defineProperty(_createReducer, A.SET_ENDPOINT_KEYS, function (state, _ref2) {
  var endpointKeys = _ref2.endpointKeys,
      defaultEndpointKey = _ref2.defaultEndpointKey,
      currentEndpointKey = _ref2.currentEndpointKey;
  return state.merge({
    endpointKeys: endpointKeys, defaultEndpointKey: defaultEndpointKey, currentEndpointKey: currentEndpointKey
  });
}), _defineProperty(_createReducer, A.CONFIGURE_COMPLETE, function (state, _ref3) {
  var config = _ref3.config;
  return state.merge({
    loading: false,
    errors: null,
    config: config
  });
}), _defineProperty(_createReducer, A.CONFIGURE_ERROR, function (state, _ref4) {
  var errors = _ref4.errors;
  return state.merge({
    loading: false,
    errors: errors
  });
}), _createReducer));

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _sessionStorage = __webpack_require__(9);

var _authenticate = __webpack_require__(29);

var authActions = _interopRequireWildcard(_authenticate);

var _emailSignIn = __webpack_require__(31);

var _emailSignUp = __webpack_require__(33);

var _updateAccount = __webpack_require__(45);

var _signOut = __webpack_require__(32);

var _oauthSignIn = __webpack_require__(34);

var _destroyAccount = __webpack_require__(36);

var _server = __webpack_require__(30);

var ssActions = _interopRequireWildcard(_server);

var _updatePasswordModal = __webpack_require__(35);

var passwordModalActions = _interopRequireWildcard(_updatePasswordModal);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = _immutable2.default.fromJS({
  attributes: null,
  isSignedIn: false,
  firstTimeLogin: false,
  mustResetPassword: false,
  endpointKey: null,
  smsToken: ""
});

exports.default = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, authActions.AUTHENTICATE_COMPLETE, function (state, _ref) {
  var user = _ref.user;
  return state.merge({
    attributes: user,
    isSignedIn: true,
    endpointKey: (0, _sessionStorage.getCurrentEndpointKey)()
  });
}), _defineProperty(_createReducer, ssActions.SS_TOKEN_VALIDATION_COMPLETE, function (state, _ref2) {
  var user = _ref2.user,
      mustResetPassword = _ref2.mustResetPassword,
      firstTimeLogin = _ref2.firstTimeLogin;

  return state.merge({
    attributes: user,
    isSignedIn: true,
    firstTimeLogin: firstTimeLogin,
    mustResetPassword: mustResetPassword
  });
}), _defineProperty(_createReducer, _configure.STORE_CURRENT_ENDPOINT_KEY, function (state, _ref3) {
  var currentEndpointKey = _ref3.currentEndpointKey;
  return state.set("endpointKey", currentEndpointKey);
}), _defineProperty(_createReducer, _configure.SET_ENDPOINT_KEYS, function (state, _ref4) {
  var currentEndpointKey = _ref4.currentEndpointKey;
  return state.set("endpointKey", currentEndpointKey);
}), _defineProperty(_createReducer, _emailSignIn.EMAIL_SIGN_IN_COMPLETE, function (state, _ref5) {
  var endpoint = _ref5.endpoint,
      user = _ref5.user;
  return state.merge({
    attributes: user.data,
    isSignedIn: true,
    endpointKey: endpoint
  });
}), _defineProperty(_createReducer, _emailSignIn.EMAIL_SIGN_IN_TEMP, function (state, _ref6) {
  var endpoint = _ref6.endpoint,
      user = _ref6.user;
  return state.merge({
    attributes: user.data,
    isSignedIn: false,
    endpointKey: endpoint,
    smsToken: user.sms_token
  });
}), _defineProperty(_createReducer, _emailSignIn.TFA_EMAIL_SIGN_IN_COMPLETE, function (state) {
  return state.set("isSignedIn", true);
}), _defineProperty(_createReducer, _emailSignUp.EMAIL_SIGN_UP_COMPLETE, function (state, _ref7) {
  var endpoint = _ref7.endpoint,
      user = _ref7.user;

  // if registration does not require confirmation, user will be signed in at
  // this point.
  return user.uid ? state.merge({
    attributes: user,
    isSignedIn: true,
    endpointKey: endpoint
  }) : state;
}), _defineProperty(_createReducer, _updateAccount.UPDATE_ACCOUNT_COMPLETE, function (state, _ref8) {
  var endpoint = _ref8.endpoint,
      user = _ref8.user;
  return state.merge({
    attributes: user,
    isSignedIn: true,
    endpointKey: endpoint
  });
}), _defineProperty(_createReducer, _oauthSignIn.OAUTH_SIGN_IN_COMPLETE, function (state, _ref9) {
  var endpoint = _ref9.endpoint,
      user = _ref9.user;
  return state.merge({
    attributes: user,
    isSignedIn: true,
    endpointKey: endpoint
  });
}), _defineProperty(_createReducer, ssActions.SS_AUTH_TOKEN_UPDATE, function (state, _ref10) {
  var user = _ref10.user,
      mustResetPassword = _ref10.mustResetPassword,
      firstTimeLogin = _ref10.firstTimeLogin;

  return state.merge({
    mustResetPassword: mustResetPassword,
    firstTimeLogin: firstTimeLogin,
    isSignedIn: !!user,
    attributes: user
  });
}), _defineProperty(_createReducer, passwordModalActions.UPDATE_ACCOUNT_COMPLETE, function (state, _ref11) {
  var endpoint = _ref11.endpoint,
      user = _ref11.user;
  return state.merge({
    attributes: user,
    isSignedIn: true,
    endpointKey: endpoint
  });
}), _defineProperty(_createReducer, authActions.AUTHENTICATE_FAILURE, function (state) {
  return state.merge(initialState);
}), _defineProperty(_createReducer, ssActions.SS_TOKEN_VALIDATION_ERROR, function (state) {
  return state.merge(initialState);
}), _defineProperty(_createReducer, _signOut.SIGN_OUT_COMPLETE, function (state) {
  return state.merge(initialState);
}), _defineProperty(_createReducer, _signOut.SIGN_OUT_ERROR, function (state) {
  return state.merge(initialState);
}), _defineProperty(_createReducer, _destroyAccount.DESTROY_ACCOUNT_COMPLETE, function (state) {
  return state.merge(initialState);
}), _createReducer));

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _ui = __webpack_require__(39);

var uiActions = _interopRequireWildcard(_ui);

var _emailSignIn = __webpack_require__(31);

var emailSignInActions = _interopRequireWildcard(_emailSignIn);

var _emailSignUp = __webpack_require__(33);

var emailSignUpActions = _interopRequireWildcard(_emailSignUp);

var _signOut = __webpack_require__(32);

var signOutActions = _interopRequireWildcard(_signOut);

var _requestPasswordReset = __webpack_require__(44);

var requestPasswordResetActions = _interopRequireWildcard(_requestPasswordReset);

var _oauthSignIn = __webpack_require__(34);

var oAuthSignInActions = _interopRequireWildcard(_oauthSignIn);

var _updatePassword = __webpack_require__(46);

var updatePasswordActions = _interopRequireWildcard(_updatePassword);

var _destroyAccount = __webpack_require__(36);

var destroyAccountActions = _interopRequireWildcard(_destroyAccount);

var _updatePasswordModal = __webpack_require__(35);

var updatePasswordModalActions = _interopRequireWildcard(_updatePasswordModal);

var _server = __webpack_require__(30);

var serverActions = _interopRequireWildcard(_server);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = _immutable2.default.fromJS({
  emailSignInSuccessModalVisible: false,
  emailSignInErrorModalVisible: false,
  oAuthSignInSuccessModalVisible: false,
  oAuthSignInErrorModalVisible: false,
  oAuthSignInLoadingProvider: null,
  signOutSuccessModalVisible: false,
  signOutErrorModalVisible: false,
  emailSignUpSuccessModalVisible: false,
  emailSignUpAddress: null,
  firstTimeLoginSuccessModalVisible: false,
  firstTimeLoginErrorModalVisible: false,
  requestPasswordResetSuccessModalVisible: false,
  requestPasswordResetErrorModalVisible: false,
  requestPasswordResetSuccessMessage: null,
  updatePasswordSuccessModalVisible: false,
  updatePasswordErrorModalVisible: false,
  destroyAccountSuccessModalVisible: false,
  destroyAccountErrorModalVisible: false,
  destroyAccountMessage: null,
  passwordResetSuccessModalVisible: false,
  passwordResetErrorModalVisible: false
});

exports.default = (0, _reduxImmutablejs.createReducer)(initialState, (_createReducer = {}, _defineProperty(_createReducer, emailSignInActions.EMAIL_SIGN_IN_COMPLETE, function (state) {
  return state.set("emailSignInSuccessModalVisible", true);
}), _defineProperty(_createReducer, emailSignInActions.EMAIL_SIGN_IN_TEMP, function (state) {
  return state.set("emailSignInSuccessModalVisible", true);
}), _defineProperty(_createReducer, emailSignInActions.EMAIL_SIGN_IN_ERROR, function (state) {
  return state.set("emailSignInErrorModalVisible", true);
}), _defineProperty(_createReducer, oAuthSignInActions.OAUTH_SIGN_IN_COMPLETE, function (state) {
  return state.merge({
    oAuthSignInSuccessModalVisible: true,
    oAuthSignInLoadingProvider: null
  });
}), _defineProperty(_createReducer, oAuthSignInActions.OAUTH_SIGN_IN_ERROR, function (state) {
  return state.merge({
    oAuthSignInErrorModalVisible: true,
    oAuthSignInLoadingProvider: null
  });
}), _defineProperty(_createReducer, oAuthSignInActions.OAUTH_SIGN_IN_START, function (state, _ref) {
  var provider = _ref.provider;
  return state.merge({
    oAuthSignInLoadingProvider: provider
  });
}), _defineProperty(_createReducer, uiActions.HIDE_EMAIL_SIGN_IN_SUCCESS_MODAL, function (state) {
  return state.set("emailSignInSuccessModalVisible", false);
}), _defineProperty(_createReducer, uiActions.HIDE_EMAIL_SIGN_IN_ERROR_MODAL, function (state) {
  return state.set("emailSignInErrorModalVisible", false);
}), _defineProperty(_createReducer, signOutActions.SIGN_OUT_COMPLETE, function (state) {
  return state.set("signOutSuccessModalVisible", true);
}), _defineProperty(_createReducer, signOutActions.SIGN_OUT_ERROR, function (state) {
  return state.set("signOutErrorModalVisible", true);
}), _defineProperty(_createReducer, uiActions.HIDE_SIGN_OUT_SUCCESS_MODAL, function (state) {
  return state.set("signOutSuccessModalVisible", false);
}), _defineProperty(_createReducer, uiActions.HIDE_SIGN_OUT_ERROR_MODAL, function (state) {
  return state.set("signOutErrorModalVisible", false);
}), _defineProperty(_createReducer, emailSignUpActions.EMAIL_SIGN_UP_COMPLETE, function (state, _ref2) {
  var user = _ref2.user;
  return state.merge({
    emailSignUpSuccessModalVisible: true,
    emailSignUpAddress: user.email
  });
}), _defineProperty(_createReducer, emailSignUpActions.EMAIL_SIGN_UP_ERROR, function (state) {
  return state.set("emailSignUpErrorModalVisible", true);
}), _defineProperty(_createReducer, uiActions.HIDE_EMAIL_SIGN_UP_SUCCESS_MODAL, function (state) {
  return state.merge({
    emailSignUpSuccessModalVisible: false,
    emailSignUpAddress: null
  });
}), _defineProperty(_createReducer, uiActions.HIDE_EMAIL_SIGN_UP_ERROR_MODAL, function (state) {
  return state.set("emailSignUpErrorModalVisible", false);
}), _defineProperty(_createReducer, uiActions.SHOW_FIRST_TIME_LOGIN_SUCCESS_MODAL, function (state) {
  return state.set("firstTimeLoginSuccessModalVisible", true);
}), _defineProperty(_createReducer, uiActions.HIDE_FIRST_TIME_LOGIN_SUCCESS_MODAL, function (state) {
  return state.set("firstTimeLoginSuccessModalVisible", false);
}), _defineProperty(_createReducer, uiActions.HIDE_PASSWORD_RESET_SUCCESS_MODAL, function (state) {
  return state.set("passwordResetSuccessModalVisible", false);
}), _defineProperty(_createReducer, uiActions.SHOW_PASSWORD_RESET_SUCCESS_MODAL, function (state) {
  return state.set("passwordResetSuccessModalVisible", true);
}), _defineProperty(_createReducer, uiActions.SHOW_FIRST_TIME_LOGIN_ERROR_MODAL, function (state) {
  return state.set("firstTimeLoginErrorModalVisible", true);
}), _defineProperty(_createReducer, uiActions.HIDE_FIRST_TIME_LOGIN_ERROR_MODAL, function (state) {
  return state.set("firstTimeLoginErrorModalVisible", false);
}), _defineProperty(_createReducer, uiActions.HIDE_PASSWORD_RESET_ERROR_MODAL, function (state) {
  return state.set("passwordResetErrorModalVisible", false);
}), _defineProperty(_createReducer, uiActions.SHOW_PASSWORD_RESET_ERROR_MODAL, function (state) {
  return state.set("passwordResetErrorModalVisible", true);
}), _defineProperty(_createReducer, requestPasswordResetActions.REQUEST_PASSWORD_RESET_COMPLETE, function (state, _ref3) {
  var message = _ref3.message;

  return state.merge({
    requestPasswordResetSuccessModalVisible: true,
    requestPasswordResetSuccessMessage: message
  });
}), _defineProperty(_createReducer, requestPasswordResetActions.REQUEST_PASSWORD_RESET_ERROR, function (state) {
  return state.set("requestPasswordResetErrorModalVisible", true);
}), _defineProperty(_createReducer, uiActions.HIDE_REQUEST_PASSWORD_RESET_SUCCESS_MODAL, function (state) {
  return state.merge({
    requestPasswordResetSuccessModalVisible: false,
    requestPasswordResetSuccessMessage: null
  });
}), _defineProperty(_createReducer, uiActions.HIDE_REQUEST_PASSWORD_RESET_ERROR_MODAL, function (state) {
  return state.set("requestPasswordResetErrorModalVisible", false);
}), _defineProperty(_createReducer, uiActions.HIDE_OAUTH_SIGN_IN_SUCCESS_MODAL, function (state) {
  return state.set("oAuthSignInSuccessModalVisible", false);
}), _defineProperty(_createReducer, uiActions.HIDE_OAUTH_SIGN_IN_ERROR_MODAL, function (state) {
  return state.set("oAuthSignInErrorModalVisible", false);
}), _defineProperty(_createReducer, updatePasswordActions.UPDATE_PASSWORD_COMPLETE, function (state) {
  return state.set("updatePasswordSuccessModalVisible", true);
}), _defineProperty(_createReducer, updatePasswordActions.UPDATE_PASSWORD_ERROR, function (state) {
  return state.set("updatePasswordErrorModalVisible", true);
}), _defineProperty(_createReducer, uiActions.HIDE_UPDATE_PASSWORD_SUCCESS_MODAL, function (state) {
  return state.set("updatePasswordSuccessModalVisible", false);
}), _defineProperty(_createReducer, uiActions.HIDE_UPDATE_PASSWORD_ERROR_MODAL, function (state) {
  return state.set("updatePasswordErrorModalVisible", false);
}), _defineProperty(_createReducer, destroyAccountActions.DESTROY_ACCOUNT_COMPLETE, function (state, _ref4) {
  var message = _ref4.message;
  return state.merge({
    destroyAccountSuccessModalVisible: true,
    destroyAccountMessage: message
  });
}), _defineProperty(_createReducer, destroyAccountActions.DESTROY_ACCOUNT_ERROR, function (state) {
  return state.set("destroyAccountErrorModalVisible", true);
}), _defineProperty(_createReducer, uiActions.HIDE_DESTROY_ACCOUNT_SUCCESS_MODAL, function (state) {
  return state.merge({
    destroyAccountSuccessModalVisible: false,
    destroyAccountMessage: null
  });
}), _defineProperty(_createReducer, uiActions.HIDE_DESTROY_ACCOUNT_ERROR_MODAL, function (state) {
  return state.set("destroyAccountErrorModalVisible", false);
}), _defineProperty(_createReducer, serverActions.SS_AUTH_TOKEN_UPDATE, function (state, _ref5) {
  var mustResetPassword = _ref5.mustResetPassword,
      firstTimeLogin = _ref5.firstTimeLogin;
  return state.merge({
    passwordResetSuccessModalVisible: mustResetPassword,
    firstTimeLoginSuccessModalVisible: firstTimeLogin
  });
}), _defineProperty(_createReducer, uiActions.HIDE_PASSWORD_RESET_SUCCESS_MODAL, function (state) {
  return state.set("passwordResetSuccessModalVisible", false);
}), _defineProperty(_createReducer, uiActions.HIDE_PASSWORD_RESET_ERROR_MODAL, function (state) {
  return state.set("passwordResetSuccessModalVisible", false);
}), _defineProperty(_createReducer, updatePasswordModalActions.UPDATE_PASSWORD_MODAL_COMPLETE, function (state) {
  return state.merge({
    passwordResetSuccessModalVisible: false,
    updatePasswordSuccessModalVisible: true
  });
}), _createReducer));

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _emailSignIn = __webpack_require__(31);

var A = _interopRequireWildcard(_emailSignIn);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  errors: null,
  form: {}
};

exports.default = (0, _reduxImmutablejs.createReducer)(_immutable2.default.fromJS({}), (_createReducer = {}, _defineProperty(_createReducer, _configure.SET_ENDPOINT_KEYS, function (state, _ref) {
  var endpoints = _ref.endpoints;
  return state.merge(endpoints.reduce(function (coll, k) {
    coll[k] = _immutable2.default.fromJS(initialState);
    return coll;
  }, {}));
}), _defineProperty(_createReducer, A.EMAIL_SIGN_IN_START, function (state, _ref2) {
  var endpoint = _ref2.endpoint;
  return state.setIn([endpoint, "loading"], true);
}), _defineProperty(_createReducer, A.EMAIL_SIGN_IN_COMPLETE, function (state, _ref3) {
  var endpoint = _ref3.endpoint;
  return state.merge(_defineProperty({}, endpoint, initialState));
}), _defineProperty(_createReducer, A.EMAIL_SIGN_IN_TEMP, function (state, _ref4) {
  var endpoint = _ref4.endpoint;
  return state.merge(_defineProperty({}, endpoint, initialState));
}), _defineProperty(_createReducer, A.EMAIL_SIGN_IN_ERROR, function (state, _ref5) {
  var endpoint = _ref5.endpoint,
      errors = _ref5.errors;
  return state.mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: errors
  }));
}), _defineProperty(_createReducer, A.EMAIL_SIGN_IN_FORM_UPDATE, function (state, _ref6) {
  var endpoint = _ref6.endpoint,
      key = _ref6.key,
      value = _ref6.value;

  return state.mergeDeep(_defineProperty({}, endpoint, {
    form: _defineProperty({}, key, value)
  }));
}), _createReducer));

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _emailSignUp = __webpack_require__(33);

var A = _interopRequireWildcard(_emailSignUp);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  errors: null,
  form: {}
};

exports.default = (0, _reduxImmutablejs.createReducer)(_immutable2.default.fromJS({}), (_createReducer = {}, _defineProperty(_createReducer, _configure.SET_ENDPOINT_KEYS, function (state, _ref) {
  var endpoints = _ref.endpoints;
  return state.merge(endpoints.reduce(function (coll, k) {
    coll[k] = _immutable2.default.fromJS(initialState);
    return coll;
  }, {}));
}), _defineProperty(_createReducer, A.EMAIL_SIGN_UP_START, function (state, _ref2) {
  var endpoint = _ref2.endpoint;
  return state.setIn([endpoint, "loading"], true);
}), _defineProperty(_createReducer, A.EMAIL_SIGN_UP_COMPLETE, function (state, _ref3) {
  var endpoint = _ref3.endpoint;
  return state.merge(_defineProperty({}, endpoint, initialState));
}), _defineProperty(_createReducer, A.EMAIL_SIGN_UP_ERROR, function (state, _ref4) {
  var endpoint = _ref4.endpoint,
      errors = _ref4.errors;
  return state.setIn([endpoint, "errors"], _immutable2.default.fromJS({})).mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: errors
  }));
}), _defineProperty(_createReducer, A.EMAIL_SIGN_UP_FORM_UPDATE, function (state, _ref5) {
  var endpoint = _ref5.endpoint,
      key = _ref5.key,
      value = _ref5.value;

  return state.mergeDeep(_defineProperty({}, endpoint, {
    form: _defineProperty({}, key, value)
  }));
}), _createReducer));

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _oauthSignIn = __webpack_require__(34);

var A = _interopRequireWildcard(_oauthSignIn);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  errors: null
};

exports.default = (0, _reduxImmutablejs.createReducer)(_immutable2.default.fromJS({}), (_createReducer = {}, _defineProperty(_createReducer, _configure.SET_ENDPOINT_KEYS, function (state, _ref) {
  var endpoints = _ref.endpoints;
  return state.merge(endpoints.reduce(function (coll, k) {
    coll[k] = _immutable2.default.fromJS(initialState);
    return coll;
  }, {}));
}), _defineProperty(_createReducer, A.OAUTH_SIGN_IN_START, function (state, _ref2) {
  var endpoint = _ref2.endpoint;
  return state.setIn([endpoint, "loading"], true);
}), _defineProperty(_createReducer, A.OAUTH_SIGN_IN_COMPLETE, function (state, _ref3) {
  var endpoint = _ref3.endpoint;
  return state.mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: null
  }));
}), _defineProperty(_createReducer, A.OAUTH_SIGN_IN_ERROR, function (state, _ref4) {
  var endpoint = _ref4.endpoint,
      errors = _ref4.errors;
  return state.mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: errors
  }));
}), _createReducer));

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _requestPasswordReset = __webpack_require__(44);

var A = _interopRequireWildcard(_requestPasswordReset);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  errors: null,
  form: {}
};

exports.default = (0, _reduxImmutablejs.createReducer)(_immutable2.default.fromJS({}), (_createReducer = {}, _defineProperty(_createReducer, _configure.SET_ENDPOINT_KEYS, function (state, _ref) {
  var endpoints = _ref.endpoints;
  return state.merge(endpoints.reduce(function (coll, k) {
    coll[k] = _immutable2.default.fromJS(initialState);
    return coll;
  }, {}));
}), _defineProperty(_createReducer, A.REQUEST_PASSWORD_RESET_START, function (state, _ref2) {
  var endpoint = _ref2.endpoint;
  return state.setIn([endpoint, "loading"], true);
}), _defineProperty(_createReducer, A.REQUEST_PASSWORD_RESET_COMPLETE, function (state, _ref3) {
  var endpoint = _ref3.endpoint;
  return state.merge(_defineProperty({}, endpoint, initialState));
}), _defineProperty(_createReducer, A.REQUEST_PASSWORD_RESET_ERROR, function (state, _ref4) {
  var endpoint = _ref4.endpoint,
      errors = _ref4.errors;
  return state.mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: errors
  }));
}), _defineProperty(_createReducer, A.REQUEST_PASSWORD_RESET_FORM_UPDATE, function (state, _ref5) {
  var endpoint = _ref5.endpoint,
      key = _ref5.key,
      value = _ref5.value;

  return state.mergeDeep(_defineProperty({}, endpoint, {
    form: _defineProperty({}, key, value)
  }));
}), _createReducer));

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _updateAccount = __webpack_require__(45);

var A = _interopRequireWildcard(_updateAccount);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  errors: null,
  form: {}
};

exports.default = (0, _reduxImmutablejs.createReducer)(_immutable2.default.fromJS({}), (_createReducer = {}, _defineProperty(_createReducer, _configure.SET_ENDPOINT_KEYS, function (state, _ref) {
  var endpoints = _ref.endpoints;
  return state.merge(endpoints.reduce(function (coll, k) {
    coll[k] = _immutable2.default.fromJS(initialState);
    return coll;
  }, {}));
}), _defineProperty(_createReducer, A.UPDATE_ACCOUNT_START, function (state, _ref2) {
  var endpoint = _ref2.endpoint;
  return state.setIn([endpoint, "loading"], true);
}), _defineProperty(_createReducer, A.UPDATE_ACCOUNT_COMPLETE, function (state, _ref3) {
  var endpoint = _ref3.endpoint;
  return state.merge(_defineProperty({}, endpoint, initialState));
}), _defineProperty(_createReducer, A.UPDATE_ACCOUNT_ERROR, function (state, _ref4) {
  var endpoint = _ref4.endpoint,
      errors = _ref4.errors;
  return state.setIn([endpoint, "errors"], _immutable2.default.fromJS({})).mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: errors
  }));
}), _defineProperty(_createReducer, A.UPDATE_ACCOUNT_FORM_UPDATE, function (state, _ref5) {
  var endpoint = _ref5.endpoint,
      key = _ref5.key,
      value = _ref5.value;

  return state.mergeDeep(_defineProperty({}, endpoint, {
    form: _defineProperty({}, key, value)
  }));
}), _createReducer));

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _updatePassword = __webpack_require__(46);

var A = _interopRequireWildcard(_updatePassword);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  errors: null,
  form: {}
};

exports.default = (0, _reduxImmutablejs.createReducer)(_immutable2.default.fromJS({}), (_createReducer = {}, _defineProperty(_createReducer, _configure.SET_ENDPOINT_KEYS, function (state, _ref) {
  var endpoints = _ref.endpoints;
  return state.merge(endpoints.reduce(function (coll, k) {
    coll[k] = _immutable2.default.fromJS(initialState);
    return coll;
  }, {}));
}), _defineProperty(_createReducer, A.UPDATE_PASSWORD_START, function (state, _ref2) {
  var endpoint = _ref2.endpoint;
  return state.setIn([endpoint, "loading"], true);
}), _defineProperty(_createReducer, A.UPDATE_PASSWORD_COMPLETE, function (state, _ref3) {
  var endpoint = _ref3.endpoint;
  return state.merge(_defineProperty({}, endpoint, initialState));
}), _defineProperty(_createReducer, A.UPDATE_PASSWORD_ERROR, function (state, _ref4) {
  var endpoint = _ref4.endpoint,
      errors = _ref4.errors;
  return state.mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: errors
  }));
}), _defineProperty(_createReducer, A.UPDATE_PASSWORD_FORM_UPDATE, function (state, _ref5) {
  var endpoint = _ref5.endpoint,
      key = _ref5.key,
      value = _ref5.value;

  return state.mergeDeep(_defineProperty({}, endpoint, {
    form: _defineProperty({}, key, value)
  }));
}), _createReducer));

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _updatePasswordModal = __webpack_require__(35);

var A = _interopRequireWildcard(_updatePasswordModal);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  errors: null,
  form: {}
};

exports.default = (0, _reduxImmutablejs.createReducer)(_immutable2.default.fromJS({}), (_createReducer = {}, _defineProperty(_createReducer, _configure.SET_ENDPOINT_KEYS, function (state, _ref) {
  var endpoints = _ref.endpoints;
  return state.merge(endpoints.reduce(function (coll, k) {
    coll[k] = _immutable2.default.fromJS(initialState);
    return coll;
  }, {}));
}), _defineProperty(_createReducer, A.UPDATE_PASSWORD_MODAL_START, function (state, _ref2) {
  var endpoint = _ref2.endpoint;
  return state.setIn([endpoint, "loading"], true);
}), _defineProperty(_createReducer, A.UPDATE_PASSWORD_MODAL_COMPLETE, function (state, _ref3) {
  var endpoint = _ref3.endpoint;
  return state.merge(_defineProperty({}, endpoint, initialState));
}), _defineProperty(_createReducer, A.UPDATE_PASSWORD_MODAL_ERROR, function (state, _ref4) {
  var endpoint = _ref4.endpoint,
      errors = _ref4.errors;
  return state.mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: errors
  }));
}), _defineProperty(_createReducer, A.UPDATE_PASSWORD_MODAL_FORM_UPDATE, function (state, _ref5) {
  var endpoint = _ref5.endpoint,
      key = _ref5.key,
      value = _ref5.value;

  return state.mergeDeep(_defineProperty({}, endpoint, {
    form: _defineProperty({}, key, value)
  }));
}), _createReducer));

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _server = __webpack_require__(30);

var A = _interopRequireWildcard(_server);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = _immutable2.default.fromJS({
  user: null,
  headers: null,
  firstTimeLogin: false,
  mustResetPassword: false
});

exports.default = (0, _reduxImmutablejs.createReducer)(initialState, _defineProperty({}, A.SS_AUTH_TOKEN_UPDATE, function (state, _ref) {
  var _ref$user = _ref.user,
      user = _ref$user === undefined ? null : _ref$user,
      _ref$headers = _ref.headers,
      headers = _ref$headers === undefined ? null : _ref$headers,
      _ref$mustResetPasswor = _ref.mustResetPassword,
      mustResetPassword = _ref$mustResetPasswor === undefined ? false : _ref$mustResetPasswor,
      _ref$firstTimeLogin = _ref.firstTimeLogin,
      firstTimeLogin = _ref$firstTimeLogin === undefined ? false : _ref$firstTimeLogin;

  return state.merge({
    user: user,
    headers: headers,
    mustResetPassword: mustResetPassword,
    firstTimeLogin: firstTimeLogin
  });
}));

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _signOut = __webpack_require__(32);

var A = _interopRequireWildcard(_signOut);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  errors: null
};

exports.default = (0, _reduxImmutablejs.createReducer)(_immutable2.default.fromJS({}), (_createReducer = {}, _defineProperty(_createReducer, _configure.SET_ENDPOINT_KEYS, function (state, _ref) {
  var endpoints = _ref.endpoints;
  return state.merge(endpoints.reduce(function (coll, k) {
    coll[k] = _immutable2.default.fromJS(initialState);
    return coll;
  }, {}));
}), _defineProperty(_createReducer, A.SIGN_OUT_START, function (state, _ref2) {
  var endpoint = _ref2.endpoint;
  return state.setIn([endpoint, "loading"], true);
}), _defineProperty(_createReducer, A.SIGN_OUT_COMPLETE, function (state, _ref3) {
  var endpoint = _ref3.endpoint;
  return state.mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: null
  }));
}), _defineProperty(_createReducer, A.SIGN_OUT_ERROR, function (state, _ref4) {
  var endpoint = _ref4.endpoint,
      errors = _ref4.errors;

  return state.mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: errors
  }));
}), _createReducer));

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _destroyAccount = __webpack_require__(36);

var A = _interopRequireWildcard(_destroyAccount);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  errors: null
};

exports.default = (0, _reduxImmutablejs.createReducer)(_immutable2.default.fromJS({}), (_createReducer = {}, _defineProperty(_createReducer, _configure.SET_ENDPOINT_KEYS, function (state, _ref) {
  var endpoints = _ref.endpoints;
  return state.merge(endpoints.reduce(function (coll, k) {
    coll[k] = _immutable2.default.fromJS(initialState);
    return coll;
  }, {}));
}), _defineProperty(_createReducer, A.DESTROY_ACCOUNT_START, function (state, _ref2) {
  var endpoint = _ref2.endpoint;
  return state.setIn([endpoint, "loading"], true);
}), _defineProperty(_createReducer, A.DESTROY_ACCOUNT_COMPLETE, function (state, _ref3) {
  var endpoint = _ref3.endpoint;
  return state.merge(_defineProperty({}, endpoint, initialState));
}), _defineProperty(_createReducer, A.DESTROY_ACCOUNT_ERROR, function (state, _ref4) {
  var endpoint = _ref4.endpoint,
      errors = _ref4.errors;
  return state.merge(_defineProperty({}, endpoint, {
    loading: false,
    errors: errors
  }));
}), _createReducer));

/***/ })
/******/ ])));