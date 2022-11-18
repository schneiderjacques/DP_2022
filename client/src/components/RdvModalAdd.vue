<template>
  <transition name="modal">
    <div
        class="h-screen w-screen fixed z-10 bg-opacity-50 bg-bg-regal-blue flex items-center justify-center"
    >
      <div class="bg-white rounded-lg h-auto w-2/5 slide-in-top">
        <div class="pl-4 pr-4 pt-4 flex-col w-full">
          <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row justify-start items-center">
              <h1 class="text-3xl font-semibold">Rendez-vous</h1>
              <div
                  class="ml-5 rounded-xl px-1 pt-1 pb-1 bg-other-blue text-white select-none flex items-center"
              >
                <h1 class="text-md">Création</h1>
              </div>
            </div>
            <span
                class="text-3xl font-semibold select-none cursor-pointer text-gray-600 hover:scale-125 hover:text-black"
                @click="$emit('close')"
            >&times;</span
            >
          </div>

          <div
              class="mt-7 border-t-gray-200 border-opacity-50 border-t-2 w-full pb-7"
          >
            <ErrorVue v-if="errorShown" :msg="textError" class="mt-1"></ErrorVue>
            <div class="mt-5">
              <span class="text-sm font-medium text-gray-700"
              >Jour du rendez-vous</span
              >
            </div>

            <div class="w-full mt-2 flex flex-row justify-between items-center">
              <div v-if="isTextDiv"
                   class="w-1/2 border-gray-200 border flex justify-between items-center rounded-xl font-semibold relative select-none shadow-sm"
                   @click="changeState"
              >
                <input
                    id="date-picker"
                    v-model="date"
                    class="ml-4 focus:border-none p-1 w-3/5 focus:outline-none outline-0 placeholder:font-normal"
                    onblur="this.type='text'"
                    onfocus="this.type='date'"
                    placeholder=""
                    type="text"
                />
                <span class="mr-4 border-l-2 border-gray-200 pl-3"
                ><svg
                    class="w-5 h-5 cursor-pointer hover:stroke-gray-900"
                    fill="none"
                    stroke="gray"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div class="mt-5 flex flex-row justify-between items-center">
              <div class="w-1/2 px-1">
                <label class="text-sm font-medium text-gray-700" for="email"
                >Debut du rdv</label
                >
                <div
                    class="p-2 mt-2 border-gray-200 border flex rounded-xl flex-row justify-start items-center w-full shadow-sm"
                >
                  <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>

                  <button
                      class="ml-6 bg-other-blue text-white hover:text-white hover:bg-blue-700 h-full w-6 rounded cursor-pointer outline-none"
                      data-action="decrement-first"
                      @click="decrementFirst(true)"
                  >
                    <span class="m-auto text-1xl font-thin">−</span>
                  </button>
                  <input
                      v-model="heureDebut"
                      class="focus:outline-none text-center w-12 bg-transparent font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none"
                      name="custom-input-number"
                      type="text"
                  />
                  <button
                      class="bg-other-blue text-white hover:text-white hover:bg-blue-700 h-full w-6 rounded cursor-pointer"
                      data-action="increment-first"
                      @click="incrementFirst(true)"
                  >
                    <span class="m-auto text-1xl font-thin">+</span>
                  </button>
                </div>
              </div>
              <div class="w-1/2 px-1">
                <label class="text-sm font-medium text-gray-700" for="email"
                >Fin du rdv</label
                >
                <div
                    class="p-2 mt-2 border-gray-200 border flex rounded-xl flex-row justify-start items-center w-full shadow-sm"
                >
                  <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>

                  <button
                      class="ml-6 bg-other-blue text-white hover:text-white hover:bg-blue-700 h-full w-6 rounded cursor-pointer outline-none"
                      data-action="decrement-first"
                      @click="decrementFirst(false)"
                  >
                    <span class="m-auto text-1xl font-thin">−</span>
                  </button>
                  <input
                      id="input-second"
                      v-model="heureFin"
                      class="focus:outline-none text-center w-12 bg-transparent font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none"
                      name="custom-input-number"
                      type="text"
                  />
                  <button
                      class="bg-other-blue text-white hover:text-white hover:bg-blue-700 h-full w-6 rounded cursor-pointer"
                      data-action="increment-first"
                      @click="incrementFirst(false)"
                  >
                    <span class="m-auto text-1xl font-thin">+</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-5">
              <span class="font-normal">Description</span>
              <textarea
                  id="textarea"
                  v-model="desc"
                  class="w-full mt-2 border-gray-200 border rounded-lg p-2 resize-none shadow-sm"
                  cols="30"
                  maxlength="30"
                  name=""
                  placeholder="Entrer une description..."
                  rows="5"
              ></textarea>
            </div>
            <div class="w-full mt-4">
              <RadioGroup v-model="selectedColor">
                <RadioGroupLabel class="block text-sm font-medium text-gray-700">Choose a label color</RadioGroupLabel>
                <div class="mt-4 flex items-center space-x-3">
                  <RadioGroupOption v-for="color in colors" :key="color.name" v-slot="{ active, checked }"
                                    :value="color"
                                    as="template">
                    <div
                        :class="[color.selectedColor, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none']">
                      <RadioGroupLabel as="span" class="sr-only">{{ color.name }}</RadioGroupLabel>
                      <span :class="[color.bgColor, 'h-8 w-8 border border-black border-opacity-10 rounded-full']"
                            aria-hidden="true"/>
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div>

            <div class="flex flex-row justify-end items-center mt-5">
              <button
                  class="mr-4 text-special-gray pt-2 pb-2 px-4 font-medium bg-white rounded-2xl border-transparent border transition-all hover:border-red-700 hover:bg-red-700 hover:text-white active:bg-red-800"
                  @click="$emit('close')"
              >
                Annuler
              </button>
              <input
                  id="confirm_button"
                  class="text-white pt-2 pb-2 px-4 font-medium transition-all border-other-blue border bg-other-blue rounded-2xl hover:text-other-blue hover:bg-white active:bg-other-blue active:text-white"
                  type="submit"
                  value="Confirmer"
                  @click="createRdv"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {RadioGroup, RadioGroupLabel, RadioGroupOption} from '@headlessui/vue'
import ErrorVue from "@/components/ErrorVue";
import {fetchDataConnected} from "@/js/request";
import {changeState, decrementFirst, incrementFirst} from "@/js/date_tools";

export default {
  name: "RdvModalAdd",
  emits: ['updateData','close'],
  components: {
    ErrorVue,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  },
  data() {
    return {
      isTextDiv: true,
      heureDebut: '00:00',
      heureFin: '00:00',
      desc: '',
      date: '',
      colors: [
        {name: '#ec4899', bgColor: 'bg-pink-500', selectedColor: 'ring-pink-500'},
        {name: '#8b5cf6', bgColor: 'bg-purple-500', selectedColor: 'ring-purple-500'},
        {name: '#091e42', bgColor: 'bg-bg-regal-blue', selectedColor: 'ring-bg-regal-blue'},
        {name: '#22c55e', bgColor: 'bg-green-500', selectedColor: 'ring-green-500'},
        {name: '#eab308', bgColor: 'bg-yellow-500', selectedColor: 'ring-yellow-500'},
      ],
      selectedColor: [],
      errorShown: false,
      textError: ''
    }
  },
  mounted() {
    this.selectedColor = this.colors[0]
  },
  methods: {
    incrementFirst,
    decrementFirst,
    changeState,
    createRdv() {
      this.errorShown = false;
      this.textError = '';
      let body = {
        'date': this.date,
        'heureDebut': this.heureDebut,
        'heureFin': this.heureFin,
        'nom': this.desc,
        'couleur': this.selectedColor.name
      }
      if (body.date.trim().length === 0 || /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/.test(body.date.trim())) {
        this.textError = 'Veuillez entrer une date valide'
        this.errorShown = true
        return 0
      }
      if (body.heureDebut.trim().length === 0 || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(body.heureDebut.trim())) {
        this.textError = 'Veuillez entrer une heure de début valide'
        this.errorShown = true
        return 0
      }
      if (body.heureFin.trim().length === 0 || !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(body.heureFin.trim())) {
        this.textError = 'Veuillez entrer une heure de fin valide'
        this.errorShown = true
        return 0
      }
      body.heureDebut = body.date + " " + body.heureDebut + ":00";
      body.heureFin = body.date + " " + body.heureFin + ":00";
      if (new Date(body.heureDebut) >= new Date(body.heureFin)) {
        this.textError = 'L\'heure de début doit être inférieure à l\'heure de fin'
        this.errorShown = true
        return 0
      }
      if (body.nom.trim().length === 0) {
        this.textError = 'Veuillez entrer une description'
        this.errorShown = true
        return 0
      }
      if (body.couleur.trim().length === 0) {
        this.textError = 'Veuillez choisir une couleur'
        this.errorShown = true
        return 0
      }
      fetchDataConnected(JSON.stringify(body), 'PUT', 'add_appointment')
          .then((response) => {
            if (response.status === 201) {
              this.$emit('updateData')
              this.$emit("close")
            } else {
              this.textError = 'Vous avez déjà un rendez-vous dans ce créneau'
              this.errorShown = true
            }
          })

    },

  }
}
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
