<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-10">
        <h1 class="text-h4 text-weight-bold q-mb-md">Welcome Back!</h1>
        <p class="text-grey-7 q-mb-xl">This is your dashboard overview.</p>
        
        <div class="row q-col-gutter-md">
            <!-- Summary Widgets can go here -->
            <div class="col-12 col-sm-6 col-md-4">
                <q-card class="bg-primary text-white rounded-borders">
                    <q-card-section>
                        <div class="text-h6">My Lessons</div>
                        <div class="text-subtitle2">0 Active</div>
                    </q-card-section>
                </q-card>
            </div>
             <div class="col-12 col-sm-6 col-md-4">
                <q-card class="bg-orange text-white rounded-borders">
                    <q-card-section>
                        <div class="text-h6">Pending Payments</div>
                        <div class="text-subtitle2">None</div>
                    </q-card-section>
                </q-card>
            </div>
             <div class="col-12 col-sm-6 col-md-4">
                <q-card class="bg-teal text-white rounded-borders">
                    <q-card-section>
                        <div class="text-h6">Next Class</div>
                        <div class="text-subtitle2">Check Schedule</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}
</style>
