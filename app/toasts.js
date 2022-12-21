export class ToastsQueue {
    constructor() {
        this.items = [];
    }

    // add element to the queue
    enqueue(element) {
        return this.items.push(element);
    }

    // remove element from the queue
    dequeue() {
        if (this.items.length > 0) {
            return this.items.shift();
        }
    }

    // view the last element
    peek() {
        return this.items[this.items.length - 1];
    }

    // check if the queue is empty
    isEmpty() {
        return this.items.length == 0;
    }

    // the size of the queue
    size() {
        return this.items.length;
    }

    // empty the queue
    clear() {
        this.items = [];
    }
}

export class ToastsItem {
    constructor(el, data) {
        this.DOM = {
            el: el
        };
        this.data = data;
        this.layout();
        this.showToast();
    }

    layout() {
        this.DOM.toast = document.createElement('div');
        this.DOM.toast.className = `toast ${this.data.level}`;
        this.DOM.toast.dataset.animation = true;
        this.DOM.toast.dataset.autohide = true;
        this.DOM.toast.dataset.delay = this.data.displayTime * 1000;

        this.DOM.toastInner = document.createElement('div');
        this.DOM.toastInner.className = 'd-flex item';

        this.DOM.toastIcon = document.createElement('div');        
        this.DOM.toastIcon.className = 'toast-icon';
        this.DOM.toastIcon.innerHTML = this.getIcon(this.data.level);

        this.DOM.toastLine = document.createElement('div');
        this.DOM.toastLine.className = 'toast-line';
        this.DOM.toastLine.style.animationDuration = `${this.data.displayTime}s`;

        this.DOM.toastBody = document.createElement('div');
        this.DOM.toastBody.className = 'toast-body';
        this.DOM.toastBody.innerHTML = `<p>${this.data.level}</p><p>${this.data.text}</p>`;

        this.DOM.toastCloseBtn = document.createElement('button');
        this.DOM.toastCloseBtn.className = 'ml-2 mb-1 close btn-close-white';
        this.DOM.toastCloseBtn.dataset.dismiss = 'toast';

        this.DOM.toastCloseBtnSpan = document.createElement('span');
        this.DOM.toastCloseBtnSpan.innerHTML = '&times;';

        this.DOM.toast.appendChild(this.DOM.toastInner);
        this.DOM.toast.appendChild(this.DOM.toastLine);
        this.DOM.toastInner.appendChild(this.DOM.toastIcon);
        this.DOM.toastInner.appendChild(this.DOM.toastBody);
        this.DOM.toastCloseBtn.appendChild(this.DOM.toastCloseBtnSpan);
        this.DOM.toastInner.appendChild(this.DOM.toastCloseBtn);

        this.DOM.el.appendChild(this.DOM.toast);
    }

    getIcon(level) {
        switch (level) {
            case 'SUCCESS':
                return '<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 511.755 511.755" style="enable-background:new 0 0 511.755 511.755;" xml:space="preserve"><g>	<g>		<path fill="white"  d="M436.891,74.867c-99.819-99.819-262.208-99.819-362.027,0c-99.819,99.797-99.819,262.229,0,362.027			c49.899,49.92,115.456,74.859,181.013,74.859s131.093-24.939,181.013-74.859C536.709,337.096,536.709,174.664,436.891,74.867z			 M398.96,185.629L249.627,334.963c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251l-85.333-85.333			c-8.341-8.341-8.341-21.824,0-30.165c8.341-8.341,21.824-8.341,30.165,0l70.251,70.251l134.251-134.251			c8.341-8.341,21.824-8.341,30.165,0C407.301,163.805,407.301,177.288,398.96,185.629z"/>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
            case 'ERROR':
                return '<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 51.976 51.976" style="enable-background:new 0 0 51.976 51.976;" xml:space="preserve"><g>	<path fill="white" d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0		C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778		c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828		c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828		l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
            case 'INFO':
                return '<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve"><g>	<g>		<g>			<path fill="white" d="M165,0.008C74.019,0.008,0,74.024,0,164.999c0,90.977,74.019,164.992,165,164.992s165-74.015,165-164.992				C330,74.024,255.981,0.008,165,0.008z M165,299.992c-74.439,0-135-60.557-135-134.992S90.561,30.008,165,30.008				s135,60.557,135,134.991C300,239.436,239.439,299.992,165,299.992z"/>			<path fill="white" d="M165,130.008c-8.284,0-15,6.716-15,15v99.983c0,8.284,6.716,15,15,15s15-6.716,15-15v-99.983				C180,136.725,173.284,130.008,165,130.008z"/>			<path fill="white" d="M165,70.011c-3.95,0-7.811,1.6-10.61,4.39c-2.79,2.79-4.39,6.66-4.39,10.61s1.6,7.81,4.39,10.61				c2.79,2.79,6.66,4.39,10.61,4.39s7.81-1.6,10.609-4.39c2.79-2.8,4.391-6.66,4.391-10.61s-1.601-7.82-4.391-10.61				C172.81,71.61,168.95,70.011,165,70.011z"/>		</g>	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
            case 'WARN':
                return '<?xml version="1.0" encoding="iso-8859-1"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve">		<path fill="white" d="M506.43,421.536L291.573,49.394c-15.814-27.391-55.327-27.401-71.147,0L5.568,421.536			c-15.814,27.391,3.934,61.616,35.574,61.616h429.714C502.485,483.153,522.25,448.938,506.43,421.536z M274.821,385.034			c0,10.394-8.427,18.821-18.821,18.821s-18.821-8.427-18.821-18.821v-11.239c0-10.394,8.427-18.821,18.821-18.821			s18.821,8.427,18.821,18.821V385.034z M274.821,311.702c0,10.394-8.427,18.821-18.821,18.821s-18.821-8.427-18.821-18.821v-107.89			c0-10.394,8.427-18.821,18.821-18.821s18.821,8.427,18.821,18.821V311.702z"/></svg>';
        }
    }

    showToast() {
        $(this.DOM.toast).toast('show');
    }

    removeToast() {
        this.DOM.toast.remove();
    }
}