<template>
  <div>
    <div>
      <h1 class="page-title">Review Event Requests</h1>
    </div>

    <div v-if="reqList.length > 0">
      <ul>
        <li v-for="event in reqList" v-bind:key="event.name">
          <img v-bind:src="event.img" />
          <h4 class="eventName">{{ event.name }}</h4>
          <div class="details">Organizer: {{ event.organizer }}</div>
          <div class="details">Email: {{ event.email }}</div>
          <div class="details">Mobile: {{ event.mobile }}</div>
          <div class="details">Location: {{ event.location }}</div>
          <div class="details">Date: {{ event.date }}</div>
          <div class="details">Time: {{ event.time }}</div>

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

    <div v-else class="emptyTab">
      <div>No events requests to review at the moment</div>
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

<style scoped>
.page-title {
  color: black;
  font-family: Georgia, Verdana, sans-serif;
  font-weight: 500;
  text-align: center;
}
.emptyTab {
  text-align: center;
  margin-top: 50px;
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

.eventName {
  overflow: hidden;
  line-height: 1.5em;
  height: 1.5em;
  width: 100%;
  text-align: left;
  font-family: "FKGrotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 15px;
}
.details {
  color: #57585a;
  text-align: left;
  margin-left: 5px;
  margin-top: 5px;
  width: 100%;
  font-size: 16px;
  font-family: "FKGrotesk", Helvetica, Arial, sans-serif;
}
</style>