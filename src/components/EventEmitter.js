/**
 *
 * @returns {EventEmitter}
 * @constructor
 */
function EventEmitter () {

    if (!(this instanceof EventEmitter)) {
        return new EventEmitter();
    }

    this.events = {};

    this.subscribe = function (eventName, fn) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);

        return () => {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
        }
    }

    this.emit = function (eventName, data) {
        const event = this.events[eventName];
        if( event ) {
            event.forEach(fn => {
                fn.call(null, data);
            });
        }
    }
}

export default EventEmitter;
