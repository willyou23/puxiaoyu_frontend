<template>
  <div>
    <!--    <el-input-->
    <!--    type="text"-->
    <!--    placeholder="title"-->
    <!--    v-model="title"-->
    <!--    maxlength="10"-->
    <!--    show-word-limit>-->
    <!--    </el-input>-->
    <!--      <el-input-->
    <!--    type="text"-->
    <!--    placeholder="description"-->
    <!--    v-model="description"-->
    <!--    maxlength="200"-->
    <!--    show-word-limit>-->
    <!--    </el-input>-->

    <!--      //商品选择-->
    <!--      <div>-->
    <!--        <el-select v-model="cate" placeholder="请选择" @change="changeProduct($event)">-->
    <!--          <el-option-->
    <!--              v-for="item in options"-->
    <!--              :key="item.value"-->
    <!--              :label="item.label"-->
    <!--              :value="item.value">-->
    <!--          </el-option>-->
    <!--        </el-select>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--&lt;!&ndash;  这是原来的代码，之后的都是我测试的代码<el-button type="danger" round @click="submitImg">release</el-button>&ndash;&gt;-->
    <!--        <el-button type="danger" round @click="submitImg">release</el-button>-->
    <!--      </div>-->
    <el-container>
      <el-header>
        <el-page-header @back="goBack()" content="Release Page"></el-page-header>
      </el-header>
      <div>
        <el-form :rules="rules" ref="releaseForm">
          <div>
            #开始照片上传
          <el-form-item>
            <div>
              <div class="img">
                <div class="upload">
                  <div class="upload_warp_left" @click="fileClick">
                    <Button icon="ios-cloud-upload-outline" class="btn btn-success">上传图片</Button>
                  </div>
                  <div class="upload_warp_text">
                    选中{{ imgList.length }}张文件，共{{ bytesToSize(this.size) }}
                  </div>
                  <div class="upload_warp" style="border: 1px solid white;">
                    <div class="upload_warp_img" v-show="imgList.length!=0">
                      <div class="upload_warp_img_div" v-for="(item,index) of imgList">
                        <div class="upload_warp_img_div_top">
                          <div class="upload_warp_img_div_text">
                            {{ item.file.name }}
                          </div>
                          <img src="/static/img/x.png" class="upload_warp_img_div_del" @click="fileDel(index)">
                        </div>
                        <img :src="item.file.src">
                      </div>
                    </div>
                  </div>
                  <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
                </div>
              </div>
            </div>
          </el-form-item>
          #结束照片上传
          </div>


          <div>
            <el-form-item prop="title">
              <el-input
                  type="text"
                  placeholder="title"
                  v-model="title"
                  maxlength="10"
                  show-word-limit
              >
              </el-input>
            </el-form-item>

            <el-form-item prop="desc">
              <el-input
                  id='desc'
                  type="textarea"
                  placeholder="please input good's description"
                  v-model="desc"
                  maxlength="200"
                  show-word-limit
              >
              </el-input>
            </el-form-item>
          </div>



          <table>
            <div>
              <th>
                <el-form-item prop="price">
                  <div style="white-space: nowrap; width: 40%">
                    <input class="price"
                           ref="content"
                           type="text" :disabled="disabled"
                           @input="handleAmountChange"
                           v-model.number.trim="totalval"
                           placeholder="please input price"
                    />
                  </div>
                </el-form-item>
              </th>
            </div>
            <div>
              <th>
                <el-form-item>
                  <div id="num" style="display: inline-block">
                    input inventory
                    <el-input-number
                        v-model="inventory"
                        :min="1" :max="10"
                        label="input inventory"
                    ></el-input-number>
                  </div>
                </el-form-item>
              </th>
            </div>
          </table>


          <div>
            <Button type="primary" @click="submit">提交</Button>
          </div>
        </el-form>
      </div>

    </el-container>


  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      imgList: [],
      backImgList: [],
      size: 0,


      //   options: [{
      //   value: 'opt1',
      //   label: 'costume'
      // }, {
      //   value: 'opt2',
      //   label: 'cosmetics'
      // }, {
      //   value: 'opt3',
      //   label: 'electronic products'
      // }, {
      //   value: 'opt4',
      //   label: 'commodity'
      // }],
      // cate: '',

      desc: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // price:'',
      inventory: 1,
      totalval: '',
      cookie: this.$route.query.cookie,

      rules: {
        title: [{required: true, message: 'please input title', trigger: 'blur'}],
        desc: [{required: true, message: 'please input description', trigger: 'blur'}],
        price: [{required: true, message: 'please input price', trigger: 'blur'}],
      },

    }
  },
  methods: {
    // changeProduct(event) {
    //      this.cate = event.target.value; //获取option对应的value值
    //      console.log("你选中了",this.cate)
    // },
    goBack() {
      this.$router.replace('/submit')
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
    // 查看图片
    lookImg() {
      this.$axios({
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'},
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
        url: 'http://192.168.25.41:8081/material/MaterialInfo/getFiles',
      })
          .then((res) => {
            console.log('res', res);
            this.backImgList = res.data.result;
          }).catch((error) => {
      })
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
  }

}
</script>

<style scoped>
.upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload_warp_img_div img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

.upload_warp_img_div {
  position: relative;
  height: 100px;
  width: 120px;
  border: 1px solid #ccc;
  margin: 0px 5px 5px 0px;
  float: left;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}

.upload_warp_img {
  border-top: 1px solid #D2D2D2;
  padding: 5px 0 0 5px;
  overflow: hidden
}

.upload_warp_text {
  text-align: left;
  margin-bottom: 5px;
  padding-top: 5px;
  text-indent: 14px;
  border-top: 1px solid #ccc;
  font-size: 14px;
}

.upload_warp_right {
  float: left;
  width: 57%;
  margin-left: 2%;
  height: 100%;
  border: 1px dashed #999;
  border-radius: 4px;
  line-height: 130px;
  color: #999;
}

.upload_warp_left button {
  margin: 1px 5px 0px 0px;
  cursor: pointer;
}

.upload_warp_left {
  float: left;
}

.upload_warp_left .btn-success {
  background: rgb(45, 140, 240);
  color: #fff;
}

.upload_warp {
  margin: 5px;
}

.upload {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background-color: #fff;
  width: 770px;
  box-shadow: 0px 1px 0px #ccc;
  border-radius: 4px;
}

.img {
  width: 770px;
  text-align: center;
}

/* 查看 */
.lookPng {
  margin-top: 20px;
  min-height: 30px;
  height: 100%;
}


div {
  width: 90%;
  margin: auto;
  padding: 2px;
}

#desc {
  height: 300px;
}

.price {
  height: 40px;
  margin: 10px 0;
}

p {
  color: darkslategrey;
  margin-top: 10px;

}

.select {
  width: 100%;
  margin: 10px 30px;
}

#num {
  padding: 0;
}

.bottom {
  width: 70%;

}

.el-container {
  background-color: #E9EEF3;
}

.el-header {
  background-color: #B3C0D1;
}

</style>


<!--<template>-->
<!--  <div>-->
<!--      <div class="el-container">-->
<!--              <el-upload-->
<!--                :auto-upload="true"-->
<!--                :before-upload="beforeAvatarUpload(file)"-->
<!--                :limit=5-->
<!--                :data="{goodsId: this.goodsId}"-->
<!--                accept=".png,.jpg,.jepg"-->
<!--                action="/api/goods/saveimage/"-->
<!--                list-type="picture-card"-->
<!--                ref="upload"-->
<!--                style="margin-bottom: 20px">-->
<!--                <i slot="default" class="el-icon-plus"></i>-->
<!--                <div slot="file" slot-scope="{file}">-->
<!--                  <img-->
<!--                    class="el-upload-list__item-thumbnail"-->
<!--                    :src="file.url" alt=""-->
<!--                  >-->
<!--                  <span class="el-upload-list__item-actions">-->
<!--                    <span-->
<!--                      class="el-upload-list__item-preview"-->
<!--                      @click="handlePictureCardPreview(file)"-->
<!--                    >-->
<!--                      <i class="el-icon-zoom-in"></i>-->
<!--                    </span>-->
<!--                    <span-->
<!--                      v-if="!disabled"-->
<!--                      class="el-upload-list__item-delete"-->
<!--                      @click="handleRemove(file)"-->
<!--                    >-->
<!--                      <i class="el-icon-delete"></i>-->
<!--                      </span>-->
<!--                  </span>-->
<!--                  </div>-->
<!--              </el-upload>-->
<!--          <el-dialog :visible.sync="dialogVisible">-->
<!--                <img width="100%" :src="dialogImageUrl" alt="">-->
<!--          </el-dialog>-->
<!--        </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  export default {-->
<!--      name: "ImgUpload",-->
<!--      props: {-->
<!--      goodsId: String-->
<!--      },-->
<!--        data(){-->
<!--          return{-->
<!--            dialogImageUrl: '',-->
<!--            dialogVisible: false,-->
<!--            disabled: false,-->
<!--            }-->
<!--          },-->
<!--        methods:{-->
<!--          print(goodsId){-->
<!--            console.log(goodsId)-->
<!--          },-->
<!--          beforeAvatarUpload(file) {-->

<!--            const isJPG = file.type === 'image/jpeg';-->
<!--            const isLt2M = file.size / 1024 / 1024 < 2;-->
<!--            // console.log(goodsId)-->
<!--            if (!isJPG) {-->
<!--              this.$message.error('上传头像图片只能是 JPG 格式!');-->
<!--            }-->
<!--            if (!isLt2M) {-->
<!--              this.$message.error('上传头像图片大小不能超过 2MB!');-->
<!--            }else{-->
<!--            }-->
<!--            return isJPG && isLt2M;-->
<!--          },-->
<!--          //清除图片缓存-->
<!--          handleRemove(file) {-->
<!--            console.log(file)-->
<!--            this.$refs.upload.clearFiles();-->
<!--          },-->
<!--          //展示图片预览图-->
<!--          handlePictureCardPreview(file) {-->
<!--            this.dialogImageUrl = file.url;-->
<!--            this.dialogVisible = true;-->
<!--          },-->
<!--    }-->
<!--  }-->
<!--</script>-->
<!--<style scoped>-->
<!--</style>-->

