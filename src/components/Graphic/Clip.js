/**
 *
 * @param options
 * @param callback
 * @returns {Clip|*}
 * @constructor
 */
function Clip(options, callback = undefined) {
    if (!(this instanceof Clip)) {
        return new Clip(options, callback);
    }

    this.x = 0;
    this.y = 0;
    this.widht = 0;
    this.height = 0;

    this.toString = () => '[Clip]';

    this.toObject = () => {
        const params = Object.assign({}, this);
        delete params['toString'];
        delete params['toObject'];
        return params;
    };

    Object.keys(options).forEach((param) => {
        this[param] = options[param];
    });

    if (typeof callback === 'function')
        callback.call(this);
}


export default Clip;
