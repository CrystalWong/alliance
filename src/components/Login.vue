<template>
  <div id="login">
    <mt-header title="登录">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="f1">
      <div class="f1-1">
        <img src="../assets/img/login.png" width="20.8%">
      </div>
    </div>
    <!-- <div class="f2">
      <mt-field placeholder="请输入手机号" type="tel" v-model.trim="loginMsg.mobile" :attr="{ maxlength: 11}" :state="checkMoblie()"></mt-field>
      <mt-field placeholder="请输入密码" :type="type" v-model.trim="loginMsg.pwd" :attr="{ minlength: 6, maxlength: 20 }" :state="checkPwd()">
         <img src="../assets/img/close.png" width="20" v-on:click="toggle" v-if="!pwdShow">
         <img src="../assets/img/open.png" width="20" v-on:click="toggle" v-if="pwdShow">
      </mt-field>
    </div>
    <div class="f3">
      <mt-button type="primary" size="large" v-on:click="submitState" v-if="checkMoblie() ==='success'&&checkPwd() === 'success'? true: false ">登录</mt-button>
      <mt-button type="primary" size="large" disabled v-if="checkMoblie() ==='success'&&checkPwd() === 'success'? false: true ">登录</mt-button>
    </div> -->
    <div class="f2">
      <mt-field placeholder="请输入手机号" type="number" v-model.trim="loginMsg.mobile" :attr="{ maxlength: 11, autocomplete: 'off'}"></mt-field>
      <mt-field placeholder="请输入密码" :type="type" v-model.trim="loginMsg.pwd" :attr="{ minlength: 6, maxlength: 20, onpaste: 'return false', autocomplete: 'off'}">
         <img src="../assets/img/close.png" width="20" v-on:click="toggle" v-if="!pwdShow">
         <img src="../assets/img/open.png" width="20" v-on:click="toggle" v-if="pwdShow">
      </mt-field>
    </div>
    <div class="f3">
      <mt-button type="primary" size="large" v-on:click="submitState" v-if=" loginMsg.mobile !=='' && loginMsg.pwd !=='' ">登录</mt-button>
      <mt-button type="primary" size="large" disabled v-if=" loginMsg.mobile ==='' || loginMsg.pwd ==='' ">登录</mt-button>
    </div>
    <div class="f4">
      <a href="/#findPwd">找回密码</a>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Mine',
  data () {
    return {
      type: 'password',
      pwdShow: false,
      loginMsg: {
        mobile: '',
        pwd: ''
      }
    }
  },
  methods: {
    toggle: function () {
      this.type = this.type === 'password' ? 'text' : 'password'
      this.pwdShow = !this.pwdShow
    },
    checkMoblie () {
      if (this.loginMsg.mobile === '') return
      var reg = /^1[34578]{1}\d{9}$/
      if (!reg.test(this.loginMsg.mobile)) {
        Toast('请输入11位正确的手机号码')
        return false
      }
      return true
    },
    checkPwd () {
      if (this.loginMsg.pwd === '') return
      var reg = /^[0-9a-zA-Z]{6,26}$/
      if (!reg.test(this.loginMsg.pwd)) {
        Toast('请输入数字或字母（区分大小写），6-26位字符密码')
        return false
      }
      return true
    },
    submitState () {
      var mobileState = this.checkMoblie()
      var pwdState = this.checkPwd()
      if (mobileState === true && pwdState === true) this.submit()
    },
    submit () {
      this.$store.dispatch('toLogin', this.loginMsg)
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  background-color: #fff;
  padding-bottom: 400px;
  .f1 {
    border-top: 1px solid #eaeaea;
    padding: 30px 0 20px 0;
    .f1-2 {
      margin-top: 5px;
      font-size: 0.28rem;
      color: #333;
    }
  }
  .f2 {
    padding: 0 20px;
  }
  .f3 {
    padding: 23px 20px 10px 20px;
  }
  .f4 {
    padding: 0 20px;
    text-align: right;
    a {
      font-size: 0.28rem;
      color: #666;
      text-decoration: underline;
    }
  }
}
</style>
