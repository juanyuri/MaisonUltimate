import { describe, it, expect } from 'vitest'
import { stats, calculateStat, natureEffect } from '@/data/composables/stats.comp.js'
import { getModifiedMoveType, getModifiedMovePower } from '@/data/composables/stats.comp.js'
import { getModifiedStatWithItem, getModifiedStatWithAbility } from '@/data/composables/stats.comp.js'
import Pkmn from '@/data/interfaces/Pkmn.js'


describe('stats.comp.js', () => {

    describe('stats', () => {
        it('calculates the stats of a given pokemon', () => {
            const salamence = new Pkmn(
                0,
                '0373',
                'Salamence',
                50,
                ['Intimidate', 'Moxie'],
                {
                    hp: 95,
                    at: 135,
                    df: 80,
                    sa: 110,
                    sd: 80,
                    sp: 100
                },
                [0, 252, 4, 0, 0, 252],
                [31, 31, 31, 31, 31, 31],
                102.6,
                'Dragon',
                'Flying',
                ['Protect', 'Return', 'Earthquake', 'Brick Break'],
                'Adamant',
                [0, 0, 0, 0, 0, 0],
                'Choice Scarf',
                [170, 205, 101, 117, 100, 228],
                'https://cdn.toast-studio.com/typedex/home/_373_regular.png'
            )

            const expectedStats = [170, 205, 101, 117, 100, 228]
            const calculatedStats = stats(salamence)

            expect(calculatedStats).toEqual(expectedStats)
        })

        it('throws an error when no Pokemon object is provided', () => {
            expect(() => {
                stats()
            }).toThrow('Invalid Pokemon object provided')

            expect(() => {
                stats({})
            }).toThrow('Invalid Pokemon object provided')

            expect(() => {
                stats('')
            }).toThrow('Invalid Pokemon object provided')

            expect(() => {
                stats(false)
            }).toThrow('Invalid Pokemon object provided')
        })

        it('not-empty pokemon input parameter', () => {
            const salamence = new Pkmn(
                0,
                '0373',
                'Salamence',
                50,
                ['Intimidate', 'Moxie'],
                {
                    hp: 95,
                    at: 135,
                    df: 80,
                    sa: 110,
                    sd: 80,
                    sp: 100
                },
                [0, 252, 4, 0, 0, 252],
                [31, 31, 31, 31, 31, 31],
                102.6,
                'Dragon',
                'Flying',
                ['Protect', 'Return', 'Earthquake', 'Brick Break'],
                'Adamant',
                [0, 0, 0, 0, 0, 0],
                'Choice Scarf',
                [170, 205, 101, 117, 100, 228],
                'https://cdn.toast-studio.com/typedex/home/_373_regular.png'
            )

            const poke = stats(salamence)
            expect(poke).toBeDefined()
            expect(poke).toBeInstanceOf(Array)
            expect(poke.length).toBe(6)
        })

    })

    describe('calculateStat', () => {
        it('error when invalid Stat Calculation is performed', () => {
            const salamence = new Pkmn(
                0,
                '0373',
                'Salamence',
                50,
                ['Intimidate', 'Moxie'],
                {
                    hp: 95,
                    at: 135,
                    df: 80,
                    sa: 110,
                    sd: 80,
                    sp: 100
                },
                [0, 252, 4, 0, 0, 252],
                [31, 31, 31, 31, 31, 31],
                102.6,
                'Dragon',
                'Flying',
                ['Protect', 'Return', 'Earthquake', 'Brick Break'],
                'Adamant',
                [0, 0, 0, 0, 0, 0],
                'Choice Scarf',
                [170, 205, 101, 117, 100, 228],
                'https://cdn.toast-studio.com/typedex/home/_373_regular.png'
            )

            expect(() => {
                calculateStat(salamence, 0)
            }).not.toThrow()
        })

        it('negative or positive data while calculating pokemon stat', () => {
            const salamence = new Pkmn(
                0,
                '0373',
                'Salamence',
                50,
                ['Intimidate', 'Moxie'],
                { hp: 95, at: 135, df: 80, sa: 110, sd: 80, sp: 100 },
                [0, 252, 4, 0, 0, 252],
                [31, 31, 31, 31, 31, 31],
                102.6,
                'Dragon',
                'Flying',
                ['Protect', 'Return', 'Earthquake', 'Brick Break'],
                'Adamant',
                [0, 0, 0, 0, 0, 0],
                'Choice Scarf',
                [170, 205, 101, 117, 100, 228],
                'https://cdn.toast-studio.com/typedex/home/_373_regular.png'
            )

            /* Negative BaseStats and BaseStats > 255 */
            salamence.baseStats = [-1, -1, -1, -1, -1, -1]
            expect(() => {
                calculateStat(salamence, 1)
            }).toThrow('Invalid negative Input Pokemon Stats')

            salamence.baseStats = [256, 256, 256, 256, 256, 256]
            expect(() => {
                calculateStat(salamence, 1)
            }).toThrow('Invalid positive Input Pokemon Stats')
            salamence.baseStats = [95, 135, 80, 110, 80, 100]


            /* Negative IVS and IVS > 31 */
            salamence.ivs = [-1, -1, -1, -1, -1, -1]
            expect(() => {
                calculateStat(salamence, 1)
            }).toThrow('Invalid negative Input Pokemon Stats')

            salamence.ivs = [32, 47, 222, 1, 122, 1312]
            expect(() => {
                calculateStat(salamence, 1)
            }).toThrow('Invalid positive Input Pokemon Stats')
            salamence.ivs = [31, 31, 31, 31, 31, 31]


            /* Negative EVS and EVS > 255 */
            salamence.evs = [-255, -255, -255, 14, -3, -5]
            expect(() => {
                calculateStat(salamence, 1)
            }).toThrow('Invalid negative Input Pokemon Stats')

            salamence.evs = [256, 666, 222, 111, 122, 1312]
            expect(() => {
                calculateStat(salamence, 1)
            }).toThrow('Invalid positive Input Pokemon Stats')
            salamence.evs = [0, 252, 4, 0, 0, 252]


            /* Negative Level and level > 100 */
            salamence.level = -1
            expect(() => {
                calculateStat(salamence, 0)
            }).toThrow('Invalid negative Input Pokemon Stats')

            salamence.level = 101
            expect(() => {
                calculateStat(salamence, 0)
            }).toThrow('Invalid positive Input Pokemon Stats')
            salamence.level = 50
        })

    })

    describe('natureEffect', () => {
        it('returns the effect of a Pokemon nature on a specific stat', () => {
            expect(natureEffect('Lonely', 1)).toEqual(1.1)
            expect(natureEffect('Adamant', 1)).toEqual(1.1)
            expect(natureEffect('Naughty', 1)).toEqual(1.1)
            expect(natureEffect('Brave', 1)).toEqual(1.1)

            expect(natureEffect('Bold', 1)).toEqual(0.9)
            expect(natureEffect('Modest', 1)).toEqual(0.9)
            expect(natureEffect('Calm', 1)).toEqual(0.9)
            expect(natureEffect('Timid', 1)).toEqual(0.9)

            expect(natureEffect('Bold', 2)).toEqual(1.1)
            expect(natureEffect('Impish', 2)).toEqual(1.1)
            expect(natureEffect('Lax', 2)).toEqual(1.1)
            expect(natureEffect('Relaxed', 2)).toEqual(1.1)

            expect(natureEffect('Lonely', 2)).toEqual(0.9)
            expect(natureEffect('Mild', 2)).toEqual(0.9)
            expect(natureEffect('Gentle', 2)).toEqual(0.9)
            expect(natureEffect('Hasty', 2)).toEqual(0.9)

            expect(natureEffect('Modest', 3)).toEqual(1.1)
            expect(natureEffect('Mild', 3)).toEqual(1.1)
            expect(natureEffect('Quiet', 3)).toEqual(1.1)
            expect(natureEffect('Rash', 3)).toEqual(1.1)

            expect(natureEffect('Adamant', 3)).toEqual(0.9)
            expect(natureEffect('Impish', 3)).toEqual(0.9)
            expect(natureEffect('Careful', 3)).toEqual(0.9)
            expect(natureEffect('Jolly', 3)).toEqual(0.9)

            expect(natureEffect('Calm', 4)).toEqual(1.1)
            expect(natureEffect('Gentle', 4)).toEqual(1.1)
            expect(natureEffect('Careful', 4)).toEqual(1.1)
            expect(natureEffect('Sassy', 4)).toEqual(1.1)

            expect(natureEffect('Naughty', 4)).toEqual(0.9)
            expect(natureEffect('Lax', 4)).toEqual(0.9)
            expect(natureEffect('Rash', 4)).toEqual(0.9)
            expect(natureEffect('Naive', 4)).toEqual(0.9)

            expect(natureEffect('Timid', 5)).toEqual(1.1)
            expect(natureEffect('Hasty', 5)).toEqual(1.1)
            expect(natureEffect('Jolly', 5)).toEqual(1.1)
            expect(natureEffect('Naive', 5)).toEqual(1.1)

            expect(natureEffect('Brave', 5)).toEqual(0.9)
            expect(natureEffect('Relaxed', 5)).toEqual(0.9)
            expect(natureEffect('Quiet', 5)).toEqual(0.9)
            expect(natureEffect('Sassy', 5)).toEqual(0.9)
        })


        it('throws an error when input is non-truthy', () => {
            expect(() => {
                natureEffect(null, 1)
            }).toThrow('Invalid Input in Nature Effect Calculation')

            expect(() => {
                natureEffect(undefined, 1)
            }).toThrow('Invalid Input in Nature Effect Calculation')

            expect(() => {
                natureEffect('', 1)
            }).toThrow('Invalid Input in Nature Effect Calculation')

            expect(() => {
                natureEffect('Lonely', null)
            }).toThrow('Invalid Input in Nature Effect Calculation')

            expect(() => {
                natureEffect('Lonely', undefined)
            }).toThrow('Invalid Input in Nature Effect Calculation')

            expect(() => {
                natureEffect('Lonely', '')
            }).toThrow('Invalid Input in Nature Effect Calculation')
        })

    })

    describe('getModifiedMoveType', () => {
        it('throws an error when the input is invalid', () => {
            expect(() => {
                getModifiedMoveType(null, 'Normal')
            }).toThrow('Invalid Ability or Move at changing move based on ability')

            expect(() => {
                getModifiedMoveType('Aerilate', undefined)
            }).toThrow('Invalid Ability or Move at changing move based on ability')

            expect(() => {
                getModifiedMoveType('', 'Normal')
            }).toThrow('Invalid Ability or Move at changing move based on ability')

            expect(() => {
                getModifiedMoveType('Aerilate', '')
            }).toThrow('Invalid Ability or Move at changing move based on ability')
        })

        it('comprobations with exact Pokemon Data', () => {
            const expectedType = 'Flying'
            const calculatedType = getModifiedMoveType('Aerilate', 'Normal')
            expect(calculatedType).toBe(expectedType)
        })
    })


    describe('getModifiedMovePower', () => {
        it('throws an error when the input is invalid', () => {
            expect(() => {
                getModifiedMovePower(null, 100, 'Normal')
            }).toThrow('Invalid inputs at changing bp based on ability')

            expect(() => {
                getModifiedMovePower('Aerilate', undefined, 'Normal')
            }).toThrow('Invalid inputs at changing bp based on ability')

            expect(() => {
                getModifiedMovePower('Aerilate', 100, undefined)
            }).toThrow('Invalid inputs at changing bp based on ability')

            expect(() => {
                getModifiedMovePower('', 100, 'Normal')
            }).toThrow('Invalid inputs at changing bp based on ability')

            expect(() => {
                getModifiedMovePower('Aerilate', '', 'Normal')
            }).toThrow('Invalid inputs at changing bp based on ability')

            expect(() => {
                getModifiedMovePower('Aerilate', 100, '')
            }).toThrow('Invalid inputs at changing bp based on ability')
        })

        it('comprobations with exact Pokemon Data', () => {
            const expectedBp = 132
            const calculatedBp = getModifiedMovePower('Aerilate', 102, 'Normal')
            expect(calculatedBp).toBe(expectedBp)
        })
    })


    describe('getModifiedStatWithItem', () => {
        it('throws an error when the input is invalid', () => {
            expect(() => {
                getModifiedStatWithItem(null, 100, 'Assault Vest')
            }).toThrow('Invalid Stat Value or Item at changing Stat based on item')

            expect(() => {
                getModifiedStatWithItem(1, undefined, 'Assault Vest')
            }).toThrow('Invalid Stat Value or Item at changing Stat based on item')

            expect(() => {
                getModifiedStatWithItem(1, 100, undefined)
            }).toThrow('Invalid Stat Value or Item at changing Stat based on item')

            expect(() => {
                getModifiedStatWithItem('', 100, 'Assault Vest')
            }).toThrow('Invalid Stat Value or Item at changing Stat based on item')

            expect(() => {
                getModifiedStatWithItem(1, '', 'Assault Vest')
            }).toThrow('Invalid Stat Value or Item at changing Stat based on item')

            expect(() => {
                getModifiedStatWithItem(1, 100, '')
            }).toThrow('Invalid Stat Value or Item at changing Stat based on item')
        })

        it('comprobations with exact Pokemon Data', () => {
            const expected = 300
            const calculated = getModifiedStatWithItem(5, 200, 'Choice Scarf')
            expect(calculated).toBe(expected)
        })
    })


    describe('getModifiedStatWithAbility', () => {
        it('throws an error when the input is invalid', () => {
            expect(() => {
                getModifiedStatWithAbility(null, 1, 100)
            }).toThrow('Invalid Stat Value or Item at changing Stat based on ability')

            expect(() => {
                getModifiedStatWithAbility('Huge Power', undefined, 100)
            }).toThrow('Invalid Stat Value or Item at changing Stat based on ability')

            expect(() => {
                getModifiedStatWithAbility('Huge Power', 1, undefined)
            }).toThrow('Invalid Stat Value or Item at changing Stat based on ability')

            expect(() => {
                getModifiedStatWithAbility('', 1, 100)
            }).toThrow('Invalid Stat Value or Item at changing Stat based on ability')

            expect(() => {
                getModifiedStatWithAbility('Huge Power', '', 100)
            }).toThrow('Invalid Stat Value or Item at changing Stat based on ability')

            expect(() => {
                getModifiedStatWithAbility('Huge Power', 1, '')
            }).toThrow('Invalid Stat Value or Item at changing Stat based on ability')
        })

        it('comprobations with exact Pokemon Data', () => {
            const expected = 110
            const calculated = getModifiedStatWithAbility('Huge Power', 1, 55)
            expect(calculated).toBe(expected)
        })
        
    })
})