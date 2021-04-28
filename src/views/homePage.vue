<template>
    <div id="hand">
    <el-header>
            <div style="text-align: right;margin-right: 0">
                <el-dropdown style="float: left">
                    <el-page-header
                            @back="goHome" style="margin-top: 20px" content="PUXIAOYU" title="Back"></el-page-header>
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
   <div class="img">
      <template>
        <el-carousel :interval="4000" type="card" height="450px">
          <el-carousel-item v-for="item in 6" :key="item">
            <p style="text-align: center;margin-top: 50px"><el-image style="width: 500px; height: 350px"
                      :src="url[item]"
                      fit="contain"
            ></el-image></p >
          </el-carousel-item>
        </el-carousel>
      </template>

    </div>

    <div class="tab">
      <Classification class="tab-control" :titles="['全部','服饰','化妆品','电子产品','日用品','']"/>
      <div class="search">
        <input type="text" placeholder="请输入...">
        <button>搜索</button>
      </div>
    </div>

    <div class="goods">
<!--      <li class="card-line" v-for="i in 13">-->
        <el-button class="card" @click="details(goods)" v-for="(goods, i) in this.goods">
          <div v-if="goods['img']==='None'">
            <img :src="require('@/assets/logo.png')"
               class="image">
          </div>
          <div v-else>
            <img :src="require('@/assets/'+goods['img'])"
                 class="image">
          </div>
          <div style="padding: 10px;">
            <span>{{goods['name']}}</span>
            <div class="bottom clearfix">
              <span>{{goods['price']}}</span>
<!--              <span>{{i}}</span>-->
            </div>
          </div>
        </el-button>
<!--      </li>-->
    </div>
    <!--
         <el-col :span="6" v-for="item in 18" :key="o" >
           <el-card :body-style="{ padding: '5px' }">
             <el-button @click="details">
               <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
               <div style="padding: 10px;">
                 <span>好吃的汉堡</span>
                 <div class="bottom clearfix">
                   <span>￥17.88</span>
                 </div>
               </div>
             </el-button>
           </el-card>
         </el-col>
     -->


  </div>

</template>

<script>
import Classification from "@/components/Classification";
import qs from "qs";

//传输图片的import
// import * as Json from "@vue/component-compiler-utils";


export default {
  name: "homePage",
  components: {
    Classification
  },
  data: function () {
    return {
      url: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'],
      username: "",
      cookie: "",
      goods: []
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
    details(goods){
      //将goodsId传给下一页
      this.$router.push({path: '/goodsDetail', query: {goodsId: goods['id'], cookie: this.cookie}})
    },
  },
  mounted() {
    if (this.$route.query.cookie !== undefined) {
      // console.log(123)
      console.log(this.$route.query.cookie)
      this.cookie = this.$route.query.cookie
      let params = {
        cookie: this.$route.query.cookie
      }
      this.$axios.post('/api/getInfo1/',
          qs.stringify(params)
      ).then(res => {
        // console.log(res.data)
        const ans = JSON.parse(res.data)
        if (ans.validation === true) {
          // this.$message.success("success")
          this.username = ans.username
        } else {
          this.$message.error("get user information error")
        }
      })
    }
  //  add here
    let formdata=new FormData()
    this.$axios({
                method: 'post',
                data: formdata,
                headers:{'Content-Type':'multipart/form-data'},
                url: '/api/getName_Price_Img/',
                // url: this.baseURL + '/material/MaterialInfo/filesUpload',
    }).then((res)=> {
                console.log('res',res);
                const data=JSON.parse(res.data);
                // console.log(data)
                // const data=res.data
                this.goods=data.goodsinfo

    })
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
/*
  #hand{
    width: 1250px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }
*/
.img{
  margin-top: 40px;
}
/*分类*/
#hand .tab{
  position: sticky;
  top: 0px;

  height: 50px;
  width: 100%;
  background: white;
  margin-top: 30px;
}

#hand .tab-control{
  /*分类的总宽度*/
  width: 800px;
  float: left;
}


/*搜索*/
.search{
  float: left;
  width: 450px;
  height: 40px;
  display: flex;
  margin-top: 5px;
}
.search input{
  float: left;
  flex: 4;
  height: 40px;
  outline: none;
  border: 2px solid red;
  box-sizing: border-box;
  padding-left: 10px;

  font-size: 16px;
}
.search button{
  float: right;
  flex: 1;
  height: 40px;
  background-color: red;
  color: white;
  border-style: none;
}
.search button{
  font-size: 18px;
}
.search button:hover{
  font-size: 20px;
}

/*卡片*/
#hand .goods{

}
#hand .card-line{
  display: flex;
}
#hand .card{
  margin-right: auto;
  margin-left: auto;
  margin-top: 35px;
  margin-bottom: 30px;
}

#hand .bottom {
  margin-top: 13px;
  line-height: 12px;
}

#hand .image {
  width: 235px;
  height: 236px;
  display: block;
}

#hand .clearfix span{
  color: #c40000;
  font-size: 16px;
}

/*导航*/
.el-header{
  background: #1174d5;
}









/*.el-carousel__item h3 {*/
/*  color: #475669;*/
/*  font-size: 14px;*/
/*  opacity: 0.75;*/
/*  line-height: 200px;*/
/*  margin: 0;*/
/*}*/

/*.el-carousel__item:nth-child(2n) {*/
/*  background-color: #99a9bf;*/
/*}*/

/*.el-carousel__item:nth-child(2n+1) {*/
/*  background-color: #d3dce6;*/
/*}*/

/*#hand {*/
/*  width: 1250px;*/
/*  margin-top: 20px;*/
/*  margin-left: auto;*/
/*  margin-right: auto;*/
/*}*/

/*!*分类*!*/
/*#hand .tab {*/
/*  position: sticky;*/
/*  top: 0px;*/

/*  height: 50px;*/
/*  width: 100%;*/
/*  background: white;*/
/*  margin-top: 30px;*/
/*}*/

/*#hand .tab-control {*/
/*  !*分类的总宽度*!*/
/*  width: 800px;*/
/*  float: left;*/
/*}*/


/*!*搜索*!*/
/*.search {*/
/*  float: left;*/
/*  width: 450px;*/
/*  height: 40px;*/
/*  display: flex;*/
/*  margin-top: 5px;*/
/*}*/

/*.search input {*/
/*  float: left;*/
/*  flex: 4;*/
/*  height: 40px;*/
/*  outline: none;*/
/*  border: 2px solid red;*/
/*  box-sizing: border-box;*/
/*  padding-left: 10px;*/

/*  font-size: 16px;*/
/*}*/

/*.search button {*/
/*  float: right;*/
/*  flex: 1;*/
/*  height: 40px;*/
/*  background-color: red;*/
/*  color: white;*/
/*  border-style: none;*/
/*}*/

/*.search button {*/
/*  font-size: 18px;*/
/*}*/

/*.search button:hover {*/
/*  font-size: 20px;*/
/*}*/

/*!*卡片*!*/
/*#hand .goods {*/

/*}*/

/*#hand .card-line {*/
/*  display: flex;*/
/*}*/

/*#hand .card {*/
/*  margin-right: auto;*/
/*  margin-left: auto;*/
/*  margin-top: 35px;*/
/*  margin-bottom: 30px;*/
/*}*/

/*#hand .bottom {*/
/*  margin-top: 13px;*/
/*  line-height: 12px;*/
/*}*/

/*#hand .image {*/
/*  width: 100%;*/
/*  display: block;*/
/*}*/

/*#hand .clearfix span {*/
/*  color: #c40000;*/
/*}*/


</style>