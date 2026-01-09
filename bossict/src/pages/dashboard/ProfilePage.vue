<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="text-h4 text-weight-bold q-mb-md">My Profile</h1>
        <p class="text-grey-7 q-mb-xl">Manage your personal and academic information.</p>
        
        <q-form @submit="updateProfile" class="q-gutter-y-lg">

            <!-- 1. Profile Image -->
            <q-card flat bordered class="rounded-borders">
                <q-card-section class="flex flex-center column">
                     <q-avatar size="100px" class="q-mb-md cursor-pointer relative-position shadow-2">
                        <img :src="profileData.avatar_url || 'https://cdn.quasar.dev/img/boy-avatar.png'" style="object-fit: cover;">
                        <q-btn round dense icon="edit" size="sm" color="primary" class="absolute-bottom-right" @click="$refs.avatarInput.pickFiles()"/>
                     </q-avatar>
                     <q-file 
                        ref="avatarInput" 
                        v-model="avatarFile" 
                        label="Upload Photo" 
                        outlined 
                        dense 
                        class="hidden" 
                        accept=".jpg, .png, .jpeg"
                        @update:model-value="uploadAvatar"
                    />
                     <div class="text-subtitle2">Profile Photo</div>
                </q-card-section>
            </q-card>

            <!-- 2. Personal Information -->
            <q-card flat bordered class="rounded-borders">
                <q-card-section>
                    <div class="text-h6 q-mb-md">Personal Information</div>
                    <div class="row q-col-gutter-md">
                        <!-- Email (Read Only) -->
                        <div class="col-12">
                            <q-input v-model="profileData.email" label="Email Address" outlined readonly bg-color="grey-1">
                                <template v-slot:prepend><q-icon name="email" /></template>
                            </q-input>
                        </div>

                        <!-- Names -->
                        <div class="col-12 col-md-6">
                            <q-input v-model="profileData.first_name" label="First Name" outlined :rules="[val => !!val || 'Required']" />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-input v-model="profileData.last_name" label="Last Name" outlined :rules="[val => !!val || 'Required']" />
                        </div>

                         <!-- Contact -->
                        <div class="col-12 col-md-6">
                            <q-input v-model="profileData.mobile_number" label="Mobile Number" outlined mask="### ### ####" hint="Format: 077 123 4567" :rules="[val => !!val || 'Required']" />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-input v-model="profileData.whatsapp_number" label="WhatsApp Number" outlined mask="### ### ####" hint="Format: 077 123 4567" />
                        </div>
                        
                        <!-- ID & Personal -->
                        <div class="col-12 col-md-6">
                            <q-input v-model="profileData.nic_number" label="NIC Number" outlined :rules="[val => !!val || 'Required']" />
                        </div>
                         <div class="col-12 col-md-6">
                            <q-input v-model="profileData.school" label="School" outlined />
                        </div>

                        <!-- Location -->
                        <div class="col-12 col-md-6">
                            <q-input v-model="profileData.home_town" label="Home Town" outlined />
                        </div>
                        <div class="col-12 col-md-6">
                            <q-select v-model="profileData.district" :options="districts" label="District" outlined />
                        </div>
                        <div class="col-12">
                            <q-input v-model="profileData.address" label="Address" outlined type="textarea" rows="3" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <!-- 3. Academic Details -->
            <q-card flat bordered class="rounded-borders">
                 <q-card-section>
                    <div class="text-h6 q-mb-md">Academic Details</div>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-4">
                            <q-select v-model="profileData.attempt" :options="['1st Attempt', '2nd Attempt', '3rd Attempt']" label="Attempt" outlined />
                        </div>
                        <div class="col-12 col-md-4">
                            <q-input v-model="profileData.exam_year" label="Exam Year" outlined type="number" />
                        </div>
                         <div class="col-12 col-md-4">
                            <q-select v-model="profileData.medium" :options="['Sinhala', 'English']" label="Medium" outlined />
                        </div>
                    </div>
                 </q-card-section>
            </q-card>

            <!-- 4. NIC Uploads -->
            <q-card flat bordered class="rounded-borders">
                <q-card-section>
                    <div class="text-h6 q-mb-md">Identity Verification (NIC)</div>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                            <q-file outlined v-model="nicFrontFile" label="NIC Front Image" accept="image/*" @update:model-value="uploadNicFront">
                                <template v-slot:prepend><q-icon name="cloud_upload" /></template>
                            </q-file>
                            <div v-if="profileData.nic_front_url" class="q-mt-sm">
                                <q-img :src="profileData.nic_front_url" style="height: 150px; border-radius: 8px;" fit="cover"/>
                            </div>
                        </div>
                         <div class="col-12 col-md-6">
                            <q-file outlined v-model="nicBackFile" label="NIC Back Image" accept="image/*" @update:model-value="uploadNicBack">
                                <template v-slot:prepend><q-icon name="cloud_upload" /></template>
                            </q-file>
                             <div v-if="profileData.nic_back_url" class="q-mt-sm">
                                <q-img :src="profileData.nic_back_url" style="height: 150px; border-radius: 8px;" fit="cover"/>
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
            
            <!-- Save Button -->
            <div class="flex justify-end">
                <q-btn label="Save Changes" type="submit" color="black" unelevated size="lg" :loading="loading" class="q-px-xl rounded-borders" />
            </div>
            
        </q-form>

        <q-separator class="q-my-xl" />

        <!-- 5. Change Password -->
        <q-expansion-item
            icon="lock"
            label="Change Password"
            header-class="bg-grey-2 text-black rounded-borders"
            class="rounded-borders border-card"
        >
             <q-card>
                <q-card-section>
                    <q-form @submit="changePassword" class="q-gutter-md">
                        <q-input v-model="passwordForm.new" label="New Password" type="password" outlined :rules="[val => val.length >= 6 || 'Min 6 chars']" />
                        <q-input v-model="passwordForm.confirm" label="Confirm Password" type="password" outlined :rules="[val => val === passwordForm.new || 'Passwords do not match']" />
                        <div class="text-right">
                             <q-btn label="Update Password" type="submit" color="primary" unelevated :loading="passwordLoading" />
                        </div>
                    </q-form>
                </q-card-section>
             </q-card>
        </q-expansion-item>

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
const passwordLoading = ref(false)

const avatarFile = ref(null)
const nicFrontFile = ref(null)
const nicBackFile = ref(null)

const profileData = ref({
    email: '',
    first_name: '',
    last_name: '',
    full_name: '', // legacy
    mobile_number: '',
    whatsapp_number: '',
    nic_number: '',
    school: '',
    home_town: '',
    district: '',
    address: '',
    attempt: '1st Attempt',
    exam_year: new Date().getFullYear(),
    medium: 'Sinhala',
    avatar_url: null,
    nic_front_url: null,
    nic_back_url: null
})

const passwordForm = ref({ new: '', confirm: '' })

const districts = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota',
  'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle'
]

onMounted(async () => {
    await fetchProfile()
})

async function fetchProfile() {
    loading.value = true
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        profileData.value.email = user.email

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
        
        if (error && error.code !== 'PGRST116') throw error 

        if (data) {
            Object.assign(profileData.value, data)
            if (!profileData.value.first_name && profileData.value.full_name) {
                const parts = profileData.value.full_name.split(' ')
                profileData.value.first_name = parts[0]
                profileData.value.last_name = parts.slice(1).join(' ')
            }
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

        // Construct full name for legacy or display
        const full = `${profileData.value.first_name} ${profileData.value.last_name}`.trim()
        
        const updates = {
            id: user.id,
            email: profileData.value.email,
            first_name: profileData.value.first_name,
            last_name: profileData.value.last_name,
            full_name: full,
            mobile_number: profileData.value.mobile_number,
            whatsapp_number: profileData.value.whatsapp_number,
            nic_number: profileData.value.nic_number,
            school: profileData.value.school,
            home_town: profileData.value.home_town,
            district: profileData.value.district,
            address: profileData.value.address,
            attempt: profileData.value.attempt,
            exam_year: profileData.value.exam_year,
            medium: profileData.value.medium
        }

        const { error } = await supabase
            .from('profiles')
            .upsert(updates)

        if (error) throw error

        $q.notify({ type: 'positive', message: 'Profile updated successfully!' })
    } catch (error) {
        $q.notify({ type: 'negative', message: error.message || 'Error updating profile' })
    } finally {
        loading.value = false
    }
}

// Image Upload Helper
// Image Upload Helper
async function uploadFile(file, folder, columnToUpdate) {
    if (!file) return
    loading.value = true
    try {
         const { data: { user } } = await supabase.auth.getUser()
         if (!user) return

         const fileExt = file.name.split('.').pop()
         const fileName = `${user.id}/${Date.now()}.${fileExt}` // Simplified path
         const filePath = `${fileName}`

         // Determine bucket based on folder type
         const bucketName = folder === 'avatars' ? 'avatars' : 'profile-files'

         // Upload to Supabase Storage
         const { error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file)

         if (uploadError) throw uploadError

         // Get Public URL
         const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath)
         
         // Update Local State
         profileData.value[columnToUpdate] = publicUrl
         
         $q.notify({ type: 'positive', message: 'Image uploaded successfully!' })
    } catch (error) {
         console.error(error)
         $q.notify({ type: 'warning', message: 'Image upload failed, but you can still save other details. Error: ' + error.message })
    } finally {
        loading.value = false
    }
}

async function uploadAvatar(file) {
    await uploadFile(file, 'avatars', 'avatar_url')
}
async function uploadNicFront(file) {
    await uploadFile(file, 'nic', 'nic_front_url')
}
async function uploadNicBack(file) {
    await uploadFile(file, 'nic', 'nic_back_url')
}

// Password Change
async function changePassword() {
    passwordLoading.value = true
    try {
        const { error } = await supabase.auth.updateUser({ password: passwordForm.value.new })
        if (error) throw error
        $q.notify({ type: 'positive', message: 'Password updated successfully!' })
        passwordForm.value = { new: '', confirm: '' }
    } catch (error) {
        $q.notify({ type: 'negative', message: error.message })
    } finally {
        passwordLoading.value = false
    }
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}
.border-card {
    border: 1px solid #e0e0e0;
}
</style>
