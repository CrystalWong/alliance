<template>
  <div class="customer_info">
  	<div class="cus_info_header">客户信息
			<router-link to="/customer"></router-link>
  	</div>
  	<div class="cus_info_cus">
  		<p>
  			<span>{{ customerInfo.name }}</span>
  			<span class="sex" v-if="customerInfo.sex == 'male'">男</span>
        <span class="sex" v-if="customerInfo.sex == 'female'">女</span>
  			<span class="tel">{{ customerInfo.tel }}</span>
  		</p>
  		<p>
  			<span>添加人：</span>
  			<span>{{ customerInfo.goldenCommon.inputManName }}</span>
  		</p>
  		<p>
  			<span>归属人：</span>
  			<span>{{ customerInfo.goldenCommon.belongManName }}</span>
  			<span class="tel">{{ customerInfo.goldenCommon.belongManTel }}</span>
  		</p>
  	</div>

		<div class="cus_info_content">
			<ul class="cus_info_content_header">
				<li>
					<span :class="{'checked':arrTabStatus[0]}" @click="tabChange(0)">需求</span>
				</li>
				<li>
					<span :class="{'checked':arrTabStatus[1]}" @click="tabChange(1)">跟进</span>
				</li>
				<li>
					<span :class="{'checked':arrTabStatus[2]}" @click="tabChange(2)">带看</span>
				</li>
			</ul>
      <!-- 需求 -->
			<div class="cus_info_require" v-show="customerRequireShow">
        <div class="cus_info_norequire" v-show="noRequireShow">
          <p>
            <span class="type">新房</span>
          </p>
          <p>
            <span class="type">租房</span>
          </p>
        </div>
				<div class="cus_info_require_item" v-for="i,index in customerInfo.busDataJsons">
          <div v-if="i.demandStatus=='1'">
  					<span class="type">二手房</span>
  					<p>
  						<span>预算:</span>
  						<span>{{ i.lowerBudgetPrice }}-{{ i.upperBudgetPrice }}万</span>
  					</p>
            <p>
              <span>单价:</span>
              <span>{{ i.minUnitPrice }}-{{ i.maxUnitPrice }}元/㎡</span>
            </p>
  					<p>
  						<span>面积要求:</span>
  						<span>{{ i.spaceMin }}-{{ i.spaceMax }}㎡</span>
  					</p>
            <p>
              <span>朝向要求:</span>
              <span>{{ i.orientation.name }}</span>
            </p>
  					<p>
  						<span>首选位置:</span>
  						<span>{{ i.provinceName }} {{ i.cityName }} {{ i.county }} {{ i.businessDistrictName }}</span>
  					</p>
  					<p>
  						<span>意向小区:</span>
  						<span>{{ i.intentDistrictId }}</span>
  					</p>
  					<p>
  						<span>次选位置:</span>
  						<span>{{ i.minorPosition }}</span>
  					</p>
            <p>
              <span>楼层要求:</span>
              <span>{{ i.floorMin }}-{{ i.floorMax }}</span>
            </p>
            <p>
              <span>备注:</span>
              <span>{{ i.remarks }}</span>
            </p>
          </div>
          <div v-if="i.demandStatus=='2'">
            <span class="type">租房</span>
            <p>
              <span>月租金:</span>
              <span>{{ i.lowerBudgetPrice }}-{{ i.upperBudgetPrice }}万</span>
            </p>
            <p>
              <span>租房类型:</span>
              <span>{{ i.rentType }}</span>
            </p>
            <p>
              <span>所在地区:</span>
              <span>{{ i.cityName }}</span>
            </p>
            <p>
              <span>意向小区:</span>
              <span>{{ i.intentDistrictId }}</span>
            </p>
            <p>
              <span>备注:</span>
              <span>{{ i.remarks }}</span>
            </p>
          </div>
          <div v-if="i.demandStatus=='4'">
            <span class="type">新房</span>
            <p>
              <span>预算:</span>
              <span>{{ i.lowerBudgetPrice }}-{{ i.upperBudgetPrice }}万</span>
            </p>
            <p>
              <span>单价:</span>
              <span>{{ i.minUnitPrice }}-{{ i.maxUnitPrice }}元/㎡</span>
            </p>
            <p>
              <span>面积:</span>
              <span>{{ i.spaceMin }}-{{ i.spaceMax }}㎡</span>
            </p>
            <p>
              <span>朝向要求:</span>
              <span>{{ i.orientation }}</span>
            </p>
            <p>
              <span>首选位置:</span>
              <span>{{ i.provinceName }} {{ i.cityName }} {{ i.county }} {{ i.businessDistrictName }}</span>
            </p>
            <p>
              <span>意向楼盘:</span>
              <span>{{ i.intentStoriedBuilding }}</span>
            </p>
            <p>
              <span>次选位置:</span>
              <span>{{ i.minorPosition }}</span>
            </p>
            <p>
              <span>楼层要求:</span>
              <span>{{ i.floorMin }}-{{ i.floorMax }}</span>
            </p>
            <p>
              <span>备注:</span>
              <span>{{ i.remarks }}</span>
            </p>
          </div>
          <div v-if="i.demandStatus=='5'">
            <span class="type">装修</span>
            <p>
              <span>预算:</span>
              <span>{{ i.lowerBudgetPrice }}-{{ i.upperBudgetPrice }}万</span>
            </p>
            <p>
              <span>备注:</span>
              <span>{{ i.remarks }}</span>
            </p>
          </div>
          <div v-if="i.demandStatus=='6'">
            <span class="type">装修</span>
            <p>
              <span>预算:</span>
              <span>{{ i.lowerBudgetPrice }}-{{ i.upperBudgetPrice }}万</span>
            </p>
            <p>
              <span>备注:</span>
              <span>{{ i.remarks }}</span>
            </p>
          </div>
        </div>
			</div>
			<div class="cus_info_follow" v-show="customerFollowShow">
        <div class="cus_info_nofollow" v-show="noFollowShow">
        </div>
				<div class="cus_info_follow_item" v-for="i,index in customerFollow">
					<p>
						<span>金管家:</span>
						<span>{{ i.followerGoldenName }}</span>
					</p>
					<p>
						<span>跟进方式:</span>
						<span>{{ i.typeName }}</span>
					</p>
					<p>
						<span>跟进类型:</span>
						<span v-if="i.demandStatus==1">二手房</span>
            <span v-if="i.demandStatus==2">租房</span>
            <span v-if="i.demandStatus==4">新房</span>
            <span v-if="i.demandStatus==5">装修</span>
            <span v-if="i.demandStatus==6">家政</span>
					</p>
					<p>
						<span>客源状态:</span>
						<span v-if="i.customerStatus==1">有效客源</span>
            <span v-if="i.customerStatus==3">意向中</span>
            <span v-if="i.customerStatus==4">无效客源</span>
            <span v-if="i.customerStatus==5">信息错误</span>
            <span v-if="i.customerStatus==6">联系不上</span>
            <span v-if="i.customerStatus==7">暂无需求</span>
            <span v-if="i.customerStatus==8">已成交</span>
            <span v-if="i.customerStatus==9">第三方成交</span>
					</p>
					<p>
						<span>跟进内容:</span>
						<span>{{ i.remarks }}</span>
					</p>
					<span class="time">
						{{ i.createTime }}
					</span>
				</div>
			</div>
			<div class="cus_info_see" v-show="customerSeeShow">
        <div class="cus_info_nosee" v-show="noSeeShow"></div>
				<div class="cus_info_see_item" v-for="i,index in customerSee">
					<p>
							<span>金管家:</span>
							<span>{{ i.followerGoldenName }}  {{ i.followerGoldenTel }}</span>
						</p>
						<p>
							<span>带看时间:</span>
							<span>{{ i.createTime }}</span>
						</p>
						<p>
							<span>带看类型:</span>
              <span v-if="i.takeLookType==1">二手房</span>
              <span v-if="i.takeLookType==2">租房</span>
              <span v-if="i.takeLookType==4">新房</span>
						</p>
						<p>
							<span>带看内容:</span>
							<span>{{ i.projects.join(" ") }}</span>
						</p>
				</div>
			</div>
		</div>
  </div>
</template>

<script>

export default {
  name: 'customer',
  data () {
    return {
      arrTabStatus: [true, false, false],
      customerRequireShow: false,
      noRequireShow: false,
      customerFollowShow: false,
      noFollowShow: false,
      customerSeeShow: true,
      noSeeShow: false,
      customerInfo: {
        'goldenCommon': {}
      },
      customerFollow: [],
      customerSee: [],
      currentId: '',
      messageNoticeId: ''
    }
  },
  created () {
    // 请求参数，从列表页带过来
    this.currentId = this.$route.query.currentId
    this.messageNoticeId = this.$route.query.messageNoticeId
    var url = 'customer' + '/v1/unionBusinessM/1.0/readCustomerNotice?customerId=' + this.currentId + '&messageNoticeId=' + this.messageNoticeId
    this.$http.get(url).then(function (res) {
      console.log(res)
      this.customerInfo = res.body
    })
  },
  methods: {
    // tab切换效果
    tabChange (count) {
      switch (count) {
        case 0:
          if (this.customerRequireShow) return
          this.arrTabStatus = [true, false, false]
          this.customerFollowShow = this.customerSeeShow = false
          this.customerRequireShow = true
          break
        case 1:
          if (this.customerFollowShow) return
          this.arrTabStatus = [false, true, false]
          this.customerRequireShow = this.customerSeeShow = false
          this.customerFollowShow = true
          this.$http.get('customer' + '/v1/customerV2/queryCustomerFollows?customerId=CRI201612130000000020').then(function (res) {
            this.customerFollow = res.body
          })
          break
        case 2:
          if (this.customerSeeShow) return
          this.arrTabStatus = [false, false, true]
          this.customerFollowShow = this.customerRequireShow = false
          this.customerSeeShow = true
          this.$http.get('customer' + '/v1/customerV2/queryCustomerTakeLooks?customerId=CRI201612130000000020&demandStatus=0').then(function (res) {
            console.log(res)
            this.customerSee = res.body
          })
          break
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	div,p,span{color:#333;}
  .customer_info{width: 100%;margin: 0 0 55px 0;}
  .cus_info_header{
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
  .cus_info_cus{
  	margin:.9rem 0 0 0;height: 2.7rem;padding: 0 0 0 .2rem;
  	p{
  		height: .9rem;line-height: .9rem;
  		text-align: left;
  		font-size: .28rem;
  		border-bottom: 1px solid #eee;padding: 0 0 0 .1rem;
  		position: relative;
  		span{
  			color: #666;float: left;
  		}
  		.sex{
  			height: .3rem;width: .3rem;border:1px solid #f60;margin: .3rem .1rem 0 .2rem;line-height: .28rem;
  			border-radius: .05rem;color: #f60;font-size: .2rem;text-align: center;
  		}
  		.tel{
  			margin:0 0 0 .35rem;
  		}
  	}
  	p:first-child{
  		span:first-child{
  			color: #333;
  		}
  	}
  }
  .cus_info_content{
  	width: 100%;
  }
  .cus_info_content_header{
  	width: 100%;height: .9rem;border-bottom: 1px solid #eee;line-height: .9rem;
  	li{
  		position: relative;float: left;width: 33.3%;height: .9rem;
  		span{
  			position: absolute;
  			width: 2rem;height: .9rem;
  			left: .25rem;top:0;
  		}
  		.checked{
  			color: #f60;border-bottom: 2px solid #f60;
  		}
  	}
  }
  .cus_info_require,.cus_info_follow,.cus_info_see{
  	padding: 0 .3rem 0 .2rem;font-size: .24rem;
  }
  .cus_info_norequire{
    p{
      border-bottom: 1px dashed #ccc;position: relative;padding: .64rem 0 .2rem 0 ;
      position: relative;width: 100%;height: 3.15rem;
      background: url(../assets/img/cusinfonoreq1.jpg) no-repeat center center;
      background-size: .74rem 1.32rem;
      .type{
      position: absolute;
      top:.24rem;left: 0;width: .85rem;height: .32rem;line-height: .32rem;background: #fee5e0;
      }
    }
    p:last-child{
      border: none;
    }
  }
  .cus_info_require_item{
  	border-bottom: 1px dashed #ccc;position: relative;padding: .64rem 0 .2rem 0 ;
  	.type{
			position: absolute;
			top:.24rem;left: 0;width: .85rem;height: .32rem;line-height: .32rem;background: #fee5e0;
  	}
  	p{
  		height: .46rem;line-height: .46rem;
  		span{
  			float: left;
  		}
  		span:first-child{
  			width: 1.5rem;
  			text-align: left;
  		}
  	}
  }
  .cus_info_nofollow{
    min-height: 3rem;width: 100%;background: url(../assets/img/cusinfonofollow.jpg) no-repeat center 1.46rem;background-size: .8rem 1.34rem;
  }
  .cus_info_follow_item{
  	border-bottom: 1px dashed #ccc;position: relative;padding: .24rem 0 .64rem 0 ;
  	p{
  		height: .46rem;line-height: .46rem;
  		span{
  			float: left;
  		}
  		span:first-child{
  			width: 1.1rem;
  			text-align: right;
  		}
  		span:last-child{
  			text-indent: .15rem;
  		}
  	}
  	.time{
  		position: absolute;bottom: .24rem;right: 0;color: #999;
  	}
  }
  .cus_info_nosee{
    min-height: 3rem;width: 100%;background: url(../assets/img/cusinfonosee.jpg) no-repeat center 1.46rem;background-size: .56rem 1.29rem;
  }
  .cus_info_see_item{
  	border-bottom: 1px dashed #ccc;position: relative;padding: .24rem 0 .2rem 0 ;
  	p{
  		height: .46rem;line-height: .46rem;
  		span{
  			float: left;
  		}
  		span:first-child{
  			width: 1.1rem;
  			text-align: right;
  		}
  		span:last-child{
  			text-indent: .15rem;
  		}
  	}
  }
  .cus_info_require_item:last-child,.cus_info_follow_item:last-child,.cus_info_see_item:last-child{
		border: none;
  }
</style>

