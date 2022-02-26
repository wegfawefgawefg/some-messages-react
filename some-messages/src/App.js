import './App.css';

import { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";
const messageArray = {
  data: [
    'good day to you sir',
    'Shut the fuck up John i dont care.',
    'What is your name?',
    'I am good',
    'My name is John',
    'How are you?',
    'Hello',
  ]
};


function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(messageArray);
  

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);

    newSocket.on('connect', () => {
      console.log('connected to server');
      newSocket.emit('join', 'an entity has joined');
    });
    
    newSocket.on('join', (data) => {
      console.log(`join: ${data}`);
    });

    newSocket.on('message', (msg) => {
      console.log(`message: ${msg}`);
      setMessages({data:[msg, ...messages.data]});
    });
    
    setSocket(newSocket);
    return () => { newSocket.close(); console.log('disconnected from server'); };
  }, [setSocket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message || message.indexOf(',') !== -1) { return; }
    console.log(message);
    socket.emit('message', message);
    setMessage('');
  }

  return (
    <div className="App">
      <body>
        <form onSubmit={handleSubmit}>
          <input
            type="text" 
            value={message}
            onChange={event=>setMessage(event.target.value)}
            placeholder="type message and hit enter to talk..." 
            disabled={!socket}
          />
          <input type="submit" value="send" disabled={!socket} />
        </form>
        <div className="messages">
          {messages.data.map((msg, index) => (
            <pre className="message" key={index}>
              {msg}
            </pre>
          ))}
        </div>
      </body>
    </div>
  );
}

export default App;
