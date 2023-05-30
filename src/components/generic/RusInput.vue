<template>
  <input
    v-bind='attrs'
    :class="classNames(
      'rus-input',
      {
        'rus-input-error': attrs.error,
      },
    )"
    v-maska:[options]
    :autocomplete='randomAlpha()'
  />
    <!-- :v-maska='mask !=="" ? vMaska : undefined' -->
  <div
    v-if='attrs.error'
    class='rus-error-text'
  >
    {{ attrs.error }}
  </div>
</template>

<script setup lang='ts'>
import { reactive, useAttrs } from 'vue';
import classNames from 'classnames';
import { vMaska } from 'maska';
import { randomAlpha } from '@/lib/helpers';

const attrs = useAttrs();
const props = defineProps({
  mask: {
    type: String,
    default: '',
  },
});

const options = reactive({
  mask: props.mask || null,
  eager: true,
});
</script>

<style scoped lang='scss'>
.rus-input {
  @apply py-2 px-3 leading-none text-base font-medium
    bg-teal-100/30 text-teal-900 rounded-md shadow-none
    ring-1 ring-teal-500/30 focus:ring-1 focus:ring-teal-500
    focus:ring-offset-1 focus:ring-offset-teal-100
    focus:outline-none focus:border-0 border-0
    placeholder-teal-500/60 placeholder:font-normal
    transition duration-200 ease-in-out tracking-wide;
  
  &.rus-input-error {
    @apply ring-red-500/30 focus:ring-red-500;
  }
}

.rus-error-text {
  @apply text-sm text-red-500 pt-1 pb-2.5 leading-4;
}
</style>