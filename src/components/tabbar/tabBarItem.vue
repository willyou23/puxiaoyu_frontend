<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- slot 被替换-->

    <div :class="{active: isActive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {

  name: "TabBarItem",
  props: {
    path: String
  },
  data(){
    return{
      //isActive: true
    }
  },
  //计算属性
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path)
    }
  }

}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    /*text-align: center;*/
    height: 40px;
    color: white;
    justify-content: center;

    /*文字垂直居中*/
   display: flex;
   align-items: center;

}

  .active{
    color: darkgray;
  }
</style>