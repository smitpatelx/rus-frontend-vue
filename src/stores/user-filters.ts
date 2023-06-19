import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { optionsForView } from '@/lib/data/user-table';
import { TableHeaderItemKey, TableSortDirection } from '@/interfaces/table';

export const useUserFilter = defineStore('user-filter', () => {
  const searchText = ref('');
  const userType = ref('');
  const tableView = ref([...optionsForView]);

  // const doubleCount = computed(() => count.value * 2)
  const clearSearchText = () => {
    searchText.value = '';
  };

  const filters = computed(() => ({
    page: 1,
    page_size: 10,
    sort: TableSortDirection.Asc,
    sort_by: TableHeaderItemKey.CreatedAt,
    search_text: searchText.value,
    role: userType.value,
  }));

  return {
    searchText,
    userType,
    tableView,
    clearSearchText,
    filters,
  };
});
