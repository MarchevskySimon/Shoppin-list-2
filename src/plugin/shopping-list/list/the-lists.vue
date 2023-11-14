<template>
  <main>
    <h1>LISTS</h1>
    <form @submit.prevent="addToDatabase()">
      <input type="text" v-model="titleName" placeholder="Name" />
      <button type="submit" @click="forceRerender">ADD NEW</button>
    </form>

    <ListItem :key="componentKey" />
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
      componentKey: 0,
    };
  },
  methods: {
    async addToDatabase() {
      try {
        const response = axios.post("/api/v1/shopping-lists", {
          title: this.titleName,
        });
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
      this.titleName = "";
    },

    async forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>
