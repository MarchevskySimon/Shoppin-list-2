<template>
  <div>
    <section v-for="list in listData" :key="list.id">
      <RouterLink :to="`/list/${list.id}`">{{ list.title }}</RouterLink>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import { data } from "@/data.js";

export default {
  setup() {
    const listData = ref(data);
    return {
      listData,
    };
  },
};
</script>

<style lang="scss" scoped></style>
