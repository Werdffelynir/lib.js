import abc from "../static/abc";
import attr from "../static/attr";
import createElement from "../static/createElement";
import createFragment from "../static/createFragment";
import css from "../static/css";
import domLoaded from "../static/domLoaded";
import getDocument from "../static/getDocument";
import getWindow from "../static/getWindow";
import inject from "../static/inject";
import str2node from "../static/str2node";
import str2fragment from "../static/str2fragment";
import node2str from "../static/node2str";
import query from "../static/query";
import queryAll from "../static/queryAll";
import search from "../static/search";
import searchAttr from "../static/searchAttr";
import encodeGetQuery from "../static/encodeGetQuery";
import decodeGetQuery from "../static/decodeGetQuery";
import httpRequest from "../static/httpRequest";
import defined from "../static/defined";
import definedIn from "../static/definedIn";
import each from "../static/each";
import extend, {
    extendRecursive
}  from "../static/extend";
import isEmpty from "../static/isEmpty";
import finds from "../static/finds";
import format from "../static/format";
import isNode from "../static/isNode";
import loadCSS from "../static/loadCSS";
import loadJS from "../static/loadJS";
import loadJSSync from "../static/loadJSSync";
import merge from "../static/merge";
import number2string from "../static/number2string";
import on from "../static/on";
import position from "../static/position";
import positionMouse from "../static/positionMouse";
import random, {
    randomColor,
    randomNumber,
    randomString,
    randomItem
} from "../static/random";
import redirect from "../static/redirect";
import typeOf from "../static/typeOf";
import typeOfStrict from "../static/typeOfStrict";
import uri from "../static/uri";
import copy from "../static/copy";
import clone from "../static/clone";
import toObject from "../static/toObject";
import isHTMLString from "../static/isHTMLString";
import createArray from "../static/createArray";
import isString from "../static/isString";
import exists from "../static/exists";
import isDefined from "../static/isDefined";
import loadBlobfile from "../static/loadBlobfile";
import loadJSON from "../static/loadJSON";
import toXML from "../static/toXML";
import stylizer from "../static/stylizer";
import uniqArray from "../static/uniqArray";
import isNumber from "../static/isNumber";
import trimSymbols from "../static/trimSymbols";
import isLowerCase from "../static/isLowerCase";
import isUpperCase from "../static/isUpperCase";
import toSnakeCase from "../static/toSnakeCase";
import toCamelCase from "../static/toCamelCase";
import hasLowerCase from "../static/hasLowerCase";
import toMinusCase from "../static/toMinusCase";
import addCss from "./cssInject";
import request, {toQueryString}  from "./request";
import isFloat from "./isFloat";
import fixFloat from "./fixFloat";
import dice from "./dice";


const Static = {
    abc,
    attr,
    create: createElement,
    fragment: createFragment,
    css,
    domLoaded,
    getDocument,
    getWindow,
    inject,
    str2node,
    str2fragment,
    node2str,
    query,
    queryAll,
    search,
    searchAttr,
    encodeGetQuery,
    decodeGetQuery,
    httpRequest,
    defined,
    definedIn,
    extend,
    extendRecursive,
    each,
    find: finds.one,
    finds: finds.many,
    format,
    isEmpty,
    isNode,
    loadCSS,
    loadJS,
    loadJSSync,
    merge,
    number2string,
    on,
    position,
    positionMouse,
    random,
    randomColor,
    randomItem,
    randomNumber,
    randomString,
    redirect,
    typeOf,
    typeOfStrict,
    uri,
    copy,
    clone,
    toObject,
    isHTMLString,
    createArray,
    isString,
    exists,
    isDefined,
    loadBlobfile,
    loadJSON,
    // loadTextfile,
    // toHTML,
    toXML,
    stylizer,
    uniqArray,
    isNumber,
    trimSymbols,
    isLowerCase,
    isUpperCase,
    toCamelCase,
    toSnakeCase,
    hasLowerCase,
    toMinusCase,
    addCss,
    request,
    toQueryString,
    isFloat,
    fixFloat,
    dice,
};

export default Static;
