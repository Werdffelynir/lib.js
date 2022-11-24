import trimSymbols from "../static/trimSymbols";

const Router = function (config)
{
    const root = {};
    root.hash = location.hash;
    root.root = '/' + trimSymbols(config.root, '/');
    root.pathname = '/' + trimSymbols(location.pathname, '/') + '/';
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

export default Router;
