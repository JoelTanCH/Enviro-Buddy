<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <input
           type="file"
           style="display:none" 
           ref="fileInput"
           accept="image/*"
           @change="onFilePicked" 
            > 
          <img id="imageURL" alt="Preview of Selected Image">
        </b-col>
        <!--Can delete this entire b-col. just code to view files from the database-->
        <b-col>
          <b-button type="submit" ref="checker" variant="secondary" v-on:click="view">url from database</b-button>
        </b-col>
        <!-- delete till here-->
        <b-col>
          <h1>Add Listing</h1>

          <b-form>
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
            <b-button @click="onPickFile">Choose Image</b-button>
            <b-button type="submit" variant="secondary" v-on:click="addItem"
              >Submit</b-button
            >
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
      img: null,
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
    onPickFile(){
      this.$refs.fileInput.click();
    },
    onFilePicked: function(event){
      const files = event.target.files
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        document.getElementById('imageURL').src = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.img = files[0]
    },
    view: function(){
      var storageRef = firebase.storage().ref();
      storageRef.child('marketplace/Decor/cat').getDownloadURL().then((url) =>
        alert(url)
      )
      //storageRef.child('marketplace/' + this.category + '/' + this.item.name).getDownloadURL().then((url) => alert(url))
    },
    addItem: function () {
      if (
        this.item.name.length == 0 ||
        this.item.price == 0 ||
        this.item.description == 0 ||
        this.category.length == null
      ) {
        alert("please fill in required details");
      } 
      else if (this.img == null){
        alert("please upload an image");
      } 
      else {
         firebase.storage().ref('marketplace/' + this.category+ '/' + this.item.name).put(this.img)
         alert('end storing')
        var collectionName = "mkt-categories";
        var subCollectionName = this.category.toLowerCase();
        database
          .collection(collectionName)
          .doc(subCollectionName)
          .collection("items")
          .add(this.item);

        alert(this.item.name + " saved to database")
 //       this.$refs.checker.click()
      }
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
