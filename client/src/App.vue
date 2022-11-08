<template>
  <div class="main p-10">
    <HeaderVue v-if="isConnected" @changeDate="changeDate"/>
    <router-view :date="date"></router-view>
  </div>
</template>

<script>
import HeaderVue from "./components/HeaderVue.vue";

export default {
  name: "App",
  components: {
    HeaderVue,
  },
  data() {
    return {
      isConnected: false,
      date: null,
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
