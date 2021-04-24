<template>
  <div>
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
                <el-button size="medium" style="width: 120px" @click="account">Account</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>


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
              <el-tag style="display: flex; justify-content: left; margin-top: 10px; margin-bottom: 10px">{{this.userInfo.username}}</el-tag>
            </div>
            <div>
              Phone Number
              <el-tag style="display: flex; justify-content: left; margin-top: 10px; margin-bottom: 10px">{{this.userInfo.phoneNumber}}</el-tag>
            </div>
            <div>
              E-mail
              <el-tag style="display: flex; justify-content: left; margin-top: 10px; margin-bottom: 10px">{{this.userInfo.email}}</el-tag>
            </div>
            <div>
              Address
              <el-tag style="display: flex; justify-content: left;margin-top: 10px; margin-bottom: 10px">{{this.userInfo.address}}</el-tag>
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
            <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px" type="text" v-model="form.username" ></el-input>
          </el-form-item>
          <el-form-item label="Phone Number">
            <el-input style="display: flex; justify-content: left; margin-top: 5px;margin-bottom: 5px" type="text" v-model="form.phoneNumber"></el-input>
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
            <el-button  style="margin-left: 20px;margin-bottom: 8px" @click="cancelInfoEdit">Cancel</el-button>
            <el-button  style="margin-left: 120px;margin-bottom: 8px" type="primary" @click="confirmInfoEdit">Confirm</el-button>
        </span>
      </el-dialog>

      <el-dialog
              title="Change Password"
              :visible.sync="passwordDialogVisible"
              width="50%">
        <div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
               <el-form-item label="Old Password" prop="oldPass">
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
  import qs from "qs";

  export default {
    name: "template",
      data(){
        const validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('Please enter the password'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };

        const validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter the password'));
        } else if (value === this.ruleForm.oldPass)
          callback(new Error('Can not be the same as the old pass!'));
        else {
          callback();
        }
      };

        const validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('Please enter the password again'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('The two passwords do not match!'));
          } else {
            callback();
          }
        };
        const item = {
          productID: '1',
          category: '王小虎',
          abstract: '上海市普陀区金沙江路 1518 弄',
        };
        return {
          dialogVisible: false,
          passwordDialogVisible: false,
          tableData: [],

          form: {
            username: '',
            phoneNumber:'',
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
              { validator: validatePass1, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            oldPass: [
              { validator: validatePass, trigger: 'blur' }
            ]
        },
          userInfo: {
        username: "",
        phoneNumber: "",
        email: "",
        address: "",
        cookie: "",
        balance: ""
      },
      };
    },

    methods:{
      goHome() {
        this.$router.replace('/')
      },
      login() {
        this.$router.replace('/login')
      },
      account() {
        this.$router.replace('/profile')
      },
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
            let params = {
              cookie: this.userInfo.cookie,
              password: this.ruleForm.oldPass,
              newPassword: this.ruleForm.pass,
      }
      this.$axios.post('/api/resetPassword/',
          qs.stringify(params)
      ).then(res => {
        const ans = JSON.parse(res.data)
        if (ans.validation === true) {
          this.$message.success("Password reset successfully")
          this.$router.push({path:"/login"})
        }else {
          this.$message.error("Update information error:", ans.mes)
        }
      })
      .catch(err=>{
        console.log(err);
        this.$message.error("Unknown error")
      })
      } else {
          console.log('error submit!!');
          return false;
          }
        });
      },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    contact_us(){
        this.$alert('puxiaoyu@qq.com', 'E-mail', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      // cancel to update information
      cancelInfoEdit(){
        this.dialogVisible = false
        this.form.username = this.userInfo.username
        this.form.phoneNumber = this.userInfo.phoneNumber
        this.form.email = this.userInfo.email
        this.form.address = this.userInfo.address
      },
      // comfirm to update information
      confirmInfoEdit(){
        this.dialogVisible = false

        // add judgement rule

        let params = {
        cookie: this.userInfo.cookie,
        username: this.form.username,
        phoneNumber: this.form.phoneNumber,
        email: this.form.email,
        address: this.form.address
      }
      this.$axios.post('/api/updateProfileInfo/',
          qs.stringify(params)
      ).then(res => {
        // console.log(res.data)
        const ans = JSON.parse(res.data)
        if (ans.validation === true) {
          this.$message.success("Update information successfully")
          this.userInfo.username = ans.username
          this.userInfo.phoneNumber = ans.phoneNumber
          this.userInfo.email = ans.email
          this.userInfo.balance = ans.balance
          this.userInfo.address = ans.address
          this.form.username = this.userInfo.username
          this.form.phoneNumber = this.userInfo.phoneNumber
          this.form.email = this.userInfo.email
          this.form.address = this.userInfo.address
        }else {
          this.$message.error("Update information error")
        }
      })
      .catch(err=>{
        console.log(err);
          this.form.username = this.userInfo.username
          this.form.phoneNumber = this.userInfo.phoneNumber
          this.form.email = this.userInfo.email
          this.form.address = this.userInfo.address
      })
      }
  },
  mounted() {
    if (this.$route.query.cookie !== undefined) {
      this.userInfo.cookie = this.$route.query.cookie
      let params = {
        cookie: this.userInfo.cookie,
        whole: true
      }
      this.$axios.post('/api/profileInfo/',
          qs.stringify(params)
      ).then(res => {
        // console.log(res.data)
        const ans = JSON.parse(res.data)
        if (ans.validation === true) {
          this.userInfo.username = ans.username
          this.userInfo.phoneNumber = ans.phoneNumber
          this.userInfo.email = ans.email
          this.userInfo.balance = ans.balance
          this.userInfo.address = ans.address
          this.form.username = this.userInfo.username
          this.form.phoneNumber = this.userInfo.phoneNumber
          this.form.email = this.userInfo.email
          this.form.address = this.userInfo.address
        } else {
          this.$message.error("Get information error")
        }
      })
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