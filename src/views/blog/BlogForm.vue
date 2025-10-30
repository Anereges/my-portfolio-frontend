<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="cyber-card max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-cyber-border">
        <h2 class="text-2xl font-cyber text-cyber-primary">
          {{ mode === 'create' ? 'Create New Article' : 'Edit Article' }}
        </h2>
        <button
          @click="$emit('cancel')"
          class="w-8 h-8 rounded-lg border border-cyber-border hover:border-cyber-accent hover:text-cyber-accent flex items-center justify-center transition-colors"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="flex-1 overflow-auto">
        <div class="p-6 space-y-6">
          <!-- Title -->
          <div>
            <label class="block text-cyber-primary font-tech mb-2">Title</label>
            <input
              v-model="formData.title"
              type="text"
              required
              class="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-lg text-white font-tech placeholder-gray-500 focus:border-cyber-primary focus:outline-none transition-colors"
              placeholder="Enter article title..."
            />
          </div>

          <!-- Excerpt -->
          <div>
            <label class="block text-cyber-primary font-tech mb-2">Excerpt</label>
            <textarea
              v-model="formData.excerpt"
              required
              rows="3"
              class="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-lg text-white font-tech placeholder-gray-500 focus:border-cyber-primary focus:outline-none transition-colors resize-none"
              placeholder="Brief description of the article..."
            ></textarea>
          </div>

          <!-- Content -->
          <div>
            <label class="block text-cyber-primary font-tech mb-2">Content</label>
            <div class="border border-cyber-border rounded-lg overflow-hidden">
              <div class="flex border-b border-cyber-border">
                <button
                  type="button"
                  @click="editorMode = 'write'"
                  :class="[
                    'flex-1 py-3 font-tech text-sm transition-colors',
                    editorMode === 'write' 
                      ? 'bg-cyber-primary text-cyber-dark' 
                      : 'text-gray-400 hover:text-cyber-primary'
                  ]"
                >
                  Write
                </button>
                <button
                  type="button"
                  @click="editorMode = 'preview'"
                  :class="[
                    'flex-1 py-3 font-tech text-sm transition-colors',
                    editorMode === 'preview' 
                      ? 'bg-cyber-primary text-cyber-dark' 
                      : 'text-gray-400 hover:text-cyber-primary'
                  ]"
                >
                  Preview
                </button>
              </div>
              
              <div class="bg-cyber-dark">
                <!-- Write Mode -->
                <textarea
                  v-if="editorMode === 'write'"
                  v-model="formData.content"
                  required
                  rows="15"
                  class="w-full px-4 py-3 bg-cyber-dark text-white font-tech placeholder-gray-500 focus:outline-none resize-none font-mono text-sm"
                  placeholder="Write your article content in Markdown..."
                ></textarea>
                
                <!-- Preview Mode -->
                <div
                  v-else
                  class="prose prose-invert prose-cyber max-w-none p-4 max-h-96 overflow-auto"
                  v-html="renderedContent"
                ></div>
              </div>
            </div>
          </div>

          <!-- Two Column Layout -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Category -->
            <div>
              <label class="block text-cyber-primary font-tech mb-2">Category</label>
              <select
                v-model="formData.category"
                required
                class="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-lg text-white font-tech focus:border-cyber-primary focus:outline-none transition-colors"
              >
                <option value="">Select Category</option>
                <option v-for="category in categories" :key="category.value" :value="category.value">
                  {{ category.label }}
                </option>
              </select>
            </div>

            <!-- Read Time -->
            <div>
              <label class="block text-cyber-primary font-tech mb-2">Read Time (minutes)</label>
              <input
                v-model.number="formData.read_time"
                type="number"
                min="1"
                required
                class="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-lg text-white font-tech focus:border-cyber-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <!-- Two Column Layout -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Author -->
            <div>
              <label class="block text-cyber-primary font-tech mb-2">Author</label>
              <input
                v-model="formData.author"
                type="text"
                required
                class="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-lg text-white font-tech placeholder-gray-500 focus:border-cyber-primary focus:outline-none transition-colors"
                placeholder="Author name..."
              />
            </div>

            <!-- Featured Image -->
            <div>
              <label class="block text-cyber-primary font-tech mb-2">Featured Image URL</label>
              <input
                v-model="formData.featured_image"
                type="url"
                class="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-lg text-white font-tech placeholder-gray-500 focus:border-cyber-primary focus:outline-none transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-cyber-primary font-tech mb-2">
              Tags
              <span class="text-gray-400 text-sm ml-2">(Press Enter to add tags)</span>
            </label>
            <div class="flex flex-wrap gap-2 p-3 bg-cyber-dark border border-cyber-border rounded-lg min-h-12">
              <span
                v-for="tag in formData.tags"
                :key="tag"
                class="inline-flex items-center gap-1 px-3 py-1 bg-cyber-primary/20 text-cyber-primary rounded-full text-sm font-tech"
              >
                {{ tag }}
                <button
                  type="button"
                  @click="removeTag(tag)"
                  class="hover:text-cyber-accent"
                >
                  <X class="w-3 h-3" />
                </button>
              </span>
              <input
                v-model="newTag"
                @keydown.enter.prevent="addTag"
                type="text"
                class="flex-1 bg-transparent border-none outline-none text-white font-tech placeholder-gray-500"
                placeholder="Add a tag..."
              />
            </div>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-cyber-primary font-tech mb-2">Status</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2">
                <input
                  v-model="formData.status"
                  type="radio"
                  value="draft"
                  class="text-cyber-primary focus:ring-cyber-primary"
                />
                <span class="font-tech text-gray-300">Draft</span>
              </label>
              <label class="flex items-center gap-2">
                <input
                  v-model="formData.status"
                  type="radio"
                  value="published"
                  class="text-cyber-primary focus:ring-cyber-primary"
                />
                <span class="font-tech text-gray-300">Published</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-3 p-6 border-t border-cyber-border bg-cyber-dark/50">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-6 py-3 border border-cyber-border text-gray-400 rounded-lg hover:border-cyber-primary hover:text-cyber-primary transition-colors font-tech"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="saving"
            class="cyber-button px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Loader2 v-if="saving" class="w-4 h-4 animate-spin" />
            <span>{{ saving ? 'Saving...' : mode === 'create' ? 'Create Article' : 'Update Article' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { X, Loader2 } from 'lucide-vue-next'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export default {
  name: 'BlogForm',
  components: {
    X,
    Loader2
  },
  props: {
    post: {
      type: Object,
      default: null
    },
    mode: {
      type: String,
      default: 'create',
      validator: (value) => ['create', 'edit'].includes(value)
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const formData = ref({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      read_time: 5,
      author: '',
      featured_image: '',
      tags: [],
      status: 'draft'
    })

    const newTag = ref('')
    const editorMode = ref('write')
    const saving = ref(false)

    const categories = ref([
      { value: 'security', label: '🔒 Security' },
      { value: 'ai', label: '🤖 AI & Machine Learning' },
      { value: 'development', label: '💻 Development' },
      { value: 'quantum', label: '⚛️ Quantum Computing' },
      { value: 'design', label: '🎨 Design' },
      { value: 'tutorial', label: '📚 Tutorials' }
    ])

    const renderedContent = computed(() => {
      if (!formData.value.content) return ''
      const html = marked(formData.value.content)
      return DOMPurify.sanitize(html)
    })

    // Methods
    const addTag = () => {
      if (newTag.value.trim() && !formData.value.tags.includes(newTag.value.trim())) {
        formData.value.tags.push(newTag.value.trim())
        newTag.value = ''
      }
    }

    const removeTag = (tagToRemove) => {
      formData.value.tags = formData.value.tags.filter(tag => tag !== tagToRemove)
    }

    const handleSubmit = async () => {
      try {
        saving.value = true
        
        // Validate required fields
        if (!formData.value.title || !formData.value.excerpt || !formData.value.content) {
          throw new Error('Please fill in all required fields')
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        emit('save', formData.value)
      } catch (error) {
        console.error('Error saving post:', error)
        // In real app, show error toast
      } finally {
        saving.value = false
      }
    }

    // Initialize form with post data when editing
    watch(() => props.post, (newPost) => {
      if (newPost && props.mode === 'edit') {
        formData.value = { ...newPost }
      }
    }, { immediate: true })

    return {
      formData,
      newTag,
      editorMode,
      saving,
      categories,
      renderedContent,
      addTag,
      removeTag,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.prose-cyber {
  color: #e5e7eb;
}

.prose-cyber h1,
.prose-cyber h2,
.prose-cyber h3 {
  color: #00f7ff;
  font-family: 'Orbitron', monospace;
}

.prose-cyber a {
  color: #00f7ff;
  text-decoration: none;
  border-bottom: 1px solid #00f7ff;
}

.prose-cyber code {
  background: rgba(0, 247, 255, 0.1);
  color: #00f7ff;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

.prose-cyber pre {
  background: #1a1a2e;
  border: 1px solid #00f7ff;
  border-radius: 8px;
  padding: 1em;
  overflow-x: auto;
}
</style>