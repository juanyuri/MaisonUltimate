<template>
  <main>

    <button @click="userStore.changeVersion('ORAS')">ORAS</button>
    <button @click="userStore.changeVersion('XY')">XY</button>

    <div class="search-container">
      <YuriSearch 
        :items="allTrainers" 
        placeholderText="Choose a trainer" 
        attrToShow="name_oras" 
        :minLength="1"
        @onItemSelected="(event) => updateTrainer(event)"
      />
      <p v-if="filteredSets.length === 864">Showing all sets</p>
      <p v-else>{{ currentTrainer.name_oras }} (ORAS), {{ currentTrainer.name_xy }} (XY) has {{ filteredSets.length }} sets available. Found in rounds: {{ currentTrainer.rounds[0] }} </p>
    </div>
      

      <div class="pkmn-cards-container">
        <div class="pkmn-card" @click="changePokemon(0)">
          <p class="pkmn-card-info">{{ store.team[0].species }}</p>
        </div>
        <div class="pkmn-card" @click="changePokemon(1)" v-if="store.team[1]">
          <p class="pkmn-card-info">{{ store.team[1].species }}</p>
        </div>
        <div class="pkmn-card" @click="changePokemon(2)" v-if="store.team[2]">
          <p class="pkmn-card-info">{{ store.team[2].species }}</p>
        </div>
        <div class="pkmn-card" @click="changePokemon(3)" v-if="store.team[3]">
          <p class="pkmn-card-info">{{ store.team[3].species }}</p>
        </div>
      </div>

      
      <div id="speed-comparator">
      <table id="pkmn-table">
        <thead>
          <tr class="header">
            <th class="pkmn-table-th">SET</th>
            <th class="pkmn-table-th">MOVE 1</th>
            <th class="pkmn-table-th">MOVE 2</th>
            <th class="pkmn-table-th">MOVE 3</th>
            <th class="pkmn-table-th">MOVE 4</th>
            <th class="pkmn-table-th">ABILITY</th>
            <th class="pkmn-table-th">ITEM</th>
            <th class="pkmn-table-th">SPEED</th>
            <th class="pkmn-table-th">DAMAGE</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="set in filteredSets" :key="set">
            <td>{{ set.setName }}</td>
            <td>{{ set.moves[0] }}</td>
            <td>{{ set.moves[1] }}</td>
            <td>{{ set.moves[2] }}</td>
            <td>{{ set.moves[3] }}</td>
            <td ><p v-for="ab in set.abilities">{{ ab }}</p></td>
            <td>{{ set.item }}</td>
            <td>{{ set.totalStats[5] }}
              <p v-if="set.item == 'Choice Scarf'" style="display: inline; color:red; font-weight:bold;">#</p>
              <p v-if="set.item == 'Iron Ball'" style="display: inline; color:blue; font-weight:bold;">*</p>
            </td>
            <td>{{ pctg(damage(set, 85), set.totalStats[0]) }}% - {{pctg(damage(set, 100), set.totalStats[0])}}%
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSets, findSets } from '@/composables/sets.comp.js'
import { useMoves } from '@/composables/moves.comp.js'
import { useTrainers } from '@/composables/trainers.comp.js'
import { stats, natureEffect } from '@/composables/stats.comp.js'
import { getModifiedMoveType, getModifiedMovePower } from '@/composables/stats.comp.js'
import { getModifiedStatWithItem, getModifiedStatWithAbility } from '@/composables/stats.comp.js'
import {TRAINER_DEFAULT} from '@/const/filters.js'

/* STORE */
import { useStore } from '@/stores/TeamStore.js'
/* import { useGroups } from '@/composables/groups.comp.js' */
import { useConfigStore } from '@/stores/UserConfigStore.js'

import SetCard from '@/components/SetCard.vue'
import YuriSearch from '@/components/YuriSearch.vue'

const moves = useMoves()
const allTrainers = useTrainers()
const sets = useSets()
const store = useStore()

const userStore = useConfigStore()
const userConfiguration = ref(JSON.parse(userStore.userConfiguration))


let currentPokemon = ref(store.team[0])
let query = ref(TRAINER_DEFAULT)
let currentTrainer = allTrainers.value.find(tr => tr.name_oras == TRAINER_DEFAULT)


let changePokemon = (number) => {
  currentPokemon.value = store.team[number]
}

const filteredSets = computed(() => {

  /* Query for getting all the sets */
  let sets = query.value === ''
    ? sets.value
    : findSets(
      allTrainers.value.filter(trainer => trainer['name_oras'] == query.value)[0]['pkmn_group']
    );


  
  // Modify each set's totalStats based on currentTrainer.ivs
  sets = sets.map(set => {
    // Copy the set to avoid modifying the original
    const modifiedSet = {...set}


    let trainerIVs = currentTrainer.ivs
    modifiedSet.ivs = [trainerIVs, trainerIVs, trainerIVs, trainerIVs, trainerIVs, trainerIVs]

    let finish = stats(modifiedSet)
    modifiedSet.totalStats = finish

    return modifiedSet
  })

  return sets
})

const updateTrainer = ( trainer ) => {
  query.value = trainer['name_oras']
  currentTrainer.value = trainer
}

const pctg = (result, hp) => {
  let damagePctg = ~~(result.totalDamage / hp * 100)

  return damagePctg
}



const damage = (opponent, random) => {
  const attacker = currentPokemon.value
  const RANDOM = random /* minimum */

  let opponentType1 = opponent['type1']
  let opponentType2 = opponent['type2']
  let attackerType1 = attacker['type1']
  let attackerType2 = attacker['type2']

  let attackerLevel = attacker['level']

  /* Storing the damage from each attack */
  const attacksDamage = []

  /* Calculate the damage from each attack */
  attacker['moves'].forEach(moveName => {
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
    pkmnType = getModifiedMoveType(abilityName, pkmnType)
    let bp = getModifiedMovePower(abilityName, baseBp, pkmnType)

    /* Calculate the type effectiveness and STAB */
    effectiveness = natureEffect(pkmnType, opponentType1, opponentType2)
    if (pkmnType === attackerType1 || pkmnType === attackerType2) {
      STAB = 1.5
    }

    let result1 = ((0.2 * attackerLevel + 1) * attackStat * bp)
    result1 /= (25 * defenseStat)
    result1 += 2

    /* Calculate the base damage and add it to the attacksDamage array */
    const resultadoBase = ~~(0.01 * STAB * effectiveness * RANDOM * (result1))
    attacksDamage.push({ totalDamage: resultadoBase, moveName: move.name })
  })

  // Find the maximum damage and move associated
  let maxDamageMove = attacksDamage.reduce((maxMove, move) => {
    return move.totalDamage > maxMove.totalDamage ? move : maxMove
  }, {totalDamage: 0, moveName: ''})

  return maxDamageMove
}

</script>

<style scoped>
.Sets {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 4em;

  padding-top: 40px;
}


table#pkmn-table {
  border-collapse: collapse;
  width: 95%;
  margin-bottom: 100px;
}

table#pkmn-table th,
table#pkmn-table td {
  border-collapse: collapse;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 15px;
  padding-left: 15px;
  text-align: left;
  border: 1px solid #dde4eb;
}

table#pkmn-table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

table#pkmn-table tr:not(.header):hover {
  background-color: #edf1f5;
}

.pkmn-table-th {
  font-weight: bold;
}

.pkmn-table-th:hover {
  background-color: #177d6a08;
  cursor: pointer;
}

#speed-comparator {
  grid-area: table;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}








.pkmn-cards-container{
  display: flex;
  /* background-color: blue; */
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  align-items: center;
  margin-bottom:35px;
  gap: 20px;
}

.pkmn-card{
  width:150px;
  height: 45px;
  background-color:#177D6B;
  border: 1px solid transparent;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color:white;
}

.pkmn-card:hover{
  background-color:#115a4d;
  cursor: pointer;
}

.search-container{
  display: flex;
  /* background-color: blue; */
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  margin-bottom:35px;
  padding-top:40px;
  gap: 20px;
}

</style>