import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import { Header } from 'semantic-ui-react'

class ProductImages extends BaseComponent {
  render() {
    return(
      <div className='two wide column'>
        <Header as='h2'>
        </Header>
      </div>
    )
  }
}
export default ProductImages;
