<template>
  <div class='grid grid-cols-1 flex-grow h-full'>
    <div class='col-span-1 flex flex-nowrap flex-col'>
      <!-- Filter container -->
      <FilterContainer />
      <!-- Filtered user list -->
      <UserTable />
      <!-- All dialogs -->
      <ViewUserDialog />
    </div>
  </div>
</template>

<script setup lang='ts'>
import FilterContainer from './filters/FilterContainer.vue'
import ViewUserDialog from './dialogs/ViewUserDialog.vue'
import UserTable from './UserTable.vue'
</script>
