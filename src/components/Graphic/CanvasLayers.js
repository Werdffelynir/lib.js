import createElement from "../../static/createElement";
import stylizer from "../../static/stylizer";
import Point from "./Point";


/**
 * <pre>
 *
 *  const Layers = new CanvasLayers( {canvas: [HTMLCanvasElement]} );
 *
 *  const Layers = new CanvasLayers({
 *      canvas: [HTMLCanvasElement],
 *      prefix: '',
 *      width: 460,
 *      height: 320,
 *      fullsize: false,
 *  });
 *
 *  const layerScene = Layers.createLayer( layerOpt );
 *  const layerScene = Layers.createLayer({
 *      id: 'scene',        // ID name
 *      x: 0,               // position
 *      y: 0,               // ...
 *      deep: 1,            // layer deep (set z-index)
 *      width: 400,         // canvas size
 *      height: 200,        // ...
 *      mouseevent: true,   // enable mouse events
 *      readFrequently: false,  // enable mouse events
 *      init(){},           // custom method
 *  })
 *
 *  layerScene.id                // getter
 *  layerScene.isHidde           // getter
 *  layerScene.isActive          // getter
 *  layerScene.canvas            // getter
 *  layerScene.context           // getter
 *  layerScene.mouseevent        // getter
 *  layerScene.x                 // setter & getter
 *  layerScene.y                 // setter & getter
 *  layerScene.deep              // setter & getter
 *  layerScene.width             // setter & getter
 *  layerScene.height            // setter & getter
 *  layerScene.active            // only setter
 *  layerScene.hide              // only setter
 *  layerScene.onMousedown       // method set callback function for event 'mousedown', target is canvas
 *  layerScene.onMouseup         // method set callback function for event 'mouseup'
 *  layerScene.onMousemove       // method set callback function for event 'mousemove'
 *
 *  Layers.get('scene').onMousedown(function (event, position) {
 *      console.log('onMousedown', event, position)
 *  });
 *
 *  Layers.addLayer ( layer )
 *
 *  Layers.add ( layerOpt )
 *  Layers.add ({
 *      id: 'scene',
 *      x: 0,
 *      y: 0,
 *      deep: 1,
 *      width: 400,
 *      height: 200,
 *  })
 *
 *  Layers.get ( layerId )
 *
 *  Layers.getList ()
 *
 *  Layers.getDefault ()
 *
 *  Layers.setDefaultLayer ( layerId )
 *
 *  Layers.hide ( layerId )
 *
 *  Layers.show ( layerId )
 *
 *  Layers.delete ( layerId )
 *
 *  Layers.getMouseEventPoint ( event )
 *
 * </pre>
 * @param options
 *      canvas: [HTMLCanvasElement],
 *      prefix: '',
 *      width: 460,
 *      height: 320,
 *      fullsize: false,
 *      mouseevent: false,
 *      readFrequently: false,
 * @returns {CanvasLayers}
 * @constructor
 */
const CanvasLayers = function (options) {
    if (!(this instanceof CanvasLayers)) {
        return new CanvasLayers(options);
    }

    const applyOption = (optionKey, callback) => {
        if (options[optionKey] !== undefined) {
            callback.call(this, options[optionKey]);
        }
    };

    const initWrapper = (element) => {
        this.wrapper = element;

        this.paremt = {
            element: element,
            width: this.wrapper.offsetWidth,
            height: this.wrapper.offsetHeight,
        };

        stylizer(this.wrapper, {
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
        });
    };

    this.prefix = '';
    this.default = null;
    this.width = 460;
    this.height = 320;
    this.wrapper = null;
    this.layers = [];

    this.fullsize = false;
    this.fullscreen = false;
    this.mouseevent = false;
    this.paremt = {
        element: null,
        width: null,
        height: null,
    };

    /**
     *
     * <pre>
     *  .createLayer({
     *      id: 'scene',
     *      x: 0,
     *      y: 0,
     *      deep: 1,
     *      mouseevent: true,
     *      readFrequently: false,
     *      width: 400,
     *      height: 200,
     *      init(){},       // custom
     *  })
     *
     * </pre>
     * @param opts
     * @returns {*|{id: string, deep: number, canvas: HTMLCanvasElement, mouseevent: boolean, readFrequently: boolean, isHidde: boolean, active, isActive: boolean, delete, hide, x: (*|number), width: number, context: CanvasRenderingContext2D, y: (*|number), id: (*|string), height: number}}
     */
    this.createLayer = function (opts = {}) {
        const deep = opts.deep ? opts.deep : (this.layers.length + 1);
        const canvas = opts.canvas ? opts.canvas : createElement('canvas');
        const width = opts.width ? opts.width : this.width;
        const height = opts.height ? opts.height : this.height;
        const id = opts.id ? opts.id : (this.prefix ? this.prefix + '_' : '') + 'layer_' + deep;
        const x = opts.x ? opts.x : 0;
        const y = opts.y ? opts.y : 0;
        const mouseevent = opts.mouseevent !== undefined ? !!opts.mouseevent : this.mouseevent;
        const readFrequently = opts.readFrequently !== undefined ? opts.readFrequently : false;

        const behavior = {active: true, hidden: false};
        const events = {mousedown: null, mouseup: null, mousemove: null};

        if (mouseevent) {
            Object.keys(events).forEach((eventName) => {
                canvas.addEventListener(eventName, (event) => {
                    if (typeof events[eventName] === 'function')
                        events[eventName].call(this, event, this.getMouseEventPoint(event));
                });
            });
        }

        stylizer(canvas, {
            zIndex: 1000 + deep,
            position: 'absolute',
            marginLeft: x + 'px',
            marginTop: y + 'px',
        })

        canvas.setAttribute('data-id', id);
        canvas.width = width;
        canvas.height = height;

        const retrieve = {
            id: id,
            parameters: {
                x: x,
                y: y,
                deep: deep,
                width: canvas.width,
                height: canvas.height,
            },
            get isActive() {
                return behavior.active;
            },
            get isHidde() {
                return behavior.hidden;
            },
            get mouseevent() {
                return mouseevent
            },
            get readFrequently() {
                return readFrequently
            },
            get x() {
                return this.parameters.x
            },
            set x(value) {
                stylizer(canvas, {marginLeft: value + 'px'})
                return this.parameters.x = value
            },
            get y() {
                return this.parameters.y
            },
            set y(value) {
                stylizer(canvas, {marginTop: value + 'px'})
                return this.parameters.y = value
            },
            get deep() {
                return this.parameters.deep
            },
            set deep(value) {
                stylizer(canvas, {zIndex: 1000 + value})
                return this.parameters.deep = value
            },
            get width() {
                return this.parameters.width
            },
            set width(value) {
                stylizer(canvas, {width: value})
                return this.parameters.width = value
            },
            get height() {
                return this.parameters.height
            },
            set height(value) {
                stylizer(canvas, {height: value})
                return this.parameters.height = value
            },
            set active(value) {
                behavior.active = !!value
            },
            set hide(value) {
                value = !!value;
                let styles = {};
                if (value) {
                    canvas.hidden = true;
                    styles = {visibility: 'hidden'};
                } else {
                    canvas.hidden = false;
                    styles = {visibility: 'visible'};
                }

                behavior.hidden = value;
                stylizer(this.canvas, styles);
            },
            onMousedown (callback){
                if (typeof callback !== 'function') throw new Error('Method argument is not type of "function"');
                events.mousedown = callback;
            },
            onMouseup (callback){
                if (typeof callback !== 'function') throw new Error('Method argument is not type of "function"');
                events.mouseup = callback;
            },
            onMousemove (callback){
                if (typeof callback !== 'function') throw new Error('Method argument is not type of "function"');
                events.mousemove = callback;
            },
            canvas: canvas,
            context: canvas.getContext('2d', { willReadFrequently: !!readFrequently }),
        };

        // todo: tmp
        Object.keys(opts).forEach((key) => {
            if (!retrieve.hasOwnProperty(key)) {
                retrieve[key] = opts[key];
            }
        });

        return retrieve;
    }


    /**
     *
     * <pre>
     *     layer = .createLayer( {id: 'scene', init(){}} )
     *     .addLayer( layer )
     *
     * </pre>
     */
    this.addLayer = function (layer) {
        if (!(layer.canvas instanceof HTMLCanvasElement))
            throw new Error('Can\'t add new canvas layer, parameter is not canvas object! ');

        stylizer(layer.canvas, {
            visibility: 'visible', // 'visible|hidden',
            background: 'transparent',
        });

        this.layers.push(layer);
        this.wrapper.appendChild(layer.canvas);

        return this;
    }


    /**
     * Created and added new layer
     *
     * <pre>
     *     .add( {id: 'scene', init(){}} )
     *
     * </pre>
     */
    this.add = function (layerOpt) {
        const layer = this.createLayer(layerOpt);
        this.addLayer(layer);

        return this;
    };

    /**
     *
     * <pre>
     *     .getList() // { ID : LAYER, ID : LAYER, }
     *
     * </pre>
     */
    this.getList = function () {
        const layers = {};
        this.layers.forEach((layer, index) => {
            layer.index = index;
            layers[layer.id] = layer;
        });
        return layers;
    };

    /**
     *
     * <pre>
     *     .getDefault().canvas
     *     .getDefault().context
     *
     * </pre>
     * CanvasRenderingContext2D|HTMLCanvasElement|
     * @returns {null|{id: string, deep: number, canvas: HTMLCanvasElement, isHidde: boolean, active, isActive: boolean, delete, hide, x: (*|number), width: number, context: CanvasRenderingContext2D, y: (*|number), id: (*|string), height: number}|*}
     */
    this.getDefault = function (opt = null) {
        if (opt) {
            switch (opt) {
                case 'canvas':
                    return this.default.canvas;
                case 'context':
                    return this.default.context;
                case 'id':
                    return this.default.id;
            }
        }

        return this.default;
    };

    /**
     *
     * <pre>
     *     .setDefaultLayer('main')
     * </pre>
     *
     * @param layerId
     */
    this.setDefaultLayer = function (layerId) {
        this.get(layerId).canvas.setAttribute('data-id', 'default');
        this.default = this.get(layerId);
    }

    /**
     * <pre>
     *     .get('main')
     *
     * </pre>
     *
     *
     * @param layerId
     * @returns {*}
     */
    this.get = function (layerId) {
        return this.layers.find(layer => layer.id === layerId);
    };


    /**
     * <pre>
     *  .hide('main')
     *
     * </pre>
     */
    this.hide = function (layerId) {
        this.layers.find(layer => layer.id === layerId).hide = true;
    };


    /**
     *
     * <pre>
     * .show('main')
     *
     * </pre>
     */
    this.show = function (layerId) {
        this.layers.find(layer => layer.id === layerId).hide = false;
    };


    /**
     *
     * <pre>
     * .delete('main')
     *
     * </pre>
     */
    this.delete = function (layerId) {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i] && this.layers[i].id === layerId) {

                this.wrapper.removeChild(this.layers[i].canvas)
                delete this.layers[i];

                break;
            }
        }
    };


    /**
     *
     */


    applyOption('canvas', (canvasElement) => {
        let wrapper = null;

        if (canvasElement && typeof canvasElement === 'string') {
            canvasElement = document.querySelector(canvasElement);
        }

        if (canvasElement && canvasElement instanceof HTMLElement) {
            wrapper = canvasElement;

            if (canvasElement.querySelector('canvas')) {
                canvasElement = canvasElement.querySelector('canvas')
            } else {
                canvasElement = createElement('canvas');
            }
        }

        if (canvasElement && canvasElement instanceof HTMLCanvasElement) {
            if (!wrapper && canvasElement.parentNode) {
                wrapper = canvasElement.parentNode
            }

            const layer = this.createLayer({
                id: canvasElement.id ? canvasElement.id : 'default',
                canvas: canvasElement,
            });

            layer.canvas.setAttribute('data-id', 'default');
            this.default = layer;
            initWrapper(wrapper);
            this.addLayer(layer);
        }

        if (!this.wrapper)
            throw new Error('Option "canvas" is not valid! Set pleas "HTMLCanvasElement" or "HTMLElement" as wrapper');

    });

    applyOption('prefix', (value) => {
        this.prefix = value;
    });

    applyOption('width', (value) => {
        this.default.canvas.width = this.width = value;
    });

    applyOption('height', (value) => {
        this.default.canvas.height = this.height = value;
    });

    applyOption('fullsize', (value) => {
        if (value) {
            this.default.canvas.width = this.width = this.wrapper.offsetWidth;
            this.default.canvas.height = this.height = this.wrapper.offsetHeight;
        }
        this.fullsize = !!value;
    });

    applyOption('fullscreen', (value) => {
        this.fullscreen = !!value;
    });

    applyOption('mouseevent', (value) => {
        this.mouseevent = !!value;
    });

    this.getMouseEventPoint = function (event) {
        const rect = event.target.getBoundingClientRect();
        // relationship bitmap vs. element for x
        const scaleX = event.target.width / rect.width;
        // relationship bitmap vs. element for y
        const scaleY = event.target.height / rect.height;
        // scale mouse coordinates after they have
        const x = (event.clientX - rect.left) * scaleX;
        // been adjusted to be relative to element
        const y = (event.clientY - rect.top) * scaleY;

        return new Point(x, y)
    }

    Object.keys(options).forEach((name) => {
        if (this.hasOwnProperty(name)) return;
        this[name] = options[name];
    });

} // END CanvasLayers


export default CanvasLayers;
