<template>
  <div class="Special">
  	<div class="cus_info_header">房产
  		<router-link to="/"></router-link>
  	</div>
    <img src="../assets/img/SpecialPictureTwo.png" class="SpecialPicture"/>
  	<div class="LpStep clearfix">
     <div>
       <img src="../assets/img/LpStepOne.png"/>
       <p>需求提交</p>
       <span>房产需求提交</span>
     </div>
     <div>
       <img src="../assets/img/LpStepTwo.png"/>
       <p>金管家服务</p>
       <span>金管家团队跟踪服务，促成交易</span>
     </div>
     <div>
       <img src="../assets/img/LpStepThree.png"/>
       <p>获得奖励</p>
       <span>推荐、完成交易可获得奖励</span>
     </div>
    </div>
  	<p class="LpText">作为家园网联盟商B，您身边的亲戚、朋友以及客户想购买<span>新房、二手房，或者出售二手房</span>，您均可以填写相关需求信息导入家园网，并由家园网金管家团队跟踪服务，可以让您的亲戚、朋友或客户得到最大的实惠（如在北京购买一套价值500万的二手房，最高可省佣金7.5万元），同时您还将获得最高<span>上万元的现金奖励。</span></p>
    <button class="ClickSubmit">
      <router-link :to="{path:'recommend',query:{type:'新房'}}">推荐客户</router-link>
    </button>
  </div>
</template>

<script>

export default {
  name: 'SpecialHouse',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Special{ height: 100%; background: #fff; padding-top: 0.9rem; padding-bottom: 2rem; overflow: scroll;}
.cus_info_header{width: 100%; height: 0.9rem;line-height: 0.9rem;font-size: 0.3rem;border-bottom: 1px solid #d3d3d3;position: fixed;top: 0;left: 0;background: #fff ;z-index: 10;}
.cus_info_header a{position: absolute;left: 0;top:0;width: .9rem;height: .9rem;background: url(../assets/img/cusinfobackicon.gif) no-repeat center center;background-size: .19rem .34rem;}
.SpecialPicture{ width: 7.5rem; height: 3.66rem;}
.LpStep{ margin-top: 0.2rem; background: #fbfbfb;}
.LpStep div{ width: 2.48rem; float: left; padding: 0.3rem 0.1rem;}
.LpStep div img{ width: 0.85rem; height: 0.79rem;}
.LpStep div p{ font-size: 0.28rem; color: #333; line-height: 0.42rem; font-weight: 600;}
.LpStep div span{ font-size: 0.22rem; color: #666;}
.LpText{ font-size: 0.28rem; line-height: 0.48rem; color: #333; text-align: left; margin: 0.3rem 0.62rem; font-family: "\5B8B\4F53";}
.LpText span{ color: #f60;}
.ClickSubmit{ position: absolute; bottom: 0; right: 0; width: 100%; height:0.9rem; border: none; background: #f60; font-size: 0.34rem; color: #fff; font-weight: 200;}
.ClickSubmit a{ color: #fff;}
</style>
