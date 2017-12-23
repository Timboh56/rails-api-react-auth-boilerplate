import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import BaseStore from '../stores/BaseStore';
import ProductStore from '../stores/ProductStore';
import CloseButton from './CloseButton';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import FontAwesome from 'react-fontawesome';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const componentClasses = ['product-container', 'faded-bg', 'example-component'];

class ProductContainer extends BaseComponent {

  render() {
    let product = this.props.product
    let onClose = this.props.onClose
    return(
      <Container
        className={ componentClasses.join(' ') }
      >
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
          <div className='mtxl pvl row'>
            <Header as='h2'>
              {product.name}
            </Header>
            <br/>

            <div className='italic product-description'>
              {
                product.description
              }
            </div>
          </div>
          <br />
          <div className='mtl row'>
            <div className='column'>
              <Button className='add-to-cart-button'>
                <FontAwesome
                  name='cart-plus' /> Add to Cart
              </Button>
            </div>
          </div>
          <CloseButton onClose={ onClose }/>
        </ReactCSSTransitionGroup>
      </Container>
    )
  }
}

export default ProductContainer;
