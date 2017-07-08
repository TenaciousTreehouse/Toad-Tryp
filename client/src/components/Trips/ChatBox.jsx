import React from 'react';
import {Form, Input, Button, Card, Comment } from 'semantic-ui-react';

import axios from 'axios';
import io from 'socket.io-client';
import MessageEntry from './MessageEntry.jsx';
import TypingIndicator from './TypingIndicator.jsx';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      chatBoxField: '',
      isTyping: false,
      otherIsTyping: {
        username: '',
        isTyping: false
      },
    }
    this.updateChatBoxField = this.updateChatBoxField.bind(this);
    this.handleDeleteMessage = this.handleDeleteMessage.bind(this);
    this.handlePingUser = this.handlePingUser.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  componentDidMount() {
    this.fetch();
    var that = this;

    this.socket = io.connect('/');
    this.socket.on('updateMessagesAlert', () => that.fetch());
    this.socket.on(`otherIsTyping${this.props.tripId}`, data => {
      this.setState({
        otherIsTyping: data
      });
    });
  }

  fetch() {
    axios.get(`/api/trips/${this.props.tripId}/getmessages`)
      .then(response => {
        this.setState({
          messages: response.data
        });
      });
  }

  updateChatBoxField(event) {
    this.setState({
      chatBoxField: event.target.value,
    });

    this.socket.emit('isTyping', { 
      username: this.props.userData.username,
      isTyping: !!event.target.value,
      trip: this.props.tripId
    });
  }

  handleSendMessage() {
    let tripId = this.props.tripId;
    let userId = this.props.userData.id;
    let username = this.props.userData.username;

    let date = new Date();
    let timestamp = date.toISOString().slice(0,10) + ' ' + date.toISOString().slice(11,19);

    this.updateChatBoxField({target: {value: ''}});

    if (!!this.state.chatBoxField) {
      axios.post(`/api/trips/${tripId}/sendmessage`, { userId: userId, username_from: username, message: this.state.chatBoxField, timestamp: timestamp})
        .catch(error => {
          console.log('Caught error sending message', error)
        });
    }
  }

  handleDeleteMessage(messageKey) {
    let tripId = this.props.tripId;
    axios.post(`/api/trips/${tripId}/deletemessage`, { messageKey: messageKey })
  }

  handlePingUser(messageData) {
    this.socket.emit('pingUser', {
      username_from: this.props.userData.username,
      user_id_from: this.props.userData.id,
      user_id_to: messageData.user_id_from,
      trip_id: messageData.trip_id
    });
  }

  render() {
    const { messages, otherIsTyping, chatBoxField } = this.state;
    const { userData } = this.props;
    
    // CONSIDER FIGURING OUT HOW TO SORT '2017-07-04T08:02:03.000Z'
    // const sortedMessages = messages.sort(function(a, b) {
    //   return b.time_stamp - a.time_stamp;
    // });

    // NEED TO SET A TEXT LIMIT ON SENDING MESSAGE
    var typingIndiciator;
    if (otherIsTyping.isTyping) {
      typingIndiciator = <TypingIndicator username={otherIsTyping.username}/>
    }

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            Trip Forum
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Comment.Group>
            {
              messages.map((messageData, index) => {
                return <MessageEntry 
                          key={index} 
                          user={userData} 
                          messageData={messageData} 
                          handlePingUser={this.handlePingUser}
                          handleDeleteMessage={this.handleDeleteMessage} 
                       />
              })
            } 
            {
              typingIndiciator
            }
          </Comment.Group>
        </Card.Content>
        <Card.Content>
          <Form>
            <Input 
              type='text' 
              value={chatBoxField} 
              onChange={this.updateChatBoxField} 
              placeholder='Message your fellow toads...' 
              fluid action
            ><input />
            <Button 
              type='Submit' 
              color='green'
              content='Send'
              onClick={this.handleSendMessage} 
            />
            </Input>
          </Form>
        </Card.Content>
      </Card> 
    )
  }
}

export default ChatBox;

 // <Button color="blue" onClick={handleSendMessage}>Send</Button>