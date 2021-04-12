<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="item.img" />
        </b-col>
        <b-col>
          <h2 class="itemName">{{ item.name }}</h2><br>
          <h5>Posted by: <span class="username"> {{item.username}}</span></h5>
          <br>
          <p> {{item.description}} </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import database from "../firebase.js";


export default {
  data() {
    return {
      item: {},
      counter: 0,
      success: false,
      categoryid: "",
      category: "",
      exist: false,
      existingOrders: [],
    };
  },
  components: {

  },
  methods: {
    fetchItems: function () {
      this.itemid = this.$route.params.itemid;
      this.subCollectionName = this.$route.params.subCollectionName;

      database
        .collection("info-categories")
        .doc(this.subCollectionName)
        .collection("items")
        .doc(this.itemid)
        .get()
        .then((snapshot) => (this.item = snapshot.data()));

    }
  },
  created: function () {
    this.fetchItems();
  },
};
</script>

<style scoped>
img {
  width: 500px;
  height: 400%;
  object-fit: contain;
}
.button {
  margin: 10px;
}
.username {
  color: #e48257;
}
.itemName {
  color: #393232;
  font-size: 40px;
  max-height: 32px;

  text-align: center;
}
</style>