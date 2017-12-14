import React, { Component } from 'react';
import logo from './logo.svg';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import './App.css';
import BaseComponent from './BaseComponent';
import LoginForm from './LoginForm';
import LoadingContainer from './LoadingContainer';
import ProductsIndex from './ProductsIndex';
import BaseStore from './lib/BaseStore';
import Auth from './lib/Auth';
import NavHeader from './NavHeader';

const auth = new Auth();

class App extends BaseComponent {

  componentWillMount() {
    auth.checkUserLoggedIn.call(this)
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
          <NavHeader />
          <LoginForm />
        </Container>
      )

    }
  }
}

export default App;
