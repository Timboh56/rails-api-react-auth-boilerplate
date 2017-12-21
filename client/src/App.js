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
import Auth from './actions/Auth';
import UserStore from './stores/UserStore';
import NavHeader from './NavHeader';
import RegistrationForm from './RegistrationForm';

class App extends BaseComponent {
  constructor() {
    super()
    this.state = {}
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
            <div className='main-content-container'>
              <Route path="/account" component={Account}/>
              <Route path="/products" component={ProductsIndex}/>
              <Route path="/login" component={LoginForm}/>
              <Route path="/signup" component={RegistrationForm}/>

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
