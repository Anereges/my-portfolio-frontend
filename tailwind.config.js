/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: '#00f0ff',
          secondary: '#ff00ff',
          accent: '#00ff88',
          dark: '#0a0a0f',
          darker: '#050508',
          card: '#11111f',
          border: '#1a1a2e'
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'tech': ['Rajdhani', 'sans-serif']
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'matrix': 'matrix 20s linear infinite',
        'scan': 'scan 2s linear infinite',
        'pulse-cyber': 'pulse-cyber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-spin': 'radarSpin 4s linear infinite',
        'radar-scan': 'radarScan 2s linear infinite',
        'spin-slow': 'spin 10s linear infinite',
        'text-reveal': 'textReveal 0.8s ease forwards',
        'glitch-1': 'glitch-1 0.5s infinite linear alternate-reverse',
        'glitch-2': 'glitch-2 0.5s infinite linear alternate-reverse'
      },
      keyframes: {
        glow: {
          'from': { 
            textShadow: '0 0 20px #00f0ff, 0 0 30px #00f0ff' 
          },
          'to': { 
            textShadow: '0 0 30px #00f0ff, 0 0 40px #00f0ff, 0 0 50px #00f0ff' 
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'pulse-cyber': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        radarSpin: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' }
        },
        radarScan: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        textReveal: {
          'from': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          }
        },
        'glitch-1': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        },
        'glitch-2': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '40%': { transform: 'translate(2px, 2px)' },
          '60%': { transform: 'translate(-2px, -2px)' },
          '80%': { transform: 'translate(-2px, 2px)' },
          '100%': { transform: 'translate(0)' }
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)',
        'cyber-radial': 'radial-gradient(circle at center, #00f0ff22 0%, transparent 70%)',
        'gradient-cyber': 'linear-gradient(135deg, #00f0ff 0%, #ff00ff 50%, #00ff88 100%)'
      }
    },
  },
  plugins: [],
}