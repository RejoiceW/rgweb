<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-input v-model="input" class="shuru" placeholder="请输入内容" @change="selectOrderById" ></el-input>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="orderId" v-model="id" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="payment" label="订单金额" width="180"></el-table-column>
      <el-table-column prop="paymentType" label="支付类型" :formatter="payStaus"></el-table-column>
      <el-table-column prop="postFee" label="邮费"></el-table-column>
      <el-table-column prop="status" label="订单状态" :formatter="orderStaus"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column prop="paymentTim" label="付款时间"></el-table-column>
      <el-table-column prop="consignTime" label="收货时间"></el-table-column>
      <el-table-column prop="shippingName" label="物流名称"></el-table-column>
      <el-table-column prop="shippingCode" label="物流单号"></el-table-column>
      <el-table-column prop="userId" label="用户id"></el-table-column>
      <el-table-column prop="buyerMessage" label="买家留言"></el-table-column>
      <el-table-column prop="buyerNick" label="买家昵称"></el-table-column>
      <el-table-column label="状态操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click.native="SendItem(scope.row)">发货</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [],
      input: "",
      id: ""
    };
  },
  methods: {
    getorder() {
      this.axios
        .get("/5api/order/list", { params: { page: 1, rows: 10 } })
        .then(response => {
          this.tableData = response.data.rows;
          this.orderId = response;
        })
        .catch(error => {
          alert(error);
        });
    },
    payStaus(value) {
      if (value.paymentType == 1) {
        return "在线支付";
      } else if (value.paymentType == 2) {
        return "货到付款";
      }
    },
    orderStaus(value) {
      console.log(value);
      if (value.status == 1) {
        return "未支付";
      } else if (value.status == 2) {
        return "已支付";
      } else if (value.status == 3) {
        return "未发货";
      } else if (value.status == 4) {
        return "已发货";
      } else if (value.status == 5) {
        return "交易成功";
      } else if (value.status == 6) {
        return "交易关闭";
      }
    },

    selectOrderById() {
      this.axios
        .get("/13api/order", { params: { orderId: this.input,page: 1, rows: 10 } })
        .then(response => {this.tableData=response.data.rows;
        })
        .catch(error => {
          alert(error);
        });
    },
    SendItem(row) {
      this.id = row.orderId;
      this.axios
        .get("/13api/ordership", { params: { orderId: this.id } })
        .then(response => {
          this.getorder();
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  created() {
    this.getorder();
    // this.sendItem();
  }
};
</script>

<style scoped lang="scss">
.shuru {
  width: 200px;
  margin-left: 20px;
}
</style>