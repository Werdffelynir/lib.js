


class Sprite {
    constructor(image, swidth = 0, sheight = 0) {
        if (!swidth) swidth = image.width;
        if (!sheight) sheight = image.height;
        if (!(image instanceof Image)) 
            console.error('image is not type of Image');

        this.image = image;
        this.width = image.width;
        this.height = image.height;
        this.swidth = swidth;
        this.sheight = sheight;
        this.grid = {
            width: Math.ceil(this.width / this.swidth),
            height: Math.ceil(this.height / this.sheight)
        };
    }

    getPosition(x = 0, y = 0, callback = null) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = this.swidth;
        canvas.height = this.sheight;
        context.drawImage(this.image, 
            x, y, this.swidth, this.sheight,
            0, 0, this.swidth, this.sheight
        )

        if (callback) {
            callback.call(context, context);
        }

        return canvas;
    }

    getIndex(index = 0, callback = null) {
        const grid = this.grid;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = this.swidth;
        canvas.height = this.sheight;

        let x = index * this.swidth;
        let y = 0;

        if (x >= this.width) {
            y = parseInt(x / this.width) * this.sheight;
            x = (x % this.width)
        }

        if (callback) {
            callback.call(context, context);
        }

        context.drawImage(this.image, 
            x, y, this.swidth, this.sheight,
            0, 0, this.swidth, this.sheight
        )

        return canvas;

    }

    animate(sprites, delay = 500, is_loop = true) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = this.swidth;
        canvas.height = this.sheight;

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


export default Sprite;
