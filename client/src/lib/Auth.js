import BaseStore from './BaseStore';
import $ from 'jquery';
import AuthStore from '../stores/AuthStore';
const Base = new BaseStore()

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
    Base.fetch('api/sessions', {
      method: 'POST',
      body: opts,
    }).then(data => {
      debugger
    })
  }

  checkUserLoggedIn() {
    Base.fetch('api/auth/is_signed_in.json')
      .then(data => {
        this.setState({ signedIn: data.signed_in })
      })
  }
}
