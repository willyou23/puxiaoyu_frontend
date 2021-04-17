<template>
  <div>
      <div class="el-container">
              <el-upload
                :auto-upload="true"
                :before-upload="beforeAvatarUpload"
                :limit=5
                :data="{goodsId: this.goodsId}"
                accept=".png,.jpg,.jepg"
                action="/api/goods/saveimage/"
                list-type="picture-card"
                ref="upload"
                style="margin-bottom: 20px">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                      </span>
                  </span>
                  </div>
              </el-upload>
          <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </div>
  </div>
</template>

<script>
  export default {
      name: "ImgUpload",
      props: {
      goodsId: String
      },
        data(){
          return{
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            }
          },
        methods:{
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }else{
            }
            return isJPG && isLt2M;
          },
          //清除图片缓存
          handleRemove(file) {
            console.log(file)
            this.$refs.upload.clearFiles();
          },
          //展示图片预览图
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
    }
  }
</script>
<style scoped>
</style>
