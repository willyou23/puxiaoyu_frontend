<template>
  <div>
    <button @click="showOrder">show order</button>
    <button @click="createOrder">create order</button>
    <button @click="createGoods">create Goods</button>
    <button @click="showGoods">show Goods</button>
  </div>
</template>

<script>
export default {
  name: "template",
  data(){
    return{
      cookie: "97705652273874709788",
      orderId: "1",
      goodsId: "1",
      goodsId1:"10"
    }
  },
  methods:{
    showOrder(){
      this.$router.push({path: '/order', query: {cookie: this.cookie, orderId: this.orderId}})
    },
    createOrder(){
      this.$router.push({path: '/trade', query: {cookie: this.cookie, goodsId: this.goodsId}})
    },
    createGoods(){
      this.$router.push({path: '/ChooseCategory', query: {cookie: this.cookie, goodsId: this.goodsId}})
    },
    showGoods(){
      this.$router.push({path: '/goodsDetail', query: {cookie: this.cookie, goodsId: this.goodsId1}})
    }
  }
}
</script>