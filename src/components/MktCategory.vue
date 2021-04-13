<template>
  <body>
    <div id="categoryList">
      <ul>
        <li v-for="category in categoryList" v-bind:key="category.name">
          <div class="top-box">
            <div class="categoryName">{{ category.name }}</div>
          </div>

          <img v-bind:src="category.img" /><br /><br />
          <b-button
            v-bind:categoryName="category.name"
            v-on:click="
              $router.push('mkt-listing/' + category.name.toLowerCase())
            "
          >
            Browse All
          </b-button>
        </li>
      </ul>
    </div>
  </body>
</template>

<script>
import database from "../firebase.js";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      categoryList: [],
    };
  },
  methods: {
    fetchItems: function () {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {

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
        } else {
            alert("fail")
        }
      })
      
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
body {
  background-color: #f2edd7;
}
#categoryList {
  width: 100%;
  margin: 30px auto;
  padding: 0 5px;
  box-sizing: border-box;
  color: #393232;
  min-height: 80%;
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
  width: 90%;
  object-fit: cover;
}
.categoryName {
  color: #393232;
  font-size: 24px;
  max-height: 32px;
  overflow: hidden;
}
</style>