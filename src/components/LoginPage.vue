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
              placeholder="Username"
              required
            >
            </b-form-input>
            <b-form-input
              class="inputField"
              type="text"
              placeholder="Password"
              required
            >
            </b-form-input>
          </b-form>

          <b-button class="button"> Log In </b-button><br /><br />
          <b-button variant="text" class="textButton">
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
export default {
  data() {
    return {
      logoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpYToeTlE4lcmsSPc7e18gnrH9xnf3HGCrGOl9qOP4ez8ziM2-ROBNAc-T6cESI7V_btc&usqp=CAU",
    };
  },
  methods: {
    routeSignUp: function () {
      this.$router.push({ path: "/sign-up" });
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
