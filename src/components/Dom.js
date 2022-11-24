import typeOf from "../static/typeOf";
import isNode from "../static/isNode";

import attr from "../static/attr";
import css from "../static/css";
import domLoaded from "../static/domLoaded";
import inject from "../static/inject";
import str2node from "../static/str2node";
import node2str from "../static/node2str";
import search from "../static/search";
import query from "../static/query";
import queryAll from "../static/queryAll";
import createFragment from "../static/createFragment";
import createElement from "../static/createElement";
import on from "../static/on";
import defined from "../static/defined";
import position from "../static/position";
import merge from "../static/merge";

function Dom (selector) {
    const root = {
        selector: typeOf(selector, 'string') ? selector : null,
        selected: isNode(selector) ? [selector] : queryAll(selector),
    };
    root.selected.forEach((elem, i) => {
        root[i] = elem;
    });

    const _set_real_display_style = function (src) {
        if (typeOf(src, 'string')) {
            queryAll(src).map(_set_real_display_style);
        } else if (isNode(src) && src['real-display-style'] === undefined) {
            const style = src.style.display ? src.style.display : getComputedStyle(src).display;
            src['real-display-style'] = (!style || style === 'none') ? 'block' : style;
        }
    };

    root.one = () => root.selected && root.selected.length ? root.selected[0] : false;
    root.all = () => root.selected;
    root.attr = (name, value) => defined(value) ? attr(root.one(), name, value) : attr(root.one(), name);
    root.inject = (data, append, to) => inject(root.one(), data, append, to);
    root.append = (data) => inject(root.one(), data, true);
    root.search = (attr, from) => search(root.one(), attr, from);
    root.parent = () => root.one().parentNode;
    root.children = () => {
        root.one()
    };
    root.position = () => position(root.one());
    root.query = (selector) => root.one().querySelector(selector);
    root.queryAll = (selector) => root.one().querySelectorAll(selector);
    root.x = () => position(root.one()).x;
    root.y = () => position(root.one()).y;
    root.width = () => position(root.one()).width;
    root.height = () => position(root.one()).height;
    root.remove = () => root.one().parentNode.removeChild(root.one());
    root.show = () => {
        const src = root.one();
        _set_real_display_style(src);
        css(src, {display: src && src['real-display-style'] ? src['real-display-style'] : 'block'});
    };
    root.hide = () => {
        const src = root.one();
        _set_real_display_style(src);
        css(src, {display: 'none'});
    };
    root.toggle = () => {
        const src = root.one();
        if (typeOf(src, 'string')) {
            queryAll(src).map(Dom.toggle);
        } else if (isNode(src)) {
            if (src.style.display === 'none') Dom.show(src);
            else Dom.hide(src);
        }
    };
    root.on = (eventName, callback, bubble) => on(root.one(), eventName, callback, bubble);
    root.coords = () => {
        const coords = root.one().getBoundingClientRect();
        return merge({top: coords.top + pageYOffset, left: coords.left + pageXOffset}, coords);
    };
    return root;
}

Dom.on = on;
Dom.id = (element) => document.getElementById(element);
Dom.attr = attr;
Dom.css = css;
Dom.loaded = domLoaded;
Dom.inject = inject;
Dom.str2node = str2node;
Dom.search = search;
Dom.queryAll = queryAll;
Dom.query = query;
Dom.create = createElement;
Dom.fragment = createFragment;
Dom.node2str = node2str;
Dom.str2node = str2node;
Dom.position = position;


export default Dom;
