import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import BaseStore from './BaseStore';

const CHANGE_EVENT = 'change';

var CachedPosts = {};

class ProductStoreClass extends EventEmitter {
  getPosts(opts = {}) {
    return new Promise(function(fulfill, reject) {
      if (Object.keys(CachedPosts).length === 0 && CachedPosts.constructor === Object) {
        return BaseStore.fetch('api/posts', opts)
          .then(posts => {
            CachedPosts['posts'] = posts.reduce(
              (map, obj) => {
                  map[obj.id] = obj
                  return map
                }, {}
              )
            fulfill(CachedPosts['posts'])
          }
        )
      } else {
        fulfill(CachedPosts['posts'])
      }
    }.bind(this))
  }

  getProduct(id) {
    var key = `post-${ id }`

    return new Promise(function(fulfill, reject) {
      if (CachedPosts['posts'] && CachedPosts['posts'][key]) {
        fulfill(
          {
            product: CachedPosts['posts'][key]
          }
        )
      } else {
        BaseStore.fetch(`api/posts/${id}`)
          .then((xhr) => {
            if (xhr.status && xhr.status != 200) {
              reject(xhr)
            } else {
              fulfill(
                {
                  post: xhr
                }
              )
              CachedPosts['posts'][id]['content'] = xhr
            }
          }
        )
      }
    }.bind(this))
  }

  cachedPosts() {
    return CachedPosts['posts'];
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

const ProductStore = new ProductStoreClass();

export default ProductStore;
