<template>
  <body>
    <div>
      <b-container>
        <b-row>
          <b-col>
            <img v-bind:src="event.img" />
          </b-col>
          <b-col>
            <b-row>
              <h2>{{ event.name }}</h2>
              <p v-if="event.location">
                Location: {{ event.location }}
              </p>
              <p v-if="event.date">Date: {{ event.date }}</p>
              <p v-if="event.time">Time: {{ event.time }}</p>
              <p v-if="event.description">
                What it is about: <br />
                {{ event.description }}
              </p>
            </b-row>
            <hr>

            <b-row id="signup">
              <h3>Interested? Sign up below!</h3>
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
                    v-model.lazy="signupInfo.name"
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
                    v-model.lazy="signupInfo.contact"
                    placeholder="Enter Phone Number"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group id="Email" label="Email" label-for="Email">
                  <b-form-input
                    id="Email"
                    placeholder="Enter Email"
                    type="text"
                    v-model.lazy="signupInfo.email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-button
                  id="button"
                  type="submit"
                  variant="outline-success"
                  v-on:click="signUp()"
                  >Sign Me Up!</b-button
                >
              </b-form>
            </b-row>
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
      event: {},
      collectionName: "",
      subCollectionName: "",
      eventid: "",
      signupInfo: {
        name: "",
        contact: "",
        email: "",
      },
    };
  },
  methods: {
    fetchItems: function () {
      this.eventid = this.$route.params.eventid;
      this.collectionName = this.$route.params.collectionName;
      this.subCollectionName = this.$route.params.subCollectionName;

      database
        .collection(this.collectionName)
        .doc(this.subCollectionName)
        .collection("events")
        .doc(this.eventid)
        .get()
        .then((snapshot) => (this.event = snapshot.data()));
    },
    signUp: function () {
      database
        .collection(this.collectionName)
        .doc(this.subCollectionName)
        .collection("events")
        .doc(this.eventid)
        .collection("signups")
        .add(this.signupInfo);
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
  width: 100%;
  height: 70vh;
  object-fit: contain;
}
body {
  background-color: #ffe8e8;
}
#description {
  overflow: hidden;
  display: flex;
  line-height: 1.5em;
  height: 4.5em;
  width: 90%;
}
#signup {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
#button {
  margin-top: 3%;
}
</style>