<template>
  <thead>
    <tr class="relative">
      <th
        v-for="(column, i) in columns"
        :key="i"
        :class="cn(
          {
            'sticky right-0 bg-teal-100 after-border': column.sticky,
          }
        )"
      >
        <span
          :class="cn(
            'w-full flex flex-nowrap items-center',
            `rus-tb-h-align-${column.align}`,
          )"
        >
          <button
            v-if="column.sortable"
            type="button"
            @click="toggleBetweenSortDirections(column.key, column.sortDirection)"
          >
            {{ column.label }}
            <span
              :class="cn({
                'opacity-0': !(column?.sortDirection !== undefined && filterStore.sortBy === column.key && column.sortDirection !== null)
              })"
            >
              <RusIcon
                :icon="mdiMenuUp"
                :class-name="cn(
                  'w-5 h-5 inline-block text-teal-600',
                  'transform transition-all duration-300 ease-out',
                  {
                    'rotate-180': column.sortDirection === TableSortDirection.Desc,
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
import { TableSortDirection, type TableHeaderItem, TableHeaderItemKey } from '@/interfaces/table';
import RusIcon from '@/components/generic/RusIcon.vue';
import { mdiMenuUp } from '@mdi/js';
import { cn } from '@/lib/utils';
import { useUserFilter } from '@/stores/user-filters';

const filterStore = useUserFilter();

defineProps<{
  columns: TableHeaderItem[];
}>();

const toggleSortDirection = (key: TableHeaderItemKey, sortD?: TableSortDirection | null) => {
  if (filterStore.sortBy !== key) {
    filterStore.sortBy = key;
    filterStore.sortDirection = TableSortDirection.Asc;
    return;
  } else if (filterStore.sortBy === key) {
    filterStore.sortBy = key;

    if (sortD === null) {
      filterStore.sortDirection = TableSortDirection.Asc;
    } else if (sortD === TableSortDirection.Asc) {
      filterStore.sortDirection = TableSortDirection.Desc;
    } else if (sortD === TableSortDirection.Desc) {
      filterStore.sortDirection = null;
    }
    return;
  }
};

const toggleBetweenSortDirections = (
  key: TableHeaderItemKey,
  sortDirection?: TableSortDirection | null
) => {
  console.log('toggleBetweenSortDirections', key, sortDirection);
  toggleSortDirection(key, sortDirection);
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
