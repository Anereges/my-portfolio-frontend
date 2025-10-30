<template>
  <div class="min-h-screen relative">
    <CyberNavbar />
    
    <!-- Animated Blog Background -->
    <div class="blog-bg">
      <div class="floating-blog-icons">
        <div v-for="i in 12" :key="i" class="blog-icon" :style="blogIconStyle(i)">
          {{ getRandomBlogIcon() }}
        </div>
      </div>
      <div class="writing-animation"></div>
    </div>

    <div class="relative z-10 pt-28 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Blog Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-full px-6 py-3 mb-6">
            <PenTool class="w-5 h-5 text-cyber-primary" />
            <span class="font-cyber text-cyber-primary text-sm">CYBER_BLOG</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-cyber font-bold mb-6 cyber-text glitch" data-text="TECH_BLOG">
            TECH_BLOG
          </h1>
          <p class="text-xl text-gray-300 font-tech max-w-3xl mx-auto leading-relaxed">
            Exploring the <span class="text-cyber-primary">digital frontier</span> through 
            <span class="text-cyber-accent"> cutting-edge insights</span>, 
            <span class="text-cyber-secondary"> security expertise</span>, and 
            <span class="text-cyber-primary"> development mastery</span>
          </p>

          <!-- Blog Stats -->
          <div class="grid grid-cols-3 gap-6 max-w-md mx-auto mt-8">
            <div class="text-center">
              <div class="text-2xl font-cyber text-cyber-primary">{{ stats.total_posts }}+</div>
              <div class="text-gray-400 text-sm">Articles</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-cyber text-cyber-accent">{{ stats.total_views }}+</div>
              <div class="text-gray-400 text-sm">Views</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-cyber text-cyber-secondary">{{ stats.total_likes }}+</div>
              <div class="text-gray-400 text-sm">Likes</div>
            </div>
          </div>
        </div>

        <!-- Featured Posts -->
        <section v-if="featuredPosts.length > 0" class="mb-20">
          <h2 class="text-3xl font-cyber text-cyber-primary mb-8 text-center">Featured Articles 🌟</h2>
          <div class="grid lg:grid-cols-3 gap-8">
            <BlogCard
              v-for="post in featuredPosts"
              :key="post._id"
              :post="post"
              :featured="true"
              class="featured-post"
            />
          </div>
        </section>

        <!-- Blog Content -->
        <div class="grid lg:grid-cols-4 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-3">
            <!-- Filters & Search -->
            <div class="flex flex-col md:flex-row gap-4 mb-8">
              <div class="flex flex-wrap gap-3 flex-1">
                <button
                  v-for="category in categories"
                  :key="category"
                  @click="setCategoryFilter(category)"
                  :class="[
                    'category-filter group',
                    activeCategory === category ? 'active' : ''
                  ]"
                  @mouseenter="createParticleEffect($event)"
                >
                  <span class="relative z-10">{{ getCategoryEmoji(category) }} {{ formatCategory(category) }}</span>
                </button>
              </div>
              
              <div class="relative">
                <Search class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search articles..."
                  class="cyber-input pl-10 pr-4 w-full md:w-64"
                  @input="handleSearch"
                />
              </div>
            </div>

            <!-- Blog Posts Grid -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <BlogCard
                v-for="post in blogPosts"
                :key="post._id"
                :post="post"
                class="blog-post-entry"
              />
            </div>

            <!-- Loading Animation -->
            <div v-if="loading" class="flex flex-col items-center justify-center py-12">
              <div class="cyber-loader-large mb-4"></div>
              <p class="text-cyber-primary font-tech text-lg">Loading awesome articles...</p>
            </div>

            <!-- No Posts Message -->
            <div v-if="!loading && blogPosts.length === 0" class="text-center py-12">
              <FileText class="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 class="font-cyber text-gray-400 text-xl mb-2">No Articles Found</h3>
              <p class="text-gray-500">Try adjusting your search or filters</p>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center items-center gap-4 mt-8">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="cyber-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              
              <span class="font-tech text-gray-400">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="cyber-button px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <!-- About Blog -->
            <div class="cyber-card p-6">
              <h3 class="font-cyber text-cyber-primary mb-4">About This Blog</h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                Dive into the world of cybersecurity, full-stack development, and cutting-edge technology. 
                Learn, explore, and master the digital realm with expert insights.
              </p>
            </div>

            <!-- Popular Tags -->
            <div class="cyber-card p-6">
              <h3 class="font-cyber text-cyber-primary mb-4">Popular Tags</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in popularTags"
                  :key="tag"
                  class="px-3 py-1 bg-cyber-primary/10 text-cyber-primary rounded-full text-sm font-tech hover:bg-cyber-primary/20 transition-colors cursor-pointer"
                  @click="searchByTag(tag)"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>

            <!-- Newsletter -->
            <div class="cyber-card p-6">
              <h3 class="font-cyber text-cyber-primary mb-4">Stay Updated</h3>
              <p class="text-gray-400 text-sm mb-4">Get the latest articles delivered to your inbox.</p>
              <div class="space-y-3">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  class="cyber-input w-full text-sm"
                />
                <button class="cyber-button w-full text-sm">
                  Subscribe 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Create Button -->
    <button
      v-if="isAdmin"
      @click="$router.push('/admin/blog/new')"
      class="fixed bottom-6 right-6 cyber-button flex items-center gap-2 z-40"
      @mouseenter="createParticleEffect($event)"
    >
      <Plus class="w-5 h-5" />
      New Post
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimations } from '../composables/useAnimations'
import CyberNavbar from '../components/Layout/CyberNavbar.vue'
import BlogCard from '../views/blog/BlogCard.vue'
import { 
  PenTool, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  FileText,
  Plus,
  RefreshCw
} from 'lucide-vue-next'

const router = useRouter()
const { createParticleEffect } = useAnimations()

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_ENDPOINTS = {
  BLOG_POSTS: `${API_BASE_URL}/api/v1/blog/posts`,
  FEATURED_POSTS: `${API_BASE_URL}/api/v1/blog/posts/featured`,
  BLOG_STATS: `${API_BASE_URL}/api/v1/blog/stats`,
  BLOG_CATEGORIES: `${API_BASE_URL}/api/v1/blog/categories`
}

// Reactive state
const blogPosts = ref([])
const featuredPosts = ref([])
const loading = ref(false)
const searchQuery = ref('')
const activeCategory = ref('all')
const currentPage = ref(1)
const itemsPerPage = ref(9)
const categories = ref([])

// Blog data
const stats = ref({
  total_posts: 0,
  total_views: 0,
  total_likes: 0
})

const popularTags = ref(['Vue.js', 'Cybersecurity', 'Python', 'FastAPI', 'Web3', 'Blockchain', 'AI', 'Docker'])

// Check if user is admin
const isAdmin = ref(false)

// API Methods
const fetchBlogPosts = async () => {
  loading.value = true
  try {
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      size: itemsPerPage.value.toString(),
      ...(activeCategory.value !== 'all' && { category: activeCategory.value }),
      ...(searchQuery.value && { search: searchQuery.value })
    })

    const response = await fetch(`${API_ENDPOINTS.BLOG_POSTS}?${params}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    blogPosts.value = data.items
    
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    // Fallback demo data
    blogPosts.value = getDemoPosts()
  } finally {
    loading.value = false
  }
}

const fetchFeaturedPosts = async () => {
  try {
    const response = await fetch(`${API_ENDPOINTS.FEATURED_POSTS}?limit=3`)
    
    if (response.ok) {
      featuredPosts.value = await response.json()
    }
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    featuredPosts.value = getDemoPosts().slice(0, 3)
  }
}

const fetchBlogStats = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.BLOG_STATS)
    if (response.ok) {
      stats.value = await response.json()
    }
  } catch (error) {
    console.error('Error fetching blog stats:', error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.BLOG_CATEGORIES)
    if (response.ok) {
      const cats = await response.json()
      categories.value = ['all', ...cats]
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
    categories.value = ['all', 'security', 'ai', 'development', 'quantum', 'design', 'tutorial']
  }
}

// Blog icon styles
const blogIconStyle = (index) => {
  const icons = ['📝', '🔐', '💻', '🚀', '⚡', '🔍', '🎯', '🛡️', '🌐', '📊', '🔧', '🎨']
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${index * 1.5}s`,
    animationDuration: `${Math.random() * 15 + 10}s`,
    fontSize: `${Math.random() * 20 + 16}px`
  }
}

const getRandomBlogIcon = () => {
  const icons = ['📝', '🔐', '💻', '🚀', '⚡', '🔍', '🎯', '🛡️', '🌐']
  return icons[Math.floor(Math.random() * icons.length)]
}

// Computed properties
const totalPages = computed(() => {
  return Math.ceil(blogPosts.value.length / itemsPerPage.value)
})

const filteredPosts = computed(() => {
  let filtered = blogPosts.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

// Format category name
const formatCategory = (category) => {
  if (category === 'all') return 'All Posts'
  return category.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

// Get category emoji
const getCategoryEmoji = (category) => {
  const emojis = {
    security: '🛡️',
    ai: '🤖',
    development: '💻',
    quantum: '⚛️',
    design: '🎨',
    tutorial: '📚',
    all: '📝'
  }
  return emojis[category] || '📝'
}

// Filter handlers
const setCategoryFilter = (category) => {
  activeCategory.value = category
  currentPage.value = 1
  fetchBlogPosts()
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: 200 })
}

const handleSearch = () => {
  currentPage.value = 1
  fetchBlogPosts()
}

const searchByTag = (tag) => {
  searchQuery.value = tag
  currentPage.value = 1
  fetchBlogPosts()
}

// Pagination
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchBlogPosts()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchBlogPosts()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const refreshBlog = () => {
  fetchBlogPosts()
  fetchFeaturedPosts()
  fetchBlogStats()
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00ffff')
}

// Demo data (fallback)
const getDemoPosts = () => [
  {
    _id: '1',
    title: 'Advanced Cybersecurity Threats in 2024',
    slug: 'advanced-cybersecurity-threats-2024',
    excerpt: 'Exploring the latest cybersecurity threats and how to protect your systems against emerging dangers in the digital landscape.',
    content: 'Full article content here...',
    category: 'security',
    tags: ['Security', 'Threats', 'Protection'],
    featured_image: '/api/placeholder/600/400',
    read_time: 8,
    views: 1247,
    likes: 89,
    featured: true,
    created_at: new Date().toISOString(),
    author: 'Admin'
  },
  {
    _id: '2',
    title: 'Building Scalable APIs with FastAPI',
    slug: 'building-scalable-apis-fastapi',
    excerpt: 'Learn how to build high-performance, scalable APIs using FastAPI and modern Python practices.',
    content: 'Full article content here...',
    category: 'development',
    tags: ['FastAPI', 'Python', 'Backend'],
    featured_image: '/api/placeholder/600/400',
    read_time: 6,
    views: 892,
    likes: 67,
    featured: false,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    author: 'Admin'
  }
]

onMounted(() => {
  fetchBlogPosts()
  fetchFeaturedPosts()
  fetchBlogStats()
  fetchCategories()
  
  // Check admin status
  const token = localStorage.getItem('admin_token')
  isAdmin.value = !!token
})
</script>

<style scoped>
.blog-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background: linear-gradient(135deg, #050508 0%, #0a0a15 50%, #050508 100%);
}

.floating-blog-icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.blog-icon {
  position: absolute;
  opacity: 0.1;
  animation: float-blog 25s ease-in-out infinite;
}

.writing-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(90deg, transparent 99%, #00f0ff05 100%),
    linear-gradient(transparent 99%, #00f0ff05 100%);
  background-size: 40px 40px;
  animation: writing-grid 30s linear infinite;
  opacity: 0.05;
}

.category-filter {
  @apply px-4 py-2 rounded-full border border-cyber-border bg-cyber-card text-gray-300 font-tech transition-all duration-300 relative overflow-hidden;
}

.category-filter:hover {
  @apply border-cyber-primary text-cyber-primary transform -translate-y-1;
}

.category-filter.active {
  @apply border-cyber-primary bg-cyber-primary/10 text-cyber-primary;
}

.blog-post-entry {
  opacity: 0;
  transform: translateY(30px);
  animation: blogEntry 0.6s ease-out forwards;
}

.featured-post {
  animation: featuredEntry 0.8s ease-out forwards;
}

.cyber-loader-large {
  width: 60px;
  height: 60px;
  border: 3px solid #00f0ff33;
  border-top: 3px solid #00f0ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes float-blog {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.1;
  }
  50% { 
    transform: translateY(-30px) rotate(180deg) scale(1.2);
    opacity: 0.05;
  }
}

@keyframes writing-grid {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 40px); }
}

@keyframes blogEntry {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes featuredEntry {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Staggered animations for blog posts */
.blog-post-entry:nth-child(1) { animation-delay: 0.1s; }
.blog-post-entry:nth-child(2) { animation-delay: 0.2s; }
.blog-post-entry:nth-child(3) { animation-delay: 0.3s; }
.blog-post-entry:nth-child(4) { animation-delay: 0.4s; }
.blog-post-entry:nth-child(5) { animation-delay: 0.5s; }
.blog-post-entry:nth-child(6) { animation-delay: 0.6s; }

.featured-post:nth-child(1) { animation-delay: 0.2s; }
.featured-post:nth-child(2) { animation-delay: 0.4s; }
.featured-post:nth-child(3) { animation-delay: 0.6s; }
</style>