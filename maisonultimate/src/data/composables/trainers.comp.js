import { ref } from 'vue'
import trainers_data from '@/data/trainers.json'
import Trainer from '@/data/interfaces/Trainer.js'

/**
 * Returns a reactive reference to an array of all trainers.
 *
 * @returns {Ref<Array>} A reactive reference to an array of all trainers.
 */
export const useTrainers = () => {
    const trainers = []
    let countWithIds = 0
    let count19ivs = 0
    let count23ivs = 0
    let countGroups = 0

    for (let trainer_data of trainers_data) {
        
        const {
            name, trainer_type, win_streak_range, name_xy, 
            name_oras, trainer_id, pkmn_group, ivs, pokemon       
        } = trainer_data

        const trainer = new Trainer(
            name, trainer_type, win_streak_range, name_xy, 
            name_oras, trainer_id, pkmn_group, ivs, pokemon 
        )
        
        if(trainer_id)
            countWithIds++

        if(pkmn_group)
            countGroups++

        if(ivs === 19)
            count19ivs++
        else if(ivs === 23)
            count23ivs++
            
        trainers.push(trainer)
    }
    
    console.group()
    console.log("Number of trainers: " + trainers.length)
    console.log("Number of trainers with ids: " + countWithIds)
    console.log("Number of trainers with 19 IVS: " + count19ivs)
    console.log("Number of trainers with 23 IVS: " + count23ivs)
    console.log("Number of trainers with Groups: " + countGroups)
    console.groupEnd()

    return ref(trainers)
}