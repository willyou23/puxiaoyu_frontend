<template>
  <div class="pay-success">
    <div class="main">
    <div v-if="num === '1'">
      <div class="success-icon-tips">
        <el-row>
          <el-col :span="12" :offset="11">
            <div class="grid-content bg-purple"></div>
            <i class="el-icon-success"></i>
          </el-col>
        </el-row>
      </div>

      <div class="title">
        <div class="success-tips">
          <el-row>
            <el-col >
              <div class="grid-content bg-purple"></div>

              <p class="info">
                <i class="el-icon-loading" style="margin-left: 180px"></i>
                <b style="margin-left: 20px">Pay Success, Page will Turn to Profile Page after ：</b>
                <span><span>{{ count }}</span></span></p>
            </el-col>
          </el-row>

        </div>
      </div>
      <el-row :gutter="20" justify="center">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple"></div>
          <el-card class="box-card" shadow="always">
            <div class="order-info">
            <p class="info"><b>Trade No：</b><span>{{ result.trade_no }}</span></p>
            <p class="info"><b>Trade No：</b><span>{{ result.out_trade_no }}</span></p>
            <p class="info"><b>Pay Time：</b><span><span>{{ result.timestamp }}</span></span></p>
            <p class="info"><b>Total Amount：</b><span><span>{{ result.total_amount }}</span></span></p>
            <p class="info"><b>OrderStatus：</b><span><span>{{ orderstatus }}</span></span></p>

            </div>
          </el-card>
        </el-col>
      </el-row>
      </div>
    <div v-if="num === '2'">
      <div class="icon-error-tips">
        <el-row>
          <el-col :span="12" :offset="11">
            <div class="grid-content bg-purple"></div>
            <i class="el-icon-error"></i>
          </el-col>
        </el-row>
      </div>

      <div class="title">
        <div class="error-tips">
          <el-row>
            <el-col>
              <div class="grid-content bg-purple"></div>
              <p class="info">
                <i class="el-icon-loading" style="margin-left: 210px"></i>
                <b style="margin-left: 35px" >Pay Fail, Page will Turn to Profile Page after : </b>
                <span><span>{{ count }}</span></span>
              </p>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-row :gutter="20" justify="center">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple"></div>
           <el-card class="box-card" shadow="always">
            <div class="order-info" >

              <p class="info"><b>Out_Trade_No:</b><span><span>{{ out_trade_no }}</span></span></p>
              <p class="info"><b>OrderStatus：Failed</b></p>


            </div>
           </el-card>

        </el-col>
      </el-row>


      </div>
    </div>




  </div>

</template>

<script>

export default {
  name: "Success",
  data() {
    return {
      result: {},
      orderstatus: "",
      num: "",
      cookie: "",
      intervalId: null,
      count: "",
      out_trade_no:""
    };
  },

  created() {

    this.returnprofile()
    this.$axios('/api/alipay/page2/' + decodeURI(location.search)
    ).then(response => {
      // console.log(this.num)

      // console.log(response.data);
      if (response.data.num == '1') {
        // this.$message.success(response.data.errmesage)
        // this.$message.success({message: response.data.errmesage, duration: 0})

        this.result = response.data.result
        this.num = response.data.num
        console.log(this.num)
        this.orderstatus = response.data.orderstatus
        this.cookie = response.data.cookie
      } else {
        this.num = response.data.num
        console.log(this.num)
        // console.log(this.cood)
        this.$message.error(response.data.errmesage)
        this.out_trade_no=response.out_trade_no
        this.cookie = response.data.cookie
      }
    }).catch(() => {

      console.log('支付结果同步失败');
    })
  },
  methods: {
    returnprofile() {
    const timejump = 5;
    if (!this.timer) {
      this.count = timejump;
      this.show = false;
      this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= timejump) {
          this.count--;
        } else {
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
          //跳转的页面写在此处
          this.$router.push({path: '/profile', query: {cookie: this.cookie}});
        }
      }, 1000)
    }

    }

  }
}
</script>

<style scoped>


.main {
  padding: 60px 0;
  margin: 0 auto;
  width: 1200px;
  background: #fff;
}

.main .title {
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding: 25px 40px;
  border-bottom: 1px solid #f2f2f2;
}

.main .title .success-tips {
  box-sizing: border-box;
}

.title img {
  vertical-align: middle;
  width: 60px;
  height: 60px;
  margin-right: 40px;
}

.title .success-tips {
  box-sizing: border-box;
  font-size: 26px;
  color: #ff3e3e;
}

.title .tips {
  font-size: 26px;
  color: #000;
}

.info span {
  color: #ec6730;
}

.order-info {
  padding: 25px 48px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f2f2f2;
}

.order-info p {
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 10px;
  font-size: 20px;
}

.order-info p b {
  font-weight: 400;
  color: #9d9d9d;
  white-space: nowrap;
}

.study {
  padding: 25px 40px;
}

.study span {
  display: block;
  width: 140px;
  height: 42px;
  text-align: center;
  line-height: 42px;
  cursor: pointer;
  background: #ffc210;
  border-radius: 6px;
  font-size: 16px;
  color: #fff;
}

.success-icon-tips {
  color: #008066;
  weight: 60px;
  height: 80px;
  font-size: 90px;
}
.icon-error-tips{
   color: #ff3e3e;
  margin-top: 15px;
  height: 80px;
  font-size: 90px;
}
.error-tips {
  box-sizing: border-box;
  font-size: 26px;
  color: #ff3e3e;
}



</style>
