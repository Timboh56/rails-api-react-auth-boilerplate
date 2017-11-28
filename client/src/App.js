import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BaseComponent from './BaseComponent';
import LoginForm from './LoginForm';
import LoadingContainer from './LoadingContainer';
import ProductsIndex from './ProductsIndex';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class App extends BaseComponent {
  constructor() {
    super()
  }

  componentWillMount() {
    this.fetch('api/auth/is_signed_in.json')
      .then(data => {
        this.setState({ signedIn: data.signed_in });
      })
  }

  render() {
    if (this.state && this.state.signedIn) {
      return(
        <Container id='layout'>
          <ProductsIndex />
        </Container>
      )
    } else {
      return (
        <Container id='layout'>
          <LoginForm />
        </Container>
      )

    }
  }
}

export default App;
