<template>
  <main>
    <h1>LISTS</h1>
    <form @submit.prevent="addToDatabase()">
      <input type="text" v-model="titleName" placeholder="Name" />
      <button type="submit" @click="forceRerender()">ADD NEW</button>
    </form>

    <ListItem v-if="renderComponent" />
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
      renderComponent: true,
    };
  },
  methods: {
    addToDatabase() {
      axios
        .post("/api/v1/shopping-lists", {
          title: this.titleName,
        })
        .then(function respose(e) {
          console.log(e);
        })
        .catch(function (error) {
          console.log(error);
        });

      this.titleName = "";
    },

    async forceRerender() {
      this.renderComponent = false;
      await this.$nextTick();
      this.renderComponent = true;
    },
  },
};
</script>
