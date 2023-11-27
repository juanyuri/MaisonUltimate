import { ref } from 'vue'
import pokedex_data from '@/data/pokedex.json'
import Pkmn from '@/interfaces/Pkmn.js'

export const usePokemon = () => {
    const pkmnList = []

    for (let pkmnData of pokedex_data) {
        /* Destructuring */
        const {
            id, numDex, species, level, abilities, baseStats,
            evs, ivs, weight, type1, type2, moves,
            nature, item, sprite_icon, sprite_image
        } = pkmnData

        const pkmn = new Pkmn(
            id, numDex, species, level, abilities, baseStats,
            evs, ivs, weight, type1, type2, moves,
            nature, item, sprite_icon, sprite_image
        )
        pkmnList.push(pkmn)
    }

    return pkmnList
}