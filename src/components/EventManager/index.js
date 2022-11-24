
const EventManager = {

    eventFragment: document.createDocumentFragment(),
    version: '0.0.2',
    eventsType: {},

    /**
     * Create new Event
     * @param name
     * @param details
     * @returns {CustomEvent}
     */
    addEvent: function(name, details) {
        let key;
        const event = new CustomEvent(name, {detail: details});
        if (typeof details === 'object')
            for (key in details)
                if (!event.hasOwnProperty(key)) event[key] = details[key];
        EventManager.eventFragment[name] = event;
        return this;
    },

    /**
     * Remove Event
     * @param name
     */
    removeEvent: function(name){
        if (EventManager.eventFragment[name])
            delete EventManager.eventFragment[name]
        return this;
    },

    /**
     * Register an event handler of a specific event type on the EventTarget.
     * @param type
     * @param listener
     * @param useCapture
     * @returns {{type: *, listener: *, useCapture: (*|boolean)}}
     */
    addEventListener: function (type, listener, useCapture){
        useCapture = useCapture || false;
        EventManager.eventFragment.addEventListener(type, listener, useCapture);
        return this;
    },

    /**
     * Removes an event listener from the EventTarget.
     * @param type
     * @param listener
     * @param useCapture
     */
    removeEventListener: function (type, listener, useCapture) {
        EventManager.eventFragment.removeEventListener(type, listener, useCapture||false);
        return this;
    },

    /**
     * Dispatch an event to this EventTarget.
     * @param type
     */
    dispatchEvent: function (type){
        if (EventManager.eventFragment[type] instanceof CustomEvent)
            EventManager.eventFragment.dispatchEvent(EventManager.eventFragment[type]);
        return this;
    }

};

export default EventManager;
