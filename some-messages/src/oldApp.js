import './App.css';

import { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";
var initial_messages = [
  'good day to you sir',
  'Shut the fuck up John i dont care.',
  'What is your name?',
  'I am good',
  'How are you?',
  'My name is John',
  'Hello',
]

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initial_messages);
  

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);

    newSocket.on('connect', () => {
      console.log('connected to server');
      newSocket.emit('join', 'an entity has joined');
    });
    
    newSocket.on('join', (msg) => {
      console.log(`join: ${msg}`);
    });

    newSocket.on('message', (msg) => {
      console.log(`message: ${msg}`);
      initial_messages = [msg, ...messages];
      setMessages(initial_messages);
    });
    
    setSocket(newSocket);
    return () => { newSocket.close(); console.log('disconnected from server'); };
  }, [setSocket]);

  const handleSubmit = (event) => {
    event.preventDefault();
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
        </form>
        <div className="messages">
          {messages.map(msg => (
            <pre className="message">{msg}</pre>
          ))}
        </div>
      </body>
    </div>
  );
}

export default App;
