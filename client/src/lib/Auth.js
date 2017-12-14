import BaseStore from './BaseStore';
import $ from 'jquery';
import AuthStore from '../stores/AuthStore';

export default class Auth {
  constructor() {
    this.signed_in = false;
    this.checkUserLoggedIn.bind(this);
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
    }).bind(this))
  }

  checkUserLoggedIn() {
    return BaseStore.fetch('api/auth/is_signed_in.json')
  }
}
