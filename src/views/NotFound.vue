<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full space-y-8 text-center">
      <!-- 404 Number -->
      <div>
        <h1 class="text-9xl font-bold text-violet-800">404</h1>
      </div>
      
      <!-- Message -->
      <div class="space-y-4">
        <h2 class="text-3xl font-semibold text-violet-700">Page not found</h2>
        <p class="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
          Please check the URL in the address bar and try again.
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <router-link
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-violet-700 hover:bg-violet-800 transition duration-200 ease-in-out"
        >
          Go back home
        </router-link>
        
        <button
          @click="contactSupport"
          class="inline-flex items-center justify-center px-6 py-3 border border-violet-300 text-base font-medium rounded-md text-violet-700 bg-white hover:bg-violet-50 transition duration-200 ease-in-out"
        >
          Contact support
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const contactSupport = () => {
  // You can implement your support contact logic here
  // For example:
  // - Open a support email
  // - Redirect to contact page
  // - Show a support modal
  window.location.href = 'mailto:support@yourapp.com?subject=404%20Page%20Support'
}
</script>

<style scoped>
/* Optional: Add some custom animations */
h1 {
  background: linear-gradient(135deg, #1a202c 0%, #4a5568 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>