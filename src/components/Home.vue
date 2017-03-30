<template>
  <div class="home">
    <div class="HomeSwipe">
      <!-- <p class="location"><a href="https://m.jyall.com/app/changecity_new.html"><img src="../assets/img/LocationIcon.png">北京市</a></p> -->
      <mt-swipe :auto="5000">
      <mt-swipe-item v-for="i,index in homeBanner"><a :href="i.URL"><img :src="i.image"></a></mt-swipe-item>
    </mt-swipe>
    </div>
    <div class="HomeRoom clearfix">
      <div class="Room">
        <a href="https://m.jyall.com/fang/list-9">
          <img src="../assets/img/homeIconOne.png">
          <p>房产</p>
        </a>
      </div>
      <div class="Room">
        <a href="https://m.jyall.com/fang/list-10">
          <img src="../assets/img/homeIconTwo.png">
          <p>大家装</p>
        </a>
      </div>
      <div class="Room">
        <a href="https://m.jyall.com/fang/list-11">
          <img src="../assets/img/homeIconThree.png">
          <p>健康之旅</p>
        </a>
      </div>
      <div class="Room">
        <a href="https://m.jyall.com/fang/list-11">
          <img src="../assets/img/homeIconSeven.png">
          <p>美丽之旅</p>
        </a>
      </div>
    </div>
    <div class="notice">
      <div class="NowBorder clearfix">
        <div class="float NowLeft">
          <router-link to="/affiche">联盟商<p>快&nbsp;报</p></router-link>
        </div>
        <div class="float NowCenter">
          <mt-swipe :show-indicators="false" :auto="5000">
          <mt-swipe-item v-for="i,index in homeNotice">
            <a :href="i.URL" class="center">
              <b>{{ i.name }}</b>
              <p>{{ i.Subtitle }}</p>
            </a>
          </mt-swipe-item>
        </mt-swipe>
        </div>
        <div class="float NowRight">
          <router-link to="/affiche">更多</router-link>
        </div>
      </div>
    </div>
    <div class="HomeRoom recommend clearfix">
      <div class="Room RoomThree">
        <router-link to="/recommend">
          <img src="../assets/img/homeIconFour.png">
          <p>推荐客户</p>
        </router-link>
      </div>
      <div class="Room RoomThree">
        <router-link to="/qrCode">
          <img src="../assets/img/homeIconFive.png">
          <p>推广二维码</p>
        </router-link>
      </div>
      <div class="Room RoomThree">
        <router-link to="/childAccount">
          <img src="../assets/img/homeIconSix.png">
          <p>子账号</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import { MessageBox } from 'mint-ui'
export default {
  name: 'Home',
  data () {
    return {
      homeBanner: [],
      homeNotice: [],
      params: {
        // 'unionId': this.$store.state.userInfo.unionId
        'unionId': 'UIN2016071800003405'
      }
    }
  },
  created () {
    this.$http.get('/jycms-api/v1/data/info/getCollectionsInfoByLabel/jyall-lms-index-banner').then(function (res) {
      console.log(res)
      this.homeBanner = res.body
    })
    this.$http.get('/jycms-api/v1/data/info/getCollectionsInfoByLabel/jyall-lms-index-notice').then(function (res) {
      this.homeNotice = res.body
    })
    // MessageBox.confirm('GPS定位到您当前位置是北京，是否切换到北京?').then(action => {

    // })
    this.getQrCode()
  },
  methods: {
    getQrCode () {
      this.$store.dispatch('getQrCode', this.params)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{ background-color: #f9f9f9; height: 100%; }
  .HomeSwipe{ position: relative; width: 7.5rem; height: 3.8rem;}
  .HomeSwipe img{ width: 7.5rem; height: 3.8rem;}
  .HomeRoom{ margin-top: 0.01rem; background-color: #fff; border-bottom: 0.01rem solid #eaeaea;}
  .HomeRoom .Room{ width: 1.85rem; height: 2.5rem; float: left; text-align: center;}
  .HomeRoom .Room a{ display: inline-block; padding: 0.56rem 0.25rem;}
  .HomeRoom .Room img{ width: 0.68rem; height: 0.56rem;}
  .HomeRoom .Room p{ font-size: 0.28rem; color: #333; margin-top: 0.2rem;}
  .HomeRoom .RoomThree{width: 2.48rem;}
  .HomeSwipe .location{ position: absolute; top: 0.2rem; left: 0.2rem; z-index: 99; font-size: 0.24rem; line-height: 0.44rem; border-radius: 0.22rem; padding: 0 0.22rem; background:rgba(0,0,0,0.3);}
  .HomeSwipe .location a{ display: block; color: #fff;}
  .HomeSwipe .location a img{ width: 0.24rem; height: 0.3rem; position: relative; top: 0.06rem; margin-right: 0.06rem;}
  .notice{ background-color: #fff; border-top: 0.01rem solid #eaeaea; border-bottom: 0.01rem solid #eaeaea; margin-top: 0.2rem;}
  .notice .float{float: left;}
  .notice .NowBorder{ width: 7.1rem; margin: 0.2rem auto; padding: 0.2rem; border: 0.01rem solid #f9f9f9; border-radius:0.07rem; background-color: #f9f9f9;}
  .notice .NowLeft{ font-size: 0.22rem; font-weight: 600; color: #333;}
  .notice a{ color: #333;}
  .notice .NowLeft p{ background-color:#f74949; color: #fff; border-radius:0.03rem; padding: 0 0.06rem; font-weight: 400; line-height: 0.26rem; }
  .notice .NowCenter{ width: 5rem; height:0.64rem; margin-left: 0.2rem; text-align: left; }
  .notice .NowCenter .center{ display: inline-block; color: #333; font-size: 0.22rem;}
  .notice .NowCenter b{ display:block;overflow: hidden; text-overflow:ellipsis;white-space: nowrap; width: 4.9rem;}
  .notice .NowCenter p{overflow: hidden; text-overflow:ellipsis;white-space: nowrap; width: 4.9rem;}
  .NowRight{ border-left:0.01rem solid #e5e5e5;}
  .NowRight a{ display: inline-block; line-height: 0.6rem; text-align: center; font-size: 0.24rem; padding-left: 0.2rem;}
  .recommend{ border-top: 0.01rem solid #eaeaea; border-bottom: 0.01rem solid #eaeaea;margin-top:0.2rem;}
  .recommend .Room img{ width:0.77rem; height:0.74rem; }
</style>
