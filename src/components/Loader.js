

/**
 * Loader.audios: ƒ (srcs, callback)
 * Loader.images: ƒ (imgs, callback)
 * Loader.javascript: ƒ (src, callback, onerror)
 * Loader.json: ƒ (src, callback, onerror)
 *
 * @version 0.0.1 unstable
 * @property
 * @method json
 * @method jsons
 * @method javascript
 * @method images
 * @method audios
 * @returns {{}}
 * @constructor
 */
const Loader = function () {
    return {
        json: Loader.json,
        jsons: Loader.jsons,
        javascript: Loader.javascript,
        images: Loader.images,
        audios: Loader.audios,
        videos: Loader.video,
    };
};

/**
 * .json('/url/datafile.json', (json) => {}, (error) => {})
 *
 * @param src
 * @param callback
 * @param onerror
 */
Loader.json = function (src, callback, onerror) {
    fetch(src)
        .then(response => response.json())
        .then(json => callback(json))
        .catch(error => typeof onerror === 'function' ? onerror(error) : null);
}

/**
 *
 * @param srcs
 * @param callback
 * @param onerror
 */
Loader.jsons = function (srcs, callback, onerror)
{
    if (srcs && typeof srcs === 'object') {

        if (Array.isArray(srcs)) {
            const obj = {};
            srcs.map(function (item) {
                obj[Math.random().toString(32).slice(2)] = item
            });
            srcs = obj;
        }

        const scripts = {};
        const length = Object.keys(srcs).length;
        let iterator = 0;

        Object.keys(srcs).forEach((key) => {
            const src = srcs[key];
            Loader.json(src, (json) => {
                scripts[key] = json;
                iterator ++;
                if (iterator === length) {
                    callback.call({}, scripts);
                }
            }, onerror);
        });
    }
}

/**
 * Loads a script element with javascript source
 *
 * .javascript ( {
 *      my_script1: '/path/to/my_script1',
 *      my_script2: '/path/to/my_script2',
 *    },
 *    function (list) {})
 *
 * .javascript ( [
 *      '/path/to/my_script1',
 *      '/path/to/my_script2',
 *    ],
 *    function (list) {})
 *
 * @namespace Loader.javascript
 * @param srcs       Object, Array. items: key is ID, value is src
 * @param callback  Function called when all srcs is loaded
 * @param onerror   Function called when load is failed
 * @returns {*}
 */
Loader.javascript = function (srcs, callback, onerror)
{
    if (srcs && typeof srcs === 'object') {

        if (Array.isArray(srcs)) {
            const obj = {};
            srcs.map(function (item) {
                obj[Math.random().toString(32).slice(2)] = item
            });
            srcs = obj;
        }
        onerror = typeof onerror === 'function' ? onerror : (err) => {console.error(err)}
        const length = Object.keys(srcs).length;
        const scripts = {};
        let script;
        let iterator = 0;

        Object.keys(srcs).forEach((key) => {
            script = document.createElement('script');
            script.src = (srcs[key].substr(-3) === '.js') ? srcs[key] : srcs[key] + '.js';
            script.type = 'application/javascript';
            script.id = key;
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
    }
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
 * @namespace Animate.Loader.images
 * @param imgs
 * @param callback
 */
Loader.images = function (imgs, callback) {
    if (imgs && typeof imgs === 'object') {
        const length = Object.keys(imgs).length;
        const images = {};
        let iterator = 0;
        for (let name in imgs) {
            const img = document.createElement('img');
            img.src = imgs[name];
            img.name = name;
            img.onload = function (e) {
                images[this.name] = this;
                iterator++;
                if (iterator === length) {
                    callback.call({}, images);
                }
            };
        }
    }
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
 * @namespace Animate.Loader.audios
 * @param srcs
 * @param callback
 */
Loader.audios = function (srcs, callback) {
    if (srcs && typeof srcs === 'object') {
        const length = Object.keys(srcs).length;
        const audios = {};
        let iterator = 0;
        for (let name in srcs) {
            const audio = document.createElement('audio');
            audio.src = srcs[name];
            audio.name = name;
            audio.preload = 'auto';
            audios[name] = audio;
            iterator++;
            if (iterator === length) {
                callback.call({}, audios);
            }
        }
    }
};

/**
 * Load an video files
 *
 * .videos ( {
 *      video1: '/path/to/video1',
 *      video2: '/path/to/video2',
 *    },
 *    function (list) {})
 *
 * @namespace Animate.Loader.videos
 * @param srcs
 * @param callback
 */
Loader.videos = function (srcs, callback) {
    if (srcs && typeof srcs === 'object') {
        const length = Object.keys(srcs).length;
        const videos = {};
        let iterator = 0;
        for (let name in srcs) {
            const video = document.createElement('video');
            video.src = srcs[name];
            video.name = name;
            video.preload = 'auto';
            videos[name] = video;
            iterator++;
            if (iterator === length) {
                callback.call({}, videos);
            }
        }
    }
}

export default Loader;
