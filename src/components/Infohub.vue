<template>
    <div>
        <div style="position: absolute; right: 80px;"> Add your ideas </div> <br> <br>
    
    <b-row>
    <h1> Crafts </h1> <br><br>

    <div class ="wrapper">
        <ul
        v-for="category in craftsList"
        v-bind:key="category.name"
      >
        <h2>{{ category.name }}</h2>
        <img v-bind:src="category.img" />
        <hr> 
        <b-button v-bind:categoryName="category.name" v-on:click="route($event)">
          View 
        </b-button>
        </ul>
    </div><br>
    </b-row><br>
    <b-row>
    <h1> Workshop </h1><br><br>

    <div class ="wrapper">
        <ul
        v-for="category in workshopList"
        v-bind:key="category.name"
      >
        <h2>{{ category.name }}</h2>
        <img v-bind:src="category.img" />
        <hr> 
        <b-button v-bind:categoryName="category.name" v-on:click="route($event)">
          View 
        </b-button>
        </ul>
    </div><br>
    </b-row><br>
    
    <b-row>
    <h1> Outside </h1><br><br>
    <div class ="wrapper">
        <ul
        v-for="category in outsideList"
        v-bind:key="category.name"
      >
        <h2>{{ category.name }}</h2>
        <img v-bind:src="category.img" />
        <hr> 
        <b-button v-bind:categoryName="category.name" v-on:click="route($event)">
          View 
        </b-button>
        </ul>
    </div><br>
    </b-row>
    </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      categoryList: [],
      craftsList: [],
      workshopList:[],
      outsideList:[]
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("info-categories")
        .doc("crafts")
        .collection("items")
        .get()
        .then((querySnapShot) => {
          let category = {};
          querySnapShot.forEach((doc) => {
            category = doc.data();
            category.id = doc.id;
            console.log(category);
            this.craftsList.push(category);
          });
        });
    database
        .collection("info-categories")
        .doc("workshop")
        .collection("items")
        .get()
        .then((querySnapShot) => {
          let category = {};
          querySnapShot.forEach((doc) => {
            category = doc.data();
            category.id = doc.id;
            console.log(category);
            this.workshopList.push(category);
          });
        });
    database
        .collection("info-categories")
        .doc("outside")
        .collection("items")
        .get()
        .then((querySnapShot) => {
          let category = {};
          querySnapShot.forEach((doc) => {
            category = doc.data();
            category.id = doc.id;
            console.log(category);
            this.outsideList.push(category);
          });
        });
    },
    route: function (event) {
      this.$router.push({
        name: "info-listing",
        params: { categoryName: event.target.getAttribute("categoryName") },
      });
    },
  },
  created() {
    this.fetchItems();
    console.log(this.categoryList)
  },
};
</script>

<style scoped>
.wrapper{
    max-height:400px;
    border:0px solid #ddd;
    display:flex;
    overflow-x:auto;
}
.wrapper::-webkit-scrollbar{
    width:2;
    height:2;
}
.wrapper .item{
    min-width:400px;
    height:400px;
    line-height:400px;
    text-align:center;
    background-color: rgb(159, 241, 202); 
    margin-right:4px;
}
#categoryList {
  width: 100%;
  margin: 30px auto;
  padding: 0 5px;
  box-sizing: border-box;
  color: #393232;
}
ul {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #e48257;
  margin: 8px;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 0px solid #e48257;
  margin: 8px;
}
img {
  height: 200px;
  overflow: hidden;
}

h1{
    text-align: center;
    position:absolute; 
    left:30%;
}
</style>
