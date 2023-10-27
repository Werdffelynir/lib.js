
/**
 * 
 * @param {*} params 
 * @returns String
 */
export const toQueryString = function (params) {
    let result = '';
    Object.keys(params).forEach((key) => {
        result += (result ? '&' : '') + key + '=' + encodeURIComponent(params[key]);
    });
    return result;
};

/**
 * <pre>
 * u.request({
 *     method: 'POST',
 *     type: 'json',
 *     url: 'http://localhost:8021/api',
 *     origin: 'http://localhost:8080',
 *     headers: {
 *         'Custom-Header': 'this is war v 0.1',
 *     },
 *     body: {id: 102, name: 'Drink Beerner'},
 *     onready: (response, data) => {
 *         console.log('onready: ', data);
 *     },
 *     onerror: (response, error_message) => {
 *         console.log('onerror: ', response, error_message);
 *     }
 * });
 * u.request({
 *     type: 'text',
 *     url: 'http://localhost:8021/api',
 *     origin: 'http://localhost:8080',
 *     headers: {
 *         'Custom-Header': 'this is war v 0.1',
 *     },
 *     body: {id: 103, name: 'Drink Beerner'},
 *     onready: (response, data) => {
 *         console.log('onready: ', data);
 *     },
 *     onerror: (response, error_message) => {
 *         console.log('onerror: ', response, error_message);
 *     }
 * });
 * </pre>
 * @param {*} params 
 * @param function callback 
 * @param String type 
 */
const request = function (params = {}) {

    let url = params.url ? params.url : '/';
    let type = params.type ? params.type : 'json';
    let lastresponse = null;
    const on_ready = params.onready ? params.onready : () => {};
    const on_error = params.onerror ? params.onerror : () => {};
    const on_progress = params.onprogress ? params.onprogress : () => {};
    
    if (!(['json', 'text', 'blob', 'arrayBuffer', 'formData'].includes(type)))
        type = 'text';

    const selectContentType = () => {
        const hs = {
            blob: 'application/x-www-form-urlencoded',
            formData: 'multipart/form-data',
            text: 'text/plain; charset=utf-8',
            json: 'application/json; charset=utf-8'
        };
        return hs[type] ? hs[type] : hs.text;
    }

    const def_params = {
        method: 'GET',
        body: {
            ... (params.body ? params.body : {}),
            ... (params.data ? params.data : {})
        },
        headers: {
            ...{ 'Content-Type': selectContentType() },
            ...(params.headers ? params.headers : {})
        }
    }
    
    params = { ...def_params, ...params }

    if (params.origin) {
        params.headers['Origin'] = params.origin;
    }

    if (['GET', 'HEAD'].includes(params.method.toUpperCase())) {
        if (Object.keys(params.body).length) {
            url += url.indexOf('?') === -1 ? '?' : '';
            url += toQueryString(params.body);
        }
        delete params.body;
    } else {
        params.body = JSON.stringify(params.body)
    }

    Object.keys(params).forEach((key) => {
        if (!['method', 'mode', 'cache', 'credentials', 'headers', 'redirect', 'referrerPolicy', 'body'].includes(key)) {
            delete params[key];
        }
    });

    fetch(url, params)
        .then(response => {
            lastresponse = response;
            return response[type]();
        })
        .then(response => {
            // console.log('fetch:response', response);
            on_ready.call(lastresponse, lastresponse, response)
        })
        .catch(error => {
            on_error.call(lastresponse, lastresponse, error)
            console.error(error);
        })
};

 
export default request;