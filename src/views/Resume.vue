<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 relative">
    <CyberNavbar />
    
    <div class="relative z-10 pt-16 pb-16 px-4">
      <div class="max-w-5xl mx-auto">
        <!-- Resume Container -->
        <div id="resume-content" class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          
          <!-- Professional Header Section -->
          <div class="bg-gradient-to-r from-slate-800 via-slate-700 to-gray-800 text-white pt-12 pb-8 px-8 relative">
            <!-- Subtle Background Pattern -->
            <div class="absolute inset-0 opacity-5 bg-dot-pattern"></div>
            
            <!-- Decorative Elements -->
            <div class="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div class="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full translate-x-12 -translate-y-12"></div>
            
            <!-- Centered Photo and Name -->
            <div class="flex flex-col items-center text-center relative z-10">
              <!-- Profile Photo -->
              <div class="relative mb-6">
                <!-- Profile Photo -->
                <div class="relative w-40 h-40 rounded-full border-4 border-emerald-400/30 shadow-2xl overflow-hidden bg-gray-200">
                  <img 
                    src="/src/assets/c.jpg" 
                    alt="Amanuel Sisay" 
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                  <!-- Subtle overlay -->
                  <div class="absolute inset-0 bg-slate-800/10 mix-blend-overlay"></div>
                </div>
                
                <!-- Professional Border Accents -->
                <div class="absolute inset-0 rounded-full border-2 border-emerald-400/20"></div>
                <div class="absolute inset-2 rounded-full border border-amber-400/10"></div>
              </div>
              
              <!-- Name and Title -->
              <div class="space-y-3">
                <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-white">Amanuel Sisay</h1>
                <div class="space-y-2">
                  <h2 class="text-2xl md:text-3xl font-semibold text-emerald-100">
                    Senior Full-Stack Engineer & Security Specialist
                  </h2>
                  <p class="text-slate-300 text-lg md:text-xl font-light">
                    FastAPI · REACT· Flutter · Vue · OSINT · Reverse Engineering
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Professional Contact Info Bar -->
          <div class="bg-gradient-to-r from-gray-900 to-slate-800 text-white py-5 px-8 border-b border-gray-700">
            <div class="flex flex-wrap justify-center gap-8 text-sm font-medium">
              <div class="flex items-center gap-3 group cursor-pointer">
                <div class="p-2 bg-emerald-600 rounded-lg group-hover:bg-emerald-500 transition-colors shadow-lg">
                  <MapPin class="w-4 h-4" />
                </div>
                <span class="text-gray-200">Addis Ababa, Ethiopia</span>
              </div>
              <div class="flex items-center gap-3 group cursor-pointer">
                <div class="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors shadow-lg">
                  <Mail class="w-4 h-4" />
                </div>
                <span class="text-gray-200">amanuel@cybersec.et</span>
              </div>
              <div class="flex items-center gap-3 group cursor-pointer">
                <div class="p-2 bg-amber-600 rounded-lg group-hover:bg-amber-500 transition-colors shadow-lg">
                  <DollarSign class="w-4 h-4" />
                </div>
                <span class="text-gray-200">$30-45/hr · 20-30 hrs/week</span>
              </div>
            </div>
          </div>

          <!-- Main Content -->
          <div class="p-8 md:p-10">
            <div class="grid lg:grid-cols-3 gap-8">
              
              <!-- Left Column -->
              <div class="lg:col-span-1 space-y-8">
                
                <!-- Professional Summary -->
                <section class="group">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full shadow-lg"></div>
                    <h3 class="text-xl font-bold text-gray-800">Professional Summary</h3>
                  </div>
                  <div class="pl-5">
                    <p class="text-gray-600 text-sm leading-relaxed bg-gradient-to-r from-emerald-50 to-gray-50 p-4 rounded-xl border border-emerald-100 group-hover:border-emerald-200 transition-all duration-300 shadow-sm">
                      Seasoned full-stack engineer and security specialist with expertise in building secure, 
                      production-ready systems and conducting comprehensive security audits through penetration 
                      testing and reverse engineering methodologies.
                    </p>
                  </div>
                </section>

                <!-- Core Skills -->
                <section class="group">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full shadow-lg"></div>
                    <h3 class="text-xl font-bold text-gray-800">Core Competencies</h3>
                  </div>
                  <div class="space-y-5 pl-5">
                    <div v-for="skillGroup in coreSkills" :key="skillGroup.category" class="group">
                      <h4 class="font-semibold text-gray-700 text-sm mb-3 flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow"></div>
                        {{ skillGroup.category }}
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        <span 
                          v-for="skill in skillGroup.skills"
                          :key="skill"
                          class="px-3 py-2 bg-gradient-to-r from-gray-50 to-emerald-50 text-gray-700 rounded-lg text-xs border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group-hover:scale-105 duration-200 shadow-sm"
                        >
                          {{ skill }}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- Certifications -->
                <section class="group">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full shadow-lg"></div>
                    <h3 class="text-xl font-bold text-gray-800">Certifications</h3>
                  </div>
                  <div class="space-y-3 pl-5">
                    <div 
                      v-for="cert in certifications"
                      :key="cert.name"
                      class="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-emerald-300 transition-all group-hover:scale-105 duration-200 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <div class="flex items-start gap-3">
                        <div class="p-2 bg-emerald-100 rounded-lg shadow-sm">
                          <component :is="cert.icon" class="w-4 h-4 text-emerald-600" />
                        </div>
                        <div class="flex-1">
                          <h4 class="font-semibold text-gray-800 text-sm">{{ cert.name }}</h4>
                          <p class="text-gray-600 text-xs mt-1">{{ cert.issuer }}</p>
                          <p class="text-emerald-600 text-xs font-medium mt-2">{{ cert.status }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- Education & Languages -->
                <section class="group">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full shadow-lg"></div>
                    <h3 class="text-xl font-bold text-gray-800">Education & Languages</h3>
                  </div>
                  <div class="space-y-4 pl-5">
                    <div class="p-4 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl border border-gray-200 shadow-sm">
                      <h4 class="font-semibold text-gray-700 text-sm mb-2 flex items-center gap-2">
                        <GraduationCap class="w-4 h-4 text-emerald-600" />
                        Education
                      </h4>
                      <p class="text-gray-600 text-sm">Software Engineering</p>
                      <p class="text-gray-500 text-xs mt-1">Addis Ababa University</p>
                    </div>
                    <div class="p-4 bg-gradient-to-r from-gray-50 to-amber-50 rounded-xl border border-gray-200 shadow-sm">
                      <h4 class="font-semibold text-gray-700 text-sm mb-3 flex items-center gap-2">
                        <Languages class="w-4 h-4 text-amber-600" />
                        Languages
                      </h4>
                      <div class="flex gap-6 text-sm">
                        <div class="flex items-center gap-2">
                          <span class="text-gray-600">English</span>
                          <span class="text-blue-600 text-xs px-2 py-1 bg-blue-100 rounded-full shadow-sm">Fluent</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="text-gray-600">Amharic</span>
                          <span class="text-emerald-600 text-xs px-2 py-1 bg-emerald-100 rounded-full shadow-sm">Native</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </div>

              <!-- Right Column -->
              <div class="lg:col-span-2 space-y-8">
                
                <!-- Work Experience -->
                <section class="group">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full shadow-lg"></div>
                    <h3 class="text-2xl font-bold text-gray-800">Professional Experience</h3>
                  </div>
                  <div class="space-y-6">
                    <div class="relative pl-8">
                      <!-- Timeline dot -->
                      <div class="absolute left-0 top-0 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
                      <!-- Content -->
                      <div class="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md">
                        <div class="flex flex-wrap justify-between items-start mb-4">
                          <div>
                            <h4 class="text-xl font-bold text-gray-800 mb-1">Senior Full-Stack Developer & Security Engineer</h4>
                            <p class="text-emerald-600 font-semibold text-sm">Freelance / Consulting Projects</p>
                          </div>
                          <span class="text-white font-medium text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 rounded-full shadow-lg">
                            2021-PRESENT
                          </span>
                        </div>
                        
                        <ul class="space-y-3">
                          <li v-for="(responsibility, idx) in workExperience" :key="idx" class="flex items-start gap-3 group/item">
                            <div class="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform shadow"></div>
                            <span class="text-gray-600 text-sm leading-relaxed flex-1">{{ responsibility }}</span>
                          </li>
                        </ul>

                        <div class="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-200">
                          <span 
                            v-for="tech in experienceTech"
                            :key="tech"
                            class="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-xs border border-gray-300 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer shadow-sm"
                          >
                            {{ tech }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- Key Projects -->
                <section class="group">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full shadow-lg"></div>
                    <h3 class="text-2xl font-bold text-gray-800">Key Projects</h3>
                  </div>
                  <div class="space-y-6">
                    <div 
                      v-for="(project, index) in projects"
                      :key="project.name"
                      class="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group/project shadow-sm"
                      :class="getProjectColorClass(index)"
                    >
                      <div class="flex flex-wrap justify-between items-start mb-4">
                        <div>
                          <h4 class="text-xl font-bold text-gray-800 mb-1">{{ project.name }}</h4>
                          <p class="text-emerald-600 font-semibold text-sm">{{ project.role }}</p>
                        </div>
                        <span class="text-white text-sm px-3 py-1.5 rounded-full shadow-lg" :class="project.badgeColor">
                          {{ project.duration }}
                        </span>
                      </div>
                      
                      <p class="text-gray-600 text-sm mb-4 leading-relaxed">{{ project.description }}</p>
                      
                      <div class="flex flex-wrap gap-2 mb-4">
                        <span 
                          v-for="tech in project.tech"
                          :key="tech"
                          class="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-xs border border-gray-300 hover:border-emerald-400 hover:shadow-sm transition-all cursor-pointer group-hover/project:scale-105 shadow-sm"
                        >
                          {{ tech }}
                        </span>
                      </div>
                      
                      <div class="rounded-xl p-4 border transition-colors group-hover/project:border-emerald-300 shadow-sm" :class="project.highlightBg">
                        <p class="text-sm font-semibold mb-2 flex items-center gap-2" :class="project.highlightText">
                          <Star class="w-4 h-4" :class="project.starColor" />
                          Key Highlights
                        </p>
                        <p class="text-sm" :class="project.highlightContent">{{ project.highlights }}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- Technical Proficiency -->
                <section class="group">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full shadow-lg"></div>
                    <h3 class="text-2xl font-bold text-gray-800">Technical Proficiency</h3>
                  </div>
                  <div class="grid md:grid-cols-2 gap-8">
                    <div v-for="category in technicalProficiency" :key="category.name" class="group/category">
                      <div class="bg-white rounded-xl p-5 border border-gray-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md">
                        <h4 class="font-bold text-gray-800 mb-4 text-sm flex items-center gap-2">
                          <div class="w-2 h-2 bg-emerald-500 rounded-full shadow"></div>
                          {{ category.name }}
                        </h4>
                        <div class="space-y-4">
                          <div v-for="skill in category.skills" :key="skill.name" class="group/skill">
                            <div class="flex justify-between items-center mb-2">
                              <span class="text-gray-700 text-sm font-medium">{{ skill.name }}</span>
                              <span class="text-emerald-600 font-bold text-sm">{{ skill.level }}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                              <div 
                                class="h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-1000 group-hover/skill:from-emerald-600 group-hover/skill:to-emerald-700 shadow-sm"
                                :style="{ width: `${skill.level}%` }"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>

        <!-- Professional Download Buttons -->
        <div class="flex justify-center gap-4 mt-10">
          <button 
            @click="generatePDF"
            class="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            :disabled="generatingPDF"
          >
            <Download class="w-5 h-5" />
            {{ generatingPDF ? 'Generating PDF...' : 'Download Professional Resume' }}
          </button>
          
          <button 
            @click="printResume"
            class="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Printer class="w-5 h-5" />
            Print Resume
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CyberNavbar from '../components/Layout/CyberNavbar.vue'
import { 
  Download, 
  Printer, 
  MapPin, 
  Mail, 
  DollarSign, 
  Shield,
  Code,
  Server,
  GraduationCap,
  Languages,
  Star,
  Users,
  AlertTriangle,
  Network,
  Shield as SecurityIcon,
  Search
} from 'lucide-vue-next'
import html2pdf from 'html2pdf.js'

const generatingPDF = ref(false)

// Enhanced certifications with icons
const certifications = ref([
  { name: 'CEH - Certified Ethical Hacker', issuer: 'EC-Council', status: 'In Progress', icon: Shield },
  { name: 'OSCP - Offensive Security', issuer: 'Offensive Security', status: 'Planned (Q2 2024)', icon: Code },
  { name: 'FastAPI Certification', issuer: 'FastAPI Official', status: 'Completed', icon: Server },
  { name: 'Docker Certified Associate', issuer: 'Docker Inc', status: 'Completed', icon: Shield }
])

// Enhanced projects with professional colors
const projects = ref([
  {
    name: 'CSLS - Cooperative Savings & Loan System',
    role: 'Lead Full-Stack Developer & Security Architect',
    duration: '6 Months',
    description: 'Enterprise financial management system with multi-role RBAC, committee workflows, audit trails, and automated financial reporting',
    tech: ['FastAPI', 'MongoDB', 'Vue 3', 'Flutter', 'Docker', 'Celery', 'Redis'],
    highlights: 'Multi-role RBAC, automated profit distribution, delinquency provisioning, exportable compliance reports, audit trails',
    badgeColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    highlightBg: 'bg-gradient-to-r from-emerald-50 to-gray-50 border border-emerald-200',
    highlightText: 'text-emerald-800',
    highlightContent: 'text-gray-700',
    starColor: 'text-amber-500'
  },
  {
    name: 'Enterprise Incident Response System',
    role: 'Full-Stack Security Developer',
    duration: '4 Months',
    description: 'Real-time incident management platform with automated alerting, team collaboration, and compliance reporting for security operations',
    tech: ['FastAPI', 'React', 'MongoDB', 'WebSocket', 'Docker', 'JWT', 'Redis'],
    highlights: 'Real-time alerts, automated ticket creation, team collaboration, compliance reporting, audit trails',
    badgeColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
    highlightBg: 'bg-gradient-to-r from-blue-50 to-gray-50 border border-blue-200',
    highlightText: 'text-blue-800',
    highlightContent: 'text-gray-700',
    starColor: 'text-blue-500'
  },
  {
    name: 'Employee Management System',
    role: 'Full-Stack Developer',
    duration: '3 Months',
    description: 'Comprehensive HR management platform with employee profiles, attendance tracking, payroll integration, and performance analytics',
    tech: ['Node.js', 'Express', 'MongoDB', 'Vue 3', 'Vite', 'JWT', 'Docker'],
    highlights: 'Employee profiles, attendance tracking, payroll integration, performance analytics, role-based access',
    badgeColor: 'bg-gradient-to-r from-purple-500 to-purple-600',
    highlightBg: 'bg-gradient-to-r from-purple-50 to-gray-50 border border-purple-200',
    highlightText: 'text-purple-800',
    highlightContent: 'text-gray-700',
    starColor: 'text-purple-500'
  },
  {
    name: 'Advanced Port Scanner & Network Mapper',
    role: 'Security Tool Developer',
    duration: '2 Months',
    description: 'High-performance network scanning tool with multiple scanning techniques, service detection, and vulnerability assessment capabilities',
    tech: ['Python', 'Scapy', 'FastAPI', 'Vue 3', 'Socket', 'Threading', 'Nmap Integration'],
    highlights: 'TCP/UDP scanning, service detection, OS fingerprinting, vulnerability assessment, exportable reports',
    badgeColor: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
    highlightBg: 'bg-gradient-to-r from-cyan-50 to-gray-50 border border-cyan-200',
    highlightText: 'text-cyan-800',
    highlightContent: 'text-gray-700',
    starColor: 'text-cyan-500'
  },
  {
    name: 'Malware Analysis Lab & Research Platform',
    role: 'Security Researcher & Reverse Engineer',
    duration: '5 Months',
    description: 'Isolated lab environment for analyzing synthetic malware samples, developing detection rules, and creating defensive playbooks',
    tech: ['Ghidra', 'radare2', 'GDB', 'Virtualization', 'YARA', 'Python', 'Docker'],
    highlights: 'Function-level reverse engineering, YARA detection rules, SOC playbook development, documented SOPs',
    badgeColor: 'bg-gradient-to-r from-amber-500 to-amber-600',
    highlightBg: 'bg-gradient-to-r from-amber-50 to-gray-50 border border-amber-200',
    highlightText: 'text-amber-800',
    highlightContent: 'text-gray-700',
    starColor: 'text-amber-500'
  },
  {
    name: 'Vulnerability Assessment Dashboard',
    role: 'Security Automation Engineer',
    duration: '3 Months',
    description: 'Centralized dashboard for vulnerability management with automated scanning, risk scoring, and remediation tracking',
    tech: ['FastAPI', 'Vue 3', 'PostgreSQL', 'Celery', 'Nessus API', 'Docker', 'Redis'],
    highlights: 'Automated vulnerability scanning, risk scoring, remediation tracking, compliance reporting, team collaboration',
    badgeColor: 'bg-gradient-to-r from-rose-500 to-rose-600',
    highlightBg: 'bg-gradient-to-r from-rose-50 to-gray-50 border border-rose-200',
    highlightText: 'text-rose-800',
    highlightContent: 'text-gray-700',
    starColor: 'text-rose-500'
  }
])

// Helper function for project colors
const getProjectColorClass = (index) => {
  const colors = [
    'hover:shadow-emerald-100',
    'hover:shadow-blue-100',
    'hover:shadow-purple-100',
    'hover:shadow-cyan-100',
    'hover:shadow-amber-100',
    'hover:shadow-rose-100'
  ]
  return colors[index % colors.length]
}

// Core Skills
const coreSkills = ref([
  {
    category: 'Languages & Frameworks',
    skills: ['Python (FastAPI)', 'JavaScript/TypeScript', 'Dart (Flutter)', 'C', 'C++', 'Node.js', 'Express']
  },
  {
    category: 'Frontend Development',
    skills: ['Vue 3', 'React', 'Pinia', 'Vue Router', 'TailwindCSS', 'Vite']
  },
  {
    category: 'Backend & Databases',
    skills: ['FastAPI', 'REST & OpenAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Celery', 'RabbitMQ']
  },
  {
    category: 'DevOps & Infrastructure',
    skills: ['Docker', 'Docker Compose', 'Nginx', 'GitHub Actions', 'Prometheus/Grafana', 'CI/CD']
  },
  {
    category: 'Security & Pentesting',
    skills: ['Ethical Hacking', 'Penetration Testing', 'OSINT', 'OWASP', 'AD Attacks', 'Buffer Overflows', 'Network Security']
  },
  {
    category: 'Reverse Engineering & Tools',
    skills: ['Ghidra', 'radare2', 'GDB', 'Memory Forensics', 'Wireshark', 'Burp Suite', 'Metasploit']
  }
])

const workExperience = ref([
  'Designed and implemented enterprise Cooperative Savings & Loan Management System (CSLMS) with FastAPI backend, Vue 3 admin dashboard, and Flutter mobile client',
  'Built secure API contracts with OpenAPI documentation, implementing JWT authentication, RBAC, input validation, and rate limiting',
  'Implemented automated interest calculation and delinquency provisioning using Celery + RabbitMQ, generating monthly financial statements',
  'Performed vulnerability assessments on web services, discovering logic flaws and hardening authentication flows',
  'Developed malware analysis lab for reverse engineering synthetic samples, producing IOCs and defensive countermeasures',
  'Automated deployment pipelines and monitoring, reducing deployment time to under 10 minutes',
  'Created multiple security tools including port scanners, incident response systems, and vulnerability assessment platforms'
])

const experienceTech = ref(['FastAPI', 'Vue 3', 'React', 'Flutter', 'MongoDB', 'Node.js', 'Celery', 'Docker', 'JWT', 'RBAC', 'CI/CD'])

const technicalProficiency = ref([
  {
    name: 'Backend Development',
    skills: [
      { name: 'FastAPI', level: 95 },
      { name: 'Python', level: 90 },
      { name: 'Node.js/Express', level: 85 },
      { name: 'REST API Design', level: 88 },
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 82 }
    ]
  },
  {
    name: 'Frontend & Mobile',
    skills: [
      { name: 'Vue 3', level: 95 },
      { name: 'React', level: 80 },
      { name: 'TypeScript', level: 85 },
      { name: 'TailwindCSS', level: 88 },
      { name: 'Flutter', level: 82 },
      { name: 'State Management', level: 85 }
    ]
  },
  {
    name: 'Security & Pentesting',
    skills: [
      { name: 'Web App Security', level: 85 },
      { name: 'Penetration Testing', level: 82 },
      { name: 'Reverse Engineering', level: 80 },
      { name: 'Network Security', level: 78 },
      { name: 'Vulnerability Assessment', level: 85 },
      { name: 'Security Architecture', level: 82 }
    ]
  },
  {
    name: 'DevOps & Infrastructure',
    skills: [
      { name: 'Docker', level: 88 },
      { name: 'CI/CD Pipelines', level: 82 },
      { name: 'Linux Administration', level: 85 },
      { name: 'Git/GitHub Actions', level: 90 },
      { name: 'Monitoring', level: 78 },
      { name: 'Backup Strategies', level: 80 }
    ]
  }
])

const handleImageError = (event) => {
  console.log('Image failed to load, using fallback')
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iNjQiIGZpbGw9IiMxZDIxMjkiLz4KPHN2ZyB4PSIzMiIgeT0iMzIiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMTIgMTJtLTEwIDBhOS45OTk3IDkuOTk5NyAwIDEgMCAyMCAwYTkuOTk5NyA5Ljk5OTcgMCAxIDAgLTIwIDAiLz4KPHBhdGggZD0iTTEyIDE2bC00LTRoOGwtNCA0eiIvPgo8cGF0aCBkPSJNMTQgOGwtMi0yLTIgMiIvPgo8L3N2Zz4KPC9zdmc+Cg=='
}

const generatePDF = async () => {
  generatingPDF.value = true
  
  try {
    const element = document.getElementById('resume-content')
    const opt = {
      margin: 0.5,
      filename: 'Amanuel_Sisay_Professional_Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    }

    await html2pdf().set(opt).from(element).save()
    
  } catch (error) {
    console.error('PDF generation failed:', error)
    alert('Failed to generate PDF. Please try again.')
  } finally {
    generatingPDF.value = false
  }
}

const printResume = () => {
  window.print()
}

onMounted(() => {
  // Any initialization code if needed
})
</script>

<style scoped>
/* Background pattern */
.bg-dot-pattern {
  background-image: radial-gradient(circle, #ffffff 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Professional print styles */
@media print {
  .bg-slate-800 { background-color: #1e293b !important; -webkit-print-color-adjust: exact; }
  .bg-gray-900 { background-color: #111827 !important; -webkit-print-color-adjust: exact; }
  .bg-emerald-600 { background-color: #059669 !important; -webkit-print-color-adjust: exact; }
  .bg-emerald-50 { background-color: #ecfdf5 !important; -webkit-print-color-adjust: exact; }
  .bg-gray-50 { background-color: #f9fafb !important; -webkit-print-color-adjust: exact; }
  .bg-gradient-to-r { background-image: none !important; }
  
  button { display: none !important; }
  .shadow-2xl { box-shadow: none !important; }
  .shadow-lg { box-shadow: none !important; }
  
  .min-h-screen { padding: 0 !important; }
  .pt-16 { padding-top: 1rem !important; }
  .pb-16 { padding-bottom: 1rem !important; }
  
  /* Ensure good contrast for print */
  .text-emerald-100 { color: #d1fae5 !important; }
  .text-slate-300 { color: #cbd5e1 !important; }
  
  /* Hide background patterns in print */
  .bg-dot-pattern { display: none !important; }
}
</style>