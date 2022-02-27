import React from 'react'
import socketIOClient from "socket.io-client";
import './App.css'


import MessageWindow from './MessageWindow'
import TextBar from './TextBar'
import { send, registerOnMessageCallback } from './chatsocket'

const ENDPOINT = "http://127.0.0.1:5000";

export class App extends React.Component {
  state = {
    messages: [],
    username: null,
  }
  
  constructor (props) {
    super(props)
    registerOnMessageCallback(this.onMessageReceived.bind(this))
  }

  onMessageReceived (msg) {
    msg = JSON.parse(msg)
    this.state.messages.unshift(msg)
    this.setState({
      messages: this.state.messages
    })
  }

  setUserName (name) {
    this.setState({
      username: name
    })
  }

  sendMessage (text) {
    const message = {
      username: this.state.username,
      text: text
    }
    send(JSON.stringify(message))
  }

  render () {
    const setUserName = this.setUserName.bind(this)
    const sendMessage = this.sendMessage.bind(this)

    if (this.state.username === null) {
      return (
        <div class="grid-container">
          <div className='container'>
            <TextBar prompt="set username..." onSend={setUserName} />
          </div>
        </div>
      )
    }

    return (
      <div className='container'>
        <div className='container-title'></div>
        <TextBar onSend={sendMessage} />
        <MessageWindow messages={this.state.messages} username={this.state.username} />
      </div>
    )
  }
}

export default App