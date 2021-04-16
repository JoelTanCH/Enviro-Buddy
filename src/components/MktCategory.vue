<template>
  <body>
    <div>
      <h1>Marketplace</h1>
    </div>
    <div id="categoryList">
      <ul>
        <li v-for="category in categoryList" v-bind:key="category.name">
          <img v-bind:src="category.img" />
          <div>
            <h2 id="categoryName">{{ category.name }}</h2>
          </div> 
          <b-button
            v-bind:categoryName="category.name"
            v-on:click="
              $router.push('mkt-listing/' + category.name.toLowerCase())
            "
            variant="outline-success"
          >
            SHOP NOW
          </b-button>
        </li>
      </ul>
    </div>
  </body>
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
h1 {
  color:black;
  font-family:Georgia, Verdana, sans-serif;
  font-weight:500;
  text-align: center;
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
  /*padding: 1%; */
  /*border: 1px solid #e48257;*/
  margin: 1%; /*1%*/
  width: 31.3%; /*23*/
}
img {
  height: 400px;
  width: 100%;
  object-fit:cover;
}
#categoryName {
  overflow: hidden;
  /*display: flex; */
  text-align: center;
  line-height: 1.5em;
  text-transform: uppercase;
  font-family: "Lucida Sans", sans-serif;
  font-weight:lighter;
  margin-top:2px;
  /*height: 3em; */
  /*width: 90%; */
}
</style>