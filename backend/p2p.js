import WebSocket from 'ws';
import Blockchain from './blockchain/blockchain.js';
import Transaction from './models/Transaction.js';

const sockets = [];
const MessageType = {
  CHAIN: 'CHAIN',
  TRANSACTION: 'TRANSACTION',
};

const blockchain = new Blockchain();

export const initP2PServer = (serverPort) => {
  const server = new WebSocket.Server({ port: serverPort });
  server.on('connection', (ws) => {
    console.log('🔌 Ny peer ansluten');
    initConnection(ws);
  });
};

export const connectToPeer = (peer) => {
  const ws = new WebSocket(peer);
  ws.on('open', () => initConnection(ws));
  ws.on('error', (err) => console.log(' Fel vid anslutning till peer:', err.message));
};

function initConnection(ws) {
  sockets.push(ws);
  initMessageHandler(ws);
  sendChain(ws);
}

function initMessageHandler(ws) {
  ws.on('message', async (data) => {
    const message = JSON.parse(data);
    switch (message.type) {
      case MessageType.CHAIN:
        blockchain.replaceChain(message.chain);
        break;
      case MessageType.TRANSACTION:
        const tx = message.transaction;
        const exists = await Transaction.findOne({ id: tx.id });
        if (!exists) {
          const newTx = new Transaction(tx);
          await newTx.save();
        }
        break;
    }
  });
}

export const broadcastTransaction = (transaction) => {
  sockets.forEach((socket) =>
    socket.send(JSON.stringify({ type: MessageType.TRANSACTION, transaction }))
  );
};

function sendChain(ws) {
  ws.send(JSON.stringify({ type: MessageType.CHAIN, chain: blockchain.chain }));
}