import Oxy from "./Oxy";

/**
 *
 * Use:
 * <pre>
 * class AppComponent extends Component {
 *     constructor() {
 *         super({
 *             title: 'Hello',
 *         });
 *         this.subscribe((prop, value) => {
 *             console.log('subscribe', prop, value)
 *         })
 *         this.props.title += ' App';
 *     }
 * }
 * const app = new AppComponent();
 * console.log(app.props.title)
 * </pre>
 */
export default class Component {
    id = 'component';
    props;

    constructor(props = {}) {

        const getStack = () => {
            return this.#stack;
        };

        this.props = new Oxy(props, {
            every(prop, value) {
                getStack().forEach((callback) => {
                    callback.call(this, prop, value);
                });
            },
        });
    }

    #stack = [];

    subscribe(callback) {
        if (typeof callback !== 'function') return false;
        return this.#stack.push(callback) - 1;
    }

    unsubscribe(index) {
        if (!this.#stack[index]) return false;
        return !!this.#stack.splice(index, 1);
    }
}
