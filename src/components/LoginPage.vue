<template>
  <div id="main">
    <div id="content">
      <img id="logo" v-bind:src="logoURL" />
      <h1>Log In</h1>
      <br />

      <b-form>
        <b-form-input
          class="inputField"
          type="text"
          placeholder="Email"
          required
          v-model="email"
        >
        </b-form-input>

        <b-form-input
          class="inputField"
          type="password"
          placeholder="Password"
          required
          v-model="password"
        >
        </b-form-input>
      </b-form>

      <b-button class="button" v-on:click="userLogin" variant="outline-success">
        Log In </b-button
      ><br />

      <a href="/forgot-password"> Forgot Password? </a><br />

      <span>Don't have an account? </span>
      <a href="/sign-up">Sign Up</a>
    </div>

    <img id="bg-img" v-bind:src="backgroundURL" />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      logoURL:
        "https://peppertreevenue.co.za/wp-content/uploads/2019/04/pepper-tree-favicon-transparent.png",
      backgroundURL:
        "https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
    };
  },
  methods: {
    userLogin: function () {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() =>
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        )
        .then(() => {
          if (firebase.auth().currentUser.emailVerified) {
            this.email = "";
            this.password = "";
            this.$router.push({ path: "/mkt-category" });
          } else {
            alert("Email is not verified");
          }
        })
        .catch(() => alert("Invalid email/password"));
    },
  },
};
</script>

<style scoped>
#logo {
  width: 25%;
  align-items: center;
}
h1 {
  margin-top: 25px;
}
.inputField {
  font-size: 16px;
  margin-bottom: 10px;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
span {
  font-size: 16px;
  color: #393232;
}
.button {
  font-size: 16px;
  margin-bottom: 10px;
  width: 240px;
}
#content {
  float: left;
  padding-bottom: 5%;
}
#bg-img {
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
a {
  color: #3a6351;
  font-weight: bolder;
}
a:hover {
  color: #e48257;
  text-decoration: none;
}
</style>