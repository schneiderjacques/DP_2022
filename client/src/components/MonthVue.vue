<template>
  <RdvModalUpdate v-if="showUpdateModal" :rdv="rdvToUpdate"
                  class="h-screen w-screen w-full h-full p-0 fixed top-0 left-0"
                  @close="closeModaleUpdate"></RdvModalUpdate>
  <div class="lg:flex lg:h-full lg:flex-col">
    <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
        <div class="bg-white py-2">L<span class="sr-only sm:not-sr-only">un</span></div>
        <div class="bg-white py-2">M<span class="sr-only sm:not-sr-only">ar</span></div>
        <div class="bg-white py-2">M<span class="sr-only sm:not-sr-only">er</span></div>
        <div class="bg-white py-2">J<span class="sr-only sm:not-sr-only">eu</span></div>
        <div class="bg-white py-2">V<span class="sr-only sm:not-sr-only">en</span></div>
        <div class="bg-white py-2">S<span class="sr-only sm:not-sr-only">am</span></div>
        <div class="bg-white py-2">D<span class="sr-only sm:not-sr-only">im</span></div>
      </div>
      <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">

          <div v-for="day in days" :key="day.date" :class="[day.getMonth()=== new Date().getMonth() ? 'bg-white' : 'bg-gray-50 text-gray-500', 'relative py-2 px-3']">
            <time :datetime="day.date" :class="(day.getDate() === new Date().getDate() && day.getMonth()=== new Date().getMonth()) ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : undefined">{{ day.getDate() }}</time>
            <ol v-if="this.rdvs.length>0" class="mt-2">
              <li v-for="event in this.rdvs" :key="event.id">
                <a v-if="equalsDate(getFormatDate(event.date),day)" class="group flex" @click="showModalUpdate(event)">
                  <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                    {{ event.nom }}
                  </p>
                  <time :datetime="event.date" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"></time>
                </a>
              </li>
            </ol>
          </div>
        </div>
        <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
          <button v-for="day in days" :key="day.date" type="button" :class="[day.getMonth()=== new Date().getMonth() ? 'bg-white' : 'bg-gray-50', (day.getDay()=== new Date().getDay()) && 'font-semibold', 'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10']">
            <time :datetime="day.date" :class="[(day.getDate() === new Date().getDate() && day.getMonth()=== new Date().getMonth()) && 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600', 'ml-auto']">{{ day.getDate() }}</time>
            <span v-for="event in getMaxEventByDay(day, this.rdvs, 2)" :key="event.id" class="-mx-0.5 mt-auto flex flex-wrap-reverse">
              <span v-if="equalsDate(getFormatDate(event.date),day)" class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
            </span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="rdvDaily.length>0" class="py-10 px-4 sm:px-6 lg:hidden">
      <ol class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
        <li v-for="event in this.rdvDaily" :key="event.id" class="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
          <div class="flex-auto">
            <p class="font-semibold text-gray-900">{{ event.nom }}</p>
            <time :datetime="event.heureDebut" class="mt-2 flex items-center text-gray-700">
              <ClockIcon class="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              {{ event.date }}
            </time>
          </div>
          <a class="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100" @click="showModalUpdate(event)">Edit<span class="sr-only">, {{ event.nom }}</span></a>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import {fetchDataGet} from "@/js/request";
import {getAllDaysFromMonth} from "@/js/date_tools";
import RdvModalUpdate from "@/components/RdvModalUpdate";

export default {
  name: "MonthVue",
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
      rdvDaily:[],
    };
  },
  mounted() {
    this.days = getAllDaysFromMonth(this.date);
    this.getEvent();
  },
  methods: {
    getEvent:function (){
      //GET /month_planning/{month}/{year}
      fetchDataGet("month_planning/" +(this.date.getMonth()+1)+ "/"+this.date.getFullYear())
          .then((res) => {
            this.rdvs = res;
            this.getEventToday(this.rdvs);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    getFormatDate:function(date){
      var d = new Date(date);
      d.setHours(0,0,0);
      return new Date(d);
    },
    equalsDate:function(date1, date2){
      return date1.getTime() === date2.getTime();
    },
    showModalUpdate(rdv) {
      this.rdvToUpdate = rdv;
      this.showUpdateModal = true;
    },
    closeModaleUpdate() {
      this.showUpdateModal = false;
    },
    getEventToday(rdv){
      let res = [];
      let daily = new Date();
      daily.setHours(0,0,0);
      rdv.forEach(function(event){
        let d = new Date(event.date);
        d.setHours(0,0,0);
        if(d.getDate()===daily.getDate()){
          res.push(event);
        }
      });
      this.rdvDaily = res;
    },
    getMaxEventByDay(date, rdv, n){
      console.log(date);
      let res = [];
      let nb = 0;
      let day = new Date(date);
      day.setHours(0,0,0);
      rdv.forEach(function(event){
        let d = new Date(event.date);
        d.setHours(0,0,0);
        if(d.getDate()===day.getDate()){
          if(nb<n){
            res.push(event);
            nb++;
          }
        }
      });
      return res;
    },
    getNbEventByDay(date, rdv){
      console.log(date);
      let nb = 0;
      let day = new Date(date);
      day.setHours(0,0,0);
      rdv.forEach(function(event){
        let d = new Date(event.date);
        d.setHours(0,0,0);
        if(d.getDate()===day.getDate()){
          nb++;
        }
      });
      return nb;
    },
  }
};
</script>

<style scoped></style>
