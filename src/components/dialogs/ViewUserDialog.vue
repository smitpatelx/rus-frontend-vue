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
          :class="cn([
            'flex flex-col gap-y-1 item-display-field',
            {
              '!col-span-2': key === 'email',
            },
          ])"
        >
          <label>{{data.label}}</label>
          <p>
            {{ data.value }}
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
import { getDialCode, usableCountries } from '@/interfaces/countries';
import { formatPhone } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useDialogState } from '@/lib/hooks/useDialogState';

const props = defineProps<{
  open: { value: boolean };
  userData: { value: User | null };
}>();

const emit = defineEmits<{
  close: []
}>();

// Display data
const userDetails = reactive({
  email: {
    label: 'Email',
    value: '',
  },
  username: {
    label: 'Username',
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
  },
  country: {
    label: 'Country',
    value: '',
  },
});

// Change data on edit
watch([props.userData], () => {
  const data = props.userData.value;
  if (data === null) return;

  userDetails.username.value = data.username || '--';
  userDetails.email.value = data.email || '--';
  userDetails.firstName.value = data.first_name || '--';
  userDetails.lastName.value = data.last_name || '--';
  userDetails.phone.value = `${getDialCode(data.billing_country.toLowerCase())}  ${formatPhone(data.billing_phone)}`;
  userDetails.company.value = data.billing_company || '--';
  userDetails.country.value = usableCountries?.[data.billing_country]?.name || '--';
});

// Dialog
const dialogRef = ref<HTMLDialogElement | null>(null);

const openDialog = () => {
  dialogRef.value?.showModal();
}

const closeDialog = () => {
  emit('close');
}

useDialogState({
  dialogRef,
  isDialogOpen: props.open,
  closeDialog,
  openDialog,
});
</script>
