<template>
  <div v-if='containerState' class='rus-modal-wrapper'>
    <!-- Modal -->
    <div class='rus-modal-container'>
      <Transition
        name='zoom-center'
      >
        <div v-if='modalState' class='rus-modal'>
          <div class='rus-modal-header'>
            <div>
              <RusIcon :icon='mdiAccount' />
              <h3>View User</h3>
            </div>
            <button @click='closeModal'>
              <RusIcon :icon='mdiClose' />
            </button>
          </div>
          <div class='rus-modal-body'>
            <div class='w-full grid grid-cols-2 gap-y-5 gap-x-2'>
              <div
                v-for="(item, key) in userDetails"
                :key="key"
                class='item-display-field'
              >
                <label>{{item.label}}</label>
                <p>{{item.value}}</p>
              </div>
            </div>
          </div>
          <div class='rus-modal-footer'>
            <button class='btn close-btn' @click='closeModal'>
              Close
            </button>
          </div>
        </div>
      </Transition>
      <!-- Overlay -->
      <Transition name='fade-in'>
        <div class='rus-modal-overylay' @click.stop.capture="closeModal" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import RusIcon from '../generic/RusIcon.vue';
import { mdiAccount, mdiClose } from '@mdi/js';

const modalState = ref(true);
const containerState = ref(true);
const userDetails = reactive({
  username: {
    label: 'Username',
    value: 'smitpatelx',
  },
  email: {
    label: 'Email',
    value: 'smitpatel.dev@gmail.com',
  },
  firstName: {
    label: 'First Name',
    value: 'Smit',
  },
  lastName: {
    label: 'Last Name',
    value: 'Patel',
  },
  phone: {
    label: 'Phone',
    value: '+91 234-536-7886',
  },
  company: {
    label: 'Company',
    value: 'Demo company LTD.',
  }
});

const toggleBodyScroll = () => {
  const appWrapper = document.getElementById('vueApp');

  if (!appWrapper) return;

  // Disable scrolling when modal is open
  if (containerState.value) {
    appWrapper.style.overflow = 'hidden';
  } else {
    appWrapper.style.overflow = 'auto';
  }
};

onMounted(() => {
  toggleBodyScroll();
});
watch([containerState], () => {
  toggleBodyScroll();
});

const openModal = async () => {
  containerState.value = true;
  
  await new Promise((resolve) => {
    setTimeout(() => {
      modalState.value = true;
      resolve(true);
    }, 500);
  });
}

const closeModal = async () => {
  modalState.value = false;

  await new Promise((resolve) => {
    setTimeout(() => {
      containerState.value = false;
      resolve(true);
    }, 500);
  });
}
</script>
