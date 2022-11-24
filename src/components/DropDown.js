
/**
 * CSS classes: dropdown-list dropdown-header dropdown-body dropdown-footer dropdown-item dropdown-active dropdown-close
 * params { width: int, selector: Node|string, data: string, html: string, css:object, autowidth: bool , autoclose: bool, onclick: function }
 */
class DropDown {

    constructor(params) {
        this.width = this.default(params.width, 200);
        this.selector = this.default(params.selector, 'body');
        this.data = this.default(params.data, []);
        this.html = this.default(params.html, false);
        this.cssObject = this.default(params.css, {
            list: {
                width: this.width + 'px',
            },
            header: {},
            body: {},
            footer: {},
        });
        this.autowidth = this.default(params.autowidth, false);
        this.autoclose = this.default(params.autoclose, false);
        this.dataType = {id: 0, name: '', html: '', value: 0};
        this.target = null;
        this.element = null;
        this.items = [];
        this.lesteners = [];
        this.onclickCallback = this.default(params.onclick, () => {});

        this.inject();
        this.css();
    }

    inject() {
        const target = this.selector instanceof HTMLElement
            ? this.selector
            : document.querySelector(this.selector);

        const element = document.createElement('div');
        const header = document.createElement('div');
        const body = document.createElement('div');
        const footer = document.createElement('div');

        element.classList.add('dropdown-list');
        header.classList.add('dropdown-header');
        body.classList.add('dropdown-body');
        footer.classList.add('dropdown-footer');

        this.data.forEach((it) => {
            const item = document.createElement('div');
            item.classList.add('dropdown-item');

            item.setAttribute('data-id', it.id);
            item.setAttribute('data-name', it.name);
            item.setAttribute('data-value', it.value);

            if (it.selected) {
                item.classList.add('dropdown-active');
                if (this.onclickCallback) {
                    this.onclickCallback({id: it.id, name: it.name, value: it.value});
                }
                if (target instanceof HTMLInputElement) {
                    target.value = it.value;
                    target.name = it.name;
                } else if (target instanceof HTMLElement) {
                    target.innerHTML = it.value;
                    target.name = it.name;
                    target.setAttribute('data-id', it.id);
                    target.setAttribute('data-name', it.name);
                    target.setAttribute('data-value', it.value);
                }
            }

            if (it.html) item.innerHTML = it.value;
            else item.textContent = it.value;

            this.items.push(item);
            body.appendChild(item);

            this.addClickEventListener(item);
        });

        element.appendChild(header);
        element.appendChild(body);
        element.appendChild(footer);

        if (target instanceof HTMLElement) {
            this.target = target;
            this.element = element;
            target.insertAdjacentElement('afterend', element);

            if (this.autoclose) {
                this.element.classList.add('dropdown-close');
                target.addEventListener('click', (e) => {
                    if (this.element.classList.contains('dropdown-close'))
                        this.element.classList.remove('dropdown-close');
                    else
                        this.element.classList.add('dropdown-close');
                });
            }

            if (this.autowidth) {
                this.element.style.width = getComputedStyle(target).width;
            }
        } else {
            console.error("FAILED target.parentNode instanceof Node");
        }
    }

    default(value, defaultValue = '') {
        return value !== undefined ? value : defaultValue;
    }
    onclick(callback){
        this.onclickCallback = callback;
    }
    css(cssObject) {
        cssObject = cssObject
            ? Object.assign(this.cssObject, cssObject)
            : this.cssObject;

        Object.keys(cssObject).forEach((name) => {
            let elem;
            if (!name) return ;
            if (name === 'list') {
                elem = this.element;
            } else {
                elem = this.element.querySelector('.dropdown-'+name);
            }
            if(elem && cssObject[name]) {
                Object.keys(cssObject[name]).forEach((prop)=>{
                    if (this.autowidth) {
                        if (prop !== 'width') {
                            elem.style[prop] = cssObject[name][prop];
                        }
                    } else {
                        elem.style[prop] = cssObject[name][prop];
                    }
                });
            }
        });
    }

    addClickEventListener (item) {

        const listener = {
            callback (pointerEvent, params) {
                const {
                    parent,
                    element,
                    items,
                    onclickCallback,
                    autoclose
                } = params;
                const target = pointerEvent.target;
                const id = target.getAttribute('data-id');
                const value = target.getAttribute('data-value');
                const name = target.getAttribute('data-name');

                items.forEach((it)=>{it.classList.remove('dropdown-active')})
                target.classList.add('dropdown-active');

                if (parent instanceof HTMLInputElement) {
                    parent.value = value;
                    parent.name = name;
                } else if (parent instanceof HTMLElement) {
                    parent.innerHTML = value;
                    parent.name = name;
                    parent.setAttribute('data-id', id);
                    parent.setAttribute('data-value', value);
                    parent.setAttribute('data-name', name);
                }

                if (onclickCallback) {
                    onclickCallback({id, value, name});
                }

                if (autoclose) {
                    element.classList.add('dropdown-close');
                }
            },
            event: 'click',
        };

        item.addEventListener(listener.event, (event) => {
            listener.callback(
                event,
                {
                    parent: this.target,
                    element: this.element,
                    items: this.items,
                    onclickCallback: this.onclickCallback,
                    autoclose: this.autoclose,
                }
            )})
        this.lesteners.push(listener);
    }
}

export default DropDown;