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
      path: '/QuestionnaireManage',
      name: 'QuestionnaireManage',
      component: () => import('../views/QuestionnaireManage.vue')
    },
    {
      path:'/QuestionnaireContent',
      name:'QuestionnaireContent',
      component:() => import('../views/QuestionnaireContent.vue')
    },
    {
      path:'/QuestionnaireConfirm',
      name:'QuestionnaireConfirm',
      component:() => import('../views/QuestionnaireConfirm.vue')
    },
  ]
})

export default router
