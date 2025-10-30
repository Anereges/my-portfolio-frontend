<script setup>
import { onMounted } from 'vue'
import { useAnimations } from './composables/useAnimations'

const { createParticleEffect } = useAnimations()

// Floating particles configuration
const particleStyle = (index) => {
  const size = Math.random() * 4 + 1
  const duration = Math.random() * 20 + 10
  const delay = Math.random() * 20
  const color = Math.random() > 0.5 ? '#00f0ff' : '#ff00ff'
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    backgroundColor: color,
    opacity: Math.random() * 0.6 + 0.2
  }
}

onMounted(() => {
  console.log('🚀 Cyber Portfolio Activated')
})
</script>

<template>
  <div class="min-h-screen bg-cyber-darker text-white font-tech relative overflow-hidden">
    <!-- Animated Matrix Background -->
    <div class="matrix-bg"></div>
    
    <!-- Floating Cyber Particles -->
    <div class="floating-particles">
      <div v-for="i in 50" :key="i" class="particle" :style="particleStyle(i)"></div>
    </div>

    <!-- Cyber Scan Line -->
    <div class="scan-line"></div>

    <!-- Holographic Grid Overlay -->
    <div class="holographic-grid"></div>

    <!-- Router View for Pages -->
    <RouterView />

    <!-- Cyber Terminal Footer -->
    <footer class="fixed bottom-0 left-0 right-0 z-40 bg-cyber-dark/80 backdrop-blur-md border-t border-cyber-border py-2">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center text-sm">
          <div class="font-cyber text-cyber-primary">
            <span class="animate-pulse">█</span> SYSTEM_ACTIVE
          </div>
          <div class="font-tech text-gray-400">
            CYBER_PORTFOLIO v1.0 | 
            <span class="text-cyber-accent">READY_FOR_TRANSMISSION</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.floating-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.holographic-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(90deg, transparent 95%, rgba(0, 240, 255, 0.03) 100%),
    linear-gradient(transparent 95%, rgba(0, 240, 255, 0.03) 100%);
  background-size: 30px 30px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.3;
}

.matrix-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  background: linear-gradient(180deg, #050508 0%, #0a0a0f 100%);
}

.matrix-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
  opacity: 0.1;
}

.scan-line {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f0ff, transparent);
  animation: scan 3s linear infinite;
  z-index: 1000;
  pointer-events: none;
  box-shadow: 0 0 10px #00f0ff;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(180deg); 
  }
}

@keyframes scan {
  0% { 
    transform: translateY(-100%); 
    opacity: 1;
  }
  50% { 
    opacity: 0.8;
  }
  100% { 
    transform: translateY(100vh); 
    opacity: 1;
  }
}

/* Cyber terminal blinking cursor effect */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-pulse {
  animation: blink 1s infinite;
}
</style>