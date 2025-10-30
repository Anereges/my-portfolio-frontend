<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      :class="[
        'fixed top-4 right-4 cyber-card p-4 max-w-sm z-50 flex items-center gap-3',
        type === 'error' ? 'border-cyber-accent' : 'border-cyber-primary'
      ]"
    >
      <component
        :is="type === 'error' ? AlertCircle : CheckCircle"
        :class="[
          'w-5 h-5 flex-shrink-0',
          type === 'error' ? 'text-cyber-accent' : 'text-cyber-primary'
        ]"
      />
      <p class="font-tech text-sm flex-1">{{ message }}</p>
      <button
        @click="$emit('close')"
        class="w-5 h-5 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <X class="w-3 h-3" />
      </button>
    </div>
  </transition>
</template>

<script>
import { CheckCircle, AlertCircle, X } from 'lucide-vue-next'

export default {
  name: 'Toast',
  components: {
    CheckCircle,
    AlertCircle,
    X
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'error'].includes(value)
    }
  },
  emits: ['close'],
  watch: {
    show(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$emit('close')
        }, 3000)
      }
    }
  }
}
</script>