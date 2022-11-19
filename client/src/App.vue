<template>
  <div class="main">
    <HeaderVue v-if="isConnected" @changeDate="changeDate" @updateData="updateData"/>
    <router-view :date="date" v-slot="{ Component }">
      <component ref="view" :is="Component"></component>
    </router-view>
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
    updateData: function (){
      this.$refs.view.fetchData();

    }
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
