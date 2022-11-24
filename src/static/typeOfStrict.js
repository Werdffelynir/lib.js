// typeof {}            - object
// typeof {1:10,2:20}   - object
// typeof []            - object
// typeof null          - object
// typeof ''            - string
// typeof 100           - number
// typeof undefined     - undefined
// typeof true          - boolean
// typeof ()=>{}        - function

// typeOfStrict({}            )        - Object
// typeOfStrict({1:10,2:20}   )        - Object
// typeOfStrict([]            )        - Array
// typeOfStrict(null          )        - Null
// typeOfStrict(''            )        - String
// typeOfStrict(100           )        - Number
// typeOfStrict(undefined     )        - Undefined
// typeOfStrict(true          )        - Boolean
// typeOfStrict(()=>{}        )        - Function
/**
 *
 * @param value
 * @param type
 * @return {boolean|string}
 */
const typeOfStrict = function (value, type) {
    const t = Object.prototype.toString.call(value).slice(8, -1);
    return typeof type === 'string' ? type === t : t;
};

export default typeOfStrict;
