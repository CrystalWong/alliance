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
					<li v-for="i,index in arrDx" @click="fun(index,i)" :class="{'isChecked':arrIsChecked[index]}">{{ i }}</li>
				</ul>
			</div>
			<p class="recTitile"><span>需求备注</span>：</p>
			<div class="recContent">
				<textarea @input="textArea" placeholder="添加备注" rows="3" class="mint-field-core" v-model="textAreaValue"></textarea>
			</div>
			<p class="recTitile"><span>金管家信息</span></p>
			<div class="recInfo">
				<p><span>{{ goldenName }}</span>{{ goldenTel }}</p>
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
      flag: false,
      checked: 1,
      arrDx: ['新房', '二手房', '大家装', '健康之旅', '美丽之旅'],
      // 已选中的需求
      arrChecked: [],
      // 标记需求是否被选中
      arrIsChecked: [],
      submitAllowed: false,
      name: '',
      phoneNum: '',
      textAreaValue: '',
      // arrReq: [],
      selectedReq: [],
      goldenName: this.$store.state.goldenName,
      goldenTel: this.$store.state.goldenTel
    }
  },
  created () {
    this.selectedReq = this.$route.query.type
    // console.log(this.selectedReq)
    var self = this
    this.arrDx.forEach(function (element, index) {
      if (decodeURI(self.selectedReq).search(element) !== -1) {
        self.arrIsChecked.push(true)
        self.arrChecked.push(element)
      } else {
        self.arrIsChecked.push(false)
      }
    })
    // this.isReqChoosed()
    this.setBtnStatus()
  },
  methods: {
    nameBlue () {
      var reg = /^[\u2E80-\u9FFF]{2,20}$/
      if (!reg.test(this.name)) {
        Toast('请输入1-10位汉字')
        return false
      }
      return true
    },
    textArea () {
      if (this.textAreaValue.length > 10) {
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
    fun (index, i) {
      // console.log(index)
      this.arrIsChecked.splice(index, 1, !this.arrIsChecked[index])
      var ind = this.arrChecked.indexOf(i)
      if (ind !== -1) {
        this.arrChecked.splice(ind, 1)
      } else {
        this.arrChecked.push(i)
      }
      // this.isReqChoosed()
      this.setBtnStatus()
    },
    // isReqChoosed () {
    //   var self = this
    //   self.arrReq = []
    //   this.arrChecked.forEach(function (element, index) {
    //     if (self.arrDx.indexOf(element) !== -1) {
    //       self.arrReq.push(self.arrDx[index])
    //     }
    //   })
    // },
    // 设置按钮状态
    setBtnStatus () {
      if (this.name === '' || this.phoneNum === '' || this.arrChecked.length === 0) {
        this.submitAllowed = false
      } else {
        this.submitAllowed = true
      }
    },
    // 提交处理
    submit () {
      if (this.flag) return
      this.flag = true
      // console.log(this.arrIsChecked)
      if (!this.submitAllowed) return
      // if (this.arrChecked.length === 0) {
      //   Toast('请选择需求')
      //   return
      // };
      if (this.testPhoneNum() && this.nameBlue()) {
        var param = {
          'name': this.name,
          'sex': this.checked === 1 ? 'male' : 'female',
          'tel': this.phoneNum,
          'contract': this.phoneNum,
          'loginDepId': '',
          'customerSource': '',
          'goldenCommon': {},
          'remarks': this.textAreaValue,
          'unionCommon': {
            'unionId': this.$store.state.unionBusinessId,
            'unionName': this.$store.state.unionBusinessName,
            'unionUserId': this.$store.state.unionId,
            'unionUserMobile': this.$store.state.mobile,
            'unionUserParentId': this.$store.state.parentId
          },
          'busDataParams': [],
          'customerStatus': '',
          'isPrivateFlag': 1
        }
        this.arrIsChecked.forEach(function (i, index) {
          if (i) {
            var type = 0
            switch (index) {
              case 0:
                type = 4
                break
              case 1:
                type = 1
                break
              case 2:
                type = 5
                break
              case 3:
                type = 8
                break
              case 4:
                type = 7
                break
            }
            var obj = {
              'customerStatus': type,
              'demandStatus': type
            }
            param['busDataParams'].push(obj)
          }
        })
        var self = this
        // this.$http.post('customer' + '/v1/unionBusinessM/1.0/insertCustomerResource', param).then(function (res) {
        this.$http.post('/jysteward-centerapipre/v1/unionBusinessM/1.0/insertCustomerResource', param).then(function (res) {
          if (res.status === 200) {
            Toast('推荐成功')
            setTimeout(function () {
              location.href = '/#/customer'
            }, 3000)
          } else {
            Toast('哇哦，网络不给力')
          }
          self.flag = false
        }).catch(function (response) {
          if (response.body.message) {
            Toast(response.body.message)
          } else {
            Toast('哇哦，网络不给力')
          }
          self.flag = false
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
.InpField p input{border: 0;outline: none; font-size: .26rem; color: #666666;}
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
.recContent ul li{ display: inline-block; text-align: center; width: 1.5rem; height: 0.44rem; border-radius: 0.22rem; border:0.01rem solid #ccc; margin:0.2rem 0.18rem 0 0; font-size: 0.28rem; color: #666; line-height: 0.44rem;}
.recContent ul li:nth-child(4){margin-right: 0;}
.recContent ul li.isChecked{ border-color: #f60; color: #f60;}
.Recommend .InpField .recInfo span{ margin-right:0.8rem; width: auto;}
.submit{ margin-top: 0.4rem; width: 6.7rem; height: 0.88rem; line-height: 0.88rem; background-color:#f60; font-size: 0.32rem; color: #fff; border:none; border-radius: 0.08rem; }
.addchildacc_content{padding: 1.1rem 0 0 0;background: #f5f5f5;min-height: 800px;}
.addchildacc_submit{display: block;width: 90%;margin:.45rem auto 0; border: none;background: #ccc;height: .75rem;line-height: .75rem;color: #fff;font-size: .3rem;border-radius: .1rem;}
.addchildacc_submit_allowed{background: #F60;}
</style>
