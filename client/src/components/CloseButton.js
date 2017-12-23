import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import BaseStore from '../stores/BaseStore';
import ProductStore from '../stores/ProductStore';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import FontAwesome from 'react-fontawesome';
class CloseButton extends BaseComponent {
  render() {
    let onClose = this.props.onClose

    return(
      <Button onClick={ onClose } className='fixed-close-button'>
        <FontAwesome
          name="times"
        />

      </Button>
    )

  }
}

export default CloseButton;
