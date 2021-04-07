<template>
  <div class="class">
    <div v-for="(item,index) in titles"
         class="class-item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Classification",
    props:{
      titles:{
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex: 0
      }
    },
    methods:{
      itemClick(index) {
        this.currentIndex=index;
      }
    }
  }
</script>

<style scoped>
  .class{
    display: flex;
    text-align: center;
    font-size: 18px;
  }
  .class-item{
    flex: 1;
    height: 50px;
    line-height: 50px;
  }
  .class-item span{
    padding: 8px;
  }
  .active{
    color: #c40000;
  }
  .active span{
    border-bottom: 3px solid red;
  }
</style>