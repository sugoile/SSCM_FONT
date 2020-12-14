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
    component: () => import("../views/login"),
    meta: {type: 'administrators'}
  },
  {
    path: '/',
    name: 'sscm',
    component: () => import("../layout/header-aside"),
    meta: {type: 'administrators'},
    redirect: {
      name: 'index'
    },
    children: [{
      path: 'index',
      name: 'index',
      component: () => import("../views/index"),
      meta: {type: 'administrators'}
    }]
  },
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: () => import("../views/login/UserLogin"),
    meta: {type: 'users'}
  },
  {
    path: '/students',
    name: 'Students',
    meta: {type: 'users', SOT: 'student'},
    component: () => import("@/views/student/userStudent"), 
    redirect: {
      name: 'StudentUser'
    },
    children: [
      {
        path: 'Course',
        name: 'Course',
        meta: {type: 'users', SOT: 'student'},
        component: () => import("@/views/student/userStudent/Course") 
      },
      {
        path: 'StudentUser',
        name: 'StudentUser',
        meta: {type: 'users', SOT: 'student'},
        component: () => import("@/views/student/userStudent/StudentUser") 
      },
    ]
  },
  {
    path: '/teachers',
    name: 'Teachers',
    meta: {type: 'users', SOT: 'teacher'},
    component: () => import("@/views/teacher/userTeacher"), 
    redirect: {
      name: 'TeacherUser'
    },
    children: [
      {
        path: 'Course',
        name: 'Course',
        meta: {type: 'users', SOT: 'teacher'},
        component: () => import("@/views/teacher/userTeacher/Course") 
      },
      {
        path: 'TeacherUser',
        name: 'TeacherUser',
        meta: {type: 'users', SOT: 'teacher'},
        component: () => import("@/views/teacher/userTeacher/TeacherUser") 
      },
    ]
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
  if (to.path == '/login' ) return next();
  if(to.meta.type === 'administrators'){
    const token = window.sessionStorage.getItem("token");
    const ID = window.sessionStorage.getItem("ID");
    const nickname = window.sessionStorage.getItem("nickname");

    const TreeMenus = JSON.parse(window.sessionStorage.getItem('TreeMenus'));
    const ListMenus = JSON.parse(window.sessionStorage.getItem('ListMenus'));
    if (!token || !ID || !nickname) return next('/login');
    else {
      RouterChange(router.app.$options.store.commit, router.app.$options.store.state, TreeMenus, ListMenus, to);
    }
  }
  if (to.path == '/Userlogin' ) return next();
  if(to.meta.type === 'users'){
    const username = window.sessionStorage.getItem("username");
    const id = window.sessionStorage.getItem("id");
    const type = window.sessionStorage.getItem("type");
    if (!type || !username || !id) return next('/Userlogin');
    if(type == 0 && to.meta.SOT === 'teacher'){
      return next('/Userlogin');
    }
    if(type == 1 && to.meta.SOT === 'student'){
      return next('/Userlogin');
    }
  }
  next();
})


export default router
