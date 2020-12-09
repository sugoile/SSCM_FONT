import layoutHeaderAside from "@/layout/header-aside"


export default {
  path: '/admin',
  name: 'AdministratorManagement',
  component: layoutHeaderAside,
  children: [{
      path: 'menu',
      name: 'MenuManagement',
      component: () => import("@/views/admin/menu") 
    },
    {
      path: 'api',
      name: 'AuthorityManagement',
      component: () => import("@/views/admin/authority") 
    },
    {
      path: 'role',
      name: 'RoleManagement',
      component: () => import("@/views/admin/role") 
    },
    {
      path: 'user',
      name: 'UserManagement',
      component: () => import("@/views/admin/user")
    }
  ]

}
