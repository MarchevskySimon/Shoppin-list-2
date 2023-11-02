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
// import { ref } from "vue";
// import { data } from "@/data.js";
import axios from "axios";

export default {
  data() {
    return {
      shoppingLists: null,
    };
  },

  async mounted() {
    try {
      // const response = await axios.get('https://shoppinglist.wezeo.dev/shoppinglist/lists')
      // const data = response.data.data

      // Skrateny zapis zakomentovaneho kodu vyssie, kde vytiahneme data pomocou destrukcie objektu
      const {
        data: { data: shoppingLists },
      } = await axios.get("/api/v1/shopping-lists");
      this.shoppingLists = shoppingLists;
    } catch (error) {
      console.error("Error:", error);
      this.shoppingLists = { error };
    }
  },
};

// export default {
//   setup() {
//     const listData = ref("");

//     axios
//       .get("https://shoppinglist.wezeo.dev/shoppinglist/lists")
//       .then((response) => {
//         listData.value = response;
//       });
//     console.log(listData);

//     return {
//       listData,
//     };
//   },
// };
</script>

<style lang="scss" scoped></style>
