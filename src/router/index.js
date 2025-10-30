import { createRouter, createWebHistory } from 'vue-router'

// 🌍 Public pages
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import About from '../views/About.vue'
import Resume from '../views/Resume.vue' // ✅ Import Resume component
import Blog from '../views/Blog.vue'
import Contact from '../views/Contact.vue'
import BlogPost from '../views/BlogPost.vue'

// 🔐 Admin pages
import AdminLogin from '../views/admin/Login.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import AdminProjects from '../views/admin/Projects.vue'
import AdminSkills from '../views/admin/Skills.vue'
import AdminContacts from '../views/admin/Contacts.vue'
import AdminBlogList from '../views/blog/BlogList.vue'
import AdminBlogPost from '../views/BlogPost.vue'

// 🔐 Authentication check function
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken')
  const expiry = localStorage.getItem('tokenExpiry')
  
  if (!token || !expiry) return false
  
  // Check if token is expired
  if (new Date().getTime() > parseInt(expiry)) {
    localStorage.removeItem('authToken')
    localStorage.removeItem('tokenExpiry')
    return false
  }
  
  return true
}

const routes = [
  // 🌍 Public routes
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Cyber Portfolio 🚀', transition: 'cyber-fade' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
    meta: { title: 'Projects 💻', transition: 'cyber-slide' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About Me 🤖', transition: 'cyber-fade' }
  },
  // ✅ ADD RESUME ROUTE HERE
  {
    path: '/resume',
    name: 'Resume',
    component: Resume,
    meta: { title: 'Resume 📄', transition: 'cyber-slide' }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
    meta: { title: 'Blog 📰', transition: 'cyber-fade' }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: BlogPost,
    meta: { title: 'Blog Post 🧠', transition: 'cyber-slide' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact 📡', transition: 'cyber-slide' }
  },

  // 🔐 Admin routes (keep existing)
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    meta: { 
      title: 'Admin Login 🔒', 
      requiresGuest: true,
      transition: 'cyber-auth'
    }
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard'
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { 
      title: 'Admin Dashboard 📊', 
      requiresAuth: true,
      transition: 'cyber-admin'
    }
  },
  {
    path: '/admin/projects',
    name: 'AdminProjects',
    component: AdminProjects,
    meta: { 
      title: 'Manage Projects 💻', 
      requiresAuth: true,
      transition: 'cyber-admin'
    }
  },
  {
    path: '/admin/skills',
    name: 'AdminSkills',
    component: AdminSkills,
    meta: { 
      title: 'Manage Skills 🛠️', 
      requiresAuth: true,
      transition: 'cyber-admin'
    }
  },
  {
    path: '/admin/contacts',
    name: 'AdminContacts',
    component: AdminContacts,
    meta: { 
      title: 'Manage Contacts 📬', 
      requiresAuth: true,
      transition: 'cyber-admin'
    }
  },
  {
    path: '/admin/blog',
    name: 'AdminBlogList',
    component: AdminBlogList,
    meta: { 
      title: 'Manage Blog 📝', 
      requiresAuth: true,
      transition: 'cyber-admin'
    }
  },
  {
    path: '/admin/blog/:id',
    name: 'AdminBlogPost',
    component: AdminBlogPost,
    meta: { 
      title: 'Edit Blog Post ✍️', 
      requiresAuth: true,
      transition: 'cyber-admin'
    }
  },
  // Catch all 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { 
        top: 0, 
        behavior: 'smooth' 
      }
    }
  }
})

// 🛡️ Route guards for authentication
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  if (requiresAuth && !isAuthenticated()) {
    // Redirect to login if trying to access protected route without auth
    next('/admin/login')
  } else if (requiresGuest && isAuthenticated()) {
    // Redirect to dashboard if trying to access login while authenticated
    next('/admin/dashboard')
  } else {
    // Continue to requested route
    next()
  }
})

// 🧠 Change document title dynamically
router.afterEach((to) => {
  document.title = to.meta?.title || 'Cyber Portfolio'
  
  // Add cyber transition class to body for global animations
  document.body.className = to.meta?.transition || 'cyber-fade'
})

export default router