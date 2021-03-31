<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="item.img" />
        </b-col>
        <b-col>
          <h2>{{ item.name }}</h2>
          <h3>$ {{ item.price }}</h3>
          <p>{{ item.description }}</p>
          <br /><br />
          <qty-counter v-on:counter="updateCounter"></qty-counter>
          <b-button class="button" v-on:click="sendOrder(item)"
            >Add to Cart</b-button
          >
          <b-button class="button" href="../mkt-cart">View Cart</b-button>
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
      item: {},
      counter: 0,
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
        .then((snapshot) => (this.item = snapshot.data()));
    },
    updateCounter: function (count) {
      this.counter = count;
    },
    sendOrder: function () {
      //create new item arr to store all info except description
      if (this.counter > 0) {
        var orderItem = {};
        orderItem["name"] = this.item.name;
        orderItem["price"] = this.item.price;
        orderItem["quantity"] = this.counter;
        orderItem["img"] = this.item.img;

        //need to change code below to match user's id
        database
          .collection("users")
          .doc("jaredtin98@gmail.com")
          .collection("orders")
          .add(orderItem);

        alert("Your order has been placed!");
        //reset counter
        this.counter = 0;
      } else {
        alert("Quantity cannot be 0. Please try again.")
      }
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