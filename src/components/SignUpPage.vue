<template>
  <div id="main">
    <div id="content">
      <img id="logo" v-bind:src="logoURL" />
      <h1>Sign Up</h1>
      <br />

      <b-form>
        <b-form-input
          class="inputField"
          type="text"
          placeholder="Username"
          required
          v-model="username"
        >
        </b-form-input>
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
        <!-- include check for password here -->
        <b-form-input
          class="inputField"
          type="password"
          placeholder="Confirm Password"
          required
          v-model="confirmPassword"
        >
        </b-form-input>
      </b-form>

      <b-button
        class="button"
        v-on:click="createUser"
        variant="outline-success"
      >
        Register </b-button
      ><br />

      <div>
        <span>Already have an account? </span>
        <a href="/login">Log In</a>
      </div>
    </div>
    <img id="bg-img" v-bind:src="backgroundURL" />
  </div>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      usernameTaken: false,
      logoURL:
        "https://peppertreevenue.co.za/wp-content/uploads/2019/04/pepper-tree-favicon-transparent.png",
      backgroundURL:
        "https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
    };
  },
  methods: {
    createUser: function () {
      if (this.password != this.confirmPassword) {
        alert("Passwords do not match");
      } else if (this.username == "") {
        alert("Invalid username");
      } else {
        database
          .collection("users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
              var data = doc.data();
              if (data.username == this.username) {
                this.usernameTaken = true;
              }
            });
          })
          .then(() => {
            if (this.usernameTaken) {
              alert("This username has been taken");
              this.usernameTaken = false;
            } else {
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => firebase.auth().currentUser.sendEmailVerification())
                .then(() =>
                  database.collection("users").doc(this.email).set({
                    username: this.username,
                    profilePic:
                      "https://www.bkgymswim.com.au/wp-content/uploads/2017/08/image_large.png",
                  })
                )
                .then(() => {
                  this.username = "";
                  this.email = "";
                  this.password = "";
                  this.confirmPassword = "";
                  this.usernameTaken = false;

                  alert("A verification link has been sent to your email");

                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      this.$router.push("/login");
                    });
                })
                .catch((err) => alert(err.message));
            }
          });
      }
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
a {
  color: #3a6351;
  font-weight: bolder;
}
a:hover {
  color: #e48257;
  text-decoration: none;
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

