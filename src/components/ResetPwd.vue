<template>
  <div id="resetPwd">
    <mt-header title="找回密码">
      <router-link to="/findPwd" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="f2">
      <mt-field placeholder="请设置密码" type="password" v-model="newPwd"></mt-field>
      <mt-field placeholder="请重复密码" type="password" v-model="newPwdRe"></mt-field>
    </div>
    <div class="f3">
      <mt-button type="primary" size="large" v-on:click="submit">确定</mt-button>
    </div>
    <div class="f4">
      <span>请输入数字和字母（区分大小写），6-26位字符</span>
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
    submit: function () {
      var params = {
        'mobile': '13000590717',
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
