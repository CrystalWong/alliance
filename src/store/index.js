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
  window.sessionStorage.setItem('userName', '')
  window.sessionStorage.setItem('goldenName', '')
  window.sessionStorage.setItem('goldenTel', '')
  window.sessionStorage.setItem('talkContentImageUrl', '')
  var info = {
    'tokenId': '',
    'loginFlag': 'false',
    'mobile': '',
    'unionId': '',
    'unionBusinessName': '',
    'userName': '',
    'goldenName': '',
    'goldenTel': '',
    'talkContentImageUrl': ''
  }
  return info
  // commit('sessionStorage', info)
}
const store = new Vuex.Store({
  state: {
    tokenId: window.sessionStorage.getItem('tokenId'),
    loginFlag: window.sessionStorage.getItem('loginFlag'),
    mobile: window.sessionStorage.getItem('mobile'),
    unionId: window.sessionStorage.getItem('unionId'),
    unionBusinessName: window.sessionStorage.getItem('unionBusinessName'),
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
      state.userName = pamars.userName
      state.goldenName = pamars.goldenName
      state.goldenTel = pamars.goldenTel
      // console.log(state.tokenId)
    },
    QrCode (state, pamars) {
      state.QrCode = pamars
      state.talkContentImageUrl = pamars.talkContentImageUrl
      // console.log(state.QrCode)
    },
    manager (state, pamars) {
      console.log(pamars)
      state.goldenName = pamars.goldenName
      state.goldenTel = pamars.tel
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
        window.sessionStorage.setItem('userName', response.authUser.userName)
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
          'userName': response.authUser.userName
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
        window.sessionStorage.setItem('talkContentImageUrl', response.talkContentImageUrl)
        commit('QrCode', response)
      })
    },
    getManager ({commit, state}, pamars) {
      service.getManager(pamars, function (response) {
        console.log(response)
        window.sessionStorage.setItem('goldenName', response.goldenName)
        window.sessionStorage.setItem('goldenTel', response.tel)
        commit('manager', response)
      })
    },
    updatePwd ({commit, state}, pamars) {
      service.updatePwd(pamars, function (response) {
        console.log(response)
        if (response.statusCode === 'OK') {
          commit('sessionStorage', clearSession())
          location.href = '/#/login'
        }
      })
    },
    resetPwd ({commit, state}, pamars) {
      service.resetPwd(pamars, function (response) {
        console.log(response)
        if (response.statusCode === 'OK') {
          commit('sessionStorage', clearSession())
          location.href = '/#/login'
        }
      })
    }
  }
})

export default store
