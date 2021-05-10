<template>
  <div class="loginContainer">
    <div class="login_box">
      <!--           头像区域-->
      <div class="avatar_box">
        <img src="~@/assets/profile1.png" alt="">
      </div>
      <!--            表单区域-->
      <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0px" class="login_Form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-search" placeholder="username"></el-input>
        </el-form-item>
        <!--email-->
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" prefix-icon="el-icon-search" placeholder="email"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-search" type="password"
                    placeholder="password"></el-input>
        </el-form-item>
        <el-form-item prop="password1">
          <el-input v-model="loginForm.password1" prefix-icon="el-icon-search" type="password"
                    placeholder="password again"></el-input>
        </el-form-item>

     <el-select style="margin-top: 10px" v-model="value" prop="security" placeholder="please choose the security question">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-form-item style="margin-top: 20px" prop="answer">
          <el-input v-model="loginForm.answer" prefix-icon="el-icon-search" placeholder="answer"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button style="margin-top: 10px" type="primary" @click="cancel">cancel</el-button>
          <el-button style="margin-top: 10px" type="primary" @click="submitInfo">confirm</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import qs from "qs";

export default {
  name: "createAccount",
  data() {
    return {
      options: [{
        value: '1',
        label: 'When is your birthday?'
      }, {
        value: '2',
        label: 'Which city were you born in?'
      }, {
        value: '3',
        label: 'what is your first phone number?'
      }],
      value: '',

      captchaUrl: '',
      loginForm: {
        username: '',
        email: '',
        password: '',
        password1: '',
        answer: '',
      },
      checked: true,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 10 个字符', trigger: 'blur'}],
        email: [{required: true, message: '请输入email', trigger: 'blur'},
          {min: 6, max: 40, message: '长度在 6 到 30 个字符', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个数字', trigger: 'blur'}],
        password1: [{required: true, message: '请再次输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个数字', trigger: 'blur'}],
      }
    }
  },
  methods: {

    submitInfo() {
      this.$refs.loginForm.validate((valid) => {
        if (this.loginForm.password !== this.loginForm.password1) {
          this.$message.error('inconsistent password');
          return false;
        }
        if (valid) {
          let params = {
            username: this.loginForm.username,
            email: this.loginForm.email,
            password: this.loginForm.password,
            answer: this.loginForm.answer,
            value: this.value,
          }
          this.$axios.post('/api/createAccount/',
              qs.stringify(params)
          ).then(res => {
            console.log(res.data)
            if (JSON.parse(res.data).validation === true) {
              this.$message.success("submit success")
              this.$router.push({path: '/login'})
            } else {
              // this.$message.error("server error, fail to submit")
              this.$message.error(JSON.parse(res.data).errmess)
            }
          })
        } else {
          this.$message.error('您的输入不符合规范');
          return false;
        }
      });
    },
    cancel() {
      this.$router.push({path: '/login'})
    }
  }
}

</script>

<style scoped>
.title {
  padding-top: 20px;
  transform: translate(40%, 15%)
}

.loginContainer {
  background-color: #2b4b6b;
  height: 150%;
}

.login_box {
  width: 600px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 1px;
}

.avatar_box {
  height: 100px;
  width: 100px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #dddddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -65%);
  background-color: #ffffff;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eeeeee
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_Form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}

.el-select {
  width: 550px;
}
</style>