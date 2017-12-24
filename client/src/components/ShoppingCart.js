import React, { Component } from 'react';
import { Container, Message, Header, Button, Icon, Loader, Divider } from 'semantic-ui-react'
import BaseComponent from './BaseComponent';
import CloseButton from './CloseButton';
import ShoppingCartStore from '../stores/ShoppingCartStore';
import ShoppingCartActions from '../actions/ShoppingCartActions';
import ShoppingCartItemContainer from'./ShoppingCartItemContainer';
import FontAwesome from 'react-fontawesome';

class ShoppingCart extends BaseComponent {

  constructor() {
    super()
  }

  renderItemContainers() {
    let items = ShoppingCartStore.getItems()

    return Object.keys(items).map(
        (key) => {
          let itemName = items[key]['name'],
            quantity = items[key]['quantity']
          return(
            <ShoppingCartItemContainer
              key={ key }
              itemName={ itemName }
              quantity={ quantity}
            />
          )
        }
    )
  }

  checkout() {
    ShoppingCartActions.checkout()
  }

  render() {
    let { onCheckout, onClose } = this.props
    return(
      <Container id='shopping-cart-container' className='fixed'>
        <Header as='h3' className='mtxs bold'>
          <FontAwesome
            name="shopping-bag"
          />
          <span className='mlsm'> Shop </span>
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
          <div className='twelve wide column small-font'>
            Please read our <a href='/terms'>terms of service</a> before purchasing.
          </div>
        </Message>
        <div className='row bottom'>
          <Button onClick={ onCheckout } className='checkout-button bottom'>
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
