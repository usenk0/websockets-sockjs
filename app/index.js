import {
    ToastsQueue,
    ToastsItem
} from './toasts';

const MAX_ELEMENTS = 5;
const el = document.getElementById("notifications");

let toastsQueue = new ToastsQueue();
let freeSlots = MAX_ELEMENTS;

(async () => {

    const connectToServer = async () => {
        const ws = new SockJS('http://localhost:7071/ws');
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                if (ws.readyState === 1) {
                    clearInterval(timer);
                    resolve(ws);
                }
            }, 10);
        });
    }

    const ws = await connectToServer();

    ws.onmessage = (webSocketMessage) => {
        toastsQueue.enqueue(JSON.parse(webSocketMessage.data));
        showRecursivelyToasts();
    };

    const showRecursivelyToasts = () => {
        if (freeSlots > 0 && !toastsQueue.isEmpty()) {
            let toastItem = new ToastsItem(el, toastsQueue.dequeue());
            freeSlots--;
            $(toastItem.DOM.toast).on('hidden.bs.toast', () => {
                $(toastItem.DOM.toast).off();
                toastItem.removeToast();
                if(freeSlots < MAX_ELEMENTS) freeSlots++;
                showRecursivelyToasts();
            });
        } else {
            return;
        }
    }
})();