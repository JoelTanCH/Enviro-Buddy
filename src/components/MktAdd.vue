<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="placeholderURL" id="previewImage"/>
        </b-col>

        <b-col>
          <h1>Add Listing</h1>

          <b-form id="form" v-on:submit="submitForm">
            <b-form-group
              id="item-name"
              label="Item Name"
              label-for="item-name-input"
            >
              <b-form-input
                id="item-name"
                v-model="item.name"
                type="text"
                placeholder="Enter item name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="item-category"
              label="Category"
              label-for="item-category-input"
            >
              <b-form-select
                id="item-category"
                v-model="category"
                v-bind:options="marketplaceCategories"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group
              id="item-price"
              label="Item Price"
              label-for="item-price-input"
            >
              <b-form-input
                id="item-price"
                v-model="item.price"
                placeholder="0"
                type="number"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="item-description"
              label="Item Description"
              label-for="item-description-input"
            >
              <b-form-input
                id="item-description"
                v-model="item.description"
                placeholder="Enter item description"
                type="text"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group>
              <b-button v-on:click="onPickFile">Upload Image</b-button>
              <input
                id="fileButton"
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                v-on:change="onFilePicked"
              />
              <progress value="0" max="100" id="uploader"></progress>
            </b-form-group>

            <b-button type="submit" variant="outline-success">Submit</b-button>
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
      },
      placeholderURL:
        "https://www.bkgymswim.com.au/wp-content/uploads/2017/08/image_large.png",
      category: null,
      marketplaceCategories: ["Fashion", "Decor", "Furniture", "Jewellery"],
    };
  },
  methods: {
    fetchUserInfo: function() {
      let currentUser = firebase.auth().currentUser;

      database
        .collection("users")
        .doc(currentUser.email)
        .get()
        .then((snapshot) => (this.userInfo = snapshot.data()))
    },

    onPickFile() {
      this.$refs.fileInput.click();
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
        function(error) {
          console.log(error.message);
        },

        //handle successful uploads on complete
        function() {
          task.snapshot.ref.getDownloadURL().then(function(storageURL) {
            preview.src = storageURL
            console.log(preview.src)
          })
        }
      );
    },

    submitForm: function (event) {
        event.preventDefault()

        var preview = document.getElementById("previewImage")

        if (preview.src == this.placeholderURL) { //not updated yet
          alert("Submission failed. Please wait for your image upload to complete.")
          return
        }
        
        this.item.img = preview.src
        this.item.username = this.userInfo.username

        let currentUser = firebase.auth().currentUser;

        //add to user's "My Listings" on profile page
        database.collection("users").doc(currentUser.email).collection("my-mkt-list").add(this.item);

        database
          .collection("mkt-categories")
          .doc(this.category.toLowerCase())
          .collection("items")
          .add(this.item)
          .then(() => {
              alert("Your item has been uploaded!")
              window.location.href = "/mkt-listing/" + this.category.toLowerCase();
            })

      //reset all fields
      //route back to mkt-categories
    },
  },
  created: function() {
    this.fetchUserInfo();
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 80%;
  object-fit: cover;
}
</style>
