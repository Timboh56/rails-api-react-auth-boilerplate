import React, { Component } from 'react';
import ProductStore from '../stores/ProductStore';
import BaseComponent from './BaseComponent';
import LoadingContainer from './LoadingContainer';
import ProductContainer from './ProductContainer';
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
      let first_key = Object.keys(products)[0];
      this.setState({
        'products': products
      })
      this.getProduct(first_key)
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
          <div
            className="flex transition product-link-container"
            active={product && product.id === products[key].id}
            fluid
            key={key} onClick={
              () => this.getProduct(products[key].id)
            }
          >
            {products[key].name}
          </div>
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
