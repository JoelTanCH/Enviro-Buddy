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
#main {
  min-height: 400px;
  margin-bottom: 100px;
  margin-top: 100px;
  clear: both;
}
#main::after {
  content: "";
  background: url("https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80");
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
}
</style>
