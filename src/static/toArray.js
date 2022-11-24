/**
 * toArray ( $var, { values: true })
 *
 * options
 *    values - gets values of object to new array values
 *
 * @param entries
 * @param options
 * @return {[]}
 */
const toArray = function (entries, options = {}) {
  const values = options.hasOwnProperty('values') ? options.values : true;

  const type = typeof entries;
  let data = [];

  switch (type) {
    case 'object':
      if (entries) {
        if (Array.isArray(entries)) {
          data = Array.apply([], entries);
        } else {
          data = values
            ? Object.values(entries).map((key, index) => key)
            : Object.keys(entries).map((key, index) => key);
        }
      }
      break;

    case 'string':
    case 'number':
    case 'boolean':
    case 'function':
      data.push(entries)
      break;
  }

  return data;
};

export default toArray;
