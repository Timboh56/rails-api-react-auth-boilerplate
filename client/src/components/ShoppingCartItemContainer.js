import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import ShoppingCartStore from '../stores/ShoppingCartStore';

class ShoppingCartItemContainer extends BaseComponent {
  render() {
    let itemName = this.props.itemName
    let quantity = this.props.quantity

    return (
      <div className='mtxs row'>
        <div className='column small-text'>
          <span className='bold'>{ itemName }</span>
          <span className='float-right'>
            +
            <span className='green-text small-text'>
              { quantity }
            </span>
          </span>
        </div>
      </div>
    )
  }
}

export default ShoppingCartItemContainer;
