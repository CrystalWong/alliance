<template>
  <div id="findPwd">
    <mt-header title="找回密码">
      <router-link to="/login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="f2">
      <mt-field placeholder="请输入手机号" type="tel" v-model.trim="mobile" :attr="{ maxlength: 11}" :state="checkMoblie()"></mt-field>
      <mt-field placeholder="请输入短信验证码" type="text" v-model.trim="captcha">
        <mt-button type="primary" size="small" disabled v-if="checkMoblie() ==='success'? false : true">{{ captchaDisable }}</mt-button>
        <mt-button type="primary" size="small" disabled v-if="timerFlag === false && checkMoblie() ==='success'? true : false">{{ captchaDisable }}</mt-button>
        <mt-button type="primary" size="small" v-on:click="checkTelRegist" v-if="checkMoblie() ==='success' && timerFlag === true? true : false">{{ '获取验证码' }}</mt-button>
      </mt-field>
    </div>
    <div class="f3">
      <mt-button type="primary" size="large" disabled v-if="checkMoblie() !=='success' || checkCaptcha() !=='success'">下一步</mt-button>
      <mt-button type="primary" size="large" v-on:click="submit" v-if="checkMoblie() ==='success' && checkCaptcha() ==='success'">下一步</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'FindPwd',
  data () {
    return {
      mobile: '',
      captcha: '',
      captchaDisable: '获取验证码',
      timerFlag: true
    }
  },
  created () {
    // 自定义票务参数
    var ticketParams = {
      'business': 'alliance',
      'module': 'getCaptcha',
      'function': 'getTicket'
    }
    this.$store.dispatch('getTicket', ticketParams)
  },
  methods: {
    checkMoblie () {
      if (this.mobile === '') return
      var reg = /^1[34578]{1}\d{9}$/
      if (!reg.test(this.mobile)) {
        return 'warning'
      }
      return 'success'
    },
    checkCaptcha () {
      if (this.captcha === '') return
      return 'success'
    },
    checkTelRegist: function () {
      this.$http.get('/user-api/v1/checkMobileRegist/' + this.mobile).then(function (res) {
        if (res.body === true) {
          var captchaParams = {
            'mobile': this.mobile,
            'codeLen': '6',
            'codeTime': '15'
          }
          this.timer()
          this.$store.dispatch('getCaptcha', captchaParams)
        } else {
          Toast('手机号还没有注册')
        }
      }).catch(function (response) {
        if (response.body.code !== 200 && response.body.message) {
          Toast(response.body.message)
        } else {
          Toast('哇哦，网络不给力')
        }
      })
    },
    submit: function () {
      var params = {
        'mobile': this.mobile,
        'captcha': this.captcha
      }
      this.$store.dispatch('submitCaptcha', params)
      // console.log('提交验证码')
    },
    timer: function () {
      this.timerFlag = false
      var s = 60
      var t = this
      t.captchaDisable = s + 'S后重新发送'
      function clock () {
        // console.log(s)
        s -= 1
        t.captchaDisable = s + 'S后重新发送'
        if (s <= 0) {
          clearInterval(tim)
          t.timerFlag = true
        }
      }
      var tim = setInterval(clock, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
#findPwd {
  background-color: #fff;
  padding-top: 10px;
  padding-bottom: 500px;
  .f2 {
    border-top: 1px solid #eaeaea;
    padding: 0 20px;
  }
  .f3 {
    padding: 23px 20px 10px 20px;
    a {
      color: #fff;
      font-size: 0.34rem;
    }
  }
}
</style>
