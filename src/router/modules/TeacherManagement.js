import layoutHeaderAside from "@/layout/header-aside"


export default {
  path: '/teacher',
  name: 'TeacherManagement',
  component: layoutHeaderAside,
  children: [{
      path: 'basic',
      name: 'BasicInformManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/teacher/basic") 
    },
    {
      path: 'scoreUpload',
      name: 'ScoreUploadManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/teacher/scoreUpload") 
    },
    {
      path: 'teachingAssessment',
      name: 'TeachingAssessmentManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/teacher/teachingAssessment") 
    },
    {
      path: 'information',
      name: 'InformationManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/teacher/information") 
    },
    {
      path: 'timetable',
      name: 'TimetableManagement',
      meta: {type: 'administrators'},
      component: () => import("@/views/teacher/timetable") 
    }
  ]

}
