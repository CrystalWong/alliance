<template>
  <div class="childacc">
  	<div class="childacc_header">我的子账户
      <router-link to="/"></router-link>
      <router-link to="/addChildAccount">添加</router-link>
    </div>
    <div class="childacc_content">
      <div class="childacc_nochildacc" v-show="noChildAccountShow"></div>
      <ul>
        <li class="childacc_item" v-for="i,index in childAccountList">
          <p>{{ i.childrenName }}</p>
          <span>账号：{{ i.userInfo.tel }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'afficheInfo',
  data () {
    return {
      num: 3,
      noAfficheShow: false,
      noChildAccountShow: false,
      childAccountList: []
    }
  },
  methods: {
  },
  created () {
    this.$http.get('golden' + '/v1/provider/1.0/getUnionChildren/UIN2016071500003331').then(function (res) {
      console.log(res)
      this.childAccountList = res.body
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .fl(){float: left}
  div,p,span{color:#333;}
  .childacc{
    width: 100%;margin: 0 0 55px 0;padding: .9rem 0 0 0;
  }
  .childacc_header{
    width: 100%;height: .9rem;line-height: .9rem;
    border-bottom: 1px solid #eee;position: fixed;top: 0;left: 0;
    background: #fff ;
    z-index: 10;font-size: .3rem;
    a{
      position: absolute;
      ;top:0;
      width: .9rem;height: .9rem;
      background: url(../assets/img/cusinfobackicon.gif) no-repeat center center;
      background-size: .19rem .34rem;
    }
    a:first-child{
      left: 0;
    }
    a:last-child{
      right: .1rem;background: none;color: #333;font-size: .28rem;
    }
  }
  .childacc_content{
    padding: 0 .3rem 0 .2rem;position: relative;
    .childacc_nochildacc{
      position: absolute;left: 0;top:0;width: 100%;height: 1000px;z-index: 100;
      background: #f5f5f5 url(../assets/img/nochildaccount.jpg) no-repeat center 3.6rem;
      background-size: 2.1rem 2.19rem;
    }
  }
  .childacc_item{
    width: 100%;height: .9rem;line-height: .9rem;border-bottom:1px solid #eee;font-size: .24rem;
    p{
      .fl();
    }
    span{
      float: right;
    }
  }
</style>

