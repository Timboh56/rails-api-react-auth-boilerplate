import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import ProductStore from '../stores/ProductStore';

class ProductLinkContainer extends BaseComponent {
  render() {
    let { onClick, productKey } = this.props,
      products = ProductStore.cachedProducts(),
      product = products[productKey]

    return(
      <div
        className="flex transition product-link-container"
        active={product && product.id === product.id}
        fluid
        onClick={ onClick }
      >
        <div className='full-width row h2'>
          { product.name}
        </div>
        <br />
        <div className='product-summary-container full-width row small-text'>
          { product.summary}
        </div>
      </div>
    )
  }
}

export default ProductLinkContainer;
