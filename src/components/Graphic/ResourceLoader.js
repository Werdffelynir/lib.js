

const isSrcStack = function (srcStack) {
    return srcStack && typeof srcStack !== 'object';
}

const array2srcStack = function (srcStack) {
    if (Array.isArray(srcStack)) {
        const obj = {};
        srcStack.map(function (item) {
            obj[Math.random().toString(32).slice(2)] = item
        });
        srcStack = obj;
    }
    return srcStack;
}

/**
 * ResourceLoader
 *
 * ResourceLoader.javascript ( {name: src, name: src}, function (list) {} )
 * ResourceLoader.javascript ( [src, src], function (list) {} )
 * ResourceLoader.images ( {name: src, name: src}, function (list) {} )
 * ResourceLoader.audios ( {name: src, name: src}, function (list) {} )
 * ResourceLoader.videos ( {name: src, name: src}, function (list) {} )
 *
 * Module of Expansion
 * Assign static as instance methods
 */
function ResourceLoader() {
    if (!(this instanceof ResourceLoader)) {
        return new ResourceLoader();
    }


    /**
     * Loads a script element with javascript source
     *
     * .javascript ( {
     *      myscript1: '/path/to/myscript1',
     *      myscript2: '/path/to/myscript2',
     *    },
     *    function (list) {})
     *
     * .javascript ( [
     *      '/path/to/myscript1',
     *      '/path/to/myscript2',
     *    ],
     *    function (list) {})
     *
     * @param srcStack       Object, Array. items: key is ID, value is src
     * @param callback  Function called when all srcStack is loaded
     * @param onerror   Function called when load is failed
     * @returns {*}
     */
    this.javascript = function (srcStack, callback, onerror) {
        if (!isSrcStack(srcStack)) return;

        srcStack = array2srcStack(srcStack);

        const
            length = Object.keys(srcStack).length,
            scripts = {}
        ;

        let
            key,
            script,
            iterator = 0
        ;

        Object.keys(srcStack).forEach((name) => {
            script = document.createElement('script');
            script.src = (srcStack[key].substr(-3) === '.js') ? srcStack[key] : srcStack[key] + '.js';
            script.type = 'application/javascript';
            script.id = name;
            script.onerror = onerror;
            script.onload = function (e) {
                scripts[this.id] = this;
                iterator++;
                if (iterator === length) {
                    callback.call({}, scripts);
                }
            };
            document.head.appendChild(script);
        });
    };


    /**
     * Load an images
     *
     * .images ( {
     *      img1: '/path/to/img1',
     *      img2: '/path/to/img2',
     *    },
     *    function (list) {})
     *
     * @param srcStack
     * @param callback
     */
    this.images = function (srcStack, callback) {
        if (!isSrcStack(srcStack)) return;

        srcStack = array2srcStack(srcStack);

        let iterator = 0;
        const length = Object.keys(srcStack).length;
        const images = {};

        Object.keys(srcStack).forEach((name) => {
            const img = document.createElement('img');
            img.src = srcStack[name];
            img.name = name;
            img.onload = function (e) {
                images[this.name] = this;
                iterator++;
                if (iterator === length) {
                    callback.call({}, images);
                }
            };
        });
    }

    /**
     * Load an audio files
     *
     * .audios ( {
     *      audio1: '/path/to/audio1',
     *      audio2: '/path/to/audio2',
     *    },
     *    function (list) {})
     *
     * @param srcStack
     * @param callback
     */
    this.audios = function (srcStack, callback) {
        if (!isSrcStack(srcStack)) return;

        let iterator = 0;
        const length = Object.keys(srcStack).length;
        const audios = {};

        Object.keys(srcStack).forEach((name) => {
            const audio = document.createElement('audio');
            audio.src = srcStack[name];
            audio.name = name;
            audio.preload = 'auto';
            audios[name] = audio;
            iterator++;
            if (iterator === length) {
                callback.call({}, audios);
            }
        });
    }

    /**
     * Load an video files
     *
     * .videos ( {
     *      video1: '/path/to/video1',
     *      video2: '/path/to/video2',
     *    },
     *    function (list) {})
     *
     * @param srcStack
     * @param callback
     */
    this.videos = function (srcStack, callback) {
        if (!isSrcStack(srcStack)) return;

        let iterator = 0;
        const length = Object.keys(srcStack).length;
        const videos = {};

        Object.keys(srcStack).forEach((name) => {
            const video = document.createElement('video');
            video.src = srcStack[name];
            video.name = name;
            video.preload = 'auto';
            videos[name] = video;
            iterator++;

            if (iterator === length) {
                callback.call({}, videos);
            }
        });
    }


    this.toString = () => '[ResourceLoader]';
}


export default ResourceLoader;
