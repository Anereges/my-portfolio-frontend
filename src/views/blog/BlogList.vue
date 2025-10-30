<template>
  <div class="min-h-screen bg-cyber-darker relative overflow-hidden">
    <AdminNavbar />
    
    <!-- Cybernetic Background -->
    <div class="admin-bg">
      <div class="cyber-grid"></div>
      <div class="data-streams">
        <div v-for="stream in 6" :key="stream" class="data-stream" :style="streamStyle(stream)"></div>
      </div>
      <div class="holographic-elements">
        <div v-for="i in 8" :key="i" class="hologram" :style="hologramStyle(i)"></div>
      </div>
    </div>

    <div class="relative z-10 pt-28 pb-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Header with Matrix Effect -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div class="text-center lg:text-left mb-6 lg:mb-0">
            <div class="inline-flex items-center gap-3 bg-cyber-card/60 border border-cyber-primary/40 rounded-full px-6 py-3 mb-4 backdrop-blur-sm glow-primary">
              <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
              <span class="font-cyber text-cyber-primary text-sm tracking-wider">CONTENT_MANAGEMENT_SYSTEM</span>
              <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
            </div>
            
            <h1 class="text-5xl md:text-7xl font-cyber font-bold mb-4 matrix-text">
              BLOG_DASHBOARD
            </h1>
            <p class="text-xl text-gray-300 font-tech max-w-2xl">
              MANAGE YOUR <span class="text-cyber-primary">DIGITAL_CONTENT</span> AND 
              <span class="text-cyber-accent">PUBLISH_INNOVATIONS</span>
            </p>
          </div>
          
          <!-- Action Controls -->
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <div class="relative">
              <select 
                v-model="categoryFilter" 
                class="cyber-input-enhanced pl-10 pr-8 appearance-none"
                @mouseenter="createParticleEffect($event)"
              >
                <option value="all">ALL_CATEGORIES</option>
                <option value="technology">TECHNOLOGY</option>
                <option value="security">SECURITY</option>
                <option value="web_development">WEB_DEVELOPMENT</option>
                <option value="cyber_security">CYBER_SECURITY</option>
                <option value="programming">PROGRAMMING</option>
                <option value="tutorial">TUTORIAL</option>
                <option value="news">NEWS</option>
              </select>
              <Settings class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <button
              @click="initiateArticleCreation"
              class="cyber-button-enhanced flex items-center gap-3 px-6 py-3 glow-primary hover:glow-accent transition-all duration-300"
              @mouseenter="createQuantumEffect($event)"
            >
              <Plus class="w-5 h-5" />
              <span class="font-tech tracking-wider">NEW_ARTICLE</span>
            </button>

            <button
              @click="refreshArticles"
              class="cyber-button-enhanced flex items-center gap-3 px-6 py-3 border-cyber-primary text-cyber-primary hover:glow-primary transition-all duration-300"
              @mouseenter="createParticleEffect($event)"
            >
              <RefreshCw class="w-5 h-5" />
              <span class="font-tech tracking-wider">REFRESH</span>
            </button>
          </div>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="cyber-terminal border-2 border-red-500/50 glow-error p-4 mb-6">
          <div class="flex items-center gap-3">
            <AlertTriangle class="w-5 h-5 text-red-400" />
            <span class="font-tech text-red-400">{{ error }}</span>
          </div>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div class="cyber-card p-6 text-center border border-cyber-primary/30 glow-primary">
            <div class="text-3xl font-cyber text-cyber-primary mb-2">{{ articles.length }}</div>
            <div class="font-tech text-gray-400 text-sm">TOTAL_ARTICLES</div>
          </div>
          <div class="cyber-card p-6 text-center border border-cyber-accent/30 glow-accent">
            <div class="text-3xl font-cyber text-cyber-accent mb-2">{{ publishedArticlesCount }}</div>
            <div class="font-tech text-gray-400 text-sm">PUBLISHED_OPS</div>
          </div>
          <div class="cyber-card p-6 text-center border border-green-500/30 glow-success">
            <div class="text-3xl font-cyber text-green-400 mb-2">{{ featuredArticlesCount }}</div>
                <div class="font-tech text-gray-400 text-sm">FEATURED_CONTENT</div>
          </div>
          <div class="cyber-card p-6 text-center border border-blue-500/30 glow-info">
            <div class="text-3xl font-cyber text-blue-400 mb-2">{{ totalViews }}</div>
            <div class="font-tech text-gray-400 text-sm">TOTAL_VIEWS</div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20">
          <div class="inline-flex items-center gap-3">
            <div class="w-4 h-4 bg-cyber-primary rounded-full animate-pulse"></div>
            <div class="w-4 h-4 bg-cyber-accent rounded-full animate-pulse"></div>
            <div class="w-4 h-4 bg-cyber-primary rounded-full animate-pulse"></div>
          </div>
          <p class="font-tech text-cyber-primary mt-4">LOADING_CONTENT_MATRIX...</p>
        </div>

        <!-- Articles Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div
            v-for="article in filteredArticles"
            :key="article._id"
            class="cyber-terminal group cursor-pointer relative overflow-hidden border-2 border-cyber-border hover:border-cyber-primary hover:glow-primary transition-all duration-500"
            @click="initiateArticleEdit(article)"
            @mouseenter="activateArticleCard($event)"
          >
            <!-- Terminal Header -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary to-cyber-accent"></div>
            
            <!-- Article Visual -->
            <div class="p-6">
              <div class="w-full h-40 bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 rounded-xl flex items-center justify-center mb-6 border border-cyber-primary/20 relative overflow-hidden">
                <!-- Image Preview -->
                <img 
                  v-if="article.featured_image" 
                  :src="article.featured_image" 
                  :alt="article.title"
                  class="w-full h-full object-cover"
                />
                <div v-else class="text-5xl">{{ getArticleEmoji(article.category) }}</div>
                
                <!-- Read Time Badge -->
                <div class="absolute bottom-3 right-3 px-3 py-1 bg-cyber-dark/80 border border-cyber-primary/30 text-cyber-primary rounded-lg text-xs font-tech">
                  {{ article.read_time }}MIN_READ
                </div>
              </div>

              <!-- Article Header -->
              <div class="flex items-start justify-between mb-4">
                <h3 class="font-cyber text-cyber-primary text-xl flex-1 pr-4">{{ article.title }}</h3>
                <span :class="statusBadgeClasses(article.status)">
                  {{ formatStatus(article.status) }}
                </span>
              </div>

              <!-- Excerpt -->
              <p class="text-gray-300 font-tech text-sm mb-6 leading-relaxed line-clamp-3">
                {{ article.excerpt }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tag in article.tags.slice(0, 4)"
                  :key="tag"
                  class="px-3 py-1 bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary rounded-lg text-xs font-mono"
                >
                  {{ tag }}
                </span>
                <span 
                  v-if="article.tags.length > 4"
                  class="px-3 py-1 bg-cyber-secondary/10 border border-cyber-secondary/30 text-cyber-secondary rounded-lg text-xs font-mono"
                >
                  +{{ article.tags.length - 4 }}
                </span>
              </div>

              <!-- Article Meta -->
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-4">
                  <span class="flex items-center gap-1 text-gray-400">
                    <Eye class="w-4 h-4" />
                    {{ article.views }}
                  </span>
                  <span class="flex items-center gap-1 text-gray-400">
                    <Heart class="w-4 h-4" />
                    {{ article.likes }}
                  </span>
                </div>
                <span class="text-cyber-accent font-mono text-xs">{{ formatCategory(article.category) }}</span>
              </div>
            </div>

            <!-- Hover Actions -->
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
              <div class="flex gap-2">
                <button
                  @click.stop="toggleFeaturedArticle(article)"
                  :class="[
                    'p-2 rounded-xl border-2 transition-all duration-300',
                    article.featured 
                      ? 'border-cyber-accent bg-cyber-accent/20 text-cyber-accent glow-accent' 
                      : 'border-cyber-border text-gray-400 hover:border-cyber-accent hover:glow-accent'
                  ]"
                  @mouseenter="createParticleEffect($event)"
                >
                  <Star class="w-4 h-4" />
                </button>
                <button
                  @click.stop="initiateArticleDeletion(article)"
                  class="p-2 rounded-xl border-2 border-cyber-border text-gray-400 hover:border-red-500 hover:text-red-400 hover:glow-error transition-all duration-300"
                  @mouseenter="createParticleEffect($event)"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[10px] group-hover:translate-y-0">
              <div class="flex gap-3">
                <button
                  @click.stop="previewArticle(article)"
                  class="flex-1 text-center py-2 bg-cyber-primary/10 border-2 border-cyber-primary text-cyber-primary rounded-xl text-sm font-tech hover:bg-cyber-primary/20 hover:glow-primary transition-all duration-300"
                >
                  PREVIEW
                </button>
                <button
                  @click.stop="duplicateArticle(article)"
                  class="flex-1 text-center py-2 bg-cyber-accent/10 border-2 border-cyber-accent text-cyber-accent rounded-xl text-sm font-tech hover:bg-cyber-accent/20 hover:glow-accent transition-all duration-300"
                >
                  DUPLICATE
                </button>
              </div>
            </div>

            <!-- Animated Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary/0 via-cyber-primary/5 to-cyber-primary/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loading && filteredArticles.length === 0" class="text-center py-20">
          <FileText class="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 class="font-cyber text-gray-400 text-2xl mb-3">NO_ARTICLES_DETECTED</h3>
          <p class="text-gray-500 font-tech text-lg mb-6">NO_CONTENT_MATCHES_CURRENT_PARAMETERS_OR_SYSTEM_IS_IDLE</p>
          <button
            @click="initiateArticleCreation"
            class="cyber-button-enhanced flex items-center gap-3 px-8 py-4 mx-auto glow-primary hover:glow-accent transition-all duration-300"
            @mouseenter="createQuantumEffect($event)"
          >
            <Plus class="w-6 h-6" />
            <span class="font-tech tracking-wider text-lg">INITIATE_FIRST_ARTICLE</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Article Modal -->
    <div v-if="showAddArticle" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-terminal p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-cyber-primary/30 glow-primary">
        <!-- Terminal Header -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-accent to-cyber-primary"></div>
        
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-cyber-primary rounded-full animate-pulse"></div>
            <h3 class="text-2xl font-cyber text-cyber-primary">
              {{ editingArticle ? 'EDIT_ARTICLE_PARAMETERS' : 'INITIATE_NEW_ARTICLE' }}
            </h3>
          </div>
          <button 
            @click="closeModal" 
            class="text-gray-400 hover:text-cyber-primary transition-colors duration-300"
            @mouseenter="createParticleEffect($event)"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="executeArticleSave" class="space-y-8">
          <!-- Basic Article Info -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="form-group">
              <label class="block font-tech text-white mb-3 text-sm tracking-wider">ARTICLE_TITLE *</label>
              <div class="relative">
                <input
                  v-model="articleForm.title"
                  type="text"
                  required
                  placeholder="ENTER_ARTICLE_HEADLINE"
                  class="cyber-input-enhanced w-full pl-10"
                />
                <Edit3 class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div class="form-group">
              <label class="block font-tech text-white mb-3 text-sm tracking-wider">CONTENT_CATEGORY *</label>
              <div class="relative">
                <select v-model="articleForm.category" required class="cyber-input-enhanced w-full appearance-none pl-10">
                  <option value="technology">TECHNOLOGY</option>
                  <option value="security">SECURITY</option>
                  <option value="web_development">WEB_DEVELOPMENT</option>
                  <option value="cyber_security">CYBER_SECURITY</option>
                  <option value="programming">PROGRAMMING</option>
                  <option value="tutorial">TUTORIAL</option>
                  <option value="news">NEWS</option>
                </select>
                <Folder class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>

          <!-- Featured Image Upload -->
          <div class="form-group">
            <label class="block font-tech text-white mb-3 text-sm tracking-wider">FEATURED_IMAGE</label>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="relative">
                <input
                  type="file"
                  accept="image/*"
                  @change="handleFeaturedImageChange"
                  class="cyber-input-enhanced w-full"
                />
              </div>
              <div v-if="articleForm.featured_image_preview" class="w-full h-32 bg-cyber-dark/50 rounded-xl border border-cyber-border overflow-hidden">
                <img 
                  :src="articleForm.featured_image_preview" 
                  :alt="articleForm.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <!-- Current Image Display for Edit -->
            <div v-if="editingArticle && editingArticle.featured_image && !articleForm.featured_image_file" class="mt-4">
              <div class="w-full h-32 bg-cyber-dark/50 rounded-xl border border-cyber-border overflow-hidden">
                <img 
                  :src="editingArticle.featured_image" 
                  :alt="articleForm.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex justify-between items-center mt-2">
                <span class="text-cyber-primary font-tech text-sm">
                  CURRENT_FEATURED_IMAGE
                </span>
                <button
                  type="button"
                  @click="clearFeaturedMedia"
                  class="text-red-400 hover:text-red-300 font-tech text-sm transition-colors"
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>

          <!-- Article Briefings -->
          <div class="form-group">
            <label class="block font-tech text-white mb-3 text-sm tracking-wider">ARTICLE_EXCERPT *</label>
            <div class="relative">
              <input
                v-model="articleForm.excerpt"
                type="text"
                required
                placeholder="ENTER_ARTICLE_SUMMARY"
                class="cyber-input-enhanced w-full pl-10"
              />
              <MessageSquare class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div class="form-group">
            <label class="block font-tech text-white mb-3 text-sm tracking-wider">FULL_CONTENT *</label>
            <div class="relative">
              <textarea
                v-model="articleForm.content"
                required
                rows="8"
                placeholder="DETAILED_ARTICLE_CONTENT_AND_ANALYSIS..."
                class="cyber-input-enhanced w-full resize-none pl-10 pt-3"
              ></textarea>
              <FileText class="w-4 h-4 text-cyber-primary absolute left-3 top-3" />
            </div>
          </div>

          <!-- Content Tags -->
          <div class="form-group">
            <label class="block font-tech text-white mb-3 text-sm tracking-wider">CONTENT_TAGS</label>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in articleForm.tags"
                :key="tag"
                class="flex items-center gap-2 px-4 py-2 bg-cyber-primary/20 border border-cyber-primary/30 text-cyber-primary rounded-xl text-sm font-mono"
              >
                {{ tag }}
                <button
                  type="button"
                  @click="removeTag(tag)"
                  class="hover:text-cyber-secondary transition-colors"
                  @mouseenter="createParticleEffect($event)"
                >
                  <X class="w-3 h-3" />
                </button>
              </span>
            </div>
            <div class="flex gap-3">
              <div class="relative flex-1">
                <input
                  v-model="newTag"
                  type="text"
                  placeholder="ADD_TAG..."
                  class="cyber-input-enhanced w-full pl-10"
                  @keydown.enter.prevent="addTag"
                />
                <Hash class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <button
                type="button"
                @click="addTag"
                class="cyber-button-enhanced px-6"
                @mouseenter="createParticleEffect($event)"
              >
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Content Configuration -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="form-group">
              <label class="block font-tech text-white mb-3 text-sm tracking-wider">READ_TIME_MINUTES *</label>
              <div class="relative">
                <input
                  v-model.number="articleForm.read_time"
                  type="number"
                  min="1"
                  required
                  class="cyber-input-enhanced w-full pl-10"
                />
                <Clock class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div class="form-group">
              <label class="block font-tech text-white mb-3 text-sm tracking-wider">CONTENT_STATUS *</label>
              <div class="relative">
                <select v-model="articleForm.status" required class="cyber-input-enhanced w-full appearance-none pl-10">
                  <option value="draft">DRAFT_MODE</option>
                  <option value="published">PUBLISHED</option>
                </select>
                <Activity class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>

          <!-- Article Priority -->
          <div class="flex items-center p-4 bg-cyber-dark/50 rounded-xl border border-cyber-accent/30">
            <input
              id="featured"
              v-model="articleForm.featured"
              type="checkbox"
              class="cyber-checkbox-enhanced"
            />
            <label for="featured" class="font-tech text-cyber-accent text-sm ml-3 tracking-wider">
              FEATURED_CONTENT_FLAG
            </label>
          </div>

          <!-- SEO Fields -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="form-group">
              <label class="block font-tech text-white mb-3 text-sm tracking-wider">META_TITLE</label>
              <div class="relative">
                <input
                  v-model="articleForm.meta_title"
                  type="text"
                  placeholder="SEO_TITLE"
                  class="cyber-input-enhanced w-full pl-10"
                />
                <Search class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div class="form-group">
              <label class="block font-tech text-white mb-3 text-sm tracking-wider">META_DESCRIPTION</label>
              <div class="relative">
                <input
                  v-model="articleForm.meta_description"
                  type="text"
                  placeholder="SEO_DESCRIPTION"
                  class="cyber-input-enhanced w-full pl-10"
                />
                <FileText class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>

          <!-- Action Protocol -->
          <div class="flex gap-4 pt-8 border-t border-cyber-border/50">
            <button
              type="button"
              @click="closeModal"
              class="cyber-button-enhanced flex-1 border-cyber-border text-gray-400 hover:border-cyber-secondary hover:text-cyber-secondary hover:glow-secondary transition-all duration-300"
              @mouseenter="createParticleEffect($event)"
            >
              ABORT_OPERATION
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="cyber-button-enhanced flex-1 bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-primary bg-size-200 hover:bg-pos-0 text-cyber-darker font-bold tracking-wider transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              @mouseenter="createQuantumEffect($event)"
            >
              <span v-if="saving" class="flex items-center gap-2">
                <div class="w-4 h-4 border-2 border-cyber-darker border-t-transparent rounded-full animate-spin"></div>
                PROCESSING...
              </span>
              <span v-else>{{ editingArticle ? 'UPDATE_CONTENT' : 'PUBLISH_CONTENT' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deletingArticle" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-terminal p-8 max-w-md w-full border-2 border-red-500/50 glow-error">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400"></div>
        
        <div class="text-center mb-6">
          <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 class="font-cyber text-red-400 text-2xl mb-2">CONFIRM_TERMINATION</h3>
          <p class="text-gray-300 font-tech">
            TERMINATE article "{{ deletingArticle.title }}"?
          </p>
          <p class="text-red-400 text-sm font-mono mt-2">
            THIS_ACTION_CANNOT_BE_REVERSED
          </p>
        </div>

        <div class="flex gap-4">
          <button
            @click="cancelDeletion"
            class="cyber-button-enhanced flex-1 border-cyber-border text-gray-400 hover:border-cyber-primary hover:text-cyber-primary transition-all duration-300"
          >
            ABORT_TERMINATION
          </button>
          <button
            @click="executeArticleDeletion"
            class="cyber-button-enhanced flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:glow-error transition-all duration-300"
          >
            CONFIRM_TERMINATE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import AdminNavbar from '../../components/Admin/AdminNavbar.vue'
import { useAnimations } from '../../composables/useAnimations'
import { 
  Plus, 
  X, 
  Star, 
  Trash2, 
  FileText,
  Settings,
  Edit3,
  Folder,
  MessageSquare,
  Hash,
  Clock,
  Activity,
  Eye,
  Heart,
  AlertTriangle,
  RefreshCw,
  Search
} from 'lucide-vue-next'

// Initialize animations
const { createParticleEffect, createQuantumEffect } = useAnimations()

// API Configuration - MATCHING YOUR BACKEND
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_ENDPOINTS = {
  BLOG_POSTS: `${API_BASE_URL}/api/v1/blog/posts`,
  BLOG_STATS: `${API_BASE_URL}/api/v1/blog/stats`,
  BLOG_CATEGORIES: `${API_BASE_URL}/api/v1/blog/categories`
}

// Reactive state
const articles = ref([])
const showAddArticle = ref(false)
const editingArticle = ref(null)
const deletingArticle = ref(null)
const categoryFilter = ref('all')
const newTag = ref('')
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const totalViews = ref(0)

// Article form data - MATCHING BACKEND EXPECTATIONS
const articleForm = reactive({
  title: '',
  category: 'technology', // Changed from 'security' to 'technology'
  excerpt: '',
  content: '',
  tags: [],
  featured_image_file: null, // File object for new uploads
  featured_image_preview: null, // Preview URL
  read_time: 5,
  status: 'draft',
  featured: false,
  meta_title: '',
  meta_description: ''
})

// Computed properties
const filteredArticles = computed(() => {
  if (categoryFilter.value === 'all') return articles.value
  return articles.value.filter(article => article.category === categoryFilter.value)
})

const publishedArticlesCount = computed(() => {
  return articles.value.filter(a => a.status === 'published').length
})

const featuredArticlesCount = computed(() => {
  return articles.value.filter(a => a.featured).length
})

// API Methods - UPDATED TO MATCH BACKEND
const fetchArticles = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(API_ENDPOINTS.BLOG_POSTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    articles.value = Array.isArray(result.items) ? result.items : []
    
  } catch (err) {
    console.error('Failed to fetch articles:', err)
    error.value = 'Failed to load articles from server'
  } finally {
    loading.value = false
  }
}

const fetchStats = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.BLOG_STATS)
    if (response.ok) {
      const stats = await response.json()
      totalViews.value = stats.total_views || 0
    }
  } catch (err) {
    console.error('Failed to fetch stats:', err)
  }
}

const createArticle = async (articleData) => {
  saving.value = true
  try {
    const formData = new FormData()
    
    // REQUIRED FIELDS - exactly matching backend
    formData.append('title', articleData.title)
    formData.append('excerpt', articleData.excerpt)
    formData.append('content', articleData.content)
    formData.append('category', articleData.category)
    formData.append('tags', articleData.tags.join(',')) // Backend expects comma-separated string
    formData.append('featured', articleData.featured.toString())
    formData.append('read_time', articleData.read_time.toString())
    
    // OPTIONAL FIELDS
    if (articleData.featured_image_file) {
      formData.append('featured_image', articleData.featured_image_file)
    }
    if (articleData.meta_title) {
      formData.append('meta_title', articleData.meta_title)
    }
    if (articleData.meta_description) {
      formData.append('meta_description', articleData.meta_description)
    }

    console.log('Sending form data with fields:')
    for (let [key, value] of formData.entries()) {
      console.log(key, value)
    }

    const response = await fetch(API_ENDPOINTS.BLOG_POSTS, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
      console.error('Backend error:', errorData)
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result.data
    
  } catch (err) {
    console.error('Failed to create article:', err)
    throw err
  } finally {
    saving.value = false
  }
}

const updateArticle = async (articleId, articleData) => {
  saving.value = true
  try {
    const formData = new FormData()
    
    // Only append fields that have values
    if (articleData.title !== undefined) formData.append('title', articleData.title)
    if (articleData.excerpt !== undefined) formData.append('excerpt', articleData.excerpt)
    if (articleData.content !== undefined) formData.append('content', articleData.content)
    if (articleData.category !== undefined) formData.append('category', articleData.category)
    if (articleData.tags !== undefined) formData.append('tags', articleData.tags.join(','))
    if (articleData.featured !== undefined) formData.append('featured', articleData.featured.toString())
    if (articleData.read_time !== undefined) formData.append('read_time', articleData.read_time.toString())
    if (articleData.status !== undefined) formData.append('status', articleData.status)
    if (articleData.meta_title !== undefined) formData.append('meta_title', articleData.meta_title)
    if (articleData.meta_description !== undefined) formData.append('meta_description', articleData.meta_description)
    
    if (articleData.featured_image_file instanceof File) {
      formData.append('featured_image', articleData.featured_image_file)
    }

    const response = await fetch(`${API_ENDPOINTS.BLOG_POSTS}/${articleId}`, {
      method: 'PUT',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
    
  } catch (err) {
    console.error('Failed to update article:', err)
    throw err
  } finally {
    saving.value = false
  }
}

const deleteArticle = async (articleId) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.BLOG_POSTS}/${articleId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
    
  } catch (err) {
    console.error('Failed to delete article:', err)
    throw err
  }
}

// Component Methods
const initiateArticleCreation = () => {
  editingArticle.value = null
  resetArticleForm()
  showAddArticle.value = true
  createQuantumEffect()
}

const initiateArticleEdit = (article) => {
  editingArticle.value = article
  // Convert backend data to form format
  Object.assign(articleForm, {
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    content: article.content,
    tags: Array.isArray(article.tags) ? article.tags : [],
    featured_image_file: null,
    featured_image_preview: null,
    read_time: article.read_time,
    status: article.status,
    featured: article.featured,
    meta_title: article.meta_title || '',
    meta_description: article.meta_description || ''
  })
  showAddArticle.value = true
  createQuantumEffect()
}

const initiateArticleDeletion = (article) => {
  deletingArticle.value = article
  createParticleEffect()
}

const cancelDeletion = () => {
  deletingArticle.value = null
}

const executeArticleDeletion = async () => {
  if (!deletingArticle.value) return
  
  try {
    await deleteArticle(deletingArticle.value._id)
    
    articles.value = articles.value.filter(a => a._id !== deletingArticle.value._id)
    deletingArticle.value = null
    
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, '#00ff88')
  } catch (err) {
    console.error('Failed to delete article:', err)
    error.value = 'Failed to delete article'
    setTimeout(() => { error.value = '' }, 3000)
  }
}

const executeArticleSave = async () => {
  try {
    // Validate required fields
    if (!articleForm.title || !articleForm.excerpt || !articleForm.content || !articleForm.category) {
      error.value = 'Please fill all required fields'
      setTimeout(() => { error.value = '' }, 3000)
      return
    }

    if (editingArticle.value) {
      await updateArticle(editingArticle.value._id, articleForm)
      
      // Update local state
      const index = articles.value.findIndex(a => a._id === editingArticle.value._id)
      if (index !== -1) {
        articles.value[index] = { ...articles.value[index], ...articleForm }
        // Keep the original featured_image if no new file was uploaded
        if (!articleForm.featured_image_file && editingArticle.value.featured_image) {
          articles.value[index].featured_image = editingArticle.value.featured_image
        }
      }
    } else {
      const result = await createArticle(articleForm)
      
      // Add to local state with the new ID
      const newArticle = {
        ...articleForm,
        _id: result.post_id,
        slug: result.slug,
        featured_image: result.featured_image || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        views: 0,
        likes: 0,
        author: "Admin"
      }
      articles.value.unshift(newArticle)
    }
    
    closeModal()
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, '#00ff88')
  } catch (err) {
    console.error('Failed to save article:', err)
    error.value = err.message || 'Failed to save article'
    setTimeout(() => { error.value = '' }, 5000)
  }
}

const handleFeaturedImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    articleForm.featured_image_file = file
    // Create preview URL
    articleForm.featured_image_preview = URL.createObjectURL(file)
  }
}

const clearFeaturedMedia = () => {
  articleForm.featured_image_file = null
  articleForm.featured_image_preview = null
}

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !articleForm.tags.includes(tag)) {
    articleForm.tags.push(tag)
    newTag.value = ''
    createParticleEffect()
  }
}

const removeTag = (tag) => {
  articleForm.tags = articleForm.tags.filter(t => t !== tag)
  createParticleEffect()
}

const closeModal = () => {
  showAddArticle.value = false
  editingArticle.value = null
  resetArticleForm()
}

const resetArticleForm = () => {
  Object.assign(articleForm, {
    title: '',
    category: 'technology', // Changed from 'security' to 'technology'
    excerpt: '',
    content: '',
    tags: [],
    featured_image_file: null,
    featured_image_preview: null,
    read_time: 5,
    status: 'draft',
    featured: false,
    meta_title: '',
    meta_description: ''
  })
  newTag.value = ''
}

const refreshArticles = () => {
  fetchArticles()
  fetchStats()
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00ffff')
}

const toggleFeaturedArticle = async (article) => {
  try {
    const newFeaturedStatus = !article.featured
    await updateArticle(article._id, { featured: newFeaturedStatus })
    
    // Update local state
    article.featured = newFeaturedStatus
    createParticleEffect()
  } catch (err) {
    console.error('Failed to toggle featured:', err)
    error.value = 'Failed to update article'
    setTimeout(() => { error.value = '' }, 3000)
  }
}

const previewArticle = (article) => {
  window.open(`/blog/${article.slug}`, '_blank')
  createParticleEffect()
}

const duplicateArticle = async (article) => {
  try {
    const duplicatedData = {
      title: `${article.title} (Copy)`,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: [...article.tags],
      read_time: article.read_time,
      status: 'draft',
      featured: false,
      meta_title: article.meta_title,
      meta_description: article.meta_description
    }
    
    const result = await createArticle(duplicatedData)
    
    // Add to local state
    const duplicatedArticle = {
      ...duplicatedData,
      _id: result.post_id,
      slug: result.slug,
      featured_image: article.featured_image,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      views: 0,
      likes: 0,
      author: "Admin"
    }
    articles.value.unshift(duplicatedArticle)
    createParticleEffect()
  } catch (err) {
    console.error('Failed to duplicate article:', err)
    error.value = 'Failed to duplicate article'
    setTimeout(() => { error.value = '' }, 3000)
  }
}

const getArticleEmoji = (category) => {
  const emojis = {
    technology: '🔧',
    security: '🛡️',
    web_development: '🌐',
    cyber_security: '🔒',
    programming: '💻',
    tutorial: '📚',
    news: '📰'
  }
  return emojis[category] || '📄'
}

const formatStatus = (status) => {
  const statusMap = {
    draft: 'DRAFT',
    published: 'PUBLISHED'
  }
  return statusMap[status] || status.toUpperCase()
}

const formatCategory = (category) => {
  const categoryMap = {
    technology: 'TECH',
    security: 'SECURITY',
    web_development: 'WEB_DEV',
    cyber_security: 'CYBER_SEC',
    programming: 'PROGRAM',
    tutorial: 'TUTORIAL',
    news: 'NEWS'
  }
  return categoryMap[category] || category.toUpperCase()
}

const statusBadgeClasses = (status) => {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-tech tracking-wider'
  const statusClasses = {
    draft: 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400',
    published: 'bg-green-500/20 border border-green-500/30 text-green-400'
  }
  return `${baseClasses} ${statusClasses[status] || 'bg-gray-500/20 border border-gray-500/30 text-gray-400'}`
}

const activateArticleCard = (event) => {
  createParticleEffect(event)
}

// Animation styles
const hologramStyle = (index) => {
  const size = Math.random() * 80 + 40
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${index * 0.3}s`,
    opacity: Math.random() * 0.2 + 0.1
  }
}

const streamStyle = (index) => {
  return {
    left: `${(index / 6) * 100}%`,
    animationDelay: `${index * 0.5}s`
  }
}

// Initialize
onMounted(() => {
  fetchArticles()
  fetchStats()
})
</script>

<style scoped>
/* Cyberpunk Background */
.admin-bg {
  @apply fixed inset-0 bg-cyber-darker;
  background: radial-gradient(ellipse at center, #0a0a0f 0%, #000000 70%);
}

.cyber-grid {
  @apply absolute inset-0;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridScroll 20s linear infinite;
}

.holographic-elements .hologram {
  @apply absolute rounded-full bg-cyber-primary/10;
  filter: blur(20px);
  animation: float 8s ease-in-out infinite;
}

.data-streams .data-stream {
  @apply absolute w-px h-20 bg-gradient-to-b from-cyber-primary/0 via-cyber-accent to-cyber-primary/0;
  animation: dataFlow 4s linear infinite;
}

/* Enhanced Input Styles */
.cyber-input-enhanced {
  @apply bg-cyber-dark/50 border-2 border-cyber-border rounded-xl px-4 py-3 text-white font-tech transition-all duration-300;
  background: #11111f;
  border: 1px solid #2a2a3a;
  color: #ffffff;
  font-family: 'Rajdhani', sans-serif;
  resize: vertical;
  width: 100%;
}

.cyber-input-enhanced:focus {
  @apply border-cyber-primary glow-primary outline-none;
  border-color: #00f0ff;
  background: #11111f;
  box-shadow: 0 0 0 3px #00f0ff22;
}

.cyber-input-enhanced::placeholder {
  color: #666666;
}

/* Enhanced Button Styles */
.cyber-button-enhanced {
  @apply bg-cyber-dark border-2 border-cyber-primary text-cyber-primary px-6 py-3 rounded-xl font-tech transition-all duration-300 hover:transform hover:scale-105;
}

/* Enhanced Checkbox */
.cyber-checkbox-enhanced {
  @apply w-5 h-5 bg-cyber-dark border-2 border-cyber-accent rounded focus:ring-cyber-accent focus:ring-2;
}

/* Glow Effects */
.glow-primary {
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.3),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
}

.glow-accent {
  box-shadow: 
    0 0 20px rgba(255, 0, 255, 0.3),
    inset 0 0 20px rgba(255, 0, 255, 0.1);
}

.glow-error {
  box-shadow: 
    0 0 20px rgba(255, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 0, 0, 0.1);
}

.glow-success {
  box-shadow: 
    0 0 20px rgba(0, 255, 0, 0.3),
    inset 0 0 20px rgba(0, 255, 0, 0.1);
}

.glow-info {
  box-shadow: 
    0 0 20px rgba(0, 100, 255, 0.3),
    inset 0 0 20px rgba(0, 100, 255, 0.1);
}

/* Quantum Button Animation */
.bg-size-200 {
  background-size: 200% 100%;
}

.hover\:bg-pos-0:hover {
  background-position: 100% 0%;
}

/* Matrix Text Effect */
.matrix-text {
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: matrixShift 3s ease-in-out infinite;
}

/* Animations */
@keyframes gridScroll {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes dataFlow {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}

@keyframes matrixShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Utility Classes */
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

/* Responsive Design */
@media (max-width: 768px) {
  .matrix-text {
    font-size: 3rem;
  }
  
  .cyber-terminal {
    padding: 1.5rem;
  }
}
</style>