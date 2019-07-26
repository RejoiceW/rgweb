<template>
  <div id="itemdesc">
    <div id="details">
      <div id="img">
        <img :src="image" width="100%" />
      </div>

      <div>
        <h3>{{title}}</h3>
        <h5>{{sellPoint}}</h5>
        <div>
          <p>
            价格：
            <span id="price">￥{{price}}</span>
          </p>

          <p>
            库存:
            <span>{{num}}</span>
          </p>

          <p>
            数量：
            <template>
              <el-input-number
                v-model="number"
                @change="handleChange"
                :min="1"
                :max="1000000"
                label="描述文字"
              ></el-input-number>
            </template>
          </p>

          <p>
            <button id="add" @click="setitemnum">加入购物车</button>
            <span>{{this.$store.state.itemnum}}</span>
          </p>
        </div>
      </div>
    </div>
    <div>
      <div id="desc">
        <p>详细描述</p>
      </div>
      <div v-html="desc" id="descs">{{desc}}</div>
    </div>
  </div>
</template>

<script>
// import Header from "../Header";
// import Footer from "../Footer";
import vuex from "vuex";

export default {
  data() {
    //data 是往组件内部挂在私有数据
    return {
      image: "",
      title: "",
      sellPoint: "",
      price: "",
      num: "",
      desc: "",
      number: 1
    };
  },
  methods: {
    handleChange(value) {},
    getGoodsDetails() {
      //获取商品详细信息
      this.axios
        .get("/11api/rest/item/find", {
          params: { id: this.$store.state.itemid }
        })
        .then(response => {
          console.log(response.data.data);
          this.image = response.data.data.image;
          this.title = response.data.data.title;
          this.sellPoint = response.data.data.sellPoint;
          this.price = response.data.data.price;
          this.num = response.data.data.num;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getGoodsDesc() {
      //获取商品描述
      this.axios
        .get("/3api/rest/desc/dan", {
          params: { id: this.$store.state.itemid }
        })
        .then(response => {
          console.log(response.data);
          this.desc = response.data.itemDesc;
        })
        .catch(error => {
          console.log(error);
        });
    },
    setitemnum() {
      this.$store.commit("setItemNum", this.number);
    }
  },
  created() {
    this.getGoodsDetails();
    this.getGoodsDesc();
  }
};
</script>

<style scoped lang="scss">
#itemdesc {
  margin: 0px 300px;
}
#img {
  width: 40%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  margin-right: 20px;
  border: 1px solid rgb(238, 238, 238);
}
#details {
  width: 1000px;
  height: 400px;
}
#details h5 {
  color: coral;
  font-weight: normal;
  font-size: 15px;
  margin: 10px;
}
#details p {
  margin-bottom: 20px;
}
#price {
  color: coral;
  font-size: 20px;
}
#desc {
  height: 50px;
  width: 1000px;
  line-height: 50px;
  background: rgb(238, 238, 238);
  margin-top: 20px;
}
#desc p {
  color: white;
  background: coral;
  font-size: 15px;
  height: 100%;
  width: 90px;
  text-align: center;
}
#add {
  color: white;
  background: coral;
  border: 0;
  width: 120px;
  height: 40px;
  font-weight: bold;
  font-size: 16px;
}
#descs {
  padding: 20px 120px;
}
</style>
