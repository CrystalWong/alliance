<template>
  <div class="afficheinfo">
  	<div class="aff_info_header">
      <a onclick="window.history.go(-1)"></a>
    </div>
    <div class="aff_info_content">
      <h2>下周拓展公告</h2>
      <p>
        2016-12-27 12:12
      </p>
      <p>
        公司下周膜举   行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......
      </p>
      <p>
        公司下周膜举   行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......公司下周膜举行拓展活动，全员必须参加......
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'afficheInfo',
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
  .afficheinfo{
  	width: 100%;margin: 0 0 55px 0;padding: .9rem 0 0 0;
  }
  .aff_info_header{
    width: 100%;height: .9rem;line-height: .9rem;
    border-bottom: 1px solid #eee;position: fixed;top: 0;left: 0;
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
  .aff_info_content{
    width: 100%;padding: .2rem .4rem 0 .3rem;
    h2{
      text-align: left;font-size: .3rem;height: .5rem;line-height: .5rem;
    }
    p{
      text-align: left;font-size: .2rem;line-height: .4rem;padding: .25rem 0 .15rem 0;
    }
    p:first-of-type{
      padding: 0;
    }
  }
</style>

