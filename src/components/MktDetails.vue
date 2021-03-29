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
          <qty-counter></qty-counter>
          <b-button class='button'>Add to Cart</b-button>
          <b-button class='button'>View Cart</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import database from "../firebase.js";
import QtyCounter from "./QtyCounter.vue";

export default {
  data() {
    return {
      details: {},
    };
  },
  components: {
    qtyCounter: QtyCounter,
  },
  methods: {
    fetchItems: function () {
      var itemid = this.$route.params.itemid;
      // console.log(itemid);
      var collectionName = this.$route.params.collectionName;
      // console.log(collectionName);
      var subCollectionName = this.$route.params.subCollectionName;
      // console.log(subCollectionName);

      database
        .collection(collectionName)
        .doc(subCollectionName)
        .collection("items")
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
  width: 300px;
  height: 90%;  
  object-fit: contain;
}
.button {
  margin: 10px;
}
</style>