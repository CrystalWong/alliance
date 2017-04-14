<template>
  <div id="resetPwd">
    <mt-header title="找回密码">
      <router-link to="/findPwd" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="f2">
      <mt-field placeholder="请设置密码" type="password" v-model.trim="newPwd" :attr="{ minlength: 6, maxlength: 26 }" :state="checkPwd()"></mt-field>
      <mt-field placeholder="请重复密码" type="password" v-model.trim="newPwdRe" :attr="{ minlength: 6, maxlength: 26 }" :state="checkPwdRe()"></mt-field>
    </div>
    <div class="f3">
      <mt-button type="primary" size="large" disabled v-if="checkPwd() !== 'success' || checkPwdRe() !== 'success'">确定</mt-button>
      <mt-button type="primary" size="large" v-on:click="submit" v-if="checkPwd() === 'success' && checkPwdRe() === 'success'">确定</mt-button>
    </div>
    <div class="f4">
      <span>请输入数字或字母（区分大小写），6-26位字符</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPwd',
  data () {
    return {
      newPwd: '',
      newPwdRe: ''
    }
  },
  methods: {
    checkPwd () {
      if (this.newPwd === '') return
      var reg = /^[0-9a-zA-Z]{6,26}$/
      if (!reg.test(this.newPwd)) {
        return 'warning'
      }
      return 'success'
    },
    checkPwdRe () {
      if (this.newPwdRe === '') return
      if (this.newPwd === this.newPwdRe) {
        return 'success'
      } else {
        return 'warning'
      }
    },
    submit: function () {
      var params = {
        'mobile': window.sessionStorage.getItem('resetTel'),
        'newPwd': this.newPwd
      }
      this.$store.dispatch('resetPwd', params)
    }
  }
}
</script>

<style lang="less" scoped>
#resetPwd {
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
      color: #ff6600;
      font-size: 0.34rem;
    }
  }
  .f4 {
    padding: 0 20px;
    text-align: center;
    color: #999;
    font-size: 0.28rem;
  }
}
</style>
