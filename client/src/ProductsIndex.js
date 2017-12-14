import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import LoadingContainer from './LoadingContainer';
import BaseStore from './lib/BaseStore';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

var CachedProducts = {};

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
    if (Object.keys(CachedProducts).length === 0 && CachedProducts.constructor === Object) {
      BaseStore.fetch('api/products')
        .then(products => {
          CachedProducts['products'] = products
          this.setState({products: products})
          this.getProduct(products[0].id)
        })
    } else {
      this.setState(CachedProducts)
      this.getProduct(CachedProducts['products'][0].id)
    }
  }

  getProduct (id) {
    var key = `product-${ id }`
    if (CachedProducts['products'] && CachedProducts['products'][key]) {
      this.setState({product: CachedProducts['products'][key]})
    } else {
      BaseStore.fetch(`api/products/${id}`)
        .then(product => {
          this.setState({product: product})
          CachedProducts['products'][key] = product
        }
      )
    }
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
        <div>
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
