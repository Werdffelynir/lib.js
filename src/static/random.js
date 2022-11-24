/**
 * Generate a random number
 * @param min
 * @param max
 * @returns {number}
 */
import {ABC, NUMBERS} from "./abc";


export const random = function (min, max) {
    min = min || 0;
    max = max || 100;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generate a random hex color
 * @returns {string}
 */
export const randomColor = function () {
    const letters = '0123456789ABCDEF'.split('');
    let i, color = '#';
    for (i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
};
random.color = randomColor;

/**
 *
 * @param size
 * @returns {string|number}
 */
export const randomNumber = function (size = 6) {
    if (size > 16) {
        let i = Math.ceil(size/16);
        let res = '';
        for (i; i > 0; i--)
            res += Array(16).fill(0).map(i => Math.floor(Math.random() * 10)).join('');
        return res.slice(0, size);
    }
    return parseInt(Array(size).fill(0).map(i => Math.floor(Math.random() * 10)).join(''));
};
random.number = randomNumber;

/**
 *
 * @param size
 * @returns {string}
 */
export const randomString = function (size = 6) {
    let i, string = '';
    const abs = (ABC + NUMBERS).toLowerCase().split('');
    for (i = size; i > 0; i--) {
        string +=
            abs[Math.floor(Math.random() * abs.length)];
    }
    return string;
};
random.string = randomString;

/**
 * Return random item from array
 * @param arr
 * @returns {*}
 */
export const randomItem = function (arr) {
    return Array.isArray(arr) ? arr[random(0, arr.length-1)] : false;
};
random.item = randomItem;


export default random;