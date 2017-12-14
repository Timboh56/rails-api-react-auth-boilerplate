import BaseStore from './BaseStore';
import $ from 'jquery';
import AuthStore from '../stores/AuthStore';

class Auth {
  constructor() {
    this.signed_in = false;
    this.checkUserLoggedIn.bind(this);
    this.login.bind(this);
    this.logout.bind(this);


  }

  register(email, password) {
    return BaseStore.fetch('api/users', {
      method: 'POST',
      body: {
        'email': email,
        'password': password
      },
    }).then((function(data){
      BaseStore.setAuthenticationToken(data['authentication_token'])
      this.signed_in = true
      this.email = data.email
      return data
    }).bind(this))
  }

  login(email, password) {

    var opts = {
      user: {
        email: email,
        password: password
      }
    }

    return BaseStore.fetch('api/sessions', {
      method: 'POST',
      body: opts,
    }).then((function(data){
      BaseStore.setAuthenticationToken(data['authentication_token'])
      this.signed_in = true
      this.email = data.email
      return data
    }).bind(this))
  }

  logout() {

    var opts = {
      'email': this.email
    }

    debugger

    return BaseStore.fetch('api/sessions', {
      method: 'DELETE',
      body: opts,
    }).then((function(data){
      BaseStore.setAuthenticationToken(null)
      this.signed_in = false
      return data
    }).bind(this))
  }

  checkUserLoggedIn() {
    return BaseStore.fetch('api/auth/is_signed_in.json')
  }
}


export default new Auth();
