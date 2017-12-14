import React, { Component } from 'react';
import logo from './logo.svg';
import { Link, Route, Switch } from 'react-router-dom';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import './App.css';
import BaseComponent from './BaseComponent';
import LoginForm from './LoginForm';
import Account from './Account'
import LoadingContainer from './LoadingContainer';
import ProductsIndex from './ProductsIndex';
import BaseStore from './lib/BaseStore';
import Auth from './lib/Auth';
import NavHeader from './NavHeader';

var auth = new Auth();

class App extends BaseComponent {

  componentDidMount() {
    auth.checkUserLoggedIn().then(function(data){
      this.setState(data)
    }.bind(this))
  }

  render() {

    if(this.state) {
      return(
        <Container id='layout'>
          <NavHeader signedIn={ this.state.signed_in }>
            <div className='main-content-container'>
              <Route path="/account" component={Account}/>
              <Route path="/products" component={ProductsIndex}/>
              <Route path="/login" component={LoginForm}/>

              { this.props.children }
            </div>
          </NavHeader>
        </Container>
      )
    } else {
      return(
        <Container>
        </Container>
      )
    }
  }
}

export default App;
