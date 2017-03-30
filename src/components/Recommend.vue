<template>
  <div class="Recommend">
		<div class="cus_info_header">推荐客户
			<router-link to="/"></router-link>
		</div>
		<div class="InpField">
			<p>
        <span>姓名</span>：
        <input type="text" name="" v-model="name" @blur="nameBlue" @input="setBtnStatus">
      </p>
      <p>
      	<span>性别</span>：
      	<b :class="{'checkedRadio':checked,'radio-btn':true}" @click="tabRadio(1)">
        	<i></i>
      	</b>男士<i style="width:0.2rem; display:inline-block;"></i>
	    	<b :class="{'checkedRadio':!checked,'radio-btn':true}" @click="tabRadio(0)">
	    		<i></i>
	    	</b>女士
    	</p>
			<p>
          <span>手机号</span>：
          <input type="text" name=""  v-model="phoneNum" @blur="phoneNumBlue" @input="setBtnStatus">
      </p>
			<p class="recTitile"><span>需求</span>：</p>
			<div class="recContent">
				<ul>
					<li v-for="i,index in arrDx" @click="fun(index)" :class="{'isChecked':arrIsChecked[index]}">{{ i }}</li>
				</ul>
			</div>
			<p class="recTitile"><span>需求备注</span>：</p>
			<div class="recContent">
				<textarea @input="textArea" placeholder="添加备注" rows="3" class="mint-field-core" v-model="textAreaValue"></textarea>
			</div>
			<p class="recTitile"><span>金管家信息</span></p>
			<div class="recInfo">
				<p><span>李豹</span>15278787878</p>
			</div>
		</div>
		<button @click="submit()" :class="{'addchildacc_submit':true,'addchildacc_submit_allowed':submitAllowed}">推荐给金管家</button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Recommend',
  data () {
    return {
      checked: 1,
      arrDx: ['新房', '二手房', '出租房', '装修', '家政'],
      arrChecked: [],
      arrIsChecked: [],
      submitAllowed: false,
      name: '',
      phoneNum: '',
      textAreaValue: '',
      arrReq: []
    }
  },
  created () {
    var self = this
    this.arrDx.forEach(function (element, index) {
      self.arrIsChecked.push(false)
    })
  },
  methods: {
    nameBlue () {
      var reg = /^[\u2E80-\u9FFF]{2,20}$/
      if (!reg.test(this.name)) {
        Toast('请输入2-20位汉字')
        return false
      }
      return true
    },
    textArea () {
      if (this.textAreaValue.length > 200) {
        Toast('最多可以输入200字符')
      }
    },
    // 验证手机号
    testPhoneNum () {
      var reg = /^1[34578]\d{9}$/
      if (!reg.test(this.phoneNum)) {
        Toast('请输入正确的手机号')
        return false
      }
      return true
    },
    phoneNumBlue () {
      this.testPhoneNum()
    },
    tabRadio (status) {
      if (this.checked === status) return
      this.checked = status
    },
    fun (index) {
      this.arrIsChecked.splice(index, 1, !this.arrIsChecked[index])
      var ind = this.arrChecked.indexOf(index)
      if (ind !== -1) {
        this.arrChecked.splice(ind, 1)
      } else {
        this.arrChecked.push(index)
      }
      this.isReqChoosed()
      this.setBtnStatus()
    },
    isReqChoosed () {
      var self = this
      self.arrReq = []
      this.arrChecked.forEach(function (element, index) {
        if (self.arrDx[element]) {
          self.arrReq.push(self.arrDx[element])
        }
      })
    },
    // 设置按钮状态
    setBtnStatus () {
      if (this.name === '' || this.phoneNum === '' || this.arrReq.length === 0) {
        this.submitAllowed = false
      } else {
        this.submitAllowed = true
      }
    },
    // 提交处理
    submit () {
      if (!this.submitAllowed) return
      if (this.arrReq.length === 0) {
        Toast('请选择需求')
        return
      };
      if (this.testPhoneNum() && this.nameBlue()) {
        var param = {
          'name': this.name,
          'sex': this.checked === 1 ? 'female' : 'male',
          'tel': this.phoneNum,
          'contract': this.phoneNum,
          'loginDepId': '8de620a693f39d2e4dc504af1a87d325',
          'customerSource': '',
          'goldenCommon': {
            'goldenTel': '15910964657',
            'goldenName': '柳旭影',
            'inputManName': '闫梦翔',
            'inputManTel': '13811657851',
            'belongManName': '闫梦翔',
            'belongManTel': '13811657851',
            'goldenId': '0369b8ed68ee0dee848e5315a0dad3dd'
          },
          'unionCommon': {
            'unionId': 'UIN2016071500003331',
            'unionName': '上海立骥家政服务有限公司'
          },
          'busDataParams': [],
          'customerStatus': '',
          'isPrivateFlag': 1
        }
        this.$http.post('recommend' + '/v1/unionBusinessM/1.0/insertCustomerResource', param).then(function (res) {
          console.log(res)
          if (res.status === 200) {
            Toast('推荐成功')
            setTimeout(function () {
              location.href = '/#/customer'
            }, 3000)
          }
        })
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.cus_info_header{width: 100%; height: 0.9rem;line-height: 0.9rem;font-size: 0.3rem;border-bottom: 1px solid #d3d3d3;position: fixed;top: 0;left: 0;background: #fff ;z-index: 10;}
.cus_info_header a{position: absolute;left: 0;top:0;width: .9rem;height: .9rem;background: url(../assets/img/cusinfobackicon.gif) no-repeat center center;background-size: .19rem .34rem;}
.Recommend{ height: 100%; background-color: #f5f5f5; padding-top: 0.9rem; padding-bottom: 100px;overflow-y: scroll;}
.InpField{ margin-top: 0.2rem; text-align: left;}
.InpField p{ padding-left: 0.2rem; background-color: #fff;height: .9rem;line-height: .9rem;border-bottom: 1px solid #eee;text-align: left;font-size: .26rem;}
.InpField p span:first-child{ display: inline-block; width: 1.6rem;text-align: justify;text-justify: distribute-all-lines;text-align-last: justify;-webkit-text-align-last: justify;}
.InpField p input{border: 0;outline: none;}
.radio-btn input[type="radio"], .check-box input[type="checkbox"] {visibility: hidden;}
.radio-btn {
    width: 0.4rem;
    height: 0.4rem;
    display: inline-block;
    margin: 0.03rem 0.07rem 0 0;
    cursor: pointer;
    top: 0.08rem;
    position: relative;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: 0.01rem solid #ccc;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#ededed', GradientType=0);
}
.checkedRadio {
	-moz-box-shadow: inset 0 0 0.05rem 0.01rem #ccc;
  -webkit-box-shadow: inset 0 0 0.05rem 0.01rem #ccc;
  box-shadow: inset 0 0 0.05rem 0.01rem #ccc;
	border-color: #ff6600;
}
.radio-btn i {
    width: 0.1rem;
    height: 0.1rem;
    position: absolute;
    left: 0.13rem;
    top: 0.13rem;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
}
.checkedRadio i {
    background-color: #ff6600;
}
.InpField .recTitile{ text-align: left; height: 0.8rem; background-color: #eee;}
.recContent{ background-color: #fff; border-top:1px solid #eee; border-bottom: 1px solid #eee; padding: 0.1rem 0.44rem 0.3rem; text-align: left;}
.recContent ul li{ display: inline-block; text-align: center; width: 1.38rem; height: 0.44rem; border-radius: 0.22rem; border:0.01rem solid #ccc; margin:0.2rem 0.2rem 0 0; font-size: 0.28rem; color: #666; line-height: 0.44rem;}
.recContent ul li.isChecked{ border-color: #f60; color: #f60;}
.Recommend .InpField .recInfo span{ margin-right:0.8rem; width: auto;}
.submit{ margin-top: 0.4rem; width: 6.7rem; height: 0.88rem; line-height: 0.88rem; background-color:#f60; font-size: 0.32rem; color: #fff; border:none; border-radius: 0.08rem; }
.addchildacc_content{padding: 1.1rem 0 0 0;background: #f5f5f5;min-height: 800px;}
.addchildacc_submit{display: block;width: 90%;margin:.45rem auto 0; border: none;background: #ccc;height: .75rem;line-height: .75rem;color: #fff;font-size: .3rem;border-radius: .1rem;}
.addchildacc_submit_allowed{background: #F60;}
</style>
