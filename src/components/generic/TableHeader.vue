<template>
  <tr>
    <th
      v-for='(column, i) in columns'
      :key='i'
    >
      <span
        :class="classNames(
          'w-full flex flex-nowrap items-center',
          `rus-tb-h-align-${column.align}`,
        )"
      >
        <button
          v-if='column.sortable'
          type='button'
          @click='toggleBetweenSortDirections(column)'
        >
          {{ column.label }}
          <span v-if='column.sortActive'>
            <RusIcon
              :icon='mdiMenuUp'
              :class-name="classNames(
                'w-5 h-5 inline-block text-teal-600',
                {
                  'rotate-180': column.sortDirection === 'desc',
                }
              )"
            />
          </span>
        </button>
        <span v-else>
          {{ column.label }}
        </span>
      </span>
    </th>
  </tr>
</template>

<script setup lang='ts'>
import type { TableHeaderItem, TableSortDirection } from '@/interfaces/table';
import RusIcon from '@/components/generic/RusIcon.vue';
import { mdiMenuUp } from '@mdi/js';
import classNames from 'classnames';

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

<style scoped lang='scss'>
.rus-tb-h-align {
  &-left {
    &, button {
      @apply justify-start text-start;
    }
  }
  &-right {
    &, button {
      @apply justify-end text-end;
    }
  }
  &-center {
    &, button {
      @apply justify-center text-center;
    }
  }
}

// Header
tr:nth-child(1) {
  @apply bg-teal-200/30 w-full py-0 border-b border-slate-300
    z-10 sticky top-0 left-0;

  th {
    @apply text-lg font-medium text-teal-800 pr-2 pl-1 py-2;

    button {
      @apply flex flex-nowrap items-center flex-row
        focus:outline-none focus-visible:ring-1 rounded-md
        focus-visible:ring-teal-600 px-2 leading-5;
    }

    &:nth-last-child(1) {
      @apply pl-3 pr-8;
    }
  }
}
</style>
