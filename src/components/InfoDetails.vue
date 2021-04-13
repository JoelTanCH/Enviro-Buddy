<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <img v-bind:src="item.img" />
        </b-col>
        <b-col>
          <h2>{{ item.name }}</h2>
          <h5>Posted by: {{item.username}}</h5>
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
      itemid: "",
      subCollectionName: "",
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
  width: 100%;
  height: 70vh;
  object-fit: cover;
}
.username {
  color: #e48257;
}
</style>