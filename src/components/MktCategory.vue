<template>
  <div id="categoryList">
    <ul>
      <li v-for="category in categoryList" v-bind:key="category.name">
        <div id="categoryName">{{ category.name }}</div>
        <img v-bind:src="category.img" /><br><br>
        <b-button
          v-bind:categoryName="category.name"
          v-on:click="$router.push('mkt-listing/' + category.name.toLowerCase())"
        >
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
        .collection("mkt-categories")
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
  text-align: center;
  padding: 1%;
  border: 1px solid #e48257;
  margin: 1%;
  width: 23%;
}
img {
  height: 200px;
  overflow: hidden;
}
#categoryName {
  color: #393232;
  font-weight: bold;
  font-size: 32px;
  max-height: 50px;
  overflow: hidden;
}
</style>