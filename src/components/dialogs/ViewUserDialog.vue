<template>
  <dialog
    ref="dialogRef"
    class="rus-modal"
  >
    <div
      class="rus-modal-header"
      @click.stop
    >
      <div>
        <RusIcon :icon="mdiAccount" />
        <h3>View User</h3>
      </div>
      <button
        @click="closeDialog"
        tabindex="0"
      >
        <RusIcon :icon="mdiClose" />
      </button>
    </div>
    <div
      class="rus-modal-body"
      @click.stop
    >
      <div class="w-full grid grid-cols-2 gap-y-7 gap-x-2">
        <div
          v-for="(data, key) in userDetails"
          :key="key"
          class="item-display-field"
        >
          <label>{{data.label}}</label>
          <p>
            <span
              v-if="key === 'phone'"
              class="mr-1 text-teal-600"
            >
              +{{ Number(data.value.slice(0, 3)) }}
            </span>
            {{ key === 'phone'  ? formatPhone(data.value.slice(3, 14)) : data.value}}
          </p>
        </div>
      </div>
    </div>
    <div
      class="rus-modal-footer"
      @click.stop
    >
      <button
        class="btn close-btn"
        @click="closeDialog"
        tabindex="0"
      >
        Close
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import RusIcon from '../generic/RusIcon.vue';
import { mdiAccount, mdiClose } from '@mdi/js';
import type { User } from '@/interfaces/user';

const props = defineProps<{
  open: { value: boolean };
  userData: { value: User | null };
}>();

const emit = defineEmits<{
  close: []
}>();

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

// Change data on edit
watch([props.userData], () => {
  console.log('Watching : ', props.userData.value);
  const data = props.userData.value;
  if (data === null) return;

  userDetails.username.value = data.username;
  userDetails.email.value = data.email;
  userDetails.firstName.value = data.first_name;
  userDetails.lastName.value = data.last_name;
  userDetails.phone.value = data.billing_phone;
  userDetails.company.value = data.billing_company;
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
