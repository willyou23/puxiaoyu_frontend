<template>
  <el-container>
    <!--页头-->
    <!--返回上一页-->
    <el-header>
      <div style="text-align: right;margin-right: 15%">
        <el-dropdown style="float: left">
          <el-page-header
              @back="goHome" content="Build Order" title="Back"></el-page-header>
        </el-dropdown>
        <el-dropdown>
          <i class="el-icon-s-home" style="margin: 10px;font-size: 20px" @click="goHome"></i>
        </el-dropdown>
        <el-dropdown>
          <i class="el-icon-s-promotion" style="margin: 10px;font-size: 20px"  @click="contact_us"></i>
        </el-dropdown>
        <el-dropdown>
          <i class="el-icon-user" style="margin: 10px;font-size: 20px" ></i>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item>
              <el-button size="medium" style="width: 120px" @click="login">Login</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button size="medium" style="width: 120px" @click="profile">Profile</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main style="padding: 0">
      <el-card style="width: 70%;display:block;margin:0 auto;background-color: #008066">
        <el-form label-position="left" label-width="80px" :model="order_detail">
          <el-card style="width: 85%;display:block;margin:0 auto">
            <!--订单编号-->
            <el-form-item label="Order ID">
              <el-input v-model="order_detail.orderID" readonly></el-input>
            </el-form-item>
            <!--商品-->
            <el-form-item label="Product">
              <el-input v-model="goods_detail.name" readonly></el-input>
            </el-form-item>
            <!--商品数量-->
            <el-form-item label="Quantity">
              <el-input v-model="order_detail.productQuantity" readonly></el-input>
            </el-form-item>
            <!--交易日期-->
            <el-form-item label="Date">
              <el-input v-model="order_detail.date" readonly></el-input>
            </el-form-item>
            <!--订单支付金额-->
            <el-form-item label="Payment">
              <el-input v-model="order_detail.payment_amount" readonly></el-input>
            </el-form-item>
            <!--订单状态（已付款/已发货/已完成）-->
            <el-form-item label="Status">
              <!--未付款时显示未支付，finish/finished-->
              <el-input v-if="order_detail.payment_status===false" readonly placeholder="Unpaid"></el-input>
              <el-input v-else-if="order_detail.state===true" placeholder="Finished" readonly></el-input>
              <el-input v-else placeholder="Unfinished" readonly></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-if="order_detail.payment_status===false" type="primary"
                         plain icon="el-icon-coin" @click="Pay" style="float: left">Pay
              </el-button>
            </el-form-item>
            <!--消费者ID/联系方式-->
            <el-form-item label="Customer">
              <el-input v-model="order_detail.customer" readonly></el-input>
            </el-form-item>
            <el-form-item label="Phone">
              <el-input v-model="order_detail.customer_phone" readonly></el-input>
            </el-form-item>
            <!--商家ID/联系方式-->
            <el-form-item label="Merchant">
              <el-input v-model="order_detail.merchant" readonly></el-input>
            </el-form-item>
            <el-form-item label="Phone">
              <el-input v-model="order_detail.merchant_phone" readonly></el-input>
            </el-form-item>
            <!--收货信息-->
            <!--收货人-->
            <el-form-item label="Receiver">
              <el-input v-model="order_detail.receiver" readonly></el-input>
            </el-form-item>
            <!--收货电话-->
            <el-form-item label="Phone">
              <el-input v-model="order_detail.receiver_phone" readonly></el-input>
            </el-form-item>
            <!--收货地址-->
            <el-form-item label="Address">
              <el-input v-model="order_detail.location" readonly></el-input>
            </el-form-item>
            <!--备注-->
            <el-form-item label="Remark">
              <el-input v-model="order_detail.remark" readonly></el-input>
            </el-form-item>
          </el-card>
          <el-card style="width: 85%;display:block;margin:0 auto">
            <el-container>
              <el-aside style="width: 50%">
                <!--商品详情-->
                <div>
                  <el-card style="display:block;margin:0 auto">
                    <el-image :src="require('@/assets/'+goods_detail.img[0])" class="image">
                    </el-image>
                    <div style="padding: 14px;">
                      <el-input v-model="goods_detail.name" readonly></el-input>
                      <el-button type="text" class="button" @click="showProduct">查看</el-button>
                    </div>
                  </el-card>
                </div>
              </el-aside>
              <!--按钮-->
              <el-main>
                <el-button type="danger" plain icon="el-icon-delete" @click="delete_order"
                           style="height: 50%;width: 48%;float: right;margin: auto">Delete
                </el-button>
                <el-button type="warning" plain icon="el-icon-edit"
                           style="height: 50%;width: 48%;margin: auto" @click="modify">Modify
                </el-button>
                <el-button type="primary" plain icon="el-icon-s-home"
                           style="height: 50%;width: 48%;float: right;margin: auto"
                           @click="goHome()">Home
                </el-button>
                <el-button type="success" plain icon="el-icon-box" @click="haveGoods"
                           style="height: 50%;width: 48%;margin: auto">Receive the goods
                </el-button>
              </el-main>
            </el-container>
          </el-card>
        </el-form>
      </el-card>
      <!--修改订单信息-->
      <el-dialog
          title="Edit order information"
          :visible.sync="dialogVisible"
          width="50%">
        <div>
          <el-form label-position="left" lable-with="90px" :model="order_detail" label-width="130px">
            <!--只有未支付时可以改变商品数量-->
            <el-form-item v-if="order_detail.payment_status===false" label="Product Quantity">
              <!--3-->
              <el-input-number v-model="modify_info.number"
                               @change="handleChange" :min="1" :max="goods_detail.stock"
                               step-strictly></el-input-number>
            </el-form-item>
            <!--customer能改的信息-->
            <div v-if="order_detail.isCustomer===true">
              <el-form-item label="Receiver">
                <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                          type="text" v-model="modify_info.receiver"></el-input>
              </el-form-item>
              <el-form-item label="Phone">
                <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                          type="text" v-model="modify_info.receiver_phone"></el-input>
              </el-form-item>
              <el-form-item label="Address">
                <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                          type="text" v-model="modify_info.location"></el-input>
              </el-form-item>
              <el-form-item label="Remark">
                <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                          type="text" v-model="modify_info.remark"></el-input>
              </el-form-item>
            </div>
            <!--商家改动部分-->
            <div v-if="order_detail.isCustomer===false">
              <el-form-item label="Merchant Phone">
                <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                          type="text" v-model="modify_info.merchant_phone"></el-input>
              </el-form-item>
              <el-form-item label="Total Price">
                <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                          type="text" v-model="modify_info.payment_amount"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button style="margin-left: 20px;margin-bottom: 8px" @click="cancelInfoEdit">Cancel</el-button>
            <el-button style="margin-left: 120px;margin-bottom: 8px" type="primary"
                       @click="confirmInfoEdit">Confirm</el-button>
        </span>
      </el-dialog>
      <!--支付-->
      <el-dialog
          title="Pay"
          :visible.sync="dialogVisible_pay"
          width="50%">
        <div>
          <el-form label-width="120px">
            <el-form-item label="Customer">
              <el-input v-model="order_detail.customer" readonly></el-input>
            </el-form-item>
            <el-form-item label="Amount">
              <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                        type="text" v-model="order_detail.payment_amount" readonly></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                        type="password" v-model="password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button style="margin-left: 20px;margin-bottom: 8px"
                       @click="cancelPayEdit">Cancel</el-button>
            <el-button style="margin-left: 120px;margin-bottom: 8px"
                       type="primary" @click="confirmPay">Pay Now</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>

</template>

<script>
import qs from "qs";

export default {
  name: "Order_details",
  data() {
    return {
      dialogVisible: false,
      dialogVisible_pay: false,
      password: '',

      cookie: "",
      order_detail: {
        orderID: '123456',//订单编号，不可修改
        productQuantity: 1,//购买数量，未支付可修改
        // picture:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',//产品第一张图片
        date: '2021/04/03',//订单生成日期
        customer: 'This is customer',//消费者
        customer_phone: 'phone',
        customer_password: '334455',//支付密码
        merchant: 'merchant',
        merchant_phone: 'phone',
        state: false,//已完成未完成//3
        payment_status: false,//支付状态
        name: 'title',//卡片上的标题
        payment_amount: 50,//支付总额
        receiver: 'Lin',
        receiver_phone: '8169096',
        location: 'RenMing Road',
        remark: '',
        isCustomer: true,//是否是顾客
      },
      goods_detail: {
        id: "",
        name: "mac",
        price: "",
        stock: 50,//3_修改
        img: ['logo.png']
      },
      modify_info: {
        number: 1,
        receiver: '',
        receiver_phone: '',
        location: '',
        remark: '',
        merchant_phone: '',
        payment_amount: ''
      },
    };
  },
  methods: {
    goHome() {
        this.$router.push({path: '/', query: {cookie: this.cookie}})
    },
    login() {
        this.$router.replace('/Login')
    },
    profile() {
        this.$router.push({path: '/profile', query: {cookie: this.cookie}})
    },
    contact_us(){
          this.$alert('puxiaoyu@qq.com', 'E-mail', {
              confirmButtonText: 'confirm',
              callback: action => {
                  this.$message({
                      type: 'info',
                      message: `action: ${ action }`
                  });
              }
          });
      },
    showProduct() {
      this.$router.push({path: '/goodsDetail', query: {cookie: this.cookie, goodsId: this.goods_detail.id}})
    },
    modify() {
      this.dialogVisible = true;
    },
    cancelInfoEdit() {
      this.dialogVisible = false;
    },
    confirmInfoEdit() {
      if (this.order_detail.payment_status) {
        if (this.order_detail.isCustomer) {
          this.order_detail.receiver = this.modify_info.receiver;
          this.order_detail.receiver_phone = this.modify_info.receiver_phone;
          this.order_detail.location = this.modify_info.location;
          this.order_detail.remark = this.modify_info.remark;
        }
      } else {
        if (this.order_detail.isCustomer) {
          this.order_detail.receiver = this.modify_info.receiver;
          this.order_detail.receiver_phone = this.modify_info.receiver_phone;
          this.order_detail.location = this.modify_info.location;
          this.order_detail.remark = this.modify_info.remark;
          this.order_detail.productQuantity = this.modify_info.number;
          this.order_detail.payment_amount = this.goods_detail.price * 100 * this.modify_info.number / 100
        } else {
          // this.order_detail.merchant_phone = this.modify_info.merchant_phone;
          this.order_detail.payment_amount = this.modify_info.payment_amount;
        }
      }
      let params = {
        cookie: this.cookie,
        orderId: this.order_detail.orderID,
        amount: this.order_detail.payment_amount,
        receiver: this.order_detail.receiver,
        receiverPhone: this.order_detail.receiver_phone,
        address: this.order_detail.location,
        remark: this.order_detail.remark,
        quantity: this.order_detail.productQuantity
      }
      this.$axios.post('/api/order/editOrder/',
          qs.stringify(params)
      ).then(res => {
        console.log(res.data)
        const ans = JSON.parse(res.data)
        this.dialogVisible_pay = false;
        if (ans.validation) {//注意！！！
          this.$message.success(ans.mes)
        } else {
          this.$message.error(ans.mes)
        }
      })

      this.dialogVisible = false;
    },
    Pay() {
      this.dialogVisible_pay = true;
    },
    cancelPayEdit() {
      this.dialogVisible_pay = false;
    },
    confirmPay() {
      let params = {
        cookie: this.cookie,
        orderId: this.order_detail.orderID,
        password: this.password,
        amount: this.order_detail.payment_amount
      }
      this.$axios.post('/api/order/payment/',
          qs.stringify(params)
      ).then(res => {
        console.log(res.data)
        const ans = JSON.parse(res.data)
        this.order_detail.payment_status = ans.validation
        this.dialogVisible_pay = false;
        if (this.order_detail.payment_status) {//注意！！！
          this.$message.success(ans.mes)
        } else {
          this.$message.error(ans.mes)
        }
      })
    },
    delete_order() {
  if (!this.order_detail.payment_status||this.order_detail.state) {
    this.$confirm('This action will permanently delete the order!!!', 'Hint', {
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      let params = {
        cookie: this.cookie,
        orderId: this.order_detail.orderID,
      }
      this.$axios.post('/api/order/deleteOrder/',
          qs.stringify(params)
      ).then(res => {
        const ans = JSON.parse(res.data)
        if (ans.validation) {
          this.$message.success(ans.mes)
          this.$router.push({path: '/profile', query: {cookie: this.cookie}})
        } else {
          this.$message.error(ans.mes)
        }
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Cancel'
      });
    });
  }else {
    this.$alert('You can not delete this order now!', 'Hint', {
      confirmButtonText: 'OK',
      callback: action => {
        this.$message({
          type: 'info',
          message: `action: ${ action }`
        });
      }
    });
  }
},
    haveGoods() {
      //已完成支付的订单才能确认收货
      if (this.order_detail.payment_status) {
        this.$confirm('Whether the goods have been delivered？', 'Hint', {
          confirmButtonText: 'YES',
          cancelButtonText: 'NO',
          type: 'warning'
        }).then(() => {
          let params = {
            cookie: this.cookie,
            orderId: this.order_detail.orderID
          }
          this.$axios.post('/api/order/confirmReceive/',
              qs.stringify(params)
          ).then(res => {
            console.log(res.data)
            const ans = JSON.parse(res.data)
            this.order_detail.state = ans.validation
            if (this.order_detail.state === true) {
              this.$message.success(ans.mes)
            } else {
              this.$message.error(ans.mes)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel'
          });
        });
      } else {
        this.$alert('Please pay the order first!!!', 'Unpaid', {
          confirmButtonText: 'OK',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            });
          }
        });
      }
    }
    ,
    handleChange(value) {
      console.log(value);
    }
  },


  mounted() {
    if (this.$route.query.cookie !== undefined) {
      this.cookie = this.$route.query.cookie
      this.order_detail.orderID = this.$route.query.orderId
      let params = {
        cookie: this.cookie,
        orderId: this.order_detail.orderID
      }
      this.$axios.post('/api/order/showOrder/',
          qs.stringify(params)
      ).then(res => {
        // console.log(res.data)
        console.log(res.data)
        const ans = JSON.parse(res.data)
        if (ans.validation === true) {
          this.goods_detail.id = ans.goodsId
          this.goods_detail.name = ans.goodsName//产品编号，不可修改，名称在卡片处
          this.order_detail.productQuantity = ans.quantity //购买数量，未支付可修改
          // this.goods_detail.img = ans.img//产品第一张图片
          this.goods_detail.img = ans.img//产品第一张图片
          console.log(ans.img[0])
          this.goods_detail.price = ans.price
          this.order_detail.date = ans.date//订单生成日期
          this.order_detail.customer = ans.customerName//消费者
          this.order_detail.customer_phone = ans.customerPhoneNumber
          // this.order_detail.customer_password='334455'//支付密码
          this.order_detail.merchant = ans.sellerName
          this.order_detail.merchant_phone = ans.sellerPhoneNumber
          this.order_detail.state = ans.finished//已完成未完成
          this.order_detail.payment_status = ans.paid//支付状态
          this.order_detail.name = ans.goodsName//卡片上的标题
          this.order_detail.payment_amount = ans.totalPrice
          this.order_detail.receiver = ans.receiver
          this.order_detail.receiver_phone = ans.phoneNumber
          this.order_detail.location = ans.address
          this.order_detail.remark = ans.remark

          //  modified
          this.modify_info.remark = ans.remark
          this.modify_info.location = ans.address
          this.modify_info.receiver_phone = ans.phoneNumber
          this.modify_info.receiver = ans.receiver
          this.modify_info.payment_amount = ans.totalPrice
          this.modify_info.number = ans.quantity
        } else {
          this.$message.error("Get information error")
        }
      })
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