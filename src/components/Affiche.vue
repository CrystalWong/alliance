<template>
  <div class="affiche">
  	<div class="aff_header">金管家公告
	  <router-link to="/"></router-link>
  	</div>
  	<div class="aff_content">
  		<div class="aff_noaffiche" v-show="noAfficheShow"></div>
	  	<div class="aff_title">
	  		共收到{{num}}条公告
	  	</div>
  		<ul>
  			<li class="aff_item">
  				<h3>下周拓展公告</h3>
  				<p>公司下周举行拓展公告，全员必须参加，公司下周举行拓展公告，全员必须参加公司下周举行拓展公告，全员必须参加</p>
  				<span>2016-12-27 12:12</span>
  				<router-link to="/afficheInfo"></router-link>
  			</li>
  			<li class="aff_item">
  				<h3>下周拓展公告</h3>
  				<p>公司下周举行拓展公告，全员必须参加，公司下周举行拓展公告，全员必须参加公司下周举行拓展公告，全员必须参加</p>
  				<span>2016-12-27 12:12</span>
  				<router-link to="/afficheInfo"></router-link>
  			</li>
  			<li class="aff_item">
  				<h3>下周拓展公告</h3>
  				<p>公司下周举行拓展公告，全员必须参加，公司下周举行拓展公告，全员必须参加公司下周举行拓展公告，全员必须参加</p>
  				<span>2016-12-27 12:12</span>
  				<router-link to="/afficheInfo"></router-link>
  			</li>
  		</ul>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'affiche',
  data () {
    return {
      num: 3,
      noAfficheShow: false
    }
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
		width: 100%;height: 1.4rem;border-bottom: 1px solid #eee;
		padding: .18rem .25rem 0 .3rem;position: relative;
		h3{
			text-align: left;height: .55rem;line-height: .55rem;font-size: .3rem;
		}
		p{
			white-space: nowrap;
			overflow: hidden;
			text-overflow:ellipsis; 
			height: .48rem;line-height: .48rem;font-size: .22rem;
			color: #666;
		}
		span{
			position: absolute;top:.35rem;right: .3rem;font-size: .2rem;color: #666;
		}
		a{
			position: absolute;top:0;left: 0;width: 100%;height: 100%;opacity: 0;
		}
	}
</style>

