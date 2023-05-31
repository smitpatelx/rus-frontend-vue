<template>
  <dialog ref='dialogRef' data-type='delete' class='rus-modal'>
    <div class='rus-modal-header' @click.stop>
      <div>
        <RusIcon :icon='mdiDelete' />
        <h3>Confirm Deletion</h3>
      </div>
      <button @click='closeDialog' tabindex='0'>
        <RusIcon :icon='mdiClose' />
      </button>
    </div>
    <div class='rus-modal-body' @click.stop>
      <div class='w-full grid grid-cols-1'>
        <div
          class='item-display-field'
        >
          <p class='!text-xl'>
            Are you sure you want to delete this user?
          </p>
          <label>
            This action cannot be undone.
          </label>
        </div>
      </div>
    </div>
    <div class='rus-modal-footer' @click.stop>
      <button
        class='btn close-btn'
        @click='closeDialog'
        tabindex='0'
      >
        Cancel
      </button>
      <button
        class='btn close-btn'
        @click='closeDialog'
        tabindex='0'
      >
        Delete
        <RusIcon :icon='mdiDelete' />
      </button>
    </div>
  </dialog>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref, watch } from 'vue';
import RusIcon from '../generic/RusIcon.vue';
import { mdiAccount, mdiClose, mdiDelete } from '@mdi/js';

const props = defineProps<{
  open: { value: boolean };
}>();

const emit = defineEmits({
  close: () => true,
});

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
    value: '0912345367886',
  },
  company: {
    label: 'Company',
    value: 'Demo company LTD.',
  }
});

/**
 * Format phone number
 * From: 2345367886
 * To: 234-536-7886
 */
const formatPhone = (phone: string) => {
  const areaCode = phone.slice(0, 3);
  const firstThree = phone.slice(3, 6);
  const lastFour = phone.slice(6, 10);

  return `${areaCode}-${firstThree}-${lastFour}`;
}

// Dialog
const dialogRef = ref<HTMLDialogElement | null>(null);

const openDialog = () => {
  dialogRef.value?.showModal();
}

const closeDialog = () => {
  emit('close');
}

// React on props.open
watch([props.open], () => {
  if (props.open.value) {
    openDialog();
  } else {
    dialogRef.value?.close();
  }
});

onMounted(() => {
  const overlay = dialogRef.value;

  if (overlay) {
    overlay.addEventListener('click', () => {
      closeDialog();
    });
  }

  return () => {
    if (overlay) {
      overlay.removeEventListener('click', () => {
        closeDialog();
      });
    }
  }
})
</script>
