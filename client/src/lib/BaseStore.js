import AuthStore from '../stores/AuthStore';

const AuthHeaders = {
  'Content-Type': 'text/json',
  'Authorization': ''
}

const prepareFetchOptions = function(opts) {
  opts['body'] = JSON.stringify(opts['body'])

  if (!opts['headers'])
    opts['headers'] = new Headers(AuthHeaders)

  if (!opts['method'])
    opts['method'] = 'GET'

    return opts
}

export default class BaseStore {
  fetch (endpoint, opts = {}) {
    return new Promise((resolve, reject) => {

      opts = prepareFetchOptions(opts)

      window.fetch(endpoint, opts)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error))
    })
  }

  createNewRequest(url) {
    return new Request(url, {
    	headers: new Headers({
    		'Content-Type': 'text/json',
        'Authorization': ''
    	})
    })
  }
}
