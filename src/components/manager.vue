<template>
  <div id="manager">
    <mt-header title="我的金管家">
      <router-link to="/mine" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="f1">
      <div class="f1-1">
        <img src="../assets/img/jgj.png" width="20.8%">
      </div>
      <ul class="f1-2">
        <li><h4>金管家：{{ goldenName }}</h4></li>
        <li>{{ goldenTel }}</li>
      </ul>
    </div>
    <div class="f2">
      <a href="javascript:;" v-on:click="callManager">联系金管家</a>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  name: 'Mine',
  data () {
    return {
      goldenName: this.$store.state.goldenName,
      goldenTel: this.$store.state.goldenTel
    }
  },
  methods: {
    callManager () {
      MessageBox.confirm('确定拨打电话' + this.goldenTel + '?').then(action => {
        // console.log('打电话')
        window.location.href = 'tel:' + this.$store.state.goldenTel
      }).catch(action => {})
    }
  }
}
</script>

<style lang="less" scoped>
#manager {
  .f1 {
    margin-top: 10px;
    padding: 30px 0;
    background-color: #fff;
    .f1-2 {
      margin-top: 5px;
      font-size: 0.28rem;
      color: #333;
    }
  }
  .f2 {
    background-color: #fff;
    margin-top: 10px;
    padding: 15px 0;
    a {
      color: #ff6600;
      font-size: 0.34rem;
    }
  }
}
</style>
