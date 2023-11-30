<template>
  <div>
    <div class="homeLink">
      <RouterLink to="/">
        <img src="@/assets/arrow.svg" alt="Arrow"
      /></RouterLink>
      <h3>{{ thisList.title }}</h3>
      <a href="/" @click="$emit('deleteList')" class="deleteLink"
        ><img src="@/assets/trash.svg" alt="Delete"
      /></a>
    </div>

    <main class="container">
      <ul>
        <li v-for="item in thisList.items" :key="item.id">
          <span class="singleItem">
            <span>
              <input
                type="checkbox"
                :checked="item.is_checked"
                @change="isChecked(item, item.id)"
              />

              <span>{{ item.name }}</span>
            </span>
            <span>
              <span
                class="unit"
                @click="
                  showHide(item.value, item.unit);
                  usedItem = item;
                "
                >{{ item.value + " " + item.unit }}
              </span>

              <button
                class="button dellItem"
                @click="
                  usedItem = item;
                  del();
                "
              >
                X
              </button>
            </span>
          </span>
        </li>
      </ul>

      <div v-if="option1" class="darker"></div>
      <div v-if="option1" class="hidenForm">
        <!-- Form to UNITS -->
        <form @submit.prevent="chooseUnit()">
          <div class="buttonsContainer">
            <span class="button" @click="option1 = false">CANCEL</span>
            <button class="button" type="submit">CONFIRM</button>
          </div>
          <select v-model="value">
            <option
              v-for="number in howManyOptions"
              :key="number"
              :value="number"
            >
              {{ number }}
            </option>
          </select>
          <select v-model="unit">
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </form>
      </div>
    </main>

    <template v-if="!thisList">
      <p>Načítavam dáta</p>
    </template>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  data() {
    return {
      thisList: "",
      usedItem: "",
      unit: "",
      value: "",
      options: ["kg", "piece", "pack"],
      howManyOptions: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200,
        300, 400, 500, 600, 700, 800, 900, 1000,
      ],
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
            this.usedItem.id,
          { value: this.value, unit: this.unit }
        );
        console.log(response);
        this.$emit("rerenderEvent");
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

    // DELETE
    async del() {
      try {
        const response = await axios.delete(
          "/api/v1/shopping-lists/" +
            this.route.params.id +
            "/items/" +
            this.usedItem.id
        );
        console.log(response);
        this.$emit("rerenderEvent");
      } catch (error) {
        console.error("Error:", error);
      }
    },

    // SHOW AND HIDE
    showHide(valueType, unitType) {
      this.value = valueType;
      this.unit = unitType;

      this.option1 = !this.option1;
    },
  },
};
</script>

<style scoped>
.homeLink {
  display: flex;
  align-items: center;
  width: 100%;
}
.homeLink h3 {
  flex: 1;
  padding-left: 3rem;
}
.homeLink a {
  position: absolute;
  transform: translate(15%, -40%);
  z-index: 1;
}
.homeLink a:hover {
  background-color: rgba(50, 50, 50);
}
.homeLink img {
  width: 2rem;
}
.deleteLink {
  right: 1%;
}
.container ul {
  width: 100%;
  list-style: none;
}
.container li {
  width: 100%;
  padding: 1rem;
}
.container li:hover {
  width: 100%;
  background-color: rgba(50, 50, 50);
}
.container input {
  margin-right: 2rem;
}
li span:hover {
  cursor: pointer;
}
.singleItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.dellItem {
  font-weight: bold;
  padding: 0 0.3rem;
  border: 2px solid #035afc;
  border-radius: 50%;
}
select {
  font-size: 1.5rem;
  margin: 2rem;
  background: none;
}
option {
  font-size: 1.5rem;
  background: #202020;
}
</style>
