<template>
  <RdvModalUpdate v-if="showUpdateModal" :rdv="rdvToUpdate"
                  class="h-screen w-screen w-full h-full p-0 fixed top-0 left-0"
                  @close="closeModaleUpdate"></RdvModalUpdate>
  <div>
    <div class="bg-white">
      <div class="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
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
            <button v-for="(day, dayIdx) in month.days" :key="day.date" type="button" :class="[(getNameMonth(day)=== month.name) ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400', dayIdx === 0 && 'rounded-tl-lg', dayIdx === 6 && 'rounded-tr-lg', dayIdx === month.days.length - 7 && 'rounded-bl-lg', dayIdx === month.days.length - 1 && 'rounded-br-lg', 'py-1.5 hover:bg-gray-100 focus:z-10']">
              <time :datetime="day.date" :class="[(day.getDate() === new Date().getDate() && day.getMonth()=== new Date().getMonth()) && 'bg-indigo-600 font-semibold text-white', 'mx-auto flex h-7 w-7 items-center justify-center rounded-full']">{{ day.getDate() }}</time>
              <span v-if="getIfEventByDay(day, this.rdvs)" class="absolute -mt-0.5 flex flex-wrap-reverse">
                  <span class="mx-0.5 mb-0.5 h-1.5 w-1.5 rounded-full bg-gray-400" />
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

import RdvModalUpdate from "@/components/RdvModalUpdate";
import {getAllDaysFromYear, getMonthName} from "@/js/date_tools";
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
    };
  },
  mounted() {
    this.days = getAllDaysFromYear(this.date);
    this.fetchData();
  },
  methods: {
    fetchData:function (){
      fetchDataGet("month_planning/" +(this.date.getMonth()+1)+ "/"+this.date.getFullYear())
          .then((res) => {
            this.rdvs = res;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    getNameMonth(date){
      return getMonthName(date);
    },
    getIfEventByDay(date, rdv){
      let res = false;
      let day = new Date(date);
      day.setHours(0,0,0);
      rdv.forEach(function(event){
        let d = new Date(event.date);
        d.setHours(0,0,0);
        if(d.getDate()===day.getDate() && d.getMonth()===day.getMonth() && d.getFullYear()===day.getFullYear()){
          console.log(day);
          res = true;
        }
      });
      return res;
    }
  }
};
</script>

<style scoped></style>
