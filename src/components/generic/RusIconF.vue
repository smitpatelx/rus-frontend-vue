<template>
  <svg
    viewBox='0 0 24 24'
    :class='`fill-transparent stroke-current inline-block ${className}`'
  >
    <use :href='`/feather-sprite/feather-sprite.svg#${icon}`'></use>
  </svg>
</template>

<script setup lang='ts'>
type PropsType = {
  icon: string,
  className?: string,
};

withDefaults(defineProps<PropsType>(), {
  className: 'w-5 h-5 text-current',
});
</script>
