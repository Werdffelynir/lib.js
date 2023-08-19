import random from "../static/random";
import isString from "../static/isString";

/**
 * <pre>
 * EXAMPLES:
 * const Anim = new AnimationFrames({
 *     timeout: 500,                        // daley
 *     paused: true,                        // pause after start
 *     context: CanvasRenderingContext2D,   // custom common var
 * });
 *
 * Anim.i                               // iteration of global frames
 * Anim.frame({...})                    // add new animation scene
 *
 * Anim.start()                         // start play
 *
 * Anim.stop()                          // set pause, stop play
 *
 * Anim.next()                          // force play next one frames stack
 *
 * Anim.before([callback])              // call before main frame played, pause not accept
 * Anim.after([callback])               // call after main frame played, pause not accept
 *
 * Anim.frame(function (af) {
 *     // this === af
 * });
 *
 * Anim.frame({
 *     id: 'clear',
 *     // executed once
 *     init(af) {},
 *     // executed every tick
 *     run(af) {
 *         // this === self object
 *         af.ctx.clearRect(0,0,2000,2000);
 *     },
 * });
 *
 * Anim.frame({
 *     id: 'blue',
 *     x: 10,
 *     run(draw) {
 *         context.fillStyle = '#68afcb';
 *         context.fillRect(this.x, 10, 10, 10);
 *         this.x ++;
 *     },
 * });
 *
 *
 * [KeyboardEvent]:
 *      altKey: false
 *      charCode: 0
 *      key: 'd',
 *      code: 'KeyD'
 *      ctrlKey: false
 *      key: "d"
 *      keyCode: 68
 *      metaKey: false
 *      repeat: false
 *      returnValue: true
 *      shiftKey: false
 *      timeStamp: 58419.89999999851
 *      type: "keydown"
 *      which: 68
 * </pre>
 * @param {{timeout: number, paused: boolean, }|*} params
 * @returns {{paused: boolean, before: function, after: function, stop: function, start: function, next: function, cancel: function, i: number, timeout: number, frame: function}} * @constructor
 *
 *
 * @param params
 * @returns {AnimationFrames|*}
 * @constructor
 */
const AnimationFrames = function (params = {}) {
    if (!(this instanceof AnimationFrames)) {
        return new AnimationFrames(params);
    }

    this.i = 0;
    this.id = params.id ? params.id : 'ID' + random.string().toUpperCase();
    this.timeout = params.timeout >= 0 ? params.timeout : AnimationFrames.timeout;
    this.paused = !!params.paused;
    this.started = false;
    this.started = false;
    this.canceled = false;
    this._callback_before = params.before ? params.before : null;
    this._callback_after = params.after ? params.after : null;
    this._callbacks_frames_stack = {};
    this._request_animation_frame_id = null;

    Object.keys(params).forEach((key) => {
        if (!this.hasOwnProperty(key)) this[key] = params[key];
    });

    this.drawAnimationFrames = function () {
        if (this.canceled) return;

        this.nextAnimationFrames(this.paused);

        if (this.timeout && this.timeout > 0) {
            setTimeout(() => {
                this._request_animation_frame_id = requestAnimationFrame(() => {this.drawAnimationFrames()})
            }, this.timeout);
        } else {
            this._request_animation_frame_id =  requestAnimationFrame(() => {this.drawAnimationFrames()});
        }
    }

    this.nextAnimationFrames = function (paused) {
        this.i++;

        if (this._callback_before){
            this._callback_before.call(this, this);
        }

        if (!paused) {
            Object.values(this._callbacks_frames_stack).forEach((frame) => {

                if (frame && typeof frame.run === 'function') {
                    frame.run.call(frame, this);
                } else if (typeof frame === 'function') {
                    frame.call(this, this);
                }
            })
        }

        if (this._callback_after) {
            this._callback_after.call(this, this);
        }
    }

    this.next = function () {
        this.nextAnimationFrames(false);
    };

    this.before = function (callback) { this._callback_before = callback };
    this.after = function (callback) { this._callback_after = callback };
    this.stop = function () {
        this.paused = true;
    };
    this.cancel = function () {
        cancelAnimationFrame(this._request_animation_frame_id);
        this.canceled = true;
    };
    this.pause = function () {
        this.paused = !this.paused;
    };

    /* todo: ticks for testing */
    this._callbacks_ticks = []
    this.tick = function (callback) {
        if (callback instanceof Function)
            this._callbacks_ticks.push(callback);
    };
    this._call_callbacks_ticks = function (frame) {
        let that = this;
        this._callbacks_ticks.forEach((callback) => {
            if (callback instanceof Function)
                callback.call(frame, that);
        })
    };

    this.start = function () {
        this.paused = false;

        if (this.started === false) {
            this.started = true;
            this.drawAnimationFrames()
        }
    };

    this.frame = function (frame) {
        if (typeof frame === 'function') {
            frame = {run: frame};
        }

        if (!frame.id || !isString(frame.id)) frame.id = 'frame_' + random.string(6);

        if (frame && typeof frame.init === 'function') {
            frame.init.call(frame, this);
        }

        this._callbacks_frames_stack[frame.id] = frame;
        return frame.id;
    };

    if (!this.paused) {
        this.start();
    }
}

AnimationFrames.timeout = 1000;


export default AnimationFrames;
