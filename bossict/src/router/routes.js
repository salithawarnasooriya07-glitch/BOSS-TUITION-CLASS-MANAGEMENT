const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
    ],
  },
  
  // Dashboard Routes with Dedicated Layout
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', redirect: '/dashboard/available-lessons' },
      { path: 'profile', component: () => import('pages/dashboard/ProfilePage.vue') },
      { path: 'my-lessons', component: () => import('pages/dashboard/MyLessonsPage.vue') },
      { path: 'available-lessons', component: () => import('pages/dashboard/AvailableLessonsPage.vue') },
      { path: 'payment-methods', component: () => import('pages/dashboard/PaymentMethodsPage.vue') }
    ],
    // Add meta field to require auth if you implement a global guard later
    meta: { requiresAuth: true }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
