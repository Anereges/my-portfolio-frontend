import { onMounted, ref } from 'vue'
import gsap from 'gsap'

export function useAnimations() {
  const animated = ref(false)

  const animateText = (element, delay = 0) => {
    if (!element) return
    
    gsap.fromTo(element, {
      opacity: 0,
      y: 50,
      rotationX: 90
    }, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out'
    })
  }

  const animateCyberCard = (element) => {
    gsap.fromTo(element, {
      opacity: 0,
      scale: 0.8,
      rotationY: 180
    }, {
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    })
  }

  const animateSkillBar = (element, proficiency) => {
    gsap.fromTo(element, {
      width: '0%'
    }, {
      width: `${proficiency}%`,
      duration: 1.5,
      delay: 0.5,
      ease: 'power3.out'
    })
  }

  const createParticleEffect = (event, color = '#00f0ff') => {
    if (!event || !event.clientX) return
    
    const particles = []
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div')
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
      `
      document.body.appendChild(particle)

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 0,
        duration: 1,
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }
      })

      particles.push(particle)
    }
    return particles
  }

  return {
    animated,
    animateText,
    animateCyberCard,
    animateSkillBar,
    createParticleEffect
  }
}