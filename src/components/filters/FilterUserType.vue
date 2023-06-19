<template>
  <RusSelect
    :options="options.value"
    :disabled="false"
    :required="false"
    :error="false"
    :value="filterStore.userType"
    :random-id="randomId"
    class=""
    label="Filter user type"
    errorMessage=""
    placeholder=""
    @updateValue="handleValueChange"
  >
    <div class="flex flex-row flex-nowrap">
      <button
        type="button"
        class="px-4 py-0.5 text-base font-medium text-teal-50 select-none
          bg-teal-600 hover:bg-teal-200 hover:text-teal-800 group
          focus:outline-none ring-1 ring-teal-500 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-teal-600
          focus-visible:ring-offset-slate-100 focus:border-0 transition-all duration-300 ease-in-out
          rounded-l-md gap-x-1.5 leading-none flex flex-nowrap items-center justify-center z-10
          overflow-hidden"
      >
        <span class="py-1.5">
          <RusIcon :icon="mdiFilter" />
        </span>
        <span class="py-1.5"> Filter user type </span>
        <Transition name="slide-in-blurred-right">
          <span
            :key="selectedOption?.name"
            :class="{
              'pl-3 ml-1.5': !!selectedOption?.name,
              'pl-0 ml-0': !selectedOption?.name,
            }"
            class="font-normal border-l border-l-teal-500 group-hover:border-l-teal-400"
          >
            <span v-if="!!selectedOption?.name">{{ selectedOption?.name }}</span>
            <span
              v-else
              class="opacity-0"
              >{{ selectedOption?.name }}</span
            >
          </span>
        </Transition>
      </button>
      <button
        @click.capture.stop="handleClear"
        class="px-3 py-0.5 text-base font-medium text-teal-50 select-none
          bg-teal-500 hover:bg-teal-200 hover:text-teal-800 group
          focus:outline-none ring-1 ring-teal-500 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-teal-600
          focus-visible:ring-offset-slate-100 focus:border-0 transition-all duration-300 ease-in-out
          rounded-r-md gap-x-1.5 leading-none flex flex-nowrap items-center justify-center"
      >
        <RusIcon :icon="mdiClose" />
      </button>
    </div>
  </RusSelect>
</template>

<script setup lang="ts">
import RusIcon from '@/components/generic/RusIcon.vue';
import RusSelect from '@/components/generic/RusSelect.vue';
import type { Options } from '@/interfaces/table';
import { randomAlpha } from '@/lib/helpers';
import { mdiClose, mdiFilter } from '@mdi/js';
import { computed, reactive, ref, watch } from 'vue';
import { useUserFilter } from '@/stores/user-filters';
import useGetAllRoles from '@/lib/hooks/useGetAllRoles';

const randomId = ref(randomAlpha());
const filterStore = useUserFilter();
const { getAllRolesQ } = useGetAllRoles();

const options = reactive<{ value: Options }>({ value: [] });

watch([getAllRolesQ.data], () => {
  options.value = getAllRolesQ.data.value && Object.entries(getAllRolesQ.data.value?.data).length > 0
    ? Object.entries(getAllRolesQ.data.value.data)?.map<Options[number]>(([key, role]) => ({
        name: role.name,
        value: key,
      }))
    : [] as Options;
});

// [
//   { name: 'Admin', value: 'admin' },
//   { name: 'Editor', value: 'editor' },
//   { name: 'Manager', value: 'manager' },
//   { name: 'Author', value: 'author' },
//   { name: 'Reader', value: 'reader' },
// ];

const selectedOption = computed(() => {
  return options.value.find((option) => option.value === filterStore.userType) || null;
});

const handleValueChange = (val: string | Options) => {
  if (typeof val !== 'string') return;

  filterStore.$patch({
    userType: val,
  });
}

const handleClear = () => {
  filterStore.$patch({
    userType: '',
  });
}
</script>
