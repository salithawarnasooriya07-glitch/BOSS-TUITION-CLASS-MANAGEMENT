<template>
  <q-page class="bg-grey-3 q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-10">
        <!-- Dashboard Header -->
        <div class="flex justify-between items-center q-mb-lg">
          <div>
            <h1 class="text-h4 text-weight-bold q-my-none">Dashboard</h1>
            <div class="text-grey-8">Welcome back, {{ userName }}</div>
          </div>
          <q-btn flat icon="logout" label="Sign Out" @click="handleLogout" />
        </div>

        <!-- Lessons Grid -->
        <h2 class="text-h5 text-weight-bold q-mb-md">Available Lessons</h2>
        
        <div v-if="loading" class="flex flex-center q-pa-xl">
          <q-spinner color="primary" size="3em" />
        </div>

        <div v-else-if="lessons.length === 0" class="text-center text-grey-7 q-pa-xl bg-white rounded-borders">
          No lessons found.
        </div>

        <div v-else class="row q-col-gutter-md">
          <div v-for="lesson in lessons" :key="lesson.id" class="col-12 col-sm-6 col-md-4">
            <q-card class="lesson-card bg-white h-100 column no-shadow border-card">
              <q-img 
                 src="https://cdn.quasar.dev/img/parallax2.jpg" 
                 :ratio="16/9"
              >
                <div class="absolute-bottom text-subtitle2 text-center">
                   {{ lesson.title }}
                </div>
              </q-img>

              <q-card-section class="col">
                <div class="text-subtitle1 text-weight-bold q-mb-sm">{{ lesson.title }}</div>
                <div class="text-grey-7 text-caption ellipsis-3-lines">
                  {{ lesson.description || 'No description available.' }}
                </div>
              </q-card-section>

              <q-card-actions align="right" class="q-pt-none q-pb-md q-px-md">
                <q-btn 
                  unelevated 
                  color="primary" 
                  label="Start Lesson" 
                  class="full-width rounded-borders"
                  :href="lesson.video_url" 
                  target="_blank"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { supabase } from '../services/supabase'

const router = useRouter()
const $q = useQuasar()

const loading = ref(true)
const lessons = ref([])
const userName = ref('Student')

onMounted(async () => {
    // 1. Check Auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        router.push('/')
        return
    }

    // 2. Get Profile Name
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()
    
    if (profile) userName.value = profile.full_name

    // 3. Fetch Lessons
    await fetchLessons()
})

async function fetchLessons() {
    try {
        const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .order('created_at', { ascending: false })
            
        if (error) throw error
        lessons.value = data
    } catch (error) {
        console.error('Error fetching lessons:', error)
         $q.notify({
            type: 'negative',
            message: 'Failed to load lessons',
        })
    } finally {
        loading.value = false
    }
}

async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}
.border-card {
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  border-radius: 12px;
}
.border-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
  border-color: var(--q-primary);
}
.h-100 {
  height: 100%;
}
</style>
