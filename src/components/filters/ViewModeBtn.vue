<template>
  <button
    @click.capture='handleButtonClick'
    type='button'
    class='px-4 py-2 text-base font-medium text-teal-50 select-none
      bg-teal-600 hover:bg-teal-200 hover:text-teal-800 group
      focus:outline-none ring-1 ring-teal-500 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-teal-600
      focus-visible:ring-offset-slate-100 focus:border-0 transition-all duration-300 ease-in-out
      rounded-md gap-x-1.5 leading-none flex flex-nowrap items-center justify-center'
  >
    <RusIcon
      :icon='mdiTableHeadersEye'
      class-name='w-5 h-5'
    />
    <span>
      View
    </span>
  </button>
</template>

<script setup lang='ts'>
import RusIcon from '@/components/generic/RusIcon.vue';
import { mdiTableHeadersEye } from '@mdi/js';

const handleButtonClick = () => {
  console.log('Button clicked');
}
</script>
