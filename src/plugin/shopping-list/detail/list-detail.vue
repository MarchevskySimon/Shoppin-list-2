<template>
  <div>
    <form @submit.prevent="addToList()">
      <input type="text" v-model="name" />
      <br />
      <button type="submit" @click="forceRerender()">ADD NEW</button>
    </form>

    <AllItems v-if="renderComponent" />

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
      renderComponent: true,
    };
  },

  beforeMount() {
    this.route = useRoute();
  },

  methods: {
    addToList() {
      axios
        .post("/api/v1/shopping-lists/" + this.route.params.id + "/items", {
          name: this.name,
          value: "1",
          unit: "piece",
          is_checked: false,
        })
        .then(function response(e) {
          console.log(e);
        })
        .catch(function (error) {
          console.log(error);
        });

      this.name = "";
    },

    deleteList() {
      axios
        .delete("/api/v1/shopping-lists/" + this.route.params.id)
        .then(function response(e) {
          console.log(e);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async forceRerender() {
      this.renderComponent = false;
      await this.$nextTick();
      this.renderComponent = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
