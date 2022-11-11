<template>
  <RdvModalUpdate v-if="showUpdateModal" :rdv="rdvToUpdate"
                  class="h-screen w-screen w-full h-full p-0 fixed top-0 left-0"
                  @close="closeModaleUpdate"></RdvModalUpdate>
  <div class="flex h-full flex-col">
    <div
        ref="container"
        class="isolate flex flex-auto flex-col overflow-auto bg-white"
    >
      <div
          class="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
          style="width: 165%"
      >
        <div
            ref="containerNav"
            class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
        >
          <div
              class="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden"
          >
            <button class="flex flex-col items-center pt-2 pb-3" type="button">
              M
              <span
                  class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900"
              >10</span
              >
            </button>
            <button class="flex flex-col items-center pt-2 pb-3" type="button">
              T
              <span
                  class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900"
              >11</span
              >
            </button>
            <button class="flex flex-col items-center pt-2 pb-3" type="button">
              W
              <span
                  class="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
              >12</span
              >
            </button>
            <button class="flex flex-col items-center pt-2 pb-3" type="button">
              T
              <span
                  class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900"
              >13</span
              >
            </button>
            <button class="flex flex-col items-center pt-2 pb-3" type="button">
              F
              <span
                  class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900"
              >14</span
              >
            </button>
            <button class="flex flex-col items-center pt-2 pb-3" type="button">
              S
              <span
                  class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900"
              >15</span
              >
            </button>
            <button class="flex flex-col items-center pt-2 pb-3" type="button">
              S
              <span
                  class="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900"
              >16</span
              >
            </button>
          </div>

          <div
              class="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid"
          >
            <div class="col-end-1 w-14"/>

            <div
                v-for="day in days"
                v-bind:key="day"
                class="flex items-center justify-center py-3"
            >
              <span
                  :class="
                  areDateEqual(day, new Date()) ? 'flex items-baseline' : ''
                "
              >
                {{ getDayName(day).substring(0, 3) }}
                <span :class="getClass(day)">
                  {{ day.getDate() }}
                </span></span
              >
            </div>
          </div>
        </div>
        <div class="flex flex-auto">
          <div
              class="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100"
          />
          <div class="grid flex-auto grid-cols-1 grid-rows-1">
            <!-- Horizontal lines -->
            <div
                class="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))"
            >
              <div ref="containerOffset" class="row-end-1 h-7"/>
              <template v-for="hour in hours" v-bind:key="hour">
                <div>
                  <div
                      class="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
                  >
                    {{ hour }}
                  </div>
                </div>
                <div/>
              </template>
            </div>

            <!-- Vertical lines -->
            <div
                class="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7"
            >
              <div class="col-start-1 row-span-full"/>
              <div class="col-start-2 row-span-full"/>
              <div class="col-start-3 row-span-full"/>
              <div class="col-start-4 row-span-full"/>
              <div class="col-start-5 row-span-full"/>
              <div class="col-start-6 row-span-full"/>
              <div class="col-start-7 row-span-full"/>
              <div class="col-start-8 row-span-full w-8"/>
            </div>

            <!-- Events -->
            <ol
                class="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style="
                grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto;
              "
            >
              <RdvWeekVue
                  v-for="rdv in rdvs"
                  v-bind:key="rdv"
                  :rdv="rdv"
                  @updateModal="showModalUpdate"
              ></RdvWeekVue>

            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {areDateEqual, formatNumber, getAllDaysOfWeek, getDayName, getFirstDayOfWeek,} from "@/js/date_tools";
import {fetchDataGet} from "@/js/request";
import RdvWeekVue from "@/components/RdvWeekVue";
import RdvModalUpdate from "@/components/RdvModalUpdate";

export default {
  name: "WeekVue",
  components: {RdvModalUpdate, RdvWeekVue},
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      showUpdateModal: false,
      rdvToUpdate: [],
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
      days: [],
      rdvs: [],
    };
  },
  mounted() {
    this.days = getAllDaysOfWeek(this.date);
    this.getRdv();
  },
  methods: {
    getDayName,
    areDateEqual,
    getClass(day) {
      if (areDateEqual(day, new Date())) {
        return "m-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white";
      }
      if (areDateEqual(day, this.date)) {
        //Si la date étudiée est celle du jour
        return "items-center justify-center font-semibold text-gray-900";
      } else {
        return "items-center justify-center font-semibold text-gray-900";
      }
    },
    getRdv() {
      const firstDayOfWeek = getFirstDayOfWeek(this.date);
      const dateFormat =
          firstDayOfWeek.getFullYear() +
          "-" +
          formatNumber(firstDayOfWeek.getMonth() + 1) +
          "-" +
          formatNumber(firstDayOfWeek.getDate());
      fetchDataGet("week_planning/" + dateFormat)
          .then((res) => {
            this.rdvs = res;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    showModalUpdate(rdv) {
      this.rdvToUpdate = rdv;
      this.showUpdateModal = true;
    },
    closeModaleUpdate() {
      this.showUpdateModal = false;
    }
  },
};
</script>

<style scoped>

</style>
