<template>
  <div class="custom-tree-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>内容分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br />

    <div class="block">
      <el-button type="primary" @click="deleteCategories()" size="medium">删除</el-button>
      <el-button type="warning" @click="dialogFormVisible = true;" size="medium">修改</el-button>
      <el-button type="warning" @click="dialogFormVisible1 = true;" size="medium">新增</el-button>
      <p>内容分类管理</p>
      <el-tree
      :data="GoodsList"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      check-strictly
      @check-change="handleClick"
      ref="treeForm"
       
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
      <el-dialog title="新增商品类目" :visible.sync="dialogFormVisible1">
        <el-form :model="categoryIfoo">
          <el-form-item label="类目名字">
            <el-input v-model="categoryIfoo.name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible1 = false; addcategoy()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
let id = 1000;

export default {
  data() {
    return {
      GoodsList: [],
      id: "",
      name: "",
      parentid: "",
      childlist: [],
      x: "",
      i: 0,
      itemId: [],
      categoryIfo: {
        //存放点击的商品对象
        name: ""
      },
      categoryIfoo: {
        //存放点击的商品对象
        name: ""
      },
      dialogFormVisible: false,
      dialogFormVisible1: false
    };
  },
  methods: {
    // append(data) {
    //   const newChild = { id: id++, label: "New test", children: [] };
    //   if (!data.children) {
    //     this.$set(data, "children", []);
    //   }
    //   data.children.push(newChild);
    //   this.axios.get("/7api/content/category/create", { params: {parentId:this.id,name:"New test"}}).then(response => {
    //       console.log(response);
    //     }).catch(error => {
    //       alert(error);
    //     });
    // },
    // remove(node, data) {
    //   const parent = node.parent;
    //   const children = parent.data.children || parent.data;
    //   const index = children.findIndex(d => d.id === data.id);
    //   children.splice(index, 1);
    // },
    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span class="custom-tree-node">
    //       <span>{node.label}</span>
    //       <span>
    //         <el-button
    //           size="mini"
    //           type="text"
    //           on-click={() => this.append(data)}
    //         >
    //           新增
    //         </el-button>
    //         <el-button
    //           size="mini"
    //           type="text"
    //           on-click={() => this.remove(node, data)}
    //         >
    //           删除
    //         </el-button>
    //         <el-button size="mini" type="text">
    //           修改
    //         </el-button>
    //       </span>
    //     </span>
    //   );
    //  },
    addcategoy(){
       this.itemId = this.$refs.treeForm.getCheckedKeys();
      for (var i = 0; i < this.itemId.length; i++) {
        this.x = this.itemId[0];
        console.log(this.itemid);
      }
      this.axios
        .get("/7api/content/category/create", {
          params: { parentId: this.x, name: this.categoryIfoo.name }
        })
        .then(response => {
          console.log(response);
           this.contentcatList();
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
        console.log(this.itemid);
      }
      this.axios
        .get("/7api/content/category/update", {
          params: { id: this.x, name: this.categoryIfo.name }
        })
        .then(response => {
          console.log(response);
           this.contentcatList();
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
        .get("/7api/content/category/delete", { params: { id: this.x } })
        .then(response => {
          console.log(response);
          this.contentcatList();
        })
        .catch(error => {
          console.log(error);
        });
    },
    contentcatList() {
      //从后台获取商品列表
      this.axios
        .get("/7api/content/category/list", { params: 0 })
        .then(response => {
          console.log(response);
          this.GoodsList = response.data;

          console.log(this.GoodsList);
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  created() {
    this.contentcatList();
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>