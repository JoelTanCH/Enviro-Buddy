<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="details.img" />
        </b-col>
        <b-col>
          <h2>{{ details.name }}</h2>
          <h3>$ {{ details.price }}</h3>
          <p>{{ details.description }}</p>
          <br /><br />
          <b-button>Add to Cart</b-button>
          <b-button>View Cart</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      details: {},
    };
  },
  methods: {
    fetchItems: function () {
      var itemid = this.$route.params.itemid;
      var collectionName = this.$route.params.collectionName;

      database
        .collection(collectionName)
        .doc(itemid)
        .get()
        .then((snapshot) => (this.details = snapshot.data()));
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
img {
  height: 500px;
  overflow: hidden;
}
</style>