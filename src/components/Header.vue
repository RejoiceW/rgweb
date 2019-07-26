<template>
  <div>
    <ul>
      <li class="header-li-left">
        <router-link to="/home">首页</router-link>
      </li>
      <li class="header-li-left">
        <router-link to="/userLogin">{{name}}</router-link>
      </li>
      <li class="header-li-left">
        <router-link to="/register">{{denglu}}</router-link>
      </li>
      <li class="header-li-right">
        <router-link to="">关于睿购商城</router-link>
      </li>
      <li class="header-li-right">
        <router-link to="/myRG">我的睿购</router-link>
      </li>
      <li class="header-li-right">
        <router-link to="/shoppingCart">购物车(0)</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      denglu: ""
    };
  },
  methods: {
    changeState() {
      this.name = sessionStorage.getItem("LoginUsername");
      this.denglu = sessionStorage.getItem("state")
      if (this.name == null) {
        this.name = "您好，请登录";
        this.denglu = "注册";
      } 
    }
  },
  created() {
    this.changeState();
  }
};
</script>

<style scoped lang="scss">
* {
  margin: 0px;
  padding: 0px;
  list-style: none;
  text-decoration: none;
}

ul {
  background-color: rgb(240, 226, 226);
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.header-li-left {
  float: left;
  margin-left: 20px;
}

.header-li-right {
  float: right;
  margin-right: 20px;
}
</style>
