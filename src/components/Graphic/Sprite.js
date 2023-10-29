/**
 *
 * <pre>
 * const sprite = new Sprite(characters_icon_image, 64, 64);
 * sprite.resize(128, 128);
 * const sprite1 = sprite.getIndex(1, (context) => {
 *     context.canvas.width = (context.canvas.width * 2)
 *     context.canvas.height = (context.canvas.height * 2)
 *     context.scale(2, 2);
 * });
 * const sprite2 = sprite.getIndex(2, (context) => {
 *     context.setTransform(1, 0, 0, -1, 0, sprite.width);
 * });
 * </pre>
 *
 *
 */
class Sprite {
    static mirrorVertical;
    static mirrorHorizontal;
    constructor(image, sprite_width = 0, sprite_height = 0) {
        if (!sprite_width) sprite_width = image.width;
        if (!sprite_height) sprite_height = image.height;
        if (!(image instanceof Image)) 
            console.error('image is not type of Image');

        this.width = sprite_width;
        this.height = sprite_height;
        this.image = image;
        this.image_width = image.width;
        this.image_height = image.height;
        this.grid = {
            width: Math.ceil(this.image_width / this.width),
            height: Math.ceil(this.image_height / this.height)
        };
    }

    resize_width = null;
    resize_height = null;
    resize_stretch = false;

    resize(width, height, stretch = true) {
        this.resize_width = width;
        this.resize_height = height;
        this.resize_stretch = stretch;
    }

    getImage(){
        return this.image;
    }
    getCanvas(callback){
        this.getPosition(0, 0, this.width, this.height, callback);
    }
    rotate(){
        return this.image;
    }
    mirrorVertical(canvas){
        // const context = canvas.getContext('2d');
        // context.setTransform(-1, 0, 0, 1, this.width, 0);
        return Sprite.mirrorVertical(canvas);
    }
    mirrorHorizontal(canvas){
        // const context = canvas.getContext('2d');
        // context.setTransform(1, 0, 0, -1, 0, this.height);
        return Sprite.mirrorHorizontal(canvas);
    }
    // mirror vertical
    // mirror horizontal
    getPosition(x = 0, y = 0, sprite_width = this.width, sprite_height = this.height, callback = null) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = this.resize_width ? this.resize_width : sprite_width;
        canvas.height = this.resize_height ? this.resize_height : sprite_height;

        if (callback) {
            context.save();
            callback.call(context, context);
            context.restore();
        }

        sprite_width = (!this.resize_stretch && this.resize_width) ? this.resize_width : sprite_width;
        sprite_height = (!this.resize_stretch && this.resize_height) ? this.resize_height : sprite_height;
        let dwidth = this.resize_width ? this.resize_width : sprite_width;
        let dheight = this.resize_height ? this.resize_height : sprite_height;

        context.drawImage(this.image,
            x, y, sprite_width, sprite_height,
            0, 0, dwidth, dheight
        )
        return canvas;
    }

    /**
     *
     * @param index
     * @param callback
     * @returns {HTMLCanvasElement}
     */
    getIndex(index = 0, callback = null) {
        let x = index * this.width;
        let y = 0;

        if (x >= this.image_width ) {
            y = parseInt(x / this.image_height ) * this.height;
            x = (x % this.image_width)
        }
        const canvas = this.getPosition(x,y, this.width, this.height, callback);

        return canvas;
    }

    animate(sprites, delay = 500, is_loop = true) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;

        const imax = sprites.length - 1;
        let once = true;
        let paused = false;
        let i = 0;
        const animation = () => {
            if (paused) return;

            const img = new Image();
            img.src = sprites[i].toDataURL();
            img.onload = () => {
                context.drawImage(img, 0, 0);
            }
            
            i ++;
            
            if (i > imax) { 
                i = 0;

                if (once) { 
                    paused = true;
                }
            }

            setTimeout(animation, delay)
        };

        return {
            sprite: canvas,
            play(loop = false){
                once = !loop;
                paused = false;
                animation();
            },
            stop(){
                paused = true;
            },
        }
    }
}

Sprite.loadSprite = function (src, sprite_width = 0, sprite_height = 0, callback = null) {
    const image = new Image();
    image.addEventListener("load", function () {
        const sprite = new Sprite(image, sprite_width, sprite_height);
        if (callback instanceof "function")
            callback.call(sprite, sprite);
    });
    image.src = src;
}
Sprite.mirrorVertical = function (canvas){
    /** @type CanvasRenderingContext2D */
    const context = canvas.getContext('2d');
    context.save();
    context.scale(-1, 1);
    context.drawImage(canvas, 0, 0, canvas.width *- 1, canvas.height);
    context.restore();
    return canvas;
}
Sprite.mirrorHorizontal = function (canvas){
    /** @type CanvasRenderingContext2D */
    const context = canvas.getContext('2d');
    context.save();
    context.scale(1, -1);
    context.drawImage(canvas, 0, 0, canvas.width, canvas.height *- 1);
    context.restore();
    return canvas;
}

export default Sprite;
