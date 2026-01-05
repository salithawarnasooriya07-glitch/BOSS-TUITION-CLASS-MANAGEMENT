<template>
  <q-page class="bg-grey-3 flex flex-center">
    <q-card class="auth-card q-pa-lg shadow-10 bg-white">
      <q-card-section class="text-center">
        <h2 class="text-h4 text-weight-bolder q-my-sm text-black" style="font-family: 'Lilita One', cursive;">
          bossof<span class="text-primary">ict</span>
        </h2>
        <div class="text-grey-7">Sign in to your account</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleLogin" class="q-gutter-md">
          <q-input
            v-model="email"
            label="Email"
            outlined
            dense
            color="primary"
            bg-color="grey-1"
            :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Invalid email']"
          />
          <q-input
            v-model="password"
            label="Password"
            type="password"
            outlined
            dense
            color="primary"
            bg-color="grey-1"
            :rules="[val => !!val || 'Password is required']"
          />

          <div class="text-right">
            <q-btn flat no-caps label="Forgot Password?" color="grey-7" size="sm" />
          </div>

          <q-btn
            type="submit"
            unelevated
            color="black"
            text-color="white"
            label="Log In"
            class="full-width text-weight-bold shadow-2 q-py-sm"
            :loading="loading"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center q-pt-none">
        <div class="text-grey-8 text-caption">
          Don't have an account? 
          <router-link to="/register" class="text-primary text-weight-bold" style="text-decoration: none;">Register</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from '../services/supabase'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()
const $q = useQuasar()

async function handleLogin() {
  loading.value = true
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    $q.notify({
      type: 'positive',
      message: 'Welcome back!',
      position: 'top'
    })
    
    router.push('/dashboard')
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Error logging in',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-card {
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
}
</style>
