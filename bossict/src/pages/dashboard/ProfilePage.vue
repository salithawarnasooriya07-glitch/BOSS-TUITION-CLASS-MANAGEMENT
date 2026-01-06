<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <h1 class="text-h4 text-weight-bold q-mb-md">My Profile</h1>
        <p class="text-grey-7 q-mb-xl">Manage your personal information.</p>

        <q-card flat bordered class="rounded-borders">
          <q-card-section>
            <q-form @submit="updateProfile" class="q-gutter-md">
              
              <!-- Email (Read Only) -->
              <q-input
                v-model="profile.email"
                label="Email Address"
                outlined
                readonly
                color="grey-7"
                bg-color="grey-1"
                hint="You cannot change your email address."
              >
                 <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>

              <!-- Full Name -->
              <q-input
                v-model="profile.full_name"
                label="Full Name"
                outlined
                color="primary"
                :rules="[val => !!val || 'Name is required']"
              >
                 <template v-slot:prepend>
                  <q-icon name="badge" />
                </template>
              </q-input>

              <!-- Phone (Optional) -->
              <q-input
                v-model="profile.phone"
                label="Phone Number"
                outlined
                color="primary"
                mask="### ### ####"
                hint="Format: 077 123 4567"
              >
                 <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>

              <div class="flex justify-end q-mt-lg">
                <q-btn 
                    label="Save Changes" 
                    type="submit" 
                    color="black" 
                    unelevated 
                    :loading="loading"
                    class="q-px-lg"
                />
              </div>

            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { supabase } from '../../services/supabase'

const $q = useQuasar()
const loading = ref(false)
const profile = ref({
    email: '',
    full_name: '',
    phone: ''
})

onMounted(async () => {
    await fetchProfile()
})

async function fetchProfile() {
    loading.value = true
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        profile.value.email = user.email

        const { data, error } = await supabase
            .from('profiles')
            .select('full_name, phone')
            .eq('id', user.id)
            .single()
        
        if (error) throw error // Fix: Handle the error so it is used
        
        if (data) {
            profile.value.full_name = data.full_name
            profile.value.phone = data.phone || ''
        }
    } catch (error) {
        console.error('Error fetching profile:', error)
    } finally {
        loading.value = false
    }
}

async function updateProfile() {
    loading.value = true
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No user logged in')

        const updates = {
            id: user.id,
            full_name: profile.value.full_name,
            phone: profile.value.phone,
            updated_at: new Date()
        }

        const { error } = await supabase
            .from('profiles')
            .upsert(updates)

        if (error) throw error

        $q.notify({
            type: 'positive',
            message: 'Profile updated successfully!'
        })
    } catch (error) {
        $q.notify({
            type: 'negative',
            message: error.message || 'Error updating profile'
        })
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}
</style>
