<template>
  <RusSelect
    :options="optionsForView"
    :disabled="false"
    :required="false"
    :error="false"
    :value="filterStore.tableView"
    :random-id="randomId"
    class=""
    label="Filter user type"
    errorMessage=""
    placeholder=""
    @updateValue="handleValueChange"
    multiple
  >
    <div class="flex flex-row flex-nowrap">
      <ViewModeBtn
        :options="optionsForView"
        :selectedOptions="selectedOption || undefined"
      />
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
import ViewModeBtn from '@/components/filters/ViewModeBtn.vue';
import RusIcon from '@/components/generic/RusIcon.vue';
import RusSelect from '@/components/generic/RusSelect.vue';
import type { Options } from '@/interfaces/table';
import { optionsForView as allOptions } from '@/lib/data/user-table';
import { randomAlpha } from '@/lib/helpers';
import { useUserFilter } from '@/stores/user-filters';
import { mdiClose } from '@mdi/js';
import { computed, ref } from 'vue';

const filterStore = useUserFilter();
const randomId = ref(randomAlpha());

const optionsForView = allOptions;

const selectedOption = computed(() => {
  if (typeof filterStore.tableView === 'string') {
    return null;
  }
  const selectedArray = filterStore.tableView.map((value) => value.value);
  return optionsForView.filter((option) => selectedArray.includes(option.value)) || null;
});

const handleValueChange = (val: string | Options) => {
  if (typeof val === 'string') return;
  filterStore.tableView = val;
}

const handleClear = () => {
  filterStore.tableView = structuredClone(optionsForView);
}
</script>
