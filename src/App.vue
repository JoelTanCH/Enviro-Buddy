<template>
  <div id="app">
    <app-header></app-header>
    <router-view id="main"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  font-size: 14px;
}
body {
  background-color: #f2edd7;
}
#main {
  min-height: 400px;
  margin-bottom: 100px;
  margin-top: 100px;
  clear: both;
}
</style>
