import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { optionsForView } from '@/lib/data/user-table';

export const useUserFilter = defineStore('user-filter', () => {
  const searchText = ref('');
  const userType = ref('all');
  const tableView = ref([...optionsForView]);


  // const doubleCount = computed(() => count.value * 2)
  const clearSearchText = () => {
    searchText.value = '';
  }

  return {
    searchText,
    userType,
    tableView,
    clearSearchText,
  }
})
