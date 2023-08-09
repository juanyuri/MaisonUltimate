<template>
  <h1>Pokemon Team Planner</h1>

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

/* What to do when item object comes from Search component */
const updateSelection = (item) => {
  console.log(item)
}

const allPkmn = usePokemon()
const store = useStore()
/* store.addToTeam(allPkmn[0])
store.removeFromTeam(allPkmn[0].species) */
</script>



<style scoped></style>