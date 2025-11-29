<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden p-1 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
              <header class="py-3 px-4 flex justify-between items-center">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                  {{ product.id ? `Update product: "${props.product.title}"` : 'Create new Product' }}
                </DialogTitle>
                <button @click="closeModal()"
                  class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </header>
              <div v-if="loading" class="flex items-center justify-center min-h-[200px]">
                <Spinner class="bg-white" />
              </div>
              <div v-else>
                <form @submit.prevent="onSubmit">
                  <div class="bg-white px-4 pt-5 pb-4">
  <CustomInput class="mb-2" v-model="product.title" label="Product Title" />
  
  <!-- Use v-model instead of @change -->
  <CustomInput 
    type="file" 
    class="mb-2" 
    v-model="product.image"
    label="Product Image" 
  />
  
  <CustomInput type="textarea" class="mb-2" v-model="product.description" label="Description" />
  <CustomInput type="number" class="mb-2" v-model="product.price" label="Price" prepend="$" />
</div>
                  <footer class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="submit"
                      class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Submit
                    </button>
                    <button type="button"
                      class="py-2 px-4 me-3 inline-flex justify-center rounded-md border border-gray-300 text-sm font-medium rounded-md text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      @click="closeModal">
                      Cancel
                    </button>
                  </footer>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { computed, onUpdated, ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import Spinner from '../../components/core/Spinner.vue'
import store from '../../store/index.js'
import CustomInput from '../../components/core/CustomInput.vue'

const loading = ref(false)

const props = defineProps({
  modelValue: Boolean,
  product: {
    required: true,
    type: Object,
  }
})

const product = ref({
  id: props.product.id,
  title: props.product.title,
  image: props.product.image,
  description: props.product.description,
  price: props.product.price,
})

const emit = defineEmits(['update:modelValue', 'close'])

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

onUpdated(() => {
  product.value = {
    id: props.product.id,
    title: props.product.title,
    image: props.product.image,
    description: props.product.description,
    price: props.product.price,
  }
})

function closeModal() {
  show.value = false
  emit('close')
}
function openModal() {
  isOpen.value = true
}

function onSubmit() {
  loading.value = true
  if (product.value.id) {
    store.dispatch('updateProduct', product.value)
      .then(response => {
        loading.value = false;
        if (response.status === 200) {
          store.dispatch('getProducts')
          closeModal()
        }
      })
  } else {
    store.dispatch('createProduct', product.value)
      .then(response => {
        loading.value = false;
        if (response.status === 201) {
          store.dispatch('getProducts')
          closeModal()
        }
      })
  }
}
</script>

<style></style>
