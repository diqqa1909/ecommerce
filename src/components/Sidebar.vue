<template>
    <div class="w-[225px] transition-all bg-indigo-700 text-gray-300 px-2 py-2">
        <router-link :to="{name: 'app.dashboard'}" class="flex items-center hover:bg-black/20 transition-colors rounded-md px-3 py-2 ">
            <span class="mr-3"><HomeIcon class="w-5"/></span>
            <span class="text-sm font-normal">
                Dashboard
            </span>
        </router-link>
        <router-link :to="{name: 'app.products'}" class="flex items-center hover:bg-black/20 transition-colors rounded-md px-3 py-2 ">
            <span class="mr-3"><ClipboardDocumentListIcon class="w-5"/></span>
            <span class="text-sm font-normal">
                Products
            </span>
        </router-link>
        <router-link :to="{name: 'app.dashboard'}" class="flex items-center hover:bg-black/20 transition-colors rounded-md px-3 py-2 ">
            <span class="mr-3"><UserIcon class="w-5"/></span>
            <span class="text-sm font-normal">
                Users
            </span>
        </router-link>
        <router-link :to="{name: 'app.dashboard'}" class="flex items-center hover:bg-black/20 transition-colors rounded-md px-3 py-2 ">
            <span class="mr-3"><ChartBarIcon class="w-5"/></span>
            <span class="text-sm font-normal">
                Reports
            </span>
        </router-link>
    </div>
</template>

<script setup>
    import {HomeIcon, UserIcon, ClipboardDocumentListIcon, ChartBarIcon} from '@heroicons/vue/24/solid';
</script>

<style scoped>

</style>