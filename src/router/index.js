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
      path:'/QuestionnaireCreate',
      name:'QuestionnaireCreate',
      component:() => import('../views/QuestionnaireContent.vue')
    },
    {
      path:'/QuestionnaireConfirm',
      name:'QuestionnaireConfirm',
      component:() => import('../views/QuestionnaireConfirm.vue')
    },
    {
      path:'/Login',
      name:'Login',
      component:() => import('../views/Login.vue')
    },
    {
      path:'/QuestionnaireEdit/:quizNum',
      name:'QuestionnaireEdit',
      component:() => import('../views/QuestionnaireContent.vue')
    },
    {
      path:'/QuestionnaireFilling/:quizNum',
      name:'QuestionnaireFilling',
      component:() => import('../views/QuestionnaireFilling.vue')
    }
  ]
})

export default router
