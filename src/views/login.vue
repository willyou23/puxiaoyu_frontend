<template>
    <div class="loginContainer">
        <div class="login_box">
<!--           头像区域-->
            <div class="avatar_box">
                <img src="~@/assets/profile1.png" alt="">
            </div>
          <h1 class="title">Login</h1>
<!--            表单区域-->
            <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0px" class="login_Form">
                <!--用户名-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-search" placeholder="username"></el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-search" type="password" placeholder="password"></el-input>
                </el-form-item>
<!--                &lt;!&ndash;验证码&ndash;&gt;-->
<!--                <el-form-item prop="code">-->
<!--                    <el-input v-model="loginForm.code" placeholder=""> </el-input>-->
<!--                </el-form-item>-->
                <!--按钮区域-->
                <el-form-item class="btns" >
                    <el-button type="primary" @click="submitlogin">登录</el-button>
                    <el-button type="info" @click="createAccount">注册</el-button>
                </el-form-item>
            </el-form>
    </div>
    </div>
</template>

<script>

    import qs from "qs";

    export default {
        name: "login",
        data() {
            return {
                captchaUrl: '',
                loginForm: {
                    username: '',
                    password: '',
                    code: '',
                },
                checked: true,
                rules:{
                    username: [{required:true,message:'请输入用户名',trigger:'blur'},
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
                    password:[{required:true,message:'请输入密码',trigger:'blur'},
                        { min: 6, max: 10, message: '长度在 6 到 10 个数字', trigger: 'blur' }],
                    code: [{required:true,message:'请输入验证码',trigger:'blur'}],
                }
            }
        },
        methods:{
            submitlogin()
            {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                      let params = {
                      username: this.loginForm.username,
                      password: this.loginForm.password
                    }
                    if (this.loginForm.username!== "") {
                      this.$axios.post('/api/login/',
                          qs.stringify(params)
                      ).then(res => {
                        // console.log(res.data)
                        const ans = JSON.parse(res.data)
                        if(ans.validation === true){
                          this.$message.success("success")
                          this.$router.push({ path:'/homePage', query:{"cookie": ans.cookie}})
                        } else {
                          this.$message.error("False")
                        }
                      })
                    }
                    } else {
                        this.$message.error('您的输入不符合规范');
                        return false;
                    }
                });
            },
          createAccount(){
              this.$router.push({ path:'/createAccount'})
          },
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
        height: 300px;
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