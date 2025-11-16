<template>
  <transition name="toast">
    <div v-if="show" class="toast">{{ message }}</div>
  </transition>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: ['message', 'show']
}
export const toastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: ''
  })
  const showToast = (message) => {
    toastData.show = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessage = ''
    }, 2000)
  }
  const { show, toastMessage } = toRefs(toastData)

  return { show, toastMessage, showToast }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.05rem;
  color: #ffffff;
  z-index: 9999;
  box-shadow: 0 0.04rem 0.12rem rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(0.1rem);
  max-width: 80%;
  text-align: center;
  line-height: 1.5;
}
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}
</style>
