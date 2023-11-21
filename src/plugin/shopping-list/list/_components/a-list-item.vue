<template>
  <div class="all">
    <main class="container">
      <h1>Shoping List</h1>
      <h2>LISTS</h2>
      <section v-for="list in shoppingLists" :key="list.id">
        <RouterLink
          class="link"
          :to="`/list/${list.id}`"
          @click="$emit('rerenderItems')"
          >{{ list.title }}</RouterLink
        >
      </section>
      <span class="addPlus" @click="$emit('addForm')"><i>+</i> Add new</span>
      <template v-if="!shoppingLists">
        <p>Načítavam dáta</p>
      </template>

      <!--<template v-else-if="shoppingLists.error">
      Pri načítaní dát nastala chyba: {{ shoppingLists.error }}
    </template>

    <template v-else>
      Počet položiek v zozname: {{ shoppingLists.length }}
    </template> -->
    </main>
    <aside v-if="route.params.id == null">
      <h1>My lists</h1>
      <section v-for="list in shoppingLists" :key="list.id">
        <RouterLink :to="`/list/${list.id}`">
          <h2>{{ list.title }}</h2>
          <ul>
            <li v-for="item in list.items" :key="item.id">
              <span>{{ item.name }}</span>
              <span class="unit">{{ item.value + " " + item.unit }}</span>
            </li>
          </ul>
        </RouterLink>
      </section>
    </aside>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  data() {
    return {
      shoppingLists: null,
    };
  },
  beforeMount() {
    this.route = useRoute();
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

<style lang="css" scoped>
.all {
  display: flex;
  flex-direction: row;
}
aside {
  display: flex;
  flex-direction: column;
  flex: 2;
  height: 100vh;
  padding-top: 4rem;
  overflow-y: scroll;
}
aside h1 {
  position: fixed;
  width: 100%;
  top: 0;
}
aside h2 {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
}
aside section {
  margin: 1rem;
  padding: 1rem;
  border-radius: 3rem;
  border: 5px solid rgba(15, 15, 15, 0.5);
  cursor: pointer;
}
aside ul {
  list-style: none;
}
aside li {
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
}
aside li span {
  margin: 1rem 0;
  cursor: auto;
}
</style>
