<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="login"></router-view>
    <router-view name="menubar"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      selected: 'home'
    }
  },
  methods: {
    startHacking () {
      this.$toast('It Works!')
    }
  }
}
</script>
<style src="@/assets/style/common.less" lang="less"></style>
<style src="@/assets/style/reset.less" lang="less"></style>
<style lang="less">
#app {
  text-align: center;
  height: 100%;
  overflow-y: scroll;
}
.mint-tab-item-label a {
  width: 100%;
  display: inline-block;
  max-width: 750px;
  margin: 0 auto;
}
</style>
