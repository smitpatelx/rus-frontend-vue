import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { optionsForView } from '@/lib/data/user-table';
import { TableHeaderItemKey, TableSortDirection, type Options } from '@/interfaces/table';

export const useUserFilter = defineStore('user-filter', () => {
  // State
  const searchText = ref('');
  const userType = ref('');
  const tableView = ref<Options>(structuredClone(optionsForView));
  const sortDirection = ref<TableSortDirection | null>(TableSortDirection.Asc);
  const sortBy = ref<TableHeaderItemKey>(TableHeaderItemKey.CreatedAt);

  // Computed
  const filters = computed(() => {
    return {
      page: 1,
      page_size: 10,
      sort: sortDirection.value,
      sort_by: sortBy.value,
      search_text: searchText.value,
      role: userType.value,
    };
  });

  return {
    searchText,
    userType,
    tableView,
    sortDirection,
    sortBy,
    filters,
  };
});
