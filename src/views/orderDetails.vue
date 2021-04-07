<template>
  <el-container>
    <el-header>
  <!--页头-->
    <!--返回上一页-->
    <el-page-header @back="goBack" content="订单详情"></el-page-header>
    </el-header>
    <el-main>
      <el-form :label-position="order_detail" label-width="80px" :model="order_detail">
        <!--订单编号-->
        <el-form-item label="订单编号">
          <el-input v-model="order_detail.orderID" readonly ></el-input>
        </el-form-item>
        <!--商品ID-->
        <el-form-item label="商品ID">
          <el-input v-model="order_detail.productID" readonly></el-input>
        </el-form-item>
        <!--交易日期-->
        <el-form-item label="交易日期">
          <el-input v-model="order_detail.date" readonly></el-input>
        </el-form-item>
        <!--消费者ID/联系方式-->
        <el-form-item label="消费者ID">
          <el-input v-model="order_detail.customerID" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="order_detail.number1" readonly></el-input>
        </el-form-item>
        <!--商家ID/联系方式-->
        <el-form-item label="商家ID">
          <el-input v-model="order_detail.shangjiaID" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="order_detail.number2" readonly></el-input>
        </el-form-item>
        <!--订单状态（已付款/已发货/已完成）-->
        <el-form-item label="订单状态">
          <el-input v-model="order_detail.state" readonly></el-input>
        </el-form-item>
        <!--收货地址-->
        <el-form-item label="收货地址">
          <el-input v-model="order_detail.location" readonly></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-input v-model="order_detail.pay" readonly></el-input>
        </el-form-item>
        <el-container>
        <!--商品详情-->
        <el-aside width="50%">
        <div>
            <el-card>
              <el-image :src="order_detail.picture" class="image" >
              </el-image>
              <div style="padding: 14px;">
                <el-input v-model="order_detail.name" readonly></el-input>
                <el-button type="text" class="button" @click="showProduct">查看</el-button>
              </div>
            </el-card>
        </div>
          <!--操作按钮-->
          <!--按钮功能还没写！！！！-->
        </el-aside>
          <el-main>
            <el-button type="danger" plain style="height: 50%;width: 48%;float: right">取消订单</el-button>
            <el-button type="warning" plain style="height: 50%;width: 48%">不知道干什么</el-button>
            <el-button type="success" plain style="height: 50%;width: 48%">不知道干什么</el-button>
            <el-button type="primary" plain style="height: 50%;width: 48%;float: right"
            @click="goHome()">返回主页</el-button>
          </el-main>
        </el-container>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
name: "orderDetails",
  data() {
    const item = [{
      orderID:'123456',
      productID: '01',
      date:'2021/04/03',
      customerID:'这是消费者ID',
      number1:'这是消费者联系电话',
      shangjiaID:'这是商家ID',
      number2:'这是联系电话',
      state:'这是订单状态',
      location:'这是收货地址',
      name:'这是商品标题',
      pay:'这是支付方式',
      picture:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }];
    return {
      order_detail: item[0],
    };
  },
  methods: {
    showProduct(){
      this.$router.replace('/itemCard')
    },
    goBack() {
      this.$router.go(-1);
    },
    goHome(){
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
.button {
  padding: 5px;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
</style>