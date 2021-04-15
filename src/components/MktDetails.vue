<template>
  <body>
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
            <h3>Quantity Sold: {{ item.quantitySold }}</h3>
            <br /><br />
            <qty-counter v-on:counter="updateCounter"></qty-counter>

            <b-button
              class="button"
              v-b-modal.modalItem
              v-on:click="sendOrder(item)"
              >Add to Cart</b-button
            >
            <b-modal id="modalItem" @show="onShow" hide-footer hide-header>
              <p>Your order has been placed!</p>

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
            </b-modal>
            <b-button class="button" href="/mkt-cart">View Cart</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </body>
</template>

<script>
import database from "../firebase.js";
import QtyCounter from "./QtyCounter.vue";
import firebase from "firebase/app";
import "firebase/auth";

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

      let currentUser = firebase.auth().currentUser;

      database
        .collection(collectionName)
        .doc(subCollectionName)
        .collection("items")
        .doc(this.itemid)
        .get()
        .then((snapshot) => {
          this.item = snapshot.data();
          console.log(this.item);
        });

      //get existing orders belonging to user
      database
        .collection("users")
        .doc(currentUser.email)
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
      let currentUser = firebase.auth().currentUser;
      //create new item arr to store all info except description
      if (this.counter > 0) {
        //check if item already exists in the user's orders
        this.exist = false;
        for (let i = 0; i < this.existingOrders.length; i++) {
          var order = this.existingOrders[i];
          if (this.itemid == order.itemid) {
            //order for item already exists, update counter
            var newQty = this.counter + order.quantity;
            database
              .collection("users")
              .doc(currentUser.email)
              .collection("orders")
              .doc(order.id)
              .update({
                quantity: newQty,
              });

            this.exist = true;
            break;
          }
        }

        if (this.exist == false) {
          // //item does not exist in orders, add item
          // var orderItem = {};
          // orderItem["name"] = this.item.name;
          // orderItem["price"] = this.item.price;
          // orderItem["quantity"] = this.counter;
          // orderItem["img"] = this.item.img;
          // orderItem["itemid"] = this.itemid; //mkt-details id
          // orderItem["category"] = this.item.category;
          // orderItem["email"] = this.item.email; //error cos undefined
          // console.log("email: " + this.item.email)
          // orderItem["userdocRef"] = this.item.userdocRef; // error

          //need to change code below to match user's id
          database
            .collection("users")
            .doc(currentUser.email)
            .collection("orders")
            .add({
              name: this.item.name,
              price: this.item.price,
              quantity: this.counter,
              img: this.item.img,
              itemid: this.itemid, //mkt-details id
              category: this.item.category,
              email: this.item.email, //error
              userdocRef: this.item.userdocRef, // error
            });
        }
        console.log("error ends here");
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
body {
  background-color: #f2edd7;
}
img {
  width: 100%;
  height: 70vh;
  object-fit: cover;
}
.button {
  margin: 10px;
}
</style>