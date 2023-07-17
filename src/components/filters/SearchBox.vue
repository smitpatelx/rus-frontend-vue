<template>
  <div
    id="rus-account-search"
    class="group"
  >
    <!-- Search SVG -->
    <span class="search-icon-container group-focus-within:text-teal-500">
      <RusIcon
        :icon="mdiMagnify"
        className="group-focus-within:animate-pulse"
      />
    </span>

    <!-- Search input -->
    <input
      ref="searchInputRef"
      type="text"
      placeholder="Search Accounts"
      v-model="search"
      @keyup.stop.prevent.esc="clearSearch"
    />

    <!-- Shortcut Icons -->
    <span class="shortcut-icon">
      <Transition name="slide-in-blurred-right">
        <ShortcutKeys v-if="search?.length === 0" />
      </Transition>
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import RusIcon from '../generic/RusIcon.vue';
import ShortcutKeys from '../generic/ShortcutKeys.vue';
import {
  mdiMagnify
} from '@mdi/js';
import { refDebounced } from '@vueuse/core';
import { useUserFilter } from '@/stores/user-filters';

const filterStore = useUserFilter();

const search = ref('');
const searchD = refDebounced(search, 1000);

const searchInputRef = ref<HTMLInputElement | null>(null);

watch(searchD, (value) => {
  filterStore.searchText = value;
});

const clearSearch = () => {
  search.value = '';
  if (searchInputRef.value) {
    searchInputRef.value?.focus();
  }
}

onMounted(() => {
  const handleKeys = (e: KeyboardEvent) => {
    if (e.key === '/' && e.metaKey === true) {
      e.preventDefault();
      e.stopPropagation();
      if (searchInputRef.value) {
        searchInputRef.value.select();
        searchInputRef.value?.focus();
      }
    }
  }

  // Listen globally for Cmd + / to focus the search box
  window.addEventListener('keydown', handleKeys, true);

  // Unsubscribe from the global listener when the component is unmounted
  return () => {
    window.removeEventListener('keydown', handleKeys, true);
  }
})
</script>

<style lang="scss">
#rus-account-search {
  @apply w-full max-w-sm relative overflow-hidden
    focus-within:ring-1 focus-within:ring-teal-500 focus-within:outline-none
    ring-1 ring-slate-300 rounded-md;

  .search-icon-container {
    @apply absolute left-0 top-1/2 transform
      -translate-y-1/2 text-sm w-10 h-full leading-none
      font-medium text-center text-slate-500
      rounded-l-md flex flex-wrap items-center
      justify-center;

    svg {
      @apply w-6 h-6 transition-all
        duration-200 ease-in-out origin-center;
    }
  }

  input {
    @apply w-full py-1.5 pl-10 pr-4 bg-slate-50 text-teal-700
      text-base focus:outline-none focus:ring-0
      placeholder-slate-400 border-0 focus:border-0 placeholder:select-none;
  }

  .shortcut-icon {
    @apply absolute right-0 top-1/2 transform -translate-x-1 -translate-y-1/2
      bg-transparent p-0 m-0;
  }
}
</style>
