<template>
  <button
    type="button"
    class="px-4 py-2 text-base font-medium text-teal-50 select-none
      bg-teal-600 hover:bg-teal-200 hover:text-teal-800 group
      focus:outline-none ring-1 ring-teal-500 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-teal-600
      focus-visible:ring-offset-slate-100 focus:border-0 transition-all duration-300 ease-in-out
      rounded-l-md gap-x-1.5 leading-none flex flex-nowrap items-center justify-center"
  >
    <RusIcon
      :icon="mdiTableHeadersEye"
      class-name="w-5 h-5"
    />
    <span> View </span>
    <span
      v-if="selectedOptions && selectedOptions?.length > 0"
      class="border border-teal-500 group-hover:border-teal-400
        ml-1.5 text-sm bg-teal-200 text-teal-800 rounded-full p-0
        leading-none flex flex-nowrap items-center justify-center h-5
        shadow-none group-hover:bg-teal-600 group-hover:text-teal-50
        transition-all duration-300 ease-in-out overflow-hidden font-medium"
    >
      <p class="rounded-full overflow-hidden py-0 px-1.5">{{ selectedOptions.length }}</p>
    </span>
  </button>
</template>

<script setup lang="ts">
import RusIcon from '@/components/generic/RusIcon.vue';
import type { Options } from '@/interfaces/table';
import { mdiTableHeadersEye } from '@mdi/js';

defineProps<{
  options: Options;
  selectedOptions?: Options;
}>();
</script>
