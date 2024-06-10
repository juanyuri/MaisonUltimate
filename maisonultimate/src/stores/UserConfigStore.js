import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { USER_CONFIGURATION_KEY } from '@/const/storage.js'


export const useConfigStore = defineStore(USER_CONFIGURATION_KEY, () => {
  const gameLanguage = ref('')
  const gameVersion = ref('')
  const numRounds = ref(0)

  const saveUserConfig = () => {
    const userConfig = {
      gameLanguage: gameLanguage.value,
      gameVersion: gameVersion.value,
      numRounds: numRounds.value
    }
    localStorage.setItem(USER_CONFIGURATION_KEY, JSON.stringify(userConfig))
  }

  const showUserConfig = () => {
    console.group()
    console.log("Language ", gameLanguage.value)
    console.log("Version ", gameVersion.value)
    console.groupEnd()
  }


  const savedUserConfig = localStorage.getItem(USER_CONFIGURATION_KEY)
  if (savedUserConfig) {
    const parsedConfig = JSON.parse(savedUserConfig)
    gameLanguage.value = parsedConfig.gameLanguage
    gameVersion.value = parsedConfig.gameVersion
    numRounds.value = parsedConfig.numRounds
    console.log(gameLanguage.value, gameVersion.value, numRounds.value)
  } else {
    console.log("There's no saved user configuration in LocalStorage")
    gameLanguage.value = 'SPANISH'
    gameVersion.value = 'oras'
    numRounds.value = 0
    saveUserConfig()
  }


  const changeLanguage = (newGameLanguage) => {
    if (gameLanguage.value !== newGameLanguage) {
      gameLanguage.value = newGameLanguage
      saveUserConfig()
      showUserConfig()
    }
  }


  const changeVersion = (newGameVersion) => {
    if (gameVersion.value !== newGameVersion) {
      gameVersion.value = newGameVersion
      saveUserConfig()
      showUserConfig()
      console.log("new version: " + gameVersion.value)
    }
  }


  const nextTierTrainers = () => {
    numRounds.value++
    saveUserConfig()
  }

  
  return { gameLanguage, gameVersion, numRounds, changeLanguage, changeVersion, nextTierTrainers }
})