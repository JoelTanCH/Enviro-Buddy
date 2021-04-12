<template>
  <div>
      <img id="logo" v-bind:src="logoURL" />
      <h1>Enviro Buddy</h1>
      <h6>{{ description }}</h6>
      <b-button class="button" v-on:click="routeSignUp" variant = "outline-success"> Sign Up </b-button> <br>
      <b-button class="button" v-on:click="routeLogin" variant = "outline-success"> Login </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpYToeTlE4lcmsSPc7e18gnrH9xnf3HGCrGOl9qOP4ez8ziM2-ROBNAc-T6cESI7V_btc&usqp=CAU",
        description: "Inspiring an Eco Lifestyle",
    };
  },
  methods: {
    routeSignUp: function () {
      this.$router.push({ path: "/sign-up" });
    },

    routeLogin: function () {
      this.$router.push({ path: "/login" });
    },
    created() {
      this.fetchLogo();
    },
  },
};
</script>

<style>

#logo {
  width: 25%;
  align-items: center;
}
h1 {
  color: #3a6351;
  font-family:'helvetica';
}
h6 {
  color: #393232;
  font-family:'candara';
  font-style:oblique;
}
.button {
  font-size: 16px;
  color: #f2edd7;
  margin: 7px;
  width: 240px;
  background-color: #3a6351;
}
</style>
