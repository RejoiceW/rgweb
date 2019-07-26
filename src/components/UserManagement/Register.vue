<template>
  <div>
    <my-header></my-header>

    <div id="top-div">
      <h1>上 睿 购，买 个 够！</h1>
      <div id="inner-div">
        <h3>用户注册</h3>
        <hr />
        <form>
          <input type="text" placeholder="请输入用户名" class="login-input" v-model="name" />
          <br />
          <input type="password" placeholder="请输入密码" class="login-input" v-model="password" />
          <br />
          <input
            type="password"
            placeholder="请再次输入密码"
            class="login-input"
            v-model="passwordConfirm"
          />
          <br />
          <input type="text" placeholder="请输入手机号" class="login-input" v-model="phone" />
          <br />
          <input type="email" placeholder="请输入邮箱" class="login-input" v-model="email" />
          <br />
          <button class="login-input" id="login-button" @click="onSubmit()">立即注册</button>
        </form>
        <div id="router-div">
          <router-link to="/userLogin">已有帐号，去登陆>></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../Header";
import Qs from 'qs';

export default {
  data() {
    return {
      name: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      email: ""
    };
  },
  methods: {
    onSubmit() {
      var user = {
        username: this.name,
        password: this.password,
        phone: this.phone,
        email: this.email
      };
      this.axios
        .post("9api/sso/user/register", Qs.stringify(user), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          console.log(response.data);
          if (response.data.status == 200) {
            this.$message({
              //修改商品信息成功提示信息
              message: "注册成功",
              type: "success",
              center: true
            });
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  components: {
    "my-header": Header
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}

#top-div {
  height: 700px;
  width: 100%;
  background-color: #409eff;
}

h1 {
  position: absolute;
  top: 150px;
  left: 400px;
  color: rgb(255, 255, 255);
  // text-shadow: 0 0 20px #fdec84, 10px -10px 30px #ffae35,
  //   20px -20px 40px #ec760c, -20px -60px 50px #cd4607, 0px -80px 60px #973717,
  //   10px -40px 70px #451b0e;
}

#inner-div {
  height: 500px;
  width: 400px;
  background-color: rgb(255, 255, 255);
  position: relative;
  top: 50px;
  left: 1200px;
  border: 1px;
}

h3 {
  text-align: center;
  line-height: 50px;
  color: #606266;
}

.login-input {
  height: 35px;
  width: 250px;
  margin-top: 20px;
  margin-left: 75px;
}

#login-button {
  width: 255px;
  background-color: #67c23a;
  border: 0px;
  color: rgb(255, 255, 255);
  font-size: 15px;
}

#router-div {
  margin-left: 200px;
}

a {
  text-decoration: none;
  font-size: 15px;
  color: rgb(105, 98, 100);
}
</style>
