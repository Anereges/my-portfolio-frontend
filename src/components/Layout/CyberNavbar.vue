<template>
  <nav class="fixed top-0 w-full z-50 bg-cyber-dark/95 backdrop-blur-xl border-b-2 border-cyber-primary/40 cyber-grid-overlay">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link 
          to="/" 
          class="flex items-center space-x-3 group relative overflow-hidden cyber-logo-container"
          @mouseenter="createCyberEffect($event, 'logo')"
        >
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-br from-cyber-primary via-cyber-accent to-cyber-secondary rounded-lg flex items-center justify-center cyber-pulse">
              <Code2 class="w-6 h-6 text-cyber-darker cyber-icon-glitch" />
            </div>
            <div class="absolute inset-0 border-2 border-cyber-primary rounded-lg cyber-scanline"></div>
          </div>
          <span class="text-xl font-cyber font-bold cyber-text-glitch group-hover:cyber-text-glow transition-all duration-500">
            CYBER_DEV
          </span>
          <div class="absolute -inset-2 bg-cyber-primary/20 rounded-xl cyber-hologram"></div>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-1 bg-cyber-dark/80 rounded-2xl border border-cyber-border/50 p-1 cyber-terminal">
          <router-link
            v-for="route in publicRoutes"
            :key="route.name"
            :to="route.path"
            class="cyber-nav-link-enhanced font-tech font-semibold text-sm relative group overflow-hidden"
            @mouseenter="createCyberEffect($event, 'nav')"
          >
            <span class="relative z-10">{{ route.name }}</span>
            <span class="cyber-underline"></span>
            <span class="cyber-highlight"></span>
            <div class="cyber-dots">
              <span></span><span></span><span></span>
            </div>
          </router-link>
          
          <!-- Hidden Admin Access - Only show when authenticated -->
          <router-link
            v-if="isAuthenticated"
            to="/admin/dashboard"
            class="cyber-admin-active-link font-tech font-semibold text-sm relative group overflow-hidden"
            @mouseenter="createCyberEffect($event, 'admin')"
          >
            <span class="relative z-10">Admin 🚀</span>
            <span class="cyber-underline"></span>
            <span class="cyber-highlight-admin-active"></span>
            <div class="cyber-dots-admin-active">
              <span></span><span></span><span></span>
            </div>
          </router-link>

          <!-- Secret Admin Login Button (Hidden but accessible) -->
          <button
            v-if="!isAuthenticated && showSecretAdmin"
            @click="goToAdminLogin"
            class="cyber-secret-admin-link font-tech font-semibold text-sm relative group overflow-hidden"
            @mouseenter="createCyberEffect($event, 'admin')"
          >
            <span class="relative z-10">Admin 🔒</span>
            <span class="cyber-underline"></span>
            <span class="cyber-highlight-admin"></span>
            <div class="cyber-dots-admin">
              <span></span><span></span><span></span>
            </div>
          </button>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden cyber-button-enhanced p-3 relative overflow-hidden group"
          @mouseenter="createCyberEffect($event, 'button')"
        >
          <div class="relative">
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6 cyber-menu-icon" />
            <X v-else class="w-6 h-6 cyber-menu-icon" />
          </div>
          <div class="cyber-button-glow"></div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition-all duration-500 ease-out cyber-slide-down"
      leave-active-class="transition-all duration-300 ease-in cyber-slide-up"
      enter-from-class="opacity-0 transform -translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden absolute top-16 left-0 w-full bg-cyber-card/95 backdrop-blur-xl border-b-2 border-cyber-primary/30 cyber-grid-pattern"
      >
        <div class="px-4 py-6 space-y-2">
          <router-link
            v-for="route in publicRoutes"
            :key="route.name"
            :to="route.path"
            class="block cyber-mobile-nav-link font-tech text-lg py-4 px-4 border-l-4 border-cyber-border hover:border-cyber-primary transition-all duration-300 cyber-mobile-glow"
            @click="mobileMenuOpen = false"
          >
            <span class="flex items-center space-x-3">
              <span class="w-2 h-2 bg-cyber-primary rounded-full cyber-pulse"></span>
              <span>{{ route.name }}</span>
            </span>
          </router-link>
          
          <!-- Hidden Admin Mobile Access - Only show when authenticated -->
          <router-link
            v-if="isAuthenticated"
            to="/admin/dashboard"
            class="block cyber-mobile-admin-active-link font-tech text-lg py-4 px-4 border-l-4 border-cyber-primary bg-cyber-primary/10 transition-all duration-300 cyber-mobile-admin-active-glow"
            @click="mobileMenuOpen = false"
          >
            <span class="flex items-center space-x-3">
              <span class="w-2 h-2 bg-cyber-primary rounded-full cyber-pulse"></span>
              <span>Admin 🚀</span>
            </span>
          </router-link>

          <!-- Secret Admin Login for Mobile -->
          <button
            v-if="!isAuthenticated && showSecretAdmin"
            @click="goToAdminLoginMobile"
            class="block cyber-mobile-secret-admin-link font-tech text-lg py-4 px-4 border-l-4 border-cyber-accent hover:border-cyber-primary transition-all duration-300 cyber-mobile-admin-glow w-full text-left"
          >
            <span class="flex items-center space-x-3">
              <span class="w-2 h-2 bg-cyber-accent rounded-full cyber-pulse-fast"></span>
              <span>Admin 🔒</span>
            </span>
          </button>
        </div>
      </div>
    </transition>

    <!-- Secret Key Combination Listener -->
    <div class="hidden" @keydown="handleKeyPress" tabindex="0"></div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Code2, Menu, X } from 'lucide-vue-next'

const router = useRouter()
const mobileMenuOpen = ref(false)
const showSecretAdmin = ref(false)

// Check authentication status
const isAuthenticated = computed(() => {
  const token = localStorage.getItem('authToken')
  const expiry = localStorage.getItem('tokenExpiry')
  return token && expiry && new Date().getTime() < parseInt(expiry)
})

const publicRoutes = [
  { name: 'Home 🏠', path: '/' },
  { name: 'Projects 💻', path: '/projects' },
  { name: 'About 🤖', path: '/about' },
  { name: 'Resume 📄', path: '/resume' },
  { name: 'Blog 📰', path: '/blog' },
  { name: 'Contact 📡', path: '/contact' }
 
]

// 🔐 SIMPLE KEYBOARD SHORTCUT
const handleKeyPress = (event) => {
  // Press Shift + Ctrl + A to reveal admin login
  if (event.shiftKey && event.ctrlKey && event.key === 'A') {
    event.preventDefault() // Prevent browser select all
    secretAdminAccess()
  }
  
  // Press Escape to hide admin login
  if (event.key === 'Escape' && showSecretAdmin.value) {
    showSecretAdmin.value = false
  }
}

// Main secret access function
const secretAdminAccess = () => {
  if (!isAuthenticated.value) {
    showSecretAdmin.value = true
    createSecretEffect()
    
    // Auto-hide after 15 seconds
    setTimeout(() => {
      showSecretAdmin.value = false
    }, 15000)
    
    console.log('🔐 ADMIN_ACCESS_REVEALED: Press Shift+Ctrl+A to access admin')
  }
}

const goToAdminLogin = () => {
  router.push('/admin/login')
  showSecretAdmin.value = false
}

const goToAdminLoginMobile = () => {
  router.push('/admin/login')
  mobileMenuOpen.value = false
  showSecretAdmin.value = false
}

const createSecretEffect = () => {
  // Create cyber effect when secret admin is revealed
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      createParticle({
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight,
        width: 0,
        height: 0
      }, 'admin')
    }, i * 100)
  }
}

const createCyberEffect = (event, type) => {
  const button = event.currentTarget
  const rect = button.getBoundingClientRect()
  
  // Create particle effect
  for (let i = 0; i < 6; i++) {
    createParticle(rect, type)
  }
}

const createParticle = (rect, type) => {
  const particle = document.createElement('div')
  const size = Math.random() * 4 + 2
  const colors = {
    logo: ['#00f0ff', '#00ff88', '#0099ff'],
    nav: ['#00f0ff', '#ff00ff', '#00ff88'],
    admin: ['#ff0088', '#ff00ff', '#00f0ff'],
    button: ['#00ff88', '#00f0ff', '#ff0088']
  }[type] || ['#00f0ff', '#00ff88']
  
  particle.style.cssText = `
    position: fixed;
    width: ${size}px;
    height: ${size}px;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    border-radius: 50%;
    pointer-events: none;
    z-index: 100;
    left: ${rect.left + rect.width/2 + (Math.random() - 0.5) * 40}px;
    top: ${rect.top + rect.height/2 + (Math.random() - 0.5) * 40}px;
    animation: cyber-particle-float 1s ease-out forwards;
  `
  
  document.body.appendChild(particle)
  
  setTimeout(() => {
    particle.remove()
  }, 1000)
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Close mobile menu on route change
const unsubscribe = router.afterEach(() => {
  mobileMenuOpen.value = false
})

// Add global key listener
onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress)
  unsubscribe()
})
</script>

<style scoped>
/* Secret admin link styles */
.cyber-secret-admin-link {
  padding: 0.5rem 1rem;
  color: var(--cyber-accent);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  background: transparent;
  border: 1px solid transparent;
  font-family: 'Share Tech Mono', monospace;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.cyber-secret-admin-link:hover {
  color: #ffffff;
  background: rgba(255, 0, 136, 0.1);
  border: 1px solid rgba(255, 0, 136, 0.4);
  box-shadow: 
    0 0 20px rgba(255, 0, 136, 0.4),
    inset 0 0 10px rgba(255, 0, 136, 0.1);
  transform: translateY(-1px);
}

.cyber-mobile-secret-admin-link {
  color: var(--cyber-accent);
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.125rem;
  text-decoration: none;
  display: block;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
}

.cyber-mobile-secret-admin-link:hover {
  color: #ffffff;
  background: rgba(255, 0, 136, 0.1);
  text-shadow: 0 0 10px currentColor;
}

/* Rest of your existing styles */
.cyber-grid-overlay {
  background-image: 
    linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}

.cyber-grid-pattern {
  background-image: 
    linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
  background-size: 25px 25px;
}

.cyber-terminal {
  box-shadow: 
    inset 0 1px 0 rgba(0, 240, 255, 0.2),
    0 0 20px rgba(0, 240, 255, 0.1),
    0 0 0 1px rgba(0, 240, 255, 0.1);
  background: rgba(13, 17, 23, 0.8);
  border-radius: 1rem;
  border: 1px solid rgba(0, 240, 255, 0.3);
  padding: 0.25rem;
}

:root {
  --cyber-primary: #00f0ff;
  --cyber-accent: #ff0088;
  --cyber-secondary: #00ff88;
  --cyber-text: #e2e8f0;
  --cyber-dark: #0d1117;
  --cyber-card: #161b22;
  --cyber-border: #30363d;
}

.cyber-nav-link-enhanced {
  padding: 0.5rem 1rem;
  color: var(--cyber-text);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  background: transparent;
  border: 1px solid transparent;
  font-family: 'Share Tech Mono', monospace;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.cyber-nav-link-enhanced:hover {
  color: var(--cyber-primary);
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.3);
  box-shadow: 
    0 0 15px rgba(0, 240, 255, 0.3),
    inset 0 0 10px rgba(0, 240, 255, 0.1);
  transform: translateY(-1px);
}

.cyber-nav-link-enhanced.router-link-active {
  color: var(--cyber-primary);
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.5);
  box-shadow: 
    0 0 20px rgba(0, 240, 255, 0.4),
    inset 0 0 15px rgba(0, 240, 255, 0.2);
}

.cyber-admin-active-link {
  padding: 0.5rem 1rem;
  color: #ffffff;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(255, 0, 136, 0.2));
  border: 1px solid rgba(0, 240, 255, 0.5);
  box-shadow: 
    0 0 25px rgba(0, 240, 255, 0.5),
    inset 0 0 15px rgba(255, 0, 136, 0.2);
  font-family: 'Share Tech Mono', monospace;
  font-weight: 600;
  font-size: 0.875rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.cyber-admin-active-link:hover {
  transform: translateY(-1px);
  box-shadow: 
    0 0 30px rgba(0, 240, 255, 0.6),
    inset 0 0 20px rgba(255, 0, 136, 0.3);
}

.cyber-mobile-nav-link {
  color: var(--cyber-text);
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.125rem;
  text-decoration: none;
  display: block;
}

.cyber-mobile-nav-link:hover,
.cyber-mobile-nav-link.router-link-active {
  color: var(--cyber-primary);
  background: rgba(0, 240, 255, 0.05);
  text-shadow: 0 0 10px currentColor;
}

.cyber-mobile-admin-active-link {
  color: #ffffff;
  text-shadow: 0 0 15px #00f0ff;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.125rem;
  text-decoration: none;
  display: block;
}

.cyber-mobile-admin-active-link:hover {
  background: rgba(0, 240, 255, 0.15);
}
</style>