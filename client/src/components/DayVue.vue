<template>
  <RdvModalUpdate v-if="showUpdateModal" :rdv="rdvToUpdate"
                  class="h-screen w-screen w-full h-full p-0 fixed top-0 left-0"
                  @close="closeModaleUpdate"
                  @updateData="fetchData"></RdvModalUpdate>
  <div class="flex h-full flex-col px-10">
    <div class="isolate flex flex-auto overflow-hidden bg-white">
      <div ref="container" class="flex flex-auto flex-col overflow-auto">
        <div
            ref="containerNav"
            class="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
        >
          <button
              v-for="day in days"
              v-bind:key="day"
              class="flex flex-col items-center pt-3 pb-1.5"
              type="button"
          >
            <span> {{ getDayName(day).charAt(0) }} </span>
            <span
                :class="getClass(day)"
                class="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold"
            >
              {{ day.getDate() }}</span
            >
          </button>
        </div>
        <div class="flex w-full flex-auto">
          <div class="w-14 flex-none bg-white ring-1 ring-gray-100"/>
          <div class="grid flex-auto grid-cols-1 grid-rows-1">
            <!-- Horizontal lines -->
            <div
                class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))"
            >
              <div ref="containerOffset" class="row-end-1 h-7"></div>
              <template v-for="hour in hours" v-bind:key="hour">
                <div>
                  <div
                      class="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                  >
                    {{ hour }}
                  </div>
                </div>
                <div/>
              </template>
            </div>

            <!-- Events -->
            <ol
                class="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                style="
                grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto;
              "
            >
              <RdvDayVue v-for="rdv in rdvs" v-bind:key="rdv.id" :rdv="rdv" @updateModal="showModalUpdate"/>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {fetchDataGet} from "@/js/request";
import {areDateEqual, formatNumber, getAllDaysOfWeek, getDayName,} from "@/js/date_tools";
import RdvDayVue from "@/components/RdvDayVue";
import RdvModalUpdate from "@/components/RdvModalUpdate";

export default {
  name: "DayVue",
  components: {
    RdvDayVue,
    RdvModalUpdate,
  },
  data() {
    return {
      showUpdateModal: false,
      rdvToUpdate: [],
      days: [],
      hours: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      rdvs: [],
      date: null
    };
  },
  mounted() {
    this.fetchData();
    this.days = getAllDaysOfWeek(this.date);
  },
  methods: {
    getDayName,
    fetchData() {
      this.date = new Date(localStorage.getItem("currentDate"));
      console.log(this.date);
      console.log("Maj des donnéesV2")
      const dateFormat =
          this.date.getFullYear() +
          "-" +
          formatNumber(this.date.getMonth() + 1) +
          "-" +
          formatNumber(this.date.getDate());
      fetchDataGet("day_planning/" + dateFormat)
          .then((res) => {
            this.rdvs = res;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    getClass(day) {
      if (areDateEqual(day, new Date())) {
        return "bg-indigo-600 text-white";
      }
      if (areDateEqual(day, this.date)) {
        //Si la date étudiée est celle du jour
        return "bg-gray-900 text-white";
      } else {
        return "text-gray-900";
      }
    },
    showModalUpdate(rdv) {
      this.rdvToUpdate = rdv;
      this.showUpdateModal = true;
    },
    closeModaleUpdate() {
      this.showUpdateModal = false;
    },
  },
  //Poits du projet dp à réfléchir
  //Synchronisation des données en tmps rééel
  //Overlap sur les RDV
  //Granularité des créneaux (backend et frontend) ? même granuralité sur les deux ?
  //Continuité affichage sur les mois (semaines complètes)
};
</script>

<style scoped></style>
