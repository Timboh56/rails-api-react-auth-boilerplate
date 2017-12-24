import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import BaseStore from './BaseStore';
import ShoppingCartConstants from '../constants/ShoppingCartConstants';

const CHANGE_EVENT = 'change';

var ShoppingCartCache = {
  'items': {}
};

function removeFromCart(item_id, amount = 1) {
  if (ShoppingCartCache['items'][item_id]) {
    let prevQuantity = ShoppingCartCache['items'][item_id]['quantity'],
      difference = prevQuantity - amount

    if (difference < 1)
      delete ShoppingCartCache['items'][item_id]
    else if (difference > 0)
      ShoppingCartCache['items'][item_id]['quantity'] = difference
  }

  return true
}

function addToCart(item_opts) {
  let key = item_opts['id']

  if (ShoppingCartCache['items'][key]) {
    let prevQuantity = ShoppingCartCache['items'][key]['quantity'] || 1
    ShoppingCartCache['items'][key]['quantity'] = prevQuantity + (item_opts['quantity'] || 1)
  } else {
    item_opts['quantity'] = 1
    ShoppingCartCache['items'][key] = item_opts
  }
  return true
}

class ShoppingCartStore extends EventEmitter {

  getItem(id) {
    return ShoppingCartCache['items'][id]
  }

  getItems(opts = {}) {
    return ShoppingCartCache['items']
  }

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

ShoppingCart.dispatchToken = AppDispatcher.register(

  action => {

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

  }
);

export default ShoppingCart;
