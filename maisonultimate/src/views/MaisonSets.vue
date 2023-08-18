<template>
    <div id="Sets">
      <table id="Sets-Table">
        <thead class="Sets-Table-Header">
          <tr>
            <th class="Header-SetName">Set Name</th>
            <th class="pkmn-table-th">Tipo 1</th>
            <th class="pkmn-table-th">Tipo 2</th>
            <th class="pkmn-table-th">Velocidad</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="set in sets" :key="set">
            <td>{{ set.setName }}</td>
            <td>{{ set.type1 }}</td>
            <td>{{ set.type2 }}</td>
            <td>{{ set.totalStats[5] }}
              <p v-if="set.item == 'Choice Scarf'" style="display: inline; color:red; font-weigth:bold;">#</p>
              <p v-if="set.item == 'Iron Ball'" style="display: inline; color:blue; font-weigth:bold;">*</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script setup>
import { useSets } from '@/data/composables/sets.comp.js'
import { stats } from '@/data/composables/stats.comp.js'
/* STORE */
import { useStore } from '@/stores/TeamStore.js'
import { useTrainers } from '@/data/composables/trainers.comp.js'

const allTrainers = useTrainers()
console.log(allTrainers)

const sets = useSets()
/* const pkmn = stats(sets[0]) */

/* The store where Pokemon Teams are saved in LocalStorage */
const store = useStore()

</script>