<template>
  <div>
    <h3>{{ thisList.title }}</h3>

    <form @submit.prevent="addToList()">
      <input type="text" v-model="name" />
      <br />
      <button type="submit">ADD NEW</button>
    </form>

    <ul>
      <li v-for="item in thisList.items" :key="item.id">
        {{ item.name }} - {{ item.value }}
      </li>
    </ul>

    <hr />

    <RouterLink to="/">HOME</RouterLink>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  data() {
    return {
      thisList: "",
      name: "",
    };
  },

  beforeMount() {
    this.route = useRoute();
  },

  async mounted() {
    try {
      const response = await axios.get("/api/v1/shopping-lists");
      this.shoppingLists = response.data.data;
    } catch (error) {
      console.error("Error:", error);
      this.shoppingLists = { error };
    }

    for (let i = 0; i < this.shoppingLists.length; i++) {
      if (this.shoppingLists[i].id === parseInt(this.route.params.id)) {
        this.thisList = this.shoppingLists[i];
        console.log(this.thisList.items);
      }
    }
  },
  methods: {
    addToList() {
      axios
        .post("/api/v1/shopping-lists/", { name: this.name })
        .then(function response(e) {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
