import './App.css';

import { useState } from "react";

function App() {
  let messages = [
    'good day to you sir',
    'Shut the fuck up John i dont care.',
    'What is your name?',
    'I am good',
    'My name is John',
    'How are you?',
    'Hello',
  ];
  
  const [new_message, setNewMessage] = useState('');
  const [messages_list, setMessagesList] = useState(messages);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(new_message);
    setMessagesList([new_message, ...messages_list]);
    setNewMessage('');
  }

  return (
    <div className="App">
      <body>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={new_message}
            onChange={event=>setNewMessage(event.target.value)}
            placeholder="Type a message idiot..." />
        </form>
        {messages_list.map(message => (
          <p>{message}</p>
        ))}
      </body>
    </div>
  );
}

export default App;
