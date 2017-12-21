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
        localStorage.setItem(
          'authentication-token', data['user']['authentication_token']
        )
        localStorage.setItem(
          'profile', JSON.stringify(data['user'])
        )
        fulfill(data)
      } else reject(data)
    }).bind(this))
  });
}

function removeUser() {
  localStorage.removeItem('profile');
  localStorage.removeItem('authentication-token');

  return BaseStore.fetch('api/auth/logout', {
    method: 'DELETE'
  })
}

class UserStoreClass extends EventEmitter {
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
    return localStorage.getItem('profile') !== null
  }

  authenticate() {

    return new Promise(function(fulfill, reject) {
      BaseStore.fetch(
        'api/auth/is_signed_in.json'
      ).then(data => {
        if (data['signed_in']) {
          localStorage.setItem(
            'authentication-token', data['user']['authentication_token']
          )
          localStorage.setItem(
            'profile', data['user'].toString()
          )
          fulfill(data)
        } else reject(data)
      })
    }.bind(this))
  }

  getUser() {
    return localStorage.getItem('profile');
  }

  getJwt() {
    return localStorage.getItem('authentication-token');
  }
}

const UserStore = new UserStoreClass();

UserStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case AuthConstants.LOGIN_USER:
      loginUser(action.profile).then(xhr => {
        UserStore.emitChange()
      });
      break

    case AuthConstants.LOGOUT_USER:
      removeUser();
      UserStore.emitChange();
      break

    default:
  }

});

export default UserStore;
