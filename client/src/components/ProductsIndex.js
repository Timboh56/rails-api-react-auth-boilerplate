import React, { Component } from 'react';
import ProductStore from '../stores/ProductStore';
import BaseComponent from './BaseComponent';
import LoadingContainer from './LoadingContainer';
import ProductContainer from './ProductContainer';
import ProductLinkContainer from './ProductLinkContainer';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ProductsIndex extends BaseComponent {
  constructor() {
    super()
    this.onClose.bind(this)
    this.getProducts.bind(this)
    this.getProduct.bind(this)
  }

  onClose() {
    let products = ProductStore.cachedProducts()

    this.setState({
      'product': null,
      'products': products
    })
  }

  componentDidMount () {
    this.getProducts()
  }

  getProducts () {
    ProductStore.getProducts().then(function(data){
      let products = ProductStore.cachedProducts()
      this.setState({
        'products': products
      })
    }.bind(this))
  }

  getProduct (id) {
    ProductStore.getProduct(id).then(function(data) {
      this.setState({
        'product': data['product']
      })
    }.bind(this)).catch(err => {
      this.setState()
    })
  }

  renderProductLinks() {
    let { products, product } = this.state
    return Object.keys(products).map(
      (key) => {
        return (
          <ProductLinkContainer
            productKey={ key }
            onClick={ () => this.getProduct(key) }
          />
        )
      }
    )
  }

  render() {
    if (this.state && this.state.products) {
      let { products, product } = this.state;
      return (
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
          <div>
            <Container text>
              <Header as='h2' icon>
                <Icon name='cocktail' circular />
                <Header.Content>
                  Our Products
                </Header.Content>
              </Header>
            </Container>
            <Container>
              <div className='product-links-container mtl'>
                {
                  this.renderProductLinks.call(this)
                }
              </div>
              <Divider hidden />
            </Container>
          </div>
          { product &&
            <ProductContainer
              product={ product }
              onClose={ this.onClose.bind(this) }
              unmount={ this.onClose.bind(this) }
            />
          }
        </ReactCSSTransitionGroup>
      )
    } else {
      return (
        <LoadingContainer />
      )
    }
  }
}

export default ProductsIndex;
