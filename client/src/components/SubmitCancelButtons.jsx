import React from 'react'
import { Segment, Button } from 'semantic-ui-react'

const SubmitCancelButtons = (props) => (
  <div>
    <Segment textAlign="right">
      <Button  color="green" onClick={props.submitClickHandler}> Submit</Button>
      <Button  color="grey" onClick={props.cancelClickHandler}>Cancel</Button>
    </Segment>
  </div>
)

export default SubmitCancelButtons;

