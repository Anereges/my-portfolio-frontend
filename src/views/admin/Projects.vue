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
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-3 bg-cyber-card/60 border border-cyber-primary/40 rounded-full px-6 py-3 mb-6 backdrop-blur-sm glow-primary">
            <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
            <span class="font-cyber text-cyber-primary text-sm tracking-wider">ADMIN_PROJECTS_DASHBOARD</span>
            <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-cyber font-bold mb-6 matrix-text glitch" data-text="PROJECTS_ADMIN">
            PROJECTS_ADMIN
          </h1>
          <p class="text-xl text-gray-300 font-tech max-w-3xl mx-auto leading-relaxed">
            Manage <span class="text-cyber-primary">portfolio projects</span> and 
            <span class="text-cyber-accent">deployment operations</span> - 
            full administrative control
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

        <!-- Admin Action Controls -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div class="relative">
            <select 
              v-model="statusFilter" 
              class="cyber-input-enhanced pl-10 pr-8 appearance-none"
              @mouseenter="createParticleEffect($event)"
            >
              <option value="all">ALL_STATUS</option>
              <option value="planning">PLANNING</option>
              <option value="development">DEVELOPMENT</option>
              <option value="testing">TESTING</option>
              <option value="deployed">DEPLOYED</option>
              <option value="maintenance">MAINTENANCE</option>
            </select>
            <Settings class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="SEARCH_PROJECTS..."
              class="cyber-input-enhanced pl-10 pr-4"
              @mouseenter="createParticleEffect($event)"
            />
            <Search class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>

          <button
            @click="openCreateModal"
            class="cyber-button-enhanced flex items-center gap-3 px-6 py-3 border-cyber-accent text-cyber-accent hover:glow-accent transition-all duration-300"
            @mouseenter="createParticleEffect($event)"
          >
            <Plus class="w-5 h-5" />
            <span class="font-tech tracking-wider">NEW_PROJECT</span>
          </button>

          <button
            @click="fetchProjects"
            class="cyber-button-enhanced flex items-center gap-3 px-6 py-3 border-cyber-primary text-cyber-primary hover:glow-primary transition-all duration-300"
            @mouseenter="createParticleEffect($event)"
          >
            <RefreshCw class="w-5 h-5" />
            <span class="font-tech tracking-wider">REFRESH</span>
          </button>
        </div>

        <!-- Stats Overview -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div class="cyber-card p-6 text-center border border-cyber-primary/30 glow-primary">
            <div class="text-3xl font-cyber text-cyber-primary mb-2">{{ stats.total }}</div>
            <div class="font-tech text-gray-400 text-sm">TOTAL_PROJECTS</div>
          </div>
          <div class="cyber-card p-6 text-center border border-cyber-accent/30 glow-accent">
            <div class="text-3xl font-cyber text-cyber-accent mb-2">{{ stats.development }}</div>
            <div class="font-tech text-gray-400 text-sm">IN_DEVELOPMENT</div>
          </div>
          <div class="cyber-card p-6 text-center border border-green-500/30 glow-success">
            <div class="text-3xl font-cyber text-green-400 mb-2">{{ stats.deployed }}</div>
            <div class="font-tech text-gray-400 text-sm">DEPLOYED_OPS</div>
          </div>
          <div class="cyber-card p-6 text-center border border-blue-500/30 glow-info">
            <div class="text-3xl font-cyber text-blue-400 mb-2">{{ stats.featured }}</div>
            <div class="font-tech text-gray-400 text-sm">FEATURED</div>
          </div>
        </div>

        <!-- Error Display -->
        <div v-if="error" class="cyber-terminal border-2 border-red-500/50 glow-error p-4 mb-6">
          <div class="flex items-center gap-3">
            <AlertTriangle class="w-5 h-5 text-red-400" />
            <span class="font-tech text-red-400">{{ error }}</span>
          </div>
        </div>

        <!-- Loading Animation -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
          <div class="cyber-loader-large mb-4"></div>
          <p class="text-cyber-primary font-tech text-lg">Loading project database...</p>
          <p class="text-gray-400 text-sm mt-2">Synchronizing with backend systems</p>
        </div>

        <!-- Projects Grid with Staggered Animation -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8" ref="projectsGrid">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project._id"
            class="cyber-terminal group cursor-pointer relative overflow-hidden border-2 border-cyber-border hover:border-cyber-primary hover:glow-primary transition-all duration-500 project-card-entry"
            @click="viewProject(project)"
            @mouseenter="activateProjectCard($event)"
            :data-index="index"
          >
            <!-- Project Header -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary to-cyber-accent"></div>
            
            <div class="p-6">
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
                <div class="flex items-center gap-2">
                  <button
                    v-if="project.featured"
                    class="text-yellow-400 hover:text-yellow-300 transition-colors"
                    @click.stop="toggleFeatured(project)"
                  >
                    <Star class="w-4 h-4 fill-current" />
                  </button>
                  <button
                    class="text-cyber-primary hover:text-cyber-accent transition-colors"
                    @click.stop="editProject(project)"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    class="text-red-400 hover:text-red-300 transition-colors"
                    @click.stop="deleteProject(project)"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
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
              <div class="flex items-center justify-between pt-4 border-t border-cyber-border/50">
                <div class="flex gap-3">
                  <a
                    v-if="project.github_url"
                    :href="project.github_url"
                    target="_blank"
                    class="text-gray-400 hover:text-cyber-primary transition-colors"
                    @click.stop
                  >
                    <Github class="w-4 h-4" />
                  </a>
                  <a
                    v-if="project.live_url"
                    :href="project.live_url"
                    target="_blank"
                    class="text-gray-400 hover:text-cyber-accent transition-colors"
                    @click.stop
                  >
                    <ExternalLink class="w-4 h-4" />
                  </a>
                </div>
                <div class="text-gray-500 text-xs font-tech">
                  {{ formatDate(project.created_at) }}
                </div>
              </div>
            </div>

            <!-- Hover Effect Overlay -->
            <div class="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 to-cyber-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
          <p class="text-gray-400 mb-6">Try selecting a different category or create a new project</p>
          <button 
            @click="openCreateModal"
            class="cyber-button-enhanced flex items-center gap-3 px-8 py-4 mx-auto glow-primary hover:glow-accent transition-all duration-300"
          >
            <Plus class="w-6 h-6" />
            <span class="font-tech tracking-wider text-lg">INITIATE_PROJECT</span>
          </button>
        </div>

        <!-- Project Counter & Stats -->
        <div class="fixed bottom-6 right-6 cyber-card p-4 text-center backdrop-blur-lg border border-cyber-primary/30">
          <div class="text-cyber-primary font-cyber text-2xl mb-1">{{ filteredProjects.length }}</div>
          <div class="text-gray-400 text-sm font-tech">ACTIVE_PROJECTS</div>
          <div class="w-full bg-cyber-border h-1 mt-2 rounded-full overflow-hidden">
            <div class="h-full bg-cyber-primary transition-all duration-1000" :style="{ width: `${(filteredProjects.length / projects.length) * 100}%` }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Project Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-terminal p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-cyber-primary/30 glow-primary">
        <!-- Terminal Header -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-accent to-cyber-primary"></div>
        
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-cyber-primary rounded-full animate-pulse"></div>
            <h3 class="text-2xl font-cyber text-cyber-primary">
              {{ isEditing ? 'EDIT_PROJECT' : 'CREATE_PROJECT' }}
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

        <form @submit.prevent="submitProject" class="space-y-6">
          <!-- Basic Information -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Project Title -->
            <div class="space-y-2">
              <label class="font-tech text-gray-400 text-sm tracking-wider">PROJECT_TITLE *</label>
              <input
                v-model="projectForm.title"
                type="text"
                required
                class="cyber-input-enhanced w-full"
                placeholder="ENTER_PROJECT_TITLE"
              />
            </div>

            <!-- Category -->
            <div class="space-y-2">
              <label class="font-tech text-gray-400 text-sm tracking-wider">CATEGORY *</label>
              <select v-model="projectForm.category" required class="cyber-input-enhanced w-full">
                <option value="web">WEB_APPLICATION</option>
                <option value="mobile">MOBILE_APP</option>
                <option value="ai">AI_SYSTEM</option>
                <option value="security">CYBERSECURITY</option>
                <option value="blockchain">BLOCKCHAIN</option>
                <option value="enterprise">ENTERPRISE</option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <label class="font-tech text-gray-400 text-sm tracking-wider">DESCRIPTION *</label>
            <textarea
              v-model="projectForm.description"
              required
              rows="4"
              class="cyber-input-enhanced w-full"
              placeholder="PROJECT_DESCRIPTION"
            ></textarea>
          </div>

          <!-- Short Description -->
          <div class="space-y-2">
            <label class="font-tech text-gray-400 text-sm tracking-wider">SHORT_DESCRIPTION</label>
            <input
              v-model="projectForm.short_description"
              type="text"
              class="cyber-input-enhanced w-full"
              placeholder="Brief description (auto-generated if empty)"
            />
            <p class="text-gray-500 text-xs">Will be auto-generated from description if left empty</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Status -->
            <div class="space-y-2">
              <label class="font-tech text-gray-400 text-sm tracking-wider">STATUS *</label>
              <select v-model="projectForm.status" required class="cyber-input-enhanced w-full">
                <option value="planning">PLANNING</option>
                <option value="development">DEVELOPMENT</option>
                <option value="testing">TESTING</option>
                <option value="deployed">DEPLOYED</option>
                <option value="maintenance">MAINTENANCE</option>
              </select>
            </div>

            <!-- Featured -->
            <div class="space-y-2">
              <label class="font-tech text-gray-400 text-sm tracking-wider">FEATURED_PROJECT</label>
              <div class="flex items-center gap-3 p-3 border border-cyber-border rounded-lg">
                <input
                  v-model="projectForm.featured"
                  type="checkbox"
                  id="featured"
                  class="cyber-checkbox"
                />
                <label for="featured" class="font-tech text-gray-300 cursor-pointer">
                  MARK_AS_FEATURED
                </label>
              </div>
            </div>
          </div>

          <!-- Technologies -->
          <div class="space-y-2">
            <label class="font-tech text-gray-400 text-sm tracking-wider">TECHNOLOGIES *</label>
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="(tech, index) in projectForm.technologies"
                :key="index"
                class="flex items-center gap-2 px-3 py-1 bg-cyber-primary/20 border border-cyber-primary/30 text-cyber-primary rounded-full text-sm"
              >
                {{ tech }}
                <button
                  type="button"
                  @click="removeTechnology(index)"
                  class="text-cyber-primary hover:text-red-400 transition-colors"
                >
                  <X class="w-3 h-3" />
                </button>
              </span>
            </div>
            <div class="flex gap-2">
              <input
                v-model="newTechnology"
                type="text"
                class="cyber-input-enhanced flex-1"
                placeholder="ADD_TECHNOLOGY"
                @keydown.enter.prevent="addTechnology"
              />
              <button
                type="button"
                @click="addTechnology"
                class="cyber-button-enhanced border-cyber-accent text-cyber-accent"
              >
                ADD
              </button>
            </div>
          </div>

          <!-- URLs -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- GitHub URL -->
            <div class="space-y-2">
              <label class="font-tech text-gray-400 text-sm tracking-wider">GITHUB_URL</label>
              <input
                v-model="projectForm.github_url"
                type="url"
                class="cyber-input-enhanced w-full"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <!-- Live URL -->
            <div class="space-y-2">
              <label class="font-tech text-gray-400 text-sm tracking-wider">LIVE_URL</label>
              <input
                v-model="projectForm.live_url"
                type="url"
                class="cyber-input-enhanced w-full"
                placeholder="https://project-domain.com"
              />
            </div>
          </div>

          <!-- Additional Fields -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Client -->
            <div class="space-y-2">
              <label class="font-tech text-gray-400 text-sm tracking-wider">CLIENT</label>
              <input
                v-model="projectForm.client"
                type="text"
                class="cyber-input-enhanced w-full"
                placeholder="Client name (optional)"
              />
            </div>

            <!-- Image URL -->
            <div class="space-y-2">
              <label class="font-tech text-gray-400 text-sm tracking-wider">IMAGE_URL</label>
              <input
                v-model="projectForm.image_url"
                type="url"
                class="cyber-input-enhanced w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <!-- Dates -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="font-tech text-gray-400 text-sm tracking-wider">START_DATE</label>
              <input
                v-model="projectForm.start_date"
                type="date"
                class="cyber-input-enhanced w-full"
              />
            </div>
            <div class="space-y-2">
              <label class="font-tech text-gray-400 text-sm tracking-wider">END_DATE</label>
              <input
                v-model="projectForm.end_date"
                type="date"
                class="cyber-input-enhanced w-full"
              />
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 pt-6 border-t border-cyber-border/50">
            <button
              type="button"
              @click="closeModal"
              class="cyber-button-enhanced flex-1 border-cyber-border text-gray-400 hover:border-cyber-primary hover:text-cyber-primary transition-all duration-300"
            >
              CANCEL
            </button>
            <button
              type="submit"
              class="cyber-button-enhanced flex-1 bg-gradient-to-r from-cyber-primary to-cyber-accent text-white font-bold hover:glow-primary transition-all duration-300"
            >
              {{ isEditing ? 'UPDATE_PROJECT' : 'CREATE_PROJECT' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deletingProject" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-terminal p-8 max-w-md w-full border-2 border-red-500/50 glow-error">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400"></div>
        
        <div class="text-center mb-6">
          <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 class="font-cyber text-red-400 text-2xl mb-2">CONFIRM_DELETION</h3>
          <p class="text-gray-300 font-tech">
            PERMANENTLY_DELETE project "{{ deletingProject.title }}"?
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
            CANCEL
          </button>
          <button
            @click="executeProjectDeletion"
            class="cyber-button-enhanced flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:glow-error transition-all duration-300"
          >
            CONFIRM_DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, nextTick } from 'vue'
import { useAnimations } from '../../composables/useAnimations'
import AdminNavbar from '../../components/Admin/AdminNavbar.vue'
import { 
  Search, 
  Trash2, 
  X,
  RefreshCw,
  Settings,
  AlertTriangle,
  Plus,
  Edit,
  Star,
  ExternalLink,
  Github,
  FolderOpen
} from 'lucide-vue-next'

const { createParticleEffect, createQuantumEffect } = useAnimations()

// API Configuration - Match FastAPI routes exactly
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_ENDPOINTS = {
  PROJECTS: `${API_BASE_URL}/api/v1/projects`,
  FEATURED_PROJECTS: `${API_BASE_URL}/api/v1/projects/featured`
}

// Reactive state
const projects = ref([])
const selectedProject = ref(null)
const deletingProject = ref(null)
const editingProject = ref(null)
const projectsGrid = ref(null)

// Modal state
const isModalOpen = ref(false)
const isEditing = ref(false)

// Filters and search
const activeFilter = ref('all')
const statusFilter = ref('all')
const searchQuery = ref('')
const loading = ref(false)
const error = ref('')
const newTechnology = ref('')

// Categories matching FastAPI model
const categories = [
  { id: 'all', name: 'All Projects', emoji: '🚀' },
  { id: 'security', name: 'Security', emoji: '🛡️' },
  { id: 'enterprise', name: 'Enterprise', emoji: '🏢' },
  { id: 'web', name: 'Web Apps', emoji: '🌐' },
  { id: 'ai', name: 'AI/ML', emoji: '🤖' },
  { id: 'blockchain', name: 'Blockchain', emoji: '⛓️' },
  { id: 'mobile', name: 'Mobile', emoji: '📱' }
]

// Project form matching FastAPI ProjectCreate model
const projectForm = reactive({
  title: '',
  description: '',
  short_description: '',
  technologies: [],
  category: 'web',
  status: 'planning',
  featured: false,
  github_url: '',
  live_url: '',
  demo_url: '',
  image_url: '',
  gallery: [],
  start_date: null,
  end_date: null,
  client: '',
  challenges: [],
  solutions: [],
  metrics: {},
  tags: []
})

// Status classes
const statusClasses = {
  deployed: 'text-cyber-accent',
  development: 'text-cyber-primary',
  planning: 'text-cyber-secondary',
  maintenance: 'text-gray-400',
  testing: 'text-orange-400'
}

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
}

// Modal management
const openCreateModal = () => {
  isModalOpen.value = true
  isEditing.value = false
  resetForm()
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 })
}

const openEditModal = (project) => {
  isModalOpen.value = true
  isEditing.value = true
  editingProject.value = project
  
  // Convert dates for input fields
  const startDate = project.start_date ? formatDateForInput(project.start_date) : null
  const endDate = project.end_date ? formatDateForInput(project.end_date) : null
  
  Object.assign(projectForm, {
    title: project.title,
    description: project.description,
    short_description: project.short_description || '',
    category: project.category,
    status: project.status,
    featured: project.featured || false,
    technologies: [...(project.technologies || [])],
    github_url: project.github_url || '',
    live_url: project.live_url || '',
    demo_url: project.demo_url || '',
    image_url: project.image_url || '',
    client: project.client || '',
    start_date: startDate,
    end_date: endDate
  })
}

const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  editingProject.value = null
  resetForm()
}

// Animation styles
const streamStyle = (index) => {
  return {
    left: `${(index / 6) * 100}%`,
    animationDelay: `${index * 0.5}s`
  }
}

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

// Format date for display
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

// Format date for input fields
const formatDateForInput = (dateString) => {
  if (!dateString) return null
  
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return null
    
    return date.toISOString().split('T')[0]
  } catch {
    return null
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
}

// Edit project
const editProject = (project) => {
  openEditModal(project)
}

// Reset form
const resetForm = () => {
  Object.assign(projectForm, {
    title: '',
    description: '',
    short_description: '',
    category: 'web',
    status: 'planning',
    featured: false,
    technologies: [],
    github_url: '',
    live_url: '',
    demo_url: '',
    image_url: '',
    gallery: [],
    start_date: null,
    end_date: null,
    client: '',
    challenges: [],
    solutions: [],
    metrics: {},
    tags: []
  })
  newTechnology.value = ''
}

// Add technology
const addTechnology = () => {
  const tech = newTechnology.value.trim()
  if (tech && !projectForm.technologies.includes(tech)) {
    projectForm.technologies.push(tech)
    newTechnology.value = ''
  }
}

// Remove technology
const removeTechnology = (index) => {
  projectForm.technologies.splice(index, 1)
}

// Submit project
const submitProject = async () => {
  try {
    console.log('Submitting project:', projectForm)
    
    // Prepare data for API
    const submitData = {
      ...projectForm,
      // Ensure technologies is always an array
      technologies: projectForm.technologies.length > 0 ? projectForm.technologies : ['Vue.js'],
      // Convert empty strings to null for optional fields
      github_url: projectForm.github_url || null,
      live_url: projectForm.live_url || null,
      demo_url: projectForm.demo_url || null,
      image_url: projectForm.image_url || null,
      client: projectForm.client || null,
      // Convert date strings to ISO format
      start_date: projectForm.start_date ? new Date(projectForm.start_date).toISOString() : null,
      end_date: projectForm.end_date ? new Date(projectForm.end_date).toISOString() : null
    }

    if (isEditing.value && editingProject.value) {
      await updateProject(editingProject.value._id, submitData)
    } else {
      await createProject(submitData)
    }
    closeModal()
    await fetchProjects()
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00ff88')
  } catch (err) {
    console.error('Failed to save project:', err)
    error.value = err.message || 'Failed to save project'
    setTimeout(() => { error.value = '' }, 5000)
  }
}

// Toggle featured
const toggleFeatured = async (project) => {
  try {
    await updateProject(project._id, { featured: !project.featured })
    
    // Update local state
    const index = projects.value.findIndex(p => p._id === project._id)
    if (index !== -1) {
      projects.value[index].featured = !project.featured
    }
    
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#ff00ff')
  } catch (err) {
    console.error('Failed to toggle featured:', err)
    error.value = 'Failed to update project'
    setTimeout(() => { error.value = '' }, 3000)
  }
}

// Initiate project deletion
const deleteProject = (project) => {
  deletingProject.value = project
  createParticleEffect()
}

// Cancel deletion
const cancelDeletion = () => {
  deletingProject.value = null
}

// Execute project deletion
const executeProjectDeletion = async () => {
  if (!deletingProject.value) return
  
  try {
    await deleteProjectFromAPI(deletingProject.value._id)
    
    projects.value = projects.value.filter(p => p._id !== deletingProject.value._id)
    deletingProject.value = null
    selectedProject.value = null
    
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, '#00ff88')
  } catch (err) {
    console.error('Failed to delete project:', err)
    error.value = 'Failed to delete project'
    setTimeout(() => { error.value = '' }, 3000)
  }
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
    
    // Demo data for development
    if (import.meta.env.DEV) {
      console.log('Using demo data for development')
      projects.value = getDemoProjects()
    }
  } finally {
    loading.value = false
  }
}

const createProject = async (projectData) => {
  const response = await fetch(API_ENDPOINTS.PROJECTS, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
    throw new Error(errorData.detail || `Failed to create project: ${response.status}`)
  }

  return await response.json()
}

const updateProject = async (id, projectData) => {
  const response = await fetch(`${API_ENDPOINTS.PROJECTS}/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
    throw new Error(errorData.detail || `Failed to update project: ${response.status}`)
  }

  return await response.json()
}

const deleteProjectFromAPI = async (id) => {
  const response = await fetch(`${API_ENDPOINTS.PROJECTS}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
    throw new Error(errorData.detail || `Failed to delete project: ${response.status}`)
  }

  return await response.json()
}

// Demo data function
const getDemoProjects = () => {
  return [
    {
      _id: '1',
      title: 'Cybersecurity Dashboard',
      description: 'A comprehensive cybersecurity monitoring dashboard with real-time threat detection and analytics.',
      short_description: 'Real-time cybersecurity monitoring with threat detection',
      category: 'security',
      status: 'deployed',
      featured: true,
      technologies: ['Vue.js', 'FastAPI', 'MongoDB', 'Docker', 'Redis'],
      github_url: 'https://github.com/user/cyber-dashboard',
      live_url: 'https://cyber-dashboard.example.com',
      image_url: null,
      gallery: [],
      start_date: new Date('2024-01-15').toISOString(),
      end_date: new Date('2024-06-20').toISOString(),
      client: 'Security Corp',
      challenges: ['Real-time data processing', 'Secure authentication'],
      solutions: ['WebSocket implementation', 'JWT token system'],
      metrics: { uptime: '99.9%', users: 1500 },
      tags: ['security', 'dashboard', 'real-time'],
      views: 1250,
      likes: 42,
      created_at: new Date('2024-01-10').toISOString(),
      updated_at: new Date('2024-06-20').toISOString()
    },
    {
      _id: '2',
      title: 'AI Trading Assistant',
      description: 'Machine learning-powered trading assistant that analyzes market patterns and provides investment recommendations.',
      short_description: 'AI-powered trading analysis and recommendations',
      category: 'ai',
      status: 'development',
      featured: false,
      technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL', 'AWS'],
      github_url: 'https://github.com/user/ai-trader',
      live_url: null,
      image_url: null,
      gallery: [],
      start_date: new Date('2024-03-01').toISOString(),
      end_date: null,
      client: 'FinTech Innovations',
      challenges: ['Market prediction accuracy', 'Real-time data feeds'],
      solutions: ['LSTM neural networks', 'WebSocket integration'],
      metrics: { accuracy: '87%', latency: '50ms' },
      tags: ['ai', 'trading', 'machine-learning'],
      views: 890,
      likes: 31,
      created_at: new Date('2024-02-15').toISOString(),
      updated_at: new Date('2024-07-10').toISOString()
    }
  ]
}

onMounted(() => {
  fetchProjects()
  console.log('Admin Project Manager activated - FastAPI Compatible')
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

/* Custom Checkbox */
.cyber-checkbox {
  @apply w-5 h-5 bg-cyber-dark border-2 border-cyber-border rounded-md appearance-none cursor-pointer transition-all duration-300;
}

.cyber-checkbox:checked {
  @apply bg-cyber-primary border-cyber-primary;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E");
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