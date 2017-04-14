<template>
  <div id="menubar">
    <mt-tabbar v-model="selected">
      <router-link to="/" class="menu-item" exact>
        <mt-tab-item id="home">
        <!-- <mt-tab-item> -->
          <img slot="icon" src="../assets/img/icon-5.png" class="icon">
          <img slot="icon" src="../assets/img/icon-5-selected.png" class="icon-selected">
          首页
        </mt-tab-item>
      </router-link>
      <router-link to="/customer" class="menu-item">
        <mt-tab-item id="customer">
        <!-- <mt-tab-item> -->
          <img slot="icon" src="../assets/img/icon-6.png" class="icon">
          <img slot="icon" src="../assets/img/icon-6-selected.png" class="icon-selected">
          客户
        </mt-tab-item>
      </router-link>
      <router-link to="/mine" class="menu-item">
        <mt-tab-item id="mine">
        <!-- <mt-tab-item> -->
          <img slot="icon" src="../assets/img/icon-4.png" class="icon">
          <img slot="icon" src="../assets/img/icon-4-selected.png" class="icon-selected">
          我的
        </mt-tab-item>
      </router-link>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Menubar',
  data () {
    return {
      selected: 'home'
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
#menubar { width: 100%; }
.menu-item {
  width: 1/3*100%;
  display: block;
  .icon {
    display: block;
  }
  .icon-selected {
    display: none;
  }
  &.router-link-active .icon-selected {
    display: block;
  }
  &.router-link-active .icon {
    display: none;
  }
}
</style>
