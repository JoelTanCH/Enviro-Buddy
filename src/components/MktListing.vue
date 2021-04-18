<template>
<body>
  <div>
    <div class = "topContainer">
      <h2 class = 'title'> Markeplace </h2>
      <div id="searchbar-container">
        <b-form-input
          v-on:keyup.enter="search_text()"
          v-model="search.text"
          type="text"
          placeholder="Looking for something?"
        ></b-form-input>
      </div>
    </div>
    <h2 class = 'subtitle'> {{this.subCollectionName}} </h2>

    <div v-if="searchList == null">
      <div v-if="search.text == ''">
        <ul>
          <li v-for="item in itemList" v-bind:key="item.name">
            <img v-bind:src="item.img" />
            <h4 class="itemName">{{ item.name }}</h4>
            <div class="price">${{ item.price }}</div>
            <div class="username">By {{ item.username }}</div> <br>
            
            <div>
              <b-button
                v-bind:itemid="item.id"
                v-bind:collectionName="collectionName"
                v-bind:subCollectionName="subCollectionName"
                v-on:click="route($event)"
                variant="outline-success"
              >
                Details
              </b-button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class = "searchOutput">Press Enter to search</div>
    </div>

    <div v-else>
      <div v-if="this.searchList.length == 0" class = "searchOutput">
        No matching results. Try another search?
      </div>
      <div v-else-if="this.searchList.length > 0">
        <div class = 'searchOutput'>{{ this.searchList.length }} item(s) found</div>
        <ul>
          <li v-for="item in searchList" v-bind:key="item.name">
            <img v-bind:src="item.img" />
            <h4 class="itemName">{{ item.name }}</h4>
            <div class="price">${{ item.price }}</div>
            <div class="username">By {{ item.username }}</div> <br>
            <div>
              <b-button
                v-bind:itemid="item.id"
                v-bind:collectionName="collectionName"
                v-bind:subCollectionName="subCollectionName"
                v-on:click="route($event)"
                variant="outline-success"
              >
                Details
              </b-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</body>
</template>

<script>
import database from "../firebase.js";
//import firebase from "firebase/app";

export default {
  data() {
    return {
      itemList: [],
      searchList: null,
      collectionName: "",
      subCollectionName: "",
      search: {
        text: "",
      },
    };
  },
  methods: {
    fetchItems: function () {
      this.collectionName = "mkt-categories";
      this.subCollectionName = this.$route.name.toLowerCase();

      database
        .collection(this.collectionName)
        .doc(this.subCollectionName)
        .collection("items")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            console.log(doc.data());
            item = doc.data();
            if (item.img == "") {
              item.img =
                "https://firebasestorage.googleapis.com/v0/b/enviro-buddy.appspot.com/o/placeholder.png?alt=media&token=e630e1d2-cb1b-4a36-8d33-941b3adc71c5";
            } 
            item.id = doc.id;
            this.itemList.push(item);
            console.log(item)
          });
        });
    },
    route: function (event) {
      this.$router.push({
        name: "mkt-details",
        params: {
          itemid: event.target.getAttribute("itemid"),
          collectionName: event.target.getAttribute("collectionName"),
          subCollectionName: event.target.getAttribute("subCollectionName"),
        },
      });
    },
    search_text: function () {
      //reset searchlist
      this.searchList = [];
      var searchText = this.search.text.toLowerCase();

      for (var item of this.itemList) {
        if (item.name.toLowerCase().includes(searchText)) {
          this.searchList.push(item);
        }
      }
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
.topContainer {
  display: flex;
  flex-wrap: wrap;
}
.title {
  text-align: left;
  margin-left:1%;
  overflow: hidden;
  text-transform: uppercase;
  font-family: "Lucida Sans", sans-serif;
  font-weight:lighter;
  margin-bottom:10px;
}
.subtitle {
  text-align: left;
  margin-left:1%;
  overflow: hidden;
  text-transform: uppercase;
  font-family: "Lucida Sans", sans-serif;
  font-weight:lighter;
  font-size:1.7rem;
  color:#3a6351;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  text-align: center;
  /*padding: 1%;
  border: 1px solid #e48257;*/
  margin: 1%;
  width: 31.3%;
}
img {
  height: 400px;
  width: 100%;
  object-fit: cover;
}
#searchbar-container {
  width: 31.3%;
  margin-right: 1%;
  margin-left: auto;
}
.price {
  color:#57585a;
  font-family: "FKGrotesk",Helvetica,Arial,sans-serif;
  font-size: 20px;
  width: 100%;
  text-align: left;
  margin-left: 5px;
}
.itemName {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*display: flex;*/
  line-height: 1.5em;
  height: 1.5em;
  width: 100%;
  text-align: left;
  font-family: "FKGrotesk",Helvetica,Arial,sans-serif;
  font-weight:600;
  margin-top: 5px;
  margin-left: 5px;
}
.username {
  color:#57585a;
  text-align: left;
  margin-left: 5px;
  margin-top: 5px;
  width: 100%;
  font-size: 16px;
  font-family: "FKGrotesk",Helvetica,Arial,sans-serif;
}
.searchOutput {
  display:flex;
  justify-content: center;
}
</style>