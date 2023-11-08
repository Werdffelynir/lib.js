
/**
 * <pre>
 * const params = {
 *     '/': function (path){contentElement.innerHTML = 'Welcome to the Home Page!';},
 *     '/about': function (path){contentElement.innerHTML = 'This is the About Page!';},
 *     'default': function (path){contentElement.innerHTML = 'Error 404!';},
 * }
 * const router = new Router(params);
 * router.navigateTo('/about');
 * </pre>
 */
class Router {
    #path;
    #params;
    constructor(params) {
        this.#path = window.location.pathname + window.location.hash;
        this.#params = params;
        this.navigateTo(this.#path);
        window.addEventListener('popstate', () => {
            this.match();
        });
    }
    match() {
        this.#path = window.location.pathname + window.location.hash;

        if (this.#params[this.#path]) {
            this.#params[this.#path].call(this, this, this.#path);
        } else {
            console.error('Error 404. Page Not Found!');
            if (this.#params.default)
                this.#params.default.call(this, this, this.#path);
        }
    }
    navigateTo(route) {
        window.history.pushState(null, null, route);
        this.match();
    }
}

export default Router;
