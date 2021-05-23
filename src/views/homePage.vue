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
            <!--            赵文轩的前端作业-->
            <el-dropdown-item>
              <el-button v-show="cookie===''" size="medium" style="width: 120px" @click="login">Login</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button v-show="cookie!==''" size="medium" style="width: 120px" @click="logout">Logout</el-button>
            </el-dropdown-item>

<!--            到这里结束   -->
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
          <el-carousel-item v-for="item in url" :key="item">
            <el-image style="width: 600px; height: 400px;margin-left: -150px;margin-top:-40px;transform: translate(37%,15%);"
                      :src="require('@/assets/imgHomepage/'+item)"
                      fit="fit"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>







    <div class="tab">
      <div class="class">
        <div v-for="(item,index) in ['All','Costume','Cosmetics','Electronics','Others']"
             class="class-item"
             :class="{active: index === currentIndex}"
             @click="itemClick(index,item)">
          <span>{{item}}</span>
        </div>
      </div>

      <div class="search">
        <input type="text" placeholder="please input..." v-model="searchName">
        <Button type="primary" @click="submit">search</Button>
      </div>
    </div>


    <div class="nogoods"
       v-show="this.b === 0">
    抱歉！没有找到与"{{this.searchName}}"相关的宝贝。
  </div>


    <div class="goods">
      <el-button class="card" @click="details(goods)" v-for="(goods, i) in this.goods" :key="i">
        <div v-if="goods['img']==='None'">
          <img :src="require('@/assets/logo.png')"
               class="image">
        </div>
        <div v-else>
          <img :src="require('@/assets/'+goods['img'])"
               class="image">
        </div>
        <div style="padding: 10px;">
          <span style="word-break: break-all;white-space: normal">{{goods['name']}}</span>
          <div class="bottom clearfix">
            <span>{{goods['price']}}</span>
          </div>
        </div>
      </el-button>
    </div>


  </div>

</template>

<script>
import Classification from "@/components/Classification";
import qs from "qs";
export default {
  name: "homePage",
  components: {
    Classification
  },
  props:{
    titles:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data: function () {
    return {
      searchName: "",
      url: [
          "012a875daf283ca801209e1fc16f86.jpg@1280w_1l_2o_100sh.jpg",
        "TB1wOidVWL7gK0jSZFBXXXZZpXa-520-280.jpg",
        "TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg"
      ],
      username: "",
      cookie: "",
      goods: [],
      currentIndex: 0,
      b:"hhh"

    }
  },
  methods: {

    submit(){
      console.log(this.searchName)
      let params = {
        name: this.searchName,
      }
      this.$axios.post('/api/search/',
          qs.stringify(params)
      ).then(res => {
        console.log('res',res);
        const data=JSON.parse(res.data);
        // document.getElementById("nogoods").style.display= "none";

        this.b=data.goodsinfo.length

        if(data.goodsinfo.length === 0){
          // document.getElementById("nogoods").style.display = "block";
          // alert("not found")
          this.goods= []
        }else{
          // document.getElementById("nogoods").style.display = "none";
          this.goods=data.goodsinfo
        }
      })
    },
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
    itemClick(index, item) {
      this.currentIndex=index;
      // console.log(item);
      if(item==='All'){
        console.log(item);
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
      }else{
        console.log(item)
        let formdata=new FormData()
        formdata.append('category', item)
        this.$axios({
          method: 'post',
          data: formdata,
          headers:{'Content-Type':'multipart/form-data'},
          url: '/api/getSortGoods/',
          // url: this.baseURL + '/material/MaterialInfo/filesUpload',
        }).then((res)=> {
          console.log('res',res);
          const data=JSON.parse(res.data);
          // console.log(data)
          // const data=res.data
          this.goods=data.goodsinfo
        })
      }
    },
    details(goods){
      //将goodsId传给下一页
      this.$router.push({path: '/goodsDetail', query: {goodsId: goods['id'], cookie: this.cookie}})
    }
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
    //     .catch((error) =>{
    //           // console.log("failed") ;
    //           alert("upload failed");
    // })
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
  #hand .class{
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
    width: 280px;
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
  .nogoods{
  margin: 50px auto 500px auto;
  text-align: center;
  font-size: 20px;
  line-height: 100px;
  border: 2px solid #ffb360;
  width: 80%;
  height: 150px;
  background: #f8d6a2;
  }

</style>