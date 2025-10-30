<template>
  <div class="min-h-screen relative">
    <CyberNavbar />
    
    <!-- Security Shield Animation -->
    <div class="security-shield">
      <div class="shield-ring ring-1"></div>
      <div class="shield-ring ring-2"></div>
      <div class="shield-ring ring-3"></div>
      <div class="shield-core">
        <Shield class="w-12 h-12 text-cyber-accent" />
      </div>
    </div>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-4 relative overflow-hidden">
      <div class="max-w-7xl mx-auto text-center">
        <!-- Animated Background Orbs -->
        <div class="absolute top-1/4 left-1/4 w-80 h-80 bg-cyber-primary rounded-full filter blur-3xl opacity-5 animate-pulse-cyber"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyber-secondary rounded-full filter blur-3xl opacity-5 animate-pulse-cyber" style="animation-delay: 1s"></div>
        
        <!-- Main Content -->
        <div class="relative z-10">
          <!-- Security Badge -->
          <div class="inline-flex items-center gap-2 bg-cyber-card border border-cyber-accent/30 rounded-full px-4 py-2 mb-8">
            <Shield class="w-4 h-4 text-cyber-accent" />
            <span class="font-cyber text-cyber-accent text-sm">CERTIFIED ETHICAL HACKER</span>
          </div>

          <!-- Greeting -->
          <div class="mb-8">
            <h2 class="text-cyber-accent font-tech text-xl mb-4 text-reveal">
              🔐 Secure Digital World! I'm Amanuel
            </h2>
          </div>

          <!-- Name with Hacking Effect -->
          <h1 
            ref="nameElement"
            class="text-6xl md:text-8xl font-cyber font-bold mb-6 cyber-text glitch"
            data-text="0x414D414E55454C"
          >
            0x414D414E55454C
          </h1>

          <!-- Professional Titles -->
          <div class="mb-8">
            <div class="flex flex-wrap justify-center gap-4 mb-4">
              <span class="cyber-badge bg-cyber-primary/20 text-cyber-primary">Full Stack Developer</span>
              <span class="cyber-badge bg-cyber-secondary/20 text-cyber-secondary">Cyber Security Expert</span>
              <span class="cyber-badge bg-cyber-accent/20 text-cyber-accent">Ethical Hacker</span>
            </div>
            <p class="text-xl text-gray-400 font-tech max-w-3xl mx-auto leading-relaxed">
              🚀 Building <span class="text-cyber-primary">secure digital fortresses</span> and 
              <span class="text-cyber-accent"> enterprise-grade systems</span> with cutting-edge technology
            </p>
          </div>

          <!-- Security Level Indicator -->
          <div class="max-w-md mx-auto mb-12">
            <div class="flex justify-between text-sm font-tech text-gray-400 mb-2">
              <span>SECURITY LEVEL</span>
              <span class="text-cyber-accent">ENTERPRISE GRADE</span>
            </div>
            <div class="w-full bg-cyber-card rounded-full h-2">
              <div class="bg-gradient-to-r from-cyber-primary to-cyber-accent h-2 rounded-full animate-pulse"></div>
            </div>
          </div>

          <!-- Animated Typing Text -->
          <div class="mb-12">
            <div class="typing-container inline-block">
              <span class="text-cyber-accent font-tech text-lg typing-text">
                {{ currentQuote }}
              </span>
              <span class="typing-cursor">|</span>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              @click="$router.push('/projects')"
              @mouseenter="createParticleEffect($event)"
              class="cyber-button text-lg px-8 py-4 group relative overflow-hidden"
            >
              <span class="relative z-10 flex items-center">
                Explore My Arsenal ⚔️
                <ArrowRight class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              @click="$router.push('/contact')"
              @mouseenter="createParticleEffect($event, '#ff00ff')"
              class="cyber-button text-lg px-8 py-4 border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary/10 group"
            >
              Secure Connection 📡
              <Sparkles class="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform" />
            </button>

            <button 
              @click="showSecurityServices = true"
              @mouseenter="createParticleEffect($event, '#00ff88')"
              class="cyber-button text-lg px-8 py-4 border-cyber-accent text-cyber-accent hover:bg-cyber-accent/10 group"
            >
              Security Audit 🔍
              <Shield class="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <!-- Advanced Stats -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div 
              v-for="stat in computedStats" 
              :key="stat.label"
              class="cyber-card p-6 text-center group cursor-pointer relative overflow-hidden"
              @mouseenter="animateStat(stat, $event)"
            >
              <!-- Animated Background -->
              <div class="absolute inset-0 bg-gradient-to-br from-cyber-primary/10 to-cyber-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative z-10">
                <div class="text-3xl font-cyber text-cyber-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {{ stat.value }}{{ stat.plus ? '+' : '' }}
                </div>
                <div class="text-gray-400 font-tech text-sm">{{ stat.label }}</div>
                <div class="text-cyber-accent text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {{ stat.subtitle }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Real Projects Section -->
    <section class="py-20 px-4 bg-cyber-dark/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-cyber mb-4 cyber-text">
            SECURE_PROJECTS 🔒
          </h2>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Enterprise-grade applications with military-level security protocols
          </p>
        </div>
        
        <!-- Loading State -->
        <div v-if="loadingProjects" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="n in 3" :key="n" class="cyber-card p-6 animate-pulse">
            <div class="h-48 bg-cyber-dark/50 rounded-lg mb-4"></div>
            <div class="h-4 bg-cyber-primary/20 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-cyber-primary/10 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Real Projects Grid -->
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in featuredProjects"
            :key="project._id"
            class="cyber-card p-6 group cursor-pointer relative overflow-hidden animate-cyber-card"
            @click="$router.push('/projects')"
            @mouseenter="createParticleEffect($event)"
          >
            <!-- Featured Badge -->
            <div v-if="project.featured" class="absolute top-4 right-4 z-20">
              <div class="flex items-center gap-1 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-full text-xs font-tech">
                <Star class="w-3 h-3 fill-current" />
                FEATURED
              </div>
            </div>

            <!-- Project Icon & Status -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-3xl">{{ getProjectIcon(project.category) }}</span>
              <span :class="statusBadgeClasses(project.status)">
                {{ formatStatus(project.status) }}
              </span>
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
              </div>
              <div class="text-gray-500 text-xs font-tech">
                {{ formatDate(project.created_at) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loadingProjects && featuredProjects.length === 0" class="text-center py-12">
          <Shield class="w-16 h-16 text-cyber-primary/50 mx-auto mb-4" />
          <h3 class="text-xl font-cyber text-cyber-primary mb-2">NO_PROJECTS_DEPLOYED</h3>
          <p class="text-gray-400 mb-6">Security projects are being fortified...</p>
          <button 
            @click="fetchProjects"
            class="cyber-button border-cyber-accent text-cyber-accent"
          >
            SCAN_FOR_PROJECTS
          </button>
        </div>

        <div class="text-center mt-12">
          <button 
            @click="$router.push('/projects')"
            class="cyber-button text-lg group"
          >
            Access Full Portfolio 🎯
            <ArrowRight class="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-20 px-4 bg-cyber-dark/30">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-cyber mb-4 cyber-text">
            TECH_ARSENAL ⚡
          </h2>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Advanced tools and technologies for building secure digital solutions
          </p>
        </div>

        <div v-if="loadingSkills" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="n in 12" :key="n" class="cyber-card p-4 text-center animate-pulse">
            <div class="h-12 bg-cyber-primary/20 rounded-lg mb-2"></div>
            <div class="h-3 bg-cyber-primary/10 rounded w-3/4 mx-auto"></div>
          </div>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="skill in skills"
            :key="skill._id"
            class="cyber-card p-4 text-center group cursor-pointer relative overflow-hidden"
            @mouseenter="createParticleEffect($event)"
          >
            <div class="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {{ getSkillEmoji(skill.name) }}
            </div>
            <h3 class="font-tech text-cyber-primary text-sm mb-2">{{ skill.name }}</h3>
            <div class="w-full bg-cyber-dark rounded-full h-1">
              <div 
                class="h-1 rounded-full bg-gradient-to-r from-cyber-primary to-cyber-accent transition-all duration-1000"
                :style="{ width: skill.level + '%' }"
              ></div>
            </div>
            <div class="text-cyber-accent text-xs mt-1">{{ skill.level }}%</div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loadingSkills && skills.length === 0" class="text-center py-12">
          <Code2 class="w-16 h-16 text-cyber-primary/50 mx-auto mb-4" />
          <h3 class="text-xl font-cyber text-cyber-primary mb-2">SKILLS_DATABASE_EMPTY</h3>
          <p class="text-gray-400">Technical arsenal is being configured...</p>
        </div>
      </div>
    </section>

    <!-- Specializations Grid -->
    <section class="py-20 px-4 bg-cyber-dark/50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-cyber text-center mb-4 cyber-text">
          DIGITAL_SPECIALIZATIONS 🛡️
        </h2>
        <p class="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          From secure code to enterprise infrastructure - building tomorrow's digital landscape today
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="specialization in specializations"
            :key="specialization.title"
            class="cyber-card p-8 group cursor-pointer relative overflow-hidden"
            @mouseenter="createParticleEffect($event)"
          >
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ specialization.emoji }}
            </div>
            <h3 class="text-xl font-cyber text-cyber-primary mb-4">{{ specialization.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-4">{{ specialization.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in specialization.tech"
                :key="tech"
                class="px-2 py-1 bg-cyber-primary/10 text-cyber-primary rounded text-xs font-tech"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Blog Posts -->
    <section class="py-20 px-4 bg-cyber-dark/30">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-cyber mb-4 cyber-text">
            SECURITY_BLOG 📝
          </h2>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Latest insights on cyber security, ethical hacking, and secure development practices
          </p>
        </div>

        <div v-if="loadingBlogPosts" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="n in 3" :key="n" class="cyber-card p-6 animate-pulse">
            <div class="h-48 bg-cyber-dark/50 rounded-lg mb-4"></div>
            <div class="h-4 bg-cyber-primary/20 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-cyber-primary/10 rounded w-1/2 mb-4"></div>
            <div class="h-2 bg-cyber-primary/5 rounded w-full mb-1"></div>
            <div class="h-2 bg-cyber-primary/5 rounded w-2/3"></div>
          </div>
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="post in blogPosts"
            :key="post._id"
            class="cyber-card p-6 group cursor-pointer relative overflow-hidden"
            @click="$router.push(`/blog/${post.slug}`)"
            @mouseenter="createParticleEffect($event)"
          >
            <div class="absolute top-4 right-4">
              <span :class="[
                'px-2 py-1 rounded text-xs font-tech',
                post.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              ]">
                {{ post.status }}
              </span>
            </div>
            
            <div class="text-2xl mb-4">{{ getCategoryEmoji(post.category) }}</div>
            <h3 class="text-xl font-cyber text-cyber-primary mb-3 line-clamp-2">{{ post.title }}</h3>
            <p class="text-gray-400 text-sm mb-4 line-clamp-3">{{ post.excerpt || post.content?.substring(0, 120) + '...' }}</p>
            
            <div class="flex items-center justify-between text-xs">
              <span class="text-cyber-accent font-tech">{{ post.category }}</span>
              <div class="flex items-center gap-2">
                <Clock class="w-3 h-3 text-cyber-primary" />
                <span class="text-cyber-primary">{{ post.read_time || '5' }}min</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!loadingBlogPosts && blogPosts.length === 0" class="text-center py-12">
          <FileText class="w-16 h-16 text-cyber-primary/50 mx-auto mb-4" />
          <h3 class="text-xl font-cyber text-cyber-primary mb-2">NO_BLOG_POSTS</h3>
          <p class="text-gray-400">Security insights are being documented...</p>
        </div>

        <div class="text-center mt-12">
          <button 
            @click="$router.push('/blog')"
            class="cyber-button text-lg group"
          >
            Read Security Blog 📚
            <ArrowRight class="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>

    <!-- Security Services Modal -->
    <div v-if="showSecurityServices" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="cyber-card p-8 max-w-2xl w-full relative">
        <button 
          @click="showSecurityServices = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-cyber-primary transition-colors"
        >
          <X class="w-6 h-6" />
        </button>
        
        <h3 class="text-2xl font-cyber text-cyber-primary mb-6">SECURITY_SERVICES 🔐</h3>
        
        <div class="space-y-4">
          <div v-for="service in securityServices" :key="service.name" class="flex items-start gap-4 p-4 hover:bg-cyber-primary/5 rounded-lg transition-colors">
            <div class="text-2xl">{{ service.emoji }}</div>
            <div>
              <h4 class="font-cyber text-cyber-accent mb-2">{{ service.name }}</h4>
              <p class="text-gray-400 text-sm">{{ service.description }}</p>
            </div>
          </div>
        </div>
        
        <button 
          @click="$router.push('/contact')"
          class="cyber-button w-full mt-6"
        >
          Request Security Audit 🚀
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimations } from '../composables/useAnimations'
import CyberNavbar from '../components/Layout/CyberNavbar.vue'
import { 
  Shield, 
  ArrowRight, 
  Sparkles, 
  X, 
  Code2, 
  FileText, 
  Clock, 
  Star, 
  Github, 
  ExternalLink 
} from 'lucide-vue-next'

const router = useRouter()
const { createParticleEffect } = useAnimations()

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_ENDPOINTS = {
  PROJECTS: `${API_BASE_URL}/api/v1/projects/featured`,
  SKILLS: `${API_BASE_URL}/api/v1/skills`,
  BLOG: `${API_BASE_URL}/api/v1/blog`
}

// Refs
const nameElement = ref(null)
const currentQuote = ref('')
const quoteIndex = ref(0)
const showSecurityServices = ref(false)

// Loading states
const loadingProjects = ref(true)
const loadingSkills = ref(true)
const loadingBlogPosts = ref(true)

// Data states
const featuredProjects = ref([])
const skills = ref([])
const blogPosts = ref([])

// Cyber Security Quotes
const CYBER_SECURITY_QUOTES = [
  "Building digital fortresses with impenetrable security...",
  "Ethical hacking to strengthen your cyber defenses...", 
  "Secure by design, resilient by default...",
  "Protecting digital assets with advanced threat intelligence...",
  "Zero trust architecture for enterprise security..."
]

// Static data
const specializations = ref([
  {
    emoji: '🛡️',
    title: 'Cyber Security',
    description: 'Advanced threat protection, vulnerability assessment, and secure architecture design for enterprise systems.',
    tech: ['Penetration Testing', 'Security Audits', 'Threat Analysis', 'Incident Response']
  },
  {
    emoji: '💻',
    title: 'Full Stack Development',
    description: 'Building scalable web applications with security-first approach and modern development practices.',
    tech: ['Vue.js', 'FastAPI', 'MongoDB', 'Docker']
  },
  {
    emoji: '🔐',
    title: 'Ethical Hacking',
    description: 'Authorized penetration testing and security assessments to identify and mitigate vulnerabilities.',
    tech: ['OWASP', 'Kali Linux', 'Metasploit', 'Burp Suite']
  },
  {
    emoji: '🏢',
    title: 'Enterprise Systems',
    description: 'Designing and implementing secure, scalable enterprise solutions like IRS and financial systems.',
    tech: ['Microservices', 'API Security', 'Data Encryption', 'Compliance']
  },
  {
    emoji: '🌐',
    title: 'Network Security',
    description: 'Securing network infrastructure and implementing robust security protocols and monitoring.',
    tech: ['Firewalls', 'VPN', 'IDS/IPS', 'SIEM']
  },
  {
    emoji: '📱',
    title: 'Secure Mobile Apps',
    description: 'Developing mobile applications with built-in security features and data protection.',
    tech: ['React Native', 'Data Encryption', 'Secure APIs', 'App Hardening']
  }
])

const securityServices = ref([
  {
    emoji: '🔍',
    name: 'Security Audits',
    description: 'Comprehensive security assessment of your applications and infrastructure'
  },
  {
    emoji: '⚔️',
    name: 'Penetration Testing',
    description: 'Authorized simulated cyber attacks to identify vulnerabilities'
  },
  {
    emoji: '🏗️',
    name: 'Secure Architecture',
    description: 'Designing security-first system architectures from the ground up'
  },
  {
    emoji: '🚨',
    name: 'Incident Response',
    description: 'Rapid response and recovery from security incidents'
  }
])

// Computed stats based on real data
const computedStats = computed(() => {
  return [
    { 
      value: featuredProjects.value.length.toString(), 
      label: 'Featured Projects', 
      plus: true, 
      subtitle: 'Enterprise grade' 
    },
    { 
      value: skills.value.length.toString(), 
      label: 'Technologies', 
      plus: true, 
      subtitle: 'Mastered' 
    },
    { 
      value: blogPosts.value.length.toString(), 
      label: 'Blog Posts', 
      plus: true, 
      subtitle: 'Security insights' 
    },
    { 
      value: '99.9%', 
      label: 'System Uptime', 
      plus: false, 
      subtitle: 'Guaranteed' 
    }
  ]
})

// API Functions - UPDATED FOR FASTAPI
const fetchProjects = async () => {
  try {
    loadingProjects.value = true
    const response = await fetch(API_ENDPOINTS.PROJECTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    
    // Handle both array and paginated responses
    featuredProjects.value = Array.isArray(result) ? result.slice(0, 3) : 
                            Array.isArray(result.items) ? result.items.slice(0, 3) : []
    
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    // Fallback demo data
    featuredProjects.value = getDemoProjects()
  } finally {
    loadingProjects.value = false
  }
}

const fetchSkills = async () => {
  try {
    loadingSkills.value = true
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
    
    // Handle both array and paginated responses
    skills.value = Array.isArray(result) ? result.slice(0, 12) : 
                  Array.isArray(result.items) ? result.items.slice(0, 12) : []
    
  } catch (error) {
    console.error('Failed to fetch skills:', error)
    // Fallback demo data
    skills.value = getDemoSkills()
  } finally {
    loadingSkills.value = false
  }
}

const fetchBlogPosts = async () => {
  try {
    loadingBlogPosts.value = true
    const response = await fetch(`${API_ENDPOINTS.BLOG}?limit=3&status=published`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    
    // Handle both array and paginated responses
    blogPosts.value = Array.isArray(result) ? result.slice(0, 3) : 
                     Array.isArray(result.items) ? result.items.slice(0, 3) : []
    
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    // Fallback demo data
    blogPosts.value = getDemoBlogPosts()
  } finally {
    loadingBlogPosts.value = false
  }
}

// Helper functions
const getSkillEmoji = (skillName) => {
  const emojiMap = {
    'Vue.js': '⚡',
    'React': '⚛️',
    'Python': '🐍',
    'FastAPI': '🚀',
    'MongoDB': '🍃',
    'PostgreSQL': '🐘',
    'Docker': '🐳',
    'Kubernetes': '☸️',
    'AWS': '☁️',
    'Cyber Security': '🛡️',
    'Ethical Hacking': '🔐',
    'Penetration Testing': '⚔️',
    'JavaScript': '📜',
    'TypeScript': '🔷',
    'Node.js': '🟢',
    'Express.js': '🚂',
    'MySQL': '🐬',
    'Redis': '🔴',
    'Git': '📚',
    'Linux': '🐧'
  }
  return emojiMap[skillName] || '💻'
}

const getCategoryEmoji = (category) => {
  const emojiMap = {
    'security': '🛡️',
    'development': '💻',
    'hacking': '🔐',
    'tutorial': '📚',
    'news': '📰',
    'cybersecurity': '🛡️',
    'programming': '💻',
    'web': '🌐'
  }
  return emojiMap[category] || '📝'
}

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

// Typing animation for security-focused quotes
const typeQuote = async () => {
  const quote = CYBER_SECURITY_QUOTES[quoteIndex.value]
  currentQuote.value = ''
  
  for (let char of quote) {
    currentQuote.value += char
    await new Promise(resolve => setTimeout(resolve, 40))
  }
  
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  quoteIndex.value = (quoteIndex.value + 1) % CYBER_SECURITY_QUOTES.length
  typeQuote()
}

const animateStat = (stat, event) => {
  createParticleEffect(event)
  const element = event.currentTarget
  element.style.transform = 'scale(1.05)'
  setTimeout(() => {
    element.style.transform = 'scale(1)'
  }, 300)
}

// Demo data fallbacks
const getDemoProjects = () => [
  {
    _id: '1',
    title: 'Cybersecurity Dashboard',
    description: 'A comprehensive cybersecurity monitoring dashboard with real-time threat detection and analytics.',
    category: 'security',
    status: 'deployed',
    featured: true,
    technologies: ['Vue.js', 'FastAPI', 'MongoDB', 'Docker', 'Redis'],
    github_url: 'https://github.com/user/cyber-dashboard',
    live_url: 'https://cyber-dashboard.example.com',
    created_at: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'AI Trading Assistant',
    description: 'Machine learning-powered trading assistant that analyzes market patterns and provides investment recommendations.',
    category: 'ai',
    status: 'development',
    featured: false,
    technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL', 'AWS'],
    github_url: 'https://github.com/user/ai-trader',
    live_url: null,
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: '3',
    title: 'Blockchain Supply Chain',
    description: 'Decentralized supply chain management system using blockchain technology.',
    category: 'blockchain',
    status: 'testing',
    featured: true,
    technologies: ['Solidity', 'React', 'Node.js', 'Ethereum'],
    github_url: 'https://github.com/user/blockchain-supply',
    live_url: 'https://supply-chain-demo.example.com',
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
]

const getDemoSkills = () => [
  { _id: '1', name: 'Vue.js', level: 90 },
  { _id: '2', name: 'Python', level: 85 },
  { _id: '3', name: 'FastAPI', level: 88 },
  { _id: '4', name: 'MongoDB', level: 82 },
  { _id: '5', name: 'Docker', level: 80 },
  { _id: '6', name: 'Cyber Security', level: 87 },
  { _id: '7', name: 'Ethical Hacking', level: 83 },
  { _id: '8', name: 'React', level: 78 },
  { _id: '9', name: 'JavaScript', level: 88 },
  { _id: '10', name: 'Node.js', level: 75 },
  { _id: '11', name: 'AWS', level: 72 },
  { _id: '12', name: 'Linux', level: 85 }
]

const getDemoBlogPosts = () => [
  {
    _id: '1',
    title: 'Advanced Web Application Security',
    excerpt: 'Learn how to secure your web applications against common vulnerabilities and threats.',
    category: 'security',
    status: 'published',
    read_time: 8,
    slug: 'advanced-web-application-security'
  },
  {
    _id: '2',
    title: 'Ethical Hacking Fundamentals',
    excerpt: 'Understanding the basics of ethical hacking and penetration testing methodologies.',
    category: 'hacking',
    status: 'published',
    read_time: 6,
    slug: 'ethical-hacking-fundamentals'
  },
  {
    _id: '3',
    title: 'Building Secure APIs with FastAPI',
    excerpt: 'Best practices for creating secure and scalable APIs using FastAPI framework.',
    category: 'development',
    status: 'published',
    read_time: 10,
    slug: 'building-secure-apis-fastapi'
  }
]

onMounted(async () => {
  // Fetch all data in parallel
  await Promise.all([
    fetchProjects(),
    fetchSkills(),
    fetchBlogPosts()
  ])
  
  typeQuote()
})
</script>

<style scoped>
/* Your existing styles remain mostly the same with enhancements */
.security-shield {
  position: fixed;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  z-index: 0;
}

.shield-ring {
  position: absolute;
  border: 2px solid #00ff88;
  border-radius: 50%;
  animation: shieldPulse 3s ease-in-out infinite;
}

.shield-ring.ring-1 {
  width: 100px;
  height: 100px;
  animation-delay: 0s;
}

.shield-ring.ring-2 {
  width: 150px;
  height: 150px;
  animation-delay: 1s;
}

.shield-ring.ring-3 {
  width: 200px;
  height: 200px;
  animation-delay: 2s;
}

.shield-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 255, 136, 0.1);
  border-radius: 50%;
  padding: 20px;
}

.cyber-badge {
  @apply px-4 py-2 rounded-full font-tech text-sm border;
}

.typing-container {
  border-right: 2px solid #00f0ff;
  padding-right: 4px;
}

.typing-cursor {
  animation: blink 1s infinite;
}

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

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes shieldPulse {
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes cyberCardEntrance {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-cyber-card {
  animation: cyberCardEntrance 0.8s ease-out forwards;
}

.glitch {
  position: relative;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  animation: glitch-1 0.5s infinite linear alternate-reverse;
  color: #ff00ff;
  z-index: -1;
}

.glitch::after {
  animation: glitch-2 0.5s infinite linear alternate-reverse;
  color: #00f0ff;
  z-index: -2;
}

@keyframes glitch-1 {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

@keyframes glitch-2 {
  0% { transform: translate(0); }
  20% { transform: translate(2px, -2px); }
  40% { transform: translate(2px, 2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(-2px, 2px); }
  100% { transform: translate(0); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .security-shield {
    display: none;
  }
  
  h1 {
    font-size: 3rem !important;
  }
  
  .cyber-card {
    padding: 1.5rem 1rem;
  }
}
</style>