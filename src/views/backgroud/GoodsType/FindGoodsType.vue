<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商品类目管理</el-breadcrumb-item>
      <el-breadcrumb-item>查询商品类目</el-breadcrumb-item>
    </el-breadcrumb>
    <br />

    <el-button type="primary" @click="deleteCategories()" size="medium">修改</el-button>
    <el-button type="warning" @click="dialogFormVisible = true;" size="medium">删除</el-button>
    <br>

    <el-tree
      :data="categoriesList"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      check-strictly
      @check-change="handleClick"
      ref="treeForm"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    ></el-tree>
    <el-dialog title="修改商品类目" :visible.sync="dialogFormVisible">
      <el-form :model="categoryIfo">
        <el-form-item label="类目名字">
          <el-input v-model="categoryIfo.name"></el-input>
        </el-form-item>
      </el-form>
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
      categoriesList: [], //存放后台传回的类目
      defaultProps: {
        children: "children",
        label: "label"
      },
      x: "",
      i: 0,
      itemId: [],
      categoryIfo: {
        //存放点击的商品对象
        name: ""
      },
      dialogFormVisible: false
    };
  },
  methods: {
    getCategories() {
      //获取商品类别
      this.axios
        .get("/2api/item/cat/list")
        .then(response => {
          this.loading = false;
          this.categoriesList = response.data; //获得所有商品类别数据
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClick(data, checked, node) {
      //
      this.i++;
      if (this.i % 2 == 0) {
        if (checked) {
          this.$refs.treeForm.setCheckedNodes([]);
          this.$refs.treeForm.setCheckedNodes([data]);
          //交叉点击节点
        } else {
          this.$refs.treeForm.setCheckedNodes([]);
          //点击已经选中的节点，置空
        }
      }
    },
    deleteCategories() {
      //
      this.itemId = this.$refs.treeForm.getCheckedKeys();
      for (var i = 0; i < this.itemId.length; i++) {
        this.x = this.itemId[0];
        console.log(this.x);
      }
      this.axios
        .get("2api/item/cat/delete", { params: { id: this.x } })
        .then(response => {
          console.log(response);
           this.getCategories();
        })
        .catch(error => {
          console.log(error);
        });
     
    },
    changeGoods() {
      //
      this.itemId = this.$refs.treeForm.getCheckedKeys();
      for (var i = 0; i < this.itemId.length; i++) {
        this.x = this.itemId[0];
        console.log(this.x);
      }
      this.axios
        .get("2api/item/cat/update", {
          params: { id: this.x, name: this.categoryIfo.name }
        })
        .then(response => {
          console.log(response);
           this.getCategories();
        })
        .catch(error => {
          console.log(error);
        });
     
    }
  },
  created() {
    this.getCategories();
  }
};
</script>
