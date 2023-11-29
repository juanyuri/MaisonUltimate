<template>


  <div class="css-11x9mvp">
    <div class="css-79elbk">
      <div class="css-1jo5a5k">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
          stroke-linecap="round" stroke-linejoin="round" class="css-1hy7qas">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <input type="search" aria-label="Search"
        class="css-zcmmes" v-model="inputText" ref="inputRef" autocomplete="off"
        :placeholder="props.placeholderText" :minlength="props.minLength"
        @focus="onFocus" @blur="onBlur" @input="onInput"
      >
      
        <div class="results-container" v-show="!selected && listaVisible">
          <ul class="results-list">
            <li class="result-item" v-for="item in filteredItems" :key="item" @click="onResultClick(item)" @mousedown.prevent>
              {{ item[props.attrToShow] }}</li>
          </ul>
      </div>

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

.css-zcmmes {
    width: 18em;
    margin: 0;
    padding: 16px;
    padding-left: 52px;
    font-size: inherit;
    line-height: 1;
    font-family: inherit;
    color: inherit;
    background-color: #E1E1E1;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06);
    border: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    border-radius: 6px;
}


.css-79elbk {
    position: relative;
}

.css-1jo5a5k {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 16px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}

.css-1hy7qas {
    vertical-align: text-bottom;
    color: var(--theme-ui-colors-icon,#959da5);
}

.css-zcmmes:focus {
    box-shadow: 0 0 0 3px var(--theme-ui-colors-primary,#0066ff);
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
  z-index:600;
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