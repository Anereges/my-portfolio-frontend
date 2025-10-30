<template>
  <nav class="fixed top-0 w-full z-50 bg-cyber-dark/95 backdrop-blur-md border-b border-cyber-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo & Brand -->
        <div class="flex items-center space-x-4">
          <router-link 
            to="/admin/dashboard" 
            class="flex items-center space-x-3 group"
            @mouseenter="createParticleEffect($event)"
          >
            <!-- Animated Shield Logo -->
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-br from-cyber-primary to-cyber-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield class="w-6 h-6 text-cyber-darker" />
              </div>
              <!-- Pulsing Ring -->
              <div class="absolute inset-0 border-2 border-cyber-primary rounded-lg opacity-0 group-hover:opacity-100 animate-ping"></div>
            </div>
            
            <div class="flex flex-col">
              <span class="text-xl font-cyber font-bold cyber-text group-hover:glow-text transition-all">
                CYBER_ADMIN
              </span>
              <span class="text-xs font-tech text-cyber-accent flex items-center gap-1">
                <div class="w-1.5 h-1.5 bg-cyber-accent rounded-full animate-pulse"></div>
                SYSTEM_CONTROL
              </span>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            :class="[
              'admin-nav-link group relative px-4 py-2 rounded-lg transition-all duration-300',
              isActiveRoute(item.path) ? 'active glow-primary' : ''
            ]"
            @mouseenter="createNavHoverEffect($event, item)"
          >
            <div class="flex items-center gap-2">
              <!-- Animated Icon -->
              <div class="relative">
                <component :is="item.icon" class="w-4 h-4 transition-all duration-300" 
                  :class="isActiveRoute(item.path) ? 'text-cyber-accent scale-110' : 'text-gray-400'" />
                <!-- Icon Glow -->
                <div v-if="isActiveRoute(item.path)" class="absolute inset-0 bg-cyber-accent/20 rounded-full blur-sm"></div>
              </div>
              
              <span class="font-tech tracking-wider">{{ item.name }}</span>
            </div>
            
            <!-- Active Indicator Bar -->
            <div v-if="isActiveRoute(item.path)" class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-cyber-primary to-cyber-accent rounded-full"></div>
            
            <!-- Hover Effect Layer -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary/5 to-cyber-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Data Stream Effect -->
            <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"></div>
          </router-link>
        </div>

        <!-- Admin Controls -->
        <div class="flex items-center space-x-3">
          <!-- Quick Actions -->
          <div class="hidden lg:flex items-center gap-2 mr-4">
            <button
              @click="quickAction('refresh')"
              class="w-8 h-8 rounded-lg border border-cyber-border hover:border-cyber-primary hover:bg-cyber-primary/10 flex items-center justify-center transition-all duration-300 group"
              @mouseenter="createParticleEffect($event)"
              :disabled="refreshing"
            >
              <RefreshCw class="w-4 h-4 text-gray-400 group-hover:text-cyber-primary transition-colors" 
                :class="{ 'animate-spin': refreshing }" />
            </button>
            
            <button
              @click="quickAction('terminal')"
              class="w-8 h-8 rounded-lg border border-cyber-border hover:border-cyber-accent hover:bg-cyber-accent/10 flex items-center justify-center transition-all duration-300 group"
              @mouseenter="createParticleEffect($event)"
            >
              <Code2 class="w-4 h-4 text-gray-400 group-hover:text-cyber-accent transition-colors" />
            </button>
          </div>

          <!-- Notifications -->
          <div class="relative" ref="notificationsRef">
            <button
              @click="toggleNotifications"
              class="w-10 h-10 rounded-lg border border-cyber-border hover:border-cyber-primary hover:bg-cyber-primary/10 flex items-center justify-center transition-all duration-300 relative group"
              @mouseenter="createParticleEffect($event)"
            >
              <Bell class="w-5 h-5 text-gray-400 group-hover:text-cyber-primary transition-colors" />
              
              <!-- Notification Badge with Cyber Effect -->
              <div v-if="unreadNotifications > 0" class="absolute -top-1 -right-1">
                <div class="relative">
                  <div class="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                    <span class="text-xs font-cyber text-white">{{ unreadNotifications }}</span>
                  </div>
                  <!-- Glow Effect -->
                  <div class="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </button>

            <!-- Enhanced Notifications Dropdown -->
            <transition name="cyber-dropdown">
              <div v-if="showNotifications" class="absolute right-0 mt-2 w-96 cyber-terminal border-2 border-cyber-primary/30 glow-primary shadow-2xl z-50">
                <!-- Terminal Header -->
                <div class="p-4 border-b border-cyber-border bg-cyber-dark/80">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
                      <h3 class="font-cyber text-cyber-primary text-lg">SYSTEM_ALERTS</h3>
                    </div>
                    <div class="flex gap-2">
                      <button 
                        v-if="unreadNotifications > 0"
                        @click="markAllAsRead" 
                        class="px-3 py-1 bg-cyber-primary/20 border border-cyber-primary text-cyber-primary rounded text-xs font-tech hover:glow-primary transition-all"
                        @mouseenter="createParticleEffect($event)"
                      >
                        CLEAR_ALL
                      </button>
                      <button 
                        @click="refreshNotifications" 
                        class="w-6 h-6 bg-cyber-primary/20 border border-cyber-primary rounded flex items-center justify-center hover:glow-primary transition-all"
                        :disabled="notificationsLoading"
                        @mouseenter="createParticleEffect($event)"
                      >
                        <RefreshCw class="w-3 h-3 text-cyber-primary" :class="{'animate-spin': notificationsLoading}" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Notifications Content -->
                <div class="max-h-80 overflow-y-auto cyber-scroll">
                  <div 
                    v-for="notification in notifications"
                    :key="notification.id"
                    :class="[
                      'p-4 border-b border-cyber-border/30 transition-all duration-300 cursor-pointer group',
                      notification.read ? 'bg-cyber-card/30' : 'bg-cyber-primary/5 border-l-4 border-l-cyber-primary'
                    ]"
                    @click="handleNotificationClick(notification)"
                  >
                    <div class="flex items-start gap-3">
                      <!-- Notification Icon with Status -->
                      <div :class="[
                        'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border-2 transition-all duration-300',
                        notification.type === 'success' ? 'bg-cyber-accent/20 border-cyber-accent/50 group-hover:border-cyber-accent' : 
                        notification.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/50 group-hover:border-yellow-500' : 
                        notification.type === 'error' ? 'bg-red-500/20 border-red-500/50 group-hover:border-red-500' : 
                        'bg-cyber-primary/20 border-cyber-primary/50 group-hover:border-cyber-primary'
                      ]">
                        <component 
                          :is="getNotificationIcon(notification.type)" 
                          :class="[
                            'w-4 h-4 transition-all duration-300',
                            notification.type === 'success' ? 'text-cyber-accent' : 
                            notification.type === 'warning' ? 'text-yellow-400' : 
                            notification.type === 'error' ? 'text-red-400' : 'text-cyber-primary'
                          ]" 
                        />
                      </div>
                      
                      <!-- Notification Content -->
                      <div class="flex-1 min-w-0">
                        <p class="font-tech text-white text-sm leading-relaxed">{{ notification.message }}</p>
                        <div class="flex items-center gap-3 mt-2">
                          <span class="text-gray-400 text-xs font-mono">{{ formatTime(notification.created_at) }}</span>
                          <span :class="[
                            'px-2 py-0.5 rounded text-xs font-tech',
                            notification.type === 'success' ? 'bg-cyber-accent/20 text-cyber-accent' : 
                            notification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : 
                            notification.type === 'error' ? 'bg-red-500/20 text-red-400' : 
                            'bg-cyber-primary/20 text-cyber-primary'
                          ]">
                            {{ notification.type.toUpperCase() }}
                          </span>
                        </div>
                      </div>
                      
                      <!-- Unread Indicator -->
                      <div v-if="!notification.read" class="flex flex-col items-center gap-1">
                        <div class="w-2 h-2 bg-cyber-accent rounded-full animate-pulse"></div>
                        <div class="text-cyber-accent text-xs font-mono">NEW</div>
                      </div>
                    </div>
                  </div>

                  <!-- Loading State -->
                  <div v-if="notificationsLoading" class="p-8 text-center">
                    <div class="cyber-loader mx-auto mb-3"></div>
                    <p class="text-cyber-primary font-tech text-sm">LOADING_ALERTS...</p>
                  </div>

                  <!-- Empty State -->
                  <div v-if="!notificationsLoading && notifications.length === 0" class="p-8 text-center">
                    <Bell class="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p class="text-gray-400 font-tech text-sm">NO_ACTIVE_ALERTS</p>
                    <p class="text-gray-500 text-xs font-tech mt-1">SYSTEM_STATUS: NOMINAL</p>
                  </div>
                </div>
                
                <!-- Terminal Footer -->
                <div class="p-3 bg-cyber-dark/50 border-t border-cyber-border">
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-cyber-primary font-mono">TOTAL_ALERTS: {{ notifications.length }}</span>
                    <span class="text-cyber-accent font-mono">UNREAD: {{ unreadNotifications }}</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Enhanced Admin Profile -->
          <div class="relative" ref="userMenuRef">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-3 p-2 rounded-lg border border-cyber-border hover:border-cyber-primary hover:bg-cyber-primary/10 transition-all duration-300 group"
              @mouseenter="createParticleEffect($event)"
            >
              <!-- Avatar with Enhanced Status -->
              <div class="relative">
                <div class="w-8 h-8 bg-gradient-to-br from-cyber-primary to-cyber-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User class="w-4 h-4 text-cyber-darker" />
                </div>
                <!-- Online Status with Glow -->
                <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-cyber-accent rounded-full border-2 border-cyber-dark">
                  <div class="w-full h-full bg-cyber-accent rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              
              <div class="hidden md:block text-left">
                <p class="font-tech text-white text-sm tracking-wider">{{ userData.name || 'SYSTEM_ADMIN' }}</p>
                <p class="text-cyber-accent font-cyber text-xs">{{ userData.role || 'ROOT_ACCESS' }}</p>
              </div>
              
              <ChevronDown class="w-4 h-4 text-gray-400 group-hover:text-cyber-primary transition-colors transform transition-transform duration-300"
                :class="{ 'rotate-180': showUserMenu }" />
            </button>

            <!-- Enhanced User Menu Dropdown -->
            <transition name="cyber-dropdown">
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-64 cyber-terminal border-2 border-cyber-accent/30 glow-accent shadow-2xl z-50">
                <!-- User Header -->
                <div class="p-4 border-b border-cyber-border bg-gradient-to-r from-cyber-primary/10 to-cyber-accent/10">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-cyber-primary to-cyber-accent rounded-full flex items-center justify-center">
                      <User class="w-5 h-5 text-cyber-darker" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-tech text-white text-sm truncate">{{ userData.name || 'SYSTEM_ADMIN' }}</p>
                      <p class="text-cyber-accent font-mono text-xs truncate">{{ userData.email || 'admin@cyber.system' }}</p>
                      <div class="flex items-center gap-2 mt-1">
                        <div class="w-2 h-2 bg-cyber-accent rounded-full animate-pulse"></div>
                        <span class="text-cyber-primary text-xs font-tech">ONLINE</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- User Actions -->
                <div class="p-2 space-y-1">
                  <button
                    v-for="item in userMenuItems"
                    :key="item.label"
                    @click="handleUserMenuClick(item.action)"
                    class="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 text-left group"
                    :class="item.action === 'logout' ? 'hover:bg-red-500/10 border border-transparent hover:border-red-500/30' : 'hover:bg-cyber-primary/10'"
                    :disabled="item.action === 'logout' && logoutLoading"
                  >
                    <div class="relative">
                      <component 
                        :is="item.icon" 
                        class="w-4 h-4 transition-all duration-300"
                        :class="item.action === 'logout' ? 'text-red-400 group-hover:text-red-300' : 'text-gray-400 group-hover:text-cyber-primary'" 
                      />
                      <div class="absolute inset-0 bg-current opacity-0 group-hover:opacity-20 rounded blur-sm transition-opacity duration-300"></div>
                    </div>
                    <span class="font-tech text-white text-sm flex-1">{{ item.label }}</span>
                    
                    <!-- Loading Indicator for Logout -->
                    <div v-if="item.action === 'logout' && logoutLoading" class="cyber-loader-small"></div>
                    <div v-else class="w-2 h-2 bg-cyber-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
                
                <!-- System Status -->
                <div class="p-3 border-t border-cyber-border bg-cyber-dark/50">
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-cyber-primary font-mono">SESSION_ACTIVE</span>
                    <span class="text-green-400 font-mono flex items-center gap-1">
                      <div class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      SECURE
                    </span>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Enhanced Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden w-10 h-10 rounded-lg border border-cyber-border hover:border-cyber-primary hover:bg-cyber-primary/10 flex items-center justify-center transition-all duration-300 relative group"
            @mouseenter="createParticleEffect($event)"
          >
            <Menu v-if="!mobileMenuOpen" class="w-5 h-5 text-gray-400 group-hover:text-cyber-primary transition-colors" />
            <X v-else class="w-5 h-5 text-cyber-primary" />
            
            <!-- Mobile Menu Indicator -->
            <div v-if="mobileMenuOpen" class="absolute -top-1 -right-1 w-3 h-3 bg-cyber-accent rounded-full animate-pulse"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Mobile Menu -->
    <transition name="cyber-slide">
      <div
        v-if="mobileMenuOpen"
        class="md:hidden absolute top-16 left-0 w-full bg-cyber-dark border-b border-cyber-border cyber-terminal z-50"
      >
        <div class="p-4 space-y-2">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 border-2',
              isActiveRoute(item.path) 
                ? 'bg-cyber-primary/20 border-cyber-primary text-cyber-primary glow-primary' 
                : 'border-cyber-border text-gray-300 hover:border-cyber-primary hover:text-cyber-primary'
            ]"
            @click="mobileMenuOpen = false"
            @mouseenter="createParticleEffect($event)"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="font-tech tracking-wider">{{ item.name }}</span>
            <div v-if="isActiveRoute(item.path)" class="w-2 h-2 bg-cyber-accent rounded-full ml-auto animate-pulse"></div>
          </router-link>
          
          <!-- Mobile User Section -->
          <div class="pt-4 mt-4 border-t border-cyber-border">
            <div class="flex items-center gap-3 px-4 py-3 mb-3">
              <div class="w-10 h-10 bg-gradient-to-br from-cyber-primary to-cyber-accent rounded-full flex items-center justify-center">
                <User class="w-5 h-5 text-cyber-darker" />
              </div>
              <div>
                <p class="font-tech text-white text-sm">{{ userData.name || 'SYSTEM_ADMIN' }}</p>
                <p class="text-cyber-accent font-cyber text-xs">{{ userData.role || 'ROOT_ACCESS' }}</p>
              </div>
            </div>
            
            <div class="space-y-1">
              <button
                v-for="item in userMenuItems"
                :key="item.label"
                @click="handleUserMenuClick(item.action)"
                :class="[
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left border-2',
                  item.action === 'logout' 
                    ? 'border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500' 
                    : 'border-cyber-border text-gray-300 hover:border-cyber-primary hover:text-cyber-primary'
                ]"
                :disabled="item.action === 'logout' && logoutLoading"
              >
                <component :is="item.icon" class="w-4 h-4" />
                <span class="font-tech text-sm">{{ item.label }}</span>
                <div v-if="item.action === 'logout' && logoutLoading" class="cyber-loader-small ml-auto"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Enhanced Security Status Bar -->
    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-secondary">
      <div class="h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutConfirm" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div class="cyber-terminal p-8 max-w-md w-full border-2 border-red-500/50 glow-error">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400"></div>
        
        <div class="text-center mb-6">
          <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 class="font-cyber text-green-400 text-2xl mb-2 tracking-wider">CONFIRM_LOGOUT</h3>
          <p class="text-gray-300 font-tech mb-2">
            TERMINATE admin session for 
            <span class="text-red-400 font-mono">{{ userData.name || 'SYSTEM_ADMIN' }}</span>?
          </p>
          <p class="text-black-400 text-sm font-mono">
            ALL_UNSAVED_CHANGES_WILL_BE_LOST
          </p>
        </div>

        <div class="flex gap-4">
          <button
            @click="showLogoutConfirm = false"
            class="cyber-button-enhanced flex-1 border-cyber-border text-gray-400 hover:border-cyber-primary hover:text-cyber-primary transition-all duration-300"
            @mouseenter="createParticleEffect($event)"
          >
            <span class="font-tech tracking-wider">CANCEL</span>
          </button>
          <button
            @click="confirmLogout"
            class="cyber-button-enhanced flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:glow-error transition-all duration-300"
            :disabled="logoutLoading"
          >
            <span v-if="logoutLoading" class="flex items-center gap-2 justify-center">
              <div class="cyber-loader-small-white"></div>
              <span class="font-tech tracking-wider">LOGGING_OUT...</span>
            </span>
            <span v-else class="font-tech tracking-wider">CONFIRM_LOGOUT</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAnimations } from '../../composables/useAnimations'
import { 
  Shield, 
  LayoutDashboard, 
  Folder, 
  Code2, 
  Mail, 
  Settings, 
  Bell, 
  User, 
  ChevronDown, 
  Menu, 
  X,
  LogOut,
  UserCog,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  RefreshCw,
  AlertCircle,
  FileText,
  Database,
  Cpu,
  Terminal
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const { createParticleEffect, createQuantumEffect } = useAnimations()

// Refs for click outside detection
const notificationsRef = ref(null)
const userMenuRef = ref(null)

// Reactive state
const mobileMenuOpen = ref(false)
const showUserMenu = ref(false)
const showNotifications = ref(false)
const showLogoutConfirm = ref(false)
const notificationsLoading = ref(false)
const logoutLoading = ref(false)
const refreshing = ref(false)

// User data
const userData = ref({
  name: 'ADMIN',
  email: 'admin@system.com',
  role: 'ADMINISTRATOR'
})

// Enhanced Navigation items with better icons and descriptions
const navItems = [
  { 
    name: 'DASHBOARD', 
    path: '/admin/dashboard', 
    icon: LayoutDashboard,
    description: 'SYSTEM_OVERVIEW'
  },
  { 
    name: 'PROJECTS', 
    path: '/admin/projects', 
    icon: Folder,
    description: 'PORTFOLIO_OPS'
  },
  { 
    name: 'SKILLS', 
    path: '/admin/skills', 
    icon: Cpu,
    description: 'TECH_STACK'
  },
  { 
    name: 'MESSAGES', 
    path: '/admin/contacts', 
    icon: Mail,
    description: 'COMMUNICATIONS'
  },
  { 
    name: 'BLOG', 
    path: '/admin/blog', 
    icon: FileText,
    description: 'CONTENT_CORE'
  }
]

// Enhanced User menu items
const userMenuItems = [
  { label: 'PROFILE_SETTINGS', action: 'profile', icon: UserCog },
  { label: 'SYSTEM_HELP', action: 'help', icon: HelpCircle },
  { label: 'TERMINAL_ACCESS', action: 'terminal', icon: Terminal },
  { label: 'LOGOUT_SYSTEM', action: 'logout', icon: LogOut }
]

// Enhanced Notifications data
const notifications = ref([])

// Computed properties
const unreadNotifications = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const isActiveRoute = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// API Base URL
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/v1/admin'

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

// Enhanced notification system
const getNotificationIcon = (type) => {
  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
    info: Info,
    security: Shield,
    system: Cpu
  }
  return icons[type] || Info
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'JUST_NOW'
  if (diffMins < 60) return `${diffMins}M_AGO`
  if (diffHours < 24) return `${diffHours}H_AGO`
  if (diffDays < 7) return `${diffDays}D_AGO`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
}

// 🔐 ENHANCED API FUNCTIONS WITH JWT AUTH
const fetchNotifications = async () => {
  notificationsLoading.value = true
  try {
    // Validate authentication first
    if (!validateAuth()) {
      return
    }

    const headers = getAuthHeaders()
    if (Object.keys(headers).length === 0) {
      return
    }

    const response = await fetch(`${API_BASE}/notifications`, {
      headers: headers
    })

    if (response.ok) {
      const data = await response.json()
      notifications.value = data.data?.notifications || data.notifications || []
    } else if (response.status === 401) {
      handleAuthError()
    } else {
      throw new Error('Failed to fetch notifications')
    }
  } catch (error) {
    console.error('Error fetching notifications:', error)
    // Fallback to empty array instead of demo data
    notifications.value = []
  } finally {
    notificationsLoading.value = false
  }
}

// Enhanced notification handlers
const markNotificationAsRead = async (notificationId) => {
  try {
    const headers = getAuthHeaders()
    if (Object.keys(headers).length === 0) return

    const response = await fetch(`${API_BASE}/notifications/${notificationId}/read`, {
      method: 'POST',
      headers: headers
    })

    if (!response.ok) {
      if (response.status === 401) {
        handleAuthError()
      } else {
        throw new Error('Failed to mark notification as read')
      }
    }
  } catch (error) {
    console.error('Error marking notification as read:', error)
  }
}

const markAllAsRead = async () => {
  try {
    const headers = getAuthHeaders()
    if (Object.keys(headers).length === 0) return

    const response = await fetch(`${API_BASE}/notifications/read-all`, {
      method: 'POST',
      headers: headers
    })

    if (response.ok) {
      notifications.value.forEach(notification => {
        notification.read = true
      })
      createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00ff88')
    } else if (response.status === 401) {
      handleAuthError()
    }
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
  }
}

const refreshNotifications = async () => {
  await fetchNotifications()
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00f0ff')
}

// 🔐 ENHANCED USER DATA FETCHING
const fetchUserData = async () => {
  try {
    // Validate authentication first
    if (!validateAuth()) {
      return
    }

    const headers = getAuthHeaders()
    if (Object.keys(headers).length === 0) {
      return
    }

    const response = await fetch(`${API_BASE}/profile`, {
      headers: headers
    })

    if (response.ok) {
      const data = await response.json()
      userData.value = data.data || data.user || userData.value
      
      // Update from localStorage if available
      const storedUser = localStorage.getItem('adminUser')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        userData.value.name = parsedUser.username || 'ADMIN'
        userData.value.role = 'ADMINISTRATOR'
      }
    } else if (response.status === 401) {
      handleAuthError()
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

// Enhanced navigation effects
const createNavHoverEffect = (event, item) => {
  createParticleEffect(event)
}

// Toggle functions
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    showUserMenu.value = false
    showNotifications.value = false
  }
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
  if (showNotifications.value) {
    fetchNotifications()
  }
}

// Enhanced notification click handler
const handleNotificationClick = async (notification) => {
  if (!notification.read) {
    notification.read = true
    await markNotificationAsRead(notification.id)
  }

  const navigationMap = {
    security: '/admin/contacts',
    warning: '/admin/settings',
    success: '/admin/projects',
    system: '/admin/dashboard',
    info: '/admin/database'
  }

  router.push(navigationMap[notification.type] || '/admin/dashboard')
  showNotifications.value = false
}

// Enhanced user menu handlers
const handleUserMenuClick = async (action) => {
  switch (action) {
    case 'profile':
      router.push('/admin/profile')
      break
    case 'help':
      router.push('/admin/help')
      break
    case 'terminal':
      router.push('/admin/terminal')
      break
    case 'logout':
      showLogoutConfirm.value = true
      break
  }
  showUserMenu.value = false
  mobileMenuOpen.value = false
}

// Quick actions handler
const quickAction = (action) => {
  switch (action) {
    case 'refresh':
      refreshing.value = true
      window.dispatchEvent(new CustomEvent('admin-refresh'))
      setTimeout(() => refreshing.value = false, 1000)
      createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00f0ff')
      break
    case 'terminal':
      router.push('/admin/terminal')
      break
  }
}

// 🔐 ENHANCED LOGOUT HANDLER
const confirmLogout = async () => {
  logoutLoading.value = true
  try {
    const headers = getAuthHeaders()
    
    // Try to call logout API, but proceed even if it fails
    if (Object.keys(headers).length > 0) {
      try {
        const response = await fetch(`${API_BASE}/logout`, {
          method: 'POST',
          headers: headers
        })

        if (response.ok) {
          console.log('🔐 Logout API call successful')
        } else {
          console.log('⚠️ Logout API call failed, proceeding with client-side cleanup')
        }
      } catch (apiError) {
        console.log('⚠️ Logout API call failed, proceeding with client-side cleanup:', apiError)
      }
    }

    // Always clear client-side data
    localStorage.removeItem('authToken')
    localStorage.removeItem('tokenExpiry')
    localStorage.removeItem('adminUser')
    localStorage.removeItem('adminUsername')
    localStorage.removeItem('sessionId')
    localStorage.removeItem('securityLevel')
    localStorage.removeItem('lastLogin')
    
    // Clear session storage
    sessionStorage.clear()
    
    // Create enhanced logout effect
    createQuantumEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 })
    
    // Redirect to login
    setTimeout(() => {
      router.push({
        path: '/admin/login',
        query: { 
          logout: 'success',
          message: 'SESSION_TERMINATED_SUCCESSFULLY'
        }
      })
    }, 1000)
  } catch (error) {
    console.error('Logout error:', error)
    // Even if something fails, clear local storage and redirect
    localStorage.removeItem('authToken')
    localStorage.removeItem('tokenExpiry')
    localStorage.removeItem('adminUser')
    localStorage.removeItem('adminUsername')
    localStorage.removeItem('sessionId')
    localStorage.removeItem('securityLevel')
    localStorage.removeItem('lastLogin')
    sessionStorage.clear()
    router.push('/admin/login')
  } finally {
    logoutLoading.value = false
    showLogoutConfirm.value = false
  }
}

const cancelLogout = () => {
  showLogoutConfirm.value = false
}

// Security status function
const getSecurityStatus = () => {
  const token = localStorage.getItem('authToken')
  const expiry = localStorage.getItem('tokenExpiry')
  const securityLevel = localStorage.getItem('securityLevel')
  
  if (!token) return 'UNAUTHENTICATED'
  if (expiry && new Date().getTime() > parseInt(expiry)) return 'EXPIRED'
  
  return securityLevel || 'SECURE'
}

// Debug function
const debugAuth = () => {
  console.group('🔐 NAVBAR AUTH DEBUG')
  console.log('Token:', localStorage.getItem('authToken') ? '✅ Present' : '❌ Missing')
  console.log('Expiry:', localStorage.getItem('tokenExpiry') ? new Date(parseInt(localStorage.getItem('tokenExpiry'))).toLocaleString() : 'None')
  console.log('Username:', localStorage.getItem('adminUsername') || 'None')
  console.log('Security Level:', localStorage.getItem('securityLevel') || 'None')
  console.log('Session ID:', localStorage.getItem('sessionId') || 'None')
  console.log('Auth Valid:', validateAuth())
  console.groupEnd()
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
  if (notificationsRef.value && !notificationsRef.value.contains(event.target)) {
    showNotifications.value = false
  }
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
  if (!event.target.closest('.mobile-menu') && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
  }
}

// Close mobile menu on route change
const closeOnRouteChange = () => {
  mobileMenuOpen.value = false
  showUserMenu.value = false
  showNotifications.value = false
  showLogoutConfirm.value = false
}

// Setup periodic updates
let notificationInterval

// Lifecycle hooks
onMounted(() => {
  // Validate authentication on mount
  if (!validateAuth()) {
    return
  }
  
  document.addEventListener('click', handleClickOutside)
  router.afterEach(closeOnRouteChange)
  
  // Fetch initial data
  fetchUserData()
  fetchNotifications()
  
  // Set up periodic updates
  notificationInterval = setInterval(fetchNotifications, 120000) // 2 minutes
  
  // Debug in development
  if (process.env.NODE_ENV === 'development') {
    debugAuth()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  
  if (notificationInterval) {
    clearInterval(notificationInterval)
  }
})
</script>

<style scoped>
/* Enhanced Navigation Styles */
.admin-nav-link {
  @apply flex items-center font-tech text-gray-300 transition-all duration-300 relative overflow-hidden;
}

.admin-nav-link:hover {
  @apply text-cyber-primary transform -translate-y-0.5;
}

.admin-nav-link.active {
  @apply text-cyber-primary bg-cyber-primary/5;
}

/* Cyber Dropdown Animations */
.cyber-dropdown-enter-active,
.cyber-dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cyber-dropdown-enter-from,
.cyber-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Cyber Slide Animation */
.cyber-slide-enter-active,
.cyber-slide-leave-active {
  transition: all 0.3s ease;
}

.cyber-slide-enter-from,
.cyber-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Enhanced Scrollbar */
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

/* Cyber Loader */
.cyber-loader {
  width: 24px;
  height: 24px;
  border: 2px solid #050508;
  border-top: 2px solid #00f0ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.cyber-loader-small {
  width: 16px;
  height: 16px;
  border: 2px solid #050508;
  border-top: 2px solid #00f0ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.cyber-loader-small-white {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff30;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enhanced Glow Effects */
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

/* Cyber Text Effect */
.cyber-text {
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: matrixShift 3s ease-in-out infinite;
}

.glow-text {
  text-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff;
}

@keyframes matrixShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Enhanced Terminal Styling */
.cyber-terminal {
  @apply bg-cyber-dark/95 backdrop-blur-md border border-cyber-border rounded-lg;
  background: linear-gradient(135deg, #11111f 0%, #1a1a2e 50%, #16213e 100%);
}

/* Disabled state styling */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .cyber-terminal {
    margin: 0 1rem;
  }
}

/* Security status bar animation */
.security-bar {
  animation: securityScan 2s ease-in-out infinite;
}

@keyframes securityScan {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
</style>