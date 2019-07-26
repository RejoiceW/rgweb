<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商品描述管理</el-breadcrumb-item>
      <el-breadcrumb-item>查询商品描述</el-breadcrumb-item>
    </el-breadcrumb>
    <br>

    <el-table
      :data="goodsDescList"
      stripe
      max-height="700"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column prop="itemId" label="商品id" width="400"></el-table-column>
      <el-table-column prop="created" :formatter="dateFormat" label="创建日期" width="400"></el-table-column>
      <el-table-column prop="updated" :formatter="dateFormat" label="更新日期" width="400"></el-table-column>
      <el-table-column prop="itemDesc" label="商品描述" width="400">
        <template slot-scope="scope" >
          <el-button type="success" size="mini" @click="dialogFormVisible = true; handleEdit(scope.row)">获取详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 商品详情对话框 -->
    <el-dialog title="商品详情" :visible.sync="dialogFormVisible">
      <span v-html="desc"></span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; changeGoods()">确 定</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: true, //开启页面加载效果
      goodsDescList: [], //存放商品描述信息
      total: 1, //存放商品总数
      rows: 10, //存放每页显示条数
      dialogFormVisible: false, //编辑商品弹框的状态
      desc: '' //存放商品描述详情
    };
  },
  methods: {
    getGoodsDescList() {
      //获取商品列表
      this.axios.get("/3api/rest/desc/all", { params: { page: 1, rows: 10 } })
        .then(response => {
           this.loading = false;
          this.goodsDescList = response.data.rows;
          this.total = response.data.total;
        })
        .catch(error => {
          alert(error);
        });
    },
    currentChange(val) {
      //当前页码改变
      this.axios.get("/3api/rest/desc/all", { params: { page: val, rows: this.rows } })
        .then(response => {
          this.goodsDescList = response.data.rows;
        })
        .catch(error => {
          alert(error);
        });
    },
    sizeChange(val) {
      //每页条数改变
      this.rows = val;
      this.axios.get("/3api/rest/desc/all", { params: { page: 1, rows:val } })
        .then(response => {
          this.goodsDescList = response.data.rows;
        })
        .catch(error => {
          alert(error);
        });
    },
    handleEdit(row) {
      console.log(row.itemDesc);
      this.desc = row.itemDesc;
    },
    dateFormat(row, column, cellValue, index) {
      //日期格式化
      const daterc = row[column.property];
      if (daterc != null) {
        const dateMat = new Date(daterc);
        const year = dateMat.getFullYear();
        const month = dateMat.getMonth() + 1;
        const day = dateMat.getDate();
        const hh = dateMat.getHours();
        const mm = dateMat.getMinutes();
        const ss = dateMat.getSeconds();
        const timeFormat =
          year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss;
        return timeFormat;
      }
    }
  },
  created() {
    this.getGoodsDescList();
  }
};
</script>
