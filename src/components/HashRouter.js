/**
 *
 * Use:
 * <pre>
 * const mapper = [
 *      {
 *             route: '/#',
 *             action: () => {},
 *             default: true
 *      },
 *      {
 *             route: '/#about',
 *             action: () => {},
 *      },
 *      {
 *             route: '/#settings',
 *             action: () => {},
 *      },
 *
 *      // Example with uri parameters
 *      // default option not work for rout with parameters
 *      {
 *             route: '/#page</:number></:id>',
 *             action: (details, params) => {
 *                 const {number, id} = params;
 *                 application.render();
 *             },
 *      },
 * ];
 *
 * const router = HashRouter ( mapper )
 *
 * // !important - state initialize, set|replace history state
 * // and auto run default mapper function action
 * router.start()
 *
 *
 *
 * // other functions
 *
 * router.currentUri()
 *
 * Get router object
 * const found = router.find(route);
 * found.action(found.details, found.params);
 *
 * Get router object, and run mapper function action
 * const found = router.run(route);
 *
 * </pre>
 */


class HashRouter {
    state = {
        uri: null,
        route: null,
        details: null,
    };

    mapper = [];

    constructor(mapper) {
        this.mapper = Array.isArray(mapper) ? mapper : [{
            route: '/',
            action: () => { console.log('Array mapper not set or set incorrectly!') },
            details: '',
            default: false,
        }];

        this.mapper.forEach((map, index) => {
            const {route, search, params, regexp} = this.parseRoute(map.route);
            this.mapper[index].route = route;
            this.mapper[index].search = search;
            this.mapper[index].params = params;
            this.mapper[index].regexp = regexp;
        });

        window.onpopstate = (event) => {
            if (event.state) {
                this.state = event.state;
                this.run(this.state.uri, false);
            }
        };

        window.onhashchange = (event) => {
            const uri = this.currentUri();
            const map = this.find(uri);
            if (map) {
                this.actionStart(map);
            } else {
                console.error('Error: called onhashchange, map not found!')

            }
        };
    }

    currentUri() {
        return location.pathname + location.hash;
    }

    parseRoute(_route) {
        let search = _route;
        let route = _route;
        let params = {};
        let regexp = null;
        const match = _route.match(/<\/:(\w*)>/gm);
        if (match) {
            const rmStr = match.join('');
            search = _route.replace(rmStr,'');
            regexp = '\\' + search;
            match.forEach((param) => {
                const matchParam = param.match(/(\w+)/gm); // \/(\w+)
                regexp += '\\/(?<' +matchParam[0]+ '>\\w+)';
                params[matchParam[0]] = null;
            })
        }

        return {route, search, params, regexp}
    }

    matchUri(_uri) {
        for (let index = 0; index < this.mapper.length; index++) {
            if (this.mapper[index].regexp && (new RegExp(this.mapper[index].regexp)).test(_uri)) {
                this.mapper[index].uri = _uri;
                const match = _uri.match(new RegExp(this.mapper[index].regexp));
                this.mapper[index].params = {...this.mapper[index].params, ...match.groups}
                return this.mapper[index];
            }
            if (_uri === this.mapper[index].search) {
                this.mapper[index].uri = _uri;
                return this.mapper[index];
            }
        }
        return null;
    }

    findWithoutPushState(uri) {
        const found = this.matchUri(uri);

        return found ?? null;
    }

    find(uri) {
        const found = this.findWithoutPushState(uri);
        if (found) {
            this.pushState(found);
        }
        return found ?? null;
    }

    pushState(map) {
        this.state.details = map.details;
        this.state.params = map.params;
        this.state.route = map.route;
        this.state.search = map.search;
        this.state.uri = map.uri;
        window.history.pushState(this.state, document.title, map.uri);
    }

    replaceState(map) {
        this.state.details = map.details;
        this.state.params = map.params;
        this.state.route = map.route;
        this.state.uri = map.uri;
        window.history.replaceState(this.state, document.title, map.uri);
    }

    start() {
        let map = this.findWithoutPushState(this.currentUri());
        if (!map) {
            map = this.mapper.find((r) => r.default);
            location.hash = map.route.substring(2);
        }
        // console.log('start', map);
        this.replaceState(map);
        this.actionStart(map);

    }

    run(uri, saveState = true) {
        const map = this.findWithoutPushState(uri);
        if (map) {
            if (saveState) this.pushState(map);

            this.actionStart(map)
        }
        return map ?? null;
    }

    actionStart(map) {
        const {details, params, action} = map;

        if (typeof action === 'function') {
            action(details, params);
        } else {
            console.error('Error: action start fail, action function not found!')
        }
    }
}

export default HashRouter;
