<template>
  <div class="w-full flex-1 p-4 flex flex-col">
    <div class="rus-table-wrap">
      <table class="rus-table">
        <TableHeader
          :columns="rowHeaders"
          @toggleSortDirection="hToggleSortDirection"
        />
      
        <tr v-for="(item, i) in rowFill" :key="i">
          <td>pwoeoskszahs {{ i }}</td>
          <td>Smit</td>
          <td>Patel</td>
          <td>
            <span class="w-full flex flex-row items-center justify-start">
              <a
                href="tel:+918892982637"
                class="flex flex-nowrap flex-row items-center justify-start
                  hover:text-sky-500 gap-x-1 cursor-pointer whitespace-nowrap
                  focus:outline-none focus:ring-1 focus:ring-teal-500 focus:ring-offset-1
                  focus:ring-offset-teal-100 -ml-2 px-2 rounded-md"
              >
                <span>+91</span>
                <span>889-298-2637</span>
              </a>
            </span>
          </td>
          <td>
            <span class="w-full flex flex-row items-center justify-start">
              <a
                href="mailto:smitpatel.dev@gmail.com"
                class="flex flex-nowrap flex-row items-center justify-start
                  hover:text-sky-500 gap-x-1 cursor-pointer whitespace-pre-wrap md:whitespace-nowrap
                  focus:outline-none focus:ring-1 focus:ring-teal-500 focus:ring-offset-1
                  focus:ring-offset-teal-100 -ml-2 px-2 rounded-md"
              >
                smitpatel.dev@gmail.com
              </a>
            </span>
          </td>
          <td>Demo company name LTD.</td>
          <!-- Actions -->
          <td>
            <div class="w-full flex flex-nowrap flex-row items-center justify-end
              gap-x-2">
              <button
                title="Open wp account page"
                class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
                  hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
                  duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
                  focus-visible:ring-offset-1 focus-visible:ring-teal-600
                  focus-visible:ring-offset-slate-100 active:scale-110"
              >
                <RusIcon
                  :icon="mdiLinkVariant"
                />
              </button>
      
              <button
                title="Edit - user name"
                class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
                  hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
                  duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
                  focus-visible:ring-offset-1 focus-visible:ring-teal-600
                  focus-visible:ring-offset-slate-100 active:scale-110"
              >
                <RusIcon
                  :icon="mdiPencil"
                />
              </button>
      
              <button
                title="Delete - user name"
                class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
                  hover:bg-red-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
                  duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
                  focus-visible:ring-offset-1 focus-visible:ring-red-600
                  focus-visible:ring-offset-slate-100 active:scale-110"
              >
                <RusIcon
                  :icon="mdiDelete"
                />
              </button>
            </div>
          </td>
        </tr>
      </table>
      <div
        class="w-full bg-slate-100 rounded-b-md ring-1
          ring-teal-500 flex flex-wrap items-center justify-between
          px-4 py-2"
      >
        <span class="text-slate-500 text-sm">
          Showing 1 to 10 of 100 entries
        </span>
        
        <div class="flex flex-row flex-nowrap gap-x-2">
          <button
            title="Previous page"
            class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
              hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
              duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
              focus-visible:ring-offset-1 focus-visible:ring-teal-600
              focus-visible:ring-offset-slate-100 active:scale-110"
          >
            <RusIcon
              :icon="mdiChevronLeft"
            />
          </button>

          <button
            v-for="(item, i) in Array(5)"
            :key="i"
            :title="`Page: ${i + 1}`"
            class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
              hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
              duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
              focus-visible:ring-offset-1 focus-visible:ring-teal-600
              focus-visible:ring-offset-slate-100 active:scale-110"
          >
            {{ i + 1 }}
          </button>
          
          <button
            title="Next page"
            class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
              hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
              duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
              focus-visible:ring-offset-1 focus-visible:ring-teal-600
              focus-visible:ring-offset-slate-100 active:scale-110"
          >
            <RusIcon
              :icon="mdiChevronRight"
            />
          </button>
        </div>

        <!-- Page size -->
        <div class="flex flex-row flex-nowrap gap-x-4 items-center justify-end">
          <p class="text-slate-700 font-normal text-base">
            Page size
          </p>
          <select
            value="10"
            name="page-size"
            class="rounded-md bg-slate-200 text-slate-500
              hover:bg-slate-400 hover:text-teal-100 active:bg-opacity-30
              duration-300 ease-in-out transition-all focus:outline-none
              focus:ring-1 focus:ring-offset-1 focus:ring-teal-600
              focus:ring-offset-slate-100 flex flex-wrap items-center justify-center
              leading-none form-select fill-current stroke-current"
            placeholder="Page size"
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
            <option>200</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import RusIcon from '@/components/generic/RusIcon.vue';
import type { TableHeaderItems, TableSortDirection } from '@/interfaces/table';
import TableHeader from '@/components/generic/TableHeader.vue';
import {
  mdiPencil,
  mdiDelete,
  mdiLinkVariant,
  mdiChevronRight,
  mdiChevronLeft,
} from '@mdi/js';

const totalRows = 10;
const rowFill = Array(totalRows).fill(null);
const rowHeaders: TableHeaderItems = [
  {
    label: 'Username',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'First name',
    align: 'left',
    sortable: true,
    sortActive: true,
  },
  {
    label: 'Last name',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'Phone',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'Email',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'Company Name',
    align: 'left',
    sortable: true,
    sortActive: false,
  },
  {
    label: 'Actions',
    align: 'right',
    sortable: false,
    sortActive: false,
  },
];

const hToggleSortDirection = (sortD: TableSortDirection) => {
  switch (sortD) {
    case 'asc':
      return 'desc';
    case 'desc':
      return 'asc';
    default:
      return undefined;
  }
};

</script>

<style scoped lang='scss'>
.rus-table-wrap {
  @apply w-full flex-initial overflow-x-auto overflow-y-hidden
    rounded-md ring-1 ring-teal-500 flex flex-col;
}

.rus-table {
  @apply w-full flex-1 leading-none rounded-t-md
    overflow-y-auto overflow-x-hidden;

  tr:not(:nth-child(1)) {
    @apply bg-transparent w-full py-0 hover:bg-slate-200/40 border-0 odd:bg-teal-500/10;

    td {
      @apply text-base font-normal text-slate-900 px-3 py-2;
    }
  }
}
</style>