<template>
  <thead>
    <tr class="relative">
      <th
        v-for="(column, i) in columns"
        :key="i"
        :class="classNames(
          {
            'sticky right-0 bg-teal-100 after-border': column.sticky,
          }
        )"
      >
        <span
          :class="classNames(
            'w-full flex flex-nowrap items-center',
            `rus-tb-h-align-${column.align}`,
          )"
        >
          <button
            v-if="column.sortable"
            type="button"
            @click="toggleBetweenSortDirections(column)"
          >
            {{ column.label }}
            <span v-if="column.sortActive">
              <RusIcon
                :icon="mdiMenuUp"
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
  </thead>
</template>

<script setup lang="ts">
import { TableSortDirection, type TableHeaderItem } from '@/interfaces/table';
import RusIcon from '@/components/generic/RusIcon.vue';
import { mdiMenuUp } from '@mdi/js';
import classNames from 'classnames';

defineProps<{
  columns: TableHeaderItem[];
}>();

const emit = defineEmits<{
  toggleSortDirection: [val: TableSortDirection],
  isSortActive: [val: boolean],
}>();

const toggleBetweenSortDirections = (col: TableHeaderItem) => {
  if (!col.sortable) return;

  if (col.sortDirection === undefined) {
    emit('toggleSortDirection', TableSortDirection.Asc);
    return;
  }
  if (col.sortDirection === TableSortDirection.Asc) {
    emit('toggleSortDirection', TableSortDirection.Desc);
    return;
  }
  if (col.sortDirection === TableSortDirection.Desc) {
    emit('isSortActive', false);
  }
}
</script>

<style lang="scss">
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
thead {
  @apply bg-white w-full py-0 z-10 sticky top-0 left-0 shadow-2xl
    shadow-teal-700/20;

  &::after {
    content: '';
    @apply absolute bottom-0 left-0 w-full h-[0.5px] bg-teal-500;
  }

  tr {
    @apply w-full bg-teal-300/30 py-0
      h-full;

    th {
      @apply text-lg font-medium text-teal-800 pr-2 pl-2 py-2
        whitespace-nowrap;

      button {
        @apply flex flex-nowrap items-center flex-row
          focus:outline-none focus-visible:ring-1 rounded-md
          focus-visible:ring-teal-600 leading-5 px-1;
      }

      & > span > span {
        @apply px-1;
      }

      &:nth-last-child(1) {
        @apply pl-3 pr-8;
      }
    }
  }
}

.after-border {
  &::before {
    content: '';
    @apply w-[0.5px] h-full bg-teal-500 z-50 absolute top-0 left-0;
  }
}
</style>
