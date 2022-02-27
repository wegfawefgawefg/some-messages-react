
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

export let send
let onMessageCallback

export const startWebsocketConnection = () => {
  const ws = socketIOClient(ENDPOINT)

  ws.on('connect', () => {
    console.log('connected to server');
    ws.emit('join', 'an entity has joined');
  });

  ws.on('disconnect', () => {
    console.log('disconnected from server');
    ws.emit('leave', 'an entity has left');
  });

  ws.on('message', (message) => {
    // message was e.data before
    console.log('message received: ', message);
    if (onMessageCallback) {
      onMessageCallback(message)
    }
  });

  send = (message) => {
    console.log('sending message: ', message);
    ws.emit('message', message);
  }

  // ws.onclose = (e) => {
  // ws.onmessage = (e) => {
    // onMessageCallback && onMessageCallback(e.data)
  // send = ws.send.bind(ws)
}

export const registerOnMessageCallback = (fn) => {
  onMessageCallback = fn
}