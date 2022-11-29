<template>
  <RdvModalUpdate v-if="showUpdateModal" :rdv="rdvToUpdate"
                  class="h-screen w-screen w-full h-full p-0 fixed top-0 left-0"
                  @close="closeModaleUpdate"
                  @updateData="fetchData"></RdvModalUpdate>
  <div class="bg-white flex flex-row justify-center relative">
    <div
        class="w-2/3 grid grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
      <section v-for="month in this.days" :key="month.name" class="text-center">
        <h2 class="font-semibold text-gray-900">{{ month.name }}</h2>
        <div class="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
          <div>L</div>
          <div>M</div>
          <div>M</div>
          <div>J</div>
          <div>V</div>
          <div>S</div>
          <div>D</div>
        </div>
        <div class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          <button v-for="(day, dayIdx) in month.days" :key="day.date"
                  :class="[(getNameMonth(day)=== month.name) ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400', dayIdx === 0 && 'rounded-tl-lg', dayIdx === 6 && 'rounded-tr-lg', dayIdx === month.days.length - 7 && 'rounded-bl-lg', dayIdx === month.days.length - 1 && 'rounded-br-lg', 'py-1.5 hover:bg-gray-100 focus:z-10']"
                  type="button"
                  @click="getEventOfDay(day)"
          >
            <time
                :class="[(day.getDate() === new Date().getDate() && day.getMonth()=== new Date().getMonth()) && 'bg-indigo-600 font-semibold text-white', 'mx-auto flex h-7 w-7 items-center justify-center rounded-full']"
                :datetime="day.date">
              {{ day.getDate() }}
            </time>
            <span v-if="getIfEventByDay(day, this.rdvs)" class="absolute -mt-0.5 flex flex-wrap-reverse">
                  <span class="mx-0.5 mb-0.5 h-1.5 w-1.5 rounded-full bg-gray-400"/>
              </span>
          </button>
        </div>
      </section>
    </div>
    <div class="w-1/3 h-screen border-l-gray-200 border sticky top-0">
      <div class="mt-10 ml-6 flex flex-row items-center">
        <h1 class="text-4xl ">Mes rendez vous</h1>
        <svg v-show="selectedDate.length !== 0" class="w-8 h-8 ml-6 cursor-pointer hover:scale-125" fill="#4f46e5"
             title="Annuler la séléction" viewBox="0 0 24 24" @click="selectedDate = []">
          xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                fill-rule="evenodd"/>
        </svg>


      </div>

      <div v-if="selectedDate.length === 0"
           class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center items-center">
        <span class="text-gray-500 text-center">Consulter une journée pour accéder à vos rendez-vous </span>
        <svg class="w-12 h-12 ml-2" fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z"/>
          <path
              d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z"/>
          <path
              d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z"/>
        </svg>
      </div>
      <div v-else>
        <ul class="divide-y divide-gray-200 mt-4 p-4" role="list">
          <li v-for="rdv in selectedDate" v-bind:key="rdv.id" class="py-4 cursor-pointer hover:bg-gray-100"
              @click="this.showModalUpdate(rdv)">
            <div class="flex space-x-3 ml-2 items-center">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium">{{ rdv.nom }}</h3>
              </div>
              <p class="text-sm text-gray-500"> {{ getHourAndMinuteFromDate(new Date(rdv.heureDebut)) }} -
                {{ getHourAndMinuteFromDate(new Date(rdv.heureFin)) }} </p>
              <div :style="'background-color:' + rdv.couleur" class="w-6 h-6 rounded-full"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import RdvModalUpdate from "@/components/RdvModalUpdate";
import {formatNumber, getAllDaysFromYear, getHourAndMinuteFromDate, getMonthName} from "@/js/date_tools";
import {fetchDataGet} from "@/js/request";

export default {
  name: "YearVue",
  components: {
    RdvModalUpdate,
  },
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
      days: [],
      rdvs: [],
      selectedDate: [],
    };
  },
  mounted() {
    this.days = getAllDaysFromYear(this.date);
    this.fetchData();
  },
  methods: {
    getHourAndMinuteFromDate,
    fetchData: function () {
      fetchDataGet("year_planning/" + this.date.getFullYear())
          .then((res) => {
            this.rdvs = res;
          })
          .catch((err) => {
            console.log(err);
          });
      this.selectedDate = [];
    },
    getNameMonth(date) {
      return getMonthName(date);
    },
    getIfEventByDay(date, rdv) {
      let res = false;
      let day = new Date(date);
      day.setHours(0, 0, 0);
      rdv.forEach(function (event) {
        let d = new Date(event.date);
        d.setHours(0, 0, 0);
        if (d.getDate() === day.getDate() && d.getMonth() === day.getMonth() && d.getFullYear() === day.getFullYear()) {
          res = true;
        }
      });
      return res;
    },
    getEventOfDay(day) {
      const dateFormat =
          day.getFullYear() +
          "-" +
          formatNumber(day.getMonth() + 1) +
          "-" +
          formatNumber(day.getDate());
      fetchDataGet("day_planning/" + dateFormat)
          .then((res) => {
            this.selectedDate = res;
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
  }
};
</script>

<style scoped></style>
