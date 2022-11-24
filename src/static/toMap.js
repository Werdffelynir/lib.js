/**
 * toMap( { '1': 5, '2': 7, '3': 0 } )
 * result [ [ 1, 5 ], [ 2, 7 ], [ 3, 0 ] ]
 *
 * @param entries
 * @return {[number, *][]}
 */
const toMap = function (entries) {
  return Object.keys(entries).map((key) => [Number(key), entries[key]]);
};

export default toMap;
