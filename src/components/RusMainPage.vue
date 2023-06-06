<template>
  <div class="grid grid-cols-1 flex-grow h-full">
    <div class="col-span-1 flex flex-nowrap flex-col">
      <!-- Filtered user list -->
      <UserTable :open-dialog="openDialog" />
      <!-- All dialogs -->
      <ViewUserDialog
        :open="viewDialogState"
        @close="viewDialogState.value = false"
      />
      <EditUserDialog
        :open="editDialogState"
        @close="editDialogState.value = false"
      />
      <ConfirmDeletion
        :open="deleteDialogState"
        @close="deleteDialogState.value = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ViewUserDialog from './dialogs/ViewUserDialog.vue';
import EditUserDialog from './dialogs/EditUserDialog.vue';
import ConfirmDeletion from './dialogs/ConfirmDeletion.vue';
import UserTable from './UserTable.vue';
import type { DialogMode } from '@/interfaces/dialog';
import { reactive } from 'vue';

const viewDialogState = reactive({ value: false });
const editDialogState = reactive({ value: false });
const deleteDialogState = reactive({ value: false });

const openDialog = (mode: DialogMode) => {
  switch (mode) {
    case 'view':
      if (viewDialogState.value) {
        viewDialogState.value = false;
      }
      viewDialogState.value = true;
      break;
    case 'edit':
      if (editDialogState.value) {
        editDialogState.value = false;
      }
      editDialogState.value = true;
      break;
    case 'delete':
      if (deleteDialogState.value) {
        deleteDialogState.value = false;
      }
      deleteDialogState.value = true;
      break;
    default:
      break;
  }
};
</script>
