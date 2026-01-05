<template>
  <q-layout view="lHh Lpr lff">
    <q-header class="bg-grey-2 text-black bordered-bottom q-py-sm">
      <q-toolbar>
        <!-- Logo Area -->
        <q-toolbar-title 
          class="text-weight-bolder text-h5 q-ml-md cursor-pointer logo-hover" 
          style="letter-spacing: 1px; font-family: 'Lilita One', cursive;" 
          @click="$router.push('/')"
        >
          bossof<span class="text-primary">ict</span>
        </q-toolbar-title>

        <q-space />

        <!-- Navigation Menus -->
        <div class="q-gutter-lg flex items-center q-mr-xl gt-sm">
          <a href="#" @click.prevent="scrollToSection('about')" class="nav-link">About</a>
          <a href="#" @click.prevent="scrollToSection('about')" class="nav-link">Classes</a>
          <a href="#" @click.prevent="scrollToSection('faq')" class="nav-link">FAQ</a>
          <a href="#" @click.prevent="scrollToSection('contact')" class="nav-link">Contact</a>
        </div>

        <!-- Simple Auth Navigation -->
        <div class="q-gutter-sm flex items-center q-mr-md">
          <q-btn 
            outline 
            no-caps 
            label="Log In" 
            to="/login" 
            color="black"
            class="text-weight-bold rounded-borders q-px-md auth-btn" 
          />
          <q-btn 
            outline 
            color="black" 
            no-caps 
            label="Register" 
            to="/register"
            class="q-px-lg rounded-borders text-weight-bold auth-btn" 
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer id="contact" class="bg-black text-white">
      <div class="q-pa-xl">
        <div class="row q-col-gutter-xl">
          <!-- About Section -->
          <div class="col-12 col-md-4">
            <div class="text-h5 text-weight-bolder q-mb-md" style="font-family: 'Lilita One', cursive; letter-spacing: 1px;">
              bossof<span class="text-primary">ict</span>
            </div>
            <p class="text-grey-5" style="line-height: 1.6;">
              BossOfICT is your ultimate gateway to mastering Information and Communication Technology. 
              We are dedicated to empowering the next generation with simple, effective, and next-level education resources. 
              Join us to shape the future.
            </p>
            <div class="q-gutter-sm">
              <q-btn round flat dense icon="facebook" class="text-white hover-green" />
              <q-btn round flat dense icon="discord" class="text-white hover-green" />
              <q-btn round flat dense icon="telegram" class="text-white hover-green" />
            </div>
          </div>

          <!-- Quick Links -->
          <div class="col-12 col-md-4">
            <div class="text-h6 text-weight-bold q-mb-md text-white">Quick Links</div>
            <div class="column q-gutter-sm text-grey-5">
              <a href="#" @click.prevent="scrollToSection('hero')" class="footer-link">Home</a>
              <a href="#" @click.prevent="scrollToSection('about')" class="footer-link">About Us</a>
              <a href="#" @click.prevent="scrollToSection('classes')" class="footer-link">Classes</a>
              <a href="#" @click.prevent="scrollToSection('contact')" class="footer-link">Contact</a>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="col-12 col-md-4">
            <div class="text-h6 text-weight-bold q-mb-md text-white">Contact Us</div>
            <div class="column q-gutter-md text-grey-5">
              <div class="flex items-center">
                <q-icon name="email" color="primary" size="xs" class="q-mr-sm" />
                info@bossofict.com
              </div>
              <div class="flex items-center">
                <q-icon name="phone" color="primary" size="xs" class="q-mr-sm" />
                +94 77 123 4567
              </div>
              <div class="flex items-center">
                <q-icon name="location_on" color="primary" size="xs" class="q-mr-sm" />
                Colombo, Sri Lanka
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="bg-grey-10 text-center q-py-md text-grey-6 text-caption">
        &copy; {{ new Date().getFullYear() }} BossOfICT. All rights reserved.
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { scroll } from 'quasar'

const { getScrollTarget, setVerticalScrollPosition } = scroll
const router = useRouter()
const route = useRoute()

function scrollToSection(id) {
  // If not on home page, go to home first
  if (route.path !== '/') {
    router.push('/').then(() => {
      // Small delay to allow page render
      setTimeout(() => performScroll(id), 300)
    })
  } else {
    performScroll(id)
  }
}

function performScroll(id) {
  const el = document.getElementById(id)
  if (el) {
    const target = getScrollTarget(el)
    const offset = el.offsetTop
    const duration = 500
    setVerticalScrollPosition(target, offset, duration)
  }
}
</script>

<style scoped>
.bordered-bottom {
  border-bottom: 1px solid #e0e0e0;
}
.rounded-borders {
  border-radius: 8px;
}

/* Nav Link Styles */
.nav-link {
  color: #1A1A1A;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  padding-bottom: 4px;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2.5px;
  bottom: 0;
  left: 0;
  background-color: var(--q-primary);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
  border-radius: 2px;
}

.nav-link:hover {
  color: var(--q-primary); /* Optional: Change text color on hover too for extra pop */
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.logo-hover {
  transition: opacity 0.3s ease;
}
.logo-hover:hover {
  opacity: 0.7;
}

/* Auth Button Hover Effect */
.auth-btn {
  transition: all 0.3s ease;
}
.auth-btn:hover {
  background-color: black !important;
  color: white !important;
}

/* Footer Link Styles */
.footer-link {
  color: #9e9e9e; /* grey-5 */
  text-decoration: none;
  transition: color 0.3s ease;
}
.footer-link:hover {
  color: var(--q-primary);
  padding-left: 5px; /* Subtle movement */
}

.hover-green:hover {
  color: var(--q-primary) !important;
}
</style>
