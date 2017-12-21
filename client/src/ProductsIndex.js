import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import LoadingContainer from './LoadingContainer';
import BaseStore from './stores/BaseStore';
import ProductStore from './stores/ProductStore';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class ProductsIndex extends BaseComponent {
  constructor() {
    super()
    this.getProducts.bind(this)
    this.getProduct.bind(this)
  }

  componentDidMount () {
    this.getProducts()
  }

  getProducts () {
    ProductStore.getProducts().then(data => {
      let products = ProductStore.cachedProducts()
      let first_key = Object.keys(products)[0];
      this.getProduct(first_key)
    })
  }

  getProduct (id) {
    ProductStore.getProduct(id).then(data => {
      this.setState(
        'products': data
      )
    }).catch(err => {
      this.setState()
    })
  }

  renderProductLinks() {
    let { products, product } = this.state
    return Object.keys(products).map(
      (key) => {
        return (
          <Button className="navlink" active={product && product.id === products[key].id} fluid key={key} onClick={() => this.getProduct(products[key].id)}>
            {products[key].name}
          </Button>
        )
      }
    )
  }
  render() {
    if (this.state && this.state.products && this.state.product) {
      let { products, product } = this.state;
      return (
        <div className='mtl'>
          <Container text>
            <Header as='h2' icon textAlign='center'>
              <Icon name='cocktail' circular />
              <Header.Content>
                Our Wines
              </Header.Content>
            </Header>
          </Container>
          <Container>
            <Button.Group fluid widths={products.length}>
              {
                this.renderProductLinks.call(this)
              }
            </Button.Group>
            <Divider hidden />
            { product &&
              <Container>
                <Header as='h2'>{product.name}</Header>
                {product.description && <p>{product.description}</p>}
              </Container>
            }
          </Container>
        </div>
      )
    } else {
      return (
        <LoadingContainer />
      )
    }
  }
}

export default ProductsIndex;
