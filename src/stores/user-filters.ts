import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserFilter = defineStore('user-filter', () => {
  const searchText = ref('');
  const userType = ref('all');
  const tableView = ref([]);


  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
