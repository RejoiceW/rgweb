<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商品类目管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增商品类目</el-breadcrumb-item>
    </el-breadcrumb>
    <br />

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="选择父类目">
        <el-button @click="dialogTreeVisible = true; getCategories()">选择父类目</el-button>
        <span>{{ ' 您选择的类目id为：' + form.cid}}</span>
      </el-form-item>
      
      <el-form-item label="类目名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- Tree -->
    <el-dialog title="选择类目" :visible.sync="dialogTreeVisible">
      <el-tree
        :data="categoriesList"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        check-strictly
        @check-change="handleClick"
        ref="treeForm"
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTreeVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTreeVisible = false;  getCheckedKeys()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        cid:"",
        name: ""
      },
      i: 0,
      dialogTreeVisible: false,
      categoriesList: [], //存放后台传回的类目
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    getCategories() {
      //获取类目
      this.axios
        .get("/2api/item/cat/list")
        .then(response => {
          this.categoriesList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit() {
    //新增类目提交
      this.axios
        .get("/2api/item/cat/add", {params:{ id:this.form.cid,name: this.form.name }})
        .then(response => {
          // console.log(response.data);
            this.$message({
            //新增商品信息成功提示信息
            message: "商品信息新增成功！",
            type: "success",
            center: true
          });
        })
        .catch(error => {
          alert(error);
        });
    },
    resetForm(formName) {
      //重置表单
      this.$refs[formName].resetFields();
    },
    getCheckedKeys() {
      //
      this.itemId = this.$refs.treeForm.getCheckedKeys();

      for (var i = 0; i < this.itemId.length; i++) {
        this.form.cid = this.itemId[0];
        console.log(this.form.cid);
      }
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
    }
  }
};
</script>
