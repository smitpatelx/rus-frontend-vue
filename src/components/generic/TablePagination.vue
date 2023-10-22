<template>
  <button
    title="Previous page"
    @click="handlePageChange(props.currentPage - 1)"
    @keyup.capture.enter="handlePageChange(props.currentPage - 1)"
    :disabled="props.currentPage <= 1"
    class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
      hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
      duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
      focus-visible:ring-offset-1 focus-visible:ring-teal-600
      focus-visible:ring-offset-slate-100 active:scale-110 disabled:opacity-50
      select-none cursor-pointer"
  >
    <RusIcon :icon="mdiChevronLeft" />
  </button>

  <button
    v-for="record in pages"
    :key="record"
    @click="handlePageChange(record)"
    @keyup.capture.enter="handlePageChange(record)"
    :class="cn(
      `w-9 h-9 flex items-center justify-center rounded-full bg-slate-500/20
      text-slate-500 duration-300 ease-in-out transition-all focus:outline-none
      focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-teal-600
      focus-visible:ring-offset-slate-100 active:scale-110
      text-base font-medium select-none cursor-pointer`,
      {
        'bg-teal-500 text-teal-100': record === props.currentPage,
      }
    )"
  >
    {{record || '--'}}
  </button>

  <button
    @click="handlePageChange(props.currentPage + 1)"
    @keyup.capture.enter="handlePageChange(props.currentPage + 1)"
    title="Next page"
    :disabled="props.currentPage >= totalPages"
    class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
      hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
      duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
      focus-visible:ring-offset-1 focus-visible:ring-teal-600
      focus-visible:ring-offset-slate-100 active:scale-110 disabled:opacity-50
      select-none cursor-pointer"
  >
    <RusIcon :icon="mdiChevronRight" />
  </button>
</template>

<script setup lang="ts">
import RusIcon from '@/components/generic/RusIcon.vue';
import { cn } from '@/lib/utils';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { computed } from 'vue';

const props = defineProps<{
  totalRecords: number,
  currentPage: number,
  pageSize: number,
}>();

const emit = defineEmits<{
  pageChanged: [number]
}>();

const totalPages = computed(() => Math.ceil(props.totalRecords / props.pageSize));

const pages = computed(() => {
  const pageArray = Array(totalPages.value).fill(null).map((_, i) => i + 1);

  // Always show 5 pages
  if (pageArray.length <= 5) {
    return pageArray;
  }

  const start = props.currentPage - 3;
  const end = props.currentPage + 2;

  const res = pageArray.slice(
    start < 0 ? 0 : start,
    end > pageArray.length ? pageArray.length : end
  );

  return res;
});

const handlePageChange = (page: number) => {
  emit("pageChanged", page);
};
</script>
