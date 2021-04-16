<template>
  <div id="app">
    <app-header v-show="loggedIn"></app-header>
    <router-view id="router"></router-view>
    <app-footer v-show="loggedIn"></app-footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      loggedIn: false,
    };
  },
  methods: {},
  created: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user.emailVerified) {
        this.loggedIn = true;
      } else {
        // No user is signed in.
        this.loggedIn = false;
      }
    });
  },
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
};
</script>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  /* text-align: center; */
  font-size: 14px;
}
#router {
  padding-bottom: 3%;
  padding-top: 8%;
  clear: both;
  min-height: 100vh;
}
</style>
