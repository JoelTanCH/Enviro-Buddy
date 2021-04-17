<template>
  <div>
    <div class="topContainer">
      <h2 class="title">Review Event Requests</h2>
    </div>

    <div>
      <ul>
        <li v-for="event in reqList" v-bind:key="event.name">
          <img v-bind:src="event.img" />
          <h4 class="eventName">{{ event.name }}</h4>
          <div>Organizer: {{ event.organizer }}</div>
          <div>Email: {{ event.email }}</div>
          <div>Mobile: {{ event.mobile }}</div>
          <div>Location: {{ event.location }}</div>
          <div>Date: {{ event.date }}</div>
          <div>Time: {{ event.time }}</div>

          <b-button
            v-on:click="approve(event, event.category)"
            variant="outline-success"
          >
            Approve
          </b-button>

          <b-button v-on:click="reject(event)" variant="outline-danger">
            Reject
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
      reqList: [],
    };
  },
  methods: {
    fetchItems: function () {
      database
        .collection("events-req")
        .doc("cleanup")
        .collection("events")
        .get()
        .then((req) => {
          let event = {};
          req.forEach((doc) => {
            event = doc.data();
            if (event.status == "Pending") {
              event.id = doc.id;
              this.reqList.push(event);
            }
          });
        })
        .then(() => {
          database
            .collection("events-req")
            .doc("recycling")
            .collection("events")
            .get()
            .then((req) => {
              let event = {};
              req.forEach((doc) => {
                event = doc.data();
                if (event.status == "Pending") {
                  event.id = doc.id;
                  this.reqList.push(event);
                }
              });
            })
            .then(() => {
              database
                .collection("events-req")
                .doc("workshops")
                .collection("events")
                .get()
                .then((req) => {
                  let event = {};
                  req.forEach((doc) => {
                    event = doc.data();
                    if (event.status == "Pending") {
                      event.id = doc.id;
                      this.reqList.push(event);
                    }
                  });
                });
            });
        });
    },
    approve: function (event) {
      //update status to approved in events-req
      database
        .collection("events-req")
        .doc(event.category)
        .collection("events")
        .doc(event.id)
        .update({ status: "Approved" })
        .then(() => {
          //update status to approved in users > requested-events
          database
            .collection("users")
            .doc(event.email)
            .collection("requested-events")
            .doc(event.userdocRef)
            .update({ status: "Approved" })
            .then(() => {
              //add to event listings page
              database
                .collection("eve-categories")
                .doc(event.category)
                .collection("events")
                .add(event)
                .then(() => location.reload());
            });
        });
    },
    reject: function (event) {
      //update status to reject
      database
        .collection("events-req")
        .doc(event.category)
        .collection("events")
        .doc(event.id)
        .update({ status: "Rejected" })
        .then(() => {
          //update status to rejected in users > requested-events
          database
            .collection("users")
            .doc(event.email)
            .collection("requested-events")
            .doc(event.userdocRef)
            .update({ status: "Rejected" })
            .then(() => location.reload());
        });
    },
  },
  created: function () {
    this.fetchItems();
  },
};
</script>