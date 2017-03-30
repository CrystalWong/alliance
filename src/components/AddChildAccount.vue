<template>
  <div class="addchildacc">
  	<div class="addchildacc_header">添加子账户
      <router-link to="/childAccount"></router-link>
    </div>
    <div class="addchildacc_content">
      <div class="addchildacc_info">
        <p>
          <span>姓名</span>：
          <input type="text" name="" v-model="name" @blur="nameBlue" @input="setBtnStatus">
        </p>
        <p>
          <span>手机号</span>：
          <input type="text" name=""  v-model="phoneNum" @blur="phoneNumBlue" @input="setBtnStatus">
        </p>
        <p>
          <span>验证码</span>：
          <input type="text" name="" v-model="code" @input="setBtnStatus">
          <b @click="getCode" :class="{'codeclickable':idCodeClickable}">{{ codeChange }}</b>
        </p>
        <p>
          <span>密码</span>：
          <input type="password" name="" v-model="pwd" id="pwd" @input="setBtnStatus">
          <span @click="delPassword"></span>
          <span @click="pwdVisible()"></span>
        </p>
      </div>
      <button @click="toSubmit" :class="{'addchildacc_submit':true,'addchildacc_submit_allowed':submitAllowed}">提交</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'addChildAcc',
  data () {
    return {
      codeChange: '获取验证码',
      noAfficheShow: false,
      submitAllowed: false,
      name: '',
      phoneNum: '',
      idCodeClickable: true,
      pwd: '',
      pwdType: 'password',
      code: ''
    }
  },
  methods: {
    nameBlue () {
      var reg = /^[\u2E80-\u9FFF]+$/
      if (!reg.test(this.name)) {
        Toast('请输入2-20位汉字')
        return false
      }
      return true
    },
    phoneNumBlue () {
      this.testPhoneNum()
    },
    // 获取验证码
    getCode () {
      if (!this.idCodeClickable) return
      if (this.testPhoneNum()) {
        this.idCodeClickable = false
        var s = 10
        var self = this
        self.codeChange = '重新发送' + s + 'S'
        setInterval(function () {
          s -= 1
          self.codeChange = '重新发送' + s + 'S'
          if (s <= 0) {
            self.codeChange = '获取验证码'
            self.idCodeClickable = true
          }
        }, 1000)
      }
    },
    // 验证手机号
    testPhoneNum () {
      var reg = /^1[34578]{1}\d{9}$/
      if (!reg.test(this.phoneNum)) {
        Toast('请输入11位手机号')
        return false
      }
      return true
    },
    // 删除密码
    delPassword () {
      this.pwd = ''
    },
    // 密码可见
    pwdVisible () {
      var pwd = document.querySelector('#pwd')
      if (pwd.type === 'text') {
        pwd.type = 'password'
      } else {
        pwd.type = 'text'
      }
    },
    // 设置按钮状态
    setBtnStatus () {
      if (this.name === '' || this.pwd === '' || this.phoneNum === '' || this.code === '') {
        this.submitAllowed = false
      } else {
        this.submitAllowed = true
      }
    },
    // 提交处理
    toSubmit () {
      if (!this.submitAllowed) return
      if (this.testPhoneNum() && this.nameBlue()) {
        var param = {
          'unionBusinessId': 'UIN2016071500003331',
          'unionBusinessName': '上海立骥家政服务有限公司',
          'unionManageId': 'LMS015664',
          'childrenName': this.name,
          'childrenTel': this.phoneNum,
          'password': this.pwd
        }
        console.log(param)
        this.$http.post('golden' + '/v1/provider/1.0/insertChildren', param).then(function (res) {
          console.log(res)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .fl(){float: left}
  div,p,span{color:#333;}
  .addchildacc{width: 100%;margin: 0 0 55px 0;}
  .addchildacc_header{
    width: 100%;height: .9rem;line-height: .9rem;font-size: .3rem;
    border-bottom: 1px solid #d3d3d3;position: fixed;top: 0;left: 0;
    background: #fff ;
    z-index: 10;
    a{
      position: absolute;
      left: 0;top:0;
      width: .9rem;height: .9rem;
      background: url(../assets/img/cusinfobackicon.gif) no-repeat center center;
      background-size: .19rem .34rem;
    }
  }
  .addchildacc_content{
    padding: 1.1rem 0 0 0;background: #f5f5f5;min-height: 800px;
    .addchildacc_submit{
      display: block;width: 90%;margin:.45rem auto 0; border: none;background: #ccc;
      height: .75rem;line-height: .75rem;color: #fff;font-size: .3rem;border-radius: .1rem;
    }
    .addchildacc_submit_allowed{
      background: #F60;
    }
  }
  .addchildacc_info{
    padding: 0 0 0 .2rem;
    background: #fff;
    p{
      height: .9rem;line-height: .9rem;border-bottom: 1px solid #eee;text-align: left;font-size: .26rem;
      span:first-child{
        .fl();
        width: 1.6rem;
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        -webkit-text-align-last: justify;
      }
      input{
        border: 0;outline: none;
      }
    }
    p:nth-child(3){
      position: relative;
      b{
        position: absolute;width: 1.48rem;height: .58rem;top:.15rem;right: .18rem;line-height: .58rem;
        border: 1px solid #ccc;border-radius: .05rem;font-size: .22rem;text-align: center;color: #666;
        font-weight: normal;
      }
      .codeclickable{
        color: #fff;background: #f60;border:none;
      }
    }
    p:nth-child(4){
      position: relative;
      span:nth-child(n+3){
        position: absolute;width: .4rem;height: .4rem;top:.25rem;right: .84rem;
        background: url(../assets/img/addchilddelicon.gif) no-repeat center center;
        background-size: .4rem .4rem;
      }
      span:nth-child(4){
        width: .44rem;height: .34rem;top:.29rem;right: .18rem;
        background: url(../assets/img/addchildeyeicon.gif) no-repeat center center;
        background-size: .44rem .34rem;
      }
    }
  }

</style>

