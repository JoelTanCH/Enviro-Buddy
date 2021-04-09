<template>
    <div>
        <b-button id="addideas" type="submit" variant="secondary" v-on:click="show = !show"
              >Add your ideas</b-button
            > <br> <br>
        <template v-if="show">
         <b-form v-on:submit="submit"> 
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
                v-bind:options="infohubCategories"
              ></b-form-select>
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
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="secondary" on-click="submit"
              >Submit</b-button
            > <br> 
         </b-form>
        </template>

        <h2 v-else> </h2>
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
        item:{
            name:"",
            description:"",
            img:"" //add this when mktadd is done 
        },
        category:null,
        infohubCategories: ["Crafts", "Workshop", "Outside"],
        show: false,
      craftsList: [],
      workshopList:[],
      outsideList:[]
    };
  },
  methods: {
    submit: function(){
        var collectionName = "info-categories";
        var subCollectionName = this.category.toLowerCase();
        console.log(this.item)
        database
          .collection(collectionName)
          .doc(subCollectionName)
          .collection("items")
          .add(this.item);
        console.log('done')
    },
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
#addideas{
    position:absolute; 
    text-align: center;
    right:5%;
}
</style>
