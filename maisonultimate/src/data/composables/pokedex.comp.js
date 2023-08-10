import { ref } from 'vue'
import pokedex_data from '@/data/pokedex.json'
import Pkmn from '@/data/interfaces/Pkmn.js'

export const usePokemon = () => {
    const pkmnList = []

    for (let pkmnData of pokedex_data) {
        /* Destructuring */
        const {
            id, numDex, species, level, abilities, baseStats,
            evs, ivs, weight, type1, type2, moves,
            nature, boosts, item,
            totalStats, sprite
        } = pkmnData

        const pkmn = new Pkmn(
            id, numDex, species, level, abilities, baseStats,
            evs, ivs, weight, type1, type2, moves,
            'Adamant', boosts, 'Salamencite',
            [0,0,0,0,0,0], sprite
        )
        pkmnList.push(pkmn)
    }

    return pkmnList
}