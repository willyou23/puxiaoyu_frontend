<template>
  <div>
    <el-container style="height: 700px; border: 2px solid #eee">

      <el-aside width="500px" style="background-color: rgb(238, 241, 246)">
        <el-main>
          <el-card class="box-card" style="width: 400px;margin-left: 40px; background-color: lightblue">
            <div slot="header" class="clearfix" style="color: black">
              <span>User Information</span>
            </div>
            <div style="display: flex; justify-content: center">
              <img src="../assets/profile.png" height="100px" width="100px"/>
            </div>
            <div>
              User Name
              <el-tag style="display: flex; justify-content: left; margin-top: 10px; margin-bottom: 10px">{{'sharon'}}</el-tag>
            </div>
            <div>
              Phone Number
              <el-tag style="display: flex; justify-content: left; margin-top: 10px; margin-bottom: 10px">{{'15336055139'}}</el-tag>
            </div>
            <div>
              E-mail
              <el-tag style="display: flex; justify-content: left; margin-top: 10px; margin-bottom: 10px">{{'7863718266@qq.com'}}</el-tag>
            </div>
            <div>
              Address
              <el-tag style="display: flex; justify-content: left;margin-top: 10px; margin-bottom: 10px">{{'1234'}}</el-tag>
            </div>

            <div style="display: flex;justify-content: space-around; margin-top: 40px; margin-bottom: 10px ">
              <el-button type="primary" @click="showUpdateAccountView">Edit information</el-button>
              <el-button type="danger" @click="showUpdatePasswordView">Change Password</el-button>
            </div>
          </el-card>
        </el-main>
      </el-aside>

      <el-dialog
              title="Edit user information"
              :visible.sync="dialogVisible"
              width="50%">

        <div>
          <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="User Name">
            <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px" type="text" v-model="form.name" ></el-input>
          </el-form-item>
          <el-form-item label="Phone Number">
            <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px" type="text" v-model="form.phone"></el-input>
          </el-form-item>
            <el-form-item label="E-mail">
              <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px" type="text" v-model="form.email" ></el-input>
            </el-form-item>
            <el-form-item label="Address">
            <el-input style="display: flex; justify-content: left; margin-top: 5px" type="text" v-model="form.address" ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button  style="margin-left: 20px;margin-bottom: 8px" @click="dialogVisible = false">Cancel</el-button>
            <el-button  style="margin-left: 120px;margin-bottom: 8px" type="primary" @click="dialogVisible = false">Confirm</el-button>
        </span>
      </el-dialog>

      <el-dialog
              title="Change Password"
              :visible.sync="passwordDialogVisible"
              width="50%">
        <div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
               <el-form-item label="Old Password" prop="pass">
                  <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="New Password" prop="pass">
                  <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item label="New Password" prop="checkPass">
                  <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
               </el-form-item>
               <el-form-item>
                  <el-button style="margin-left: 40px;margin-top: 10px" type="primary" @click="submitForm('ruleForm')">Submit</el-button>
                  <el-button style="margin-left: 140px;margin-top: 10px" @click="resetForm('ruleForm')">Reset</el-button>
               </el-form-item>
          </el-form>
        </div>
      </el-dialog>


      <el-container>
        <el-header style="text-align: left; font-size: 20px; font-family: 幼圆; color: black">
          <span>已发布商品</span>
          <el-button style="margin-left: 750px" icon="el-icon-plus" circle></el-button>
        </el-header>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="productID" label="商品编号" width="200">
            </el-table-column>
            <el-table-column prop="category" label="类别" width="120">
            </el-table-column>
            <el-table-column prop="abstract" label="简介">
            </el-table-column>
            <el-table-column label="详情" width="120">
              <el-button icon="el-icon-document" circle @click="showProduct(1)"></el-button>
            </el-table-column>
          </el-table>
        </el-main>

        <el-header style="text-align: left; font-size: 20px; font-family: 幼圆; color: black">
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
  </div>

</template>

<script>
  export default {
    name: "Account",
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('Please enter the password'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };

        const item = {
          productID: '1',
          category: '王小虎',
          abstract: '上海市普陀区金沙江路 1518 弄',
        };

        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('Please enter the password again'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('The two passwords do not match!'));
          } else {
            callback();
          }
        };

        return {
          dialogVisible: false,
          passwordDialogVisible: false,
          tableData: Array(5).fill(item),

          form: {
            name: '',
            phone:'',
            email:'',
            address:'',
          },

          ruleForm: {
            pass: '',
            checkPass: '',
            oldPass: '',
        },

          rules: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            oldPass: [
              { validator: validatePass, trigger: 'blur' }
            ]
        }
      };


    },

    methods:{
      showUpdateAccountView() {
        this.dialogVisible = true;
      },
      showUpdatePasswordView() {
        this.passwordDialogVisible = true;
      },
      showProduct(productID) {
        this.$router.replace('/Details')
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              alert('submit!');


          } else {
              console.log('error submit!!');
              return false;
          }
        });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },

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