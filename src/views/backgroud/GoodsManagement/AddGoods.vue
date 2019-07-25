<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增商品</el-breadcrumb-item>
    </el-breadcrumb>
    <br />

    <el-form :model="form" ref="form" :rules="rules" label-width="80px" class="demo-ruleForm">
      <el-form-item label="商品类目">
        <el-button @click="dialogTreeVisible = true; getCategories()">选择类目</el-button>
        <span>{{ ' 您选择的类目id为：' + form.cid}}</span>
      </el-form-item>
      <el-form-item label="商品标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入商品标题"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="form.sellPoint" placeholder="请输入商品卖点"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="form.price" placeholder="请输入商品价格"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="num">
        <el-input-number
          v-model="form.num"
          size="medium"
          placeholder="请输入商品库存"
          :min="1"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="条形码">
        <el-input v-model="form.barcode"></el-input>
      </el-form-item>
    
      <el-form-item label="商品图片" prop="image">
        <el-upload
          class="upload-demo"
          action="/8api/pic/upload2"
          :limit="1"
          drag
          multiple
          list-type="picture"
          :on-success="uploadSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input type="textarea" v-model="form.desc" :rows="5" placeholder="请输入商品描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="选择类目" :visible.sync="dialogTreeVisible">
      <!-- Tree -->
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

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTreeVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogTreeVisible = false; getCheckedKeys()"
          highlight-current="true"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  data() {
    return {
      loading: true, //开启页面加载效果
      i: 0,
      form: {
        //存放输入的表单数据
        cid: "",
        title: "",
        sellPoint: "",
        price: "",
        num: "",
        barcode: "",
        image: "",
        desc: ""
      },
      dialogTreeVisible: false, //树形组件默认隐藏
      categoriesList: [], //存放后台传回的类目
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules: {
        //表单校验规则
        title: { required: true, message: "请输入商品标题", trigger: "blur" },
        price: { required: true, message: "请输入商品价格", trigger: "blur" },
        desc: { required: true, message: "请输入商品描述", trigger: "blur" },
        num: { required: true, message: "请输入商品库存", trigger: "blur" }
      }
    };
  },
  methods: {
    submitForm(forName) {
      //新增商品表单提交
      this.axios
        .get("/1api/item/save", {
          params: {
            title: this.form.title,
            sellPoint: this.form.sellPoint,
            price: this.form.price,
            num: this.form.num,
            barcode: this.form.barCode,
            image: this.form.image,
            desc: this.form.desc,
            cid: this.form.cid
          }
        })
        .then(response => {
          console.log(response);
          this.$message({
            //修改商品信息成功提示信息
            message: "新增商品成功！",
            type: "success",
            center: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetForm(formName) {
      //重置表单
      this.$refs[formName].resetFields();
    },
    getCategories() {
      //获取商品类别
      this.axios
        .get("/2api/item/cat/list")
        .then(response => {
          this.loading = false; //关闭页面加载效果
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
    getCheckedKeys() {
      //获取选择的类目id
      this.itemId = this.$refs.treeForm.getCheckedKeys();
      for (var i = 0; i < this.itemId.length; i++) {
        this.form.cid = this.itemId[0];
      }
    },
    uploadSuccess(res, file) {
      //文件上传成功后获得图片地址
      this.$message({
            //上传成功提示信息
            message: "上传图片成功",
            type: "success",
            center: true
          });
      this.form.image = res.url;
      },
  }
};
</script>

