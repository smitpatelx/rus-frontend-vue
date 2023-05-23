<template>
  <input
    v-bind="$attrs"
    class="rus-input"
  />
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.rus-input {
  @apply py-2 px-3 leading-none text-base font-medium
    bg-teal-100/30 text-teal-900 rounded-md shadow
    ring-1 ring-teal-500/30 focus:ring-1 focus:ring-teal-500
    focus:ring-offset-1 focus:ring-offset-teal-100
    focus:outline-none focus:border-0;
}
</style>