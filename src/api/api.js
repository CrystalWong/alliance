import Vue from 'vue'
import VueResource from 'vue-resource'
import { Toast } from 'mint-ui'
Vue.use(VueResource)
// Vue.http.interceptors.push((request, next) => {
//   request.headers.set('APPkey','3')
//   next((response) => {
//     return response
//   })
// })
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
      //console.log(response.body, 1)
    }).catch(function(response){
      //console.log(2,response.body)
      if (response.body) {
        if (response.body.code !== 200 && response.body.message) {
          Toast(response.body.message)
        } else {
          Toast('网络连接失败，请检查您的网络')
        }
      } else {
        Toast('网络连接失败，请检查您的网络')
      }
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
