<template>
  <svg
    viewBox='0 0 24 24'
    fill='currentcolor'
    :class='`fill-current inline-block ${className}`'
  >
    <path :d='icon'></path>
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
