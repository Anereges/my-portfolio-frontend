<template>
  <div class="min-h-screen relative">
    <CyberNavbar />
    
    <!-- Blog Post Background -->
    <div class="blog-post-bg">
      <div class="content-stream"></div>
    </div>

    <!-- Reading Progress Bar -->
    <div 
      v-if="!loading && post"
      class="fixed top-0 left-0 w-full h-1 bg-cyber-dark z-50"
    >
      <div 
        class="h-full bg-gradient-to-r from-cyber-primary to-cyber-accent transition-all duration-300"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <div class="relative z-10 pt-28 pb-20 px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Back Button -->
        <button
          @click="$router.push('/blog')"
          class="flex items-center gap-2 text-cyber-primary hover:text-cyber-secondary transition-colors mb-8 group"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span class="font-tech">Back to Blog</span>
        </button>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20">
          <div class="cyber-loader-large mx-auto mb-4"></div>
          <p class="text-cyber-primary font-tech text-lg">Loading article...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="cyber-alert-error mx-auto mb-4 w-16 h-16 border-2 border-cyber-accent rounded-lg flex items-center justify-center">
            <AlertCircle class="w-8 h-8 text-cyber-accent" />
          </div>
          <h2 class="text-2xl font-cyber text-cyber-accent mb-4">Article Not Found</h2>
          <p class="text-gray-400 mb-6">The article you're looking for doesn't exist or may have been moved.</p>
          <button 
            @click="$router.push('/blog')"
            class="cyber-button px-6 py-3"
          >
            Back to Blog
          </button>
        </div>

        <!-- Blog Post Content -->
        <article v-else-if="post" class="cyber-card p-8 relative overflow-hidden">
          <!-- Featured Image -->
          <div 
            v-if="post.featured_image"
            class="w-full h-64 md:h-80 rounded-lg mb-8 overflow-hidden relative"
          >
            <img
              :src="getImageUrl(post.featured_image)"
              :alt="post.title"
              class="w-full h-full object-cover transition-opacity duration-300"
              :class="{'opacity-0': imageLoading}"
              @load="imageLoading = false"
              @error="handleFeaturedImageError"
            />
            <div 
              v-if="imageLoading"
              class="absolute inset-0 bg-cyber-dark flex items-center justify-center"
            >
              <div class="cyber-loader"></div>
            </div>
            <div 
              v-if="!imageLoading && !featuredImageError"
              class="absolute inset-0 bg-gradient-to-t from-cyber-dark/50 to-transparent"
            ></div>
            <!-- Fallback when image fails to load -->
            <div 
              v-if="featuredImageError"
              class="absolute inset-0 bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 flex items-center justify-center"
            >
              <div class="text-center">
                <div class="text-6xl mb-4">{{ getPostEmoji(post.title) }}</div>
                <p class="text-gray-400 font-tech">Featured Image</p>
              </div>
            </div>
          </div>

          <!-- Article Header -->
          <header class="text-center mb-8">
            <!-- Category -->
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-cyber-primary/20 text-cyber-primary rounded-full mb-6">
              <span class="text-lg">{{ getCategoryEmoji(post.category) }}</span>
              <span class="font-tech text-sm">{{ formatCategory(post.category) }}</span>
            </div>

            <!-- Title -->
            <h1 class="text-4xl md:text-5xl font-cyber font-bold mb-6 cyber-text leading-tight">
              {{ post.title }}
            </h1>

            <!-- Excerpt -->
            <p class="text-xl text-gray-300 font-tech mb-8 leading-relaxed max-w-3xl mx-auto">
              {{ post.excerpt }}
            </p>

            <!-- Meta Information -->
            <div class="flex flex-wrap items-center justify-center gap-6 text-gray-400 font-tech">
              <div class="flex items-center gap-2">
                <User class="w-4 h-4" />
                <span>{{ post.author }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Calendar class="w-4 h-4" />
                <span>{{ formatDate(post.created_at) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Clock class="w-4 h-4" />
                <span>{{ post.read_time }} min read</span>
              </div>
              <div class="flex items-center gap-2">
                <Eye class="w-4 h-4" />
                <span>{{ formatViews(post.views) }} views</span>
              </div>
            </div>
          </header>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 justify-center mb-8">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-3 py-1 bg-cyber-primary/10 text-cyber-primary rounded-full text-sm font-tech hover:bg-cyber-primary/20 transition-colors cursor-pointer"
              @click="searchByTag(tag)"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- Article Content -->
          <div class="prose prose-invert prose-cyber max-w-none">
            <div v-html="renderedContent" class="blog-content"></div>
          </div>

          <!-- Like & Share Section -->
          <div class="flex items-center justify-between pt-8 mt-8 border-t border-cyber-border">
            <!-- Like Button -->
            <button
              @click="toggleLike"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300',
                isLiked 
                  ? 'border-cyber-accent bg-cyber-accent/20 text-cyber-accent' 
                  : 'border-cyber-border text-gray-400 hover:border-cyber-accent hover:text-cyber-accent'
              ]"
            >
              <Heart class="w-4 h-4" :class="{'fill-current': isLiked}" />
              <span class="font-tech">{{ formatLikes(post.likes) }}</span>
            </button>

            <!-- Share Buttons -->
            <div class="flex items-center gap-2">
              <button
                v-for="share in shareOptions"
                :key="share.name"
                @click="share.action"
                class="w-10 h-10 rounded-lg border border-cyber-border hover:border-cyber-primary hover:bg-cyber-primary/10 flex items-center justify-center transition-all duration-300"
                :title="`Share on ${share.name}`"
              >
                <component :is="share.icon" class="w-4 h-4 text-gray-400 hover:text-cyber-primary" />
              </button>
            </div>
          </div>
        </article>

        <!-- Related Posts -->
        <section v-if="relatedPosts.length > 0" class="mt-16">
          <h2 class="text-2xl font-cyber text-cyber-primary mb-8">Related Articles</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlogCard
              v-for="relatedPost in relatedPosts"
              :key="relatedPost._id"
              :post="relatedPost"
            />
          </div>
        </section>

        <!-- Comments Section -->
        <section class="mt-16">
          <div class="cyber-card p-8">
            <h2 class="text-2xl font-cyber text-cyber-primary mb-6">Discussion</h2>
            <div class="text-center py-8">
              <MessageCircle class="w-16 h-16 text-cyber-primary/50 mx-auto mb-4" />
              <p class="text-gray-400 mb-4">Comments feature coming soon! 🚀</p>
              <p class="text-sm text-gray-500">We're building an amazing discussion system with real-time updates.</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Scroll to Top Button -->
    <button
      v-if="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 cyber-button p-3 z-40"
    >
      <ArrowUp class="w-5 h-5" />
    </button>

    <!-- Notification Toast -->
    <div
      v-if="toast.show"
      class="fixed top-4 right-4 cyber-card p-4 max-w-sm z-50 animate-fade-in"
    >
      <div class="flex items-center gap-3">
        <component :is="toast.icon" class="w-5 h-5" :class="toast.iconClass" />
        <p class="font-tech text-sm">{{ toast.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { 
  ArrowLeft, 
  ArrowUp, 
  User, 
  Calendar, 
  Clock, 
  Eye, 
  Heart,
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  AlertCircle,
  MessageCircle,
  CheckCircle
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_ENDPOINTS = {
  BLOG_POST: `${API_BASE_URL}/api/v1/blog/posts`,
  BLOG_POSTS: `${API_BASE_URL}/api/v1/blog/posts`
}

// Reactive data
const post = ref(null)
const relatedPosts = ref([])
const loading = ref(true)
const error = ref(false)
const imageLoading = ref(true)
const featuredImageError = ref(false)
const isLiked = ref(false)
const showScrollTop = ref(false)
const scrollProgress = ref(0)

const toast = ref({
  show: false,
  message: '',
  icon: CheckCircle,
  iconClass: 'text-cyber-primary'
})

// Share options
const shareOptions = ref([
  { name: 'Twitter', icon: Twitter, action: shareOnTwitter },
  { name: 'LinkedIn', icon: Linkedin, action: shareOnLinkedIn },
  { name: 'Facebook', icon: Facebook, action: shareOnFacebook },
  { name: 'Copy Link', icon: Link2, action: copyToClipboard }
])

// Computed properties
const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  const rawMarkdown = post.value.content
  
  // Process images in markdown content
  const processedMarkdown = processMarkdownImages(rawMarkdown)
  
  const html = marked(processedMarkdown)
  return DOMPurify.sanitize(html)
})

// Image URL handling
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  
  console.log('Processing image path:', imagePath) // Debug log
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  
  // If it's a relative path starting with /uploads/, prepend the API base URL
  if (imagePath.startsWith('/uploads/')) {
    return `${API_BASE_URL}${imagePath}`
  }
  
  // If it's just a filename, assume it's in uploads/blog_images/
  return `${API_BASE_URL}/uploads/blog_images/${imagePath}`
}

// Process images in markdown content
const processMarkdownImages = (markdown) => {
  // Regex to find markdown image syntax: ![alt](src)
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g
  
  return markdown.replace(imageRegex, (match, alt, src) => {
    const processedSrc = getImageUrl(src)
    console.log(`Processing markdown image: ${src} -> ${processedSrc}`)
    return `![${alt}](${processedSrc})`
  })
}

// Methods
const fetchPost = async () => {
  try {
    loading.value = true
    error.value = false
    featuredImageError.value = false
    
    const identifier = route.params.id || route.params.slug
    console.log('Fetching post with identifier:', identifier)
    
    if (!identifier) {
      throw new Error('No post identifier provided')
    }

    const response = await fetch(`${API_ENDPOINTS.BLOG_POST}/${identifier}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Post not found')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    post.value = await response.json()
    console.log('Post loaded successfully:', post.value)
    
    // Log image details for debugging
    if (post.value.featured_image) {
      console.log('Featured image details:', {
        original: post.value.featured_image,
        processed: getImageUrl(post.value.featured_image)
      })
    }
    
    await fetchRelatedPosts()
    updateMetaTags()
    
  } catch (err) {
    console.error('Error fetching post:', err)
    error.value = true
    showToast('Error loading article', AlertCircle, 'text-cyber-accent')
  } finally {
    loading.value = false
  }
}

const fetchRelatedPosts = async () => {
  try {
    if (!post.value) return
    
    const response = await fetch(`${API_BASE_URL}/api/v1/blog/posts?category=${post.value.category}&size=3`)
    
    if (response.ok) {
      const data = await response.json()
      relatedPosts.value = data.items.filter(p => p._id !== post.value._id).slice(0, 3)
    }
  } catch (err) {
    console.error('Error fetching related posts:', err)
    relatedPosts.value = []
  }
}

const updateMetaTags = () => {
  if (!post.value) return
  
  document.title = `${post.value.title} | CyberBlog`
  
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.name = 'description'
    document.head.appendChild(metaDescription)
  }
  metaDescription.content = post.value.excerpt
  
  updateOGTags()
}

const updateOGTags = () => {
  if (!post.value) return
  
  const ogTags = {
    'og:title': post.value.title,
    'og:description': post.value.excerpt,
    'og:type': 'article',
    'og:url': window.location.href,
  }
  
  if (post.value.featured_image) {
    ogTags['og:image'] = getImageUrl(post.value.featured_image)
  }
  
  Object.entries(ogTags).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('property', property)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  })
}

const getCategoryEmoji = (category) => {
  const emojis = {
    security: '🔒',
    ai: '🤖',
    web_development: '💻',
    cyber_security: '🛡️',
    programming: '👨‍💻',
    tutorial: '📚',
    technology: '⚡',
    news: '📰'
  }
  return emojis[category] || '📄'
}

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

const formatCategory = (category) => {
  return category.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatViews = (views) => {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k'
  }
  return views.toString()
}

const formatLikes = (likes) => {
  if (likes >= 1000) {
    return (likes / 1000).toFixed(1) + 'k'
  }
  return likes.toString()
}

const searchByTag = (tag) => {
  router.push(`/blog?tag=${tag}`)
}

const toggleLike = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (isLiked.value) {
      post.value.likes--
      showToast('Like removed', Heart, 'text-gray-400')
    } else {
      post.value.likes++
      showToast('Post liked!', Heart, 'text-cyber-accent fill-current')
    }
    isLiked.value = !isLiked.value
  } catch (err) {
    showToast('Error updating like', AlertCircle, 'text-cyber-accent')
  }
}

// Image error handling
const handleFeaturedImageError = (event) => {
  console.error('Featured image failed to load:', event.target.src)
  featuredImageError.value = true
  imageLoading.value = false
}

// Share functions
function shareOnTwitter() {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.value.title)}&url=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank')
  showToast('Shared on Twitter!', Twitter, 'text-blue-400')
}

function shareOnLinkedIn() {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank')
  showToast('Shared on LinkedIn!', Linkedin, 'text-blue-600')
}

function shareOnFacebook() {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
  window.open(url, '_blank')
  showToast('Shared on Facebook!', Facebook, 'text-blue-500')
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    showToast('Link copied to clipboard!', CheckCircle, 'text-cyber-primary')
  } catch (err) {
    showToast('Failed to copy link', AlertCircle, 'text-cyber-accent')
  }
}

const showToast = (message, icon, iconClass) => {
  toast.value = {
    show: true,
    message,
    icon,
    iconClass
  }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight - windowHeight
  const scrolled = window.scrollY
  
  scrollProgress.value = (scrolled / documentHeight) * 100
  showScrollTop.value = scrolled > 500
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    router.push('/blog')
  }
  if (e.key === ' ' && !e.target.matches('input, textarea, [contenteditable]')) {
    e.preventDefault()
    window.scrollBy(0, 300)
  }
}

const smoothScroll = (e) => {
  e.preventDefault()
  const targetId = e.target.getAttribute('href')
  if (targetId) {
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}

// Lifecycle
onMounted(() => {
  fetchPost()
  window.addEventListener('scroll', updateScrollProgress)
  document.addEventListener('keydown', handleKeydown)
  
  nextTick(() => {
    const links = document.querySelectorAll('.blog-content a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', smoothScroll)
    })
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.blog-post-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  z-index: 0;
}

.content-stream {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(90deg, transparent 50%, rgba(0, 247, 255, 0.03) 50%) 0 0 / 20px 20px,
    linear-gradient(transparent 50%, rgba(0, 247, 255, 0.03) 50%) 0 0 / 20px 20px;
  animation: stream 20s linear infinite;
}

@keyframes stream {
  0% { transform: translateY(0); }
  100% { transform: translateY(20px); }
}

.cyber-loader-large {
  width: 60px;
  height: 60px;
  border: 3px solid transparent;
  border-top: 3px solid #00f7ff;
  border-right: 3px solid #00f7ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.cyber-loader {
  width: 30px;
  height: 30px;
  border: 2px solid transparent;
  border-top: 2px solid #00f7ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.particles::before {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00f7ff;
  border-radius: 50%;
  animation: particle 0.6s ease-out forwards;
}

@keyframes particle {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx, 0), var(--ty, -20px)) scale(0);
    opacity: 0;
  }
}

/* Enhanced prose styles for markdown content */
:deep(.prose-cyber) {
  color: #e5e7eb;
}

:deep(.prose-cyber h1) {
  color: #00f7ff;
  font-family: 'Orbitron', monospace;
  font-size: 2.5em;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
  border-bottom: 2px solid #00f7ff;
  padding-bottom: 0.5em;
}

:deep(.prose-cyber h2) {
  color: #00f7ff;
  font-family: 'Orbitron', monospace;
  font-size: 2em;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

:deep(.prose-cyber h3) {
  color: #00f7ff;
  font-family: 'Orbitron', monospace;
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

:deep(.prose-cyber p) {
  margin-bottom: 1.5em;
  line-height: 1.8;
  font-size: 1.1em;
}

:deep(.prose-cyber a) {
  color: #00f7ff;
  text-decoration: none;
  border-bottom: 1px solid #00f7ff;
  transition: all 0.3s ease;
}

:deep(.prose-cyber a:hover) {
  color: #00c4cc;
  border-bottom-color: #00c4cc;
  background: rgba(0, 247, 255, 0.1);
}

:deep(.prose-cyber code) {
  background: rgba(0, 247, 255, 0.1);
  color: #00f7ff;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
}

:deep(.prose-cyber pre) {
  background: #1a1a2e;
  border: 1px solid #00f7ff;
  border-radius: 8px;
  padding: 1.5em;
  overflow-x: auto;
  margin: 1.5em 0;
}

:deep(.prose-cyber pre code) {
  background: none;
  color: #e5e7eb;
  padding: 0;
}

:deep(.prose-cyber blockquote) {
  border-left: 4px solid #00f7ff;
  background: rgba(0, 247, 255, 0.05);
  padding: 1em 1.5em;
  margin: 1.5em 0;
  font-style: italic;
}

:deep(.prose-cyber ul), 
:deep(.prose-cyber ol) {
  margin: 1.5em 0;
  padding-left: 1.5em;
}

:deep(.prose-cyber li) {
  margin-bottom: 0.5em;
  line-height: 1.6;
}

:deep(.prose-cyber img) {
  border-radius: 8px;
  margin: 2em 0;
  box-shadow: 0 4px 20px rgba(0, 247, 255, 0.2);
}
</style>