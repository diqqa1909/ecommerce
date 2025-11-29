<template>
    <div v-if="currentUser.id" class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <Sidebar :class="{'-ml-[225px]': !sidebarOpened}"/>
    <div class="flex-1 flex flex-col">
        <Navbar @toggle-sidebar="toggleSidebar"/>
        <main class="p-6">
            <div class="p-4 rounded bg-white">
                <router-view></router-view>
            </div>
        </main>
    </div>
</div>
<div v-else class="min-h-screen bg-gray-200 flex items-center justify-center">
    <Spinner/>
    </div>
              
</template>

<script setup>
import {computed, onMounted, onUnmounted} from 'vue';
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
import store from '../store';
import Spinner from './core/Spinner.vue';

    const {title} = defineProps({
        title: String
    });

const sidebarOpened = ref(true);

const currentUser = computed(()=>store.state.user.data);

function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value;
}

onMounted(()=>{
    store.dispatch('getUser');
    handleSideBarOpened();
    window.addEventListener('resize', handleSideBarOpened);
})

onUnmounted(()=>{
    window.removeEventListener('resize', handleSideBarOpened);
})

function handleSideBarOpened(){
    sidebarOpened.value = window.outerWidth>768;
}
</script>

<style scoped>

</style>