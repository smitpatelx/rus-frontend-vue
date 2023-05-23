<template>
  <header
    class='w-full flex flex-wrap items-center
    justify-between px-4 py-2 bg-teal-100
    border-b border-teal-500 flex-initial'
  >
    <div class='flex flex-row flex-nowrap gap-x-3 items-center'>
      <div
        class='w-auto bg-sky-600/20 text-teal-900 rounded text-sm font-medium py-0.5 px-2
          shadow ring-1 ring-sky-500/30 leading-none cursor-help font-mono'
        title='RUS plugin version - 1.1.0'
      >
        1.1.0
      </div>
      <h2 class='text-lg font-semibold text-transparent
        bg-gradient-to-br from-teal-500 to-teal-800
        bg-clip-text'>
        Robust User Search
      </h2>
    </div>

    <div class='w-auto flex flex-row flex-nowrap items-center justify-end gap-x-4 p-1'>
      <a
        href='/setting'
        class='text-teal-800 text-base font-medium rounded-md
          flex flex-row flex-nowrap items-center justify-center
          gap-x-1.5 hover:text-teal-600 pl-1 pr-1.5 py-0.5
          hover:ring-teal-500 transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-0 focus:border-0 focus:underline'
      >
        <RusIcon
          :icon='mdiAccountCogOutline'
        />
        Security
      </a>
      <a
        href='https://github.com/smitpatelx/robust-user-search'
        class='text-teal-800 text-base font-medium rounded-md
          flex flex-row flex-nowrap items-center justify-center
          gap-x-1.5 hover:text-teal-600 pl-1 pr-1.5 py-0.5 ring-1 ring-teal-800
          hover:ring-teal-500 transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-1 focus:ring-teal-500 focus:ring-offset-1
          focus:ring-offset-teal-100 active:scale-110 focus:bg-teal-600
          focus:text-teal-100'
      >
        <RusIcon
          :icon='mdiGithub'
        />
        Docs
      </a>
    </div>
  </header>
</template>

<script setup lang='ts'>
import RusIcon from '@/components/generic/RusIcon.vue';
import { mdiGithub, mdiAccountCogOutline } from '@mdi/js';
</script>
