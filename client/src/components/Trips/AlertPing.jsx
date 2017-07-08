import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const AlertPing = (props) => (
  <Modal size='small' open={true}>
    <Modal.Header>
      You've been pinged to join {props.pingedData.username_from}!
    </Modal.Header>
    <Modal.Actions>
      <Button color='grey' content='Ignore' onClick={props.dismissPing} />
      <Button color='green' 
              content={`Join`} 
              icon='chevron right' 
              labelPosition='right' 
              onClick={() => props.redirectFromPing(props.pingedData.trip_id)} 
      />
    </Modal.Actions>
  </Modal>
)

export default AlertPing;