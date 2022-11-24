

/**
 * LocalStorage wrapper
 *
 * @param name
 * @param value
 * @param option
 * @returns {{set: (Cookie.set|*), get: (Cookie.get|*), key: (Cookie.key|*), clear: (Cookie.clear|*), remove: (Cookie.remove|*), length: (Cookie.length|*)}}
 * @constructor
 */
const Cookie = function (name, value) {
    switch (arguments.length) {
        case 0:
            return {
                set: set,
                get: get,
                clear: clear,
                remove: remove,
                length: length,
            };
        case 1:
            return get(name);
        case 2:
            return set(name, value);
    }
};

/**
 * Set Cookie key, value
 *  expires - ms, Date, -1, 0
 *  maxAge - s (year 31536000)
 *  SameSite=Strict|Lax
 * @param name
 * @param value
 * @param {{}} options   {expires: 0, path: '/', domain: 'site.com', secure: false, maxAge: 60*60*24*365, sameSite: '' }
 * @param typeJson bool
 */
const set = function (name, value, options, typeJson = true)
{
    options = options || {};


    if (Cookie.typeJson) {}
    if (typeJson)
        try {
            value = JSON.stringify(value);
        } catch (error) {}

    let data = name + "=" + encodeURIComponent(value);

    if (options.expires) {
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        } else {
            const date = new Date();
            options.expires = date.setTime(date.getTime() + parseInt(options.expires) * 1000);
        }
    }

    if (options.maxAge) {
        options['max-age'] = options.maxAge;
        delete options.maxAge;
    }
    if (options.sameSite) {
        options['samesite'] = options.sameSite;
        delete options.sameSite;
    }

    data += encode(options);
    document.cookie = data;
};

/**
 * Get Cookie value by key
 * @param name
 * @param typeJson bool
 * @returns {*}
 */
const get = function (name, typeJson = true) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    let data = matches ? decodeURIComponent(matches[1]) : undefined;

    if (Cookie.dataJson) {}
    if (typeJson && data)
        try {
            data = JSON.parse(data)
        } catch (error) { }

    return data
};

/**
 * Remove Cookie by key
 * @param name
 * @param option
 */
const remove = function (name, option) {
    option = option || {expires: -1};
    set(name, "", option);
};

const clear = function () {
    document.cookie = '';
};

/**
 * Convert object to uri get string
 * @param {object} data     example: {expires: 0, path: '/', domain: 'my-site.com', secure: false}
 * @returns {string}        example: "expires=0;path=/;domain=site.com;secure=false";
 */
const encode = function (data) {
    let str = '';
    Object.keys(data).forEach((key) => {
        if (data[key] !== undefined)
            str += ';' + key + '=' + encodeURIComponent(data[key]);
    });
    return str;
};

const decode = function (name) {
    if (name) {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    } else {
        const data = {},
            cookies = document.cookie.split('; ');

        cookies.forEach((value) => {
            if (value.length) {
                let parts = value.trim().split('=');
                data[parts[0].trim()] = decodeURIComponent(parts[1]).trim();
            }
        });
        return data;
    }
};

Cookie.set = set;
Cookie.get = get;
Cookie.remove = remove;
Cookie.clear = clear;
Cookie.encode = encode;
Cookie.decode = decode;
Cookie.dataJson = true;

export {
    set,
    get,
    clear,
    remove,
    encode,
    decode,
};

export default Cookie;
