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
        this.DOM.toast.dataset.bsAnimation = true;
        this.DOM.toast.dataset.bsAutohide = true;
        this.DOM.toast.dataset.bsDelay = this.data.displayTime;

        this.DOM.toastInner = document.createElement('div');
        this.DOM.toastInner.className = 'd-flex item';

        this.DOM.toastBody = document.createElement('div');
        this.DOM.toastBody.className = 'toast-body';
        this.DOM.toastBody.innerHTML = this.data.text;

        this.DOM.toastCloseBtn = document.createElement('button');
        this.DOM.toastCloseBtn.className = 'btn-close btn-close-white';
        this.DOM.toastCloseBtn.dataset.bsDismiss = 'toast';


        this.DOM.toast.appendChild(this.DOM.toastInner);
        this.DOM.toastInner.appendChild(this.DOM.toastBody);
        this.DOM.toastInner.appendChild(this.DOM.toastCloseBtn);

        this.DOM.el.appendChild(this.DOM.toast);
    }

    showToast() {
        this.toast = new bootstrap.Toast(this.DOM.toast).show();
    }

    removeToast() {
        this.DOM.toast.remove();
    }
}