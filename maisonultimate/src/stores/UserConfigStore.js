import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { USER_CONFIGURATION_KEY } from '@/const/storage.js'

export const useConfigStore = defineStore(USER_CONFIGURATION_KEY, () => {

    const userConfiguration = ref({})
    const savedUserConfig = localStorage.getItem(USER_CONFIGURATION_KEY)
    
    if (savedUserConfig) {
        userConfiguration.value = savedUserConfig
        console.log(userConfiguration)
    } else {
        console.log("There's not a saved user configuration on LocalStorage")

        let userDefaultConfiguration = {
            "GAME_LANGUAGE": "SPANISH",
            "GAME_VERSION": "oras",
            "NUM_ROUNDS": 0
        }
        userConfiguration.value = JSON.stringify(userDefaultConfiguration)
        localStorage.setItem(USER_CONFIGURATION_KEY, userConfiguration.value)
    }
    

    // TODO: If it is already on that language, do not change it.
    // TODO: Change i18n to change the current language messages
    const changeLanguage = (newGameLanguage) => {

        /* Parse the string with user info and then change the attribute */
        let parsedConfig = JSON.parse(userConfiguration.value)
        console.log("GAME_LANGUAGE was " + parsedConfig.GAME_LANGUAGE)
        parsedConfig.GAME_LANGUAGE = newGameLanguage
        console.log("GAME_LANGUAGE is " + parsedConfig.GAME_LANGUAGE)
        
        /* Convert to string in order to save it in localStorage */
        userConfiguration.value = JSON.stringify(parsedConfig)
        localStorage.setItem(USER_CONFIGURATION_KEY, userConfiguration.value)
    }

    // TODO: Change the current version trainers' names between ORAS and XY
    const changeVersion = (newGameVersion) => {

        // Parse the string with user info and then change the attribute
        let parsedConfig = JSON.parse(userConfiguration.value)
        parsedConfig.GAME_VERSION = newGameVersion
        console.log("GAME_VERSION changed to " + parsedConfig.GAME_VERSION)
        
        // Convert to string in order to save it in localStorage
        userConfiguration.value = JSON.stringify(parsedConfig)
        localStorage.setItem(USER_CONFIGURATION_KEY, userConfiguration.value)
    }

    // TODO: Change the trainers to appear in each range of rounds [<10, 10+, 20+, 30+, 41+]
    const nextTierTrainers = () => {
        // Retrieve the information from localStorage
        let parsedConfig = JSON.parse(userConfiguration.value)
        parsedConfig.NUM_ROUNDS += 1

        userConfiguration.value = JSON.stringify(parsedConfig)
        localStorage.setItem(USER_CONFIGURATION_KEY, userConfiguration.value)
    }

    
    
    console.log(typeof(userConfiguration))

    return { userConfiguration, changeLanguage, changeVersion, nextTierTrainers }

})