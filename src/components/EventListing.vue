<template>
  <body>
    <div>
      <div id="searchbar-container">
        <b-form-input
          v-on:keyup.enter="search_text()"
          v-model="search.text"
          type="text"
          placeholder="Looking for something?"
        ></b-form-input>
      </div>
      <div v-if="searchList == null">
        <div v-if="search.text == ''">
          <ul>
            <li v-for="event in eventList" v-bind:key="event.name">
              <h2 class="eventName">{{ event.name }}</h2>
              <img v-bind:src="event.img" />
              <p class="description">{{ event.description }}</p>
              <b-button
                v-bind:eventid="event.id"
                v-bind:collectionName="collectionName"
                v-bind:subCollectionName="subCollectionName"
                v-on:click="route($event)"
              >
                Sign Up
              </b-button>
            </li>
          </ul>
        </div>
        <div v-else>Press Enter to search.</div>
      </div>
      <div v-else>
        <div v-if="this.searchList.length == 0">
          No matching results.<br />Try another search?
        </div>
        <div v-else-if="this.searchList.length > 0">
          <div>{{ this.searchList.length }} event(s) found</div>
          <ul>
            <li v-for="event in searchList" v-bind:key="event.name">
              <div class="top-box">
                <h2 class="eventName">{{ event.name }}</h2>
              </div>
              <img v-bind:src="event.img" />
              <div class="description">{{ event.description }}</div>
              <div>
                <b-button
                  v-bind:eventid="event.id"
                  v-bind:collectionName="collectionName"
                  v-bind:subCollectionName="subCollectionName"
                  v-on:click="route($event)"
                >
                  Sign Up
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

export default {
  data() {
    return {
      eventList: [],
      searchList: null,
      collectionName: "",
      subCollectionName: "",
      search: {
        text: "",
      },
    };
  },
  methods: {
    search_text: function () {
      //reset searchlist
      this.searchList = [];
      var searchText = this.search.text.toLowerCase();

      for (var event of this.eventList) {
        if (event.name.toLowerCase().includes(searchText)) {
          this.searchList.push(event);
        }
      }
    },
    fetchItems: function () {
      this.collectionName = "eve-categories";
      this.subCollectionName = this.$route.name.toLowerCase();

      database
        .collection(this.collectionName)
        .doc(this.subCollectionName)
        .collection("events")
        .get()
        .then((querySnapShot) => {
          let event = {};
          querySnapShot.forEach((doc) => {
            console.log(doc.data());
            event = doc.data();
            if (event.img == "") {
              event.img =
                "https://firebasestorage.googleapis.com/v0/b/enviro-buddy.appspot.com/o/placeholder.png?alt=media&token=e630e1d2-cb1b-4a36-8d33-941b3adc71c5";
            } else {
              console.log("ok");
            }
            event.id = doc.id;
            this.eventList.push(event);
          });
        });
    },
    route: function (event) {
      this.$router.push({
        name: "event-details",
        params: {
          eventid: event.target.getAttribute("eventid"),
          collectionName: event.target.getAttribute("collectionName"),
          subCollectionName: event.target.getAttribute("subCollectionName")
        },
      });
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
body {
  background-color: #ffe8e8;
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
  width: 31.3%;
}
img {
  height: 300px;
  width: 90%;
  object-fit: cover;
}
#searchbar-container {
  width: 31.3%;
  margin-right: 1%;
  margin-left: auto;
}
.username {
  color: #e48257;
}
.eventName {
  overflow: hidden;
  display: flex;
  line-height: 1.5em;
  height: 3em;
  width: 90%;
  text-align: center;
}
.description {
  overflow: hidden;
  display: flex;
  line-height: 1.5em;
  height: 4.5em;
  width: 90%;
}
</style>