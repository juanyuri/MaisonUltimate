<template>
  <div class="Pokemon-Cards-Container">
    <div class="Pokemon-Card" v-for="member in store.team" :key="member" @click="selectPokemon(member)">
      <img :src="member.sprite" alt="" width="80" height="80">
    </div>
  </div>

  <h2>Search for a result:</h2>
  <!-- <YuriSeach :items="allPkmn" placeholderText="Elige un Pokemon..." attrToShow="species" :minLength="1"
    @onItemSelected="(event) => updateSelection(event)" /> -->


  <p>{{ currentPokemon.species }}</p>
  <p>{{ currentPokemon.type1 }}</p>
  <p>{{ currentPokemon.type2 }}</p>
  <p>{{ currentPokemon.abilities[0] }}</p>
  <p>{{ currentPokemon.nature }}</p>

  <div id="pkmn-stats">
    <div class="table">
      <div class="bold">ESTADÍSTICA</div>
      <div class="bold">BASE</div>
      <div class="bold">IVS</div>
      <div class="bold">EVS</div>
      <div class="bold">TOTAL</div>

      <div class="normal-text">Puntos de Salud</div>
      <div><input type="number" v-model="currentPokemon.baseStats[0]"></div>
      <div>
        <input class="input-ivs" type="number" v-model="currentPokemon.ivs[0]">
      </div>
      <div>
        <input class="input-evs" v-if="typeof currentPokemon.evs[0] == 'number'" type="number" step="4"
          v-model="currentPokemon.evs[0]">
        <input class="input-evs" v-else type="number" step="4" value="0">
      </div>

      <div>{{ currentPokemon.totalStats[0] }}</div>

      <div class="normal-text">Ataque</div>
      <div><input type="number" v-model="currentPokemon.baseStats[1]"></div>
      <div>
        <input class="input-ivs" type="number" v-model="currentPokemon.ivs[1]">
      </div>
      <div>
        <input class="input-evs" v-if="typeof currentPokemon.evs[1] == 'number'" type="number" step="4"
          v-model="currentPokemon.evs[1]">
        <input class="input-evs" v-else type="number" step="4" value="0">
      </div>
      <div>{{ currentPokemon.totalStats[1] }}</div>

      <div class="normal-text">Defensa</div>
      <div><input type="number" v-model="currentPokemon.baseStats[2]"></div>
      <div>
        <input class="input-ivs" type="number" v-model="currentPokemon.ivs[2]">
      </div>
      <div>
        <input class="input-evs" v-if="typeof currentPokemon.evs[2] == 'number'" type="number" step="4"
          v-model="currentPokemon.evs[2]">
        <input class="input-evs" v-else type="number" step="4" value="0">
      </div>
      <div>{{ currentPokemon.totalStats[2] }}</div>

      <div class="normal-text">At. Especial</div>
      <div><input type="number" v-model="currentPokemon.baseStats[3]"></div>
      <div>
        <input class="input-ivs" type="number" v-model="currentPokemon.ivs[3]">
      </div>
      <div>
        <input class="input-evs" v-if="typeof currentPokemon.evs[3] == 'number'" type="number" step="4"
          v-model="currentPokemon.evs[3]">
        <input class="input-evs" v-else type="number" step="4" value="0">
      </div>
      <div>{{ currentPokemon.totalStats[3] }}</div>

      <div class="normal-text">Df. Especial</div>
      <div><input type="number" v-model="currentPokemon.baseStats[4]"></div>
      <div>
        <input class="input-ivs" type="number" v-model="currentPokemon.ivs[4]">
      </div>
      <div>
        <input class="input-evs" v-if="typeof currentPokemon.evs[4] == 'number'" type="number" step="4"
          v-model="currentPokemon.evs[4]">
        <input class="input-evs" v-else type="number" step="4" value="0">
      </div>
      <div>{{ currentPokemon.totalStats[4] }}</div>

      <div class="normal-text">Velocidad</div>
      <div><input type="number" v-model="currentPokemon.baseStats[5]"></div>
      <div>
        <input class="input-ivs" type="number" v-model="currentPokemon.ivs[5]">
      </div>
      <div>
        <input class="input-evs" v-if="typeof currentPokemon.evs[5] == 'number'" type="number" step="4"
          v-model="currentPokemon.evs[5]">
        <input class="input-evs" v-else type="number" step="4" value="0">
      </div>
      <div>{{ currentPokemon.totalStats[5] }}</div>

    </div>
  </div> <!-- END OF TABLA ESTADISTICAS -->

  <button @click="updatePoke">Actualizar</button>
</template>



<script setup>
import { ref, watchEffect } from 'vue'
import { usePokemon } from '@/data/composables/pokedex.comp.js'
import { useMoves } from '@/data/composables/moves.comp.js'
import { stats } from '@/data/composables/stats.comp.js'
import { useStore } from '@/stores/TeamStore.js'

/* import YuriSearch from '@/components/YuriSearch.vue'
 */

 const allMoves = useMoves()

const allPkmn = usePokemon()
const store = useStore()
let currentPokemon = ref(allPkmn[0])
let totalStats = stats(currentPokemon.value)

const selectPokemon = (poke) => {
  currentPokemon.value = poke
  totalStats = stats(currentPokemon.value)
  currentPokemon.value.totalStats = totalStats
}

const updatePoke = () => {
  store.updatePokemon(currentPokemon.value)
}

/* What to do when item object comes from Search component */
const updateSelection = (item) => {
  store.addToTeam(item)
}

watchEffect(() => {
  totalStats = stats(currentPokemon.value)
  currentPokemon.value.totalStats = totalStats
})

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

.Pokemon-Card:hover {
  background-color: #97C5BD;
  cursor: pointer;
}


.table {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr 1fr 1fr;
  width: 800px;
  row-gap: 2px;

  background-color: #d0d0d0;

  padding: 10px;
  border-radius: 8px;
}

.table div {
  /* FLEX CONFIG */
  display: flex;
  align-items: center;
  justify-content: center;

  /* STYLE CONFIG */
  width: 100%;
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 10px;
}

.table input[type=text],
.table input[type=number] {
  width: 40%;
  padding: 4px 8px;
  border: 2px solid #d5d7db;
  border-radius: 5px;
  background-color: #F5F7FB;
}

.table input[type=number]:focus {
  /* outline: 2px solid rgb(24, 80, 235); */
  outline: 2px solid rgb(255, 255, 255);
  outline-width: 2px;
}
</style>