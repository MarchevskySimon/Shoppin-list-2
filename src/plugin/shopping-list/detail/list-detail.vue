<template>
  <div>
    <form @submit.prevent="addToList()">
      <input type="text" v-model="name" />
      <br />
      <button type="submit" @click="forceRerender()">ADD NEW</button>
    </form>

    <AllItems :key="componentKey" />
    <br />
    <RouterLink to="/" @click="deleteList()">DELETE</RouterLink>
    <hr />
    <RouterLink to="/">HOME</RouterLink>
  </div>
</template>

<script>
import AllItems from "@/plugin/shopping-list/detail/_components/a-shopping-list-item.vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  components: {
    AllItems,
  },
  data() {
    return {
      name: "",
      unit: "",
      componentKey: 0,
    };
  },

  beforeMount() {
    this.route = useRoute();
  },

  methods: {
    async addToList() {
      try {
        const response = await axios.post(
          "/api/v1/shopping-lists/" + this.route.params.id + "/items",
          {
            name: this.name,
            value: "1",
            unit: "piece",
            is_checked: false,
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
      this.name = "";
    },

    async deleteList() {
      try {
        const response = await axios.delete(
          "/api/v1/shopping-lists/" + this.route.params.id
        );
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async chooseUnit(itemID) {
      try {
        const response = axios.put(
          "/api/v1/shopping-lists/" + this.route.params.id + "/items/" + itemID
        );
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>

<style lang="scss" scoped></style>
