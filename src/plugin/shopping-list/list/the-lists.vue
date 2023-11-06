<template>
  <main>
    <h1>LISTS</h1>
    <form @submit.prevent="addToDatabase()">
      <input type="text" v-model="titleName" />
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
    };
  },
  methods: {
    addToDatabase() {
      axios
        .post("/api/v1/shopping-lists", { title: this.titleName })
        .then(function respose(e) {
          console.log(e);
        });
    },
  },
};
</script>
