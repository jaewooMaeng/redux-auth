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
/******/ 	return __webpack_require__(__webpack_require__.s = 59);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
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

var _extend = __webpack_require__(14);

var _extend2 = _interopRequireDefault(_extend);

var _constants = __webpack_require__(19);

var C = _interopRequireWildcard(_constants);

var _authenticate = __webpack_require__(25);

var _ui = __webpack_require__(34);

var _server = __webpack_require__(26);

var _clientSettings = __webpack_require__(60);

var _sessionStorage = __webpack_require__(9);

var _verifyAuth = __webpack_require__(48);

var _verifyAuth2 = _interopRequireDefault(_verifyAuth);

var _parseUrl = __webpack_require__(35);

var _parseUrl2 = _interopRequireDefault(_parseUrl);

var _reactRouterRedux = __webpack_require__(65);

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
        mustResetPassword = void 0,
        user = void 0,
        headers = void 0;

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
        settings.initialCredentials = (0, _extend2.default)({}, settings.initialCredentials, authRedirectHeaders);
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

var _browserCookies = __webpack_require__(61);

var _browserCookies2 = _interopRequireDefault(_browserCookies);

var _constants = __webpack_require__(19);

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

var _isomorphicFetch = __webpack_require__(46);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _constants = __webpack_require__(19);

var C = _interopRequireWildcard(_constants);

var _extend = __webpack_require__(14);

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

      if (newHeaders[key]) {
        blankHeaders = false;
      }
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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var bind = __webpack_require__(50);
var isBuffer = __webpack_require__(70);

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
/* 14 */
/***/ (function(module, exports) {

module.exports = require("extend");

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseResponse = parseResponse;
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
/* 17 */,
/* 18 */,
/* 19 */
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
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMAIL_SIGN_IN_FORM_UPDATE = exports.EMAIL_SIGN_IN_ERROR = exports.EMAIL_SIGN_IN_COMPLETE = exports.EMAIL_SIGN_IN_START = undefined;
exports.emailSignInFormUpdate = emailSignInFormUpdate;
exports.emailSignInStart = emailSignInStart;
exports.emailSignInComplete = emailSignInComplete;
exports.emailSignInError = emailSignInError;
exports.emailSignIn = emailSignIn;

var _sessionStorage = __webpack_require__(9);

var _configure = __webpack_require__(5);

var _handleFetchResponse = __webpack_require__(16);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EMAIL_SIGN_IN_START = exports.EMAIL_SIGN_IN_START = "EMAIL_SIGN_IN_START";
var EMAIL_SIGN_IN_COMPLETE = exports.EMAIL_SIGN_IN_COMPLETE = "EMAIL_SIGN_IN_COMPLETE";
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
function emailSignInError(endpoint, errors) {
  return { type: EMAIL_SIGN_IN_ERROR, errors: errors, endpoint: endpoint };
}
function emailSignIn(body, endpointKey) {
  return function (dispatch) {
    // save previous endpoint key in case of failure
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
      return dispatch(emailSignInComplete(currentEndpointKey, user));
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
/* 28 */
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

var _handleFetchResponse = __webpack_require__(16);

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
/* 29 */
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

var _handleFetchResponse = __webpack_require__(16);

var _extend = __webpack_require__(14);

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
/* 30 */
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

var _constants = __webpack_require__(19);

var C = _interopRequireWildcard(_constants);

var _parseUrl = __webpack_require__(35);

var _sessionStorage = __webpack_require__(9);

var _configure = __webpack_require__(5);

var _handleFetchResponse = __webpack_require__(16);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

var _popup = __webpack_require__(66);

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
/* 31 */
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

var _handleFetchResponse = __webpack_require__(16);

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
/* 32 */,
/* 33 */,
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeTokenKeys = normalizeTokenKeys;
exports.getAllParams = getAllParams;
exports.default = getRedirectInfo;

var _querystring = __webpack_require__(63);

var _querystring2 = _interopRequireDefault(_querystring);

var _extend = __webpack_require__(14);

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
/* 36 */
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

var _handleFetchResponse = __webpack_require__(16);

var _extend = __webpack_require__(14);

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
/* 37 */
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

var _handleFetchResponse = __webpack_require__(16);

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
/* 38 */
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

var _handleFetchResponse = __webpack_require__(16);

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(13);
var normalizeHeaderName = __webpack_require__(72);

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
    adapter = __webpack_require__(51);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(51);
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
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseEndpointConfig;

var _constants = __webpack_require__(19);

var C = _interopRequireWildcard(_constants);

var _extend = __webpack_require__(14);

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.fetchToken = fetchToken;

var _isomorphicFetch = __webpack_require__(46);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _cookie = __webpack_require__(62);

var _cookie2 = _interopRequireDefault(_cookie);

var _parseUrl = __webpack_require__(35);

var _parseUrl2 = _interopRequireDefault(_parseUrl);

var _constants = __webpack_require__(19);

var C = _interopRequireWildcard(_constants);

var _fetch = __webpack_require__(12);

var _parseEndpointConfig3 = __webpack_require__(47);

var _parseEndpointConfig4 = _interopRequireDefault(_parseEndpointConfig3);

var _url = __webpack_require__(64);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAccount = exports.updateAccountError = exports.updateAccountComplete = exports.updateAccountStart = exports.updateAccountFormUpdate = exports.UPDATE_ACCOUNT_FORM_UPDATE = exports.UPDATE_ACCOUNT_ERROR = exports.UPDATE_ACCOUNT_COMPLETE = exports.UPDATE_ACCOUNT_START = undefined;

var _sessionStorage = __webpack_require__(9);

var _handleFetchResponse = __webpack_require__(16);

var _extend = __webpack_require__(14);

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
/* 50 */
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);
var settle = __webpack_require__(73);
var buildURL = __webpack_require__(75);
var parseHeaders = __webpack_require__(76);
var isURLSameOrigin = __webpack_require__(77);
var createError = __webpack_require__(52);
var btoa = typeof window !== 'undefined' && window.btoa && window.btoa.bind(window) || __webpack_require__(78);

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
      var cookies = __webpack_require__(79);

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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(74);

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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),
/* 54 */
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
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axiauth = exports.fetch = exports.hideDestroyAccountErrorModal = exports.hideDestroyAccountSuccessModal = exports.hideUpdatePasswordErrorModal = exports.hideUpdatePasswordSuccessModal = exports.hidePasswordResetRequestErrorModal = exports.hidePasswordResetRequestSuccessModal = exports.hidePasswordResetErrorModal = exports.hideFirstTimeLoginErrorModal = exports.showPasswordResetErrorModal = exports.showFirstTimeLoginErrorModal = exports.hidePasswordResetSuccessModal = exports.hideFirstTimeLoginSuccessModal = exports.showPasswordResetSuccessModal = exports.showFirstTimeLoginSuccessModal = exports.hideEmailSignUpErrorModal = exports.hideEmailSignUpSuccessModal = exports.hideSignOutErrorModal = exports.hideSignOutSuccessModal = exports.hideOAuthSignInErrorModal = exports.hideOAuthSignInSuccessModal = exports.hideEmailSignInErrorModal = exports.hideEmailSignInSuccessModal = exports.getApiUrl = exports.verifyAuth = exports.destroyAccount = exports.updatePasswordModalFormUpdate = exports.updatePasswordModal = exports.updatePasswordFormUpdate = exports.updatePassword = exports.updateAccountFormUpdate = exports.updateAccount = exports.requestPasswordResetFormUpdate = exports.requestPasswordReset = exports.oAuthSignIn = exports.emailSignUpFormUpdate = exports.emailSignUp = exports.signOut = exports.emailSignInFormUpdate = exports.emailSignIn = exports.authenticate = exports.configure = exports.authStateReducer = undefined;

var _configure = __webpack_require__(5);

Object.defineProperty(exports, "configure", {
  enumerable: true,
  get: function get() {
    return _configure.configure;
  }
});

var _authenticate = __webpack_require__(25);

Object.defineProperty(exports, "authenticate", {
  enumerable: true,
  get: function get() {
    return _authenticate.authenticate;
  }
});

var _emailSignIn = __webpack_require__(27);

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

var _signOut = __webpack_require__(28);

Object.defineProperty(exports, "signOut", {
  enumerable: true,
  get: function get() {
    return _signOut.signOut;
  }
});

var _emailSignUp = __webpack_require__(29);

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

var _oauthSignIn = __webpack_require__(30);

Object.defineProperty(exports, "oAuthSignIn", {
  enumerable: true,
  get: function get() {
    return _oauthSignIn.oAuthSignIn;
  }
});

var _requestPasswordReset = __webpack_require__(36);

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

var _updateAccount = __webpack_require__(49);

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

var _updatePassword = __webpack_require__(37);

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

var _updatePasswordModal = __webpack_require__(38);

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

var _destroyAccount = __webpack_require__(31);

Object.defineProperty(exports, "destroyAccount", {
  enumerable: true,
  get: function get() {
    return _destroyAccount.destroyAccount;
  }
});

var _verifyAuth = __webpack_require__(48);

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

var _ui = __webpack_require__(34);

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

var _axiauth = __webpack_require__(67);

Object.defineProperty(exports, "axiauth", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_axiauth).default;
  }
});

var _authenticate2 = __webpack_require__(87);

var _authenticate3 = _interopRequireDefault(_authenticate2);

var _configure2 = __webpack_require__(88);

var _configure3 = _interopRequireDefault(_configure2);

var _user = __webpack_require__(89);

var _user2 = _interopRequireDefault(_user);

var _ui2 = __webpack_require__(90);

var _ui3 = _interopRequireDefault(_ui2);

var _emailSignIn2 = __webpack_require__(91);

var _emailSignIn3 = _interopRequireDefault(_emailSignIn2);

var _emailSignUp2 = __webpack_require__(92);

var _emailSignUp3 = _interopRequireDefault(_emailSignUp2);

var _oauthSignIn2 = __webpack_require__(93);

var _oauthSignIn3 = _interopRequireDefault(_oauthSignIn2);

var _requestPasswordReset2 = __webpack_require__(94);

var _requestPasswordReset3 = _interopRequireDefault(_requestPasswordReset2);

var _updateAccount2 = __webpack_require__(95);

var _updateAccount3 = _interopRequireDefault(_updateAccount2);

var _updatePassword2 = __webpack_require__(96);

var _updatePassword3 = _interopRequireDefault(_updatePassword2);

var _updatePasswordModal2 = __webpack_require__(97);

var _updatePasswordModal3 = _interopRequireDefault(_updatePasswordModal2);

var _server = __webpack_require__(98);

var _server2 = _interopRequireDefault(_server);

var _signOut2 = __webpack_require__(99);

var _signOut3 = _interopRequireDefault(_signOut2);

var _destroyAccount2 = __webpack_require__(100);

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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyConfig = applyConfig;

var _constants = __webpack_require__(19);

var C = _interopRequireWildcard(_constants);

var _extend = __webpack_require__(14);

var _extend2 = _interopRequireDefault(_extend);

var _fetch = __webpack_require__(12);

var _fetch2 = _interopRequireDefault(_fetch);

var _parseEndpointConfig2 = __webpack_require__(47);

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
/* 61 */
/***/ (function(module, exports) {

module.exports = require("browser-cookies");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("cookie");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),
/* 66 */
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
/* 67 */
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
  return (0, _axios2.default)(options).then(function (resp) {
    return updateAuthCredentials(resp);
  });
};

var _axios = __webpack_require__(68);

var _axios2 = _interopRequireDefault(_axios);

var _constants = __webpack_require__(19);

var C = _interopRequireWildcard(_constants);

var _extend = __webpack_require__(14);

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

    // set header key + val for each key in `tokenFormat` config
    for (var key in (0, _sessionStorage.getTokenFormat)()) {
      newHeaders[key] = resp.headers[key];

      if (newHeaders[key]) {
        blankHeaders = false;
      }
    }

    // persist headers for next request
    if (!blankHeaders) {
      (0, _sessionStorage.persistData)(C.SAVED_CREDS_KEY, newHeaders);
    }
  }

  return resp;
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(69);

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);
var bind = __webpack_require__(50);
var Axios = __webpack_require__(71);
var defaults = __webpack_require__(39);

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
axios.Cancel = __webpack_require__(54);
axios.CancelToken = __webpack_require__(85);
axios.isCancel = __webpack_require__(53);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(86);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

/***/ }),
/* 70 */
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(39);
var utils = __webpack_require__(13);
var InterceptorManager = __webpack_require__(80);
var dispatchRequest = __webpack_require__(81);
var isAbsoluteURL = __webpack_require__(83);
var combineURLs = __webpack_require__(84);

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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(52);

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
/* 74 */
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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

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
/* 78 */
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);
var transformData = __webpack_require__(82);
var isCancel = __webpack_require__(53);
var defaults = __webpack_require__(39);

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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(13);

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
/* 83 */
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
/* 84 */
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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(54);

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
/* 86 */
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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _authenticate = __webpack_require__(25);

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
/* 88 */
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
/* 89 */
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

var _authenticate = __webpack_require__(25);

var authActions = _interopRequireWildcard(_authenticate);

var _emailSignIn = __webpack_require__(27);

var _emailSignUp = __webpack_require__(29);

var _signOut = __webpack_require__(28);

var _oauthSignIn = __webpack_require__(30);

var _destroyAccount = __webpack_require__(31);

var _server = __webpack_require__(26);

var ssActions = _interopRequireWildcard(_server);

var _configure = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = _immutable2.default.fromJS({
  attributes: null,
  isSignedIn: false,
  firstTimeLogin: false,
  mustResetPassword: false,
  endpointKey: null
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
}), _defineProperty(_createReducer, _emailSignUp.EMAIL_SIGN_UP_COMPLETE, function (state, _ref6) {
  var endpoint = _ref6.endpoint,
      user = _ref6.user;

  // if registration does not require confirmation, user will be signed in at
  // this point.
  return user.uid ? state.merge({
    attributes: user,
    isSignedIn: true,
    endpointKey: endpoint
  }) : state;
}), _defineProperty(_createReducer, _oauthSignIn.OAUTH_SIGN_IN_COMPLETE, function (state, _ref7) {
  var endpoint = _ref7.endpoint,
      user = _ref7.user;
  return state.merge({
    attributes: user,
    isSignedIn: true,
    endpointKey: endpoint
  });
}), _defineProperty(_createReducer, ssActions.SS_AUTH_TOKEN_UPDATE, function (state, _ref8) {
  var user = _ref8.user,
      mustResetPassword = _ref8.mustResetPassword,
      firstTimeLogin = _ref8.firstTimeLogin;

  return state.merge({
    mustResetPassword: mustResetPassword,
    firstTimeLogin: firstTimeLogin,
    isSignedIn: !!user,
    attributes: user
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
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _ui = __webpack_require__(34);

var uiActions = _interopRequireWildcard(_ui);

var _emailSignIn = __webpack_require__(27);

var emailSignInActions = _interopRequireWildcard(_emailSignIn);

var _emailSignUp = __webpack_require__(29);

var emailSignUpActions = _interopRequireWildcard(_emailSignUp);

var _signOut = __webpack_require__(28);

var signOutActions = _interopRequireWildcard(_signOut);

var _requestPasswordReset = __webpack_require__(36);

var requestPasswordResetActions = _interopRequireWildcard(_requestPasswordReset);

var _oauthSignIn = __webpack_require__(30);

var oAuthSignInActions = _interopRequireWildcard(_oauthSignIn);

var _updatePassword = __webpack_require__(37);

var updatePasswordActions = _interopRequireWildcard(_updatePassword);

var _destroyAccount = __webpack_require__(31);

var destroyAccountActions = _interopRequireWildcard(_destroyAccount);

var _updatePasswordModal = __webpack_require__(38);

var updatePasswordModalActions = _interopRequireWildcard(_updatePasswordModal);

var _server = __webpack_require__(26);

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
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _emailSignIn = __webpack_require__(27);

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
}), _defineProperty(_createReducer, A.EMAIL_SIGN_IN_ERROR, function (state, _ref4) {
  var endpoint = _ref4.endpoint,
      errors = _ref4.errors;
  return state.mergeDeep(_defineProperty({}, endpoint, {
    loading: false,
    errors: errors
  }));
}), _defineProperty(_createReducer, A.EMAIL_SIGN_IN_FORM_UPDATE, function (state, _ref5) {
  var endpoint = _ref5.endpoint,
      key = _ref5.key,
      value = _ref5.value;

  return state.mergeDeep(_defineProperty({}, endpoint, {
    form: _defineProperty({}, key, value)
  }));
}), _createReducer));

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _emailSignUp = __webpack_require__(29);

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
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _oauthSignIn = __webpack_require__(30);

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
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _requestPasswordReset = __webpack_require__(36);

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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _updateAccount = __webpack_require__(49);

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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _updatePassword = __webpack_require__(37);

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
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _updatePasswordModal = __webpack_require__(38);

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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _server = __webpack_require__(26);

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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _signOut = __webpack_require__(28);

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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createReducer;

var _immutable = __webpack_require__(4);

var _immutable2 = _interopRequireDefault(_immutable);

var _reduxImmutablejs = __webpack_require__(10);

var _destroyAccount = __webpack_require__(31);

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