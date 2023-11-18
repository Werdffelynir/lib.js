import Point from "./Point";
import convertRGBtoHEX from "../../static/convertRGBtoHEX";

/*
direction : "ltr"
fillStyle : "#ff8c00"
filter : "none"
font : "10px sans-serif"
fontKerning : "auto"
fontStretch : "normal"
fontVariantCaps : "normal"
globalAlpha : 1
globalCompositeOperation : "source-over"
imageSmoothingEnabled : true
imageSmoothingQuality : "low"
letterSpacing : "0px"
lineCap : "butt"
lineDashOffset : 0
lineJoin : "miter"
lineWidth : 1
miterLimit : 10
shadowBlur : 0
shadowColor : "#878787"
shadowOffsetX : 0
shadowOffsetY : 0
strokeStyle : "#000000"
textAlign : "left"
textBaseline : "top"
textRendering : "auto"
wordSpacing : "0px"
*/
export const GraphicContextStyles = {
    direction : "ltr",
    fillStyle : "#ff8c00",
    filter : "none",
    font : "14px/1 sans, sans-serif, Ubuntu",
    fontKerning : "auto",
    fontStretch : "normal",
    fontVariantCaps : "normal",
    globalAlpha : 1,
    globalCompositeOperation : "source-over",
    imageSmoothingEnabled : true,
    imageSmoothingQuality : "low",
    letterSpacing : "0px",
    lineCap : "butt",
    lineDashOffset : 0,
    lineJoin : "miter",
    lineWidth : 1,
    miterLimit : 10,
    shadowBlur : 0,
    shadowColor : "#878787",
    shadowOffsetX : 0,
    shadowOffsetY : 0,
    strokeStyle : "#000000",
    textAlign : "left",
    textBaseline : "top",
    textRendering : "auto",
    wordSpacing : "0px",
}

/**
 *
 * <pre>
 *      const graphic = new Graphic({
 *          context: context,
 *          closePath: true,
 *          anticlockwise: true,
 *          styles: [GraphicContextStyles],
 *      })
 *
 *      // Properties:
 *
 *      graphic.context
 *      graphic.closePath
 *      graphic.styles
 *
 *      // Methods
 *
 *      //
 *      graphic.fill ( fillStyle, fillRule )
 *
 *      //
 *      graphic.stroke ( strokeStyle, path )
 *
 *      //
 *      graphic.begin ()
 *      graphic.close ()
 *      graphic.save ()
 *      graphic.restore ()
 *
 *      //
 *      graphic.shadow (x, y, blur, color)
 *      graphic.clearShadow ()
 *
 *      //
 *      graphic.setContextStyle ( [GraphicContextStyle] )
 *      graphic.setContextStyle ( {
 *          shadowColor: '',
 *          fillStyle: '',
 *          strokeStyle: '',
 *          globalAlpha: 1,
 *          lineWidth: 1,
 *          lineCap: "butt",
 *          lineJoin: "miter",
 *          textAlign: 'left',
 *          textBaseline: 'top',
 *      } )
 *
 *      //
 *      graphic.circle ( x, y, radius )
 *
 *      //
 *      graphic.ellipse ( x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise, closePath )
 *
 *      //
 *      graphic.line ( x1, y1, x2, y2 )
 *      graphic.line ( [Point], [Point] )
 *
 *      //
 *      graphic.rect ( x, y, width, height )
 *
 *      //
 *      graphic.rectRound ( x, y, width, height, radius )
 *
 *      //
 *      graphic.fillRect ( x, y, width, height )
 *
 *      //
 *      graphic.strokeRect ( x, y, width, height )
 *
 *      //
 *      graphic.shape ( points )
 *      graphic.shape ( points, closePath )
 *
 *      //
 *      graphic.write ( text, x, y, styles, asStroke )
 *
 *      //
 *      graphic.toString ()
 *
 * </pre>
 *
 * @param parameters
 * @returns {Graphic}
 * @constructor
 */
function Graphic(parameters = {}) {
    if (parameters instanceof HTMLCanvasElement) {
        parameters = {context: parameters.getContext('2d')};
    }
    if (parameters instanceof CanvasRenderingContext2D) {
        parameters = {context: parameters};
    }
    if (!(this instanceof Graphic)) {
        return new Graphic(parameters);
    }

    const applyParameter = (key, callback) => {
        if (parameters[key] !== undefined) {
            callback.call(this, parameters[key]);
        }
    };

    /** @type {null|CanvasRenderingContext2D}*/
    this.context = null;
    this.closePath = true;
    this.anticlockwise = false;

    /**
     * Use setContextStyle( GraphicContextStyles )
     * @type {{lineDashOffset: number, shadowOffsetX: number, fontStretch: string, shadowOffsetY: number, imageSmoothingEnabled: boolean, shadowBlur: number, wordSpacing: string, imageSmoothingQuality: string, lineWidth: number, fontKerning: string, globalAlpha: number, textRendering: string, shadowColor: string, direction: string, textBaseline: string, strokeStyle: string, fontVariantCaps: string, textAlign: string, globalCompositeOperation: string, letterSpacing: string, lineJoin: string, miterLimit: number, filter: string, lineCap: string, fillStyle: string, font: string}}
     */
    this.styles = GraphicContextStyles;

    applyParameter('context', (value) => {this.context = value});

    applyParameter('closePath', (value) => {this.closePath = !!value});

    applyParameter('anticlockwise', (value) => {this.anticlockwise = !!value});

    applyParameter('styles', (value) => {
        Object.keys(value).forEach((key) => {
            if (GraphicContextStyles.hasOwnProperty(key)) this.styles[key] = value[key];
        })
    });

    Object.keys(parameters).forEach((key) => {
        if (!this.hasOwnProperty(key)) {
            this[key] = parameters[key];
        }
    });

    if (!this.context || !(this.context instanceof CanvasRenderingContext2D)) {
        throw new Error('parameter "context" is not set.')
    }

    this.width = this.context.canvas.width;
    this.height = this.context.canvas.height;

    /**
     * <pre>
     * direction: "rtl" | "ltr" | "inherit"
     * font: "bold 14px/1 sans, sans-serif, Ubuntu" | "italic small-caps bold 16px/2 cursive" | "bold italic large serif" | "caption" | "120% sans-serif"
     * textAlign: "center" | "end" | "left" | "right" | "start"
     * textBaseline: "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top"
     * lineCap: "round" | "butt" | "square"
     * lineJoin: "round" | "bevel" | "miter"
     * lineWidth: 1 | 5
     * lineDashOffset: 0
     * letterSpacing: "0px" | "20px"
     * wordSpacing: "0px" | "20px"
     * miterLimit: 10
     * fillStyle: "orange" | "#000000" | "rgb(255, 0, 110)" | "rgba(255, 0, 110, 0.4)"
     * strokeStyle: "orange" | "#000000" | "rgb(255, 0, 110)" | "rgba(255, 0, 110, 0.4)"
     * shadowColor: "orange" | "#000000" | "rgb(255, 0, 110)" | "rgba(255, 0, 110, 0.4)"
     * shadowOffsetX: 0
     * shadowOffsetY: 0
     * </pre>
     *
     * @param {{GraphicContextStyles}} styles
     */
    this.setContextStyle = function (styles) {
        Object.keys(styles).forEach((key) => {
            if (GraphicContextStyles.hasOwnProperty(key)) {
                if (this.context[key] !== styles[key]) {
                    this.context[key] = this.styles[key] = styles[key];
                }
            }
        });
    };
    /**
     * <pre>
     * image: CanvasImageSource, dx: number, dy: number
     * image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number
     * image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number
     * </pre>
     * @param img
     * @param x
     * @param y
     */
    this.image = function (img, x = 0, y = 0) {
        this.context.drawImage.apply(this.context, arguments.length === 1 ? [img, x, y] : arguments)
        return this;
    }
    /**
     * (image: CanvasImageSource, repetition: string | null) "repeat" "repeat-x" "repeat-y" "no-repeat"
     * @param {CanvasImageSource} img
     * @param repetition
     */
    this.pattern = function (img, repetition = "no-repeat") {
        return this.context.createPattern(img, repetition)
    }
    this.fillPattern = function (img, repetition = "no-repeat") {
        this.fill(this.pattern(img, repetition));
        return this;
    }
    this.fill = function (fillStyle, fillRule = undefined) {
        if (fillStyle)
            this.context.fillStyle = fillStyle;

        this.context.fill(fillRule);
        return this;
    };
    this.stroke = function (strokeStyle, path = undefined) {
        if (strokeStyle)
            this.context.strokeStyle = strokeStyle;

        this.context.stroke();
        return this;
    };
    this.begin = function () {
        this.context.beginPath();
        return this;
    };
    this.close = function () {
        this.context.closePath();
        return this;
    };
    this.save = function () {
        this.context.save();
        return this;
    };
    this.restore = function () {
        this.context.restore();
        return this;
    };
    this.opacity = this.alpha = function (alpha = 1) {
        this.context.globalAlpha = alpha;
        return this;
    };
    this.clear = this.clearRect = function (x = 0, y = 0, w = this.width, h = this.height) {
        this.context.clearRect(x, y, w, h);
        return this;
    };
    this.shadow = function (x, y, blur, color) {
        this.context.shadowOffsetX = x;
        this.context.shadowOffsetY = y;
        this.context.shadowBlur = blur;
        this.context.shadowColor = color;
        return this;
    };
    this.clearShadow = function () {
        this.context.shadowOffsetX = this.context.shadowOffsetY = this.context.shadowBlur = 0;
        return this;
    };
    this.circle = function (x, y, radius) {
        this.rectRound(x - (radius / 2), y - (radius / 2), radius, radius, radius / 2);

        return this;
    };
    this.ellipse = function (x, y, radiusX, radiusY, rotation = 0, startAngle = 0, endAngle = 2 * Math.PI, anticlockwise = false, closePath = false) {
        closePath = closePath !== undefined ? !!closePath : this.closePath;
        this.context.save();
        this.context.beginPath();
        this.context.translate(x, y);
        this.context.rotate(rotation);
        this.context.scale(radiusX / radiusY, 1);
        this.context.arc(0, 0, radiusY, startAngle, endAngle, this.anticlockwise = anticlockwise);
        this.context.restore();
        if (closePath)
            this.context.closePath();

        return this;
    };
    this.line = function (x1, y1, x2, y2) {
        if (arguments.length === 2 && x1.toString() === '[Point]' && y1.toString() === '[Point]') {
            const point_a = x1;
            const point_b = y1;
            x1 = point_a.x;
            y1 = point_a.y;
            x2 = point_b.x;
            y2 = point_b.y;
        }

        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);

        if (this.closePath)
            this.context.closePath();

        return this;
    };
    this.rect = function (x, y, width, height) {
        this.context.beginPath();
        this.context.rect(x, y, width, height);

        if (this.closePath)
            this.context.closePath();

        return this;
    };
    this.rectRound = function (x, y, width, height, radius) {
        x = x - (width / 2);
        y = y - (height / 2);
        this.context.beginPath();
        this.context.moveTo(x + radius, y);
        this.context.arcTo(x + width, y, x + width, y + height, radius);
        this.context.arcTo(x + width, y + height, x, y + height, radius);
        this.context.arcTo(x, y + height, x, y, radius);
        this.context.arcTo(x, y, x + width, y, radius);

        if (this.closePath)
            this.context.closePath();

        return this;
    };
    this.fillRect = function (x, y, width, height, strokeLineWidth = null) {
        this.context.fillRect(x, y, width, height);

        if (strokeLineWidth !== null && strokeLineWidth >= 0) {
            this.context.save();
            this.context.lineWidth = strokeLineWidth;
            this.strokeRect(x, y, width, height)
            this.context.restore();
        }
        return this;
    }
    this.strokeRect = function (x, y, width, height) {
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.stroke();

        if (this.closePath)
            this.context.closePath();

        return this;
    }
    this.shape = function (points = [], closePath) {
        closePath = closePath !== undefined ? !!closePath : this.closePath;
        this.context.beginPath();
        points.forEach((point) => {
            if (point instanceof Point || (point.x !== undefined && point.y !== undefined)) {
                this.context.lineTo(point.x, point.y);
            }
        });

        if (closePath)
            this.context.closePath();

        return this;
    }
    this.write = function (text, x, y, styles, asStroke = false) {
        if (styles && typeof styles === 'object') {
            this.setContextStyle(styles);
        }

        if (asStroke) {
            this.context.strokeText(text, x, y);
        } else {
            this.context.fillText(text, x, y);
        }

        return this;
    }

    this.getPixelColor = function (x, y) {
        if (arguments.length === 1 && x.x !== undefined && x.y !== undefined) {
            y = x.y;
            x = x.x;
        }

        const imageData = this.context.getImageData(x, y, 1, 1);

        return {
            red: imageData.data[0],
            green: imageData.data[1],
            blue: imageData.data[2],
            alpha: imageData.data[3],
            isTransparent () {
                return imageData.data[3] === 0
            },
            toRGB () {
                return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
            },
            toHEX () {
                return convertRGBtoHEX(imageData.data[0], imageData.data[1], imageData.data[2])
            },
        }
    }

    /**
     *
     * .clip({ x:0, y:0 }, function (graphic, context) {});
     * @param {function(Graphic: *, CanvasRenderingContext2D: context) | Object} that
     * @param {function(Graphic: *, CanvasRenderingContext2D: context)} callback
     * @returns {*&{clear(),draw()}}
     */
    this.clip = function (that, callback = (graphic, context) => {} ) {
        if (arguments.length === 1) {
            callback = that;
            that = {};
        }

        that.clear = () => {
            this.context.clearRect(0,0, 2000, 2000)
        }
        that.draw = (re_callback = undefined) => {
            if (re_callback && re_callback !== callback)
                callback = re_callback;

            this.context.save();
            callback.call(that, this, this.context);
            this.context.restore();
        }

        that.draw ();

        return that;
    }


    this.toString = () => '[Graphic]';

    this.setContextStyle(this.styles);
}

Graphic.LINE_CAPS = {BUTT: "butt", ROUND: "round", SQUARE: "square"};
Graphic.LINE_JOINS = {BEVEL: "bevel", ROUND: "round", MITER: "miter"};
Graphic.TEXT_ALIGN = {CENTER: "center", END: "end", LEFT: "left", RIGHT: "right", START: "start"};
Graphic.TEXT_BASELINE = {ALPHABETIC: "alphabetic", BOTTOM: "bottom", HANGING: "hanging", IDEOGRAPHIC: "ideographic", MIDDLE: "middle", TOP: "top"};
Graphic.TEXT_FONT = {
    NORMAL: "normal 14px sans, Ubuntu",
    BOLD: "bold 14px sans, Ubuntu",
    ITALIC: "italic 14px sans, Ubuntu",
    BOLD_ITALIC: "bold italic 14px sans, serif, sans-serif",
    SMALL_CAPS: "small-caps normal 14px cursive, serif, sans-serif",
    ITALIC_SMALL_CAPS: "italic small-caps bold 14px/2 cursive, serif, sans-serif",
    ITALIC_LARGE_CAPS: "italic small-caps bold 16px/2 cursive, serif, sans-serif",
    CAPTION: "caption",
    STATUSBAR: "status-bar",
};
Graphic.TEXT_FORMATS = {
    x: 10,
    y: 10,
    text: '',
    font: 'normal 14px sans-serif',
    color: '#000000',
    align: 'left',
    baseline: 'top',
    thickness: false,
    alpha: false,
};

Graphic.GraphicContextStyles = GraphicContextStyles;

export default Graphic;
