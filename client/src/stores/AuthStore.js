// src/stores/AuthStore.js

import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';
import { EventEmitter } from 'events';
import BaseStore from './BaseStore';

const CHANGE_EVENT = 'change';

function loginUser(profile) {
  return new Promise(function(fulfill, reject) {
    BaseStore.fetch('api/sessions', {
      method: 'POST',
      body: {
        user: profile
      },
    }).then((function(data) {
      if (data['signed_in'] == true) {
        BaseStore.setAuthenticationToken(data['authentication_token'])
        localStorage.setItem(
          'authentication-token', data['authentication_token']
        )
        fulfill(data)
      } else reject(data)
    }).bind(this))
  });
}

function removeUser() {

  localStorage.removeItem('profile');
  localStorage.removeItem('authentication-token');

  return BaseStore.fetch('api/sessions', {
    method: 'DELETE',
    body: {
      'email': this.email
    },
  }.bind(this))
}

class AuthStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  isAuthenticated() {
    if (localStorage.getItem('authentication-token')) {
      return true;
    }
    return false;
  }

  getUser() {
    return localStorage.getItem('profile');
  }

  getJwt() {
    return localStorage.getItem('authentication-token');
  }
}

const AuthStore = new AuthStoreClass();

AuthStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case AuthConstants.LOGIN_USER:
      loginUser(action.profile).then(xhr => {
        AuthStore.emitChange()
      });
      break

    case AuthConstants.LOGOUT_USER:
      removeUser();
      AuthStore.emitChange();
      break

    default:
  }

});

export default AuthStore;
