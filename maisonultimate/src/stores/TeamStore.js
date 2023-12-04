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
        if (team.value.length < 4) {
            team.value.push(pkmn)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(team.value))
        }
    }

    const removeFromTeam = (pkmnSpecies) => {
        let filtering = team.value.filter(p => p.species !== pkmnSpecies)
        team.value = filtering
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtering))
    }

    const findPokemonPosition = (species) => {
        const index = team.value.findIndex(p => p.species === species)
        return index
    }

    const updatePokemon = (pkmn, replacePosition) => {
        const position = findPokemonPosition(pkmn.species)
            
        if (position !== -1) {
            // If the Pokemon already exists in the team, replace it
            team.value.splice(position, 1, pkmn)
        } else if (team.value.length < 4) {
            // If the Pokemon does not exist in the team and the team has less than 4 Pokemon, add it
            team.value.push(pkmn)
        } else {
            // If the Pokemon does not exist in the team and the team is full, replace the Pokemon at the specified position
            team.value.splice(replacePosition, 1, pkmn)
            console.log(`The team is full. Replaced the Pokemon at position ${replacePosition} with ${pkmn.species}.`)
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(team.value))
        return true
    }



    return { team, addToTeam, removeFromTeam, updatePokemon, findPokemonPosition }
})