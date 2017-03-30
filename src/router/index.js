import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import FindPwd from '@/components/FindPwd'
import ResetPwd from '@/components/ResetPwd'
import Menubar from '@/components/Menubar'
import Home from '@/components/Home'
import Customer from '@/components/Customer'
import Mine from '@/components/Mine'
import UpdatePwd from '@/components/UpdatePwd'
import CustomerInfo from '@/components/CustomerInfo'
import QRCode from '@/components/QrCode'
import Recommend from '@/components/Recommend'
import Affiche from '@/components/Affiche'
import AfficheInfo from '@/components/AfficheInfo'
import ChildAccount from '@/components/ChildAccount'
import AddChildAccount from '@/components/AddChildAccount'
import Manager from '@/components/Manager'

Vue.use(Router)

function checkLogin () {
  var logFlag = window.sessionStorage.getItem('loginFlag')
  if (logFlag !== 'true' && logFlag !== true) {
    return true
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        menubar: Menubar
      }
    },
    {
      path: '/customer',
      name: 'Customer',
      components: {
        default: Customer,
        menubar: Menubar
      },
      beforeEnter: (to, from, next) => {
        var logFlag = checkLogin()
        if (logFlag === true) {
          next({ path: '/login' })
        }
        next()
      }
    },
    {
      path: '/customerInfo',
      name: 'CustomerInfo',
      component: CustomerInfo,
      beforeEnter: (to, from, next) => {
        var logFlag = checkLogin()
        if (logFlag === true) {
          next({ path: '/login' })
        }
        next()
      }
    },
    {
      path: '/qrCode',
      name: 'QrCode',
      component: QRCode,
      beforeEnter: (to, from, next) => {
        var logFlag = checkLogin()
        if (logFlag === true) {
          next({ path: '/login' })
        }
        next()
      }
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/affiche',
      name: 'Affiche',
      component: Affiche
    },
    {
      path: '/afficheInfo',
      name: 'AfficheInfo',
      component: AfficheInfo
    },
    {
      path: '/childAccount',
      name: 'ChildAccount',
      component: ChildAccount
    },
    {
      path: '/addChildAccount',
      name: 'AddChildAccount',
      component: AddChildAccount
    },
    {
      path: '/mine',
      name: 'Mine',
      components: {
        default: Mine,
        menubar: Menubar
      },
      beforeEnter: (to, from, next) => {
        var logFlag = checkLogin()
        if (logFlag === true) {
          next({ path: '/login' })
        }
        next()
      }
    },
    {
      path: '/updatePwd',
      name: 'UpdatePwd',
      components: {
        default: UpdatePwd
      },
      beforeEnter: (to, from, next) => {
        var logFlag = checkLogin()
        if (logFlag === true) {
          next({ path: '/login' })
        }
        next()
      }
    },
    {
      path: '/manager',
      name: 'Manager',
      components: {
        default: Manager
      }
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        login: Login
      }
    },
    {
      path: '/findPwd',
      name: 'FindPwd',
      components: {
        login: FindPwd
      }
    },
    {
      path: '/resetPwd',
      name: 'ResetPwd',
      components: {
        login: ResetPwd
      }
    }
  ]
})
