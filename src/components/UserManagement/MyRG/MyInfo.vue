<template>
  <div>
    
    <el-page-header content="我的信息" id="PageHeader" title="返回" @back="goBack()"></el-page-header>
    <br />

    <el-card>
      <div slot="header" class="clearfix">
        <span>我的信息</span>
      </div>
      用户名：{{name}}
      <br />
      电 话：{{phone}}
      <br />
      邮 箱：{{email}}
      <br>
      <button>编 辑</button>
    </el-card>
  </div>
</template>

<script>


export default {
  data() {
    return {
      name: "",
      phone: "",
      email: ""
    };
  },
  methods: {
    userInfo() {
      this.axios
        .get("/9api/sso/user/token/" + localStorage.getItem("token"))
        .then(response => {
          this.name = response.data.data.username;
          this.phone = response.data.data.phone;
          this.email = response.data.data.email;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    //生命周期钩子函数
    this.userInfo();
  }
};
</script>

<style lang="scss" scoped>
button {
  background-color: #409eff;
  border: 0px;
  color: rgb(255, 255, 255);
  width: 50px;
  height: 30px;
}
</style>