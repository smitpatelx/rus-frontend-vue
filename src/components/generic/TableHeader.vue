<template>
  <tr>
    <th
      v-for="(column, i) in columns"
      :key="i"
    >
      <span
        :class="classnames(
          'w-full flex flex-nowrap items-center',
          {
            'justify-start': column.align === 'left' || !column.align,
            'justify-end': column.align === 'right',
            'justify-center': column.align === 'center',
          }
        )"
      >
        <button
          v-if="column.sortable"
          type="button"
          @click="toggleBetweenSortDirections(column)"
        >
          {{ column.label }}
          <div v-if="column.sortable && column.sortActive">
            <RusIcon
              :icon="mdiMenuUp"
              :class-name="classnames(
                'w-5 h-5 text-teal-100',
                {
                  'rotate-180': column.sortDirection === 'desc',
                }
              )"
            />
          </div>
        </button>
        <span v-else>
          {{ column.label }}
        </span>
      </span>
    </th>
  </tr>
</template>

<script setup lang="ts">
import type { TableHeaderItem, TableSortDirection } from '@/interfaces/table';
import RusIcon from '@/components/generic/RusIcon.vue';
import { mdiMenuUp } from '@mdi/js';
import classnames from 'classnames';

defineProps<{
  columns: TableHeaderItem[];
}>();

const emit = defineEmits({
  toggleSortDirection: (val: TableSortDirection) => true,
  isSortActive: (val: boolean) => true
});

const toggleBetweenSortDirections = (col: TableHeaderItem) => {
  if (!col.sortable) return;

  if (col.sortDirection === undefined) {
    emit('toggleSortDirection', 'asc');
    return;
  }
  if (col.sortDirection === 'asc') {
    emit('toggleSortDirection', 'desc');
    return;
  }
  if (col.sortDirection === 'desc') {
    emit('isSortActive', false);
  }
}
</script>

<style scoped lang="scss">
// Header
tr:nth-child(1) {
  @apply bg-teal-500 w-full py-0 border-b border-slate-300
    z-10;

  th {
    @apply text-lg font-medium text-teal-50 pr-3 py-2;

    button {
      @apply flex flex-nowrap items-center
        focus:outline-none focus-visible:ring-1 rounded-md
        focus-visible:ring-teal-200 px-2;
    }
  }
}
</style>