<template>
  <div class="body">
    <el-header>
            <div style="text-align: right;margin-right: 0">
                <el-dropdown style="float: left">
                    <el-page-header
                            @back="goHome" style="margin-top: 20px" content="Personal Center" title="Back"></el-page-header>
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
    <div class="block">
      <el-carousel height="450px">
        <el-carousel-item v-for="item in imgList" :key="item">
          <el-image style="width: 650px; height: 350px;display: inline-flex; margin-left: 60px"
                    :src="require('@/assets/'+item)"
                    fit="contain"
          ></el-image><!--:fit="contain"-->
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="center_con">

      <div class="goods_detail_list fr">
        <h3>{{ name }}
          <span class="desc"> 类别:{{ category }}</span>
          <span class="kucun">库存：{{ inventory }}</span>
          <span class="kucun">卖家：{{ seller }}</span>
          <!--          <span class="kucun">描述：{{ desc }}</span>-->
          <!--          <span class="kucun">库存：{{ inventory }}</span>-->
        </h3>

        <p>{{ desc }}</p>
        <div class="prize_bar">
          ￥<em>{{ price }}</em>
          <!--            <span class="oldprice"><em>28.8</em></span>-->
        </div>
        <div class="operate_btn">
          <a class="buy_btn" @click="buy">立即购买</a>
          <span v-if="isSeller">
          <i class="el-icon-edit-outline" style="margin-left: 450px;margin-top: 10px; font-size: 25px"  @click="showProductInfo"></i>
          <i class="el-icon-delete" @click="open" v-if="isShow" style="float: right;margin-top: 10px; font-size: 25px" ></i>
          </span>
        </div>

        </div>
      <el-dialog
              title="Edit product information"
              :visible.sync="productDialogVisible"
              width="50%">
        <div>
          <el-form ref="form" :model="form" label-width="110px">
            <el-form-item  label="Product Name">
              <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                        type="text" v-model="form.productName">

              </el-input>
            </el-form-item>
            <el-form-item label="Introduction">
              <el-input style="display: flex;justify-content: left; margin-top: 5px;margin-bottom: 5px;"
                        type="text" v-model="form.introduction">
              </el-input>
            </el-form-item>

            <el-form-item label="Category">
              <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                        type="text" v-model="form.category">
              </el-input>
            </el-form-item>

            <el-form-item label="Inventory">
              <el-input style="display: flex; justify-content: left; margin-top: 5px" type="text"
                        v-model="form.inventory">
              </el-input>
            </el-form-item>

            <el-form-item label="Price">
              <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px"
                        type="text" v-model="form.price">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button style="margin-right: 90px;margin-bottom: 8px" @click="cancelInfoEdit">Cancel</el-button>
            <el-button style="margin-right: 120px;margin-bottom: 8px" type="primary"
                       @click="confirmInfoEdit">Confirm</el-button>
        </span>
      </el-dialog>
      </div>
      </div>


</template>


<script>
  import qs from "qs";

  export default {
    name: "goodsDetails",
    data: function () {
      return {
        isSeller: false,
        productDialogVisible: false,
        url: [
          // 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          // 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          // 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          // 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          // 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          // 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          // 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          // 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        ],
        cookie: "",
        goodsId: "",
        seller: "",
        name: "",
        desc: "",
        price: null,
        inventory: null,
        category: null,
        imgList:[],
        cag: "",
        form: {
          productName: '',
          category:'',
          introduction: '',
          inventory: '',
          price: '',
        },
        isShow:true,
      }
    },
    methods: {
    goHome() {
        this.$router.push({path: '/', query: {cookie: this.cookie}})
    },
    login() {
        this.$router.replace('/Login')
    },
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
      buy(){
        if (this.cookie === ""){
          alert("please login firstly")
        }
        else{
          this.$router.push({path: '/trade', query: {cookie: this.cookie, goodsId: this.goodsId}})
        }
      },
      showProductInfo() {
        this.productDialogVisible = true;
      },
      cancelInfoEdit() {
        this.productDialogVisible = false;
      },
      confirmInfoEdit() {
        let params = {
          goodsId: this.goodsId,
          cookie: this.cookie,
          name: this.form.productName,
          category: this.form.category,
          desc: this.form.introduction,
          inventory: this.form.inventory,
          price: this.form.price,
        }
        this.$axios.post('/api/updateGoodsInfo/',
                qs.stringify(params)
        ).then(res => {
          const dataDict = JSON.parse(res.data)
          if(dataDict.validation){
            this.seller=dataDict.seller
            this.name = dataDict.name
            this.price = dataDict.price
            this.inventory = dataDict.inventory
            this.desc = dataDict.desc
            this.category = dataDict.category
            this.imgList=dataDict.imgList
            this.$message.success(dataDict.mes)
          } else {
            this.$message.error(dataDict.mes)

          }
        })
        this.productDialogVisible = false;
      },
      open() {
        this.$confirm('This action will delete this post, whether to continue?', 'tip', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'cancel',
          type: 'warning'
        }).then(() => {
          let params = {
            goodsId: this.goodsId,
            cookie: this.cookie,
            delete: true,
        }
        this.$axios.post('/api/deleteGoodsInfo/',
                qs.stringify(params)
        ).then(res => {
          const ans = JSON.parse(res.data)
          if(ans.validation){
            this.$message.success(ans.mes)
            this.$router.push({path: '/profile', query: {cookie: this.cookie}})
          } else {
            this.$message.error(ans.mes)
          }
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Be already canceled'
          });
        });
      }
    },

    mounted() {
      //内存中的模板已经挂载到页面中，页面渲染完成。
      this.url = []
      this.goodsId = this.$route.query.goodsId
      this.cookie = this.$route.query.cookie
      this.isSeller = this.$route.query.isSeller
      let params = {
        goodsId: this.$route.query.goodsId,
      }
      if (this.$route.query.title !== "") {
        this.$axios.post('/api/showGoodsInfo/',
                qs.stringify(params)
        ).then(res => {
          const dataDict = JSON.parse(res.data);
          console.log(dataDict)
          this.seller=dataDict.seller
          this.name = dataDict.name
          this.price = dataDict.price
          this.inventory = dataDict.inventory
          this.desc = dataDict.desc
          this.category = dataDict.category
          this.imgList=dataDict.imgList
          this.form.productName = this.name
          this.form.category = this.category
          this.form.introduction = this.desc
          this.form.inventory = this.inventory
          this.form.price = this.price
        })

      }
    }
  }
</script>

<style scoped>

  .body {
    margin-top: 10px;
  }

  .center_con {
    width: 1200px;
    height: 350px;
    margin: 0 auto;

  }

  .goods_detail_list {
    width: 730px;
    height: 350px;
    margin-left: auto;
    margin-right: auto;
  }

  .goods_detail_list h3 {
    font-size: 24px;
    line-height: 24px;
    color: #666;
    font-weight: normal;
  }

  .desc {
    font-size: 15px;
    color: #9e9e9e;
    border: 1px solid;
    border-radius: 6px;
  }

  .kucun {
    font-size: 15px;
    color: #9e9e9e;
    float: right;

  }

  .goods_detail_list p {
    color: #666;
    line-height: 40px;
  }

  .prize_bar {
    height: 72px;
    background-color: #fff5f5;
    line-height: 72px;

    font-size: 25px;
    color: #ff3e3e;
    padding-left: 20px;
  }

  .oldprice {
    font-size: 18px;
    color: #9e9e9e;
    padding-left: 16px;
    text-decoration: line-through;
  }

  .total em {
    font-style: normal;
    color: #ff3e3e;
    font-size: 18px
  }

  .operate_btn {
    height: 40px;
    margin-top: 35px;
    font-size: 0;
    position: relative;

  }

  .operate_btn .buy_btn, .operate_btn .add_cart {
    display: inline-block;
    width: 178px;
    height: 38px;
    border: 1px solid #c40000;
    font-size: 14px;
    color: #c40000;
    line-height: 38px;
    text-align: center;
    background-color: #ffeded;
  }

  .operate_btn .add_cart {
    background-color: #c40000;
    color: #fff;
    margin-left: 10px;
    position: relative;
    z-index: 10;
  }


  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .block {
    width: 760px;
    margin-left: auto;
    margin-right: auto;
  }


</style>