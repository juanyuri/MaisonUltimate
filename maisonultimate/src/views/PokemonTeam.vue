<template>
  <button @click="userStore.changeLanguage('SPANISH')">SPA</button>
  <button @click="userStore.changeLanguage('ENGLISH')">ENG</button>


  <p>{{ userStore.gameLanguage }}</p>
  <p>{{ userStore.gameVersion }}</p>

  
  <div class="Pokemon-Cards-Container">

    <div class="Pokemon-Card" v-for="(pkmn, index) in store.team" :key="pkmn" @click="selectPokemon(index, pkmn)">
      <img :src="pkmn.spriteIcon" alt="pkmn.species" width="80" height="80" />
    </div>

    <div class="Pokemon-Card" v-if="store.team.length == 0" @click="addDefault(defaultPokemon)">
      <img src="../components/icons/plus.svg" alt="" width="40" height="80">
    </div>

    <div class="Pokemon-Card" v-if="store.team.length == 1" @click="addDefault(defaultPokemon)">
      <img src="../components/icons/plus.svg" alt="" width="40" height="80">
    </div>

    <div class="Pokemon-Card" v-if="store.team.length == 2" @click="addDefault(defaultPokemon)">
      <img src="../components/icons/plus.svg" alt="" width="40" height="80">
    </div>

    <div class="Pokemon-Card" v-if="store.team.length == 3" @click="addDefault(defaultPokemon)">
      <img src="../components/icons/plus.svg" alt="" width="40" height="80">
    </div>

    
  </div>

  <div class="global">
    <div class="main">

      <div class="types">
        <img :src="type1Url()" alt="" width="50" height="50">
        <img v-if="currentPokemon.type2 != 'undefined'" :src="type2Url()" alt="" width="50" height="50">
      </div>

      <div class="image">
        <img :src="currentPokemon.spriteImage" class="pokemon-main-image" width="400" height="400" alt="">
      </div>

      <div class="selections">
        <YuriSearch :items="allPkmn"
          :placeholderText="currentPokemon.species ? currentPokemon.species : i18n('Choose a Pokemon...')" attrToShow="species"
          :minLength="1" @onItemSelected="(event) => updateSelection(event)" />

        <YuriSearch :items="allAbilities"
          :placeholderText="currentPokemon.chosenAbility ? i18n(currentPokemon.chosenAbility) : i18n('Choose an Abiltiy...')"
          attrToShow="name" :minLength="1"
          @onItemSelected="(event) => update('chosenAbility', event, 'name')" />

        <YuriSearch :items="allItems" :placeholderText="currentPokemon.item ? i18n(currentPokemon.item) : i18n('Choose an Object...')"
          attrToShow="name" :minLength="1"
          @onItemSelected="(event) => update('item', event, 'name')" />
          
      </div>
    </div>

    <div class="stats">
      <div id="pkmn-stats">
        <div class="table">
            <div></div>
            <div class="bold">{{ i18n("HP") }}</div>
            <div class="bold">AT</div>
            <div class="bold">DF</div>
            <div class="bold">SP. AT</div>
            <div class="bold">SP. DF</div>
            <div class="bold">{{ i18n("SPEED") }}</div>

            <div class="bold">EVS</div>
            <div><input type="number" step="4" v-model="currentPokemon.evs[0]"></div>
            <div><input type="number" step="4" v-model="currentPokemon.evs[1]"></div>
            <div><input type="number" step="4" v-model="currentPokemon.evs[2]"></div>
            <div><input type="number" step="4" v-model="currentPokemon.evs[3]"></div>
            <div><input type="number" step="4" v-model="currentPokemon.evs[4]"></div>
            <div><input type="number" step="4" v-model="currentPokemon.evs[5]"></div>

            <div class="bold">IVS</div>
            <div><input type="number" v-model="currentPokemon.ivs[0]"></div>
            <div><input type="number" v-model="currentPokemon.ivs[1]"></div>
            <div><input type="number" v-model="currentPokemon.ivs[2]"></div>
            <div><input type="number" v-model="currentPokemon.ivs[3]"></div>
            <div><input type="number" v-model="currentPokemon.ivs[4]"></div>
            <div><input type="number" v-model="currentPokemon.ivs[5]"></div>

            <div class="bold">BASE</div>
            <div>{{ currentPokemon.baseStats[0] }}</div>
            <div>{{ currentPokemon.baseStats[1] }}</div>
            <div>{{ currentPokemon.baseStats[2] }}</div>
            <div>{{ currentPokemon.baseStats[3] }}</div>
            <div>{{ currentPokemon.baseStats[4] }}</div>
            <div>{{ currentPokemon.baseStats[5] }}</div>


            <div class="bold">TOTAL</div>
            <div class="total-result">{{ currentPokemon.totalStats[0] }}</div>

            <div class="total-result" :class="{
                'up': natureEffect(currentPokemon.nature, 1) > 1,
                'down': natureEffect(currentPokemon.nature, 1) < 1
            }">{{ currentPokemon.totalStats[1] }}</div>

            <div class="total-result" :class="{
                'up': natureEffect(currentPokemon.nature, 2) > 1,
                'down': natureEffect(currentPokemon.nature, 2) < 1
            }">{{ currentPokemon.totalStats[2] }}</div>

            <div class="total-result" :class="{
                'up': natureEffect(currentPokemon.nature, 3) > 1,
                'down': natureEffect(currentPokemon.nature, 3) < 1
            }">{{ currentPokemon.totalStats[3] }}</div>

            <div class="total-result" :class="{
                'up': natureEffect(currentPokemon.nature, 4) > 1,
                'down': natureEffect(currentPokemon.nature, 4) < 1
            }">{{ currentPokemon.totalStats[4] }}</div>

            <div class="total-result" :class="{
                'up': natureEffect(currentPokemon.nature, 5) > 1,
                'down': natureEffect(currentPokemon.nature, 5) < 1
            }">{{ currentPokemon.totalStats[5] }}</div>
        </div>
    </div>



    <YuriSearch :items="natures" 
        :placeholderText="currentPokemon.nature ? i18n(currentPokemon.nature) : i18n('Choose a Nature...')"
        attrToShow="name" :minLength="1"
        @onItemSelected="(event) => update('nature', event, 'name')" />
    </div>



    <div class="moves">
      <div class="first-column-moves">
        <YuriSearch :items="allMoves"
          :placeholderText="currentPokemon.moves[0] ? i18n(currentPokemon.moves[0]) : i18n('Choose a Move')"
          attrToShow="name" :minLength="1" @onItemSelected="(event) => updateMove(0, event, 'name', currentPokemon.species)" />

        <YuriSearch :items="allMoves"
          :placeholderText="currentPokemon.moves[1] ? i18n(currentPokemon.moves[1]) : i18n('Choose a Move')"
          attrToShow="name" :minLength="1" @onItemSelected="(event) => updateMove(1, event, 'name', currentPokemon.species)" />
      </div>

      <div class="second-column-moves">
        <YuriSearch :items="allMoves" class="second-column-moves"
          :placeholderText="currentPokemon.moves[2] ? i18n(currentPokemon.moves[2]) : i18n('Choose a Move')"
          attrToShow="name" :minLength="1" @onItemSelected="(event) => updateMove(2, event, 'name', currentPokemon.species)" />

        <YuriSearch :items="allMoves" class="second-column-moves"
          :placeholderText="currentPokemon.moves[3] ? i18n(currentPokemon.moves[3]) : i18n('Choose a Move')"
          attrToShow="name" :minLength="1" @onItemSelected="(event) => updateMove(3, event, 'name', currentPokemon.species)" />
      </div>
    </div>

  </div>
</template>



<script setup>
import { ref, watchEffect, watch} from 'vue'

/* Import Data */
import { usePokemon } from '@/composables/pokedex.comp.js'
import { useMoves } from '@/composables/moves.comp.js'
import { useAbilities } from '@/composables/abilities.comp.js'
import { useItems } from '@/composables/items.comp.js'
import { stats, natureEffect } from '@/composables/stats.comp.js'
import {useNatures} from '@/composables/natures.comp.js'

/* Pinia Store for saving Team Composition */
import { useStore } from '@/stores/TeamStore.js'
import { useConfigStore } from '@/stores/UserConfigStore.js'

// Translations
import i18nData from "@/data/i18n_es.json"

/* Components */
import YuriSearch from '@/components/YuriSearch.vue'

const allItems = useItems()
const allMoves = useMoves()
const allAbilities = useAbilities()
const allPkmn = usePokemon()
const store = useStore()
const natures = useNatures()
const DEF_IMG_URL = "https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/go/"

const userStore = useConfigStore()
// const userConfiguration = ref(JSON.parse(userStore.userConfiguration))

let currentPokemon = ref(allPkmn[9])
let defaultPokemon = ref(allPkmn[0])



const i18n = (englishName) => {
  if (userStore.gameLanguage == "SPANISH")
    return i18nData[englishName]
  
  return englishName
}


if(store.team.length > 0)
  currentPokemon.value = store.team[0]

if(store.team.length === 0){
  store.addToTeam(defaultPokemon.value)
  currentPokemon.value= defaultPokemon.value
}

let totalStats = stats(currentPokemon.value)

const selectPokemon = (index, poke) => {
  console.log("Selecting...", poke.species)
  currentPokemon.value = poke
  currentPokemon.value.totalStats = stats(currentPokemon.value)

  if( store.team.length > 4){
    console.log("Updating pokemon in position " + index)
    store.updatePokemon(currentPokemon.value, index )
    console.log("added new poke" + currentPokemon.value.species)
  }
}


const removePoke = () => {
  store.removeFromTeam(currentPokemon.value.species)
  currentPokemon.value = store.team[0] /* TODO: caught error when no more pokemon can be removed */
}

const addDefault = item => {
  currentPokemon.value = item
}

/* What to do when item object comes from Search component */
const updateSelection = (item, current) => {
  /* store.addToTeam(item) */
  console.log("Previous: " + currentPokemon.value.species)
  console.log("New: " + item.species)
  /* currentPokemon.value = item */
  let pos = store.findPokemonPosition(currentPokemon.value.species)
  
  if(store.team.length >= 4){
    store.updatePokemon(item, pos)
    currentPokemon.value = item
  }else{
    store.addToTeam(item)
  }
}

const update = (attr, newValue, attrFromDB) => {
  currentPokemon.value[attr] = newValue[attrFromDB]
  store.updatePokemon(currentPokemon.value)
}

const updateMove = (idxMove, newMove, attrFromDB) => {
  /* store.updateAttribute(idxMove, newMove[attrFromDB]) */
  currentPokemon.value.moves[idxMove] = newMove[attrFromDB]
  store.updatePokemon(currentPokemon.value)
}

watchEffect(() => {
  currentPokemon.value.totalStats = stats(currentPokemon.value)
  let pos = store.findPokemonPosition(currentPokemon.species)
  store.updatePokemon(currentPokemon.value, pos)
})



const type1Url = () => {
  return DEF_IMG_URL + currentPokemon.value.type1.toLowerCase() + ".png"
}

const type2Url = () => {
  if (currentPokemon.value.type2) {
    return DEF_IMG_URL + currentPokemon.value.type2.toLowerCase() + ".png"
  }
  return;

}
</script>



<style scoped>

/* to use with: <input type="range" class="css-type-range"> */
.css-type-range {
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    display: block;
    width: 100%;
    height: 4px;
    margin-top: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 9999px;
    color: inherit;
    background-color: gray;
    background-color: var(--theme-ui-colors-border,#d1d5da);
}

.Pokemon-Cards-Container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 30px;
  overflow: hidden;
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

.global-2{
  display: grid;
  grid-template-rows: 2fr 1fr;
  grid-template-columns: .6fr 1.5fr;
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

.global {
  display: grid;
  grid-template-rows: 2fr 1fr;
  grid-template-columns: .6fr 1.5fr;
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
  flex-direction: column;
  gap:20px;
}

.moves {
  grid-area: moves;
  background-color: white;
  border-radius: 15px;

  margin-bottom: 18px;
  margin-right: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* display: grid;
  grid-template-areas: "first second";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr; */
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

  gap: 20px;
}








.table {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(7, 1fr);
    width: 900px;
    row-gap: 15px;
    column-gap: 10px;

    padding: 10px;
    border-radius: 8px;
}

.table div {
    /* FLEX CONFIG */
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;

    /* STYLE CONFIG */
    box-sizing: border-box;
    font-size: 18px;
}

.table input[type=text],
.table input[type=number] {
    width: 91px;
    height: 35px;
    border: 1px solid transparent;
    border-radius: 5px;
    background-color: #E1E1E1;
    text-align: center;
    font-size: 18px;
    padding-left: 10px;
}

.table input[type=number]:focus {
    outline: 2px solid rgb(0, 30, 255);
    outline-width: 2px;
}

.bold {
    background-color: #535353;
    color: white;
    border-radius: 5px;
    height: 35px;
    width: 101px;

    margin-left: auto;
    margin-right: auto;

    font-size: 18px;
    font-weight: 400;
}

.up {
    /* background-color: #E24E4E; */
    color: #fb0b0b;
    border-radius: 5px;
    height: 35px;
    width: 101px;

    margin-left: auto;
    margin-right: auto;

    font-size: 18px;
    font-weight: 900;
    text-decoration: underline;
}

.down {
    /* background-color: #4E9DE2; */
    color: #258ce6;
    border-radius: 5px;
    height: 35px;
    width: 101px;

    margin-left: auto;
    margin-right: auto;

    font-weight: 900;
    text-decoration: underline;
}

.total-result {
    font-weight: 700;
    font-size: 18px;
}
</style>
