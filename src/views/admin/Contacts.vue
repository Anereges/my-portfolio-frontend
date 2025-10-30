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
              <span class="font-cyber text-cyber-primary text-sm tracking-wider">COMMUNICATIONS_CENTER</span>
              <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
            </div>
            
            <h1 class="text-5xl md:text-7xl font-cyber font-bold mb-4 matrix-text">
              CONTACT_MESSAGES
            </h1>
            <p class="text-xl text-gray-300 font-tech max-w-2xl">
              MANAGE INCOMING <span class="text-cyber-primary">COMMUNICATIONS</span> AND 
              <span class="text-cyber-accent">RESPOND_TO_QUERIES</span>
            </p>
          </div>
          
          <!-- Action Controls -->
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <div class="relative">
              <select 
                v-model="statusFilter" 
                class="cyber-input-enhanced pl-10 pr-8 appearance-none"
                @mouseenter="createParticleEffect($event)"
              >
                <option value="all">ALL_STATUS</option>
                <option value="unread">UNREAD_COMMS</option>
                <option value="read">READ_MESSAGES</option>
                <option value="replied">REPLIED_OPS</option>
              </select>
              <Settings class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="SEARCH_COMMUNICATIONS..."
                class="cyber-input-enhanced pl-10 pr-4"
                @mouseenter="createParticleEffect($event)"
              />
              <Search class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <button
              @click="refreshContacts"
              class="cyber-button-enhanced flex items-center gap-3 px-6 py-3 border-cyber-primary text-cyber-primary hover:glow-primary transition-all duration-300"
              @mouseenter="createParticleEffect($event)"
            >
              <RefreshCw class="w-5 h-5" />
              <span class="font-tech tracking-wider">REFRESH_COMS</span>
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
            <div class="text-3xl font-cyber text-cyber-primary mb-2">{{ stats.total }}</div>
            <div class="font-tech text-gray-400 text-sm">TOTAL_COMMS</div>
          </div>
          <div class="cyber-card p-6 text-center border border-cyber-accent/30 glow-accent">
            <div class="text-3xl font-cyber text-cyber-accent mb-2">{{ stats.unread }}</div>
            <div class="font-tech text-gray-400 text-sm">UNREAD_ALERTS</div>
          </div>
          <div class="cyber-card p-6 text-center border border-green-500/30 glow-success">
            <div class="text-3xl font-cyber text-green-400 mb-2">{{ stats.read }}</div>
            <div class="font-tech text-gray-400 text-sm">READ_MESSAGES</div>
          </div>
          <div class="cyber-card p-6 text-center border border-blue-500/30 glow-info">
            <div class="text-3xl font-cyber text-blue-400 mb-2">{{ stats.replied }}</div>
            <div class="font-tech text-gray-400 text-sm">REPLIED_OPS</div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-20">
          <div class="inline-flex items-center gap-3">
            <div class="w-4 h-4 bg-cyber-primary rounded-full animate-pulse"></div>
            <div class="w-4 h-4 bg-cyber-accent rounded-full animate-pulse"></div>
            <div class="w-4 h-4 bg-cyber-primary rounded-full animate-pulse"></div>
          </div>
          <p class="font-tech text-cyber-primary mt-4">DECRYPTING_COMMUNICATIONS...</p>
        </div>

        <!-- Messages Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div
            v-for="message in filteredMessages"
            :key="message._id"
            class="cyber-terminal group cursor-pointer relative overflow-hidden border-2 border-cyber-border hover:border-cyber-primary hover:glow-primary transition-all duration-500"
            @click="viewMessage(message)"
            @mouseenter="activateMessageCard($event)"
          >
            <!-- Terminal Header -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary to-cyber-accent"></div>
            
            <!-- Message Visual -->
            <div class="p-6">
              <div class="w-full h-32 bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 rounded-xl flex items-center justify-center mb-6 border border-cyber-primary/20">
                <div class="text-5xl">📨</div>
              </div>

              <!-- Message Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1 pr-4">
                  <h3 class="font-cyber text-cyber-primary text-lg mb-1">{{ message.name }}</h3>
                  <p class="text-cyber-accent font-mono text-sm truncate">{{ message.email }}</p>
                </div>
                <span :class="statusBadgeClasses(message.status)">
                  {{ formatStatus(message.status) }}
                </span>
              </div>

              <!-- Subject -->
              <div class="mb-4">
                <p class="text-white font-tech text-sm font-bold mb-1">TRANSMISSION_SUBJECT:</p>
                <p class="text-gray-300 font-tech text-sm leading-relaxed line-clamp-2">
                  {{ message.subject }}
                </p>
              </div>

              <!-- Message Preview -->
              <div class="mb-6">
                <p class="text-gray-300 font-tech text-sm leading-relaxed line-clamp-3">
                  {{ message.message }}
                </p>
              </div>

              <!-- Message Meta -->
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-4">
                  <span class="flex items-center gap-1 text-gray-400 font-mono text-xs">
                    <Clock class="w-3 h-3" />
                    {{ formatTimeAgo(message.created_at) }}
                  </span>
                  <span v-if="message.ip_address" class="text-cyber-secondary font-mono text-xs">
                    IP: {{ message.ip_address }}
                  </span>
                </div>
                <span class="text-cyber-primary font-mono text-xs">
                  ID: {{ message._id.slice(-6) }}
                </span>
              </div>
            </div>

            <!-- Hover Actions -->
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
              <div class="flex gap-2">
                <button
                  @click.stop="markAsReplied(message)"
                  :class="[
                    'p-2 rounded-xl border-2 transition-all duration-300',
                    message.status === 'replied' 
                      ? 'border-green-500 bg-green-500/20 text-green-400 glow-success' 
                      : 'border-cyber-border text-gray-400 hover:border-green-500 hover:glow-success'
                  ]"
                  @mouseenter="createParticleEffect($event)"
                >
                  <Mail class="w-4 h-4" />
                </button>
                <button
                  @click.stop="deleteMessage(message)"
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
                  @click.stop="viewMessage(message)"
                  class="flex-1 text-center py-2 bg-cyber-primary/10 border-2 border-cyber-primary text-cyber-primary rounded-xl text-sm font-tech hover:bg-cyber-primary/20 hover:glow-primary transition-all duration-300"
                >
                  VIEW_TRANSMISSION
                </button>
                <a
                  v-if="message.email"
                  :href="`mailto:${message.email}`"
                  @click.stop
                  class="flex-1 text-center py-2 bg-cyber-accent/10 border-2 border-cyber-accent text-cyber-accent rounded-xl text-sm font-tech hover:bg-cyber-accent/20 hover:glow-accent transition-all duration-300"
                >
                  REPLY_COM
                </a>
              </div>
            </div>

            <!-- Animated Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary/0 via-cyber-primary/5 to-cyber-primary/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <!-- Unread Indicator -->
            <div v-if="message.status === 'unread'" class="absolute top-3 left-3 w-3 h-3 bg-cyber-accent rounded-full animate-pulse glow-accent"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loading && filteredMessages.length === 0" class="text-center py-20">
          <Mail class="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 class="font-cyber text-gray-400 text-2xl mb-3">NO_COMMUNICATIONS_DETECTED</h3>
          <p class="text-gray-500 font-tech text-lg mb-6">NO_MESSAGES_MATCH_CURRENT_PARAMETERS_OR_COMS_ARE_SILENT</p>
          <button
            @click="refreshContacts"
            class="cyber-button-enhanced flex items-center gap-3 px-8 py-4 mx-auto glow-primary hover:glow-accent transition-all duration-300"
            @mouseenter="createQuantumEffect($event)"
          >
            <RefreshCw class="w-6 h-6" />
            <span class="font-tech tracking-wider text-lg">SCAN_FOR_COMMS</span>
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="filteredMessages.length > 0" class="flex justify-between items-center mt-8 pt-8 border-t border-cyber-border/50">
          <div class="text-gray-400 font-tech">
            DISPLAYING {{ filteredMessages.length }} OF {{ contacts.length }} TRANSMISSIONS
          </div>
          <div class="flex gap-2">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-4 py-2 rounded-xl border-2 transition-all duration-300 font-tech text-sm',
                currentPage === page 
                  ? 'border-cyber-primary bg-cyber-primary/20 text-cyber-primary glow-primary' 
                  : 'border-cyber-border text-gray-400 hover:border-cyber-primary'
              ]"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Detail Modal -->
    <div v-if="selectedMessage" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-terminal p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-cyber-primary/30 glow-primary">
        <!-- Terminal Header -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-accent to-cyber-primary"></div>
        
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-cyber-primary rounded-full animate-pulse"></div>
            <h3 class="text-2xl font-cyber text-cyber-primary">TRANSMISSION_DETAILS</h3>
          </div>
          <button 
            @click="closeMessage" 
            class="text-gray-400 hover:text-cyber-primary transition-colors duration-300"
            @mouseenter="createParticleEffect($event)"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <div class="space-y-8">
          <!-- Sender Intelligence -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="cyber-card p-6 border border-cyber-primary/30">
              <label class="font-tech text-gray-400 text-sm tracking-wider block mb-3">SOURCE_IDENTITY</label>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-cyber-primary/20 rounded-xl flex items-center justify-center border border-cyber-primary/30">
                  <User class="w-6 h-6 text-cyber-primary" />
                </div>
                <div>
                  <div class="font-cyber text-white text-lg">{{ selectedMessage.name }}</div>
                  <div class="font-tech text-cyber-primary text-sm">{{ selectedMessage.email }}</div>
                </div>
              </div>
            </div>
            <div class="cyber-card p-6 border border-cyber-accent/30">
              <label class="font-tech text-gray-400 text-sm tracking-wider block mb-3">TRANSMISSION_METADATA</label>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="font-tech text-gray-400">STATUS:</span>
                  <span :class="statusBadgeClasses(selectedMessage.status)">
                    {{ formatStatus(selectedMessage.status) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="font-tech text-gray-400">TIMESTAMP:</span>
                  <span class="font-tech text-cyber-primary">{{ formatDate(selectedMessage.created_at) }}</span>
                </div>
                <div v-if="selectedMessage.ip_address" class="flex justify-between">
                  <span class="font-tech text-gray-400">SOURCE_NODE:</span>
                  <span class="font-tech text-cyber-secondary">{{ selectedMessage.ip_address }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Transmission Subject -->
          <div class="cyber-card p-6 border border-cyber-primary/30">
            <label class="font-tech text-gray-400 text-sm tracking-wider block mb-3">TRANSMISSION_SUBJECT</label>
            <div class="font-cyber text-white text-xl">{{ selectedMessage.subject }}</div>
          </div>

          <!-- Message Content -->
          <div class="cyber-card p-6 border border-cyber-accent/30">
            <label class="font-tech text-gray-400 text-sm tracking-wider block mb-3">FULL_TRANSMISSION</label>
            <div class="cyber-terminal p-4 bg-cyber-darker/50 border border-cyber-border">
              <p class="font-tech text-gray-300 leading-relaxed whitespace-pre-wrap">{{ selectedMessage.message }}</p>
            </div>
          </div>

          <!-- Action Protocol -->
          <div class="flex gap-4 pt-8 border-t border-cyber-border/50">
            <a
              :href="`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`"
              class="cyber-button-enhanced flex-1 flex items-center justify-center gap-3 border-cyber-accent text-cyber-accent hover:glow-accent transition-all duration-300"
              @mouseenter="createParticleEffect($event)"
            >
              <Mail class="w-5 h-5" />
              <span class="font-tech tracking-wider">INITIATE_REPLY</span>
            </a>
            <button
              @click="markAsReplied(selectedMessage)"
              class="cyber-button-enhanced flex-1 flex items-center justify-center gap-3 border-green-500 text-green-400 hover:glow-success transition-all duration-300"
              @mouseenter="createParticleEffect($event)"
            >
              <Check class="w-5 h-5" />
              <span class="font-tech tracking-wider">MARK_REPLIED</span>
            </button>
            <button
              @click="deleteMessage(selectedMessage)"
              class="cyber-button-enhanced flex-1 flex items-center justify-center gap-3 border-red-500 text-red-400 hover:glow-error transition-all duration-300"
              @mouseenter="createParticleEffect($event)"
            >
              <Trash2 class="w-5 h-5" />
              <span class="font-tech tracking-wider">TERMINATE_COM</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deletingMessage" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-terminal p-8 max-w-md w-full border-2 border-red-500/50 glow-error">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400"></div>
        
        <div class="text-center mb-6">
          <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 class="font-cyber text-red-400 text-2xl mb-2">CONFIRM_TERMINATION</h3>
          <p class="text-gray-300 font-tech">
            PERMANENTLY_TERMINATE transmission from "{{ deletingMessage.name }}"?
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
            @click="executeMessageDeletion"
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
import { ref, computed, onMounted } from 'vue'
import { useAnimations } from '../../composables/useAnimations'
import AdminNavbar from '../../components/Admin/AdminNavbar.vue'
import { 
  Search, 
  User, 
  Eye, 
  Mail, 
  Trash2, 
  X,
  RefreshCw,
  Settings,
  AlertTriangle,
  Clock,
  Check
} from 'lucide-vue-next'

const { createParticleEffect, createQuantumEffect } = useAnimations()

// API Configuration - Match FastAPI routes
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_ENDPOINTS = {
  CONTACTS: `${API_BASE_URL}/api/v1/contacts`,
  HEALTH: `${API_BASE_URL}/health`
}

// Reactive state
const contacts = ref([])
const selectedMessage = ref(null)
const deletingMessage = ref(null)
const statusFilter = ref('all')
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(9)
const loading = ref(false)
const error = ref('')

// Stats - Updated to match "unread" status from backend
const stats = computed(() => {
  return {
    total: contacts.value.length,
    unread: contacts.value.filter(m => m.status === 'unread').length,
    read: contacts.value.filter(m => m.status === 'read').length,
    replied: contacts.value.filter(m => m.status === 'replied').length
  }
})

// Filtered messages
const filteredMessages = computed(() => {
  let filtered = contacts.value

  // Status filter
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(message => message.status === statusFilter.value)
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(message => 
      message.name.toLowerCase().includes(query) ||
      message.email.toLowerCase().includes(query) ||
      message.subject.toLowerCase().includes(query) ||
      message.message.toLowerCase().includes(query)
    )
  }

  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filtered.slice(start, end)
})

// Total pages
const totalPages = computed(() => {
  return Math.ceil(contacts.value.length / itemsPerPage.value)
})

// Stream styles
const streamStyle = (index) => {
  return {
    left: `${(index / 6) * 100}%`,
    animationDelay: `${index * 0.5}s`
  }
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

// Status badge classes - Updated for "unread" status
const statusBadgeClasses = (status) => {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-tech tracking-wider'
  switch (status) {
    case 'unread':
      return `${baseClasses} bg-cyber-accent/20 border border-cyber-accent/30 text-cyber-accent`
    case 'read':
      return `${baseClasses} bg-cyber-primary/20 border border-cyber-primary/30 text-cyber-primary`
    case 'replied':
      return `${baseClasses} bg-green-500/20 border border-green-500/30 text-green-400`
    default:
      return `${baseClasses} bg-gray-500/20 border border-gray-500/30 text-gray-400`
  }
}

// Format status for display
const formatStatus = (status) => {
  const statusMap = {
    unread: 'UNREAD',
    read: 'READ',
    replied: 'REPLIED'
  }
  return statusMap[status] || status.toUpperCase()
}

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Format time ago
const formatTimeAgo = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'JUST NOW'
  if (diffInHours < 24) return `${diffInHours}H AGO`
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}D AGO`
  return formatDate(dateString)
}

// View message
const viewMessage = (message) => {
  selectedMessage.value = message
  // Mark as read when viewing
  if (message.status === 'unread') {
    message.status = 'read'
    updateMessageStatus(message._id, 'read')
  }
}

// Close message view
const closeMessage = () => {
  selectedMessage.value = null
}

// Mark as replied
const markAsReplied = async (message) => {
  const messageId = message._id
  message.status = 'replied'
  
  try {
    await updateMessageStatus(messageId, 'replied')
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00ff88')
    
    // Update the contacts list
    const index = contacts.value.findIndex(m => m._id === messageId)
    if (index !== -1) {
      contacts.value[index].status = 'replied'
    }
    
    selectedMessage.value = null
  } catch (error) {
    console.error('Failed to update message status:', error)
    // Revert status on error
    message.status = 'read'
  }
}

// Initiate message deletion
const deleteMessage = (message) => {
  deletingMessage.value = message
  createParticleEffect()
}

// Cancel deletion
const cancelDeletion = () => {
  deletingMessage.value = null
}

// Execute message deletion
const executeMessageDeletion = async () => {
  if (!deletingMessage.value) return
  
  try {
    await deleteMessageFromAPI(deletingMessage.value._id)
    
    contacts.value = contacts.value.filter(m => m._id !== deletingMessage.value._id)
    deletingMessage.value = null
    selectedMessage.value = null
    
    // Success effect
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, '#00ff88')
  } catch (err) {
    console.error('Failed to delete message:', err)
    error.value = 'Failed to delete message'
    setTimeout(() => { error.value = '' }, 3000)
  }
}

const activateMessageCard = (event) => {
  createParticleEffect(event)
}

// API functions - Updated for FastAPI
const fetchContacts = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(API_ENDPOINTS.CONTACTS, {
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
    // Handle PaginatedResponse structure
    contacts.value = Array.isArray(result.items) ? result.items : []
    
    console.log(`Loaded ${contacts.value.length} contact messages`)
    
  } catch (err) {
    console.error('Failed to fetch contacts:', err)
    error.value = err.message || 'Failed to load contact messages'
    
    // Demo data for development
    if (import.meta.env.DEV) {
      console.log('Using demo data for development')
      contacts.value = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Web Development Project',
          message: 'I am interested in hiring you for a web development project. I have a startup that needs a modern web application with React and Node.js.',
          status: 'unread',
          created_at: new Date().toISOString(),
          ip_address: '192.168.1.1'
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@company.com',
          subject: 'Security Consultation',
          message: 'We need a security audit for our enterprise application. Our current system has potential vulnerabilities that need expert review.',
          status: 'read',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          ip_address: '192.168.1.2'
        },
        {
          _id: '3',
          name: 'Mike Johnson',
          email: 'mike@techfirm.com',
          subject: 'Partnership Opportunity',
          message: 'We would like to discuss a potential partnership for upcoming projects. Your expertise in cybersecurity would be valuable for our clients.',
          status: 'replied',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          ip_address: '192.168.1.3'
        }
      ]
    }
  } finally {
    loading.value = false
  }
}

const updateMessageStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.CONTACTS}/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    })

    if (!response.ok) {
      throw new Error(`Failed to update status: ${response.status}`)
    }

    console.log(`Message ${id} status updated to ${status}`)
  } catch (err) {
    console.error('Error updating message status:', err)
    throw err
  }
}

const deleteMessageFromAPI = async (id) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.CONTACTS}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to delete message: ${response.status}`)
    }

    console.log(`Message ${id} deleted successfully`)
  } catch (err) {
    console.error('Error deleting message:', err)
    throw err
  }
}

// Refresh contacts
const refreshContacts = () => {
  fetchContacts()
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00ffff')
}

onMounted(() => {
  fetchContacts()
  console.log('Admin Contact Manager activated')
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