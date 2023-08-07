<template>
  <h1>Pokemon Team Planner</h1>

  <div id="Pkmn">
    <table id="Pkmn-Table">
      <thead class="Pkmn-Table-Header">
        <tr>
          <th class="pkmn-table-th">Pokedex</th>
          <th class="Header-SetName">Pokemon Name</th>
          <th class="pkmn-table-th">Tipo 1</th>
          <th class="pkmn-table-th">Tipo 2</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="pkmn in allPkmn" :key="pkmn">
          <td>{{ pkmn.numDex }}</td>
          <td>{{ pkmn.species }}</td>
          <td>{{ pkmn.type1 }}</td>
          <td>{{ pkmn.type2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script setup>
import { usePokemon } from '@/data/composables/pokedex.comp.js'

const allPkmn = usePokemon()
console.log(allPkmn)
</script>



<style scoped></style>