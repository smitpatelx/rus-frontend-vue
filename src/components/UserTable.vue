<template>
  <div class="w-full flex-1 p-4 flex flex-col">
    <div class="rus-table-wrap">
      <table class="rus-table">
        <TableHeader
          :columns="rowHeaders"
          @toggleSortDirection="hToggleSortDirection"
        />

        <tbody>
          <tr
            v-for="(item, i) in rowFill"
            :key="i"
          >
            <td>
              <code
                class="text-sm font-normal font-mono
                leading-none bg-teal-500/20 text-teal-900
                px-1 py-0.5 rounded overflow-hidden"
              >
                smitpatelx
              </code>
            </td>
            <td>Smit</td>
            <td>Patel</td>
            <td>
              <!-- Chip -->
              <span
                class="inline-flex items-center px-2 py-0.5 rounded-full
                  text-sm font-semibold bg-gradient-to-br from-teal-400 to-teal-800
                  text-teal-100 ring-1 ring-teal-400 ring-offset-1 ring-offset-sky-100
                  select-none leading-none pb-1 hover:from-teal-400/50 hover:to-teal-800/50
                  hover:text-teal-800 transition-all ease-in-out duration-300 cursor-help"
                title="User role"
              >
                Author
              </span>
            </td>
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
              <span class="w-full flex flex-row flex-nowrap items-center justify-start">
                <a
                  href="mailto:smitpatel.dev@gmail.com"
                  class="inline-block h-full hover:text-sky-500 whitespace-pre md:whitespace-nowrap
                    focus:outline-none focus:ring-1 focus:ring-teal-500 focus:ring-offset-1
                    focus:ring-offset-teal-100 -ml-2 px-2 rounded-md cursor-pointer"
                >
                  smitpatel.dev@gmail.com
                </a>
              </span>
            </td>
            <td>Demo company name LTD.</td>
            <td>{{ formatDateToDDMMYYYY(new Date()) }}</td>
            <!-- Actions -->
            <td>
              <div
                class="w-full flex flex-nowrap flex-row items-center justify-end
                gap-x-2"
              >
                <button
                  title="Open wp account page"
                  type="button"
                  class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
                    hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
                    duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
                    focus-visible:ring-offset-1 focus-visible:ring-teal-600
                    focus-visible:ring-offset-slate-100 active:scale-110"
                >
                  <RusIconF
                    icon="external-link"
                    className="w-5 h-5 group-focus-within:animate-pulse origin-center stroke-2"
                  />
                </button>

                <button
                  @click.stop.capture.passive="openDialog('view')"
                  type="button"
                  title="View - user name"
                  class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
                    hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
                    duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
                    focus-visible:ring-offset-1 focus-visible:ring-teal-600
                    focus-visible:ring-offset-slate-100 active:scale-110"
                >
                  <RusIcon :icon="mdiEye" />
                </button>

                <button
                  @click.stop.capture.passive="openDialog('edit')"
                  type="button"
                  title="Edit - user name"
                  class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
                    hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
                    duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
                    focus-visible:ring-offset-1 focus-visible:ring-teal-600
                    focus-visible:ring-offset-slate-100 active:scale-110"
                >
                  <RusIcon :icon="mdiPencil" />
                </button>

                <button
                  @click.stop.capture.passive="openDialog('delete')"
                  type="button"
                  title="Delete - user name"
                  class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
                    hover:bg-red-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
                    duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
                    focus-visible:ring-offset-1 focus-visible:ring-red-600
                    focus-visible:ring-offset-slate-100 active:scale-110"
                >
                  <RusIcon :icon="mdiDelete" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="w-full bg-slate-100 rounded-b-md border
        border-teal-500 flex flex-wrap items-center justify-between
        px-4 py-2"
    >
      <span class="text-slate-500 text-sm"> Showing 1 to 10 of 100 entries </span>

      <div class="flex flex-row flex-nowrap gap-x-2">
        <button
          title="First page"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
            hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
            duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
            focus-visible:ring-offset-1 focus-visible:ring-teal-600
            focus-visible:ring-offset-slate-100 active:scale-110"
        >
          <RusIcon :icon="mdiChevronDoubleLeft" />
        </button>

        <button
          title="Previous page"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
            hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
            duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
            focus-visible:ring-offset-1 focus-visible:ring-teal-600
            focus-visible:ring-offset-slate-100 active:scale-110"
        >
          <RusIcon :icon="mdiChevronLeft" />
        </button>

        <button
          :title="`Current Page: 1`"
          disabled
          class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-500/20
            text-slate-500 duration-300 ease-in-out transition-all focus:outline-none
            focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-teal-600
            focus-visible:ring-offset-slate-100 active:scale-110
            text-base font-medium"
        >
          1
        </button>

        <button
          title="Next page"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
            hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
            duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
            focus-visible:ring-offset-1 focus-visible:ring-teal-600
            focus-visible:ring-offset-slate-100 active:scale-110"
        >
          <RusIcon :icon="mdiChevronRight" />
        </button>

        <button
          title="Last page"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-transparent
            hover:bg-teal-500 text-slate-500 hover:text-teal-100 active:bg-opacity-30
            duration-300 ease-in-out transition-all focus:outline-none focus-visible:ring-1
            focus-visible:ring-offset-1 focus-visible:ring-teal-600
            focus-visible:ring-offset-slate-100 active:scale-110"
        >
          <RusIcon :icon="mdiChevronDoubleRight" />
        </button>
      </div>

      <!-- Page size -->
      <div class="flex flex-row flex-nowrap gap-x-4 items-center justify-end">
        <p class="text-slate-700 font-medium text-base">Page size</p>
        <select
          value="10"
          name="page-size"
          class="rounded-md text-teal-800 select-none
            bg-teal-200/20 hover:bg-teal-300/40 hover:text-teal-800 group
            focus:outline-none ring-1 ring-teal-400 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-teal-600
            focus-visible:ring-offset-slate-100 focus:border-0 transition-all duration-300 ease-in-out
            rounded-l-md flex flex-wrap items-center justify-center
            leading-none border-0"
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
</template>

<script setup lang="ts">
import RusIcon from '@/components/generic/RusIcon.vue';
import type { TableHeaderItems, TableSortDirection } from '@/interfaces/table';
import TableHeader from '@/components/generic/TableHeader.vue';
import {
  mdiPencil,
  mdiDelete,
  mdiChevronRight,
  mdiChevronLeft,
  mdiEye,
  mdiChevronDoubleRight,
  mdiChevronDoubleLeft,
} from '@mdi/js';
import type { DialogMode } from '@/interfaces/dialog';
import { USER_TABLE_HEADER } from '@/lib/data/user-table';
import RusIconF from './generic/RusIconF.vue';
import useGetAllUsers from '@/lib/hooks/useGetAllUsers';
import useGetAllRoles from '@/lib/hooks/useGetAllRoles';
import { formatDateToDDMMYYYY } from '@/lib/helpers';

defineProps<{
  openDialog: (mode: DialogMode) => void;
}>();

const totalRows = 20;
const rowFill = Array(totalRows).fill(null);
const rowHeaders: TableHeaderItems = [
  ...USER_TABLE_HEADER,
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

// Handle APIs
const { getAllUsersQ } = useGetAllUsers({
  page: 1,
  pageSize: 10,
  sort: 'asc',
  sortBy: 'id',
});
console.log('allUserData', getAllUsersQ?.data?.value);

const { getAllRolesQ } = useGetAllRoles();
console.log('allRoles', getAllRolesQ?.data?.value);
</script>

<style scoped lang="scss">
.rus-table-wrap {
  @apply w-full flex-initial overflow-x-auto overflow-y-auto relative
    rounded-t-md border border-b-0 border-teal-500 flex flex-col
    h-full max-h-[calc(100vh-14rem)];
}

.rus-table {
  @apply w-full flex-1 leading-none rounded-t-md h-auto
    overflow-y-auto overflow-x-auto relative table table-auto;

  & > tbody {
    @apply w-full overflow-y-auto overflow-x-hidden;

    tr {
      @apply bg-transparent w-full py-0 hover:bg-slate-200/40
        border-0 odd:bg-teal-500/10;

      td {
        @apply text-base font-normal text-slate-900 px-3 py-2;
      }

      td:nth-last-child(1) {
        @apply pl-3 pr-6;
      }
    }
  }
}
</style>
