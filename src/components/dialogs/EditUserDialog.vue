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
      class="rus-modal-body relative"
      @click.stop
    >
      <div
        v-show="editUserM.isLoading.value"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div class="w-full flex flex-col justify-center items-center py-6">
          <RusSpinner
            color="teal"
            :show="editUserM.isLoading.value"
            size="xl"
          />

          <h4 class="text-base font-medium text-center pt-5 pb-3 text-teal-600">
            Saving Account Details ...
          </h4>
        </div>
      </div>
      <form
        class="w-full grid grid-cols-2 gap-y-5 gap-x-2 transition-opacity duration-300"
        :class="{
          'opacity-0': editUserM.isLoading.value
        }"
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
        :disabled="editUserM.isLoading.value"
      >
        Restore
        <RusIcon :icon="mdiRestore" />
      </button>
      <button
        class="btn save-btn"
        @click="submitForm"
        tabindex="0"
        :disabled="(editUserM.isLoading.value || isSubmitting || !formMeta.dirty || !formMeta.valid)"
      >
        Save
        <RusSpinner
          v-if="isSubmitting || editUserM.isLoading.value"
          color="teal"
          :show="isSubmitting || editUserM.isLoading.value"
          size="md"
          className="!mr-0"
        />
        <RusIcon
          v-else
          :icon="mdiCloudCheckVariant"
        />
      </button>
    </div>

    <!-- Notifications -->
    <notifications
      animation-type="velocity"
      position="bottom center"
      :duration="2000"
    />
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { useForm } from 'vee-validate';
import RusIcon from '@/components/generic/RusIcon.vue';
import { mdiClose, mdiCloudCheckVariant, mdiPencil, mdiRestore } from '@mdi/js';
import RusInput from '@/components/generic/RusInput.vue';
import RusSpinner from '@/components/generic/RusSpinner.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { editFormFields, EditFormKeys, formValidation, type User } from '@/interfaces/user';
import RusSelectCountry from '../generic/RusSelectCountry.vue';
import { usableCountries } from '@/interfaces/countries';
import useEditUser from '@/lib/hooks/useEditUser';
import { useNotification } from "@kyvg/vue3-notification";
import useGetAllUsers from '@/lib/hooks/useGetAllUsers';
import { INITIAL_DATA } from '@/lib/data/edit-dialog';
import { useDialogState } from '@/lib/hooks/useDialogState';

const { notify } = useNotification();
const { editUserM } = useEditUser();
const getAllUsersQ = useGetAllUsers();

const props = defineProps<{
  open: { value: boolean };
  userData: { value: User | null };
}>();

const emit = defineEmits<{
  close: []
}>();

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
  setValues,
} = useForm({
  initialValues: structuredClone(INITIAL_DATA),
  initialErrors: structuredClone(INITIAL_DATA),
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

const readValues = () => {
  setValues({
    company: props.userData.value?.billing_company || '',
    country: props.userData.value?.billing_country || '',
    email: props.userData.value?.email || '',
    firstName: props.userData.value?.first_name || '',
    lastName: props.userData.value?.last_name || '',
    phone: props.userData.value?.billing_phone || '',
    username: props.userData.value?.username || '',
  });
};

watch([props.userData, props.open], () => {
  readValues();
})

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
  readValues();
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
  if (!props.userData.value?.id || props.userData.value?.id === undefined) return;

  console.log('submitForm', values);
  editUserM.mutate({
    id: props.userData.value.id,
    billing_country: values.country,
    company: values.company,
    email: values.email,
    first_name: values.firstName,
    last_name: values.lastName,
    phone: values.phone,
  }, {
    onSuccess: (data) => {
      getAllUsersQ.refetch();
      notify({
        group: "global",
        title: "Success",
        text: "Account updated successfully.",
        type: "rus-success",
      });
      emit('close');
    },
    onError: (e) => {
      const error = e as {
        response: {
          data: {
            message: string;
          },
        },
      };
      console.log('error', error?.response?.data?.message);
      notify({
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong",
        type: "rus-error",
      });
    },
  });
});

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
