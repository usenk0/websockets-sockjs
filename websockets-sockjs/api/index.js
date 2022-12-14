const http = require('http');
const sockjs = require('sockjs');

const wss = sockjs.createServer();
const clients = new Map();

const statusArray = [
  'INFO', 'WARN', 'ERROR', 'SUCCESS'
];

const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ';

wss.on('connection', (ws) => {
  console.log("connected");

  clients.set(ws);
  intervalID = setInterval(sendElement, 6000);

  function sendElement() {
    [...clients.keys()].forEach((client) => {
      client.write(
        JSON.stringify({
          id: Math.floor(Math.random() * 100),
          level: statusArray[Math.floor(Math.random()*statusArray.length)],
          text: text,
          displayTime: Math.floor(Math.random() * 100000)
        })
      );
    });
  }

  ws.on("close", () => {
    clients.delete(ws);
  });
});

const server = http.createServer();
wss.installHandlers(server, {
  prefix: '/ws'
});
server.listen(7071, '0.0.0.0');

console.log("wss up");