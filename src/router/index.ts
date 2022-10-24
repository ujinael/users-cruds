import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import VLoginPage from '@/pages/login/VLoginPage.vue'
import VUsersListPage from '@/pages/users/VUsersListPage.vue'
import VUsersDetailPage from '@/pages/users/VUsersDetailPage.vue'
export const routes:Array<RouteRecordRaw> = [

    {
      path: '/',
      name: 'login',
      component: VLoginPage,
      meta:{
      layout:'login-layout'
      ,label:'Логин'
      ,title:"Логин"
      ,authRequired:false
      ,isLink:false

    },
    },
    {
      path: '/users',
      name: 'users',
      component: VUsersListPage,
      meta:{
      layout:'main-layout'
      ,label:'Пользователи'
      ,title:"Пользователи"
      ,authRequired:true
      ,isLink:true
    },
    },
    {
      path: '/users/:id',
      name: 'usersDetail',
      component: VUsersDetailPage,
      meta:{
      layout:'main-layout'
      ,label:'Пользователь'
      ,title:"Пользователь"
      ,authRequired:true
      ,isLink:false
    },
    }
  ]
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((current,from,next)=>{
if(current.meta.authRequired){
const isAuth = localStorage.getItem("isAuth")
if(Boolean(isAuth))next()
else router.push("/")
}
else next()
})
export default router
