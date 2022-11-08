<template>
  <header class="flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6">
    <div>
      <h1 class="text-lg font-semibold leading-6 text-gray-900">
        <time datetime="2022-01-22" class="sm:hidden"> {{ completeDate }}</time>
        <time datetime="2022-01-22" class="hidden sm:inline">{{completeDate}}</time>
      </h1>
    </div>
    <div class="flex items-center">
      <div class="flex items-center rounded-md shadow-sm md:items-stretch">
        <button @click="previous"  type="button" class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
          <span class="sr-only">Previous month</span>
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block">{{ formatedDate }}</button>
        <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
        <button @click="next" type="button" class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
          <span class="sr-only">Next month</span>
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden md:ml-4 md:flex md:items-center">
        <Menu as="div" class="relative">
          <MenuButton type="button" class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Vue de Jour
            <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          </MenuButton>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <router-link to="/day"><a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Jour</a></router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link to="/week"><a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Semaine</a></router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link to="/month"><a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Mois</a></router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Année</a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <div class="ml-6 h-6 w-px bg-gray-300" />
        <button type="button" class="ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Ajouter un RDV</button>
      </div>
      <Menu as="div" class="relative ml-6 md:hidden">
        <MenuButton class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
          <span class="sr-only">Open menu</span>
          <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
        </MenuButton>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Ajouter un RDV</a>
              </MenuItem>
            </div>
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Jour</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Semaine</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Mois</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Année</a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </header>
</template>

<script>
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {formatDate, getDateName} from '@/js/date_tools.js'
export default {
  name: 'HeaderVue',
  components: {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  },
  data() {
    return {
      completeDate: '',
      formatedDate: '',
      date: null,
    }
  },
  mounted() {
    console.log(localStorage.getItem('currentDate'))
    this.date = new Date(localStorage.getItem('currentDate'));
    this.completeDate = getDateName(this.date);
    this.formatedDate = formatDate(this.date)
  },
  methods: {
    changeDateToParent(){
      localStorage.setItem('currentDate', this.date.toISOString().slice(0, 10));
      console.log(localStorage.getItem('currentDate'))
      this.$emit('changeDate', this.date)
    },
    next: function (){
      console.log(this.$route.name);
      switch (this.$route.name){
        case "DayVue":
          this.setNexDay(1);
          break;
        case "WeekVue":
          this.setNexDay(7);
          break;
      }
    },
    previous: function (){
      switch (this.$route.name){
        case "DayVue":
          this.setNexDay(-1);
          break;
        case "WeekVue":
          this.setNexDay(-7);
          break;
      }
    },
    setNexDay: function (nb) {
      this.date.setDate(this.date.getDate() + nb);
      this.changeDateToParent();
    },
    setNextMonth: function (){
      this.date.setMonth(this.date.getMonth() + 1);
      this.changeDateToParent();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
