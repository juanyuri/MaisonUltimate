import { ref } from 'vue'
import abilities_data from '@/data/abilities.json'

/**
 * Returns a reactive reference to an array of all abilities.
 *
 * @returns {Ref<Array>} A reactive reference to an array of all abilities.
 */
export const useAbilities = () => {
  const abilities = []

  for (let ability of Object.values(abilities_data)) {
    abilities.push(ability)
  }

  return ref(abilities)
}

/**
 * Returns an array of the names of all abilities.
 *
 * @returns {Array<string>} An array of the names of all abilities.
 */
export const getAbilitiesNames = () => {
  const abilities = []

  for (let ability of Object.values(abilities_data)) {
    abilities.push(ability.name)
  }

  return abilities
}