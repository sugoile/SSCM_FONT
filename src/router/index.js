import Vue from 'vue'
import Router from 'vue-router'

import {
  RouterChange
} from "./init"

Vue.use(Router)

import student from "./modules/StudentManagement"
import teacher from "./modules/TeacherManagement"
import department from "./modules/DepartmentManagement"
import admin from "./modules/AdministratorManagement"
import inform from "./modules/InformationStatistics"

const router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: () => import("../views/login")
  },
  {
    path: '/',
    name: 'sscm',
    component: () => import("../layout/header-aside"),
    redirect: {
      name: 'index'
    },
    children: [{
      path: 'index',
      name: 'index',
      component: () => import("../views/index")
    }]
  },
    admin,
    student,
    teacher,
    department,
    inform
  ]
})

router.beforeEach((to, form, next) => {
  //to表示要跳转的界面
  //form表示从哪里来的界面
  //next表示放行或重定向到一个界面
  //console.log(router.app.$options.store);
  if (to.path == '/login') return next();
  const token = window.sessionStorage.getItem("token");
  const ID = window.sessionStorage.getItem("ID");
  const nickname = window.sessionStorage.getItem("nickname");

  const TreeMenus = JSON.parse(window.sessionStorage.getItem('TreeMenus'));
  const ListMenus = JSON.parse(window.sessionStorage.getItem('ListMenus'));
  if (!token || !ID || !nickname) return next('/login');
  else {
      RouterChange(router.app.$options.store.commit, router.app.$options.store.state, TreeMenus, ListMenus, to);
  }
  next();
})


export default router
