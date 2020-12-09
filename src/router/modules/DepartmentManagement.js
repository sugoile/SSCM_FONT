import layoutHeaderAside from "@/layout/header-aside"


export default {
  path: '/department',
  name: 'DepartmentManagement',
  component: layoutHeaderAside,
  children: [{
      path: 'departments',
      name: 'DepartmentsManagement',
      component: () => import("@/views/department/departments")
    },
    {
      path: 'departmentsInformation',
      name: 'DepartmentsInformationManagement',
      component: () => import("@/views/department/departmentsInformation")
    }
  ]

}
