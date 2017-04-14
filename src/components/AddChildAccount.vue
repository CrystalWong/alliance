<template>
  <div class="addchildacc">
  	<div class="addchildacc_header">添加子账户
      <router-link to="/childAccount"></router-link>
    </div>
    <div class="addchildacc_content">
      <div class="addchildacc_info">
        <p>
          <span>姓名</span>：
          <input type="text" name="" v-model.trim="name" @input="setBtnStatus">
        </p>
        <p>
          <span>手机号</span>：
          <input type="number" name=""  v-model.trim="phoneNum" @input="setBtnStatus(1)" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
        </p>
        <p>
          <span>验证码</span>：
          <input type="text" name="" v-model.trim="code" @input="setBtnStatus">
          <b v-if="!idCodeClickable">{{ codeChange }}</b>
          <b @click="checkTelRegist" class="codeclickable" v-if="idCodeClickable">获取验证码</b>
        </p>
        <p>
          <span>密码</span>：
          <input type="password" name="" v-model.trim="pwd" @blur="checkPwd" id="pwd" @input="setBtnStatus">
          <span class="dele" @click="delPassword" v-if="pwd !== '' "></span>
          <span class="toggle" @click="pwdVisible()"></span>
        </p>  
      </div>
      <button class="addchildacc_submit" v-if="!submitAllowed">提交</button>
      <button @click="submitCaptcha" class="addchildacc_submit addchildacc_submit_allowed" v-if="submitAllowed">提交</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import service from '@/api/service'
export default {
  name: 'addChildAcc',
  data () {
    return {
      codeChange: '获取验证码',
      noAfficheShow: false,
      submitAllowed: false,
      name: '',
      phoneNum: '',
      idCodeClickable: false,
      pwd: '',
      pwdType: 'password',
      code: ''
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
    nameBlue () {
      var reg = /^[\u2E80-\u9FFF]{1,10}$/
      if (!reg.test(this.name)) {
        Toast('请输入1-10个汉字')
        return false
      }
      return true
    },
    phoneNumBlue () {
      this.testPhoneNum()
    },
    setCodeClick () {
      var reg = /^1[34578]{1}\d{9}$/
      if (reg.test(this.phoneNum)) {
        this.idCodeClickable = true
      } else {
        this.idCodeClickable = false
      }
    },
    timer: function () {
      this.idCodeClickable = false
      var s = 60
      var t = this
      t.codeChange = s + 'S后重发'
      function clock () {
        // console.log(s)
        s -= 1
        t.codeChange = s + 'S后重发'
        if (s <= 0) {
          clearInterval(tim)
          t.idCodeClickable = true
        }
      }
      var tim = setInterval(clock, 1000)
    },
    checkTelRegist: function () {
      if (!this.idCodeClickable) return
      this.$http.get('user-api/v1/checkMobileRegist/' + this.phoneNum).then(function (res) {
        if (res.body === true) {
          Toast('手机号已经注册')
        } else {
          var captchaParams = {
            'mobile': this.phoneNum,
            'codeLen': '6',
            'codeTime': '15'
          }
          this.timer()
          this.$store.dispatch('getCaptcha', captchaParams)
        }
      }).catch(function (response) {
        if (response.body.code !== 200 && response.body.message) {
          Toast(response.body.message)
        } else {
          Toast('哇哦，网络不给力')
        }
      })
    },
    // 验证手机号
    testPhoneNum () {
      var reg = /^1[34578]{1}\d{9}$/
      if (!reg.test(this.phoneNum)) {
        Toast('请输入11位手机号')
        return false
      }
      this.idCodeClickable = true
      return true
    },
    checkPwd () {
      if (this.pwd === '') return
      var reg = /^[0-9a-zA-Z]{6,26}$/
      if (!reg.test(this.pwd)) {
        Toast('请输入数字或字母（区分大小写），6-26位字符密码')
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
    setBtnStatus (type) {
      if (type === 1) this.setCodeClick()
      if (this.name === '' || this.pwd === '' || this.phoneNum === '' || this.code === '') {
        this.submitAllowed = false
      } else {
        this.submitAllowed = true
      }
    },
    submitCaptcha () {
      if (!this.submitAllowed) return
      if (this.testPhoneNum() && this.nameBlue() && this.checkPwd()) {
        var pamars = {
          'mobile': this.phoneNum,
          'code': this.code
        }
        var s = this
        service.submitCaptcha(pamars, function (response) {
          s.toSubmit()
        })
      }
    },
    // 提交子账户信息
    toSubmit () {
      this.submitAllowed = false
      // if (!this.submitAllowed) return
      var param = {
        'unionBusinessId': this.$store.state.unionBusinessId,
        'unionBusinessName': this.$store.state.unionBusinessName,
        'unionManageId': this.$store.state.unionId,
        'childrenName': this.name,
        'childrenTel': this.phoneNum,
        'password': this.pwd
      }
      // console.log(param)
      this.$http.post('jyhouse-union/v1/provider/1.0/insertChildren', param).then(function (res) {
        location.href = '/#/childAccount'
      }).catch(function (response) {
        if (response.body.code !== 200 && response.body.message) {
          Toast(response.body.message)
        } else {
          Toast('哇哦，网络不给力')
        }
        this.submitAllowed = true
      })
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
        font-size: .26rem;
        color: #333;
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
      .dele{
        position: absolute;width: .4rem;height: .4rem;top:.25rem;right: .84rem;
        background: url(../assets/img/addchilddelicon.gif) no-repeat center center;
        background-size: .4rem .4rem;
      }
      .toggle{
        position: absolute;
        width: .44rem;height: .34rem;top:.29rem;right: .18rem;
        background: url(../assets/img/addchildeyeicon.gif) no-repeat center center;
        background-size: .44rem .34rem;
      }
    }
  }

</style>

