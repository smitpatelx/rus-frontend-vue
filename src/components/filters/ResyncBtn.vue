<template>
  <button
    @click.capture='handleButtonClick'
    type='button'
    class='pl-3 pr-4 py-2 text-base font-medium text-teal-50 select-none
      bg-gradient-to-br from-teal-200 to-teal-600 hover:bg-teal-200 hover:text-teal-800 group
      focus:outline-none ring-1 ring-teal-500 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-teal-600
      focus-visible:ring-offset-slate-100 focus:border-0 transition-all duration-300 ease-in-out rotate-360
      rounded-md space-x-1.5 leading-none flex flex-nowrap items-center justify-center'
  >
    <RusIcon
      :key='renderCount.count'
      :icon='mdiRefresh'
      class-name='w-5 h-5'
    />
    <span>
      Resync
    </span>
  </button>
</template>

<script setup lang='ts'>
import RusIcon from '@/components/generic/RusIcon.vue';
import { mdiRefresh } from '@mdi/js';
import { reactive } from 'vue';

const renderCount = reactive({ count: 0 });

const handleButtonClick = () => {
  renderCount.count++;
  console.log('Button clicked');
}
</script>

<style scoped lang='scss'>
.rotate-360 {
  & > svg {
    animation: rotate 1s ease-out 1;
    transform-origin: center;

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
