import trimSymbols from "../static/trimSymbols";

/**
 *
 * @param config
 * @returns {{}}
 * @constructor
 */
const Router = function (config)
{
    const root = {};
    root.hash = location.hash;
    root.root = '/' + trimSymbols(config.root, '/');
    root.pathname = '/' + trimSymbols(location.pathname, '/') + '/';
    root.routes = config.routes ? config.routes : {};
    root.context = config.context ? config.context : {};

    root.state = function (state, title, uri) {
        state.uri = state.uri ? state.uri : uri;
        state.title = state.title ? state.title : title;
        if (history.state.uri === uri) {
            return history.replaceState(state, title, uri);
        }
        return history.pushState(state, title, uri);
    };

    root.to = function (key, state) {
        console.log('Router.to', key);
        if (typeof root.routes[key] === "function") {

            if (state) {
                root.state(state, state.title, state.uri);
            }
            root.routes[key].call(root, root.context);
        }
    };

    Object.keys(root.routes).forEach((key) => {
        let is = key.includes('#')
            ? key === root.hash
            : root.root + key === root.pathname;

        if (is && typeof root.routes[key] === "function") {
            root.routes[key].call(root, root.context);
        }
    });

    return root;
};

export default Router;
