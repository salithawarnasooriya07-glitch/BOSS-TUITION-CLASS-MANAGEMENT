<template>
  <q-layout view="lHh Lpr lff">
    <!-- Sidebar / Drawer -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      class="bg-white"
      :width="250"
      :breakpoint="500"
    >
      <div class="q-pa-md row items-center" :class="miniState ? 'justify-center q-px-sm' : 'justify-between'">
        <!-- Branding (Hide when mini) -->
        <div v-if="!miniState" class="col overflow-hidden">
             <h2 class="text-h5 text-weight-bolder q-my-none text-black" style="font-family: 'Lilita One', cursive; line-height: 1;">
                bossof<span class="text-primary">ict</span>
            </h2>
            <div class="text-grey-7 text-caption no-wrap">Student Dashboard</div>
        </div>

        <!-- Hamburger Menu / Toggle -->
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="text-grey-8"
          @click="miniState = !miniState"
        />
      </div>

      <q-separator />

      <q-list padding class="text-grey-8">
        <!-- Profile -->
        <q-item clickable v-ripple to="/dashboard/profile" active-class="text-primary bg-green-1">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section class="text-weight-medium">Profile</q-item-section>
        </q-item>

        <!-- My Lessons -->
        <q-item clickable v-ripple to="/dashboard/my-lessons" active-class="text-primary bg-green-1">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section class="text-weight-medium">My Lessons</q-item-section>
        </q-item>

        <!-- Available Lessons -->
        <q-item clickable v-ripple to="/dashboard/available-lessons" active-class="text-primary bg-green-1">
          <q-item-section avatar>
            <q-icon name="library_books" />
          </q-item-section>
          <q-item-section class="text-weight-medium">Available Lessons</q-item-section>
        </q-item>

        <!-- Payment Methods -->
        <q-item clickable v-ripple to="/dashboard/payment-methods" active-class="text-primary bg-green-1">
          <q-item-section avatar>
            <q-icon name="credit_card" />
          </q-item-section>
          <q-item-section class="text-weight-medium">Payment Methods</q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <!-- Log Out -->
        <q-item clickable v-ripple @click="handleLogout" class="text-red-7">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section class="text-weight-medium">Log Out</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from '../services/supabase'

const leftDrawerOpen = ref(false)
const miniState = ref(false) // Start expanded
const router = useRouter()
const $q = useQuasar()

async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    $q.notify({
        type: 'positive',
        message: 'Logged out successfully'
    })
    
    router.push('/')
  } catch (error) {
    $q.notify({
        type: 'negative',
        message: error.message || 'Error logging out'
    })
  }
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}
</style>
