<template>
  <div class='w-full h-screen overflow-y-hidden bg-slate-50 flex flex-col flex-nowrap'>
    <AppHeader />
    <!-- Filter container -->
    <FilterContainer />
    
    <main class='flex-1 flex flex-col h-full overflow-y-auto'>
      <RusMainPage />
    </main>
  </div>
</template>

<script setup lang='ts'>
import FilterContainer from './components/filters/FilterContainer.vue';
import RusMainPage from './components/RusMainPage.vue';
import AppHeader from './components/generic/AppHeader.vue';
</script>
