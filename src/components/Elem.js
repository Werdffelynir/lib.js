import typeOf from "../static/typeOf";
import isNode from "../static/isNode";
import attr from "../static/attr";
import css from "../static/css";
import domLoaded from "../static/domLoaded";
import inject from "../static/inject";
import str2node from "../static/str2node";
import node2str from "../static/node2str";
import search from "../static/search";
import searchAttr from "../static/searchAttr";
import query from "../static/query";
import queryAll from "../static/queryAll";
import createFragment from "../static/createFragment";
import createElement from "../static/createElement";
import on from "../static/on";
import defined from "../static/defined";
import position from "../static/position";
import merge from "../static/merge";

/**
 * <pre>
 * // Static
 * Elem.id : element => document.getElementById(element)
 * Elem.create (tag, attrs, inner, styles)
 * Elem.css (selector, properties)
 * Elem.position (elem)
 * Elem.query (selector, from = null, callback = null, thisInstance = null)
 * Elem.queryAll (selector, from, callback, thisInstance)
 * Elem.searchAttr (attr, from, stacked = false)
 * Elem.fragment (append)
 * Elem.node2str (element)
 * Elem.str2node (string)
 * Elem.loaded (callback)
 *
 * Elem('.class')
 * (new Elem(ELEMENT)).0 div#root
 * (new Elem(ELEMENT)).all ()
 * (new Elem(ELEMENT)).append (data)
 * (new Elem(ELEMENT)).before (data)
 * (new Elem(ELEMENT)).create (element)
 * (new Elem(ELEMENT)).attr (name, value)
 * (new Elem(ELEMENT)).children ()
 * (new Elem(ELEMENT)).coords ()
 * (new Elem(ELEMENT)).height ()
 * (new Elem(ELEMENT)).hide ()
 * (new Elem(ELEMENT)).inject (data, append, to)
 * (new Elem(ELEMENT)).on (eventName, callback, bubble)
 * (new Elem(ELEMENT)).one ()
 * (new Elem(ELEMENT)).css (properties)
 * (new Elem(ELEMENT)).parent ()
 * (new Elem(ELEMENT)).position ()
 * (new Elem(ELEMENT)).query (selector)
 * (new Elem(ELEMENT)).queryAll (selector)
 * (new Elem(ELEMENT)).remove ()
 * (new Elem(ELEMENT)).search (attr, from)
 * (new Elem(ELEMENT)).searchAttr (from, attr)
 * (new Elem(ELEMENT)).selected [div#root]
 * (new Elem(ELEMENT)).selector "#root"
 * (new Elem(ELEMENT)).show ()
 * (new Elem(ELEMENT)).toggle ()
 * (new Elem(ELEMENT)).width ()
 * (new Elem(ELEMENT)).x ()
 * (new Elem(ELEMENT)).y ()
 *
 * const em = new Elem('#transform', this.#html);
 * em.css({ position: 'relative', });
 * em.setX = function (n) { em.css({ left: n + 'px', }); };
 * em.setY = function (n) { em.css({ top: n + 'px', }); };
 * em.append('<h3>Helli</h3>');
 * em.setX(100)
 * em.setY(100)
 * </pre>
 *
 */
class Elem {
    selector = null;
    selected = null;
    constructor (selector, from = null) {
        this.selector = typeOf(selector, 'string') ? selector : null
        this.selected = isNode(selector) ? [selector] : queryAll(selector, from)
        this.selected.forEach((elem, i) => {
            this[i] = elem;
        });
    }
    _set_real_display_style(src){
        if (isNode(src) && src['real-display-style'] === undefined) {
            const style = src.style.display ? src.style.display : getComputedStyle(src).display;
            src['real-display-style'] = (!style || style === 'none') ? 'block' : style;
        }
    }
    one(){ return this.selected && this.selected.length ? this.selected[0] : false; }
    all(){ return this.selected; }
    attr(name, value){ return defined(value) ? attr(this.one(), name, value) : attr(this.one(), name); }
    inject(data, append, to){ return inject(this.one(), data, append, to); }
    append(data){ return inject(this.one(), data, true); }
    before(data){ return this.parent().insertBefore(data, this.one()); }
    search(selector, attr){ return search(selector, attr, this.one()); }
    searchAttr(attr){ return searchAttr( this.one(), attr); }
    parent(){ return this.one().parentNode; }
    children(selector = null){
        if (selector)
            return this.query(selector).children;
        return this.one().children;
    }
    create(tag, attrs, inner, styles){ return createElement(tag, attrs, inner, styles); }
    position(){ return position(this.one()); }
    css(properties){ return css(this.one(), properties); }
    query(selector){ return this.one().querySelector(selector); }
    queryAll(selector){ return this.one().querySelectorAll(selector); }
    x(){ return position(this.one()).x; }
    y(){ return position(this.one()).y; }
    width(){ return position(this.one()).width; }
    height(){ return position(this.one()).height; }
    remove(){ return this.one().parentNode.removeChild(this.one()); }
    show(){
        const src = this.one();
        this._set_real_display_style(src);
        css(src, {
            display: src && src['real-display-style'] ? src['real-display-style'] : 'block'
        });
    }
    hide(){
        this._set_real_display_style(this.one());
        css(this.one(), {display: 'none'});
    }
    toggle(){
        const src = this.one();
        if (isNode(src)) {
            if (src.style.display === 'none') Elem.show(src);
            else Elem.hide(src);
        }
    }
    on(eventName, callback, bubble){
        return on(this.one(), eventName, callback, bubble);
    }
    coords(){
        const coords = this.one().getBoundingClientRect();
        return merge({top: coords.top + scrollY, left: coords.left + scrollX}, coords);
    }

    changePosition(x = 0, y = 0, position = 'relative'){
        this.css({ position });
        this.setX(x)
        this.setY(y)
    }

    positionInitial(){ this.css({ position: 'initial', left: '0px', top: '0px'}); }
    positionRelative(x = 0, y = 0){ this.changePosition(x, y, 'relative'); }
    positionAbsolute(x = 0, y = 0){ this.changePosition(x, y, 'absolute'); }
    positionFixed(x = 0, y = 0){ this.changePosition(x, y, 'fixed'); }
    setX(n = 0){ this.css({ left: n + 'px' }) }
    setY(n = 0){ this.css({ top: n + 'px', }) }
    toString(){ return '[Class Elem]' }
}

Elem.create = createElement;
Elem.fragment = createFragment;
Elem.node2str = node2str;
Elem.str2node = str2node;
Elem.position = position;


export default Elem;
