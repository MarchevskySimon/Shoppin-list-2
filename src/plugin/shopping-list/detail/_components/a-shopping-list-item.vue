<template>
  <div>
    <h3>{{ thisList.title }}</h3>

    <ul>
      <li v-for="item in thisList.items" :key="item.id">
        {{ item.name }} - {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  data() {
    return {
      thisList: "",
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
};
</script>

<style lang="scss" scoped></style>
