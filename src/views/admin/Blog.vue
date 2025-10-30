<template>
  <div class="min-h-screen relative overflow-hidden">
    <CyberNavbar />
    
    <!-- Cybernetic Background -->
    <div class="cybernetic-bg">
      <div class="cyber-grid"></div>
      <div class="data-streams">
        <div v-for="stream in 6" :key="stream" class="data-stream" :style="streamStyle(stream)"></div>
      </div>
      <div class="holographic-elements">
        <div v-for="i in 10" :key="i" class="hologram" :style="hologramStyle(i)"></div>
      </div>
    </div>

    <div class="relative z-10 pt-32 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Header Section -->
        <header class="text-center mb-16">
          <div class="inline-flex items-center gap-3 bg-cyber-card/60 border border-cyber-primary/40 rounded-full px-6 py-3 mb-6 backdrop-blur-sm glow-primary">
            <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
            <span class="font-cyber text-cyber-primary text-sm tracking-wider">DIGITAL_CHRONICLES</span>
            <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
          </div>
          
          <h1 class="text-6xl md:text-8xl font-cyber font-bold mb-6 matrix-text">
            CYBER_BLOG
          </h1>
          <p class="text-xl text-gray-300 font-tech max-w-3xl mx-auto leading-relaxed">
            EXPLORING THE <span class="text-cyber-primary">FRONTIERS_OF_TECHNOLOGY</span> AND 
            <span class="text-cyber-accent">DIGITAL_INNOVATION</span>
          </p>
        </header>

        <!-- Admin Controls -->
        <div v-if="isAdmin" class="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <button
              @click="initiateArticleCreation"
              class="cyber-button-enhanced flex items-center gap-3 px-6 py-3 glow-primary hover:glow-accent transition-all duration-300"
              @mouseenter="createQuantumEffect($event)"
            >
              <Plus class="w-5 h-5" />
              <span class="font-tech tracking-wider">NEW_ARTICLE</span>
            </button>
            
            <!-- Bulk Actions -->
            <div v-if="selectedPosts.length > 0" class="flex items-center gap-3">
              <span class="text-cyber-primary font-tech text-sm tracking-wider">
                {{ selectedPosts.length }} SELECTED
              </span>
              <button
                @click="initiateBulkDeletion"
                class="px-4 py-2 border-2 border-cyber-accent text-cyber-accent rounded-xl hover:bg-cyber-accent/10 transition-all duration-300 font-tech text-sm hover:glow-accent"
                @mouseenter="createParticleEffect($event)"
              >
                DELETE_SELECTED
              </button>
            </div>
          </div>

          <!-- View Toggle -->
          <div class="flex items-center gap-1 bg-cyber-dark border-2 border-cyber-border rounded-xl p-1">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'p-2 rounded-lg transition-all duration-300',
                viewMode === 'grid' 
                  ? 'bg-cyber-primary text-cyber-dark glow-primary' 
                  : 'text-gray-400 hover:text-cyber-primary hover:glow-primary'
              ]"
              @mouseenter="createParticleEffect($event)"
            >
              <Grid class="w-4 h-4" />
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-lg transition-all duration-300',
                viewMode === 'list' 
                  ? 'bg-cyber-primary text-cyber-dark glow-primary' 
                  : 'text-gray-400 hover:text-cyber-primary hover:glow-primary'
              ]"
              @mouseenter="createParticleEffect($event)"
            >
              <List class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Search and Filters -->
        <div class="cyber-terminal p-6 mb-8 border-2 border-cyber-primary/30 glow-primary">
          <div class="flex flex-col md:flex-row gap-6 items-center justify-between">
            <!-- Search Bar -->
            <div class="flex-1 w-full md:w-auto">
              <div class="relative">
                <Search class="w-5 h-5 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="SEARCH_ARTICLES..."
                  class="cyber-input-enhanced w-full pl-10 pr-4"
                />
              </div>
            </div>

            <!-- Category Filter -->
            <div class="relative">
              <select
                v-model="selectedCategory"
                class="cyber-input-enhanced appearance-none pl-10 pr-8"
              >
                <option value="">ALL_CATEGORIES</option>
                <option v-for="category in categories" :key="category.value" :value="category.value">
                  {{ category.label }}
                </option>
              </select>
              <Settings class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <!-- Sort Options -->
            <div class="relative">
              <select
                v-model="sortBy"
                class="cyber-input-enhanced appearance-none pl-10 pr-8"
              >
                <option value="newest">NEWEST_FIRST</option>
                <option value="oldest">OLDEST_FIRST</option>
                <option value="popular">MOST_POPULAR</option>
                <option value="likes">MOST_LIKED</option>
              </select>
              <ArrowUpDown class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <!-- Active Filters -->
          <div v-if="activeFilters.length > 0" class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="filter in activeFilters"
              :key="filter.key"
              class="inline-flex items-center gap-2 px-3 py-1 bg-cyber-primary/20 border border-cyber-primary/30 text-cyber-primary rounded-full text-sm font-tech tracking-wider"
            >
              {{ filter.label }}
              <button @click="removeFilter(filter.key)" class="hover:text-cyber-accent transition-colors">
                <X class="w-3 h-3" />
              </button>
            </span>
            <button
              @click="clearFilters"
              class="text-gray-400 hover:text-cyber-primary font-tech text-sm tracking-wider transition-colors"
            >
              CLEAR_ALL
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20">
          <div class="quantum-loader mx-auto mb-4"></div>
          <p class="text-cyber-primary font-tech text-lg tracking-wider">LOADING_ARTICLES...</p>
        </div>

        <!-- Blog Posts Grid/List -->
        <div v-else>
          <!-- Empty State -->
          <div v-if="filteredPosts.length === 0" class="text-center py-20 cyber-terminal border-2 border-cyber-primary/30">
            <div class="w-24 h-24 mx-auto mb-6 bg-cyber-primary/10 rounded-full flex items-center justify-center border border-cyber-primary/20">
              <FileText class="w-10 h-10 text-cyber-primary" />
            </div>
            <h3 class="text-2xl font-cyber text-cyber-primary mb-4 tracking-wider">NO_ARTICLES_DETECTED</h3>
            <p class="text-gray-400 mb-6 font-tech">ADJUST_SEARCH_PARAMETERS_OR_FILTERS</p>
            <button
              v-if="isAdmin"
              @click="initiateArticleCreation"
              class="cyber-button-enhanced px-6 py-3 glow-primary hover:glow-accent transition-all duration-300"
              @mouseenter="createQuantumEffect($event)"
            >
              INITIATE_FIRST_ARTICLE
            </button>
          </div>

          <!-- Grid View -->
          <div v-else-if="viewMode === 'grid'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard
              v-for="post in filteredPosts"
              :key="post._id"
              :post="post"
              :selectable="isAdmin"
              :selected="selectedPosts.includes(post._id)"
              @select="togglePostSelection(post._id)"
              @edit="initiateArticleEdit(post)"
              @delete="initiateArticleDeletion(post)"
            />
          </div>

          <!-- List View -->
          <div v-else class="space-y-6">
            <BlogListItem
              v-for="post in filteredPosts"
              :key="post._id"
              :post="post"
              :selectable="isAdmin"
              :selected="selectedPosts.includes(post._id)"
              @select="togglePostSelection(post._id)"
              @edit="initiateArticleEdit(post)"
              @delete="initiateArticleDeletion(post)"
            />
          </div>

          <!-- Load More -->
          <div v-if="hasMore" class="text-center mt-12">
            <button
              @click="loadMoreArticles"
              :disabled="loadingMore"
              class="cyber-button-enhanced px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed glow-primary hover:glow-accent transition-all duration-300"
              @mouseenter="!loadingMore && createQuantumEffect($event)"
            >
              <span v-if="loadingMore" class="flex items-center gap-2">
                <div class="quantum-loader-small"></div>
                <span class="font-tech tracking-wider">LOADING...</span>
              </span>
              <span v-else class="font-tech tracking-wider">LOAD_MORE_ARTICLES</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Form Modal -->
    <BlogForm
      v-if="showCreateForm || editingPost"
      :post="editingPost"
      :mode="editingPost ? 'edit' : 'create'"
      @save="executeArticleSave"
      @cancel="handleCancelEdit"
    />

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div class="cyber-terminal p-8 max-w-md w-full border-2 border-red-500/50 glow-error">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400"></div>
        
        <div class="text-center mb-6">
          <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 class="font-cyber text-red-400 text-2xl mb-2 tracking-wider">CONFIRM_DELETION</h3>
          <p class="text-gray-300 font-tech mb-2">
            TERMINATE article 
            <span class="text-red-400 font-mono">"{{ postToDelete?.title }}"</span>?
          </p>
          <p class="text-red-400 text-sm font-mono">
            OPERATION_CANNOT_BE_REVERSED
          </p>
        </div>
        <div class="flex gap-4">
          <button
            @click="cancelDeletion"
            class="cyber-button-enhanced flex-1 border-cyber-border text-gray-400 hover:border-cyber-primary hover:text-cyber-primary transition-all duration-300"
          >
            <span class="font-tech tracking-wider">ABORT</span>
          </button>
          <button
            @click="executeArticleDeletion"
            class="cyber-button-enhanced flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:glow-error transition-all duration-300"
          >
            <span class="font-tech tracking-wider">CONFIRM</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Bulk Delete Confirmation -->
    <div
      v-if="showBulkDeleteConfirm"
      class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div class="cyber-terminal p-8 max-w-md w-full border-2 border-red-500/50 glow-error">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400"></div>
        
        <div class="text-center mb-6">
          <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 class="font-cyber text-red-400 text-2xl mb-2 tracking-wider">BULK_TERMINATION</h3>
          <p class="text-gray-300 font-tech mb-2">
            DELETE {{ selectedPosts.length }} SELECTED ARTICLES?
          </p>
          <p class="text-red-400 text-sm font-mono">
            MULTIPLE_OPERATIONS_CANNOT_BE_UNDONE
          </p>
        </div>
        <div class="flex gap-4">
          <button
            @click="cancelBulkDeletion"
            class="cyber-button-enhanced flex-1 border-cyber-border text-gray-400 hover:border-cyber-primary hover:text-cyber-primary transition-all duration-300"
          >
            <span class="font-tech tracking-wider">CANCEL</span>
          </button>
          <button
            @click="executeBulkDeletion"
            class="cyber-button-enhanced flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:glow-error transition-all duration-300"
          >
            <span class="font-tech tracking-wider">DELETE_ALL</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <CyberToast
      :show="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import CyberNavbar from '../components/Layout/CyberNavbar.vue'
import BlogCard from '../components/Blog/BlogCard.vue'
import BlogForm from '../components/Blog/BlogForm.vue'
import CyberToast from '../components/UI/CyberToast.vue'
import { useAnimations } from '../composables/useAnimations'
import { 
  Plus, 
  Search, 
  X, 
  Grid, 
  List, 
  FileText,
  Settings,
  ArrowUpDown,
  AlertTriangle,
  RefreshCw
} from 'lucide-vue-next'

// Initialize animations
const { createParticleEffect, createQuantumEffect } = useAnimations()

const router = useRouter()

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_ENDPOINTS = {
  BLOG_POSTS: `${API_BASE_URL}/api/v1/blog/posts`,
  BLOG_STATS: `${API_BASE_URL}/api/v1/blog/stats`,
  BLOG_CATEGORIES: `${API_BASE_URL}/api/v1/blog/categories`
}

// Reactive data
const posts = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const showCreateForm = ref(false)
const editingPost = ref(null)
const showDeleteConfirm = ref(false)
const showBulkDeleteConfirm = ref(false)
const postToDelete = ref(null)
const selectedPosts = ref([])
const viewMode = ref('grid')
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const hasMore = ref(true)
const blogStats = ref({})

const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

// Categories from backend
const categories = ref([])

// Computed properties
const filteredPosts = computed(() => {
  let filtered = [...posts.value]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      post.author.toLowerCase().includes(query)
    )
  }

  // Category filter
  if (selectedCategory.value) {
    filtered = filtered.filter(post => post.category === selectedCategory.value)
  }

  // Sort
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      break
    case 'popular':
      filtered.sort((a, b) => b.views - a.views)
      break
    case 'likes':
      filtered.sort((a, b) => b.likes - a.likes)
      break
  }

  return filtered
})

const activeFilters = computed(() => {
  const filters = []
  if (searchQuery.value) {
    filters.push({ key: 'search', label: `SEARCH: "${searchQuery.value}"` })
  }
  if (selectedCategory.value) {
    const category = categories.value.find(c => c.value === selectedCategory.value)
    filters.push({ key: 'category', label: `DOMAIN: ${category?.label}` })
  }
  if (sortBy.value !== 'newest') {
    const sortLabels = {
      oldest: 'OLDEST_FIRST',
      popular: 'MOST_POPULAR',
      likes: 'MOST_LIKED'
    }
    filters.push({ key: 'sort', label: `SORT: ${sortLabels[sortBy.value]}` })
  }
  return filters
})

// REAL API METHODS
const fetchPosts = async (page = 1, append = false) => {
  try {
    if (page === 1) {
      loading.value = true
      if (!append) posts.value = []
    } else {
      loadingMore.value = true
    }

    const params = new URLSearchParams({
      page: page.toString(),
      size: '9',
      ...(searchQuery.value && { search: searchQuery.value }),
      ...(selectedCategory.value && { category: selectedCategory.value })
    })

    const response = await fetch(`${API_ENDPOINTS.BLOG_POSTS}?${params}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (append) {
      posts.value = [...posts.value, ...data.items]
    } else {
      posts.value = data.items
    }

    hasMore.value = data.page < data.pages
    currentPage.value = page

  } catch (error) {
    console.error('Error fetching posts:', error)
    showToast('FAILED_TO_LOAD_ARTICLES', 'error')
    
    // Fallback to mock data if API fails
    if (posts.value.length === 0) {
      posts.value = getMockPosts()
    }
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const fetchCategories = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.BLOG_CATEGORIES)
    if (response.ok) {
      const cats = await response.json()
      categories.value = cats.map(cat => ({
        value: cat,
        label: cat.toUpperCase()
      }))
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Default categories
    categories.value = [
      { value: 'security', label: 'SECURITY' },
      { value: 'ai', label: 'AI' },
      { value: 'development', label: 'DEVELOPMENT' },
      { value: 'quantum', label: 'QUANTUM' },
      { value: 'design', label: 'DESIGN' },
      { value: 'tutorial', label: 'TUTORIAL' }
    ]
  }
}

const fetchStats = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.BLOG_STATS)
    if (response.ok) {
      blogStats.value = await response.json()
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

const createPost = async (postData) => {
  try {
    // Use FormData for file uploads
    const formData = new FormData()
    formData.append('title', postData.title)
    formData.append('excerpt', postData.excerpt)
    formData.append('content', postData.content)
    formData.append('category', postData.category)
    formData.append('tags', postData.tags.join(','))
    formData.append('featured', postData.featured.toString())
    formData.append('read_time', postData.read_time.toString())
    
    if (postData.featured_image) {
      formData.append('featured_image', postData.featured_image)
    }
    if (postData.meta_title) {
      formData.append('meta_title', postData.meta_title)
    }
    if (postData.meta_description) {
      formData.append('meta_description', postData.meta_description)
    }

    const response = await fetch(API_ENDPOINTS.BLOG_POSTS, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    showToast('ARTICLE_CREATED_SUCCESSFULLY', 'success')
    
    // Refresh posts
    fetchPosts(1)
    return result
    
  } catch (error) {
    console.error('Error creating post:', error)
    showToast('FAILED_TO_CREATE_ARTICLE', 'error')
    throw error
  }
}

const updatePost = async (postId, postData) => {
  try {
    const formData = new FormData()
    
    // Only append fields that have values
    if (postData.title !== undefined) formData.append('title', postData.title)
    if (postData.excerpt !== undefined) formData.append('excerpt', postData.excerpt)
    if (postData.content !== undefined) formData.append('content', postData.content)
    if (postData.category !== undefined) formData.append('category', postData.category)
    if (postData.tags !== undefined) formData.append('tags', postData.tags.join(','))
    if (postData.featured !== undefined) formData.append('featured', postData.featured.toString())
    if (postData.read_time !== undefined) formData.append('read_time', postData.read_time.toString())
    if (postData.status !== undefined) formData.append('status', postData.status)
    if (postData.meta_title !== undefined) formData.append('meta_title', postData.meta_title)
    if (postData.meta_description !== undefined) formData.append('meta_description', postData.meta_description)
    
    if (postData.featured_image instanceof File) {
      formData.append('featured_image', postData.featured_image)
    }

    const response = await fetch(`${API_ENDPOINTS.BLOG_POSTS}/${postId}`, {
      method: 'PUT',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    showToast('ARTICLE_UPDATED_SUCCESSFULLY', 'success')
    
    // Refresh posts
    fetchPosts(currentPage.value)
    return result
    
  } catch (error) {
    console.error('Error updating post:', error)
    showToast('FAILED_TO_UPDATE_ARTICLE', 'error')
    throw error
  }
}

const deletePost = async (postId) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.BLOG_POSTS}/${postId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    posts.value = posts.value.filter(post => post._id !== postId)
    selectedPosts.value = selectedPosts.value.filter(id => id !== postId)
    
    showToast('ARTICLE_DELETED_SUCCESSFULLY', 'success')
    return result
    
  } catch (error) {
    console.error('Error deleting post:', error)
    showToast('FAILED_TO_DELETE_ARTICLE', 'error')
    throw error
  }
}

// UI Methods
const loadMoreArticles = () => {
  fetchPosts(currentPage.value + 1, true)
}

const initiateArticleCreation = () => {
  editingPost.value = null
  showCreateForm.value = true
  createQuantumEffect()
}

const initiateArticleEdit = (post) => {
  editingPost.value = post
  showCreateForm.value = true
  createQuantumEffect()
}

const initiateArticleDeletion = (post) => {
  postToDelete.value = post
  showDeleteConfirm.value = true
  createParticleEffect()
}

const executeArticleDeletion = async () => {
  if (!postToDelete.value) return
  
  try {
    await deletePost(postToDelete.value._id)
  } catch (error) {
    // Error handled in deletePost
  } finally {
    showDeleteConfirm.value = false
    postToDelete.value = null
  }
}

const executeArticleSave = async (postData) => {
  try {
    if (editingPost.value) {
      await updatePost(editingPost.value._id, postData)
    } else {
      await createPost(postData)
    }
    handleCancelEdit()
  } catch (error) {
    // Error handled in individual methods
  }
}

const cancelDeletion = () => {
  showDeleteConfirm.value = false
  postToDelete.value = null
}

const handleCancelEdit = () => {
  editingPost.value = null
  showCreateForm.value = false
}

const togglePostSelection = (postId) => {
  const index = selectedPosts.value.indexOf(postId)
  if (index > -1) {
    selectedPosts.value.splice(index, 1)
  } else {
    selectedPosts.value.push(postId)
  }
  createParticleEffect()
}

const removeFilter = (filterKey) => {
  switch (filterKey) {
    case 'search':
      searchQuery.value = ''
      break
    case 'category':
      selectedCategory.value = ''
      break
    case 'sort':
      sortBy.value = 'newest'
      break
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  sortBy.value = 'newest'
}

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const refreshPosts = () => {
  fetchPosts(1)
  fetchStats()
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00ffff')
}

// Mock data fallback
const getMockPosts = () => {
  return [
    {
      _id: '1',
      title: 'QUANTUM_ENCRYPTION_THREATS_2024',
      excerpt: 'ANALYZING_QUANTUM_COMPUTING_IMPACT_ON_MODERN_ENCRYPTION_PROTOCOLS_AND_COUNTERMEASURES',
      category: 'security',
      author: 'Admin',
      created_at: '2024-01-15T10:00:00Z',
      read_time: 5,
      views: 1247,
      likes: 42,
      tags: ['QUANTUM', 'ENCRYPTION', 'SECURITY', 'FUTURE'],
      featured_image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      status: 'published',
      featured: true
    }
  ]
}

// Animation styles
const hologramStyle = (index) => {
  const size = Math.random() * 80 + 40
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${index * 0.4}s`,
    opacity: Math.random() * 0.15 + 0.05
  }
}

const streamStyle = (index) => {
  return {
    left: `${(index / 6) * 100}%`,
    animationDelay: `${index * 0.5}s`
  }
}

// Watchers
watch([searchQuery, selectedCategory, sortBy], () => {
  currentPage.value = 1
  fetchPosts(1)
}, { deep: true })

// Lifecycle
onMounted(() => {
  fetchPosts(1)
  fetchCategories()
  fetchStats()
})
</script>

<style scoped>
/* Cyberpunk Background */
.cybernetic-bg {
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
  @apply absolute rounded-full bg-cyber-primary/5;
  filter: blur(15px);
  animation: float 6s ease-in-out infinite;
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

/* Quantum Loader */
.quantum-loader {
  @apply w-12 h-12 border-4 border-cyber-darker border-t-cyber-primary rounded-full;
  animation: spin 1s linear infinite;
}

.quantum-loader-small {
  @apply w-5 h-5 border-2 border-cyber-darker border-t-cyber-primary rounded-full;
  animation: spin 1s linear infinite;
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
  50% { transform: translateY(-15px) rotate(180deg); }
}

@keyframes dataFlow {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}

@keyframes matrixShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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