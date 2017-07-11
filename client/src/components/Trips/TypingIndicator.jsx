import React from 'react';
import { Comment, Loader } from 'semantic-ui-react';

const TypingIndicator = (props) => (
  <Comment>
    <Comment.Avatar src={props.otherIsTyping.img_url}/>
    <Comment.Content>
      <Comment.Author>
        {props.otherIsTyping.firstName}
      </Comment.Author>
      <Comment.Text>
        is typing <Loader size='tiny' active inline/>
      </Comment.Text>
    </Comment.Content>
  </Comment>
)

export default TypingIndicator;