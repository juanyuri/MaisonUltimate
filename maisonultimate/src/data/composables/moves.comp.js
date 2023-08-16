import { ref } from 'vue'
import moves_data from '@/data/movedex.json'
import Move from '@/data/interfaces/Move.js'

/**
 * Returns a reactive reference to an array of all moves.
 *
 * @returns {Ref<Array>} A reactive reference to an array of all moves.
 */
export const useMoves = () => {
    const moves = []

    for (let move_data of Object.values(moves_data)) {
        const {
            name, type, category, bp, pp, accuracy, priority, description          
        } = move_data

        const move = new Move(
            name, type, category, bp, pp, accuracy, priority, description
        )
        moves.push(move)
    }

    return ref(moves)
}