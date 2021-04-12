<template>
  <div id="main">
    <div id="content">
      <img id="logo" v-bind:src="logoURL" />
      <h1>Registration Successful</h1>
      <div>
        An email verification has been sent! <br />
        Please verify your email before logging in.
      </div>

      <b-button class="button" v-bind:href="login" variant="outline-success">
        Log In</b-button
      >
    </div>

    <img id="bg-img" v-bind:src="backgroundURL" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoURL:
        "https://peppertreevenue.co.za/wp-content/uploads/2019/04/pepper-tree-favicon-transparent.png",
      backgroundURL:
        "https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
    };
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