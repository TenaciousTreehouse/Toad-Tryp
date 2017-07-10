import React from 'react';
import { Icon, Comment, Container } from 'semantic-ui-react';

class MessageEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { messageData, user, handlePingUser, handleDeleteMessage } = this.props;

    let trash;
    let messageAlign = 'left';
    let ping = <Comment.Action onClick={() => handlePingUser(messageData)}>
                <Icon name='lightning' />
               </Comment.Action>;

    if (user.id === messageData.user_id_from) {
      ping = null;
      messageAlign = 'right';
      trash = <Comment.Action onClick={() => handleDeleteMessage(messageData.id)}>
                <Icon name='trash outline' />
              </Comment.Action>;
    }

    return (
      <Container textAlign={messageAlign}>
        <Comment>
          <Comment.Author>
            {messageData.user.first_name}
            {ping}
          </Comment.Author>
          <Comment.Text>
            {messageData.message}
            {trash}
          </Comment.Text>
        </Comment>
      </Container>
    )
  }
}

export default MessageEntry;