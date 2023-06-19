import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { optionsForView } from '@/lib/data/user-table';
import { TableHeaderItemKey, TableSortDirection } from '@/interfaces/table';

export const useUserFilter = defineStore('user-filter', () => {
  // State
  const searchText = ref('');
  const userType = ref('');
  const tableView = ref(structuredClone(optionsForView));

  // Computed
  const filters = computed(() => {
    return {
      page: 1,
      page_size: 10,
      sort: TableSortDirection.Asc,
      sort_by: TableHeaderItemKey.CreatedAt,
      search_text: searchText.value,
      role: userType.value,
    };
  });

  return {
    searchText,
    userType,
    tableView,
    filters,
  };
});
