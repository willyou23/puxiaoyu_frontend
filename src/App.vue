<template>
  <div id="app">
    <tab-bar>
      <div class="logo">
        <img src="~@/assets/logo.png" alt="">
        浦小鱼
      </div>

      <tab-bar-item path="/">
        <div slot="item-text">Home Page</div>
      </tab-bar-item>
      <tab-bar-item path="/">
        <div slot="item-text">收藏夹</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <div slot="item-text">Profile</div>
      </tab-bar-item>
      <tab-bar-item path="/">
        <div slot="item-text">联系客服</div>
      </tab-bar-item>
    </tab-bar>

    <router-view></router-view>

  </div>
</template>

<script>
  import TabBar from "@/components/tabbar/tabBar";
  import TabBarItem from "@/components/tabbar/tabBarItem";
  export default {
    name: "App",
    components: {
      TabBar,
      TabBarItem
    },
  }
</script>

<style>
  /*引用css样式*/
  body{
    padding: 0;
    margin: 0;
  }
  .logo{
    color: white;
    font-family: Kefa;
    font-size: 15px;
    /*文字垂直居中*/
    display: flex;
    align-items: center;
  }
  .logo img{
    width: 40px;
    height: 40px;
    margin-left: 55px;
  }

</style>
