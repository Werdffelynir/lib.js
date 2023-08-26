/**
 * <pre>
 * const delay = Waiter();
 *
 * delay
 *     .wait(() => {
 *         console.log(1)
 *     }, 1000)
 *     .wait(() => {
 *         console.log(2)
 *     }, 1000)
 *     .wait(() => {
 *         console.log(3)
 *     }, 1000)
 *
 * // or set daley time in constructor, for all callables
 *
 * Waiter(1000);
 * </pre>
 *
 * @returns {{wait:function, reset:function }}
 * @constructor
 */
function Waiter(delay = 0)
{
    let _delay = 0;
    let _i = 0;

    const wait = (callback, ms = null) => {
        _delay += ms === null ? delay : ms;

        setTimeout(() => { callback(++_i) }, _delay);

        return {wait};
    };

    const reset = () => {_delay = 0;};

    return {wait, reset};
}

export default Waiter;
