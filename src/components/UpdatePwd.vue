<template>
  <div id="updatePwd">
    <mt-header title="修改密码">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="f2">
      <mt-field placeholder="原密码" type="password" v-model.trim="oldPwd" :attr="{ minlength: 6, maxlength: 26 }"></mt-field>
      <mt-field placeholder="请设置新密码" type="password" v-model.trim="newPwd" :attr="{ minlength: 6, maxlength: 26 }"></mt-field>
      <mt-field placeholder="请重复新密码" type="password" v-model.trim="newPwdRe" :attr="{ minlength: 6, maxlength: 26 }"></mt-field>
    </div>
    <div class="f3">
      <mt-button type="primary" size="large" disabled v-if="oldPwd === '' || newPwd === '' || newPwdRe === '' ">确定</mt-button>
      <mt-button type="primary" size="large" v-on:click="submit" v-if="oldPwd !== '' && newPwd !== '' && newPwdRe !== '' ">确定</mt-button>
    </div>
    <div class="f4">
      <span>请输入数字和字母（区分大小写），6-26位字符</span>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'UpdatePwd',
  data () {
    return {
      oldPwd: '',
      newPwd: '',
      newPwdRe: ''
    }
  },
  methods: {
    checkPwd: function () {
      // if (pwd === '') return
      var reg = /^[0-9a-zA-Z]{6,26}$/
      console.log(this.oldPwd, reg.test(this.oldPwd), 999)
      if (!reg.test(this.oldPwd)) {
        Toast('请输入数字或字母（区分大小写），6-26位字符原密码')
        return false
      }
      return true
    },
    checkPwdRe: function () {
      if (this.newPwdRe === '') return
      var reg = /^[0-9a-zA-Z]{6,26}$/
      if (this.newPwd === this.newPwdRe && reg.test(this.newPwdRe)) {
        return true
      } else if (this.newPwd !== this.newPwdRe) {
        Toast('新密码两次输入不一致')
        return false
      } else {
        Toast('请输入数字或字母（区分大小写），6-26位字符新密码')
        return false
      }
    },
    submit: function () {
      if (this.checkPwd() === true && this.checkPwdRe() === true) {
        var params = {
          'tokenId': this.$store.state.tokenId,
          'unionId': this.$store.state.unionId,
          'oldPwd': this.oldPwd,
          'newPwd': this.newPwd
        }
        this.$store.dispatch('updatePwd', params)
      }
    }
  }
}
</script>

<style lang="less" scoped>
#updatePwd {
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
