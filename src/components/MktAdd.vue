<template>
  <div>
<img id="blah" alt="your image" width="100" height="100" />
<input type="file" onchange="document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])">    
 <b-container>
      <b-row>
        <b-col>
          <b-img v-bind:src="imgUpload"></b-img>
        </b-col>

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

            <b-form-file v-model="imgUpload" plain></b-form-file>

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

export default {
  data() {
    return {
      item: {
        name: "",
        price: 0,
        description: "",
      },
      category: "Category",
      marketplaceCategories: [
        // { text: "Select One", value: null },
        "Fashion",
        "Decor",
        "Furniture",
        "Jewellery",
      ],
      imgUpload: null,
    };
  },
  methods: {
    loadFile: function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  },
    addItem: function () {
      var collectionName = "mkt-listing-" + this.category;
      collectionName = collectionName.toLowerCase();
      console.log(collectionName);
      database.collection(collectionName).add(this.item);

      alert(this.item.name + " saved to database");

      //reset to empty string
      this.item.name = "";
      this.item.category = "";
    },
  },
};
</script>

<style scoped>
</style>
