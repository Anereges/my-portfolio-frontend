<template>
  <div class="min-h-screen bg-cyber-darker relative overflow-hidden">
    <AdminNavbar />
    
    <!-- Cybernetic Background -->
    <div class="admin-bg">
      <div class="cyber-grid"></div>
      <div class="data-streams">
        <div v-for="stream in 8" :key="stream" class="data-stream" :style="streamStyle(stream)"></div>
      </div>
      <div class="holographic-elements">
        <div v-for="i in 6" :key="i" class="hologram" :style="hologramStyle(i)"></div>
      </div>
      <div class="pulse-orbs">
        <div v-for="i in 3" :key="i" class="pulse-orb" :style="orbStyle(i)"></div>
      </div>
    </div>

    <div class="relative z-10 pt-28 pb-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-20">
          <div class="inline-flex items-center gap-3 bg-cyber-card/60 border border-cyber-primary/40 rounded-full px-6 py-3 backdrop-blur-sm glow-primary mb-4">
            <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
            <span class="font-cyber text-cyber-primary text-sm tracking-wider">LOADING_DASHBOARD_DATA</span>
            <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
          </div>
          <div class="cyber-terminal p-6 border-2 border-cyber-primary/30 max-w-md mx-auto">
            <div class="animate-pulse">
              <div class="h-4 bg-cyber-primary/20 rounded w-3/4 mb-4"></div>
              <div class="h-4 bg-cyber-primary/20 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-20">
          <div class="cyber-terminal p-8 border-2 border-red-500/30 glow-red mb-6 max-w-md mx-auto">
            <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 class="text-2xl font-cyber text-red-400 mb-2">AUTHENTICATION_ERROR</h3>
            <p class="text-gray-300 font-tech mb-4">{{ error }}</p>
            <div class="space-y-3">
              <button @click="fetchDashboardData" class="cyber-button-enhanced border-cyber-primary text-cyber-primary w-full">
                RETRY_CONNECTION
              </button>
              <div class="text-xs font-tech text-gray-400">
                <p>USERNAME: aman</p>
                <p>PASSWORD: aman@123</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Dashboard Content -->
        <div v-else>
          <!-- Header -->
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div class="text-center lg:text-left mb-6 lg:mb-0">
              <div class="inline-flex items-center gap-3 bg-cyber-card/60 border border-cyber-primary/40 rounded-full px-6 py-3 mb-4 backdrop-blur-sm glow-primary">
                <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
                <span class="font-cyber text-cyber-primary text-sm tracking-wider">PORTFOLIO_CONTROL_CENTER</span>
                <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
              </div>
              
              <h1 class="text-5xl md:text-7xl font-cyber font-bold mb-4 matrix-text">
                DASHBOARD
              </h1>
              <p class="text-xl text-gray-300 font-tech max-w-2xl">
                WELCOME_BACK_AMAN
              </p>
            </div>
            
            <!-- Live Status -->
            <div class="cyber-terminal px-6 py-3 border-2 border-cyber-accent/30 glow-accent">
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-cyber-accent rounded-full animate-pulse"></div>
                  <span class="font-tech text-cyber-accent text-sm tracking-wider">SYSTEM_STATUS</span>
                </div>
                <div class="h-4 w-px bg-cyber-border"></div>
                <span class="font-cyber text-green-400 text-sm">OPERATIONAL</span>
                <div class="h-4 w-px bg-cyber-border"></div>
                <span class="font-mono text-cyber-primary text-xs">{{ currentTime }}</span>
              </div>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div
              v-for="stat in stats"
              :key="stat.title"
              class="cyber-terminal group cursor-pointer relative overflow-hidden border-2 border-cyber-border hover:border-cyber-primary hover:glow-primary transition-all duration-500"
              @click="navigateTo(stat.route)"
              @mouseenter="activateStatCard($event)"
            >
              <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary to-cyber-accent"></div>
              
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div :class="['w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110', stat.bgColor, stat.borderColor]">
                      <component :is="stat.icon" :class="['w-6 h-6', stat.color]" />
                    </div>
                    <div>
                      <p class="font-tech text-gray-400 text-sm tracking-wider">{{ stat.title }}</p>
                      <p class="font-cyber text-2xl text-white">{{ stat.value }}</p>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div :class="[
                      'w-6 h-6 rounded-full flex items-center justify-center',
                      stat.trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'
                    ]">
                      <TrendingUp v-if="stat.trend === 'up'" class="w-3 h-3 text-green-400" />
                      <TrendingDown v-else class="w-3 h-3 text-red-400" />
                    </div>
                    <span :class="[
                      'font-tech text-sm',
                      stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    ]">
                      {{ stat.change }}
                    </span>
                  </div>
                  <span class="font-mono text-cyber-accent text-xs tracking-wider">VIEW</span>
                </div>
              </div>

              <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary/0 via-cyber-primary/5 to-cyber-primary/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid lg:grid-cols-3 gap-8 mb-12">
            <!-- Recent Projects -->
            <div class="lg:col-span-2 cyber-terminal p-6 border-2 border-cyber-primary/30 glow-primary">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-cyber text-cyber-primary tracking-wider">RECENT_PROJECTS</h3>
                <div class="flex items-center gap-2">
                  <button 
                    @click="fetchRecentProjects"
                    class="w-8 h-8 bg-cyber-primary/20 border border-cyber-primary rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300"
                  >
                    <RefreshCw class="w-4 h-4 text-cyber-primary" />
                  </button>
                  <button 
                    @click="navigateTo('/admin/projects/new')"
                    class="w-8 h-8 bg-cyber-primary/20 border border-cyber-primary rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300"
                  >
                    <Plus class="w-4 h-4 text-cyber-primary" />
                  </button>
                </div>
              </div>
              
              <div class="space-y-4">
                <div 
                  v-for="project in recentProjects"
                  :key="project._id"
                  class="flex items-center justify-between p-4 rounded-xl border border-cyber-border hover:border-cyber-accent transition-all duration-300 group cursor-pointer"
                  @click="navigateTo(`/admin/projects/edit/${project._id}`)"
                  @mouseenter="createParticleEffect($event)"
                >
                  <div class="flex items-center gap-3">
                    <Folder class="w-8 h-8 text-cyber-primary" />
                    <div class="max-w-xs">
                      <p class="font-tech text-white text-sm truncate">{{ project.title || 'Untitled Project' }}</p>
                      <p class="font-mono text-gray-400 text-xs">
                        {{ project.technology ? project.technology.join(', ') : 'No technologies' }}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <span class="font-cyber text-cyber-accent text-sm tracking-wider">
                      {{ formatDate(project.created_at) }}
                    </span>
                  </div>
                </div>
                
                <div v-if="recentProjects.length === 0" class="text-center py-8">
                  <Folder class="w-12 h-12 text-cyber-primary/50 mx-auto mb-2" />
                  <p class="font-tech text-gray-400 text-sm mb-3">NO_PROJECTS_FOUND</p>
                  <button 
                    @click="navigateTo('/admin/projects/new')"
                    class="cyber-button-enhanced border-cyber-primary text-cyber-primary text-xs"
                  >
                    CREATE_FIRST_PROJECT
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Actions & System Status -->
            <div class="cyber-terminal p-6 border-2 border-cyber-accent/30 glow-accent">
              <h3 class="text-xl font-cyber text-cyber-accent mb-6 tracking-wider">QUICK_ACTIONS</h3>
              
              <div class="grid grid-cols-2 gap-3 mb-6">
                <button
                  v-for="action in quickActions"
                  :key="action.label"
                  @click="handleQuickAction(action.action)"
                  class="cyber-button-enhanced py-3 text-xs flex items-center justify-center gap-2 transition-all duration-300"
                  @mouseenter="createParticleEffect($event)"
                >
                  <component :is="action.icon" class="w-4 h-4" />
                  <span class="font-tech tracking-wider">{{ action.label }}</span>
                </button>
              </div>

              <!-- System Status -->
              <div class="mt-6 pt-6 border-t border-cyber-border">
                <h4 class="font-tech text-cyber-primary mb-4 text-sm tracking-wider">SYSTEM_STATUS</h4>
                <div class="space-y-3">
                  <div 
                    v-for="system in systemStatus"
                    :key="system.name"
                    class="flex items-center justify-between p-3 rounded-lg border border-cyber-border hover:border-cyber-primary transition-all duration-300"
                  >
                    <span class="font-tech text-white text-sm">{{ system.name }}</span>
                    <div class="flex items-center gap-2">
                      <div :class="[
                        'w-2 h-2 rounded-full animate-pulse',
                        system.status === 'Online' ? 'bg-cyber-accent' : 'bg-red-500'
                      ]"></div>
                      <span :class="[
                        'font-cyber text-sm tracking-wider',
                        system.status === 'Online' ? 'text-cyber-accent' : 'text-red-400'
                      ]">
                        {{ system.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Admin Info -->
              <div class="mt-6 pt-6 border-t border-cyber-border">
                <h4 class="font-tech text-cyber-primary mb-3 text-sm tracking-wider">ADMIN_INFO</h4>
                <div class="space-y-2 text-xs">
                  <div class="flex justify-between">
                    <span class="text-gray-400 font-tech">USERNAME:</span>
                    <span class="text-cyber-accent font-mono">aman</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400 font-tech">ROLE:</span>
                    <span class="text-cyber-primary font-cyber">ADMINISTRATOR</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-400 font-tech">LAST_LOGIN:</span>
                    <span class="text-cyber-accent font-mono">{{ currentTime }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Grid -->
          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Recent Messages -->
            <div class="cyber-terminal p-6 border-2 border-cyber-primary/30 glow-primary">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-cyber text-cyber-primary tracking-wider">RECENT_MESSAGES</h3>
                <div class="flex items-center gap-2">
                  <button 
                    @click="fetchRecentMessages"
                    class="w-8 h-8 bg-cyber-primary/20 border border-cyber-primary rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300"
                  >
                    <RefreshCw class="w-4 h-4 text-cyber-primary" />
                  </button>
                </div>
              </div>
              
              <div class="space-y-4 max-h-80 overflow-y-auto cyber-scroll">
                <div 
                  v-for="message in recentMessages"
                  :key="message._id"
                  class="p-3 rounded-lg border border-cyber-border hover:border-cyber-accent transition-all duration-300 group cursor-pointer"
                  @click="navigateTo('/admin/contacts')"
                  @mouseenter="createParticleEffect($event)"
                >
                  <div class="flex items-start justify-between mb-2">
                    <div class="flex-1">
                      <p class="font-tech text-white text-sm">{{ message.name || 'Anonymous' }}</p>
                      <p class="font-mono text-cyber-accent text-xs truncate">{{ message.email || 'No email' }}</p>
                    </div>
                    <span :class="[
                      'px-2 py-1 rounded text-xs font-tech capitalize',
                      message.status === 'new' ? 'bg-cyber-accent/20 text-cyber-accent' : 
                      message.status === 'read' ? 'bg-cyber-primary/20 text-cyber-primary' : 'bg-gray-500/20 text-gray-400'
                    ]">
                      {{ message.status || 'new' }}
                    </span>
                  </div>
                  <p class="font-tech text-gray-300 text-sm line-clamp-2">{{ message.message || 'No message content' }}</p>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-cyber-primary font-mono text-xs">{{ formatDate(message.created_at) }}</span>
                    <Mail class="w-4 h-4 text-cyber-primary" />
                  </div>
                </div>
                
                <div v-if="recentMessages.length === 0" class="text-center py-8">
                  <Mail class="w-12 h-12 text-cyber-primary/50 mx-auto mb-2" />
                  <p class="font-tech text-gray-400 text-sm">NO_MESSAGES</p>
                </div>
              </div>
            </div>

            <!-- Recent Blog Posts -->
            <div class="cyber-terminal p-6 border-2 border-cyber-accent/30 glow-accent">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-cyber text-cyber-accent tracking-wider">RECENT_BLOG_POSTS</h3>
                <div class="flex items-center gap-2">
                  <button 
                    @click="fetchRecentBlogPosts"
                    class="w-8 h-8 bg-cyber-accent/20 border border-cyber-accent rounded-lg flex items-center justify-center hover:glow-accent transition-all duration-300"
                  >
                    <RefreshCw class="w-4 h-4 text-cyber-accent" />
                  </button>
                  <button 
                    @click="navigateTo('/admin/blog/new')"
                    class="w-8 h-8 bg-cyber-accent/20 border border-cyber-accent rounded-lg flex items-center justify-center hover:glow-accent transition-all duration-300"
                  >
                    <Plus class="w-4 h-4 text-cyber-accent" />
                  </button>
                </div>
              </div>
              
              <div class="space-y-4 max-h-80 overflow-y-auto cyber-scroll">
                <div 
                  v-for="post in recentBlogPosts"
                  :key="post._id"
                  class="p-3 rounded-lg border border-cyber-border hover:border-cyber-primary transition-all duration-300 group cursor-pointer"
                  @click="navigateTo(`/admin/blog/edit/${post._id}`)"
                  @mouseenter="createParticleEffect($event)"
                >
                  <div class="flex items-start justify-between mb-2">
                    <p class="font-tech text-white text-sm flex-1 line-clamp-1">{{ post.title || 'Untitled Post' }}</p>
                    <span :class="[
                      'px-2 py-1 rounded text-xs font-tech capitalize',
                      post.status === 'published' ? 'bg-green-500/20 text-green-400' : 
                      post.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'
                    ]">
                      {{ post.status || 'draft' }}
                    </span>
                  </div>
                  <p class="font-tech text-gray-300 text-xs line-clamp-2 mb-2">{{ post.excerpt || 'No excerpt available' }}</p>
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-cyber-primary font-mono">{{ formatDate(post.created_at) }}</span>
                    <div class="flex items-center gap-2">
                      <span class="font-tech text-gray-400">{{ post.category || 'Uncategorized' }}</span>
                      <div class="flex items-center gap-1">
                        <Eye class="w-3 h-3 text-cyber-accent" />
                        <span class="font-mono text-cyber-accent">{{ post.views || 0 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-if="recentBlogPosts.length === 0" class="text-center py-8">
                  <FileText class="w-12 h-12 text-cyber-accent/50 mx-auto mb-2" />
                  <p class="font-tech text-gray-400 text-sm mb-3">NO_BLOG_POSTS</p>
                  <button 
                    @click="navigateTo('/admin/blog/new')"
                    class="cyber-button-enhanced border-cyber-accent text-cyber-accent text-xs"
                  >
                    WRITE_FIRST_POST
                  </button>
                </div>
              </div>
            </div>

            <!-- Skills & Recent Activity -->
            <div class="cyber-terminal p-6 border-2 border-cyber-primary/30 glow-primary">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-cyber text-cyber-primary tracking-wider">TECH_SKILLS</h3>
                <button 
                  @click="navigateTo('/admin/skills')"
                  class="w-8 h-8 bg-cyber-primary/20 border border-cyber-primary rounded-lg flex items-center justify-center hover:glow-primary transition-all duration-300"
                >
                  <Code2 class="w-4 h-4 text-cyber-primary" />
                </button>
              </div>
              
              <div class="space-y-3 mb-6">
                <div 
                  v-for="skill in recentSkills"
                  :key="skill._id"
                  class="flex items-center justify-between p-3 rounded-lg border border-cyber-border hover:border-cyber-accent transition-all duration-300"
                >
                  <div class="flex items-center gap-3">
                    <Code2 class="w-5 h-5 text-cyber-primary" />
                    <span class="font-tech text-white text-sm">{{ skill.name || 'Unnamed Skill' }}</span>
                  </div>
                  <div class="w-20 bg-cyber-darker rounded-full h-2 overflow-hidden">
                    <div 
                      class="h-full rounded-full bg-gradient-to-r from-cyber-primary to-cyber-accent transition-all duration-1000"
                      :style="{ width: (skill.level || 50) + '%' }"
                    ></div>
                  </div>
                </div>
                
                <div v-if="recentSkills.length === 0" class="text-center py-4">
                  <Code2 class="w-8 h-8 text-cyber-primary/50 mx-auto mb-2" />
                  <p class="font-tech text-gray-400 text-xs">NO_SKILLS_ADDED</p>
                </div>
              </div>

              <!-- Recent Activity -->
              <div class="pt-6 border-t border-cyber-border">
                <h4 class="font-tech text-cyber-primary mb-4 text-sm tracking-wider">RECENT_ACTIVITY</h4>
                <div class="space-y-3 max-h-40 overflow-y-auto cyber-scroll">
                  <div 
                    v-for="activity in recentActivities"
                    :key="activity.id"
                    class="flex items-start gap-3 p-2 rounded-lg border border-cyber-border hover:border-cyber-primary transition-all duration-300 cursor-pointer"
                    @click="handleActivityClick(activity)"
                  >
                    <div :class="['w-8 h-8 rounded-lg flex items-center justify-center border-2', activity.bgColor, activity.borderColor]">
                      <component :is="activity.icon" class="w-4 h-4 text-cyber-primary" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-tech text-white text-xs leading-relaxed">{{ activity.message }}</p>
                      <span class="text-cyber-accent font-mono text-xs">{{ activity.time }}</span>
                    </div>
                  </div>
                  
                  <div v-if="recentActivities.length === 0" class="text-center py-4">
                    <MessageSquare class="w-6 h-6 text-cyber-primary/50 mx-auto mb-1" />
                    <p class="font-tech text-gray-400 text-xs">NO_ACTIVITIES</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Action Modal -->
    <div v-if="showQuickActionModal" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-terminal p-8 max-w-md w-full border-2 border-cyber-primary/30 glow-primary">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-accent to-cyber-primary"></div>
        
        <div class="text-center mb-6">
          <component :is="currentAction?.icon" class="w-16 h-16 text-cyber-primary mx-auto mb-4" />
          <h3 class="text-2xl font-cyber text-cyber-primary mb-2">{{ currentAction?.title }}</h3>
          <p class="text-gray-300 font-tech">{{ currentAction?.description }}</p>
        </div>

        <div class="flex gap-4">
          <button
            @click="showQuickActionModal = false"
            class="cyber-button-enhanced flex-1 border-cyber-border text-gray-400 hover:border-cyber-secondary hover:text-cyber-secondary transition-all duration-300"
          >
            CANCEL
          </button>
          <button
            @click="executeQuickAction"
            class="cyber-button-enhanced flex-1 bg-gradient-to-r from-cyber-primary to-cyber-accent text-cyber-darker font-bold tracking-wider transition-all duration-300"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminNavbar from '../../components/Admin/AdminNavbar.vue'
import { useAnimations } from '../../composables/useAnimations'
import { 
  Folder, 
  Code2, 
  Mail, 
  Plus,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertTriangle,
  FileText,
  MessageSquare,
  Eye
} from 'lucide-vue-next'

const router = useRouter()
const { createParticleEffect, createQuantumEffect } = useAnimations()

// API Configuration
const BASE_URL = 'http://127.0.0.1:8000/api/v1/admin'

// Reactive state
const currentTime = ref('')
const refreshingActivities = ref(false)
const showQuickActionModal = ref(false)
const currentAction = ref(null)
const isLoading = ref(true)
const error = ref(null)
const securityContext = ref(null)

// Data states
const stats = ref([])
const recentProjects = ref([])
const recentMessages = ref([])
const recentBlogPosts = ref([])
const recentSkills = ref([])
const recentActivities = ref([])

// System status
const systemStatus = ref([
  { name: 'API_SERVER', status: 'Online' },
  { name: 'DATABASE', status: 'Online' },
  { name: 'FILE_STORAGE', status: 'Online' },
  { name: 'AUTH_SYSTEM', status: 'Online' }
])

// Quick actions
const quickActions = ref([
  {
    label: 'ADD_PROJECT',
    action: 'add-project',
    icon: Folder
  },
  {
    label: 'WRITE_BLOG',
    action: 'write-blog',
    icon: FileText
  },
  {
    label: 'VIEW_MESSAGES',
    action: 'view-messages',
    icon: Mail
  },
  {
    label: 'MANAGE_SKILLS',
    action: 'manage-skills',
    icon: Code2
  }
])

// Quick action definitions
const quickActionDefinitions = {
  'add-project': {
    title: 'CREATE_NEW_PROJECT',
    description: 'ADD_A_NEW_PROJECT_TO_YOUR_PORTFOLIO',
    icon: Folder,
    execute: () => router.push('/admin/projects/new')
  },
  'write-blog': {
    title: 'WRITE_BLOG_POST',
    description: 'CREATE_A_NEW_BLOG_POST',
    icon: FileText,
    execute: () => router.push('/admin/blog/new')
  },
  'view-messages': {
    title: 'VIEW_CONTACT_MESSAGES',
    description: 'CHECK_NEW_CONTACT_FORM_SUBMISSIONS',
    icon: Mail,
    execute: () => router.push('/admin/contacts')
  },
  'manage-skills': {
    title: 'MANAGE_TECH_SKILLS',
    description: 'UPDATE_YOUR_TECHNICAL_SKILLS_LIST',
    icon: Code2,
    execute: () => router.push('/admin/skills')
  }
}

// 🔐 ENHANCED AUTHENTICATION FUNCTIONS
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken')
  
  if (!token) {
    console.error('❌ No authentication token found')
    handleAuthError()
    return {}
  }

  // Check if token is expired
  const expiry = localStorage.getItem('tokenExpiry')
  if (expiry && new Date().getTime() > parseInt(expiry)) {
    console.error('❌ Token expired')
    handleAuthError()
    return {}
  }

  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Client-Type': 'cyber-admin-panel',
    'X-Security-Level': localStorage.getItem('securityLevel') || 'MAXIMUM'
  }
}

const handleAuthError = () => {
  // Clear all auth data
  localStorage.removeItem('authToken')
  localStorage.removeItem('tokenExpiry')
  localStorage.removeItem('adminUser')
  localStorage.removeItem('adminUsername')
  localStorage.removeItem('sessionId')
  localStorage.removeItem('securityLevel')
  localStorage.removeItem('lastLogin')
  
  // Redirect to login
  router.push('/admin/login')
}

const validateAuth = () => {
  const token = localStorage.getItem('authToken')
  const expiry = localStorage.getItem('tokenExpiry')
  
  if (!token || !expiry) {
    return false
  }
  
  if (new Date().getTime() > parseInt(expiry)) {
    handleAuthError()
    return false
  }
  
  return true
}

// Animation styles
const hologramStyle = (index) => {
  const size = Math.random() * 100 + 50
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
    left: `${(index / 8) * 100}%`,
    animationDelay: `${index * 0.3}s`,
    animationDuration: `${Math.random() * 8 + 12}s`
  }
}

const orbStyle = (index) => {
  const sizes = [120, 80, 160]
  return {
    width: `${sizes[index]}px`,
    height: `${sizes[index]}px`,
    animationDelay: `${index * 2}s`
  }
}

// Methods
const activateStatCard = (event) => {
  createParticleEffect(event)
}

const navigateTo = (route) => {
  router.push(route)
}

const handleQuickAction = (action) => {
  currentAction.value = quickActionDefinitions[action]
  showQuickActionModal.value = true
  createQuantumEffect()
}

const executeQuickAction = () => {
  if (currentAction.value) {
    currentAction.value.execute()
  }
  showQuickActionModal.value = false
}

const refreshActivities = async () => {
  refreshingActivities.value = true
  await fetchDashboardData()
  refreshingActivities.value = false
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: 300 }, '#00ff88')
}

const handleActivityClick = (activity) => {
  const routeMap = {
    PROJECT: '/admin/projects',
    MESSAGE: '/admin/contacts',
    SKILL: '/admin/skills',
    BLOG: '/admin/blog'
  }
  router.push(routeMap[activity.type] || '/admin/dashboard')
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}

// 🔐 ENHANCED API FUNCTIONS
const fetchDashboardData = async () => {
  try {
    // Validate authentication first
    if (!validateAuth()) {
      return
    }

    isLoading.value = true
    error.value = null
    
    const headers = getAuthHeaders()
    if (Object.keys(headers).length === 0) {
      return
    }

    const response = await fetch(`${BASE_URL}/dashboard`, {
      method: 'GET',
      headers: headers,
      credentials: 'include'
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please login again.')
      } else if (response.status === 403) {
        throw new Error('Access forbidden. Insufficient permissions.')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.success) {
      stats.value = data.data.stats || []
      recentActivities.value = data.data.recentActivities || []
      securityContext.value = data.data.security_context || {}
      
      console.log('🔐 Security Context:', securityContext.value)
      
      // Fetch additional data
      await Promise.all([
        fetchRecentProjects(),
        fetchRecentMessages(),
        fetchRecentBlogPosts(),
        fetchRecentSkills()
      ])
    } else {
      throw new Error(data.message || 'Failed to fetch dashboard data')
    }
    
  } catch (err) {
    console.error('Failed to fetch dashboard data:', err)
    error.value = err.message
    
    if (err.message.includes('Authentication') || err.message.includes('401')) {
      handleAuthError()
    }
    
    // Set fallback data
    stats.value = []
    recentActivities.value = []
    recentProjects.value = []
    recentMessages.value = []
    recentBlogPosts.value = []
    recentSkills.value = []
  } finally {
    isLoading.value = false
  }
}

const fetchRecentProjects = async () => {
  try {
    const headers = getAuthHeaders()
    if (Object.keys(headers).length === 0) return

    const response = await fetch(`${BASE_URL}/projects?limit=5`, {
      headers: headers
    })

    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        recentProjects.value = data.data.projects || []
      }
    } else if (response.status === 401) {
      handleAuthError()
    }
  } catch (err) {
    console.error('Failed to fetch recent projects:', err)
  }
}

const fetchRecentMessages = async () => {
  try {
    const headers = getAuthHeaders()
    if (Object.keys(headers).length === 0) return

    const response = await fetch(`${BASE_URL}/contacts?limit=5`, {
      headers: headers
    })

    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        recentMessages.value = data.data.contacts || []
      }
    } else if (response.status === 401) {
      handleAuthError()
    }
  } catch (err) {
    console.error('Failed to fetch recent messages:', err)
  }
}

const fetchRecentBlogPosts = async () => {
  try {
    const headers = getAuthHeaders()
    if (Object.keys(headers).length === 0) return

    const response = await fetch(`${BASE_URL}/blog?limit=5`, {
      headers: headers
    })

    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        recentBlogPosts.value = data.data.posts || []
      }
    } else if (response.status === 401) {
      handleAuthError()
    }
  } catch (err) {
    console.error('Failed to fetch recent blog posts:', err)
  }
}

const fetchRecentSkills = async () => {
  try {
    const headers = getAuthHeaders()
    if (Object.keys(headers).length === 0) return

    const response = await fetch(`${BASE_URL}/skills?limit=5`, {
      headers: headers
    })

    if (response.ok) {
      const data = await response.json()
      if (data.success) {
        recentSkills.value = data.data.skills || []
      }
    } else if (response.status === 401) {
      handleAuthError()
    }
  } catch (err) {
    console.error('Failed to fetch recent skills:', err)
  }
}

// Security functions
const getSecurityStatus = () => {
  const token = localStorage.getItem('authToken')
  const expiry = localStorage.getItem('tokenExpiry')
  const securityLevel = localStorage.getItem('securityLevel')
  
  if (!token) return 'UNAUTHENTICATED'
  if (expiry && new Date().getTime() > parseInt(expiry)) return 'EXPIRED'
  
  return securityLevel || 'SECURE'
}

const logout = async () => {
  try {
    const headers = getAuthHeaders()
    if (Object.keys(headers).length > 0) {
      await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: headers
      })
    }
  } catch (err) {
    console.error('Logout API call failed:', err)
  } finally {
    handleAuthError() // This will clear localStorage and redirect
  }
}

// Update current time
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) + ' UTC'
}

// Debug function
const debugAuth = () => {
  console.group('🔐 DASHBOARD AUTH DEBUG')
  console.log('Token:', localStorage.getItem('authToken') ? '✅ Present' : '❌ Missing')
  console.log('Expiry:', localStorage.getItem('tokenExpiry') ? new Date(parseInt(localStorage.getItem('tokenExpiry'))).toLocaleString() : 'None')
  console.log('Username:', localStorage.getItem('adminUsername') || 'None')
  console.log('Security Level:', localStorage.getItem('securityLevel') || 'None')
  console.log('Session ID:', localStorage.getItem('sessionId') || 'None')
  console.log('Auth Valid:', validateAuth())
  console.groupEnd()
}

// Lifecycle
let timeInterval

onMounted(() => {
  // Validate authentication on mount
  if (!validateAuth()) {
    return
  }
  
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  fetchDashboardData()
  
  // Debug in development
  if (process.env.NODE_ENV === 'development') {
    debugAuth()
  }
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
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
  filter: blur(25px);
  animation: float 8s ease-in-out infinite;
}

.data-streams .data-stream {
  @apply absolute w-px h-32 bg-gradient-to-b from-cyber-primary/0 via-cyber-accent to-cyber-primary/0;
  animation: dataFlow 15s linear infinite;
}

.pulse-orbs .pulse-orb {
  @apply absolute rounded-full bg-cyber-accent/5;
  filter: blur(40px);
  animation: pulse 6s ease-in-out infinite;
}

.cyber-button-enhanced {
  @apply bg-cyber-dark border-2 border-cyber-primary text-cyber-primary px-4 py-2 rounded-xl font-tech transition-all duration-300 hover:transform hover:scale-105 text-sm;
}

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

.glow-red {
  box-shadow: 
    0 0 20px rgba(255, 0, 0, 0.3),
    inset 0 0 20px rgba(255, 0, 0, 0.1);
}

.matrix-text {
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: matrixShift 3s ease-in-out infinite;
}

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

@keyframes pulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.5;
  }
  50% { 
    transform: scale(1.2);
    opacity: 0.8;
  }
}

@keyframes matrixShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.cyber-scroll {
  scrollbar-width: thin;
  scrollbar-color: #00f0ff #11111f;
}

.cyber-scroll::-webkit-scrollbar {
  width: 6px;
}

.cyber-scroll::-webkit-scrollbar-track {
  background: #11111f;
  border-radius: 3px;
}

.cyber-scroll::-webkit-scrollbar-thumb {
  background: #00f0ff;
  border-radius: 3px;
}

.cyber-scroll::-webkit-scrollbar-thumb:hover {
  background: #ff00ff;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .matrix-text {
    font-size: 3rem;
  }
  
  .cyber-terminal {
    padding: 1.5rem;
  }
}
</style>