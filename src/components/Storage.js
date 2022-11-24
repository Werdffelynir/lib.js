/**
 * Add item by name
 * @param name
 * @param value
 * @param json
 */
const set = function (name, value, json = true) {
    if (json)
        try {
            value = JSON.stringify(value);
        } catch (error) {}
    return Storage.typeStorageObject.setItem(name, value);
};

/**
 * Get item by name
 * @param {string} name
 * @param json
 */
const get = function (name, json = true) {
    let value = Storage.typeStorageObject.getItem(name);
    if (json && value)
        try {
            value = JSON.parse(value);
        } catch (error) {}

    return value;
};

/**
 *
 * Remove item by name
 * @param name
 */
const remove = function (name) {
    return Storage.typeStorageObject.removeItem(name)
};

/**
 * Get item by index
 *
 * @param index
 * @returns {string}
 */
const key = function (index) {
    return Storage.typeStorageObject.key(index)
};

/**
 * When invoked, will empty all keys out of the storage.
 */
const clear = function () {
    return Storage.typeStorageObject.clear()
};

/**
 * Returns an integer representing the number of data items stored in the Storage object.
 * @returns {number}
 */
const length = function () {
    return Storage.typeStorageObject.length
};

/**
 * LocalStorage wrapper
 *
 * Storage.typeStorage = 'local'; // local for use `localStorage` or session
 *
 * Storage.set(name, {})
 * Storage.get(name)
 * Storage.key(index)
 * Storage.clear()          // common clear `localStorage`
 * Storage.remove(name)     // delete item by name
 * Storage.length()         // common width wight of `localStorage`
 *
 * Storage(name) === Storage.get(name)
 * Storage(name, {}) === Storage.set(name, {})
 *
 * @param name
 * @param value
 * @returns {string|{set: (function(*, *, *=): void), get: (function(string, *=): string), clear: (function(): void), length: (function(): number), key: (function(*): string), remove: (function(*): void)}|void}
 * @constructor
 */
const Storage = function (name, value) {
    switch (arguments.length) {
        case 0:
            return {
                set: set,
                get: get,
                key: key,
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

//
Storage.set = set;
Storage.get = get;
Storage.key = key;
Storage.clear = clear;
Storage.remove = remove;
Storage.size = length;
Storage.typeStorage = 'local';
Storage.typeStorageObject = Storage.typeStorage === 'local' ? window.localStorage : window.sessionStorage;

export default Storage;
