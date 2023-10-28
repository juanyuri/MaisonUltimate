import { describe, it, expect } from 'vitest'
import { useMoves } from '@/composables/moves.comp.js'

describe('moves.comp.js', ()=> {

    it('returns a non-empty reactive reference of all moves object', () => {
        const moves = useMoves()
        expect(moves.value).toBeInstanceOf(Array)
        expect(moves.value.length).toBeGreaterThan(0)
        expect(moves.value.length).toBe(621)

        moves.value.forEach( move => {
            expect(typeof move).toBe('object')
        })
    })

    it('includes the Water Spout move', () => {
        const moves = useMoves()
        const water_spout = moves.value.find(m => m.name === 'Water Spout')
        expect(water_spout).toBeDefined()
    })
})
