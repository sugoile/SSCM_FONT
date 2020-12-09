import layoutHeaderAside from "@/layout/header-aside"


export default {
  path: '/student',
  name: 'StudentManagement',
  component: layoutHeaderAside,
  children: [{
      path: 'basic',
      name: 'BasicInformManagement',
      component: () => import("@/views/student/basic") 
    },
    {
      path: 'scholarship',
      name: 'ScholarshipManagement',
      component: () => import("@/views/student/scholarship") 
    },
    {
      path: 'punishment',
      name: 'PunishmentManagement',
      component: () => import("@/views/student/punishment") 
    },
    {
      path: 'courseSelection',
      name: 'CourseSelectionManagement',
      component: () => import("@/views/student/courseSelection") 
    },
    {
      path: 'cet',
      name: 'CetManagement',
      component: () => import("@/views/student/cet") 
    },
    {
      path: 'teacherAssessment',
      name: 'TeacherAssessmentManagement',
      component: () => import("@/views/student/teacherAssessment") 
    },
    {
      path: 'timetable',
      name: 'TimetableManagement',
      component: () => import("@/views/student/timetable") 
    },
    {
      path: 'graduateInternship',
      name: 'GraduateInternshipManagement',
      component: () => import("@/views/student/graduateInternship") 
    }
  ]

}
