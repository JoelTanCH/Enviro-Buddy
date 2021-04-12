<template>
  <div id="main">
    <b-container>
      <b-row>
        <b-col>
          <img id="logo" v-bind:src="logoURL" />
        </b-col>
        <b-col>
          <h1>Sign Up</h1> <br>

          <b-form>
            <b-form-input
              class="inputField"
              type="text"
              placeholder="Username"
              required
              v-model='username'
            >
            </b-form-input>
            <b-form-input
              class="inputField"
              type="text"
              placeholder="Email"
              required
              v-model='email'
            >
            </b-form-input>
            <b-form-input
              class="inputField"
              type="password"
              placeholder="Password"
              required
              v-model='password'
            >
            </b-form-input>
            <!-- include check for password here -->
            <b-form-input
              class="inputField"
              type="password"
              placeholder="Confirm Password"
              required
              v-model='confirmPassword'
            >
            </b-form-input>
          </b-form>

          <b-button class="button" v-on:click="createUser" variant = "outline-success"> Register </b-button><br>
          <span>Already have an account?</span>
          <b-button variant="text" class="textButton" v-on:click="routeLogin"
            >Log In</b-button>
          
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      username:"",
      email: "",
      password: "",
      confirmPassword: "",
      usernameTaken: false,
      logoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpYToeTlE4lcmsSPc7e18gnrH9xnf3HGCrGOl9qOP4ez8ziM2-ROBNAc-T6cESI7V_btc&usqp=CAU",
    };
  },
  methods: {
    routeLogin: function () {
      this.$router.push({ path: "/login" });
    },

    routeRegister: function() {
      this.$router.push({path: '/confirm-signup'})
    },

    createUser: function() {   
      if (this.password != this.confirmPassword) {
        alert("Passwords do not match");
      } else if (this.username == "") {
        alert("Invalid username");
      } else {
        database.collection("users").get().then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
          var data = doc.data();
            if (data.username == this.username) {
              this.usernameTaken = true;
            }
          })
        }).then(() => {
          if (this.usernameTaken) {
            alert("This username has been taken");
            this.usernameTaken = false;
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(() => firebase.auth().currentUser.sendEmailVerification())
            .then(() => database.collection("users").doc(this.email).set({
              username: this.username}))
            .then(() => {
              this.username = "";
              this.email = "";
              this.password = "";
              this.confirmPassword = ""; 
              this.usernameTaken = false;
              this.routeRegister();})        
            .catch(err => alert(err.message))
          }
        })
      }  
    },
  },
};
</script>

<style scoped>
#logo {
  width: 70%;
  align-items: center;
}
h1 {
  margin-top: 25px;
}
.inputField {
  font-size: 16px;
  margin: 10px;
}
span {
  font-size: 16px;
  color: #393232;
}
.textButton {
  margin-top:-3px;
  margin-left:-7px;
  font-size: 16px;
  color: #e48257;
  font-weight: bold;
}
</style>

