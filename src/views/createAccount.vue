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
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-search" type="password" placeholder="password"></el-input>
                </el-form-item>
                <el-form-item prop="password1">
                    <el-input v-model="loginForm.password1" prefix-icon="el-icon-search" type="password" placeholder="password again"></el-input>
                </el-form-item>
<!--                &lt;!&ndash;验证码&ndash;&gt;-->
<!--                <el-form-item prop="code">-->
<!--                    <el-input v-model="loginForm.code" placeholder=""> </el-input>-->
<!--                </el-form-item>-->
                <!--按钮区域-->
                <el-form-item class="btns" >
                    <el-button type="primary" @click="cancel">cancel</el-button>
                    <el-button type="primary" @click="submitInfo">confirm</el-button>
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
                captchaUrl: '',
                loginForm: {
                    username: '',
                    email: '',
                    password: '',
                    password1: '',
                },
                checked: true,
                rules:{
                    username: [{required:true,message:'请输入用户名',trigger:'blur'},
                        { min: 6, max: 20, message: '长度在 6 到 10 个字符', trigger: 'blur' }],
                    email: [{required:true,message:'请输入email',trigger:'blur'},
                        { min: 6, max: 40, message: '长度在 6 到 30 个字符', trigger: 'blur' }],
                    password:[{required:true,message:'请输入密码',trigger:'blur'},
                        { min: 6, max: 20, message: '长度在 6 到 20 个数字', trigger: 'blur' }],
                    password1: [{required:true,message:'请再次输入密码',trigger:'blur'},
                        { min: 6, max: 20, message: '长度在 6 到 20 个数字', trigger: 'blur' }],
                }
            }
        },
        methods:{
            submitInfo(){
              this.$refs.loginForm.validate((valid) => {
              if (this.loginForm.password !== this.loginForm.password1){
                this.$message.error('inconsistent password');
                    return false;
              }
              if (valid) {
                let params = {
                username: this.loginForm.username,
                email: this.loginForm.email,
                password: this.loginForm.password
                }
                this.$axios.post('/api/createAccount/',
                    qs.stringify(params)
                ).then(res => {
                  console.log(res.data)
                  if(JSON.parse(res.data).validation === true){
                    this.$message.success("submit success")
                    this.$router.push({ path:'/login'})
                  } else {
                    this.$message.error("server error, fail to submit")
                  }
                })
              } else {
                  this.$message.error('您的输入不符合规范');
                  return false;
              }
            });
            },
          cancel(){
              this.$router.push({ path:'/login'})
          }
        }
    }

</script>

<style scoped>
    .title{
      padding-top: 20px;
      transform: translate(40%,15%)
    }

    .loginContainer{
     background-color: #2b4b6b;
        height: 100%;
    }

    .login_box{
        width: 450px;
        height: 370px;
        background-color: #ffffff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        box-shadow: 0 0 1px;}

    .avatar_box{
        height: 100px;
        width: 100px;
        border:1px solid #eeeeee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #dddddd;
        position: absolute;
        left:50%;
        transform: translate(-50%,-65%);
        background-color: #ffffff;
    }
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eeeeee}

    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login_Form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 25px;
        box-sizing: border-box;
    }
</style>