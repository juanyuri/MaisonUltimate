<template>
    <div class="results-container-main">
        <input type="text" class="search-input" v-model="inputText" ref="inputRef"
        autocomplete="off" 
        :placeholder="props.placeholderText"
        :minlength="props.minLength" 
        
        @focus="onFocus" 
        @blur="onBlur" />
    </div>

    <div class="results-container" v-if="listaVisible">
        <ul class="results-list">
            <li class="result-item" v-for="item in filteredItems" :key="item" @click="onResultClick(item)"
                @mousedown.prevent>{{ item[props.attrToShow] }}</li>
        </ul>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    placeholderText: String,
    items: Array,
    attrToShow: String,
    minLength: Number
})

const items = computed(() => props.items).value
const emit = defineEmits(['onItemSelected'])
let inputRef = ref(null)
let selected = ref(false)
let isFocused = ref(false)
let inputText = ref('')

const onResultClick = (result) => {
    inputRef.value.blur();
    console.log(result)
    inputText.value = result[props.attrToShow]
    selected.value = true
    emit('onItemSelected', result)
}

const filteredItems = computed(() => {
    var resultado = []
    if (inputText.value.length >= props.minLength)
        resultado = items.filter((item) => item[props.attrToShow].toLowerCase().startsWith(inputText.value.toLowerCase()))

    return resultado.slice(0, 10)
})

const listaVisible = computed(() => {
    return (isFocused.value && inputText.value.length >= props.minLength && filteredItems.value.length != 0)
})


const onFocus = () => isFocused.value = true
const onBlur = () => isFocused.value = false

</script>

<style scoped>
</style>