<template>
  <div id="main">
    <div id="content">
      <img id="logo" v-bind:src="logoURL" />
      <h1>Reset Password</h1>
      <br />

      <div>
        Please enter the email address of your account:
      </div>

      <b-form>
        <b-form-input
          class="inputField"
          type="text"
          placeholder="Email"
          required
          v-model="email"
        >
        </b-form-input>
      </b-form>
      <br />

      <b-button
        class="button"
        id="emailButton"
        v-on:click="resetPassword"
        variant="outline-success"
      >
        Send a password reset link
      </b-button>
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
      logoURL:
        "https://peppertreevenue.co.za/wp-content/uploads/2019/04/pepper-tree-favicon-transparent.png",
      backgroundURL:
        "https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
    };
  },

  methods: {
    resetPassword: function () {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => (this.email = ""))
        .then(() => alert("Please check your email"))
        .catch(() => alert("Invalid email"));
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
</style>
