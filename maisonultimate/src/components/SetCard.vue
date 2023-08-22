<template>
    <div class="PkmnSet">
        <p class="PkmnSet-SetName">{{ props.set.setName }}</p>
        <p class="PkmnSet-Description">{{ props.minDamagePctg }}% - {{ props.maxDamagePctg }}%</p>

        <p class="PkmnSet-Item">{{ props.set.item }}</p>
        <p v-if="props.setIsSlower" class="PkmnSet-SlowerThanPkmn">Speed</p>

        <button class="PkmnSet-Button">Ver Detalles</button>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    set: Object,
    setIsSlower: Boolean,
    minDamagePctg: Number,
    maxDamagePctg: Number,
    moveDamageArray: Array,
    bestMove: String
})

/* const result = computed(() => {
    return this.minDamagePctg + " - " + this.maxDamagePctg + " using " + this.bestMove
}) */
</script>



<style scoped>
.PkmnSet {
    margin-left: auto;
    margin-right: auto;
    width: 250px;
    height: 170px;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.PkmnSet-SetName{
    font-weight: bold;
    font-size:1.4em;
    text-align: center;

    margin-bottom:5px;
}

.PkmnSet-Description{
    font-weight: 400;
    font-size:1.4em;
    text-align: center;

    margin-bottom:20px;
}

.PkmnSet-Item{
    font-weight: 400;
    font-size:0.9em;
    text-align: center;

    margin-bottom:20px;
}

.PkmnSet-SlowerThanPkmn{
    font-weight: 400;
    font-size:0.9em;
    text-align: center;

    margin-bottom:20px;
}

.PkmnSet-Button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid transparent;
    
    margin-left:auto;
    margin-right:auto;
}

.PkmnSet-Button:hover{
    cursor: pointer;
    background-color: var(--Navigation-Bar-bg-color);
    color:white;
    transition-duration: 200ms;
}
</style>