<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="navbar-custom">
      <b-navbar-brand href="/mkt-category" id="brand">Enviro Buddy</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- dropdown for marketplace -->
          <b-nav-item-dropdown text="Marketplace" right>
            <b-dropdown-item href="/mkt-category">Categories</b-dropdown-item>
            <b-dropdown-item href="/mkt-cart">View Cart</b-dropdown-item>
            <b-dropdown-item href="/mkt-add">Add Listing</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item href="/event-category">Events</b-nav-item>
          <b-nav-item href="/info-category">Information Hub</b-nav-item>
          <b-nav-item href="/root"> Sign Up / Login </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
#brand {
  margin: 10px;
}
.navbar-custom {
  /* background color of navbar */
  background: #3a6351;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>