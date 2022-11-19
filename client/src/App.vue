<template>
  <div class="main">
    <HeaderVue v-if="isConnected" @changeDate="changeDate"/>
    <router-view :date="date"></router-view>
  </div>
</template>

<script>
import HeaderVue from "./components/HeaderVue.vue";
import {fetchDataGet} from "@/js/request";

export default {
  name: "App",
  components: {
    HeaderVue,
  },
  data() {
    return {
      isConnected: false,
      date: null,
      connection: null,
    };
  },
  watch: {
    $route() {
      this.isConnected = localStorage.getItem("user") !== null;
    },
  },
  mounted() {
    this.date = new Date(localStorage.getItem("currentDate"));
  },
  created: function() {
    let isConnected = localStorage.getItem("user") !== null;

    if (isConnected) {
      let idUser = JSON.parse(localStorage.getItem("user")).id;

      // Ouverture websocket
      this.connection = new WebSocket("ws://localhost:443", idUser)

      this.connection.onmessage = function(event) {
        let data = JSON.parse(event.data);
        if (data.message == "update") {
          console.log("update");
          fetchDataGet("user/")
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res));
            })
            .catch((error) => {
              console.log("Erreur lors de la récupération des données");
              console.log(error);
            });
        }
      }
    }
  },
  methods: {
    changeDate: function (date) {
      this.date = date;
      this.$router.go();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.main {
  width: 100%;
  height: 100vh;
}
</style>
