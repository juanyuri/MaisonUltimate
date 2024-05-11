import { ref } from 'vue'
import sets_data from '@/data/sets.json'
import PkmnSet from '@/interfaces/PkmnSet.js'
import { useGroups } from '@/composables/groups.comp.js'

export const findById = (setId) => {
    let pkmn = sets_data.find((set) => set.id === setId)
    if (pkmn) return pkmn
    else return null
}

export const findBySetName = (set_name) => {
    let pkmn = sets_data.find(set => set.set_name === set_name)
    if (pkmn) return pkmn
    else return null
}

export const useSets = () => {
    const sets = []

    for (let setData of sets_data) {
        /* Destructuring */
        const {
            id, numDex, species, level, abilities, baseStats,
            evs, ivs, weight, type1, type2, imageUrl, moves,
            nature, setNumber, boosts, item, setName, trainersPool,
            totalStats
        } = setData

        /* Creating Objects of PokemonSets */
        const pkmn_set = new PkmnSet(
            id, numDex, species, level, abilities, baseStats,
            evs, ivs, weight, type1, type2, imageUrl, moves,
            nature, setNumber, boosts, item, setName, trainersPool,
            totalStats
        )
        sets.push(pkmn_set)
    }

    return ref(sets)
}

/* Find all sets based on a group name */
export const findSets = (groupName) => {
    const groups = useGroups()
    console.log(groupName)
    

    const setsNames = groups.value.filter( g => g.name === groupName)[0]['pkmnSets']

    const filtered = sets_data.filter(s => setsNames.includes(s.setName))
    return filtered
}