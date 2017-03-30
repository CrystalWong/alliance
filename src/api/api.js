import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
const API = class Api {
  constructor () {
    var header = {
      'Content-Type': 'application/json; charset=UTF-8',
      'apiVersion': '1.0',
      'platform': 'webApp'
    }
  }
  get (url, params, cb) {
    for (var k in params) {
      url += params[k] + '/'
    }
    return Vue.http.get(url).then(function (response) {
      cb(response.body)
    }).catch(function(response){
      cb(response.body)
    })
  }
  post (url, opt) {
    return Vue.http.post(url, {params: params}).then(function (response) {
      cb(response.body)
    }).catch(function(response){
      cb(response.body)
    })
  }
  jsonp (url, opt) {
    return Vue.http.jsonp(url, {params: params}).then(function (response) {
      cb(response.body)
    }).catch(function(response){
      cb(response.body)
    })
  }
}

export default API
