import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import './assets/main.css' 

// Import Lucide icons
import { 
  Code2, 
  Sparkles, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  Menu,
  X,
  ArrowRight,
  Cpu,
  Zap,
  Shield,
  MessageCircle,
  Twitter
} from 'lucide-vue-next'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Register Lucide icons globally
const icons = {
  Code2, 
  Sparkles, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  Menu,
  X,
  ArrowRight,
  Cpu,
  Zap,
  Shield,
  MessageCircle,
  Twitter
}

Object.entries(icons).forEach(([name, component]) => {
  app.component(name, component)
})

app.mount('#app')