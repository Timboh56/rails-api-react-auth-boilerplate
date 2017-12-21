import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import BaseStore from '../stores/BaseStore';
import ProductStore from '../stores/ProductStore';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import FontAwesome from 'react-fontawesome';
class ProductContainer extends BaseComponent {
  render() {
    let product = this.props.product
    return(
      <Container>
        <Header as='h2'>
          {product.name}
        </Header>
        <br/>

        <div className='italic product-description'>
          {
            product.description
          }
        </div>
        <br />
        <div className='row'>
          <div className='column'>
            <Button className='add-to-cart-button'>
              <FontAwesome
                name='cart-plus' /> Add to Cart
            </Button>
          </div>
        </div>
      </Container>
    )
  }
}

export default ProductContainer;
