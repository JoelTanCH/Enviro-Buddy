<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="navbar-custom">
      <b-navbar-brand href="/mkt-category" id="brand"
        >Enviro Buddy</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse
        class="collapse navbar-collapse justify-content-end"
        id="nav-items"
      >
        <b-navbar-nav>
          <!-- dropdown for marketplace -->
          <b-nav-item-dropdown text="Marketplace">
            <b-dropdown-item href="/mkt-category">Categories</b-dropdown-item>
            <b-dropdown-item href="/mkt-cart">View Cart</b-dropdown-item>
            <b-dropdown-item href="/mkt-add">Add Listing</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item href="/event-category">Events</b-nav-item>
          <b-nav-item href="/info-category">Information Hub</b-nav-item>
          <b-nav-item href="/" v-show="loggedIn == false">
            Sign Up / Login
          </b-nav-item>
          <b-nav-item href="/login" @click="signOut" v-show="loggedIn">
            Logout
          </b-nav-item>

          <span v-on:click="$router.push('/profile')" class="icon">
            <span v-show="loggedIn">Hello {{ this.userInfo.username }}!</span>
            <b-icon-person-fill
              class="icon"
              font-scale="1.5"
              v-show="loggedIn"
            ></b-icon-person-fill>
          </span>

          <b-icon-cart4
            class="icon"
            font-scale="1.5"
            v-on:click="$router.push('/mkt-cart')"
          ></b-icon-cart4>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      username: null,
      loggedIn: false,
      userInfo: {},
    };
  },
  methods: {
    fetchUserInfo: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          database
            .collection("users")
            .doc(user.email)
            .get()
            .then((querySnapshot) => {
              this.userInfo = querySnapshot.data();
            });
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
        }
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/")
        });
    },
  },
  created: function () {
    this.fetchUserInfo();
  },
};
</script>

<style scoped>
#brand {
  margin: 10px;
}
.navbar-custom {
  background: #3a6351;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  float: right;
  z-index:100;
}
.icon:hover {
  color: white;
}
.icon {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 5px;
}
#nav-items {
  margin-right: 10px;
}
</style>