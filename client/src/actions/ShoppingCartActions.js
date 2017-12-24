import BaseStore from '../stores/BaseStore';
import $ from 'jquery';
import UserStore from '../stores/UserStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ShoppingCartConstants from '../constants/ShoppingCartConstants';

class ShoppingCartActions {

  constructor() {
    this.addToCart.bind(this);
    this.removeFromCart.bind(this);
  }

  checkout() {
    return AppDispatcher.dispatch({
      actionType: ShoppingCartConstants.CHECKOUT
    })
  }

  addToCart(item_opts = {}) {
    return AppDispatcher.dispatch({
      actionType: ShoppingCartConstants.ADD_TO_CART,
      'item': item_opts
    })
  }

  removeFromCart(item_id) {

    return AppDispatcher.dispatch({
      actionType: ShoppingCartConstants.REMOVE_FROM_CART,
      'item': {
        'id': item_id,
      }
    })
  }
}

export default new ShoppingCartActions();
