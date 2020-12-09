import layoutHeaderAside from "@/layout/header-aside"


export default {
  path: '/inform',
  name: 'InformationManagement',
  component: layoutHeaderAside,
  children: [{
      path: 'gradesRaking',
      name: 'GradesManagement',
      component: () => import("@/views/inform/gradesRaking") 
    },
    {
      path: 'teacherAssessment',
      name: 'TeachingAssessmentManagement',
      component: () => import("@/views/inform/teacherAssessment") 
    },
    {
        path: 'cancelDegree',
        name: 'CancelDegreeManagement',
        component: () => import("@/views/inform/cancelDegree") 
      },
      {
        path: 'gradeExamination',
        name: 'GradeExaminationManagement',
        component: () => import("@/views/inform/gradeExamination") 
      },
    {
      path: 'punishment',
      name: 'PunishmentManagement',
      component: () => import("@/views/inform/punishment") 
    },
    {
      path: 'scholarship',
      name: 'ScholarshipManagement',
      component: () => import("@/views/inform/scholarship") 
    }
  ]

}
