import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const usePortfolioStore = defineStore('portfolio', () => {
  const projects = ref([])
  const skills = ref([])
  const featuredProjects = ref([])
  const loading = ref(false)
  const error = ref(null)

  const api = axios.create({
    baseURL: '/api/v1',
    timeout: 10000
  })

  // Computed
  const frontendSkills = computed(() => 
    skills.value.filter(skill => skill.category === 'frontend')
  )
  
  const backendSkills = computed(() => 
    skills.value.filter(skill => skill.category === 'backend')
  )
  
  const featuredSkills = computed(() => 
    skills.value.filter(skill => skill.featured)
  )

  // Actions
  const fetchProjects = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/projects', { params })
      projects.value = response.data.items
    } catch (err) {
      error.value = 'Failed to load projects 🚨'
      console.error('Error fetching projects:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchFeaturedProjects = async () => {
    try {
      const response = await api.get('/projects/featured')
      featuredProjects.value = response.data
    } catch (err) {
      console.error('Error fetching featured projects:', err)
    }
  }

  const fetchSkills = async () => {
    try {
      const response = await api.get('/skills')
      skills.value = response.data
    } catch (err) {
      console.error('Error fetching skills:', err)
    }
  }

  const submitContact = async (contactData) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/contacts', contactData)
      return response.data
    } catch (err) {
      error.value = 'Failed to send message 🚨'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    skills,
    featuredProjects,
    loading,
    error,
    frontendSkills,
    backendSkills,
    featuredSkills,
    fetchProjects,
    fetchFeaturedProjects,
    fetchSkills,
    submitContact
  }
})