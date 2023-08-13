import { createRouter, createWebHistory } from 'vue-router'
import MaisonSets from '@/views/MaisonSets.vue'
import PokemonTeam from '@/views/PokemonTeam.vue'
/* import TestView from '@/views/TestView.vue' */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MaisonSets
    },
    {
      path: '/team',
      name: 'team',
      component: PokemonTeam
    }
  ]
})

export default router
