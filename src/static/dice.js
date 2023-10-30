/**
 * dice('d6')
 * dice('3d6')
 *
 * @param {String} value - d2, d6, d8, 3d6, 3d12
 * @param plus
 * @returns {number}
 */
const dice = (value, plus = 0) => {
    const ss = value.split('d');
    const loops = Number(ss[0]) || 1;
    const side = Number(ss[1]) || 0;
    const throw_dice = () => Math.ceil(Math.random() * side) ;
    let result = 0;
    for (let i = 0; i < loops; i++) {
        result += throw_dice();
    }

    /*
    Array(loops).fill(0).forEach(() => {
        result += Math.ceil(Math.random() * side)
    })
    */

    return result + plus;
}


export default dice;