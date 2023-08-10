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

    const addToTeam = (pkmn) => {
        if(team.value.length < 4){
            team.value.push(pkmn)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(team.value))
        }
    }

    const removeFromTeam = (pkmnSpecies) => {
       let filtering = team.value.filter(p => p.species !== pkmnSpecies)
       team.value = filtering
       localStorage.setItem(STORAGE_KEY, JSON.stringify(filtering))
    }

    const updatePokemon = (pkmn) => {
        const index = team.value.findIndex((p) => p.species === pkmn.species)

        /* If the index is not -1, use splice function to replace the Pokemon object at the index with the new pkmn */
        if (index !== -1) {
          team.value.splice(index, 1, pkmn)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(team.value))
        }
      }

    return { team, addToTeam, removeFromTeam, updatePokemon }
})