import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
/* import { useSets } from '@/composables/sets.comp.js' */
import { STORAGE_KEY } from '@/const/storage.js'

export const useStore = defineStore('storeTeam', () => {
    /* Define the state */
    const team = ref([])

    /* Load from LocalStorage */
    const savedTeam = localStorage.getItem(STORAGE_KEY)
    if (savedTeam) {
        team.value = JSON.parse(savedTeam)
    } else {
        console.log("No hay un equipo guardado en el LocalStorage")
    }

    // Save to LocalStorage whenever it changes the team
    watch(team, (newTeam) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTeam))
    })

    const addToTeam = (pkmn) => {
        team.value.push(pkmn)
    }

    const removeFromTeam = (pkmnSpecies) => {
        team.value = team.value.filter(p => p.species !== pkmnSpecies)
    }

    return { team, addToTeam, removeFromTeam }
})