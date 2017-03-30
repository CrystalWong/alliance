import Api from '@/api/api'
let api = new Api()

export default {
  toLogin (params, cb) {
    return api.get('/v1/unionUseLogin/', params, cb)
  },
  toLogout (params, cb) {
    return api.get('/v1/union/loginOut/', params, cb)
  },
  checkLogin (params, cb) {//检测tokenId是否有效
    return api.get('/v1/union/checkLogin/', params, cb)
  },
  updatePwd (params, cb) {
    return api.get('/v1/updatePwd/', params, cb)
  },
  resetPwd (params, cb) {
    return api.get('/v1/resetPwd/', params, cb)
  }, 
  getQrCode (params, cb) {
  	return api.get('golden' + '/v1/provider/1.0/getGoldenByUnionId/', params, cb)
  },
  getManager (params, cb) {//获取金管家信息
  	return api.get('golden' + '/v1/provider/1.0/getGoldenByUnionId/', params, cb)
  }
}
