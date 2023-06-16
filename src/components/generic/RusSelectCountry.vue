<template>
  <!-- Select Wrapper Element -->
  <div class="relative bg-transparent">
    <!-- Select Input -->
    <div
      ref="selectCountryRef"
      @keyup.stop="handleContainerKeydown"
      @keyup.esc.stop="closeMenu()"
    >
      <button
        class="rus-select-country group-[rus-c]"
        @keyup.enter.stop.capture
        @keyup.space.stop.capture
        :id="attrs.id"
        :tabindex="0"
      >
        <span>
          <img
            :src="getImageSrc()"
            :alt="attrs.label"
          />
        </span>
        <p
          :class="cn(
            {
              '!text-teal-500/60 !font-normal': !attrs.getLabel(attrs.value),
            }
          )"
        >
          {{ attrs.getLabel(attrs.value) || 'Please select one' }}
        </p>
        <RusIcon
          :class="{ up: isMenuOpen.value }"
          class="rus-select-country-icon-down"
          :icon="mdiChevronDown"
        />
      </button>
    </div>

    <!-- Select Menu -->
    <Transition name="swing-in-top-fwd">
      <div
        v-if="isMenuOpen.value && Object.keys(filteredOptions).length > 0"
        class="rus-select-menu"
      >
        <input
          v-model="autoCompleteInput"
          placeholder="Search for a country"
          :disabled="attrs.disabled"
          :required="attrs.required"
          :id="attrs.id"
          name="rus-country-auto-complete"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          @keyup.esc.stop="closeMenu()"
          :autocomplete="randomAlpha()"
        />
        <div
          v-for="(option, key) in filteredOptions"
          :key="key"
          @click="selectOption(key)"
          @keyup.stop="handleContainerKeydown"
          @keyup.enter.stop.capture="selectOption(key)"
          @keyup.space.stop.capture="selectOption(key)"
          @keyup.esc.stop.prevent="closeMenu()"
          tabindex="0"
          :id="`rus-select-option-${key}`"
          v-bind='key === lastOptionKey ? { ref: "lastOptionRef" } : {}'
        >
          <span v-if="attrs.getLabel(key)">{{ attrs.getLabel(key) }}</span>
          <span v-else>No results found.</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, useAttrs, computed } from 'vue';
import { cn } from '@/lib/utils';
import { mdiChevronDown } from '@mdi/js';
import RusIcon from './RusIcon.vue';
import { randomAlpha } from '@/lib/helpers';
import { onClickOutside } from '@vueuse/core';

const ASSET_URL = import.meta.env.VITE_ASSET_URL as string;

export type Options = {
  name: string,
  value: string,
}[];

const attrs = useAttrs() as {
  id: string,
  value: string,
  label: string,
  options: Record<string, unknown>,
  placeholder: string,
  disabled: boolean,
  required: boolean,
  error: string | undefined,
  getLabel: (key: string) => string;
  getValue: (key: string) => string;
};

const emits = defineEmits<{
  change: [value: string],
  blur: [],
}>();

const getImageSrc = ref(() => {
  const imageName = attrs.value;
  if (!imageName) {
    return `${ASSET_URL}/default.svg`;
  }
  return `${ASSET_URL}/${imageName}.svg`
});

const autoCompleteInput = ref('');

const filteredOptions = computed(() => {
  const options = attrs.options as Record<string, unknown>;
  let filteredOptions: Record<string, unknown> = {};

  Object.keys(options).forEach((key) => {
    const option = options[key] as { name: string, value: string };
    const copyStr = String(autoCompleteInput.value).toLowerCase();
    if (!!option?.name && (!copyStr || option?.name?.toLowerCase()?.includes(copyStr))) {
      filteredOptions[key] = option;
    }
  });

  if (Object.keys(filteredOptions).length === 0) {
    filteredOptions = {
      'rus-no-results': {
        name: 'No results found',
        value: '',
      },
    };
  }
  return filteredOptions;
});

const firstOptionKey = computed(() => Object.keys(filteredOptions)[0]);
const lastOptionKey = computed(() => Object.keys(filteredOptions)[Object.keys(filteredOptions).length - 1]);

const selectCountryRef = ref<HTMLDivElement | null>(null);
const lastOptionRef = ref<HTMLElement | null>(null);
const isMenuOpen = reactive({ value: false });

const modifyEvent = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
}

const closeMenu = async () => {
  emits('blur');
  autoCompleteInput.value = '';
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
watch([selectCountryRef], () => {
  const selectWrapper = selectCountryRef.value;

  if (!selectWrapper) {
    return;
  }

  selectWrapper?.addEventListener('click', (e) => {
    modifyEvent(e);
    isMenuOpen.value = !isMenuOpen.value;
  });
});

const selectOption = async (key: string) => {
  if (key === 'rus-no-results') {
    return;
  }
  emits('change', key);
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
    if (currentFocused.id === `rus-select-option-${firstOptionKey.value}` && lastOptionRef.value) {
      lastOptionRef.value?.focus();
      preventDefaultKeyR();
      return;
    }

    type FocusableElement = { focus: (e?: FocusEvent) => void };
    const { previousElementSibling } = currentFocused;
    if (previousElementSibling && previousElementSibling.id.startsWith('rus-select-option-')) {
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

  const firstOption = document.getElementById(`rus-select-option-${firstOptionKey.value}`);
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

onClickOutside(selectCountryRef, () => closeMenu());
</script>

<style scoped lang="scss">
.rus-select-menu {
  @apply absolute top-full mt-1 left-0 z-[99999] w-full bg-white rounded-md shadow-lg
    overflow-hidden transition-all duration-300 ease-in-out shadow-teal-700/20
    ring-1 ring-teal-200 ring-offset-1 ring-offset-slate-50 border-0 max-h-44 overflow-x-hidden
    overflow-y-auto;

  & > div {
    @apply pl-4 pr-10 py-3 cursor-pointer hover:bg-teal-500 text-sm font-medium
      text-teal-900 hover:text-teal-100 bg-teal-500/30 leading-none flex flex-nowrap
      items-center justify-start focus:outline-none focus-visible:bg-teal-500
      focus-visible:text-teal-100;
  }

  input[name="rus-country-auto-complete"] {
    @apply w-full h-full bg-teal-600 border-0 outline-none
      placeholder-teal-100/60 placeholder:font-normal py-2.5 px-3
      focus:placeholder-transparent focus:ring-0 focus:border-0
      leading-none whitespace-nowrap overflow-hidden overflow-ellipsis
      text-base font-normal text-teal-100 sticky top-0 left-0 tracking-wide;
  }
}

.rus-select-country {
  @apply py-0 pl-14 pr-3 leading-none text-base font-medium
    bg-teal-100/30 text-teal-900 rounded-md shadow-none
    ring-1 ring-teal-500/30 focus:ring-1 focus:ring-teal-500
    focus:ring-offset-1 focus:ring-offset-teal-100
    focus:outline-none focus:border-0 border-0
    placeholder-teal-500/60 placeholder:font-light
    transition duration-200 ease-in-out w-full
    flex items-center justify-start select-none
    relative text-left;

  & > p {
    @apply w-[calc(100%-0.5rem)] whitespace-nowrap overflow-hidden overflow-ellipsis select-none
      bg-transparent py-2.5 text-teal-900;
  }

  & > span {
    @apply absolute top-1/2 left-0 -translate-y-1/2 w-12 h-full
      mr-2 flex items-center justify-center p-[3px] select-none;

    & > img {
      @apply object-cover h-full overflow-hidden rounded
        aspect-[1.5] select-none border border-teal-500
        origin-center transition-all duration-300 ease-in-out;
    }
  }

  & > .rus-select-country-icon-down {
    @apply w-4 h-4 ml-2 absolute right-2 top-1/2 transform -translate-y-1/2
      text-slate-500 transition-all duration-300 ease-out;

    &.up {
      @apply transform rotate-180;
    }
  }
}
</style>
