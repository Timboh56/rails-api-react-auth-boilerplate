import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import BaseStore from './stores/BaseStore';
import ProductStore from './stores/ProductStore';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class ProductContainer extends BaseComponent {
  render() {
    let product = this.props.product
    return(
      <Container>
        <Header as='h2'>
          {product.name}
        </Header>
        <br/>

        {
          product.description &&
          <p>
            {
              product.description
            }
          </p>
        }
      </Container>
    )
  }
}

export default ProductContainer;
