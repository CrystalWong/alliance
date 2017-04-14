import Api from '@/api/api'
let api = new Api()
let domain = window.location.host
var gatewayTicket =  domain === 'lmb.jyall.com'? '/user-api' : 'ticket'
export default {
  toLogin (params, cb) {
    return api.get('/user-api/v1/unionUseLogin/', params, cb)
  },
  toLogout (params, cb) {
    return api.get('/user-api/v1/union/loginOut/', params, cb)
  },
  checkLogin (params, cb) {//检测tokenId是否有效
    return api.get('/user-api/v1/union/checkLogin/', params, cb)
  },
  updatePwd (params, cb) {
    return api.get('/user-api/v1/updatePwd/', params, cb)
  },
  resetPwd (params, cb) {
    return api.get('/user-api/v1/resetPassword/', params, cb)
  }, 
  getQrCode (params, cb) {
    return api.get('/jyhouse-union/v1/provider/1.0/getGoldenByUnionId/', params, cb)
  },
  getManager (params, cb) {//获取金管家信息
    return api.get('/jyhouse-union/v1/provider/1.0/getGoldenByUnionId/', params, cb)
  },
  getTicket (params, cb) {
    return api.get(gatewayTicket + '/v1/ticket/get/', params, cb)
  },
  getCaptcha (params, cb) {
    return api.get(gatewayTicket + '/v1/vcode/get/', params, cb)
  },
  submitCaptcha (params, cb) {
    return api.get(gatewayTicket + '/v1/vcode/check/', params, cb)
  }
}
