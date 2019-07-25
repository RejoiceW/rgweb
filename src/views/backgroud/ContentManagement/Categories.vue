<template>
  <div class="custom-tree-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>内容分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br />

    <div class="block">
      <p>内容分类管理</p>
      <el-tree
        :data="GoodsList"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      ></el-tree>
    </div>
  </div>
</template>

<script>
 let id = 1000;

export default {
    data(){
    
    return {
      GoodsList: [],
      id:'',
      name:'',
      parentid:'',
      childlist:[],
      
    }
  },
    methods: {
    append(data) {
      const newChild = { id: id++, label: "New test", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
      this.axios.get("/7api/content/category/create", { params: {parentId:this.id,name:"New test"}}).then(response => {
          console.log(response);
        }).catch(error => {
          alert(error);
        });
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              新增
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
            <el-button size="mini" type="text">
              修改
            </el-button>
          </span>
        </span>
      );
     },
    contentcatList() {
      //从后台获取商品列表
      this.axios.get("/7api/content/category/list", { params: 0 }).then(response => {
          console.log(response);
          this.GoodsList = response.data;
          
          console.log(this.GoodsList);
        }).catch(error => {
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