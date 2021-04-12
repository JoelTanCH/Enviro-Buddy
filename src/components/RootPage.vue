<template>
  <div>
    <div id="content">
      <img id="logo" v-bind:src="logoURL" />
      <h1>Enviro Buddy</h1>
      <h6>{{ description }}</h6>
      <b-button
        class="button"
        v-on:click="routeSignUp"
        variant="outline-success"
      >
        Sign Up
      </b-button>
      <br />
      <b-button
        class="button"
        v-on:click="routeLogin"
        variant="outline-success"
      >
        Login
      </b-button>
    </div>
    <img
      id="bg-img"
      src="https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoURL:
        "https://peppertreevenue.co.za/wp-content/uploads/2019/04/pepper-tree-favicon-transparent.png",
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
  font-family: "helvetica";
}
h6 {
  color: #393232;
  font-family: "candara";
  font-style: oblique;
}
.button {
  font-size: 16px;
  color: #f2edd7;
  margin: 7px;
  width: 240px;
  background-color: #3a6351;
}
#content {
  float: left;
}
#bg-img {
  opacity: 0.5;
  top: 0;
  left: 0;
  position: absolute;
  z-index: -1;
  width: 100%;
}
</style>
