import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
/* import { useSets } from '@/composables/sets.comp.js' */

export const useStore = defineStore('storeTeam', () => {
    /* Define the state */
    const team = ref([])

    /* Persistance key */
    const STORAGE_KEY = 'pokemon_team'


    /* Load from LocalStorage */
    const savedTeam = localStorage.getItem(STORAGE_KEY)
    if(savedTeam){
        team.value = JSON.parse(savedTeam)
    }else{
        console.log("No hay un equipo guardado en el LocalStorage")
    }

    // Save the team to LocalStorage whenever it changes
    watch(team, (newTeam) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTeam))
    })

    return {team}
})