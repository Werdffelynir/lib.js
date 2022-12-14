import Chain from "./components/Chain";
import Component from "./components/Component";
import Roxy from "./components/Roxy";
import RoxyListener from "./components/RoxyListener";
import Timer from "./components/Timer";
import Router from "./components/Router";
import KeyboardManager from "./components/KeyboardManager";
import Loader from "./components/Loader";
import abc from "./static/abc";
import clone from "./static/clone";
import convertHEXtoRGB from "./static/convertHEXtoRGB";
import convertRGBtoHEX from "./static/convertRGBtoHEX";
import wait from "./static/wait";
import values from "./static/values";
import uri from "./static/uri";
import toSnakeCase from "./static/toSnakeCase";
import toObject from "./static/toObject";
import toXML from "./static/toXML";
import sprintf from "./static/sprintf";
import toMap from "./static/toMap";
import str2node from "./static/str2node";
import toCamelCase from "./static/toCamelCase";
import typeOf from "./static/typeOf";
import typeOfStrict from "./static/typeOfStrict";
import stylizer from "./static/stylizer";
import trimSymbols from "./static/trimSymbols";
import uniqArray from "./static/uniqArray";
import str2fragment from "./static/str2fragment";
import toMinusCase from "./static/toMinusCase";
import trim from "./static/trim";
import sum from "./static/sum";
import toArray from "./static/toArray";
import shuffleArray from "./static/shuffleArray";
import search from "./static/search";
import redirect from "./static/redirect";
import range from "./static/range";
import {random, randomColor, randomItem, randomNumber, randomString} from "./static/random";
import radiansToDegrees from "./static/radiansToDegrees";
import query from "./static/query";
import queryAll from "./static/queryAll";
import positionMouse from "./static/positionMouse";
import position from "./static/position";
import on from "./static/on";
import number2string from "./static/number2string";
import node2str from "./static/node2str";
import min from "./static/min";
import middleNumber from "./static/middleNumber";
import merge from "./static/merge";
import max from "./static/max";
import loadJSSync from "./static/loadJSSync";
import loadJSON from "./static/loadJSON";
import loadJS from "./static/loadJS";
import loadCSS from "./static/loadCSS";
import loadBlobfile from "./static/loadBlobfile";
import isUpperCase from "./static/isUpperCase";
import isString from "./static/isString";
import isRegExp from "./static/isRegExp";
import isObject from "./static/isObject";
import isNumber from "./static/isNumber";
import isNode from "./static/isNode";
import isLowerCase from "./static/isLowerCase";
import isInteger from "./static/isInteger";
import isHTMLString from "./static/isHTMLString";
import isFunction from "./static/isFunction";
import isEqualArrays from "./static/isEqualArrays";
import isEmpty from "./static/isEmpty";
import isDefined from "./static/isDefined";
import isBoolean from "./static/isBoolean";
import inject from "./static/inject";
import httpRequest from "./static/httpRequest";
import getWindow from "./static/getWindow";
import getLocation from "./static/getLocation";
import getDocument from "./static/getDocument";
import format from "./static/format";
import find from "./static/find";
import extend, {extendRecursive} from "./static/extend";
import exists from "./static/exists";
import encodeGetQuery from "./static/encodeGetQuery";
import each from "./static/each";
import domLoaded from "./static/domLoaded";
import decodeGetQuery from "./static/decodeGetQuery";
import css from "./static/css";
import createFragment from "./static/createFragment";
import createElement from "./static/createElement";
import cssInject from "./static/cssInject";
import Arr from "./components/Arr";
import Cookie from "./components/Cookie";
import Datetime from "./components/Datetime";
import Dom from "./components/Dom";
import Str from "./components/Str";
import Storage from "./components/Storage";
import Transform from "./components/Transform";

export default {
    // components
    LibArr: Arr,
    LibChain: Chain,
    LibComponent: Component,
    LibCookie: Cookie,
    LibDatetime: Datetime,
    LibDom: Dom,
    LibKeyboardManager: KeyboardManager,
    LibLoader: Loader,
    LibRouter: Router,
    LibRoxy: Roxy,
    LibRoxyListener: RoxyListener,
    LibStorage: Storage,
    LibStr: Str,
    LibTimer: Timer,
    LibTransform: Transform,

    // static
    Lib: {
        abc: abc,
        clone: clone,
        convertHEXtoRGB: convertHEXtoRGB,
        convertRGBtoHEX: convertRGBtoHEX,
        createElement: createElement,
        createFragment: createFragment,
        css: css,
        cssInject: cssInject,
        decodeGetQuery: decodeGetQuery,
        domLoaded: domLoaded,
        each: each,
        encodeGetQuery: encodeGetQuery,
        exists: exists,
        extend: extend,
        extendRecursive: extendRecursive,
        find: find,
        findOne: find.one,
        findMany: find.one,
        format: format,
        getDocument: getDocument,
        getLocation: getLocation,
        getWindow: getWindow,
        httpRequest: httpRequest,
        inject: inject,
        isBoolean: isBoolean,
        isDefined: isDefined,
        isEmpty: isEmpty,
        isEqualArrays: isEqualArrays,
        isFunction: isFunction,
        isHTMLString: isHTMLString,
        isInteger: isInteger,
        isLowerCase: isLowerCase,
        isNode: isNode,
        isNumber: isNumber,
        isObject: isObject,
        isRegExp: isRegExp,
        isString: isString,
        isUpperCase: isUpperCase,
        loadBlobfile: loadBlobfile,
        loadCSS: loadCSS,
        loadJS: loadJS,
        loadJSON: loadJSON,
        loadJSSync: loadJSSync,
        max: max,
        merge: merge,
        middleNumber: middleNumber,
        min: min,
        node2str: node2str,
        number2string: number2string,
        on: on,
        position: position,
        positionMouse: positionMouse,
        queryAll: queryAll,
        query: query,
        radiansToDegrees: radiansToDegrees,
        random: random,
        randomColor: randomColor,
        randomItem: randomItem,
        randomNumber: randomNumber,
        randomString: randomString,
        range: range,
        redirect: redirect,
        search: search,
        shuffleArray: shuffleArray,
        toArray: toArray,
        toCamelCase: toCamelCase,
        toMinusCase: toMinusCase,
        toMap: toMap,
        toObject: toObject,
        toXML: toXML,
        toSnakeCase: toSnakeCase,
        trim: trim,
        trimSymbols: trimSymbols,
        typeOf: typeOf,
        typeOfStrict: typeOfStrict,
        sum: sum,
        str2fragment: str2fragment,
        str2node: str2node,
        stylizer: stylizer,
        uniqArray: uniqArray,
        sprintf: sprintf,
        uri: uri,
        values: values,
        wait: wait,
    },
};




























