import { describe, it, expect } from 'vitest'
import { findById } from '@/data/composables/sets.comp.js'

import sets_data from '@/data/sets.json'

describe('findById', () => {
    it('returns the set with the given ID', () => {
      const setId = 2
      const expectedSet = sets_data.find((set) => set.id === setId)
      const actualSet = findById(setId)
      expect(actualSet).toEqual(expectedSet)
    })
  
    it('returns null if no set with the given ID exists', () => {
      const setId = 999
      const expectedSet = null
      const actualSet = findById(setId)
      expect(actualSet).toEqual(expectedSet)
    })
  })