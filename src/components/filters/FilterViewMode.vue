<template>
  <RusSelect
    :options='options'
    :disabled='false'
    :required='false'
    :error='false'
    :value='value.value'
    class=''
    label='Filter user type'
    errorMessage=''
    placeholder=''
    @updateValue='handleValueChange'
    multiple
  >
    <div class='flex flex-row flex-nowrap'>
      <ViewModeBtn
        :options='options'
        :selectedOptions='selectedOption || undefined'
      />
      <button
        @click.capture.stop='handleClear'
        class='px-3 py-0.5 text-base font-medium text-teal-50 select-none
          bg-teal-500 hover:bg-teal-200 hover:text-teal-800 group
          focus:outline-none ring-1 ring-teal-500 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-teal-600
          focus-visible:ring-offset-slate-100 focus:border-0 transition-all duration-300 ease-in-out
          rounded-r-md gap-x-1.5 leading-none flex flex-nowrap items-center justify-center'
      >
        <RusIcon
          :icon='mdiClose'
        />
      </button>
    </div>
  </RusSelect>
</template>

<script setup lang='ts'>
import ViewModeBtn from '@/components/filters/ViewModeBtn.vue';
import RusIcon from '@/components/generic/RusIcon.vue';
import RusSelect from '@/components/generic/RusSelect.vue';
import type { Options } from '@/components/generic/RusSelect.vue';
import { USER_TABLE_HEADER } from '@/lib/data/user-table';
import { mdiClose } from '@mdi/js';
import { computed, reactive } from 'vue';

const options: Options = USER_TABLE_HEADER.filter((header) => {
  return header.canHide;
}).map((header) => {
  return {
    name: header.label,
    value: header.label,
  };
});

const value = reactive({ value: options });

const selectedOption = computed(() => {
  if (typeof value.value === 'string') {
    return null;
  }
  const selectedArray = value.value.map((value) => value.value);
  return options.filter((option) => selectedArray.includes(option.value)) || null;
});

const handleValueChange = (val: string | Options) => {
  value.value = val;
}

const handleClear = () => {
  value.value = '';
}
</script>
