<template>
  <!-- Select Wrapper Element -->
  <div class='relative bg-transparent'>
    <!-- Select Input -->
    <div ref='selectRef' @keyup='handleContainerKeydown' @keyup.esc='closeMenu()'>
      <slot />
    </div>

    <!-- Select Menu -->
    <Transition name='swing-in-top-fwd'>
      <div v-if='isMenuOpen.value' :class='`rus-select-menu`' :data-uid='randomId'>
        <div
          v-for='(option, oi) in options'
          :key='option.value'
          @click='selectOption(option.value)'
          :data-uid='randomId'
          @keyup='handleContainerKeydown'
          @keyup.enter='selectOption(option.value)'
          @keyup.space='selectOption(option.value)'
          @keyup.esc='closeMenu()'
          tabindex='0'
          :id='`rus-select-option-${oi}`'
          v-bind="options.length - 1 === oi ? { ref: 'lastOptionRef' } : {}"
        >
          <input
            v-if='multiple'
            :checked='isValueSelected(option.value)'
            @click.stop
            @change='selectOption(option.value)'
            @keyup.space='selectOption(option.value)'
            :id='`rus-select-option-c-${oi}`'
            type='checkbox'
            class='form-checkbox rounded mr-2 bg-teal-100 text-teal-700 cursor-pointer
              group-hover:text-teal-300'
            tabindex='-1'
            :data-uid='randomId'
          >
          <label
            v-if='multiple'
            @click.stop
            :for='`rus-select-option-c-${oi}`'
            class='cursor-pointer'
            :data-uid='randomId'
          >
            {{ option.name }}
          </label>
          <span v-if='!multiple' :data-uid='randomId'>
            <p :data-uid='randomId'>{{ option.name }}</p>
            <RusIconF
              v-if='isValueSelected(option.value)'
              icon='check'
              :data-uid='randomId'
              class='w-4 h-4 text-current stroke-2
                absolute right-0 top-1/2 -translate-x-0.5
                -translate-y-1/2'
            />
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, watch } from 'vue';
import RusIconF from './RusIconF.vue';
import { randomAlpha } from '@/lib/helpers';
import type { Options } from '@/interfaces/table';

const randomId = ref(randomAlpha());

const props = defineProps<{
  value: string | Options,
  options: Options,
  label: string,
  placeholder: string,
  disabled: boolean,
  required: boolean,
  error: boolean,
  errorMessage: string,
  multiple?: boolean,
}>();

const emit = defineEmits({
  'updateValue': (val: string | Options) => true,
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

// Handle click outside
const handleClickOutside = (e: MouseEvent) => {
  if (!selectRef.value) {
    closeMenu();
    return;
  };
  const wrapper = selectRef.value?.getBoundingClientRect()
  const id = (e.target as unknown as { dataset: { uid: string } })?.dataset?.uid;
  console.log(id, randomId.value);
  if (
    id !== randomId.value &&
    (e.clientX < wrapper.left ||
    e.clientX > wrapper.right ||
    e.clientY < wrapper.top ||
    e.clientY > wrapper.bottom)
  ) {
    closeMenu();
  }
}

watch([isMenuOpen], () => {
  if (isMenuOpen.value) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
  () => {
    document.removeEventListener('click', handleClickOutside);
  }
});

// Handle other events
watch([selectRef], () => {
  const selectWrapper = selectRef.value;

  if (!selectWrapper) {
    return;
  }

  const handleClick = (e: MouseEvent) => {
    modifyEvent(e);
    isMenuOpen.value = !isMenuOpen.value;
  };

  selectWrapper?.addEventListener('click', handleClick);

  return () => {
    selectWrapper?.removeEventListener('click', handleClick);
  };
});

const isValueSelected = (value: string) => {
  if (props.multiple) {
    return Array.isArray(props.value) && props.value.some((val) => val.value === value);
  } else {
    return props.value === value;
  }
}

const selectOption = (value: string) => {
  if (props.multiple) {
    const newValue = props.options.find((opt) => opt.value === value);
    const alreadySelected = isValueSelected(value);
    if (newValue && !alreadySelected) {
      // Add to array
      emit('updateValue', [
        ...(Array.isArray(props.value) ? props.value : []),
        newValue,
      ]);
    } else {
      // Remove from array
      emit('updateValue', (props.value as Options).filter((val) => val.value !== value));
    }
  } else {
    emit('updateValue', value);
    closeMenu();
  }
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
  @apply absolute top-full mt-1 right-0 z-50 w-52 bg-teal-50 rounded-md shadow-lg
    overflow-hidden transition-all duration-300 ease-in-out shadow-teal-900/20
    border border-teal-500;
  
  & input[type='checkbox'] {
    @apply focus-visible:ring-0 focus-visible:border-0
      focus:ring-0 focus:border-0
      focus:outline-none focus-visible:outline-none
      focus-visible:ring-offset-0 focus-visible:ring-offset-transparent
      focus:ring-offset-0 focus:ring-offset-transparent
      pointer-events-none;
  }

  & > div {
    @apply px-4 py-3 cursor-pointer hover:bg-teal-500 text-base font-medium
      text-teal-900 hover:text-teal-100 bg-teal-300/10 leading-none flex flex-nowrap items-center justify-start
      transition-all duration-100 ease-out focus:outline-none focus-visible:bg-teal-500
      focus-visible:text-teal-100;

    & {
      label, span {
        @apply pointer-events-none select-none relative;
      }

      span {
        @apply w-full flex flex-row flex-nowrap items-center justify-start;
      }
    }
  }
}
</style>
