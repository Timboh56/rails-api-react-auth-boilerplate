import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import ShoppingCartStore from '../stores/ShoppingCartStore';

class ShoppingCartItemContainer extends BaseComponent {
  render() {
    let itemName = this.props.itemName
    let quantity = this.props.quantity

    return (
      <div className='mtsm row'>
        <div className='column'>
          { itemName }
          <span className='float-right'>
            +
            <span className='green-text'>
              { quantity }
            </span>
          </span>
        </div>
      </div>
    )
  }
}

export default ShoppingCartItemContainer;
