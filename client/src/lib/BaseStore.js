import AuthStore from '../stores/AuthStore';

var AuthHeaders = {
  'Content-Type': 'application/json',
  'Authorization': '47120e3d8b78517645e0eb668a14cc9b',
  'AuthenticationToken': localStorage['authentication-token']
}

const prepareFetchOptions = function(opts) {
  opts['body'] = JSON.stringify(opts['body'])

  if (!opts['headers'])
    opts['headers'] = new Headers(AuthHeaders)

  if (!opts['method'])
    opts['method'] = 'GET'

  return opts
}

class BaseStore {

  constructor() {
    this.setAuthenticationToken.bind(this)
    this.fetch.bind(this)
  }

  setAuthenticationToken(authenticationToken) {
    localStorage['authentication-token'] = authenticationToken
  }

  fetch (endpoint, opts = {}) {
    return new Promise((resolve, reject) => {

      opts = prepareFetchOptions(opts)

      window.fetch(endpoint, opts)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error))
    })
  }

}

export default new BaseStore();
