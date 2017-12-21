import BaseStore from '../stores/BaseStore';
import $ from 'jquery';
import UserStore from '../stores/UserStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';

class Auth {

  constructor() {
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
      this.signed_in = true
      this.email = data.email
      return data
    }).bind(this))
  }

  login(email, password) {

    return AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN_USER,
      profile: {
        'email': email,
        'password': password
      }
    })
  }

  logout() {
    return AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT_USER
    })
  }

  checkUserLoggedIn() {
    return UserStore.authenticate()
  }
}


export default new Auth();
