<template>
  <h1>Pokemon Team Planner</h1>

  <div class="pkmn-cards-container">
    <div class="pkmn-card" v-for="member in store.team" :key="member">
      <p class="pkmn-card-info" >{{ member.species }}</p>
      <button @click="store.removeFromTeam(member.species)">Remove</button>
    </div>
  </div>

  <div id="Pkmn">
    <h2>Search for a result:</h2>
    <YuriSeach :items="allPkmn" placeholderText="Elige un Pokemon..." attrToShow="species" :minLength="1"
      @onItemSelected="(event) => updateSelection(event)" />
  </div>
</template>



<script setup>
import { usePokemon } from '@/data/composables/pokedex.comp.js'
import { useStore } from '@/stores/TeamStore.js'

import YuriSeach from '@/components/YuriSearch.vue'


const allPkmn = usePokemon()
const store = useStore()

/* What to do when item object comes from Search component */
const updateSelection = (item) => {
  store.addToTeam(item)
}

/* store.addToTeam(allPkmn[0]) */
/* store.removeFromTeam(allPkmn[0].species) */
</script>



<style scoped></style>