import { describe, it, expect } from 'vitest'
import abilities_data from '@/data/abilities.json'

import { useAbilities, getAbilitiesNames } from '@/data/composables/abilities.comp.js'

describe('abilities.comp.js', () => {

    describe('useAbilities', () => {
        it('returns a non-empty reactive reference of all abilities object', () => {
            const abilities = useAbilities()
            expect(abilities.value).toBeInstanceOf(Array)
            expect(abilities.value.length).toBeGreaterThan(0)
            expect(abilities.value.length).toBe(192)

            abilities.value.forEach( ability => {
                expect(typeof ability).toBe('object')
            })
        })

        it('includes the Intimadate ability', () => {
            const abilities = useAbilities()
            const intimadate = abilities.value.find(ab => ab.name === 'Intimidate')
            expect(intimadate).toBeDefined()
        })
    })

    describe('getAbilitiesNames', () => {
        it('returns a non-empty list of all names of abilities', () => {
            const abilitiesNames = getAbilitiesNames()
            expect(abilitiesNames).toBeInstanceOf(Array)
            expect(abilitiesNames.length).toBeGreaterThan(0)

            abilitiesNames.forEach(name => {
                expect(typeof name).toBe('string')
            })
        })

        it('includes the name "Aerilate"', () => {
            const abilitiesNames = getAbilitiesNames()
            const aerilate = abilitiesNames.find(name => name === 'Aerilate')
            expect(aerilate).toBeDefined()
        })


    })

})