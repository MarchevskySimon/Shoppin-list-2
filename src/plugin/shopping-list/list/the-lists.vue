<template>
  <main>
    <h1>LISTS</h1>
    <form @submit.prevent="addToDatabase()">
      <input type="text" v-model="titleName" placeholder="Name" />
      <br />
      <input type="text" v-model="item" placeholder="item" />
      <button type="submit">ADD NEW</button>
    </form>
    <ListItem />
  </main>
</template>

<script>
import ListItem from "@/plugin/shopping-list/list/_components/a-list-item.vue";
import axios from "axios";

export default {
  components: {
    ListItem,
  },
  data() {
    return {
      titleName: "",
      item: "",
    };
  },
  methods: {
    addToDatabase() {
      axios
        .post("/api/v1/shopping-lists", {
          title: this.titleName,
          items: [this.item],
        })
        .then(function respose(e) {
          console.log(e);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
