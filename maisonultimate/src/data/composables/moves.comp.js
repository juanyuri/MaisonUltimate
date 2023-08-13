import { ref } from 'vue'
import moves_data from '@/data/moves.json'
import Move from '@/data/interfaces/Move.js'

/**
 * Returns a reactive reference to an array of all moves.
 *
 * @returns {Ref<Array>} A reactive reference to an array of all moves.
 */
export const useMoves = () => {
    const moves = []

    for (let move of Object.values(moves_data)) {
        const {
            bp, category, description, name, pp, type            
        } = move

        const mv = new Move(name, type, category, bp, pp, description, '')
        moves.push(mv)
    }

    return ref(moves)
}