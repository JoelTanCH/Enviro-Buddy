<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="placeholderURL" id="previewImage" />
        </b-col>

        <b-col>
          <h1>Add Marketplace Listing</h1>

          <b-form id="form" v-on:submit="submitForm">
            <b-row class="input-group">
              <b-col cols="4">
                <label for="item-name">Item Name</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  v-model="item.name"
                  type="text"
                  placeholder="Enter item name"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="item-category">Item Category</label>
              </b-col>
              <b-col>
                <b-form-select
                  class="right-input"
                  v-model="category"
                  v-bind:options="marketplaceCategories"
                  required
                ></b-form-select>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="item-price">Item Price</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  v-model="item.price"
                  placeholder="0"
                  type="number"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="item-description">Item Description</label>
              </b-col>
              <b-col>
                <b-form-input
                  class="right-input"
                  v-model="item.description"
                  placeholder="Enter item description"
                  type="text"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-col cols="4">
                <label for="item-image">Item Image</label>
              </b-col>
              <b-col>
                <input
                  id="fileButton"
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  v-on:change="onFilePicked"
                />
                <div id="progress-container">
                  <div>Upload status:</div>
                  <progress
                    id="uploader"
                    class="right-input"
                    value="0"
                    max="100"
                  ></progress>
                </div>
              </b-col>
            </b-row>

            <b-row class="input-group">
              <b-button
                id="submit-button"
                type="submit"
                variant="outline-success"
                >Add Listing</b-button
              >
            </b-row>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      userInfo: {},
      item: {
        username: "",
        name: "",
        price: 0,
        description: "",
        img: "", //images url
        quantitySold: 0,
        category: "",
        userdocRef: null,
        mktdocRef: null,
        email: "",
      },
      placeholderURL:
        "https://www.bkgymswim.com.au/wp-content/uploads/2017/08/image_large.png",
      category: null,
      marketplaceCategories: ["Fashion", "Decor", "Furniture", "Jewellery"],
    };
  },
  methods: {
    fetchUserInfo: function () {
      let currentUser = firebase.auth().currentUser;

      database
        .collection("users")
        .doc(currentUser.email)
        .get()
        .then((snapshot) => (this.userInfo = snapshot.data()));
    },

    onFilePicked: function (event) {
      const file = event.target.files[0];

      var uploader = document.getElementById("uploader");
      var preview = document.getElementById("previewImage");

      //create storage ref
      var storageRef = firebase
        .storage()
        .ref("marketplace/" + new Date() + "-" + file.name);

      //upload file
      var task = storageRef.put(file);

      //update progress bar
      task.on(
        "state_changed",

        function (snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = percentage;
        },

        //handle errors here
        function (error) {
          console.log(error.message);
        },

        //handle successful uploads on complete
        function () {
          task.snapshot.ref.getDownloadURL().then(function (storageURL) {
            preview.src = storageURL;
            console.log(preview.src);
          });
        }
      );
    },

    submitForm: function (event) {
      event.preventDefault();

      var preview = document.getElementById("previewImage");

      if (preview.src == this.placeholderURL) {
        //not updated yet
        alert(
          "Submission failed. Please wait for your image upload to complete."
        );
        return;
      }

      if(this.item.price < 0){
        alert("Price cannot be negative")
      }
      else{

      this.item.img = preview.src;
      this.item.username = this.userInfo.username;
      this.item.category = this.category.toLowerCase();
      let currentUser = firebase.auth().currentUser;
      this.item.email = currentUser.email;

      //add to user's "My Listings" on profile page
      database
        .collection("users")
        .doc(currentUser.email)
        .collection("my-mkt-list")
        .add(this.item)
        .then((userdocRef) => {
          this.item.userdocRef = userdocRef.id;
        })
        //add new listing to marketplace
        .then(() => {
          database
            .collection("mkt-categories")
            .doc(this.category.toLowerCase())
            .collection("items")
            .add(this.item)
            .then((mktdocRef) => {
              //update mktdocRef in users my-mkt-list for remove function
              database
                .collection("users")
                .doc(currentUser.email)
                .collection("my-mkt-list")
                .doc(this.item.userdocRef)
                .update({
                  mktdocRef: mktdocRef.id,
                })
                .then(() => {
                  // alert(this.item.mktdocRef)
                  alert("Your item has been uploaded!");
                  window.location.href =
                    "/mkt-listing/" + this.category.toLowerCase();
                });
            });
        });
      }
    },
  },
  created: function () {
    this.fetchUserInfo();
  },
};
</script>

<style scoped>
#previewImage {
  width: 40vw;
  height: 70vh;
  object-fit: contain;
}
.input-group {
  margin-top: 20px;
  width: 100%;
}
.right-input {
  width: 100%;
}
#progress-container {
  margin-top: 10px;
}
#uploader {
  background-color: green;
}
</style>
