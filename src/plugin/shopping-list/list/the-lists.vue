<template id="template">
  <div>
    <main class="container">
      <div class="main-lists">
        <ListItem
          class="listItem"
          :key="componentKey"
          @rerender-items="$emit('sendRerender')"
          @add-form="addForm = true"
        />
      </div>
      <!-- FORM NA PRIDANIE  -->
      <div v-if="addForm" class="darker"></div>
      <form v-if="addForm" class="hidenForm" @submit.prevent="addToDatabase()">
        <h2>Enter list name</h2>
        <p v-if="message">Please enter your text !</p>
        <input type="text" v-model="titleName" placeholder="Name" />
        <br />
        <div class="buttonsContainer">
          <button class="button" type="submit">CREATE</button>
          <span
            class="button"
            @click="
              addForm = false;
              message = false;
            "
            >CANCEL</span
          >
        </div>
      </form>
    </main>
  </div>
</template>

<script>
// import ListDetail from "@/plugin/shopping-list/detail/list-detail.vue";
import ListItem from "@/plugin/shopping-list/list/_components/a-list-item.vue";
import axios from "axios";

export default {
  components: {
    ListItem,
  },
  data() {
    return {
      titleName: "",
      message: false,
      addForm: false,
      componentKey: 0,
    };
  },
  methods: {
    async addToDatabase() {
      if (this.titleName !== "") {
        try {
          const response = axios.post("/api/v1/shopping-lists", {
            title: this.titleName,
          });
          this.forceRerender();
          console.log(response);
        } catch (error) {
          console.error("Error:", error);
        }
        this.titleName = "";
        this.message = false;
        this.addForm = false;
      } else {
        this.message = true;
      }
    },

    async selectListsItemsFromDatabase() {
      try {
        const response = axios.get("/api/v1/shopping-lists");
        console.log(response);
      } catch (error) {
        console.error("Error :", error);
      }
    },

    async forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>

<style lang="css">
* {
  font-family: "Montserrat", sans-serif;
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 1rem;
  color: white;
  text-decoration: none;
}
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #202020;
}
h1 {
  font-size: 1.5rem;
  position: relative;
  padding: 1rem;
  background-color: #202020;
  box-shadow: 0px 5px 0px 0px rgba(15, 15, 15, 0.5);
}
h2 {
  margin: 2rem 0 0 2rem;
  color: #035afc;
}
h3 {
  font-size: 1.5rem;
  position: relative;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #202020;
  box-shadow: 0px 5px 0px 0px rgba(15, 15, 15, 0.5);
}
.main-lists {
  display: flex;
  flex-direction: column;
}
.listItem {
  display: flex;
  flex-direction: column;
}
.listItem a {
  font-weight: bold;
}
.main-lists section {
  margin: 3rem 0 0 2rem;
}
.main-lists span {
  margin-top: 3rem;
  cursor: pointer;
}
.addPlus {
  margin: 2rem;
}
.main-lists span i {
  font-style: normal;
  font-weight: bold;
  color: #035afc;
  margin-right: 1rem;
  padding: 0 0.3rem;
  border: 2px solid #035afc;
  border-radius: 50%;
}

.unit {
  padding: 0.5rem;
  border-radius: 5px;
  background: #035afc;
}
/* FORM */
.darker {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
}
.hidenForm {
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  padding: 3rem;
  background-color: #202020;
  z-index: 100;
}
.hidenForm p {
  margin: 1rem 0;
  color: red;
}
.hidenForm input {
  background: none;
  border: none;
  padding: 0.5rem 0;
  margin: 2rem 0;
  border-bottom: 1px solid white;
}
.hidenForm input:focus {
  outline: none;
  border-bottom: 1px solid #035afc;
}
.button {
  font-weight: bold;
  margin-left: 1rem;
  color: #035afc;
  background: none;
  border: none;
  cursor: pointer;
}
.buttonsContainer {
  text-align: right;
}
</style>
