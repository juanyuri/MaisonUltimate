<template>
  <div class="Pokemon-Cards-Container">
    <div class="Pokemon-Card" v-for="member in store.team" :key="member" @click="selectPokemon(member)">
      <img :src="member.sprite" alt="" width="80" height="80">
    </div>
  </div>

  <div class="global">
    <div class="main">
      <div class="types">
        <img :src="type1Url()" alt="" width="50" height="50">
        <img v-if="currentPokemon.type2 != 'undefined'" :src="type2Url()" alt="" width="50" height="50">
      </div>

      <div class="image">
        <img :src="currentPokemon.sprite" class="pokemon-main-image" width="400" height="400" alt="">
      </div>

      <div class="selections">
        <YuriSearch :items="allPkmn"
          :placeholderText="currentPokemon.species ? currentPokemon.species : 'Elige un Pokemon...'" attrToShow="species"
          :minLength="1" @onItemSelected="(event) => updateSelection(event)" />

        <YuriSearch :items="allAbilities"
          :placeholderText="currentPokemon.chosenAbility ? currentPokemon.chosenAbility : 'Choose an Abiltiy...'"
          attrToShow="name" :minLength="1"
          @onItemSelected="(event) => update('chosenAbility', event, 'name')" />

        <YuriSearch :items="allItems" :placeholderText="currentPokemon.item ? currentPokemon.item : 'Choose an Object...'"
          attrToShow="name" :minLength="1"
          @onItemSelected="(event) => update('item', event, 'name')" />

        <YuriSearch :items="natures" :placeholderText="currentPokemon.nature ? currentPokemon.nature : 'Choose a Nature...'"
          attrToShow="name" :minLength="1"
          @onItemSelected="(event) => update('nature', event, 'name')" />
      </div>
    </div>

    <div class="stats">
      <PkmnTable :pkmn="currentPokemon" />
    </div>
    <div class="moves">
      <div class="first-column-moves">
        <YuriSearch :items="allMoves"
          :placeholderText="currentPokemon.moves[0] ? currentPokemon.moves[0] : 'Elige un Movimiento...'"
          attrToShow="name" :minLength="1" @onItemSelected="(event) => updateMove(0, event, 'name', currentPokemon.species)" />

        <YuriSearch :items="allMoves"
          :placeholderText="currentPokemon.moves[1] ? currentPokemon.moves[1] : 'Elige un Movimiento...'"
          attrToShow="name" :minLength="1" @onItemSelected="(event) => updateMove(1, event, 'name', currentPokemon.species)" />
      </div>

      <div class="second-column-moves">
        <YuriSearch :items="allMoves" class="second-column-moves"
          :placeholderText="currentPokemon.moves[2] ? currentPokemon.moves[2] : 'Elige un Movimiento...'"
          attrToShow="name" :minLength="1" @onItemSelected="(event) => updateMove(2, event, 'name', currentPokemon.species)" />

        <YuriSearch :items="allMoves" class="second-column-moves"
          :placeholderText="currentPokemon.moves[3] ? currentPokemon.moves[3] : 'Elige un Movimiento...'"
          attrToShow="name" :minLength="1" @onItemSelected="(event) => updateMove(3, event, 'name', currentPokemon.species)" />
      </div>

      <div class="button">
        <button class="normal-icon" @click="updatePoke">Update</button>
        <button class="remove-icon" @click="removePoke">Remove</button>
      </div>
    </div>

  </div>
</template>



<script setup>
import { ref, watchEffect } from 'vue'

/* Import Data */
import { usePokemon } from '@/composables/pokedex.comp.js'
import { useMoves } from '@/composables/moves.comp.js'
import { useAbilities } from '@/composables/abilities.comp.js'
import { useItems } from '@/composables/items.comp.js'
import { stats } from '@/composables/stats.comp.js'
import {useNatures} from '@/composables/natures.comp.js'

/* Pinia Store for saving Team Composition */
import { useStore } from '@/stores/TeamStore.js'

/* Components */
import YuriSearch from '@/components/YuriSearch.vue'
import PkmnTable from '@/components/PkmnTable.vue'

const allItems = useItems()
const allMoves = useMoves()
const allAbilities = useAbilities()
const allPkmn = usePokemon()
const store = useStore()
const natures = useNatures()




let currentPokemon = ref(allPkmn[0])
console.log(store.team)
if(store.team.length > 0)
  currentPokemon.value = store.team[0]

let totalStats = stats(currentPokemon.value)

const selectPokemon = (poke) => {
  currentPokemon.value = poke
  totalStats = stats(currentPokemon.value)
  currentPokemon.value.totalStats = totalStats
}

const updatePoke = () => {
  store.updatePokemon(currentPokemon.value)
}

const removePoke = () => {
  store.removeFromTeam(currentPokemon.value.species)
  currentPokemon.value = store.team[0] /* TODO: caught error when no more pokemon can be removed */
}

/* What to do when item object comes from Search component */
const updateSelection = (item) => {
  store.addToTeam(item)
}

const update = (attr, newValue, attrFromDB) => {

  currentPokemon.value[attr] = newValue[attrFromDB]
  /* store.updateAttribute(attr, newValue[attrFromDB], species) */
}

const updateMove = (idxMove, newMove, attrFromDB) => {
  /* store.updateMove(idxMove, newMove[attrFromDB]) */
  currentPokemon.value.moves[idxMove] = newMove[attrFromDB]
}

watchEffect(() => {
  totalStats = stats(currentPokemon.value)
  currentPokemon.value.totalStats = totalStats
})


const type1Url = () => {
  let url = "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/go/"
  return url + currentPokemon.value.type1.toLowerCase() + ".png"
}

const type2Url = () => {
  let url = "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/go/"
  if (currentPokemon.value.type2) {
    return url + currentPokemon.value.type2.toLowerCase() + ".png"
  }
  return;

}
</script>



<style scoped>
.Pokemon-Cards-Container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 30px;
}

.Pokemon-Card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 120px;
  background-color: rgb(220, 220, 220);
  border: 1px solid transparent;
  border-radius: 0px 0px 10px 10px;
}

.Pokemon-Card img {
  margin-bottom: 10px;
}

.Pokemon-Card:hover {
  background-color: #97C5BD;
  cursor: pointer;
}


.global {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: .6fr 1fr;
  grid-template-areas: "main stats"
    "main moves";
  row-gap: 18px;
  column-gap: 18px;
  background-color: #E1E1E1;
  border-radius: 15px;

  width: 90%;
  height: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;

}

.main {
  grid-area: main;
  background-color: white;

  margin-top: 18px;
  margin-left: 18px;
  margin-bottom: 18px;

  border-radius: 15px;


  display: grid;
  grid-template-areas: "image"
    "selections";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}

.stats {
  grid-area: stats;
  background-color: white;
  border-radius: 15px;

  margin-top: 18px;
  margin-right: 18px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.moves {
  grid-area: moves;
  background-color: white;
  border-radius: 15px;

  margin-bottom: 18px;
  margin-right: 18px;

  display: grid;
  grid-template-areas: "first second"
    "button button";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr .7fr;
}


.first-column-moves {
  grid-area: first;
  /* background-color:blue; */

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;

  padding-right: 20px;


  gap: 10px;
}

.second-column-moves {
  grid-area: second;
  /* background-color:rgb(101, 223, 40); */

  display: flex;
  justify-content: flex-end;

  flex-direction: column;

  padding-left: 10px;

  gap: 10px;
}

.button {
  grid-area: button;
  /* background-color: red; */

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.normal-icon {
  background-color: #177D6B;
  border: 2.5px solid transparent;
  border-radius: 5px;
  height: 38px;
  width: 100px;
  color: white;
  font-weight: 500;
  font-size: 16px;

}

.normal-icon:hover {
  cursor: pointer;
  /* background-color:rgb(243, 243, 243); */
  color: white;
  transition-duration: .3s;
}

.remove-icon {
  background-color: #c61717;
  border: 2.5px solid transparent;
  border-radius: 5px;
  height: 38px;
  width: 100px;
  color: white;
  font-weight: 500;
  font-size: 16px;

}

.remove-icon:hover {
  cursor: pointer;
  color: white;
  transition-duration: .3s;
}





.types {
  position: absolute;
  /* float:right; */
  margin-top: 20px;
  margin-left: 15px;
}

.types>img {
  margin-left: 8px;
}


.image {
  grid-area: image;
  z-index:999;

  display: flex;
  justify-content: center;
  align-items: center;
}


.selections {
  grid-area: selections;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 10px;
}
</style>
