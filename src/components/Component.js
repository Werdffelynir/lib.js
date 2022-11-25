import str2node from "../static/str2node";
import isNode from "../static/isNode";
import merge from "../static/merge";
import search from "../static/search";
import clone from "../static/clone";
import random from "../static/random";
import isHTMLString from "../static/isHTMLString";
import query from "../static/query";


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
            let randomName = random.string(6).toLowerCase();
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
            const cloned = clone(this);
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
            if (isNode(elem)) {
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
                if (isHTMLString(elem)) {
                    elem = str2node(elem);
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
            if (comp.template === '' || isHTMLString(comp.template)) {
                comp.template = str2node(comp.template);
            } else {
                comp.template = query(comp.template);
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

            if (isNode(comp.template)) {

                if (comp.attrs && Object.values(comp.attrs).length) {
                    Object.keys(comp.attrs).forEach((key) => {
                        comp.template.setAttribute(key, comp.attrs[key]);
                    });
                }

                if (comp.templateDataElementsEnabled === true) {
                    comp.templateDataElementsAttributes.forEach((attr) => {
                        const name = attr.substring(5);
                        comp.templateDataElements[name] = search('[' + attr + ']', attr, comp.template);

                        if (name === 'node') {
                            comp.node = comp.templateDataElements[name];
                        }
                    });
                }

            }
        };
        comp.update = comp.updateTemplateDataElements;

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
    return merge({
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

export const COMPONENT_DATA_ATTRIBUTES = [
    'data-func',
    'data-action',
    'data-node',
    'data-on',
    'data-to',
    'data-id',
];

export default Component;
