<template>
  <main>
    <h1>LISTS</h1>
    <form @submit.prevent="">
      <input type="text" />
      <button type="submit">ADD NEW</button>
    </form>

    <ListItem />
  </main>
</template>

<script>
import ListItem from "@/plugin/shopping-list/list/_components/a-list-item.vue";

export default {
  components: {
    ListItem,
  },
  data() {
    return {};
  },
};
</script>
