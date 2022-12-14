import {ToastsQueue, ToastsItem} from './toasts';

// here will be the logic for the queue
let queue = new ToastsQueue();

const MAX_ELEMENTS = 8;

let freeSlots = MAX_ELEMENTS;

(async function () {

    const ws = await connectToServer();

    ws.onmessage = (webSocketMessage) => {
        // temporal queue logic
        if(freeSlots > 0){
            const el = document.getElementById("notifications");
            let toastItem = new ToastsItem(el, JSON.parse(webSocketMessage.data));
            freeSlots--;
            toastItem.DOM.toast.addEventListener('hidden.bs.toast',  () => {
                toast.removeToast();
                freeSlots++;
            })
        }
    };

    async function connectToServer() {
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

})();