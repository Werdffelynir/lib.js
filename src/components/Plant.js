import merge from "../static/merge";

/**
 *
 * @version 0.0.1 unstable
 * @param configuration
 * @return {*|{init(), render(), configured: function(configuration: *), properties: function(properties: *), prop: function(name: string)}}
 * @constructor
 */
const Plant = function (configuration) {
    const METHODS = {
        CONFIGURED: 'configured',
        COMPLETE: 'complete',
        RENDER: 'render',
        PROPS: 'props',
        PROP: 'prop',
        INIT: 'init',
    };

    let root = {
        render () {},
        props: {},
        prop(name){ return this.props[name] },
        init () {},
        update () {},
        complete () {},
        properties (properties) {
            Object.keys(properties).forEach((key) => {
                this.props[key] = properties[key]
            });
            if (this.update) {this.update()}
        },
        configured (configuration) {
            Object.keys(configuration).forEach((key) => {
                if (!Object.values(METHODS).includes(key)) {
                    root[key] = configuration[key];
                }
            });
            if (this.update) {this.update()}
        },
    };

    root.init();
    root = merge(root, configuration);
    root.complete();

    return root;
};

export default Plant;