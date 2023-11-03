<template>
  <div>
    <section v-for="list in shoppingLists" :key="list.id">
      <RouterLink :to="`/list/${list.id}`">{{ list.title }}</RouterLink>
    </section>

    <h1>Lists</h1>

    <template v-if="!shoppingLists">
      <p>Načítavam dáta</p>
    </template>

    <template v-else-if="shoppingLists.error">
      Pri načítaní dát nastala chyba: {{ shoppingLists.error }}
    </template>

    <template v-else>
      Počet položiek v zozname: {{ shoppingLists.length }}
    </template>
  </div>
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
      const shoppingListsData = response.data.data;
      this.shoppingLists = shoppingListsData;
      // console.log(shoppingListsData);
    } catch (error) {
      console.error("Error:", error);
      this.shoppingLists = { error };
    }
    console.log(this.shoppingLists[0].id);
  },
};
</script>

<style lang="scss" scoped></style>
