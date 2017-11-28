import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import LoadingContainer from './LoadingContainer';
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
    this.fetch('api/products')
      .then(products => {
        this.setState({products: products})
        this.getProduct(products[0].id)
      })
  }

  getProduct (id) {
    this.fetch(`api/products/${id}`)
      .then(product => this.setState({product: product}))
  }

  renderProductLinks() {
    let { products, product } = this.state

    return Object.keys(products).map(
      (key) => {
        return (
          <Button active={product && product.id === products[key].id} fluid key={key} onClick={() => this.getProduct(products[key].id)}>
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
        <Container text>
        <Header as='h2' icon textAlign='center'>
        <Icon name='cocktail' circular />
        <Header.Content>
          List
        </Header.Content>
      </Header>
      <Button.Group fluid widths={products.length}>
        {
          this.renderProductLinks.call(this)
        }
      </Button.Group>
      <Divider hidden />
      {product &&
        <Container>
          <Header as='h2'>{product.name}</Header>
          {product.description && <p>{product.description}</p>}
        </Container>
      }
    </Container>
      )
    } else {
      return (
        <LoadingContainer />
      )
    }
  }
}

export default ProductsIndex;
