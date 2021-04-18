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
            <b-dropdown-item href="/mkt-add">Add Listing</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Events">
            <b-dropdown-item href="/event-category">Categories</b-dropdown-item>
            <b-dropdown-item href="/event-add"
              >Submit Event Request</b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Information Hub">
            <b-dropdown-item href="/info-category">Categories</b-dropdown-item>
            <b-dropdown-item href="/info-add">Add Post</b-dropdown-item>
          </b-nav-item-dropdown>

          <span v-on:click="$router.push('/profile')" class="icon">
            <b-icon-person-fill
              class="icon"
              font-scale="1.5"
            ></b-icon-person-fill>
            <span>Hello {{ this.userInfo.username }}!</span>
          </span>
          <span v-on:click="$router.push('/mkt-cart')" class="icon">
            <b-icon-cart4 font-scale="1.5"></b-icon-cart4>
            <span>Cart</span>
          </span>

          <b-nav-item class="logout" href="/" @click="signOut">
            Logout
          </b-nav-item>
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
      userInfo: {},
    };
  },
  methods: {
    fetchUserInfo: function () {
      firebase.auth().onAuthStateChanged((user) => {
        database
          .collection("users")
          .doc(user.email)
          .get()
          .then((querySnapshot) => {
            this.userInfo = querySnapshot.data();
          });
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
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
  z-index: 100;
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
  color: rgba(255, 255, 255, 0.55);
}
.logout {
  color: #2b2b2b;
}
</style>