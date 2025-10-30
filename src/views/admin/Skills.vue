<template>
  <div class="min-h-screen bg-cyber-darker relative overflow-hidden">
    <AdminNavbar />
    
    <!-- Cybernetic Background -->
    <div class="admin-bg">
      <div class="cyber-grid"></div>
      <div class="skill-orbits">
        <div v-for="i in 8" :key="i" class="skill-orbit" :style="orbitStyle(i)"></div>
      </div>
      <div class="holographic-elements">
        <div v-for="i in 12" :key="i" class="hologram" :style="hologramStyle(i)"></div>
      </div>
    </div>

    <div class="relative z-10 pt-28 pb-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Header with Matrix Effect -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div class="text-center lg:text-left mb-6 lg:mb-0">
            <div class="inline-flex items-center gap-3 bg-cyber-card/60 border border-cyber-primary/40 rounded-full px-6 py-3 mb-4 backdrop-blur-sm glow-primary">
              <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
              <span class="font-cyber text-cyber-primary text-sm tracking-wider">SKILL_MATRIX_MANAGEMENT</span>
              <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
            </div>
            
            <h1 class="text-5xl md:text-7xl font-cyber font-bold mb-4 matrix-text">
              SKILLS_DATABASE
            </h1>
            <p class="text-xl text-gray-300 font-tech max-w-2xl">
              MANAGE YOUR <span class="text-cyber-primary">TECHNICAL_ARSENAL</span> AND 
              <span class="text-cyber-accent">EXPERTISE_MATRIX</span>
            </p>
          </div>
          
          <!-- Action Controls -->
          <div class="flex items-center gap-4">
            <button
              @click="fetchSkills"
              class="cyber-button-enhanced flex items-center gap-3 px-4 py-3 border-cyber-primary text-cyber-primary hover:glow-primary transition-all duration-300"
              @mouseenter="createParticleEffect($event)"
            >
              <RefreshCw class="w-4 h-4" />
              <span class="font-tech tracking-wider">REFRESH</span>
            </button>
            <button
              @click="initiateSkillCreation"
              class="cyber-button-enhanced flex items-center gap-3 px-6 py-3 glow-primary hover:glow-accent transition-all duration-300"
              @mouseenter="createQuantumEffect($event)"
            >
              <Plus class="w-5 h-5" />
              <span class="font-tech tracking-wider">ADD_SKILL</span>
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

        <!-- Loading Animation -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
          <div class="cyber-loader-large mb-4"></div>
          <p class="text-cyber-primary font-tech text-lg">Loading skill database...</p>
          <p class="text-gray-400 text-sm mt-2">Synchronizing with backend systems</p>
        </div>

        <!-- Skills Overview Stats -->
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div class="cyber-card p-6 text-center border border-cyber-primary/30 glow-primary">
            <div class="text-3xl font-cyber text-cyber-primary mb-2">{{ skills.length }}</div>
            <div class="font-tech text-gray-400 text-sm">TOTAL_SKILLS</div>
          </div>
          <div class="cyber-card p-6 text-center border border-cyber-accent/30 glow-accent">
            <div class="text-3xl font-cyber text-cyber-accent mb-2">{{ featuredSkillsCount }}</div>
            <div class="font-tech text-gray-400 text-sm">FEATURED_SKILLS</div>
          </div>
          <div class="cyber-card p-6 text-center border border-green-500/30 glow-success">
            <div class="text-3xl font-cyber text-green-400 mb-2">{{ expertSkillsCount }}</div>
            <div class="font-tech text-gray-400 text-sm">EXPERT_LEVEL</div>
          </div>
          <div class="cyber-card p-6 text-center border border-blue-500/30 glow-info">
            <div class="text-3xl font-cyber text-blue-400 mb-2">{{ totalExperience }}</div>
            <div class="font-tech text-gray-400 text-sm">TOTAL_YEARS</div>
          </div>
        </div>

        <!-- Skills Grid -->
        <div v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div
            v-for="skill in skills"
            :key="skill._id"
            class="cyber-terminal group cursor-pointer relative overflow-hidden border-2 border-cyber-border hover:border-cyber-primary hover:glow-primary transition-all duration-500"
            @click="initiateSkillEdit(skill)"
            @mouseenter="activateSkillCard($event)"
          >
            <!-- Terminal Header -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-primary to-cyber-accent"></div>
            
            <div class="p-6">
              <!-- Skill Header -->
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                  <div class="text-4xl">{{ getSkillEmoji(skill.name) }}</div>
                  <div>
                    <h3 class="font-cyber text-cyber-primary text-xl">{{ skill.name }}</h3>
                    <span :class="categoryBadgeClasses(skill.category)">
                      {{ formatCategory(skill.category) }}
                    </span>
                  </div>
                </div>
                <span :class="levelBadgeClasses(skill.level)">
                  {{ formatLevel(skill.level) }}
                </span>
              </div>

              <!-- Proficiency Matrix -->
              <div class="mb-6">
                <div class="flex justify-between items-center mb-3">
                  <span class="font-tech text-gray-300 text-sm tracking-wider">PROFICIENCY_MATRIX</span>
                  <span class="font-cyber text-cyber-primary text-lg">{{ skill.proficiency }}%</span>
                </div>
                <div class="w-full bg-cyber-dark/50 border border-cyber-border rounded-full h-3 overflow-hidden">
                  <div 
                    class="h-3 rounded-full bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-primary transition-all duration-1000 relative overflow-hidden"
                    :style="{ width: `${skill.proficiency}%` }"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine"></div>
                  </div>
                </div>
              </div>

              <!-- Skill Intelligence -->
              <div class="space-y-3 text-sm">
                <div class="flex justify-between items-center p-3 bg-cyber-dark/30 rounded-lg border border-cyber-border/30">
                  <span class="text-gray-300 font-tech">EXPERIENCE:</span>
                  <span class="text-cyber-accent font-mono">{{ skill.years_of_experience || 0 }} YEARS</span>
                </div>
                
                <div v-if="skill.featured" class="flex items-center gap-2 p-3 bg-cyber-accent/10 border border-cyber-accent/30 rounded-lg">
                  <Star class="w-4 h-4 text-cyber-accent" />
                  <span class="text-cyber-accent font-tech text-sm tracking-wider">PRIORITY_SKILL</span>
                </div>
              </div>
            </div>

            <!-- Hover Actions -->
            <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
              <div class="flex gap-2">
                <button
                  @click.stop="toggleFeaturedSkill(skill)"
                  :class="[
                    'p-2 rounded-xl border-2 transition-all duration-300',
                    skill.featured 
                      ? 'border-cyber-accent bg-cyber-accent/20 text-cyber-accent glow-accent' 
                      : 'border-cyber-border text-gray-400 hover:border-cyber-accent hover:glow-accent'
                  ]"
                  @mouseenter="createParticleEffect($event)"
                >
                  <Star class="w-4 h-4" />
                </button>
                <button
                  @click.stop="initiateSkillDeletion(skill)"
                  class="p-2 rounded-xl border-2 border-cyber-border text-gray-400 hover:border-red-500 hover:text-red-400 hover:glow-error transition-all duration-300"
                  @mouseenter="createParticleEffect($event)"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Animated Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary/0 via-cyber-primary/5 to-cyber-primary/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loading && skills.length === 0" class="text-center py-20">
          <Code2 class="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h3 class="font-cyber text-gray-400 text-2xl mb-3">NO_SKILLS_DETECTED</h3>
          <p class="text-gray-500 font-tech text-lg mb-6">SKILL_MATRIX_IS_EMPTY_INITIATE_NEW_SKILL_PROTOCOLS</p>
          <button
            @click="initiateSkillCreation"
            class="cyber-button-enhanced flex items-center gap-3 px-8 py-4 mx-auto glow-primary hover:glow-accent transition-all duration-300"
            @mouseenter="createQuantumEffect($event)"
          >
            <Plus class="w-6 h-6" />
            <span class="font-tech tracking-wider text-lg">INITIATE_FIRST_SKILL</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Skill Modal -->
    <div v-if="showAddSkill || editingSkill" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-terminal p-8 max-w-md w-full border-2 border-cyber-primary/30 glow-primary">
        <!-- Terminal Header -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-accent to-cyber-primary"></div>
        
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 bg-cyber-primary rounded-full animate-pulse"></div>
            <h3 class="text-2xl font-cyber text-cyber-primary">
              {{ editingSkill ? 'EDIT_SKILL_PROTOCOL' : 'INITIATE_NEW_SKILL' }}
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

        <form @submit.prevent="executeSkillSave" class="space-y-6">
          <!-- Skill Identity -->
          <div class="form-group">
            <label class="block font-tech text-white mb-3 text-sm tracking-wider">SKILL_IDENTITY *</label>
            <div class="relative">
              <input
                v-model="skillForm.name"
                type="text"
                required
                placeholder="ENTER_SKILL_CODENAME"
                class="cyber-input-enhanced w-full pl-10"
              />
              <Cpu class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <!-- Skill Classification -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="form-group">
              <label class="block font-tech text-white mb-3 text-sm tracking-wider">DOMAIN *</label>
              <div class="relative">
                <select v-model="skillForm.category" required class="cyber-input-enhanced w-full appearance-none pl-10">
                  <option value="frontend">FRONTEND_OPS</option>
                  <option value="backend">BACKEND_SYSTEMS</option>
                  <option value="database">DATA_MANAGEMENT</option>
                  <option value="devops">INFRASTRUCTURE</option>
                  <option value="security">CYBER_DEFENSE</option>
                  <option value="tools">DEVELOPMENT_TOOLS</option>
                </select>
                <Settings class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <div class="form-group">
              <label class="block font-tech text-white mb-3 text-sm tracking-wider">SKILL_LEVEL *</label>
              <div class="relative">
                <select v-model="skillForm.level" required class="cyber-input-enhanced w-full appearance-none pl-10">
                  <option value="beginner">INITIATE</option>
                  <option value="intermediate">OPERATIVE</option>
                  <option value="advanced">SPECIALIST</option>
                  <option value="expert">MASTER</option>
                </select>
                <Activity class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>

          <!-- Proficiency Matrix -->
          <div class="form-group">
            <label class="block font-tech text-white mb-3 text-sm tracking-wider">
              PROFICIENCY_MATRIX: {{ skillForm.proficiency }}%
            </label>
            <div class="space-y-3">
              <input
                v-model="skillForm.proficiency"
                type="range"
                min="0"
                max="100"
                step="5"
                class="cyber-range-enhanced w-full"
              />
              <div class="flex justify-between text-xs font-mono text-gray-400">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <!-- Experience Protocol -->
          <div class="form-group">
            <label class="block font-tech text-white mb-3 text-sm tracking-wider">OPERATIONAL_EXPERIENCE</label>
            <div class="relative">
              <input
                v-model="skillForm.years_of_experience"
                type="number"
                step="0.5"
                min="0"
                max="50"
                placeholder="YEARS_OF_EXPERIENCE"
                class="cyber-input-enhanced w-full pl-10"
              />
              <Calendar class="w-4 h-4 text-cyber-primary absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <!-- Priority Flag -->
          <div class="flex items-center p-4 bg-cyber-dark/50 rounded-xl border border-cyber-accent/30">
            <input
              id="featured"
              v-model="skillForm.featured"
              type="checkbox"
              class="cyber-checkbox-enhanced"
            />
            <label for="featured" class="font-tech text-cyber-accent text-sm ml-3 tracking-wider">
              PRIORITY_SKILL_FLAG
            </label>
          </div>

          <!-- Action Protocol -->
          <div class="flex gap-4 pt-6 border-t border-cyber-border/50">
            <button
              type="button"
              @click="closeModal"
              class="cyber-button-enhanced flex-1 border-cyber-border text-gray-400 hover:border-cyber-secondary hover:text-cyber-secondary hover:glow-secondary transition-all duration-300"
              @mouseenter="createParticleEffect($event)"
            >
              ABORT_PROTOCOL
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="cyber-button-enhanced flex-1 bg-gradient-to-r from-cyber-primary to-cyber-accent text-cyber-darker font-bold tracking-wider transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              @mouseenter="createQuantumEffect($event)"
            >
              <span v-if="saving" class="flex items-center justify-center gap-2">
                <div class="w-4 h-4 border-2 border-cyber-darker border-t-transparent rounded-full animate-spin"></div>
                PROCESSING...
              </span>
              <span v-else>
                {{ editingSkill ? 'UPDATE_SKILL' : 'DEPLOY_SKILL' }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deletingSkill" class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-terminal p-8 max-w-md w-full border-2 border-red-500/50 glow-error">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-400"></div>
        
        <div class="text-center mb-6">
          <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 class="font-cyber text-red-400 text-2xl mb-2">CONFIRM_SKILL_TERMINATION</h3>
          <p class="text-gray-300 font-tech">
            TERMINATE skill "{{ deletingSkill.name }}"?
          </p>
          <p class="text-red-400 text-sm font-mono mt-2">
            SKILL_PROTOCOL_WILL_BE_PERMANENTLY_ERASED
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
            @click="executeSkillDeletion"
            :disabled="deleting"
            class="cyber-button-enhanced flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:glow-error transition-all duration-300 disabled:opacity-50"
          >
            <span v-if="deleting" class="flex items-center justify-center gap-2">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              TERMINATING...
            </span>
            <span v-else>CONFIRM_TERMINATE</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAnimations } from '../../composables/useAnimations'
import AdminNavbar from '../../components/Admin/AdminNavbar.vue'
import { 
  Plus, 
  X, 
  Star, 
  Trash2, 
  Code2,
  Settings,
  Cpu,
  Activity,
  Calendar,
  AlertTriangle,
  RefreshCw
} from 'lucide-vue-next'

// Initialize animations
const { createParticleEffect, createQuantumEffect } = useAnimations()

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_ENDPOINTS = {
  SKILLS: `${API_BASE_URL}/api/v1/skills`
}

// Reactive state
const skills = ref([])
const showAddSkill = ref(false)
const editingSkill = ref(null)
const deletingSkill = ref(null)
const loading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const error = ref('')

// Skill form
const skillForm = reactive({
  name: '',
  category: 'frontend',
  level: 'intermediate',
  proficiency: 75,
  years_of_experience: 2,
  featured: false
})

// Computed properties
const featuredSkillsCount = computed(() => {
  return skills.value.filter(s => s.featured).length
})

const expertSkillsCount = computed(() => {
  return skills.value.filter(s => s.level === 'expert').length
})

const totalExperience = computed(() => {
  return skills.value.reduce((total, skill) => total + (skill.years_of_experience || 0), 0)
})

// ✅ CORRECTED: API Functions
const fetchSkills = async () => {
  try {
    loading.value = true
    error.value = ''
    
    console.log('🔍 Fetching skills from API...')
    
    const response = await fetch(API_ENDPOINTS.SKILLS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    
    console.log('📦 Skills API Response:', result)
    
    // ✅ FIX: Your API returns array directly
    if (Array.isArray(result)) {
      skills.value = result
      console.log(`✅ Loaded ${skills.value.length} skills from FastAPI`)
    } else {
      console.warn('⚠️ Unexpected API response format:', result)
      skills.value = []
    }
    
  } catch (err) {
    console.error('❌ Failed to fetch skills:', err)
    error.value = `Failed to load skills: ${err.message}`
    skills.value = []
  } finally {
    loading.value = false
  }
}

const createSkill = async (skillData) => {
  const response = await fetch(API_ENDPOINTS.SKILLS, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skillData)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
    throw new Error(errorData.detail || `Failed to create skill: ${response.status}`)
  }

  return await response.json()
}

const updateSkill = async (id, skillData) => {
  const response = await fetch(`${API_ENDPOINTS.SKILLS}/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(skillData)
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
    throw new Error(errorData.detail || `Failed to update skill: ${response.status}`)
  }

  return await response.json()
}

const deleteSkill = async (id) => {
  const response = await fetch(`${API_ENDPOINTS.SKILLS}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
    throw new Error(errorData.detail || `Failed to delete skill: ${response.status}`)
  }

  return await response.json()
}

// ✅ CORRECTED: Methods
const initiateSkillCreation = () => {
  editingSkill.value = null
  resetSkillForm()
  showAddSkill.value = true
  createQuantumEffect()
}

const initiateSkillEdit = (skill) => {
  editingSkill.value = skill
  Object.assign(skillForm, { 
    name: skill.name,
    category: skill.category,
    level: skill.level,
    proficiency: skill.proficiency,
    years_of_experience: skill.years_of_experience || 0,
    featured: skill.featured || false
  })
  showAddSkill.value = true
  createQuantumEffect()
}

const initiateSkillDeletion = (skill) => {
  deletingSkill.value = skill
  createParticleEffect()
}

const cancelDeletion = () => {
  deletingSkill.value = null
}

const executeSkillDeletion = async () => {
  if (!deletingSkill.value) return
  
  try {
    deleting.value = true
    await deleteSkill(deletingSkill.value._id)
    
    skills.value = skills.value.filter(s => s._id !== deletingSkill.value._id)
    deletingSkill.value = null
    
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, '#00ff88')
  } catch (err) {
    console.error('Failed to delete skill:', err)
    error.value = err.message || 'Failed to delete skill'
    setTimeout(() => { error.value = '' }, 5000)
  } finally {
    deleting.value = false
  }
}

// ✅ CORRECTED: Skill save function - FIXED VERSION
const executeSkillSave = async () => {
  try {
    saving.value = true
    error.value = ''

    // Prepare data for API
    const submitData = {
      name: skillForm.name,
      category: skillForm.category,
      level: skillForm.level,
      proficiency: skillForm.proficiency,
      years_of_experience: skillForm.years_of_experience || 0,
      featured: skillForm.featured || false
    }

    console.log('📤 Submitting skill data:', submitData)

    if (editingSkill.value) {
      // Update existing skill
      await updateSkill(editingSkill.value._id, submitData)
      
      // Update local state
      const index = skills.value.findIndex(s => s._id === editingSkill.value._id)
      if (index !== -1) {
        skills.value[index] = { ...skills.value[index], ...submitData }
      }
    } else {
      // Create new skill - ✅ FIXED: Wait for creation AND refresh
      const result = await createSkill(submitData)
      console.log('📥 Create skill response:', result)
      
      // ✅ CRITICAL FIX: Wait for the skills refresh to complete
      await fetchSkills() // This 'await' was missing
    }
    
    // ✅ Only close modal after everything is complete
    closeModal()
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: 100 }, '#00ff88')
    
  } catch (err) {
    console.error('Failed to save skill:', err)
    error.value = err.message || 'Failed to save skill'
    setTimeout(() => { error.value = '' }, 5000)
  } finally {
    saving.value = false
  }
}

const toggleFeaturedSkill = async (skill) => {
  try {
    await updateSkill(skill._id, { featured: !skill.featured })
    
    // Update local state
    const index = skills.value.findIndex(s => s._id === skill._id)
    if (index !== -1) {
      skills.value[index].featured = !skill.featured
    }
    
    createParticleEffect()
  } catch (err) {
    console.error('Failed to toggle featured:', err)
    error.value = 'Failed to update skill'
    setTimeout(() => { error.value = '' }, 3000)
  }
}

const closeModal = () => {
  showAddSkill.value = false
  editingSkill.value = null
  resetSkillForm()
}

const resetSkillForm = () => {
  Object.assign(skillForm, {
    name: '',
    category: 'frontend',
    level: 'intermediate',
    proficiency: 75,
    years_of_experience: 2,
    featured: false
  })
}

// Formatting functions
const formatCategory = (category) => {
  const categoryMap = {
    frontend: 'FRONTEND',
    backend: 'BACKEND',
    database: 'DATABASE',
    devops: 'DEVOPS',
    security: 'SECURITY',
    tools: 'TOOLS'
  }
  return categoryMap[category] || category.toUpperCase()
}

const formatLevel = (level) => {
  const levelMap = {
    beginner: 'INITIATE',
    intermediate: 'OPERATIVE',
    advanced: 'SPECIALIST',
    expert: 'MASTER'
  }
  return levelMap[level] || level.toUpperCase()
}

// Styling functions
const categoryBadgeClasses = (category) => {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-tech tracking-wider'
  const categoryClasses = {
    frontend: 'bg-blue-500/20 border border-blue-500/30 text-blue-400',
    backend: 'bg-green-500/20 border border-green-500/30 text-green-400',
    database: 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400',
    devops: 'bg-purple-500/20 border border-purple-500/30 text-purple-400',
    security: 'bg-red-500/20 border border-red-500/30 text-red-400',
    tools: 'bg-gray-500/20 border border-gray-500/30 text-gray-400'
  }
  return `${baseClasses} ${categoryClasses[category] || 'bg-gray-500/20 border border-gray-500/30 text-gray-400'}`
}

const levelBadgeClasses = (level) => {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-tech tracking-wider'
  const levelClasses = {
    beginner: 'bg-green-500/20 border border-green-500/30 text-green-400',
    intermediate: 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400',
    advanced: 'bg-orange-500/20 border border-orange-500/30 text-orange-400',
    expert: 'bg-red-500/20 border border-red-500/30 text-red-400'
  }
  return `${baseClasses} ${levelClasses[level] || 'bg-gray-500/20 border border-gray-500/30 text-gray-400'}`
}

const getSkillEmoji = (skillName) => {
  const emojis = {
    'vue': '⚡',
    'react': '⚛️',
    'angular': '🅰️',
    'python': '🐍',
    'javascript': '🟨',
    'typescript': '🔷',
    'node': '🟢',
    'express': '🚂',
    'mongodb': '🍃',
    'postgresql': '🐘',
    'mysql': '🐬',
    'docker': '🐳',
    'kubernetes': '☸️',
    'aws': '☁️',
    'security': '🛡️',
    'cybersecurity': '🔒',
    'fastapi': '🚀',
    'tailwind': '🎨',
    'git': '📚',
    'linux': '🐧',
    'nginx': '🔰',
    'penetration': '⚔️',
    'hacking': '🔐',
    'ethical': '🎯',
    'html': '🌐',
    'css': '🎨',
    'sass': '💎',
    'bootstrap': '🅱️',
    'jquery': '⚡',
    'php': '🐘',
    'laravel': '🔶',
    'java': '☕',
    'spring': '🌱',
    'c#': '🔷',
    'asp.net': '🌐',
    'ruby': '💎',
    'rails': '🚂',
    'go': '🐹',
    'rust': '🦀',
    'swift': '🐦',
    'kotlin': '🔷',
    'flutter': '🦋',
    'react native': '📱',
    'xamarin': '🔷',
    'ionic': '⚡',
    'cordova': '📱',
    'electron': '⚡',
    'graphql': '📊',
    'rest': '🔗',
    'soap': '🧼',
    'grpc': '🔧',
    'websocket': '🔌',
    'redis': '🔴',
    'elasticsearch': '🔍',
    'solr': '☀️',
    'kafka': '📬',
    'rabbitmq': '🐇',
    'nginx': '🔰',
    'apache': '🔺',
    'iis': '🔷',
    'jenkins': '🤖',
    'travis': '🦖',
    'gitlab': '🦊',
    'github': '🐙',
    'bitbucket': '🪣',
    'jira': '🎫',
    'confluence': '📚',
    'slack': '💬',
    'teams': '💼',
    'zoom': '📹',
    'figma': '🎨',
    'sketch': '✏️',
    'xd': '🎨',
    'photoshop': '🖼️',
    'illustrator': '✏️',
    'premiere': '🎬',
    'after effects': '✨',
    'blender': '🎬',
    'maya': '🎬',
    'unity': '🎮',
    'unreal': '🎮',
    'godot': '🎮'
  }
  
  const lowerName = skillName.toLowerCase()
  for (const [key, emoji] of Object.entries(emojis)) {
    if (lowerName.includes(key)) {
      return emoji
    }
  }
  return '💻'
}

const activateSkillCard = (event) => {
  createParticleEffect(event)
}

// Animation styles
const orbitStyle = (index) => {
  const size = 80 + (index * 60)
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: '50%',
    top: '50%',
    marginLeft: `-${size/2}px`,
    marginTop: `-${size/2}px`,
    animationDelay: `${index * 3}s`,
    animationDuration: `${15 + (index * 4)}s`
  }
}

const hologramStyle = (index) => {
  const size = Math.random() * 60 + 30
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${index * 0.4}s`,
    opacity: Math.random() * 0.15 + 0.05
  }
}

// ✅ Initialize with API data
onMounted(() => {
  fetchSkills()
  console.log('Admin Skills Manager activated - FastAPI Connected')
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

.skill-orbits .skill-orbit {
  @apply absolute border border-cyber-primary/10 rounded-full;
  animation: orbitSpin linear infinite;
}

.holographic-elements .hologram {
  @apply absolute rounded-full bg-cyber-primary/5;
  filter: blur(15px);
  animation: float 6s ease-in-out infinite;
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

/* Enhanced Range Input */
.cyber-range-enhanced {
  @apply w-full h-2 bg-cyber-dark/50 border border-cyber-border rounded-full appearance-none cursor-pointer;
}

.cyber-range-enhanced::-webkit-slider-thumb {
  @apply appearance-none w-5 h-5 bg-cyber-primary rounded-full border-2 border-cyber-accent glow-primary cursor-pointer;
}

.cyber-range-enhanced::-moz-range-thumb {
  @apply w-5 h-5 bg-cyber-primary rounded-full border-2 border-cyber-accent glow-primary cursor-pointer;
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

@keyframes orbitSpin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(180deg); }
}

@keyframes matrixShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes shine {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}

.animate-shine {
  animation: shine 2s infinite;
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