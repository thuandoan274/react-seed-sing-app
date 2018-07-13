require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 110);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("reactstrap");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(95);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(96);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = toggleSidebar;
/* harmony export (immutable) */ __webpack_exports__["b"] = openSidebar;
/* harmony export (immutable) */ __webpack_exports__["c"] = closeSidebar;
/* harmony export (immutable) */ __webpack_exports__["a"] = changeActiveSidebarItem;
/* eslint-disable import/prefer-default-export */

const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
/* harmony export (immutable) */ __webpack_exports__["e"] = TOGGLE_SIDEBAR;

const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
/* harmony export (immutable) */ __webpack_exports__["f"] = OPEN_SIDEBAR;

const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
/* harmony export (immutable) */ __webpack_exports__["g"] = CLOSE_SIDEBAR;

const CHANGE_ACTIVE_SIDEBAR_ITEM = 'CHANGE_ACTIVE_SIDEBAR_ITEM';
/* harmony export (immutable) */ __webpack_exports__["h"] = CHANGE_ACTIVE_SIDEBAR_ITEM;


function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR
  };
}

function openSidebar() {
  return {
    type: OPEN_SIDEBAR
  };
}

function closeSidebar() {
  return {
    type: CLOSE_SIDEBAR
  };
}

function changeActiveSidebarItem(activeItem) {
  return {
    type: CHANGE_ACTIVE_SIDEBAR_ITEM,
    activeItem
  };
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = receiveLogin;
/* harmony export (immutable) */ __webpack_exports__["b"] = receiveLogout;
/* harmony export (immutable) */ __webpack_exports__["d"] = logoutUser;
/* harmony export (immutable) */ __webpack_exports__["c"] = loginUser;
const LOGIN_REQUEST = 'LOGIN_REQUEST';
/* harmony export (immutable) */ __webpack_exports__["e"] = LOGIN_REQUEST;

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["f"] = LOGIN_SUCCESS;

const LOGIN_FAILURE = 'LOGIN_FAILURE';
/* harmony export (immutable) */ __webpack_exports__["g"] = LOGIN_FAILURE;

const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
/* unused harmony export LOGOUT_REQUEST */

const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
/* harmony export (immutable) */ __webpack_exports__["h"] = LOGOUT_SUCCESS;

const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
/* unused harmony export LOGOUT_FAILURE */


function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Logs the user out
function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    document.cookie = 'id_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch(receiveLogout());
  };
}

function loginUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include',
    body: `login=${creds.login}&password=${creds.password}`
  };

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch('/login', config).then(response => response.json().then(user => ({ user, response }))).then(({ user, response }) => {
      // eslint-disable-line
      if (!response.ok) {
        // If there was a problem, we want to
        // dispatch the error condition
        dispatch(loginError(user.message));
        return Promise.reject(user);
      }
      // in posts create new action and check http status, if malign logout
      // If login was successful, set the token in local storage
      localStorage.setItem('id_token', user.id_token);
      // Dispatch the success action
      dispatch(receiveLogin(user));
    }).catch(err => console.log('Error: ', err)); // eslint-disable-line
  };
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/images/people/a5.jpg?6b3f0526";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/images/people/a6.jpg?cad6c230";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(62);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../../node_modules/sass-loader/lib/loader.js!./ListGroup.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../../node_modules/sass-loader/lib/loader.js!./ListGroup.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/images/people/a3.jpg?5036442e";

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dismissAlert;
const DISMISS_ALERT = 'DISMISS_ALERT';
/* harmony export (immutable) */ __webpack_exports__["b"] = DISMISS_ALERT;


function dismissAlert(id) {
  return {
    type: DISMISS_ALERT,
    id
  };
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_imports_loader_window_jQuery_jquery_this_window_widgster__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_imports_loader_window_jQuery_jquery_this_window_widgster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_imports_loader_window_jQuery_jquery_this_window_widgster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Widget_scss__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Widget_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Widget_scss__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Widget/Widget.js';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






 // eslint-disable-line
 // eslint-disable-line css-modules/no-unused-class

class Widget extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(prop) {
    super(prop);
    this.state = {
      randomId: Math.floor(Math.random() * 100)
    };
  }

  componentDidMount() {
    const options = this.props.options;
    options.bodySelector = '.widget-body';
    __WEBPACK_IMPORTED_MODULE_3_jquery___default()(this.el).widgster(options);
  }

  render() {
    const _props = this.props,
          {
      title,
      className,
      children,
      close,
      fullscreen,
      collapse,
      refresh,
      settings,
      settingsInverse,
      tooltipPlacement,
      showTooltip,
      bodyClass,
      customControls,
      options } = _props,
          attributes = _objectWithoutProperties(_props, ['title', 'className', 'children', 'close', 'fullscreen', 'collapse', 'refresh', 'settings', 'settingsInverse', 'tooltipPlacement', 'showTooltip', 'bodyClass', 'customControls', 'options']);
    const randomId = this.state.randomId;
    const mainControls = !!(close || fullscreen || collapse || refresh || settings || settingsInverse);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'section',
      _extends({
        className: [__WEBPACK_IMPORTED_MODULE_6__Widget_scss___default.a.widget, 'widget', className].join(' '),
        ref: widget => {
          this.el = widget;
        } }, attributes, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        },
        __self: this
      }),
      title && (typeof title === 'string' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h5',
        { className: __WEBPACK_IMPORTED_MODULE_6__Widget_scss___default.a.title, __source: {
            fileName: _jsxFileName,
            lineNumber: 88
          },
          __self: this
        },
        title
      ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'header',
        { className: __WEBPACK_IMPORTED_MODULE_6__Widget_scss___default.a.title, __source: {
            fileName: _jsxFileName,
            lineNumber: 89
          },
          __self: this
        },
        title
      )),
      !customControls && mainControls && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: `${__WEBPACK_IMPORTED_MODULE_6__Widget_scss___default.a.widgetControls} widget-controls`, __source: {
            fileName: _jsxFileName,
            lineNumber: 94
          },
          __self: this
        },
        settings && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { href: '#', __source: {
              fileName: _jsxFileName,
              lineNumber: 96
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'glyphicon glyphicon-cog', __source: {
              fileName: _jsxFileName,
              lineNumber: 96
            },
            __self: this
          })
        ),
        settingsInverse && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { href: '#', className: `bg-gray-transparent ${__WEBPACK_IMPORTED_MODULE_6__Widget_scss___default.a.inverse}`, __source: {
              fileName: _jsxFileName,
              lineNumber: 99
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
            className: 'glyphicon glyphicon-cog text-white',
            __source: {
              fileName: _jsxFileName,
              lineNumber: 99
            },
            __self: this
          })
        ),
        refresh && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { href: '#', 'data-widgster': 'load', id: `reloadId-${randomId}`, __source: {
              fileName: _jsxFileName,
              lineNumber: 104
            },
            __self: this
          },
          typeof refresh === 'string' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'strong',
            { className: 'text-gray-light', __source: {
                fileName: _jsxFileName,
                lineNumber: 106
              },
              __self: this
            },
            refresh
          ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-refresh', __source: {
              fileName: _jsxFileName,
              lineNumber: 107
            },
            __self: this
          }),
          showTooltip && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["UncontrolledTooltip"],
            {
              placement: tooltipPlacement,
              target: `reloadId-${randomId}`,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 109
              },
              __self: this
            },
            'Reload'
          )
        ),
        fullscreen && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { href: '#', 'data-widgster': 'fullscreen', id: `fullscreenId-${randomId}`, __source: {
              fileName: _jsxFileName,
              lineNumber: 117
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'glyphicon glyphicon-resize-full', __source: {
              fileName: _jsxFileName,
              lineNumber: 118
            },
            __self: this
          }),
          showTooltip && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["UncontrolledTooltip"],
            {
              placement: tooltipPlacement,
              target: `fullscreenId-${randomId}`,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 120
              },
              __self: this
            },
            'Fullscreen'
          )
        ),
        fullscreen && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { href: '#', 'data-widgster': 'restore', id: `restoreId-${randomId}`, __source: {
              fileName: _jsxFileName,
              lineNumber: 128
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'glyphicon glyphicon-resize-small', __source: {
              fileName: _jsxFileName,
              lineNumber: 129
            },
            __self: this
          }),
          showTooltip && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["UncontrolledTooltip"],
            {
              placement: tooltipPlacement,
              target: `restoreId-${randomId}`,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 131
              },
              __self: this
            },
            'Restore'
          )
        ),
        collapse && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 139
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', 'data-widgster': 'collapse', id: `collapseId-${randomId}`, __source: {
                fileName: _jsxFileName,
                lineNumber: 140
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'glyphicon glyphicon-chevron-down', __source: {
                fileName: _jsxFileName,
                lineNumber: 141
              },
              __self: this
            }),
            showTooltip && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4_reactstrap__["UncontrolledTooltip"],
              {
                placement: tooltipPlacement,
                target: `collapseId-${randomId}`,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 143
                },
                __self: this
              },
              'Collapse'
            )
          )
        ),
        collapse && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 152
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', 'data-widgster': 'expand', id: `expandId-${randomId}`, __source: {
                fileName: _jsxFileName,
                lineNumber: 153
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'glyphicon glyphicon-chevron-up', __source: {
                fileName: _jsxFileName,
                lineNumber: 154
              },
              __self: this
            }),
            showTooltip && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4_reactstrap__["UncontrolledTooltip"],
              {
                placement: tooltipPlacement,
                target: `expandId-${randomId}`,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 156
                },
                __self: this
              },
              'Expand'
            )
          )
        ),
        close && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { href: '#', 'data-widgster': 'close', id: `closeId-${randomId}`, __source: {
              fileName: _jsxFileName,
              lineNumber: 166
            },
            __self: this
          },
          typeof close === 'string' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'strong',
            { className: 'text-gray-light', __source: {
                fileName: _jsxFileName,
                lineNumber: 168
              },
              __self: this
            },
            close
          ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'glyphicon glyphicon-remove', __source: {
              fileName: _jsxFileName,
              lineNumber: 169
            },
            __self: this
          }),
          showTooltip && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["UncontrolledTooltip"],
            {
              placement: tooltipPlacement,
              target: `closeId-${randomId}`,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 171
              },
              __self: this
            },
            'Close'
          )
        )
      ),
      customControls && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: `${__WEBPACK_IMPORTED_MODULE_6__Widget_scss___default.a.widgetControls} widget-controls`, __source: {
            fileName: _jsxFileName,
            lineNumber: 182
          },
          __self: this
        },
        customControls
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: `${__WEBPACK_IMPORTED_MODULE_6__Widget_scss___default.a.widgetBody} widget-body ${bodyClass}`, __source: {
            fileName: _jsxFileName,
            lineNumber: 187
          },
          __self: this
        },
        children
      )
    );
  }
}

Widget.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node), __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node]),
  close: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]),
  fullscreen: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  collapse: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  refresh: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]),
  settings: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  settingsInverse: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  tooltipPlacement: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  showTooltip: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  bodyClass: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  customControls: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  options: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object //eslint-disable-line
};
Widget.defaultProps = {
  title: null,
  className: '',
  children: [],
  close: false,
  fullscreen: false,
  collapse: false,
  refresh: false,
  settings: false,
  settingsInverse: false,
  tooltipPlacement: 'bottom',
  showTooltip: false,
  bodyClass: '',
  customControls: null,
  options: {}
};
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_6__Widget_scss___default.a)(Widget));

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/* eslint-disable max-len */

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X
  },

  defaultMeta: {
    title: 'React Dashboard',
    description: 'React Dashboard Starter project based on react-router 4, redux, graphql, bootstrap'
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Dashboard' },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },

    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  }
};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/core/Bundle.js',
    _this = this;




class Bundle extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null
    }, _temp;
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null
    });
    props.load(mod => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    return this.props.children(this.state.mod);
  }
}

Bundle.propTypes = {
  load: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

Bundle.generateBundle = loadModule => () =>
/* eslint-disable */
__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
  Bundle,
  { load: loadModule, __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: _this
  },
  Mod => Mod ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Mod, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: _this
  }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { style: { textAlign: 'center', paddingTop: '35vh' }, __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      },
      __self: _this
    },
    'Loading'
  )
)
/* eslint-enable */
;

/* harmony default export */ __webpack_exports__["a"] = (Bundle);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/glyphicons/glyphicons-halflings-regular.eot?f4769f9b";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/images/avatar.png?a8090d89";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/images/people/a1.jpg?976aaa67";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/images/people/a2.jpg?db5de50f";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/images/people/a4.jpg?7a65b2fd";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(67);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./ErrorPage.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./ErrorPage.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express_jwt__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_express_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_express_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jsonwebtoken__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_router__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_dom_server__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pretty_error__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_pretty_error___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_pretty_error__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_App__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_Html__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_error_ErrorPage__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__createFetch__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__store_configureStore__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__actions_user__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__actions_navigation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__assets_json__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__assets_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__assets_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__styles_theme_scss__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__styles_theme_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__styles_theme_scss__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/server.js',
    _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




















 // eslint-disable-line import/no-unresolved


const app = __WEBPACK_IMPORTED_MODULE_1_express___default()();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static(__WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, 'public')));
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static(__WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, 'assets')));
app.use(__WEBPACK_IMPORTED_MODULE_2_cookie_parser___default()());
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(__WEBPACK_IMPORTED_MODULE_4_express_jwt___default()({
  secret: __WEBPACK_IMPORTED_MODULE_18__config___default.a.auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token
}));
// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof __WEBPACK_IMPORTED_MODULE_4_express_jwt__["UnauthorizedError"]) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  } else {
    next(err);
  }
});

if (true) {
  app.enable('trust proxy');
}
app.post('/login', (req, res) => {
  // replace with real database check in production
  // const user = graphql.find(req.login, req.password);
  let user = false;
  const login = req.body.login;
  const password = req.body.password;
  if (login && password) {
    user = { user, login };
  }

  if (user) {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = __WEBPACK_IMPORTED_MODULE_5_jsonwebtoken___default.a.sign(user, __WEBPACK_IMPORTED_MODULE_18__config___default.a.auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: false });
    res.json({ id_token: token });
  } else {
    res.status(401).json({ message: 'To login use any user/password combination' });
  }
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      const css = new Set();

      const fetch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__createFetch__["a" /* default */])({
        baseUrl: __WEBPACK_IMPORTED_MODULE_18__config___default.a.api.serverUrl,
        cookie: req.headers.cookie
      });

      const initialState = {
        user: req.user || null
      };

      const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__store_configureStore__["a" /* default */])(initialState, {
        fetch
        // I should not use `history` on server.. but how I do redirection? follow universal-router
      });

      if (req.user && req.user.login) {
        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__actions_user__["a" /* receiveLogin */])({
          id_token: req.cookies.id_token
        }));
      } else {
        store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__actions_user__["b" /* receiveLogout */])());
      }

      const paths = req.url.split('/');
      paths.pop();

      store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_17__actions_navigation__["a" /* changeActiveSidebarItem */])(paths.join('/')));
      store.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_17__actions_navigation__["b" /* openSidebar */])());

      // Global (context) variables that can be easily accessed from any React component
      // https://facebook.github.io/react/docs/context.html
      const context = {
        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
        insertCss: function (...styles) {
          // eslint-disable-next-line no-underscore-dangle
          styles.forEach(function (style) {
            return css.add(style._getCss());
          });
        },
        fetch,
        // You can access redux through react-redux connect
        store,
        storeSubscription: null
      };

      // eslint-disable-next-line no-underscore-dangle
      css.add(__WEBPACK_IMPORTED_MODULE_20__styles_theme_scss___default.a._getCss());

      const data = {
        title: 'Sing App 4.1.0 - Isomorphic React Dashboard',
        description: 'Sing App 4.1.0 - Isomorphic React Dashboard based on react-router 4, redux, graphql, bootstrap'
      };
      data.styles = [{ id: 'css', cssText: [...css].join('') }];
      data.scripts = [__WEBPACK_IMPORTED_MODULE_19__assets_json___default.a.vendor.js, __WEBPACK_IMPORTED_MODULE_19__assets_json___default.a.client.js];
      data.app = {
        apiUrl: __WEBPACK_IMPORTED_MODULE_18__config___default.a.api.clientUrl,
        state: context.store.getState()
      };

      const html = __WEBPACK_IMPORTED_MODULE_9_react_dom_server___default.a.renderToString(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_8_react_router__["StaticRouter"],
        {
          location: req.url,
          context: context,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 154
          },
          __self: _this
        },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7_react_redux__["Provider"],
          { store: store, __source: {
              fileName: _jsxFileName,
              lineNumber: 158
            },
            __self: _this
          },
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__components_App__["a" /* default */], { store: store, __source: {
              fileName: _jsxFileName,
              lineNumber: 159
            },
            __self: _this
          })
        )
      ));

      data.styles = [{ id: 'css', cssText: [...css].join('') }];

      data.children = html;

      const markup = __WEBPACK_IMPORTED_MODULE_9_react_dom_server___default.a.renderToString(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__components_Html__["a" /* default */], _extends({}, data, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 171
        },
        __self: _this
      })));

      res.status(200);
      res.send(`<!doctype html>${markup}`);
    } catch (err) {
      next(err);
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new __WEBPACK_IMPORTED_MODULE_10_pretty_error___default.a();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  console.error(pe.render(err));
  const html = __WEBPACK_IMPORTED_MODULE_9_react_dom_server___default.a.renderToStaticMarkup(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_12__components_Html__["a" /* default */],
    {
      title: 'Internal Server Error',
      description: err.message,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 191
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_9_react_dom_server___default.a.renderToString(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__pages_error_ErrorPage__["ErrorPageWithoutStyle"], { error: err, __source: {
        fileName: _jsxFileName,
        lineNumber: 195
      },
      __self: _this
    }))
  ));
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------

app.listen(__WEBPACK_IMPORTED_MODULE_18__config___default.a.port, () => {
  console.info(`The server is running at http://localhost:${__WEBPACK_IMPORTED_MODULE_18__config___default.a.port}/`);
});

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_Bundle__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bundle_loader_lazy_pages_error__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bundle_loader_lazy_pages_error___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_bundle_loader_lazy_pages_error__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Layout__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login__ = __webpack_require__(46);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/App.js',
    _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








/* eslint-disable */

/* eslint-enable */




const ErrorPageBundle = __WEBPACK_IMPORTED_MODULE_4__core_Bundle__["a" /* default */].generateBundle(__WEBPACK_IMPORTED_MODULE_5_bundle_loader_lazy_pages_error___default.a);

const ContextType = _extends({
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  // Universal HTTP client
  fetch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
}, __WEBPACK_IMPORTED_MODULE_3_react_redux__["Provider"].childContextTypes);

// let isAuthenticated = function() {
//   let t = jwt.verify(cookie.load('id_token'), auth.jwt.secret);
//
//   console.log(t);
//
//   return true;
// };


const PrivateRoute = (_ref) => {
  let { component, isAuthenticated } = _ref,
      rest = _objectWithoutProperties(_ref, ['component', 'isAuthenticated']);

  return (// eslint-disable-line
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Route"], _extends({}, rest, { render: props => isAuthenticated ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(component, props) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Redirect"], {
        to: {
          pathname: '/login',
          state: { from: props.location } // eslint-disable-line
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: _this
      }),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: _this
    }))
  );
};

class App extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.PureComponent {

  getChildContext() {
    // fixme. find better solution?
    return this.props.context || this.context.router.staticContext;
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_router__["Switch"],
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Route"], { path: '/', exact: true, render: () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Redirect"], { to: '/app', __source: {
            fileName: _jsxFileName,
            lineNumber: 84
          },
          __self: this
        }), __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(PrivateRoute, { isAuthenticated: this.props.isAuthenticated, path: '/app', component: __WEBPACK_IMPORTED_MODULE_6__components_Layout__["a" /* default */], __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Route"], { path: '/login', exact: true, component: __WEBPACK_IMPORTED_MODULE_7__pages_login__["a" /* default */], __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Route"], { component: ErrorPageBundle, __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        },
        __self: this
      })
    );
  }
}

App.propTypes = {
  context: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape(ContextType),
  store: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any, // eslint-disable-line
  isAuthenticated: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired
};
App.defaultProps = {
  context: null
};
App.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
  store: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
};
App.childContextTypes = ContextType;
function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_router__["withRouter"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react_redux__["connect"])(mapStateToProps)(App)));

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__images_people_a1_jpg__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__images_people_a1_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__images_people_a1_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__images_people_a2_jpg__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__images_people_a2_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__images_people_a2_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__images_people_a3_jpg__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__images_people_a3_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__images_people_a3_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__images_people_a4_jpg__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__images_people_a4_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__images_people_a4_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__images_people_a5_jpg__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__images_people_a5_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__images_people_a5_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__images_people_a6_jpg__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__images_people_a6_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__images_people_a6_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__images_avatar_png__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__images_avatar_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__images_avatar_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Chat_scss__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__Chat_scss__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Chat/Chat.js';

















class Chat extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);

    this.handleChangeContacts = this.handleChangeContacts.bind(this);
    this.openMessages = this.openMessages.bind(this);
    this.filterConversations = this.filterConversations.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
    this.addMessage = this.addMessage.bind(this);

    this.state = {
      todayConversations: [{
        name: 'Chris Gray',
        status: 'success',
        lastMessage: 'Hey! What\'s up? So many times since we',
        image: __WEBPACK_IMPORTED_MODULE_7__images_people_a2_jpg__,
        messages: [{
          text: 'Hey! What\'s up?'
        }, {
          text: 'Are you there?'
        }, {
          text: 'Let me know when you come back.'
        }, {
          text: 'I am here!',
          fromMe: true
        }]
      }, {
        name: 'Jamey Brownlow',
        status: 'gray-light',
        lastMessage: 'Good news coming tonight. Seems they agreed to proceed',
        image: __WEBPACK_IMPORTED_MODULE_12__images_avatar_png__
      }, {
        name: 'Livia Walsh',
        status: 'danger',
        lastMessage: 'Check out my latest email plz!',
        image: __WEBPACK_IMPORTED_MODULE_6__images_people_a1_jpg__
      }, {
        name: 'Jaron Fitzroy',
        status: 'gray-light',
        lastMessage: 'What about summer break?',
        image: __WEBPACK_IMPORTED_MODULE_12__images_avatar_png__
      }, {
        name: 'Mike Lewis',
        status: 'success',
        lastMessage: 'Just ain\'t sure about the weekend now. 90% I\'ll make it.',
        image: __WEBPACK_IMPORTED_MODULE_9__images_people_a4_jpg__
      }],
      lastWeekConversations: [{
        name: 'Freda Edison',
        status: 'gray-light',
        lastMessage: 'Hey what\'s up? Me and Monica going for a lunch somewhere. Wanna join?',
        image: __WEBPACK_IMPORTED_MODULE_11__images_people_a6_jpg__
      }, {
        name: 'Livia Walsh',
        status: 'success',
        lastMessage: 'Check out my latest email plz!',
        image: __WEBPACK_IMPORTED_MODULE_10__images_people_a5_jpg__
      }, {
        name: 'Jaron Fitzroy',
        status: 'warning',
        lastMessage: 'What about summer break?',
        image: __WEBPACK_IMPORTED_MODULE_8__images_people_a3_jpg__
      }, {
        name: 'Mike Lewis',
        status: 'gray-light',
        lastMessage: 'Just ain\'t sure about the weekend now. 90% I\'ll make it.',
        image: __WEBPACK_IMPORTED_MODULE_12__images_avatar_png__
      }],
      chatMessageOpened: true,
      conversation: Object,
      searchValue: ''
    };
  }

  openMessages(conversation, e) {
    this.setState({
      conversation,
      chatMessageOpened: false
    });
    __WEBPACK_IMPORTED_MODULE_5_jquery___default()(e.currentTarget).removeClass('active').find('.badge').remove();
  }

  addMessage(e) {
    if (e.key === 'Enter') {
      const value = {
        text: e.target.value,
        fromMe: true
      };

      this.setState({
        conversation: Object.assign({}, this.state.conversation, {
          messages: [...(this.state.conversation.messages || []), value]
        })
      });

      e.target.value = ''; // eslint-disable-line
    }
  }

  handleChangeContacts(event) {
    this.setState({ searchValue: event.target.value });
  }

  filterConversations(item) {
    const isFindName = item.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
    const isFindMessage = item.lastMessage.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
    return isFindName || isFindMessage;
  }

  filterMessages(item) {
    return item.text.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1;
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'aside',
      { className: [__WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.root, this.props.chatOpen ? __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatOpen : ''].join(' '), __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'header',
        { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatHeader, __source: {
            fileName: _jsxFileName,
            lineNumber: 147
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h4',
          { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatTitle, __source: {
              fileName: _jsxFileName,
              lineNumber: 148
            },
            __self: this
          },
          'Contacts'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'input-group input-group-dark', __source: {
              fileName: _jsxFileName,
              lineNumber: 149
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: 'form-control fs-mini', type: 'text', placeholder: 'Search...', value: this.state.searchValue, onChange: this.handleChangeContacts, __source: {
              fileName: _jsxFileName,
              lineNumber: 150
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'input-group-addon', __source: {
                fileName: _jsxFileName,
                lineNumber: 151
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-search', __source: {
                fileName: _jsxFileName,
                lineNumber: 152
              },
              __self: this
            })
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: [__WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatPanel, __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatContacts, this.state.chatMessageOpened ? __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatMessageOpen : ''].join(' '), __source: {
            fileName: _jsxFileName,
            lineNumber: 156
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h5',
          { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.navTitle, __source: {
              fileName: _jsxFileName,
              lineNumber: 157
            },
            __self: this
          },
          'TODAY'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_reactstrap__["ListGroup"],
          { id: 'chat-sidebar-user-group', className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatSidebarUserGroup, __source: {
              fileName: _jsxFileName,
              lineNumber: 158
            },
            __self: this
          },
          this.state.todayConversations.filter(this.filterConversations).map(item => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["ListGroupItem"],
            {
              key: item.name,
              onClick: e => this.openMessages(item, e),
              __source: {
                fileName: _jsxFileName,
                lineNumber: 162
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: ['fa fa-circle float-right', `text-${item.status}`].join(' '), __source: {
                fileName: _jsxFileName,
                lineNumber: 166
              },
              __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'thumb-sm float-left mr', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 167
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: item.image, alt: '...', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 168
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 170
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h6',
                { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.messageSender, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 171
                  },
                  __self: this
                },
                item.name
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.messagePreview, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 172
                  },
                  __self: this
                },
                item.lastMessage
              )
            )
          ))
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h5',
          { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.navTitle, __source: {
              fileName: _jsxFileName,
              lineNumber: 178
            },
            __self: this
          },
          'LAST WEEK'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_reactstrap__["ListGroup"],
          { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatSidebarUserGroup, __source: {
              fileName: _jsxFileName,
              lineNumber: 179
            },
            __self: this
          },
          this.state.lastWeekConversations.filter(this.filterConversations).map(item => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["ListGroupItem"],
            {
              key: item.name,
              onClick: () => this.openMessages(item),
              __source: {
                fileName: _jsxFileName,
                lineNumber: 183
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: ['fa fa-circle float-right', `text-${item.status}`].join(' '), __source: {
                fileName: _jsxFileName,
                lineNumber: 187
              },
              __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'thumb-sm pull-left mr', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 188
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: item.image, alt: '...', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 189
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 191
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h6',
                { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.messageSender, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 192
                  },
                  __self: this
                },
                item.name
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.messagePreview, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 193
                  },
                  __self: this
                },
                item.lastMessage
              )
            )
          ))
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: [__WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatPanel, __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatMessages, this.state.chatMessageOpened ? '' : __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatMessageOpen].join(' '), __source: {
            fileName: _jsxFileName,
            lineNumber: 199
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.messagesTitle, __source: {
              fileName: _jsxFileName,
              lineNumber: 200
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { onClick: () => this.setState({ chatMessageOpened: true }), __source: {
                fileName: _jsxFileName,
                lineNumber: 202
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-angle-left mr-xs', __source: {
                fileName: _jsxFileName,
                lineNumber: 203
              },
              __self: this
            }),
            this.state.conversation.name
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_reactstrap__["ListGroup"],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 208
            },
            __self: this
          },
          this.state.conversation.messages && this.state.conversation.messages.filter(this.filterMessages).map(item => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["ListGroupItem"],
            { key: item.id, className: [item.fromMe ? __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.fromMe : '', __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.messageItem], __source: {
                fileName: _jsxFileName,
                lineNumber: 212
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'thumb-sm', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 213
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle',
                src: item.fromMe ? __WEBPACK_IMPORTED_MODULE_12__images_avatar_png__ : this.state.conversation.image, alt: '...', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 214
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.messageBody, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 217
                },
                __self: this
              },
              item.text
            )
          ))
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'footer',
          { className: [__WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a.chatFooter, 'form-group'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 222
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: 'form-control input-dark fs-mini', onKeyPress: this.addMessage, type: 'text',
            placeholder: 'Type your message', __source: {
              fileName: _jsxFileName,
              lineNumber: 223
            },
            __self: this
          })
        )
      )
    );
  }
}

Chat.propTypes = {
  chatOpen: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
};
Chat.defaultProps = {
  chatOpen: false
};
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["withRouter"])(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_13__Chat_scss___default.a)(Chat)));

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Notifications__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_user__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions_navigation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__images_people_a5_jpg__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__images_people_a5_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__images_people_a5_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__images_people_a6_jpg__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__images_people_a6_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__images_people_a6_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Header_scss__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Header_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__Header_scss__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Header/Header.js';















 // eslint-disable-line css-modules/no-unused-class

class Header extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogout = this.doLogout.bind(this);

    this.state = {
      menuOpen: false,
      notificationsOpen: false,
      notificationsTabSelected: 1
    };
  }
  componentDidMount() {
    if (window.innerWidth > 576) {
      setTimeout(() => {
        const $chatNotification = __WEBPACK_IMPORTED_MODULE_6_jquery___default()('#chat-notification');
        $chatNotification.removeClass('hide').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $chatNotification.removeClass('animated fadeIn');
          setTimeout(() => {
            $chatNotification.addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd' + ' oanimationend animationend', () => {
              $chatNotification.addClass('hide');
            });
          }, 6000);
        });
        $chatNotification.siblings('#toggle-chat').append('<i class="chat-notification-sing animated bounceIn"></i>');
      }, 4000);
    }

    __WEBPACK_IMPORTED_MODULE_6_jquery___default()('#search-input').on('blur focus', e => {
      __WEBPACK_IMPORTED_MODULE_6_jquery___default()('#search-input').parents('.input-group')[e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }

  toggleNotifications() {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen
    });
  }

  doLogout() {
    this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__actions_user__["d" /* logoutUser */])());
  }

  // collapse/uncolappse
  switchSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["c" /* closeSidebar */])());
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["a" /* changeActiveSidebarItem */])(null));
    } else {
      const paths = this.props.location.pathname.split('/');
      paths.pop();
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["b" /* openSidebar */])());
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["a" /* changeActiveSidebarItem */])(paths.join('/')));
    }
  }

  // static/non-static
  toggleSidebar() {
    this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["d" /* toggleSidebar */])());
    if (this.props.sidebarStatic) {
      localStorage.setItem('staticSidebar', 'false');
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["a" /* changeActiveSidebarItem */])(null));
    } else {
      localStorage.setItem('staticSidebar', 'true');
      const paths = this.props.location.pathname.split('/');
      paths.pop();
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["a" /* changeActiveSidebarItem */])(paths.join('/')));
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_5_reactstrap__["Navbar"],
      { color: 'white', className: `${__WEBPACK_IMPORTED_MODULE_12__Header_scss___default.a.root} d-print-none`, __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5_reactstrap__["Nav"],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 130
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavItem"],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 131
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavLink"],
            { className: 'd-md-down-none ml-3', href: '#', id: 'toggleSidebar', onClick: this.toggleSidebar, __source: {
                fileName: _jsxFileName,
                lineNumber: 132
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-bars fa-lg', __source: {
                fileName: _jsxFileName,
                lineNumber: 133
              },
              __self: this
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["UncontrolledTooltip"],
            { placement: 'bottom', target: 'toggleSidebar', __source: {
                fileName: _jsxFileName,
                lineNumber: 135
              },
              __self: this
            },
            'Turn on/off',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 136
              },
              __self: this
            }),
            'sidebar',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 136
              },
              __self: this
            }),
            'collapsing'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavLink"],
            { className: 'fs-lg d-lg-none', href: '#', onClick: this.switchSidebar, __source: {
                fileName: _jsxFileName,
                lineNumber: 138
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'rounded rounded-lg bg-gray text-white d-md-none', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 139
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-bars fa-lg', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 139
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-bars fa-lg d-sm-down-none', __source: {
                fileName: _jsxFileName,
                lineNumber: 140
              },
              __self: this
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavItem"],
          { className: 'd-md-down-none ml-3', __source: {
              fileName: _jsxFileName,
              lineNumber: 143
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavLink"],
            { href: '#', className: 'px-2', __source: {
                fileName: _jsxFileName,
                lineNumber: 144
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-refresh fa-lg', __source: {
                fileName: _jsxFileName,
                lineNumber: 145
              },
              __self: this
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavItem"],
          { className: 'd-md-down-none', __source: {
              fileName: _jsxFileName,
              lineNumber: 148
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavLink"],
            { href: '#', className: 'px-2', __source: {
                fileName: _jsxFileName,
                lineNumber: 149
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-times fa-lg', __source: {
                fileName: _jsxFileName,
                lineNumber: 150
              },
              __self: this
            })
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5_reactstrap__["Form"],
        { className: 'd-sm-down-none ml-5', inline: true, __source: {
            fileName: _jsxFileName,
            lineNumber: 156
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5_reactstrap__["FormGroup"],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 157
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["InputGroup"],
            { className: 'input-group-no-border', __source: {
                fileName: _jsxFileName,
                lineNumber: 158
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_reactstrap__["InputGroupAddon"],
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 159
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', {
                className: 'fa fa-search',
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 159
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_reactstrap__["Input"], { id: 'search-input', placeholder: 'Search Dashboard', __source: {
                fileName: _jsxFileName,
                lineNumber: 162
              },
              __self: this
            })
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavLink"],
        { className: `${__WEBPACK_IMPORTED_MODULE_12__Header_scss___default.a.navbarBrand} d-md-none`, __source: {
            fileName: _jsxFileName,
            lineNumber: 167
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle text-gray mr-n-sm', __source: {
            fileName: _jsxFileName,
            lineNumber: 168
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle text-warning', __source: {
            fileName: _jsxFileName,
            lineNumber: 169
          },
          __self: this
        }),
        '\xA0 sing \xA0',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle text-warning mr-n-sm', __source: {
            fileName: _jsxFileName,
            lineNumber: 173
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle text-gray', __source: {
            fileName: _jsxFileName,
            lineNumber: 174
          },
          __self: this
        })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5_reactstrap__["Nav"],
        { className: 'ml-auto', __source: {
            fileName: _jsxFileName,
            lineNumber: 177
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavDropdown"],
          { isOpen: this.state.notificationsOpen, toggle: this.toggleNotifications, id: 'basic-nav-dropdown', className: `${__WEBPACK_IMPORTED_MODULE_12__Header_scss___default.a.notificationsMenu} d-sm-down-none`, __source: {
              fileName: _jsxFileName,
              lineNumber: 178
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["DropdownToggle"],
            { nav: true, caret: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 179
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: `${__WEBPACK_IMPORTED_MODULE_12__Header_scss___default.a.avatar} thumb-sm float-left mr-2`, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 180
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_10__images_people_a5_jpg___default.a, alt: '...', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 181
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'small', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 183
                },
                __self: this
              },
              'Philip ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { className: 'fw-semi-bold', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 183
                  },
                  __self: this
                },
                'Smith'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'ml-1 circle bg-warning fw-bold', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 184
                },
                __self: this
              },
              '13'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["DropdownMenu"],
            { right: true, className: `${__WEBPACK_IMPORTED_MODULE_12__Header_scss___default.a.notificationsWrapper} pb-0 animated animated-fast fadeInUp`, __source: {
                fileName: _jsxFileName,
                lineNumber: 186
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Notifications__["a" /* default */], {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 187
              },
              __self: this
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavDropdown"],
          { isOpen: this.state.menuOpen, toggle: this.toggleMenu, className: 'd-sm-down-none', __source: {
              fileName: _jsxFileName,
              lineNumber: 190
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["DropdownToggle"],
            { nav: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 191
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-lg', __source: {
                fileName: _jsxFileName,
                lineNumber: 192
              },
              __self: this
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["DropdownMenu"],
            { right: true, className: 'super-colors', __source: {
                fileName: _jsxFileName,
                lineNumber: 194
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_reactstrap__["DropdownItem"],
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 195
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'glyphicon glyphicon-user', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 195
                },
                __self: this
              }),
              ' My Account'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_reactstrap__["DropdownItem"], { divider: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 196
              },
              __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_reactstrap__["DropdownItem"],
              { href: '/calendar', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 197
                },
                __self: this
              },
              'Calendar'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_reactstrap__["DropdownItem"],
              { href: '/inbox', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 198
                },
                __self: this
              },
              'Inbox \xA0\xA0',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_5_reactstrap__["Badge"],
                { color: 'danger', pill: true, className: 'animated bounceIn', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 198
                  },
                  __self: this
                },
                '9'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_reactstrap__["DropdownItem"], { divider: true, __source: {
                fileName: _jsxFileName,
                lineNumber: 199
              },
              __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_reactstrap__["DropdownItem"],
              { onClick: this.doLogout, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 200
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-sign-out', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 200
                },
                __self: this
              }),
              ' Log Out'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavItem"],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 203
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavLink"],
            { className: 'd-sm-down-none mr-3', id: 'toggle-chat', href: '#', onClick: this.props.chatToggle, __source: {
                fileName: _jsxFileName,
                lineNumber: 204
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-globe fa-lg', __source: {
                fileName: _jsxFileName,
                lineNumber: 205
              },
              __self: this
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { id: 'chat-notification', className: `${__WEBPACK_IMPORTED_MODULE_12__Header_scss___default.a.chatNotification} hide `, __source: {
                fileName: _jsxFileName,
                lineNumber: 207
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: __WEBPACK_IMPORTED_MODULE_12__Header_scss___default.a.chatNotificationInner, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 208
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h6',
                { className: `${__WEBPACK_IMPORTED_MODULE_12__Header_scss___default.a.title} d-flex`, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 209
                  },
                  __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'thumb-xs', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 210
                    },
                    __self: this
                  },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: __WEBPACK_IMPORTED_MODULE_11__images_people_a6_jpg___default.a, alt: '', className: 'rounded-circle mr-xs float-left', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 211
                    },
                    __self: this
                  })
                ),
                'Jess Smith'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                { className: __WEBPACK_IMPORTED_MODULE_12__Header_scss___default.a.text, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 215
                  },
                  __self: this
                },
                'Hi there! ',
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 215
                  },
                  __self: this
                }),
                ' This is a completely new version of Sing App ',
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 215
                  },
                  __self: this
                }),
                ' built with ',
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'strong',
                  { className: 'text-primary', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 215
                    },
                    __self: this
                  },
                  'React JS'
                ),
                ' '
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavItem"],
          { className: 'fs-lg d-md-none', __source: {
              fileName: _jsxFileName,
              lineNumber: 219
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_reactstrap__["NavLink"],
            { href: '#', onClick: this.props.chatToggle, __source: {
                fileName: _jsxFileName,
                lineNumber: 220
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'rounded rounded-lg bg-gray text-white', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 221
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-globe fa-lg', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 221
                },
                __self: this
              })
            )
          )
        )
      )
    );
  }
}

Header.propTypes = {
  sidebarOpened: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool.isRequired,
  sidebarStatic: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool.isRequired,
  chatToggle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.shape({
    pathname: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string
  }).isRequired
};
function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react_router__["withRouter"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_4_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_12__Header_scss___default.a)(Header))));

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_serialize_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Html.js';





/* eslint-disable react/no-danger */

class Html extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  render() {
    const { title, description, styles, scripts, app, children } = this.props;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'html',
      { className: 'no-js', lang: 'en', __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'head',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { charSet: 'utf-8', __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { httpEquiv: 'x-ua-compatible', content: 'ie=edge', __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'title',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 33
            },
            __self: this
          },
          title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { name: 'description', content: description, __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
            fileName: _jsxFileName,
            lineNumber: 35
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png', __source: {
            fileName: _jsxFileName,
            lineNumber: 36
          },
          __self: this
        }),
        styles.map(style => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style', {
          key: style.id,
          id: style.id,
          dangerouslySetInnerHTML: { __html: style.cssText },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: this
        }))
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'body',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 45
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: children }, __source: {
            fileName: _jsxFileName,
            lineNumber: 46
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { dangerouslySetInnerHTML: { __html: `window.App=${__WEBPACK_IMPORTED_MODULE_2_serialize_javascript___default()(app)}` }, __source: {
            fileName: _jsxFileName,
            lineNumber: 47
          },
          __self: this
        }),
        scripts.map(script => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { key: script, src: script, __source: {
            fileName: _jsxFileName,
            lineNumber: 48
          },
          __self: this
        })),
        __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', {
          dangerouslySetInnerHTML: { __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + `ga('create','${__WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId}','auto');ga('send','pageview')` },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 50
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_3__config___default.a.analytics.googleTrackingId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('script', { src: 'https://www.google-analytics.com/analytics.js', async: true, defer: true, __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          },
          __self: this
        })
      )
    );
  }
}

Html.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  description: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  styles: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    cssText: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
  }).isRequired),
  scripts: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired),
  app: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object, // eslint-disable-line
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
};
Html.defaultProps = {
  styles: [],
  scripts: []
};
/* harmony default export */ __webpack_exports__["a"] = (Html);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rc_hammerjs__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rc_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rc_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bundle_loader_lazy_pages_profile__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_bundle_loader_lazy_pages_profile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_bundle_loader_lazy_pages_profile__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Layout_scss__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Layout_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__Layout_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Header__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core_Bundle__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Sidebar__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Chat__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__actions_navigation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_dashboard__ = __webpack_require__(44);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Layout/Layout.js';









// an example of react-router code-splitting
/* eslint-disable */

/* eslint-enable */








// Dashboard component is loaded directly as an example of server side rendering


const ProfileBundle = __WEBPACK_IMPORTED_MODULE_10__core_Bundle__["a" /* default */].generateBundle(__WEBPACK_IMPORTED_MODULE_7_bundle_loader_lazy_pages_profile___default.a);

class Layout extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(props) {
    super(props);

    this.chatToggle = this.chatToggle.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);

    this.state = {
      chatOpen: false
    };
  }

  componentDidMount() {
    if (this.props.sidebarOpened) {
      setTimeout(() => {
        this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__actions_navigation__["c" /* closeSidebar */])());
        this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__actions_navigation__["a" /* changeActiveSidebarItem */])(null));
      }, 2500);
    }
  }

  chatToggle() {
    this.setState({ chatOpen: !this.state.chatOpen });
    __WEBPACK_IMPORTED_MODULE_5_jquery___default()('.chat-notification-sing').remove();

    setTimeout(() => {
      // demo: add class & badge to indicate incoming messages from contact
      // .js-notification-added ensures notification added only once
      __WEBPACK_IMPORTED_MODULE_5_jquery___default()('#chat-sidebar-user-group').find('.list-group-item:first-child:not(.js-notification-added)').addClass('active js-notification-added').find('.fa-circle').after('<span class="badge badge-danger badge-pill ' + 'float-right animated bounceInDown">3</span>');
    }, 1000);
  }

  handleSwipe(e) {
    if ('ontouchstart' in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__actions_navigation__["b" /* openSidebar */])());
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__actions_navigation__["c" /* closeSidebar */])());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        className: [__WEBPACK_IMPORTED_MODULE_8__Layout_scss___default.a.root, this.props.sidebarStatic ? __WEBPACK_IMPORTED_MODULE_8__Layout_scss___default.a.sidebarStatic : '', this.state.chatOpen ? __WEBPACK_IMPORTED_MODULE_8__Layout_scss___default.a.chatOpen : '', !this.props.sidebarOpened ? __WEBPACK_IMPORTED_MODULE_8__Layout_scss___default.a.sidebarClose : ''].join(' '),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__Sidebar__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_8__Layout_scss___default.a.wrap, __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__Header__["a" /* default */], { chatToggle: this.chatToggle, __source: {
            fileName: _jsxFileName,
            lineNumber: 100
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__Chat__["a" /* default */], { chatOpen: this.state.chatOpen, __source: {
            fileName: _jsxFileName,
            lineNumber: 101
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_6_rc_hammerjs___default.a,
          { onSwipe: this.handleSwipe, __source: {
              fileName: _jsxFileName,
              lineNumber: 102
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'main',
            { className: __WEBPACK_IMPORTED_MODULE_8__Layout_scss___default.a.content, __source: {
                fileName: _jsxFileName,
                lineNumber: 103
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4_react_router__["Switch"],
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 104
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_router__["Route"], { path: '/app', exact: true, component: __WEBPACK_IMPORTED_MODULE_14__pages_dashboard__["a" /* default */], __source: {
                  fileName: _jsxFileName,
                  lineNumber: 105
                },
                __self: this
              }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_router__["Route"], { path: '/app/profile', exact: true, component: ProfileBundle, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 106
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'footer',
              { className: __WEBPACK_IMPORTED_MODULE_8__Layout_scss___default.a.contentFooter, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 108
                },
                __self: this
              },
              'Sing React Version - Made by ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'https://flatlogic.com', rel: 'nofollow noopener noreferrer', target: '_blank', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 109
                  },
                  __self: this
                },
                'Flatlogic'
              )
            )
          )
        )
      )
    );
  }
}

Layout.propTypes = {
  sidebarStatic: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  sidebarOpened: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  dispatch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
Layout.defaultProps = {
  sidebarStatic: false,
  sidebarOpened: false
};
function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_router__["withRouter"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_8__Layout_scss___default.a)(Layout))));

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notifications_demo_Notifications__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__notifications_demo_NewNotifications__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__notifications_demo_Messages__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notifications_demo_Progress__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Notifications_scss__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Notifications_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__Notifications_scss__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Notifications/Notifications.js';











class Notifications extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationsTabSelected: 1,
      newNotifications: null,
      isLoad: false
    };
  }

  changeNotificationsTab(tab) {
    this.setState({
      notificationsTabSelected: tab,
      newNotifications: null
    });
  }

  loadNotifications() {
    this.setState({
      isLoad: true
    });

    setTimeout(() => {
      this.setState({
        newNotifications: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__notifications_demo_NewNotifications__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 40
          },
          __self: this
        }),
        isLoad: false
      });
    }, 1500);
  }

  render() {
    let notificationsTab;

    switch (this.state.notificationsTabSelected) {
      case 1:
        notificationsTab = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__notifications_demo_Notifications__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 51
          },
          __self: this
        });
        break;
      case 2:
        notificationsTab = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__notifications_demo_Messages__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          },
          __self: this
        });
        break;
      case 3:
        notificationsTab = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__notifications_demo_Progress__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          },
          __self: this
        });
        break;
      default:
        notificationsTab = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__notifications_demo_Notifications__["a" /* default */], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 60
          },
          __self: this
        });
        break;
    }
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'section',
      { className: `${__WEBPACK_IMPORTED_MODULE_8__Notifications_scss___default.a.notifications} card navbar-notifications`, __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'header',
        { className: [__WEBPACK_IMPORTED_MODULE_8__Notifications_scss___default.a.cardHeader, 'card-header'].join(' '), __source: {
            fileName: _jsxFileName,
            lineNumber: 65
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'text-center mb-sm', __source: {
              fileName: _jsxFileName,
              lineNumber: 66
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'strong',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 67
              },
              __self: this
            },
            'You have 13 notifications'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ButtonGroup"],
          { id: 'notification-buttons', __source: {
              fileName: _jsxFileName,
              lineNumber: 69
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { color: 'secondary', onClick: () => this.changeNotificationsTab(1), active: this.state.notificationsTabSelected === 1, __source: {
                fileName: _jsxFileName,
                lineNumber: 70
              },
              __self: this
            },
            'Notifications'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { color: 'secondary', onClick: () => this.changeNotificationsTab(2), active: this.state.notificationsTabSelected === 2, __source: {
                fileName: _jsxFileName,
                lineNumber: 71
              },
              __self: this
            },
            'Messages'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { color: 'secondary', onClick: () => this.changeNotificationsTab(3), active: this.state.notificationsTabSelected === 3, __source: {
                fileName: _jsxFileName,
                lineNumber: 72
              },
              __self: this
            },
            'Progress'
          )
        )
      ),
      this.state.newNotifications || notificationsTab,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'footer',
        { className: [__WEBPACK_IMPORTED_MODULE_8__Notifications_scss___default.a.cardFooter, 'text-sm', 'card-footer'].join(' '), __source: {
            fileName: _jsxFileName,
            lineNumber: 76
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
          {
            color: 'link',
            className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()({ disabled: this.state.isLoad }, __WEBPACK_IMPORTED_MODULE_8__Notifications_scss___default.a.btnNotificationsReload, 'btn-xs', 'float-right', 'py-0'),
            onClick: () => this.loadNotifications(),
            id: 'load-notifications-btn',
            __source: {
              fileName: _jsxFileName,
              lineNumber: 77
            },
            __self: this
          },
          this.state.isLoad ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 83
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-refresh fa-spin mr-xs', __source: {
                fileName: _jsxFileName,
                lineNumber: 83
              },
              __self: this
            }),
            ' Loading...'
          ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-refresh', __source: {
              fileName: _jsxFileName,
              lineNumber: 83
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'fs-mini', __source: {
              fileName: _jsxFileName,
              lineNumber: 85
            },
            __self: this
          },
          'Synced at: 21 Apr 2014 18:36'
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_8__Notifications_scss___default.a)(Notifications));

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_people_a1_jpg__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_people_a1_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__images_people_a1_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_people_a2_jpg__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_people_a2_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__images_people_a2_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images_people_a4_jpg__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images_people_a4_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__images_people_a4_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__images_people_a6_jpg__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__images_people_a6_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__images_people_a6_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__images_avatar_png__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__images_avatar_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__images_avatar_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ListGroup_scss__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__ListGroup_scss__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Notifications/notifications-demo/Messages.js';










 // eslint-disable-line

class MessagesDemo extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroup"],
      { className: [__WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.listGroup, 'thin-scroll'].join(' '), __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: [__WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.listGroupItem, 'bg-warning-light'].join(' '), __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 21
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_4__images_people_a2_jpg___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 22
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'status status-bottom bg-success', __source: {
              fileName: _jsxFileName,
              lineNumber: 23
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'time',
          { className: 'text-link help float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            },
            __self: this
          },
          '10 sec ago'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 fw-bold mb-1', __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            },
            __self: this
          },
          'Chris Gray'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'deemphasize text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 27
            },
            __self: this
          },
          'Hey! What\'s up? So many times since we'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_7__images_avatar_png___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 31
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'status status-bottom bg-success', __source: {
              fileName: _jsxFileName,
              lineNumber: 32
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'time',
          { className: 'text-link help float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: this
          },
          '2 min ago'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 mb-1', __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            },
            __self: this
          },
          'Jamey Brownlow'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'deemphasize text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 36
            },
            __self: this
          },
          'Good news coming tonight. Seems they agreed to proceed'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 39
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_3__images_people_a1_jpg___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 40
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'status status-bottom bg-warning', __source: {
              fileName: _jsxFileName,
              lineNumber: 41
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'time',
          { className: 'text-link help float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 43
            },
            __self: this
          },
          '9 min ago'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 mb-1', __source: {
              fileName: _jsxFileName,
              lineNumber: 44
            },
            __self: this
          },
          'Livia Walsh'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'deemphasize text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 45
            },
            __self: this
          },
          'Check out my latest email plz!'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 47
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 48
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_7__images_avatar_png___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 49
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'status status-bottom bg-danger', __source: {
              fileName: _jsxFileName,
              lineNumber: 50
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'time',
          { className: 'text-link help float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 52
            },
            __self: this
          },
          '12:56 AM'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 mb-1', __source: {
              fileName: _jsxFileName,
              lineNumber: 53
            },
            __self: this
          },
          'Jaron Fitzroy'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'deemphasize text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 54
            },
            __self: this
          },
          'What about summer break?'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 56
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 57
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_5__images_people_a4_jpg___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 58
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'status status-bottom bg-gray-light', __source: {
              fileName: _jsxFileName,
              lineNumber: 59
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'time',
          { className: 'text-link help float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 61
            },
            __self: this
          },
          'Yesterday'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 mb-1', __source: {
              fileName: _jsxFileName,
              lineNumber: 62
            },
            __self: this
          },
          'Mike Lewis'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'deemphasize text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 63
            },
            __self: this
          },
          'Just ain\'t sure about the weekend now. 90% I\'ll make it.'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 65
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 66
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_6__images_people_a6_jpg___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 67
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'status status-bottom bg-success', __source: {
              fileName: _jsxFileName,
              lineNumber: 68
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'time',
          { className: 'text-link help float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 70
            },
            __self: this
          },
          'Apr 23'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 mb-1', __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            },
            __self: this
          },
          'Freda Edison'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'deemphasize text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 72
            },
            __self: this
          },
          'Hey what\'s up? Me and Monica going for a lunch somewhere. Wanna join?'
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_8__ListGroup_scss___default.a)(MessagesDemo));

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_people_a3_jpg__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_people_a3_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__images_people_a3_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images_people_a5_jpg__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images_people_a5_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__images_people_a5_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__images_people_a6_jpg__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__images_people_a6_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__images_people_a6_jpg__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Notifications/notifications-demo/NewNotifications.js';










class NewNotificationsDemo extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroup"],
      { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroup, 'thin-scroll'].join(' '), __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: `${__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem} bg-attention`, __source: {
            fileName: _jsxFileName,
            lineNumber: 19
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 20
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-check text-success fa-lg', __source: {
              fileName: _jsxFileName,
              lineNumber: 21
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'm-0 overflow-hidden', __source: {
              fileName: _jsxFileName,
              lineNumber: 23
            },
            __self: this
          },
          '2 issues require your approval.',
          '\xA0',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 26
              },
              __self: this
            },
            'The Search Project'
          ),
          ' completed on time!',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 28
              },
              __self: this
            },
            'just now'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: `${__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem} bg-attention`, __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_6__images_people_a6_jpg___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'm-0 overflow-hidden', __source: {
              fileName: _jsxFileName,
              lineNumber: 37
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 38
              },
              __self: this
            },
            'Jeniffer Willington'
          ),
          'has just endorsed you with 50 points!',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 39
              },
              __self: this
            },
            '30 sec ago'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 45
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_4__images_people_a3_jpg___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 46
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'm-0 overflow-hidden', __source: {
              fileName: _jsxFileName,
              lineNumber: 48
            },
            __self: this
          },
          '1 new user just signed up! Check out',
          '\xA0',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 51
              },
              __self: this
            },
            'Monica Smith'
          ),
          '\'s account.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 53
              },
              __self: this
            },
            '2 mins ago'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 58
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 59
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'glyphicon glyphicon-upload fa-lg', __source: {
              fileName: _jsxFileName,
              lineNumber: 60
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 62
            },
            __self: this
          },
          '2.1.0-pre-alpha just released.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 64
              },
              __self: this
            },
            '5h ago'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 69
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 70
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-bolt fa-lg', __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'text-ellipsis m-0 overflow-hidden', __source: {
              fileName: _jsxFileName,
              lineNumber: 73
            },
            __self: this
          },
          'Server load limited.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 75
              },
              __self: this
            },
            '7h ago'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 80
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 81
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_5__images_people_a5_jpg___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 82
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'm-0 overflow-hidden', __source: {
              fileName: _jsxFileName,
              lineNumber: 84
            },
            __self: this
          },
          'User ',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 86
              },
              __self: this
            },
            'Jeff'
          ),
          ' registered',
          '\xA0\xA0',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { size: 'xs', color: 'success', className: 'mr-1', __source: {
                fileName: _jsxFileName,
                lineNumber: 89
              },
              __self: this
            },
            'Allow'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { size: 'xs', color: 'danger', __source: {
                fileName: _jsxFileName,
                lineNumber: 90
              },
              __self: this
            },
            'Deny'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 91
              },
              __self: this
            },
            '12:18 AM'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 96
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 97
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-shield fa-lg', __source: {
              fileName: _jsxFileName,
              lineNumber: 98
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'm-0 overflow-hidden', __source: {
              fileName: _jsxFileName,
              lineNumber: 100
            },
            __self: this
          },
          'Instructions for changing your Envato Account password. Please check your account ',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 103
              },
              __self: this
            },
            'security page'
          ),
          '.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 105
              },
              __self: this
            },
            '12:18 AM'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 110
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 111
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'rounded bg-primary rounded-lg', __source: {
                fileName: _jsxFileName,
                lineNumber: 112
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-facebook text-white', __source: {
                fileName: _jsxFileName,
                lineNumber: 113
              },
              __self: this
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 116
            },
            __self: this
          },
          'New ',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'strong',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 117
              },
              __self: this
            },
            '76'
          ),
          ' facebook likes received.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 118
              },
              __self: this
            },
            '15 Apr 2014'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 123
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 124
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'circle circle-lg bg-gray-dark', __source: {
                fileName: _jsxFileName,
                lineNumber: 125
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle-o text-white', __source: {
                fileName: _jsxFileName,
                lineNumber: 126
              },
              __self: this
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 129
            },
            __self: this
          },
          'Dark matter detected.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 131
              },
              __self: this
            },
            '15 Apr 2014'
          )
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a)(NewNotificationsDemo));

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_people_a3_jpg__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_people_a3_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__images_people_a3_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images_people_a5_jpg__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__images_people_a5_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__images_people_a5_jpg__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Notifications/notifications-demo/Notifications.js';









class NotificationsDemo extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroup"],
      { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroup, 'thin-scroll'].join(' '), __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 18
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_4__images_people_a3_jpg___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 20
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'm-0 overflow-hidden', __source: {
              fileName: _jsxFileName,
              lineNumber: 22
            },
            __self: this
          },
          '1 new user just signed up! Check out',
          '\xA0',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 25
              },
              __self: this
            },
            'Monica Smith'
          ),
          '\'s account.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 27
              },
              __self: this
            },
            '2 mins ago'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 33
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'glyphicon glyphicon-upload fa-lg', __source: {
              fileName: _jsxFileName,
              lineNumber: 34
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 36
            },
            __self: this
          },
          '2.1.0-pre-alpha just released.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 38
              },
              __self: this
            },
            '5h ago'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 43
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 44
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-bolt fa-lg', __source: {
              fileName: _jsxFileName,
              lineNumber: 45
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'text-ellipsis m-0 overflow-hidden', __source: {
              fileName: _jsxFileName,
              lineNumber: 47
            },
            __self: this
          },
          'Server load limited.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 49
              },
              __self: this
            },
            '7h ago'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 55
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'rounded-circle', src: __WEBPACK_IMPORTED_MODULE_5__images_people_a5_jpg___default.a, alt: '...', __source: {
              fileName: _jsxFileName,
              lineNumber: 56
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'm-0 overflow-hidden', __source: {
              fileName: _jsxFileName,
              lineNumber: 58
            },
            __self: this
          },
          'User ',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 60
              },
              __self: this
            },
            'Jeff'
          ),
          ' registered',
          '\xA0\xA0',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { size: 'xs', color: 'success', className: 'mr-1', __source: {
                fileName: _jsxFileName,
                lineNumber: 63
              },
              __self: this
            },
            'Allow'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { size: 'xs', color: 'danger', __source: {
                fileName: _jsxFileName,
                lineNumber: 64
              },
              __self: this
            },
            'Deny'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 65
              },
              __self: this
            },
            '12:18 AM'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 70
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-shield fa-lg', __source: {
              fileName: _jsxFileName,
              lineNumber: 72
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'm-0 overflow-hidden', __source: {
              fileName: _jsxFileName,
              lineNumber: 74
            },
            __self: this
          },
          'Instructions for changing your Envato Account password. Please check your account ',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 77
              },
              __self: this
            },
            'security page'
          ),
          '.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 79
              },
              __self: this
            },
            '12:18 AM'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 84
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 85
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'rounded bg-primary rounded-lg', __source: {
                fileName: _jsxFileName,
                lineNumber: 86
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-facebook text-white', __source: {
                fileName: _jsxFileName,
                lineNumber: 87
              },
              __self: this
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 90
            },
            __self: this
          },
          'New ',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'strong',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 91
              },
              __self: this
            },
            '76'
          ),
          ' facebook likes received.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 92
              },
              __self: this
            },
            '15 Apr 2014'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 97
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.notificationIcon, 'thumb-sm'].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 98
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'circle circle-lg bg-gray-dark', __source: {
                fileName: _jsxFileName,
                lineNumber: 99
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle-o text-white', __source: {
                fileName: _jsxFileName,
                lineNumber: 100
              },
              __self: this
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          { className: 'text-ellipsis m-0', __source: {
              fileName: _jsxFileName,
              lineNumber: 103
            },
            __self: this
          },
          'Dark matter detected.',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'time',
            { className: 'help-block m-0', __source: {
                fileName: _jsxFileName,
                lineNumber: 105
              },
              __self: this
            },
            '15 Apr 2014'
          )
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a)(NotificationsDemo));

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Notifications/notifications-demo/Progress.js';




 // eslint-disable-line

class ProgressDemo extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroup"],
      { className: [__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroup, 'thin-scroll'].join(' '), __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 16
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'text-muted float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 17
            },
            __self: this
          },
          '60%'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 mb-1 text-gray', __source: {
              fileName: _jsxFileName,
              lineNumber: 18
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'strong',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 19
              },
              __self: this
            },
            'Urgent:'
          ),
          '\xA0Rails 4.1.0 upgrade'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Progress"], { className: ['m-0'].join(' '), color: 'primary', value: '60', __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'help-block', __source: {
              fileName: _jsxFileName,
              lineNumber: 23
            },
            __self: this
          },
          '3 notes added by James 2h ago...'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 25
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'text-muted float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            },
            __self: this
          },
          '83%'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 mb-1 text-gray', __source: {
              fileName: _jsxFileName,
              lineNumber: 27
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'strong',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 28
              },
              __self: this
            },
            'Primary:'
          ),
          '\xA0Sing Web App'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Progress"], { className: ['progress-sm', 'm-0'].join(' '), color: 'success', value: '83', __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'help-block', __source: {
              fileName: _jsxFileName,
              lineNumber: 32
            },
            __self: this
          },
          'verifying stable probability status'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'text-muted float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            },
            __self: this
          },
          '44%'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 mb-1', __source: {
              fileName: _jsxFileName,
              lineNumber: 36
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'circle bg-gray-dark text-warning', id: 'TooltipQuestion', __source: {
                fileName: _jsxFileName,
                lineNumber: 37
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-question', __source: {
                fileName: _jsxFileName,
                lineNumber: 38
              },
              __self: this
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["UncontrolledTooltip"],
            { placement: 'bottom', target: 'TooltipQuestion', __source: {
                fileName: _jsxFileName,
                lineNumber: 40
              },
              __self: this
            },
            '2 issues require your attention'
          ),
          '\xA0 Finish The Road to Hell Song'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Progress"], { className: ['progress-sm', 'm-0'].join(' '), color: 'gray-dark', value: '44', __source: {
            fileName: _jsxFileName,
            lineNumber: 46
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'help-block', __source: {
              fileName: _jsxFileName,
              lineNumber: 47
            },
            __self: this
          },
          'last update: 2h ago'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 49
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'text-muted float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 50
            },
            __self: this
          },
          '86%'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 mb-1 deemphasize text-gray', __source: {
              fileName: _jsxFileName,
              lineNumber: 51
            },
            __self: this
          },
          'Complete project planning'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Progress"], { className: ['progress-xs', 'm-0'].join(' '), color: 'danger', value: '86', __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'help-block', __source: {
              fileName: _jsxFileName,
              lineNumber: 55
            },
            __self: this
          },
          'no, no way this is not working...'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ListGroupItem"],
        { className: __WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a.listGroupItem, __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'text-muted float-right', __source: {
              fileName: _jsxFileName,
              lineNumber: 58
            },
            __self: this
          },
          '100%'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h6',
          { className: 'm-0 mb-1 deemphasize text-gray', __source: {
              fileName: _jsxFileName,
              lineNumber: 59
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'strong',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 60
              },
              __self: this
            },
            'Completed:'
          ),
          '\xA0Instruct newbies on coding standards'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Progress"], { className: ['progress-xs', 'm-0'].join(' '), color: 'primary', value: '100', __source: {
            fileName: _jsxFileName,
            lineNumber: 63
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: 'help-block', __source: {
              fileName: _jsxFileName,
              lineNumber: 64
            },
            __self: this
          },
          'last update: April 22, 2014 2:36 pm'
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__ListGroup_scss___default.a)(ProgressDemo));

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_classnames__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Sidebar/LinksGroup/LinksGroup.js';










class LinksGroup extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  /* eslint-disable */
  constructor(props) {
    super(props);
    this.togglePanelCollapse = this.togglePanelCollapse.bind(this);

    this.state = {
      headerLinkWasClicked: true
    };
  }
  /* eslint-enable */

  togglePanelCollapse(link) {
    this.props.onActiveSidebarItemChange(link);
    this.setState({
      headerLinkWasClicked: !this.state.headerLinkWasClicked || !this.props.activeItem.includes(this.props.index)
    });
  }

  render() {
    const isOpen = this.props.activeItem && this.props.activeItem.includes(this.props.index) && this.state.headerLinkWasClicked;

    if (!this.props.childrenLinks) {
      if (this.props.isHeader) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { className: [__WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.headerLink, this.props.className].join(' '), __source: {
              fileName: _jsxFileName,
              lineNumber: 64
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["NavLink"],
            {
              to: this.props.link,
              activeClassName: __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.headerLinkActive,
              exact: true,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 65
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.icon, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 70
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: `fa ${this.props.iconName}`, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 71
                },
                __self: this
              })
            ),
            this.props.header,
            ' ',
            this.props.label && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'sup',
              { className: __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.headerLabel, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 73
                },
                __self: this
              },
              this.props.label
            ),
            this.props.badge && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Badge"],
              { className: __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.badge, color: 'danger', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 74
                },
                __self: this
              },
              '9'
            )
          )
        );
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'li',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 80
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["NavLink"],
          {
            to: this.props.link,
            activeClassName: __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.headerLinkActive,
            style: { paddingLeft: `${36 + 10 * (this.props.deep - 1)}px` },
            onClick: e => {
              // able to go to link is not available(for Demo)
              if (this.props.link.includes('menu')) {
                e.preventDefault();
              }
            },
            exact: true,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 81
            },
            __self: this
          },
          this.props.header,
          ' ',
          this.props.label && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'sup',
            { className: __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.headerLabel, __source: {
                fileName: _jsxFileName,
                lineNumber: 93
              },
              __self: this
            },
            this.props.label
          )
        )
      );
    }
    /* eslint-disable */
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_router__["Route"], {
      path: this.props.link,
      children: params => {
        const { match } = params;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { className: __WEBPACK_IMPORTED_MODULE_6_classnames___default()({ [__WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.headerLink]: this.props.isHeader }, this.props.className), __source: {
              fileName: _jsxFileName,
              lineNumber: 105
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { className: __WEBPACK_IMPORTED_MODULE_6_classnames___default()({ [__WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.headerLinkActive]: match }, { [__WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.collapsed]: isOpen }, "d-flex"),
              style: { paddingLeft: `${this.props.deep == 0 ? 50 : 36 + 10 * (this.props.deep - 1)}px` },
              onClick: () => this.togglePanelCollapse(this.props.link),
              href: '#',
              __source: {
                fileName: _jsxFileName,
                lineNumber: 106
              },
              __self: this
            },
            this.props.isHeader ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.icon, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 112
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: `fa ${this.props.iconName}`, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 113
                },
                __self: this
              })
            ) : null,
            this.props.header,
            ' ',
            this.props.label && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'sup',
              { className: __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.header, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 116
                },
                __self: this
              },
              this.props.label
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('b', { className: ['fa fa-angle-left', __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.caret].join(' '), __source: {
                fileName: _jsxFileName,
                lineNumber: 117
              },
              __self: this
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Collapse"],
            { className: __WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a.panel, isOpen: isOpen, __source: {
                fileName: _jsxFileName,
                lineNumber: 120
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'ul',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 121
                },
                __self: this
              },
              this.props.childrenLinks && this.props.childrenLinks.map((child, ind) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(LinksGroup, {
                onActiveSidebarItemChange: this.props.onActiveSidebarItemChange,
                activeItem: this.props.activeItem,
                header: child.header,
                link: child.link,
                index: child.index,
                childrenLinks: child.childrenLinks,
                deep: this.props.deep + 1,
                key: ind // eslint-disable-line
                , __source: {
                  fileName: _jsxFileName,
                  lineNumber: 124
                },
                __self: this
              }))
            )
          )
        );
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100
      },
      __self: this
    });
  }
}

LinksGroup.propTypes = {
  header: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired,
  link: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  childrenLinks: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,
  iconName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  badge: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  activeItem: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  isHeader: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  index: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  deep: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  onActiveSidebarItemChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
LinksGroup.defaultProps = {
  link: '',
  childrenLinks: null,
  className: '',
  isHeader: false,
  deep: 0,
  activeItem: '',
  label: ''
};
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["withRouter"])(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__LinksGroup_scss___default.a)(LinksGroup)));

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_alerts__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Sidebar_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__LinksGroup_LinksGroup__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions_navigation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__core_screenHelper__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__actions_user__ = __webpack_require__(8);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Sidebar/Sidebar.js';














class Sidebar extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  onMouseEnter() {
    if (!this.props.sidebarStatic && (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__core_screenHelper__["a" /* default */])('lg') || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__core_screenHelper__["a" /* default */])('xl'))) {
      const paths = this.props.location.pathname.split('/');
      paths.pop();
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["b" /* openSidebar */])());
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["a" /* changeActiveSidebarItem */])(paths.join('/')));
    }
  }

  onMouseLeave() {
    if (!this.props.sidebarStatic && (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__core_screenHelper__["a" /* default */])('lg') || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__core_screenHelper__["a" /* default */])('xl'))) {
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["c" /* closeSidebar */])());
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__actions_navigation__["a" /* changeActiveSidebarItem */])(null));
    }
  }

  dismissAlert(id) {
    this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_alerts__["a" /* dismissAlert */])(id));
  }

  doLogout() {
    this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__actions_user__["d" /* logoutUser */])());
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'nav',
      {
        onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave,
        className: [__WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.root, this.props.sidebarStatic ? __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.staticSidebar : '', !this.props.sidebarOpened ? __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.sidebarClose : ''].join(' '),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'header',
        { className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.logo, __source: {
            fileName: _jsxFileName,
            lineNumber: 70
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5_react_router_dom__["Link"],
          { to: '/app', __source: {
              fileName: _jsxFileName,
              lineNumber: 71
            },
            __self: this
          },
          'sing'
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        { className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.nav, __source: {
            fileName: _jsxFileName,
            lineNumber: 73
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__LinksGroup_LinksGroup__["a" /* default */], { header: 'Dashboard', link: '/app', iconName: 'fa-child', isHeader: true, __source: {
            fileName: _jsxFileName,
            lineNumber: 74
          },
          __self: this
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__LinksGroup_LinksGroup__["a" /* default */], { header: 'Another Page', link: '/app/profile', iconName: 'fa-tree', badge: '9', isHeader: true, __source: {
            fileName: _jsxFileName,
            lineNumber: 75
          },
          __self: this
        })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h5',
        { className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.navTitle, __source: {
            fileName: _jsxFileName,
            lineNumber: 77
          },
          __self: this
        },
        'LABELS',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.actionLink, __source: {
              fileName: _jsxFileName,
              lineNumber: 79
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: `${__WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.glyphiconSm} glyphicon glyphicon-plus float-right`, __source: {
              fileName: _jsxFileName,
              lineNumber: 80
            },
            __self: this
          })
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        { className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.sidebarLabels, __source: {
            fileName: _jsxFileName,
            lineNumber: 84
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 85
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 86
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle text-warning mr-2', __source: {
                fileName: _jsxFileName,
                lineNumber: 87
              },
              __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.labelName, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 88
                },
                __self: this
              },
              'My Recent'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 91
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 92
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle text-gray mr-2', __source: {
                fileName: _jsxFileName,
                lineNumber: 93
              },
              __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.labelName, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 94
                },
                __self: this
              },
              'Starred'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 97
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: '#', __source: {
                fileName: _jsxFileName,
                lineNumber: 98
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle text-danger mr-2', __source: {
                fileName: _jsxFileName,
                lineNumber: 99
              },
              __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.labelName, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 100
                },
                __self: this
              },
              'Background'
            )
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h5',
        { className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.navTitle, __source: {
            fileName: _jsxFileName,
            lineNumber: 105
          },
          __self: this
        },
        'PROJECTS'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.sidebarAlerts, __source: {
            fileName: _jsxFileName,
            lineNumber: 108
          },
          __self: this
        },
        this.props.alertsList.map(alert => // eslint-disable-line
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_reactstrap__["Alert"],
          {
            key: alert.id,
            className: __WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.sidebarAlert, color: 'transparent',
            isOpen: true // eslint-disable-line
            , toggle: () => {
              this.dismissAlert(alert.id);
            },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 110
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'text-white fw-semi-bold', __source: {
                fileName: _jsxFileName,
                lineNumber: 116
              },
              __self: this
            },
            alert.title
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 116
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["Progress"], { className: `${__WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a.sidebarProgress} progress-xs mt-1`, color: alert.color, value: alert.value, __source: {
              fileName: _jsxFileName,
              lineNumber: 117
            },
            __self: this
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'small',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 118
              },
              __self: this
            },
            alert.footer
          )
        ))
      )
    );
  }
}

Sidebar.propTypes = {
  sidebarStatic: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  sidebarOpened: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  dispatch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  activeItem: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired, //eslint-disable-line
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    pathname: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  }).isRequired
};
Sidebar.defaultProps = {
  sidebarStatic: false,
  sidebarOpened: false,
  activeItem: ''
};
function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_react_router_dom__["withRouter"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Sidebar_scss___default.a)(Sidebar))));

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isScreen;
const config = {
  name: 'sing',
  title: 'Sing Dashboard App built with React JS by Flatlogic',
  version: '3.8.0',
  settings: {
    screens: {
      'xs-max': 543,
      'sm-min': 544,
      'sm-max': 767,
      'md-min': 768,
      'md-max': 991,
      'lg-min': 992,
      'lg-max': 1199,
      'xl-min': 1200
    },
    navCollapseTimeout: 2500
  }
};

function isScreen(size) {
  const screenPx = window.innerWidth;
  return (screenPx >= config.settings.screens[`${size}-min`] || size === 'xs') && (screenPx <= config.settings.screens[`${size}-max`] || size === 'xl');
}

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch({ baseUrl, cookie }) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST', // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: _extends({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, cookie ? { Cookie: cookie } : null)
  };

  return (url, options) => url.startsWith('/graphql') || url.startsWith('/api') ? __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(`${baseUrl}${url}`, _extends({}, defaults, options, {
    headers: _extends({}, defaults.headers, options && options.headers)
  })) : __WEBPACK_IMPORTED_MODULE_0_isomorphic_fetch___default()(url, options);
}

/* harmony default export */ __webpack_exports__["a"] = (createFetch);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_react_png__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_react_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__images_react_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Widget__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Dashboard_scss__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Dashboard_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Dashboard_scss__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/pages/dashboard/Dashboard.js';










class Dashboard extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_5__Dashboard_scss___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        { className: 'page-title', __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          },
          __self: this
        },
        'Dashboard \xA0',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'small',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 16
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'small',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 17
              },
              __self: this
            },
            'The Lucky One'
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Row"],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 20
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Col"],
          { md: 6, __source: {
              fileName: _jsxFileName,
              lineNumber: 21
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4__components_Widget__["a" /* default */],
            { title: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'h5',
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 22
                  },
                  __self: this
                },
                'Example ',
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { className: 'fw-semi-bold', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 22
                    },
                    __self: this
                  },
                  'Widget'
                )
              ), __source: {
                fileName: _jsxFileName,
                lineNumber: 22
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { className: 'float-left mr-sm', src: __WEBPACK_IMPORTED_MODULE_3__images_react_png___default.a, alt: 'React JS', width: '80', __source: {
                fileName: _jsxFileName,
                lineNumber: 23
              },
              __self: this
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'lead', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 24
                },
                __self: this
              },
              'You are looking at a completely new version of Sing App built with ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'strong',
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 25
                  },
                  __self: this
                },
                'React JS'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 26
                },
                __self: this
              },
              'Made by ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'a',
                { href: 'http://flatlogic.com', target: '_blank', rel: 'noopener noreferrer', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 26
                  },
                  __self: this
                },
                'Flatlogic'
              ),
              '.'
            )
          )
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_5__Dashboard_scss___default.a)(Dashboard));

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/pages/error/ErrorPage.js';






class ErrorPage extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorPage, __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Container"],
        { className: 'height-100', __source: {
            fileName: _jsxFileName,
            lineNumber: 17
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: `${__WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorContainer} mx-auto`, __source: {
              fileName: _jsxFileName,
              lineNumber: 18
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            { className: __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorCode, __source: {
                fileName: _jsxFileName,
                lineNumber: 19
              },
              __self: this
            },
            '404'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorInfo, __source: {
                fileName: _jsxFileName,
                lineNumber: 20
              },
              __self: this
            },
            'Opps, it seems that this page does not exist.'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: [__WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorHelp, 'mb-3'].join(' '), __source: {
                fileName: _jsxFileName,
                lineNumber: 23
              },
              __self: this
            },
            'If you are sure it should, search for it.'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Form"],
            { method: 'get', __source: {
                fileName: _jsxFileName,
                lineNumber: 26
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 27
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"], { className: 'input-no-border', type: 'text', placeholder: 'Search Pages', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 28
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
              { className: __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorBtn, type: 'submit', color: 'inverse', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 30
                },
                __self: this
              },
              'Search ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-search text-warning ml-xs', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 31
                },
                __self: this
              })
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'footer',
          { className: __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.pageFooter, __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            },
            __self: this
          },
          '2017 \xA9 Sing. Admin Dashboard Template.'
        )
      )
    );
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a)(ErrorPage));

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Widget__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Login_scss__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Login_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__Login_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_user__ = __webpack_require__(8);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/pages/login/Login.js';










class Login extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    };

    this.doLogin = this.doLogin.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  changeLogin(event) {
    this.setState({ login: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  doLogin(e) {
    this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__actions_user__["c" /* loginUser */])({ login: this.state.login, password: this.state.password }));
    e.preventDefault();
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/app' } }; // eslint-disable-line

    // cant access login page while logged in
    if (this.props.isAuthenticated) {
      // eslint-disable-line
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["Redirect"], { to: from, __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      });
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_7__Login_scss___default.a.root, __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5_reactstrap__["Container"],
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'h5',
          { className: `${__WEBPACK_IMPORTED_MODULE_7__Login_scss___default.a.logo}`, __source: {
              fileName: _jsxFileName,
              lineNumber: 55
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle text-gray', __source: {
              fileName: _jsxFileName,
              lineNumber: 56
            },
            __self: this
          }),
          'sing',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-circle text-warning', __source: {
              fileName: _jsxFileName,
              lineNumber: 58
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_6__components_Widget__["a" /* default */],
          { className: `${__WEBPACK_IMPORTED_MODULE_7__Login_scss___default.a.widget} mx-auto`, title: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h3',
              { className: 'mt-0', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 60
                },
                __self: this
              },
              'Login to your Web App'
            ), __source: {
              fileName: _jsxFileName,
              lineNumber: 60
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: __WEBPACK_IMPORTED_MODULE_7__Login_scss___default.a.widgetLoginInfo, __source: {
                fileName: _jsxFileName,
                lineNumber: 61
              },
              __self: this
            },
            'Use Facebook, Twitter or your email to sign in.'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: __WEBPACK_IMPORTED_MODULE_7__Login_scss___default.a.widgetLoginInfo, __source: {
                fileName: _jsxFileName,
                lineNumber: 65
              },
              __self: this
            },
            'Don\'t have an account? Sign up now!'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'form',
            { className: 'mt', onSubmit: this.doLogin, __source: {
                fileName: _jsxFileName,
                lineNumber: 69
              },
              __self: this
            },
            this.props.errorMessage && // eslint-disable-line
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_reactstrap__["Alert"],
              { className: 'alert-sm', bsStyle: 'danger', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 72
                },
                __self: this
              },
              this.props.errorMessage
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 77
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: 'form-control no-border', value: this.state.login, onChange: this.changeLogin, type: 'text', required: true, name: 'username', placeholder: 'Username', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 78
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'form-group', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 80
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: 'form-control no-border', value: this.state.password, onChange: this.changePassword, type: 'password', required: true, name: 'password', placeholder: 'Password', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 81
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'clearfix', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 83
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'btn-toolbar float-right', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 84
                  },
                  __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'button',
                  { type: 'reset', className: 'btn btn-secondary btn-sm', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 85
                    },
                    __self: this
                  },
                  'Create an Account'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'button',
                  { type: 'submit', href: '/app', className: 'btn btn-inverse btn-sm', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 86
                    },
                    __self: this
                  },
                  this.props.isFetching ? 'Loading...' : 'Login'
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'row no-gutters mt-3', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 89
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 90
                  },
                  __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'a',
                  { className: 'mt-sm', href: '', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 91
                    },
                    __self: this
                  },
                  'Trouble with account?'
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'col =', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 93
                  },
                  __self: this
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_5_reactstrap__["FormGroup"],
                  { className: 'abc-checkbox float-right', check: true, __source: {
                      fileName: _jsxFileName,
                      lineNumber: 94
                    },
                    __self: this
                  },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_reactstrap__["Input"], { id: 'checkbox1', type: 'checkbox', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 95
                    },
                    __self: this
                  }),
                  ' ',
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_5_reactstrap__["Label"],
                    { className: 'fw-normal', 'for': 'checkbox1', check: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 96
                      },
                      __self: this
                    },
                    'Keep me signed in'
                  )
                )
              )
            )
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'footer',
        { className: __WEBPACK_IMPORTED_MODULE_7__Login_scss___default.a.footer, __source: {
            fileName: _jsxFileName,
            lineNumber: 105
          },
          __self: this
        },
        '2017 \xA9 Sing. Admin Dashboard Template.'
      )
    );
  }
}

Login.propTypes = {
  dispatch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__["withRouter"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapStateToProps)(__WEBPACK_IMPORTED_MODULE_2_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_7__Login_scss___default.a)(Login))));

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_alerts__ = __webpack_require__(16);
/* harmony export (immutable) */ __webpack_exports__["a"] = alertsReducer;


const defaultState = {
  alertsList: [{
    id: 0,
    title: 'Sales Report',
    value: 16,
    color: 'primary',
    footer: 'Calculating x-axis bias... 65%'
  }, {
    id: 1,
    title: 'Personal Responsibility',
    value: 23,
    color: 'danger',
    footer: 'Provide required notes'
  }]
};

function alertsReducer(state = defaultState, action) {
  let index;
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_alerts__["b" /* DISMISS_ALERT */]:
      state.alertsList.forEach((alert, alertIndex) => {
        if (alert.id === action.id) {
          index = alertIndex;
        }
      });
      return Object.assign({}, state, {
        alertsList: [...state.alertsList.slice(0, index), ...state.alertsList.slice(index + 1)]
      });
    default:
      return state;
  }
}

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_user__ = __webpack_require__(8);
/* harmony export (immutable) */ __webpack_exports__["a"] = auth;


// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
function auth(state = {
  isFetching: false,
  isAuthenticated: false
}, action) {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_user__["e" /* LOGIN_REQUEST */]:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_user__["f" /* LOGIN_SUCCESS */]:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_user__["g" /* LOGIN_FAILURE */]:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_user__["h" /* LOGOUT_SUCCESS */]:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    default:
      return state;
  }
}

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__navigation__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__alerts__ = __webpack_require__(47);





/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  alerts: __WEBPACK_IMPORTED_MODULE_3__alerts__["a" /* default */],
  auth: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */],
  navigation: __WEBPACK_IMPORTED_MODULE_2__navigation__["a" /* default */]
}));

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_navigation__ = __webpack_require__(7);
/* harmony export (immutable) */ __webpack_exports__["a"] = runtime;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const initialState = {
  sidebarOpened: false,
  sidebarStatic: false,
  activeItem: null
};

function runtime(state = initialState, action) {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_navigation__["e" /* TOGGLE_SIDEBAR */]:
      return _extends({}, state, {
        sidebarStatic: !state.sidebarStatic
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_navigation__["f" /* OPEN_SIDEBAR */]:
      return Object.assign({}, state, {
        sidebarOpened: true
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_navigation__["g" /* CLOSE_SIDEBAR */]:
      return Object.assign({}, state, {
        sidebarOpened: false
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_navigation__["h" /* CHANGE_ACTIVE_SIDEBAR_ITEM */]:
      return _extends({}, state, {
        activeItem: action.activeItem
      });
    default:
      return state;
  }
}

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createHelpers__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logger__ = __webpack_require__(53);
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;






function configureStore(initialState, helpersConfig) {
  const helpers = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__createHelpers__["a" /* default */])(helpersConfig);
  const middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a.withExtraArgument(helpers)];

  let enhancer;

  if (true) {
    middleware.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__logger__["a" /* default */])());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (false) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(...middleware), devToolsExtension);
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_2__reducers__["a" /* default */], initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (false) {
    module.hot.accept('../reducers', () =>
    // eslint-disable-next-line global-require
    store.replaceReducer(require('../reducers').default));
  }

  return store;
}

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createHelpers;
function createHelpers({ fetch, history }) {
  return {
    fetch,
    history
  };
}

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_util__);
/* harmony export (immutable) */ __webpack_exports__["a"] = createLogger;


function inspectObject(object) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_util__["inspect"])(object, {
    colors: true
  });
}

function singleLine(str) {
  return str.replace(/\s+/g, ' ');
}

const actionFormatters = {
  // This is used at feature/apollo branch, but it can help you when implementing Apollo
  APOLLO_QUERY_INIT: a => `queryId:${a.queryId} variables:${inspectObject(a.variables)}\n   ${singleLine(a.queryString)}`,

  APOLLO_QUERY_RESULT: a => `queryId:${a.queryId}\n   ${singleLine(inspectObject(a.result))}`,

  APOLLO_QUERY_STOP: a => `queryId:${a.queryId}`
};

// Server side redux action logger
function createLogger() {
  // eslint-disable-next-line no-unused-vars
  return store => next => action => {
    let formattedPayload = '';
    const actionFormatter = actionFormatters[action.type];
    if (typeof actionFormatter === 'function') {
      formattedPayload = actionFormatter(action);
    } else if (action.toString !== Object.prototype.toString) {
      formattedPayload = action.toString();
    } else if (typeof action.payload !== 'undefined') {
      formattedPayload = inspectObject(action.payload);
    } else {
      formattedPayload = inspectObject(action);
    }

    console.log(` * ${action.type}: ${formattedPayload}`); // eslint-disable-line no-console
    return next(action);
  };
}

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_reactstrap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/pages/error/ErrorPage.js';






class ErrorPage extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorPage, __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        __self: this
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Container"],
        { className: 'height-100', __source: {
            fileName: _jsxFileName,
            lineNumber: 17
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: `${__WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorContainer} mx-auto`, __source: {
              fileName: _jsxFileName,
              lineNumber: 18
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            { className: __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorCode, __source: {
                fileName: _jsxFileName,
                lineNumber: 19
              },
              __self: this
            },
            '404'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorInfo, __source: {
                fileName: _jsxFileName,
                lineNumber: 20
              },
              __self: this
            },
            'Opps, it seems that this page does not exist.'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            { className: [__WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorHelp, 'mb-3'].join(' '), __source: {
                fileName: _jsxFileName,
                lineNumber: 23
              },
              __self: this
            },
            'If you are sure it should, search for it.'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Form"],
            { method: 'get', __source: {
                fileName: _jsxFileName,
                lineNumber: 26
              },
              __self: this
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 27
                },
                __self: this
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"], { className: 'input-no-border', type: 'text', placeholder: 'Search Pages', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 28
                },
                __self: this
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
              { className: __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.errorBtn, type: 'submit', color: 'inverse', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 30
                },
                __self: this
              },
              'Search ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-search text-warning ml-xs', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 31
                },
                __self: this
              })
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'footer',
          { className: __WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a.pageFooter, __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            },
            __self: this
          },
          '2017 \xA9 Sing. Admin Dashboard Template.'
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__ErrorPage_scss___default.a)(ErrorPage));

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Profile_scss__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Profile_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Profile_scss__);
var _jsxFileName = '/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/pages/profile/Profile.js',
    _this = this;






const Profile = () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
  'div',
  { className: __WEBPACK_IMPORTED_MODULE_2__Profile_scss___default.a.root, __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: _this
  },
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'h1',
    { className: 'page-title', __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      },
      __self: _this
    },
    'Another Page ',
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'small',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        __self: _this
      },
      'Just like that'
    )
  ),
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      },
      __self: _this
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        },
        __self: _this
      },
      'Some page content. Feel free to place whatever you want here'
    )
  )
);

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_2__Profile_scss___default.a)(Profile));

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(cb) {
	Promise.resolve().then((function(require) {
		cb(__webpack_require__(54));
	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function(cb) {
	Promise.resolve().then((function(require) {
		cb(__webpack_require__(55));
	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n._1IWOcqr4gybHwyTxGO5Hkq {\n  position: fixed;\n  overflow: hidden;\n  top: 0;\n  bottom: 0;\n  right: -250px;\n  width: 250px;\n  background-color: #242424;\n  color: #aaa;\n  transition: right 0.3s ease-in-out; }\n  ._1IWOcqr4gybHwyTxGO5Hkq._1TNEGB12OL69ev8G_v3Uff {\n    right: 0; }\n  ._1IWOcqr4gybHwyTxGO5Hkq .NmNIFKTt2ssieguPNlT7 {\n    position: absolute;\n    width: 100%;\n    top: 0;\n    z-index: 3;\n    padding: 10px;\n    background-color: #242424; }\n    ._1IWOcqr4gybHwyTxGO5Hkq .NmNIFKTt2ssieguPNlT7 input {\n      padding: 0.6rem 0.85rem;\n      line-height: 1.5; }\n    ._1IWOcqr4gybHwyTxGO5Hkq .NmNIFKTt2ssieguPNlT7 ._2Dbt2yHzObBLMf8ih2jezJ {\n      margin: 10px;\n      text-transform: uppercase;\n      font-size: 15px;\n      font-weight: 400; }\n  ._1IWOcqr4gybHwyTxGO5Hkq ._3VA496_b3tHMTe2Z3P-71j {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    width: 100%; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._3VA496_b3tHMTe2Z3P-71j .list-group-item {\n      border: 0;\n      padding: 10px 20px;\n      z-index: 1; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._3VA496_b3tHMTe2Z3P-71j .list-group-item .cirle {\n        font-size: 11px;\n        line-height: 37px;\n        margin-left: auto; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._3VA496_b3tHMTe2Z3P-71j ._2PH1cH-xMw5oaQScdT-1vX {\n      margin: 35px 10px 5px 20px;\n      font-size: 14px; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._3VA496_b3tHMTe2Z3P-71j ._2PH1cH-xMw5oaQScdT-1vX:first-child {\n      margin-top: 0; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._3VA496_b3tHMTe2Z3P-71j ._1xMRdhbdJPpy3o84QtsbYg {\n      text-overflow: ellipsis; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._3VA496_b3tHMTe2Z3P-71j ._3UJ9s2ILj4mMEAd8FNFh74 {\n      margin: 0;\n      width: 100px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      font-size: 85%;\n      color: #999; }\n  ._1IWOcqr4gybHwyTxGO5Hkq ._37OT1mjdPWwe4RhXEipCR_ {\n    padding-top: 105px;\n    left: -100%;\n    transition: left 0.2s ease-in-out; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._37OT1mjdPWwe4RhXEipCR_ .list-group {\n      margin-top: 10px; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._37OT1mjdPWwe4RhXEipCR_ .list-group .list-group-item {\n        cursor: pointer; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._37OT1mjdPWwe4RhXEipCR_._2mHGNQpk8FvDRbv6sMbv4S {\n      left: 0;\n      overflow-y: auto; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._37OT1mjdPWwe4RhXEipCR_._2mHGNQpk8FvDRbv6sMbv4S::-webkit-scrollbar {\n        height: 8px;\n        width: 4px; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._37OT1mjdPWwe4RhXEipCR_._2mHGNQpk8FvDRbv6sMbv4S::-webkit-scrollbar-thumb {\n        border: none;\n        background-color: rgba(255, 255, 255, 0.3);\n        box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1); }\n  ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV {\n    padding-top: 100px;\n    right: -100%;\n    transition: right 0.2s ease-in-out; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV .list-group {\n      position: absolute;\n      top: 134px;\n      bottom: 47px;\n      width: 100%;\n      padding-top: 0.5rem;\n      overflow-y: auto; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV .list-group::-webkit-scrollbar {\n        height: 8px;\n        width: 4px; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV .list-group::-webkit-scrollbar-thumb {\n        border: none;\n        background-color: rgba(255, 255, 255, 0.3);\n        box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1); }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV .list-group .list-group-item {\n        align-items: flex-start; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV .list-group .thumb-sm {\n        float: left; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV ._1Vzpz_go9JkcTkWsyQkzJB {\n      position: relative;\n      margin-left: 50px;\n      padding: 10px;\n      font-size: 13px;\n      font-weight: 400;\n      background-color: #dfdfdf;\n      color: #555;\n      border-radius: 0.25rem; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV ._1Vzpz_go9JkcTkWsyQkzJB::before {\n        right: 100%;\n        top: 8px;\n        content: '';\n        height: 0;\n        width: 0;\n        position: absolute;\n        border: 10px solid transparent;\n        border-right-color: #dfdfdf; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV ._3MHkTt3oqEjm7uciHowNOP {\n      flex-direction: row-reverse; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV ._3MHkTt3oqEjm7uciHowNOP .thumb-sm {\n        float: right; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV ._3MHkTt3oqEjm7uciHowNOP ._1Vzpz_go9JkcTkWsyQkzJB {\n        margin-left: 0;\n        margin-right: 50px;\n        background-color: #f0b518;\n        color: #343434; }\n        ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV ._3MHkTt3oqEjm7uciHowNOP ._1Vzpz_go9JkcTkWsyQkzJB::before {\n          right: auto;\n          left: 100%;\n          border-right-color: transparent;\n          border-left-color: #f0b518; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV ._1vF2XdxM08Cxq7PSrZ-Sed {\n      position: absolute;\n      z-index: 1;\n      bottom: 0;\n      width: 100%;\n      margin-bottom: 0;\n      padding: 10px;\n      background-color: #3a3a3a; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV._2mHGNQpk8FvDRbv6sMbv4S {\n      right: 0; }\n    ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV .QB_CsR7Nzy0dTDnm1-ksH {\n      margin-bottom: 0; }\n      ._1IWOcqr4gybHwyTxGO5Hkq ._2Gb6hqkyooHk0zDcEFjdWV .QB_CsR7Nzy0dTDnm1-ksH a {\n        display: block;\n        padding: 10px 16px;\n        background-color: rgba(255, 255, 255, 0.1); }\n  ._1IWOcqr4gybHwyTxGO5Hkq .p88BzVX-U9iOrLx7MQ7OB .list-group-item {\n    transition: all 0.2s ease-in-out; }\n  ._1IWOcqr4gybHwyTxGO5Hkq .p88BzVX-U9iOrLx7MQ7OB .list-group-item.active {\n    background: rgba(255, 255, 255, 0.1); }\n  ._1IWOcqr4gybHwyTxGO5Hkq .p88BzVX-U9iOrLx7MQ7OB .list-group-item.active h6 {\n    color: #f0b518;\n    font-weight: 700; }\n  ._1IWOcqr4gybHwyTxGO5Hkq .p88BzVX-U9iOrLx7MQ7OB .list-group-item:hover:not(.active) {\n    background: rgba(0, 0, 0, 0.1);\n    color: #fff; }\n  ._1IWOcqr4gybHwyTxGO5Hkq .p88BzVX-U9iOrLx7MQ7OB .badge {\n    margin: 8px 5px 0 0;\n    padding: 3px 5px; }\n  ._1IWOcqr4gybHwyTxGO5Hkq .p88BzVX-U9iOrLx7MQ7OB .fa {\n    margin-top: 11px; }\n  ._1IWOcqr4gybHwyTxGO5Hkq ._2FY995af5LXRr5pUFBBwMD:hover {\n    background: transparent; }\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Chat/Chat.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG;AACH;EACE,gBAAgB;EAChB,iBAAiB;EACjB,OAAO;EACP,UAAU;EACV,cAAc;EACd,aAAa;EACb,0BAA0B;EAC1B,YAAY;EACZ,mCAAmC,EAAE;EACrC;IACE,SAAS,EAAE;EACb;IACE,mBAAmB;IACnB,YAAY;IACZ,OAAO;IACP,WAAW;IACX,cAAc;IACd,0BAA0B,EAAE;IAC5B;MACE,wBAAwB;MACxB,iBAAiB,EAAE;IACrB;MACE,aAAa;MACb,0BAA0B;MAC1B,gBAAgB;MAChB,iBAAiB,EAAE;EACvB;IACE,mBAAmB;IACnB,OAAO;IACP,UAAU;IACV,YAAY,EAAE;IACd;MACE,UAAU;MACV,mBAAmB;MACnB,WAAW,EAAE;MACb;QACE,gBAAgB;QAChB,kBAAkB;QAClB,kBAAkB,EAAE;IACxB;MACE,2BAA2B;MAC3B,gBAAgB,EAAE;IACpB;MACE,cAAc,EAAE;IAClB;MACE,wBAAwB,EAAE;IAC5B;MACE,UAAU;MACV,aAAa;MACb,oBAAoB;MACpB,iBAAiB;MACjB,wBAAwB;MACxB,eAAe;MACf,YAAY,EAAE;EAClB;IACE,mBAAmB;IACnB,YAAY;IACZ,kCAAkC,EAAE;IACpC;MACE,iBAAiB,EAAE;MACnB;QACE,gBAAgB,EAAE;IACtB;MACE,QAAQ;MACR,iBAAiB,EAAE;MACnB;QACE,YAAY;QACZ,WAAW,EAAE;MACf;QACE,aAAa;QACb,2CAA2C;QAC3C,+CAA+C,EAAE;EACvD;IACE,mBAAmB;IACnB,aAAa;IACb,mCAAmC,EAAE;IACrC;MACE,mBAAmB;MACnB,WAAW;MACX,aAAa;MACb,YAAY;MACZ,oBAAoB;MACpB,iBAAiB,EAAE;MACnB;QACE,YAAY;QACZ,WAAW,EAAE;MACf;QACE,aAAa;QACb,2CAA2C;QAC3C,+CAA+C,EAAE;MACnD;QACE,wBAAwB,EAAE;MAC5B;QACE,YAAY,EAAE;IAClB;MACE,mBAAmB;MACnB,kBAAkB;MAClB,cAAc;MACd,gBAAgB;MAChB,iBAAiB;MACjB,0BAA0B;MAC1B,YAAY;MACZ,uBAAuB,EAAE;MACzB;QACE,YAAY;QACZ,SAAS;QACT,YAAY;QACZ,UAAU;QACV,SAAS;QACT,mBAAmB;QACnB,+BAA+B;QAC/B,4BAA4B,EAAE;IAClC;MACE,4BAA4B,EAAE;MAC9B;QACE,aAAa,EAAE;MACjB;QACE,eAAe;QACf,mBAAmB;QACnB,0BAA0B;QAC1B,eAAe,EAAE;QACjB;UACE,YAAY;UACZ,WAAW;UACX,gCAAgC;UAChC,2BAA2B,EAAE;IACnC;MACE,mBAAmB;MACnB,WAAW;MACX,UAAU;MACV,YAAY;MACZ,iBAAiB;MACjB,cAAc;MACd,0BAA0B,EAAE;IAC9B;MACE,SAAS,EAAE;IACb;MACE,iBAAiB,EAAE;MACnB;QACE,eAAe;QACf,mBAAmB;QACnB,2CAA2C,EAAE;EACnD;IACE,iCAAiC,EAAE;EACrC;IACE,qCAAqC,EAAE;EACzC;IACE,eAAe;IACf,iBAAiB,EAAE;EACrB;IACE,+BAA+B;IAC/B,YAAY,EAAE;EAChB;IACE,oBAAoB;IACpB,iBAAiB,EAAE;EACrB;IACE,iBAAiB,EAAE;EACrB;IACE,wBAAwB,EAAE","file":"Chat.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.root {\n  position: fixed;\n  overflow: hidden;\n  top: 0;\n  bottom: 0;\n  right: -250px;\n  width: 250px;\n  background-color: #242424;\n  color: #aaa;\n  transition: right 0.3s ease-in-out; }\n  .root.chatOpen {\n    right: 0; }\n  .root .chatHeader {\n    position: absolute;\n    width: 100%;\n    top: 0;\n    z-index: 3;\n    padding: 10px;\n    background-color: #242424; }\n    .root .chatHeader input {\n      padding: 0.6rem 0.85rem;\n      line-height: 1.5; }\n    .root .chatHeader .chatTitle {\n      margin: 10px;\n      text-transform: uppercase;\n      font-size: 15px;\n      font-weight: 400; }\n  .root .chatPanel {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    width: 100%; }\n    .root .chatPanel :global .list-group-item {\n      border: 0;\n      padding: 10px 20px;\n      z-index: 1; }\n      .root .chatPanel :global .list-group-item .cirle {\n        font-size: 11px;\n        line-height: 37px;\n        margin-left: auto; }\n    .root .chatPanel .navTitle {\n      margin: 35px 10px 5px 20px;\n      font-size: 14px; }\n    .root .chatPanel .navTitle:first-child {\n      margin-top: 0; }\n    .root .chatPanel .messageSender {\n      text-overflow: ellipsis; }\n    .root .chatPanel .messagePreview {\n      margin: 0;\n      width: 100px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      font-size: 85%;\n      color: #999; }\n  .root .chatContacts {\n    padding-top: 105px;\n    left: -100%;\n    transition: left 0.2s ease-in-out; }\n    .root .chatContacts :global .list-group {\n      margin-top: 10px; }\n      .root .chatContacts :global .list-group :global .list-group-item {\n        cursor: pointer; }\n    .root .chatContacts.chatMessageOpen {\n      left: 0;\n      overflow-y: auto; }\n      .root .chatContacts.chatMessageOpen::-webkit-scrollbar {\n        height: 8px;\n        width: 4px; }\n      .root .chatContacts.chatMessageOpen::-webkit-scrollbar-thumb {\n        border: none;\n        background-color: rgba(255, 255, 255, 0.3);\n        box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1); }\n  .root .chatMessages {\n    padding-top: 100px;\n    right: -100%;\n    transition: right 0.2s ease-in-out; }\n    .root .chatMessages :global .list-group {\n      position: absolute;\n      top: 134px;\n      bottom: 47px;\n      width: 100%;\n      padding-top: 0.5rem;\n      overflow-y: auto; }\n      .root .chatMessages :global .list-group::-webkit-scrollbar {\n        height: 8px;\n        width: 4px; }\n      .root .chatMessages :global .list-group::-webkit-scrollbar-thumb {\n        border: none;\n        background-color: rgba(255, 255, 255, 0.3);\n        box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1); }\n      .root .chatMessages :global .list-group :global .list-group-item {\n        align-items: flex-start; }\n      .root .chatMessages :global .list-group :global .thumb-sm {\n        float: left; }\n    .root .chatMessages .messageBody {\n      position: relative;\n      margin-left: 50px;\n      padding: 10px;\n      font-size: 13px;\n      font-weight: 400;\n      background-color: #dfdfdf;\n      color: #555;\n      border-radius: 0.25rem; }\n      .root .chatMessages .messageBody::before {\n        right: 100%;\n        top: 8px;\n        content: '';\n        height: 0;\n        width: 0;\n        position: absolute;\n        border: 10px solid transparent;\n        border-right-color: #dfdfdf; }\n    .root .chatMessages .fromMe {\n      flex-direction: row-reverse; }\n      .root .chatMessages .fromMe :global .thumb-sm {\n        float: right; }\n      .root .chatMessages .fromMe .messageBody {\n        margin-left: 0;\n        margin-right: 50px;\n        background-color: #f0b518;\n        color: #343434; }\n        .root .chatMessages .fromMe .messageBody::before {\n          right: auto;\n          left: 100%;\n          border-right-color: transparent;\n          border-left-color: #f0b518; }\n    .root .chatMessages .chatFooter {\n      position: absolute;\n      z-index: 1;\n      bottom: 0;\n      width: 100%;\n      margin-bottom: 0;\n      padding: 10px;\n      background-color: #3a3a3a; }\n    .root .chatMessages.chatMessageOpen {\n      right: 0; }\n    .root .chatMessages .messagesTitle {\n      margin-bottom: 0; }\n      .root .chatMessages .messagesTitle a {\n        display: block;\n        padding: 10px 16px;\n        background-color: rgba(255, 255, 255, 0.1); }\n  .root .chatSidebarUserGroup :global .list-group-item {\n    transition: all 0.2s ease-in-out; }\n  .root .chatSidebarUserGroup :global .list-group-item.active {\n    background: rgba(255, 255, 255, 0.1); }\n  .root .chatSidebarUserGroup :global .list-group-item.active h6 {\n    color: #f0b518;\n    font-weight: 700; }\n  .root .chatSidebarUserGroup :global .list-group-item:hover:not(.active) {\n    background: rgba(0, 0, 0, 0.1);\n    color: #fff; }\n  .root .chatSidebarUserGroup :global .badge {\n    margin: 8px 5px 0 0;\n    padding: 3px 5px; }\n  .root .chatSidebarUserGroup :global .fa {\n    margin-top: 11px; }\n  .root .messageItem:hover {\n    background: transparent; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "_1IWOcqr4gybHwyTxGO5Hkq",
	"chatOpen": "_1TNEGB12OL69ev8G_v3Uff",
	"chatHeader": "NmNIFKTt2ssieguPNlT7",
	"chatTitle": "_2Dbt2yHzObBLMf8ih2jezJ",
	"chatPanel": "_3VA496_b3tHMTe2Z3P-71j",
	"navTitle": "_2PH1cH-xMw5oaQScdT-1vX",
	"messageSender": "_1xMRdhbdJPpy3o84QtsbYg",
	"messagePreview": "_3UJ9s2ILj4mMEAd8FNFh74",
	"chatContacts": "_37OT1mjdPWwe4RhXEipCR_",
	"chatMessageOpen": "_2mHGNQpk8FvDRbv6sMbv4S",
	"chatMessages": "_2Gb6hqkyooHk0zDcEFjdWV",
	"messageBody": "_1Vzpz_go9JkcTkWsyQkzJB",
	"fromMe": "_3MHkTt3oqEjm7uciHowNOP",
	"chatFooter": "_1vF2XdxM08Cxq7PSrZ-Sed",
	"messagesTitle": "QB_CsR7Nzy0dTDnm1-ksH",
	"chatSidebarUserGroup": "p88BzVX-U9iOrLx7MQ7OB",
	"messageItem": "_2FY995af5LXRr5pUFBBwMD"
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n._14IZ-GAAn0K48_chyfKTuc {\n  z-index: 100;\n  box-shadow: 0 0 10px #e8e8e8; }\n\n.rhRtYsD4NPw_6QoKPRjXh {\n  padding: 6px 0 6px 1rem;\n  margin-left: 10px;\n  display: inline-block;\n  top: 2px;\n  width: auto; }\n  .rhRtYsD4NPw_6QoKPRjXh .gNT7JL-wnvx2tdwFkXhc7 {\n    position: relative;\n    display: inline;\n    border: none;\n    background-color: #fff;\n    transition: background-color ease-in-out 0.15s; }\n  .rhRtYsD4NPw_6QoKPRjXh input {\n    border: none;\n    padding: 0.6rem 0.85rem 0.6rem 0;\n    display: inline !important;\n    width: 250px !important;\n    top: 2px; }\n\n.D_wEYfHRA_-9PPzdp5cvv {\n  width: 30px; }\n\n._7YWC8RvYYLNpVGDEuf3QL {\n  position: absolute;\n  right: 11px;\n  top: 35px;\n  z-index: 20;\n  margin-top: 3px;\n  padding: 5px 0;\n  cursor: pointer; }\n  ._7YWC8RvYYLNpVGDEuf3QL::before {\n    content: ' ';\n    position: absolute;\n    top: 0;\n    right: 18px;\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-bottom: 5px solid #343434; }\n  ._7YWC8RvYYLNpVGDEuf3QL .AzDEUqSRBew4fC3VSgRr {\n    min-width: 120px;\n    padding: 8px;\n    font-size: 12px;\n    border-radius: 0.25rem;\n    text-decoration: none;\n    background-color: #343434;\n    color: #fff; }\n  ._7YWC8RvYYLNpVGDEuf3QL .vF7QMOo46xQBvOnwVWgWS {\n    margin-top: 5px;\n    margin-bottom: 0;\n    color: #777; }\n  ._7YWC8RvYYLNpVGDEuf3QL .YtTHqa4COxI1SYGGWz6Hq {\n    margin: 0;\n    font-weight: 600;\n    line-height: 28px;\n    font-size: 0.875rem; }\n    ._7YWC8RvYYLNpVGDEuf3QL .YtTHqa4COxI1SYGGWz6Hq span {\n      margin-right: 5px; }\n\n._1hWX6XPt4XZC0hj9d0fTij {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 700;\n  font-size: 1.25rem;\n  pointer-events: none; }\n  ._1hWX6XPt4XZC0hj9d0fTij i {\n    font-size: 10px; }\n\n.gt755reuXP5Wr09wBlnYq .dropdown-menu {\n  left: auto !important;\n  right: 0 !important;\n  top: 50px !important; }\n\n._1VckUO1Cwtfp5XdhgofC2 {\n  width: min-content; }\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Header/Header.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG;AACH;EACE,aAAa;EACb,6BAA6B,EAAE;;AAEjC;EACE,wBAAwB;EACxB,kBAAkB;EAClB,sBAAsB;EACtB,SAAS;EACT,YAAY,EAAE;EACd;IACE,mBAAmB;IACnB,gBAAgB;IAChB,aAAa;IACb,uBAAuB;IACvB,+CAA+C,EAAE;EACnD;IACE,aAAa;IACb,iCAAiC;IACjC,2BAA2B;IAC3B,wBAAwB;IACxB,SAAS,EAAE;;AAEf;EACE,YAAY,EAAE;;AAEhB;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;EACV,YAAY;EACZ,gBAAgB;EAChB,eAAe;EACf,gBAAgB,EAAE;EAClB;IACE,aAAa;IACb,mBAAmB;IACnB,OAAO;IACP,YAAY;IACZ,SAAS;IACT,UAAU;IACV,mCAAmC;IACnC,oCAAoC;IACpC,iCAAiC,EAAE;EACrC;IACE,iBAAiB;IACjB,aAAa;IACb,gBAAgB;IAChB,uBAAuB;IACvB,sBAAsB;IACtB,0BAA0B;IAC1B,YAAY,EAAE;EAChB;IACE,gBAAgB;IAChB,iBAAiB;IACjB,YAAY,EAAE;EAChB;IACE,UAAU;IACV,iBAAiB;IACjB,kBAAkB;IAClB,oBAAoB,EAAE;IACtB;MACE,kBAAkB,EAAE;;AAE1B;EACE,mBAAmB;EACnB,QAAQ;EACR,SAAS;EACT,OAAO;EACP,UAAU;EACV,cAAc;EACd,wBAAwB;EACxB,oBAAoB;EACpB,iBAAiB;EACjB,mBAAmB;EACnB,qBAAqB,EAAE;EACvB;IACE,gBAAgB,EAAE;;AAEtB;EACE,sBAAsB;EACtB,oBAAoB;EACpB,qBAAqB,EAAE;;AAEzB;EACE,mBAAmB,EAAE","file":"Header.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.root {\n  z-index: 100;\n  box-shadow: 0 0 10px #e8e8e8; }\n\n.navbarForm {\n  padding: 6px 0 6px 1rem;\n  margin-left: 10px;\n  display: inline-block;\n  top: 2px;\n  width: auto; }\n  .navbarForm .inputAddon {\n    position: relative;\n    display: inline;\n    border: none;\n    background-color: #fff;\n    transition: background-color ease-in-out 0.15s; }\n  .navbarForm input {\n    border: none;\n    padding: 0.6rem 0.85rem 0.6rem 0;\n    display: inline !important;\n    width: 250px !important;\n    top: 2px; }\n\n.avatar {\n  width: 30px; }\n\n.chatNotification {\n  position: absolute;\n  right: 11px;\n  top: 35px;\n  z-index: 20;\n  margin-top: 3px;\n  padding: 5px 0;\n  cursor: pointer; }\n  .chatNotification::before {\n    content: ' ';\n    position: absolute;\n    top: 0;\n    right: 18px;\n    width: 0;\n    height: 0;\n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    border-bottom: 5px solid #343434; }\n  .chatNotification .chatNotificationInner {\n    min-width: 120px;\n    padding: 8px;\n    font-size: 12px;\n    border-radius: 0.25rem;\n    text-decoration: none;\n    background-color: #343434;\n    color: #fff; }\n  .chatNotification .text {\n    margin-top: 5px;\n    margin-bottom: 0;\n    color: #777; }\n  .chatNotification .title {\n    margin: 0;\n    font-weight: 600;\n    line-height: 28px;\n    font-size: 0.875rem; }\n    .chatNotification .title span {\n      margin-right: 5px; }\n\n.navbarBrand {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-weight: 700;\n  font-size: 1.25rem;\n  pointer-events: none; }\n  .navbarBrand i {\n    font-size: 10px; }\n\n.notificationsMenu :global .dropdown-menu {\n  left: auto !important;\n  right: 0 !important;\n  top: 50px !important; }\n\n.notificationsWrapper {\n  width: min-content; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "_14IZ-GAAn0K48_chyfKTuc",
	"navbarForm": "rhRtYsD4NPw_6QoKPRjXh",
	"inputAddon": "gNT7JL-wnvx2tdwFkXhc7",
	"avatar": "D_wEYfHRA_-9PPzdp5cvv",
	"chatNotification": "_7YWC8RvYYLNpVGDEuf3QL",
	"chatNotificationInner": "AzDEUqSRBew4fC3VSgRr",
	"text": "vF7QMOo46xQBvOnwVWgWS",
	"title": "YtTHqa4COxI1SYGGWz6Hq",
	"navbarBrand": "_1hWX6XPt4XZC0hj9d0fTij",
	"notificationsMenu": "gt755reuXP5Wr09wBlnYq",
	"notificationsWrapper": "_1VckUO1Cwtfp5XdhgofC2"
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n._1fqjz2buWIUzrzyTQrFCu0 {\n  height: 100%;\n  position: relative;\n  left: 0;\n  transition: left 0.3s ease-in-out; }\n  ._1fqjz2buWIUzrzyTQrFCu0._3Pvb-g2RHCBpmBhAkvtPzN {\n    left: -254px; }\n\n._15WnwfQ6H4T0j8H2dCvUFO {\n  position: relative;\n  min-height: 100%;\n  display: flex;\n  margin-left: 50px;\n  flex-direction: column;\n  left: 154px;\n  right: 0;\n  transition: left 0.3s ease-in-out; }\n  @media (max-width: 767px) {\n    ._15WnwfQ6H4T0j8H2dCvUFO {\n      margin-left: 0;\n      left: 204px; } }\n\n._2jwTkWnOcvvWC4jBY4Xf9t div._15WnwfQ6H4T0j8H2dCvUFO {\n  left: 0; }\n\n.rnx0bryL2GhsF3RegtQNX ._15WnwfQ6H4T0j8H2dCvUFO {\n  transition: none;\n  left: 0;\n  margin-left: 204px; }\n\n.sp2cJvb25OJbKgRt7nms7 {\n  position: relative;\n  flex-grow: 1;\n  padding: 40px 40px 60px;\n  background-color: #f5f5f5; }\n  @media (max-width: 767px) {\n    .sp2cJvb25OJbKgRt7nms7 {\n      padding: 20px 15px; } }\n  @media (min-width: 576px) {\n    .sp2cJvb25OJbKgRt7nms7 {\n      user-select: auto !important; } }\n\n.DJBOrKSj1Qsn0TAdjrXym {\n  position: absolute;\n  bottom: 15px;\n  color: #777; }\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Layout/Layout.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG;AACH;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,kCAAkC,EAAE;EACpC;IACE,aAAa,EAAE;;AAEnB;EACE,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,kBAAkB;EAClB,uBAAuB;EACvB,YAAY;EACZ,SAAS;EACT,kCAAkC,EAAE;EACpC;IACE;MACE,eAAe;MACf,YAAY,EAAE,EAAE;;AAEtB;EACE,QAAQ,EAAE;;AAEZ;EACE,iBAAiB;EACjB,QAAQ;EACR,mBAAmB,EAAE;;AAEvB;EACE,mBAAmB;EACnB,aAAa;EACb,wBAAwB;EACxB,0BAA0B,EAAE;EAC5B;IACE;MACE,mBAAmB,EAAE,EAAE;EAC3B;IACE;MACE,6BAA6B,EAAE,EAAE;;AAEvC;EACE,mBAAmB;EACnB,aAAa;EACb,YAAY,EAAE","file":"Layout.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.root {\n  height: 100%;\n  position: relative;\n  left: 0;\n  transition: left 0.3s ease-in-out; }\n  .root.chatOpen {\n    left: -254px; }\n\n.wrap {\n  position: relative;\n  min-height: 100%;\n  display: flex;\n  margin-left: 50px;\n  flex-direction: column;\n  left: 154px;\n  right: 0;\n  transition: left 0.3s ease-in-out; }\n  @media (max-width: 767px) {\n    .wrap {\n      margin-left: 0;\n      left: 204px; } }\n\n.sidebarClose div.wrap {\n  left: 0; }\n\n.sidebarStatic .wrap {\n  transition: none;\n  left: 0;\n  margin-left: 204px; }\n\n.content {\n  position: relative;\n  flex-grow: 1;\n  padding: 40px 40px 60px;\n  background-color: #f5f5f5; }\n  @media (max-width: 767px) {\n    .content {\n      padding: 20px 15px; } }\n  @media (min-width: 576px) {\n    .content {\n      user-select: auto !important; } }\n\n.contentFooter {\n  position: absolute;\n  bottom: 15px;\n  color: #777; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "_1fqjz2buWIUzrzyTQrFCu0",
	"chatOpen": "_3Pvb-g2RHCBpmBhAkvtPzN",
	"wrap": "_15WnwfQ6H4T0j8H2dCvUFO",
	"sidebarClose": "_2jwTkWnOcvvWC4jBY4Xf9t",
	"sidebarStatic": "rnx0bryL2GhsF3RegtQNX",
	"content": "sp2cJvb25OJbKgRt7nms7",
	"contentFooter": "DJBOrKSj1Qsn0TAdjrXym"
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n._15hu5SwzWhSlmbcK9Mli4X {\n  height: 100%;\n  border: none; }\n  @media (min-width: 768px) {\n    ._15hu5SwzWhSlmbcK9Mli4X {\n      width: 333px; } }\n\n._1dtQfd-DGhoAiWdpDWGaFc {\n  background-color: #fff;\n  border-radius: 0; }\n\n._1laHizyPsQ_FJjxwThP-61 {\n  padding-top: 14px;\n  padding-bottom: 14px;\n  border-top: none; }\n\n._1gkCtl90-qFy_0p7Gr9LTr {\n  color: #555;\n  outline: none; }\n  ._1gkCtl90-qFy_0p7Gr9LTr i::before {\n    top: 2px; }\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Notifications/Notifications.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG;AACH;EACE,aAAa;EACb,aAAa,EAAE;EACf;IACE;MACE,aAAa,EAAE,EAAE;;AAEvB;EACE,uBAAuB;EACvB,iBAAiB,EAAE;;AAErB;EACE,kBAAkB;EAClB,qBAAqB;EACrB,iBAAiB,EAAE;;AAErB;EACE,YAAY;EACZ,cAAc,EAAE;EAChB;IACE,SAAS,EAAE","file":"Notifications.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.notifications {\n  height: 100%;\n  border: none; }\n  @media (min-width: 768px) {\n    .notifications {\n      width: 333px; } }\n\n.cardHeader {\n  background-color: #fff;\n  border-radius: 0; }\n\n.cardFooter {\n  padding-top: 14px;\n  padding-bottom: 14px;\n  border-top: none; }\n\n.btnNotificationsReload {\n  color: #555;\n  outline: none; }\n  .btnNotificationsReload i::before {\n    top: 2px; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"notifications": "_15hu5SwzWhSlmbcK9Mli4X",
	"cardHeader": "_1dtQfd-DGhoAiWdpDWGaFc",
	"cardFooter": "_1laHizyPsQ_FJjxwThP-61",
	"btnNotificationsReload": "_1gkCtl90-qFy_0p7Gr9LTr"
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.ntUaZNlIyuxxCfPxYrJH9 {\n  display: block;\n  height: 320px;\n  overflow-y: scroll; }\n  .ntUaZNlIyuxxCfPxYrJH9 ._32TzntQaPIkrtmDyVCx2_g:first-child {\n    border: none; }\n\n._32TzntQaPIkrtmDyVCx2_g {\n  transition: background-color 0.15s ease-in-out;\n  text-decoration: none;\n  color: #555;\n  border-left: none;\n  border-right: none;\n  display: block; }\n  ._32TzntQaPIkrtmDyVCx2_g .progress {\n    transition: background 0.15s ease-in-out; }\n    ._32TzntQaPIkrtmDyVCx2_g .progress:hover {\n      background: #000; }\n  ._32TzntQaPIkrtmDyVCx2_g:hover {\n    background-color: #f8f9fa; }\n    ._32TzntQaPIkrtmDyVCx2_g:hover .progress {\n      background: #fff !important; }\n  ._32TzntQaPIkrtmDyVCx2_g:first-child {\n    border-top: none;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0; }\n  ._32TzntQaPIkrtmDyVCx2_g:last-child {\n    border-bottom: none;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0; }\n\n._2McnF_oDOs4h4u6FhhNXvd {\n  margin-right: 1rem;\n  float: left; }\n  ._2McnF_oDOs4h4u6FhhNXvd::after {\n    display: block;\n    clear: both;\n    content: \"\"; }\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Notifications/notifications-demo/ListGroup.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG;AACH;EACE,eAAe;EACf,cAAc;EACd,mBAAmB,EAAE;EACrB;IACE,aAAa,EAAE;;AAEnB;EACE,+CAA+C;EAC/C,sBAAsB;EACtB,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,eAAe,EAAE;EACjB;IACE,yCAAyC,EAAE;IAC3C;MACE,iBAAiB,EAAE;EACvB;IACE,0BAA0B,EAAE;IAC5B;MACE,4BAA4B,EAAE;EAClC;IACE,iBAAiB;IACjB,2BAA2B;IAC3B,0BAA0B,EAAE;EAC9B;IACE,oBAAoB;IACpB,8BAA8B;IAC9B,6BAA6B,EAAE;;AAEnC;EACE,mBAAmB;EACnB,YAAY,EAAE;EACd;IACE,eAAe;IACf,YAAY;IACZ,YAAY,EAAE","file":"ListGroup.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.listGroup {\n  display: block;\n  height: 320px;\n  overflow-y: scroll; }\n  .listGroup .listGroupItem:first-child {\n    border: none; }\n\n.listGroupItem {\n  transition: background-color 0.15s ease-in-out;\n  text-decoration: none;\n  color: #555;\n  border-left: none;\n  border-right: none;\n  display: block; }\n  .listGroupItem :global .progress {\n    transition: background 0.15s ease-in-out; }\n    .listGroupItem :global .progress:hover {\n      background: #000; }\n  .listGroupItem:hover {\n    background-color: #f8f9fa; }\n    .listGroupItem:hover :global .progress {\n      background: #fff !important; }\n  .listGroupItem:first-child {\n    border-top: none;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0; }\n  .listGroupItem:last-child {\n    border-bottom: none;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0; }\n\n.notificationIcon {\n  margin-right: 1rem;\n  float: left; }\n  .notificationIcon::after {\n    display: block;\n    clear: both;\n    content: \"\"; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"listGroup": "ntUaZNlIyuxxCfPxYrJH9",
	"listGroupItem": "_32TzntQaPIkrtmDyVCx2_g",
	"notificationIcon": "_2McnF_oDOs4h4u6FhhNXvd"
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n._13htXow5U1x1XE1IRwRtl_ {\n  overflow-x: hidden; }\n  @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n    ._13htXow5U1x1XE1IRwRtl_ {\n      font-size: 1.1rem; } }\n  ._13htXow5U1x1XE1IRwRtl_ a {\n    display: block;\n    color: #aaa;\n    text-decoration: none;\n    cursor: pointer; }\n  ._13htXow5U1x1XE1IRwRtl_:last-child > a {\n    border-bottom: 1px solid transparent; }\n  ._13htXow5U1x1XE1IRwRtl_ > a {\n    position: relative;\n    padding-left: 50px;\n    line-height: 35px;\n    border-top: 1px solid transparent; }\n    ._13htXow5U1x1XE1IRwRtl_ > a._1uBAvqNXgD5ODv7jcS8wMg {\n      background-color: #111; }\n    ._13htXow5U1x1XE1IRwRtl_ > a:hover {\n      background-color: #111; }\n    ._13htXow5U1x1XE1IRwRtl_ > a > i {\n      margin-right: 7px; }\n    @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n      ._13htXow5U1x1XE1IRwRtl_ > a {\n        line-height: 44px; } }\n  ._13htXow5U1x1XE1IRwRtl_ .NADqRIwM9waQiUmtO_FlK {\n    display: block;\n    position: absolute;\n    top: 3px;\n    left: 11px;\n    width: 28px;\n    height: 28px;\n    line-height: 28px;\n    text-align: center; }\n    ._13htXow5U1x1XE1IRwRtl_ .NADqRIwM9waQiUmtO_FlK i {\n      color: rgba(170, 170, 170, 0.7); }\n    @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n      ._13htXow5U1x1XE1IRwRtl_ .NADqRIwM9waQiUmtO_FlK {\n        top: 8px; } }\n  ._13htXow5U1x1XE1IRwRtl_ ._15mDBUupiaduC8lYp6Ub19 {\n    float: right;\n    line-height: 8px;\n    margin-top: 8px;\n    margin-right: 15px;\n    padding: 7px;\n    border-radius: 0.2rem; }\n\n.hkGWGYt_o7l7YR9WaI2mf {\n  font-weight: 600;\n  color: #f0b518; }\n\n._3CAoUw15b42VJ1oY85j9HG ._3R5BJD9CRTQkp6VxjEuukG {\n  transform: rotate(-90deg); }\n\n._3R5BJD9CRTQkp6VxjEuukG {\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 15px;\n  transition: transform 0.3s ease-in-out; }\n\na._1uBAvqNXgD5ODv7jcS8wMg {\n  color: #f2be35; }\n  a._1uBAvqNXgD5ODv7jcS8wMg .NADqRIwM9waQiUmtO_FlK {\n    border-radius: 50%;\n    background-color: #f2be35; }\n    a._1uBAvqNXgD5ODv7jcS8wMg .NADqRIwM9waQiUmtO_FlK i {\n      color: #242424; }\n\n._25CpjbEsbnzr68duV1lu0s {\n  border: none;\n  box-shadow: none;\n  margin: 0;\n  border-radius: 0;\n  background-color: #313131; }\n  ._25CpjbEsbnzr68duV1lu0s::before {\n    content: '';\n    display: block;\n    padding-top: 0.5rem; }\n  ._25CpjbEsbnzr68duV1lu0s::after {\n    content: '';\n    display: block;\n    padding-bottom: 0.5rem; }\n  ._25CpjbEsbnzr68duV1lu0s a._1uBAvqNXgD5ODv7jcS8wMg {\n    color: #fff;\n    font-weight: 300; }\n  ._25CpjbEsbnzr68duV1lu0s ul {\n    padding-left: 0;\n    font-size: 13px; }\n    @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n      ._25CpjbEsbnzr68duV1lu0s ul {\n        font-size: 14px; } }\n    ._25CpjbEsbnzr68duV1lu0s ul li {\n      list-style: none; }\n    ._25CpjbEsbnzr68duV1lu0s ul a {\n      padding: 4px 20px 4px 36px; }\n      ._25CpjbEsbnzr68duV1lu0s ul a:hover {\n        background-color: #111; }\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Sidebar/LinksGroup/LinksGroup.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG;AACH;EACE,mBAAmB,EAAE;EACrB;IACE;MACE,kBAAkB,EAAE,EAAE;EAC1B;IACE,eAAe;IACf,YAAY;IACZ,sBAAsB;IACtB,gBAAgB,EAAE;EACpB;IACE,qCAAqC,EAAE;EACzC;IACE,mBAAmB;IACnB,mBAAmB;IACnB,kBAAkB;IAClB,kCAAkC,EAAE;IACpC;MACE,uBAAuB,EAAE;IAC3B;MACE,uBAAuB,EAAE;IAC3B;MACE,kBAAkB,EAAE;IACtB;MACE;QACE,kBAAkB,EAAE,EAAE;EAC5B;IACE,eAAe;IACf,mBAAmB;IACnB,SAAS;IACT,WAAW;IACX,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,mBAAmB,EAAE;IACrB;MACE,gCAAgC,EAAE;IACpC;MACE;QACE,SAAS,EAAE,EAAE;EACnB;IACE,aAAa;IACb,iBAAiB;IACjB,gBAAgB;IAChB,mBAAmB;IACnB,aAAa;IACb,sBAAsB,EAAE;;AAE5B;EACE,iBAAiB;EACjB,eAAe,EAAE;;AAEnB;EACE,0BAA0B,EAAE;;AAE9B;EACE,cAAc;EACd,oBAAoB;EACpB,kBAAkB;EAClB,mBAAmB;EACnB,uCAAuC,EAAE;;AAE3C;EACE,eAAe,EAAE;EACjB;IACE,mBAAmB;IACnB,0BAA0B,EAAE;IAC5B;MACE,eAAe,EAAE;;AAEvB;EACE,aAAa;EACb,iBAAiB;EACjB,UAAU;EACV,iBAAiB;EACjB,0BAA0B,EAAE;EAC5B;IACE,YAAY;IACZ,eAAe;IACf,oBAAoB,EAAE;EACxB;IACE,YAAY;IACZ,eAAe;IACf,uBAAuB,EAAE;EAC3B;IACE,YAAY;IACZ,iBAAiB,EAAE;EACrB;IACE,gBAAgB;IAChB,gBAAgB,EAAE;IAClB;MACE;QACE,gBAAgB,EAAE,EAAE;IACxB;MACE,iBAAiB,EAAE;IACrB;MACE,2BAA2B,EAAE;MAC7B;QACE,uBAAuB,EAAE","file":"LinksGroup.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.headerLink {\n  overflow-x: hidden; }\n  @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n    .headerLink {\n      font-size: 1.1rem; } }\n  .headerLink a {\n    display: block;\n    color: #aaa;\n    text-decoration: none;\n    cursor: pointer; }\n  .headerLink:last-child > a {\n    border-bottom: 1px solid transparent; }\n  .headerLink > a {\n    position: relative;\n    padding-left: 50px;\n    line-height: 35px;\n    border-top: 1px solid transparent; }\n    .headerLink > a.headerLinkActive {\n      background-color: #111; }\n    .headerLink > a:hover {\n      background-color: #111; }\n    .headerLink > a > i {\n      margin-right: 7px; }\n    @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n      .headerLink > a {\n        line-height: 44px; } }\n  .headerLink .icon {\n    display: block;\n    position: absolute;\n    top: 3px;\n    left: 11px;\n    width: 28px;\n    height: 28px;\n    line-height: 28px;\n    text-align: center; }\n    .headerLink .icon i {\n      color: rgba(170, 170, 170, 0.7); }\n    @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n      .headerLink .icon {\n        top: 8px; } }\n  .headerLink .badge {\n    float: right;\n    line-height: 8px;\n    margin-top: 8px;\n    margin-right: 15px;\n    padding: 7px;\n    border-radius: 0.2rem; }\n\n.headerLabel {\n  font-weight: 600;\n  color: #f0b518; }\n\n.collapsed .caret {\n  transform: rotate(-90deg); }\n\n.caret {\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: 15px;\n  transition: transform 0.3s ease-in-out; }\n\na.headerLinkActive {\n  color: #f2be35; }\n  a.headerLinkActive .icon {\n    border-radius: 50%;\n    background-color: #f2be35; }\n    a.headerLinkActive .icon i {\n      color: #242424; }\n\n.panel {\n  border: none;\n  box-shadow: none;\n  margin: 0;\n  border-radius: 0;\n  background-color: #313131; }\n  .panel::before {\n    content: '';\n    display: block;\n    padding-top: 0.5rem; }\n  .panel::after {\n    content: '';\n    display: block;\n    padding-bottom: 0.5rem; }\n  .panel a.headerLinkActive {\n    color: #fff;\n    font-weight: 300; }\n  .panel ul {\n    padding-left: 0;\n    font-size: 13px; }\n    @media (min-width: 992px) and (min-height: 670px), (max-width: 767px) {\n      .panel ul {\n        font-size: 14px; } }\n    .panel ul li {\n      list-style: none; }\n    .panel ul a {\n      padding: 4px 20px 4px 36px; }\n      .panel ul a:hover {\n        background-color: #111; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"headerLink": "_13htXow5U1x1XE1IRwRtl_",
	"headerLinkActive": "_1uBAvqNXgD5ODv7jcS8wMg",
	"icon": "NADqRIwM9waQiUmtO_FlK",
	"badge": "_15mDBUupiaduC8lYp6Ub19",
	"headerLabel": "hkGWGYt_o7l7YR9WaI2mf",
	"collapsed": "_3CAoUw15b42VJ1oY85j9HG",
	"caret": "_3R5BJD9CRTQkp6VxjEuukG",
	"panel": "_25CpjbEsbnzr68duV1lu0s"
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n._1Q-uCUtgMZHAWNxiKjefcw {\n  width: 204px;\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  background-color: #242424;\n  color: #aaa;\n  overflow-y: auto; }\n  ._1Q-uCUtgMZHAWNxiKjefcw::-webkit-scrollbar {\n    height: 8px;\n    width: 4px; }\n  ._1Q-uCUtgMZHAWNxiKjefcw::-webkit-scrollbar-thumb {\n    border: none;\n    background-color: #777;\n    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1); }\n\n._1LzH0LcdHCZ5iriUoxCbpC {\n  margin: 11px 0 19px;\n  font-size: 18px;\n  width: 100%;\n  font-weight: 700;\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  transition: width 0.3s ease-in-out; }\n  ._1LzH0LcdHCZ5iriUoxCbpC a {\n    text-decoration: none;\n    color: #fff; }\n\n._1R4UhPsiA07Srs_CiVTo3H ._1LzH0LcdHCZ5iriUoxCbpC {\n  width: 50px; }\n\n._1n-gLdy1kjjq66Joq7HRYI ._1LzH0LcdHCZ5iriUoxCbpC {\n  width: 100%;\n  transition: none; }\n\n._3xF6Qom7VNGSiKlSh2HJcw {\n  padding: 30px 0 10px;\n  overflow-y: auto; }\n\n._3gE5pW1P0cNdDpissrvsik {\n  margin: 35px 0 5px 11px;\n  font-size: 1.1rem;\n  transition: opacity 0.3s ease-in-out; }\n  @media (min-width: 992px) {\n    ._3gE5pW1P0cNdDpissrvsik {\n      opacity: 1; } }\n\n._1R4UhPsiA07Srs_CiVTo3H ._3gE5pW1P0cNdDpissrvsik {\n  opacity: 0; }\n\n._1n-gLdy1kjjq66Joq7HRYI ._3gE5pW1P0cNdDpissrvsik {\n  opacity: 1;\n  transition: none; }\n\n._2cKr-VghCPjZ3VmZiXNc1m {\n  color: #aaa;\n  float: right;\n  margin-right: 15px;\n  margin-top: -1px; }\n\n._1H1k3lPZu8T1iiW9KOESW3 {\n  opacity: 1;\n  transition: opacity 0.3s ease-in-out; }\n\n._1R4UhPsiA07Srs_CiVTo3H ._1H1k3lPZu8T1iiW9KOESW3 {\n  opacity: 0; }\n\n._1n-gLdy1kjjq66Joq7HRYI ._1H1k3lPZu8T1iiW9KOESW3 {\n  transition: none;\n  opacity: 1; }\n\n._10TvvQcnP6ii6uMfB7_5Ac {\n  font-size: 9px; }\n\n.kvS7ZT5ihz5O2ChaUPpvy {\n  list-style-type: none;\n  padding: 11px;\n  padding-right: 15px; }\n  .kvS7ZT5ihz5O2ChaUPpvy > li + li {\n    margin-top: 7px; }\n  .kvS7ZT5ihz5O2ChaUPpvy li > a {\n    color: #eee;\n    text-decoration: none; }\n    .kvS7ZT5ihz5O2ChaUPpvy li > a > i {\n      font-size: 11px;\n      vertical-align: 1px;\n      transition: margin-left 0.3s ease-in-out; }\n\n._1R4UhPsiA07Srs_CiVTo3H .kvS7ZT5ihz5O2ChaUPpvy > li > a > i {\n  margin-left: 8px;\n  transition: margin-left 0.3s ease-in-out; }\n\n._1n-gLdy1kjjq66Joq7HRYI .kvS7ZT5ihz5O2ChaUPpvy > li > a > i {\n  transition: none;\n  margin-left: 0; }\n\n._2K-KpHlDtuYfs0V4LusPRb {\n  transition: opacity 0.3s ease-in-out;\n  opacity: 1; }\n\n._1R4UhPsiA07Srs_CiVTo3H ._2K-KpHlDtuYfs0V4LusPRb {\n  opacity: 0; }\n\n._1n-gLdy1kjjq66Joq7HRYI ._2K-KpHlDtuYfs0V4LusPRb {\n  opacity: 1;\n  transition: none; }\n\n.J6_b2sf94zc_uVyJEligk {\n  background: transparent;\n  margin-bottom: 0;\n  padding: 0.5rem 11px;\n  padding-right: 15px; }\n\n._2C0t2OIfB4-YhMWDCyxCtD {\n  background: #3e3e3e; }\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Sidebar/Sidebar.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG;AACH;EACE,aAAa;EACb,gBAAgB;EAChB,QAAQ;EACR,OAAO;EACP,UAAU;EACV,0BAA0B;EAC1B,YAAY;EACZ,iBAAiB,EAAE;EACnB;IACE,YAAY;IACZ,WAAW,EAAE;EACf;IACE,aAAa;IACb,uBAAuB;IACvB,+CAA+C,EAAE;;AAErD;EACE,oBAAoB;EACpB,gBAAgB;EAChB,YAAY;EACZ,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;EACxB,cAAc;EACd,mCAAmC,EAAE;EACrC;IACE,sBAAsB;IACtB,YAAY,EAAE;;AAElB;EACE,YAAY,EAAE;;AAEhB;EACE,YAAY;EACZ,iBAAiB,EAAE;;AAErB;EACE,qBAAqB;EACrB,iBAAiB,EAAE;;AAErB;EACE,wBAAwB;EACxB,kBAAkB;EAClB,qCAAqC,EAAE;EACvC;IACE;MACE,WAAW,EAAE,EAAE;;AAErB;EACE,WAAW,EAAE;;AAEf;EACE,WAAW;EACX,iBAAiB,EAAE;;AAErB;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,iBAAiB,EAAE;;AAErB;EACE,WAAW;EACX,qCAAqC,EAAE;;AAEzC;EACE,WAAW,EAAE;;AAEf;EACE,iBAAiB;EACjB,WAAW,EAAE;;AAEf;EACE,eAAe,EAAE;;AAEnB;EACE,sBAAsB;EACtB,cAAc;EACd,oBAAoB,EAAE;EACtB;IACE,gBAAgB,EAAE;EACpB;IACE,YAAY;IACZ,sBAAsB,EAAE;IACxB;MACE,gBAAgB;MAChB,oBAAoB;MACpB,yCAAyC,EAAE;;AAEjD;EACE,iBAAiB;EACjB,yCAAyC,EAAE;;AAE7C;EACE,iBAAiB;EACjB,eAAe,EAAE;;AAEnB;EACE,qCAAqC;EACrC,WAAW,EAAE;;AAEf;EACE,WAAW,EAAE;;AAEf;EACE,WAAW;EACX,iBAAiB,EAAE;;AAErB;EACE,wBAAwB;EACxB,iBAAiB;EACjB,qBAAqB;EACrB,oBAAoB,EAAE;;AAExB;EACE,oBAAoB,EAAE","file":"Sidebar.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.root {\n  width: 204px;\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  background-color: #242424;\n  color: #aaa;\n  overflow-y: auto; }\n  .root::-webkit-scrollbar {\n    height: 8px;\n    width: 4px; }\n  .root::-webkit-scrollbar-thumb {\n    border: none;\n    background-color: #777;\n    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1); }\n\n.logo {\n  margin: 11px 0 19px;\n  font-size: 18px;\n  width: 100%;\n  font-weight: 700;\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  transition: width 0.3s ease-in-out; }\n  .logo a {\n    text-decoration: none;\n    color: #fff; }\n\n.sidebarClose .logo {\n  width: 50px; }\n\n.staticSidebar .logo {\n  width: 100%;\n  transition: none; }\n\n.nav {\n  padding: 30px 0 10px;\n  overflow-y: auto; }\n\n.navTitle {\n  margin: 35px 0 5px 11px;\n  font-size: 1.1rem;\n  transition: opacity 0.3s ease-in-out; }\n  @media (min-width: 992px) {\n    .navTitle {\n      opacity: 1; } }\n\n.sidebarClose .navTitle {\n  opacity: 0; }\n\n.staticSidebar .navTitle {\n  opacity: 1;\n  transition: none; }\n\n.actionLink {\n  color: #aaa;\n  float: right;\n  margin-right: 15px;\n  margin-top: -1px; }\n\n.labelName {\n  opacity: 1;\n  transition: opacity 0.3s ease-in-out; }\n\n.sidebarClose .labelName {\n  opacity: 0; }\n\n.staticSidebar .labelName {\n  transition: none;\n  opacity: 1; }\n\n.glyphiconSm {\n  font-size: 9px; }\n\n.sidebarLabels {\n  list-style-type: none;\n  padding: 11px;\n  padding-right: 15px; }\n  .sidebarLabels > li + li {\n    margin-top: 7px; }\n  .sidebarLabels li > a {\n    color: #eee;\n    text-decoration: none; }\n    .sidebarLabels li > a > i {\n      font-size: 11px;\n      vertical-align: 1px;\n      transition: margin-left 0.3s ease-in-out; }\n\n.sidebarClose .sidebarLabels > li > a > i {\n  margin-left: 8px;\n  transition: margin-left 0.3s ease-in-out; }\n\n.staticSidebar .sidebarLabels > li > a > i {\n  transition: none;\n  margin-left: 0; }\n\n.sidebarAlerts {\n  transition: opacity 0.3s ease-in-out;\n  opacity: 1; }\n\n.sidebarClose .sidebarAlerts {\n  opacity: 0; }\n\n.staticSidebar .sidebarAlerts {\n  opacity: 1;\n  transition: none; }\n\n.sidebarAlert {\n  background: transparent;\n  margin-bottom: 0;\n  padding: 0.5rem 11px;\n  padding-right: 15px; }\n\n.sidebarProgress {\n  background: #3e3e3e; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "_1Q-uCUtgMZHAWNxiKjefcw",
	"logo": "_1LzH0LcdHCZ5iriUoxCbpC",
	"sidebarClose": "_1R4UhPsiA07Srs_CiVTo3H",
	"staticSidebar": "_1n-gLdy1kjjq66Joq7HRYI",
	"nav": "_3xF6Qom7VNGSiKlSh2HJcw",
	"navTitle": "_3gE5pW1P0cNdDpissrvsik",
	"actionLink": "_2cKr-VghCPjZ3VmZiXNc1m",
	"labelName": "_1H1k3lPZu8T1iiW9KOESW3",
	"glyphiconSm": "_10TvvQcnP6ii6uMfB7_5Ac",
	"sidebarLabels": "kvS7ZT5ihz5O2ChaUPpvy",
	"sidebarAlerts": "_2K-KpHlDtuYfs0V4LusPRb",
	"sidebarAlert": "J6_b2sf94zc_uVyJEligk",
	"sidebarProgress": "_2C0t2OIfB4-YhMWDCyxCtD"
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n._1b-TwJnyBlo792yW69YuKH {\n  margin-top: 0;\n  color: #444; }\n  ._1b-TwJnyBlo792yW69YuKH::after {\n    display: block;\n    clear: both;\n    content: \"\"; }\n\n.HtgALwJ33kf6TZ7nh44cX {\n  display: block;\n  position: relative;\n  margin-bottom: 30px;\n  padding: 15px 20px;\n  background: #fff;\n  border-radius: 0.25rem;\n  box-shadow: 0 0 10px #e8e8e8; }\n  .HtgALwJ33kf6TZ7nh44cX > header {\n    margin: -15px -20px;\n    padding: 15px 20px; }\n    .HtgALwJ33kf6TZ7nh44cX > header h1,\n    .HtgALwJ33kf6TZ7nh44cX > header h2,\n    .HtgALwJ33kf6TZ7nh44cX > header h3,\n    .HtgALwJ33kf6TZ7nh44cX > header h4,\n    .HtgALwJ33kf6TZ7nh44cX > header h5,\n    .HtgALwJ33kf6TZ7nh44cX > header h6 {\n      margin: 0; }\n  .HtgALwJ33kf6TZ7nh44cX .loader {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n    .HtgALwJ33kf6TZ7nh44cX .loader .spinner {\n      position: absolute;\n      top: 50%;\n      width: 100%;\n      margin-top: -10px;\n      font-size: 20px;\n      text-align: center; }\n  .HtgALwJ33kf6TZ7nh44cX .widget-body.p-0 {\n    margin: 15px -20px -15px; }\n    .HtgALwJ33kf6TZ7nh44cX .widget-body.p-0 + footer {\n      margin-top: 15px; }\n  .HtgALwJ33kf6TZ7nh44cX.bg-transparent {\n    box-shadow: none; }\n\n._3B0__H7ZzizsAETWDp_OHn::after {\n  display: block;\n  clear: both;\n  content: \"\"; }\n\n._3B0__H7ZzizsAETWDp_OHn > footer {\n  margin: 0.5rem -20px -15px;\n  padding: 10px 20px; }\n\n._1YlP6ZsnZ4lFkgyJ1elmmC + ._3B0__H7ZzizsAETWDp_OHn {\n  margin-top: 15px; }\n\n._1YlP6ZsnZ4lFkgyJ1elmmC,\n.widget-controls {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  right: 0;\n  padding: 14px;\n  font-size: 0.875rem; }\n  ._1YlP6ZsnZ4lFkgyJ1elmmC a,\n  .widget-controls a {\n    padding: 1px 4px;\n    border-radius: 4px;\n    color: rgba(0, 0, 0, 0.4);\n    transition: color 0.15s ease-in-out; }\n    ._1YlP6ZsnZ4lFkgyJ1elmmC a:hover,\n    .widget-controls a:hover {\n      color: rgba(0, 0, 0, 0.1);\n      text-decoration: none; }\n    ._1YlP6ZsnZ4lFkgyJ1elmmC a .fa,\n    .widget-controls a .fa {\n      position: relative;\n      top: 2px; }\n\n._14h0j2pEWyxL5AljJomCmz {\n  top: 2px;\n  position: relative;\n  margin-left: 3px; }\n  ._14h0j2pEWyxL5AljJomCmz .glyphicon {\n    vertical-align: baseline; }\n\n.widget-image {\n  position: relative;\n  overflow: hidden;\n  margin: -15px -20px;\n  border-radius: 0.3rem; }\n  .widget-image > img {\n    max-width: 100%;\n    border-radius: 0.3rem 0.3rem 0 0;\n    transition: transform 0.15s ease; }\n  .widget-image:hover > img {\n    transform: scale(1.1, 1.1); }\n  .widget-image .title {\n    position: absolute;\n    top: 0;\n    left: 0;\n    margin: 20px; }\n  .widget-image .info {\n    position: absolute;\n    top: 0;\n    right: 0;\n    margin: 20px; }\n\n.widget-footer-bottom {\n  position: absolute;\n  bottom: 0;\n  width: 100%; }\n\n.widget-sm {\n  height: 230px; }\n\n.widget-md {\n  height: 373px; }\n\n.widget-padding-md {\n  padding: 15px 20px; }\n\n.widget-padding-lg {\n  padding: 30px 40px; }\n\n.widget-body-container {\n  position: relative;\n  height: 100%; }\n\n.widget-top-overflow,\n.widget-middle-overflow {\n  position: relative;\n  margin: 0 -20px; }\n  .widget-top-overflow > img,\n  .widget-middle-overflow > img {\n    max-width: 100%; }\n\n.widget-top-overflow {\n  margin-top: -15px;\n  border-top-left-radius: 0.3rem;\n  border-top-right-radius: 0.3rem;\n  overflow: hidden; }\n  .widget-top-overflow > img {\n    border-top-left-radius: 0.3rem;\n    border-top-right-radius: 0.3rem; }\n  .widget-top-overflow > .btn-toolbar {\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: 1;\n    margin-right: 20px; }\n    @media (min-width: 768px) {\n      .widget-top-overflow > .btn-toolbar {\n        top: auto;\n        bottom: 0; } }\n\n.widget-icon {\n  opacity: 0.5;\n  font-size: 42px;\n  height: 60px;\n  line-height: 45px;\n  display: inline-block; }\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/components/Widget/Widget.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG;AACH;EACE,cAAc;EACd,YAAY,EAAE;EACd;IACE,eAAe;IACf,YAAY;IACZ,YAAY,EAAE;;AAElB;EACE,eAAe;EACf,mBAAmB;EACnB,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB;EACjB,uBAAuB;EACvB,6BAA6B,EAAE;EAC/B;IACE,oBAAoB;IACpB,mBAAmB,EAAE;IACrB;;;;;;MAME,UAAU,EAAE;EAChB;IACE,mBAAmB;IACnB,OAAO;IACP,UAAU;IACV,QAAQ;IACR,SAAS,EAAE;IACX;MACE,mBAAmB;MACnB,SAAS;MACT,YAAY;MACZ,kBAAkB;MAClB,gBAAgB;MAChB,mBAAmB,EAAE;EACzB;IACE,yBAAyB,EAAE;IAC3B;MACE,iBAAiB,EAAE;EACvB;IACE,iBAAiB,EAAE;;AAEvB;EACE,eAAe;EACf,YAAY;EACZ,YAAY,EAAE;;AAEhB;EACE,2BAA2B;EAC3B,mBAAmB,EAAE;;AAEvB;EACE,iBAAiB,EAAE;;AAErB;;EAEE,mBAAmB;EACnB,WAAW;EACX,OAAO;EACP,SAAS;EACT,cAAc;EACd,oBAAoB,EAAE;EACtB;;IAEE,iBAAiB;IACjB,mBAAmB;IACnB,0BAA0B;IAC1B,oCAAoC,EAAE;IACtC;;MAEE,0BAA0B;MAC1B,sBAAsB,EAAE;IAC1B;;MAEE,mBAAmB;MACnB,SAAS,EAAE;;AAEjB;EACE,SAAS;EACT,mBAAmB;EACnB,iBAAiB,EAAE;EACnB;IACE,yBAAyB,EAAE;;AAE/B;EACE,mBAAmB;EACnB,iBAAiB;EACjB,oBAAoB;EACpB,sBAAsB,EAAE;EACxB;IACE,gBAAgB;IAChB,iCAAiC;IACjC,iCAAiC,EAAE;EACrC;IACE,2BAA2B,EAAE;EAC/B;IACE,mBAAmB;IACnB,OAAO;IACP,QAAQ;IACR,aAAa,EAAE;EACjB;IACE,mBAAmB;IACnB,OAAO;IACP,SAAS;IACT,aAAa,EAAE;;AAEnB;EACE,mBAAmB;EACnB,UAAU;EACV,YAAY,EAAE;;AAEhB;EACE,cAAc,EAAE;;AAElB;EACE,cAAc,EAAE;;AAElB;EACE,mBAAmB,EAAE;;AAEvB;EACE,mBAAmB,EAAE;;AAEvB;EACE,mBAAmB;EACnB,aAAa,EAAE;;AAEjB;;EAEE,mBAAmB;EACnB,gBAAgB,EAAE;EAClB;;IAEE,gBAAgB,EAAE;;AAEtB;EACE,kBAAkB;EAClB,+BAA+B;EAC/B,gCAAgC;EAChC,iBAAiB,EAAE;EACnB;IACE,+BAA+B;IAC/B,gCAAgC,EAAE;EACpC;IACE,mBAAmB;IACnB,OAAO;IACP,SAAS;IACT,WAAW;IACX,mBAAmB,EAAE;IACrB;MACE;QACE,UAAU;QACV,UAAU,EAAE,EAAE;;AAEtB;EACE,aAAa;EACb,gBAAgB;EAChB,aAAa;EACb,kBAAkB;EAClB,sBAAsB,EAAE","file":"Widget.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.title {\n  margin-top: 0;\n  color: #444; }\n  .title::after {\n    display: block;\n    clear: both;\n    content: \"\"; }\n\n.widget {\n  display: block;\n  position: relative;\n  margin-bottom: 30px;\n  padding: 15px 20px;\n  background: #fff;\n  border-radius: 0.25rem;\n  box-shadow: 0 0 10px #e8e8e8; }\n  .widget > header {\n    margin: -15px -20px;\n    padding: 15px 20px; }\n    .widget > header h1,\n    .widget > header h2,\n    .widget > header h3,\n    .widget > header h4,\n    .widget > header h5,\n    .widget > header h6 {\n      margin: 0; }\n  .widget :global .loader {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0; }\n    .widget :global .loader .spinner {\n      position: absolute;\n      top: 50%;\n      width: 100%;\n      margin-top: -10px;\n      font-size: 20px;\n      text-align: center; }\n  .widget :global .widget-body.p-0 {\n    margin: 15px -20px -15px; }\n    .widget :global .widget-body.p-0 + footer {\n      margin-top: 15px; }\n  .widget:global.bg-transparent {\n    box-shadow: none; }\n\n.widgetBody::after {\n  display: block;\n  clear: both;\n  content: \"\"; }\n\n.widgetBody > footer {\n  margin: 0.5rem -20px -15px;\n  padding: 10px 20px; }\n\n.widgetControls + .widgetBody {\n  margin-top: 15px; }\n\n.widgetControls,\n:global(.widget-controls) {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  right: 0;\n  padding: 14px;\n  font-size: 0.875rem; }\n  .widgetControls a,\n  :global(.widget-controls) a {\n    padding: 1px 4px;\n    border-radius: 4px;\n    color: rgba(0, 0, 0, 0.4);\n    transition: color 0.15s ease-in-out; }\n    .widgetControls a:hover,\n    :global(.widget-controls) a:hover {\n      color: rgba(0, 0, 0, 0.1);\n      text-decoration: none; }\n    .widgetControls a :global .fa,\n    :global(.widget-controls) a :global .fa {\n      position: relative;\n      top: 2px; }\n\n.inverse {\n  top: 2px;\n  position: relative;\n  margin-left: 3px; }\n  .inverse :global .glyphicon {\n    vertical-align: baseline; }\n\n:global .widget-image {\n  position: relative;\n  overflow: hidden;\n  margin: -15px -20px;\n  border-radius: 0.3rem; }\n  :global .widget-image > img {\n    max-width: 100%;\n    border-radius: 0.3rem 0.3rem 0 0;\n    transition: transform 0.15s ease; }\n  :global .widget-image:hover > img {\n    transform: scale(1.1, 1.1); }\n  :global .widget-image .title {\n    position: absolute;\n    top: 0;\n    left: 0;\n    margin: 20px; }\n  :global .widget-image .info {\n    position: absolute;\n    top: 0;\n    right: 0;\n    margin: 20px; }\n\n:global .widget-footer-bottom {\n  position: absolute;\n  bottom: 0;\n  width: 100%; }\n\n:global .widget-sm {\n  height: 230px; }\n\n:global .widget-md {\n  height: 373px; }\n\n:global .widget-padding-md {\n  padding: 15px 20px; }\n\n:global .widget-padding-lg {\n  padding: 30px 40px; }\n\n:global .widget-body-container {\n  position: relative;\n  height: 100%; }\n\n:global .widget-top-overflow,\n:global .widget-middle-overflow {\n  position: relative;\n  margin: 0 -20px; }\n  :global .widget-top-overflow > img,\n  :global .widget-middle-overflow > img {\n    max-width: 100%; }\n\n:global .widget-top-overflow {\n  margin-top: -15px;\n  border-top-left-radius: 0.3rem;\n  border-top-right-radius: 0.3rem;\n  overflow: hidden; }\n  :global .widget-top-overflow > img {\n    border-top-left-radius: 0.3rem;\n    border-top-right-radius: 0.3rem; }\n  :global .widget-top-overflow > .btn-toolbar {\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: 1;\n    margin-right: 20px; }\n    @media (min-width: 768px) {\n      :global .widget-top-overflow > .btn-toolbar {\n        top: auto;\n        bottom: 0; } }\n\n:global .widget-icon {\n  opacity: 0.5;\n  font-size: 42px;\n  height: 60px;\n  line-height: 45px;\n  display: inline-block; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"title": "_1b-TwJnyBlo792yW69YuKH",
	"widget": "HtgALwJ33kf6TZ7nh44cX",
	"widgetBody": "_3B0__H7ZzizsAETWDp_OHn",
	"widgetControls": "_1YlP6ZsnZ4lFkgyJ1elmmC",
	"inverse": "_14h0j2pEWyxL5AljJomCmz"
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/pages/dashboard/Dashboard.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG","file":"Dashboard.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n._3SYBIxTOMuQiMJ-upDRnwb {\n  padding-top: 5%;\n  background-color: #eee;\n  height: 100%; }\n\n._2yiOKp7wJXcyNYbG3bHb6O {\n  width: 365px;\n  text-align: center; }\n\n._2R2QMcE0L7TTpXdJ-9LOro {\n  padding-left: 35px;\n  padding-right: 35px; }\n\n._1mpnQ6w95fq-76OABveHfJ {\n  margin: 20px;\n  font-size: 80px;\n  font-weight: 400;\n  color: #343434; }\n  @media (min-width: 768px) {\n    ._1mpnQ6w95fq-76OABveHfJ {\n      font-size: 180px; } }\n\n._3e5wQxA6NgHJ8uQkUAekB7 {\n  font-size: 20px;\n  color: #343434; }\n\n._1C8V_Zwvv3OmEnLu2q-0Wn {\n  font-size: 14px; }\n\n.um7SWcBPj3F8L5hSaF7ZB {\n  position: absolute;\n  bottom: 30px;\n  left: 0;\n  right: 0;\n  width: 100%;\n  font-size: 0.9rem;\n  color: #777;\n  text-align: center; }\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/pages/error/ErrorPage.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG;AACH;EACE,gBAAgB;EAChB,uBAAuB;EACvB,aAAa,EAAE;;AAEjB;EACE,aAAa;EACb,mBAAmB,EAAE;;AAEvB;EACE,mBAAmB;EACnB,oBAAoB,EAAE;;AAExB;EACE,aAAa;EACb,gBAAgB;EAChB,iBAAiB;EACjB,eAAe,EAAE;EACjB;IACE;MACE,iBAAiB,EAAE,EAAE;;AAE3B;EACE,gBAAgB;EAChB,eAAe,EAAE;;AAEnB;EACE,gBAAgB,EAAE;;AAEpB;EACE,mBAAmB;EACnB,aAAa;EACb,QAAQ;EACR,SAAS;EACT,YAAY;EACZ,kBAAkB;EAClB,YAAY;EACZ,mBAAmB,EAAE","file":"ErrorPage.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.errorPage {\n  padding-top: 5%;\n  background-color: #eee;\n  height: 100%; }\n\n.errorContainer {\n  width: 365px;\n  text-align: center; }\n\n.errorBtn {\n  padding-left: 35px;\n  padding-right: 35px; }\n\n.errorCode {\n  margin: 20px;\n  font-size: 80px;\n  font-weight: 400;\n  color: #343434; }\n  @media (min-width: 768px) {\n    .errorCode {\n      font-size: 180px; } }\n\n.errorInfo {\n  font-size: 20px;\n  color: #343434; }\n\n.errorHelp {\n  font-size: 14px; }\n\n.pageFooter {\n  position: absolute;\n  bottom: 30px;\n  left: 0;\n  right: 0;\n  width: 100%;\n  font-size: 0.9rem;\n  color: #777;\n  text-align: center; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"errorPage": "_3SYBIxTOMuQiMJ-upDRnwb",
	"errorContainer": "_2yiOKp7wJXcyNYbG3bHb6O",
	"errorBtn": "_2R2QMcE0L7TTpXdJ-9LOro",
	"errorCode": "_1mpnQ6w95fq-76OABveHfJ",
	"errorInfo": "_3e5wQxA6NgHJ8uQkUAekB7",
	"errorHelp": "_1C8V_Zwvv3OmEnLu2q-0Wn",
	"pageFooter": "um7SWcBPj3F8L5hSaF7ZB"
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n._1IaSK9_zteQvORXEtv3QtO {\n  padding-top: 20vh;\n  height: 100%;\n  background-color: #eee; }\n\n._3ANqIkJUnh9e2OUq4_JPEc {\n  max-width: 360px;\n  padding: 30px !important; }\n  ._3ANqIkJUnh9e2OUq4_JPEc h1,\n  ._3ANqIkJUnh9e2OUq4_JPEc h2,\n  ._3ANqIkJUnh9e2OUq4_JPEc h3,\n  ._3ANqIkJUnh9e2OUq4_JPEc h4,\n  ._3ANqIkJUnh9e2OUq4_JPEc h5,\n  ._3ANqIkJUnh9e2OUq4_JPEc h6 {\n    font-weight: 400;\n    text-align: center; }\n  ._3ANqIkJUnh9e2OUq4_JPEc .cLlCg_26gO4P1lFOnkk_h {\n    font-size: 13px;\n    color: #888;\n    margin-top: 1px;\n    margin-bottom: 0;\n    text-align: center; }\n\n._2_e837j2_t4ZNLSFiMghSF {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #636c72;\n  text-align: center; }\n  @media (min-height: 600px) {\n    ._2_e837j2_t4ZNLSFiMghSF {\n      position: fixed;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.PZ45xH9i6UwwU6lO7Z3gD {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .PZ45xH9i6UwwU6lO7Z3gD i {\n    font-size: 13px;\n    margin: 0 20px; }\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/pages/login/Login.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG;AACH;EACE,kBAAkB;EAClB,aAAa;EACb,uBAAuB,EAAE;;AAE3B;EACE,iBAAiB;EACjB,yBAAyB,EAAE;EAC3B;;;;;;IAME,iBAAiB;IACjB,mBAAmB,EAAE;EACvB;IACE,gBAAgB;IAChB,YAAY;IACZ,gBAAgB;IAChB,iBAAiB;IACjB,mBAAmB,EAAE;;AAEzB;EACE,oBAAoB;EACpB,gBAAgB;EAChB,eAAe;EACf,mBAAmB,EAAE;EACrB;IACE;MACE,gBAAgB;MAChB,UAAU;MACV,QAAQ;MACR,SAAS,EAAE,EAAE;;AAEnB;EACE,iBAAiB;EACjB,oBAAoB;EACpB,mBAAmB;EACnB,iBAAiB,EAAE;EACnB;IACE,gBAAgB;IAChB,eAAe,EAAE","file":"Login.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n.root {\n  padding-top: 20vh;\n  height: 100%;\n  background-color: #eee; }\n\n.widget {\n  max-width: 360px;\n  padding: 30px !important; }\n  .widget h1,\n  .widget h2,\n  .widget h3,\n  .widget h4,\n  .widget h5,\n  .widget h6 {\n    font-weight: 400;\n    text-align: center; }\n  .widget .widgetLoginInfo {\n    font-size: 13px;\n    color: #888;\n    margin-top: 1px;\n    margin-bottom: 0;\n    text-align: center; }\n\n.footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #636c72;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .footer {\n      position: fixed;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .logo i {\n    font-size: 13px;\n    margin: 0 20px; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "_1IaSK9_zteQvORXEtv3QtO",
	"widget": "_3ANqIkJUnh9e2OUq4_JPEc",
	"widgetLoginInfo": "cLlCg_26gO4P1lFOnkk_h",
	"footer": "_2_e837j2_t4ZNLSFiMghSF",
	"logo": "PZ45xH9i6UwwU6lO7Z3gD"
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n", "", {"version":3,"sources":["/home/minhthuan/Downloads/admin-theme/sing-wrapbootstrap-4.2.3/react-seed/src/pages/profile/Profile.scss"],"names":[],"mappings":"AAAA;;;GAGG;AACH;;8EAE8E;AAC9E;;GAEG","file":"Profile.scss","sourcesContent":["/**\n * Customized version of bootstrap using variables from _variables.scss.\n * This file is loaded via separate loader thus allowing to use original bootstrap classes (e.g. .btn-default) through out the app.\n */\n/*\n * Typography\n * ======================================================================== */\n/**\n * Custom application mixins available through out the app\n */\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700,800);", ""]);

// module

// exports
exports.locals = {
	"navbar": "navbar",
	"badge": "badge",
	"table": "table",
	"table-bordered": "table-bordered",
	"h1": "h1",
	"h2": "h2",
	"h3": "h3",
	"h4": "h4",
	"h5": "h5",
	"h6": "h6",
	"lead": "lead",
	"display-1": "display-1",
	"display-2": "display-2",
	"display-3": "display-3",
	"display-4": "display-4",
	"small": "small",
	"mark": "mark",
	"list-unstyled": "list-unstyled",
	"list-inline": "list-inline",
	"list-inline-item": "list-inline-item",
	"initialism": "initialism",
	"blockquote": "blockquote",
	"blockquote-footer": "blockquote-footer",
	"img-fluid": "img-fluid",
	"img-thumbnail": "img-thumbnail",
	"figure": "figure",
	"figure-img": "figure-img",
	"figure-caption": "figure-caption",
	"pre-scrollable": "pre-scrollable",
	"container": "container",
	"container-fluid": "container-fluid",
	"row": "row",
	"no-gutters": "no-gutters",
	"col": "col",
	"col-1": "col-1",
	"col-2": "col-2",
	"col-3": "col-3",
	"col-4": "col-4",
	"col-5": "col-5",
	"col-6": "col-6",
	"col-7": "col-7",
	"col-8": "col-8",
	"col-9": "col-9",
	"col-10": "col-10",
	"col-11": "col-11",
	"col-12": "col-12",
	"col-auto": "col-auto",
	"col-sm-1": "col-sm-1",
	"col-sm-2": "col-sm-2",
	"col-sm-3": "col-sm-3",
	"col-sm-4": "col-sm-4",
	"col-sm-5": "col-sm-5",
	"col-sm-6": "col-sm-6",
	"col-sm-7": "col-sm-7",
	"col-sm-8": "col-sm-8",
	"col-sm-9": "col-sm-9",
	"col-sm-10": "col-sm-10",
	"col-sm-11": "col-sm-11",
	"col-sm-12": "col-sm-12",
	"col-sm": "col-sm",
	"col-sm-auto": "col-sm-auto",
	"col-md-1": "col-md-1",
	"col-md-2": "col-md-2",
	"col-md-3": "col-md-3",
	"col-md-4": "col-md-4",
	"col-md-5": "col-md-5",
	"col-md-6": "col-md-6",
	"col-md-7": "col-md-7",
	"col-md-8": "col-md-8",
	"col-md-9": "col-md-9",
	"col-md-10": "col-md-10",
	"col-md-11": "col-md-11",
	"col-md-12": "col-md-12",
	"col-md": "col-md",
	"col-md-auto": "col-md-auto",
	"col-lg-1": "col-lg-1",
	"col-lg-2": "col-lg-2",
	"col-lg-3": "col-lg-3",
	"col-lg-4": "col-lg-4",
	"col-lg-5": "col-lg-5",
	"col-lg-6": "col-lg-6",
	"col-lg-7": "col-lg-7",
	"col-lg-8": "col-lg-8",
	"col-lg-9": "col-lg-9",
	"col-lg-10": "col-lg-10",
	"col-lg-11": "col-lg-11",
	"col-lg-12": "col-lg-12",
	"col-lg": "col-lg",
	"col-lg-auto": "col-lg-auto",
	"col-xl-1": "col-xl-1",
	"col-xl-2": "col-xl-2",
	"col-xl-3": "col-xl-3",
	"col-xl-4": "col-xl-4",
	"col-xl-5": "col-xl-5",
	"col-xl-6": "col-xl-6",
	"col-xl-7": "col-xl-7",
	"col-xl-8": "col-xl-8",
	"col-xl-9": "col-xl-9",
	"col-xl-10": "col-xl-10",
	"col-xl-11": "col-xl-11",
	"col-xl-12": "col-xl-12",
	"col-xl": "col-xl",
	"col-xl-auto": "col-xl-auto",
	"order-1": "order-1",
	"order-2": "order-2",
	"order-3": "order-3",
	"order-4": "order-4",
	"order-5": "order-5",
	"order-6": "order-6",
	"order-7": "order-7",
	"order-8": "order-8",
	"order-9": "order-9",
	"order-10": "order-10",
	"order-11": "order-11",
	"order-12": "order-12",
	"order-sm-1": "order-sm-1",
	"order-sm-2": "order-sm-2",
	"order-sm-3": "order-sm-3",
	"order-sm-4": "order-sm-4",
	"order-sm-5": "order-sm-5",
	"order-sm-6": "order-sm-6",
	"order-sm-7": "order-sm-7",
	"order-sm-8": "order-sm-8",
	"order-sm-9": "order-sm-9",
	"order-sm-10": "order-sm-10",
	"order-sm-11": "order-sm-11",
	"order-sm-12": "order-sm-12",
	"order-md-1": "order-md-1",
	"order-md-2": "order-md-2",
	"order-md-3": "order-md-3",
	"order-md-4": "order-md-4",
	"order-md-5": "order-md-5",
	"order-md-6": "order-md-6",
	"order-md-7": "order-md-7",
	"order-md-8": "order-md-8",
	"order-md-9": "order-md-9",
	"order-md-10": "order-md-10",
	"order-md-11": "order-md-11",
	"order-md-12": "order-md-12",
	"order-lg-1": "order-lg-1",
	"order-lg-2": "order-lg-2",
	"order-lg-3": "order-lg-3",
	"order-lg-4": "order-lg-4",
	"order-lg-5": "order-lg-5",
	"order-lg-6": "order-lg-6",
	"order-lg-7": "order-lg-7",
	"order-lg-8": "order-lg-8",
	"order-lg-9": "order-lg-9",
	"order-lg-10": "order-lg-10",
	"order-lg-11": "order-lg-11",
	"order-lg-12": "order-lg-12",
	"order-xl-1": "order-xl-1",
	"order-xl-2": "order-xl-2",
	"order-xl-3": "order-xl-3",
	"order-xl-4": "order-xl-4",
	"order-xl-5": "order-xl-5",
	"order-xl-6": "order-xl-6",
	"order-xl-7": "order-xl-7",
	"order-xl-8": "order-xl-8",
	"order-xl-9": "order-xl-9",
	"order-xl-10": "order-xl-10",
	"order-xl-11": "order-xl-11",
	"order-xl-12": "order-xl-12",
	"table-sm": "table-sm",
	"table-striped": "table-striped",
	"table-hover": "table-hover",
	"table-primary": "table-primary",
	"table-secondary": "table-secondary",
	"table-success": "table-success",
	"table-info": "table-info",
	"table-warning": "table-warning",
	"table-danger": "table-danger",
	"table-light": "table-light",
	"table-dark": "table-dark",
	"table-inverse": "table-inverse",
	"table-gray": "table-gray",
	"table-default": "table-default",
	"table-active": "table-active",
	"thead-inverse": "thead-inverse",
	"thead-default": "thead-default",
	"table-responsive": "table-responsive",
	"form-control": "form-control",
	"form-control-file": "form-control-file",
	"form-control-range": "form-control-range",
	"col-form-label": "col-form-label",
	"col-form-label-lg": "col-form-label-lg",
	"col-form-label-sm": "col-form-label-sm",
	"col-form-legend": "col-form-legend",
	"form-control-plaintext": "form-control-plaintext",
	"form-control-sm": "form-control-sm",
	"input-group-sm": "input-group-sm",
	"input-group-addon": "input-group-addon",
	"input-group-btn": "input-group-btn",
	"btn": "btn",
	"form-control-lg": "form-control-lg",
	"input-group-lg": "input-group-lg",
	"form-group": "form-group",
	"form-text": "form-text",
	"form-row": "form-row",
	"form-check": "form-check",
	"disabled": "disabled",
	"form-check-label": "form-check-label",
	"form-check-input": "form-check-input",
	"form-check-inline": "form-check-inline",
	"invalid-feedback": "invalid-feedback",
	"invalid-tooltip": "invalid-tooltip",
	"was-validated": "was-validated",
	"is-valid": "is-valid",
	"custom-select": "custom-select",
	"custom-control-input": "custom-control-input",
	"custom-control-indicator": "custom-control-indicator",
	"custom-control-description": "custom-control-description",
	"custom-file-input": "custom-file-input",
	"custom-file-control": "custom-file-control",
	"is-invalid": "is-invalid",
	"form-inline": "form-inline",
	"input-group": "input-group",
	"form-control-label": "form-control-label",
	"custom-control": "custom-control",
	"has-feedback": "has-feedback",
	"form-control-feedback": "form-control-feedback",
	"focus": "focus",
	"active": "active",
	"btn-primary": "btn-primary",
	"show": "show",
	"dropdown-toggle": "dropdown-toggle",
	"btn-secondary": "btn-secondary",
	"btn-success": "btn-success",
	"btn-info": "btn-info",
	"btn-warning": "btn-warning",
	"btn-danger": "btn-danger",
	"btn-light": "btn-light",
	"btn-dark": "btn-dark",
	"btn-inverse": "btn-inverse",
	"btn-gray": "btn-gray",
	"btn-default": "btn-default",
	"btn-outline-primary": "btn-outline-primary",
	"btn-outline-secondary": "btn-outline-secondary",
	"btn-outline-success": "btn-outline-success",
	"btn-outline-info": "btn-outline-info",
	"btn-outline-warning": "btn-outline-warning",
	"btn-outline-danger": "btn-outline-danger",
	"btn-outline-light": "btn-outline-light",
	"btn-outline-dark": "btn-outline-dark",
	"btn-outline-inverse": "btn-outline-inverse",
	"btn-outline-gray": "btn-outline-gray",
	"btn-outline-default": "btn-outline-default",
	"btn-link": "btn-link",
	"btn-lg": "btn-lg",
	"btn-group-lg": "btn-group-lg",
	"btn-sm": "btn-sm",
	"btn-group-sm": "btn-group-sm",
	"btn-block": "btn-block",
	"fade": "fade",
	"collapse": "collapse",
	"collapsing": "collapsing",
	"dropup": "dropup",
	"dropdown": "dropdown",
	"dropdown-menu": "dropdown-menu",
	"dropdown-divider": "dropdown-divider",
	"dropdown-item": "dropdown-item",
	"dropdown-header": "dropdown-header",
	"btn-group": "btn-group",
	"btn-group-vertical": "btn-group-vertical",
	"btn-toolbar": "btn-toolbar",
	"dropdown-toggle-split": "dropdown-toggle-split",
	"custom-checkbox": "custom-checkbox",
	"custom-radio": "custom-radio",
	"custom-controls-stacked": "custom-controls-stacked",
	"custom-select-sm": "custom-select-sm",
	"custom-file": "custom-file",
	"nav": "nav",
	"nav-link": "nav-link",
	"nav-tabs": "nav-tabs",
	"nav-item": "nav-item",
	"nav-pills": "nav-pills",
	"nav-fill": "nav-fill",
	"nav-justified": "nav-justified",
	"tab-content": "tab-content",
	"tab-pane": "tab-pane",
	"navbar-brand": "navbar-brand",
	"navbar-nav": "navbar-nav",
	"navbar-text": "navbar-text",
	"navbar-collapse": "navbar-collapse",
	"navbar-toggler": "navbar-toggler",
	"navbar-toggler-icon": "navbar-toggler-icon",
	"navbar-expand-sm": "navbar-expand-sm",
	"dropdown-menu-right": "dropdown-menu-right",
	"navbar-expand-md": "navbar-expand-md",
	"navbar-expand-lg": "navbar-expand-lg",
	"navbar-expand-xl": "navbar-expand-xl",
	"navbar-expand": "navbar-expand",
	"navbar-light": "navbar-light",
	"navbar-dark": "navbar-dark",
	"card": "card",
	"card-body": "card-body",
	"card-title": "card-title",
	"card-subtitle": "card-subtitle",
	"card-text": "card-text",
	"card-link": "card-link",
	"list-group": "list-group",
	"list-group-item": "list-group-item",
	"card-header": "card-header",
	"card-footer": "card-footer",
	"card-header-tabs": "card-header-tabs",
	"card-header-pills": "card-header-pills",
	"card-img-overlay": "card-img-overlay",
	"card-img": "card-img",
	"card-img-top": "card-img-top",
	"card-img-bottom": "card-img-bottom",
	"card-deck": "card-deck",
	"card-group": "card-group",
	"card-columns": "card-columns",
	"breadcrumb": "breadcrumb",
	"breadcrumb-item": "breadcrumb-item",
	"pagination": "pagination",
	"page-item": "page-item",
	"page-link": "page-link",
	"pagination-lg": "pagination-lg",
	"pagination-sm": "pagination-sm",
	"badge-pill": "badge-pill",
	"badge-primary": "badge-primary",
	"badge-secondary": "badge-secondary",
	"badge-success": "badge-success",
	"badge-info": "badge-info",
	"badge-warning": "badge-warning",
	"badge-danger": "badge-danger",
	"badge-light": "badge-light",
	"badge-dark": "badge-dark",
	"badge-inverse": "badge-inverse",
	"badge-gray": "badge-gray",
	"badge-default": "badge-default",
	"jumbotron": "jumbotron",
	"jumbotron-fluid": "jumbotron-fluid",
	"alert": "alert",
	"alert-heading": "alert-heading",
	"alert-link": "alert-link",
	"alert-dismissible": "alert-dismissible",
	"close": "close",
	"alert-primary": "alert-primary",
	"alert-secondary": "alert-secondary",
	"alert-success": "alert-success",
	"alert-info": "alert-info",
	"alert-warning": "alert-warning",
	"alert-danger": "alert-danger",
	"alert-light": "alert-light",
	"alert-dark": "alert-dark",
	"alert-inverse": "alert-inverse",
	"alert-gray": "alert-gray",
	"alert-default": "alert-default",
	"progress": "progress",
	"progress-bar": "progress-bar",
	"progress-bar-striped": "progress-bar-striped",
	"progress-bar-animated": "progress-bar-animated",
	"progress-bar-stripes": "progress-bar-stripes",
	"media": "media",
	"media-body": "media-body",
	"list-group-item-action": "list-group-item-action",
	"list-group-flush": "list-group-flush",
	"list-group-item-primary": "list-group-item-primary",
	"list-group-item-secondary": "list-group-item-secondary",
	"list-group-item-success": "list-group-item-success",
	"list-group-item-info": "list-group-item-info",
	"list-group-item-warning": "list-group-item-warning",
	"list-group-item-danger": "list-group-item-danger",
	"list-group-item-light": "list-group-item-light",
	"list-group-item-dark": "list-group-item-dark",
	"list-group-item-inverse": "list-group-item-inverse",
	"list-group-item-gray": "list-group-item-gray",
	"list-group-item-default": "list-group-item-default",
	"modal-open": "modal-open",
	"modal": "modal",
	"modal-dialog": "modal-dialog",
	"modal-content": "modal-content",
	"modal-backdrop": "modal-backdrop",
	"modal-header": "modal-header",
	"modal-title": "modal-title",
	"modal-body": "modal-body",
	"modal-footer": "modal-footer",
	"modal-scrollbar-measure": "modal-scrollbar-measure",
	"modal-sm": "modal-sm",
	"modal-lg": "modal-lg",
	"tooltip": "tooltip",
	"arrow": "arrow",
	"bs-tooltip-top": "bs-tooltip-top",
	"bs-tooltip-auto": "bs-tooltip-auto",
	"bs-tooltip-right": "bs-tooltip-right",
	"bs-tooltip-bottom": "bs-tooltip-bottom",
	"bs-tooltip-left": "bs-tooltip-left",
	"tooltip-inner": "tooltip-inner",
	"popover": "popover",
	"bs-popover-top": "bs-popover-top",
	"bs-popover-auto": "bs-popover-auto",
	"bs-popover-right": "bs-popover-right",
	"bs-popover-bottom": "bs-popover-bottom",
	"popover-header": "popover-header",
	"bs-popover-left": "bs-popover-left",
	"popover-body": "popover-body",
	"carousel": "carousel",
	"carousel-inner": "carousel-inner",
	"carousel-item": "carousel-item",
	"carousel-item-next": "carousel-item-next",
	"carousel-item-prev": "carousel-item-prev",
	"carousel-item-left": "carousel-item-left",
	"carousel-item-right": "carousel-item-right",
	"carousel-control-prev": "carousel-control-prev",
	"carousel-control-next": "carousel-control-next",
	"carousel-control-prev-icon": "carousel-control-prev-icon",
	"carousel-control-next-icon": "carousel-control-next-icon",
	"carousel-indicators": "carousel-indicators",
	"carousel-caption": "carousel-caption",
	"align-baseline": "align-baseline",
	"align-top": "align-top",
	"align-middle": "align-middle",
	"align-bottom": "align-bottom",
	"align-text-bottom": "align-text-bottom",
	"align-text-top": "align-text-top",
	"bg-primary": "bg-primary",
	"bg-secondary": "bg-secondary",
	"bg-success": "bg-success",
	"bg-info": "bg-info",
	"bg-warning": "bg-warning",
	"bg-danger": "bg-danger",
	"bg-light": "bg-light",
	"bg-dark": "bg-dark",
	"bg-inverse": "bg-inverse",
	"bg-gray": "bg-gray",
	"bg-default": "bg-default",
	"bg-white": "bg-white",
	"bg-transparent": "bg-transparent",
	"border": "border",
	"border-0": "border-0",
	"border-top-0": "border-top-0",
	"border-right-0": "border-right-0",
	"border-bottom-0": "border-bottom-0",
	"border-left-0": "border-left-0",
	"border-primary": "border-primary",
	"border-secondary": "border-secondary",
	"border-success": "border-success",
	"border-info": "border-info",
	"border-warning": "border-warning",
	"border-danger": "border-danger",
	"border-light": "border-light",
	"border-dark": "border-dark",
	"border-inverse": "border-inverse",
	"border-gray": "border-gray",
	"border-default": "border-default",
	"border-white": "border-white",
	"rounded": "rounded",
	"rounded-top": "rounded-top",
	"rounded-right": "rounded-right",
	"rounded-bottom": "rounded-bottom",
	"rounded-left": "rounded-left",
	"rounded-circle": "rounded-circle",
	"rounded-0": "rounded-0",
	"clearfix": "clearfix",
	"d-none": "d-none",
	"d-inline": "d-inline",
	"d-inline-block": "d-inline-block",
	"d-block": "d-block",
	"d-table": "d-table",
	"d-table-cell": "d-table-cell",
	"d-flex": "d-flex",
	"d-inline-flex": "d-inline-flex",
	"d-sm-none": "d-sm-none",
	"d-sm-inline": "d-sm-inline",
	"d-sm-inline-block": "d-sm-inline-block",
	"d-sm-block": "d-sm-block",
	"d-sm-table": "d-sm-table",
	"d-sm-table-cell": "d-sm-table-cell",
	"d-sm-flex": "d-sm-flex",
	"d-sm-inline-flex": "d-sm-inline-flex",
	"d-md-none": "d-md-none",
	"d-md-inline": "d-md-inline",
	"d-md-inline-block": "d-md-inline-block",
	"d-md-block": "d-md-block",
	"d-md-table": "d-md-table",
	"d-md-table-cell": "d-md-table-cell",
	"d-md-flex": "d-md-flex",
	"d-md-inline-flex": "d-md-inline-flex",
	"d-lg-none": "d-lg-none",
	"d-lg-inline": "d-lg-inline",
	"d-lg-inline-block": "d-lg-inline-block",
	"d-lg-block": "d-lg-block",
	"d-lg-table": "d-lg-table",
	"d-lg-table-cell": "d-lg-table-cell",
	"d-lg-flex": "d-lg-flex",
	"d-lg-inline-flex": "d-lg-inline-flex",
	"d-xl-none": "d-xl-none",
	"d-xl-inline": "d-xl-inline",
	"d-xl-inline-block": "d-xl-inline-block",
	"d-xl-block": "d-xl-block",
	"d-xl-table": "d-xl-table",
	"d-xl-table-cell": "d-xl-table-cell",
	"d-xl-flex": "d-xl-flex",
	"d-xl-inline-flex": "d-xl-inline-flex",
	"d-print-block": "d-print-block",
	"d-print-inline": "d-print-inline",
	"d-print-inline-block": "d-print-inline-block",
	"d-print-none": "d-print-none",
	"embed-responsive": "embed-responsive",
	"embed-responsive-item": "embed-responsive-item",
	"embed-responsive-21by9": "embed-responsive-21by9",
	"embed-responsive-16by9": "embed-responsive-16by9",
	"embed-responsive-4by3": "embed-responsive-4by3",
	"embed-responsive-1by1": "embed-responsive-1by1",
	"flex-row": "flex-row",
	"flex-column": "flex-column",
	"flex-row-reverse": "flex-row-reverse",
	"flex-column-reverse": "flex-column-reverse",
	"flex-wrap": "flex-wrap",
	"flex-nowrap": "flex-nowrap",
	"flex-wrap-reverse": "flex-wrap-reverse",
	"justify-content-start": "justify-content-start",
	"justify-content-end": "justify-content-end",
	"justify-content-center": "justify-content-center",
	"justify-content-between": "justify-content-between",
	"justify-content-around": "justify-content-around",
	"align-items-start": "align-items-start",
	"align-items-end": "align-items-end",
	"align-items-center": "align-items-center",
	"align-items-baseline": "align-items-baseline",
	"align-items-stretch": "align-items-stretch",
	"align-content-start": "align-content-start",
	"align-content-end": "align-content-end",
	"align-content-center": "align-content-center",
	"align-content-between": "align-content-between",
	"align-content-around": "align-content-around",
	"align-content-stretch": "align-content-stretch",
	"align-self-auto": "align-self-auto",
	"align-self-start": "align-self-start",
	"align-self-end": "align-self-end",
	"align-self-center": "align-self-center",
	"align-self-baseline": "align-self-baseline",
	"align-self-stretch": "align-self-stretch",
	"flex-sm-row": "flex-sm-row",
	"flex-sm-column": "flex-sm-column",
	"flex-sm-row-reverse": "flex-sm-row-reverse",
	"flex-sm-column-reverse": "flex-sm-column-reverse",
	"flex-sm-wrap": "flex-sm-wrap",
	"flex-sm-nowrap": "flex-sm-nowrap",
	"flex-sm-wrap-reverse": "flex-sm-wrap-reverse",
	"justify-content-sm-start": "justify-content-sm-start",
	"justify-content-sm-end": "justify-content-sm-end",
	"justify-content-sm-center": "justify-content-sm-center",
	"justify-content-sm-between": "justify-content-sm-between",
	"justify-content-sm-around": "justify-content-sm-around",
	"align-items-sm-start": "align-items-sm-start",
	"align-items-sm-end": "align-items-sm-end",
	"align-items-sm-center": "align-items-sm-center",
	"align-items-sm-baseline": "align-items-sm-baseline",
	"align-items-sm-stretch": "align-items-sm-stretch",
	"align-content-sm-start": "align-content-sm-start",
	"align-content-sm-end": "align-content-sm-end",
	"align-content-sm-center": "align-content-sm-center",
	"align-content-sm-between": "align-content-sm-between",
	"align-content-sm-around": "align-content-sm-around",
	"align-content-sm-stretch": "align-content-sm-stretch",
	"align-self-sm-auto": "align-self-sm-auto",
	"align-self-sm-start": "align-self-sm-start",
	"align-self-sm-end": "align-self-sm-end",
	"align-self-sm-center": "align-self-sm-center",
	"align-self-sm-baseline": "align-self-sm-baseline",
	"align-self-sm-stretch": "align-self-sm-stretch",
	"flex-md-row": "flex-md-row",
	"flex-md-column": "flex-md-column",
	"flex-md-row-reverse": "flex-md-row-reverse",
	"flex-md-column-reverse": "flex-md-column-reverse",
	"flex-md-wrap": "flex-md-wrap",
	"flex-md-nowrap": "flex-md-nowrap",
	"flex-md-wrap-reverse": "flex-md-wrap-reverse",
	"justify-content-md-start": "justify-content-md-start",
	"justify-content-md-end": "justify-content-md-end",
	"justify-content-md-center": "justify-content-md-center",
	"justify-content-md-between": "justify-content-md-between",
	"justify-content-md-around": "justify-content-md-around",
	"align-items-md-start": "align-items-md-start",
	"align-items-md-end": "align-items-md-end",
	"align-items-md-center": "align-items-md-center",
	"align-items-md-baseline": "align-items-md-baseline",
	"align-items-md-stretch": "align-items-md-stretch",
	"align-content-md-start": "align-content-md-start",
	"align-content-md-end": "align-content-md-end",
	"align-content-md-center": "align-content-md-center",
	"align-content-md-between": "align-content-md-between",
	"align-content-md-around": "align-content-md-around",
	"align-content-md-stretch": "align-content-md-stretch",
	"align-self-md-auto": "align-self-md-auto",
	"align-self-md-start": "align-self-md-start",
	"align-self-md-end": "align-self-md-end",
	"align-self-md-center": "align-self-md-center",
	"align-self-md-baseline": "align-self-md-baseline",
	"align-self-md-stretch": "align-self-md-stretch",
	"flex-lg-row": "flex-lg-row",
	"flex-lg-column": "flex-lg-column",
	"flex-lg-row-reverse": "flex-lg-row-reverse",
	"flex-lg-column-reverse": "flex-lg-column-reverse",
	"flex-lg-wrap": "flex-lg-wrap",
	"flex-lg-nowrap": "flex-lg-nowrap",
	"flex-lg-wrap-reverse": "flex-lg-wrap-reverse",
	"justify-content-lg-start": "justify-content-lg-start",
	"justify-content-lg-end": "justify-content-lg-end",
	"justify-content-lg-center": "justify-content-lg-center",
	"justify-content-lg-between": "justify-content-lg-between",
	"justify-content-lg-around": "justify-content-lg-around",
	"align-items-lg-start": "align-items-lg-start",
	"align-items-lg-end": "align-items-lg-end",
	"align-items-lg-center": "align-items-lg-center",
	"align-items-lg-baseline": "align-items-lg-baseline",
	"align-items-lg-stretch": "align-items-lg-stretch",
	"align-content-lg-start": "align-content-lg-start",
	"align-content-lg-end": "align-content-lg-end",
	"align-content-lg-center": "align-content-lg-center",
	"align-content-lg-between": "align-content-lg-between",
	"align-content-lg-around": "align-content-lg-around",
	"align-content-lg-stretch": "align-content-lg-stretch",
	"align-self-lg-auto": "align-self-lg-auto",
	"align-self-lg-start": "align-self-lg-start",
	"align-self-lg-end": "align-self-lg-end",
	"align-self-lg-center": "align-self-lg-center",
	"align-self-lg-baseline": "align-self-lg-baseline",
	"align-self-lg-stretch": "align-self-lg-stretch",
	"flex-xl-row": "flex-xl-row",
	"flex-xl-column": "flex-xl-column",
	"flex-xl-row-reverse": "flex-xl-row-reverse",
	"flex-xl-column-reverse": "flex-xl-column-reverse",
	"flex-xl-wrap": "flex-xl-wrap",
	"flex-xl-nowrap": "flex-xl-nowrap",
	"flex-xl-wrap-reverse": "flex-xl-wrap-reverse",
	"justify-content-xl-start": "justify-content-xl-start",
	"justify-content-xl-end": "justify-content-xl-end",
	"justify-content-xl-center": "justify-content-xl-center",
	"justify-content-xl-between": "justify-content-xl-between",
	"justify-content-xl-around": "justify-content-xl-around",
	"align-items-xl-start": "align-items-xl-start",
	"align-items-xl-end": "align-items-xl-end",
	"align-items-xl-center": "align-items-xl-center",
	"align-items-xl-baseline": "align-items-xl-baseline",
	"align-items-xl-stretch": "align-items-xl-stretch",
	"align-content-xl-start": "align-content-xl-start",
	"align-content-xl-end": "align-content-xl-end",
	"align-content-xl-center": "align-content-xl-center",
	"align-content-xl-between": "align-content-xl-between",
	"align-content-xl-around": "align-content-xl-around",
	"align-content-xl-stretch": "align-content-xl-stretch",
	"align-self-xl-auto": "align-self-xl-auto",
	"align-self-xl-start": "align-self-xl-start",
	"align-self-xl-end": "align-self-xl-end",
	"align-self-xl-center": "align-self-xl-center",
	"align-self-xl-baseline": "align-self-xl-baseline",
	"align-self-xl-stretch": "align-self-xl-stretch",
	"float-left": "float-left",
	"float-right": "float-right",
	"float-none": "float-none",
	"float-sm-left": "float-sm-left",
	"float-sm-right": "float-sm-right",
	"float-sm-none": "float-sm-none",
	"float-md-left": "float-md-left",
	"float-md-right": "float-md-right",
	"float-md-none": "float-md-none",
	"float-lg-left": "float-lg-left",
	"float-lg-right": "float-lg-right",
	"float-lg-none": "float-lg-none",
	"float-xl-left": "float-xl-left",
	"float-xl-right": "float-xl-right",
	"float-xl-none": "float-xl-none",
	"position-static": "position-static",
	"position-relative": "position-relative",
	"position-absolute": "position-absolute",
	"position-fixed": "position-fixed",
	"position-sticky": "position-sticky",
	"fixed-top": "fixed-top",
	"fixed-bottom": "fixed-bottom",
	"sticky-top": "sticky-top",
	"sr-only": "sr-only",
	"sr-only-focusable": "sr-only-focusable",
	"w-25": "w-25",
	"w-50": "w-50",
	"w-75": "w-75",
	"w-100": "w-100",
	"h-25": "h-25",
	"h-50": "h-50",
	"h-75": "h-75",
	"h-100": "h-100",
	"mw-100": "mw-100",
	"mh-100": "mh-100",
	"m-0": "m-0",
	"mt-0": "mt-0",
	"my-0": "my-0",
	"mr-0": "mr-0",
	"mx-0": "mx-0",
	"mb-0": "mb-0",
	"ml-0": "ml-0",
	"m-1": "m-1",
	"mt-1": "mt-1",
	"my-1": "my-1",
	"mr-1": "mr-1",
	"mx-1": "mx-1",
	"mb-1": "mb-1",
	"ml-1": "ml-1",
	"m-2": "m-2",
	"mt-2": "mt-2",
	"my-2": "my-2",
	"mr-2": "mr-2",
	"mx-2": "mx-2",
	"mb-2": "mb-2",
	"ml-2": "ml-2",
	"m-3": "m-3",
	"mt-3": "mt-3",
	"my-3": "my-3",
	"mr-3": "mr-3",
	"mx-3": "mx-3",
	"mb-3": "mb-3",
	"ml-3": "ml-3",
	"m-4": "m-4",
	"mt-4": "mt-4",
	"my-4": "my-4",
	"mr-4": "mr-4",
	"mx-4": "mx-4",
	"mb-4": "mb-4",
	"ml-4": "ml-4",
	"m-5": "m-5",
	"mt-5": "mt-5",
	"my-5": "my-5",
	"mr-5": "mr-5",
	"mx-5": "mx-5",
	"mb-5": "mb-5",
	"ml-5": "ml-5",
	"p-0": "p-0",
	"pt-0": "pt-0",
	"py-0": "py-0",
	"pr-0": "pr-0",
	"px-0": "px-0",
	"pb-0": "pb-0",
	"pl-0": "pl-0",
	"p-1": "p-1",
	"pt-1": "pt-1",
	"py-1": "py-1",
	"pr-1": "pr-1",
	"px-1": "px-1",
	"pb-1": "pb-1",
	"pl-1": "pl-1",
	"p-2": "p-2",
	"pt-2": "pt-2",
	"py-2": "py-2",
	"pr-2": "pr-2",
	"px-2": "px-2",
	"pb-2": "pb-2",
	"pl-2": "pl-2",
	"p-3": "p-3",
	"pt-3": "pt-3",
	"py-3": "py-3",
	"pr-3": "pr-3",
	"px-3": "px-3",
	"pb-3": "pb-3",
	"pl-3": "pl-3",
	"p-4": "p-4",
	"pt-4": "pt-4",
	"py-4": "py-4",
	"pr-4": "pr-4",
	"px-4": "px-4",
	"pb-4": "pb-4",
	"pl-4": "pl-4",
	"p-5": "p-5",
	"pt-5": "pt-5",
	"py-5": "py-5",
	"pr-5": "pr-5",
	"px-5": "px-5",
	"pb-5": "pb-5",
	"pl-5": "pl-5",
	"m-auto": "m-auto",
	"mt-auto": "mt-auto",
	"my-auto": "my-auto",
	"mr-auto": "mr-auto",
	"mx-auto": "mx-auto",
	"mb-auto": "mb-auto",
	"ml-auto": "ml-auto",
	"m-sm-0": "m-sm-0",
	"mt-sm-0": "mt-sm-0",
	"my-sm-0": "my-sm-0",
	"mr-sm-0": "mr-sm-0",
	"mx-sm-0": "mx-sm-0",
	"mb-sm-0": "mb-sm-0",
	"ml-sm-0": "ml-sm-0",
	"m-sm-1": "m-sm-1",
	"mt-sm-1": "mt-sm-1",
	"my-sm-1": "my-sm-1",
	"mr-sm-1": "mr-sm-1",
	"mx-sm-1": "mx-sm-1",
	"mb-sm-1": "mb-sm-1",
	"ml-sm-1": "ml-sm-1",
	"m-sm-2": "m-sm-2",
	"mt-sm-2": "mt-sm-2",
	"my-sm-2": "my-sm-2",
	"mr-sm-2": "mr-sm-2",
	"mx-sm-2": "mx-sm-2",
	"mb-sm-2": "mb-sm-2",
	"ml-sm-2": "ml-sm-2",
	"m-sm-3": "m-sm-3",
	"mt-sm-3": "mt-sm-3",
	"my-sm-3": "my-sm-3",
	"mr-sm-3": "mr-sm-3",
	"mx-sm-3": "mx-sm-3",
	"mb-sm-3": "mb-sm-3",
	"ml-sm-3": "ml-sm-3",
	"m-sm-4": "m-sm-4",
	"mt-sm-4": "mt-sm-4",
	"my-sm-4": "my-sm-4",
	"mr-sm-4": "mr-sm-4",
	"mx-sm-4": "mx-sm-4",
	"mb-sm-4": "mb-sm-4",
	"ml-sm-4": "ml-sm-4",
	"m-sm-5": "m-sm-5",
	"mt-sm-5": "mt-sm-5",
	"my-sm-5": "my-sm-5",
	"mr-sm-5": "mr-sm-5",
	"mx-sm-5": "mx-sm-5",
	"mb-sm-5": "mb-sm-5",
	"ml-sm-5": "ml-sm-5",
	"p-sm-0": "p-sm-0",
	"pt-sm-0": "pt-sm-0",
	"py-sm-0": "py-sm-0",
	"pr-sm-0": "pr-sm-0",
	"px-sm-0": "px-sm-0",
	"pb-sm-0": "pb-sm-0",
	"pl-sm-0": "pl-sm-0",
	"p-sm-1": "p-sm-1",
	"pt-sm-1": "pt-sm-1",
	"py-sm-1": "py-sm-1",
	"pr-sm-1": "pr-sm-1",
	"px-sm-1": "px-sm-1",
	"pb-sm-1": "pb-sm-1",
	"pl-sm-1": "pl-sm-1",
	"p-sm-2": "p-sm-2",
	"pt-sm-2": "pt-sm-2",
	"py-sm-2": "py-sm-2",
	"pr-sm-2": "pr-sm-2",
	"px-sm-2": "px-sm-2",
	"pb-sm-2": "pb-sm-2",
	"pl-sm-2": "pl-sm-2",
	"p-sm-3": "p-sm-3",
	"pt-sm-3": "pt-sm-3",
	"py-sm-3": "py-sm-3",
	"pr-sm-3": "pr-sm-3",
	"px-sm-3": "px-sm-3",
	"pb-sm-3": "pb-sm-3",
	"pl-sm-3": "pl-sm-3",
	"p-sm-4": "p-sm-4",
	"pt-sm-4": "pt-sm-4",
	"py-sm-4": "py-sm-4",
	"pr-sm-4": "pr-sm-4",
	"px-sm-4": "px-sm-4",
	"pb-sm-4": "pb-sm-4",
	"pl-sm-4": "pl-sm-4",
	"p-sm-5": "p-sm-5",
	"pt-sm-5": "pt-sm-5",
	"py-sm-5": "py-sm-5",
	"pr-sm-5": "pr-sm-5",
	"px-sm-5": "px-sm-5",
	"pb-sm-5": "pb-sm-5",
	"pl-sm-5": "pl-sm-5",
	"m-sm-auto": "m-sm-auto",
	"mt-sm-auto": "mt-sm-auto",
	"my-sm-auto": "my-sm-auto",
	"mr-sm-auto": "mr-sm-auto",
	"mx-sm-auto": "mx-sm-auto",
	"mb-sm-auto": "mb-sm-auto",
	"ml-sm-auto": "ml-sm-auto",
	"m-md-0": "m-md-0",
	"mt-md-0": "mt-md-0",
	"my-md-0": "my-md-0",
	"mr-md-0": "mr-md-0",
	"mx-md-0": "mx-md-0",
	"mb-md-0": "mb-md-0",
	"ml-md-0": "ml-md-0",
	"m-md-1": "m-md-1",
	"mt-md-1": "mt-md-1",
	"my-md-1": "my-md-1",
	"mr-md-1": "mr-md-1",
	"mx-md-1": "mx-md-1",
	"mb-md-1": "mb-md-1",
	"ml-md-1": "ml-md-1",
	"m-md-2": "m-md-2",
	"mt-md-2": "mt-md-2",
	"my-md-2": "my-md-2",
	"mr-md-2": "mr-md-2",
	"mx-md-2": "mx-md-2",
	"mb-md-2": "mb-md-2",
	"ml-md-2": "ml-md-2",
	"m-md-3": "m-md-3",
	"mt-md-3": "mt-md-3",
	"my-md-3": "my-md-3",
	"mr-md-3": "mr-md-3",
	"mx-md-3": "mx-md-3",
	"mb-md-3": "mb-md-3",
	"ml-md-3": "ml-md-3",
	"m-md-4": "m-md-4",
	"mt-md-4": "mt-md-4",
	"my-md-4": "my-md-4",
	"mr-md-4": "mr-md-4",
	"mx-md-4": "mx-md-4",
	"mb-md-4": "mb-md-4",
	"ml-md-4": "ml-md-4",
	"m-md-5": "m-md-5",
	"mt-md-5": "mt-md-5",
	"my-md-5": "my-md-5",
	"mr-md-5": "mr-md-5",
	"mx-md-5": "mx-md-5",
	"mb-md-5": "mb-md-5",
	"ml-md-5": "ml-md-5",
	"p-md-0": "p-md-0",
	"pt-md-0": "pt-md-0",
	"py-md-0": "py-md-0",
	"pr-md-0": "pr-md-0",
	"px-md-0": "px-md-0",
	"pb-md-0": "pb-md-0",
	"pl-md-0": "pl-md-0",
	"p-md-1": "p-md-1",
	"pt-md-1": "pt-md-1",
	"py-md-1": "py-md-1",
	"pr-md-1": "pr-md-1",
	"px-md-1": "px-md-1",
	"pb-md-1": "pb-md-1",
	"pl-md-1": "pl-md-1",
	"p-md-2": "p-md-2",
	"pt-md-2": "pt-md-2",
	"py-md-2": "py-md-2",
	"pr-md-2": "pr-md-2",
	"px-md-2": "px-md-2",
	"pb-md-2": "pb-md-2",
	"pl-md-2": "pl-md-2",
	"p-md-3": "p-md-3",
	"pt-md-3": "pt-md-3",
	"py-md-3": "py-md-3",
	"pr-md-3": "pr-md-3",
	"px-md-3": "px-md-3",
	"pb-md-3": "pb-md-3",
	"pl-md-3": "pl-md-3",
	"p-md-4": "p-md-4",
	"pt-md-4": "pt-md-4",
	"py-md-4": "py-md-4",
	"pr-md-4": "pr-md-4",
	"px-md-4": "px-md-4",
	"pb-md-4": "pb-md-4",
	"pl-md-4": "pl-md-4",
	"p-md-5": "p-md-5",
	"pt-md-5": "pt-md-5",
	"py-md-5": "py-md-5",
	"pr-md-5": "pr-md-5",
	"px-md-5": "px-md-5",
	"pb-md-5": "pb-md-5",
	"pl-md-5": "pl-md-5",
	"m-md-auto": "m-md-auto",
	"mt-md-auto": "mt-md-auto",
	"my-md-auto": "my-md-auto",
	"mr-md-auto": "mr-md-auto",
	"mx-md-auto": "mx-md-auto",
	"mb-md-auto": "mb-md-auto",
	"ml-md-auto": "ml-md-auto",
	"m-lg-0": "m-lg-0",
	"mt-lg-0": "mt-lg-0",
	"my-lg-0": "my-lg-0",
	"mr-lg-0": "mr-lg-0",
	"mx-lg-0": "mx-lg-0",
	"mb-lg-0": "mb-lg-0",
	"ml-lg-0": "ml-lg-0",
	"m-lg-1": "m-lg-1",
	"mt-lg-1": "mt-lg-1",
	"my-lg-1": "my-lg-1",
	"mr-lg-1": "mr-lg-1",
	"mx-lg-1": "mx-lg-1",
	"mb-lg-1": "mb-lg-1",
	"ml-lg-1": "ml-lg-1",
	"m-lg-2": "m-lg-2",
	"mt-lg-2": "mt-lg-2",
	"my-lg-2": "my-lg-2",
	"mr-lg-2": "mr-lg-2",
	"mx-lg-2": "mx-lg-2",
	"mb-lg-2": "mb-lg-2",
	"ml-lg-2": "ml-lg-2",
	"m-lg-3": "m-lg-3",
	"mt-lg-3": "mt-lg-3",
	"my-lg-3": "my-lg-3",
	"mr-lg-3": "mr-lg-3",
	"mx-lg-3": "mx-lg-3",
	"mb-lg-3": "mb-lg-3",
	"ml-lg-3": "ml-lg-3",
	"m-lg-4": "m-lg-4",
	"mt-lg-4": "mt-lg-4",
	"my-lg-4": "my-lg-4",
	"mr-lg-4": "mr-lg-4",
	"mx-lg-4": "mx-lg-4",
	"mb-lg-4": "mb-lg-4",
	"ml-lg-4": "ml-lg-4",
	"m-lg-5": "m-lg-5",
	"mt-lg-5": "mt-lg-5",
	"my-lg-5": "my-lg-5",
	"mr-lg-5": "mr-lg-5",
	"mx-lg-5": "mx-lg-5",
	"mb-lg-5": "mb-lg-5",
	"ml-lg-5": "ml-lg-5",
	"p-lg-0": "p-lg-0",
	"pt-lg-0": "pt-lg-0",
	"py-lg-0": "py-lg-0",
	"pr-lg-0": "pr-lg-0",
	"px-lg-0": "px-lg-0",
	"pb-lg-0": "pb-lg-0",
	"pl-lg-0": "pl-lg-0",
	"p-lg-1": "p-lg-1",
	"pt-lg-1": "pt-lg-1",
	"py-lg-1": "py-lg-1",
	"pr-lg-1": "pr-lg-1",
	"px-lg-1": "px-lg-1",
	"pb-lg-1": "pb-lg-1",
	"pl-lg-1": "pl-lg-1",
	"p-lg-2": "p-lg-2",
	"pt-lg-2": "pt-lg-2",
	"py-lg-2": "py-lg-2",
	"pr-lg-2": "pr-lg-2",
	"px-lg-2": "px-lg-2",
	"pb-lg-2": "pb-lg-2",
	"pl-lg-2": "pl-lg-2",
	"p-lg-3": "p-lg-3",
	"pt-lg-3": "pt-lg-3",
	"py-lg-3": "py-lg-3",
	"pr-lg-3": "pr-lg-3",
	"px-lg-3": "px-lg-3",
	"pb-lg-3": "pb-lg-3",
	"pl-lg-3": "pl-lg-3",
	"p-lg-4": "p-lg-4",
	"pt-lg-4": "pt-lg-4",
	"py-lg-4": "py-lg-4",
	"pr-lg-4": "pr-lg-4",
	"px-lg-4": "px-lg-4",
	"pb-lg-4": "pb-lg-4",
	"pl-lg-4": "pl-lg-4",
	"p-lg-5": "p-lg-5",
	"pt-lg-5": "pt-lg-5",
	"py-lg-5": "py-lg-5",
	"pr-lg-5": "pr-lg-5",
	"px-lg-5": "px-lg-5",
	"pb-lg-5": "pb-lg-5",
	"pl-lg-5": "pl-lg-5",
	"m-lg-auto": "m-lg-auto",
	"mt-lg-auto": "mt-lg-auto",
	"my-lg-auto": "my-lg-auto",
	"mr-lg-auto": "mr-lg-auto",
	"mx-lg-auto": "mx-lg-auto",
	"mb-lg-auto": "mb-lg-auto",
	"ml-lg-auto": "ml-lg-auto",
	"m-xl-0": "m-xl-0",
	"mt-xl-0": "mt-xl-0",
	"my-xl-0": "my-xl-0",
	"mr-xl-0": "mr-xl-0",
	"mx-xl-0": "mx-xl-0",
	"mb-xl-0": "mb-xl-0",
	"ml-xl-0": "ml-xl-0",
	"m-xl-1": "m-xl-1",
	"mt-xl-1": "mt-xl-1",
	"my-xl-1": "my-xl-1",
	"mr-xl-1": "mr-xl-1",
	"mx-xl-1": "mx-xl-1",
	"mb-xl-1": "mb-xl-1",
	"ml-xl-1": "ml-xl-1",
	"m-xl-2": "m-xl-2",
	"mt-xl-2": "mt-xl-2",
	"my-xl-2": "my-xl-2",
	"mr-xl-2": "mr-xl-2",
	"mx-xl-2": "mx-xl-2",
	"mb-xl-2": "mb-xl-2",
	"ml-xl-2": "ml-xl-2",
	"m-xl-3": "m-xl-3",
	"mt-xl-3": "mt-xl-3",
	"my-xl-3": "my-xl-3",
	"mr-xl-3": "mr-xl-3",
	"mx-xl-3": "mx-xl-3",
	"mb-xl-3": "mb-xl-3",
	"ml-xl-3": "ml-xl-3",
	"m-xl-4": "m-xl-4",
	"mt-xl-4": "mt-xl-4",
	"my-xl-4": "my-xl-4",
	"mr-xl-4": "mr-xl-4",
	"mx-xl-4": "mx-xl-4",
	"mb-xl-4": "mb-xl-4",
	"ml-xl-4": "ml-xl-4",
	"m-xl-5": "m-xl-5",
	"mt-xl-5": "mt-xl-5",
	"my-xl-5": "my-xl-5",
	"mr-xl-5": "mr-xl-5",
	"mx-xl-5": "mx-xl-5",
	"mb-xl-5": "mb-xl-5",
	"ml-xl-5": "ml-xl-5",
	"p-xl-0": "p-xl-0",
	"pt-xl-0": "pt-xl-0",
	"py-xl-0": "py-xl-0",
	"pr-xl-0": "pr-xl-0",
	"px-xl-0": "px-xl-0",
	"pb-xl-0": "pb-xl-0",
	"pl-xl-0": "pl-xl-0",
	"p-xl-1": "p-xl-1",
	"pt-xl-1": "pt-xl-1",
	"py-xl-1": "py-xl-1",
	"pr-xl-1": "pr-xl-1",
	"px-xl-1": "px-xl-1",
	"pb-xl-1": "pb-xl-1",
	"pl-xl-1": "pl-xl-1",
	"p-xl-2": "p-xl-2",
	"pt-xl-2": "pt-xl-2",
	"py-xl-2": "py-xl-2",
	"pr-xl-2": "pr-xl-2",
	"px-xl-2": "px-xl-2",
	"pb-xl-2": "pb-xl-2",
	"pl-xl-2": "pl-xl-2",
	"p-xl-3": "p-xl-3",
	"pt-xl-3": "pt-xl-3",
	"py-xl-3": "py-xl-3",
	"pr-xl-3": "pr-xl-3",
	"px-xl-3": "px-xl-3",
	"pb-xl-3": "pb-xl-3",
	"pl-xl-3": "pl-xl-3",
	"p-xl-4": "p-xl-4",
	"pt-xl-4": "pt-xl-4",
	"py-xl-4": "py-xl-4",
	"pr-xl-4": "pr-xl-4",
	"px-xl-4": "px-xl-4",
	"pb-xl-4": "pb-xl-4",
	"pl-xl-4": "pl-xl-4",
	"p-xl-5": "p-xl-5",
	"pt-xl-5": "pt-xl-5",
	"py-xl-5": "py-xl-5",
	"pr-xl-5": "pr-xl-5",
	"px-xl-5": "px-xl-5",
	"pb-xl-5": "pb-xl-5",
	"pl-xl-5": "pl-xl-5",
	"m-xl-auto": "m-xl-auto",
	"mt-xl-auto": "mt-xl-auto",
	"my-xl-auto": "my-xl-auto",
	"mr-xl-auto": "mr-xl-auto",
	"mx-xl-auto": "mx-xl-auto",
	"mb-xl-auto": "mb-xl-auto",
	"ml-xl-auto": "ml-xl-auto",
	"text-justify": "text-justify",
	"text-nowrap": "text-nowrap",
	"text-truncate": "text-truncate",
	"text-left": "text-left",
	"text-right": "text-right",
	"text-center": "text-center",
	"text-sm-left": "text-sm-left",
	"text-sm-right": "text-sm-right",
	"text-sm-center": "text-sm-center",
	"text-md-left": "text-md-left",
	"text-md-right": "text-md-right",
	"text-md-center": "text-md-center",
	"text-lg-left": "text-lg-left",
	"text-lg-right": "text-lg-right",
	"text-lg-center": "text-lg-center",
	"text-xl-left": "text-xl-left",
	"text-xl-right": "text-xl-right",
	"text-xl-center": "text-xl-center",
	"text-lowercase": "text-lowercase",
	"text-uppercase": "text-uppercase",
	"text-capitalize": "text-capitalize",
	"font-weight-light": "font-weight-light",
	"font-weight-normal": "font-weight-normal",
	"font-weight-bold": "font-weight-bold",
	"font-italic": "font-italic",
	"text-white": "text-white",
	"text-primary": "text-primary",
	"text-secondary": "text-secondary",
	"text-success": "text-success",
	"text-info": "text-info",
	"text-warning": "text-warning",
	"text-danger": "text-danger",
	"text-light": "text-light",
	"text-dark": "text-dark",
	"text-inverse": "text-inverse",
	"text-gray": "text-gray",
	"text-default": "text-default",
	"text-muted": "text-muted",
	"text-hide": "text-hide",
	"visible": "visible",
	"invisible": "invisible",
	"glyphicon": "glyphicon",
	"x05": "x05",
	"x2": "x2",
	"x3": "x3",
	"x4": "x4",
	"x5": "x5",
	"x6": "x6",
	"x7": "x7",
	"x8": "x8",
	"light": "light",
	"drop": "drop",
	"flip": "flip",
	"flipv": "flipv",
	"rotate90": "rotate90",
	"rotate180": "rotate180",
	"rotate270": "rotate270",
	"glyphicon-glass": "glyphicon-glass",
	"glyphicon-music": "glyphicon-music",
	"glyphicon-search": "glyphicon-search",
	"glyphicon-envelope": "glyphicon-envelope",
	"glyphicon-heart": "glyphicon-heart",
	"glyphicon-star": "glyphicon-star",
	"glyphicon-star-empty": "glyphicon-star-empty",
	"glyphicon-user": "glyphicon-user",
	"glyphicon-film": "glyphicon-film",
	"glyphicon-th-large": "glyphicon-th-large",
	"glyphicon-th": "glyphicon-th",
	"glyphicon-th-list": "glyphicon-th-list",
	"glyphicon-ok": "glyphicon-ok",
	"glyphicon-remove": "glyphicon-remove",
	"glyphicon-zoom-in": "glyphicon-zoom-in",
	"glyphicon-zoom-out": "glyphicon-zoom-out",
	"glyphicon-off": "glyphicon-off",
	"glyphicon-signal": "glyphicon-signal",
	"glyphicon-cog": "glyphicon-cog",
	"glyphicon-trash": "glyphicon-trash",
	"glyphicon-home": "glyphicon-home",
	"glyphicon-file": "glyphicon-file",
	"glyphicon-time": "glyphicon-time",
	"glyphicon-road": "glyphicon-road",
	"glyphicon-download-alt": "glyphicon-download-alt",
	"glyphicon-download": "glyphicon-download",
	"glyphicon-upload": "glyphicon-upload",
	"glyphicon-inbox": "glyphicon-inbox",
	"glyphicon-play-circle": "glyphicon-play-circle",
	"glyphicon-repeat": "glyphicon-repeat",
	"glyphicon-refresh": "glyphicon-refresh",
	"glyphicon-list-alt": "glyphicon-list-alt",
	"glyphicon-glyph-lock": "glyphicon-glyph-lock",
	"glyphicon-flag": "glyphicon-flag",
	"glyphicon-headphones": "glyphicon-headphones",
	"glyphicon-volume-off": "glyphicon-volume-off",
	"glyphicon-volume-down": "glyphicon-volume-down",
	"glyphicon-volume-up": "glyphicon-volume-up",
	"glyphicon-qrcode": "glyphicon-qrcode",
	"glyphicon-barcode": "glyphicon-barcode",
	"glyphicon-tag": "glyphicon-tag",
	"glyphicon-tags": "glyphicon-tags",
	"glyphicon-book": "glyphicon-book",
	"glyphicon-glyph-bookmark": "glyphicon-glyph-bookmark",
	"glyphicon-print": "glyphicon-print",
	"glyphicon-glyph-camera": "glyphicon-glyph-camera",
	"glyphicon-font": "glyphicon-font",
	"glyphicon-bold": "glyphicon-bold",
	"glyphicon-italic": "glyphicon-italic",
	"glyphicon-text-height": "glyphicon-text-height",
	"glyphicon-text-width": "glyphicon-text-width",
	"glyphicon-align-left": "glyphicon-align-left",
	"glyphicon-align-center": "glyphicon-align-center",
	"glyphicon-align-right": "glyphicon-align-right",
	"glyphicon-align-justify": "glyphicon-align-justify",
	"glyphicon-list": "glyphicon-list",
	"glyphicon-indent-left": "glyphicon-indent-left",
	"glyphicon-indent-right": "glyphicon-indent-right",
	"glyphicon-facetime-video": "glyphicon-facetime-video",
	"glyphicon-picture": "glyphicon-picture",
	"glyphicon-pencil": "glyphicon-pencil",
	"glyphicon-map-marker": "glyphicon-map-marker",
	"glyphicon-adjust": "glyphicon-adjust",
	"glyphicon-tint": "glyphicon-tint",
	"glyphicon-edit": "glyphicon-edit",
	"glyphicon-share": "glyphicon-share",
	"glyphicon-check": "glyphicon-check",
	"glyphicon-move": "glyphicon-move",
	"glyphicon-step-backward": "glyphicon-step-backward",
	"glyphicon-fast-backward": "glyphicon-fast-backward",
	"glyphicon-backward": "glyphicon-backward",
	"glyphicon-play": "glyphicon-play",
	"glyphicon-pause": "glyphicon-pause",
	"glyphicon-stop": "glyphicon-stop",
	"glyphicon-forward": "glyphicon-forward",
	"glyphicon-fast-forward": "glyphicon-fast-forward",
	"glyphicon-step-forward": "glyphicon-step-forward",
	"glyphicon-eject": "glyphicon-eject",
	"glyphicon-chevron-left": "glyphicon-chevron-left",
	"glyphicon-chevron-right": "glyphicon-chevron-right",
	"glyphicon-plus-sign": "glyphicon-plus-sign",
	"glyphicon-minus-sign": "glyphicon-minus-sign",
	"glyphicon-remove-sign": "glyphicon-remove-sign",
	"glyphicon-ok-sign": "glyphicon-ok-sign",
	"glyphicon-question-sign": "glyphicon-question-sign",
	"glyphicon-info-sign": "glyphicon-info-sign",
	"glyphicon-screenshot": "glyphicon-screenshot",
	"glyphicon-remove-circle": "glyphicon-remove-circle",
	"glyphicon-ok-circle": "glyphicon-ok-circle",
	"glyphicon-ban-circle": "glyphicon-ban-circle",
	"glyphicon-arrow-left": "glyphicon-arrow-left",
	"glyphicon-arrow-right": "glyphicon-arrow-right",
	"glyphicon-arrow-up": "glyphicon-arrow-up",
	"glyphicon-arrow-down": "glyphicon-arrow-down",
	"glyphicon-share-alt": "glyphicon-share-alt",
	"glyphicon-resize-full": "glyphicon-resize-full",
	"glyphicon-resize-small": "glyphicon-resize-small",
	"glyphicon-plus": "glyphicon-plus",
	"glyphicon-minus": "glyphicon-minus",
	"glyphicon-asterisk": "glyphicon-asterisk",
	"glyphicon-exclamation-sign": "glyphicon-exclamation-sign",
	"glyphicon-gift": "glyphicon-gift",
	"glyphicon-leaf": "glyphicon-leaf",
	"glyphicon-glyph-fire": "glyphicon-glyph-fire",
	"glyphicon-eye-open": "glyphicon-eye-open",
	"glyphicon-eye-close": "glyphicon-eye-close",
	"glyphicon-warning-sign": "glyphicon-warning-sign",
	"glyphicon-plane": "glyphicon-plane",
	"glyphicon-glyph-calendar": "glyphicon-glyph-calendar",
	"glyphicon-random": "glyphicon-random",
	"glyphicon-comments": "glyphicon-comments",
	"glyphicon-magnet": "glyphicon-magnet",
	"glyphicon-chevron-up": "glyphicon-chevron-up",
	"glyphicon-chevron-down": "glyphicon-chevron-down",
	"glyphicon-retweet": "glyphicon-retweet",
	"glyphicon-shopping-cart": "glyphicon-shopping-cart",
	"glyphicon-folder-close": "glyphicon-folder-close",
	"glyphicon-folder-open": "glyphicon-folder-open",
	"glyphicon-resize-vertical": "glyphicon-resize-vertical",
	"glyphicon-resize-horizontal": "glyphicon-resize-horizontal",
	"glyphicon-hdd": "glyphicon-hdd",
	"glyphicon-bullhorn": "glyphicon-bullhorn",
	"glyphicon-glyph-bell": "glyphicon-glyph-bell",
	"glyphicon-certificate": "glyphicon-certificate",
	"glyphicon-thumbs-up": "glyphicon-thumbs-up",
	"glyphicon-thumbs-down": "glyphicon-thumbs-down",
	"glyphicon-hand-right": "glyphicon-hand-right",
	"glyphicon-hand-left": "glyphicon-hand-left",
	"glyphicon-hand-top": "glyphicon-hand-top",
	"glyphicon-hand-down": "glyphicon-hand-down",
	"glyphicon-circle-arrow-right": "glyphicon-circle-arrow-right",
	"glyphicon-circle-arrow-left": "glyphicon-circle-arrow-left",
	"glyphicon-circle-arrow-top": "glyphicon-circle-arrow-top",
	"glyphicon-circle-arrow-down": "glyphicon-circle-arrow-down",
	"glyphicon-globe": "glyphicon-globe",
	"glyphicon-glyph-wrench": "glyphicon-glyph-wrench",
	"glyphicon-tasks": "glyphicon-tasks",
	"glyphicon-filter": "glyphicon-filter",
	"glyphicon-glyph-briefcase": "glyphicon-glyph-briefcase",
	"glyphicon-fullscreen": "glyphicon-fullscreen",
	"glyphicon-dashboard": "glyphicon-dashboard",
	"glyphicon-glyph-paperclip": "glyphicon-glyph-paperclip",
	"glyphicon-heart-empty": "glyphicon-heart-empty",
	"glyphicon-link": "glyphicon-link",
	"glyphicon-phone": "glyphicon-phone",
	"glyphicon-glyph-pushpin": "glyphicon-glyph-pushpin",
	"glyphicon-euro": "glyphicon-euro",
	"glyphicon-usd": "glyphicon-usd",
	"glyphicon-gbp": "glyphicon-gbp",
	"glyphicon-sort": "glyphicon-sort",
	"glyphicon-sort-by-alphabet": "glyphicon-sort-by-alphabet",
	"glyphicon-sort-by-alphabet-alt": "glyphicon-sort-by-alphabet-alt",
	"glyphicon-sort-by-order": "glyphicon-sort-by-order",
	"glyphicon-sort-by-order-alt": "glyphicon-sort-by-order-alt",
	"glyphicon-sort-by-attributes": "glyphicon-sort-by-attributes",
	"glyphicon-sort-by-attributes-alt": "glyphicon-sort-by-attributes-alt",
	"glyphicon-unchecked": "glyphicon-unchecked",
	"glyphicon-expand": "glyphicon-expand",
	"glyphicon-collapse": "glyphicon-collapse",
	"glyphicon-collapse-top": "glyphicon-collapse-top",
	"glyphicon-log-in": "glyphicon-log-in",
	"glyphicon-flash": "glyphicon-flash",
	"glyphicon-log-out": "glyphicon-log-out",
	"glyphicon-new-window": "glyphicon-new-window",
	"glyphicon-record": "glyphicon-record",
	"glyphicon-save": "glyphicon-save",
	"glyphicon-open": "glyphicon-open",
	"glyphicon-saved": "glyphicon-saved",
	"glyphicon-import": "glyphicon-import",
	"glyphicon-export": "glyphicon-export",
	"glyphicon-send": "glyphicon-send",
	"glyphicon-floppy-disk": "glyphicon-floppy-disk",
	"glyphicon-floppy-saved": "glyphicon-floppy-saved",
	"glyphicon-floppy-remove": "glyphicon-floppy-remove",
	"glyphicon-floppy-save": "glyphicon-floppy-save",
	"glyphicon-floppy-open": "glyphicon-floppy-open",
	"glyphicon-credit-card": "glyphicon-credit-card",
	"glyphicon-transfer": "glyphicon-transfer",
	"glyphicon-cutlery": "glyphicon-cutlery",
	"glyphicon-header": "glyphicon-header",
	"glyphicon-compressed": "glyphicon-compressed",
	"glyphicon-earphone": "glyphicon-earphone",
	"glyphicon-phone-alt": "glyphicon-phone-alt",
	"glyphicon-tower": "glyphicon-tower",
	"glyphicon-stats": "glyphicon-stats",
	"glyphicon-sd-video": "glyphicon-sd-video",
	"glyphicon-hd-video": "glyphicon-hd-video",
	"glyphicon-subtitles": "glyphicon-subtitles",
	"glyphicon-sound-stereo": "glyphicon-sound-stereo",
	"glyphicon-sound-dolby": "glyphicon-sound-dolby",
	"glyphicon-sound-5-1": "glyphicon-sound-5-1",
	"glyphicon-sound-6-1": "glyphicon-sound-6-1",
	"glyphicon-sound-7-1": "glyphicon-sound-7-1",
	"glyphicon-copyright-mark": "glyphicon-copyright-mark",
	"glyphicon-registration-mark": "glyphicon-registration-mark",
	"glyphicon-cloud": "glyphicon-cloud",
	"glyphicon-cloud-download": "glyphicon-cloud-download",
	"glyphicon-cloud-upload": "glyphicon-cloud-upload",
	"glyphicon-tree-conifer": "glyphicon-tree-conifer",
	"glyphicon-tree-deciduous": "glyphicon-tree-deciduous",
	"glyphicon-cd": "glyphicon-cd",
	"glyphicon-save-file": "glyphicon-save-file",
	"glyphicon-open-file": "glyphicon-open-file",
	"glyphicon-level-up": "glyphicon-level-up",
	"glyphicon-copy": "glyphicon-copy",
	"glyphicon-paste": "glyphicon-paste",
	"glyphicon-door": "glyphicon-door",
	"glyphicon-key": "glyphicon-key",
	"glyphicon-alert": "glyphicon-alert",
	"glyphicon-equalizer": "glyphicon-equalizer",
	"glyphicon-king": "glyphicon-king",
	"glyphicon-queen": "glyphicon-queen",
	"glyphicon-pawn": "glyphicon-pawn",
	"glyphicon-bishop": "glyphicon-bishop",
	"glyphicon-knight": "glyphicon-knight",
	"glyphicon-baby-formula": "glyphicon-baby-formula",
	"glyphicon-tent": "glyphicon-tent",
	"glyphicon-blackboard": "glyphicon-blackboard",
	"glyphicon-bed": "glyphicon-bed",
	"glyphicon-apple": "glyphicon-apple",
	"glyphicon-erase": "glyphicon-erase",
	"glyphicon-hourglass": "glyphicon-hourglass",
	"glyphicon-lamp": "glyphicon-lamp",
	"glyphicon-duplicate": "glyphicon-duplicate",
	"glyphicon-piggy-bank": "glyphicon-piggy-bank",
	"glyphicon-scissors": "glyphicon-scissors",
	"glyphicon-bitcoin": "glyphicon-bitcoin",
	"glyphicon-yen": "glyphicon-yen",
	"glyphicon-ruble": "glyphicon-ruble",
	"glyphicon-scale": "glyphicon-scale",
	"glyphicon-ice-lolly": "glyphicon-ice-lolly",
	"glyphicon-ice-lolly-tasted": "glyphicon-ice-lolly-tasted",
	"glyphicon-education": "glyphicon-education",
	"glyphicon-option-horizontal": "glyphicon-option-horizontal",
	"glyphicon-option-vertical": "glyphicon-option-vertical",
	"glyphicon-menu-hamburger": "glyphicon-menu-hamburger",
	"glyphicon-modal-window": "glyphicon-modal-window",
	"glyphicon-oil": "glyphicon-oil",
	"glyphicon-grain": "glyphicon-grain",
	"glyphicon-sunglasses": "glyphicon-sunglasses",
	"glyphicon-text-size": "glyphicon-text-size",
	"glyphicon-text-color": "glyphicon-text-color",
	"glyphicon-text-background": "glyphicon-text-background",
	"glyphicon-object-align-top": "glyphicon-object-align-top",
	"glyphicon-object-align-bottom": "glyphicon-object-align-bottom",
	"glyphicon-object-align-horizontal": "glyphicon-object-align-horizontal",
	"glyphicon-object-align-left": "glyphicon-object-align-left",
	"glyphicon-object-align-vertical": "glyphicon-object-align-vertical",
	"glyphicon-object-align-right": "glyphicon-object-align-right",
	"glyphicon-triangle-right": "glyphicon-triangle-right",
	"glyphicon-triangle-left": "glyphicon-triangle-left",
	"glyphicon-triangle-bottom": "glyphicon-triangle-bottom",
	"glyphicon-triangle-top": "glyphicon-triangle-top",
	"glyphicon-terminal": "glyphicon-terminal",
	"glyphicon-superscript": "glyphicon-superscript",
	"glyphicon-subscript": "glyphicon-subscript",
	"glyphicon-menu-left": "glyphicon-menu-left",
	"glyphicon-menu-right": "glyphicon-menu-right",
	"glyphicon-menu-down": "glyphicon-menu-down",
	"glyphicon-menu-up": "glyphicon-menu-up",
	"fa": "fa",
	"fa-lg": "fa-lg",
	"fa-2x": "fa-2x",
	"fa-3x": "fa-3x",
	"fa-4x": "fa-4x",
	"fa-5x": "fa-5x",
	"fa-fw": "fa-fw",
	"fa-ul": "fa-ul",
	"fa-li": "fa-li",
	"fa-border": "fa-border",
	"fa-pull-left": "fa-pull-left",
	"fa-pull-right": "fa-pull-right",
	"pull-right": "pull-right",
	"pull-left": "pull-left",
	"fa-spin": "fa-spin",
	"fa-pulse": "fa-pulse",
	"fa-rotate-90": "fa-rotate-90",
	"fa-rotate-180": "fa-rotate-180",
	"fa-rotate-270": "fa-rotate-270",
	"fa-flip-horizontal": "fa-flip-horizontal",
	"fa-flip-vertical": "fa-flip-vertical",
	"fa-stack": "fa-stack",
	"fa-stack-1x": "fa-stack-1x",
	"fa-stack-2x": "fa-stack-2x",
	"fa-inverse": "fa-inverse",
	"fa-glass": "fa-glass",
	"fa-music": "fa-music",
	"fa-search": "fa-search",
	"fa-envelope-o": "fa-envelope-o",
	"fa-heart": "fa-heart",
	"fa-star": "fa-star",
	"fa-star-o": "fa-star-o",
	"fa-user": "fa-user",
	"fa-film": "fa-film",
	"fa-th-large": "fa-th-large",
	"fa-th": "fa-th",
	"fa-th-list": "fa-th-list",
	"fa-check": "fa-check",
	"fa-remove": "fa-remove",
	"fa-close": "fa-close",
	"fa-times": "fa-times",
	"fa-search-plus": "fa-search-plus",
	"fa-search-minus": "fa-search-minus",
	"fa-power-off": "fa-power-off",
	"fa-signal": "fa-signal",
	"fa-gear": "fa-gear",
	"fa-cog": "fa-cog",
	"fa-trash-o": "fa-trash-o",
	"fa-home": "fa-home",
	"fa-file-o": "fa-file-o",
	"fa-clock-o": "fa-clock-o",
	"fa-road": "fa-road",
	"fa-download": "fa-download",
	"fa-arrow-circle-o-down": "fa-arrow-circle-o-down",
	"fa-arrow-circle-o-up": "fa-arrow-circle-o-up",
	"fa-inbox": "fa-inbox",
	"fa-play-circle-o": "fa-play-circle-o",
	"fa-rotate-right": "fa-rotate-right",
	"fa-repeat": "fa-repeat",
	"fa-refresh": "fa-refresh",
	"fa-list-alt": "fa-list-alt",
	"fa-lock": "fa-lock",
	"fa-flag": "fa-flag",
	"fa-headphones": "fa-headphones",
	"fa-volume-off": "fa-volume-off",
	"fa-volume-down": "fa-volume-down",
	"fa-volume-up": "fa-volume-up",
	"fa-qrcode": "fa-qrcode",
	"fa-barcode": "fa-barcode",
	"fa-tag": "fa-tag",
	"fa-tags": "fa-tags",
	"fa-book": "fa-book",
	"fa-bookmark": "fa-bookmark",
	"fa-print": "fa-print",
	"fa-camera": "fa-camera",
	"fa-font": "fa-font",
	"fa-bold": "fa-bold",
	"fa-italic": "fa-italic",
	"fa-text-height": "fa-text-height",
	"fa-text-width": "fa-text-width",
	"fa-align-left": "fa-align-left",
	"fa-align-center": "fa-align-center",
	"fa-align-right": "fa-align-right",
	"fa-align-justify": "fa-align-justify",
	"fa-list": "fa-list",
	"fa-dedent": "fa-dedent",
	"fa-outdent": "fa-outdent",
	"fa-indent": "fa-indent",
	"fa-video-camera": "fa-video-camera",
	"fa-photo": "fa-photo",
	"fa-image": "fa-image",
	"fa-picture-o": "fa-picture-o",
	"fa-pencil": "fa-pencil",
	"fa-map-marker": "fa-map-marker",
	"fa-adjust": "fa-adjust",
	"fa-tint": "fa-tint",
	"fa-edit": "fa-edit",
	"fa-pencil-square-o": "fa-pencil-square-o",
	"fa-share-square-o": "fa-share-square-o",
	"fa-check-square-o": "fa-check-square-o",
	"fa-arrows": "fa-arrows",
	"fa-step-backward": "fa-step-backward",
	"fa-fast-backward": "fa-fast-backward",
	"fa-backward": "fa-backward",
	"fa-play": "fa-play",
	"fa-pause": "fa-pause",
	"fa-stop": "fa-stop",
	"fa-forward": "fa-forward",
	"fa-fast-forward": "fa-fast-forward",
	"fa-step-forward": "fa-step-forward",
	"fa-eject": "fa-eject",
	"fa-chevron-left": "fa-chevron-left",
	"fa-chevron-right": "fa-chevron-right",
	"fa-plus-circle": "fa-plus-circle",
	"fa-minus-circle": "fa-minus-circle",
	"fa-times-circle": "fa-times-circle",
	"fa-check-circle": "fa-check-circle",
	"fa-question-circle": "fa-question-circle",
	"fa-info-circle": "fa-info-circle",
	"fa-crosshairs": "fa-crosshairs",
	"fa-times-circle-o": "fa-times-circle-o",
	"fa-check-circle-o": "fa-check-circle-o",
	"fa-ban": "fa-ban",
	"fa-arrow-left": "fa-arrow-left",
	"fa-arrow-right": "fa-arrow-right",
	"fa-arrow-up": "fa-arrow-up",
	"fa-arrow-down": "fa-arrow-down",
	"fa-mail-forward": "fa-mail-forward",
	"fa-share": "fa-share",
	"fa-expand": "fa-expand",
	"fa-compress": "fa-compress",
	"fa-plus": "fa-plus",
	"fa-minus": "fa-minus",
	"fa-asterisk": "fa-asterisk",
	"fa-exclamation-circle": "fa-exclamation-circle",
	"fa-gift": "fa-gift",
	"fa-leaf": "fa-leaf",
	"fa-fire": "fa-fire",
	"fa-eye": "fa-eye",
	"fa-eye-slash": "fa-eye-slash",
	"fa-warning": "fa-warning",
	"fa-exclamation-triangle": "fa-exclamation-triangle",
	"fa-plane": "fa-plane",
	"fa-calendar": "fa-calendar",
	"fa-random": "fa-random",
	"fa-comment": "fa-comment",
	"fa-magnet": "fa-magnet",
	"fa-chevron-up": "fa-chevron-up",
	"fa-chevron-down": "fa-chevron-down",
	"fa-retweet": "fa-retweet",
	"fa-shopping-cart": "fa-shopping-cart",
	"fa-folder": "fa-folder",
	"fa-folder-open": "fa-folder-open",
	"fa-arrows-v": "fa-arrows-v",
	"fa-arrows-h": "fa-arrows-h",
	"fa-bar-chart-o": "fa-bar-chart-o",
	"fa-bar-chart": "fa-bar-chart",
	"fa-twitter-square": "fa-twitter-square",
	"fa-facebook-square": "fa-facebook-square",
	"fa-camera-retro": "fa-camera-retro",
	"fa-key": "fa-key",
	"fa-gears": "fa-gears",
	"fa-cogs": "fa-cogs",
	"fa-comments": "fa-comments",
	"fa-thumbs-o-up": "fa-thumbs-o-up",
	"fa-thumbs-o-down": "fa-thumbs-o-down",
	"fa-star-half": "fa-star-half",
	"fa-heart-o": "fa-heart-o",
	"fa-sign-out": "fa-sign-out",
	"fa-linkedin-square": "fa-linkedin-square",
	"fa-thumb-tack": "fa-thumb-tack",
	"fa-external-link": "fa-external-link",
	"fa-sign-in": "fa-sign-in",
	"fa-trophy": "fa-trophy",
	"fa-github-square": "fa-github-square",
	"fa-upload": "fa-upload",
	"fa-lemon-o": "fa-lemon-o",
	"fa-phone": "fa-phone",
	"fa-square-o": "fa-square-o",
	"fa-bookmark-o": "fa-bookmark-o",
	"fa-phone-square": "fa-phone-square",
	"fa-twitter": "fa-twitter",
	"fa-facebook-f": "fa-facebook-f",
	"fa-facebook": "fa-facebook",
	"fa-github": "fa-github",
	"fa-unlock": "fa-unlock",
	"fa-credit-card": "fa-credit-card",
	"fa-feed": "fa-feed",
	"fa-rss": "fa-rss",
	"fa-hdd-o": "fa-hdd-o",
	"fa-bullhorn": "fa-bullhorn",
	"fa-bell": "fa-bell",
	"fa-certificate": "fa-certificate",
	"fa-hand-o-right": "fa-hand-o-right",
	"fa-hand-o-left": "fa-hand-o-left",
	"fa-hand-o-up": "fa-hand-o-up",
	"fa-hand-o-down": "fa-hand-o-down",
	"fa-arrow-circle-left": "fa-arrow-circle-left",
	"fa-arrow-circle-right": "fa-arrow-circle-right",
	"fa-arrow-circle-up": "fa-arrow-circle-up",
	"fa-arrow-circle-down": "fa-arrow-circle-down",
	"fa-globe": "fa-globe",
	"fa-wrench": "fa-wrench",
	"fa-tasks": "fa-tasks",
	"fa-filter": "fa-filter",
	"fa-briefcase": "fa-briefcase",
	"fa-arrows-alt": "fa-arrows-alt",
	"fa-group": "fa-group",
	"fa-users": "fa-users",
	"fa-chain": "fa-chain",
	"fa-link": "fa-link",
	"fa-cloud": "fa-cloud",
	"fa-flask": "fa-flask",
	"fa-cut": "fa-cut",
	"fa-scissors": "fa-scissors",
	"fa-copy": "fa-copy",
	"fa-files-o": "fa-files-o",
	"fa-paperclip": "fa-paperclip",
	"fa-save": "fa-save",
	"fa-floppy-o": "fa-floppy-o",
	"fa-square": "fa-square",
	"fa-navicon": "fa-navicon",
	"fa-reorder": "fa-reorder",
	"fa-bars": "fa-bars",
	"fa-list-ul": "fa-list-ul",
	"fa-list-ol": "fa-list-ol",
	"fa-strikethrough": "fa-strikethrough",
	"fa-underline": "fa-underline",
	"fa-table": "fa-table",
	"fa-magic": "fa-magic",
	"fa-truck": "fa-truck",
	"fa-pinterest": "fa-pinterest",
	"fa-pinterest-square": "fa-pinterest-square",
	"fa-google-plus-square": "fa-google-plus-square",
	"fa-google-plus": "fa-google-plus",
	"fa-money": "fa-money",
	"fa-caret-down": "fa-caret-down",
	"fa-caret-up": "fa-caret-up",
	"fa-caret-left": "fa-caret-left",
	"fa-caret-right": "fa-caret-right",
	"fa-columns": "fa-columns",
	"fa-unsorted": "fa-unsorted",
	"fa-sort": "fa-sort",
	"fa-sort-down": "fa-sort-down",
	"fa-sort-desc": "fa-sort-desc",
	"fa-sort-up": "fa-sort-up",
	"fa-sort-asc": "fa-sort-asc",
	"fa-envelope": "fa-envelope",
	"fa-linkedin": "fa-linkedin",
	"fa-rotate-left": "fa-rotate-left",
	"fa-undo": "fa-undo",
	"fa-legal": "fa-legal",
	"fa-gavel": "fa-gavel",
	"fa-dashboard": "fa-dashboard",
	"fa-tachometer": "fa-tachometer",
	"fa-comment-o": "fa-comment-o",
	"fa-comments-o": "fa-comments-o",
	"fa-flash": "fa-flash",
	"fa-bolt": "fa-bolt",
	"fa-sitemap": "fa-sitemap",
	"fa-umbrella": "fa-umbrella",
	"fa-paste": "fa-paste",
	"fa-clipboard": "fa-clipboard",
	"fa-lightbulb-o": "fa-lightbulb-o",
	"fa-exchange": "fa-exchange",
	"fa-cloud-download": "fa-cloud-download",
	"fa-cloud-upload": "fa-cloud-upload",
	"fa-user-md": "fa-user-md",
	"fa-stethoscope": "fa-stethoscope",
	"fa-suitcase": "fa-suitcase",
	"fa-bell-o": "fa-bell-o",
	"fa-coffee": "fa-coffee",
	"fa-cutlery": "fa-cutlery",
	"fa-file-text-o": "fa-file-text-o",
	"fa-building-o": "fa-building-o",
	"fa-hospital-o": "fa-hospital-o",
	"fa-ambulance": "fa-ambulance",
	"fa-medkit": "fa-medkit",
	"fa-fighter-jet": "fa-fighter-jet",
	"fa-beer": "fa-beer",
	"fa-h-square": "fa-h-square",
	"fa-plus-square": "fa-plus-square",
	"fa-angle-double-left": "fa-angle-double-left",
	"fa-angle-double-right": "fa-angle-double-right",
	"fa-angle-double-up": "fa-angle-double-up",
	"fa-angle-double-down": "fa-angle-double-down",
	"fa-angle-left": "fa-angle-left",
	"fa-angle-right": "fa-angle-right",
	"fa-angle-up": "fa-angle-up",
	"fa-angle-down": "fa-angle-down",
	"fa-desktop": "fa-desktop",
	"fa-laptop": "fa-laptop",
	"fa-tablet": "fa-tablet",
	"fa-mobile-phone": "fa-mobile-phone",
	"fa-mobile": "fa-mobile",
	"fa-circle-o": "fa-circle-o",
	"fa-quote-left": "fa-quote-left",
	"fa-quote-right": "fa-quote-right",
	"fa-spinner": "fa-spinner",
	"fa-circle": "fa-circle",
	"fa-mail-reply": "fa-mail-reply",
	"fa-reply": "fa-reply",
	"fa-github-alt": "fa-github-alt",
	"fa-folder-o": "fa-folder-o",
	"fa-folder-open-o": "fa-folder-open-o",
	"fa-smile-o": "fa-smile-o",
	"fa-frown-o": "fa-frown-o",
	"fa-meh-o": "fa-meh-o",
	"fa-gamepad": "fa-gamepad",
	"fa-keyboard-o": "fa-keyboard-o",
	"fa-flag-o": "fa-flag-o",
	"fa-flag-checkered": "fa-flag-checkered",
	"fa-terminal": "fa-terminal",
	"fa-code": "fa-code",
	"fa-mail-reply-all": "fa-mail-reply-all",
	"fa-reply-all": "fa-reply-all",
	"fa-star-half-empty": "fa-star-half-empty",
	"fa-star-half-full": "fa-star-half-full",
	"fa-star-half-o": "fa-star-half-o",
	"fa-location-arrow": "fa-location-arrow",
	"fa-crop": "fa-crop",
	"fa-code-fork": "fa-code-fork",
	"fa-unlink": "fa-unlink",
	"fa-chain-broken": "fa-chain-broken",
	"fa-question": "fa-question",
	"fa-info": "fa-info",
	"fa-exclamation": "fa-exclamation",
	"fa-superscript": "fa-superscript",
	"fa-subscript": "fa-subscript",
	"fa-eraser": "fa-eraser",
	"fa-puzzle-piece": "fa-puzzle-piece",
	"fa-microphone": "fa-microphone",
	"fa-microphone-slash": "fa-microphone-slash",
	"fa-shield": "fa-shield",
	"fa-calendar-o": "fa-calendar-o",
	"fa-fire-extinguisher": "fa-fire-extinguisher",
	"fa-rocket": "fa-rocket",
	"fa-maxcdn": "fa-maxcdn",
	"fa-chevron-circle-left": "fa-chevron-circle-left",
	"fa-chevron-circle-right": "fa-chevron-circle-right",
	"fa-chevron-circle-up": "fa-chevron-circle-up",
	"fa-chevron-circle-down": "fa-chevron-circle-down",
	"fa-html5": "fa-html5",
	"fa-css3": "fa-css3",
	"fa-anchor": "fa-anchor",
	"fa-unlock-alt": "fa-unlock-alt",
	"fa-bullseye": "fa-bullseye",
	"fa-ellipsis-h": "fa-ellipsis-h",
	"fa-ellipsis-v": "fa-ellipsis-v",
	"fa-rss-square": "fa-rss-square",
	"fa-play-circle": "fa-play-circle",
	"fa-ticket": "fa-ticket",
	"fa-minus-square": "fa-minus-square",
	"fa-minus-square-o": "fa-minus-square-o",
	"fa-level-up": "fa-level-up",
	"fa-level-down": "fa-level-down",
	"fa-check-square": "fa-check-square",
	"fa-pencil-square": "fa-pencil-square",
	"fa-external-link-square": "fa-external-link-square",
	"fa-share-square": "fa-share-square",
	"fa-compass": "fa-compass",
	"fa-toggle-down": "fa-toggle-down",
	"fa-caret-square-o-down": "fa-caret-square-o-down",
	"fa-toggle-up": "fa-toggle-up",
	"fa-caret-square-o-up": "fa-caret-square-o-up",
	"fa-toggle-right": "fa-toggle-right",
	"fa-caret-square-o-right": "fa-caret-square-o-right",
	"fa-euro": "fa-euro",
	"fa-eur": "fa-eur",
	"fa-gbp": "fa-gbp",
	"fa-dollar": "fa-dollar",
	"fa-usd": "fa-usd",
	"fa-rupee": "fa-rupee",
	"fa-inr": "fa-inr",
	"fa-cny": "fa-cny",
	"fa-rmb": "fa-rmb",
	"fa-yen": "fa-yen",
	"fa-jpy": "fa-jpy",
	"fa-ruble": "fa-ruble",
	"fa-rouble": "fa-rouble",
	"fa-rub": "fa-rub",
	"fa-won": "fa-won",
	"fa-krw": "fa-krw",
	"fa-bitcoin": "fa-bitcoin",
	"fa-btc": "fa-btc",
	"fa-file": "fa-file",
	"fa-file-text": "fa-file-text",
	"fa-sort-alpha-asc": "fa-sort-alpha-asc",
	"fa-sort-alpha-desc": "fa-sort-alpha-desc",
	"fa-sort-amount-asc": "fa-sort-amount-asc",
	"fa-sort-amount-desc": "fa-sort-amount-desc",
	"fa-sort-numeric-asc": "fa-sort-numeric-asc",
	"fa-sort-numeric-desc": "fa-sort-numeric-desc",
	"fa-thumbs-up": "fa-thumbs-up",
	"fa-thumbs-down": "fa-thumbs-down",
	"fa-youtube-square": "fa-youtube-square",
	"fa-youtube": "fa-youtube",
	"fa-xing": "fa-xing",
	"fa-xing-square": "fa-xing-square",
	"fa-youtube-play": "fa-youtube-play",
	"fa-dropbox": "fa-dropbox",
	"fa-stack-overflow": "fa-stack-overflow",
	"fa-instagram": "fa-instagram",
	"fa-flickr": "fa-flickr",
	"fa-adn": "fa-adn",
	"fa-bitbucket": "fa-bitbucket",
	"fa-bitbucket-square": "fa-bitbucket-square",
	"fa-tumblr": "fa-tumblr",
	"fa-tumblr-square": "fa-tumblr-square",
	"fa-long-arrow-down": "fa-long-arrow-down",
	"fa-long-arrow-up": "fa-long-arrow-up",
	"fa-long-arrow-left": "fa-long-arrow-left",
	"fa-long-arrow-right": "fa-long-arrow-right",
	"fa-apple": "fa-apple",
	"fa-windows": "fa-windows",
	"fa-android": "fa-android",
	"fa-linux": "fa-linux",
	"fa-dribbble": "fa-dribbble",
	"fa-skype": "fa-skype",
	"fa-foursquare": "fa-foursquare",
	"fa-trello": "fa-trello",
	"fa-female": "fa-female",
	"fa-male": "fa-male",
	"fa-gittip": "fa-gittip",
	"fa-gratipay": "fa-gratipay",
	"fa-sun-o": "fa-sun-o",
	"fa-moon-o": "fa-moon-o",
	"fa-archive": "fa-archive",
	"fa-bug": "fa-bug",
	"fa-vk": "fa-vk",
	"fa-weibo": "fa-weibo",
	"fa-renren": "fa-renren",
	"fa-pagelines": "fa-pagelines",
	"fa-stack-exchange": "fa-stack-exchange",
	"fa-arrow-circle-o-right": "fa-arrow-circle-o-right",
	"fa-arrow-circle-o-left": "fa-arrow-circle-o-left",
	"fa-toggle-left": "fa-toggle-left",
	"fa-caret-square-o-left": "fa-caret-square-o-left",
	"fa-dot-circle-o": "fa-dot-circle-o",
	"fa-wheelchair": "fa-wheelchair",
	"fa-vimeo-square": "fa-vimeo-square",
	"fa-turkish-lira": "fa-turkish-lira",
	"fa-try": "fa-try",
	"fa-plus-square-o": "fa-plus-square-o",
	"fa-space-shuttle": "fa-space-shuttle",
	"fa-slack": "fa-slack",
	"fa-envelope-square": "fa-envelope-square",
	"fa-wordpress": "fa-wordpress",
	"fa-openid": "fa-openid",
	"fa-institution": "fa-institution",
	"fa-bank": "fa-bank",
	"fa-university": "fa-university",
	"fa-mortar-board": "fa-mortar-board",
	"fa-graduation-cap": "fa-graduation-cap",
	"fa-yahoo": "fa-yahoo",
	"fa-google": "fa-google",
	"fa-reddit": "fa-reddit",
	"fa-reddit-square": "fa-reddit-square",
	"fa-stumbleupon-circle": "fa-stumbleupon-circle",
	"fa-stumbleupon": "fa-stumbleupon",
	"fa-delicious": "fa-delicious",
	"fa-digg": "fa-digg",
	"fa-pied-piper-pp": "fa-pied-piper-pp",
	"fa-pied-piper-alt": "fa-pied-piper-alt",
	"fa-drupal": "fa-drupal",
	"fa-joomla": "fa-joomla",
	"fa-language": "fa-language",
	"fa-fax": "fa-fax",
	"fa-building": "fa-building",
	"fa-child": "fa-child",
	"fa-paw": "fa-paw",
	"fa-spoon": "fa-spoon",
	"fa-cube": "fa-cube",
	"fa-cubes": "fa-cubes",
	"fa-behance": "fa-behance",
	"fa-behance-square": "fa-behance-square",
	"fa-steam": "fa-steam",
	"fa-steam-square": "fa-steam-square",
	"fa-recycle": "fa-recycle",
	"fa-automobile": "fa-automobile",
	"fa-car": "fa-car",
	"fa-cab": "fa-cab",
	"fa-taxi": "fa-taxi",
	"fa-tree": "fa-tree",
	"fa-spotify": "fa-spotify",
	"fa-deviantart": "fa-deviantart",
	"fa-soundcloud": "fa-soundcloud",
	"fa-database": "fa-database",
	"fa-file-pdf-o": "fa-file-pdf-o",
	"fa-file-word-o": "fa-file-word-o",
	"fa-file-excel-o": "fa-file-excel-o",
	"fa-file-powerpoint-o": "fa-file-powerpoint-o",
	"fa-file-photo-o": "fa-file-photo-o",
	"fa-file-picture-o": "fa-file-picture-o",
	"fa-file-image-o": "fa-file-image-o",
	"fa-file-zip-o": "fa-file-zip-o",
	"fa-file-archive-o": "fa-file-archive-o",
	"fa-file-sound-o": "fa-file-sound-o",
	"fa-file-audio-o": "fa-file-audio-o",
	"fa-file-movie-o": "fa-file-movie-o",
	"fa-file-video-o": "fa-file-video-o",
	"fa-file-code-o": "fa-file-code-o",
	"fa-vine": "fa-vine",
	"fa-codepen": "fa-codepen",
	"fa-jsfiddle": "fa-jsfiddle",
	"fa-life-bouy": "fa-life-bouy",
	"fa-life-buoy": "fa-life-buoy",
	"fa-life-saver": "fa-life-saver",
	"fa-support": "fa-support",
	"fa-life-ring": "fa-life-ring",
	"fa-circle-o-notch": "fa-circle-o-notch",
	"fa-ra": "fa-ra",
	"fa-resistance": "fa-resistance",
	"fa-rebel": "fa-rebel",
	"fa-ge": "fa-ge",
	"fa-empire": "fa-empire",
	"fa-git-square": "fa-git-square",
	"fa-git": "fa-git",
	"fa-y-combinator-square": "fa-y-combinator-square",
	"fa-yc-square": "fa-yc-square",
	"fa-hacker-news": "fa-hacker-news",
	"fa-tencent-weibo": "fa-tencent-weibo",
	"fa-qq": "fa-qq",
	"fa-wechat": "fa-wechat",
	"fa-weixin": "fa-weixin",
	"fa-send": "fa-send",
	"fa-paper-plane": "fa-paper-plane",
	"fa-send-o": "fa-send-o",
	"fa-paper-plane-o": "fa-paper-plane-o",
	"fa-history": "fa-history",
	"fa-circle-thin": "fa-circle-thin",
	"fa-header": "fa-header",
	"fa-paragraph": "fa-paragraph",
	"fa-sliders": "fa-sliders",
	"fa-share-alt": "fa-share-alt",
	"fa-share-alt-square": "fa-share-alt-square",
	"fa-bomb": "fa-bomb",
	"fa-soccer-ball-o": "fa-soccer-ball-o",
	"fa-futbol-o": "fa-futbol-o",
	"fa-tty": "fa-tty",
	"fa-binoculars": "fa-binoculars",
	"fa-plug": "fa-plug",
	"fa-slideshare": "fa-slideshare",
	"fa-twitch": "fa-twitch",
	"fa-yelp": "fa-yelp",
	"fa-newspaper-o": "fa-newspaper-o",
	"fa-wifi": "fa-wifi",
	"fa-calculator": "fa-calculator",
	"fa-paypal": "fa-paypal",
	"fa-google-wallet": "fa-google-wallet",
	"fa-cc-visa": "fa-cc-visa",
	"fa-cc-mastercard": "fa-cc-mastercard",
	"fa-cc-discover": "fa-cc-discover",
	"fa-cc-amex": "fa-cc-amex",
	"fa-cc-paypal": "fa-cc-paypal",
	"fa-cc-stripe": "fa-cc-stripe",
	"fa-bell-slash": "fa-bell-slash",
	"fa-bell-slash-o": "fa-bell-slash-o",
	"fa-trash": "fa-trash",
	"fa-copyright": "fa-copyright",
	"fa-at": "fa-at",
	"fa-eyedropper": "fa-eyedropper",
	"fa-paint-brush": "fa-paint-brush",
	"fa-birthday-cake": "fa-birthday-cake",
	"fa-area-chart": "fa-area-chart",
	"fa-pie-chart": "fa-pie-chart",
	"fa-line-chart": "fa-line-chart",
	"fa-lastfm": "fa-lastfm",
	"fa-lastfm-square": "fa-lastfm-square",
	"fa-toggle-off": "fa-toggle-off",
	"fa-toggle-on": "fa-toggle-on",
	"fa-bicycle": "fa-bicycle",
	"fa-bus": "fa-bus",
	"fa-ioxhost": "fa-ioxhost",
	"fa-angellist": "fa-angellist",
	"fa-cc": "fa-cc",
	"fa-shekel": "fa-shekel",
	"fa-sheqel": "fa-sheqel",
	"fa-ils": "fa-ils",
	"fa-meanpath": "fa-meanpath",
	"fa-buysellads": "fa-buysellads",
	"fa-connectdevelop": "fa-connectdevelop",
	"fa-dashcube": "fa-dashcube",
	"fa-forumbee": "fa-forumbee",
	"fa-leanpub": "fa-leanpub",
	"fa-sellsy": "fa-sellsy",
	"fa-shirtsinbulk": "fa-shirtsinbulk",
	"fa-simplybuilt": "fa-simplybuilt",
	"fa-skyatlas": "fa-skyatlas",
	"fa-cart-plus": "fa-cart-plus",
	"fa-cart-arrow-down": "fa-cart-arrow-down",
	"fa-diamond": "fa-diamond",
	"fa-ship": "fa-ship",
	"fa-user-secret": "fa-user-secret",
	"fa-motorcycle": "fa-motorcycle",
	"fa-street-view": "fa-street-view",
	"fa-heartbeat": "fa-heartbeat",
	"fa-venus": "fa-venus",
	"fa-mars": "fa-mars",
	"fa-mercury": "fa-mercury",
	"fa-intersex": "fa-intersex",
	"fa-transgender": "fa-transgender",
	"fa-transgender-alt": "fa-transgender-alt",
	"fa-venus-double": "fa-venus-double",
	"fa-mars-double": "fa-mars-double",
	"fa-venus-mars": "fa-venus-mars",
	"fa-mars-stroke": "fa-mars-stroke",
	"fa-mars-stroke-v": "fa-mars-stroke-v",
	"fa-mars-stroke-h": "fa-mars-stroke-h",
	"fa-neuter": "fa-neuter",
	"fa-genderless": "fa-genderless",
	"fa-facebook-official": "fa-facebook-official",
	"fa-pinterest-p": "fa-pinterest-p",
	"fa-whatsapp": "fa-whatsapp",
	"fa-server": "fa-server",
	"fa-user-plus": "fa-user-plus",
	"fa-user-times": "fa-user-times",
	"fa-hotel": "fa-hotel",
	"fa-bed": "fa-bed",
	"fa-viacoin": "fa-viacoin",
	"fa-train": "fa-train",
	"fa-subway": "fa-subway",
	"fa-medium": "fa-medium",
	"fa-yc": "fa-yc",
	"fa-y-combinator": "fa-y-combinator",
	"fa-optin-monster": "fa-optin-monster",
	"fa-opencart": "fa-opencart",
	"fa-expeditedssl": "fa-expeditedssl",
	"fa-battery-4": "fa-battery-4",
	"fa-battery": "fa-battery",
	"fa-battery-full": "fa-battery-full",
	"fa-battery-3": "fa-battery-3",
	"fa-battery-three-quarters": "fa-battery-three-quarters",
	"fa-battery-2": "fa-battery-2",
	"fa-battery-half": "fa-battery-half",
	"fa-battery-1": "fa-battery-1",
	"fa-battery-quarter": "fa-battery-quarter",
	"fa-battery-0": "fa-battery-0",
	"fa-battery-empty": "fa-battery-empty",
	"fa-mouse-pointer": "fa-mouse-pointer",
	"fa-i-cursor": "fa-i-cursor",
	"fa-object-group": "fa-object-group",
	"fa-object-ungroup": "fa-object-ungroup",
	"fa-sticky-note": "fa-sticky-note",
	"fa-sticky-note-o": "fa-sticky-note-o",
	"fa-cc-jcb": "fa-cc-jcb",
	"fa-cc-diners-club": "fa-cc-diners-club",
	"fa-clone": "fa-clone",
	"fa-balance-scale": "fa-balance-scale",
	"fa-hourglass-o": "fa-hourglass-o",
	"fa-hourglass-1": "fa-hourglass-1",
	"fa-hourglass-start": "fa-hourglass-start",
	"fa-hourglass-2": "fa-hourglass-2",
	"fa-hourglass-half": "fa-hourglass-half",
	"fa-hourglass-3": "fa-hourglass-3",
	"fa-hourglass-end": "fa-hourglass-end",
	"fa-hourglass": "fa-hourglass",
	"fa-hand-grab-o": "fa-hand-grab-o",
	"fa-hand-rock-o": "fa-hand-rock-o",
	"fa-hand-stop-o": "fa-hand-stop-o",
	"fa-hand-paper-o": "fa-hand-paper-o",
	"fa-hand-scissors-o": "fa-hand-scissors-o",
	"fa-hand-lizard-o": "fa-hand-lizard-o",
	"fa-hand-spock-o": "fa-hand-spock-o",
	"fa-hand-pointer-o": "fa-hand-pointer-o",
	"fa-hand-peace-o": "fa-hand-peace-o",
	"fa-trademark": "fa-trademark",
	"fa-registered": "fa-registered",
	"fa-creative-commons": "fa-creative-commons",
	"fa-gg": "fa-gg",
	"fa-gg-circle": "fa-gg-circle",
	"fa-tripadvisor": "fa-tripadvisor",
	"fa-odnoklassniki": "fa-odnoklassniki",
	"fa-odnoklassniki-square": "fa-odnoklassniki-square",
	"fa-get-pocket": "fa-get-pocket",
	"fa-wikipedia-w": "fa-wikipedia-w",
	"fa-safari": "fa-safari",
	"fa-chrome": "fa-chrome",
	"fa-firefox": "fa-firefox",
	"fa-opera": "fa-opera",
	"fa-internet-explorer": "fa-internet-explorer",
	"fa-tv": "fa-tv",
	"fa-television": "fa-television",
	"fa-contao": "fa-contao",
	"fa-500px": "fa-500px",
	"fa-amazon": "fa-amazon",
	"fa-calendar-plus-o": "fa-calendar-plus-o",
	"fa-calendar-minus-o": "fa-calendar-minus-o",
	"fa-calendar-times-o": "fa-calendar-times-o",
	"fa-calendar-check-o": "fa-calendar-check-o",
	"fa-industry": "fa-industry",
	"fa-map-pin": "fa-map-pin",
	"fa-map-signs": "fa-map-signs",
	"fa-map-o": "fa-map-o",
	"fa-map": "fa-map",
	"fa-commenting": "fa-commenting",
	"fa-commenting-o": "fa-commenting-o",
	"fa-houzz": "fa-houzz",
	"fa-vimeo": "fa-vimeo",
	"fa-black-tie": "fa-black-tie",
	"fa-fonticons": "fa-fonticons",
	"fa-reddit-alien": "fa-reddit-alien",
	"fa-edge": "fa-edge",
	"fa-credit-card-alt": "fa-credit-card-alt",
	"fa-codiepie": "fa-codiepie",
	"fa-modx": "fa-modx",
	"fa-fort-awesome": "fa-fort-awesome",
	"fa-usb": "fa-usb",
	"fa-product-hunt": "fa-product-hunt",
	"fa-mixcloud": "fa-mixcloud",
	"fa-scribd": "fa-scribd",
	"fa-pause-circle": "fa-pause-circle",
	"fa-pause-circle-o": "fa-pause-circle-o",
	"fa-stop-circle": "fa-stop-circle",
	"fa-stop-circle-o": "fa-stop-circle-o",
	"fa-shopping-bag": "fa-shopping-bag",
	"fa-shopping-basket": "fa-shopping-basket",
	"fa-hashtag": "fa-hashtag",
	"fa-bluetooth": "fa-bluetooth",
	"fa-bluetooth-b": "fa-bluetooth-b",
	"fa-percent": "fa-percent",
	"fa-gitlab": "fa-gitlab",
	"fa-wpbeginner": "fa-wpbeginner",
	"fa-wpforms": "fa-wpforms",
	"fa-envira": "fa-envira",
	"fa-universal-access": "fa-universal-access",
	"fa-wheelchair-alt": "fa-wheelchair-alt",
	"fa-question-circle-o": "fa-question-circle-o",
	"fa-blind": "fa-blind",
	"fa-audio-description": "fa-audio-description",
	"fa-volume-control-phone": "fa-volume-control-phone",
	"fa-braille": "fa-braille",
	"fa-assistive-listening-systems": "fa-assistive-listening-systems",
	"fa-asl-interpreting": "fa-asl-interpreting",
	"fa-american-sign-language-interpreting": "fa-american-sign-language-interpreting",
	"fa-deafness": "fa-deafness",
	"fa-hard-of-hearing": "fa-hard-of-hearing",
	"fa-deaf": "fa-deaf",
	"fa-glide": "fa-glide",
	"fa-glide-g": "fa-glide-g",
	"fa-signing": "fa-signing",
	"fa-sign-language": "fa-sign-language",
	"fa-low-vision": "fa-low-vision",
	"fa-viadeo": "fa-viadeo",
	"fa-viadeo-square": "fa-viadeo-square",
	"fa-snapchat": "fa-snapchat",
	"fa-snapchat-ghost": "fa-snapchat-ghost",
	"fa-snapchat-square": "fa-snapchat-square",
	"fa-pied-piper": "fa-pied-piper",
	"fa-first-order": "fa-first-order",
	"fa-yoast": "fa-yoast",
	"fa-themeisle": "fa-themeisle",
	"fa-google-plus-circle": "fa-google-plus-circle",
	"fa-google-plus-official": "fa-google-plus-official",
	"fa-fa": "fa-fa",
	"fa-font-awesome": "fa-font-awesome",
	"fa-handshake-o": "fa-handshake-o",
	"fa-envelope-open": "fa-envelope-open",
	"fa-envelope-open-o": "fa-envelope-open-o",
	"fa-linode": "fa-linode",
	"fa-address-book": "fa-address-book",
	"fa-address-book-o": "fa-address-book-o",
	"fa-vcard": "fa-vcard",
	"fa-address-card": "fa-address-card",
	"fa-vcard-o": "fa-vcard-o",
	"fa-address-card-o": "fa-address-card-o",
	"fa-user-circle": "fa-user-circle",
	"fa-user-circle-o": "fa-user-circle-o",
	"fa-user-o": "fa-user-o",
	"fa-id-badge": "fa-id-badge",
	"fa-drivers-license": "fa-drivers-license",
	"fa-id-card": "fa-id-card",
	"fa-drivers-license-o": "fa-drivers-license-o",
	"fa-id-card-o": "fa-id-card-o",
	"fa-quora": "fa-quora",
	"fa-free-code-camp": "fa-free-code-camp",
	"fa-telegram": "fa-telegram",
	"fa-thermometer-4": "fa-thermometer-4",
	"fa-thermometer": "fa-thermometer",
	"fa-thermometer-full": "fa-thermometer-full",
	"fa-thermometer-3": "fa-thermometer-3",
	"fa-thermometer-three-quarters": "fa-thermometer-three-quarters",
	"fa-thermometer-2": "fa-thermometer-2",
	"fa-thermometer-half": "fa-thermometer-half",
	"fa-thermometer-1": "fa-thermometer-1",
	"fa-thermometer-quarter": "fa-thermometer-quarter",
	"fa-thermometer-0": "fa-thermometer-0",
	"fa-thermometer-empty": "fa-thermometer-empty",
	"fa-shower": "fa-shower",
	"fa-bathtub": "fa-bathtub",
	"fa-s15": "fa-s15",
	"fa-bath": "fa-bath",
	"fa-podcast": "fa-podcast",
	"fa-window-maximize": "fa-window-maximize",
	"fa-window-minimize": "fa-window-minimize",
	"fa-window-restore": "fa-window-restore",
	"fa-times-rectangle": "fa-times-rectangle",
	"fa-window-close": "fa-window-close",
	"fa-times-rectangle-o": "fa-times-rectangle-o",
	"fa-window-close-o": "fa-window-close-o",
	"fa-bandcamp": "fa-bandcamp",
	"fa-grav": "fa-grav",
	"fa-etsy": "fa-etsy",
	"fa-imdb": "fa-imdb",
	"fa-ravelry": "fa-ravelry",
	"fa-eercast": "fa-eercast",
	"fa-microchip": "fa-microchip",
	"fa-snowflake-o": "fa-snowflake-o",
	"fa-superpowers": "fa-superpowers",
	"fa-wpexplorer": "fa-wpexplorer",
	"fa-meetup": "fa-meetup",
	"animated": "animated",
	"infinite": "infinite",
	"hinge": "hinge",
	"flipOutX": "flipOutX",
	"flipOutY": "flipOutY",
	"bounceIn": "bounceIn",
	"bounceOut": "bounceOut",
	"bounce": "bounce",
	"flash": "flash",
	"pulse": "pulse",
	"rubberBand": "rubberBand",
	"shake": "shake",
	"headShake": "headShake",
	"swing": "swing",
	"tada": "tada",
	"wobble": "wobble",
	"jello": "jello",
	"bounceInDown": "bounceInDown",
	"bounceInLeft": "bounceInLeft",
	"bounceInRight": "bounceInRight",
	"bounceInUp": "bounceInUp",
	"bounceOutDown": "bounceOutDown",
	"bounceOutLeft": "bounceOutLeft",
	"bounceOutRight": "bounceOutRight",
	"bounceOutUp": "bounceOutUp",
	"fadeIn": "fadeIn",
	"fadeInDown": "fadeInDown",
	"fadeInDownBig": "fadeInDownBig",
	"fadeInLeft": "fadeInLeft",
	"fadeInLeftBig": "fadeInLeftBig",
	"fadeInRight": "fadeInRight",
	"fadeInRightBig": "fadeInRightBig",
	"fadeInUp": "fadeInUp",
	"fadeInUpBig": "fadeInUpBig",
	"fadeOut": "fadeOut",
	"fadeOutDown": "fadeOutDown",
	"fadeOutDownBig": "fadeOutDownBig",
	"fadeOutLeft": "fadeOutLeft",
	"fadeOutLeftBig": "fadeOutLeftBig",
	"fadeOutRight": "fadeOutRight",
	"fadeOutRightBig": "fadeOutRightBig",
	"fadeOutUp": "fadeOutUp",
	"fadeOutUpBig": "fadeOutUpBig",
	"flipInX": "flipInX",
	"flipInY": "flipInY",
	"lightSpeedIn": "lightSpeedIn",
	"lightSpeedOut": "lightSpeedOut",
	"rotateIn": "rotateIn",
	"rotateInDownLeft": "rotateInDownLeft",
	"rotateInDownRight": "rotateInDownRight",
	"rotateInUpLeft": "rotateInUpLeft",
	"rotateInUpRight": "rotateInUpRight",
	"rotateOut": "rotateOut",
	"rotateOutDownLeft": "rotateOutDownLeft",
	"rotateOutDownRight": "rotateOutDownRight",
	"rotateOutUpLeft": "rotateOutUpLeft",
	"rotateOutUpRight": "rotateOutUpRight",
	"rollIn": "rollIn",
	"rollOut": "rollOut",
	"zoomIn": "zoomIn",
	"zoomInDown": "zoomInDown",
	"zoomInLeft": "zoomInLeft",
	"zoomInRight": "zoomInRight",
	"zoomInUp": "zoomInUp",
	"zoomOut": "zoomOut",
	"zoomOutDown": "zoomOutDown",
	"zoomOutLeft": "zoomOutLeft",
	"zoomOutRight": "zoomOutRight",
	"zoomOutUp": "zoomOutUp",
	"slideInDown": "slideInDown",
	"slideInLeft": "slideInLeft",
	"slideInRight": "slideInRight",
	"slideInUp": "slideInUp",
	"slideOutDown": "slideOutDown",
	"slideOutLeft": "slideOutLeft",
	"slideOutRight": "slideOutRight",
	"slideOutUp": "slideOutUp",
	"abc-checkbox": "abc-checkbox",
	"abc-checkbox-circle": "abc-checkbox-circle",
	"checkbox-inline": "checkbox-inline",
	"abc-checkbox-primary": "abc-checkbox-primary",
	"abc-checkbox-danger": "abc-checkbox-danger",
	"abc-checkbox-info": "abc-checkbox-info",
	"abc-checkbox-warning": "abc-checkbox-warning",
	"abc-checkbox-success": "abc-checkbox-success",
	"abc-radio": "abc-radio",
	"radio-inline": "radio-inline",
	"abc-radio-primary": "abc-radio-primary",
	"abc-radio-danger": "abc-radio-danger",
	"abc-radio-info": "abc-radio-info",
	"abc-radio-warning": "abc-radio-warning",
	"abc-radio-success": "abc-radio-success",
	"page-title": "page-title",
	"chat-notification-sing": "chat-notification-sing",
	"notification-buttons": "notification-buttons",
	"form-action": "form-action",
	"widget-table-overflow": "widget-table-overflow",
	"bs-tether-target": "bs-tether-target",
	"progress-sm": "progress-sm",
	"progress-xs": "progress-xs",
	"no-border": "no-border",
	"input-sm": "input-sm",
	"alert-sm": "alert-sm",
	"badge-white": "badge-white",
	"table-no-border": "table-no-border",
	"btn-xs": "btn-xs",
	"btn-rounded": "btn-rounded",
	"btn-outline": "btn-outline",
	"caret": "caret",
	"in": "in",
	"navbar-notifications": "navbar-notifications",
	"list-group-lg": "list-group-lg",
	"list-group-sortable": "list-group-sortable",
	"popover-content": "popover-content",
	"label": "label",
	"open": "open",
	"panel": "panel",
	"panel-header": "panel-header",
	"app": "app",
	"transition-height": "transition-height",
	"opacity-10": "opacity-10",
	"opacity-n-10": "opacity-n-10",
	"opacity-20": "opacity-20",
	"opacity-n-20": "opacity-n-20",
	"opacity-30": "opacity-30",
	"opacity-n-30": "opacity-n-30",
	"opacity-40": "opacity-40",
	"opacity-n-40": "opacity-n-40",
	"opacity-50": "opacity-50",
	"opacity-n-50": "opacity-n-50",
	"opacity-60": "opacity-60",
	"opacity-n-60": "opacity-n-60",
	"opacity-70": "opacity-70",
	"opacity-n-70": "opacity-n-70",
	"opacity-80": "opacity-80",
	"opacity-n-80": "opacity-n-80",
	"opacity-90": "opacity-90",
	"opacity-n-90": "opacity-n-90",
	"width-50": "width-50",
	"width-n-50": "width-n-50",
	"width-100": "width-100",
	"width-n-100": "width-n-100",
	"width-150": "width-150",
	"width-n-150": "width-n-150",
	"width-200": "width-200",
	"width-n-200": "width-n-200",
	"height-50": "height-50",
	"height-n-50": "height-n-50",
	"height-100": "height-100",
	"height-n-100": "height-n-100",
	"height-150": "height-150",
	"height-n-150": "height-n-150",
	"height-200": "height-200",
	"height-n-200": "height-n-200",
	"height-250": "height-250",
	"height-n-250": "height-n-250",
	"max-height-50": "max-height-50",
	"max-height-n-50": "max-height-n-50",
	"max-height-100": "max-height-100",
	"max-height-n-100": "max-height-n-100",
	"max-height-150": "max-height-150",
	"max-height-n-150": "max-height-n-150",
	"max-height-200": "max-height-200",
	"max-height-n-200": "max-height-n-200",
	"max-height-250": "max-height-250",
	"max-height-n-250": "max-height-n-250",
	"z-index-more": "z-index-more",
	"z-index-n-more": "z-index-n-more",
	"z-index-less": "z-index-less",
	"z-index-n-less": "z-index-n-less",
	"z-index-10": "z-index-10",
	"z-index-n-10": "z-index-n-10",
	"z-index--10": "z-index--10",
	"z-index-n--10": "z-index-n--10",
	"fw-semi-bold": "fw-semi-bold",
	"fs-sm": "fs-sm",
	"circle": "circle",
	"circle-o": "circle-o",
	"circle-lg": "circle-lg",
	"rounded-lg": "rounded-lg",
	"circle-o-danger": "circle-o-danger",
	"circle-o-warning": "circle-o-warning",
	"circle-o-success": "circle-o-success",
	"circle-o-info": "circle-o-info",
	"circle-o-primary": "circle-o-primary",
	"circle-o-black": "circle-o-black",
	"circle-o-gray-darker": "circle-o-gray-darker",
	"circle-o-gray-dark": "circle-o-gray-dark",
	"circle-o-gray": "circle-o-gray",
	"circle-o-gray-light": "circle-o-gray-light",
	"circle-o-gray-lighter": "circle-o-gray-lighter",
	"circle-o-white": "circle-o-white",
	"thumb-xl": "thumb-xl",
	"thumb-lg": "thumb-lg",
	"thumb": "thumb",
	"thumb-sm": "thumb-sm",
	"thumb-xs": "thumb-xs",
	"status": "status",
	"status-bottom": "status-bottom",
	"input-group-dark": "input-group-dark",
	"td-underline": "td-underline",
	"display-flex": "display-flex",
	"fw-normal": "fw-normal",
	"fw-bold": "fw-bold",
	"fw-thin": "fw-thin",
	"rotate-45": "rotate-45",
	"rotate-135": "rotate-135",
	"rotate-225": "rotate-225",
	"rotate-315": "rotate-315",
	"bg-body": "bg-body",
	"bg-body-light": "bg-body-light",
	"bg-gray-transparent": "bg-gray-transparent",
	"bg-gray-dark": "bg-gray-dark",
	"bg-black": "bg-black",
	"bg-gray-light": "bg-gray-light",
	"bg-gray-lighter": "bg-gray-lighter",
	"bg-sidebar": "bg-sidebar",
	"text-link": "text-link",
	"text-gray-dark": "text-gray-dark",
	"text-gray-light": "text-gray-light",
	"text-semi-muted": "text-semi-muted",
	"text-gray-darker": "text-gray-darker",
	"text-gray-lighter": "text-gray-lighter",
	"text-bg-sidebar": "text-bg-sidebar",
	"text-ellipsis": "text-ellipsis",
	"deemphasize": "deemphasize",
	"help": "help",
	"fs-mini": "fs-mini",
	"fs-larger": "fs-larger",
	"btlr": "btlr",
	"btrr": "btrr",
	"bblr": "bblr",
	"bbrr": "bbrr",
	"hide": "hide",
	"help-block": "help-block",
	"bg-attention": "bg-attention",
	"thin-scroll": "thin-scroll",
	"overflow-hidden": "overflow-hidden",
	"input-dark": "input-dark",
	"input-group-transparent": "input-group-transparent",
	"input-group-no-border": "input-group-no-border",
	"input-no-border": "input-no-border",
	"input-group-rounded": "input-group-rounded",
	"mt-xlg": "mt-xlg",
	"mt-n-xlg": "mt-n-xlg",
	"mt-lg": "mt-lg",
	"mt-n-lg": "mt-n-lg",
	"mt": "mt",
	"mt-n": "mt-n",
	"mt-md": "mt-md",
	"mt-n-md": "mt-n-md",
	"mt-sm": "mt-sm",
	"mt-n-sm": "mt-n-sm",
	"mt-xs": "mt-xs",
	"mt-n-xs": "mt-n-xs",
	"mt-n-0": "mt-n-0",
	"mb-xlg": "mb-xlg",
	"mb-n-xlg": "mb-n-xlg",
	"mb-lg": "mb-lg",
	"mb-n-lg": "mb-n-lg",
	"mb": "mb",
	"mb-n": "mb-n",
	"mb-md": "mb-md",
	"mb-n-md": "mb-n-md",
	"mb-sm": "mb-sm",
	"mb-n-sm": "mb-n-sm",
	"mb-xs": "mb-xs",
	"mb-n-xs": "mb-n-xs",
	"mb-n-0": "mb-n-0",
	"ml-lg": "ml-lg",
	"ml-n-lg": "ml-n-lg",
	"ml": "ml",
	"ml-n": "ml-n",
	"ml-md": "ml-md",
	"ml-n-md": "ml-n-md",
	"ml-sm": "ml-sm",
	"ml-n-sm": "ml-n-sm",
	"ml-xs": "ml-xs",
	"ml-n-xs": "ml-n-xs",
	"ml-n-0": "ml-n-0",
	"mr-lg": "mr-lg",
	"mr-n-lg": "mr-n-lg",
	"mr": "mr",
	"mr-n": "mr-n",
	"mr-md": "mr-md",
	"mr-n-md": "mr-n-md",
	"mr-sm": "mr-sm",
	"mr-n-sm": "mr-n-sm",
	"mr-xs": "mr-xs",
	"mr-n-xs": "mr-n-xs",
	"mr-n-0": "mr-n-0",
	"mt-negative-lg": "mt-negative-lg",
	"d-down-none": "d-down-none",
	"d-down-inline": "d-down-inline",
	"d-down-inline-block": "d-down-inline-block",
	"d-down-block": "d-down-block",
	"d-down-table": "d-down-table",
	"d-down-table-cell": "d-down-table-cell",
	"d-down-flex": "d-down-flex",
	"d-down-inline-flex": "d-down-inline-flex",
	"d-sm-down-none": "d-sm-down-none",
	"d-sm-down-inline": "d-sm-down-inline",
	"d-sm-down-inline-block": "d-sm-down-inline-block",
	"d-sm-down-block": "d-sm-down-block",
	"d-sm-down-table": "d-sm-down-table",
	"d-sm-down-table-cell": "d-sm-down-table-cell",
	"d-sm-down-flex": "d-sm-down-flex",
	"d-sm-down-inline-flex": "d-sm-down-inline-flex",
	"d-md-down-none": "d-md-down-none",
	"d-md-down-inline": "d-md-down-inline",
	"d-md-down-inline-block": "d-md-down-inline-block",
	"d-md-down-block": "d-md-down-block",
	"d-md-down-table": "d-md-down-table",
	"d-md-down-table-cell": "d-md-down-table-cell",
	"d-md-down-flex": "d-md-down-flex",
	"d-md-down-inline-flex": "d-md-down-inline-flex",
	"d-lg-down-none": "d-lg-down-none",
	"d-lg-down-inline": "d-lg-down-inline",
	"d-lg-down-inline-block": "d-lg-down-inline-block",
	"d-lg-down-block": "d-lg-down-block",
	"d-lg-down-table": "d-lg-down-table",
	"d-lg-down-table-cell": "d-lg-down-table-cell",
	"d-lg-down-flex": "d-lg-down-flex",
	"d-lg-down-inline-flex": "d-lg-down-inline-flex",
	"d-xl-down-none": "d-xl-down-none",
	"d-xl-down-inline": "d-xl-down-inline",
	"d-xl-down-inline-block": "d-xl-down-inline-block",
	"d-xl-down-block": "d-xl-down-block",
	"d-xl-down-table": "d-xl-down-table",
	"d-xl-down-table-cell": "d-xl-down-table-cell",
	"d-xl-down-flex": "d-xl-down-flex",
	"d-xl-down-inline-flex": "d-xl-down-inline-flex",
	"value0": "value0",
	"value1": "value1",
	"value2": "value2",
	"value3": "value3",
	"value4": "value4",
	"value5": "value5",
	"value6": "value6",
	"chart-overflow-bottom": "chart-overflow-bottom"
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/font-awesome/fontawesome-webfont.eot?674f50d2";

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/font-awesome/fontawesome-webfont.eot?674f50d2";

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/font-awesome/fontawesome-webfont.svg?912ec66d";

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/font-awesome/fontawesome-webfont.ttf?b06871f2";

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/font-awesome/fontawesome-webfont.woff2?af7ae505";

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/font-awesome/fontawesome-webfont.woff?fee66e71";

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/glyphicons/glyphicons-halflings-regular.svg?89889688";

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/glyphicons/glyphicons-halflings-regular.ttf?d41d8cd9";

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/glyphicons/glyphicons-halflings-regular.woff?fa277232";

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/fonts/glyphicons/glyphicons-halflings-regular.woff2?d41d8cd9";

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "src/images/react.png?3adcdb05";

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var window = (window || {});
window.jQuery = __webpack_require__(9);
(function() {

/**
 * Widgster plugin.
 */
( function( global, factory ) {
    "use strict";

    if (global.jQuery && global.jQuery.fn) {
        factory(global.jQuery);
    } else {
        console.warn("Widgster must be executed in a browser environment with jQuery defined");
    }
} )( typeof window !== "undefined" ? window : this, function( $ ) {
    // WIDGSTER CLASS DEFINITION
    // ======================

    var Widgster = function (el, options) {
        this.$element = $(el);
        this.$collapse = this.$element.find('[data-widgster=collapse]');
        this.$expand = this.$element.find('[data-widgster=expand]');
        this.$fullscreen = this.$element.find('[data-widgster=fullscreen]');
        this.$restore = this.$element.find('[data-widgster=restore]');
        this.options = options;
        this.collapsed = options.collapsed;
        this.fullscreened = options.fullscreened;

        this._initHandlers();

        if (this.collapsed){
            this.collapse(false);
        } else {
            this.$expand.hide();
        }

        if (this.fullscreened){
            this.fullscreen();
        } else {
            this.$restore.hide();
        }

        this.options.autoload && this.load();
        var interval = parseInt(this.options.autoload);
        if (!isNaN(interval)){
            var widgster = this;
            this._autoloadInterval = setInterval(function(){
                widgster.load();
            }, interval)
        }
    };

    Widgster.DEFAULTS = {
        collapsed: false,
        fullscreened: false,
        transitionDuration: 150,
        bodySelector: '.body',
        showLoader: true,
        autoload: false,
        loaderTemplate: '<div style="text-align: center; margin-top: 10px;">Loading...</div>',
        /**
         * provide a way to insert a prompt before removing widget
         * @param callback
         */
        closePrompt: function(callback){
            callback()
        }
    };

    Widgster.prototype.collapse = function(animate){
        animate = typeof animate == "undefined" ? true : animate;
        var e = $.Event('collapse.widgster');
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) return;

        var widgster = this,
            duration = animate ? this.options.transitionDuration : 0;
        this.$element.find(this.options.bodySelector).slideUp(duration, function(){
            widgster.$element.addClass('collapsed');
            widgster.$element.trigger($.Event('collapsed.widgster'));
            widgster.collapsed = true;
        });

        this.$collapse.hide();
        this.$expand.show();

        return false;
    };

    Widgster.prototype.expand = function(animate){
        animate = typeof animate == "undefined" ? true : animate;
        var e = $.Event('expand.widgster');
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) return;

        var widgster = this,
            duration = animate ? this.options.transitionDuration : 0;
        this.$element.find(this.options.bodySelector).slideDown(duration, function(){
            widgster.$element.removeClass('collapsed');
            widgster.$element.trigger($.Event('expanded.widgster'));
            widgster.collapsed = false;
        });

        this.$collapse.show();
        this.$expand.hide();

        return false;
    };

    Widgster.prototype.close = function(){

        this.options.closePrompt && this.options.closePrompt($.proxy(this._doClose, this));

        return false;
    };

    Widgster.prototype.load = function(){
        var e = $.Event('load.widgster');

        this.$element.trigger(e);

        if (e.isDefaultPrevented()) return;

        var widgster = this;
        this.$element.find(this.options.bodySelector).load(this.options.load, function(responseText, textStatus, xhr){
            widgster.expand();
            widgster.options.showLoader && widgster._hideLoader();
            widgster.$element.trigger($.Event('loaded.widgster', {
                responseText: responseText,
                textStatus: textStatus,
                xhr: xhr
            }))
        });
        this.options.showLoader && this._showLoader();

        return false;
    };

    Widgster.prototype.fullscreen = function(){
        var e = $.Event('fullscreen.widgster');

        this.$element.trigger(e);

        if (e.isDefaultPrevented()) return;

        this.$element.css({
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: 0,
            'z-index': 10000
        });
        $('body').css('overflow', 'hidden');

        this.wasCollapsed = this.collapsed;
        this.expand(false);

        this.$fullscreen.hide();
        this.$restore.show();

        this.$collapse.hide(); this.$expand.hide();

        this.$element.addClass('fullscreened');

        this.$element.trigger($.Event('fullscreened.widgster'));

        return false;
    };

    Widgster.prototype.restore = function(){
        var e = $.Event('restore.widgster');

        this.$element.trigger(e);

        if (e.isDefaultPrevented()) return;

        this.$element.css({
            position: '',
            top: '',
            right: '',
            bottom: '',
            left: '',
            margin: '',
            'z-index': ''
        });
        $('body').css('overflow', '');

        this.$fullscreen.show();
        this.$restore.hide();

        if (this.collapsed){
            this.$collapse.hide(); this.$expand.show();
        } else {
            this.$collapse.show(); this.$expand.hide();
        }

        this.wasCollapsed && this.collapse(false);

        this.$element.removeClass('fullscreened');

        this.$element.trigger($.Event('restored.widgster'));

        return false;
    };

    Widgster.prototype._doClose = function(){
        //could have been remove.widgster, but http://bugs.jquery.com/ticket/14600
        var e = $.Event('close.widgster');

        this.$element.trigger(e);

        if (e.isDefaultPrevented()) return;

        $('body').css('overflow', '');

        this.$element.detach();

        e = $.Event('closed.widgster', {$element: this.$element});

        this.$element.trigger(e);
    };

    Widgster.prototype._showLoader = function(){
        var $body = this.$element.find(this.options.bodySelector);

        this.$loaderWrap = this.$element.find('.widgster-loader-wrap');

        //create loader html if does not exist
        if (this.$loaderWrap.length == 0){
            this.$loaderWrap = $('<div class="widgster-loader-wrap" style="position: absolute; top: 0; right: 0; bottom: 0; ' +
                'left: 0; display: none"></div>');
            this.$element.append(this.$loaderWrap);
        }
        this.$loaderWrap.html(this.options.loaderTemplate);
        this.$loaderWrap.css({
            'margin-top': $body.position().top
        });
        if (!this.collapsed){
            $body.fadeTo(this.options.transitionDuration, 0);
            this.$loaderWrap.fadeIn(this.options.transitionDuration)
        }
    };

    Widgster.prototype._hideLoader = function(){
        this.$loaderWrap.fadeOut(this.options.transitionDuration);
        this.$element.find(this.options.bodySelector).fadeTo(this.options.transitionDuration, 1);
    };

    /**
     * Attach all required widgster functions to data-widgster elements.
     * @private
     */
    Widgster.prototype._initHandlers = function(){
        this.$element.on('click.collapse.widgster', '[data-widgster=collapse]', $.proxy(this.collapse, this));
        this.$element.on('click.expand.widgster', '[data-widgster=expand]', $.proxy(this.expand, this));
        this.$element.on('click.close.widgster', '[data-widgster=close]', $.proxy(this.close, this));
        this.$element.on('click.load.widgster', '[data-widgster=load]', $.proxy(this.load, this));
        this.$element.on('click.fullscreen.widgster', '[data-widgster=fullscreen]', $.proxy(this.fullscreen, this));
        this.$element.on('click.restore.widgster', '[data-widgster=restore]', $.proxy(this.restore, this));
    };


    // NAMESPACED DATA ATTRIBUTES
    // =======================

    function getNamespacedData(namespace, data){
        var namespacedData = {};
        for (var key in data){
            // key starts with namespace
            if (key.slice(0, namespace.length) == namespace){
                var namespacedKey = key.slice(namespace.length, key.length);
                namespacedKey = namespacedKey.charAt(0).toLowerCase() + namespacedKey.slice(1);
                namespacedData[namespacedKey] = data[key];
            }
        }

        return namespacedData;
    }

    // WIDGSTER PLUGIN DEFINITION
    // =======================

    $.fn.widgster = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('widgster');
            var options = $.extend({}, Widgster.DEFAULTS, getNamespacedData('widgster', $this.data()), typeof option == 'object' && option);

            if (!data) $this.data('widgster', new Widgster(this, options));
            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.widgster.Constructor = Widgster;
});
}.call(window));

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(58);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Chat.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Chat.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(59);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Header.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Header.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(60);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Layout.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Layout.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(61);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Notifications.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Notifications.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(63);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../../node_modules/sass-loader/lib/loader.js!./LinksGroup.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../../node_modules/sass-loader/lib/loader.js!./LinksGroup.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(64);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Sidebar.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Sidebar.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(65);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Widget.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Widget.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(66);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Dashboard.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Dashboard.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(68);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Login.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Login.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(69);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Profile.scss", function() {
        content = require("!!../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=!../../../node_modules/sass-loader/lib/loader.js!./Profile.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(70);
    var insertCss = __webpack_require__(4);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[local]&importLoaders=2!../../node_modules/sass-loader/lib/loader.js!./theme.scss", function() {
        content = require("!!../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[local]&importLoaders=2!../../node_modules/sass-loader/lib/loader.js!./theme.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = require("./assets.json");

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = require("rc-hammerjs");

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
module.exports = __webpack_require__(28);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map