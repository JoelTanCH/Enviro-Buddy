<template>
<body>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="details.img" />
        </b-col>
        <b-col>
          <h2>{{ details.name }}</h2>
          <p v-if="details.Location">
            Meet up Location: {{ details.Location }}
          </p>
          <p v-if="details.Date">Date: {{ details.Date }}</p>
          <p v-if="details.Time">Time: {{ details.Time }}</p>
          <br /><br />
          <b-form>
            <b-form-group
              id="Full-name"
              label="Full Name"
              label-for="full-name-input"
            >
              <b-form-input
                id="Full-name"
                type="text"
                placeholder="Enter Full Name"
                v-model.lazy="item.Name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="Contact-Details"
              label="Contact Details"
              label-for="Contact-Details-input"
            >
              <b-form-input
                id="Contact-Details"
                type="text"
                v-model.lazy="item.Contact"
                placeholder="Enter Phone Number"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="Email" label="Email" label-for="Email">
              <b-form-input
                id="Email"
                placeholder="Enter Email"
                type="text"
                v-model.lazy="item.Email"
                required
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="secondary" v-on:click="addItem()"
              >Submit</b-button
            >
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
  </body>
</template>

<script>
import database from "../firebase.js";

export default {
  data() {
    return {
      details: {},
      collection: "",
      document: "",
      item: {
        Name: "",
        Contact: "",
        Email: "",
      },
    };
  },
  methods: {
    fetchItems: function () {
      var eventid = this.$route.params.eventid;
      var collectionName = this.$route.params.collectionName;
      this.collection = collectionName;
      this.document = eventid;
      database
        .collection("eve-categories")
        .doc(collectionName)
        .collection("events")
        .doc(itemid)
        .get()
        .then((snapshot) => (this.details = snapshot.data()));
    },
    addItem: function () {
      var itemid = this.$route.params.itemid;
      var collectionName = this.$route.params.collectionName;
      console.log(itemid) //recycling challenge
      console.log(collectionName) //recycling
      database
        .collection("eve-categories")
        .doc(collectionName)
        .collection("events")
        .doc(itemid)
        .collection("signups")
        .add(this.item);
      //might need to add to user profile
      alert("saved to database");
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
img {
  height: 500px;
  overflow: hidden;
}
body {
  background-color: #f2edd7;
}
</style>