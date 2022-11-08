<template>
  <div class="rounded-md bg-red-50">
    <div class="flex p-4 mb-4">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">{{ msg }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { XCircleIcon } from '@heroicons/vue/20/solid'
export default {
  name: "ErrorVue",
  components: {
    XCircleIcon
  },
  props:{
    msg: String
  }
}
</script>

<style scoped>

</style>
