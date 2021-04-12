<template>
  <div id="app">
    <app-header></app-header>
    <router-view id="router"></router-view>
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
#router {
  margin-bottom: 5%;
  margin-top: 15%;
  clear: both;
}
</style>
