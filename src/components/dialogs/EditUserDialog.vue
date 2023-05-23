<template>
  <dialog ref='dialogRef' class='rus-modal' size='xl'>
    <div class='rus-modal-header' @click.stop>
      <div>
        <RusIcon :icon='mdiPencil' />
        <h3>Edit User</h3>
      </div>
      <button @click='closeDialog' tabindex='0'>
        <RusIcon :icon='mdiClose' />
      </button>
    </div>
    <div class='rus-modal-body' @click.stop>
      <div
        v-if='isLoading'
        class='w-full flex flex-col justify-center items-center py-6'
      >
        <RusSpinner
          color='teal'
          :show='isLoading'
          size='xl'
        />

        <h4 class='text-base font-medium text-center pt-5 pb-3 text-teal-600'>
          Loading Account Details ...
        </h4>
      </div>
      <div v-else class='w-full grid grid-cols-2 gap-y-5 gap-x-2'>
        <div
          v-for='(item, key) in userDetails'
          :key='key'
          class='item-display-field'
        >
          <label :for='key'>{{item.label}}</label>
          <RusInput
            v-bind="getInputProps(key)"
          />
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
        title='Restore to default values.'
        :disabled='isLoading'
      >
        Restore
        <RusIcon :icon='mdiRestore' />
      </button>
      <button
        class='btn save-btn'
        @click='closeDialog'
        tabindex='0'
        :disabled='isLoading'
      >
        Save
        <RusSpinner
          v-if='isLoading'
          color='teal'
          :show='isLoading'
          size='md'
          className='!mr-0'
        />
        <RusIcon v-else :icon='mdiFloppy' />
      </button>
    </div>
  </dialog>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref, watch } from 'vue';
import RusIcon from '../generic/RusIcon.vue';
import { mdiClose, mdiFloppy, mdiPencil, mdiRestore } from '@mdi/js';
import RusInput from '../generic/RusInput.vue';
import RusSpinner from '../generic/RusSpinner.vue';

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
    value: '',
  },
  email: {
    label: 'Email',
    value: '',
  },
  firstName: {
    label: 'First Name',
    value: '',
  },
  lastName: {
    label: 'Last Name',
    value: '',
  },
  phone: {
    label: 'Phone',
    value: '',
  },
  company: {
    label: 'Company',
    value: '',
  }
});

const getInputProps = (key: keyof typeof userDetails) => {
  const inputProps = {
    id: key,
    value: userDetails[key].value,
    onInput: (e: Event) => {
      const target = e.target as HTMLInputElement;
      userDetails[key].value = target.value;
    },
    maxlength: undefined as number | undefined,
  };

  if (key === 'phone') {
    inputProps.maxlength = 10;
  }

  return inputProps;
}

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

// Loading state
const isLoading = ref(true);

// Dialog
const dialogRef = ref<HTMLDialogElement | null>(null);

const openDialog = () => {
  dialogRef.value?.showModal();
}

const closeDialog = () => {
  emit('close');
}

// React on props.open
watch([props.open], async () => {
  if (props.open.value) {
    openDialog();
    isLoading.value = true;

    await new Promise((resolve) => {
      setTimeout(() => {
        isLoading.value = false;
        resolve(true);
      }, 3500);
    }); 
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
