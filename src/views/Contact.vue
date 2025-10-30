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

    <!-- Holographic Contact Terminal -->
    <div class="hologram-container">
      <div class="hologram-ring ring-1"></div>
      <div class="hologram-ring ring-2"></div>
      <div class="hologram-ring ring-3"></div>
      <div class="hologram-core">
        <div class="text-6xl">📡</div>
      </div>
    </div>

    <div class="relative z-10 pt-28 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Epic Header -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-full px-6 py-3 mb-6">
            <MessageCircle class="w-5 h-5 text-cyber-primary" />
            <span class="font-cyber text-cyber-primary text-sm">QUANTUM_COMM_LINK</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-cyber font-bold mb-6 cyber-text glitch" data-text="CONTACT_NODE">
            CONTACT_NODE
          </h1>
          <p class="text-xl text-gray-300 font-tech max-w-3xl mx-auto leading-relaxed">
            <span class="text-cyber-primary">Secure Transmission Protocol</span> & 
            <span class="text-cyber-accent">Digital Communication Channels</span> for your next mission
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <!-- Contact Information -->
          <div class="relative">
            <div class="cyber-card p-8 relative overflow-hidden group h-full">
              <!-- Animated Border -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary to-cyber-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute inset-[2px] bg-cyber-darker rounded-xl"></div>
              
              <div class="relative z-10">
                <h2 class="text-3xl font-cyber text-cyber-primary mb-8 text-center">COMMUNICATION_CHANNELS</h2>
                
                <!-- Contact Methods -->
                <div class="space-y-6">
                  <div 
                    v-for="contact in contactMethods"
                    :key="contact.type"
                    class="cyber-contact-item group p-4 rounded-lg border border-cyber-card/50 hover:border-cyber-primary/50 transition-all duration-300 cursor-pointer"
                    @click="initiateContact(contact)"
                    @mouseenter="createParticleEffect($event)"
                  >
                    <div class="flex items-center gap-4">
                      <div class="p-3 bg-cyber-primary/20 rounded-lg group-hover:scale-110 transition-transform">
                        <component :is="contact.icon" class="w-6 h-6 text-cyber-primary" />
                      </div>
                      <div class="flex-1">
                        <h3 class="font-cyber text-cyber-primary text-sm">{{ contact.label }}</h3>
                        <p class="text-white font-tech">{{ contact.value }}</p>
                      </div>
                      <ArrowRight class="w-4 h-4 text-cyber-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                <!-- Social Links -->
                <div class="mt-8 pt-8 border-t border-cyber-card/50">
                  <h3 class="font-cyber text-cyber-primary mb-4 text-center">DIGITAL_FOOTPRINT</h3>
                  <div class="flex justify-center gap-4">
                    <div 
                      v-for="social in socialLinks"
                      :key="social.name"
                      class="cyber-social-btn group"
                      @click="activateProtocol($event)"
                    >
                      <component :is="social.icon" class="w-5 h-5" />
                      <span class="cyber-tooltip">{{ social.label }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <h3 class="text-3xl font-cyber text-cyber-primary mb-8 text-center">QUANTUM_MESSAGE_TRANSMITTER</h3>
            
            <div class="cyber-card p-8 relative overflow-hidden">
              <!-- Animated Border -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary to-cyber-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute inset-[2px] bg-cyber-darker rounded-xl"></div>

              <div class="relative z-10">
                <!-- Transmission Status -->
                <div v-if="loading" class="cyber-status transmitting mb-6">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 bg-cyber-primary rounded-full animate-pulse"></div>
                    <span class="font-cyber text-cyber-primary">TRANSMITTING_MESSAGE...</span>
                  </div>
                </div>

                <div v-if="success" class="cyber-status success mb-6">
                  <div class="flex items-center gap-3">
                    <CheckCircle class="w-5 h-5 text-green-400" />
                    <span class="font-cyber text-green-400">TRANSMISSION_SUCCESSFUL</span>
                  </div>
                </div>

                <div v-if="submitError" class="cyber-status error mb-6">
                  <div class="flex items-center gap-3">
                    <AlertCircle class="w-5 h-5 text-red-400" />
                    <span class="font-cyber text-red-400">TRANSMISSION_FAILED</span>
                  </div>
                </div>

                <!-- Contact Form -->
                <form @submit.prevent="transmitMessage" class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    <div class="cyber-input-group">
                      <label class="cyber-label">IDENTITY_MATRIX</label>
                      <input
                        v-model="formData.name"
                        type="text"
                        class="cyber-input"
                        placeholder="ENTER_YOUR_NAME"
                        @focus="activateInput('name')"
                        @blur="validateField('name')"
                      />
                      <div v-if="fieldErrors.name" class="cyber-error">{{ fieldErrors.name }}</div>
                    </div>

                    <div class="cyber-input-group">
                      <label class="cyber-label">NODE_ADDRESS</label>
                      <input
                        v-model="formData.email"
                        type="email"
                        class="cyber-input"
                        placeholder="USER@DOMAIN.COM"
                        @focus="activateInput('email')"
                        @blur="validateField('email')"
                      />
                      <div v-if="fieldErrors.email" class="cyber-error">{{ fieldErrors.email }}</div>
                    </div>
                  </div>

                  <div class="cyber-input-group">
                    <label class="cyber-label">MESSAGE_PROTOCOL</label>
                    <input
                      v-model="formData.subject"
                      type="text"
                      class="cyber-input"
                      placeholder="MESSAGE_SUBJECT_OR_PROTOCOL"
                    />
                  </div>

                  <div class="cyber-input-group">
                    <label class="cyber-label">QUANTUM_MESSAGE</label>
                    <textarea
                      v-model="formData.message"
                      rows="6"
                      class="cyber-input resize-none"
                      placeholder="INITIATE_SECURE_TRANSMISSION..."
                      @focus="activateInput('message')"
                      @blur="validateField('message')"
                    ></textarea>
                    <div v-if="fieldErrors.message" class="cyber-error">{{ fieldErrors.message }}</div>
                  </div>

                  <button
                    type="submit"
                    :disabled="loading"
                    class="cyber-button w-full group relative overflow-hidden"
                    @mouseenter="createParticleEffect($event)"
                  >
                    <span class="relative z-10 flex items-center justify-center gap-3">
                      <span v-if="!loading">INITIATE_TRANSMISSION</span>
                      <span v-else>ENCRYPTING_MESSAGE...</span>
                      <Send class="w-4 h-4" />
                    </span>
                    <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary to-cyber-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Services Grid -->
        <div class="mb-20">
          <h3 class="text-3xl font-cyber text-cyber-primary mb-12 text-center">AVAILABLE_PROTOCOLS 🛠️</h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div 
              v-for="service in services"
              :key="service.title"
              class="cyber-card p-6 text-center group cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
              @click="createParticleEffect($event)"
            >
              <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">{{ service.emoji }}</div>
              <h4 class="font-cyber text-cyber-primary mb-3">{{ service.title }}</h4>
              <p class="text-gray-400 text-sm leading-relaxed">{{ service.description }}</p>
            </div>
          </div>
        </div>

        <!-- Security Badge -->
        <div class="text-center">
          <div class="inline-flex items-center gap-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-full px-6 py-3">
            <Shield class="w-5 h-5 text-cyber-primary" />
            <span class="font-cyber text-cyber-primary text-sm">END_TO_END_ENCRYPTION_ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'
import { useAnimations } from '../composables/useAnimations'
import CyberNavbar from '../components/Layout/CyberNavbar.vue'
import { 
  MessageCircle, 
  ArrowRight, 
  Shield, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Linkedin,
  Twitter,
  User,
  Settings,
  MessageSquare,
  MessageCircle as Telegram
} from 'lucide-vue-next'

// Initialize stores and animations
const portfolioStore = usePortfolioStore()
const { createParticleEffect } = useAnimations()

// Enhanced reactive state
const loading = ref(false)
const success = ref(false)
const submitError = ref(false)
const errorMessage = ref('')

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const fieldErrors = reactive({
  name: '',
  email: '',
  message: ''
})

// Enhanced contact methods with Telegram
const contactMethods = [
  {
    type: 'email',
    label: 'QUANTUM_MAIL',
    value: 'amanuelsisay687@gmail.com',
    icon: Mail,
    action: 'mailto:amanuelsisay687@gmail.com'
  },
  {
    type: 'telegram',
    label: 'SECURE_CHANNEL',
    value: '@anereges19',
    icon: Telegram,
    action: 'https://t.me/anereges19'
  },
  {
    type: 'signal',
    label: 'ENCRYPTED_SIGNAL',
    value: '+251946100269',
    icon: Phone,
    action: 'tel:+251946100269'
  },
  {
    type: 'coordinates',
    label: 'DIGITAL_HQ',
    value: 'Virtual Space • Global',
    icon: MapPin,
    action: null
  }
]

// Social links with Telegram
const socialLinks = [
  { 
    name: 'telegram', 
    icon: Telegram, 
    url: 'https://t.me/anereges19', 
    label: 'Telegram' 
  },
  { 
    name: 'github', 
    icon: Github, 
    url: 'https://github.com/Anereges', 
    label: 'GitHub' 
  },
  { 
    name: 'linkedin', 
    icon: Linkedin, 
    url: 'https://linkedin.com/in/amanuelsisay', 
    label: 'LinkedIn' 
  },
  { 
    name: 'twitter', 
    icon: Twitter, 
    url: 'https://twitter.com/MrAman', 
    label: 'Twitter' 
  }
]

const services = [
  {
    emoji: '🌐',
    title: 'WEB_SYSTEMS',
    description: 'Advanced web applications with cutting-edge security protocols and immersive user experiences.'
  },
  {
    emoji: '🛡️',
    title: 'CYBER_DEFENSE',
    description: 'Military-grade security implementations to protect your digital assets from modern threats.'
  },
  {
    emoji: '⚡',
    title: 'QUANTUM_APPS',
    description: 'High-performance applications optimized for speed, scalability, and next-gen user interfaces.'
  }
]

// API Configuration - Updated to match FastAPI routes
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_ENDPOINTS = {
  CONTACTS: `${API_BASE_URL}/api/v1/contacts`,
  HEALTH: `${API_BASE_URL}/health`
}

// Enhanced methods
const initiateContact = (contact) => {
  if (contact.action) {
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 })
    setTimeout(() => {
      if (contact.action.startsWith('http')) {
        window.open(contact.action, '_blank')
      } else {
        window.location.href = contact.action
      }
    }, 500)
  }
}

const activateProtocol = (event) => {
  createParticleEffect(event)
}

const activateInput = (fieldName) => {
  const element = document.querySelector(`[name="${fieldName}"]`)
  element?.classList.add('input-active')
}

const validateField = (fieldName) => {
  const element = document.querySelector(`[name="${fieldName}"]`)
  element?.classList.remove('input-active')
  
  const value = formData[fieldName]?.trim() || ''
  
  switch (fieldName) {
    case 'name':
      fieldErrors.name = value.length < 2 ? 'IDENTITY_VERIFICATION_FAILED: Name must be at least 2 characters' : ''
      break
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      fieldErrors.email = !emailRegex.test(value) ? 'INVALID_NODE_ADDRESS: Please enter a valid email' : ''
      break
    case 'message':
      fieldErrors.message = value.length < 10 ? 'TRANSMISSION_TOO_SHORT: Message must be at least 10 characters' : ''
      break
  }
}

const validateForm = () => {
  Object.keys(formData).forEach(field => {
    if (field !== 'subject') { // Don't validate subject as it's optional
      validateField(field)
    }
  })
  return !Object.values(fieldErrors).some(error => error !== '')
}

// Real API communication function - Updated for FastAPI
const transmitMessage = async () => {
  console.log('Quantum transmission initiated...')
  
  // Reset states
  submitError.value = false
  success.value = false
  errorMessage.value = ''

  // Validate form
  if (!validateForm()) {
    console.log('Transmission validation failed')
    submitError.value = true
    errorMessage.value = 'Please fix the validation errors above'
    return
  }

  loading.value = true
  console.log('Transmitting message to backend...', formData)

  try {
    // Prepare the payload - matches ContactCreate model
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim() || 'New Contact Message',
      message: formData.message.trim()
    }

    // Make real API call to FastAPI endpoint
    const response = await fetch(API_ENDPOINTS.CONTACTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Network error' }))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    
    // Success handling - matches StandardResponse model
    if (result.success) {
      success.value = true
      console.log('Quantum transmission successful!', result)
      
      // Reset form
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
      
      // Show success animation
      createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 })
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        success.value = false
      }, 5000)
    } else {
      throw new Error(result.message || 'Transmission failed')
    }
    
  } catch (error) {
    console.error('Quantum transmission failed:', error)
    submitError.value = true
    errorMessage.value = error.message || 'TRANSMISSION_FAILED: Unable to send message. Please try again.'
    
    // Hide error after 8 seconds
    setTimeout(() => {
      submitError.value = false
      errorMessage.value = ''
    }, 8000)
  } finally {
    loading.value = false
  }
}

// Test backend connection
const testBackendConnection = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.HEALTH)
    if (response.ok) {
      const health = await response.json()
      console.log('Backend connection: ACTIVE', health)
    } else {
      console.warn('Backend connection: UNSTABLE')
    }
  } catch (error) {
    console.error('Backend connection: OFFLINE', error)
  }
}

const binaryStreamStyle = (index) => {
  return {
    left: `${(index / 80) * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${Math.random() * 10 + 15}s`
  }
}

// Initialize everything
onMounted(() => {
  console.log('Cyber Contact Terminal activated')
  console.log('Portfolio store:', portfolioStore)
  
  // Test backend connection on mount
  testBackendConnection()
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

.cyber-contact-item {
  background: rgba(26, 26, 46, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.cyber-contact-item:hover {
  background: rgba(0, 240, 255, 0.1);
  transform: translateX(5px);
}

.cyber-social-btn {
  @apply relative p-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-lg text-cyber-primary hover:bg-cyber-primary/20 transition-all duration-300 cursor-pointer;
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

.cyber-input-group {
  @apply space-y-2;
}

.cyber-label {
  @apply block font-cyber text-cyber-primary text-sm;
}

.cyber-input {
  @apply w-full px-4 py-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-lg text-white font-tech placeholder-gray-500 focus:outline-none focus:border-cyber-primary transition-all duration-300;
}

.cyber-input:focus {
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.cyber-error {
  @apply text-red-400 font-tech text-xs mt-1;
}

.cyber-button {
  @apply px-6 py-4 bg-cyber-card/50 border border-cyber-primary/30 rounded-lg text-cyber-primary font-cyber hover:bg-cyber-primary/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed;
}

.cyber-button:hover:not(:disabled) {
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);
  transform: translateY(-2px);
}

.cyber-status {
  @apply p-4 rounded-lg border;
}

.cyber-status.transmitting {
  @apply border-cyber-primary bg-cyber-primary/10;
}

.cyber-status.success {
  @apply border-green-400 bg-green-400/10;
}

.cyber-status.error {
  @apply border-red-400 bg-red-400/10;
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .hologram-container {
    display: none;
  }
  
  .cyber-contact-item {
    padding: 3rem 1rem;
  }
}
</style>