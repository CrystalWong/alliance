import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import service from '@/api/service'
Vue.use(Vuex)
Vue.use(VueResource)
function clearSession () {
  window.sessionStorage.setItem('tokenId', '')
  window.sessionStorage.setItem('loginFlag', 'false')
  window.sessionStorage.setItem('mobile', '')
  window.sessionStorage.setItem('unionId', '')
  window.sessionStorage.setItem('unionBusinessName', '')
  window.sessionStorage.setItem('unionBusinessId', '')
  window.sessionStorage.setItem('userName', '')
  window.sessionStorage.setItem('parentId', '')
  window.sessionStorage.setItem('isMaster', null)
  window.sessionStorage.setItem('goldenName', '')
  window.sessionStorage.setItem('goldenTel', '')
  window.sessionStorage.setItem('talkContentImageUrl', '')
  window.sessionStorage.setItem('resetTel', '')
  var info = {
    'tokenId': '',
    'loginFlag': 'false',
    'mobile': '',
    'unionId': '',
    'unionBusinessName': '',
    'unionBusinessId': '',
    'parentId': '',
    'isMaster': null,
    'userName': '',
    'goldenName': '',
    'goldenTel': '',
    'talkContentImageUrl': ''
  }
  return info
}
const store = new Vuex.Store({
  state: {
    tokenId: window.sessionStorage.getItem('tokenId'),
    loginFlag: window.sessionStorage.getItem('loginFlag'),
    mobile: window.sessionStorage.getItem('mobile'),
    unionId: window.sessionStorage.getItem('unionId'),
    unionBusinessName: window.sessionStorage.getItem('unionBusinessName'),
    unionBusinessId: window.sessionStorage.getItem('unionBusinessId'),
    parentId: window.sessionStorage.getItem('parentId'),
    isMaster: window.sessionStorage.getItem('isMaster'),
    userName: window.sessionStorage.getItem('userName'),
    goldenName: window.sessionStorage.getItem('goldenName'),
    goldenTel: window.sessionStorage.getItem('goldenTel'),
    talkContentImageUrl: window.sessionStorage.getItem('talkContentImageUrl')
  },
  getters: {
    // loginMsg: state => state.loginMsg
  },
  mutations: {
    sessionStorage (state, pamars) {
      state.tokenId = pamars.tokenId
      state.loginFlag = pamars.loginFlag
      state.mobile = pamars.mobile
      state.unionId = pamars.unionId
      state.unionBusinessName = pamars.unionBusinessName
      state.unionBusinessId = pamars.unionBusinessId
      state.parentId = pamars.parentId
      state.isMaster = pamars.isMaster
      state.userName = pamars.userName
      state.goldenName = pamars.goldenName
      state.goldenTel = pamars.goldenTel
      state.talkContentImageUrl = pamars.talkContentImageUrl
      // console.log(state.tokenId)
    },
    QrCode (state, pamars) {
      state.QrCode = pamars
      state.talkContentImageUrl = pamars.talkContentImageUrl
      // console.log(state.QrCode)
    },
    manager (state, pamars) {
      // console.log(pamars)
      state.goldenName = pamars.goldenName
      state.goldenTel = pamars.tel
    },
    setTicket (state, pamar) {
      state.ticket = pamar
    }
  },
  actions: {
    toLogin ({commit, state}, pamars) {
      service.toLogin(pamars, function (response) {
        window.sessionStorage.setItem('tokenId', response.tokenid)
        window.sessionStorage.setItem('loginFlag', response.loginFlag)
        window.sessionStorage.setItem('mobile', response.authUser.mobile)
        window.sessionStorage.setItem('unionId', response.authUser.unionId)
        window.sessionStorage.setItem('unionBusinessName', response.authUser.unionBusinessName)
        window.sessionStorage.setItem('unionBusinessId', response.authUser.unionBusinessId)
        window.sessionStorage.setItem('parentId', response.authUser.parentId)
        window.sessionStorage.setItem('isMaster', response.authUser.isMaster)
        window.sessionStorage.setItem('userName', response.authUser.userName)
        window.sessionStorage.setItem('talkContentImageUrl', response.authUser.talkContentImageUrl)
        // console.log(window.sessionStorage.tokenId)
        if (response.loginFlag === true) {
          location.href = '/#/mine'
        }
        var info = {
          'tokenId': response.tokenid,
          'loginFlag': response.loginFlag,
          'mobile': response.authUser.mobile,
          'unionId': response.authUser.unionId,
          'unionBusinessName': response.authUser.unionBusinessName,
          'unionBusinessId': response.authUser.unionBusinessId,
          'parentId': response.authUser.parentId,
          'isMaster': response.authUser.isMaster,
          'userName': response.authUser.userName,
          'talkContentImageUrl': response.authUser.talkContentImageUrl
        }
        commit('sessionStorage', info)
      })
    },
    toLogout ({commit, state}) {
      var pamars = {
        'tokenId': state.tokenId
      }
      service.toLogout(pamars, function (response) {
        if (response === true) {
          commit('sessionStorage', clearSession())
          location.href = '/'
        }
      })
    },
    getQrCode ({commit, state}, pamars) {
      service.getQrCode(pamars, function (response) {
        // console.log(response)
        window.sessionStorage.setItem('talkContentImageUrl', response.talkContentImageUrl)
        commit('QrCode', response)
      })
    },
    getManager ({commit, state}, pamars) {
      service.getManager(pamars, function (response) {
        // console.log(response)
        window.sessionStorage.setItem('goldenName', response.goldenName)
        window.sessionStorage.setItem('goldenTel', response.tel)
        commit('manager', response)
      })
    },
    updatePwd ({commit, state}, pamars) {
      service.updatePwd(pamars, function (response) {
        // console.log(response)
        if (response.statusCode === 'OK') {
          commit('sessionStorage', clearSession())
          location.href = '/#/login'
        }
      })
    },
    resetPwd ({commit, state}, pamars) {
      service.resetPwd(pamars, function (response) {
        // console.log(response)
        if (response.statusCode === 'OK') {
          commit('sessionStorage', clearSession())
          location.href = '/#/login'
        }
      })
    },
    getTicket ({commit, state}, pamars) {
      service.getTicket(pamars, function (response) {
        var ticket = document.cookie.split('ticket=')[1]
        commit('setTicket', ticket)
      })
    },
    getCaptcha ({commit, state}, pamars) {
      service.getCaptcha(pamars, function (response) {
        console.log(response)
      })
    },
    submitCaptcha ({commit, state}, pamars) {
      service.submitCaptcha(pamars, function (response) {
        // console.log(response)
        // if (response.statusCode === 'OK') {
        location.href = '/#/resetPwd'
        window.sessionStorage.setItem('resetTel', pamars.mobile)
        // }
      })
    }
  }
})

export default store
