<template>
  <div
    class='w-full px-4 py-4 bg-slate-100 border-b border-slate-200
      flex flex-nowrap items-center justify-between'
  >
    <SearchBox />
    
    <div class='flex flex-row flex-wrap items-center justify-end
      gap-1.5 md:gap-y-2 md:gap-x-2 xl:gap-x-4'>
      <ResyncBtn />
      <FilterUserType />
      <FilterViewMode />
    </div>
  </div>
</template>

<script setup lang='ts'>
import SearchBox from '@/components/filters/SearchBox.vue';
import FilterUserType from '@/components/filters/FilterUserType.vue';
import ResyncBtn from '@/components/filters/ResyncBtn.vue';
import FilterViewMode from './FilterViewMode.vue';
</script>
