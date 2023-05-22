<template>
  <RusSelect
    :options="options"
    :disabled="false"
    :required="false"
    :error="false"
    :value="value.value"
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
          rounded-l-md gap-x-1.5 leading-none flex flex-nowrap items-center justify-center z-10"
      >
        <span class="py-1.5">
          <RusIcon
          :icon="mdiFilter"
          />
        </span>
        <span class="py-1.5">
          Filter user type
        </span>
        <span
          v-if="!!selectedOption?.name"
          class="font-normal border-l border-l-teal-500 group-hover:border-l-teal-400 pl-3 ml-1.5 py-1.5"
        >
          {{ selectedOption?.name }}
        </span>
      </button>
      <button
        @click.capture.stop="handleClear"
        class="px-3 py-0.5 text-base font-medium text-teal-50 select-none
          bg-teal-500 hover:bg-teal-200 hover:text-teal-800 group
          focus:outline-none ring-1 ring-teal-500 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-teal-600
          focus-visible:ring-offset-slate-100 focus:border-0 transition-all duration-300 ease-in-out
          rounded-r-md gap-x-1.5 leading-none flex flex-nowrap items-center justify-center"
      >
        <RusIcon
          :icon="mdiClose"
        />
      </button>
    </div>
  </RusSelect>
</template>

<script setup lang='ts'>
import RusIcon from '@/components/generic/RusIcon.vue';
import RusSelect from '@/components/generic/RusSelect.vue';
import type { Options } from '@/components/generic/RusSelect.vue';
import { mdiClose, mdiFilter } from '@mdi/js';
import { computed, reactive } from 'vue';

const options: Options = [
  { name: 'Admin', value: 'admin' },
  { name: 'Editor', value: 'editor' },
  { name: 'Manager', value: 'manager' },
  { name: 'Author', value: 'author' },
  { name: 'Reader', value: 'reader' },
];

const value = reactive({ value: '' });

const selectedOption = computed(() => {
  return options.find((option) => option.value === value.value) || null;
});

const handleValueChange = (val: string) => {
  value.value = val;
}

const handleClear = () => {
  value.value = '';
}
</script>