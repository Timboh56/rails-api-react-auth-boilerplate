import BaseStore from './BaseStore';
import $ from 'jquery';
import AuthStore from '../stores/AuthStore';

export default class Auth {
  constructor() {
    this.loggedIn = false;
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
      this.loggedin = true
    }).bind(this))
  }

  checkUserLoggedIn() {
    return BaseStore.fetch('api/auth/is_signed_in.json')
  }
}
