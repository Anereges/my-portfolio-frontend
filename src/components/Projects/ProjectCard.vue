<template>
  <div 
    class="cyber-card p-6 relative overflow-hidden group cursor-pointer transform-gpu"
    @mouseenter="handleHover"
    @mouseleave="handleLeave"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-cyber-primary/10 to-cyber-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <!-- Project Image -->
    <div class="relative mb-4 overflow-hidden rounded-lg">
      <div class="w-full h-48 bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 rounded-lg flex items-center justify-center">
        <div class="text-4xl">{{ getProjectEmoji(project.title) }}</div>
      </div>
      <div class="absolute inset-0 bg-cyber-primary/0 group-hover:bg-cyber-primary/10 transition-colors duration-300 flex items-center justify-center">
        <div class="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 space-x-4">
          <button 
            v-if="project.github_url"
            @click.stop="openLink(project.github_url)"
            class="cyber-button p-2 text-sm"
          >
            <Github class="w-4 h-4" />
          </button>
          <button 
            v-if="project.live_url"
            @click.stop="openLink(project.live_url)"
            class="cyber-button p-2 text-sm border-cyber-accent text-cyber-accent"
          >
            <ExternalLink class="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <!-- Status Badge -->
      <div class="absolute top-3 right-3">
        <span :class="[
          'px-2 py-1 rounded-full text-xs font-cyber',
          statusClasses[project.status]
        ]">
          {{ project.status }}
        </span>
      </div>
    </div>

    <!-- Project Info -->
    <div class="relative z-10">
      <h3 class="text-xl font-cyber text-cyber-primary mb-2 group-hover:glow-text transition-all">
        {{ project.title }}
      </h3>
      <p class="text-gray-400 text-sm mb-4 leading-relaxed">
        {{ project.short_description }}
      </p>
      
      <!-- Technologies -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in project.technologies.slice(0, 3)"
          :key="tech"
          class="px-2 py-1 bg-cyber-primary/20 text-cyber-primary rounded text-xs font-tech"
        >
          {{ tech }}
        </span>
        <span 
          v-if="project.technologies.length > 3"
          class="px-2 py-1 bg-cyber-secondary/20 text-cyber-secondary rounded text-xs font-tech"
        >
          +{{ project.technologies.length - 3 }}
        </span>
      </div>

      <!-- Project Metrics -->
      <div class="flex justify-between items-center text-xs text-gray-500 font-tech">
        <span v-if="project.metrics">{{ project.metrics.users }} users</span>
        <span v-if="project.metrics">{{ project.metrics.performance }}% perf</span>
        <span>Featured: {{ project.featured ? '⭐' : '🔹' }}</span>
      </div>
    </div>

    <!-- Hover Effect Border -->
    <div class="absolute inset-0 border-2 border-transparent group-hover:border-cyber-primary rounded-lg transition-all duration-300 pointer-events-none"></div>
  </div>
</template>

<script setup>
import { Github, ExternalLink } from 'lucide-vue-next'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const statusClasses = {
  completed: 'bg-cyber-accent/20 text-cyber-accent',
  in_progress: 'bg-cyber-primary/20 text-cyber-primary',
  planning: 'bg-cyber-secondary/20 text-cyber-secondary',
  maintenance: 'bg-gray-500/20 text-gray-400'
}

const getProjectEmoji = (title) => {
  const emojis = {
    'Neural': '🧠',
    'Quantum': '⚛️',
    'Cyber': '🦾',
    'AI': '🤖',
    'Blockchain': '⛓️',
    'IoT': '📡'
  }
  
  for (const [key, emoji] of Object.entries(emojis)) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return emoji
    }
  }
  return '💻'
}

const handleHover = (event) => {
  const card = event.currentTarget
  card.style.transform = 'perspective(1000px) rotateY(5deg) rotateX(5deg) translateZ(20px)'
  
  // Create particle effect at mouse position
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  // createParticleEffect({ clientX: x + rect.left, clientY: y + rect.top })
}

const handleLeave = (event) => {
  const card = event.currentTarget
  card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
}

const openLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.cyber-card {
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.group:hover .cyber-card {
  transform: translateY(-8px) scale(1.02);
}
</style>