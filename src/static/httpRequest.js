import typeOf from "./typeOf";

/**
 * Base HTTP Request...
 *
 * httpRequest( { url: '/index' }, function(status, data){}, thisInstance );
 *
 * httpRequest( { url: '/index', method: 'POST', data: DATA }, function(status, data){}, thisInstance );
 *
 * httpRequest(
 *  {
 *      method: 'POST',
 *      data: {},
 *      headers: {},
 *      action: '/index'
 *  },
 *  function(status, data){
 *      log(status);
 *  },
 *  thisInstance);
 *
 * @param config
 *      data:           data to send. Object, FormData (POST only), HTMLFormElement (POST only)
 *      action, url:    url address to
 *      method:         request method GET POST or custom methods, default 'GET'
 *      headers:        headers Object, key = value
 *      useEncode:      used url encoding, default TRUE. Boolean
 *      useFormData:    used FormData, default FALSE. Boolean
 *      async:          default TRUE. Boolean
 *      user:
 *      password:
 *
 * @param callback
 *      executing event - onloadend. function (status, responseText)
 *
 * @param thisInstance
 *      object 'this' for callback
 *
 * @returns {XMLHttpRequest}
 */
const httpRequest = function (config, callback, thisInstance) {
    let key;
    let sendData = {};
    const xhr = new XMLHttpRequest();
    const options = {
        data: config.data || {},
        action: config.action || config.url || document.location.href,
        method: config.method ? config.method.toUpperCase() : 'GET',
        headers: config.headers || {},
        useEncode: config.useEncode === undefined ? true : !!config.useEncode,
        useFormData: config.useFormData === undefined ? false : !!config.useFormData,
        async: config.async === undefined ? true : !!config.async,
        user: config.user || null,
        password: config.user || null,
    };

    const concateString = function (params) {
        let result = '';
        for (key in params) {
            result += '&' + key + '=' + (options.useEncode ? encodeURIComponent(params[key]) : params[key]);
        }
        return result;
    };

    thisInstance = (typeOf(thisInstance, 'object')) ? thisInstance : {};

    // data prepare
    if (options.method === 'GET') {

        // form to FormData
        options.action += options.action.indexOf('?') === -1 ? '?' : '';
        options.action += concateString(options.data);
        sendData = {};

    } else {

        // reset to useFormData in true
        if (options.data instanceof FormData) {
            options.data = {};
            options.useFormData = true;
            sendData = options.data;
        }

        // form to FormData
        if (options.data instanceof HTMLFormElement) {
            sendData = new FormData(options.data);
            options.useFormData = true;
            options.data = {};
        }

        if (options.useFormData) {
            if (!(sendData instanceof FormData)) sendData = new FormData();

            Object.keys(options.data).forEach((key) => {
                sendData.append(key, options.useEncode ? encodeURIComponent(options.data[key]) : options.data[key]);
            });

        } else {
            sendData = concateString(options.data);
        }

    }

    // build request
    xhr.open(options.method, options.action, options.async, options.user, options.password);

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (options.method !== 'GET' && !options.useFormData) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    for (key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
    }

    xhr.onloadend = function () {
        thisInstance.XMLHttpRequest = xhr;
        if (typeof callback === 'function') {
            callback.call(thisInstance, xhr.status, xhr.responseText, xhr);
        }
    };

    xhr.sendOptions = options;
    xhr.send(sendData);
    return xhr;
};

httpRequest.fetch = await function (callback) {
    async function fetchAsync (url) {
        let response = await fetch(url);
        let jsonData = await response.json();
        if (callback instanceof Function)
            callback.call(response, response, jsonData);
        return jsonData;
    }
};
/*

    // Create request object
    var request = new Request('https://example.com/api/...',
         { method: 'POST',
           body: {'name': 'Klaus'},
           headers: new Headers({ 'Content-Type': 'application/json' })
         });
    // Now use it!

   fetch(request)
   .then(resp => {
         // handle response
   })
   .catch(err => {
         // handle errors
    });



// MOST SIMPLE ONE
function makeRequest1() {
    fetch(URLAPI)
        .then(response => response.json()).then( json => setData(json))
        .catch(error => console.error(error))
        .finally(() => {
            console.log("Data received 1 --> ", data);
            data = null;
    });
}

// ASYNC FUNCTIONS
function makeRequest2() {
    fetch(URLAPI)
        .then(async response => await response.json()).then(async json => await setData(json))
        .catch(error => console.error(error))
        .finally(() => {
            console.log("Data received 2 --> ", data);
            data = null;
        });
}
function makeRequest3() {
    fetch(URLAPI)
        .then(async response => await response.json()).then(json => setData(json))
        .catch(error => console.error(error))
        .finally(() => {
            console.log("Data received 3 --> ", data);
            data = null;
        });
}
// Better Promise usages
function makeRequest4() {
    const response = Promise.resolve(fetch(URLAPI).then(response => response.json())).then(json => setData(json) ).finally(()=> {
        console.log("Data received 4 --> ", data);

    })
}
*/
export default httpRequest;
