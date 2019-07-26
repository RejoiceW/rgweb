<template>
  <div>
    <my-header></my-header>
    <my-searchBox></my-searchBox>
    <my-homepage></my-homepage>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";
import HomePage from "../components/HomePage";

export default {
  components: {
    "my-header": Header,
    "my-footer": Footer,
    "my-searchBox": SearchBox,
    "my-homepage": HomePage
  }
};
</script>

<style lang="scss" scoped>
</style>
