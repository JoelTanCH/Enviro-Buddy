<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img id="uploadedImg" alt="Your image" />
        </b-col>

        <b-col>
          <h1>Add Listing</h1>

          <b-form v-on:submit="addItem">
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

            <!-- ask users to upload image file -->
            <input
              type="file"
              onchange="document.getElementById('uploadedImg').src = window.URL.createObjectURL(this.files[0])"
              required
            />
            <b-button type="submit" variant="secondary">Submit</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
import database from "../firebase.js";
import firebase from "firebase/app";

export default {
  data() {
    return {
      item: {
        name: "",
        price: 0,
        description: "",
        img: "", //images url
      },
      category: null,
      marketplaceCategories: ["Fashion", "Decor", "Furniture", "Jewellery"],
    };
  },
  methods: {
    blob: function () {
      var storage = firebase.app().storage("gs://enviro-buddy.appspot.com/");
      alert("blob starting");
      var blobImg = document.getElementById("uploadedImg").src; //blob
      alert("blobimg done");
      var storageRef = storage.ref();
      console.log(storageRef);
      //var storageRef = database.storage().ref()
      alert("blob storageRef done");
      var marketplacestorage = storageRef.child("marketplace");
      alert("marketplacestorage done");
      var uploadTask = marketplacestorage.child(this.category).put(blobImg);
      alert("blob uploadtask done");
      this.item.img = uploadTask.snapshot.ref.getDownloadURL();
      alert(this.item.img);
    },
    addItem: function () {
      // alert("start");
      // //var storageRef = firebase.storage().ref();
      // //var marketplaceref = storageRef.child()
      // //store the blob img into storage
      // this.blob();
      // alert("blob done");
      var collectionName = "mkt-categories";
      var subCollectionName = this.category.toLowerCase();
      console.log(subCollectionName);
      // console.log(document.getElementById("uploadedImg").src);

      // //this.item.img = document.getElementById('uploadedImg').src
      // //get the unique identifier from the storage -> pass it into this.item.img
      // alert(collectionName);
      // alert(subCollectionName);

      database
        .collection(collectionName)
        .doc(subCollectionName)
        .collection("items")
        .add(this.item);

      alert(this.item.name + " saved to database");

      //store path to redirect users to respective categories to view their new lisitng
      var newPath = "mkt-listing/" + subCollectionName;

      //reset
      this.item.name = "";
      this.item.price = 0;
      this.item.description = "";
      this.category = "";

      this.$router.push({ path: newPath });
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
