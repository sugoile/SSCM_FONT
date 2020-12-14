import layoutHeaderAside from "@/layout/header-aside"


export default {
  path: '/inform',
  name: 'InformationManagement',
  component: layoutHeaderAside,
  children: [{
      path: 'gradesRaking',
      name: 'GradesManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/inform/gradesRaking") 
    },
    {
      path: 'teacherAssessment',
      name: 'TeachingAssessmentManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/inform/teacherAssessment") 
    },
    {
        path: 'cancelDegree',
        name: 'CancelDegreeManagement',
        meta: {type: 'administrators'},
        component: () => import("@/views/inform/cancelDegree") 
      },
      {
        path: 'gradeExamination',
        name: 'GradeExaminationManagement',
        meta: {type: 'administrators'},
        component: () => import("@/views/inform/gradeExamination") 
      },
    {
      path: 'punishment',
      name: 'PunishmentManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/inform/punishment") 
    },
    {
      path: 'scholarship',
      name: 'ScholarshipManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/inform/scholarship") 
    }
  ]

}
