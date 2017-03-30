<template>
  <div class="qrCode">
	<div class="cus_info_header">推广专属二维码
		<router-link to="/"></router-link>
	</div>
	<div class="qrCodeImg">
		<img :src="QrCode">
		<p>扫一扫，下载家园网APP</p>
		<span>由{{ userName }}推广</span>
	</div>
	<p class="qrCodeText">作为一站式家庭O 2 O 服务平台， 家园网（JYall.com）为联盟商提供更加广泛、更具附加值的优质产品和高品质的线下服务资源，使其经营多元化，以此获得更多的客户，并增强客户粘性，最大程度让合作伙伴实现盈利，从而达到合作企业、消费客户以及家园网（JYall.com）的三方共赢。</p>
  </div>
</template>

<script>

export default {
  name: 'QrCode',
  data () {
    return {
      QrCode: this.$store.state.talkContentImageUrl,
      userName: this.$store.state.userName
    }
  },
  created () {
    // console.log(this.$route.query.currentId)
    // this.$http.get('http://10.10.33.136/v1/provider/1.0/getGoldenByUnionId/UIN2016071800003405').then(function (res) {
    //   console.log(res)
    //   this.QrCode = res.body
    // })
    // this.$store.dispatch('getQrCode', this.params)
  },
  computed: {},
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cus_info_header{width: 100%; height: 0.9rem;line-height: 0.9rem;font-size: 0.3rem;border-bottom: 1px solid #d3d3d3;position: fixed;top: 0;left: 0;background: #fff ;z-index: 10;}
.cus_info_header a{position: absolute;left: 0;top:0;width: .9rem;height: .9rem;background: url(../assets/img/cusinfobackicon.gif) no-repeat center center;background-size: .19rem .34rem;}
.qrCode{ height: 100%; background-color: #f5f5f5; padding-top: 0.9rem;}
.qrCodeImg{ margin-top: 0.2rem; background-color: #fff; padding: 0.4rem;}
.qrCodeImg img{ width: 4.38rem; height: 4.38rem; margin:0 auto 0.3rem;}
.qrCodeImg p{ font-size: 0.4rem; color: #333;}
.qrCodeImg span{ font-size: 0.28rem; color: #666;}
.qrCodeText{ font-size: 0.24rem; color: #666; padding:0.3rem; text-align: left;}
</style>
