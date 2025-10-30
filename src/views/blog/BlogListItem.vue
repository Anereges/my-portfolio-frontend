<template>
  <article class="cyber-card group relative overflow-hidden transition-all duration-300 hover:border-cyber-primary">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Image -->
      <div class="md:w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          :src="post.featured_image"
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 flex flex-col py-2">
        <!-- Header -->
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <!-- Selection Checkbox -->
            <div v-if="selectable" class="flex-shrink-0">
              <input
                type="checkbox"
                :checked="selected"
                @change="$emit('select', $event.target.checked)"
                class="w-4 h-4 rounded border-cyber-border bg-cyber-dark text-cyber-primary focus:ring-cyber-primary"
              />
            </div>

            <!-- Category -->
            <span class="inline-flex items-center gap-1 px-3 py-1 bg-cyber-primary/20 text-cyber-primary rounded-full text-sm font-tech">
              <span>{{ getCategoryEmoji(post.category) }}</span>
              <span class="text-xs">{{ formatCategory(post.category) }}</span>
            </span>

            <!-- Status -->
            <span v-if="post.status === 'draft'" class="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-tech">
              <span class="text-xs">DRAFT</span>
            </span>
          </div>

          <!-- Admin Actions -->
          <div v-if="selectable" class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              @click.stop="$emit('edit', post)"
              class="w-7 h-7 bg-cyber-primary/20 border border-cyber-primary rounded flex items-center justify-center hover:bg-cyber-primary/30 transition-colors"
              title="Edit"
            >
              <Edit class="w-3 h-3 text-cyber-primary" />
            </button>
            <button
              @click.stop="$emit('delete', post)"
              class="w-7 h-7 bg-cyber-accent/20 border border-cyber-accent rounded flex items-center justify-center hover:bg-cyber-accent/30 transition-colors"
              title="Delete"
            >
              <Trash2 class="w-3 h-3 text-cyber-accent" />
            </button>
          </div>
        </div>

        <!-- Title & Excerpt -->
        <h3 class="text-xl font-cyber font-bold mb-2 cyber-text group-hover:text-cyber-secondary transition-colors">
          {{ post.title }}
        </h3>
        <p class="text-gray-300 mb-4 line-clamp-2 leading-relaxed flex-1">
          {{ post.excerpt }}
        </p>

        <!-- Meta Footer -->
        <div class="flex items-center justify-between pt-4 border-t border-cyber-border">
          <div class="flex items-center gap-4 text-sm text-gray-400 font-tech">
            <span class="flex items-center gap-1">
              <User class="w-3 h-3" />
              {{ post.author }}
            </span>
            <span class="flex items-center gap-1">
              <Calendar class="w-3 h-3" />
              {{ formatDate(post.created_at) }}
            </span>
            <span class="flex items-center gap-1">
              <Clock class="w-3 h-3" />
              {{ post.read_time }}min
            </span>
          </div>

          <div class="flex items-center gap-4 text-sm text-gray-400 font-tech">
            <span class="flex items-center gap-1">
              <Eye class="w-3 h-3" />
              {{ formatViews(post.views) }}
            </span>
            <span class="flex items-center gap-1 text-cyber-primary">
              <Heart class="w-4 h-4" />
              {{ formatLikes(post.likes) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { User, Calendar, Clock, Eye, Heart, Edit, Trash2 } from 'lucide-vue-next'

export default {
  name: 'BlogListItem',
  components: {
    User,
    Calendar,
    Clock,
    Eye,
    Heart,
    Edit,
    Trash2
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select', 'edit', 'delete'],
  methods: {
    getCategoryEmoji(category) {
      const emojis = {
        security: '🔒',
        ai: '🤖',
        development: '💻',
        quantum: '⚛️',
        design: '🎨',
        tutorial: '📚'
      }
      return emojis[category] || '📄'
    },
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1)
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    formatViews(views) {
      if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'k'
      }
      return views.toString()
    },
    formatLikes(likes) {
      if (likes >= 1000) {
        return (likes / 1000).toFixed(1) + 'k'
      }
      return likes.toString()
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>