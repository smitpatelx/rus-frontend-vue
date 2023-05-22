<template>
  <div class='grid grid-cols-1 flex-grow h-full'>
    <div class='col-span-1 flex flex-nowrap flex-col'>
      <!-- Filter container -->
      <FilterContainer />
      <!-- Filtered user list -->
      <UserTable :open-dialog="openDialog"/>
      <!-- All dialogs -->
      <ViewUserDialog
        :open="viewDialogState"
        @close="viewDialogState.value = false"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import FilterContainer from './filters/FilterContainer.vue';
import ViewUserDialog from './dialogs/ViewUserDialog.vue';
import UserTable from './UserTable.vue';
import type { DialogMode } from '@/interfaces/dialog';
import { reactive } from 'vue';

const viewDialogState = reactive({ value: false });

const openDialog = (mode: DialogMode) => {
  switch (mode) {
    case 'view':
      if (viewDialogState.value) {
        viewDialogState.value = false;
      }
      viewDialogState.value = true;
      break;
    case 'edit':
      console.log('Edit');
      break;
    case 'delete':
      console.log('Delete');
      break;
    default:
      break;
  }
};
</script>
