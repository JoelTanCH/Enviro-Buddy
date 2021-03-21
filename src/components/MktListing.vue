<template>
  <div id="items">
    <ul>
      <li v-for="item in itemList" v-bind:key="item.name">
        <h2>{{ item.name }}</h2>
        <img v-bind:src="item.img" />
        <p>$ {{ item.price }}</p>
        <hr />
        <b-button v-bind:itemid="item.id" v-bind:collectionName="collectionName" v-on:click="route($event)">
          Details
        </b-button>
      </li>
    </ul>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      itemList: [],
      collectionName: "",
    };
  },
  methods: {
    fetchItems: function () {
      this.collectionName = "mkt-listing-" + this.$route.params.categoryName;
      this.collectionName = this.collectionName.toLowerCase();
      database
        .collection(this.collectionName)
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            item.id = doc.id;
            this.itemList.push(item);
          });
        });
    },
    route: function (event) {
      this.$router.push({
        name: "mkt-details",
        params: { itemid: event.target.getAttribute("itemid"), collectionName: event.target.getAttribute("collectionName")},
      });
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
#items {
  width: 100%;
  margin: 30px auto;
  padding: 0 5px;
  box-sizing: border-box;
  color: #393232;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #e48257;
  margin: 8px;
}
img {
  height: 200px;
  overflow: hidden;
}
</style>