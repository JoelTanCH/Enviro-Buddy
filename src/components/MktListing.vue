<template>
  <div>
    <b-form-input
      v-on:keyup.enter="search_text()"
      v-model="search.text"
      type="text"
      placeholder="Search by Name"
    ></b-form-input>

    <div class="items" v-show="search.text == ''">
      <ul>
        <li v-for="item in itemList" v-bind:key="item.name">
          <h2>{{ item.name }}</h2>
          <img v-bind:src="item.img" />
          <p>$ {{ item.price }}</p>
          <hr />
          <b-button
            v-bind:itemid="item.id"
            v-bind:collectionName="collectionName"
            v-on:click="route($event)"
          >
            Details
          </b-button>
        </li>
      </ul>
    </div>

    <div class="items" v-show="search.text != ''">
      <ul>
        <li v-for="item in searchList" v-bind:key="item.name">
          <h2>{{ item.name }}</h2>
          <img v-bind:src="item.img" />
          <p>$ {{ item.price }}</p>
          <hr />
          <b-button
            v-bind:itemid="item.id"
            v-bind:collectionName="collectionName"
            v-on:click="route($event)"
          >
            Details
          </b-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      itemList: [],
      searchList: [], //list of matching items based on doc id in searchItemID
      searchItemID: [], //list of doc ids
      collectionName: "",
      search: {
        text: "",
      },
    };
  },
  methods: {
    fetchItems: function () {
      this.collectionName = "mkt-listing-" + this.$route.name;
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
        params: {
          itemid: event.target.getAttribute("itemid"),
          collectionName: event.target.getAttribute("collectionName"),
        },
      });
    },
    search_text: function () {
      //reset searchlist
      this.searchList = [];

      // console.log(this.search.text);
      // console.log(this.collectionName);
      // var searchText = this.search.text.toLowerCase();
      var searchText = this.search.text.toLowerCase();
      var collection = database.collection(this.collectionName);

      collection.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          var itemName = doc.data().name.toLowerCase();
          // console.log(itemName);
          if (itemName.includes(searchText)) { //need to change includes function 
            // console.log(doc.id);
            this.searchItemID.push(doc.id);
          }
        });
      });

      for (var i = 0; i < this.searchItemID.length; i++) {
        var id = this.searchItemID[i];
        console.log("id:", id);

        collection
          .doc(id)
          .get()
          .then((item) => {
            this.searchList.push(item.data());
            // console.log(item.data());
          });
      }

      //reset the searchItemID array
      this.searchItemID = [];
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
.items {
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