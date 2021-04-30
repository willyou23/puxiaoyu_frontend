<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" center width="700px" :show-close="false">
      <!--充值-->
      <div slot="title" class="icon-title-color">
        <div class="title-text">Accounnts Deposit</div>
        <div class="icon-close" @click="dialogVisible=false"></div>
      </div>
      <el-form>
        <!--账户-->
        <div class="column">
          <div>Amount:</div>
          <div class="content">{{ amount }}</div>
        </div>

    <!--金额选项-->
  <div class="plansColumn">
    <div>Plans</div>
    <el-radio-group class="radio-group">
      <div :ref="'radio'+index" class="radio-button" @mouseout="outSetcolor($event,index,radiochoice)"
           @mousemove="touchSetcolor($event,index,radiochoice)"
           v-for="(item,index) in amountList" :key="item.value"
           @click="radioitem(item.value,index,radiochoice,amountList,'radio')">
        <div v-if="item.value!=0" class="text">{{ item.name }}</div>
        <div v-else style="position: relative;width: 100px">
          <div class="prize_bar">￥</div>
          <input ref="input" v-model="money" v-on:input="check"></input>
        </div>
      </div>
      <!--<el-radio-button class="radio-button" v-for="item in amountList" :key="item.value"
                       :label="item.name" @change="removeTouch"></el-radio-button>-->
    </el-radio-group>

  </div>
        
  <!--余额-->
  <div class="payment_amount">
    <div>Payment Amount:</div>
    <div style="width:80px">￥{{ paymentMoney }}</div>
    <el-button style="margin-left: 100px;margin-bottom: 8px" type="primary"
               @click="complete">Confirm Payment
    </el-button>
  </div>
  </el-form>
  </el-dialog>
  </div>
</template>

<script>

import qs from "qs";

export default {
  name: "prepaid",
  props: {
    title: {
      type: String,
      default: ""
    },
    amount: {
      type: Number,
      default: 0
    },
    cookie: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      amount: "",
      // surplus: "",
      money: "",
      dialogVisible: false,
      radio: "",
      radiochoice: -1,

      amountList: [
        {
          name: "￥ 50",
          value: 50
        },
        {
          name: "￥ 100",
          value: 100
        },
        {
          name: "￥ 200",
          value: 200
        },
        {
          name: "￥ 300",
          value: 300
        },
        {
          name: "￥ 1000",
          value: 1000
        },
        {
          name: "￥ 0",
          value: 0
        },

      ],
      paymentradio: "",

    }
  },
  computed: {
    paymentMoney: function () {
      var radio = 0;
      if (this.amountList[this.radiochoice] == undefined || this.amountList[this.radiochoice].name.split("￥ ")[1] == undefined) {
        radio = 0
      } else {
        radio = Number(this.amountList[this.radiochoice].name.split("￥ ")[1])
      }
      var sum = Number(this.money) + radio
      return sum;
    }
  },

  methods: {
    check() {
      this.money = this.money.replace(/[^\d]/g, '');
    },
    //打开弹框
    open() {
      this.dialogVisible = true;
    },
    radioitem(item, index, value, list, tag) {
      for (var curitem in list) {
        if (curitem == index) {
          if (value == index) {
            if (tag == 'radio') {
              this.radiochoice = -1
            } else {
              this.paymentchoice = -1
            }
            //value=-1;
            this.$refs[tag + curitem][0].style.backgroundColor = "#fff";
            this.$refs[tag + curitem][0].style.color = "#606266"
            if (this.amountList[value].value == 0) {
              this.money = "";
              this.$refs['input'][0].style.color = "#606266"
              this.$refs['input'][0].style.backgroundColor = "#fff"
            }

          } else {
            if (tag == 'radio') {
              this.radiochoice = index
            } else {
              this.paymentchoice = index
            }
            //value = index;
            this.$refs[tag + index][0].style.backgroundColor = "#409eff";
            this.$refs[tag + index][0].style.color = "#fff"
            if (this.amountList[index].value == 0) {
              this.$refs['input'][0].style.color = "#fff"
              this.$refs['input'][0].style.backgroundColor = "#409eff"
              this.$refs['input'][0].focus();
            }
          }
        } else {
          this.$refs[tag + curitem][0].style.backgroundColor = "#fff";
          this.$refs[tag + curitem][0].style.color = "#606266"
          if (this.amountList[curitem].value == 0) {
            this.money = "";
            this.$refs['input'][0].style.color = "#606266"
            this.$refs['input'][0].style.backgroundColor = "#fff"

          }
        }
      }
    },
    touchSetcolor(e, index, value) {
      let style = e.currentTarget.style;
      if (value == index) {
        style.color = "#fff"
        if (this.amountList[value].value == 0) {
          this.$refs['input'][0].style.color = "#fff"
          this.$refs['input'][0].style.backgroundColor = "#409eff"
        }
      } else {
        if (this.amountList[index].value == 0) {
          this.$refs['input'][0].style.color = "#409eff"
          this.$refs['input'][0].style.backgroundColor = "#fff"
        }
        style.color = "#409eff"
      }
    },
    outSetcolor(e, index, value) {
      let style = e.currentTarget.style;
      if (value == index) {
        style.color = "#fff"
        if (this.amountList[value].value == 0) {
          this.$refs['input'][0].style.color = "#fff"
          this.$refs['input'][0].style.backgroundColor = "#409eff"
        }
      } else {
        if (this.amountList[index].value == 0) {
          this.$refs['input'][0].style.color = "#606266"
          this.$refs['input'][0].style.backgroundColor = "#fff"
        }
        style.color = "#606266"
      }
    },

    complete() {
      if (this.paymentMoney == 0) {
        this.$message.error("No amount selected")
      } else {
        this.$message.success("please waiting")
        this.dialogVisible = false
        let data = {
          paymentMoney: this.paymentMoney,
          cookie: this.cookie,
          amount: this.amount
        }
        // console.log(this.paymentMoney)
        // console.log(this.cookie)
        this.$axios.post('/api/alipay/page/', qs.stringify(data))
            .then(res => {
              // console.log(ans)
              if (res.data.message == 3) {
                window.open(res.data.pay_url)
                // this.amount = res.data.balance
                this.$message.success({message: 'Please Refresh the Interface', duration: 0})
              } else {
                this.$message.error(res.data.errmsg)
              }
            }).catch((err) => {
          this.$message({
            message: "Payment Failed,Please recharge",
            center: true,
            type: "warning",
          });

        })

      }


    }
  }
}



</script>

<style scoped>
    /deep/ .el-dialog__header {
        padding: 0;
    }

    /deep/ .el-dialog--center .el-dialog__body {
        padding-bottom: 0;
    }

    .column {
        display: flex;
        align-items: center;
        font-size: 16px;
        height: 35px;
        position: relative;
        border-bottom: 1px solid #e0e0e0;
    }

    .content {
        margin-left: 20px;
    }

    .surplus {
        margin-left: 100px;
    }

    .surplusContent {
        margin-left: 5px;
    }

    .icon-title-color {
        color: white;
        height: 35px;
        font-size: 16px;
        background-color: #3d533c;
        position: relative;
    }

    .icon-title-color .title-text {
        line-height: 35px;
    }

    .icon-title-color .icon-close {
        font-size: 16px;
        right: 20px;

        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }



    .plansColumn {
        height: 150px;
        position: relative;
        display: flex;
        align-items: center;
        font-size: 16px;
    }

    /deep/ .el-radio-button:first-child .el-radio-button__inner {
        border-left: 1px solid #DCDFE6;
        border-radius: 5px;
        box-shadow: none !important;
    }

    /deep/ .el-radio-button__inner {
        font-size: 16px;
        width: 100px;
        box-sizing: border-box;
        border: 1px solid #DCDFE6;
        border-radius: 5px;
    }

    .radio-group {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        width: 500px;
    }


    .radio-button {
        margin: 0px 30px 15px 30px;
        width: 100px;
        font-size: 16px;
        height: 42px;
        text-align: center;
        line-height: 42px;
        border: 1px solid #DCDFE6;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .radio-button :hover {
        cursor: pointer;

    }

    .prize_bar {

        width: 34px;
        height: 25px;
        text-align: right;
        line-height: 44px;
        font-size: 16px;
        display: inline-block;
    }
     input {
         background-color: white;
         display: inline-block;
        width:44px;
         left: 44px;
        border: 0;
        height: 30px;
         margin-left: 10px;
        font-size: 16px;
         line-height: 44px;
        text-align: left;
    }

    .payment {
        border-top: 5px solid #23a88e;
        border-bottom: 5px solid #23a88e;
        height: 85px;
        display: flex;
        align-items: center;
        font-size: 16px;
    }

    .payment .radio-group {
        width: 500px;
        margin-left: 21px;

    }

    .payment .radio-group .radiobox {
        margin: 10px;
        width: 140px;
        height: 45px;
        line-height: 45px;
        font-size: 16px;

        border: 1px solid #DCDFE6;
        background-color: white;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .payment .radio-group .radiobox :hover {
        cursor: pointer;

    }

    .payment .radio-group .radiobox i {
        font-size: 20px;
        margin-right: 10px;
    }

    .payment_amount {
        display: flex;
        align-items: center;
        font-size: 16px;

        height: 80px;
        padding-left: 180px;
    }

    /deep/ .el-dialog__body {
        padding-bottom: 0;
    }
</style>
