<template>
  <div 
    class="cyber-card p-6 cursor-pointer group relative overflow-hidden"
    @click="$emit('click')"
    @mouseenter="handleHover"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-cyber-primary/10 to-cyber-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div class="relative z-10">
      <!-- Icon -->
      <div :class="['w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform', stat.bgColor]">
        <component :is="stat.icon" :class="['w-6 h-6', stat.color]" />
      </div>

      <!-- Content -->
      <div class="flex items-end justify-between">
        <div>
          <h3 class="text-2xl font-cyber text-white mb-1">{{ stat.value }}</h3>
          <p class="text-gray-400 font-tech text-sm">{{ stat.title }}</p>
        </div>
        
        <!-- Trend Indicator -->
        <div :class="['flex items-center gap-1 px-2 py-1 rounded-full text-xs font-tech', 
          stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400']">
          <TrendingUp v-if="stat.trend === 'up'" class="w-3 h-3" />
          <TrendingDown v-else class="w-3 h-3" />
          {{ stat.change }}
        </div>
      </div>
    </div>

    <!-- Hover Border -->
    <div class="absolute inset-0 border-2 border-transparent group-hover:border-cyber-primary rounded-lg transition-all duration-300 pointer-events-none"></div>
  </div>
</template>

<script setup>
import { TrendingUp, TrendingDown } from 'lucide-vue-next'
import { useAnimations } from '../../composables/useAnimations'

const { createParticleEffect } = useAnimations()

defineProps({
  stat: {
    type: Object,
    required: true
  }
})

defineEmits(['click'])

const handleHover = (event) => {
  createParticleEffect(event)
}
</script>

<style scoped>
.cyber-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cyber-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 240, 255, 0.15);
}
</style>