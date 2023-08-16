import { ref } from 'vue'
import items_data from '@/data/items.json'
import Item from '@/data/interfaces/Move.js'

/**
 * Returns a reactive reference to an array of all items.
 *
 * @returns {Ref<Array>} A reactive reference to an array of all items.
 */
export const useItems = () => {
    const items = []

    for (let item_data of Object.values(items_data)) {
        const {
            name, description          
        } = item_data

        const item = new Item(
            name, description
        )
        items.push(item)
    }

    return ref(items)
}