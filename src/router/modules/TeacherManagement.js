import layoutHeaderAside from "@/layout/header-aside"


export default {
  path: '/teacher',
  name: 'TeacherManagement',
  component: layoutHeaderAside,
  children: [{
      path: 'basic',
      name: 'BasicInformManagement',
      component: () => import("@/views/teacher/basic") 
    },
    {
      path: 'scoreUpload',
      name: 'ScoreUploadManagement',
      component: () => import("@/views/teacher/scoreUpload") 
    },
    {
      path: 'teachingAssessment',
      name: 'TeachingAssessmentManagement',
      component: () => import("@/views/teacher/teachingAssessment") 
    },
    {
      path: 'information',
      name: 'InformationManagement',
      component: () => import("@/views/teacher/information") 
    },
    {
      path: 'timetable',
      name: 'TimetableManagement',
      component: () => import("@/views/teacher/timetable") 
    }
  ]

}
