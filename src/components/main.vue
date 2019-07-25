<template>
  <div id="main">
    <index></index>
    <home></home>
    <foot></foot>
  </div>
</template>

<script>
import index from './index.vue'
import home from './home.vue'
import foot from './foot.vue'
import store from './store.vue'

export default {
  name: 'app',
  components: {
    index,
    home,
    foot,
    store
  }
}
</script>

<style >
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:30px;
  text-align: center;
  /*color: #2c3e50;*/
}
</style>
