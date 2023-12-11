import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Questionnaire',
      component: () => import('../views/Questionnaire.vue')
    },
    {
      path:'/QuestionnaireContent',
      name:'QuestionnaireContent',
      component:() => import('../views/QuestionnaireContent.vue')
    }
  ]
})

export default router
