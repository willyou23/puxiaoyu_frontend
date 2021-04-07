<template>
  <div>
    <el-avatar icon="el-icon-user-solid"></el-avatar>
    <el-form :model="Form" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="Username" prop="username">
        <el-input type="text" v-model="Form.username" autocomplete="off" placeholder="Username"  ></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input type="text" v-model="Form.email" autocomplete="off" placeholder="E-mail" ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="text" v-model="Form.password" autocomplete="off" placeholder="Password"></el-input>
      </el-form-item>
      <el-form-item label= "Address" prop="address">
        <el-input v-model="Form.address" autocomplete="off" placeholder="Address"></el-input>
      </el-form-item>
      <el-form-item label= "Description" prop="description">
        <el-input v-model="Form.description" autocomplete="off" placeholder="Description"></el-input>
      </el-form-item>
      <el-form-item label= "Balance" prop="balance">
        <el-input v-model="Form.balance" autocomplete="off" placeholder="Balacne"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">save</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      Form: {
        username: '',
        email: '',
        password: '',
        address: '',
        balance: '',
        description:''
      },
      rules: {}
    };
  },
  methods: {
    // getInfo() {
    //   let params = {
    //     name: this.Form.username
    //   }
    //   if (this.Form.name !== "") {
    //     this.$axios.post('/api/info/',
    //         qs.stringify(params)
    //     ).then(res => {
    //       // console.log(res.data['username'])
    //       this.Form.name = res.data['username'];
    //       this.Form.email = res.data['email'];
    //       // console.log(res.data[0].fields['username']);
    //     })
    //   }
    // },
    save(){
    let params = {
      username: this.Form.username,
      password:this.Form.password,
      email :this.Form.email,
      address :this.Form.address,
      description:this.Form.description
    }
    this.$axios.post('/api/saveInfo/', qs.stringify(params)).then(res => {
        // console.log(res.data)
        const ans = JSON.parse(res.data)
      if(ans.validation === true){
        this.$message.success("success")
      }else {
        this.$message.error("False")
      }

        })
    }
  },
  mounted() {
    this.Form.username = this.$route.query.username
    let params = {
      username: this.Form.username
    }
    if (this.username!== "") {
      this.$axios.post('/api/info/',
          qs.stringify(params)
      ).then(res => {
        // console.log(res.data)
        const ans = JSON.parse(res.data)
        this.Form.balance =ans.balance
        this.Form.password =ans.password
        this.Form.email =ans.email
        this.Form.address =ans.address
        this.Form.description =ans.description
        })
    }
  }
}
</script>

<style scoped>

</style>