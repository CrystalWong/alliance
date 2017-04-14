<template>
  <div class="affiche">
  	<div class="aff_header">金管家公告
	  <router-link to="/"></router-link>
  	</div>
  	<div class="aff_content">
  		<div class="aff_noaffiche" v-show="noAfficheShow"></div>
	  	<div class="aff_title">
	  		共收到{{ affiches.length }}条公告
	  	</div>
  		<ul>
  			<li class="aff_item" v-for="i,index in affiches">
  				<h3>{{ i.title }}</h3>
  				<p>{{ i.content }}</p>
  				<span>{{ i.createTime }}</span>
  				<!-- <router-link to="/afficheInfo"></router-link> -->
  			</li>
  		</ul>
  	</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'affiche',
  data () {
    return {
      affiches: [],
      noAfficheShow: false
    }
  },
  created () {
    this.$http.get('/common-push/v1/push?type=4&startTime=0&isPreview=false&format=yyyy-MM-dd%20HH%3Amm', {'headers': {'APPkey': '3'}}).then(function (res) {
      // console.log(res.body)
      this.affiches = res.body
    }).catch(function (response) {
      if (response.body.code !== 200 && response.body.message) {
        Toast(response.body.message)
      } else {
        Toast('哇哦，网络不给力')
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .fl(){float: left}
  div,p,span{color:#333;}
  .affiche{
  	width: 100%;margin: 0 0 55px 0;padding: .9rem 0 0 0;
  }
  .aff_header{
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
  .aff_content{
  	position: relative;
  	.aff_noaffiche{
  		position: absolute;top: 0;left: 0;width: 100%;height: 1000px;z-index: 100;
  		background: #f5f5f5 url(../assets/img/noaffiche.jpg) no-repeat center 3.5rem;
  		background-size: 1.66rem 2.31rem;
  	}
  }
	.aff_title{
		height: .56rem;line-height: .56rem;background: #f2f2f2;text-indent: .3rem;text-align: left;
		font-size: .24rem;
	}
	.aff_item{
		width: 100%;height: auto;border-bottom: 1px solid #eee;
		padding: .18rem .25rem 0 .3rem;position: relative;
		h3{
			text-align: left;height: .55rem;line-height: .55rem;font-size: .3rem;
		}
		p{
      height: auto;line-height: .48rem;font-size: .22rem;
      color: #666;
      word-wrap:break-word;
      word-break:break-all;
      text-align: left;

		}
		span{
			position: absolute;top:.35rem;right: .3rem;font-size: .2rem;color: #666;
		}
		a{
			position: absolute;top:0;left: 0;width: 100%;height: 100%;opacity: 0;
		}
	}
</style>

