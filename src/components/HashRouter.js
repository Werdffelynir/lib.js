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
 *             route: '/#page1',
 *             action: () => {},
 *      },
 *      {
 *             route: '/#page2',
 *             action: () => {},
 *      },
 * ];
 *
 * const router = HashRouter ( mapper )
 *
 * // init this first, set|replace history state
 * router.replaceState()
 *
 * router.pushState(route)
 *
 *
 * // internal functions
 * router.findRoure(route)
 * router.defaultRoure()
 * router.currentRoure()
 * router.currentUri()
 * </pre>
 */
class HashRouter {

    state = {
        route: null,
        details: null,
        uri: null,
    };

    mapper = [];

    constructor(mapper) {
        this.mapper = Array.isArray(mapper) ? mapper : [{
            route: '/',
            action: () => { console.log('Array mapper not set or set incorrectly!') },
            details: '',
            default: false,
        }];

        window.onpopstate = (event) => {
            // console.log('HashRouter::constructor::onpopstate', event.state);
            if (event.state) {
                this.state = event.state;
                const {
                    route,
                    action
                } = this.findRoure(this.state.route);

                if (typeof action === 'function') {
                    action();
                } else {
                    console.error('Error: Route link action function not found!')
                }

            }
        };
    }

    findRoure(route) {
        for (let i = 0; i < this.mapper.length; i++)
            if (route === this.mapper[i].route) return this.mapper[i];

        return this.defaultRoure();
    }

    defaultRoure() {
        return this.mapper.find((r) => r.default);
    }

    currentRoure() {
        for (let i = 0; i < this.mapper.length; i++) {
            if (this.currentUri() === this.mapper[i].route)
                return this.mapper[i];
        }
        return this.defaultRoure();
    }

    currentUri() {
        return location.pathname + location.hash;
    }

    pushState(route) {
        const c = this.findRoure(route);
        // console.log('HashRouter::pushState', c);
        this.state.details = c.details;
        this.state.route = c.route;
        this.state.uri = c.uri;
        window.history.pushState(this.state, document.title, c.route);
    }

    replaceState() {
        const c = this.currentRoure();
        // console.log('HashRouter::replaceState', c);
        this.state.details = c.details;
        this.state.route = c.route;
        this.state.uri = c.uri;
        window.history.replaceState(this.state, document.title, c.route);
    }
}


export default HashRouter;
