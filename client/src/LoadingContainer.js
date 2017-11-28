import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class LoadingContainer extends Component {
  render() {
    return (
      <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
    )
  }
}

export default LoadingContainer;
