<template>
  <div id="items">
    <ul>
      <li v-for="item in itemList" v-bind:key="item.name">
        <h2>{{ item.name }}</h2>
        <img v-bind:src="item.img" />
        <p id="description">{{ item.description }}</p>
        <hr />
        <b-button
          v-bind:itemid="item.id"
          v-bind:collectionName="collectionName"
          v-on:click="route($event)"
        >
          Sign Up
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
      this.collectionName =  this.$route.params.categoryName;
      this.collectionName = this.collectionName.toLowerCase();
      console.log(this.collectionName)
      database
        .collection("eve-categories")
        .doc(this.$route.params.categoryName.toLowerCase())
        .collection("events")
//        .collection(this.collectionName)
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            item.id = doc.id;
            this.itemList.push(item);
          });
        });
      console.log(this.itemList)
    },
    route: function (event) {
      this.$router.push({
        name: "eve-details",
        params: {
          itemid: event.target.getAttribute("itemid"),
          collectionName: event.target.getAttribute("collectionName"),
        },
      });
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
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  text-align: center;
  padding: 1%;
  border: 1px solid #e48257;
  margin: 1%;
  width: 31.3%;
}
img {
  height: 200px;
  width: 90%;
  overflow: hidden;
}
#searchbar-container {
  width: 31.3%;
  margin-right: 1%;
  margin-left: auto;
}
.price {
  color: #3a6351;
  font-weight: bold;
  font-size: 20px;
}
.top-box {
  background-color: #f2edd7;
  font-weight: bold;
  text-align: left;
  margin: 5px;
  padding-left: 10px;
}
.itemName {
  color: #393232;
  font-size: 24px;
  max-height: 32px;
  overflow: hidden;
}
.username {
  color: #e48257;
}
.description {
  justify-content: center;
  height: 40px;
  overflow: hidden;
}
</style>