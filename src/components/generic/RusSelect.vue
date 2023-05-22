<template>
  <!-- Select Wrapper Element -->
  <div class='relative bg-transparent'>
    <!-- Select Input -->
    <div ref='selectRef' @keyup='handleContainerKeydown' @keyup.esc='closeMenu()'>
      <slot />
    </div>

    <!-- Select Menu -->
    <div v-if='isMenuOpen.value' class='rus-select-menu'>
      <div
        v-for='(option, oi) in options'
        :key='option.value'
        @click='selectOption(option.value)'
        @keyup='handleContainerKeydown'
        @keyup.enter='selectOption(option.value)'
        @keyup.space='selectOption(option.value)'
        @keyup.esc='closeMenu()'
        tabindex='0'
        :id='`rus-select-option-${oi}`'
        v-bind="options.length - 1 === oi ? { ref: 'lastOptionRef' } : {}"
      >
        <span>{{ option.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue';

export type Options = {
  name: string,
  value: string,
}[];

const props = defineProps<{
  value: string,
  options: Options,
  label: string,
  placeholder: string,
  disabled: boolean,
  required: boolean,
  error: boolean,
  errorMessage: string,
}>();

const emit = defineEmits({
  'updateValue': (val: string) => !!val,
});

const selectRef = ref<HTMLElement | null>(null);
const lastOptionRef = ref<HTMLElement | null>(null);
const isMenuOpen = reactive({ value: false });

const modifyEvent = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
}

const closeMenu = () => {
  isMenuOpen.value = false;
};

// Handle blur on last option
watch([lastOptionRef], () => {
  const lastOpt = lastOptionRef.value;

  if (!lastOpt || !lastOpt?.addEventListener) {
    return;
  }

  lastOpt.addEventListener('focusout', (e) => {
    modifyEvent(e);
    if (!e.relatedTarget) return;
    // Detect if focus shift was clicked or if its due to up/down arrow
    if (e.relatedTarget instanceof HTMLElement) {
      if (e.relatedTarget.id.startsWith('rus-select-option-')) {
        return;
      }
    }
    
    closeMenu();
  });
});

// Handle other events
watch([selectRef], () => {
  const selectWrapper = selectRef.value;

  if (!selectWrapper) {
    return;
  }

  selectWrapper?.addEventListener('click', (e) => {
    modifyEvent(e);
    isMenuOpen.value = !isMenuOpen.value;
  });
});

const selectOption = (value: string) => {
  emit('updateValue', value);
  closeMenu();
}

const preventDefaultKeyA = () => {
    document?.addEventListener('keydown', modifyEvent);
    document?.addEventListener('keyup', modifyEvent);
    document?.addEventListener('keypress', modifyEvent);
}

const preventDefaultKeyR = () => {
  document?.removeEventListener('keydown', modifyEvent);
  document?.removeEventListener('keyup', modifyEvent);
  document?.removeEventListener('keypress', modifyEvent);
}

const handleUpArrow = (e: Event) => {
  modifyEvent(e);
  preventDefaultKeyA();
  if (!isMenuOpen.value) {
    isMenuOpen.value = true;
  }

  const currentFocused = document.activeElement;
  if (currentFocused && currentFocused.id.startsWith('rus-select-option-')) {
    if (currentFocused.id === 'rus-select-option-0' && lastOptionRef.value) {
      lastOptionRef.value?.focus();
      preventDefaultKeyR();
      return;
    }

    type FocusableElement = { focus: (e?: FocusEvent) => void };
    const { previousElementSibling } = currentFocused;
    if (previousElementSibling) {
      (previousElementSibling as unknown as FocusableElement).focus();
      preventDefaultKeyR();
      return;
    }
  }
  preventDefaultKeyR();
}

const handleDownArrow = (e: Event) => {
  modifyEvent(e);
  preventDefaultKeyA();
  if (!isMenuOpen.value) {
    isMenuOpen.value = true;
  }

  const currentFocused = document.activeElement;
  if (currentFocused && currentFocused.id.startsWith('rus-select-option-')) {
    type FocusableElement = { focus: (e?: FocusEvent) => void };
    const { nextElementSibling } = currentFocused;
    if (nextElementSibling) {
      (nextElementSibling as unknown as FocusableElement).focus();
      preventDefaultKeyR();
      return;
    }
  }

  const firstOption = document.getElementById(`rus-select-option-0`);
  if (firstOption) {
    firstOption.focus();
  }
  preventDefaultKeyR();
}

const handleContainerKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    handleDownArrow(e);
  }
  if (e.key === 'ArrowUp') {
    handleUpArrow(e);
  }
}
</script>

<style scoped lang='scss'>
.rus-select-menu {
  @apply absolute top-full mt-1 left-0 z-50 w-auto bg-white rounded-md shadow-lg
    overflow-hidden transition-all duration-300 ease-in-out shadow-teal-700/20
    ring-1 ring-teal-200 ring-offset-1 ring-offset-slate-50 border-0;

  & > div {
    @apply pl-4 pr-10 py-3 cursor-pointer hover:bg-teal-500 text-base font-medium
      text-teal-900 hover:text-teal-100 bg-teal-500/30 leading-none flex flex-nowrap items-center justify-start
      transition-all duration-100 ease-out focus:outline-none focus-visible:bg-teal-500
      focus-visible:text-teal-100;
  }
}
</style>
