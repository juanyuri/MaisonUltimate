<template>
  <div class="results-container-main">
    <div class="search-container">
      <img src="@/assets/lupa.svg" alt="" class="search-icon" width="25" height="25">
      <input type="text" class="search-input" v-model="inputText" ref="inputRef" autocomplete="off"
        :placeholder="props.placeholderText" :minlength="props.minLength" @focus="onFocus" @blur="onBlur"
        @input="onInput" />
    </div>

    <div class="results-container" v-show="!selected && listaVisible">
      <ul class="results-list">
        <li class="result-item" v-for="item in filteredItems" :key="item" @click="onResultClick(item)" @mousedown.prevent>
          {{ item[props.attrToShow] }}</li>
      </ul>
    </div>
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
  inputText.value = ''/* result[props.attrToShow] */
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
const onInput = () => {
  if (inputText.value === '') {
    selected.value = false
  }
}

</script>

<style scoped>
.search-input {
  width: 80%;
  height: 35px;
  border: 1px solid #E1E1E1;
  border-radius: 5px;
  background-color: #E1E1E1;
  padding-left: 10px;

  font-size: 16px;
}

.search-input:focus {
  outline: none;
}

.search-icon {
  height: 35px;
  margin-right: 5px;
  margin-left: 10px;
}

.search-container {
  display: flex;
  align-items: center;

  padding: 5px;
}

.results-container-main {
  width: 300px;
  background-color: #E1E1E1;
  border: 1px solid #E1E1E1;
  overflow: hidden;
  border-radius: 5px;
}

.results-list {
  position: absolute;
  width: 422px;
  padding-top: 10px;
  padding-bottom: 10px;

  margin-top: 8px;

  border: 2px solid #E1E1E1;
  font-weight: 600;
  border-radius: 5px;
  background-color: #F5F7FB;
}

.result-item {
  cursor: pointer;
  list-style: none;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 18px;
}

.result-item:hover {
  background-color: #ffffff;
}
</style>