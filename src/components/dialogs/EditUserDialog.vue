<template>
  <dialog
    ref="dialogRef"
    class="rus-modal"
    size="xl"
  >
    <div
      class="rus-modal-header"
      @click.stop
    >
      <div>
        <RusIcon :icon="mdiPencil" />
        <h3>Edit User</h3>
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
      <div
        v-if="isLoading"
        class="w-full flex flex-col justify-center items-center py-6"
      >
        <RusSpinner
          color="teal"
          :show="isLoading"
          size="xl"
        />

        <h4 class="text-base font-medium text-center pt-5 pb-3 text-teal-600">
          Loading Account Details ...
        </h4>
      </div>
      <form
        v-else
        class="w-full grid grid-cols-2 gap-y-5 gap-x-2"
        @submit.prevent.stop="submitForm"
      >
        <div
          v-for="(item, key) in editFormFields"
          :key="key"
          class="item-display-field"
        >
          <template v-if="item.inputType === 'text'">
            <label :for="`rus-acc-d-${key}`">{{ item?.label }}</label>
            <RusInput v-bind="getInputProps(key)" />
          </template>
          <template v-else-if="item.inputType === 'select'">
            <label :for="`rus-acc-d-${key}`">{{ item?.label }}</label>
            <RusSelectCountry v-bind="getSelectCountryProps(key)" />
          </template>
        </div>
      </form>
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
        Cancel
      </button>
      <button
        class="btn close-btn"
        @click="restoreForm"
        tabindex="0"
        title="Restore to default values."
        :disabled="isLoading"
      >
        Restore
        <RusIcon :icon="mdiRestore" />
      </button>
      <button
        class="btn save-btn"
        @click="submitForm"
        tabindex="0"
        :disabled="(isLoading || isSubmitting || !formMeta.dirty || !formMeta.valid)"
      >
        Save
        <RusSpinner
          v-if="isLoading || isSubmitting"
          color="teal"
          :show="isLoading || isSubmitting"
          size="md"
          className="!mr-0"
        />
        <RusIconF
          v-else
          icon="save"
          className="stroke-2"
        />
      </button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import RusIcon from '@/components/generic/RusIcon.vue';
import { mdiClose, mdiPencil, mdiRestore } from '@mdi/js';
import RusInput from '@/components/generic/RusInput.vue';
import RusSpinner from '@/components/generic/RusSpinner.vue';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { editFormFields, EditFormKeys } from '@/interfaces/user';
import RusSelectCountry from '../generic/RusSelectCountry.vue';
import { usableCountries } from '@/interfaces/countries';
import RusIconF from '../generic/RusIconF.vue';

// Zod form validation
const formValidation = zod.object({
  username: zod.string().trim()
    .nonempty('Username is required.')
    .min(3, 'Username must be more than 3 characters.')
    .max(30, 'Username must be less than 30 characters.'),
  email: zod.string().trim()
    .nonempty('Email is required.')
    .email('Please enter a valid email address.'),
  firstName: zod.string().trim()
    .nonempty('First name is required.')
    .regex(new RegExp(
      /^[a-zA-Z]+$/,
      'g'
    ), 'First name must be letters only.')
    .max(40, 'First name must be less than 40 characters.'),
  lastName: zod.string().trim()
    .nonempty('Last name is required.')
    .regex(new RegExp(
      /^[a-zA-Z]+$/,
      'g'
    ), 'Last name must be letters only.')
    .max(40, 'Last name must be less than 40 characters.'),
  phone: zod.string().trim()
    .nonempty('Phone number is required.')
    .min(12, 'Phone number must be 10 digits.')
    .max(12, 'Phone number must be 10 digits.'),
  company: zod.string().trim()
    .nonempty('Company name is required.')
    .min(1, 'Company name must be more than 1 characters.')
    .max(40, 'Company name must be less than 40 characters.'),
  country: zod.string().trim()
    .nonempty('Country code is required.')
    .regex(new RegExp(
      /^[a-z]{2}$/,
      'g'
    ), 'Country code must be 2 lower-case letters.'),
});

const {
  handleSubmit,
  errors,
  isSubmitting,
  meta: formMeta,
  setTouched,
  resetForm,
  values: formValues,
  setFieldValue,
  validateField,
} = useForm({
  initialValues: {
    company: '',
    country: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
  },
  initialErrors: {
    company: '',
    country: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
  },
  initialTouched: {
    company: false,
    country: false,
    email: false,
    firstName: false,
    lastName: false,
    phone: false,
    username: false,
  },
  keepValuesOnUnmount: false,
  validateOnMount: false,
  validationSchema: toTypedSchema(formValidation),
});

const restoreForm = () => {
  resetForm();

  setTouched({
    company: false,
    country: false,
    email: false,
    firstName: false,
    lastName: false,
    phone: false,
    username: false,
  });
  // Restore form values
};

const touchedIndividually = reactive({
  company: false,
  country: false,
  email: false,
  firstName: false,
  lastName: false,
  phone: false,
  username: false,
});

const submitForm = handleSubmit(async (values) => {
  console.log('submitForm', values);
  // await onSubmit(values);
});

const props = defineProps<{
  open: { value: boolean };
}>();

const emit = defineEmits<{
  close: []
}>();

const htmlInputTypes = {
  username: 'text',
  email: 'email',
  firstName: 'text',
  lastName: 'text',
  phone: 'text',
  company: 'text',
  country: 'text',
}

const getSelectCountryProps = (key: EditFormKeys) => {
  const selectCountryProps = {
    id: `rus-acc-d-${key}`,
    value: formValues?.[key] || '',
    placeholder: editFormFields[key].label as string,
    onChange: (value: string) => {
      if (!value) return;
      setFieldValue(key, value);
    },
    onBlur: async () => {
      await validateField(key);
      touchedIndividually[key] = true;
      setTouched({ [key]: true });
    },
    label: editFormFields[key].label,
    options: usableCountries,
    disabled: false,
    required: false,
    getLabel: (key: string) => usableCountries[key]?.name || '',
    getValue: (key: string) => usableCountries[key]?.callingCodes[0] || '',
    error: (formMeta.value.dirty
      && touchedIndividually[key]
      && !!errors.value?.[key])
      && errors.value?.[key],
  };

  return selectCountryProps;
}

const getInputProps = (key: EditFormKeys) => {
  const inputProps = {
    id: `rus-acc-d-${key}`,
    value: formValues?.[key],
    placeholder: editFormFields[key].label,
    onInput: (e: Event) => {
      const target = e.target as HTMLInputElement;
      setFieldValue(key, target.value)
    },
    onBlur: async () => {
      await validateField(key);
      touchedIndividually[key] = true;
      setTouched({ [key]: true });
    },
    error: (formMeta.value.dirty
      && touchedIndividually[key]
      && !!errors.value?.[key])
      && errors.value?.[key],
    type: htmlInputTypes[key],
    maxlength: key === 'phone' ? 12 : undefined,
    mask: key === 'phone' ? '###-###-####' : undefined,
  };

  return inputProps;
}

// Loading state
const isLoading = ref(false);

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
    isLoading.value = true;

    setTimeout(() => {
      isLoading.value = false;
    }, 1500);
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
