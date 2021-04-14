<template>
  <body>
    <div id="mainContainer">
      <b-row>
        <b-col>
          <b-container id="leftContainer">
            <table class="table table-bordered border border-dark">
              <tbody>
                <tr v-for="product in itemList" v-bind:key="product.id">
                  <td>
                    <div>
                      <b-button
                        class="button"
                        v-on:click="deleteItem(product.id)"
                        variant="danger"
                      >
                        Remove
                      </b-button>

                      <div class="item">
                        {{ product.name }}
                      </div>

                      <img v-bind:src="product.img" />

                      <div class="item">
                        Quantity:
                        <b-form>
                          <b-form-input
                            class="input"
                            type="number"
                            v-model.number="product.quantity"
                            :min="1"
                            v-on:change="
                              updateQuantity(product.id, product.quantity)
                            "
                          >
                          </b-form-input>
                        </b-form>
                      </div>

                      <div class="item">
                        Total Price: ${{
                          (product.price * product.quantity).toFixed(2)
                        }}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-container>
        </b-col>

        <b-col>
          <b-container id="rightContainer">
            <table class="table table-bordered border border-dark">
              <tbody>
                <tr>
                  <td>SUBTOTAL</td>
                  <td>${{ this.getSubtotal().toFixed(2) }}</td>
                </tr>
                <tr>
                  <td>SHIPPING</td>
                  <td>${{ this.getShipping().toFixed(2) }}</td>
                </tr>
                <tr>
                  <td>GRAND TOTAL</td>
                  <td>${{ grandTotal.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>

            <b-button
              class="checkOut"
              variant="success"
              v-on:click="addtoPurchaseHistory"
            >
              Check Out
            </b-button>
          </b-container>
        </b-col>
      </b-row>
    </div>
  </body>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      itemList: [],
      subtotal: 0,
      shipping: 0,
      grandTotal: 0,
    };
  },
  methods: {
    fetchItems: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          database
            .collection("users")
            .doc(user.email)
            .collection("orders")
            .get()
            .then((querySnapshot) => {
              let item = {};
              querySnapshot.forEach((doc) => {
                item = doc.data();
                item.id = doc.id;
                this.itemList.push(item);
              });
            });
        } else {
          console.log("Error");
        }
      });
    },

    updateQuantity: function (itemID, newQuantity) {
      let currentUser = firebase.auth().currentUser;
      database
        .collection("users")
        .doc(currentUser.email)
        .collection("orders")
        .doc(itemID)
        .update({
          quantity: newQuantity,
        });
    },

    deleteItem: function (itemID) {
      let currentUser = firebase.auth().currentUser;
      database
        .collection("users")
        .doc(currentUser.email)
        .collection("orders")
        .doc(itemID)
        .delete()
        .then(() => location.reload());
    },

    getSubtotal: function () {
      var total = 0;
      for (var product of this.itemList) {
        var amount = product.quantity * product.price;
        total += amount;
      }
      this.subtotal = total;
      return this.subtotal;
    },

    getShipping: function () {
      if (this.subtotal == 0) {
        return this.shipping;
      } else {
        this.shipping = 10;
        return this.shipping;
      }
    },
    addtoPurchaseHistory: function () {
      let currentUser = firebase.auth().currentUser;

      const ordersRef = database
        .collection("users")
        .doc(currentUser.email)
        .collection("orders");

    const histRef = database
        .collection("users")
        .doc(currentUser.email)
        .collection("mkt-history");

      //add to purchase history for profile page
      ordersRef.onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          histRef.add(doc.data());
        });
      });

      //clear current user's orders
      ordersRef.onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
        ordersRef.doc(doc.id).delete();
        });
      });

      //reset purchaseList and itemList
      this.purchaseList = [];
      this.itemList = [];
    },
  },

  created() {
    this.fetchItems();
  },

  watch: {
    subtotal: function () {
      this.grandTotal = this.subtotal + this.shipping;
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f2edd7;
}
#leftContainer {
  display: flex;
  align-items: top;
  justify-content: center;
}
#rightContainer {
  font-size: 16px;
}
img {
  height: 200px;
  width: 200px;
  margin-top: 3px;
  margin-right: 15px;
  display: flex;
  justify-content: left;
  float: left;
}
.item {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 16px;
}
.button {
  float: right;
  width: 90px;
}
.input {
  width: 70px;
  height: 30px;
}
</style>