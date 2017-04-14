<template>
  <div class="customer">
  	<div class="cus_header">
      我的客户 
    </div>
  
    <div class="cus_tab clearfix">
      <p>
        <span :class="{'checked':!tabCheck}" @click="tabChange(0)">全部</span>
      </p>
      <p>
        <span :class="{'checked':tabCheck}" @click="tabChange(1)">提醒<b :class="{'newicon':hasNew}"></b></span>
      </p>
    </div>

    <div class="cus_list">
      <div class="no_cus" v-show="noCusIsShow"></div>
      <div class="no_warn" v-show="noWarnIsShow"></div>
      <ul>
        <li class="cus_list_item" v-for="i,index in customerListData" v-show="!tabCheck">
          <router-link :to="{path:'customerInfo',query:{currentId:i.customerId,messageNoticeId:'all'}}"></router-link>
          <h3>{{ i.name }}</h3>
          <p>
              添加人：<span>{{ i.inputManName }}</span>
              <time>{{ i.createTimeStr }}</time>
          </p>
          <b class="newwarn" v-show="i.messageNoticeCount==1">新提醒</b>
        </li>
        <li class="cus_list_item" v-for="i,index in customerWarnData" v-show="tabCheck">
          <router-link :to="{path:'customerInfo',query:{currentId:i.customerId,messageNoticeId:i.messageNoticeId}}"></router-link>
          <h3>{{ i.name }}</h3>
          <p>
              添加人：<span>{{ i.inputManName }}</span>
              <time>{{ i.createTimeStr }}</time>
          </p>
          <b class="newwarn">新提醒</b>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'customer',
  data () {
    return {
      tabCheck: 0, //  tab切换状态控制
      hasNew: false, // 是否显示新提醒小圆点
      noCusIsShow: false, // 是否显示没有客户页
      noWarnIsShow: false, // 是否显示没有新提醒页
      customerListData: [],
      customerWarnData: []
    }
  },
  methods: {
    getData (type) {
      var pamars = {
        'unionId': this.$store.state.unionBusinessId,
        'unionUserId': this.$store.state.unionId,
        'isParents': this.$store.state.isMaster,
        'isOnlyNoticeFlag': type,
        'pageSize': '100',
        'pageNo': '1'
      }
      this.$http.post('/jysteward-centerapipre/v1/unionBusinessM/1.0/getCustomersByUnionId', pamars).then(function (res) {
        // console.log(res)
        var self = this
        if (type === '1') {
          this.customerWarnData = res.body.customerList
          this.customerWarnData.forEach(function (i) {
            if (i.messageNoticeCount === '1') {
              self.hasNew = true
            }
          })
        } else {
          this.customerListData = res.body.customerList
          this.customerListData.forEach(function (i) {
            if (i.messageNoticeCount === '1') {
              self.hasNew = true
            }
          })
        }
      }).catch(function (response) {
        if (response.body.code !== 200 && response.body.message) {
          Toast(response.body.message)
        } else {
          Toast('哇哦，网络不给力')
        }
      })
    },
    tabChange (status) {
      if (this.tabCheck === status) return
      this.tabCheck = status
      if (status === 1) {
        this.getData('1')
        // this.customerListData = []
        // this.$http.get('/jysteward-centerapipre/v1/unionBusinessM/1.0/getCustomerNoticees/' + this.$store.state.unionId).then(function (res) {
        //   this.customerWarnData = res.body.customerList
        // }).catch(function (response) {
        //   if (response.body.code !== 200 && response.body.message) {
        //     Toast(response.body.message)
        //   } else {
        //     Toast('哇哦，网络不给力')
        //   }
        // })
        // return
        return
      }
      if (status === 0) {
        this.getData('0')
        // this.customerWarnData = []
        // var url = ''
        // if (this.$store.state.isMaster === '0') {
        //   url = '/jysteward-centerapipre/v1/unionBusinessM/1.0/getCustomersByUnionUserId/' + this.$store.state.unionId
        // } else {
        //   url = '/jysteward-centerapipre/v1/unionBusinessM/1.0/getCustomersByUnionId/' + this.$store.state.unionBusinessId
        // }
        // this.$http.get(url).then(function (res) {
        //   this.customerListData = res.body.customerList
        // }).catch(function (response) {
        //   if (response.body.code !== 200 && response.body.message) {
        //     Toast(response.body.message)
        //   } else {
        //     Toast('哇哦，网络不给力')
        //   }
        // })
        return
      }
    }
  },
  created () {
    this.tabChange()
    this.getData('0')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .fl(){float: left}
  div,p,span{color:#333;}
  .customer{width: 100%;margin: 0 0 55px 0;}
	.cus_header{
    width: 100%;height: .9rem;line-height: .9rem;font-size: .3rem;border-bottom: 1px solid #d3d3d3;position: fixed;top: 0;left: 0;background: #fff;z-index: 10;
  }
  .cus_tab{
    width: 100%;height: .8rem;font-size: .26rem;margin:.9rem 0 0 0 ;
    p{
      .fl();width: 50%;height: .8rem;text-align: center;line-height: .8rem;
      span{
        display: inline-block;height: .8rem;
      }
      span:last-child{
        position: relative;
        .newicon{
          position: absolute;top:.25rem;right:-.07rem;
          width: .1rem;height: .1rem;border-radius: 50%;background: #f60;
        }
      }
      .checked{
        color: #f60;border-bottom: 3px solid #f60;
      }
    }
  }
  .cus_list{
    width: 100%; border-top: 1px solid #d3d3d3;
    // 没有客户页
    .no_cus{
      width: 100%;min-height: 800px;background: url(../assets/img/nocustomer.jpg) no-repeat center 3rem;background-size: 1.64rem 1.43rem;
    }
    // 没有提醒页
    .no_warn{
      width: 100%;min-height: 800px;background: url(../assets/img/nowarn.jpg) no-repeat center 3rem;background-size: 1.67rem 1.42rem;
    }
    ul{
      z-index: 1;
    }
  }
  .cus_list_item{
    width: 100%;height: 1.4rem;text-align: left;position: relative;padding: 0.1px 0 0 .3rem;
    border-bottom: 1px solid #eee;
    a{
      position: absolute;width: 100%;height: 100%;opacity: 0;left: 0;top:0;
    }
    h3{
      height: .54rem;line-height: .54rem;font-size: .3rem;margin:.18rem 0 0 0 ;font-weight: normal;
    }
    p{
      height: .48rem;line-height: .48rem;font-size: .24rem;color: #666;
      time{
        padding: 0 0 0 .3rem;
      }
    }
    b{display: none;}
    .newwarn{
      display: block;
      color: #f60;background: url(../assets/img/newwarnicon.gif) no-repeat left center;
      background-size: .3rem .32rem;font-weight: normal;
      padding: 0 0 0 .4rem;font-size: .26rem;
      position: absolute;right: .3rem;top:.37rem;
    }
  }
</style>
