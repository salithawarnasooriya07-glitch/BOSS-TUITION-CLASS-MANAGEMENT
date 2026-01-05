<template>
  <q-page class="bg-grey-3 flex flex-center relative-position overflow-hidden">
    
    <!-- Interactive Particle Canvas -->
    <canvas ref="particleCanvas" class="absolute-full" style="z-index: 0;"></canvas>

    <!-- Decorator Circles -->
    <div class="absolute-top-right bg-green-2 rounded-circle fade-in-delayed" style="width: 300px; height: 300px; filter: blur(60px); opacity: 0.3; top: -100px; right: -50px;"></div>
    <div class="absolute-bottom-left bg-grey-5 rounded-circle fade-in-delayed" style="width: 400px; height: 400px; filter: blur(80px); opacity: 0.2; bottom: -150px; left: -100px;"></div>

    <div class="z-top relative-position q-pa-md" style="width: 100%; max-width: 450px;">
        <q-card class="q-pa-lg rounded-borders-lg content-appear" style="background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);">
        <q-card-section class="text-center">
            <h2 class="text-h4 text-weight-bolder q-my-sm text-black" style="font-family: 'Lilita One', cursive;">
            bossof<span class="text-primary">ict</span>
            </h2>
            <div class="text-grey-7">Create your account</div>
        </q-card-section>

        <q-card-section>
            <q-form @submit="handleRegister" class="q-gutter-md">
            <q-input
                v-model="fullName"
                label="Full Name"
                outlined
                dense
                color="black"
                bg-color="white"
                :rules="[val => !!val || 'Name is required']"
            >
                <template v-slot:prepend>
                  <q-icon name="person" class="text-grey-6"/>
                </template>
            </q-input>

            <q-input
                v-model="email"
                label="Email"
                outlined
                dense
                color="black"
                bg-color="white"
                :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Invalid email']"
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
                color="black"
                bg-color="white"
                :rules="[val => !!val || 'Password is required', val => val.length >= 6 || 'Min 6 characters']"
            >
                <template v-slot:prepend>
                  <q-icon name="lock" class="text-grey-6"/>
                </template>
            </q-input>

            <q-input
                v-model="confirmPassword"
                label="Confirm Password"
                type="password"
                outlined
                dense
                color="black"
                bg-color="white"
                :rules="[
                    val => !!val || 'Please confirm your password',
                    val => val === password || 'Passwords do not match'
                ]"
            >
                <template v-slot:prepend>
                  <q-icon name="lock_outline" class="text-grey-6"/>
                </template>
            </q-input>

            <q-btn
                type="submit"
                unelevated
                color="black"
                text-color="white"
                label="Register"
                class="full-width text-weight-bold shadow-2 q-py-sm text-subtitle1"
                :loading="loading"
                no-caps
            />
            </q-form>
        </q-card-section>

        <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8 text-caption">
            Already have an account? 
            <router-link to="/" class="text-primary text-weight-bold" style="text-decoration: none;">Back to Login</router-link>
            </div>
        </q-card-section>
        </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from '../services/supabase'

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const router = useRouter()
const $q = useQuasar()

// Particle System Logic
const particleCanvas = ref(null)
let ctx = null
let animationFrameId = null
let particles = []
let mouse = { x: null, y: null }
const PARTICLE_COUNT = 50 // Fewer particles for register page for cleaner look
const MOUSE_RADIUS = 150

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.vx = (Math.random() - 0.5) * 1.5
    this.vy = (Math.random() - 0.5) * 1.5
    this.size = Math.random() * 3 + 1
    this.color = Math.random() > 0.5 ? '#00C853' : '#9E9E9E'
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.vx
    this.y += this.vy
    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1

    if (mouse.x != null) {
      let dx = mouse.x - this.x
      let dy = mouse.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < MOUSE_RADIUS) {
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS
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
  animationFrameId = requestAnimationFrame(animate)
}

function handleResize() {
    const canvas = particleCanvas.value
    if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initParticles()
    }
}

function updateMouse(event) {
    if (!particleCanvas.value) return
    const rect = particleCanvas.value.getBoundingClientRect()
    mouse.x = event.clientX - rect.left
    mouse.y = event.clientY - rect.top
}

// Registration Logic
async function handleRegister() {
  console.log('Attempting registration...')
  loading.value = true
  try {
    // 1. Sign up user
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: fullName.value
        }
      }
    })

    if (error) throw error

    console.log('Registration auth successful:', data)

    // 2. Create Profile
    if (data.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
                id: data.user.id,
                full_name: fullName.value,
                role: 'student'
            })
        
        if (profileError) console.error('Error creating profile:', profileError)
    }

    $q.notify({
      type: 'positive',
      message: 'Registration Successful! Redirecting...',
      position: 'top',
      timeout: 1000
    })
    
    console.log('Redirecting to dashboard...')
    await router.push('/dashboard')
    console.log('Router push complete.')

  } catch (error) {
    console.error('Registration Error:', error)
    $q.notify({
      type: 'negative',
      message: error.message || 'Error registering',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const canvas = particleCanvas.value
  ctx = canvas.getContext('2d')
  handleResize()
  animate()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', updateMouse)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', updateMouse)
})
</script>

<style scoped>
.rounded-borders-lg {
  border-radius: 16px;
}
.rounded-circle {
  border-radius: 50%;
}
.content-appear {
  animation: slideUpFade 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}
.fade-in-delayed {
  animation: fadeIn 2s ease-out forwards;
  opacity: 0;
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
