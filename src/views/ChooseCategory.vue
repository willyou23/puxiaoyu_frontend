<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack()" content="Species selection Page"></el-page-header>
    </el-header>
<!--  <div @click="submit" class="select">-->
    <el-radio-group v-model="category">
      <el-radio-button label="costume" ></el-radio-button>
      <el-radio-button label="cosmetics"></el-radio-button>
      <el-radio-button label="electronic products"></el-radio-button>
      <el-radio-button label="commodity"></el-radio-button>
    </el-radio-group>
<!--  </div>-->
    <el-button type="primary" @click="submit">submit</el-button>
  </el-container>
</template>

<script>
import qs from "qs";

export default {
  data(){
    return{
      sub:{
        cookie: this.$route.query.cookie
      },
      category: ''
    }
  },
  methods:{
    submit(){
      console.log("radio",this.category);
      console.log("cookie", this.sub.cookie);
      // console.log('goodsId', this.goodsId)
      let params = {
                      cookie: '97705652273874709788',
                      category: this.category,
                    }
      this.$axios.post('/api/intialGoodsInfo/',
                          qs.stringify(params)
                      ).then(res => {
                        console.log(res.data)
                        const ans = JSON.parse(res.data)
                        if(ans.validation === true){
                          this.$message.success("success")
                          this.$router.push({ path:'/UploadPicture', query:{"goodsId": ans.goodsId, "cookie": this.sub.cookie}})
                        } else {
                          this.$message.error("False")
                        }
                      })
    },
    goBack(){
      this.$router.replace('/')
    },
    next(){
      this.$router.replace('/Test')
    },


  }




}
</script>

<style scoped>
.select{
  margin-left: 400px;
}
</style>