/*

const arr0 = createArray(5);
const arr0 = createArray(5, true);
const arr1 = createArray(5, 1);
const arr2 = createArray(5, 'hello world');
const arr3 = createArray(5, [100,200,300]);
const arr4 = createArray(5, {a:'A',b:'B',c:'C'});

*/

/**
 *
 * @param num
 * @param fill
 * @returns {any[]}
 */
const createArray = function (num, fill) {
    let arr = [];

    if (typeof fill === 'number' || typeof fill === 'string' ){
        return new Array(num).fill(fill);
    }

    arr = new Array(num).fill(0);
    arr.forEach((value, i) => {
        if (typeof fill === 'function') {
            const r = fill.call(fill, i, i);
            arr[i] = typeof r === 'boolean' || r ? r : value;
        }
        if (Array.isArray(fill)) arr[i] = fill[i] === undefined ? undefined : fill[i] ;
        else arr[i] = fill;
    });
    return arr;
}


export default createArray;
