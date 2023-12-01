/**
 * <pre>
 * const repository = await load({
 *     image: {
 *         characters: characters_png,
 *     },
 *     audio: {
 *         mine: mine_mp3,
 *     },
 *     svg: {}
 * });
 * </pre>
 * @param sources
 * @returns {Promise<{image: {}, svg: {}, audio: {}}>}
 */
async function load(sources) {
    const _audio = sources.audio ?? {};
    const _image = sources.image ?? {};
    const _svg = sources.svg ?? {};
    const _json = sources.json ?? {};
    const repository = {audio: {}, image: {}, svg: {}, json: {}};

    for (let key in _audio) {
        repository.audio[key] = await load.audio(_audio[key]);
    }
    for (let key in _image) {
        repository.image[key] = await load.image(_image[key]);
    }
    for (let key in _svg) {
        repository.svg[key] = await load.svg(_svg[key]);
    }
    for (let key in _json) {
        repository.json[key] = await load.svg(_json[key]);
    }

    return repository;
}
load.audio = async function (src) {
    const audio = new Audio(src);
    return new Promise((resolve, reject) => {
        audio.addEventListener("canplaythrough", () => {
            resolve(audio);
        });
        audio.addEventListener("error", () => {
            reject();
            throw new Error('Error load.audio [' + src + ']');
        });
    });
};
load.image = async function (src) {
    const img = new Image();
    return new Promise((resolve, reject) => {
        img.addEventListener("load", () => {
            resolve(img);
        });
        img.addEventListener("error", () => {
            reject();
            throw new Error('Error load.image [' + src + ']');
        });
        img.src = src;
    });
};
load.fetchText = async function (url) {
    const response = await fetch(url);
    return await response.text();
}
load.fetchJson = async function (url) {
    const response = await fetch(url);
    return await response.json();
}
load.svg = async function (src, width = 100, height = 100, callback) {
    const svg = new DOMParser().parseFromString(await load.fetchText(src), 'image/svg+xml').firstElementChild;
    svg.setAttribute('width', width + 'px');
    svg.setAttribute('height', height + 'px');
    if (callback) {
        callback.call(svg, svg);
    }
    return svg;
};


export default load;
