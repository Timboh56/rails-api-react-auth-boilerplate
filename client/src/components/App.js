import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import { Link, Route, Switch } from 'react-router-dom';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import '../css/App.css';
import BaseComponent from './BaseComponent';
import LoginForm from './LoginForm';
import Account from './Account'
import LoadingContainer from './LoadingContainer';
import ProductsIndex from './ProductsIndex';
import Auth from '../actions/Auth';
import UserStore from '../stores/UserStore';
import NavHeader from './NavHeader';
import RegistrationForm from './RegistrationForm';
import Blog from './Blog';
import ShoppingCart from './ShoppingCart';
import ShoppingCartStore from '../stores/ShoppingCartStore';

class App extends BaseComponent {
  constructor() {
    super()
    this.state = {}
    ShoppingCartStore.addChangeListener(this.onChangeShoppingCart.bind(this))
  }

  onCloseShoppingCart() {
    ReactDOM.render(
      <div>
      </div>, document.getElementById('shopping-cart'));
  }

  onChangeShoppingCart() {
    ReactDOM.render(
      <ShoppingCart
        onClose={ this.onCloseShoppingCart.bind(this) }
      >
      </ShoppingCart>, document.getElementById('shopping-cart'));
  }

  componentWillMount() {
    UserStore.addChangeListener(this.onAuthChange.bind(this))
    Auth.checkUserLoggedIn().then(function(data){
      this.setState({
        'signedIn': data['signed_in'],
        'currentUser': data['user']
      })
    }.bind(this)).catch(err => {
      console.log(err)
      this.setState({

      })
    })
  }

  onAuthChange(data) {
    this.setState({
      'signedIn': UserStore.isAuthenticated()
    })
  }

  render() {

    if(this.state) {
      return(
        <Container id='layout'>
          <NavHeader signedIn={ this.state.signedIn }>
            <Route path="/account" component={Account}/>
            <Route path="/products" component={ProductsIndex}/>
            <Route path="/blog" component={Blog}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/signup" component={RegistrationForm}/>
              { this.props.children }
          </NavHeader>
          <div id='shopping-cart'></div>
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
