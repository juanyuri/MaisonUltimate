<template>
    <div id="pkmn-stats">
        <div class="table">
            <div></div>
            <div class="bold">HP</div>
            <div class="bold">AT</div>
            <div class="bold">DF</div>
            <div class="bold">SP. AT</div>
            <div class="bold">SP. DF</div>
            <div class="bold">SP</div>

            <div class="bold">EVS</div>
            <div><input type="number" step="4" v-model="pkmn.evs[0]"></div>
            <div><input type="number" step="4" v-model="pkmn.evs[1]"></div>
            <div><input type="number" step="4" v-model="pkmn.evs[2]"></div>
            <div><input type="number" step="4" v-model="pkmn.evs[3]"></div>
            <div><input type="number" step="4" v-model="pkmn.evs[4]"></div>
            <div><input type="number" step="4" v-model="pkmn.evs[5]"></div>

            <div class="bold">IVS</div>
            <div><input type="number" v-model="pkmn.ivs[0]"></div>
            <div><input type="number" v-model="pkmn.ivs[1]"></div>
            <div><input type="number" v-model="pkmn.ivs[2]"></div>
            <div><input type="number" v-model="pkmn.ivs[3]"></div>
            <div><input type="number" v-model="pkmn.ivs[4]"></div>
            <div><input type="number" v-model="pkmn.ivs[5]"></div>

            <div class="bold">BASE</div>
            <div>{{ pkmn.baseStats[0] }}</div>
            <div>{{ pkmn.baseStats[1] }}</div>
            <div>{{ pkmn.baseStats[2] }}</div>
            <div>{{ pkmn.baseStats[3] }}</div>
            <div>{{ pkmn.baseStats[4] }}</div>
            <div>{{ pkmn.baseStats[5] }}</div>


            <div class="bold">TOTAL</div>
            <div class="total-result">{{ pkmn.totalStats[0] }}</div>

            <div class="total-result" :class="{
                'up': natureEffect(pkmn.nature, 1) > 1,
                'down': natureEffect(pkmn.nature, 1) < 1
            }">{{ pkmn.totalStats[1] }}</div>

            <div class="total-result" :class="{
                'up': natureEffect(pkmn.nature, 2) > 1,
                'down': natureEffect(pkmn.nature, 2) < 1
            }">{{ pkmn.totalStats[2] }}</div>

            <div class="total-result" :class="{
                'up': natureEffect(pkmn.nature, 3) > 1,
                'down': natureEffect(pkmn.nature, 3) < 1
            }">{{ pkmn.totalStats[3] }}</div>

            <div class="total-result" :class="{
                'up': natureEffect(pkmn.nature, 4) > 1,
                'down': natureEffect(pkmn.nature, 4) < 1
            }">{{ pkmn.totalStats[4] }}</div>

            <div class="total-result" :class="{
                'up': natureEffect(pkmn.nature, 5) > 1,
                'down': natureEffect(pkmn.nature, 5) < 1
            }">{{ pkmn.totalStats[5] }}</div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { natureEffect } from '@/composables/stats.comp.js'

const props = defineProps({
    pkmn: Object
})

</script>



<style scoped>
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