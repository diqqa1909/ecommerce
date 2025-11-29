<template>
    <header class="h-16 shadow bg-white flex items-center justify-between px-4">
        <button @click="emit('toggle-sidebar')" class="flex items-center">
            <Bars3Icon class="w-6 h-6 text-gray-600 hover:text-black transition-colors"/>
        </button>
        <div class="flex items-center">
            <UserAvatar/>
        </div>
    </header>
</template>

<script setup>
    import {Bars3Icon} from '@heroicons/vue/24/solid';
    import UserAvatar from './UserAvatar.vue';

    const emit = defineEmits(['toggle-sidebar']);
</script>

<style scoped>

</style>