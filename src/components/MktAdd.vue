<template>
  <div>
    <b-container>
      <b-row>
        <b-col>Ask user to upload picture here</b-col>

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
                v-model="item.category"
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

            <b-button
              type="submit"
              variant="secondary"
              v-on:click="addItem"
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
        category: "Category",
        price: 0,
        description: "",
      },
      marketplaceCategories: [
        // { text: "Select One", value: null },
        "Fashion",
        "Decor",
        "Furniture",
        "Jewellery",
      ],
    };
  },
  methods: {
    addItem: function () {
      var collectionName = "mkt-listing-" + this.item.category;
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
