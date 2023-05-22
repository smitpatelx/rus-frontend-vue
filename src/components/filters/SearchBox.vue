<template>
  <div
    class='w-full max-w-xs relative group overflow-hidden
    focus-within:ring-1 focus-within:ring-teal-500 focus-within:outline-none
    ring-1 ring-slate-300 rounded-md'
  >
    <!-- Search SVG -->
    <span class='absolute left-0 top-1/2 transform
      -translate-y-1/2 text-sm w-10 h-full leading-none
      font-medium text-center text-slate-500
      group-focus-within:text-teal-500 rounded-l-md flex flex-wrap items-center
      justify-center'>
      <RusIcon
        :icon='mdiMagnify'
        className='w-6 h-6 group-focus-within:animate-pulse transition-all
          duration-200 ease-in-out origin-center'
      />
    </span>

    <!-- Search input -->
    <input
      type='text'
      class='w-full py-1.5 pl-10 pr-4 bg-slate-50 text-teal-700
        text-base focus:outline-none focus:ring-0
        placeholder-slate-400 border-0 focus:border-0 placeholder:select-none'
      placeholder='Search user    [Esc to clear]'
    >
  </div>
</template>

<script setup lang='ts'>
import RusIcon from '../generic/RusIcon.vue';
import { mdiMagnify } from '@mdi/js';
</script>
