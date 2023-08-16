import { describe, it, expect } from 'vitest'

import { useItems } from '@/data/composables/items.comp.js'

describe('items.comp.js', ()=> {

    it('returns a non-empty reactive reference of all items object', () => {
        const items = useItems()
        expect(items.value).toBeInstanceOf(Array)
        expect(items.value.length).toBeGreaterThan(0)
        expect(items.value.length).toBe(312)

        items.value.forEach( item => {
            expect(typeof item).toBe('object')
        })
    })

    it('includes the Salamencite item', () => {
        const items = useItems()
        const salamencite = items.value.find(i => i.name === 'Salamencite')
        expect(salamencite).toBeDefined()
    })
})
