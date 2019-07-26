<template>
  <div>
    <my-header></my-header>

    <div id="top-div">
      <h1>上 睿 购，买 个 够！</h1>
      <div id="inner-div">
        <h3>用户登录</h3>
        <hr />
        <form>
          <input type="text" placeholder="请输入用户名" class="login-input" v-model="name" />
          <br />
          <input type="password" placeholder="请输入密码" class="login-input" v-model="password" />
          <br />
          <button class="login-input" id="login-button" @click="onSubmit">登 录</button>
        </form>
        <div id="a-div">
          <router-link to="/findPass">忘记密码</router-link>
          <router-link to="/register">免费注册</router-link>
        </div>
      </div>
    </div>

    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from "../Header";
import Footer from "../Footer";
import Qs from "qs";
import axios from "axios";
import { constants } from "crypto";
// import { finished } from "stream";

export default {
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      //发送请求
      var item = { username: this.name, password: this.password };
      this.axios
        .post("9api/sso/user/login", Qs.stringify(item), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(response => {
          console.log(response.data);
          if (response.data.status == 200) {
            this.$message({
              //修改商品信息成功提示信息
              message: "登陆成功",
              type: "success",
              center: true
            });
            //设置Vuex登录标志为true，默认userLogin为false
            this.$store.dispatch("userLogin", true);

            //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
            //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
            sessionStorage.setItem("Flag", "isLogin");
            sessionStorage.setItem("token", response.data.data);
            sessionStorage.setItem("LoginUsername", this.name);
             sessionStorage.setItem("state", "注销");
            console.log(sessionStorage.getItem("Flag"));
            //登录成功后跳转到指定页面
            this.$router.go(-1);
          } else {
            this.$message({
              //修改商品信息成功提示信息
              message: response.data.msg,
              type: "error",
              center: true
            });
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    set(){
      
    }
  },
  components: {
    "my-header": Header,
    "my-footer": Footer
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}

#top-div {
  height: 500px;
  width: 100%;
  background-color: #409eff;
}

h1 {
  position: absolute;
  top: 150px;
  left: 400px;
  color: rgb(255, 255, 255);
}

#inner-div {
  height: 300px;
  width: 400px;
  background-color: rgb(255, 255, 255);
  position: relative;
  top: 100px;
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
  width: 254px;
  background-color: #67c23a;
  border: 0px;
  color: rgb(255, 255, 255);
  font-size: 15px;
}

#a-div {
  margin-left: 200px;
}

a {
  text-decoration: none;
  font-size: 15px;
  color: rgb(105, 98, 100);
}
</style>
