import React, { Component } from 'react';
import BaseStore from '../stores/BaseStore';
import ProductStore from '../stores/ProductStore';
import BaseComponent from './BaseComponent';
import LoadingContainer from './LoadingContainer';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react';
import CloseButton from './CloseButton';

class CheckoutContainer extends BaseComponent {
  render() {
    let onClose = this.props.onClose

    return(
      <Container id='checkout-container' className='fixed checkout-container'>
        <Header as='h2'>
          Checkout
        </Header>
        <CloseButton onClose={ onClose } />
      </Container>
    )
  }
}

export default CheckoutContainer;
