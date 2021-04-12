<template>
  <div>
    <b-button
      id="addideas"
      type="submit"
      variant="secondary"
      v-on:click="show = !show"
      >Add your ideas</b-button
    >
    <br />
    <br />
    <template v-if="show">
      <b-form v-on:submit="submit">
        <b-form-group
          id="username"
          label="Username"
          label-for="user-name-input"
        >
          <b-form-input
            id="username"
            v-model="item.username"
            type="text"
            placeholder="Enter username"
          ></b-form-input>
        </b-form-group>
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
        >
        <br />
      </b-form>
    </template>

    <h2 v-else></h2>
    <b-row>
      <h1>Crafts</h1>
      <div id="searchbar-container">
        <b-form-input
          v-on:keyup.enter="crafts_search_text()"
          v-model="craftsSearch.text"
          type="text"
          placeholder="Looking for something?"
        ></b-form-input>
      </div>
      <br /><br />

      <div v-if="craftsSearchList == null">
        <div v-if="craftsSearch.text == ''">
          <div class="wrapper">
            <ul v-for="category in craftsList" v-bind:key="category.name">
              <div class="top-box">
                <div class="username">{{ category.username }}</div>
                <div class="itemName">{{ category.name }}</div>
              </div>

              <img v-bind:src="category.img" />
              <hr />
              <b-button
                v-bind:categoryName="category.name"
                v-on:click="route($event)"
              >
                View
              </b-button>
            </ul>
          </div>
        </div>
        <div v-else>Press Enter to Search.</div>
      </div>

      <div v-else>
        <div v-if="this.craftsSearchList.length == 0">
          No matching results.<br />
          Try another search?
        </div>
        <div v-else-if="this.craftsSearchList.length > 0">
          <div>{{ this.craftsSearchList.length }} item(s) found</div>
          <div class="wrapper">
            <ul v-for="category in craftsSearchList" v-bind:key="category.name">
              <div class="top-box">
                <div class="username">{{ category.username }}</div>
                <div class="itemName">{{ category.name }}</div>
              </div>

              <img v-bind:src="category.img" />
              <hr />
              <b-button
                v-bind:categoryName="category.name"
                v-on:click="route($event)"
              >
                View
              </b-button>
            </ul>
          </div>
        </div>
      </div> </b-row
    ><br />

    <b-row>
      <h1>Workshop</h1>
      <div id="searchbar-container">
        <b-form-input
          v-on:keyup.enter="workshop_search_text()"
          v-model="workshopSearch.text"
          type="text"
          placeholder="Looking for something?"
        ></b-form-input>
      </div>
      <br /><br />

      <div v-if="workshopSearchList == null">
        <div v-if="workshopSearch.text == ''">
          <div class="wrapper">
            <ul v-for="category in workshopList" v-bind:key="category.name">
              <div class="top-box">
                <div class="username">{{ category.username }}</div>
                <div class="itemName">{{ category.name }}</div>
              </div>
              <img v-bind:src="category.img" />
              <hr />
              <b-button
                v-bind:categoryName="category.name"
                v-on:click="route($event)"
              >
                View
              </b-button>
            </ul>
          </div>
        </div>
        <div v-else>Press Enter to Search.</div>
      </div>
      <div v-else>
        <div v-if="this.workshopSearchList.length == 0">
          No matching results.<br />
          Try another search?
        </div>
        <div v-else-if="this.workshopSearchList.length > 0">
          <div>{{ this.workshopSearchList.length }} item(s) found</div>
          <div class="wrapper">
            <ul
              v-for="category in workshopSearchList"
              v-bind:key="category.name"
            >
              <div class="top-box">
                <div class="username">{{ category.username }}</div>
                <div class="itemName">{{ category.name }}</div>
              </div>

              <img v-bind:src="category.img" />
              <hr />
              <b-button
                v-bind:categoryName="category.name"
                v-on:click="route($event)"
              >
                View
              </b-button>
            </ul>
          </div>
        </div>
      </div> </b-row
    ><br />

    <b-row>
      <h1>Outside</h1>
      <div id="searchbar-container">
        <b-form-input
          v-on:keyup.enter="outside_search_text()"
          v-model="outsideSearch.text"
          type="text"
          placeholder="Looking for something?"
        ></b-form-input>
      </div>
      <br /><br />

    <div v-if="outsideSearchList == null">
      <div v-if="outsideSearch.text == ''">
      <div class="wrapper">
        <ul v-for="category in outsideList" v-bind:key="category.name">
          <div class="top-box">
            <div class="username">{{ category.username }}</div>
            <div class="itemName">{{ category.name }}</div>
          </div>
          <img v-bind:src="category.img" />
          <hr />
          <b-button
            v-bind:categoryName="category.name"
            v-on:click="route($event)"
          >
            View
          </b-button>
        </ul>
      </div>
      </div>
      <div v-else>Press Enter to Search.</div>
      </div>
    <div v-else>
        <div v-if="this.outsideSearchList.length == 0">
          No matching results.<br />
          Try another search?
        </div>
        <div v-else-if="this.outsideSearchList.length > 0">
          <div>{{ this.outsideSearchList.length }} item(s) found</div>
          <div class="wrapper">
            <ul
              v-for="category in outsideSearchList"
              v-bind:key="category.name"
            >
              <div class="top-box">
                <div class="username">{{ category.username }}</div>
                <div class="itemName">{{ category.name }}</div>
              </div>

              <img v-bind:src="category.img" />
              <hr />
              <b-button
                v-bind:categoryName="category.name"
                v-on:click="route($event)"
              >
                View
              </b-button>
            </ul>
          </div>
        </div>
    </div></b-row>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      item: {
        username: "",
        name: "",
        description: "",
        img: "", //add this when mktadd is done
      },
      craftsSearch:{
        text:"",        
      },
      workshopSearch:{
        text:"",        
      },
      outsideSearch: {
        text: "",
      },
      category: null,
      infohubCategories: ["Crafts", "Workshop", "Outside"],
      show: false,
      craftsList: [],
      workshopList: [],
      outsideList: [],
      craftsSearchList: null,
      workshopSearchList: null,
      outsideSearchList: null,
    };
  },
  methods: {
    outside_search_text: function () {
      //reset searchlist
      this.outsideSearchList = [];
      var searchText = this.outsideSearch.text.toLowerCase();

      for (var i = 0; i < this.outsideList.length; i++) {
        if (this.outsideList[i].name.toLowerCase().includes(searchText)) {
          this.outsideSearchList.push(this.outsideList[i]);
        }
      }
    },
    workshop_search_text: function () {
      //reset searchlist
      this.workshopSearchList = [];
      var searchText = this.workshopSearch.text.toLowerCase();

      for (var i = 0; i < this.workshopList.length; i++) {
        if (this.workshopList[i].name.toLowerCase().includes(searchText)) {
          this.workshopSearchList.push(this.workshopList[i]);
        }
      }
    },
    crafts_search_text: function () {
      //reset searchlist
      this.craftsSearchList = [];
      var searchText = this.craftsSearch.text.toLowerCase();

      for (var i = 0; i < this.craftsList.length; i++) {
        console.log(this.craftsList[i]);
        if (this.craftsList[i].name.toLowerCase().includes(searchText)) {
          this.craftsSearchList.push(this.craftsList[i]);
        }
      }
    },
    submit: function () {
      var collectionName = "info-categories";
      var subCollectionName = this.category.toLowerCase();
      console.log(this.item);
      database
        .collection(collectionName)
        .doc(subCollectionName)
        .collection("items")
        .add(this.item);
      console.log("done");
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
    console.log(this.categoryList);
  },
};
</script>

<style scoped>
.wrapper {
  max-height: 400px;
  border: 0px solid #ddd;
  display: flex;
  overflow-x: auto;
}
.wrapper::-webkit-scrollbar {
  width: 2;
  height: 2;
}
.wrapper .item {
  min-width: 400px;
  height: 400px;
  line-height: 400px;
  text-align: center;
  background-color: rgb(159, 241, 202);
  margin-right: 4px;
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

h1 {
  position: absolute;
  left: 35%;
}
#addideas {
  position: absolute;
  text-align: center;
  right: 5%;
}
#searchbar-container {
  width: 31.3%;
  margin-right: 1%;
  margin-left: 55%;
}
.itemName {
  color: #393232;
  font-size: 24px;
  max-height: 32px;
  overflow: hidden;
  text-align: center;
}
.username {
  color: #e48257;
}
.top-box {
  background-color: #f2edd7;
  font-weight: bold;
  text-align: left;
  margin: 5px;
  padding-left: 10px;
}
</style>
