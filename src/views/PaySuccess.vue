<template>
    <div class="pay-success">
        <div class="main">
            <div class="title">
                <div class="success-tips">
<!--                    <p class="tips">You have successfully deposit！</p>-->
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
                    <p class="tips" v-if="num === '1'">You have successfully Deposit！</p>
                    <p class="tips" v-else-if="num === '2'">Pay Fail, PLease try again</p>
                  </el-row>


                </div>
            </div>
<!--            <div class="order-info">-->
            <div class="order-info" v-if="num === '1'">
                <p class="info"><b>Trade No：</b><span>{{ result.trade_no }}</span></p>
                <p class="info"><b>Pay Time：</b><span><span>{{ result.timestamp }}</span></span></p>
                <p class="info"><b>Total Amount：</b><span><span>{{ result.total_amount }}</span></span></p>
                <p class="info"><b>OrderStatus：</b><span><span>{{ orderstatus }}</span></span></p>
                <p class="info"><b>Pay Success, Page will Turn to Profile Page after ：</b><span><span>{{ count }}</span></span></p>
            </div>
          <div class="order-info" v-else-if="num ==='2'">
                <p class="info"><b>Payment Failed, Page will Turn to Profile Page after: </b><span><span>{{ count }}</span></span></p>
                <p class="info"><b>OrderStatus：Failed</b></p>
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
      count: ""
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
        this.cookie=response.data.cookie
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
        font-size: 16px;
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
</style>
