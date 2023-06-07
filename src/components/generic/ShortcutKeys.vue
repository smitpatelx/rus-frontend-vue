<template>
  <div class="shortcut-container">
    <slot>
      <kbd>
        <RusIcon :icon="mdiAppleKeyboardCommand" />
        <span>/</span>
      </kbd>

      <kbd> Esc </kbd>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { mdiAppleKeyboardCommand } from '@mdi/js';
import RusIcon from './RusIcon.vue';

defineSlots<{
  default: (props: unknown) => any[]
}>();
</script>

<style scoped lang="scss">
.shortcut-container {
  @apply w-auto py-0.5 px-1 bg-slate-100/20 border-0 rounded
    text-slate-700 flex flex-nowrap flex-row items-center justify-center
    gap-x-1 font-medium text-sm text-center select-none pointer-events-none;

  kbd {
    @apply w-auto px-2 py-1 first-letter:capitalize rounded-md bg-teal-600/20
      leading-none align-middle flex flex-nowrap flex-row items-center justify-center
      gap-x-2.5 text-teal-700 select-none pointer-events-none;

    svg {
      @apply w-3.5 h-3.5 group-focus-within:animate-pulse transition-all
        duration-200 ease-in-out origin-center pointer-events-none;
    }
  }
}
</style>
