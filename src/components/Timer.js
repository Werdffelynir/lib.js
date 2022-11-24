/**
 *
 * @param callback: function
 * @param ms
 * @param thisInst
 * @return {number}
 */
const timeout = function (callback = () => {}, ms = 1000, thisInst = null) {
    thisInst = typeof thisInst === 'object' ? thisInst : {};

    return setTimeout(function () {
        callback.call(thisInst)
    }, ms);
};

/**
 * @example Timer.interval( function(iterator, stop){ if (iterator > 10){ stop(); } }, 300);
 * @param callback
 * @param ms
 * @param thisInst
 * @return {number}
 */
const interval = function (callback = () => {}, ms = 1000, thisInst = null)
{
    thisInst = typeof thisInst === 'object' ? thisInst : {};

    let iterate = 0;
    let instance = setInterval(function () {
        callback.call(thisInst,  ++ iterate, stop)
    }, ms);

    function stop() {
        clearInterval(instance);
    }

    return instance;
};

const Timer = function (callback, delay = 1000, repeat = 1, thisInstance = null)
{
    if (repeat > 1) {
        interval((iterator, stop) => {
            if (iterator > repeat) {
                stop();
            } else {
                callback.call(thisInstance, iterator, stop);
            }
        }, delay);
    } else {
        timeout(callback, delay, thisInstance)
    }

    return this;
};

Timer.timeout = timeout;
Timer.interval = interval;
Timer.clear = (id) => {
    clearTimeout(id);
    clearInterval(id);
};

export default Timer;