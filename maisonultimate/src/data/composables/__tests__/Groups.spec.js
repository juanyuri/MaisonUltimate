import { describe, it, expect } from 'vitest'
import { useGroups, getGroupsNames } from '@/data/composables/groups.comp.js'

describe('groups.comp.js', () => {

    describe('useGroups', () => {
        it('returns a non-empty reactive reference of all groups object', () => {
            const groups = useGroups()
            expect(groups.value).toBeInstanceOf(Array)
            expect(groups.value.length).toBeGreaterThan(0)

            groups.value.forEach(group => {
                expect(typeof group).toBe('object')
            })
        })

        it('includes the Dark_Poison_1 group', () => {
            const groups = useGroups()
            const group_name = groups.value.find(g => g.name === 'Dark_Poison_1')
            expect(group_name).toBeDefined()
        })
    })

    describe('getGroupsNames', () => {
        it('returns a non-empty list of all names of groups', () => {
            const groupNames = getGroupsNames()
            expect(groupNames).toBeInstanceOf(Array)
            expect(groupNames.length).toBeGreaterThan(0)

            groupNames.forEach(name => {
                expect(typeof name).toBe('string')
            })
        })

        it('includes the group Ruby1', () => {
            const groupNames = getGroupsNames()
            const gr_name = groupNames.find(name => name === 'Ruby1')
            expect(gr_name).toBeDefined()
        })
    })

})