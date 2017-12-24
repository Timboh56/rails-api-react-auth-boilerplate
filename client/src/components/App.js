import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import { Link, Route, Switch } from 'react-router-dom';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import '../css/App.css';
import ShoppingCartStore from '../stores/ShoppingCartStore';
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
import CheckoutContainer from './CheckoutContainer';
import FontAwesome from 'react-fontawesome';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const CHECKOUT_CONTAINER_ID = 'checkout-container'
const SHOPPING_CART_ID = 'shopping-cart'

class App extends BaseComponent {

  constructor() {
    super()
    this.state = {}
    this.onCloseShoppingCart.bind(this)
    this.onCloseCheckout.bind(this)
    this.onCheckout.bind(this)
    this.onChangeShoppingCart.bind(this)
    ShoppingCartStore.addChangeListener(this.onChangeShoppingCart.bind(this))
  }

  onCloseShoppingCart() {
    ReactDOM.render(
      <div>
      </div>, document.getElementById(SHOPPING_CART_ID));
  }

  onCloseCheckout() {
    ReactDOM.render(
      <div>
      </div>, document.getElementById(CHECKOUT_CONTAINER_ID));
  }

  onCheckout() {
    this.onCloseShoppingCart()
    ReactDOM.render(
      <CheckoutContainer
        onClose={ this.onCloseCheckout.bind(this) }
      />, document.getElementById(CHECKOUT_CONTAINER_ID));
  }

  onChangeShoppingCart() {
    ReactDOM.render(
      <ShoppingCart
        onClose={ this.onCloseShoppingCart.bind(this) }
        onCheckout={ this.onCheckout.bind(this) }
      >
      </ShoppingCart>, document.getElementById(SHOPPING_CART_ID));
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
          <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
            <div id={ SHOPPING_CART_ID }></div>
            <div id={ CHECKOUT_CONTAINER_ID }></div>
            <div onClick={ this.onChangeShoppingCart.bind(this) } id='shopping-cart-button'>
              <FontAwesome
                name='shopping-bag'
                className='big-text'
              />
            </div>
          </ReactCSSTransitionGroup>
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
