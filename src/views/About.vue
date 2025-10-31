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

 


    <div class="relative z-10 pt-28 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Epic Header -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-full px-6 py-3 mb-6">
            <User class="w-5 h-5 text-cyber-primary" />
            <span class="font-cyber text-cyber-primary text-sm">DIGITAL_PROFILE_ACTIVATED</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-cyber font-bold mb-6 cyber-text glitch" data-text="SYSTEM_ANALYSIS">
            SYSTEM_ANALYSIS
          </h1>
          <p class="text-xl text-gray-300 font-tech max-w-3xl mx-auto leading-relaxed">
            <span class="text-cyber-primary">Cyber Security Architect</span> & 
            <span class="text-cyber-accent">Full Stack Engineer</span> deploying
            secure digital solutions for enterprise infrastructure
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <!-- Interactive Profile Card -->
          <div class="relative">
            <div class="cyber-card p-8 relative overflow-hidden group h-full">
              <!-- Animated Border -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary to-cyber-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute inset-[2px] bg-cyber-darker rounded-xl"></div>
              
              <div class="relative z-10">
                <!-- Profile Header -->
                <div class="text-center mb-8">
                  <div class="w-32 h-32 mx-auto mb-6 relative">
                    <!-- Animated gradient border -->
                    <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-full animate-pulse"></div>
                    <div class="absolute inset-2 bg-cyber-darker rounded-full overflow-hidden flex items-center justify-center">
                      <img src="/src/assets/a.jpg" alt="Amanuel" class="w-full h-full object-cover rounded-full" />
                    </div>
                  </div>
                  
                  <h2 class="text-3xl font-cyber text-cyber-primary mb-2">Mr.Amanuel</h2>
                  <p class="text-lg text-gray-300 font-tech mb-4">Cyber Security & Full Stack Developer</p>
                  
                  <div class="flex flex-wrap justify-center gap-2 mb-6">
                    <span class="cyber-badge bg-cyber-primary/20 text-cyber-primary">Ethical Hacker</span>
                    <span class="cyber-badge bg-cyber-secondary/20 text-cyber-secondary">Security Expert</span>
                    <span class="cyber-badge bg-cyber-accent/20 text-cyber-accent">Developer</span>
                  </div>
                </div>

                <!-- Bio -->
                <div class="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I architect <span class="text-cyber-primary">secure, scalable digital fortresses</span> 
                    with enterprise-level security protocols and military-grade encryption standards.
                  </p>
                  <p>
                    Specializing in <span class="text-cyber-accent">penetration testing</span> and 
                    <span class="text-cyber-secondary">secure development lifecycle</span>, I build systems 
                    that are fundamentally resilient against modern cyber threats.
                  </p>
                  <p>
                    My mission: Transform complex security challenges into elegant, bulletproof solutions.
                  </p>
                </div>

                <!-- Quick Stats -->
                <div class="grid grid-cols-2 gap-4 mt-8">
                  <div class="text-center p-4 bg-cyber-card/50 rounded-lg hover:bg-cyber-primary/10 transition-colors cursor-pointer" @mouseenter="createParticleEffect($event)">
                    <div class="text-2xl font-cyber text-cyber-primary">{{ totalProjects }}+</div>
                    <div class="text-gray-400 text-sm">PROJECTS_DEPLOYED</div>
                  </div>
                  <div class="text-center p-4 bg-cyber-card/50 rounded-lg hover:bg-cyber-accent/10 transition-colors cursor-pointer" @mouseenter="createParticleEffect($event, '#ff00ff')">
                    <div class="text-2xl font-cyber text-cyber-accent">{{ totalSkills }}+</div>
                    <div class="text-gray-400 text-sm">TECHNOLOGIES</div>
                  </div>
                </div>

                <!-- Security Badges -->
                <div class="mt-6 pt-6 border-t border-cyber-border">
                  <h4 class="font-cyber text-cyber-primary mb-4 text-center">SECURITY_CERTIFICATIONS</h4>
                  <div class="grid grid-cols-2 gap-3">
                    <div class="text-center p-3 bg-cyber-primary/10 rounded-lg">
                      <Shield class="w-6 h-6 text-cyber-primary mx-auto mb-1" />
                      <div class="text-xs text-cyber-primary">CEH</div>
                    </div>
                    <div class="text-center p-3 bg-cyber-accent/10 rounded-lg">
                      <Lock class="w-6 h-6 text-cyber-accent mx-auto mb-1" />
                      <div class="text-xs text-cyber-accent">OSCP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Visualization -->
          <div>
            <h3 class="text-3xl font-cyber text-cyber-primary mb-8 text-center">TECHNICAL_ARSENAL ⚔️</h3>
            
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-12">
              <div class="inline-flex items-center gap-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-full px-6 py-3">
                <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
                <span class="font-cyber text-cyber-primary text-sm">LOADING_SKILLS_MATRIX</span>
                <div class="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <!-- Error State -->
            <div v-else-if="error" class="text-center py-12">
              <div class="cyber-card p-6 border border-red-500/30">
                <AlertTriangle class="w-8 h-8 text-red-400 mx-auto mb-3" />
                <p class="text-red-400 font-tech">{{ error }}</p>
                <button @click="fetchSkills" class="cyber-button-enhanced mt-4 px-4 py-2">
                  RETRY_CONNECTION
                </button>
              </div>
            </div>
            
            <!-- Skills Content -->
            <div v-else>
              <!-- Interactive Skill Categories -->
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div 
                  v-for="category in skillCategories"
                  :key="category.name"
                  @click="setActiveCategory(category.name)"
                  :class="[
                    'cyber-card p-4 text-center cursor-pointer transition-all duration-300 group',
                    activeCategory === category.name ? 'border-cyber-primary bg-cyber-primary/10 glow-primary' : ''
                  ]"
                  @mouseenter="createParticleEffect($event)"
                >
                  <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ category.emoji }}</div>
                  <h4 class="font-cyber text-cyber-primary mb-1">{{ category.name }}</h4>
                  <p class="text-gray-400 text-xs">{{ category.count }} SKILLS</p>
                </div>
              </div>

              <!-- Animated Skill Bars -->
              <div class="space-y-6 max-h-96 overflow-y-auto cyber-scroll pr-2">
                <div 
                  v-for="skill in filteredSkills" 
                  :key="skill._id"
                  class="skill-item group"
                  @mouseenter="animateSkillBar(skill)"
                >
                  <div class="flex justify-between items-center mb-3">
                    <span class="font-tech text-white group-hover:text-cyber-primary transition-colors flex items-center gap-2">
                      {{ skill.name }}
                      <span class="text-lg">{{ getTechEmoji(skill.name) }}</span>
                    </span>
                    <span class="font-cyber text-cyber-primary">{{ skill.proficiency }}%</span>
                  </div>
                  <div class="skill-track">
                    <div 
                      class="skill-progress" 
                      :style="{ width: `${skill.proficiency}%` }"
                      :data-proficiency="skill.proficiency"
                      :class="getProficiencyClass(skill.proficiency)"
                    ></div>
                  </div>
                  <div class="text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {{ skill.experience }} • {{ skill.category }}
                  </div>
                </div>

                <!-- Empty State -->
                <div v-if="filteredSkills.length === 0" class="text-center py-8">
                  <Code2 class="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p class="text-gray-500 font-tech">NO_SKILLS_AVAILABLE_IN_THIS_CATEGORY</p>
                </div>
              </div>

              <!-- Skills Summary -->
              <div class="mt-6 p-4 bg-cyber-card/50 rounded-lg">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-400">TOTAL_SKILLS:</span>
                  <span class="text-cyber-primary font-cyber">{{ totalSkills }}</span>
                </div>
                <div class="flex justify-between items-center text-sm mt-2">
                  <span class="text-gray-400">AVERAGE_PROFICIENCY:</span>
                  <span class="text-cyber-accent font-cyber">{{ averageProficiency }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Timeline -->
        <div class="mb-20">
          <h3 class="text-3xl font-cyber text-cyber-primary mb-12 text-center">MISSION_TIMELINE 🗺️</h3>
          <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyber-primary to-cyber-accent"></div>
            
            <!-- Timeline Items -->
            <div 
              v-for="(item, index) in timeline" 
              :key="index"
              :class="['relative mb-12 timeline-item', index % 2 === 0 ? 'pr-8 lg:pr-0 lg:pl-8' : 'pl-8 lg:pl-0 lg:pr-8']"
            >
              <div :class="[
                'cyber-card p-6 relative transform transition-all duration-500 hover:scale-105 cursor-pointer group',
                index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
              ]" @click="showTimelineDetail(item)" @mouseenter="createParticleEffect($event)">
                <!-- Timeline Dot -->
                <div class="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-cyber-primary rounded-full border-4 border-cyber-darker z-10 glow-primary"
                  :class="index % 2 === 0 ? 'left-0 lg:left-auto lg:right-0 lg:translate-x-2' : 'right-0 lg:right-auto lg:left-0 lg:-translate-x-2'">
                </div>
                
                <div class="text-cyber-secondary font-cyber mb-2">{{ item.year }}</div>
                <h4 class="text-xl font-tech text-white mb-2 group-hover:text-cyber-primary transition-colors">{{ item.title }}</h4>
                <p class="text-gray-400">{{ item.description }}</p>
                <div class="flex gap-2 mt-3 flex-wrap" :class="index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'">
                  <span 
                    v-for="tag in item.tags"
                    :key="tag"
                    class="px-2 py-1 bg-cyber-primary/20 text-cyber-primary rounded text-xs hover:bg-cyber-primary/30 transition-colors"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Focus Areas -->
        <div class="mb-20">
          <h3 class="text-3xl font-cyber text-cyber-primary mb-12 text-center">SECURITY_SPECIALIZATIONS 🛡️</h3>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="specialization in securitySpecializations"
              :key="specialization.title"
              class="cyber-card p-6 text-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
              @mouseenter="createParticleEffect($event)"
            >
              <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">{{ specialization.emoji }}</div>
              <h4 class="font-cyber text-cyber-primary mb-3">{{ specialization.title }}</h4>
              <p class="text-gray-400 text-sm leading-relaxed">{{ specialization.description }}</p>
              <div class="mt-4 flex justify-center gap-1">
                <div v-for="n in 5" :key="n" class="w-2 h-2 rounded-full" :class="n <= specialization.level ? 'bg-cyber-accent' : 'bg-gray-600'"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Tech Stack -->
        <div class="mb-20">
          <h3 class="text-3xl font-cyber text-cyber-primary mb-12 text-center">TECH_STACK 🛠️</h3>
          
          <!-- Tech Stack Categories -->
          <div class="grid md:grid-cols-4 gap-6 mb-8">
            <div 
              v-for="category in techCategories"
              :key="category.name"
              @click="setActiveTechCategory(category.name)"
              :class="[
                'cyber-card p-4 text-center cursor-pointer transition-all duration-300',
                activeTechCategory === category.name ? 'border-cyber-accent bg-cyber-accent/10' : ''
              ]"
            >
              <div class="text-2xl mb-2">{{ category.emoji }}</div>
              <h4 class="font-tech text-cyber-primary text-sm">{{ category.name }}</h4>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div 
              v-for="tech in filteredTechStack"
              :key="tech.name"
              class="cyber-card p-4 text-center group cursor-pointer transform hover:scale-110 transition-all duration-300"
              @mouseenter="createParticleEffect($event)"
            >
              <div class="text-3xl mb-2">{{ tech.emoji }}</div>
              <div class="font-tech text-white text-sm">{{ tech.name }}</div>
              <div class="text-cyber-primary text-xs mt-1">{{ tech.level }}</div>
              <div class="w-full bg-cyber-dark rounded-full h-1 mt-2">
                <div class="h-1 rounded-full bg-gradient-to-r from-cyber-primary to-cyber-accent transition-all duration-1000" :style="{ width: getTechLevelWidth(tech.level) }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Metrics -->
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div 
            v-for="metric in securityMetrics"
            :key="metric.title"
            class="cyber-card p-6 text-center group cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
            @click="createParticleEffect($event)"
          >
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">{{ metric.emoji }}</div>
            <h4 class="font-cyber text-cyber-primary mb-2">{{ metric.title }}</h4>
            <p class="text-gray-400 text-sm">{{ metric.value }}</p>
            <div class="text-cyber-accent text-xs mt-2">{{ metric.subtitle }}</div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center">
          <div class="cyber-card p-8 border-2 border-cyber-primary/30 glow-primary">
            <h3 class="text-2xl font-cyber text-cyber-primary mb-4">READY_TO_SECURE_YOUR_SYSTEMS?</h3>
            <p class="text-gray-300 mb-6">Let's build something secure and amazing together</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                @click="$router.push('/contact')"
                class="cyber-button text-lg px-8 py-3 group"
              >
                INITIATE_CONTACT 📡
                <ArrowRight class="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                @click="$router.push('/projects')"
                class="cyber-button text-lg px-8 py-3 border-cyber-accent text-cyber-accent group"
              >
                VIEW_MY_WORK ⚔️
                <Eye class="w-5 h-5 ml-2 inline-block group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline Detail Modal -->
    <div v-if="selectedTimelineItem" class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-card p-8 max-w-2xl w-full relative border-2 border-cyber-primary/30 glow-primary">
        <button 
          @click="selectedTimelineItem = null"
          class="absolute top-4 right-4 text-gray-400 hover:text-cyber-primary transition-colors"
        >
          <X class="w-6 h-6" />
        </button>
        
        <h3 class="text-2xl font-cyber text-cyber-primary mb-2">{{ selectedTimelineItem.title }}</h3>
        <div class="text-cyber-secondary font-cyber mb-4">{{ selectedTimelineItem.year }}</div>
        <p class="text-gray-300 mb-6 leading-relaxed">{{ selectedTimelineItem.fullDescription }}</p>
        
        <div class="flex gap-2 flex-wrap mb-4">
          <span 
            v-for="tag in selectedTimelineItem.tags"
            :key="tag"
            class="px-3 py-1 bg-cyber-primary/20 text-cyber-primary rounded-full text-sm hover:bg-cyber-primary/30 transition-colors"
          >
            {{ tag }}
          </span>
        </div>
        
        <div class="text-cyber-accent text-sm p-3 bg-cyber-accent/10 rounded-lg">
          <strong>KEY_ACHIEVEMENT:</strong> {{ selectedTimelineItem.achievement }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimations } from '../composables/useAnimations'
import CyberNavbar from '../components/Layout/CyberNavbar.vue'
import { User, X, Code2, Shield, Lock, AlertTriangle, ArrowRight, Eye } from 'lucide-vue-next'

const router = useRouter()
const { createParticleEffect } = useAnimations()

// 🚨 IMMEDIATE FIX: HARDCODE THE API URL
const API_BASE_URL = 'https://my-portfolio-backend-0w34.onrender.com'

// Reactive state
const activeCategory = ref('all')
const activeTechCategory = ref('all')
const selectedTimelineItem = ref(null)
const skills = ref([])
const loading = ref(true)
const error = ref(null)

// Computed properties
const totalSkills = computed(() => skills.value.length)
const totalProjects = computed(() => 50)
const averageProficiency = computed(() => {
  if (skills.value.length === 0) return 0
  const total = skills.value.reduce((sum, skill) => sum + skill.proficiency, 0)
  return Math.round(total / skills.value.length)
})

// ✅ FIXED: Enhanced fetchSkills function
const fetchSkills = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('🔍 Fetching skills from API:', `${API_BASE_URL}/api/v1/skills`)
    
    const response = await fetch(`${API_BASE_URL}/api/v1/skills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // ✅ ADD: Timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    console.log('📦 Skills API Response:', data)
    
    // ✅ FIX: Your API returns array directly - no need for complex mapping
    if (Array.isArray(data)) {
      skills.value = data.map(skill => ({
        _id: skill._id,
        name: skill.name,
        proficiency: skill.proficiency,
        category: mapCategoryToFrontend(skill.category),
        experience: getExperienceText(skill.years_of_experience),
        level: skill.level,
        years_of_experience: skill.years_of_experience,
        featured: skill.featured || false
      }))
    } else {
      console.warn('⚠️ Unexpected API response format, using fallback data')
      skills.value = getFallbackSkills()
    }
    
    console.log('✅ Processed skills:', skills.value)
    
  } catch (err) {
    console.error('❌ Failed to fetch skills:', err)
    
    // ✅ FIXED: Better error handling
    if (err.name === 'AbortError') {
      error.value = 'Request timeout - Backend might be sleeping'
    } else if (err.message.includes('Failed to fetch')) {
      error.value = 'Cannot connect to backend server. Please check if backend is running.'
    } else {
      error.value = `Failed to load skills: ${err.message}`
    }
    
    // Use fallback skills when API fails
    skills.value = getFallbackSkills()
    console.log('🔄 Using fallback skills data')
  } finally {
    loading.value = false
  }
}

// Fallback skills data for when API is not available
const getFallbackSkills = () => {
  return [
    {
      _id: '1',
      name: 'Vue.js',
      proficiency: 95,
      category: 'Frontend',
      experience: '3+ years experience',
      level: 'expert',
      years_of_experience: 3,
      featured: true
    },
    {
      _id: '2',
      name: 'Cybersecurity',
      proficiency: 85,
      category: 'Security',
      experience: '2+ years experience',
      level: 'advanced',
      years_of_experience: 2,
      featured: true
    },
    {
      _id: '3',
      name: 'Python',
      proficiency: 90,
      category: 'Backend',
      experience: '4+ years experience',
      level: 'expert',
      years_of_experience: 4,
      featured: false
    },
    {
      _id: '4',
      name: 'FastAPI',
      proficiency: 88,
      category: 'Backend',
      experience: '3+ years experience',
      level: 'advanced',
      years_of_experience: 3,
      featured: true
    },
    {
      _id: '5',
      name: 'React',
      proficiency: 82,
      category: 'Frontend',
      experience: '2+ years experience',
      level: 'advanced',
      years_of_experience: 2,
      featured: false
    }
  ]
}

// Enhanced category mapping
const mapCategoryToFrontend = (backendCategory) => {
  const categoryMap = {
    'frontend': 'Frontend',
    'backend': 'Backend',
    'database': 'Backend', 
    'devops': 'Tools',
    'security': 'Security',
    'tools': 'Tools',
    'soft_skills': 'Tools'
  }
  return categoryMap[backendCategory] || 'Tools'
}

// Enhanced experience text
const getExperienceText = (years) => {
  if (!years || years === 0) return 'Learning phase'
  if (years === 1) return '1+ year experience'
  if (years < 3) return `${years}+ years experience`
  return `${years}+ years expertise`
}

const skillCategories = computed(() => [
  { name: 'all', emoji: '⚡', count: skills.value.length },
  { name: 'Security', emoji: '🛡️', count: skills.value.filter(s => s.category === 'Security').length },
  { name: 'Frontend', emoji: '🎨', count: skills.value.filter(s => s.category === 'Frontend').length },
  { name: 'Backend', emoji: '⚙️', count: skills.value.filter(s => s.category === 'Backend').length },
  { name: 'Tools', emoji: '🛠️', count: skills.value.filter(s => s.category === 'Tools').length }
])

const filteredSkills = computed(() => {
  if (activeCategory.value === 'all') return skills.value
  return skills.value.filter(skill => skill.category === activeCategory.value)
})

// Enhanced timeline with cyber security focus
const timeline = ref([
  {
    year: '2021-PRESENT',
    title: 'Cyber Security Researcher',
    description: 'Advanced threat analysis and vulnerability research',
    fullDescription: 'Leading cutting-edge research in cyber security threats, developing advanced penetration testing methodologies, and contributing to open-source security tools. Specializing in web application security and network penetration testing.',
    tags: ['THREAT_ANALYSIS', 'PENETRATION_TESTING', 'SECURITY_RESEARCH'],
    achievement: 'Developed proprietary security scanning tools used by enterprise clients'
  },
  {
    year: '2022-PRESENT',
    title: 'Full Stack Security Engineer',
    description: 'Building secure applications with security-first approach',
    fullDescription: 'Architecting and developing full-stack applications with built-in security features. Implementing secure coding practices, encryption protocols, and security testing throughout the development lifecycle.',
    tags: ['SECURE_DEVELOPMENT', 'APPLICATION_SECURITY', 'ENCRYPTION'],
    achievement: 'Built IRS-grade secure financial systems handling sensitive data'
  },
  {
    year: '2023-PRESENT',
    title: 'Security Consultant & Trainer',
    description: 'Enterprise security consulting and team training',
    fullDescription: 'Providing security consulting services to enterprise clients, conducting security audits, and training development teams on secure coding practices. Specializing in application security and secure architecture design.',
    tags: ['CONSULTING', 'SECURITY_AUDITS', 'TEAM_TRAINING'],
    achievement: 'Trained 50+ developers in secure coding practices'
  },
  {
    year: '2024-PRESENT',
    title: 'Cyber Defense Lead',
    description: 'Leading security initiatives and threat response',
    fullDescription: 'Leading cyber defense initiatives, implementing advanced threat detection systems, and managing security incident response. Focusing on proactive security measures and continuous security monitoring.',
    tags: ['THREAT_DETECTION', 'INCIDENT_RESPONSE', 'SECURITY_LEADERSHIP'],
    achievement: 'Reduced security incidents by 80% through proactive measures'
  }
])

// Enhanced tech stack with security focus
const techStack = ref([
  { name: 'Vue.js', emoji: '⚡', level: 'Expert', category: 'frontend' },
  { name: 'Python', emoji: '🐍', level: 'Advanced', category: 'backend' },
  { name: 'FastAPI', emoji: '🚀', level: 'Advanced', category: 'backend' },
  { name: 'React', emoji: '⚛️', level: 'Advanced', category: 'frontend' },
  { name: 'Docker', emoji: '🐳', level: 'Advanced', category: 'tools' },
  { name: 'MongoDB', emoji: '🍃', level: 'Advanced', category: 'backend' },
  { name: 'Kali Linux', emoji: '🔓', level: 'Expert', category: 'security' },
  { name: 'Metasploit', emoji: '⚔️', level: 'Advanced', category: 'security' },
  { name: 'Burp Suite', emoji: '🔍', level: 'Expert', category: 'security' },
  { name: 'Node.js', emoji: '🟢', level: 'Advanced', category: 'backend' },
  { name: 'PostgreSQL', emoji: '🐘', level: 'Intermediate', category: 'backend' },
  { name: 'AWS', emoji: '☁️', level: 'Intermediate', category: 'tools' },
  { name: 'OWASP', emoji: '🛡️', level: 'Expert', category: 'security' },
  { name: 'Nmap', emoji: '📡', level: 'Advanced', category: 'security' },
  { name: 'Wireshark', emoji: '🕵️', level: 'Advanced', category: 'security' },
  { name: 'Git', emoji: '📚', level: 'Expert', category: 'tools' }
])

const techCategories = ref([
  { name: 'all', emoji: '⚡' },
  { name: 'security', emoji: '🛡️' },
  { name: 'frontend', emoji: '🎨' },
  { name: 'backend', emoji: '⚙️' }
])

const filteredTechStack = computed(() => {
  if (activeTechCategory.value === 'all') return techStack.value
  return techStack.value.filter(tech => tech.category === activeTechCategory.value)
})

// Security specializations
const securitySpecializations = ref([
  {
    emoji: '🔍',
    title: 'Penetration Testing',
    description: 'Authorized simulated attacks to identify vulnerabilities',
    level: 5
  },
  {
    emoji: '🛡️',
    title: 'Web Application Security',
    description: 'Securing web applications against common vulnerabilities',
    level: 5
  },
  {
    emoji: '🌐',
    title: 'Network Security',
    description: 'Securing network infrastructure and protocols',
    level: 4
  },
  {
    emoji: '📱',
    title: 'Mobile Security',
    description: 'Securing mobile applications and devices',
    level: 4
  }
])

// Security metrics
const securityMetrics = ref([
  {
    emoji: '✅',
    title: 'SECURITY_AUDITS',
    value: '25+ COMPLETED',
    subtitle: 'Zero critical findings'
  },
  {
    emoji: '⚡',
    title: 'RESPONSE_TIME',
    value: '< 2 HOURS',
    subtitle: 'Security incident response'
  },
  {
    emoji: '🛡️',
    title: 'SYSTEMS_SECURED',
    value: '50+ ENTERPRISE',
    subtitle: 'No security breaches'
  }
])

// Helper functions
const binaryStreamStyle = (index) => {
  return {
    left: `${(index / 80) * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 10 + 15}s`
  }
}

const setActiveCategory = (category) => {
  activeCategory.value = category
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: 400 })
}

const setActiveTechCategory = (category) => {
  activeTechCategory.value = category
}

const showTimelineDetail = (item) => {
  selectedTimelineItem.value = item
}

const getTechEmoji = (techName) => {
  const emojis = {
    'Vue.js': '⚡',
    'React': '⚛️',
    'Python': '🐍',
    'FastAPI': '🚀',
    'Docker': '🐳',
    'MongoDB': '🍃',
    'Node.js': '🟢',
    'Kali Linux': '🔓',
    'Metasploit': '⚔️',
    'Burp Suite': '🔍',
    'Web Security': '🛡️',
    'Penetration Testing': '🔐',
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'AWS': '☁️',
    'PostgreSQL': '🐘',
    'MySQL': '🐬',
    'Git': '📚',
    'Linux': '🐧',
    'Nginx': '🔰',
    'OWASP': '🛡️',
    'Nmap': '📡',
    'Wireshark': '🕵️'
  }
  return emojis[techName] || '💻'
}

const getProficiencyClass = (proficiency) => {
  if (proficiency >= 80) return 'bg-gradient-to-r from-green-400 to-cyber-accent'
  if (proficiency >= 60) return 'bg-gradient-to-r from-cyber-primary to-cyber-secondary'
  return 'bg-gradient-to-r from-cyber-secondary to-purple-500'
}

const getTechLevelWidth = (level) => {
  const levelMap = {
    'Expert': '90%',
    'Advanced': '75%',
    'Intermediate': '60%',
    'Beginner': '40%'
  }
  return levelMap[level] || '50%'
}

const animateSkillBar = (skill) => {
  const progressBars = document.querySelectorAll('.skill-progress')
  progressBars.forEach(bar => {
    const proficiency = bar.getAttribute('data-proficiency')
    if (parseInt(proficiency) === skill.proficiency) {
      bar.style.transform = 'scaleX(1.05)'
      setTimeout(() => {
        bar.style.transform = 'scaleX(1)'
      }, 300)
    }
  })
}

onMounted(async () => {
  // ✅ ADDED: Test backend connection first
  console.log('🧪 Testing backend connection to:', API_BASE_URL)
  
  try {
    const testResponse = await fetch(`${API_BASE_URL}/api/v1/skills`, { 
      signal: AbortSignal.timeout(5000) 
    })
    console.log('🔗 Backend connection test:', {
      status: testResponse.status,
      ok: testResponse.ok,
      url: API_BASE_URL
    })
  } catch (testError) {
    console.error('🔗 Backend connection FAILED:', testError)
  }
  
  fetchSkills() // Load real skills from API

  // Animate skill bars on load
  setTimeout(() => {
    const progressBars = document.querySelectorAll('.skill-progress')
    progressBars.forEach(bar => {
      bar.style.transition = 'width 1.5s ease-in-out'
    })
  }, 1000)

  // Animate timeline items
  setTimeout(() => {
    const timelineItems = document.querySelectorAll('.timeline-item')
    timelineItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.2}s`
      item.classList.add('animate-in')
    })
  }, 500)
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

.cyber-badge {
  @apply px-3 py-1 rounded-full font-tech text-xs border;
}

.skill-track {
  width: 100%;
  height: 8px;
  background: #1a1a2e;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #00f0ff, #ff00ff);
  border-radius: 4px;
  position: relative;
  transition: width 1.5s ease-in-out;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shine 2s infinite;
}

.timeline-item {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.6s ease-out;
}

.timeline-item.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.timeline-item:nth-child(even) {
  transform: translateX(50px);
}

.timeline-item:nth-child(even).animate-in {
  transform: translateX(0);
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

@keyframes shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Staggered animation for timeline */
.timeline-item:nth-child(1) { transition-delay: 0.1s; }
.timeline-item:nth-child(2) { transition-delay: 0.3s; }
.timeline-item:nth-child(3) { transition-delay: 0.5s; }
.timeline-item:nth-child(4) { transition-delay: 0.7s; }
</style>