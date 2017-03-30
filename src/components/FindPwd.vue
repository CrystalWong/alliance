<template>
  <div id="findPwd">
    <mt-header title="找回密码">
      <router-link to="/login" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="f2">
      <mt-field placeholder="请输入手机号" type="tel" v-model="mobile"></mt-field>
      <mt-field placeholder="请输入短信验证码" type="text" v-model="captcha">
         <mt-button type="default" size="small" v-on:click="getCaptcha">{{ '获取验证码' }}</mt-button>
      </mt-field>
    </div>
    <div class="f3">
      <mt-button type="primary" size="large"><a href="/#/resetPwd">下一步</a></mt-button>
    </div>
      <a href="/#/resetPwd">下一步</a>
    
  </div>
</template>

<script>
export default {
  name: 'FindPwd',
  data () {
    return {
      mobile: '',
      captcha: ''
    }
  },
  methods: {
    getCaptcha: function () {
      console.log('获取captcha')
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
