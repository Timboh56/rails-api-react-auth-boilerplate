import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import BaseStore from './BaseStore';
import ShoppingCartConstants from '../constants/ShoppingCartConstants';

const CHANGE_EVENT = 'change';

var ShoppingCartCache = {};

function removeFromCart(item_id) {
  delete ShoppingCartCache[item_id]
  return true
}

function addToCart(item_opts) {
  let key = item_opts['id']
  ShoppingCartCache[key] = item_opts
  return true
}

class ShoppingCartStore extends EventEmitter {

  ShoppingCart() {
    return ShoppingCartCache;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}

const ShoppingCart = new ShoppingCartStore();

ShoppingCart.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case ShoppingCartConstants.CHECKOUT:
      ShoppingCart.emitChange()
      break

    case ShoppingCartConstants.ADD_TO_CART:
      addToCart(action['item']);
      ShoppingCart.emitChange();
      break

    case ShoppingCartConstants.REMOVE_FROM_CART:
      removeFromCart(action['item']['id']);
      ShoppingCart.emitChange();
      break
    default:
  }

});

export default ShoppingCart;
