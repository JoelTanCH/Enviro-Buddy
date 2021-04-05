<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img id="logo" v-bind:src="logoURL" />
        </b-col>
        <b-col>
          <h1>Log In</h1>

          <b-form>
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
          </b-form>

          <b-button class="button" v-on:click="userLogin"> Log In </b-button><br /><br />
          <b-button variant="text" class="textButton" v-on:click="routeForgotPw">
            Forgot Password? </b-button
          ><br />
          <span>Don't have an account?</span>
          <b-button variant="text" class="textButton" v-on:click="routeSignUp"
            >Sign Up</b-button
          >
        </b-col>
      </b-row>
    </b-container>
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
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpYToeTlE4lcmsSPc7e18gnrH9xnf3HGCrGOl9qOP4ez8ziM2-ROBNAc-T6cESI7V_btc&usqp=CAU",
    };
  },
  methods: {
    routeSignUp: function () {
      this.$router.push({ path: "/sign-up" });
    },
    routeForgotPw: function () {
      this.$router.push({path: "/forgot-password"})
    },
    userLogin: function () {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => firebase.auth().signInWithEmailAndPassword(this.email, this.password))
      .then(() => {
        if (firebase.auth().currentUser.emailVerified) {
          this.email = "";
          this.password = "";
          this.$router.push({path: "/mkt-category"})
        } else {
          alert("Email is not verified")
        }
      }).catch(() => alert("Invalid email/password"))
    },
  },
};
</script>

<style scoped>
#logo {
  width: 70%;
  align-items: center;
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
  font-size: 16px;
  color: #e48257;
  font-weight: bold;
}
</style>
