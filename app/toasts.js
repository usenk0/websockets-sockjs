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

        this.DOM.toastLine = document.createElement('div');
        this.DOM.toastLine.className = 'toast-line';
        this.DOM.toastLine.style.animationDuration = `${this.data.displayTime}s`;

        this.DOM.toastBody = document.createElement('div');
        this.DOM.toastBody.className = 'toast-body';
        this.DOM.toastBody.innerHTML = this.data.text;

        this.DOM.toastCloseBtn = document.createElement('button');
        this.DOM.toastCloseBtn.className = 'ml-2 mb-1 close btn-close-white';
        this.DOM.toastCloseBtn.dataset.dismiss = 'toast';

        this.DOM.toastCloseBtnSpan = document.createElement('span');
        this.DOM.toastCloseBtnSpan.innerHTML = '&times;';

        this.DOM.toast.appendChild(this.DOM.toastInner);
        this.DOM.toast.appendChild(this.DOM.toastLine);
        this.DOM.toastInner.appendChild(this.DOM.toastBody);
        this.DOM.toastCloseBtn.appendChild(this.DOM.toastCloseBtnSpan);
        this.DOM.toastInner.appendChild(this.DOM.toastCloseBtn);

        this.DOM.el.appendChild(this.DOM.toast);
    }

    showToast() {
        $(this.DOM.toast).toast('show');
    }

    removeToast() {
        this.DOM.toast.remove();
    }
}