<template>
    <div class="Sets">
        <ul class="Sets-Container">
            <li :class="set.setName" v-for="set in sets" :key="set">{{ set }}</li>
        </ul>
    </div>
</template>

<script setup>
import { useSets } from '@/data/composables/sets.comp.js';
const sets = useSets()


</script>