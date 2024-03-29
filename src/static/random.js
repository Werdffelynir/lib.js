/**
 * Generate a random number
 * @param min
 * @param max
 * @returns {number}
 */
import {ABC, LETTER_CONSONANT, LETTER_VOWEL, NUMBERS} from "./abc";

/**
 *
 * @param min
 * @param max
 * @param float
 * @returns {number}
 */
export const random = function (min = 0, max = 100, float = false) {
    if (float) {
        return parseFloat((min + Math.random() * (max - min)).toFixed(float >= 1 ? float : 3 ));
    }
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
 * @param count
 * @returns {*[]}
 */
export const randomColors = (count = 1) => {
    const list = [];
    for (let i = 0; i < count; i++) {
        list.push("#" + Math.floor(Math.random() * 16777215).toString(16));
    }
    return list;
};
random.colors = randomColors;

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
    let string = '';
    const abs = (ABC + NUMBERS).toLowerCase().split(',');

    const rand = () => {
        let i, string = '';

        for (i = size; i > 0; i--) {
            string += abs[Math.floor(Math.random() * abs.length)];
        }

        return string;
    }
    string += rand();

    return string;
};
random.string = randomString;


/**
 *
 * @param size
 * @returns {string}
 */
export const randomStringHumans = function (size = 6) {
    let string = '';
    const bin = (balance = 0) => !!Math.random() > (0.45 - (balance / 100));
    const r_consonants = () => {
        const lets = LETTER_CONSONANT.toLowerCase().split(',');
        return lets[Math.floor(Math.random() * lets.length)];}
    const r_vowels = () => {
        const lets = LETTER_VOWEL.toLowerCase().split(',');
        return lets[Math.floor(Math.random() * lets.length)];}

    Array(Math.round((size / 2) + 1)).fill(0).forEach(() => {
        string += r_consonants() + (bin(30) ? r_vowels() : '') + r_vowels();
    });

    if (bin())
        return string.slice(1, size + 1);
    else
        return string.slice(0, size);
};
random.string = randomStringHumans;


/**
 * Return random item from array
 * @param arr
 * @returns {*}
 */
export const randomItem = function (arr) {
    return Array.isArray(arr) ? arr[random(0, arr.length-1)] : false;
};
random.item = randomItem;

/**
 *
 * @param list
 * @param n
 * @returns {{}|*[]}
 */
export function randomUniqueItems(list, n) {
    if (Array.isArray(list)) {
        if (list.length < n) throw new Error('value "n" is less than required in list elements')
        let arr = [];
        let it = null;
        while (arr.length < n) {
            it = list[Math.floor(Math.random() * list.length)];
            if (!arr.includes(it))
                arr.push(it)
        }
        return arr;
    } else {
        if (Object.keys(list).length < n) throw new Error('value "n" is less than required in list elements')
        let result = {};
        let keys = Object.keys(list);
        while (Object.keys(result).length < n) {
            let key = keys[Math.floor(Math.random() * keys.length)];
            if (!result[key])
                result[key] = list[key];
        }
        return result;
    }
}

export default random;