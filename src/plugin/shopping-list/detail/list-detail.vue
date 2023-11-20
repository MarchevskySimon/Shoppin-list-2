<template>
  <main class="container">
    <TheList class="TheList" @send-rerender="forceRerender()" />
    <div class="allItemContainer">
      <AllItems
        :key="componentKe"
        @rerender-event="forceRerender()"
        @delete-list="deleteList()"
      />
      <form @submit.prevent="addToList()" class="addItemForm">
        <p v-if="message">Please enter your text !</p>
        <input type="text" v-model="name" placeholder="New item" />
      </form>
    </div>
  </main>
</template>

<script>
import TheList from "@/plugin/shopping-list/list/the-lists.vue";
import AllItems from "@/plugin/shopping-list/detail/_components/a-shopping-list-item.vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  components: {
    TheList,
    AllItems,
  },
  data() {
    return {
      name: "",
      message: false,
      componentKe: 0,
    };
  },

  beforeMount() {
    this.route = useRoute();
  },

  methods: {
    async addToList() {
      if (this.name !== "") {
        try {
          const response = await axios.post(
            "/api/v1/shopping-lists/" + this.route.params.id + "/items",
            {
              name: this.name,
              value: "1",
              unit: "piece",
              is_checked: false,
            }
          );
          console.log(response);
          this.forceRerender();
        } catch (error) {
          console.error("Error:", error);
        }
        this.name = "";
        this.message = false;
      } else {
        this.message = true;
      }
    },

    async deleteList() {
      try {
        const response = await axios.delete(
          "/api/v1/shopping-lists/" + this.route.params.id
        );
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async forceRerender() {
      this.componentKe += 1;
    },
  },
};
</script>

<style lang="css" scoped>
.container {
  position: relative;
  width: 100%;
}
h1 {
  margin-bottom: 2rem;
}
.TheList {
  width: 30%;
}
.allItemContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.allItemContainer a img {
  width: 2rem;
}

/* FORM */
.addItemForm input {
  width: 100%;
  background: none;
  border: none;
  padding: 0.5rem 0;
  margin: 2rem 0;
  border-bottom: 1px solid white;
}
.addItemForm input:focus {
  outline: none;
  border-bottom: 1px solid #035afc;
}
.addItemForm p {
  color: red;
  margin: 1rem;
}
</style>
