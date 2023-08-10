<template>

  <div class="Pokemon-Cards-Container">
    <div class="Pokemon-Card" v-for="member in store.team" :key="member">
      <img :src="member.sprite" alt="" width="80" height="80">
    </div>
  </div>

  <h2>Search for a result:</h2>
  <YuriSeach :items="allPkmn" placeholderText="Elige un Pokemon..." attrToShow="species" :minLength="1"
    @onItemSelected="(event) => updateSelection(event)" />

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

</script>



<style scoped>
.Pokemon-Cards-Container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 30px;
  /* margin-top: 20px; */
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

.Pokemon-Card:hover{
  background-color:#97C5BD;
  cursor:pointer;
}
</style>