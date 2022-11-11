<template>
  <li
      :style="
      formatGridRowAndSpanHeight(
        new Date(rdv.heureDebut),
        new Date(rdv.heureFin)
      )
    "
      class="relative mt-px flex"
      @click="$emit('updateModal', rdv)"
  >
    <a
        :style="'background-color:' + backgroundColor"
        class="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 card"
        href="#"
        @mouseleave="backgroundColor = convertHex(this.rdv.couleur, 0.6)"
        @mouseover="backgroundColor = backgroundColorHover"
    >
      <p class="order-1 font-semibold text-black-700">{{ rdv.nom }}</p>
      <p class="text-black-500 group-hover:text-black-700">
        <time datetime="2022-01-22T06:00">{{
            getHourAndMinuteFromDate(new Date(rdv.heureDebut))
          }}
        </time>
      </p>
    </a>
  </li>
</template>

<script>
import {convertHex, formatGridRowAndSpanHeight, getHourAndMinuteFromDate,} from "@/js/date_tools";

export default {
  name: "RdvDayVue",
  emits: ["updateModal"],
  props: {
    rdv: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      backgroundColor: convertHex(this.rdv.couleur, 0.6),
      backgroundColorHover: convertHex(this.rdv.couleur, 0.9),
      hover: false,
    };
  },
  methods: {
    formatGridRowAndSpanHeight,
    getHourAndMinuteFromDate,
    convertHex,
  },
};
</script>

<style scoped></style>
