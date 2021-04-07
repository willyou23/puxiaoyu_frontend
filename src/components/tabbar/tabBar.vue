<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
name: "TabBar"
}
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background: #3d533c;
    height: 40px;
    /*tab-bar下面的阴影*/
    box-shadow: 0px 2px 1px rgba(86,108,87,.5);
  }
</style>