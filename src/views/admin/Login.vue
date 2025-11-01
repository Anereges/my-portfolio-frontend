<template>
  <div class="min-h-screen relative overflow-hidden bg-cyber-darker">
    <!-- Advanced Security Background -->
    <div class="security-bg">
      <div class="encryption-grid"></div>
      <div class="floating-lock-icons">
        <div v-for="i in 8" :key="i" class="lock-icon" :style="lockStyle(i)">
          <Lock class="w-8 h-8" />
        </div>
      </div>
      <div class="particle-field"></div>
    </div>

    <!-- Access Denied Shield (Initially Hidden) -->
    <div v-if="accessDenied" class="access-denied-overlay">
      <div class="shield-bounce">
        <Shield class="w-32 h-32 text-red-500" />
      </div>
      <div class="denied-text">ACCESS DENIED</div>
    </div>

    <!-- Back to Public Site Button -->
    <div class="fixed top-6 left-6 z-50">
      <button
        @click="goToPublicSite"
        class="flex items-center gap-3 cyber-button px-4 py-3 group transition-all duration-300 hover:bg-cyber-primary/20"
        title="Back to Public Website"
      >
        <ArrowLeft class="w-5 h-5 text-cyber-primary group-hover:-translate-x-1 transition-transform" />
        <span class="font-tech text-cyber-primary text-sm hidden sm:block">BACK TO SITE</span>
      </button>
    </div>

    <div class="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div class="w-full max-w-md">
        <!-- Security Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-3 bg-cyber-card/50 border border-cyber-primary/30 rounded-full px-6 py-3 mb-6">
            <Lock class="w-5 h-5 text-cyber-primary" />
            <span class="font-cyber text-cyber-primary text-sm">SECURE ADMIN ACCESS</span>
          </div>
          
          <h1 class="text-4xl md:text-6xl font-cyber font-bold mb-4 cyber-text glitch" data-text="SYSTEM_LOGIN">
            SYSTEM_LOGIN
          </h1>
          <p class="text-gray-400 font-tech">
            Authentication required for administrative access
          </p>
        </div>

        <!-- Login Form -->
        <div class="cyber-card p-8 relative overflow-hidden">
          <!-- Animated Border -->
          <div class="absolute inset-0 bg-gradient-to-r from-cyber-primary to-cyber-secondary opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          <div class="absolute inset-[2px] bg-cyber-darker rounded-xl"></div>
          
          <div class="relative z-10">
            <!-- Security Level Indicator -->
            <div class="flex items-center justify-between mb-6">
              <span class="font-tech text-gray-400">SECURITY LEVEL</span>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-cyber-accent rounded-full animate-pulse"></div>
                <span class="font-cyber text-cyber-accent">MAXIMUM</span>
              </div>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
              <!-- Username Field -->
              <div class="form-group">
                <label for="username" class="block font-tech text-white mb-2 text-sm">
                  <Key class="w-4 h-4 inline mr-2" />
                  ADMIN USERNAME
                </label>
                <div class="relative">
                  <input
                    id="username"
                    v-model="loginData.username"
                    type="text"
                    required
                    placeholder="Enter admin username"
                    :class="[
                      'cyber-input w-full pl-12',
                      loginError ? 'shake-animation border-red-500' : ''
                    ]"
                    @focus="animateField('username')"
                    @input="clearError"
                  />
                  <User class="w-5 h-5 text-cyber-primary absolute left-4 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              <!-- Password Field -->
              <div class="form-group">
                <label for="password" class="block font-tech text-white mb-2 text-sm">
                  <Lock class="w-4 h-4 inline mr-2" />
                  ENCRYPTED PASSWORD
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="loginData.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    placeholder="Enter secure password"
                    :class="[
                      'cyber-input w-full pl-12 pr-12',
                      loginError ? 'shake-animation border-red-500' : ''
                    ]"
                    @focus="animateField('password')"
                    @input="clearError"
                  />
                  <Lock class="w-5 h-5 text-cyber-primary absolute left-4 top-1/2 transform -translate-y-1/2" />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyber-primary transition-colors"
                  >
                    <Eye v-if="!showPassword" class="w-5 h-5" />
                    <EyeOff v-else class="w-5 h-5" />
                  </button>
                </div>
              </div>

              <!-- Security Check -->
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember"
                    v-model="loginData.remember"
                    type="checkbox"
                    class="cyber-checkbox"
                  />
                  <label for="remember" class="font-tech text-gray-400 text-sm ml-2">
                    Remember this device
                  </label>
                </div>
                <button type="button" class="font-tech text-cyber-primary text-sm hover:text-cyber-secondary transition-colors">
                  Forgot Access?
                </button>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="loading"
                :class="[
                  'w-full py-4 rounded-xl font-tech text-lg transition-all duration-300 relative overflow-hidden group',
                  loading 
                    ? 'bg-gray-600 cursor-not-allowed text-gray-400' 
                    : 'bg-gradient-to-r from-cyber-primary to-cyber-accent hover:from-cyber-accent hover:to-cyber-primary transform hover:scale-105 text-cyber-darker font-semibold'
                ]"
                @mouseenter="!loading && createParticleEffect($event)"
              >
                <span class="relative z-10 flex items-center justify-center">
                  <LogIn v-if="!loading" class="w-5 h-5 mr-2" />
                  <div v-else class="cyber-loader-small mr-2"></div>
                  {{ loading ? 'AUTHENTICATING...' : 'ACCESS SYSTEM' }}
                </span>
                
                <!-- Animated overlay -->
                <div v-if="!loading" class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
              </button>

              <!-- Error Message -->
              <div v-if="loginError" class="p-4 bg-red-500/20 border border-red-500 rounded-xl text-center shake-animation">
                <div class="flex items-center justify-center gap-3">
                  <AlertTriangle class="w-6 h-6 text-red-400" />
                  <div>
                    <h4 class="font-cyber text-red-400">AUTHENTICATION FAILED</h4>
                    <p class="text-gray-300 text-sm">Invalid credentials detected</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Security Footer -->
        <div class="text-center mt-8">
          <p class="text-gray-500 text-sm font-tech">
            🔒 All access attempts are logged and monitored
          </p>
        </div>
      </div>
    </div>

    <!-- Connection Status -->
    <div class="fixed bottom-6 left-6 cyber-card p-4">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-cyber-accent rounded-full animate-pulse"></div>
        <span class="font-tech text-cyber-accent text-sm">SECURE CONNECTION</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimations } from '../../composables/useAnimations'
import { 
  Lock, 
  User, 
  Key, 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertTriangle,
  Shield,
  ArrowLeft 
} from 'lucide-vue-next'

// ✅ FINAL FIXED VERSION
// Use environment variable first, fallback to hardcoded URL if needed
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://my-portfolio-backend-0w34.onrender.com';
console.log('🚀 Using API URL:', API_BASE_URL);

const router = useRouter();
const { createParticleEffect } = useAnimations();


// Reactive state
const loading = ref(false)
const loginError = ref(false)
const accessDenied = ref(false)
const showPassword = ref(false)
const securityLevel = ref('MAXIMUM')
const failedAttempts = ref(0)
const lockoutTime = ref(null)

// Login data
const loginData = reactive({
  username: '',
  password: '',
  remember: false
})

// Lock icon styles
const lockStyle = (index) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${index * 2}s`,
    animationDuration: `${Math.random() * 10 + 15}s`
  }
}

// Go to public site
const goToPublicSite = () => {
  createParticleEffect({ clientX: 0, clientY: 0 }, '#00f0ff')
  setTimeout(() => {
    router.push('/')
  }, 300)
}

// Field animation
const animateField = (fieldName) => {
  const field = document.getElementById(fieldName)
  if (field) {
    field.style.transform = 'translateY(-2px)'
    field.style.boxShadow = '0 0 0 2px #00f0ff44'
    setTimeout(() => {
      field.style.transform = 'translateY(0)'
      field.style.boxShadow = 'none'
    }, 300)
  }
}

// Clear error
const clearError = () => {
  loginError.value = false
  accessDenied.value = false
  failedAttempts.value = 0
  lockoutTime.value = null
}

// Enhanced security functions
const checkSecurityStatus = () => {
  const storedAttempts = localStorage.getItem('login_attempts')
  const lastAttempt = localStorage.getItem('last_login_attempt')
  
  if (storedAttempts && lastAttempt) {
    failedAttempts.value = parseInt(storedAttempts)
    const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt)
    
    // Check if still in lockout period (1 hour)
    if (failedAttempts.value >= 5 && timeSinceLastAttempt < 3600000) {
      const remainingTime = Math.ceil((3600000 - timeSinceLastAttempt) / 60000)
      lockoutTime.value = remainingTime
      return `LOCKED_OUT_${remainingTime}MIN`
    } else if (timeSinceLastAttempt >= 3600000) {
      // Reset attempts after 1 hour
      localStorage.removeItem('login_attempts')
      localStorage.removeItem('last_login_attempt')
      failedAttempts.value = 0
    }
  }
  
  if (failedAttempts.value >= 3) {
    securityLevel.value = 'HIGH'
  } else if (failedAttempts.value >= 1) {
    securityLevel.value = 'ELEVATED'
  } else {
    securityLevel.value = 'MAXIMUM'
  }
  
  return securityLevel.value
}

const trackFailedAttempt = () => {
  failedAttempts.value++
  localStorage.setItem('login_attempts', failedAttempts.value.toString())
  localStorage.setItem('last_login_attempt', Date.now().toString())
  
  if (failedAttempts.value >= 3) {
    securityLevel.value = 'HIGH'
  }
}

const clearSecurityTracking = () => {
  localStorage.removeItem('login_attempts')
  localStorage.removeItem('last_login_attempt')
  failedAttempts.value = 0
  securityLevel.value = 'MAXIMUM'
}

// ✅ FIXED: Enhanced login handler with better error handling
const handleLogin = async () => {
  // Check security status before attempting login
  const securityStatus = checkSecurityStatus()
  if (securityStatus.startsWith('LOCKED_OUT')) {
    loginError.value = true
    accessDenied.value = true
    loading.value = false
    return
  }

  loading.value = true
  loginError.value = false
  accessDenied.value = false

  try {
    console.log('🔐 Attempting login to:', `${API_BASE_URL}/api/v1/admin/login`)
    
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'cyber-admin-panel',
        'X-Security-Level': securityLevel.value,
        'X-Request-ID': generateRequestId()
      },
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
        remember: loginData.remember
      }),
      // ✅ ADD: Timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000)
    })

    const data = await response.json()

    if (response.ok && data.success) {
      // Clear security tracking on successful login
      clearSecurityTracking()

      // Store authentication data properly
      if (data.token) {
        // Store JWT token
        localStorage.setItem('authToken', data.token)
        
        // Set expiry time from server response or default
        const expiryTime = data.expires_in 
          ? new Date().getTime() + (data.expires_in * 1000)
          : new Date().getTime() + (24 * 60 * 60 * 1000)
        
        localStorage.setItem('tokenExpiry', expiryTime.toString())
        
        // Store user info and session data
        if (data.user) {
          localStorage.setItem('adminUser', JSON.stringify(data.user))
          localStorage.setItem('adminUsername', data.user.username)
          if (data.user.session_id) {
            localStorage.setItem('sessionId', data.user.session_id)
          }
        }

        // Store security context
        localStorage.setItem('securityLevel', data.security_level || 'MAXIMUM')
        localStorage.setItem('lastLogin', new Date().toISOString())
      }

      // Success animation and effects
      createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, '#00ff88')
      
      // Create success cyber effect
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          createParticleEffect({
            clientX: Math.random() * window.innerWidth,
            clientY: Math.random() * window.innerHeight
          }, '#00ff88')
        }, i * 50)
      }

      // Log successful login
      console.log('🔐 SECURE LOGIN: Admin authenticated successfully')

      // Navigate to dashboard with enhanced security
      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 1000)

    } else {
      // Handle different error cases
      if (response.status === 401) {
        trackFailedAttempt()
        loginError.value = true
        accessDenied.value = true
        
        // Enhanced error effects
        createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, '#ff0088')
        
        if (failedAttempts.value >= 5) {
          lockoutTime.value = 60 // 60 minutes lockout
        }
        
      } else if (response.status === 429) {
        // Rate limited - extract lockout time from message
        const message = data.detail || 'Too many attempts'
        const timeMatch = message.match(/(\d+)\s*minutes/)
        lockoutTime.value = timeMatch ? parseInt(timeMatch[1]) : 60
        loginError.value = true
        accessDenied.value = true
        
      } else {
        throw new Error(data.detail || `Login failed: ${response.status}`)
      }
    }

  } catch (error) {
    console.error('🔒 SECURITY ERROR:', error)
    
    // ✅ FIXED: Better error handling
    if (error.name === 'AbortError') {
      loginError.value = true
      accessDenied.value = true
      console.error('⏰ Login timeout - Backend might be sleeping')
    } else if (error.message.includes('Failed to fetch')) {
      trackFailedAttempt()
      loginError.value = true
      accessDenied.value = true
      console.error('🌐 Network error - Cannot connect to backend server')
    } else {
      trackFailedAttempt()
      loginError.value = true
      accessDenied.value = true
    }
    
    // Network error effects
    createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, '#ff5500')
    
  } finally {
    loading.value = false
    
    // Hide access denied after appropriate time
    const hideDelay = lockoutTime.value ? 5000 : 2000
    setTimeout(() => {
      accessDenied.value = false
    }, hideDelay)
  }
}

// Utility functions
const generateRequestId = () => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

const getRemainingLockoutTime = () => {
  if (!lockoutTime.value) return null
  
  const lastAttempt = localStorage.getItem('last_login_attempt')
  if (!lastAttempt) return null
  
  const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt)
  const remainingMs = 3600000 - timeSinceLastAttempt // 1 hour lockout
  
  return remainingMs > 0 ? Math.ceil(remainingMs / 60000) : 0
}

// Emergency security functions
const emergencyLockdown = () => {
  // Clear all authentication data
  localStorage.removeItem('authToken')
  localStorage.removeItem('tokenExpiry')
  localStorage.removeItem('adminUser')
  localStorage.removeItem('adminUsername')
  localStorage.removeItem('sessionId')
  localStorage.removeItem('securityLevel')
  localStorage.removeItem('lastLogin')
  localStorage.removeItem('login_attempts')
  localStorage.removeItem('last_login_attempt')
  
  // Clear session storage
  sessionStorage.clear()
  
  // Redirect to public site with security notification
  createParticleEffect({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, '#ff0000')
  setTimeout(() => {
    router.push('/?security=locked_down')
  }, 1000)
}

// Debug and development functions
const debugAuthStatus = () => {
  const token = localStorage.getItem('authToken')
  const expiry = localStorage.getItem('tokenExpiry')
  const user = localStorage.getItem('adminUser')
  const session = localStorage.getItem('sessionId')
  const security = localStorage.getItem('securityLevel')
  
  console.group('🔐 SECURITY DEBUG INFO')
  console.log('Auth Token:', token ? '✅ Present' : '❌ Missing')
  console.log('Token Expiry:', expiry ? new Date(parseInt(expiry)).toLocaleString() : 'None')
  console.log('Admin User:', user ? JSON.parse(user) : 'None')
  console.log('Session ID:', session || 'None')
  console.log('Security Level:', security || 'None')
  console.log('Failed Attempts:', failedAttempts.value)
  console.log('Is Authenticated:', token && expiry && new Date().getTime() < parseInt(expiry))
  console.groupEnd()
}

// ✅ ADDED: Test backend connection
const testBackendConnection = async () => {
  try {
    console.log('🧪 Testing backend connection to:', API_BASE_URL)
    const testResponse = await fetch(`${API_BASE_URL}/api/v1/admin/health`, {
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
}

// Initialize security check on component mount
onMounted(async () => {
  // Test backend connection first
  await testBackendConnection()
  
  checkSecurityStatus()
  
  // Auto-clear old failed attempts
  const lastAttempt = localStorage.getItem('last_login_attempt')
  if (lastAttempt && (Date.now() - parseInt(lastAttempt)) >= 3600000) {
    clearSecurityTracking()
  }
  
  // Debug info in development
  if (import.meta.env.DEV) {
    debugAuthStatus()
  }
})
</script>

<style scoped>
.security-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background: linear-gradient(135deg, #050508 0%, #0a0a15 50%, #050508 100%);
}

.encryption-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(90deg, transparent 99%, #00f0ff05 100%),
    linear-gradient(transparent 99%, #00f0ff05 100%);
  background-size: 40px 40px;
  animation: gridMove 20s linear infinite;
}

.floating-lock-icons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.lock-icon {
  position: absolute;
  color: #00f0ff11;
  animation: float-lock 20s ease-in-out infinite;
}

.particle-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 80%, #00f0ff05 1px, transparent 1px),
    radial-gradient(circle at 80% 20%, #ff00ff05 1px, transparent 1px);
  background-size: 50px 50px;
}

.access-denied-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.shield-bounce {
  animation: bounce 0.6s ease-out;
}

.denied-text {
  font-family: 'Orbitron', monospace;
  font-size: 3rem;
  color: #ff0000;
  text-shadow: 0 0 20px #ff0000;
  margin-top: 2rem;
  animation: glitch-red 0.5s infinite;
}

.cyber-input {
  background: #11111f;
  border: 1px solid #2a2a3a;
  color: #ffffff;
  padding: 12px 16px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  width: 100%;
}

.cyber-input:focus {
  outline: none;
  border-color: #00f0ff;
  background: #11111f;
  box-shadow: 0 0 0 3px #00f0ff22;
}

.cyber-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #00f0ff;
  border-radius: 4px;
  background: transparent;
  position: relative;
  cursor: pointer;
}

.cyber-checkbox:checked {
  background: #00f0ff;
}

.cyber-checkbox:checked::after {
  content: '✓';
  position: absolute;
  color: #050508;
  font-size: 12px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cyber-loader-small {
  width: 16px;
  height: 16px;
  border: 2px solid #050508;
  border-top: 2px solid #00f0ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 40px); }
}

@keyframes float-lock {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0.3;
  }
  50% { 
    transform: translateY(-30px) rotate(180deg); 
    opacity: 0.1;
  }
}

@keyframes bounce {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes glitch-red {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.shake-animation {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
</style>