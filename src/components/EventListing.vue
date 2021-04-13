<template>
  <div id="items">
    <ul>
      <li v-for="event in eventList" v-bind:key="event.name">
        <h2>{{ event.name }}</h2>
        <img v-bind:src="event.img" />
        <p id="description">{{ event.description }}</p>
        <hr />
        <b-button
          v-bind:eventid="event.id"
          v-bind:collectionName="collectionName"
          v-on:click="route($event)"
        >
          Sign Up
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
      eventList: [],
      collectionName: "",
    };
  },
  methods: {
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
          itemid: event.target.getAttribute("eventid"),
          collectionName: event.target.getAttribute("collectionName"),
          subCollectionName: event.target.getAttribute("subCollectionName"),
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
#items {
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
  position: center;
}
#description {
  text-align: center;
}
</style>