<template>
  <div>
    <el-container style="height: 700px; border: 2px solid #eee">

      <el-aside width="500px" style="background-color: rgb(238, 241, 246)">
        <el-main>
          <el-card class="box-card" style="width: 400px;margin-left: 40px; background-color: lightblue">
            <div slot="header" class="clearfix" style="color: black">
              <span>个人信息</span>
              <el-button style="float: right; padding: 3px 0;color: dodgerblue" type="text">登记信息</el-button>
            </div>
            <div style="display: flex; justify-content: center">
              <img src="../assets/profile.png" height="100px" width="100px"/>
            </div>
            <div style="display: flex;margin-top: 40px; color: black">
              {{'用户昵称： 浦小鱼'}}
            </div>
            <div style="display: flex;margin-top: 20px;color: black">
              {{'电话号码：15336055139 ' }}
            </div>
            <div style="display: flex;margin-top: 20px;color: black">
              {{'电子邮箱：7863718266@qq.com ' }}
            </div>
            <div style="display: flex;margin-top: 20px;color: black">
              {{'居住地址：上海市普陀区金沙江路 1518 弄 ' }}
            </div>
            <div style="display: flex;justify-content: space-around; margin-top: 40px ">
              <el-button type="primary">修改信息</el-button>
              <el-button type="danger">修改密码</el-button>
            </div>
          </el-card>
        </el-main>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 20px; font-family: 幼圆,serif; color: black">
          <span>已发布商品</span>
          <el-button style="margin-left: 750px" icon="el-icon-plus" circle></el-button>
        </el-header>
        <el-main>
          <el-table :data="tableData" >
            <el-table-column prop="productID" label="商品编号" width="200px">
            </el-table-column>
            <el-table-column prop="category" label="类别" width="120px">
            </el-table-column>
            <el-table-column prop="abstract" label="简介">
            </el-table-column>
            <el-table-column label="详情" width="120px">
              <el-button icon="el-icon-document" circle @click="showProduct(1)"></el-button>
            </el-table-column>
          </el-table>
        </el-main>

        <el-header style="text-align: left; font-size: 20px; font-family: 幼圆,serif; color: black">
          <span>已购买商品</span>
          <el-button style="margin-left: 750px" icon="el-icon-star-on" circle></el-button>
        </el-header>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="productID" label="商品编号" width="200" >
            </el-table-column>
            <el-table-column prop="category" label="类别" width="120">
            </el-table-column>
            <el-table-column prop="abstract" label="简介">
            </el-table-column>
            <el-table-column label="详情" width="120">
              <el-button icon="el-icon-document" circle></el-button>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <button @click="findInfo">getInfo</button>
  </div>
</template>

<script>
export default {
  name: "profile",
  data() {
    // const item = ;

    return {
      tableData: [{
        productID: '1',
        category: '王小虎',
        abstract: '上海市普陀区金沙江路 1518 弄',
      }, {
        productID: '1',
        category: '王小虎',
        abstract: '上海市普陀区金沙江路 1518 弄',
      }, {
        productID: '1',
        category: '王小虎',
        abstract: '上海市普陀区金沙江路 1518 弄',
      }, {
        productID: '1',
        category: '王小虎',
        abstract: '上海市普陀区金沙江路 1518 弄',
      }, {
        productID: '1',
        category: '王小虎',
        abstract: '上海市普陀区金沙江路 1518 弄',
      }, {
        productID: '1',
        category: '王小虎',
        abstract: '上海市普陀区金沙江路 1518 弄',
      }]
    }
  },
  methods:{
    showProduct(productID){
      this.$router.replace('/itemCard')
      // console.log(this.tableData)
    },
    findInfo(){
      console.log(this.tableData)
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color:lightblue ;
  color: aliceblue;
  line-height: 60px;
}

.el-aside {
  color: lightblue;
}


</style>