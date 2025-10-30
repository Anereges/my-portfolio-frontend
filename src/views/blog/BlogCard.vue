<template>
  <article 
    class="cyber-card p-6 group cursor-pointer relative overflow-hidden h-full flex flex-col"
    @click="$router.push(`/blog/${post.slug}`)"
    @mouseenter="handleHover"
  >
    <!-- Featured Badge -->
    <div v-if="featured" class="absolute top-4 left-4 z-10">
      <span class="px-3 py-1 bg-cyber-accent/20 text-cyber-accent rounded-full text-xs font-cyber flex items-center gap-1">
        <Star class="w-3 h-3" />
        Featured
      </span>
    </div>

    <!-- Post Image -->
    <div class="relative mb-4 overflow-hidden rounded-lg flex-1 min-h-48">
      <div 
        v-if="post.featured_image"
        class="w-full h-full bg-cyber-dark rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110 overflow-hidden"
      >
        <img
          :src="getImageUrl(post.featured_image)"
          :alt="post.title"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>
      <div 
        v-else
        class="w-full h-full bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 rounded-lg flex items-center justify-center"
      >
        <div class="text-4xl">{{ getPostEmoji(post.title) }}</div>
      </div>
      
      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Read Time -->
      <div class="absolute bottom-3 left-3 px-2 py-1 bg-cyber-dark/80 rounded text-xs text-gray-300 font-tech">
        ⏱️ {{ post.read_time }} min read
      </div>
    </div>

    <!-- Rest of your template remains the same -->
    <!-- Content -->
    <div class="flex-1 flex flex-col">
      <!-- Category -->
      <div class="flex items-center gap-2 mb-3">
        <span class="text-lg">{{ getCategoryEmoji(post.category) }}</span>
        <span class="text-cyber-primary font-tech text-sm">{{ formatCategory(post.category) }}</span>
      </div>

      <!-- Title -->
      <h3 class="font-cyber text-white text-lg mb-3 group-hover:text-cyber-primary transition-colors line-clamp-2 leading-tight">
        {{ post.title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-gray-400 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
        {{ post.excerpt }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1 mb-4">
        <span
          v-for="tag in post.tags.slice(0, 2)"
          :key="tag"
          class="px-2 py-1 bg-cyber-primary/10 text-cyber-primary rounded text-xs font-tech"
        >
          #{{ tag }}
        </span>
        <span 
          v-if="post.tags.length > 2"
          class="px-2 py-1 bg-cyber-secondary/10 text-cyber-secondary rounded text-xs font-tech"
        >
          +{{ post.tags.length - 2 }}
        </span>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-4 border-t border-cyber-border">
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 bg-cyber-primary/20 rounded-full flex items-center justify-center">
            <User class="w-3 h-3 text-cyber-primary" />
          </div>
          <span class="text-gray-400 text-xs font-tech">{{ post.author }}</span>
        </div>
        
        <div class="flex items-center gap-4 text-xs text-gray-400">
          <div class="flex items-center gap-1">
            <Eye class="w-3 h-3" />
            {{ post.views }}
          </div>
          <div class="flex items-center gap-1">
            <Heart class="w-3 h-3" />
            {{ post.likes }}
          </div>
        </div>
      </div>
    </div>

    <!-- Hover Border -->
    <div class="absolute inset-0 border-2 border-transparent group-hover:border-cyber-primary rounded-lg transition-all duration-300 pointer-events-none"></div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimations } from '../../composables/useAnimations'
import { Star, User, Eye, Heart } from 'lucide-vue-next'

const router = useRouter()
const { createParticleEffect } = useAnimations()

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
})

// Get proper image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  
  console.log('Image path:', imagePath) // Debug log
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // If it's a relative path starting with /uploads/, prepend the API base URL
  if (imagePath.startsWith('/uploads/')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    return `${baseUrl}${imagePath}`
  }
  
  // If it's just a filename, assume it's in uploads/blog_images/
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  return `${baseUrl}/uploads/blog_images/${imagePath}`
}

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  // Hide the broken image and show the fallback background
  event.target.style.display = 'none'
}

// Remove the old imageStyle computed property and replace with:

// Image style with fallback (for background when no image)
const imageStyle = computed(() => {
  if (!props.post.featured_image) {
    return {
      background: 'linear-gradient(135deg, var(--cyber-primary) 0%, var(--cyber-secondary) 100%)'
    }
  }
  return {}
})

// Format category name
const formatCategory = (category) => {
  return category.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

// Get category emoji
const getCategoryEmoji = (category) => {
  const emojis = {
    technology: '🔧',
    security: '🛡️',
    web_development: '🌐',
    cyber_security: '🔐',
    programming: '💻',
    tutorial: '🎯',
    news: '📰'
  }
  return emojis[category] || '📝'
}

// Get post emoji based on title
const getPostEmoji = (title) => {
  const emojis = {
    'security': '🛡️',
    'cyber': '🔐',
    'api': '⚡',
    'web': '🌐',
    'vue': '⚡',
    'python': '🐍',
    'docker': '🐳',
    'blockchain': '⛓️',
    'ai': '🤖',
    'tutorial': '🎯'
  }
  
  for (const [key, emoji] of Object.entries(emojis)) {
    if (title.toLowerCase().includes(key)) {
      return emoji
    }
  }
  return '📝'
}

// Hover handler
const handleHover = (event) => {
  createParticleEffect(event)
}
</script>

<style scoped>
.cyber-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cyber-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 240, 255, 0.15);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Featured card specific styles */
.featured .cyber-card {
  border: 2px solid transparent;
  background: linear-gradient(145deg, #11111f, #0a0a15) padding-box,
              linear-gradient(45deg, #00f0ff, #ff00ff) border-box;
}

.featured .cyber-card:hover {
  transform: translateY(-12px) scale(1.03);
  box-shadow: 0 25px 50px rgba(0, 240, 255, 0.2);
}
</style>