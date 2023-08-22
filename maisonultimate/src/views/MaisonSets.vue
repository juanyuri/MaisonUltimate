<template>
  <main>

    <YuriSearch :items="allTrainers" placeholderText="Elige un entrandor" attrToShow="name" :minLength="1"
      @onItemSelected="(event) => updateTrainer(event)" />

    <p v-if="filteredSets.length === 864">Showing all sets</p>
    <p v-else>Showing {{ filteredSets.length }} sets this trainer may have</p>

    <div class="Sets">
      <SetCard v-for="set in filteredSets" :key="set" :set="set" 
      :minDamagePctg="pctg(damage(set, 85), set.totalStats[0])"
      :maxDamagePctg="pctg(damage(set, 100), set.totalStats[0])"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSets, findSets } from '@/data/composables/sets.comp.js'
import { useMoves } from '@/data/composables/moves.comp.js'
import { stats, natureEffect } from '@/data/composables/stats.comp.js'
import { getModifiedMoveType, getModifiedMovePower } from '@/data/composables/stats.comp.js'
import { getModifiedStatWithItem, getModifiedStatWithAbility } from '@/data/composables/stats.comp.js'

/* STORE */
import { useStore } from '@/stores/TeamStore.js'
import { useTrainers } from '@/data/composables/trainers.comp.js'
import { useGroups } from '@/data/composables/groups.comp.js'

import SetCard from '@/components/SetCard.vue'
import YuriSearch from '@/components/YuriSearch.vue'

const moves = useMoves()
const allTrainers = useTrainers()
const sets = useSets()
const store = useStore()
let currentPokemon = ref(store.team[0])
let query = ref('')

const filteredSets = computed(() => {
  return query.value === ''
    ? sets.value
    : findSets(
      allTrainers.value
        .filter(trainer => trainer.name === query.value)[0]['pkmn_group']
    )
})

const updateTrainer = (event) => {
  query.value = event.name
}

const pctg = (result, hp) => {
  let statsDeal = []

  for(let res of result){
    statsDeal.push(~~(res.totalDamage/hp*100))
  }

  return Math.max(...statsDeal)
}


const damage = (opponent, random) => {
  const attacker = currentPokemon.value
  const RANDOM = random /* minimum */

  let opponentType1 = opponent['type1']
  let opponentType2 = opponent['type2']
  let attackerType1 = attacker['type2']
  let attackerType2 = attacker['type2']

  let attackerLevel = attacker['level']

  /* Initialize an array to store the damage from each attack */
  const attacksDamage = []
  

  /* Calculate the damage from each attack */
  attacker['moves'].forEach( moveName => {
    
    const move = moves.value.find(m => m.name === moveName)

    /* Initialize variables for attack and defense stats, base power, type effectiveness, and STAB */
    let attackStat, defenseStat
    let pkmnType = move['type']
    let baseBp = move['bp']
    let effectiveness = 0
    let STAB = 1
    let abilityName = attacker.chosenAbility


    /* Determine the attack and defense stats based on the move category */
    if (move.category === 'Physical') {
      attackStat = attacker.totalStats[1]
      defenseStat = opponent.totalStats[2]
    } else {
      attackStat = attacker.totalStats[3]
      defenseStat = opponent.totalStats[4]
    }

    /* Apply ability and type changes to the move */
    pkmnType = getModifiedMoveType( abilityName, pkmnType )
    let bp = getModifiedMovePower( abilityName, baseBp, pkmnType )

    /* Calculate the type effectiveness and STAB */
    effectiveness = natureEffect( pkmnType, opponentType1, opponentType2)
    if (pkmnType === attackerType1 || pkmnType === attackerType2) {
      STAB = 1.5
    }

    let result1 = ((0.2 * attackerLevel + 1) * attackStat * bp)
    result1 /= (25 * defenseStat)
    result1 += 2

    /* Calculate the base damage and add it to the attacksDamage array */
    const resultadoBase = ~~(0.01 * STAB * effectiveness * RANDOM * (result1) )
    attacksDamage.push({ totalDamage: resultadoBase, moveName: move.name })
  })

  
  /* Find the attack with the highest damage and return it */
  return attacksDamage
  /* return attacksDamage.reduce((prev, current) => (prev.total_dmg > current.total_dmg) ? prev : current) */
}

</script>

<style scoped>
.Sets {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 4em;

  padding-top: 40px;
}
</style>