<template>
  <div>
    <h3>{{ thisList.title }}</h3>

    <ul>
      <li v-for="item in thisList.items" :key="item.id">
        <input
          type="checkbox"
          :checked="item.is_checked"
          @change="isChecked(item, item.id)"
        />
        <span @click="showHide(), (itemID = item.id)">{{
          item.name + " - " + item.value + " " + item.unit
        }}</span>
      </li>
    </ul>

    <div v-if="option1">
      <!-- Form to UNITS -->
      <form @submit.prevent="chooseUnit()">
        <label>UNITS :</label>
        <br />
        <select v-model="unitType">
          <option v-for="option in options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <button>CONFIRM</button>
      </form>
      <span @click="option1 = false">X</span>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  data() {
    return {
      thisList: "",
      itemID: "",
      unitType: "",
      options: ["kg", "piece", "pack"],
      option1: false,
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

  methods: {
    async chooseUnit() {
      try {
        const response = axios.put(
          "/api/v1/shopping-lists/" +
            this.route.params.id +
            "/items/" +
            this.itemID,
          { unit: this.unitType }
        );
        console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async isChecked(currentItem, itemID) {
      try {
        if (currentItem.is_checked === true) {
          const response = await axios.put(
            "/api/v1/shopping-lists/" +
              this.route.params.id +
              "/items/" +
              itemID,
            { is_checked: false }
          );
          console.log(response);
        } else {
          const response = await axios.put(
            "/api/v1/shopping-lists/" +
              this.route.params.id +
              "/items/" +
              itemID,
            { is_checked: true }
          );
          console.log(response);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    // SHOW AND HIDE
    showHide() {
      this.option1 = !this.option1;
    },
  },
};
</script>

<style scoped>
li span:hover {
  cursor: pointer;
}
</style>
