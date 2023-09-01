import search from "libjs/src/static/search";


/**
 * <pre>
 * // !important. Only use variables between tags
 *
 * const templateHtmlString = `
 *      <div>
 *          <h3>{title}</h3>
 *          <div>{context}</div>
 *      </div>
 * `;
 * const tpl = Template(template);
 *
 * tpl.observe('title', (name, value, state) => {
 *     console.log('changed', {name, value, state});
 * });
 *
 * // change
 * tpl.variable.title = 'Text for title';
 *
 * // reserved attributes
 * data-on
 * data-get     // not use
 * data-set     // not use
 * data-input
 * data-area
 * data-click   // not use
 * data-field   // not use
 *
 * // !important. Incorrect use of a variable in attributes
 * <input type="text" value="{columns}"> // this not work!
 * // use
 * <input data-field="columns" type="text" value="">
 * tpl.attr.input.columns.value = 100;
 * tpl.attr.input.columns.addEventListener('input', (e) => {console.log(e.target.value)})
 *
 * </pre>
 *
 * @param templateString string|Element
 * @param innerHTML bool
 * @returns {{template: Element, variable: {}|Proxy, attr: {input: {}, area: {}, on: {}}, element: {}, observe: function}}
 * @constructor
 */
function Template(templateString, innerHTML = false) {
    const variablesState = {};
    const variablesNames = [];
    const variablesElements = {};
    const variablesCallbacks = {};

    // todo: for testing
    if (templateString && templateString.nodeType === Node.ELEMENT_NODE) {
        const container = document.createElement("div");
        container.appendChild(templateString.cloneNode(true));
        templateString = container.innerHTML;
    }  // todo: for testing end

    let htmlString = templateString.trim().replace(/{(\w+)}/g, (match, name) => {
        variablesNames.push(name);
        return `<span data-variable="${name}"></span>`;
    });

    let html = document.createRange().createContextualFragment(htmlString).firstElementChild;

    variablesNames.forEach((name) => {
        const elem = html.querySelector('[data-variable=' +name+ ']')

        if (elem.parentElement.nodeType === Node.ELEMENT_NODE) {
            variablesElements[name] = elem.parentElement;
            elem.parentElement.setAttribute('data-variable', name);
            elem.parentElement.removeChild(elem);
        } else {
            variablesElements[name] = elem;
        }
        variablesState[name] = name;
    });

    function attrs(html, attr) {
        let i = 0;
        const elems = Array.from(html.querySelectorAll('['+attr+']'));
        const elemsNamed = {};
        while (elems.length > i) {
            const a = elems[i].getAttribute(attr);
            if (a.length > 0)
                elemsNamed[a] = elems[i];
            i ++;
        }
        return elemsNamed;
    }

    const variablesStateProxy = new Proxy(variablesState, {
        set(store, prop, value) {
            store[prop] = value;

            if (innerHTML)
                variablesElements[prop].innerHTML = value;
            else
                variablesElements[prop].textContent = value;

            Object.keys(variablesCallbacks).forEach((key) => {
                if (key === prop)
                    variablesCallbacks[key](prop, value, store);
            });
            return true;
        },
    });

    const observe = function (prop, callback) {
        variablesCallbacks[prop] = callback;
    };

    return {
        attr: {
            on: attrs(html, 'data-on'),
            area: attrs(html, 'data-area'),
            input: attrs(html, 'data-input'),
        },
        template: html,
        element: variablesElements,
        variable: variablesStateProxy,
        observe
    };
}

export default Template;