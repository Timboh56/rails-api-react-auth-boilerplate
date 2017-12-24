import React, { Component } from 'react';
import { Container, Message, Header, Button, Icon, Loader, Divider } from 'semantic-ui-react'
import BaseComponent from './BaseComponent';
import CloseButton from './CloseButton';
import ShoppingCartStore from '../stores/ShoppingCartStore';
import ShoppingCartItemContainer from'./ShoppingCartItemContainer';

class ShoppingCart extends BaseComponent {

  renderItemContainers() {
    let items = ShoppingCartStore.getItems()

    return Object.keys(items).map(
        (key) => {
          let itemName = items[key]['name'],
            quantity = items[key]['quantity']
          return(
            <ShoppingCartItemContainer
              itemName={ itemName }
              quantity={ quantity}
            />
          )
        }
    )
  }

  render() {
    let onClose = this.props.onClose
    return(
      <Container id='shopping-cart-container' className='fixed'>
        <Header as='h3' className='mtxs bold'>
          Shopping Cart
        </Header>
        <CloseButton onClose={ onClose }/>
        <Message className='row'>
          <div className='twelve wide column'>
            <h4>
              Items
            </h4>
          </div>
          <div className='row'>
            <div className='twelve wide column'>
              { this.renderItemContainers.call(this) }
            </div>
          </div>
        </Message>
        <Message className='row'>
          <div className='twelve wide column'>
            Please read our terms of service before purchasing.
          </div>
        </Message>
        <div className='row bottom'>
          <Button className='checkout-button bottom'>
            <Icon name='payment' /> Checkout
          </Button>
          <Button onClick={ onClose } className='cancel-button-small'>
            <Icon name='remove' /> Cancel
          </Button>
        </div>
      </Container>
    )
  }

}

export default ShoppingCart;
