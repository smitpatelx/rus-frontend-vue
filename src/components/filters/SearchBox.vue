<template>
  <div
    class="w-full max-w-sm relative group overflow-hidden
    focus-within:ring-1 focus-within:ring-teal-500 focus-within:outline-none
    ring-1 ring-slate-300 rounded-md"
  >
    <!-- Search SVG -->
    <span
      class="absolute left-0 top-1/2 transform
      -translate-y-1/2 text-sm w-10 h-full leading-none
      font-medium text-center text-slate-500
      group-focus-within:text-teal-500 rounded-l-md flex flex-wrap items-center
      justify-center"
    >
      <RusIconF
        icon="search"
        className="w-6 h-6 group-focus-within:animate-pulse transition-all
          duration-200 ease-in-out origin-center stroke-2"
      />
    </span>

    <!-- Search input -->
    <input
      ref="searchInputRef"
      type="text"
      class="w-full py-1.5 pl-10 pr-4 bg-slate-50 text-teal-700
        text-base focus:outline-none focus:ring-0
        placeholder-slate-400 border-0 focus:border-0 placeholder:select-none"
      placeholder="Search Accounts"
      v-model="search"
      @keyup.stop.esc="clearSearch"
    />

    <!-- Shortcut Icons -->
    <span
      class="absolute right-0 top-1/2 transform -translate-x-1 -translate-y-1/2
        bg-transparent p-0 m-0"
    >
      <Transition name="slide-in-blurred-right">
        <ShortcutKeys v-if="search?.length === 0" />
      </Transition>
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import RusIconF from '../generic/RusIconF.vue';
import ShortcutKeys from '../generic/ShortcutKeys.vue';

const search = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);

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
      search.value = '';
      if (searchInputRef.value) {
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
