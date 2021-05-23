<template>
  <el-container>
    <!--页头-->
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
              <el-button v-show="cookie===''" size="medium" style="width: 120px" @click="login">Login</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button v-show="cookie!==''" size="medium" style="width: 120px" @click="logout">Logout</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button size="medium" style="width: 120px" @click="profile">Profile</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <el-card style="width: 70%;display:block;margin:0 auto;">
        <el-steps  :active='active' finish-status="success">
          <el-step title="Create order" icon="el-icon-edit"></el-step>
          <el-step title="Confirm order" icon="el-icon-s-claim"></el-step>
          <el-step title="Pay" icon="el-icon-coin"></el-step>
        </el-steps>
      </el-card>
    </el-main>
    <el-main>
      <el-card style="width: 70%;display:block;margin:0 auto;">
        <!--第1步，填信息-->
        <div v-if="active===0">
          <el-form label-position="left" label-width="90px" :model="formLabelAlign" ref="formLabelAlign">
            <el-form-item label="Product Name">
              <el-input v-model="goods_detail.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="User">
              <el-input v-model="formLabelAlign.user_name" readonly></el-input>
            </el-form-item>
            <el-form-item prop="product_quantity" label="Quantity" :rules="[
                { required: true, message: 'Please input the Quantity!', trigger: 'blur' },
            ]">
              <el-input-number v-model="formLabelAlign.product_quantity"
                               @change="handleChange" :min="1" :max="goods_detail.stock" step-strictly></el-input-number>
            </el-form-item>
            <el-form-item prop="receiver" label="Receiver" :rules="[
                { required: true, message: 'Please input the receiver!', trigger: 'blur' }
            ]">
              <el-input v-model="formLabelAlign.receiver"></el-input>
            </el-form-item>
            <el-form-item prop="phone_number" label="Phone" :rules="[
                { required: true, message: 'Please input the contact information!', trigger: 'blur' },
                { min: 7, max: 11, message: 'Please input the correct telephone number!', trigger: 'blur' }
            ]">
              <el-input v-model="formLabelAlign.phone_number"></el-input>
            </el-form-item>
            <el-form-item prop="address" label="Address" :rules="[
                {required: true, message: 'Please input the address!', trigger: 'blur'}
            ]">
              <el-input type="textarea" v-model="formLabelAlign.address"></el-input>
            </el-form-item>
            <el-form-item label="Remark">
              <el-input v-model="formLabelAlign.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!--第2步，提交订单-->
        <div v-if="active===1">
          <el-form label-position="left" label-width="90px" :model="formLabelAlign">
            <el-form-item label="Product">
              <el-input v-model="goods_detail.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="User">
              <el-input v-model="formLabelAlign.user_name" readonly></el-input>
            </el-form-item>
            <el-form-item label="Quantity">
              <el-input v-model="formLabelAlign.product_quantity" readonly></el-input>
            </el-form-item>
            <el-form-item label="Receiver">
              <el-input v-model="formLabelAlign.receiver" readonly></el-input>
            </el-form-item>
            <el-form-item label="Phone">
              <el-input v-model="formLabelAlign.phone_number" readonly></el-input>
            </el-form-item>
            <el-form-item label="Address">
              <el-input type="textarea" v-model="formLabelAlign.address" readonly></el-input>
            </el-form-item>
            <el-form-item label="Remark">
              <el-input v-model="formLabelAlign.remark" readonly></el-input>
            </el-form-item>
            <el-form-item label="Amount">
              <el-input v-model="100*goods_detail.price*formLabelAlign.product_quantity/100" readonly></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!--第3步，支付-->
        <div v-if="active===2">
          <el-form label-position="left" label-width="90px" :model="formLabelAlign">
            <el-form-item label="Account">
              <el-input v-model="formLabelAlign.user_name" readonly></el-input>
            </el-form-item>
            <el-form-item label="Amount">
              <el-input v-model="100*goods_detail.price*formLabelAlign.product_quantity/100" readonly></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="formLabelAlign.password" type="password"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!--订单建立成功-->
        <div v-if="active===3">
          <p v-if=formLabelAlign.payment_status style="color: #42426F" align="center">
            You have successfully created the order!
          </p>
          <p v-else style="color: #42426F" align="center">
            You have successfully created the order but have not yet paid.
          </p>
        </div>
        <el-button type="success" plain style="width: 48%" @click="prev"
                   v-if="active===1">Back</el-button>
        <el-button type="success" plain style="width: 48%; float: right" @click="next('formLabelAlign')"
                   v-if="active===0">Next</el-button>
        <el-button type="success" plain style="width: 48%; float: right" @click="goHome"
                   v-if="active===0">Cancel</el-button>
        <el-button type="success" plain style="width: 48%" @click="ignore"
                   v-if="active===2">Ignore</el-button>
        <!--提交表单信息-->
        <el-button type="success" plain style="width: 48%; float: right" @click="confirm"
                   v-if="active===1">Confirm</el-button>
        <!--支付完成-->
        <el-button type="success" plain style="width: 48%" @click="payOrder"
                   v-if="active===2">Pay</el-button>
        <!--跳转到订单详情页-->
        <el-button type="primary" plain style="width: 48%;display:block;margin:0 auto" @click="goOrder"
                   v-if="active===3">Show Order Detail</el-button>

      </el-card>
    </el-main>

  </el-container>
</template>

<script>
import qs from "qs";

export default {
  name: "Trade",
  data(){
   return{
     orderId: "",
     active:0,
     cookie : "",
     Int_password:'',//输入密码
     formLabelAlign: {
       product_quantity:1,//购买数量
       user_name:'',//购买者昵称
       receiver:'',//收货人
       phone_number:'',//电话号码
       address: '',//收货地址
       remark:'none',//备注
       //pay_price:30,//总价
       payment_status: false,//支付状态
       password:'',//正确密码
     },
     goods_detail:{
          name: "mac",//product name
          price: 3,//单价
          stock: 50,//库存
          id: "",
    },

   }
  },
  methods:{
    goHome() {
        this.$router.push({path: '/', query: {cookie: this.cookie}})
    },
    login() {//我写的关于logout的代码////////////////////////////////////
      // alert("Logout Successfully")
        // this.$router.go(0)
      this.$router.replace({path: '/Login'})

    },
    logout() {
      alert("Logout Successfully")
      this.$router.replace({path: '/'})
      // console.log("Blank执行")
    },//到这里结束/////////////////////////////////////////////
    profile() {
      if(this.cookie === ""){
        this.$message.error("please login first")
      } else{
        this.$router.push({path: '/profile', query: {cookie: this.cookie}})
      }
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
    /*goBack() {
      this.$router.go(-1);
    },*/
    prev(){
    --this.active;
    if (this.active<0) this.active=0;
  },
    ignore(){
    if (this.active++>3) this.active=0;
    },
    next(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.active++>3) this.active=0;
        } else {
          console.log('Error!!');
          return false;
        }
      });
    },
    confirm(){
      this.ignore();
      // 放在触发confirm的时间下
      let params = {
        orderId: this.orderId,
        cookie: this.cookie,
        goodsId: this.goods_detail.id,
        status: "create",
        quantity: this.formLabelAlign.product_quantity,
        phoneNumber: this.formLabelAlign.phone_number,
        receiver: this.formLabelAlign.receiver,
        address: this.formLabelAlign.address,
        remark: this.formLabelAlign.remark,
      }
      this.$axios.post('/api/order/createOrder/',
          qs.stringify(params)
      ).then(res => {
        const ans = JSON.parse(res.data)
        if (ans.validation === true) {
          this.orderId = ans.orderId
          this.goods_detail.price = ans.goodsPrice
          this.goods_detail.stock = ans.goodsQuantity
          this.goods_detail.name = ans.goodsName
          this.formLabelAlign.user_name = ans.customer
          this.formLabelAlign.address = ans.address
          this.formLabelAlign.phone_number = ans.phoneNumber
          this.formLabelAlign.product_quantity = ans.quantity
          this.formLabelAlign.phone_number = ans.phoneNumber
          this.formLabelAlign.receiver = ans.receiver
          this.formLabelAlign.address = ans.address
          this.formLabelAlign.remark = ans.remark
          this.$message.success(ans.mes)
        } else{
          this.$message.error(ans.mes)
        }
      })
      // //////////////////////////////////////////////////
    },


    goOrder(){
      this.$router.push({path: '/profile', query: {cookie: this.cookie}})
    },
    payOrder(){
      if (this.active++>3) this.active=0;
      // 放在触发confirm的时间下
      let params = {
        orderId: this.orderId,
        cookie: this.cookie,
        amount: 100*this.goods_detail.price*this.formLabelAlign.product_quantity/100,
        password:this.formLabelAlign.password,
      }
      this.$axios.post('/api/order/payment/',
          qs.stringify(params)
      ).then(res => {
        const ans = JSON.parse(res.data)
        if (ans.validation){
        this.formLabelAlign.payment_status = true;
        this.$message.success(ans.mes);
        this.$router.push({path: '/profile', query: {cookie: this.cookie}})
      }else {
        this.$alert(ans.mes, 'Hint', {
          confirmButtonText: 'OK',
        });
        this.active = 2;
      }
    })
      //添加修改支付状态/账户扣费
      //<!--需要判定密码是否相等-->
    },
    handleChange(value) {
      console.log(value);
    }
  },
  mounted() {
    this.active = 0
    if (this.$route.query.cookie !== undefined) {
      this.cookie = this.$route.query.cookie
      this.goods_detail.id = this.$route.query.goodsId
      let params = {
        cookie: this.cookie,
        goodsId: this.goods_detail.id,
        status: "initial",
        quantity: this.formLabelAlign.product_quantity,
        phoneNumber: this.formLabelAlign.phone_number,
        receiver: this.formLabelAlign.receiver,
        address: this.formLabelAlign.address,
        remark: this.formLabelAlign.remark,
      }
      this.$axios.post('/api/order/createOrder/',
          qs.stringify(params)
      ).then(res => {
        console.log(res.data)
        const ans = JSON.parse(res.data)
        if (ans.validation === true) {
          //{'orderId': 5, 'goodsName': 'ipad', 'goodsQuantity': 3, 'goodsPrice': 6666.6,
          // 'custome': 'user1', 'validation': True}
          this.goods_detail.price = ans.goodsPrice
          this.goods_detail.stock = ans.goodsQuantity
          this.goods_detail.name = ans.goodsName
          this.formLabelAlign.user_name = ans.customer
          this.formLabelAlign.address = ans.address
          this.formLabelAlign.phone_number = ans.phoneNumber
          this.$message.success("Get information successfully")
        } else {
          this.$message.error("Get information error")
        }
      })
      .catch(()=>{
        this.$message.error("No response")
          }

      )
    }
  }

}
</script>

<style scoped>

</style>