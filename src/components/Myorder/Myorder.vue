<template>
  <div id="myorder">

    <el-page-header content="我的订单" id="PageHeader" title="返回" @back="goBack()"></el-page-header>
    <br />

    <el-card>
      <table class="table" cellspacing="0">
        <thead>
          <th colspan="3">商品信息</th>
          <th>价格</th>
          <th>数量</th>
          <th>小计</th>
        </thead>
      </table>
      <br />
      <div v-html="content">{{ content }}</div>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    getOrder() {
      this.axios
        .get("/11api/rest/order/find", { params: { userId: 1 } })
        .then(response => {
          console.log(response.data.data[0]);
          for (var i = 0; i < response.data.data.length; i++) {
            var status = response.data.data[i][0].status;
            if (status == 1) {
              status = "未支付";
            }
            this.content =
              "<table class='table' cellspacing='0'><thead><th colspan='6' class='msg' ><span>订单号：" +
              response.data.data[i][0].orderId +
              "</span><span>收件人:" +
              response.data.data[i][0].buyerNick +
              "</span><span>订单状态:" +
              status +
              "</span><span>订单总价:" +
              response.data.data[i][1][0].totalFee +
              "</span></th></thead><tbody><td><a><img src='" +
              response.data.data[i][1][0].picPath +
              "'/></td></a><td colspan='2'>" +
              response.data.data[i][1][0].title +
              "</td><td>￥" +
              response.data.data[i][1][0].price +
              "</td><td>" +
              response.data.data[i][1][0].num +
              "</td><td>￥" +
              response.data.data[i][1][0].totalFee +
              "</td></tbody></table>";
          }
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
    this.getOrder();
  }
};
</script>

<style lang="scss">

#myorder .table {
  width: 780px;
}
#myorder th {
  background: rgb(238, 238, 238);
  border: 1px solid rgb(238, 238, 238);
  height: 30px;
  width: 130px;
}
#myorder span {
  color: gray;
  margin: 0px 20px;
  float: left;
  font-size: 15px;
}
#myorder td {
  width: 130px;
  background: rgb(250, 250, 250);
  text-align: center;
}
#myorder a {
  width: 110px;
  height: 110px;
  display: block;
}
</style>
