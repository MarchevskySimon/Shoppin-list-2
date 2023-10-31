<template>
  <div>
    <!-- <section v-for="list in listData" :key="list.id">
      <RouterLink :to="`/list/${list.id}`">{{ list.title }}</RouterLink>
    </section> -->
    <!-- <p>{{ listData }}</p> -->
  </div>
</template>

<script>
import { ref } from "vue";
// import { data } from "@/data.js";
import axios from "axios";

export default {
  setup() {
    const listData = ref("");

    axios
      .get("https://shoppinglist.wezeo.dev/shoppinglist/lists")
      .then((response) => {
        listData.value = response;
      });
    console.log(listData);

    return {
      // listData,
    };
  },
  // setup() {
  //   const listData = ref(data);
  //   return {
  //     listData,
  //   };
  // },
};
</script>

<style lang="scss" scoped></style>
