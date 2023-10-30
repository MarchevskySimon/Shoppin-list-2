<template>
  <div>
    <h3>{{ thisList.title }}</h3>
    <ul>
      <li v-for="(item, index) in thisList.polozky" :key="index">
        {{ item }}
      </li>
    </ul>

    <RouterLink to="/">HOME</RouterLink>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { data } from "@/data.js";

export default {
  setup() {
    const route = useRoute();
    const thisList = ref(data).value[route.params.id - 1];

    return {
      thisList,
    };
  },
};
</script>

<style lang="scss" scoped></style>
