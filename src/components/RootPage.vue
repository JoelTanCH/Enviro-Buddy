<template>
  <div>
      <img id="logo" v-bind:src="logoURL" />
      <h1>Enviro Buddy</h1>
      <h2>{{ description }}</h2>
      <b-button class="button" v-on:click="routeSignUp"> Sign Up </b-button>
      <b-button class="button" v-on:click="routeLogin"> Login </b-button>
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
  width: 20%;
  align-items: center;
}
h1 {
  color: #3a6351;
  font-size: 32px;
}
h2 {
  color: #393232;
  font-size: 20px;
}
.button {
  font-size: 16px;
  color: #f2edd7;
  margin: 5px;
}
</style>
