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
    <div class="f2">
      <!-- <mt-field placeholder="请输入手机号" type="tel" :value="loginMsg.mobile"></mt-field>
      <mt-field placeholder="请输入密码" :type="type" :value="loginMsg.pwd"> -->
      <mt-field placeholder="请输入手机号" type="tel" v-model="loginMsg.mobile"></mt-field>
      <mt-field placeholder="请输入密码" :type="type" v-model="loginMsg.pwd">
         <img src="../assets/img/close.png" width="20" v-on:click="toggle" v-if="!pwdShow">
         <img src="../assets/img/open.png" width="20" v-on:click="toggle" v-if="pwdShow">
      </mt-field>
    </div>
    <div class="f3">
      <mt-button type="primary" size="large" v-on:click="submit">登录</mt-button>
    </div>
    <div class="f4">
      <a href="/#findPwd">找回密码</a>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
// import { mapGetters } from 'vuex'
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
  computed: {
    // ...mapGetters(['loginMsg'])
  },
  methods: {
    toggle: function () {
      this.type = this.type === 'password' ? 'text' : 'password'
      this.pwdShow = !this.pwdShow
      // console.log(this.pwdShow)
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
