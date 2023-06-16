<template>
  <div class="grid grid-cols-1 flex-grow h-full">
    <div class="col-span-1 flex flex-nowrap flex-col">
      <!-- Filtered user list -->
      <UserTable :open-dialog="openDialog" />
      <!-- All dialogs -->
      <ViewUserDialog
        :open="viewDialogState"
        :user-data="currentUser"
        @close="viewDialogState.value = false"
      />
      <EditUserDialog
        :open="editDialogState"
        :user-data="currentUser"
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
import type { User } from '@/interfaces/user';

const viewDialogState = reactive({ value: false });
const editDialogState = reactive({ value: false });
const deleteDialogState = reactive({ value: false });

const currentUser = reactive({ value: null as User | null });

const openDialog = (mode: DialogMode, user: User) => {
  switch (mode) {
    case 'view':
      if (viewDialogState.value) {
        viewDialogState.value = false;
        currentUser.value = null;
        break;
      }
      currentUser.value = user;
      viewDialogState.value = true;
      break;
    case 'edit':
      if (editDialogState.value) {
        editDialogState.value = false;
        currentUser.value = null;
        break;
      }
      currentUser.value = user;
      editDialogState.value = true;
      break;
    case 'delete':
      if (deleteDialogState.value) {
        deleteDialogState.value = false;
        currentUser.value = null;
        break;
      }
      currentUser.value = user;
      deleteDialogState.value = true;
      break;
    default:
      break;
  }
};
</script>
