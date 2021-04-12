<template>
  <div id="categoryList">
    <ul>
      <li
        v-for="category in categoryList"
        v-bind:key="category.name"
      >
        <h2>{{ category.name }}</h2>
        <img v-bind:src="category.img" />
        <p>{{category.description}}</p>
        <hr> 
        <b-button v-bind:categoryName="category.name" v-on:click="route($event)">
          Browse All
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
      categoryList: [],
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("eve-categories")
        .get()
        .then((querySnapShot) => {
          let category = {};
          querySnapShot.forEach((doc) => {
            category = doc.data();
            category.id = doc.id;
            this.categoryList.push(category);
          });
        });
    },
    route: function (event) {
      this.$router.push({
        name: "eve-listing",
        params: { categoryName: event.target.getAttribute("categoryName") },
      });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
#categoryList {
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