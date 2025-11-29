<template>
  <div class="w-56 text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="flex w-full items-center justify-center rounded-ful p-1 text-sm font-medium text-white"
        >
          <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="" class="rounded-full w-10">
          <small class="text-gray-600 text-sm pl-1">{{currentUser.name}}</small> 
          <ChevronDownIcon
            class="-mr-1 ml-2 h-5 w-5 text-gray-600 hover:text-black"
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
          class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none "
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-600 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <UserIcon
                  class="mr-2 h-5 w-5 text-violet-400"
                    :class="active ? 'text-gray-100' : 'text-violet-800'"
                    aria-hidden="true"
                />
                Profile
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
              @click="logout"
                :class="[
                  active ? 'bg-violet-600 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <ArrowRightEndOnRectangleIcon
                    class="mr-2 h-5 w-5 text-violet-400"
                    :class="active ? 'text-gray-100' : 'text-violet-800'"
                    aria-hidden="true"
                />
                Logout
              </button>
            </MenuItem>
          </div>
          <!-- <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <ChevronDownIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                />
                Archive
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <ChevronDownIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                />
                Move
              </button>
            </MenuItem>
          </div>

          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <ChevronDownIcon
                  :active="active"
                  class="mr-2 h-5 w-5 text-violet-400"
                  aria-hidden="true"
                />
                Delete
              </button>
            </MenuItem>
          </div> -->
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, UserIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/vue/20/solid'
import store from '../store';
import router from '../router';
import { computed } from 'vue';

const currentUser = computed(()=>store.state.user.data);

function logout(){
  store.dispatch('logout')
    .then(() => {
      router.push({name: 'login'})
    });
}
</script>
