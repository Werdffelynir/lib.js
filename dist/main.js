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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/Arr.js":
/*!*******************************!*\
  !*** ./src/components/Arr.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 
 * @returns {{create: (function(*=, *=): any[])}}
 * @constructor
 */
function Arr () {

    return {
        create: function (items = 0, default_value = null) {
            return (new Array(items)).fill(default_value);
        },
    };
}

/* harmony default export */ __webpack_exports__["default"] = (Arr);


/***/ }),

/***/ "./src/components/Chain.js":
/*!*********************************!*\
  !*** ./src/components/Chain.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Example:
 * const chain = new Chain(onSuccess, onError);
 *
 * chain.add('Test begin', function (next) {
 *          console.log(next);
 *      })
 *      .add('Next model', function (next) {
 *          next()
 *      })
 *      .add('Last model', function (next) {
 *          next()
 *      })
 *      .next();
 *
 * chain.next();
 *
 * @returns {Function}
 */
const Chain = function (ons, onf)
{
    const createClass = function ()
    {
        function defineProperties(target, props)
        {
            for (let i = 0; i < props.length; i++) {
                const descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;

                if ("value" in descriptor)
                    descriptor.writable = true;

                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps)
        {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);

            return Constructor;
        };
    }();

    function classCallCheck(instance, Constructor)
    {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    const Chain = function ()
    {
        function __chain(onSuccess, onFailed)
        {
            classCallCheck(this, __chain);

            this.onSuccess = onSuccess;
            this.onFailed = onFailed;
            this.currentIndex = 0;
            this.list = [];
        }

        createClass(__chain, [
            {
                key: "register",
                value: function register(id, callback) {
                    this.list.push({id: id, callback: callback});
                }
            }, {
                key: "next",
                value: function next() {
                    const registered = this.list[this.currentIndex];
                    if (registered) {
                        if (registered.callback instanceof Function) {
                            registered.callback.call({}, () => {
                                this.currentIndex ++;
                                this.next();
                            }, registered.id);
                        } else {
                            this.onFailed();
                        }
                    } else {
                        this.onSuccess();
                    }
                }
            }]
        );

        return __chain;
    }();

    return new Chain(ons, onf)
};

/* harmony default export */ __webpack_exports__["default"] = (Chain);


/***/ }),

/***/ "./src/components/Component.js":
/*!*************************************!*\
  !*** ./src/components/Component.js ***!
  \*************************************/
/*! exports provided: COMPONENT_DATA_ATTRIBUTES, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPONENT_DATA_ATTRIBUTES", function() { return COMPONENT_DATA_ATTRIBUTES; });
/* harmony import */ var _static_str2node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../static/str2node */ "./src/static/str2node.js");
/* harmony import */ var _static_isNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/isNode */ "./src/static/isNode.js");
/* harmony import */ var _static_merge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../static/merge */ "./src/static/merge.js");
/* harmony import */ var _static_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../static/search */ "./src/static/search.js");
/* harmony import */ var _static_clone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../static/clone */ "./src/static/clone.js");
/* harmony import */ var _static_random__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../static/random */ "./src/static/random.js");
/* harmony import */ var _static_isHTMLString__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../static/isHTMLString */ "./src/static/isHTMLString.js");
/* harmony import */ var _static_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../static/query */ "./src/static/query.js");










/*
# Config
id: 'id',
props: {},
template: ``,
before () {},
init () {},
complete () {},
data: {},
methods: {},
components: {},
templateDataElementsEnabled: true,
templateDataElementsAttributes: COMPONENT_DATA_ATTRIBUTES,
override: false,
initialized: false,
completed: false,

# Base example
Component({
    id: 'ExternalTemplateComponent',
    attrs: {},
    props: ['title'],
    template: 'template',
    init () {},
    data: {},
    complete (app) {},
    methods: {}
});

# Extend example
Component({
    id: 'ExternalTemplateComponent',
    props: ['title'],
    template: 'template',
    init () {},
    data: {
        iterator: 0,
    },
    complete (app) {
        if (this.elements('node', 'title'))
            this.elements('node', 'title').textContent = this.title;
    },
    methods: {
        add (e) {
            this.node.iterator.textContent = ++ this.data.iterator ;
        },
    }
});

const componentInfo = new Component({
    id: 'componentInfo',
    template: `
    <div data-node="info_block">
        <div data-node="title">title</div>
        <div data-node="content">content</div>
        <div data-node="iterator">iterator</div>
    </div>`,
    attrs: {
        width: window.innerWidth,
        height: window.innerHeight - 10,
    },
    init () {
        console.log('init', this );
    },
    data: {
        iterator: 0,
        title: 'Component Info',
        content: 'Component content iterator',
    },
    complete (app) {
        console.log('complete', this);

        this.elements('node', 'title').textContent = this.data.title;
        this.elements('node', 'content').textContent = this.data.content;
    },
    methods: {
        add (e) {
            this.data.iterator ++;
            this.node.iterator.textContent = this.data.iterator + ' iteration' ;
            // this.elements('node', 'iterator').textContent = this.data.iterator + ' iteration' ;
            // this.getAttrDataNode('iterator').textContent = this.data.iterator + ' iteration' ;
        },
    }
});

comp = Component({...});
    templateDataElements: { func:{}, action:{}, node:{}, on:{} },
        If templateDataElementsEnabled is enabled during component initialization, attributes with names are requested
        from the template:
        COMPONENT_DATA_ATTRIBUTES === [data-func], [data-action], [data-node], [data-on]

comp.component(id)
comp.componentChildren(id)
comp.clone()
comp.on(event, callback)
comp.inject(elem, append = true)
comp.inject()
comp.elements(attr, name)
*/

/**
 * @param config
 * @returns {*}
 * @constructor
 */
const Component = function (config) {
    if (typeof config === 'string') {
        // get property by id keyword
        return Component.list[config];
    } else {
        if (!config.id) {
            let randomName = _static_random__WEBPACK_IMPORTED_MODULE_5__["default"].string(6).toLowerCase();
            randomName = randomName.substring(0, 1).toUpperCase() + randomName.substring(1);
            config.id = 'Component' + randomName;
        }

        if (Component.list[config.id]) {
            return Component.list[config.id];
        }

        const comp = Component.create(config);

        /**
         * @param id
         * @returns {Component|null}
         */
        comp.component = function (id) {
            return comp.components[id] ? comp.components[id] : null;
        };

        comp.clone = function () {
            const cloned = Object(_static_clone__WEBPACK_IMPORTED_MODULE_4__["default"])(this);
            cloned.template = cloned.template.cloneNode(true);
            return cloned;
        };

        comp.on = function (event, callback) {
            comp.template.addEventListener(event, callback)
        };

        comp.inject = function (elem, append = false) {
            if (Array.isArray(elem)) {
                elem.forEach((e) => {
                    comp.inject(e, true)
                });
            }
            if (!append) {
                comp.template.textContent = '';
            }
            if (Object(_static_isNode__WEBPACK_IMPORTED_MODULE_1__["default"])(elem)) {
                comp.template.appendChild(elem);
            }
            if (elem.templateDataElementsAttributes) {
                comp.addComponent(elem);
                comp.template.appendChild(elem.template);
            }
            if (typeof elem === 'number') {
                elem = elem.toString();
            }
            if (typeof elem === 'string') {
                if (Object(_static_isHTMLString__WEBPACK_IMPORTED_MODULE_6__["default"])(elem)) {
                    elem = Object(_static_str2node__WEBPACK_IMPORTED_MODULE_0__["default"])(elem);
                    comp.template.appendChild(elem);
                } else {
                    comp.template.textContent += elem;
                }
            }
        };

        comp.append = function (elem) {
            comp.inject(elem, true);
        };

        // if (typeof comp.before === 'function' && !comp.initialized) {
        //     comp.before();
        // }

        if (typeof comp.template === 'string') {
            if (comp.template === '' || Object(_static_isHTMLString__WEBPACK_IMPORTED_MODULE_6__["default"])(comp.template)) {
                comp.template = Object(_static_str2node__WEBPACK_IMPORTED_MODULE_0__["default"])(comp.template);
            } else {
                comp.template = Object(_static_query__WEBPACK_IMPORTED_MODULE_7__["default"])(comp.template);
            }
        }

        if (comp.methods && Object.values(comp.methods).length) {
            Object.keys(comp.methods).forEach((key) => {
                if (typeof comp.methods[key] === 'function') {
                    comp.methods[key] = comp.methods[key].bind(comp);
                    if (!comp.hasOwnProperty(key)) {
                        comp[key] = comp.methods[key];
                    }
                }
            });
        }

        if (!comp.initialized) {
            comp.initialized = true;

            if (typeof comp.init === 'function')
                comp.init();
        }

        if (comp.data && Object.keys(comp.data).length) {
            Object.keys(comp.data).forEach((key) => {
                if (typeof comp.data[key] === 'function') {
                    comp.data[key] = comp.data[key].bind(comp);
                }
                if (!comp.hasOwnProperty(key)) {
                    comp[key] = comp.data[key];
                }
            });
        }

        if (comp.components && Object.keys(comp.components).length) {
            Object.keys(comp.components).forEach((key) => {
                comp.addComponent(comp);
            });
        }

        comp.addComponent = function (comp2) {
            if (!comp.components[comp2.id]) {
                comp.components[comp2.id] = comp2;
                comp2.parent = comp;
            }
        };

        comp.removeComponent = function (comp2) {
            if (comp.components[comp2.id]) {
                comp.components[comp2.id].parent = null;
                delete comp.components[comp2.id];
            }
        };

        /**
         * attr:
         *  action
         *  func
         *  id
         *  node
         *  on
         *  to
         * @param attr
         * @param name
         * @returns {*|null}
         */
        comp.elements = function (attr, name) {
            attr = attr.replace('data-', '');
            if (name) {
                return typeof comp.templateDataElements[attr][name] !== "undefined"
                    ? comp.templateDataElements[attr][name]
                    : null;
            }

            return typeof comp.templateDataElements[attr] !== "undefined"
                ? comp.templateDataElements[attr]
                : null;
        };

        comp.getAttrDataAction = function (name) {
            return comp.elements('action', name)
        };
        comp.getAttrDataFunc = function (name) {
            return comp.elements('func', name)
        };
        comp.getAttrDataId = function (name) {
            return comp.elements('id', name)
        };
        comp.getAttrDataNode = function (name) {
            return comp.elements('node', name)
        };
        comp.getAttrDataOn = function (name) {
            return comp.elements('on', name)
        };
        comp.getAttrDataTo = function (name) {
            return comp.elements('to', name)
        };

        comp.updateTemplateDataElements = function () {

            if (Object(_static_isNode__WEBPACK_IMPORTED_MODULE_1__["default"])(comp.template)) {

                if (comp.attrs && Object.values(comp.attrs).length) {
                    Object.keys(comp.attrs).forEach((key) => {
                        comp.template.setAttribute(key, comp.attrs[key]);
                    });
                }

                if (comp.templateDataElementsEnabled === true) {
                    comp.templateDataElementsAttributes.forEach((attr) => {
                        const name = attr.substring(5);
                        comp.templateDataElements[name] = Object(_static_search__WEBPACK_IMPORTED_MODULE_3__["default"])('[' + attr + ']', attr, comp.template);

                        if (name === 'node') {
                            comp.node = comp.templateDataElements[name];
                        }
                    });
                }

            }
        };

        function onComplete() {
            comp.completed = true;
            if (typeof comp.before === 'function') comp.before.call(comp, comp);
            comp.updateTemplateDataElements();
            if (typeof comp.complete === 'function') comp.complete.call(comp, comp);
        }

        if (!comp.completed) {
            if (document) {
                if (document.querySelector('body')) onComplete();
                else document.addEventListener('DOMContentLoaded', onComplete);
            } else
                onComplete();
        }

        Component.list[comp.id] = comp;
        return comp;
    }
};

Component.list = {};
Component.create = function (config) {
    return Object(_static_merge__WEBPACK_IMPORTED_MODULE_2__["default"])({
        id: null,
        attrs: {},
        props: {},
        template: false,
        override: false,
        init: () => {},
        before: () => {},
        complete: () => {},
        methods: {},
        node: {},
        initialized: false,
        completed: false,
        templateDataElements: {},
        templateDataElementsEnabled: true,
        templateDataElementsAttributes: COMPONENT_DATA_ATTRIBUTES,
        components: {},
        // children: [],
        // parentComponent: {},
        parent: {},
    }, config)
};

const COMPONENT_DATA_ATTRIBUTES = [
    'data-func',
    'data-action',
    'data-node',
    'data-on',
    'data-to',
    'data-id',
];

/* harmony default export */ __webpack_exports__["default"] = (Component);


/***/ }),

/***/ "./src/components/Cookie.js":
/*!**********************************!*\
  !*** ./src/components/Cookie.js ***!
  \**********************************/
/*! exports provided: set, get, clear, remove, encode, decode, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear", function() { return clear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encode", function() { return encode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return decode; });


/**
 * LocalStorage wrapper
 *
 * @param name
 * @param value
 * @param option
 * @returns {{set: (Cookie.set|*), get: (Cookie.get|*), key: (Cookie.key|*), clear: (Cookie.clear|*), remove: (Cookie.remove|*), length: (Cookie.length|*)}}
 * @constructor
 */
const Cookie = function (name, value) {
    switch (arguments.length) {
        case 0:
            return {
                set: set,
                get: get,
                clear: clear,
                remove: remove,
                length: length,
            };
        case 1:
            return get(name);
        case 2:
            return set(name, value);
    }
};

/**
 * Set Cookie key, value
 *  expires - ms, Date, -1, 0
 *  maxAge - s (year 31536000)
 *  SameSite=Strict|Lax
 * @param name
 * @param value
 * @param {{}} options   {expires: 0, path: '/', domain: 'site.com', secure: false, maxAge: 60*60*24*365, sameSite: '' }
 * @param typeJson bool
 */
const set = function (name, value, options, typeJson = true)
{
    options = options || {};


    if (Cookie.typeJson) {}
    if (typeJson)
        try {
            value = JSON.stringify(value);
        } catch (error) {}

    let data = name + "=" + encodeURIComponent(value);

    if (options.expires) {
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        } else {
            const date = new Date();
            options.expires = date.setTime(date.getTime() + parseInt(options.expires) * 1000);
        }
    }

    if (options.maxAge) {
        options['max-age'] = options.maxAge;
        delete options.maxAge;
    }
    if (options.sameSite) {
        options['samesite'] = options.sameSite;
        delete options.sameSite;
    }

    data += encode(options);
    document.cookie = data;
};

/**
 * Get Cookie value by key
 * @param name
 * @param typeJson bool
 * @returns {*}
 */
const get = function (name, typeJson = true) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    let data = matches ? decodeURIComponent(matches[1]) : undefined;

    if (Cookie.dataJson) {}
    if (typeJson && data)
        try {
            data = JSON.parse(data)
        } catch (error) { }

    return data
};

/**
 * Remove Cookie by key
 * @param name
 * @param option
 */
const remove = function (name, option) {
    option = option || {expires: -1};
    set(name, "", option);
};

const clear = function () {
    document.cookie = '';
};

/**
 * Convert object to uri get string
 * @param {object} data     example: {expires: 0, path: '/', domain: 'my-site.com', secure: false}
 * @returns {string}        example: "expires=0;path=/;domain=site.com;secure=false";
 */
const encode = function (data) {
    let str = '';
    Object.keys(data).forEach((key) => {
        if (data[key] !== undefined)
            str += ';' + key + '=' + encodeURIComponent(data[key]);
    });
    return str;
};

const decode = function (name) {
    if (name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    } else {
        const data = {},
            cookies = document.cookie.split('; ');

        cookies.forEach((value) => {
            if (value.length) {
                let parts = value.trim().split('=');
                data[parts[0].trim()] = decodeURIComponent(parts[1]).trim();
            }
        });
        return data;
    }
};

Cookie.set = set;
Cookie.get = get;
Cookie.remove = remove;
Cookie.clear = clear;
Cookie.encode = encode;
Cookie.decode = decode;
Cookie.dataJson = true;



/* harmony default export */ __webpack_exports__["default"] = (Cookie);


/***/ }),

/***/ "./src/components/Datetime.js":
/*!************************************!*\
  !*** ./src/components/Datetime.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Datetime = {};
Datetime.MS_IN_DAY = 864e5;
Datetime.MS_IN_HOUR = 36e5;
Datetime.MS_IN_MIN = 6e4;

/**
 * Return timestamp
 * @param date
 * @returns {number}
 */
Datetime.time = function (date) {
    return date instanceof Date ? date.getTime() : (new Date).getTime()
};

/**
 * Add days to some date
 * @param day           number of days. 0.04 - 1 hour, 0.5 - 12 hour, 1 - 1 day
 * @param dateStart     type Date, start date
 * @returns {*}  type Date
 */
Datetime.addDays = function (day, dateStart) {
    const date = dateStart ? new Date(dateStart) : new Date();
    date.setTime(date.getTime() + (day * 86400000));
    return date;
};

/**
 * Time between Dates
 * <pre>
 *     var from = new Date('2016-08-01 20:30');
 *     var to = new Date('2016-08-10 07:55');
 *     .Date.betweenDates(from, to); // Object { day: 8, hour: 11, minute: 25 }
 * </pre>
 * @param dateFrom
 * @param dateTo
 * @returns {{day: number, hour: number, minute: number}}
 */
Datetime.betweenDates = function (dateFrom, dateTo) {
    dateFrom = dateFrom || new Date();
    dateTo = dateTo || new Date();
    let diffMs = (dateTo - dateFrom),
        diffDays = Math.round(diffMs / 864e5),
        diffHrs = Math.round((diffMs % 864e5) / 36e5),
        diffMin = Math.round(((diffMs % 864e5) % 36e5) / 6e4);
    return {day: diffDays, hour: diffHrs, minute: diffMin};
};

/**
 * Convert date string to Date Object
 * yy - the year as a two-digit number ( 00 to 99 );
 * YY - the year as a four-digit number ( 1900-9999 );
 * mm - the month as a number with a leading zero ( 01 to 12 ) ( 1 to 12 );
 * dd - the day as a number with a leading zero ( 01 to 31 ) ( 1 to 31 );
 * hh HH - the hour ( 00 to 11 ) ( 00 to 23 ) ( 1 to 12 ) ( 0 to 23 );
 * ii - the minute as a number with a leading zero ( 00 to 59 );
 * ss - the second as a number with a leading zero ( 00 to 59 );
 * aa - displays am (for times from midnight until noon) and pm (for times from noon until midnight);
 *
 * Datetime.strToDate('12.05.2017 12:30:25', 'mm.dd.YY HH:ii:ss')
 * Datetime.strToDate('12/05/2017', 'mm/dd/YY')
 * Datetime.strToDate('12/5/2017', 'mm/dd/YY', true)
 * @param date
 * @param format
 * @param utc
 * @returns {Date}
 */
Datetime.strToDate = function (date, format, utc) {
    const set = [0, 0, 1, 0, 0, 0];
    const temp = date.match(/[a-zA-Z]+|[0-9]+/g);
    const mask = format.match(/[a-zA-Z]{2}/g);
    for (let i = 0; i < mask.length; i++) {
        switch (mask[i]) {
            case "dd":
                set[2] = temp[i] || 1;
                break;
            case "mm":
                set[1] = (temp[i] || 1) - 1;
                break;
            case "yy":
                set[0] = temp[i] * 1 + (temp[i] > 50 ? 1900 : 2000);
                break;
            case "hh":
            case "HH":
                set[3] = temp[i] || 0;
                break;
            case "ii":
                set[4] = temp[i] || 0;
                break;
            case "YY":
                set[0] = temp[i] || 0;
                break;
            case "aa":
                set[3] = set[3] % 12 + ((temp[i] || '').toLowerCase() === 'am' ? 0 : 12);
                break;
            case "ss":
                set[5] = temp[i] || 0;
                break;
            default:
                break;
        }
    }
    if (utc) {
        return new Date(Date.UTC(set[0], set[1], set[2], set[3], set[4], set[5]));
    }
    return new Date(set[0], set[1], set[2], set[3], set[4], set[5]);
};

/* harmony default export */ __webpack_exports__["default"] = (Datetime);

/*
export default {
    MS_IN_DAY: Datetime.MS_IN_DAY,
    MS_IN_HOUR: Datetime.MS_IN_HOUR,
    MS_IN_MIN: Datetime.MS_IN_MIN,
    time: Datetime.time,
    addDays: Datetime.addDays,
    betweenDates: Datetime.betweenDates,
    strToDate: Datetime.strToDate,
};
*/


/***/ }),

/***/ "./src/components/Dom.js":
/*!*******************************!*\
  !*** ./src/components/Dom.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _static_typeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../static/typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _static_isNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/isNode */ "./src/static/isNode.js");
/* harmony import */ var _static_attr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../static/attr */ "./src/static/attr.js");
/* harmony import */ var _static_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../static/css */ "./src/static/css.js");
/* harmony import */ var _static_domLoaded__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../static/domLoaded */ "./src/static/domLoaded.js");
/* harmony import */ var _static_inject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../static/inject */ "./src/static/inject.js");
/* harmony import */ var _static_str2node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../static/str2node */ "./src/static/str2node.js");
/* harmony import */ var _static_node2str__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../static/node2str */ "./src/static/node2str.js");
/* harmony import */ var _static_search__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../static/search */ "./src/static/search.js");
/* harmony import */ var _static_query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../static/query */ "./src/static/query.js");
/* harmony import */ var _static_queryAll__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../static/queryAll */ "./src/static/queryAll.js");
/* harmony import */ var _static_createFragment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../static/createFragment */ "./src/static/createFragment.js");
/* harmony import */ var _static_createElement__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../static/createElement */ "./src/static/createElement.js");
/* harmony import */ var _static_on__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../static/on */ "./src/static/on.js");
/* harmony import */ var _static_defined__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../static/defined */ "./src/static/defined.js");
/* harmony import */ var _static_position__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../static/position */ "./src/static/position.js");
/* harmony import */ var _static_merge__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../static/merge */ "./src/static/merge.js");



















function Dom (selector) {
    const root = {
        selector: Object(_static_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(selector, 'string') ? selector : null,
        selected: Object(_static_isNode__WEBPACK_IMPORTED_MODULE_1__["default"])(selector) ? [selector] : Object(_static_queryAll__WEBPACK_IMPORTED_MODULE_10__["default"])(selector),
    };
    root.selected.forEach((elem, i) => {
        root[i] = elem;
    });

    const _set_real_display_style = function (src) {
        if (Object(_static_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(src, 'string')) {
            Object(_static_queryAll__WEBPACK_IMPORTED_MODULE_10__["default"])(src).map(_set_real_display_style);
        } else if (Object(_static_isNode__WEBPACK_IMPORTED_MODULE_1__["default"])(src) && src['real-display-style'] === undefined) {
            const style = src.style.display ? src.style.display : getComputedStyle(src).display;
            src['real-display-style'] = (!style || style === 'none') ? 'block' : style;
        }
    };

    root.one = () => root.selected && root.selected.length ? root.selected[0] : false;
    root.all = () => root.selected;
    root.attr = (name, value) => Object(_static_defined__WEBPACK_IMPORTED_MODULE_14__["default"])(value) ? Object(_static_attr__WEBPACK_IMPORTED_MODULE_2__["default"])(root.one(), name, value) : Object(_static_attr__WEBPACK_IMPORTED_MODULE_2__["default"])(root.one(), name);
    root.inject = (data, append, to) => Object(_static_inject__WEBPACK_IMPORTED_MODULE_5__["default"])(root.one(), data, append, to);
    root.append = (data) => Object(_static_inject__WEBPACK_IMPORTED_MODULE_5__["default"])(root.one(), data, true);
    root.search = (attr, from) => Object(_static_search__WEBPACK_IMPORTED_MODULE_8__["default"])(root.one(), attr, from);
    root.parent = () => root.one().parentNode;
    root.children = () => {
        root.one()
    };
    root.position = () => Object(_static_position__WEBPACK_IMPORTED_MODULE_15__["default"])(root.one());
    root.query = (selector) => root.one().querySelector(selector);
    root.queryAll = (selector) => root.one().querySelectorAll(selector);
    root.x = () => Object(_static_position__WEBPACK_IMPORTED_MODULE_15__["default"])(root.one()).x;
    root.y = () => Object(_static_position__WEBPACK_IMPORTED_MODULE_15__["default"])(root.one()).y;
    root.width = () => Object(_static_position__WEBPACK_IMPORTED_MODULE_15__["default"])(root.one()).width;
    root.height = () => Object(_static_position__WEBPACK_IMPORTED_MODULE_15__["default"])(root.one()).height;
    root.remove = () => root.one().parentNode.removeChild(root.one());
    root.show = () => {
        const src = root.one();
        _set_real_display_style(src);
        Object(_static_css__WEBPACK_IMPORTED_MODULE_3__["default"])(src, {display: src && src['real-display-style'] ? src['real-display-style'] : 'block'});
    };
    root.hide = () => {
        const src = root.one();
        _set_real_display_style(src);
        Object(_static_css__WEBPACK_IMPORTED_MODULE_3__["default"])(src, {display: 'none'});
    };
    root.toggle = () => {
        const src = root.one();
        if (Object(_static_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(src, 'string')) {
            Object(_static_queryAll__WEBPACK_IMPORTED_MODULE_10__["default"])(src).map(Dom.toggle);
        } else if (Object(_static_isNode__WEBPACK_IMPORTED_MODULE_1__["default"])(src)) {
            if (src.style.display === 'none') Dom.show(src);
            else Dom.hide(src);
        }
    };
    root.on = (eventName, callback, bubble) => Object(_static_on__WEBPACK_IMPORTED_MODULE_13__["default"])(root.one(), eventName, callback, bubble);
    root.coords = () => {
        const coords = root.one().getBoundingClientRect();
        return Object(_static_merge__WEBPACK_IMPORTED_MODULE_16__["default"])({top: coords.top + pageYOffset, left: coords.left + pageXOffset}, coords);
    };
    return root;
}

Dom.on = _static_on__WEBPACK_IMPORTED_MODULE_13__["default"];
Dom.id = (element) => document.getElementById(element);
Dom.attr = _static_attr__WEBPACK_IMPORTED_MODULE_2__["default"];
Dom.css = _static_css__WEBPACK_IMPORTED_MODULE_3__["default"];
Dom.loaded = _static_domLoaded__WEBPACK_IMPORTED_MODULE_4__["default"];
Dom.inject = _static_inject__WEBPACK_IMPORTED_MODULE_5__["default"];
Dom.str2node = _static_str2node__WEBPACK_IMPORTED_MODULE_6__["default"];
Dom.search = _static_search__WEBPACK_IMPORTED_MODULE_8__["default"];
Dom.queryAll = _static_queryAll__WEBPACK_IMPORTED_MODULE_10__["default"];
Dom.query = _static_query__WEBPACK_IMPORTED_MODULE_9__["default"];
Dom.create = _static_createElement__WEBPACK_IMPORTED_MODULE_12__["default"];
Dom.fragment = _static_createFragment__WEBPACK_IMPORTED_MODULE_11__["default"];
Dom.node2str = _static_node2str__WEBPACK_IMPORTED_MODULE_7__["default"];
Dom.str2node = _static_str2node__WEBPACK_IMPORTED_MODULE_6__["default"];
Dom.position = _static_position__WEBPACK_IMPORTED_MODULE_15__["default"];


/* harmony default export */ __webpack_exports__["default"] = (Dom);


/***/ }),

/***/ "./src/components/KeyboardManager.js":
/*!*******************************************!*\
  !*** ./src/components/KeyboardManager.js ***!
  \*******************************************/
/*! exports provided: KeyboardKeyCode, KeyboardEventName, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyboardKeyCode", function() { return KeyboardKeyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyboardEventName", function() { return KeyboardEventName; });
/*
KeyboardEvent {isTrusted: true, key: 'w', code: 'KeyW', location: 0, ctrlKey: false, …}
    isTrusted: true
    altKey: false
    bubbles: true
    cancelBubble: false
    cancelable: true
    charCode: 0
    code: "KeyW"
    composed: true
    ctrlKey: false
    currentTarget: null
    defaultPrevented: false
    detail: 0
    eventPhase: 0
    isComposing: false
    key: "w"
    keyCode: 87
    location: 0
    metaKey: false
    path: (4) [body, html, document, Window]
    repeat: false
    returnValue: true
    shiftKey: false
    sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false}
    srcElement: body
    target: body
    timeStamp: 1356.300000000745
    type: "keydown"
    view: Window {window: Window, self: Window, document: document, name: '', location: Location, …}
    which: 87
*/

const KeyboardKeyCode = {
    getCodeByName(name){
        return KeyboardKeyCode[name]
    },
    getNameByCode(code){
        let result = null;

        Object.keys(KeyboardKeyCode).forEach((key) => {
            if (code === KeyboardKeyCode[key]) {
                result = key
            }
        });

        return result;
    },
    getNames(){
        return Object.keys(KeyboardKeyCode);
    },
    code(key){
        return KeyboardKeyCode.reverse()[key] || false;
    },
    reverse(){
        let keys = {};
        for (const [key, value] of Object.entries(KeyboardKeyCode)) {
            keys[value] = key
        }
        return keys;
    },
    'Backspace': 8,
    'Tab': 9,
    'Enter': 13,
    'ShiftLeft': 16,
    'ShiftRight': 16,
    'ControlLeft': 17,
    'ControlRight': 17,
    'AltLeft': 18,
    'AltRight': 18,
    'Pause': 19,
    'Break': 19,
    'CapsLock': 20,
    'Escape': 27,
    'Space': 32,
    'PageUp': 33,
    'PageDown': 34,
    'End': 35,
    'Home': 36,
    'ArrowLeft': 37,
    'ArrowUp': 38,
    'ArrowRight': 39,
    'ArrowDown': 40,
    'PrintScreen': 44,
    'Insert': 45,
    'Delete': 46,
    'Digit0': 48,
    'Digit1': 49,
    'Digit2': 50,
    'Digit3': 51,
    'Digit4': 52,
    'Digit5': 53,
    'Digit6': 54,
    'Digit7': 55,
    'Digit8': 56,
    'Digit9': 57,
    'KeyA': 65,
    'KeyB': 66,
    'KeyC': 67,
    'KeyD': 68,
    'KeyE': 69,
    'KeyF': 70,
    'KeyG': 71,
    'KeyH': 72,
    'KeyI': 73,
    'KeyJ': 74,
    'KeyK': 75,
    'KeyL': 76,
    'KeyM': 77,
    'KeyN': 78,
    'KeyO': 79,
    'KeyP': 80,
    'KeyQ': 81,
    'KeyR': 82,
    'KeyS': 83,
    'KeyT': 84,
    'KeyU': 85,
    'KeyV': 86,
    'KeyW': 87,
    'KeyX': 88,
    'KeyY': 89,
    'KeyZ': 90,
    'MetaLeft': 91,
    'MetaRight': 92,
    'ContextMenu': 93,
    'Numpad0': 96,
    'Numpad1': 97,
    'Numpad2': 98,
    'Numpad3': 99,
    'Numpad4': 100,
    'Numpad5': 101,
    'Numpad6': 102,
    'Numpad7': 103,
    'Numpad8': 104,
    'Numpad9': 105,
    'NumpadMultiply': 106,
    'NumpadAdd': 107,
    'NumpadSubtract': 109,
    'NumpadDecimal': 110,
    'NumpadDivide': 111,
    'F1': 112,
    'F2': 113,
    'F3': 114,
    'F4': 115,
    'F5': 116,
    'F6': 117,
    'F7': 118,
    'F8': 119,
    'F9': 120,
    'F10': 121,
    'F11': 122,
    'F12': 123,
    'NumLock': 144,
    'ScrollLock': 145,
    'Semicolon': 186,
    'Equal': 187,
    'Comma': 188,
    'Minus': 189,
    'Period': 190,
    'Slash': 191,
    'Backquote': 192,
    'BracketLeft': 219,
    'Backslash': 220,
    'BracketRight': 221,
    'Quote': 222,
};

const KeyboardEventName = {
    get 'keyup' () { return 'keyup' },
    get 'keydown' () { return 'keydown' },
    get 'keypress' () { return 'keypress' },
};

/*

const keyboard = KeyboardManager();

keyboard.add(KeyboardEventName.keypress, (event) => {
    // code: "KeyW"
    // key: "w"
    // keyCode: 87
    // ctrlKey: false
    // shiftKey: false
    // which: 87
    // type: "keydown"

    if (event.code === KeyboardKeyCode.code(KeyboardKeyCode.KeyW)) {

    }
});

keyboard.add(event, callback)
keyboard.remove(type)
keyboard.clear()
*/


/**
 *
 * @returns {{add(*, *): void, clear(): void, active: {left: boolean, up: boolean, right: boolean, down: boolean}, remove(*): void}}
 * @constructor
 */
const KeyboardManager = function ()
{
    const stack = {};
    const add = function (type, callback) {
        stack[type] = callback;
    };

    function addListener (type) {
        document.addEventListener(type, stack[type]);
    }

    function removeListener (type) {
        document.removeEventListener(type, stack[type]);
    }

    function removeListeners () {
        Object.keys(stack).map(function (type) {
            document.removeEventListener(type, stack[type]);
        })
    }

    return {
        active: {
            up: false,
            down: false,
            left: false,
            right: false,
        },
        add(type, callback) {
            add(type, callback);
            addListener(type);
        },

        remove(event) {
            removeListener(event);
        },

        clear() {
            removeListeners();
        },
    };
};

/* harmony default export */ __webpack_exports__["default"] = (KeyboardManager);


/***/ }),

/***/ "./src/components/Loader.js":
/*!**********************************!*\
  !*** ./src/components/Loader.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/**
 * Loader.audios: ƒ (srcs, callback)
 * Loader.images: ƒ (imgs, callback)
 * Loader.javascript: ƒ (src, callback, onerror)
 * Loader.json: ƒ (src, callback, onerror)
 * @property
 * @method json
 * @method jsons
 * @method javascript
 * @method images
 * @method audios
 * @returns {{}}
 * @constructor
 */
const Loader = function () {
    return {
        json: Loader.json,
        jsons: Loader.jsons,
        javascript: Loader.javascript,
        images: Loader.images,
        audios: Loader.audios,
        videos: Loader.video,
    };
};

/**
 * .json('/url/datafile.json', (json) => {}, (error) => {})
 *
 * @param src
 * @param callback
 * @param onerror
 */
Loader.json = function (src, callback, onerror) {
    fetch(src)
        .then(response => response.json())
        .then(json => callback(json))
        .catch(error => typeof onerror === 'function' ? onerror(error) : null);
}

/**
 *
 * @param srcs
 * @param callback
 * @param onerror
 */
Loader.jsons = function (srcs, callback, onerror)
{
    if (srcs && typeof srcs === 'object') {

        if (Array.isArray(srcs)) {
            const obj = {};
            srcs.map(function (item) {
                obj[Math.random().toString(32).slice(2)] = item
            });
            srcs = obj;
        }

        const scripts = {};
        const length = Object.keys(srcs).length;
        let iterator = 0;

        Object.keys(srcs).forEach((key) => {
            const src = srcs[key];
            Loader.json(src, (json) => {
                scripts[key] = json;
                iterator ++;
                if (iterator === length) {
                    callback.call({}, scripts);
                }
            }, onerror);
        });
    }
}

/**
 * Loads a script element with javascript source
 *
 * .javascript ( {
 *      my_script1: '/path/to/my_script1',
 *      my_script2: '/path/to/my_script2',
 *    },
 *    function (list) {})
 *
 * .javascript ( [
 *      '/path/to/my_script1',
 *      '/path/to/my_script2',
 *    ],
 *    function (list) {})
 *
 * @namespace Loader.javascript
 * @param srcs       Object, Array. items: key is ID, value is src
 * @param callback  Function called when all srcs is loaded
 * @param onerror   Function called when load is failed
 * @returns {*}
 */
Loader.javascript = function (srcs, callback, onerror)
{
    if (srcs && typeof srcs === 'object') {

        if (Array.isArray(srcs)) {
            const obj = {};
            srcs.map(function (item) {
                obj[Math.random().toString(32).slice(2)] = item
            });
            srcs = obj;
        }

        const length = Object.keys(srcs).length;
        const scripts = {};
        let script;
        let iterator = 0;

        Object.keys(srcs).forEach((key) => {
            script = document.createElement('script');
            script.src = (srcs[key].substr(-3) === '.js') ? srcs[key] : srcs[key] + '.js';
            script.type = 'application/javascript';
            script.id = key;
            script.onerror = onerror;
            script.onload = function (e) {
                scripts[this.id] = this;
                iterator++;
                if (iterator === length) {
                    callback.call({}, scripts);
                }
            };
            document.head.appendChild(script);
        });
    }
};

/**
 * Load an images
 *
 * .images ( {
 *      img1: '/path/to/img1',
 *      img2: '/path/to/img2',
 *    },
 *    function (list) {})
 *
 * @namespace Animate.Loader.images
 * @param imgs
 * @param callback
 */
Loader.images = function (imgs, callback) {
    if (imgs && typeof imgs === 'object') {
        const length = Object.keys(imgs).length;
        const images = {};
        let iterator = 0;
        for (let name in imgs) {
            const img = document.createElement('img');
            img.src = imgs[name];
            img.name = name;
            img.onload = function (e) {
                images[this.name] = this;
                iterator++;
                if (iterator === length) {
                    callback.call({}, images);
                }
            };
        }
    }
}

/**
 * Load an audio files
 *
 * .audios ( {
 *      audio1: '/path/to/audio1',
 *      audio2: '/path/to/audio2',
 *    },
 *    function (list) {})
 *
 * @namespace Animate.Loader.audios
 * @param srcs
 * @param callback
 */
Loader.audios = function (srcs, callback) {
    if (srcs && typeof srcs === 'object') {
        const length = Object.keys(srcs).length;
        const audios = {};
        let iterator = 0;
        for (let name in srcs) {
            const audio = document.createElement('audio');
            audio.src = srcs[name];
            audio.name = name;
            audio.preload = 'auto';
            audios[name] = audio;
            iterator++;
            if (iterator === length) {
                callback.call({}, audios);
            }
        }
    }
};

/**
 * Load an video files
 *
 * .videos ( {
 *      video1: '/path/to/video1',
 *      video2: '/path/to/video2',
 *    },
 *    function (list) {})
 *
 * @namespace Animate.Loader.videos
 * @param srcs
 * @param callback
 */
Loader.videos = function (srcs, callback) {
    if (srcs && typeof srcs === 'object') {
        const length = Object.keys(srcs).length;
        const videos = {};
        let iterator = 0;
        for (let name in srcs) {
            const video = document.createElement('video');
            video.src = srcs[name];
            video.name = name;
            video.preload = 'auto';
            videos[name] = video;
            iterator++;
            if (iterator === length) {
                callback.call({}, videos);
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Loader);


/***/ }),

/***/ "./src/components/Router.js":
/*!**********************************!*\
  !*** ./src/components/Router.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _static_trimSymbols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../static/trimSymbols */ "./src/static/trimSymbols.js");


const Router = function (config)
{
    const root = {};
    root.hash = location.hash;
    root.root = '/' + Object(_static_trimSymbols__WEBPACK_IMPORTED_MODULE_0__["default"])(config.root, '/');
    root.pathname = '/' + Object(_static_trimSymbols__WEBPACK_IMPORTED_MODULE_0__["default"])(location.pathname, '/') + '/';
    root.routes = config.routes ? config.routes : {};
    root.context = config.context ? config.context : {};

    root.to = function (key) {
        console.log(key)
        if (typeof root.routes[key] === "function") {
            root.routes[key].call({}, root.context);
        }
    };

    Object.keys(root.routes).forEach((key) => {
        const is = key.includes('#')
            ? key === root.hash
            : root.root + key === root.pathname;

        if (is && typeof root.routes[key] === "function") {
            root.routes[key].call(root.context, root.context);
        }
    });

    return root;
};

/* harmony default export */ __webpack_exports__["default"] = (Router);


/***/ }),

/***/ "./src/components/Roxy.js":
/*!********************************!*\
  !*** ./src/components/Roxy.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _static_copy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../static/copy */ "./src/static/copy.js");
/*

let stage = {
    title: '',
    body: '',
    user: {email: '',name: '',},
};

const rx = Roxy(stagePrevious);
stage = rx.proxy;
stage = rx.getContext();
stage = rx.getProxy();

rx.observe('title', (key, values)=>{
    // key title
    // value 'new title'
});

rx.removeLoopListener();
rx.loopListener((key, value) => {
    // key title
    // value 'new title'
});

// rx.dispatch('title', 'new title');

stage.title = 'new  title'; // dispatch event




rx.addListener((key, values)=>{
    if (key === '') {}
    inject('#' + key, values);
});
rx.removeListener();

rx.proxy.title = 'First value';
rx.proxy.body = 'Test body text';

rx.fill({
    title: 'title',
});

rx.fill({
    email: 'value',
    name: 'value',
}, 'user');

Timer.timeout(() => {
    rx.dispatch('title', 'Hello friend');
    rx.dispatch('body', 'Do you happy now?');
}, 2000);

rx.get(key);                // return proxy object by key
rx.fill(payload, to);       // fill proxy by payload object, or to included object entries
rx.observe(key, callback);  // listener
rx.dispatch(key, payload);  // dispatcher
rx.proxy                    // getter, return all proxy objects
rx.getProxy();              // return ProxyConstructor

*/




/**
 *
 * @param payload
 * @returns {{removeLoopListener(): boolean, readonly proxy: *, loopListener(*): void, dispatch(*, *): this, getProxy(): *, get(*): *, fill(*, *): this, getContext(): *, observe(*, *): this}|*|boolean|null}
 * @constructor
 */
const Roxy = function (payload)
{
    let ___callbacklistener___ = false;
    let ___eventcallbacks___ = {
        default: null,
    };

    const proxy = new Proxy(payload, {
        get(obj, prop) {
            return prop in obj ? obj[prop] : null;
        },
        set(obj, prop, value) {

            obj[prop] = value;

            if (___callbacklistener___) {
                ___callbacklistener___.call({}, prop, value, Object(_static_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(proxy));
            }

            if (___eventcallbacks___[prop] && typeof ___eventcallbacks___[prop] === "function") {
                ___eventcallbacks___[prop].call({}, prop, value, Object(_static_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(proxy));
            }

            if (typeof ___eventcallbacks___.default === "function") {
                ___eventcallbacks___.default.call({}, prop, value, Object(_static_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(proxy));
            }
            return true;
        }
    });

    return {
        get(key) {
            return key ? proxy[key] : Object(_static_copy__WEBPACK_IMPORTED_MODULE_0__["default"])(proxy);
        },
        get proxy() {
            return proxy;
        },
        getProxy() {
            return proxy;
        },
        getContext() {
            return proxy;
        },
        loopListener(callback) {
            ___callbacklistener___ = callback;
        },
        removeLoopListener() {
            return ___callbacklistener___ = false;
        },
        dispatch(key, payload)
        {
            let result;

            if (typeof key === "function" && !payload) {
                result = key.call({}, proxy);

                if (result) {
                    this.fill(result);
                }

            } else if (typeof payload === "function") {
                result = payload.call({}, proxy[key]);
                this.fill({[key]: result});

            } else {
                proxy[key] = payload;
            }

            return this;
        },
        observe(key, callback) {
            if (typeof key === "function" && !callback) {
                ___eventcallbacks___.default = key;
            } else {
                ___eventcallbacks___[key] = typeof callback === "function"
                    ? callback
                    : null;
            }

            return this;
        },

        fill(payload, to) {
            Object.keys(payload).forEach((key) => {
                if (to) {
                    if (!proxy[to]) { proxy[to] = {}; }
                    proxy[to][key] = payload[key];
                } else {
                    proxy[key] = payload[key];
                }
            });

            return this;
        },
    };
};


/* harmony default export */ __webpack_exports__["default"] = (Roxy);


/***/ }),

/***/ "./src/components/RoxyListener.js":
/*!****************************************!*\
  !*** ./src/components/RoxyListener.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Roxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Roxy */ "./src/components/Roxy.js");


/*
const rx = RoxyListener ({
    eventName () { /* handler .../ },
    eventName () { /* handler .../ },
})
rx.set();
rx.dispatch();

rx.action();
*/

/**
 * const rx = RoxyListener ({
 *     eventName () { /* handler .../ },
 *     eventName () { /* handler .../ },
 * })
 * rx.addListener();
 * rx.dispatch();
 *
 * rx.action();
 *
 * @param payload
 * @returns {{removeLoopListener(): boolean, readonly proxy: *, loopListener(*): void, dispatch(*, *): this, getProxy(): *, get(*): *, fill(*, *): this, getContext(): *, observe(*, *): this}} * @constructor
 * @constructor
 */
const RoxyListener = function (payload) {

    const actions = {
        __action__() {
        }
    };

    const actionsNames = {};

    Object.keys(payload).map(function (eventName, index) {
        actions[eventName] = payload[eventName];

        if (typeof payload[eventName] === 'function' && eventName !== actions.__action__.name) {
            actionsNames[eventName] = '';
        }
    });

    const rx = Object(_Roxy__WEBPACK_IMPORTED_MODULE_0__["default"])(actionsNames);
    //
    rx.actions = function () {
        return actionsNames
    };

    // observe
    rx.addListener((eventCursor, values) => {
        actions.__action__.call(actions, eventCursor, values);

        Object.keys(actions).map(function (eventName, index) {

            if (eventCursor === eventName && typeof actions[eventName] === 'function') {
                actions[eventName].call(actions, eventCursor, values);
            }
        })
    });

    return rx;
};

/* harmony default export */ __webpack_exports__["default"] = (RoxyListener);


/***/ }),

/***/ "./src/components/Storage.js":
/*!***********************************!*\
  !*** ./src/components/Storage.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Add item by name
 * @param name
 * @param value
 * @param json
 */
const set = function (name, value, json = true) {
    if (json)
        try {
            value = JSON.stringify(value);
        } catch (error) {}
    return Storage.typeStorageObject.setItem(name, value);
};

/**
 * Get item by name
 * @param {string} name
 * @param json
 */
const get = function (name, json = true) {
    let value = Storage.typeStorageObject.getItem(name);
    if (json && value)
        try {
            value = JSON.parse(value);
        } catch (error) {}

    return value;
};

/**
 *
 * Remove item by name
 * @param name
 */
const remove = function (name) {
    return Storage.typeStorageObject.removeItem(name)
};

/**
 * Get item by index
 *
 * @param index
 * @returns {string}
 */
const key = function (index) {
    return Storage.typeStorageObject.key(index)
};

/**
 * When invoked, will empty all keys out of the storage.
 */
const clear = function () {
    return Storage.typeStorageObject.clear()
};

/**
 * Returns an integer representing the number of data items stored in the Storage object.
 * @returns {number}
 */
const length = function () {
    return Storage.typeStorageObject.length
};

/**
 * LocalStorage wrapper
 *
 * Storage.typeStorage = 'local'; // local for use `localStorage` or session
 *
 * Storage.set(name, {})
 * Storage.get(name)
 * Storage.key(index)
 * Storage.clear()          // common clear `localStorage`
 * Storage.remove(name)     // delete item by name
 * Storage.length()         // common width wight of `localStorage`
 *
 * Storage(name) === Storage.get(name)
 * Storage(name, {}) === Storage.set(name, {})
 *
 * @param name
 * @param value
 * @returns {string|{set: (function(*, *, *=): void), get: (function(string, *=): string), clear: (function(): void), length: (function(): number), key: (function(*): string), remove: (function(*): void)}|void}
 * @constructor
 */
const Storage = function (name, value) {
    switch (arguments.length) {
        case 0:
            return {
                set: set,
                get: get,
                key: key,
                clear: clear,
                remove: remove,
                length: length,
            };
        case 1:
            return get(name);
        case 2:
            return set(name, value);
    }
};

//
Storage.set = set;
Storage.get = get;
Storage.key = key;
Storage.clear = clear;
Storage.remove = remove;
Storage.size = length;
Storage.typeStorage = 'local';
Storage.typeStorageObject = Storage.typeStorage === 'local' ? window.localStorage : window.sessionStorage;

/* harmony default export */ __webpack_exports__["default"] = (Storage);


/***/ }),

/***/ "./src/components/Str.js":
/*!*******************************!*\
  !*** ./src/components/Str.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _static_typeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../static/typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _static_str2node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/str2node */ "./src/static/str2node.js");
/* harmony import */ var _static_node2str__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../static/node2str */ "./src/static/node2str.js");
/* harmony import */ var _static_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../static/each */ "./src/static/each.js");






const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

function Str (string) {
    const $ = {
        string: Object(_static_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(string, 'string') ? string : '',
        length: string.length,
    };

    $.capitalize = () => capitalize($.string);
    $.upper = () => $.string.toUpperCase();
    $.lower = () => $.string.toLowerCase();
    $.padEnd = (value) => $.string.padEnd(value);
    $.padStart = (value) => $.string.padStart(value);
    $.each = (callback) => callback ? $.string.split('').forEach(callback) : $.string.split('');

    return $;
}

Str.capitalize = capitalize;
Str.node2str = _static_node2str__WEBPACK_IMPORTED_MODULE_2__["default"];
Str.str2node = _static_str2node__WEBPACK_IMPORTED_MODULE_1__["default"];
Str.each = _static_each__WEBPACK_IMPORTED_MODULE_3__["default"];

/* harmony default export */ __webpack_exports__["default"] = (Str);


/***/ }),

/***/ "./src/components/Timer.js":
/*!*********************************!*\
  !*** ./src/components/Timer.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 *
 * @param callback: function
 * @param ms
 * @param thisInst
 * @return {number}
 */
const timeout = function (callback = () => {}, ms = 1000, thisInst = null) {
    thisInst = typeof thisInst === 'object' ? thisInst : {};

    return setTimeout(function () {
        callback.call(thisInst)
    }, ms);
};

/**
 * @example Timer.interval( function(iterator, stop){ if (iterator > 10){ stop(); } }, 300);
 * @param callback
 * @param ms
 * @param thisInst
 * @return {number}
 */
const interval = function (callback = () => {}, ms = 1000, thisInst = null)
{
    thisInst = typeof thisInst === 'object' ? thisInst : {};

    let iterate = 0;
    let instance = setInterval(function () {
        callback.call(thisInst,  ++ iterate, stop)
    }, ms);

    function stop() {
        clearInterval(instance);
    }

    return instance;
};

const Timer = function (callback, delay = 1000, repeat = 1, thisInstance = null)
{
    if (repeat > 1) {
        interval((iterator, stop) => {
            if (iterator > repeat) {
                stop();
            } else {
                callback.call(thisInstance, iterator, stop);
            }
        }, delay);
    } else {
        timeout(callback, delay, thisInstance)
    }

    return this;
};

Timer.timeout = timeout;
Timer.interval = interval;
Timer.clear = (id) => {
    clearTimeout(id);
    clearInterval(id);
};

/* harmony default export */ __webpack_exports__["default"] = (Timer);

/***/ }),

/***/ "./src/components/Transform.js":
/*!*************************************!*\
  !*** ./src/components/Transform.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _static_stylizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../static/stylizer */ "./src/static/stylizer.js");
/* harmony import */ var _static_isNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/isNumber */ "./src/static/isNumber.js");


/*

transform = Transform(this.element);
transform.method('rotate', ['45deg']);
transform.update();
transform.research();
transform.functionParameters('matrix')         // [1, 0, 0, 1, 0, 0]: array
transform.functionParameters('rotate')         // ["45deg"]: string
transform.functionParameters('rotate', true)   // 45: int

// ...
Transform.element(this.element, [
    'rotate(' + 10 +'deg)',
    'scale(0.6, 0.6)',
    'matrix(1, 0, 0, 1, 0, 0)',
]);
Transform.element(this.element, ['rotate(' + 10 +'deg)'])
const trs = Transform(this.element);

// without of the Transform
this.style({
    transform: 'rotate(' + 10 +'deg) scale(0.6, 0.6) matrix(1, 0, 0, 1, 0, 0)'
});

*/
const Transform = function (element, params)
{
    const root = {
        element: element,
        transform_obj: {},
        transform_arr: element.style.transform.split(')').filter((value) => value.length ),
        transform_string: '',

        update(){
            root.transform_string = '';

            Object.keys(root.transform_obj).forEach((key) => {
                root.transform_string += key + '(' + root.transform_obj[key].join(', ') + ') ';
            });

            root.element.style.transform =  root.transform_string;
            root.research();
        },

        method(method, properties, multiply = false) {
            if (typeof method === 'string') {
                properties = Array.isArray(properties) ? properties : [properties];

                if (multiply) {
                    if (root.transform_obj[method]) {
                        properties.forEach((value, i) => {
                            if(typeof value === 'string') {
                                const ext = value.match(/[a-z]+/g);
                                const num = parseInt(value) + parseInt(root.transform_obj[method][i]);
                                properties[i] = num + ext;
                            } else {
                                properties[i] = value + root.transform_obj[method][i];
                            }
                            root.transform_obj[method] = properties;
                        });
                    } else {
                        root.transform_obj[method] = properties;
                    }
                } else {
                    root.transform_obj[method] = properties;
                }

            } else {
                throw new Error('Sets parameters is not available')
            }
        },

        research(){
            root.transform_arr = element.style.transform.split(')')
                .filter((value) => value.length );

            root.transform_arr.forEach((value, i) => {
                const param = root.transform_arr[i] = root.transform_arr[i].trim()  + ')';
                const matched = param.match(/[\w\.\-]+/ig);
                root.transform_obj[matched[0]] = matched.slice(1);
            });
        },

        functionParameters(name, FIRST_ITEM_TO_INTEGER = false){
            if (FIRST_ITEM_TO_INTEGER
                && Array.isArray(root.transform_obj[name])
                && root.transform_obj[name].length === 1)
            {
                const item = root.transform_obj[name][0];
                return Object(_static_isNumber__WEBPACK_IMPORTED_MODULE_1__["default"])(item)
                    ? parseInt(item)
                    : root.transform_obj[name];
            }
            return root.transform_obj[name];
        },
    };

    root.research();

    if (params && typeof params === 'object') {
        Object.keys(params).forEach((key) => {
            root.method(key, params[key]);
        });
        root.update();
    }

    return root;
}

Transform.element = function (element, values){
    if (Array.isArray(values)) {
        const props = [];
        values.forEach((prop) => { props.push(prop) });
        Object(_static_stylizer__WEBPACK_IMPORTED_MODULE_0__["default"])(element, {transform: props.join(' ')});
    }
};

/* harmony default export */ __webpack_exports__["default"] = (Transform);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Chain */ "./src/components/Chain.js");
/* harmony import */ var _components_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Component */ "./src/components/Component.js");
/* harmony import */ var _components_Roxy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Roxy */ "./src/components/Roxy.js");
/* harmony import */ var _components_RoxyListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/RoxyListener */ "./src/components/RoxyListener.js");
/* harmony import */ var _components_Timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Timer */ "./src/components/Timer.js");
/* harmony import */ var _components_Router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Router */ "./src/components/Router.js");
/* harmony import */ var _components_KeyboardManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/KeyboardManager */ "./src/components/KeyboardManager.js");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Loader */ "./src/components/Loader.js");
/* harmony import */ var _static_abc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./static/abc */ "./src/static/abc.js");
/* harmony import */ var _static_clone__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./static/clone */ "./src/static/clone.js");
/* harmony import */ var _static_convertHEXtoRGB__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./static/convertHEXtoRGB */ "./src/static/convertHEXtoRGB.js");
/* harmony import */ var _static_convertRGBtoHEX__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./static/convertRGBtoHEX */ "./src/static/convertRGBtoHEX.js");
/* harmony import */ var _static_wait__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./static/wait */ "./src/static/wait.js");
/* harmony import */ var _static_values__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./static/values */ "./src/static/values.js");
/* harmony import */ var _static_uri__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./static/uri */ "./src/static/uri.js");
/* harmony import */ var _static_toSnakeCase__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./static/toSnakeCase */ "./src/static/toSnakeCase.js");
/* harmony import */ var _static_toObject__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./static/toObject */ "./src/static/toObject.js");
/* harmony import */ var _static_toXML__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./static/toXML */ "./src/static/toXML.js");
/* harmony import */ var _static_sprintf__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./static/sprintf */ "./src/static/sprintf.js");
/* harmony import */ var _static_toMap__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./static/toMap */ "./src/static/toMap.js");
/* harmony import */ var _static_str2node__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./static/str2node */ "./src/static/str2node.js");
/* harmony import */ var _static_toCamelCase__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./static/toCamelCase */ "./src/static/toCamelCase.js");
/* harmony import */ var _static_typeOf__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./static/typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _static_typeOfStrict__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./static/typeOfStrict */ "./src/static/typeOfStrict.js");
/* harmony import */ var _static_stylizer__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./static/stylizer */ "./src/static/stylizer.js");
/* harmony import */ var _static_trimSymbols__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./static/trimSymbols */ "./src/static/trimSymbols.js");
/* harmony import */ var _static_uniqArray__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./static/uniqArray */ "./src/static/uniqArray.js");
/* harmony import */ var _static_str2fragment__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./static/str2fragment */ "./src/static/str2fragment.js");
/* harmony import */ var _static_toMinusCase__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./static/toMinusCase */ "./src/static/toMinusCase.js");
/* harmony import */ var _static_trim__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./static/trim */ "./src/static/trim.js");
/* harmony import */ var _static_sum__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./static/sum */ "./src/static/sum.js");
/* harmony import */ var _static_toArray__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./static/toArray */ "./src/static/toArray.js");
/* harmony import */ var _static_shuffleArray__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./static/shuffleArray */ "./src/static/shuffleArray.js");
/* harmony import */ var _static_search__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./static/search */ "./src/static/search.js");
/* harmony import */ var _static_redirect__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./static/redirect */ "./src/static/redirect.js");
/* harmony import */ var _static_range__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./static/range */ "./src/static/range.js");
/* harmony import */ var _static_random__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./static/random */ "./src/static/random.js");
/* harmony import */ var _static_radiansToDegrees__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./static/radiansToDegrees */ "./src/static/radiansToDegrees.js");
/* harmony import */ var _static_query__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./static/query */ "./src/static/query.js");
/* harmony import */ var _static_queryAll__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./static/queryAll */ "./src/static/queryAll.js");
/* harmony import */ var _static_positionMouse__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./static/positionMouse */ "./src/static/positionMouse.js");
/* harmony import */ var _static_position__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./static/position */ "./src/static/position.js");
/* harmony import */ var _static_on__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./static/on */ "./src/static/on.js");
/* harmony import */ var _static_number2string__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./static/number2string */ "./src/static/number2string.js");
/* harmony import */ var _static_node2str__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./static/node2str */ "./src/static/node2str.js");
/* harmony import */ var _static_min__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./static/min */ "./src/static/min.js");
/* harmony import */ var _static_middleNumber__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./static/middleNumber */ "./src/static/middleNumber.js");
/* harmony import */ var _static_merge__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./static/merge */ "./src/static/merge.js");
/* harmony import */ var _static_max__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./static/max */ "./src/static/max.js");
/* harmony import */ var _static_loadJSSync__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./static/loadJSSync */ "./src/static/loadJSSync.js");
/* harmony import */ var _static_loadJSON__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./static/loadJSON */ "./src/static/loadJSON.js");
/* harmony import */ var _static_loadJS__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./static/loadJS */ "./src/static/loadJS.js");
/* harmony import */ var _static_loadCSS__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./static/loadCSS */ "./src/static/loadCSS.js");
/* harmony import */ var _static_loadBlobfile__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./static/loadBlobfile */ "./src/static/loadBlobfile.js");
/* harmony import */ var _static_isUpperCase__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./static/isUpperCase */ "./src/static/isUpperCase.js");
/* harmony import */ var _static_isString__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./static/isString */ "./src/static/isString.js");
/* harmony import */ var _static_isRegExp__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./static/isRegExp */ "./src/static/isRegExp.js");
/* harmony import */ var _static_isObject__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./static/isObject */ "./src/static/isObject.js");
/* harmony import */ var _static_isNumber__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./static/isNumber */ "./src/static/isNumber.js");
/* harmony import */ var _static_isNode__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./static/isNode */ "./src/static/isNode.js");
/* harmony import */ var _static_isLowerCase__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./static/isLowerCase */ "./src/static/isLowerCase.js");
/* harmony import */ var _static_isInteger__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./static/isInteger */ "./src/static/isInteger.js");
/* harmony import */ var _static_isHTMLString__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./static/isHTMLString */ "./src/static/isHTMLString.js");
/* harmony import */ var _static_isFunction__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./static/isFunction */ "./src/static/isFunction.js");
/* harmony import */ var _static_isEqualArrays__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./static/isEqualArrays */ "./src/static/isEqualArrays.js");
/* harmony import */ var _static_isEmpty__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./static/isEmpty */ "./src/static/isEmpty.js");
/* harmony import */ var _static_isDefined__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./static/isDefined */ "./src/static/isDefined.js");
/* harmony import */ var _static_isBoolean__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./static/isBoolean */ "./src/static/isBoolean.js");
/* harmony import */ var _static_inject__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./static/inject */ "./src/static/inject.js");
/* harmony import */ var _static_httpRequest__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./static/httpRequest */ "./src/static/httpRequest.js");
/* harmony import */ var _static_getWindow__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./static/getWindow */ "./src/static/getWindow.js");
/* harmony import */ var _static_getLocation__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./static/getLocation */ "./src/static/getLocation.js");
/* harmony import */ var _static_getDocument__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./static/getDocument */ "./src/static/getDocument.js");
/* harmony import */ var _static_format__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./static/format */ "./src/static/format.js");
/* harmony import */ var _static_find__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./static/find */ "./src/static/find.js");
/* harmony import */ var _static_extend__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./static/extend */ "./src/static/extend.js");
/* harmony import */ var _static_exists__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./static/exists */ "./src/static/exists.js");
/* harmony import */ var _static_encodeGetQuery__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./static/encodeGetQuery */ "./src/static/encodeGetQuery.js");
/* harmony import */ var _static_each__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./static/each */ "./src/static/each.js");
/* harmony import */ var _static_domLoaded__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./static/domLoaded */ "./src/static/domLoaded.js");
/* harmony import */ var _static_decodeGetQuery__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./static/decodeGetQuery */ "./src/static/decodeGetQuery.js");
/* harmony import */ var _static_css__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./static/css */ "./src/static/css.js");
/* harmony import */ var _static_createFragment__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./static/createFragment */ "./src/static/createFragment.js");
/* harmony import */ var _static_createElement__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./static/createElement */ "./src/static/createElement.js");
/* harmony import */ var _static_cssInject__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./static/cssInject */ "./src/static/cssInject.js");
/* harmony import */ var _components_Arr__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./components/Arr */ "./src/components/Arr.js");
/* harmony import */ var _components_Cookie__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./components/Cookie */ "./src/components/Cookie.js");
/* harmony import */ var _components_Datetime__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./components/Datetime */ "./src/components/Datetime.js");
/* harmony import */ var _components_Dom__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./components/Dom */ "./src/components/Dom.js");
/* harmony import */ var _components_Str__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./components/Str */ "./src/components/Str.js");
/* harmony import */ var _components_Storage__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./components/Storage */ "./src/components/Storage.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./components/Transform */ "./src/components/Transform.js");





























































































/* harmony default export */ __webpack_exports__["default"] = ({
    // components
    LibArr: _components_Arr__WEBPACK_IMPORTED_MODULE_85__["default"],
    LibChain: _components_Chain__WEBPACK_IMPORTED_MODULE_0__["default"],
    LibComponent: _components_Component__WEBPACK_IMPORTED_MODULE_1__["default"],
    LibCookie: _components_Cookie__WEBPACK_IMPORTED_MODULE_86__["default"],
    LibDatetime: _components_Datetime__WEBPACK_IMPORTED_MODULE_87__["default"],
    LibDom: _components_Dom__WEBPACK_IMPORTED_MODULE_88__["default"],
    LibKeyboardManager: _components_KeyboardManager__WEBPACK_IMPORTED_MODULE_6__["default"],
    LibLoader: _components_Loader__WEBPACK_IMPORTED_MODULE_7__["default"],
    LibRouter: _components_Router__WEBPACK_IMPORTED_MODULE_5__["default"],
    LibRoxy: _components_Roxy__WEBPACK_IMPORTED_MODULE_2__["default"],
    LibRoxyListener: _components_RoxyListener__WEBPACK_IMPORTED_MODULE_3__["default"],
    LibStorage: _components_Storage__WEBPACK_IMPORTED_MODULE_90__["default"],
    LibStr: _components_Str__WEBPACK_IMPORTED_MODULE_89__["default"],
    LibTimer: _components_Timer__WEBPACK_IMPORTED_MODULE_4__["default"],
    LibTransform: _components_Transform__WEBPACK_IMPORTED_MODULE_91__["default"],

    // static
    Lib: {
        abc: _static_abc__WEBPACK_IMPORTED_MODULE_8__["default"],
        clone: _static_clone__WEBPACK_IMPORTED_MODULE_9__["default"],
        convertHEXtoRGB: _static_convertHEXtoRGB__WEBPACK_IMPORTED_MODULE_10__["default"],
        convertRGBtoHEX: _static_convertRGBtoHEX__WEBPACK_IMPORTED_MODULE_11__["default"],
        createElement: _static_createElement__WEBPACK_IMPORTED_MODULE_83__["default"],
        createFragment: _static_createFragment__WEBPACK_IMPORTED_MODULE_82__["default"],
        css: _static_css__WEBPACK_IMPORTED_MODULE_81__["default"],
        cssInject: _static_cssInject__WEBPACK_IMPORTED_MODULE_84__["default"],
        decodeGetQuery: _static_decodeGetQuery__WEBPACK_IMPORTED_MODULE_80__["default"],
        domLoaded: _static_domLoaded__WEBPACK_IMPORTED_MODULE_79__["default"],
        each: _static_each__WEBPACK_IMPORTED_MODULE_78__["default"],
        encodeGetQuery: _static_encodeGetQuery__WEBPACK_IMPORTED_MODULE_77__["default"],
        exists: _static_exists__WEBPACK_IMPORTED_MODULE_76__["default"],
        extend: _static_extend__WEBPACK_IMPORTED_MODULE_75__["default"],
        extendRecursive: _static_extend__WEBPACK_IMPORTED_MODULE_75__["extendRecursive"],
        find: _static_find__WEBPACK_IMPORTED_MODULE_74__["default"],
        findOne: _static_find__WEBPACK_IMPORTED_MODULE_74__["default"].one,
        findMany: _static_find__WEBPACK_IMPORTED_MODULE_74__["default"].one,
        format: _static_format__WEBPACK_IMPORTED_MODULE_73__["default"],
        getDocument: _static_getDocument__WEBPACK_IMPORTED_MODULE_72__["default"],
        getLocation: _static_getLocation__WEBPACK_IMPORTED_MODULE_71__["default"],
        getWindow: _static_getWindow__WEBPACK_IMPORTED_MODULE_70__["default"],
        httpRequest: _static_httpRequest__WEBPACK_IMPORTED_MODULE_69__["default"],
        inject: _static_inject__WEBPACK_IMPORTED_MODULE_68__["default"],
        isBoolean: _static_isBoolean__WEBPACK_IMPORTED_MODULE_67__["default"],
        isDefined: _static_isDefined__WEBPACK_IMPORTED_MODULE_66__["default"],
        isEmpty: _static_isEmpty__WEBPACK_IMPORTED_MODULE_65__["default"],
        isEqualArrays: _static_isEqualArrays__WEBPACK_IMPORTED_MODULE_64__["default"],
        isFunction: _static_isFunction__WEBPACK_IMPORTED_MODULE_63__["default"],
        isHTMLString: _static_isHTMLString__WEBPACK_IMPORTED_MODULE_62__["default"],
        isInteger: _static_isInteger__WEBPACK_IMPORTED_MODULE_61__["default"],
        isLowerCase: _static_isLowerCase__WEBPACK_IMPORTED_MODULE_60__["default"],
        isNode: _static_isNode__WEBPACK_IMPORTED_MODULE_59__["default"],
        isNumber: _static_isNumber__WEBPACK_IMPORTED_MODULE_58__["default"],
        isObject: _static_isObject__WEBPACK_IMPORTED_MODULE_57__["default"],
        isRegExp: _static_isRegExp__WEBPACK_IMPORTED_MODULE_56__["default"],
        isString: _static_isString__WEBPACK_IMPORTED_MODULE_55__["default"],
        isUpperCase: _static_isUpperCase__WEBPACK_IMPORTED_MODULE_54__["default"],
        loadBlobfile: _static_loadBlobfile__WEBPACK_IMPORTED_MODULE_53__["default"],
        loadCSS: _static_loadCSS__WEBPACK_IMPORTED_MODULE_52__["default"],
        loadJS: _static_loadJS__WEBPACK_IMPORTED_MODULE_51__["default"],
        loadJSON: _static_loadJSON__WEBPACK_IMPORTED_MODULE_50__["default"],
        loadJSSync: _static_loadJSSync__WEBPACK_IMPORTED_MODULE_49__["default"],
        max: _static_max__WEBPACK_IMPORTED_MODULE_48__["default"],
        merge: _static_merge__WEBPACK_IMPORTED_MODULE_47__["default"],
        middleNumber: _static_middleNumber__WEBPACK_IMPORTED_MODULE_46__["default"],
        min: _static_min__WEBPACK_IMPORTED_MODULE_45__["default"],
        node2str: _static_node2str__WEBPACK_IMPORTED_MODULE_44__["default"],
        number2string: _static_number2string__WEBPACK_IMPORTED_MODULE_43__["default"],
        on: _static_on__WEBPACK_IMPORTED_MODULE_42__["default"],
        position: _static_position__WEBPACK_IMPORTED_MODULE_41__["default"],
        positionMouse: _static_positionMouse__WEBPACK_IMPORTED_MODULE_40__["default"],
        queryAll: _static_queryAll__WEBPACK_IMPORTED_MODULE_39__["default"],
        query: _static_query__WEBPACK_IMPORTED_MODULE_38__["default"],
        radiansToDegrees: _static_radiansToDegrees__WEBPACK_IMPORTED_MODULE_37__["default"],
        random: _static_random__WEBPACK_IMPORTED_MODULE_36__["random"],
        randomColor: _static_random__WEBPACK_IMPORTED_MODULE_36__["randomColor"],
        randomItem: _static_random__WEBPACK_IMPORTED_MODULE_36__["randomItem"],
        randomNumber: _static_random__WEBPACK_IMPORTED_MODULE_36__["randomNumber"],
        randomString: _static_random__WEBPACK_IMPORTED_MODULE_36__["randomString"],
        range: _static_range__WEBPACK_IMPORTED_MODULE_35__["default"],
        redirect: _static_redirect__WEBPACK_IMPORTED_MODULE_34__["default"],
        search: _static_search__WEBPACK_IMPORTED_MODULE_33__["default"],
        shuffleArray: _static_shuffleArray__WEBPACK_IMPORTED_MODULE_32__["default"],
        toArray: _static_toArray__WEBPACK_IMPORTED_MODULE_31__["default"],
        toCamelCase: _static_toCamelCase__WEBPACK_IMPORTED_MODULE_21__["default"],
        toMinusCase: _static_toMinusCase__WEBPACK_IMPORTED_MODULE_28__["default"],
        toMap: _static_toMap__WEBPACK_IMPORTED_MODULE_19__["default"],
        toObject: _static_toObject__WEBPACK_IMPORTED_MODULE_16__["default"],
        toXML: _static_toXML__WEBPACK_IMPORTED_MODULE_17__["default"],
        toSnakeCase: _static_toSnakeCase__WEBPACK_IMPORTED_MODULE_15__["default"],
        trim: _static_trim__WEBPACK_IMPORTED_MODULE_29__["default"],
        trimSymbols: _static_trimSymbols__WEBPACK_IMPORTED_MODULE_25__["default"],
        typeOf: _static_typeOf__WEBPACK_IMPORTED_MODULE_22__["default"],
        typeOfStrict: _static_typeOfStrict__WEBPACK_IMPORTED_MODULE_23__["default"],
        sum: _static_sum__WEBPACK_IMPORTED_MODULE_30__["default"],
        str2fragment: _static_str2fragment__WEBPACK_IMPORTED_MODULE_27__["default"],
        str2node: _static_str2node__WEBPACK_IMPORTED_MODULE_20__["default"],
        stylizer: _static_stylizer__WEBPACK_IMPORTED_MODULE_24__["default"],
        uniqArray: _static_uniqArray__WEBPACK_IMPORTED_MODULE_26__["default"],
        sprintf: _static_sprintf__WEBPACK_IMPORTED_MODULE_18__["default"],
        uri: _static_uri__WEBPACK_IMPORTED_MODULE_14__["default"],
        values: _static_values__WEBPACK_IMPORTED_MODULE_13__["default"],
        wait: _static_wait__WEBPACK_IMPORTED_MODULE_12__["default"],
    },
});






























/***/ }),

/***/ "./src/static/abc.js":
/*!***************************!*\
  !*** ./src/static/abc.js ***!
  \***************************/
/*! exports provided: LETTER_CONSONANT, LETTER_VOWEL, ABC, NUMBERS, AMPERSAND, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LETTER_CONSONANT", function() { return LETTER_CONSONANT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LETTER_VOWEL", function() { return LETTER_VOWEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ABC", function() { return ABC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NUMBERS", function() { return NUMBERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AMPERSAND", function() { return AMPERSAND; });

const LETTER_CONSONANT = 'B,C,D,F,G,H,J,K,L,M,N,P,Q,R,S,T,V,W,X,Y,Z';
const LETTER_VOWEL = 'A,E,I,O,U,Y';
const ABC = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
const NUMBERS = '0,1,2,3,4,5,6,7,8,9';
const AMPERSAND = '&';

/* harmony default export */ __webpack_exports__["default"] = ({
    LETTER_CONSONANT,
    LETTER_VOWEL,
    ABC,
    NUMBERS,
    AMPERSAND,
});


/***/ }),

/***/ "./src/static/attr.js":
/*!****************************!*\
  !*** ./src/static/attr.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ "./src/static/query.js");
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");





const attr = function (element, name, value) {
    const type_element = Object(_typeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
    if (type_element === 'string') {
        element = Object(_query__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
    }

    if (Object(_isNode__WEBPACK_IMPORTED_MODULE_2__["default"])(element) && arguments.length === 2) {
        if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(name, 'object')) {
            for (let key in name)
                attr(element, key, name[key]);
        } else
            return element.getAttribute(name);
    }
    else if (Object(_isNode__WEBPACK_IMPORTED_MODULE_2__["default"])(element) && arguments.length === 3) {
        if (value === false) element.removeAttribute(name);
        else element.setAttribute(name, value);
    }
};

/* harmony default export */ __webpack_exports__["default"] = (attr);


/***/ }),

/***/ "./src/static/clone.js":
/*!*****************************!*\
  !*** ./src/static/clone.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 *
 * @param from
 * @param to
 * @returns {*}
 */
function clone(from, to)
{
    if (from === null || typeof from !== "object") return from;
    if (from.constructor !== Object && from.constructor !== Array) return from;
    if (from.constructor === Date || from.constructor === RegExp || from.constructor === Function ||
        from.constructor === String || from.constructor === Number || from.constructor === Boolean) {
        return new from.constructor(from);
    }

    to = to || new from.constructor();

    for (name in from)
    {
        to[name] = typeof to[name] == "undefined" ? clone(from[name], null) : to[name];
    }

    return to;
}

/* harmony default export */ __webpack_exports__["default"] = (clone);


/***/ }),

/***/ "./src/static/convertHEXtoRGB.js":
/*!***************************************!*\
  !*** ./src/static/convertHEXtoRGB.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/**
 * convertHEXtoRGB
 * @param hex
 * @returns {*}
 */
const convertHEXtoRGB = function (hex) {
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) { return r + r + g + g + b + b });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)} : null;
};

/* harmony default export */ __webpack_exports__["default"] = (convertHEXtoRGB);


/***/ }),

/***/ "./src/static/convertRGBtoHEX.js":
/*!***************************************!*\
  !*** ./src/static/convertRGBtoHEX.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const convertRGBtoHEX = function (r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};


/* harmony default export */ __webpack_exports__["default"] = (convertRGBtoHEX);


/***/ }),

/***/ "./src/static/copy.js":
/*!****************************!*\
  !*** ./src/static/copy.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");




const copy = function (src, instance)
{
    if (Object(_isNode__WEBPACK_IMPORTED_MODULE_1__["default"])(src))
        return src.cloneNode(true);

    if (Array.isArray(src))
        return src.slice();

    if (typeof src === 'function')
        return src.bind(instance || {});

    if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(src, 'object')) {
        let result = {};
        Object.keys(src).forEach((key) => {
            let value = src[key];
            result[key] = copy(value, typeof value === "function" ? src : {});
        });
        return result;
    }

    return src;
};

/* harmony default export */ __webpack_exports__["default"] = (copy);


/***/ }),

/***/ "./src/static/createElement.js":
/*!*************************************!*\
  !*** ./src/static/createElement.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");



/**
 *
 * @param tag
 * @param attrs
 * @param inner
 * @param styles
 * @return {HTMLElement|Node}
 */
const createElement = function (tag, attrs, inner, styles) {
    const
        element = document.createElement(tag),
        is_attr = function (src) {
            return Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(src, 'object') && !Object(_isNode__WEBPACK_IMPORTED_MODULE_1__["default"])(src)
        },
        insert_html = function (src) {
            element.insertAdjacentHTML('beforeend', src);
        },
        insert_child = function (src) {
            element.appendChild(src);
        },
        insert = function (src) {
            const type = Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(src);
            if (type === 'string')
                insert_html(src);
            else if (type === 'object' && Object(_isNode__WEBPACK_IMPORTED_MODULE_1__["default"])(src))
                insert_child(src);
            else if (type === 'array')
                for (let i = 0; i < src.length; i++) insert(src[i]);
        };

    if (arguments.length === 2 && !is_attr(attrs)) {
        inner = attrs;
        attrs = false;
    }

    if (attrs)
        Object.keys(attrs).forEach((key) => {element.setAttribute(key, attrs[key])});

    if (styles)
        Object.keys(styles).forEach((key) => {element.style[key] = styles[key]});

    if (inner)
        insert(inner);

    return element;
};

/* harmony default export */ __webpack_exports__["default"] = (createElement);


/***/ }),

/***/ "./src/static/createFragment.js":
/*!**************************************!*\
  !*** ./src/static/createFragment.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _str2node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./str2node */ "./src/static/str2node.js");





const createFragment = function (append) {
    const fragment = document.createDocumentFragment();

    if (Object(_isNode__WEBPACK_IMPORTED_MODULE_0__["default"])(append))
        fragment.appendChild(append);

    if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(append, 'string'))
        fragment.appendChild(Object(_str2node__WEBPACK_IMPORTED_MODULE_2__["default"])(append));

    return fragment
};

/* harmony default export */ __webpack_exports__["default"] = (createFragment);


/***/ }),

/***/ "./src/static/css.js":
/*!***************************!*\
  !*** ./src/static/css.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");
/* harmony import */ var _queryAll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queryAll */ "./src/static/queryAll.js");




/**
 *
 * css( '.header', {color: 'red', 'font-size': '120%'} )
 * // or
 * css( '.header', 'color', 'red' )
 *
 * @param selector
 * @param properties
 * @returns {null|undefined}
 */
const css = function (selector, properties) {
    if (!selector || !properties) return;
    if (arguments.length === 3) {
        const prop = {};
        prop[properties] = arguments[2];
        return css(selector, prop);
    }

    let i, k, elements = null,
        typeSelector = Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(selector),
        typeProperties = Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(properties),
        parse = function (str) {
            let i, p1 = str.split(';'), p2, pn, ix, o = {};
            for (i = 0; i < p1.length; i++) {
                p2 = p1[i].split(':');
                pn = p2[0].trim();
                ix = pn.indexOf('-');
                if (ix !== -1)
                    pn = pn.substring(0, ix) + pn[ix + 1].toUpperCase() + pn.substring(ix + 2);
                if (p2.length === 2)
                    o[pn] = p2[1].trim()
            }
            return o;
        };


    switch (typeSelector) {
        case 'string':
            elements = Object(_queryAll__WEBPACK_IMPORTED_MODULE_2__["default"])(selector);
            break;

        case 'object':
            if (Object(_isNode__WEBPACK_IMPORTED_MODULE_1__["default"])(selector))
                elements = [selector];
            break;

        case 'array':
            elements = selector;
            break;
    }

    if (elements) {

        if (typeProperties === 'string')
            properties = parse(properties);

        for (i in elements)
            for (k in properties)
                elements[i].style[k] = properties[k];
    }

    return elements
};

/* harmony default export */ __webpack_exports__["default"] = (css);


/***/ }),

/***/ "./src/static/cssInject.js":
/*!*********************************!*\
  !*** ./src/static/cssInject.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ "./src/static/createElement.js");
/* harmony import */ var _hasLowerCase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hasLowerCase */ "./src/static/hasLowerCase.js");
/* harmony import */ var _toMinusCase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toMinusCase */ "./src/static/toMinusCase.js");





/**
 * cssInject({ '#canvas': { backgroundColor: '#171717',border: '3px solid #DDDDDD' } });
 *
 * @param object
 * @returns {*}
 */
const cssInject = function (object) {
    let cssString = '';
    Object.keys(object).forEach((selector)=>{
        cssString += `${selector} {\n`;
        Object.keys(object[selector]).forEach((prop)=>{
            const name = Object(_hasLowerCase__WEBPACK_IMPORTED_MODULE_1__["default"])(prop) ? Object(_toMinusCase__WEBPACK_IMPORTED_MODULE_2__["default"])(prop) : prop;
            const value = object[selector][prop];
            cssString += `\t${name}: ${value};\n`;
        });
        cssString += `}\n`;

    });
    const css = Object(_createElement__WEBPACK_IMPORTED_MODULE_0__["default"])('style', {}, cssString);
    if (document && document.head) {
        document.head.appendChild(css);
    }

    return css;
};

/* harmony default export */ __webpack_exports__["default"] = (cssInject);


/***/ }),

/***/ "./src/static/decodeGetQuery.js":
/*!**************************************!*\
  !*** ./src/static/decodeGetQuery.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const decodeGetQuery = function (query) {
    const result = {};
    const pairs = (query[0] === '?' ? query.substr(1) : query).split('&');
    pairs.forEach((item, i) => {
        let pair = pairs[i].split('=');
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    });
    return result;
};

/* harmony default export */ __webpack_exports__["default"] = (decodeGetQuery);


/***/ }),

/***/ "./src/static/defined.js":
/*!*******************************!*\
  !*** ./src/static/defined.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const defined = function (value) {
    return value !== undefined;
};

/* harmony default export */ __webpack_exports__["default"] = (defined);


/***/ }),

/***/ "./src/static/domLoaded.js":
/*!*********************************!*\
  !*** ./src/static/domLoaded.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getDocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocument */ "./src/static/getDocument.js");



const domLoaded = function (callback) {
    const doc = Object(_getDocument__WEBPACK_IMPORTED_MODULE_0__["default"])();
    if (doc.querySelector('body'))
        callback.call();
    else
        doc.addEventListener('DOMContentLoaded', function () {
            callback.call()
        }, false);
};

/* harmony default export */ __webpack_exports__["default"] = (domLoaded);


/***/ }),

/***/ "./src/static/each.js":
/*!****************************!*\
  !*** ./src/static/each.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query */ "./src/static/query.js");
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");




/**
 *
 * each( array, (i, v, array) => {}, instance )
 *
 * @param list
 * @param callback
 * @param instance
 */
const each = function (list, callback, instance) {
    let type = Object(_typeOf__WEBPACK_IMPORTED_MODULE_2__["default"])(list);

    switch (type) {
        case 'array':
            list.forEach((i, v, a) => callback.call(instance, i, v, a));
            break;
        case 'object':
            if (Object(_isNode__WEBPACK_IMPORTED_MODULE_0__["default"])(list)) {
                if (list instanceof NodeList)
                    each(Array.from(list), callback, instance)
                else
                    each([list], callback, instance)
            } else
                Object.keys(list).forEach((key) => callback.call(instance, list[key], key, list));
            break;
        case 'string':
            each(list.split(""), callback, instance);
            break;
    }
};

each.parent = function (selector, filter, loops = 10) {
    const getParent = (elem) => elem && elem.parentNode ? elem.parentNode : false;
    let element = Object(_isNode__WEBPACK_IMPORTED_MODULE_0__["default"])(selector) ? selector : Object(_query__WEBPACK_IMPORTED_MODULE_1__["default"])(selector);
    while (loops > 0 && element) {
        loops--;
        if (element.parentNode && element.parentNode.querySelector(filter)) {
            return element
        }
        element = getParent(element);
    }
};

each.filter = function (selector, filter, callback, loops = 10) {
    const getParent = (elem) => elem && elem.parentNode ? elem.parentNode : false;
    let element = Object(_isNode__WEBPACK_IMPORTED_MODULE_0__["default"])(selector) ? selector : Object(_query__WEBPACK_IMPORTED_MODULE_1__["default"])(selector);
    while (loops > 0 && element) {
        loops--;
        if (element.parentNode && element.parentNode.querySelector(filter)) {
            callback(element);
            return element
        }
        element = getParent(element);
    }
    return element;
};

/* harmony default export */ __webpack_exports__["default"] = (each);


/***/ }),

/***/ "./src/static/encodeGetQuery.js":
/*!**************************************!*\
  !*** ./src/static/encodeGetQuery.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const encodeGetQuery = function (params) {
    let result = '';
    Object.keys(params).forEach((key) => {
        result += ((result.length) ? '&' : '?') + key + '=' + encodeURIComponent(params[key]);
    });

    return result;
};

/* harmony default export */ __webpack_exports__["default"] = (encodeGetQuery);


/***/ }),

/***/ "./src/static/exists.js":
/*!******************************!*\
  !*** ./src/static/exists.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const exists = function (src) {
    return src !== undefined && src !== null;
};

/* harmony default export */ __webpack_exports__["default"] = (exists);


/***/ }),

/***/ "./src/static/extend.js":
/*!******************************!*\
  !*** ./src/static/extend.js ***!
  \******************************/
/*! exports provided: extend, extendRecursive, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendRecursive", function() { return extendRecursive; });


const extend = function (destination, source) {
    for (let param in source)
        if (source.hasOwnProperty(param))
            destination[param] = source[param];

    function __() {
        this.constructor = destination;
    }

    __.prototype = source.prototype;
    destination.prototype = new __();
};

const extendRecursive = function (destination, source) {
    let property;
    for (property in source) {
        if (source[property] && source[property].constructor && source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            extendRecursive(destination[property], source[property]);
        } else
            destination[property] = source[property];
    }
    return destination;
};

/* harmony default export */ __webpack_exports__["default"] = (extend);


/***/ }),

/***/ "./src/static/find.js":
/*!****************************!*\
  !*** ./src/static/find.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 *
 * @param {object|array} list
 * @param {string|number} attr
 * @param {*} attrValue
 * @returns {*[]}
 */
const finds = function (list, attr, attrValue) {
    let i, tmp = [];
    if (list && typeof list === "object")
        list = Object.values(list);

    if (Array.isArray(list))
        for (i = 0; i < list.length; i++)
            if (list[i] && list[i][attr] !== undefined && list[i][attr] === attrValue)
                tmp.push(list[i]);

    return tmp ;
};

finds.many = function (values, attr, attrValue) {
    let tmp = finds(values, attr, attrValue);
    return tmp.length ? tmp : false;
};


finds.one = function (values, attr, attrValue) {
    let tmp = finds(values, attr, attrValue);
    return tmp.length ? tmp[0] : false;
};

/* harmony default export */ __webpack_exports__["default"] = (finds);


/***/ }),

/***/ "./src/static/format.js":
/*!******************************!*\
  !*** ./src/static/format.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");
/* harmony import */ var _defined__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defined */ "./src/static/defined.js");
/* harmony import */ var _node2str__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node2str */ "./src/static/node2str.js");






/**
 * Formatting of string, or maybe template builder
 *
 * Examples:
 * .format("Hello {0}, your code is {1}!", ['Jade', 'Prefect']);
 *
 * .format("Hello {name}, your code is {mean}!", {name:'Jade', mean: 'Prefect'});
 *
 * @param string    String
 * @param list  Array|Object
 * @returns string
 */
const format = function (string, list) {
    let reg;
    if (Array.isArray(list))
        reg = new RegExp(/{(\d+)}/g);
    else if (list && typeof list === 'object')
        reg = new RegExp(/{(\w+)}/g);

    return string.replace(reg, function (match, number) {
        if (Object(_defined__WEBPACK_IMPORTED_MODULE_1__["default"])(list[number]) && Object(_isNode__WEBPACK_IMPORTED_MODULE_0__["default"])(list[number]))
            list[number] = Object(_node2str__WEBPACK_IMPORTED_MODULE_2__["default"])(list[number]);

        return typeof list[number] !== undefined ? list[number] : match;
    });
};

/* harmony default export */ __webpack_exports__["default"] = (format);


/***/ }),

/***/ "./src/static/getDocument.js":
/*!***********************************!*\
  !*** ./src/static/getDocument.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const getDocument = function () {
    if (document)
        return document;
    else
        throw new Error('document object not exist!');
};

/* harmony default export */ __webpack_exports__["default"] = (getDocument);


/***/ }),

/***/ "./src/static/getLocation.js":
/*!***********************************!*\
  !*** ./src/static/getLocation.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const getLocation = function () {
    if (location)
        return location;
    else
        throw new Error('location object not exist!');
};

/* harmony default export */ __webpack_exports__["default"] = (getLocation);


/***/ }),

/***/ "./src/static/getWindow.js":
/*!*********************************!*\
  !*** ./src/static/getWindow.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const getWindow = function () {

    if (typeof window !== 'undefined') {
        return window;
    } else {
        // return global ? global : {};
        throw new Error('window object not exist!');
    }
};

/* harmony default export */ __webpack_exports__["default"] = (getWindow);


/***/ }),

/***/ "./src/static/hasLowerCase.js":
/*!************************************!*\
  !*** ./src/static/hasLowerCase.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const hasLowerCase = function (character) {
    const lowers = character.split('').filter((char)=>{
        let code = char.charCodeAt(0);
        return code >= 65 && code <= 90;
    });

    return lowers.length > 0;
};

/* harmony default export */ __webpack_exports__["default"] = (hasLowerCase);


/***/ }),

/***/ "./src/static/httpRequest.js":
/*!***********************************!*\
  !*** ./src/static/httpRequest.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");


/**
 * Base HTTP Request
 *
 * httpRequest( { url: '/index' }, function(status, data){}, thisInstance );
 *
 * httpRequest( { url: '/index', method: 'POST', data: DATA }, function(status, data){}, thisInstance );
 *
 * httpRequest(
 *  {
 *      method: 'POST',
 *      data: {},
 *      headers: {},
 *      action: '/index'
 *  },
 *  function(status, data){
 *      log(status);
 *  },
 *  thisInstance);
 *
 * @param config
 *      data:           data to send. Object, FormData (POST only), HTMLFormElement (POST only)
 *      action, url:    url address to
 *      method:         request method GET POST or custom methods, default 'GET'
 *      headers:        headers Object, key = value
 *      useEncode:      used url encoding, default TRUE. Boolean
 *      useFormData:    used FormData, default FALSE. Boolean
 *      async:          default TRUE. Boolean
 *      user:
 *      password:
 *
 * @param callback
 *      executing event - onloadend. function (status, responseText)
 *
 * @param thisInstance
 *      object 'this' for callback
 *
 * @returns {XMLHttpRequest}
 */
const httpRequest = function (config, callback, thisInstance) {
    let key;
    let sendData = {};
    const xhr = new XMLHttpRequest();
    const options = {
        data: config.data || {},
        action: config.action || config.url || document.location.href,
        method: config.method ? config.method.toUpperCase() : 'GET',
        headers: config.headers || {},
        useEncode: config.useEncode === undefined ? true : !!config.useEncode,
        useFormData: config.useFormData === undefined ? false : !!config.useFormData,
        async: config.async === undefined ? true : !!config.async,
        user: config.user || null,
        password: config.user || null,
    };

    const concateString = function (params) {
        let result = '';
        for (key in params) {
            result += '&' + key + '=' + (options.useEncode ? encodeURIComponent(params[key]) : params[key]);
        }
        return result;
    };

    thisInstance = (Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(thisInstance, 'object')) ? thisInstance : {};

    // data prepare
    if (options.method === 'GET') {

        // form to FormData
        options.action += options.action.indexOf('?') === -1 ? '?' : '';
        options.action += concateString(options.data);
        sendData = {};

    } else {

        // reset to useFormData in true
        if (options.data instanceof FormData) {
            options.data = {};
            options.useFormData = true;
            sendData = options.data;
        }

        // form to FormData
        if (options.data instanceof HTMLFormElement) {
            sendData = new FormData(options.data);
            options.useFormData = true;
            options.data = {};
        }

        if (options.useFormData) {
            if (!(sendData instanceof FormData)) sendData = new FormData();

            Object.keys(options.data).forEach((key) => {
                sendData.append(key, options.useEncode ? encodeURIComponent(options.data[key]) : options.data[key]);
            });

        } else {
            sendData = concateString(options.data);
        }

    }

    // build request
    xhr.open(options.method, options.action, options.async, options.user, options.password);

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (options.method !== 'GET' && !options.useFormData) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    for (key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
    }

    xhr.onloadend = function () {
        thisInstance.XMLHttpRequest = xhr;
        if (typeof callback === 'function') {
            callback.call(thisInstance, xhr.status, xhr.responseText, xhr);
        }
    };

    xhr.sendOptions = options;
    xhr.send(sendData);
    return xhr;
};

/* harmony default export */ __webpack_exports__["default"] = (httpRequest);


/***/ }),

/***/ "./src/static/inject.js":
/*!******************************!*\
  !*** ./src/static/inject.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query */ "./src/static/query.js");




/**
 * Ex:
 * inject ( '.content', "lorem text"  )
 * inject ( '.content', ["text","text","text"]  )
 * inject ( '.content', Node  )
 * inject ( '.content', [Node,Node,Node]  )
 *
 *
 * @param selector
 * @param data
 * @param {boolean} append
 * @param from
 * @returns {null|Node|boolean}
 */
const inject = function (selector, data, append, from)
{
    if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(selector, 'array')) {
        selector.forEach((elem) => {
            inject(elem, data, append, from);
        });
        return null;
    }

    if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(selector, 'string'))
        selector = Object(_query__WEBPACK_IMPORTED_MODULE_2__["default"])(selector, from);

    if (!append)
        selector.textContent = '';

    if (Object(_isNode__WEBPACK_IMPORTED_MODULE_0__["default"])(selector)) {
        if (Object(_isNode__WEBPACK_IMPORTED_MODULE_0__["default"])(data)) {
            selector.appendChild(data);
        } else if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(data, 'array')) {
            let i;
            for (i = 0; i < data.length; i++)
                inject(selector, data[i], true, from);
        } else {
            selector.innerHTML = (!append) ? data : selector.innerHTML + data;
        }
        return selector;
    }
    return null;
};

/* harmony default export */ __webpack_exports__["default"] = (inject);


/***/ }),

/***/ "./src/static/isBoolean.js":
/*!*********************************!*\
  !*** ./src/static/isBoolean.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const isNumber = function (value) {
    return typeof value === 'boolean';
}

/* harmony default export */ __webpack_exports__["default"] = (isNumber);


/***/ }),

/***/ "./src/static/isDefined.js":
/*!*********************************!*\
  !*** ./src/static/isDefined.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const isDefined = function (src) {
    return src !== undefined;
};

/* harmony default export */ __webpack_exports__["default"] = (isDefined);


/***/ }),

/***/ "./src/static/isEmpty.js":
/*!*******************************!*\
  !*** ./src/static/isEmpty.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");



const isEmpty = function (src) {
    if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(src, 'object') || Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(src, 'array')) {
        for (let key in src)
            if (src.hasOwnProperty(key))
                return false;
        return true;
    } else if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(src, 'string')) {
        src = src.replace(/\s/g, '');
        return src === "" || src === "0";
    } else {
        return (src === 0 || src === null || src === undefined || src === false || isNaN(src));
    }
};

/* harmony default export */ __webpack_exports__["default"] = (isEmpty);


/***/ }),

/***/ "./src/static/isEqualArrays.js":
/*!*************************************!*\
  !*** ./src/static/isEqualArrays.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const isEqualArrays = function (arr1, arr2) {
    if (arr1 === arr2)
        return true;

    else if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length)
        return false;

    for (let i = 0; i < arr1.length; ++i)
        if (arr1[i] !== arr2[i])
            return false;

    return true;
};

/* harmony default export */ __webpack_exports__["default"] = (isEqualArrays);


/***/ }),

/***/ "./src/static/isFunction.js":
/*!**********************************!*\
  !*** ./src/static/isFunction.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const isNumber = function (value) {
    return typeof value === 'function';
}

/* harmony default export */ __webpack_exports__["default"] = (isNumber);


/***/ }),

/***/ "./src/static/isHTMLString.js":
/*!************************************!*\
  !*** ./src/static/isHTMLString.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import DOMParser from 'DOMParser';

const isHTMLString = function (value, truest = false) {

    if (truest) {
        const div = document.createElement('div');
        div.innerHTML = value;
        return !!div.childElementCount;
    }

    return value.trim().substring(0, 1) === '<';
};

/* harmony default export */ __webpack_exports__["default"] = (isHTMLString);


/***/ }),

/***/ "./src/static/isInteger.js":
/*!*********************************!*\
  !*** ./src/static/isInteger.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const isInteger = function (val) {
return typeof val === 'number' && isFinite(val) && Math.floor(val) === val;
}

/* harmony default export */ __webpack_exports__["default"] = (isInteger);


/***/ }),

/***/ "./src/static/isLowerCase.js":
/*!***********************************!*\
  !*** ./src/static/isLowerCase.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const isLowerCase = function (character) {
    return character === character.toLowerCase() /*&& character !== character.toUpperCase()*/;
};

const isLowerCase2 = function (character) {
    let code = character.charCodeAt(0);
    return code >= 97 && code <= 122;
};

/* harmony default export */ __webpack_exports__["default"] = (isLowerCase);

/***/ }),

/***/ "./src/static/isNode.js":
/*!******************************!*\
  !*** ./src/static/isNode.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const isNode = function (value) {
    return value && (value.nodeType === Node.TEXT_NODE ||
        value.nodeType === Node.ELEMENT_NODE ||
        value.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
        value.nodeType === Node.DOCUMENT_NODE)
};

/* harmony default export */ __webpack_exports__["default"] = (isNode);


/***/ }),

/***/ "./src/static/isNumber.js":
/*!********************************!*\
  !*** ./src/static/isNumber.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const isNumber = function (value) {
    try {
        value = parseInt(value);
        return (typeof value === 'number' || value instanceof Number) && !isNaN(value);
    } catch (err) {
        return false;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (isNumber);


/***/ }),

/***/ "./src/static/isObject.js":
/*!********************************!*\
  !*** ./src/static/isObject.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isEmpty */ "./src/static/isEmpty.js");


const isObject = function (value) {
    return typeof value === 'object' &&
        !Object(_isEmpty__WEBPACK_IMPORTED_MODULE_0__["default"])(value) &&
        !Array.isArray(value) &&
        !(value instanceof RegExp) &&
        !(value instanceof String) &&
        !(value instanceof Number);
}

/* harmony default export */ __webpack_exports__["default"] = (isObject);


/***/ }),

/***/ "./src/static/isRegExp.js":
/*!********************************!*\
  !*** ./src/static/isRegExp.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const isRegExp = function (val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
}

/* harmony default export */ __webpack_exports__["default"] = (isRegExp);


/***/ }),

/***/ "./src/static/isString.js":
/*!********************************!*\
  !*** ./src/static/isString.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const isString = function (value) {
    return typeof value === 'string' || value instanceof String;
};

/* harmony default export */ __webpack_exports__["default"] = (isString);


/***/ }),

/***/ "./src/static/isUpperCase.js":
/*!***********************************!*\
  !*** ./src/static/isUpperCase.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const isUpperCase = function (character) {
    return character === character.toUpperCase() /*&& character !== character.toLowerCase()*/;
};

const isUpperCase2 = function (character) {
    let code = character.charCodeAt(0);
    return code >= 65 && code <= 90;
};

/* harmony default export */ __webpack_exports__["default"] = (isUpperCase);

/***/ }),

/***/ "./src/static/loadBlobfile.js":
/*!************************************!*\
  !*** ./src/static/loadBlobfile.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const loadBlobfile = function (src, onload, onerror) {
    fetch(src)
        .then(response => response.blob())
        .then(blob => onload(blob))
        .catch(error => typeof onerror === 'function' ? onerror(error) : null);
};

/* harmony default export */ __webpack_exports__["default"] = (loadBlobfile);

/***/ }),

/***/ "./src/static/loadCSS.js":
/*!*******************************!*\
  !*** ./src/static/loadCSS.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _getDocument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocument */ "./src/static/getDocument.js");



const loadCSS = function (src, onload, onerror) {
    if (!src) return null;
    if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(src, 'array')) {
        for (let i = 0; i < src.length; i++) {
            loadCSS(src[i], onload, onerror);
        }
    } else {
        const doc = Object(_getDocument__WEBPACK_IMPORTED_MODULE_1__["default"])();
        const link = doc.createElement('link');
        const id = "src-" + Math.random().toString(32).slice(2);

        link.href = (src.substr(-4) === '.css') ? src : src + '.css';
        link.rel = 'stylesheet';
        link.id = id;
        link.onload = onload;
        link.onerror = onerror;

        doc.head.appendChild(link);
        return link
    }
};

/* harmony default export */ __webpack_exports__["default"] = (loadCSS);


/***/ }),

/***/ "./src/static/loadJS.js":
/*!******************************!*\
  !*** ./src/static/loadJS.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _getDocument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocument */ "./src/static/getDocument.js");



const documentElement = Object(_getDocument__WEBPACK_IMPORTED_MODULE_1__["default"])();
const loadJS = function (src, onload, onerror) {
    if (!src) return null;
    if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(src, 'array')) {
        for (let i = 0; i < src.length; i++) {
            loadJS(src[i], onload, onerror);
        }
    } else {
        const script = documentElement.createElement('script');
        const id = 'resource-' + Math.random().toString(32).slice(2);

        script.src = (src.substr(-3) === '.js') ? src : src + '.js';
        script.type = 'application/javascript';
        script.id = id;
        script.onload = onload;
        script.onerror = onerror;

        documentElement.head.appendChild(script);
        return script
    }
};

/* harmony default export */ __webpack_exports__["default"] = (loadJS);

/***/ }),

/***/ "./src/static/loadJSON.js":
/*!********************************!*\
  !*** ./src/static/loadJSON.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const loadJSON = function (src, onload, onerror) {
    fetch(src)
        .then(response => response.json())
        .then(json => onload(json))
        .catch(error => typeof onerror === 'function' ? onerror(error) : null);
};

/* harmony default export */ __webpack_exports__["default"] = (loadJSON);

/***/ }),

/***/ "./src/static/loadJSSync.js":
/*!**********************************!*\
  !*** ./src/static/loadJSSync.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createElement */ "./src/static/createElement.js");




/**
 * Loads a script element with javascript source
 *
 * .loadJSSync ( {
 *      myscript1: '/path/to/myscript1',
 *      myscript2: '/path/to/myscript2',
 *    },
 *    function (list) {})
 *
 * .loadJSSync ( [
 *      '/path/to/myscript1',
 *      '/path/to/myscript2',
 *    ],
 *    function (list) {})
 *
 * @namespace NamespaceApplication.loadJSSync
 * @param srcs       Object, Array. items: key is ID, value is src
 * @param callback  Function called when all srcs is loaded
 * @param onerror   Function called when load is failed
 * @returns {*}
 */
const loadJSSync = function (srcs, callback, onerror) {
    if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(srcs, 'object') || Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(srcs, 'array')) {
        if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_0__["default"])(srcs, 'array')) {
            const obj = {};
            srcs.forEach( (item, i) => {
                obj['resource-' + Math.random().toString(32).slice(2)] = item
            });
            srcs = obj;
        }
        let iterator = 0;
        const scripts = {};
        Object.keys(srcs).forEach((key) => {
            const src = srcs[key];
            const script = Object(_createElement__WEBPACK_IMPORTED_MODULE_1__["default"])('script', {
                src: (src.substr(-3) === '.js') ? src : src + '.js',
                type: 'application/javascript',
                id: key,
            });
            script.onerror = onerror;
            script.onload = function (e) {
                scripts[this.id] = this;
                iterator ++;
                if (iterator === length) {
                    callback.call({}, scripts);
                }
            };
            document.head.appendChild(script);
        })
    }
};

/* harmony default export */ __webpack_exports__["default"] = (loadJSSync);


/***/ }),

/***/ "./src/static/max.js":
/*!***************************!*\
  !*** ./src/static/max.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const max = function (arr) {
    return Math.max.apply({}, arr);
}

/* harmony default export */ __webpack_exports__["default"] = (max);

/***/ }),

/***/ "./src/static/merge.js":
/*!*****************************!*\
  !*** ./src/static/merge.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/**
 *
 * @param object1 base
 * @param object2
 * @returns {*}
 */
const merge = (object1, object2) => {
    for (let key in object2) {
        try {
            if ( object2[key].constructor === Object ) {
                object1[key] = merge(object1[key], object2[key]);
            } else {
                object1[key] = object2[key];
            }
        } catch(e) {
            object1[key] = object2[key];

        }
    }
    return object1;
};

/* harmony default export */ __webpack_exports__["default"] = (merge);


/***/ }),

/***/ "./src/static/middleNumber.js":
/*!************************************!*\
  !*** ./src/static/middleNumber.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const middleNumber = function (numbers) {
    const min = Math.min(...numbers)
    return (Math.max(...numbers) - min) / 2 + min;
}

/* harmony default export */ __webpack_exports__["default"] = (middleNumber);


/***/ }),

/***/ "./src/static/min.js":
/*!***************************!*\
  !*** ./src/static/min.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const min = function (arr) {
    return Math.min.apply({}, arr);
}

/* harmony default export */ __webpack_exports__["default"] = (min);

/***/ }),

/***/ "./src/static/node2str.js":
/*!********************************!*\
  !*** ./src/static/node2str.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const node2str =  function (element) {
    const container = document.createElement("div");
    container.appendChild(element.cloneNode(true));
    return container.innerHTML;
};

/* harmony default export */ __webpack_exports__["default"] = (node2str);


/***/ }),

/***/ "./src/static/number2string.js":
/*!*************************************!*\
  !*** ./src/static/number2string.js ***!
  \*************************************/
/*! exports provided: number2string, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "number2string", function() { return number2string; });

const number2string = function (x) {
    let e;
    if (Math.abs(x) < 1.0) {
        e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10,e-1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    } else {
        e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10,e);
            x += (new Array(e+1)).join('0');
        }
    }
    return x;
};

/* harmony default export */ __webpack_exports__["default"] = (number2string);


/***/ }),

/***/ "./src/static/on.js":
/*!**************************!*\
  !*** ./src/static/on.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _queryAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queryAll */ "./src/static/queryAll.js");
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");




/**
 *
 * @param {*|string|Element} selector
 * @param {string} eventName
 * @param {function} callback
 * @param {boolean} bubble
 */
const on = function (selector, eventName, callback, bubble) {
    let i, elements = [];

    switch (Object(_typeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(selector)) {
        case 'string':
            elements = Object(_queryAll__WEBPACK_IMPORTED_MODULE_0__["default"])(selector);
            break;
        case 'object':
            if (Object(_isNode__WEBPACK_IMPORTED_MODULE_2__["default"])(selector))
                elements = [selector];
            break;
        case 'array':
            elements = selector;
            break;
    }

    for (i = 0; i < elements.length; i++) {
        if (elements[i] && elements[i].addEventListener)
            elements[i].addEventListener(eventName, callback, !!bubble);
    }
};

/* harmony default export */ __webpack_exports__["default"] = (on);


/***/ }),

/***/ "./src/static/position.js":
/*!********************************!*\
  !*** ./src/static/position.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import isNode from "./isNode";


const position = function (elem) {
    const data = {x: 0, y: 0, width: 0, height: 0};
    if (typeof elem === 'string')
        elem = document.querySelector(elem);

    if (elem === window || elem === document) {
        data.width = window.innerWidth;
        data.height = window.innerHeight;
        data.element = window;
    }
    else
    if (elem && elem.nodeType === Node.ELEMENT_NODE) {
        if (elem.getBoundingClientRect) {
            const rect = elem.getBoundingClientRect();
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
                clientTop = document.documentElement.clientTop || document.body.clientTop || 0,
                clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;

            data.y = Math.round(rect.top + scrollTop - clientTop);
            data.x = Math.round(rect.left + scrollLeft - clientLeft);
            data.width = elem.offsetWidth;
            data.height = elem.offsetHeight;

            data.top = rect.top + pageYOffset;
            data.left = rect.left + pageXOffset;
            data.right = rect.right + pageXOffset;
            data.bottom = rect.bottom + pageXOffset;
        }
        else {
            let top = 0, left = 0;
            while (elem) {
                top += parseInt(elem.offsetTop, 10);
                left += parseInt(elem.offsetLeft, 10);
                elem = elem.offsetParent;
            }
            data.y = top;
            data.x = left;
            data.width = elem.offsetWidth;
            data.height = elem.offsetHeight;
        }
        data.element = elem;
    }
    return data;
};

/* harmony default export */ __webpack_exports__["default"] = (position);


/***/ }),

/***/ "./src/static/positionMouse.js":
/*!*************************************!*\
  !*** ./src/static/positionMouse.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const positionMouse = function (event) {
    if (!(event instanceof MouseEvent)) {
        console.error('Error: argument is not type the MouseEvent!');
        return;
    }
    const rect = document.body.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};

/* harmony default export */ __webpack_exports__["default"] = (positionMouse);


/***/ }),

/***/ "./src/static/query.js":
/*!*****************************!*\
  !*** ./src/static/query.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _queryAll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queryAll */ "./src/static/queryAll.js");


/**
 *
 * @param selector
 * @param from
 * @param callback
 * @param thisInstance
 * @returns {Node|boolean}
 */
const query = function (selector, from, callback, thisInstance) {
    const elements = Object(_queryAll__WEBPACK_IMPORTED_MODULE_0__["default"])(selector, from, callback, thisInstance);
    return elements && elements[0] ? elements[0] : false;
};

/* harmony default export */ __webpack_exports__["default"] = (query);


/***/ }),

/***/ "./src/static/queryAll.js":
/*!********************************!*\
  !*** ./src/static/queryAll.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");
/* harmony import */ var _typeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typeOf */ "./src/static/typeOf.js");
/* harmony import */ var _getDocument__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocument */ "./src/static/getDocument.js");




const doc = Object(_getDocument__WEBPACK_IMPORTED_MODULE_2__["default"])();

/**
 *
 * node = queryAll( '.sidebar' );
 * node = queryAll( '.sidebar', '.left' );
 * node = queryAll( '.sidebar', '.left', (elem) => {console.log(elem)} );
 * node = queryAll( '.sidebar', '.left', (elem) => {console.log(elem)}, DATA_OBJECT );
 *
 * @param {string|Element} selector
 * @param {string|Element} from
 * @param {function} callback
 * @param {object} thisInstance
 * @returns {*[]}
 */
const queryAll = function (selector, from, callback, thisInstance) {
    let elements = [];
    from = from || doc;

    if (Object(_isNode__WEBPACK_IMPORTED_MODULE_0__["default"])(selector))
        return [selector];

    if (Object(_typeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(from, 'string'))
        from = doc.querySelector(from);
    if (from)
        elements = [].slice.call(from.querySelectorAll(selector));

    if (callback)
        elements.forEach((element) => {callback.call(thisInstance || {}, element)});

    return elements;
};

/* harmony default export */ __webpack_exports__["default"] = (queryAll);


/***/ }),

/***/ "./src/static/radiansToDegrees.js":
/*!****************************************!*\
  !*** ./src/static/radiansToDegrees.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * Convert radians to degrees
 * Formula: radians * 180 / Math.PI
 * @param rad
 * @returns {number}
 */
const radiansToDegrees = function (rad) {
    return (rad * 180) / Math.PI;
};

/* harmony default export */ __webpack_exports__["default"] = (radiansToDegrees);


/***/ }),

/***/ "./src/static/random.js":
/*!******************************!*\
  !*** ./src/static/random.js ***!
  \******************************/
/*! exports provided: random, randomColor, randomNumber, randomString, randomItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomColor", function() { return randomColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomNumber", function() { return randomNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomString", function() { return randomString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomItem", function() { return randomItem; });
/* harmony import */ var _abc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abc */ "./src/static/abc.js");
/**
 * Generate a random number
 * @param min
 * @param max
 * @returns {number}
 */



const random = function (min, max) {
    min = min || 0;
    max = max || 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generate a random hex color
 * @returns {string}
 */
const randomColor = function () {
    const letters = '0123456789ABCDEF'.split('');
    let i, color = '#';
    for (i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
};
random.color = randomColor;

/**
 *
 * @param size
 * @returns {string|number}
 */
const randomNumber = function (size = 6) {
    if (size > 16) {
        let i = Math.ceil(size/16);
        let res = '';
        for (i; i > 0; i--)
            res += Array(16).fill(0).map(i => Math.floor(Math.random() * 10)).join('');
        return res.slice(0, size);
    }
    return parseInt(Array(size).fill(0).map(i => Math.floor(Math.random() * 10)).join(''));
};
random.number = randomNumber;

/**
 *
 * @param size
 * @returns {string}
 */
const randomString = function (size = 6) {
    let i, string = '';
    const abs = (_abc__WEBPACK_IMPORTED_MODULE_0__["ABC"] + _abc__WEBPACK_IMPORTED_MODULE_0__["NUMBERS"]).toLowerCase().split('');
    for (i = size; i > 0; i--) {
        string +=
            abs[Math.floor(Math.random() * abs.length)];
    }
    return string;
};
random.string = randomString;

/**
 * Return random item from array
 * @param arr
 * @returns {*}
 */
const randomItem = function (arr) {
    return Array.isArray(arr) ? arr[random(0, arr.length-1)] : false;
};
random.item = randomItem;


/* harmony default export */ __webpack_exports__["default"] = (random);

/***/ }),

/***/ "./src/static/range.js":
/*!*****************************!*\
  !*** ./src/static/range.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const range = function (start, end, step = 1) {
    const allNumbers = [start, end, step].every(Number.isFinite);

    if (!allNumbers)
        throw new TypeError('range() expects only finite numbers as arguments.');

    if (step <= 0)
        throw new Error('step must be a number greater than 0.');

    if (start > end)
        step = -step;

    const length = Math.floor(Math.abs((end - start) / step)) + 1;
    return Array.from(Array(length), (x, index) => start + index * step);
};


/* harmony default export */ __webpack_exports__["default"] = (range);


/***/ }),

/***/ "./src/static/redirect.js":
/*!********************************!*\
  !*** ./src/static/redirect.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getLocation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getLocation */ "./src/static/getLocation.js");
/* harmony import */ var _getDocument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocument */ "./src/static/getDocument.js");




const redirect = function (to) {
    const loc = Object(_getLocation__WEBPACK_IMPORTED_MODULE_0__["default"])();
    const doc = Object(_getDocument__WEBPACK_IMPORTED_MODULE_1__["default"])();
    loc.href = to || doc.href;
};

/* harmony default export */ __webpack_exports__["default"] = (redirect);


/***/ }),

/***/ "./src/static/search.js":
/*!******************************!*\
  !*** ./src/static/search.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNode */ "./src/static/isNode.js");
/* harmony import */ var _queryAll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./queryAll */ "./src/static/queryAll.js");
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query */ "./src/static/query.js");




/**
 * ```
 *  <div data-on="open">open</div>
 *  <div data-on="close">close</div>
 *
 *  const onNodes = search('[data-on]', 'data-on')
 *
 *  // onNodes
 *  {
 *      open: Node,
 *      close: Node
 *  }
 * ```
 *
 *
 * @param selector
 * @param attr
 * @param from
 * @return {{}}
 */
const search = function (selector, attr, from) {
    from = Object(_isNode__WEBPACK_IMPORTED_MODULE_0__["default"])(from) ? from : Object(_query__WEBPACK_IMPORTED_MODULE_2__["default"])(from);
    let i = 0,
        key,
        elements = {},
        queryElements = Object(_queryAll__WEBPACK_IMPORTED_MODULE_1__["default"])(selector, from || document.body);

    if (queryElements) {
        while (i < queryElements.length) {
            if (!attr)
                elements[i] = queryElements[i];
            else {
                if (queryElements[i].hasAttribute(attr)) {
                    key = queryElements[i].getAttribute(attr);
                    elements[key] = queryElements[i];
                }
            }
            i++;
        }
    }
    return elements;
};

/* harmony default export */ __webpack_exports__["default"] = (search);


/***/ }),

/***/ "./src/static/shuffleArray.js":
/*!************************************!*\
  !*** ./src/static/shuffleArray.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const shuffleArray = function (array) {
    let i, j, temp;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

/* harmony default export */ __webpack_exports__["default"] = (shuffleArray);


/***/ }),

/***/ "./src/static/sprintf.js":
/*!*******************************!*\
  !*** ./src/static/sprintf.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Examples:
 * .sprintf("Hello {0} my friend, i am {1}", "Mr.Morrison", "John")
 * @param string
 * @param args
 * @returns {void|*}
 */
const sprintf = function (string, ...args) {
    return string.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};

/* harmony default export */ __webpack_exports__["default"] = (sprintf);


/***/ }),

/***/ "./src/static/str2fragment.js":
/*!************************************!*\
  !*** ./src/static/str2fragment.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const str2fragment = function (string) {
    if (document.createRange)
        return document.createRange().createContextualFragment(string);
    else {
        let i,
            fragment = document.createDocumentFragment(),
            container = document.createElement("div");

        container.innerHTML = string;
        while (i = container.firstChild)
            fragment.appendChild(i);

        return fragment;
    }
};

/* harmony default export */ __webpack_exports__["default"] = (str2fragment);


/***/ }),

/***/ "./src/static/str2node.js":
/*!********************************!*\
  !*** ./src/static/str2node.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _str2fragment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./str2fragment */ "./src/static/str2fragment.js");


const str2node = function (string) {
    let result;
    let fragment = Object(_str2fragment__WEBPACK_IMPORTED_MODULE_0__["default"])(string);

    switch (fragment.childElementCount) {
        case 0: break;
        case 1:
            result = fragment.firstElementChild;
            break;
        default:
            let container = document.createElement("span");
            container.appendChild(fragment);
            result = container;
    }
    return result;
};

/* harmony default export */ __webpack_exports__["default"] = (str2node);


/***/ }),

/***/ "./src/static/stylizer.js":
/*!********************************!*\
  !*** ./src/static/stylizer.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const stylizer = function (element, styles) {
    Object.keys(styles).forEach((key) => {
        if (element.style[key] !== undefined) {
            element.style[key] = styles[key];
        }
    });
};

/* harmony default export */ __webpack_exports__["default"] = (stylizer);


/***/ }),

/***/ "./src/static/sum.js":
/*!***************************!*\
  !*** ./src/static/sum.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const sum = function (arr) {
    const parse = v => isNaN(v) ? 0 : v;
    return arr.reduce((acc, value) => parse(acc) + parse(value), 0);
    // arr.reduce(function(acc, value) { return acc + value; }, 0)
}

/* harmony default export */ __webpack_exports__["default"] = (sum);

/***/ }),

/***/ "./src/static/toArray.js":
/*!*******************************!*\
  !*** ./src/static/toArray.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * toArray ( $var, { values: true })
 *
 * options
 *    values - gets values of object to new array values
 *
 * @param entries
 * @param options
 * @return {[]}
 */
const toArray = function (entries, options = {}) {
  const values = options.hasOwnProperty('values') ? options.values : true;

  const type = typeof entries;
  let data = [];

  switch (type) {
    case 'object':
      if (entries) {
        if (Array.isArray(entries)) {
          data = Array.apply([], entries);
        } else {
          data = values
            ? Object.values(entries).map((key, index) => key)
            : Object.keys(entries).map((key, index) => key);
        }
      }
      break;

    case 'string':
    case 'number':
    case 'boolean':
    case 'function':
      data.push(entries)
      break;
  }

  return data;
};

/* harmony default export */ __webpack_exports__["default"] = (toArray);


/***/ }),

/***/ "./src/static/toCamelCase.js":
/*!***********************************!*\
  !*** ./src/static/toCamelCase.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const toCamelCase = function (characters) {
    const indexes = [];
    let string = characters.replace(/[_]/g, function (letter, index) {
        indexes.push(index - indexes.length);
        return '';
    });
    indexes.forEach((index)=>{
        const start = string.substring(0, index);
        const replace = string.substr(index,1).toUpperCase();
        const end = string.substring(index + 1);
        string = start + replace + end;
    });
    return string;
};

/* harmony default export */ __webpack_exports__["default"] = (toCamelCase);

/***/ }),

/***/ "./src/static/toMap.js":
/*!*****************************!*\
  !*** ./src/static/toMap.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * toMap( { '1': 5, '2': 7, '3': 0 } )
 * result [ [ 1, 5 ], [ 2, 7 ], [ 3, 0 ] ]
 *
 * @param entries
 * @return {[number, *][]}
 */
const toMap = function (entries) {
  return Object.keys(entries).map((key) => [Number(key), entries[key]]);
};

/* harmony default export */ __webpack_exports__["default"] = (toMap);


/***/ }),

/***/ "./src/static/toMinusCase.js":
/*!***********************************!*\
  !*** ./src/static/toMinusCase.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const toMinusCase = function (characters) {
    return characters.replace(/[A-Z]/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : '-' + letter.toLowerCase();
    });
};

/* harmony default export */ __webpack_exports__["default"] = (toMinusCase);

/***/ }),

/***/ "./src/static/toObject.js":
/*!********************************!*\
  !*** ./src/static/toObject.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const toObject = function (value) {
    return (typeof value === 'object')
        ? JSON.parse(JSON.stringify(value))
        : {};
}

/* harmony default export */ __webpack_exports__["default"] = (toObject);


/***/ }),

/***/ "./src/static/toSnakeCase.js":
/*!***********************************!*\
  !*** ./src/static/toSnakeCase.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const toSnakeCase = function (characters) {
    return characters.replace(/[A-Z]/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : '_' + letter.toLowerCase();
    });
    /*        return characters.split('').map((character, index) => {
                if (character === character.toUpperCase()) {
                    return (index > 0 ? '_':'') + character.toLowerCase();
                } else {
                    return character;
                }
            }).join('');*/
};

/* harmony default export */ __webpack_exports__["default"] = (toSnakeCase);

/***/ }),

/***/ "./src/static/toXML.js":
/*!*****************************!*\
  !*** ./src/static/toXML.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/**
 * @deprecated use `str2node` or `str2fragment`
 *
 * @param value
 * @returns {boolean|Element}
 */
const toXML = function (value) {
    if (value) {
        const type = 'text/xml';
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(value, type);

        if (xmlDoc.documentElement && xmlDoc.documentElement.tagName !== 'html') {
            return xmlDoc.documentElement;
        }
        return false;
    }
    return false;
}

/* harmony default export */ __webpack_exports__["default"] = (toXML);


/***/ }),

/***/ "./src/static/trim.js":
/*!****************************!*\
  !*** ./src/static/trim.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


const trim = function(str) {
    return str.replace(/^\s+|\s+$/gm,'');
};

/* harmony default export */ __webpack_exports__["default"] = (trim);


/***/ }),

/***/ "./src/static/trimSymbols.js":
/*!***********************************!*\
  !*** ./src/static/trimSymbols.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const trimSymbols = function (str, charlist) {
    let whitespace = [
        ' ',
        '\n',
        '\r',
        '\t',
        '\f',
        '\x0b',
        '\xa0',
        '\u2000',
        '\u2001',
        '\u2002',
        '\u2003',
        '\u2004',
        '\u2005',
        '\u2006',
        '\u2007',
        '\u2008',
        '\u2009',
        '\u200a',
        '\u200b',
        '\u2028',
        '\u2029',
        '\u3000'
    ].join('')
    let l = 0
    let i = 0
    str += ''
    if (charlist) {
        whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')
    }
    l = str.length
    for (i = 0; i < l; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i)
            break
        }
    }
    l = str.length
    for (i = l - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1)
            break
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
}

/* harmony default export */ __webpack_exports__["default"] = (trimSymbols);


/***/ }),

/***/ "./src/static/typeOf.js":
/*!******************************!*\
  !*** ./src/static/typeOf.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _typeOfStrict__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeOfStrict */ "./src/static/typeOfStrict.js");


// typeOf({}            )     - object
// typeOf({1:10,2:20}   )     - object
// typeOf([]            )     - array
// typeOf(null          )     - null
// typeOf(''            )     - string
// typeOf(100           )     - number
// typeOf(undefined     )     - undefined
// typeOf(true          )     - boolean
// typeOf(()=>{}        )     - function

/**
 * typeOf(VAR) // return string type
 * typeOf(VAR, 'string') // return boolean
 *
 * @param {*|string|object|boolean}value
 * @param {string|null} type
 * @return {boolean|string}
 */
const typeOf = function (value, type= null) {
    const simpleTypes = ['null', 'boolean', 'undefined', 'function', 'string', 'number', 'date', 'array', 'object'];
    let t = Object(_typeOfStrict__WEBPACK_IMPORTED_MODULE_0__["default"])(value).toLowerCase();
    if (simpleTypes.indexOf(t) === -1 && typeof value === 'object')
        t = 'object';

    return typeof type === 'string' ?
        type.toLowerCase() === t : t;
};

/* harmony default export */ __webpack_exports__["default"] = (typeOf);


/***/ }),

/***/ "./src/static/typeOfStrict.js":
/*!************************************!*\
  !*** ./src/static/typeOfStrict.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// typeof {}            - object
// typeof {1:10,2:20}   - object
// typeof []            - object
// typeof null          - object
// typeof ''            - string
// typeof 100           - number
// typeof undefined     - undefined
// typeof true          - boolean
// typeof ()=>{}        - function

// typeOfStrict({}            )        - Object
// typeOfStrict({1:10,2:20}   )        - Object
// typeOfStrict([]            )        - Array
// typeOfStrict(null          )        - Null
// typeOfStrict(''            )        - String
// typeOfStrict(100           )        - Number
// typeOfStrict(undefined     )        - Undefined
// typeOfStrict(true          )        - Boolean
// typeOfStrict(()=>{}        )        - Function
/**
 *
 * @param value
 * @param type
 * @return {boolean|string}
 */
const typeOfStrict = function (value, type) {
    const t = Object.prototype.toString.call(value).slice(8, -1);
    return typeof type === 'string' ? type === t : t;
};

/* harmony default export */ __webpack_exports__["default"] = (typeOfStrict);


/***/ }),

/***/ "./src/static/uniqArray.js":
/*!*********************************!*\
  !*** ./src/static/uniqArray.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const uniqArray = function (value, index, self) {
    return self.indexOf(value) === index;
};

/* harmony default export */ __webpack_exports__["default"] = (uniqArray);


/***/ }),

/***/ "./src/static/uri.js":
/*!***************************!*\
  !*** ./src/static/uri.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getLocation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getLocation */ "./src/static/getLocation.js");



const uri = function (uri) {
    const loc = Object(_getLocation__WEBPACK_IMPORTED_MODULE_0__["default"])();
    uri = uri || loc.pathname;
    uri = uri.replace(/\/+/ig, '/');
    return uri.length > 1 && uri.slice(0, 1) !== '/' ? '/' + uri : uri;
};

/* harmony default export */ __webpack_exports__["default"] = (uri);


/***/ }),

/***/ "./src/static/values.js":
/*!******************************!*\
  !*** ./src/static/values.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const values = function (obj) {
    if (Object.values) {
        return Object.values(obj);
    }

    const keys = Object.keys(obj);
    const length = keys.length;
    const values = new Array(length);

    for (let i = 0; i < length; i++) {
        values[i] = obj[keys[i]];
    }

    return values;
};

/* harmony default export */ __webpack_exports__["default"] = (values);


/***/ }),

/***/ "./src/static/wait.js":
/*!****************************!*\
  !*** ./src/static/wait.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/**
 * wait({}, (resolve, reject) => resolve() );
 *
 * @param args
 * @param callback
 * @returns {Promise<any>}
 */
const wait = function (args, callback) {
    return new Promise((resolve, reject) => {
        callback.bind(args)(resolve, reject);
    })
};

/* harmony default export */ __webpack_exports__["default"] = (wait);


/***/ })

/******/ });