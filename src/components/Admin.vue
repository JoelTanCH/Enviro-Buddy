<template>
  <div v-show="isAdmin">
    <div>
      <h1 class="page-title">Review Event Requests</h1>
    </div>

    <div id="chart">
      <b-button v-on:click="toggleChart" variant="outline-success"
        >Hide/Show Approved Events Breakdown</b-button
      >
      <div v-show="showchart">
        <barchart></barchart>
      </div>
    </div>

    <div v-if="reqList.length > 0">
      <ul>
        <li v-for="event in reqList" v-bind:key="event.name">
          <img v-bind:src="event.img" />
          <h4 class="eventName">{{ event.name }}</h4>

          <div id="buttons">
            <b-row>
              <b-col
                ><b-button
                  class="customButton"
                  v-on:click="approve(event, event.category)"
                  variant="outline-success"
                >
                  Approve
                </b-button></b-col
              >

              <b-col>
                <b-button
                  class="customButton"
                  v-on:click="reject(event)"
                  variant="outline-danger"
                >
                  Reject
                </b-button>
              </b-col>
            </b-row>
          </div>

          <div>
            <b-row>
              <b-col>
                <div class="details-label">Organizer</div>
              </b-col>
              <b-col>
                <div class="details">{{ event.organizer }}</div>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <div class="details-label">Organizer's Email</div>
              </b-col>
              <b-col>
                <div class="details">{{ event.companyEmail }}</div>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <div class="details-label">Mobile Number</div>
              </b-col>
              <b-col>
                <div class="details">{{ event.mobile }}</div>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <div class="details-label">Location</div>
              </b-col>
              <b-col>
                <div class="details">{{ event.location }}</div>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <div class="details-label">Date</div>
              </b-col>
              <b-col>
                <div class="details">{{ event.date }}</div>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <div class="details-label">Time</div>
              </b-col>
              <b-col>
                <div class="details">{{ event.time }}</div>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <div class="details-label">Description</div>
              </b-col>
              <b-col>
                <div class="details">{{ event.description }}</div>
              </b-col>
            </b-row>
          </div>
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
import firebase from "firebase/app";
import "firebase/auth";
import BarChart from "./Barchart.vue";

export default {
  data() {
    return {
      reqList: [],
      isAdmin: false,
      showchart: true,
    };
  },
  components: {
    barchart: BarChart,
  },
  methods: {
    fetchItems: function () {
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
        })
        .then(() => {
          database
            .collection("events-req")
            .doc("donation")
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
                .doc("volunteering")
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
                .then(() => {
                  //update approved events count
                  database
                    .collection("eve-categories")
                    .doc(event.category)
                    .get()
                    .then((doc) => {
                      database
                        .collection("eve-categories")
                        .doc(event.category)
                        .update({ count: doc.data().count + 1 })
                        .then(() => location.reload());
                    });
                });
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
    toggleChart: function () {
      this.showchart = !this.showchart;
    },
  },
  created: function () {
    let currentUser = firebase.auth().currentUser;

    database
      .collection("users")
      .doc(currentUser.email)
      .get()
      .then((ref) => {
        if (ref.data().isAdmin) {
          this.isAdmin = true;
          this.fetchItems();
        } else {
          alert("You do not have admin access to this page");
          this.$router.push("/profile");
        }
      });
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
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.5em;
  height: 1.5em;
  width: 100%;
  text-align: left;
  font-family: "FKGrotesk", Helvetica, Arial, sans-serif;
  font-weight: 600;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 15px;
  text-transform: uppercase;
}
.details-label {
  color: #3a6351;
  text-align: left;
  margin-left: 5px;
  margin-top: 5px;
  width: 100%;
  font-size: 16px;
  font-family: "FKGrotesk", Helvetica, Arial, sans-serif;
  font-weight: bold;
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
#buttons {
  margin-top: 20px;
  margin-bottom: 20px;
}
.customButton {
  width: 100%;
}
#chart {
  text-align: right;
  margin-right: 1%;
  margin-bottom: 20px;
}
</style>