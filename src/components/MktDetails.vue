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

          <b-button
            class="button"
            v-b-modal.modalItem
            v-on:click="sendOrder(item)"
            >Add to Cart</b-button
          >
          <b-modal id="modalItem" @show="onShow" ok-only>
            <template #modal-header="{}">
              <p>Note:</p>
            </template>
            <template #default="{}">
              <p>Your order has been placed!</p>
            </template>
            <template #modal-footer="{}">
              <b-button
                variant="outline-secondary"
                block
                v-on:click="$router.push('mkt-category')"
                >Continue Shopping</b-button
              >
              <b-button
                variant="success"
                block
                v-on:click="$router.push('mkt-cart')"
                >View Cart</b-button
              >
            </template>
          </b-modal>
          <b-button class="button" href="/mkt-cart">View Cart</b-button>
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
      success: false,
      itemid: "",
      exist: false,
      existingOrders: [],
    };
  },
  components: {
    qtyCounter: QtyCounter,
  },
  methods: {
    fetchItems: function () {
      this.itemid = this.$route.params.itemid;
      // console.log(itemid);
      var collectionName = this.$route.params.collectionName;
      // console.log(collectionName);
      var subCollectionName = this.$route.params.subCollectionName;
      // console.log(subCollectionName);

      database
        .collection(collectionName)
        .doc(subCollectionName)
        .collection("items")
        .doc(this.itemid)
        .get()
        .then((snapshot) => (this.item = snapshot.data()));

      //get existing orders belonging to user
      database
        .collection("users")
        .doc("jaredtin98@gmail.com")
        .collection("orders")
        .get()
        .then((snapshot) => {
          let order = [];
          snapshot.forEach((doc) => {
            order = doc.data();
            order.id = doc.id;
            this.existingOrders.push(order);
          });
        });
    },
    updateCounter: function (count) {
      this.counter = count;
    },
    sendOrder: function () {
      //create new item arr to store all info except description
      if (this.counter > 0) {
        //check if item already exists in the user's orders
        this.exist = false;
        for (let i = 0; i < this.existingOrders.length; i++) {
          var order = this.existingOrders[i];
          if (this.itemid == order.itemid) { //order for item already exists, update counter
            var newQty = this.counter + order.quantity;

            database
              .collection("users")
              .doc("jaredtin98@gmail.com")
              .collection("orders")
              .doc(order.id)
              .update({ quantity: newQty });
            this.exist = true;
            break;
          }
        }

        if (this.exist == false) {
          //item does not exist in orders, add item
          var orderItem = {};
          orderItem["name"] = this.item.name;
          orderItem["price"] = this.item.price;
          orderItem["quantity"] = this.counter;
          orderItem["img"] = this.item.img;
          orderItem["itemid"] = this.itemid; //mkt-details id

          //need to change code below to match user's id
          database
            .collection("users")
            .doc("jaredtin98@gmail.com")
            .collection("orders")
            .add(orderItem);
        }

        this.success = true;
        //reset counter
        this.counter = 0;
      } else {
        alert("Quantity cannot be 0. Please try again.");
      }
    },
    onShow: function (a) {
      if (!this.success) {
        a.preventDefault();
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