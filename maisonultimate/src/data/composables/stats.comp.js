import { ref, computed } from "vue"

/**
 * Calculates and returns the stats of a given Pokemon.
 *
 * @param {Object} pkmn - The Pokemon object to calculate the stats for.
 * @returns {Array<number>} An array of the calculated stats.
 */
export const stats = (pkmn) => {

    /* Non-truthy variable: false, null, undefined, empty string, etc. */
    if (!pkmn || Object.keys(pkmn).length === 0)
        throw new Error('Invalid Pokemon object provided')


    let stats = []
    for (let i = 0; i < 6; i++) {
        stats.push(calculateStat(pkmn, i))
    }

    return stats
}

/**
 * Calculates a specific stat for a given Pokemon based on its base stats, IVs, EVs, level, nature, item, and ability.
 *
 * @param {Object} pokemon - The Pokemon object to calculate the stat for.
 * @param {number} statIndex - The index of the stat to calculate.
 * @returns {number} The calculated value of the stat.
 */
export const calculateStat = (pokemon, statIndex) => {
    const base = ~~Number(pokemon.baseStats[statIndex])
    const ivs = ~~Number(pokemon.ivs[statIndex])
    const evs = ~~Number(pokemon.evs[statIndex])
    const level = pokemon.level


    if (base < 0 || ivs < 0 || evs < 0 || level < 0)
        throw new Error('Invalid negative Input Pokemon Stats')

    if (base > 255 || ivs > 31 || evs > 252 || level > 100)
        throw new Error('Invalid positive Input Pokemon Stats')


    /* Calculations are different for HP */
    let statValue = 0
    if (statIndex === 0) {
        statValue = ~~((2 * base + ivs + ~~(evs / 4)) * level / 100) + level + 10
    } else { /* for other stats */
        const nature = natureEffect(pokemon.nature, statIndex)
        if (nature < 0.9 || nature > 1.1)
            throw new Error('Invalid NatureEffect Calculation')

        statValue = ~~(
            (((2 * base + ivs + ~~(evs / 4)) * level) / 100 + 5) * nature
        )
    }

    const newStatValue = getModifiedStatWithItem(statIndex, statValue, pokemon.item)
    /* const modifiedValue = getModifiedStatWithAbility(pokemon.chosenAbility, statIndex, newStatValue) */
    const modifiedValue = getModifiedStatWithAbility(pokemon.abilities[0], statIndex, newStatValue)

    return modifiedValue
}



/**
 * Returns a new move type based on the Pokemon's ability.
 *
 * @param {string} ability - The name of the Pokemon's ability.
 * @param {string} moveType - The original type of the move.
 * @returns {string} The new type of the move.
 */
export const getModifiedMoveType = (abilityName, moveType) => {

    if (!abilityName || !moveType)
        throw new Error('Invalid Ability or Move at changing move based on ability')

    if (abilityName == 'Aerilate' && moveType == 'Normal') return 'Flying'
    if (abilityName == 'Pixilate' && moveType == 'Normal') return 'Fairy'
    if (abilityName == 'Refrigerate' && moveType == 'Normal') return 'Ice'
    if (abilityName == 'Normalize') return 'Normal'

    return moveType
}



/**
 * Returns a new move power based on the Pokemon's ability.
 *
 * @param {string} abilityName - The name of the Pokemon's ability.
 * @param {number} bp - The base power of the move.
 * @param {string} moveType - The type of the move.
 * @returns {number} The new power of the move.
 */
export const getModifiedMovePower = (abilityName, bp, moveType) => {
    if (!abilityName || !bp || !moveType)
        throw new Error('Invalid inputs at changing bp based on ability')

    if (abilityName == 'Aerilate' && moveType == 'Normal') return ~~(bp *= 1.3)
    if (abilityName == 'Pixilate' && moveType == 'Normal') return ~~(bp *= 1.3)
    if (abilityName == 'Refrigerate' && moveType == 'Normal') return ~~(bp *= 1.3)

    return bp
}



/**
 * Modifies a stat value based on the Pokemon's held item.
 *
 * @param {number} statIndex - The index of the stat to modify.
 * @param {number} statValue - The current value of the stat.
 * @param {string} itemName - The name of the Pokemon's held item.
 * @returns {number} The modified value of the stat.
 */
export const getModifiedStatWithItem = (statIndex, statValue, itemName) => {

    if (statIndex === false || statIndex === undefined || statIndex === '' ||
        statIndex === NaN || statIndex === null)
        throw new Error('Invalid Stat Value or Item at changing Stat based on item')

    if (statValue === false || statValue === undefined || statValue === '' ||
        statValue === NaN || statValue === null)
        throw new Error('Invalid Stat Value or Item at changing Stat based on item')

    if (itemName === false || itemName === undefined || itemName === '' ||
        itemName === NaN || itemName === null)
        throw new Error('Invalid Stat Value or Item at changing Stat based on item')
    

    /* Special Defense changes */
    if (itemName == 'Assault Vest' && statIndex == 4) return ~~(statValue * 1.5)

    /* Speed changes */
    if (itemName == 'Choice Scarf' && statIndex == 5) return ~~(statValue * 1.5)
    if (itemName == 'Iron Ball' && statIndex == 5) return ~~(statValue * 0.5)

    return statValue
}



/**
 * Modifies a stat value based on the Pokemon's ability.
 *
 * @param {number} stat_index - The index of the stat to modify.
 * @param {number} value - The current value of the stat.
 * @param {string} ability_name - The name of the Pokemon's ability.
 * @returns {number} The modified value of the stat.
 */
export const getModifiedStatWithAbility = (abilityName, statIndex, statValue) => {
    
    if (statIndex === false || statIndex === undefined || statIndex === '' ||
        statIndex === NaN || statIndex === null)
        throw new Error('Invalid Stat Value or Item at changing Stat based on ability')

    if (statValue === false || statValue === undefined || statValue === '' ||
        statValue === NaN || statValue === null)
        throw new Error('Invalid Stat Value or Item at changing Stat based on ability')

    if (abilityName === false || abilityName === undefined || abilityName === '' ||
        abilityName === NaN || abilityName === null)
        throw new Error('Invalid Stat Value or Item at changing Stat based on ability')

        
    if (abilityName == 'Huge Power' && statIndex == 1) return ~~(statValue * 2)
    if (abilityName == 'Slow Start' && (statIndex == 1 || statIndex == 5)) return ~~(statValue *= 0.5)

    return statValue
}


/**
 * Calculates the effect of a Pokemon's nature on a specific stat.
 *
 * @param {string} nature - The Pokemon's nature.
 * @param {string} statName - The name of the stat to calculate.
 * @returns {number} The effect of the Pokemon's nature on the stat.
 */
export const natureEffect = (nature, statName) => {

    if (!nature || !statName) {
        throw new Error('Invalid Input in Nature Effect Calculation')
    }

    let resultado = 1.0

    if (statName == 1) {
        if (nature == 'Lonely' || nature == 'Adamant' ||
            nature == 'Naughty' || nature == 'Brave') {
            resultado = 1.1
        }

        if (nature == 'Bold' || nature == 'Modest' ||
            nature == 'Calm' || nature == 'Timid') {
            resultado = 0.9
        }
    }

    if (statName == 2) {
        if (nature == 'Bold' || nature == 'Impish' ||
            nature == 'Lax' || nature == 'Relaxed') {
            resultado = 1.1
        }

        if (nature == 'Lonely' || nature == 'Mild' ||
            nature == 'Gentle' || nature == 'Hasty') {
            resultado = 0.9
        }
    }

    if (statName == 3) {
        if (nature == 'Modest' || nature == 'Mild' ||
            nature == 'Quiet' || nature == 'Rash') {
            resultado = 1.1
        }

        if (nature == 'Adamant' || nature == 'Impish' ||
            nature == 'Careful' || nature == 'Jolly') {
            resultado = 0.9
        }
    }

    if (statName == 4) {
        if (nature == 'Calm' || nature == 'Gentle' ||
            nature == 'Careful' || nature == 'Sassy') {
            resultado = 1.1
        }

        if (nature == 'Naughty' || nature == 'Lax' ||
            nature == 'Rash' || nature == 'Naive') {
            resultado = 0.9
        }
    }

    if (statName == 5) {
        if (nature == 'Timid' || nature == 'Hasty' ||
            nature == 'Jolly' || nature == 'Naive') {
            resultado = 1.1
        }

        if (nature == 'Brave' || nature == 'Relaxed' ||
            nature == 'Quiet' || nature == 'Sassy') {
            resultado = 0.9
        }
    }

    return resultado
}