<template>
  <div id="mine">
    <mt-header title="我的"></router-link>
    </mt-header>
    <div class="f1">
      <div class="f1-1">
        <img src="../assets/img/icon-7.png" width="88%">
      </div>
      <ul class="f1-2">
        <li><h4>{{ unionBusinessName }}</h4></li>
        <li>{{ mobile }}</li>
      </ul>
    </div>
    <div class="f2" v-show="false">
    <!-- 第一期暂时隐藏 -->
      <ul class="f2-item">
        <li class="f2-item-num">{{ 12 }}</li>
        <li>推荐客户总数</li>
      </ul>
      <ul class="f2-item">
        <li class="f2-item-num">{{ 20 }}</li>
        <li>跟进中</li>
      </ul>
      <ul class="f2-item">
        <li class="f2-item-num">{{ 5 }}</li>
        <li>签约数</li>
      </ul>
    </div>
    <div class="f3">
      <mt-cell title="修改密码" to="/updatePwd" is-link>
        <img slot="icon" src="../assets/img/icon-1.png" width="22">
      </mt-cell>
      <mt-cell title="金管家" to="/manager" is-link>
        <img slot="icon" src="../assets/img/icon-2.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="我的佣金" class="disable">
        <span>敬请期待！</span>
        <img slot="icon" src="../assets/img/icon-3.png" width="24" height="24">
      </mt-cell>
    </div>
    <div class="f4">
      <a href="javascript:;" v-if="loginFlag" v-on:click="logout">退出登录</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      unionBusinessName: this.$store.state.unionBusinessName,
      mobile: this.$store.state.mobile,
      loginFlag: this.$store.state.loginFlag,
      params: {
        // 'unionId': this.$store.state.userInfo.unionId
        'unionId': 'HZS201703170000126813'
      }
    }
  },
  created () {
    this.getManager()
  },
  methods: {
    getManager () {
      this.$store.dispatch('getManager', this.params)
    },
    logout () {
      this.$store.dispatch('toLogout')
    }
  }
}
</script>

<style lang="less" scoped>
#mine {
  .f1,.f2 {
    display: -webkit-flex;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    background-color: #fefefe;
  }
  .f1 {
    border-top: 1px solid #eaeaea;
    justify-content: flex-start;
    text-align: left;
    padding: 20px;
    .f1-1 {
      img {
        vertical-align: middle;
      }
      width: 16%;
      text-align: center;
    }
    .f1-2 {
      h4 {
        color: #333;
      }
      font-size: 0.34rem;
    }
  }
  .f2 {
    justify-content: space-between;
    border-top: 1px solid #e5e5e5;
    padding: 17px 20px;
    .f2-item {
      width: 1/3*100%;
      font-size: 0.24rem;
    }
    .f2-item-num {
      color: #000;
      font-weight: bold;
    }
  }
  .f3 {
    margin-top: 10px;
    text-align: left;
    font-size: 0.28rem;
    .disable {
      color: #999;
    }
  }
  .f4 {
    background-color: #fff;
    margin-top: 24px;
    padding: 15px 0;
    a {
      color: #ff6600;
      font-size: 0.34rem;
    }
  }
  
}
</style>
