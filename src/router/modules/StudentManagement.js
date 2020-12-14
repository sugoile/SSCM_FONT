import layoutHeaderAside from "@/layout/header-aside"


export default {
  path: '/student',
  name: 'StudentManagement',
  component: layoutHeaderAside,
  children: [{
      path: 'basic',
      name: 'BasicInformManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/student/basic") 
    },
    {
      path: 'scholarship',
      name: 'ScholarshipManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/student/scholarship") 
    },
    {
      path: 'punishment',
      name: 'PunishmentManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/student/punishment") 
    },
    {
      path: 'courseSelection',
      name: 'CourseSelectionManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/student/courseSelection") 
    },
    {
      path: 'cet',
      name: 'CetManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/student/cet") 
    },
    {
      path: 'teacherAssessment',
      name: 'TeacherAssessmentManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/student/teacherAssessment") 
    },
    {
      path: 'timetable',
      name: 'TimetableManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/student/timetable") 
    },
    {
      path: 'graduateInternship',
      name: 'GraduateInternshipManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/student/graduateInternship") 
    }
  ],
}
