import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from './BaseComponent';
import BaseStore from '../stores/BaseStore';
import ProductStore from '../stores/ProductStore';
import ShoppingCartActions from '../actions/ShoppingCartActions';
import ShoppingCartStore from '../stores/ShoppingCartStore';
import ShoppingCart from './ShoppingCart';
import CloseButton from './CloseButton';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import FontAwesome from 'react-fontawesome';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ProductImages from './ProductImages';
const componentClasses = ['product-container', 'faded-bg', 'example-component'];

var productCache = {}
class ProductContainer extends BaseComponent {

  constructor() {
    super()
    ShoppingCartStore.addChangeListener(this.onChangeShoppingCart.bind(this))
  }

  onChangeShoppingCart(){
    this.props.unmount()
  }

  addToCart() {
    ShoppingCartActions.addToCart(productCache)
  }

  render() {
    let product = this.props.product
    let onClose = this.props.onClose
    let addedToCart = this.state && this.state.addedToCart ? this.state.addedToCart : false

    productCache = product

    var str = (
      <Container
        className={ componentClasses.join(' ') }
      >
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
          <div className='mtxl pvl row ui grid'>
            <div className='ten wide column'>
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

              <div className='mtl row'>
                <div className='column'>
                  <Button onClick={ onClose } className='cancel-button'>
                    <FontAwesome
                      name='times' /> Cancel
                  </Button>
                  <Button onClick={ this.addToCart } className='add-to-cart-button'>
                    <FontAwesome
                      name='cart-plus' /> Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            {
              product.images && <ProductImages images={ product.images }/>
            }
          </div>
          <CloseButton onClose={ onClose }/>
        </ReactCSSTransitionGroup>
      </Container>
    )

    return str
  }
}

export default ProductContainer;
