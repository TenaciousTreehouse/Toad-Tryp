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
    let picture = messageData.user.img_url;
    let ping = <Comment.Action onClick={() => handlePingUser(messageData)}>
                <Icon name='lightning' />
               </Comment.Action>;

    if (user.id === messageData.user_id_from) {
      ping = null;
      picture = null;
      messageAlign = 'right';
      trash = <Comment.Action onClick={() => handleDeleteMessage(messageData.id)}>
                <Icon name='trash outline' />
              </Comment.Action>;
    }

    return (
      <Container textAlign={messageAlign}>
        <Comment>
          <Comment.Avatar src={picture}/>
          <Comment.Content>
            <Comment.Author>
              {messageData.user.first_name}
              {ping}
            </Comment.Author>
            <Comment.Text>
              {messageData.message}
              {trash}
            </Comment.Text>
          </Comment.Content>
          
        </Comment>
      </Container>
    )
  }
}

export default MessageEntry;