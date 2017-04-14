<template>
  <div class="home">
    <div class="HomeSwipe">
      <!-- <p class="location"><a href="https://m.jyall.com/app/changecity_new.html"><img src="../assets/img/LocationIcon.png">北京市</a></p> -->
      <mt-swipe :auto="5000">
      <mt-swipe-item v-for="i,index in homeBanner" v-if="index < 5"><a :href="i.URL"><img :src="i.image"></a></mt-swipe-item>
    </mt-swipe>
    </div>
    <div class="HomeRoom clearfix">
      <div class="Room">
        <router-link to="/SpecialHouse">
          <img src="../assets/img/homeIconOne.png">
          <p>房产</p>
        </router-link>
      </div>
      <div class="Room">
        <router-link to="/renovation">
          <img src="../assets/img/homeIconTwo.png">
          <p>大家装</p>
        </router-link>
      </div>
      <div class="Room">
        <router-link to="/SpecialHealthy">
          <img src="../assets/img/homeIconThree.png">
          <p>健康之旅</p>
        </router-link>
      </div>
      <div class="Room">
        <router-link to="/SpecialTravel">
          <img src="../assets/img/homeIconSeven.png">
          <p>美丽之旅</p>
        </router-link>
      </div>
    </div>
    <div class="notice">
      <div class="NowBorder clearfix">
        <div class="float NowLeft">
          <router-link to="/affiche">联盟商<p>快&nbsp;报</p></router-link>
        </div>
        <div class="float NowCenter">
          <mt-swipe :show-indicators="false" :auto="5000">
            <mt-swipe-item v-for="i,index in homeNotice" v-if="index < 5">
              <router-link to="/affiche" class="center">
                <b>{{ i.title }}</b>
                <p>{{ i.content }}</p>
              </router-link>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="float NowRight">
          <router-link to="/affiche">更多</router-link>
        </div>
      </div>
    </div>
    <div v-if="this.isMaster !== 0" class="HomeRoom recommend clearfix">
      <div class="Room RoomThree">
        <!-- <router-link to="/recommend"> -->
        <router-link :to="{path:'recommend',query:{type:'jiazhuang'}}">
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
    <div v-if="this.isMaster === 0" class="HomeRoom recommend clearfix">
      <div class="Room RoomTwo">
        <!-- <router-link to="/recommend"> -->
        <router-link :to="{path:'recommend',query:{type:'jiazhuang'}}">
          <img src="../assets/img/homeIconFour.png">
          <p>推荐客户</p>
        </router-link>
      </div>
      <div class="Room RoomTwo">
        <router-link to="/qrCode">
          <img src="../assets/img/homeIconFive.png">
          <p>推广二维码</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
  name: 'Home',
  data () {
    return {
      homeBanner: [],
      homeNotice: [],
      isMaster: this.$store.state.isMaster,
      params: {
        'unionId': this.$store.state.unionBusinessId
        // 'unionId': 'UIN2016071800003405'
      }
    }
  },
  created () {
    // this.$http.get('/jycms-api/v1/data/info/getCollectionsInfoByLabel/jyall-lms-index-banner').then(function (res) {
    this.$http.get('/jycms-api/v1/data/info/getCollectionsInfoByLabel/jyall-lms-index-banner').then(function (res) {
      // console.log(res)
      this.homeBanner = res.body
    }).catch(function (response) {
      if (response.body.code !== 200 && response.body.message) {
        Toast(response.body.message)
      } else {
        Toast('哇哦，网络不给力')
      }
    })
    // this.$http.get('/jycms-api/v1/data/info/getCollectionsInfoByLabel/jyall-lms-index-notice').then(function (res) {
    this.$http.get('/common-push/v1/push?type=4&startTime=0&isPreview=false&format=yyyy-MM-dd%20HH%3Amm', {'headers': {'APPkey': '3'}}).then(function (res) {
      this.homeNotice = res.body
    }).catch(function (response) {
      if (response.body.code !== 200 && response.body.message) {
        Toast(response.body.message)
      } else {
        Toast('哇哦，网络不给力')
      }
    })
    // MessageBox.confirm('GPS定位到您当前位置是北京，是否切换到北京?').then(action => {

    // })
    this.getQrCode()
    this.getManager()
  },
  methods: {
    getQrCode () {
      if (this.params.unionId) {
        this.$store.dispatch('getQrCode', this.params)
      }
    },
    getManager () {
      if (this.params.unionId) {
        this.$store.dispatch('getManager', this.params)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{ background-color: #f9f9f9; height: 100%; }
  .HomeSwipe{ position: relative; width: 100%; height: 3.8rem;}
  .HomeSwipe img{ width: 100%; height: 3.8rem;}
  .HomeRoom{ margin-top: 0.01rem; background-color: #fff; border-bottom: 0.01rem solid #eaeaea;}
  .HomeRoom .Room{ width: 25%; height: 2.5rem; float: left; text-align: center;}
  .HomeRoom .Room a{ display: inline-block; padding: 0.56rem 0.25rem;}
  .HomeRoom .Room img{ width: 0.68rem; height: 0.56rem;}
  .HomeRoom .Room p{ font-size: 0.28rem; color: #333; margin-top: 0.2rem;}
  .HomeRoom .RoomThree{width: 33.3333%;}
  .HomeRoom .RoomTwo{ width: 50%;}
  .HomeSwipe .location{ position: absolute; top: 0.2rem; left: 0.2rem; z-index: 99; font-size: 0.24rem; line-height: 0.44rem; border-radius: 0.22rem; padding: 0 0.22rem; background:rgba(0,0,0,0.3);}
  .HomeSwipe .location a{ display: block; color: #fff;}
  .HomeSwipe .location a img{ width: 0.24rem; height: 0.3rem; position: relative; top: 0.06rem; margin-right: 0.06rem;}
  .notice{ background-color: #fff; border-top: 0.01rem solid #eaeaea; border-bottom: 0.01rem solid #eaeaea; margin-top: 0.2rem;}
  .notice .float{float: left; width: 0.8rem;}
  .notice .NowBorder{ width: 7.1rem; margin: 0.2rem auto; padding: 0.2rem; border: 0.01rem solid #f9f9f9; border-radius:0.07rem; background-color: #f9f9f9;}
  .notice .NowLeft{ font-size: 0.22rem; width: 0.85rem; font-weight: 600; color: #333;}
  .notice a{ color: #333;}
  .notice .NowLeft p{ background-color:#f74949; color: #fff; border-radius:0.03rem; padding: 0 0.06rem; font-weight: 400; line-height: 0.26rem; }
  .notice .NowCenter{ width: 4.8rem; height:0.64rem; margin-left: 0.2rem; text-align: left; }
  .notice .NowCenter .center{ display: inline-block; color: #333; font-size: 0.22rem;}
  .notice .NowCenter b{ display:block;overflow: hidden; text-overflow:ellipsis;white-space: nowrap; width: 4.8rem;}
  .notice .NowCenter p{overflow: hidden; text-overflow:ellipsis;white-space: nowrap; width: 4.8rem;}
  .NowRight{ border-left:0.01rem solid #e5e5e5;}
  .NowRight a{ display: inline-block; line-height: 0.6rem; text-align: center; font-size: 0.24rem; padding-left: 0.2rem;}
  .recommend{ border-top: 0.01rem solid #eaeaea; border-bottom: 0.01rem solid #eaeaea;margin-top:0.2rem; margin-bottom: 70px;}
  .recommend .Room img{ width:0.77rem; height:0.74rem; }
</style>
