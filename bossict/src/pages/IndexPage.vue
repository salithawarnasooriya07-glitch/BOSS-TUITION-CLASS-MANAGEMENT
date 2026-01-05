<template>
  <q-page class="bg-grey-3">
    <!-- Hero Section -->
    <div ref="heroSection" class="row items-center justify-center hero-section relative-position overflow-hidden">
      
      <!-- Interactive Particle Canvas -->
      <canvas ref="particleCanvas" class="absolute-full" style="z-index: 0;"></canvas>

      <!-- Decorator Circles (Keep these for subtle background depth) -->
      <div class="absolute-top-right bg-green-2 rounded-circle fade-in-delayed" style="width: 300px; height: 300px; filter: blur(60px); opacity: 0.3; top: -100px; right: -50px;"></div>
      <div class="absolute-bottom-left bg-grey-5 rounded-circle fade-in-delayed" style="width: 400px; height: 400px; filter: blur(80px); opacity: 0.2; bottom: -150px; left: -100px;"></div>

      <div class="container z-top" style="max-width: 1200px; width: 100%;">
        <div class="row items-center justify-center q-col-gutter-xl">
          
          <!-- Left Side: Brand Text -->
          <div class="col-12 col-md-5 text-left content-appear">
            <h1 class="text-h1 text-weight-bolder q-mt-none q-mb-md text-black lh-tight" style="font-family: 'Lilita One', cursive; letter-spacing: 2px; font-size: 5rem;">
              bossof<span class="text-primary">ict</span>
            </h1>
            
            <p class="text-h3 text-weight-bold text-grey-9 q-mb-none" style="font-family: '0KDBOLIDDA bold', 'sans-serif';">
              "පරපුරක් සනසමු"
            </p>
          </div>

          <!-- Right Side: Login Box -->
          <div class="col-12 col-md-5 col-lg-4 offset-md-1 content-appear" style="animation-delay: 0.2s;">
            <q-card class="q-pa-lg rounded-borders-lg" style="background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);">
              <q-card-section class="text-center q-pb-none">
                <div class="text-h5 text-weight-bold q-mb-xs">Welcome Back</div>
                <div class="text-grey-7 text-caption">Login to access your dashboard</div>
              </q-card-section>

              <q-card-section>
                <q-form @submit="handleLogin" class="q-gutter-md">
                  <q-input
                    v-model="email"
                    label="Email Address"
                    outlined
                    dense
                    color="primary"
                    bg-color="grey-1"
                    :rules="[val => !!val || 'Required']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" class="text-grey-6"/>
                    </template>
                  </q-input>
                  
                  <q-input
                    v-model="password"
                    label="Password"
                    type="password"
                    outlined
                    dense
                    color="primary"
                    bg-color="grey-1"
                    :rules="[val => !!val || 'Required']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" class="text-grey-6"/>
                    </template>
                  </q-input>

                  <div class="text-right">
                     <a href="#" class="text-grey-7 text-caption text-weight-medium" style="text-decoration: none;">Forgot Password?</a>
                  </div>

                  <q-btn
                    type="submit"
                    unelevated
                    color="black"
                    text-color="white"
                    label="Log In"
                    class="full-width text-weight-bold shadow-2 q-py-sm text-subtitle1"
                    :loading="loading"
                    no-caps
                  />
                </q-form>

                <div class="q-mt-md text-center">
                  <span class="text-grey-8 text-caption">New here? </span>
                  <router-link to="/register" class="text-primary text-weight-bold text-caption" style="text-decoration: none;">Create an Account</router-link>
                </div>
              </q-card-section>
            </q-card>
          </div>

        </div>
      </div>
    </div>

    <!-- Features Section (About) -->
    <div id="about" class="row justify-center items-center q-pa-xl relative-position" style="min-height: 700px; background-image: url('/profile-bg-pool.jpg'); background-size: cover; background-position: center center;">
      <!-- Dark Overlay -->
      <div class="absolute-full bg-black" style="opacity: 0.6;"></div>

      <div class="col-12 col-md-8 text-center relative-position z-top">
        <h2 class="text-h3 text-weight-bold text-white q-mb-md" style="font-family: 'Lilita One', cursive;">
          About the Class
        </h2>
        <div class="text-h5 text-white text-weight-medium q-mx-auto" style="max-width: 800px; line-height: 1.6;">
          Join the most advanced ICT tuition class in Sri Lanka. 
          We combine modern teaching methods with real-world practical knowledge to ensure you don't just pass exams, but master the technology of the future. 
          Experience a verified learning path designed for success.
        </div>
        
        <div class="q-mt-xl">
           <q-btn 
            outline 
            color="white" 
            label="Join Now" 
            size="lg"
            to="/register"
            class="q-px-xl rounded-borders text-weight-bold" 
          />
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div id="faq" class="row justify-center q-pa-xl bg-white">
      <div class="col-12 col-md-8">
        <div class="text-center q-mb-xl">
          <h2 class="text-h4 text-weight-bold">Frequently Asked Questions</h2>
          <div class="text-subtitle1 text-grey-7">Common questions about our classes.</div>
        </div>

        <q-list class="rounded-borders">
          <q-expansion-item
            group="somegroup"
            label="How do I join the class?"
            default-opened
            header-class="text-weight-bold text-h6 bg-grey-1"
          >
            <q-card>
              <q-card-section class="text-grey-8">
                Simply register for an account and subscribe to the course in your dashboard. You will get instant access to materials.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            label="Are the lessons live or recorded?"
            header-class="text-weight-bold text-h6 bg-grey-1"
          >
            <q-card>
              <q-card-section class="text-grey-8">
                We offer both! You can attend live sessions or watch high-quality recordings at your own pace from the video library.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            label="How can I contact the instructor?"
            header-class="text-weight-bold text-h6 bg-grey-1"
          >
            <q-card>
              <q-card-section class="text-grey-8">
                You can use the 'Contact Us' section below or send a message via our Telegram group for quick support.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from '../services/supabase'

const heroSection = ref(null)
const particleCanvas = ref(null)

// Login Logic
const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const $q = useQuasar()

async function handleLogin() {
  console.log('Attempting login...')
  loading.value = true
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) {
        console.error('Supabase Login Error:', error)
        throw error
    }

    console.log('Login successful:', data)

    $q.notify({
      type: 'positive',
      message: 'Login Successful! Redirecting...',
      position: 'top',
      timeout: 1000
    })
    
    console.log('Redirecting to dashboard...')
    await router.push('/dashboard')
    console.log('Router push complete.')
  } catch (error) {
    console.error('Login Exception:', error)
    $q.notify({
      type: 'negative',
      message: error.message || 'Error logging in',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

let ctx = null
let animationFrameId = null
let particles = []
let mouse = { x: null, y: null }

// System Configuration
const PARTICLE_COUNT = 80

const MOUSE_RADIUS = 150

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.vx = (Math.random() - 0.5) * 1.5 // Velocity X
    this.vy = (Math.random() - 0.5) * 1.5 // Velocity Y
    this.size = Math.random() * 3 + 1
    this.color = Math.random() > 0.5 ? '#00C853' : '#9E9E9E' // Green or Grey
  }

  update(canvasWidth, canvasHeight) {
    // Normal Movement
    this.x += this.vx
    this.y += this.vy

    // Bounce off edges
    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1

    // Mouse Interaction (Anti-gravity / Repulsion)
    if (mouse.x != null) {
      let dx = mouse.x - this.x
      let dy = mouse.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < MOUSE_RADIUS) {
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS
        
        // Push away from mouse
        const directionX = forceDirectionX * force * 3
        const directionY = forceDirectionY * force * 3

        this.x -= directionX
        this.y -= directionY
      }
    }
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.fill()
  }
}

function initParticles() {
  const canvas = particleCanvas.value
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(canvas.width, canvas.height))
  }
}

function animate() {
  const canvas = particleCanvas.value
  if (!canvas) return
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(canvas.width, canvas.height)
    particles[i].draw(ctx)
  }
  
  // Optional: Connect particles with lines if close
  // connectParticles() 

  animationFrameId = requestAnimationFrame(animate)
}

function handleResize() {
  const canvas = particleCanvas.value
  const parent = heroSection.value
  if (canvas && parent) {
    canvas.width = parent.offsetWidth
    canvas.height = parent.offsetHeight
    initParticles() // Re-init on resize to keep density
  }
}

function updateMouse(event) {
  const rect = particleCanvas.value.getBoundingClientRect()
  mouse.x = event.clientX - rect.left
  mouse.y = event.clientY - rect.top
}

function resetMouse() {
  mouse.x = null
  mouse.y = null
}

onMounted(() => {
  const canvas = particleCanvas.value
  ctx = canvas.getContext('2d')
  
  // Initial sizing
  handleResize()
  
  // Start loop
  animate()

  // Listeners
  window.addEventListener('resize', handleResize)
  heroSection.value.addEventListener('mousemove', updateMouse)
  heroSection.value.addEventListener('mouseleave', resetMouse)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.hero-section {
  height: 100vh;
  min-height: 700px;
}
.rounded-borders {
  border-radius: 12px;
}
.rounded-circle {
  border-radius: 50%;
}
.bg-fa {
  background-color: #fafafa;
}
.border-card {
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  border-radius: 16px;
}
.border-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1) !important; /* Soft shadow on hover */
  border-color: transparent;
}
.h-100 {
  height: 100%;
}
.lh-tight {
  line-height: 1.1;
}
.z-top {
  z-index: 10;
}
.tracking-wider {
  letter-spacing: 1px;
}

/* Animations */
.content-appear {
  animation: slideUpFade 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.fade-in-delayed {
  animation: fadeIn 2s ease-out forwards;
  opacity: 0;
}

.scale-hover {
  transition: transform 0.2s;
}
.scale-hover:hover {
  transform: scale(1.05);
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  to {
    opacity: 0.5;
  }
}
</style>
