<template>
  <body>
    <div id="categoryList">
      <ul>
        <li v-for="category in categoryList" v-bind:key="category.name">
          <div>
            <h2 id="categoryName">{{ category.name }}</h2>
          </div>

          <img v-bind:src="category.img" />

          <div id="description">{{ category.description }}</div>

          <b-button
            v-bind:categoryName="category.name"
            v-on:click="
              $router.push('info-listing/' + category.name.toLowerCase())
            "
            variant="outline-danger"
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

export default {
  data() {
    return {
      categoryList: [],
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("info-categories")
        .get()
        .then((querySnapShot) => {
          let category = {};
          querySnapShot.forEach((doc) => {
            category = doc.data();
            category.id = doc.id;
            this.categoryList.push(category);
          });
        });
    }
  },
  created() {
    this.fetchItems();
  }
};
</script>


<style scoped>
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
  width: 31%;
}
img {
  height: 300px;
  width: 90%;
  object-fit: cover;
}
#categoryName {
  overflow: hidden;
  display: flex;
  line-height: 1.5em;
  height: 3em;
  width: 90%;
}
#description {
  overflow: hidden;
  display: flex;
  line-height: 1.5em;
  height: 4.5em;
  width: 90%;
}
</style>