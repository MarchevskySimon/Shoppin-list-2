<template>
  <main class="container">
    <h2>Lists</h2>
    <section v-for="list in shoppingLists" :key="list.id">
      <RouterLink
        class="link"
        :to="`/list/${list.id}`"
        @click="$emit('rerenderItems')"
        >{{ list.title }}</RouterLink
      >
    </section>

    <!-- <template v-if="!shoppingLists">
      <p>Načítavam dáta</p>
    </template>

    <template v-else-if="shoppingLists.error">
      Pri načítaní dát nastala chyba: {{ shoppingLists.error }}
    </template>

    <template v-else>
      Počet položiek v zozname: {{ shoppingLists.length }}
    </template> -->
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      shoppingLists: null,
    };
  },
  async mounted() {
    try {
      const response = await axios.get("/api/v1/shopping-lists");
      console.log(response.data);
      const shoppingListsData = response.data.data;
      this.shoppingLists = shoppingListsData;
    } catch (error) {
      console.error("Error:", error);
      this.shoppingLists = { error };
    }
  },
};
</script>

<style lang="css" scoped></style>
