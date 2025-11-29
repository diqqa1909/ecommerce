<template>
  <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
    <div class="flex justify-between border-b-2 pb-3">
      <div class="flex items-center">
        <span class="whitespace-nowrap mr-3">Per Page</span>
        <select @change="getProducts()" v-model="perPage" class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div>
        <input v-model="search" @input="getProducts()" class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="text" placeholder="Type to search products"/>
      </div>
    </div>
      <table class="table-auto w-full">
        <thead>
          <tr>
            <TableHeaderCell @click="sortProduct" class="border-b-2 p-2 text-left" field="id" :sort-field="sortField" :sort-direction="sortDirection">ID</TableHeaderCell>
            <TableHeaderCell class="border-b-2 p-2 text-left" field="" :sort-field="sortField" :sort-direction="sortDirection">Image</TableHeaderCell>
            <TableHeaderCell @click="sortProduct" class="border-b-2 p-2 text-left" field="title" :sort-field="sortField" :sort-direction="sortDirection">Title</TableHeaderCell>
            <TableHeaderCell @click="sortProduct" class="border-b-2 p-2 text-left" field="price" :sort-field="sortField" :sort-direction="sortDirection">Price</TableHeaderCell>
            <TableHeaderCell @click="sortProduct" class="border-b-2 p-2 text-left" field="updated_at" :sort-field="sortField" :sort-direction="sortDirection">Last Updated At</TableHeaderCell>
            <TableHeaderCell field="actions">Actions</TableHeaderCell>
          </tr>
        </thead>
        <tbody v-if="products.loading">
          <tr>
            <td colspan="6">
              <Spinner class="my-4" v-if="products.loading"/>

            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(product, index) of products.data" :key="product.id">
            <td class="border-b p-2">{{product.id}}</td>
            <td class="border-b p-2">
              <img :src="product.image_url" :alt="product.title" class="w-16">
            </td>
            <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{{ product.title }}</td>
            <td class="border-b p-2">${{ product.price }}</td>
            <td class="border-b p-2">{{ product.updated_at }}</td>
            <td class="border-b p-2">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                    class="inline-flex items-center w-full justify-center rounded-full w-10 h-10 bg-black bg-opacity-0"
                  >
                    <EllipsisVerticalIcon
                      class="h-5 w-5 text-indigo-700"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                <MenuItems
                class="absolute z-10 right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg "
                >
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{active}">
                      <button
                        :class="[
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]"
                        @click="editProduct(product)"
                      >
                        <PencilIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-indigo-400"
                          aria-hidden="true"
                        />
                        Edit
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{active}">
                      <button
                        :class="[
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]"
                        @click="deleteProduct(product)"
                      >
                        <TrashIcon
                          :active="active"
                          class="mr-2 h-5 w-5 text-indigo-400"
                          aria-hidden="true"
                        />
                        Delete
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
              </Menu>
            </td>
          </tr>
        </tbody>
      </table>
      
      
      <div v-if="!products.loading" class="flex justify-between items-center mt-5">
        <span v-if="products.total > 0">
          Showing from {{ products.from }} to {{ products.to }} of {{ products.total }} entries
        </span>
        <span v-else>
          No entries found
        </span>
        
        <!-- Fixed Pagination -->
        <nav
          v-if="products.total > products.limit && products.links && products.links.length > 1"
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a 
            v-for="(link, i) in products.links"
            :key="i"
            :disabled="!link.url"
            href="#"
            @click.prevent="getForPage($event,link)"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md' : '',
              i === products.links.length - 1 ? 'rounded-r-md' : '',
              !link.url ? 'bg-gray-100 text-gray-700 opacity-50 cursor-not-allowed' : 'cursor-pointer'
            ]"
            v-html="link.label"
          >
          </a>
        </nav>
      </div>
  </div>
</template>

<script setup>
// If you need the component name for debugging, use defineOptions
import { defineOptions } from 'vue';
import { PRODUCTS_PER_PAGE } from '../../constants';
import TableHeaderCell from '../../components/Table/TableHeaderCell.vue';
defineOptions({
  name: 'Products'
});
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Spinner from '../../components/core/Spinner.vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  EllipsisVerticalIcon, 
  TrashIcon,
} from '@heroicons/vue/16/solid'


const emit = defineEmits(['clickEdit']);
const store = useStore();
const perPage = ref(PRODUCTS_PER_PAGE);
const search = ref('');
const sortField = ref('updated_at');
const sortDirection = ref('desc');
const debug = ref(false); // Set to false to hide debug info

// Use computed for reactive store state
const products = computed(() => store.state.products || {
  data: [],
  links: [],
  total: 0,
  limit: 0,
  from: 0,
  to: 0,
  page: 1,
  loading: false
});

onMounted(() => {
  getProducts();
});

function getProducts(url = null) {
  const payload = url ? { url } : { perPage: perPage.value, search: search.value };
  store.dispatch('getProducts', {
    url,
    sort_field: sortField.value,
    sort_direction: sortDirection.value,
    search: search.value,
    perPage: perPage.value
  });
}

function getForPage(ev, link) {
  if (!link.url || link.active) {
    return
  }
  getProducts(link.url);
}

function sortProduct(field) {
  if (sortField.value === field) {
    if(sortDirection.value === 'asc') {
      sortDirection.value = 'desc'
    }else{
      sortDirection.value = 'asc'
    }
  }else{
    sortField.value = field;
    sortDirection.value = 'asc'
  }
  
  getProducts();
}

function editProduct(product){
  emit('clickEdit', product)
}

function deleteProduct(product){
  if (!confirm(`Are you sure you want to delete the product?`)) {
    return
  }
  store.dispatch('deleteProduct', product.id)
    .then(res=>{
      getProducts()
    })
}
</script>