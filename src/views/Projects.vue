<template>
  <div class="min-h-screen relative">
    <CyberNavbar />
    
    <!-- Interactive Binary Rain -->
    <div class="binary-rain">
      <div v-for="i in 80" :key="i" class="binary-stream" :style="binaryStreamStyle(i)">
        <div 
          v-for="j in 20" 
          :key="j"
          class="binary-digit"
          :style="{ animationDelay: `${j * 0.1}s` }"
        >
          {{ Math.random() > 0.5 ? '1' : '0' }}
        </div>
      </div>
    </div>

    <!-- Holographic Project Terminal -->
    <div class="hologram-container">
      <div class="hologram-ring ring-1"></div>
      <div class="hologram-ring ring-2"></div>
      <div class="hologram-ring ring-3"></div>
      <div class="hologram-core">
        <div class="text-6xl">🚀</div>
      </div>
    </div>

    <div class="relative z-10 pt-28 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Epic Header -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-full px-6 py-3 mb-6">
            <Rocket class="w-5 h-5 text-cyber-primary" />
            <span class="font-cyber text-cyber-primary text-sm">DIGITAL_ARSENAL_ACTIVE</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-cyber font-bold mb-6 cyber-text glitch" data-text="PROJECTS_">
            PROJECTS_
          </h1>
          <p class="text-xl text-gray-300 font-tech max-w-3xl mx-auto leading-relaxed">
            From <span class="text-cyber-primary">secure enterprise systems</span> to 
            <span class="text-cyber-accent"> cutting-edge web applications</span> - 
            explore my digital creations
          </p>
        </div>

        <!-- Interactive Filter System -->
        <div class="flex flex-wrap justify-center gap-3 mb-16">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="setFilter(category.id)"
            :class="[
              'category-filter group relative overflow-hidden',
              activeFilter === category.id ? 'active' : ''
            ]"
            @mouseenter="createParticleEffect($event)"
          >
            <span class="relative z-10 flex items-center gap-2">
              <span class="text-lg">{{ category.emoji }}</span>
              {{ category.name }}
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary to-cyber-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>

        <!-- Search & Filter Controls -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div class="relative">
            <select 
              v-model="statusFilter" 
              class="cyber-input pl-4 pr-8 appearance-none"
              @mouseenter="createParticleEffect($event)"
            >
              <option value="all">ALL_STATUS</option>
              <option value="planning">PLANNING</option>
              <option value="development">DEVELOPMENT</option>
              <option value="testing">TESTING</option>
              <option value="deployed">DEPLOYED</option>
              <option value="maintenance">MAINTENANCE</option>
            </select>
            <Settings class="w-4 h-4 text-cyber-primary absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
          
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="SEARCH_PROJECTS..."
              class="cyber-input pl-4 pr-10"
              @mouseenter="createParticleEffect($event)"
            />
            <Search class="w-4 h-4 text-cyber-primary absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <button
            @click="resetFilters"
            class="cyber-button flex items-center gap-3 px-6 py-3"
            @mouseenter="createParticleEffect($event)"
          >
            <RefreshCw class="w-5 h-5" />
            <span class="font-tech tracking-wider">RESET_FILTERS</span>
          </button>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div class="cyber-card p-6 text-center group cursor-pointer" @click="createParticleEffect($event)">
            <div class="text-3xl font-cyber text-cyber-primary mb-2">{{ stats.total }}</div>
            <div class="font-tech text-gray-400 text-sm">TOTAL_PROJECTS</div>
          </div>
          <div class="cyber-card p-6 text-center group cursor-pointer" @click="createParticleEffect($event)">
            <div class="text-3xl font-cyber text-cyber-accent mb-2">{{ stats.development }}</div>
            <div class="font-tech text-gray-400 text-sm">IN_DEVELOPMENT</div>
          </div>
          <div class="cyber-card p-6 text-center group cursor-pointer" @click="createParticleEffect($event)">
            <div class="text-3xl font-cyber text-green-400 mb-2">{{ stats.deployed }}</div>
            <div class="font-tech text-gray-400 text-sm">DEPLOYED_OPS</div>
          </div>
          <div class="cyber-card p-6 text-center group cursor-pointer" @click="createParticleEffect($event)">
            <div class="text-3xl font-cyber text-blue-400 mb-2">{{ stats.featured }}</div>
            <div class="font-tech text-gray-400 text-sm">FEATURED</div>
          </div>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="cyber-status error mb-6">
          <div class="flex items-center gap-3">
            <AlertCircle class="w-5 h-5 text-red-400" />
            <span class="font-tech text-red-400">{{ error }}</span>
          </div>
        </div>

        <!-- Loading Animation -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
          <div class="cyber-status transmitting mb-6">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 bg-cyber-primary rounded-full animate-pulse"></div>
              <span class="font-cyber text-cyber-primary">LOADING_PROJECT_DATABASE...</span>
            </div>
          </div>
          <p class="text-gray-400 text-sm mt-2">Synchronizing with backend systems</p>
        </div>

        <!-- Projects Grid -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" ref="projectsGrid">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project._id"
            class="cyber-card p-6 group cursor-pointer relative overflow-hidden project-card-entry"
            @click="viewProject(project)"
            @mouseenter="activateProjectCard($event)"
            :data-index="index"
          >
            <!-- Animated Border -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary to-cyber-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute inset-[2px] bg-cyber-darker rounded-xl"></div>
            
            <div class="relative z-10">
              <!-- Featured Badge -->
              <div v-if="project.featured" class="absolute top-4 right-4 z-20">
                <div class="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-full text-xs font-tech">
                  <Star class="w-3 h-3 fill-current" />
                  FEATURED
                </div>
              </div>

              <!-- Project Meta -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">{{ getProjectIcon(project.category) }}</span>
                  <div class="flex flex-col">
                    <span :class="statusBadgeClasses(project.status)">
                      {{ formatStatus(project.status) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Project Title & Description -->
              <h3 class="font-cyber text-cyber-primary text-xl mb-3 group-hover:text-cyber-accent transition-colors duration-300">
                {{ project.title }}
              </h3>
              <p class="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                {{ project.description }}
              </p>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies.slice(0, 3)"
                  :key="tech"
                  class="px-2 py-1 bg-cyber-primary/20 border border-cyber-primary/30 text-cyber-primary rounded text-xs font-tech"
                >
                  {{ tech }}
                </span>
                <span 
                  v-if="project.technologies.length > 3"
                  class="px-2 py-1 bg-cyber-border text-gray-400 rounded text-xs"
                >
                  +{{ project.technologies.length - 3 }}
                </span>
              </div>

              <!-- Project Links -->
              <div class="flex items-center justify-between pt-4 border-t border-cyber-card/50">
                <div class="flex gap-3">
                  <a
                    v-if="project.github_url"
                    :href="project.github_url"
                    target="_blank"
                    class="cyber-social-btn"
                    @click.stop
                  >
                    <Github class="w-4 h-4" />
                    <span class="cyber-tooltip">View Code</span>
                  </a>
                  <a
                    v-if="project.live_url"
                    :href="project.live_url"
                    target="_blank"
                    class="cyber-social-btn"
                    @click.stop
                  >
                    <ExternalLink class="w-4 h-4" />
                    <span class="cyber-tooltip">Live Demo</span>
                  </a>
                  <a
                    v-if="project.demo_url"
                    :href="project.demo_url"
                    target="_blank"
                    class="cyber-social-btn"
                    @click.stop
                  >
                    <Play class="w-4 h-4" />
                    <span class="cyber-tooltip">Demo</span>
                  </a>
                </div>
                <div class="text-gray-500 text-xs font-tech">
                  {{ formatDate(project.created_at) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Projects -->
        <div v-if="!loading && filteredProjects.length === 0" class="text-center py-20">
          <div class="w-32 h-32 mx-auto mb-6 relative">
            <div class="absolute inset-0 bg-cyber-primary/20 rounded-full animate-ping"></div>
            <div class="absolute inset-4 bg-cyber-card rounded-full flex items-center justify-center">
              <FolderOpen class="w-12 h-12 text-cyber-primary" />
            </div>
          </div>
          <h3 class="text-2xl font-cyber text-cyber-primary mb-4">NO_PROJECTS_DETECTED</h3>
          <p class="text-gray-400 mb-6">Try selecting a different category or check back later for new additions</p>
          <button 
            @click="resetFilters"
            class="cyber-button flex items-center gap-3 px-8 py-4 mx-auto"
          >
            <RefreshCw class="w-6 h-6" />
            <span class="font-tech tracking-wider text-lg">RESET_FILTERS</span>
          </button>
        </div>

        <!-- Project Counter -->
        <div class="fixed bottom-6 right-6 cyber-card p-4 text-center backdrop-blur-lg group cursor-pointer" @click="createParticleEffect($event)">
          <div class="text-cyber-primary font-cyber text-2xl mb-1">{{ filteredProjects.length }}</div>
          <div class="text-gray-400 text-sm font-tech">ACTIVE_PROJECTS</div>
          <div class="w-full bg-cyber-border h-1 mt-2 rounded-full overflow-hidden">
            <div class="h-full bg-cyber-primary transition-all duration-1000" :style="{ width: `${(filteredProjects.length / projects.length) * 100}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Detail Modal -->
    <div v-if="selectedProject" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-card p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <!-- Animated Border -->
        <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary to-cyber-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="absolute inset-[2px] bg-cyber-darker rounded-xl"></div>
        
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 bg-cyber-primary rounded-full animate-pulse"></div>
              <h3 class="text-2xl font-cyber text-cyber-primary">
                PROJECT_DETAILS
              </h3>
            </div>
            <button 
              @click="selectedProject = null" 
              class="text-gray-400 hover:text-cyber-primary transition-colors duration-300 cyber-social-btn"
              @mouseenter="createParticleEffect($event)"
            >
              <X class="w-6 h-6" />
            </button>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <!-- Project Visual & Info -->
            <div class="space-y-6">
              <!-- Project Icon & Title -->
              <div class="flex items-center gap-4 mb-6">
                <span class="text-5xl">{{ getProjectIcon(selectedProject.category) }}</span>
                <div>
                  <h3 class="text-3xl font-cyber text-cyber-primary mb-2">{{ selectedProject.title }}</h3>
                  <div class="flex items-center gap-3">
                    <span :class="statusBadgeClasses(selectedProject.status)">
                      {{ formatStatus(selectedProject.status) }}
                    </span>
                    <span v-if="selectedProject.featured" class="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-full text-xs">
                      <Star class="w-3 h-3 fill-current" />
                      FEATURED
                    </span>
                  </div>
                </div>
              </div>

              <!-- Project Image -->
              <div v-if="selectedProject.image_url" class="mb-6">
                <img 
                  :src="selectedProject.image_url" 
                  :alt="selectedProject.title"
                  class="w-full h-48 object-cover rounded-lg border border-cyber-primary/30"
                />
              </div>

              <!-- Project Description -->
              <div class="space-y-3">
                <h4 class="font-tech text-gray-400 text-sm tracking-wider">DESCRIPTION</h4>
                <p class="text-gray-300 leading-relaxed">{{ selectedProject.description }}</p>
              </div>

              <!-- Short Description -->
              <div v-if="selectedProject.short_description" class="space-y-3">
                <h4 class="font-tech text-gray-400 text-sm tracking-wider">OVERVIEW</h4>
                <p class="text-gray-300 leading-relaxed">{{ selectedProject.short_description }}</p>
              </div>

              <!-- Project Metadata -->
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <span class="font-tech text-gray-400 text-sm">CATEGORY</span>
                  <div class="text-cyber-primary font-tech">{{ formatCategory(selectedProject.category) }}</div>
                </div>
                <div class="space-y-1">
                  <span class="font-tech text-gray-400 text-sm">CREATED</span>
                  <div class="text-gray-300 font-tech">{{ formatDate(selectedProject.created_at) }}</div>
                </div>
                <div v-if="selectedProject.client" class="space-y-1">
                  <span class="font-tech text-gray-400 text-sm">CLIENT</span>
                  <div class="text-cyber-accent font-tech">{{ selectedProject.client }}</div>
                </div>
                <div v-if="selectedProject.views" class="space-y-1">
                  <span class="font-tech text-gray-400 text-sm">VIEWS</span>
                  <div class="text-gray-300 font-tech">{{ selectedProject.views.toLocaleString() }}</div>
                </div>
              </div>
            </div>

            <!-- Technologies & Links -->
            <div class="space-y-6">
              <!-- Technologies -->
              <div class="space-y-3">
                <h4 class="font-tech text-gray-400 text-sm tracking-wider">TECHNOLOGIES</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in selectedProject.technologies"
                    :key="tech"
                    class="px-3 py-2 bg-cyber-primary/20 border border-cyber-primary/30 text-cyber-primary rounded text-sm font-tech"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Project Links -->
              <div class="space-y-4">
                <h4 class="font-tech text-gray-400 text-sm tracking-wider">LINKS</h4>
                <div class="flex flex-col gap-3">
                  <a
                    v-if="selectedProject.github_url"
                    :href="selectedProject.github_url"
                    target="_blank"
                    class="cyber-button flex items-center justify-center gap-3"
                  >
                    <Github class="w-5 h-5" />
                    <span class="font-tech">VIEW_SOURCE_CODE</span>
                  </a>
                  <a
                    v-if="selectedProject.live_url"
                    :href="selectedProject.live_url"
                    target="_blank"
                    class="cyber-button flex items-center justify-center gap-3 border-cyber-accent text-cyber-accent"
                  >
                    <ExternalLink class="w-5 h-5" />
                    <span class="font-tech">LIVE_DEMO</span>
                  </a>
                  <a
                    v-if="selectedProject.demo_url"
                    :href="selectedProject.demo_url"
                    target="_blank"
                    class="cyber-button flex items-center justify-center gap-3 border-purple-500 text-purple-400"
                  >
                    <Play class="w-5 h-5" />
                    <span class="font-tech">VIEW_DEMO</span>
                  </a>
                  <div v-if="!selectedProject.github_url && !selectedProject.live_url && !selectedProject.demo_url" class="text-center py-4">
                    <p class="text-gray-400 font-tech">NO_LINKS_AVAILABLE</p>
                  </div>
                </div>
              </div>

              <!-- Additional Info -->
              <div v-if="selectedProject.challenges && selectedProject.challenges.length > 0" class="space-y-3">
                <h4 class="font-tech text-gray-400 text-sm tracking-wider">CHALLENGES</h4>
                <ul class="space-y-2">
                  <li 
                    v-for="challenge in selectedProject.challenges" 
                    :key="challenge"
                    class="text-gray-300 text-sm flex items-start gap-2"
                  >
                    <span class="text-cyber-primary mt-1">▶</span>
                    {{ challenge }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useAnimations } from '../composables/useAnimations'
import CyberNavbar from '../components/Layout/CyberNavbar.vue'
import { 
  Search, 
  X,
  RefreshCw,
  Settings,
  AlertCircle,
  ExternalLink,
  Github,
  FolderOpen,
  Star,
  Rocket,
  Play
} from 'lucide-vue-next'

const { createParticleEffect } = useAnimations()

// API Configuration - Match FastAPI exactly
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_ENDPOINTS = {
  PROJECTS: `${API_BASE_URL}/api/v1/projects`,
  FEATURED_PROJECTS: `${API_BASE_URL}/api/v1/projects/featured`
}

// Reactive state
const projects = ref([])
const selectedProject = ref(null)
const projectsGrid = ref(null)

// Filters and search
const activeFilter = ref('all')
const statusFilter = ref('all')
const searchQuery = ref('')
const loading = ref(false)
const error = ref('')

// Categories - Match FastAPI model
const categories = [
  { id: 'all', name: 'All Projects', emoji: '🚀' },
  { id: 'security', name: 'Security', emoji: '🛡️' },
  { id: 'enterprise', name: 'Enterprise', emoji: '🏢' },
  { id: 'web', name: 'Web Apps', emoji: '🌐' },
  { id: 'ai', name: 'AI/ML', emoji: '🤖' },
  { id: 'blockchain', name: 'Blockchain', emoji: '⛓️' },
  { id: 'mobile', name: 'Mobile', emoji: '📱' }
]

// Computed properties
const stats = computed(() => {
  return {
    total: projects.value.length,
    development: projects.value.filter(p => p.status === 'development').length,
    deployed: projects.value.filter(p => p.status === 'deployed').length,
    featured: projects.value.filter(p => p.featured).length
  }
})

const filteredProjects = computed(() => {
  let filtered = projects.value

  // Category filter
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(project => project.category === activeFilter.value)
  }

  // Status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(project => project.status === statusFilter.value)
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some(tech => tech.toLowerCase().includes(query)) ||
      project.client?.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const setFilter = (categoryId) => {
  activeFilter.value = categoryId
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: 200 })
  
  // Animate grid items
  if (projectsGrid.value) {
    const items = projectsGrid.value.querySelectorAll('.project-card-entry')
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`
      item.classList.add('animate-in')
    })
  }
}

const resetFilters = () => {
  activeFilter.value = 'all'
  statusFilter.value = 'all'
  searchQuery.value = ''
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00ff88')
}

// Animation styles
const binaryStreamStyle = (index) => {
  return {
    left: `${(index / 80) * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 10 + 15}s`
  }
}

// Status badge classes
const statusBadgeClasses = (status) => {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-tech tracking-wider'
  switch (status) {
    case 'planning':
      return `${baseClasses} bg-blue-500/20 border border-blue-500/30 text-blue-400`
    case 'development':
      return `${baseClasses} bg-yellow-500/20 border border-yellow-500/30 text-yellow-400`
    case 'testing':
      return `${baseClasses} bg-orange-500/20 border border-orange-500/30 text-orange-400`
    case 'deployed':
      return `${baseClasses} bg-green-500/20 border border-green-500/30 text-green-400`
    case 'maintenance':
      return `${baseClasses} bg-purple-500/20 border border-purple-500/30 text-purple-400`
    default:
      return `${baseClasses} bg-gray-500/20 border border-gray-500/30 text-gray-400`
  }
}

// Format status for display
const formatStatus = (status) => {
  const statusMap = {
    planning: 'PLANNING',
    development: 'DEVELOPMENT',
    testing: 'TESTING',
    deployed: 'DEPLOYED',
    maintenance: 'MAINTENANCE'
  }
  return statusMap[status] || status.toUpperCase()
}

// Format category for display
const formatCategory = (category) => {
  const categoryMap = {
    web: 'WEB APPLICATION',
    mobile: 'MOBILE APP',
    ai: 'AI SYSTEM',
    security: 'CYBERSECURITY',
    blockchain: 'BLOCKCHAIN',
    enterprise: 'ENTERPRISE'
  }
  return categoryMap[category] || category.toUpperCase()
}

// Format date with error handling
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'N/A'
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return 'N/A'
  }
}

// Get project icon
const getProjectIcon = (category) => {
  const icons = {
    web: '🌐',
    mobile: '📱',
    ai: '🤖',
    security: '🛡️',
    blockchain: '⛓️',
    enterprise: '🏢'
  }
  return icons[category] || '🚀'
}

// View project
const viewProject = (project) => {
  selectedProject.value = project
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 })
}

const activateProjectCard = (event) => {
  createParticleEffect(event)
}

// API functions - COMPATIBLE WITH FASTAPI
const fetchProjects = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(API_ENDPOINTS.PROJECTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    
    // ✅ FIX: Extract items from paginated response
    projects.value = Array.isArray(result.items) ? result.items : []
    
    console.log(`Loaded ${projects.value.length} projects from FastAPI`)
    
    // Animate projects on load
    await nextTick()
    if (projectsGrid.value) {
      const items = projectsGrid.value.querySelectorAll('.project-card-entry')
      items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`
        item.classList.add('animate-in')
      })
    }
    
  } catch (err) {
    console.error('Failed to fetch projects:', err)
    error.value = err.message || 'Failed to load projects from backend'
    
    // Enhanced demo data for development
    if (import.meta.env.DEV) {
      console.log('Using enhanced demo data for development')
      projects.value = getDemoProjects()
    }
  } finally {
    loading.value = false
  }
}

// Enhanced demo data function
const getDemoProjects = () => {
  return [
    {
      _id: '1',
      title: 'Cybersecurity Dashboard',
      description: 'A comprehensive cybersecurity monitoring dashboard with real-time threat detection and analytics for enterprise security operations.',
      short_description: 'Real-time cybersecurity monitoring with advanced threat detection',
      category: 'security',
      status: 'deployed',
      featured: true,
      technologies: ['Vue.js', 'FastAPI', 'MongoDB', 'Docker', 'Redis', 'WebSocket'],
      github_url: 'https://github.com/user/cyber-dashboard',
      live_url: 'https://cyber-dashboard.example.com',
      demo_url: 'https://demo.cyber-dashboard.example.com',
      image_url: null,
      gallery: [],
      start_date: new Date('2024-01-15').toISOString(),
      end_date: new Date('2024-06-20').toISOString(),
      client: 'Security Corp',
      challenges: ['Real-time data processing', 'Secure authentication', 'Scalable architecture'],
      solutions: ['WebSocket implementation', 'JWT token system', 'Microservices architecture'],
      metrics: { uptime: '99.9%', users: 1500, threats_blocked: 12500 },
      tags: ['security', 'dashboard', 'real-time', 'enterprise'],
      views: 1250,
      likes: 42,
      created_at: new Date('2024-01-10').toISOString(),
      updated_at: new Date('2024-06-20').toISOString()
    },
    {
      _id: '2',
      title: 'AI Trading Assistant',
      description: 'Machine learning-powered trading assistant that analyzes market patterns and provides intelligent investment recommendations using advanced neural networks.',
      short_description: 'AI-powered trading analysis and investment recommendations',
      category: 'ai',
      status: 'development',
      featured: false,
      technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL', 'AWS', 'Docker'],
      github_url: 'https://github.com/user/ai-trader',
      live_url: null,
      demo_url: 'https://demo.ai-trader.example.com',
      image_url: null,
      gallery: [],
      start_date: new Date('2024-03-01').toISOString(),
      end_date: null,
      client: 'FinTech Innovations',
      challenges: ['Market prediction accuracy', 'Real-time data feeds', 'Model training'],
      solutions: ['LSTM neural networks', 'WebSocket integration', 'Cloud GPU training'],
      metrics: { accuracy: '87%', latency: '50ms', trades_analyzed: '1.2M' },
      tags: ['ai', 'trading', 'machine-learning', 'finance'],
      views: 890,
      likes: 31,
      created_at: new Date('2024-02-15').toISOString(),
      updated_at: new Date('2024-07-10').toISOString()
    },
    {
      _id: '3',
      title: 'Blockchain Supply Chain',
      description: 'Decentralized supply chain management system using blockchain technology for transparent and secure product tracking.',
      short_description: 'Blockchain-based supply chain transparency system',
      category: 'blockchain',
      status: 'testing',
      featured: true,
      technologies: ['Solidity', 'React', 'Node.js', 'Ethereum', 'IPFS'],
      github_url: 'https://github.com/user/blockchain-supply',
      live_url: 'https://supply-chain-demo.example.com',
      demo_url: null,
      image_url: null,
      gallery: [],
      start_date: new Date('2024-02-01').toISOString(),
      end_date: new Date('2024-08-15').toISOString(),
      client: 'Global Logistics Inc',
      challenges: ['Blockchain scalability', 'Data privacy', 'Integration with legacy systems'],
      solutions: ['Layer 2 solutions', 'Zero-knowledge proofs', 'API gateway'],
      metrics: { transactions: '50K', partners: 25, efficiency_gain: '40%' },
      tags: ['blockchain', 'supply-chain', 'ethereum', 'decentralized'],
      views: 1560,
      likes: 67,
      created_at: new Date('2024-01-20').toISOString(),
      updated_at: new Date('2024-07-25').toISOString()
    }
  ]
}

onMounted(() => {
  fetchProjects()
  console.log('Cyber Project Arsenal activated - FastAPI Compatible')
})
</script>

<style scoped>
.binary-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.binary-stream {
  position: absolute;
  color: #00f0ff11;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  animation: binary-fall 20s linear infinite;
}

.binary-digit {
  animation: binary-flicker 0.1s infinite;
}

.hologram-container {
  position: fixed;
  top: 20%;
  right: 10%;
  transform: translateY(-50%);
  z-index: 0;
}

.hologram-ring {
  position: absolute;
  border: 1px solid #00f0ff33;
  border-radius: 50%;
  animation: hologram-pulse 4s ease-in-out infinite;
}

.hologram-ring.ring-1 {
  width: 120px;
  height: 120px;
  animation-delay: 0s;
}

.hologram-ring.ring-2 {
  width: 180px;
  height: 180px;
  animation-delay: 1s;
}

.hologram-ring.ring-3 {
  width: 240px;
  height: 240px;
  animation-delay: 2s;
}

.hologram-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 240, 255, 0.1);
  border-radius: 50%;
  padding: 30px;
}

.cyber-card {
  @apply relative overflow-hidden bg-cyber-card/50 backdrop-blur-sm border border-cyber-primary/30 rounded-xl;
  transition: all 0.3s ease;
}

.cyber-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.2);
  border-color: rgba(0, 240, 255, 0.6);
}

.cyber-button {
  @apply px-6 py-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-lg text-cyber-primary font-cyber hover:bg-cyber-primary/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed;
}

.cyber-button:hover:not(:disabled) {
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);
  transform: translateY(-2px);
}

.cyber-input {
  @apply w-full px-4 py-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-lg text-white font-tech placeholder-gray-500 focus:outline-none focus:border-cyber-primary transition-all duration-300;
}

.cyber-input:focus {
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.cyber-social-btn {
  @apply relative p-2 bg-cyber-card/50 border border-cyber-primary/30 rounded-lg text-cyber-primary hover:bg-cyber-primary/20 transition-all duration-300 cursor-pointer;
}

.cyber-social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
}

.cyber-tooltip {
  @apply absolute -top-8 left-1/2 transform -translate-x-1/2 bg-cyber-darker text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none transition-opacity;
}

.cyber-social-btn:hover .cyber-tooltip {
  opacity: 1;
}

.cyber-status {
  @apply p-4 rounded-lg border;
}

.cyber-status.transmitting {
  @apply border-cyber-primary bg-cyber-primary/10;
}

.cyber-status.error {
  @apply border-red-400 bg-red-400/10;
}

.category-filter {
  @apply px-6 py-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-lg text-cyber-primary font-tech transition-all duration-300;
}

.category-filter.active {
  @apply bg-cyber-primary/20 border-cyber-primary;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
}

.category-filter:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
}

.project-card-entry {
  opacity: 0;
  transform: translateY(30px);
}

.project-card-entry.animate-in {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes binary-fall {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes binary-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes hologram-pulse {
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* Enhanced responsive design */
@media (max-width: 768px) {
  .hologram-container {
    display: none;
  }
  
  .cyber-card {
    padding: 1.5rem 1rem;
  }
  
  .category-filter {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}

/* Custom scrollbar for modal */
.cyber-card::-webkit-scrollbar {
  width: 6px;
}

.cyber-card::-webkit-scrollbar-track {
  background: rgba(0, 240, 255, 0.1);
  border-radius: 3px;
}

.cyber-card::-webkit-scrollbar-thumb {
  background: rgba(0, 240, 255, 0.3);
  border-radius: 3px;
}

.cyber-card::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 240, 255, 0.5);
}
</style>