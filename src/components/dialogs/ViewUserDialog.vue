<template>
  <dialog ref='dialogRef' class='rus-modal'>
    <div class='rus-modal-header' @click.stop>
      <div>
        <RusIcon :icon='mdiAccount' />
        <h3>View User</h3>
      </div>
      <button @click='closeModal' tabindex='0'>
        <RusIcon :icon='mdiClose' />
      </button>
    </div>
    <div class='rus-modal-body' @click.stop>
      <div class='w-full grid grid-cols-2 gap-y-5 gap-x-2'>
        <div
          v-for='(item, key) in userDetails'
          :key='key'
          class='item-display-field'
        >
          <label>{{item.label}}</label>
          <p>{{item.value}}</p>
        </div>
      </div>
    </div>
    <div class='rus-modal-footer' @click.stop>
      <button
        class='btn close-btn'
        @click='closeModal'
        tabindex='0'
      >
        Close
      </button>
    </div>
  </dialog>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref, watch } from 'vue';
import RusIcon from '../generic/RusIcon.vue';
import { mdiAccount, mdiClose } from '@mdi/js';

// Display data
const userDetails = reactive({
  username: {
    label: 'Username',
    value: 'smitpatelx',
  },
  email: {
    label: 'Email',
    value: 'smitpatel.dev@gmail.com',
  },
  firstName: {
    label: 'First Name',
    value: 'Smit',
  },
  lastName: {
    label: 'Last Name',
    value: 'Patel',
  },
  phone: {
    label: 'Phone',
    value: '+91 234-536-7886',
  },
  company: {
    label: 'Company',
    value: 'Demo company LTD.',
  }
});

// Dialog
const dialogRef = ref<HTMLDialogElement | null>(null);

const openModal = async () => {
  dialogRef.value?.showModal();
}

const closeModal = async () => {
  dialogRef.value?.close();
}

onMounted(() => {
  openModal();

  const overlay = dialogRef.value;

  if (overlay) {
    overlay.addEventListener('click', () => {
      closeModal();
    });
  }

  return () => {
    if (overlay) {
      overlay.removeEventListener('click', () => {
        closeModal();
      });
    }
  }
})
</script>
