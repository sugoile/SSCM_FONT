import layoutHeaderAside from "@/layout/header-aside"


export default {
  path: '/admin',
  name: 'AdministratorManagement',
  component: layoutHeaderAside,
  children: [{
      path: 'menu',
      name: 'MenuManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/admin/menu") 
    },
    {
      path: 'api',
      name: 'AuthorityManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/admin/authority") 
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/admin/role") 
    },
    {
      path: 'user',
      name: 'UserManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/admin/user")
    }
  ]

}
