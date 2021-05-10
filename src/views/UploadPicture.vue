<template>
  <div>
    <el-container>
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


      <div>
        <el-form>
          <div>
            <el-form-item style="background-color: white; width: 100%; border: 1px" class="jianju">
              <div>
                <div class="img">
                  <div class="upload">
                    <div class="upload_warp_text" style="height: 70px;width: 100%" @click="fileClick">
<!--                      <Button icon="ios-cloud-upload-outline" class="el-icon-plus" style="font-weight: bold">上传图片</Button>-->
                      <span>click to choose the picture</span>
                      <br>
                      <span>You pick {{ imgList.length }} images，{{ bytesToSize(this.size) }} in all</span>
                    </div>
<!--                    <div class="upload_warp_text">-->
<!--                      选中{{ imgList.length }}张文件，共{{ bytesToSize(this.size) }}-->
<!--                    </div>-->
                    <div class="upload_warp" style="border: 1px solid white;">
                      <div class="upload_warp_img" v-show="imgList.length!=0">
                        <div class="upload_warp_img_div" style="float: left;margin-left: 10px" v-for="(item,index) of imgList">
                          <div class="upload_warp_img_div_top">
                            <div class="upload_warp_img_div_text">
                              {{ item.file.name }}
                            </div>
                            <img :src="require('@/assets/x.jpg')" style="width:10px;height: 10px" class="upload_warp_img_div_del" @click="fileDel(index)">
                          </div>
                          <img style="width: 200px;height: 200px;display: inline" :src="item.file.src">
                        </div>
                      </div>
                    </div>
                    <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>


          <div>
            <el-form-item  class="jianju">
              <el-input
                  type="text"
                  placeholder="title"
                  v-model="title"
                  maxlength="50"
                  show-word-limit
              >
              </el-input>
            </el-form-item>

            <el-form-item class="jianju" >

              <textarea autocomplete="off" placeholder="Please input good's description"
                        maxlength="200" class="text" v-model="desc">

              </textarea>

            </el-form-item>
          </div>



          <table>
            <tr>
              <th>
                <div>
                  <el-form-item>
                    <div>
                      <input class="price"
                             ref="content"
                             type="text" :disabled="disabled"
                             @input="handleAmountChange"
                             v-model.number.trim="totalval"
                             placeholder="please input price"
                      />
                    </div>
                  </el-form-item>
                </div>
              </th>

              <th style="padding-left: 300px;width: 500px">
                <div>
                  <el-form-item>
                    <div id="num" style="display: inline-block">
                      <el-input-number
                          v-model="inventory"
                          :min="1" :max="10"
                          label="input inventory"
                      ></el-input-number>
                    </div>
                  </el-form-item>
                </div>
              </th>
            </tr>
          </table>


          <div style="margin: 20px 300px">
            <el-button style="width: 150px" type="danger" round @click="submit">release</el-button>
            <el-button style="margin-left: 300px; width: 150px" type="primary" round @click="profile">cancel</el-button>
          </div>
<!--          <div style="margin: 20px 300px">-->
<!--            <Button type="primary" style="width: 150px" @click="submit">提交</Button>-->
<!--            <Button style="margin-left: 300px; width: 150px" type="primary" @click="goMine">cancel</Button>-->
<!--          </div>-->
        </el-form>
      </div>

    </el-container>


  </div>
</template>

<script>
export default {
  name: "UploadPicture",
  data() {
    return {
      title: '',
      imgList: [],
      backImgList: [],
      size: 0,
      desc: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // price:'',
      inventory: 1,
      totalval: '',
      cookie: this.$route.query.cookie,
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
    // changeProduct(event) {
    //      this.cate = event.target.value; //获取option对应的value值
    //      console.log("你选中了",this.cate)
    // },
    goBack() {
      if(this.cookie === ""){
        this.$message.error("please login first")
      } else{
        this.$router.push({path: '/profile', query: {cookie: this.cookie}})
      }
    },
    handleAmountChange(e) {
      //过滤e字符
      e.target.value = e.target.value.replace("e", "");
      //判断输入是数字和.
      e.target.value = e.target.value.replace(/[^\d.]/g, "");
      this.totalval = e.target.value;
      // 必须保证第一个为数字而不是.
      this.totalval = this.totalval.replace(/^\./g, "0.");
      // 保证只有出现一个.而没有多个.
      this.totalval = this.totalval.replace(/\.{2,}/g, ".");
      // 保证.只出现一次，而不能出现两次以上
      e.target.value = e.target.value
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".");
      // 只能输入两个小数
      this.totalval = this.totalval.replace(/^()*(\d+)\.(\d\d).*$/, "$1$2.$3");
    },
    // 图片提交
    // mounted() {
    //   this.goodsId=this.$route.query.goodsId;
    //   console.log('this.goodsId=', this.goodsId)
    // },
    submit() {
      console.log('cate=', this.cate);
      console.log('this.$route.query.goodsId=', this.$route.query.goodsId)
      //传一个title过去
      let name = this.title;
      let price = this.totalval;
      let inventory = this.inventory;
      const goodsId = this.$route.query.goodsId;
      let show = 1;
      let cookie = this.cookie;
      // this.$axios({
      //
      // })
      let desc = this.desc;
      let files = this.imgList;
      console.log("name", name);
      console.log("price", price);
      console.log("inventory", inventory);
      console.log("goodsId", goodsId);
      console.log("desc", desc);
      console.log("files", files);
      let formData = new FormData();
      formData.append('goodsId', goodsId);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('inventory', inventory);
      formData.append('show', show);
      formData.append('cookie', cookie);
      formData.append('desc', desc);
      for (var key in files) {
        formData.append('files', files[key].file);
      }
      // formData.append('files',this.imgList[0].file);
      console.log(formData)
      this.$axios({
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
        url: '/api/uploadGoods/',
        // url: this.baseURL + '/material/MaterialInfo/filesUpload',
      })
          .then((res) => {
            console.log('res', res);
            alert(res.data.msg);
            this.$router.push({path: '/profile', query: {cookie: this.cookie}})
            // console(1+1);
          }).catch((error) => {
        // console.log("failed") ;
        alert("upload failed");
      })
    },
    //上传
    fileClick() {
      document.getElementById('upload_file').click()
    },
    fileChange(el) {
      if (!el.target.files[0].size) return;
      this.fileList(el.target.files);
      el.target.value = ''
    },
    fileList(files) {
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i]);
      }
    },
    fileAdd(file) {
      this.size = this.size + file.size;//总大小
      let reader = new FileReader();
      reader.vue = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        file.src = this.result;
        this.vue.imgList.push({
          file
        });
      }
    },
    fileDel(index) {
      this.size = this.size - this.imgList[index].file.size;//总大小
      this.imgList.splice(index, 1);
    },
    bytesToSize(bytes) {
      if (bytes === 0) return '0 B';
      let k = 1000, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    dragenter(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    dragover(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    drop(el) {
      el.stopPropagation();
      el.preventDefault();
      this.fileList(el.dataTransfer.files);
    }
  },

}
</script>

<style scoped>

div {
  margin: auto;
}

.price {
  height: 40px;
  margin: 10px 0;
  width: 200px;
}
p {
  color: darkslategrey;
  margin-top: 10px;
}
#num{
  width: 50%
}
.el-container {
  background-color: rgba(255, 224, 141, 1);
}
.el-header {
  background-color: #ff9700;
}
table{
  margin-left: 200px;
}
.jianju{
  margin-top: 20px;
}
.el-textarea__inner{
  min-height: 250px;
}
.text{

  min-height: 300px;
  width: 100%;
  font-size: 15px;
  border: #DCDFE6;




}

</style>

