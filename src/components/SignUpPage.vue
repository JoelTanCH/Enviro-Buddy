<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img id="logo" v-bind:src="logoURL" />
        </b-col>
        <b-col>
          <h1>Sign Up</h1>

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
              placeholder="Email"
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
            <!-- include check for password here -->
            <b-form-input
              class="inputField"
              type="text"
              placeholder="Confirm Password"
              required
            >
            </b-form-input>
          </b-form>

          <b-button class="button"> Register </b-button><br /><br />
          <span>Already have an account?</span>
          <b-button variant="text" class="textButton" v-on:click="routeLogin"
            >Log In</b-button
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
    routeLogin: function () {
      this.$router.push({ path: "/login" });
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
