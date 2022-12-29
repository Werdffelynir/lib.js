import isHTMLString from "../static/isHTMLString";
import str2node from "../static/str2node";
import clone from "../static/clone";
import isNode from "../static/isNode";
import search from "../static/search";
import random, {randomString} from "../static/random";
import node2str from "../static/node2str";
import isString from "../static/isString";
import Roxy from "../components/Roxy";


/*
const VariablesObject = {
    id: 0,
    node: null,
    source: null,
    value(){return (typeof this.source === 'function') ? this.source() :  this.source},
    render(){return '<span data-variable="'+ this.id +'">'+ (this.value()) +'</span>'},
};
*/

/*
const Params = {
    id: 0,
    attrs: {},
    props: {},
    template: 0,
    preload: true,
    override: true,
};
*/


const TEMPLATE_ATTRIBUTES = [
    'data-on',
    'data-node',
    'data-variable',
    // 'data-func',
    // 'data-action',
    // 'data-to',
    // 'data-id',
];

/**
 * <pre>
 *
 *
 * // Default true
 * Component.forcePreload = false
 *
 * // Default true
 * Component.forceDisableAttrs = false
 *
 * // Default false
 * Component.forceDisableVariables = true
 *
 * // Default false
 * Component.variablesAsHTML = true
 *
 * Component.remove('component_id')
 *
 * Component.get('component_id')
 *
 * Component.set('component_id', [Component] )
 *
 * comp = new Component( {
 *      id: '',
 *      template: `<span></span>`,
 *      attrs: {},
 *      override: false,
 *      preload: false,
 *      attrsEnable: false,
 *      variablesEnable: false,
 *      data: { },
 *      init () { },
 *      before () { },
 *      complete () {},
 * } )
 *
 * comp.initialized
 * comp.completed
 * comp.loaded
 *
 * comp.load();
 *
 * comp.template
 *
 * // elements(attr, name)
 * elements('node', 'title')
 *
 * // Get element|s with attr 'data-node=" * "'
 * node('title')
 *
 * // Create clone of Component
 * clone()
 *
 * // inject elem into component template. option append
 * inject ( [Component], true)
 *
 * // Events on (node, event, callback)
 * comp.on( 'click', ()=>{} )
 * comp.on( [NodeElement], 'click', ()=>{} )
 * comp.on( [Component], 'click', ()=>{} )
 *
 * // Get child component
 * component('MyComponent')
 *
 * // Set child component
 * component('MyComponent', [Component] )
 *
 * // Remove child component
 * removeComponent('MyComponent')
 *
 * // Examples
 * comp = new Component( {
 *      id: 'AppComponent',
 *      template: `<span>Title of Component</span>`,
 *      init () { },
 *      complete () { },
 * } )
 *
 * comp = new Component( {
 *      id: 'AppComponent',
 *      preload: false,
 *      attrsEnable: true,  // Handler of elements with attr 'data-*'. Default is true
 *      template: `<span data-node="title">Title of Component</span>`,
 *      init () { },
 *      complete () {
 *          this.node.title.textContent = 'Set new title';
 *      },
 * } )
 *
 * comp = new Component( {
 *      id: 'AppComponent',
 *      template: `<span>{title}</span><span>{id}</span>`,
 *      variablesEnable: true,  // handler of variables. default is false
 *      data: {
 *          title: 'Hello ',
 *          id () { return this.id }
 *      },
 *      complete () {
 *          // where title is change call
 *          this.variableObserve('title', (key, value) => {})
 *
 *          this.dataSet('title', 'Hello 2');
 *          // or
 *          this.dataset.title = 'Hello 2';
 *          // or
 *          this.variableDispatch('title', 'Hello 3')
 *      },
 * } )
 * </pre>
 *
 * @param params
 * @returns {Component}
 * @constructor
 */
function Component(params = {}) {
    if (!(this instanceof Component)) {
        return new Component(params);
    }

    this.id = null;
    this.attrs = {};
    this.props = [];
    /**@type {Element|string|null}*/
    this.template = null;

    this.preload = true;
    this.override = true;

    this.data = {};
    /**
     * @type {Proxy} link of _variables_proxy_stage
     */
    this.dataset = {};
    this.methods = {};
    this.variables = {};

    /**
     * @type {Roxy}
     * @private
     */
    this._variables_roxy = null;
    /**
     * @type {Proxy}
     * @private
     */
    this._variables_proxy_stage = {};
    this._variables_as_html = Component.variablesAsHTML;
    this.variablesEnable = false;
    this.attrsEnable = true;
    /**
     * @private
     */
    this._template_attrs_data_element = {};
    this._template_attrs_data_values = TEMPLATE_ATTRIBUTES;
    this._template_string_origin = null;

    this.initialized = false;
    this.completed = false;
    this.loaded = false;

    this.before = null;
    this.init = null;
    this.complete = null;

    this.node = {};

    this.components = {};
    /** @type {Component|null} */
    this.parent = null;

    Object.keys(params).forEach((key) => {
        this[key] = params[key];
    });

    if (Component.forceDisableVariables !== undefined) {
        this.variablesEnable = Component.forceDisableVariables;
    }
    if (Component.forceDisableAttrs !== undefined) {
        this.attrsEnable = Component.forceDisableAttrs;
    }

    if (this.variablesEnable) {
        this.variableDispatch = function (key, payload) {this._variables_roxy.dispatch(key, payload)};
        this.variableObserve = function (key, callback) {this._variables_roxy.observe(key, callback)};
    }

    if (typeof this.before === 'function') {
        this.before.call(this, this);
    }

    if (this.components && Object.keys(this.components).length) {
        Object.keys(this.components).forEach((key) => {
            this.component(key, this.components[key]);
        });
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    if (!this.id || typeof this.id !== 'string') {
        let randomName = random.string(6).toLowerCase();
        randomName = randomName.substring(0, 1).toUpperCase() + randomName.substring(1);
        this.id = 'AutoComp_' + randomName;
    }

    if (this.methods && Object.values(this.methods).length) {
        Object.keys(this.methods).forEach((key) => {
            if (typeof this.methods[key] === 'function') {
                this.methods[key] = this.methods[key].bind(this);
                if (!this.hasOwnProperty(key)) {
                    this[key] = this.methods[key];
                }
            }
        });
    }

    // if (this.data && Object.keys(this.data).length) {
    //     Object.keys(this.data).forEach((key) => {
    //         if (typeof this.data[key] === 'function') {
    //             this.data[key] = this.data[key].bind(this);
    //         }
    //         if (!this.hasOwnProperty(key)) {
    //             this[key] = this.data[key];
    //         }
    //     });
    // }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    this.toString = function () { return 'Component' };

    /**
     * Get or Set children component
     *
     * // Get
     * .component('AppComponent')
     *
     * // Set
     * .component('AppComponent', [AppComponent])
     *
     * @param id
     * @param component
     * @returns {*|null}
     */
    this.component = function (id, component) {
        if (arguments.length === 1)
            return this.components[id] ? this.components[id] : null;

        if (arguments.length === 2) {
            component.parent = this;
            return this.components[id] = component;
        }
    };
    this.removeComponent = function(component) {
        if (this.components[component.id]) {
            this.components[component.id].parent = null;
            delete this.components[component.id];
        }
    };
    this.elements = function (attr, name) {
        if (arguments.length === 0)
            return this._template_attrs_data_element;

        attr = attr.replace('data-', '');

        if (name) {
            return typeof this._template_attrs_data_element[attr][name] !== "undefined"
                ? this._template_attrs_data_element[attr][name]
                : null;
        }

        return typeof this._template_attrs_data_element[attr] !== "undefined"
            ? this._template_attrs_data_element[attr]
            : null;
    };
    this.clone = function () {
        const cloned = clone(this);
        cloned.template = cloned.template.cloneNode(true);
        return cloned;
    };

    this.on = function (node, event, callback) {
        if (arguments.length === 2)
            return this.template.addEventListener(node, event);

        if (arguments.length === 3) {
            if (isNode(node))
                return node.addEventListener(event, callback);

            if (node && node.toString() === 'Component')
                return node.template.addEventListener(event, callback);

            if (isString(node)) {
                if (isNode(this.elements('on', node)))
                    return this.elements('on', node).addEventListener(event, callback);

                if (isNode(this.elements('node', node)))
                    return this.node[node].addEventListener(event, callback);

                throw ReferenceError('First argument is not Element|Component or not have handling attributes as [data-node|data-on]');
            }
        }
    };
    this.inject = function (element, append = true) {

        if (!append) {
            this.template.textContent = '';
        }

        if (isNode(element)) {
            this.template.appendChild(element);
        }
        if (element.toString() === 'Component') {
            this.component(element.id, element);
            this.template.appendChild(element.template);
        }

        if (typeof element === 'number') {
            element = element.toString();
        }

        if (typeof element === 'string') {
            if (isHTMLString(element)) {
                this.template.appendChild(str2node(element));
            } else {
                this.template.textContent += element;
            }
        }

    };

    this.dataSet = function (name, source) {
        this._variables_proxy_stage[name] = (typeof source === 'function') ? source() :  source;
    }

    this._on_variables_compile = function () {
        if (!this.variablesEnable) return;
        const reg = new RegExp(/\{(\w+)\}/, 'gm');


        // to dynamic
        if (Object.keys(this.data).length && reg.test(this.template)) {
            const vars = this.template.match(reg);
            vars.forEach((name, i) => {
                name = name.replace('}', '').slice(1);
                if (this.data[name] === undefined) return;

                this.variables[name] = {
                    id: randomString(8),
                    node: null,
                    source: this.data[name],
                    value(){return (typeof this.source === 'function') ? this.source() :  this.source},
                    render(){return '<span data-variable="'+ this.id +'">'+ (this.value()) +'</span>'},
                }

                this.template = this.template.replace(RegExp('\{' + name + '\}', 'gm'),
                    this.variables[name].render()
                );
            });

            this._variables_roxy = new Roxy(this.data);
            this._variables_proxy_stage = this._variables_roxy.proxy;

            this._variables_roxy.loopListener((name, value) => {
                if (!this.variables[name]) return;

                this.variables[name].source = value;

                if (this._variables_as_html)
                    this.variables[name].node.innerHTML = this.variables[name].value();
                else
                    this.variables[name].node.textContent = this.variables[name].value();

            });

            this.dataset = this._variables_proxy_stage;
        }
    }
    this._on_complete = function () {

        if (isNode(this.template)) {
            if (this.variablesEnable) {
                this._template_string_origin = node2str(this.template);
            }
        }

        else
        if (isString(this.template) || isHTMLString(this.template)) {
            if (this.variablesEnable) {
                this._template_string_origin = this.template;
                this._on_variables_compile();
                this.template = str2node(this.template);
                Object.keys(this.variables).forEach((name) => {
                    this.variables[name].node = this.template.querySelector('[data-variable="'+ (this.variables[name].id) +'"]')
                });
            }
            else {
                this.template = str2node(this.template);
            }
        }

        else
        if (isString(this.template) && !isHTMLString(this.template)) {
            this.template = document.querySelector(this.template);
            if (this.variablesEnable) {
                this._template_string_origin = node2str(this.template);
            }
        }

        this.update();

        if (typeof this.complete === 'function') {
            this.complete.call(this, this);
        }

        this.completed = true;
    }

    this.load = function () {
        if (this.loaded) throw new Error('Is loaded ready')
        this.loaded = true;

        if (!this.completed) {
            if (document) {
                if (document.querySelector('body')) {
                    this._on_complete();
                } else {
                    document.addEventListener('DOMContentLoaded', () => this._on_complete());
                }
            } else {
                this._on_complete();
            }
        }

        return this;
    };

    this.update = function () {
        if (!isNode(this.template)) {
            return console.info('template is not NodeElement')
        }

        if (this.attrs && Object.values(this.attrs).length) {
            Object.keys(this.attrs).forEach((key) => {
                this.template.setAttribute(key, this.attrs[key]);
            });
        }

        if (this.attrsEnable === true) {
            this._template_attrs_data_values.forEach((attr) => {
                const name = attr.substring(5);
                this._template_attrs_data_element[name]
                    = search('[' + attr + ']', attr, this.template, true);

                if (name === 'node') {
                    this.node = this._template_attrs_data_element[name];
                }
            });
        }


        return this;
    };

    this.___ = function () {};


    if (!this.initialized && typeof this.init === 'function') {
        this.init.call(this, this);
        this.initialized = true;
    }

    if (Component.forcePreload === undefined) {
        if (this.preload) this.load();
    } else {
        if (Component.forcePreload) this.load();
    }

    Component.set(this);
}

Component.forcePreload = undefined;
Component.forceDisableVariables = undefined;
Component.forceDisableAttrs = undefined;
Component.variablesAsHTML = false;
Component.list = {};

Component.set = function (component) {
    if (Component.list[component.id] && component.override) return;
    Component.list[component.id] = component
};

Component.get = function (key) {
    if (Component.list[key]) {
        throw new Error(`Component id ${key} is exists!`);
    }
    return Component.list[key];
};

Component.remove = function (key) {
    if (Component.list[key]) {
        return delete Component.list[key];
    }
    return false;
};


export default Component;
