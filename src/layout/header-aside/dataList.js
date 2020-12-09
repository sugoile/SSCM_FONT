export const dataTree = [
    {
        id: "1",
        fontMenuName: "学生管理",
        pid: 0,
        sort: 100,
        icon: "xuesheng",
        path: "/student",
        children: [
            {
                fontMenuName: "基本信息管理",
                pid: 1,
                id: "10",
                sort: 101,
                icon: "jibenxinxi",
                path: "/student/basic"
            },
            {
                fontMenuName: "奖学金信息管理",
                pid: 1,
                id: "11",
                sort: 102,
                icon: "jiangxuejinzhongleiguanli",
                path: "/student/scholarship"
            },
            {
                fontMenuName: "处分信息管理",
                pid: 1,
                id: "12",
                sort: 103,
                icon: "weijichufenguanli",
                path: "/student/punishment"
            },
            {
                fontMenuName: "选课信息管理",
                pid: 1,
                id: "13",
                sort: 104,
                icon: "xuanke-xian",
                path: "/student/courseSelection"
            },
            {
                fontMenuName: "四六级报名信息管理",
                pid: 1,
                id: "14",
                sort: 105,
                icon: "kaoshi",
                path: "/student/cet"
            },
            {
                fontMenuName: "教师教学评估管理",
                pid: 1,
                id: "15",
                sort: 106,
                icon: "cz-ldpg",
                path: "/student/teacherAssessment"
            },
            {
                fontMenuName: "课表信息管理",
                pid: 1,
                id: "16",
                sort: 107,
                icon: "kebiaoxinxi",
                path: "/student/timetable"
            },
            {
                fontMenuName: "毕业生实习信息管理",
                pid: 1,
                id: "17",
                sort: 108,
                icon: "w_biyesheng",
                path: "/student/graduateInternship"
            }
        ]
    },
    {
        id: "2",
        fontMenuName: "教师管理",
        pid: 0,
        sort: 200,
        icon: "laoshi",
        path: "/teacher",
        children: [
            {
                fontMenuName: "教师基本信息管理",
                pid: 2,
                id: "18",
                sort: 201,
                icon: "jibenxinxi",
                path: "/teacher/basic",
            },
            {
                fontMenuName: "教师成绩上传管理",
                pid: 2,
                id: "19",
                sort: 202,
                icon: "chengjifenxi",
                path: "/teacher/scoreUpload",
            },
            {
                fontMenuName: "年终教学评估管理",
                pid: 2,
                id: "20",
                sort: 203,
                icon: "cz-ldpg",
                path: "/teacher/teachingAssessment",
            },
            {
                fontMenuName: "教师用户信息管理",
                pid: 2,
                id: "21",
                sort: 204,
                icon: "jiaoshizigezheng",
                path: "/teacher/information",
            },
            {
                fontMenuName: "教师课表信息管理",
                pid: 2,
                id: "22",
                sort: 205,
                icon: "kebiaoxinxi",
                path: "/teacher/timetable",
            }
        ]
    },
    {
        id: "3",
        fontMenuName: "部门管理",
        pid: 0,
        sort: 300,
        icon: "navicon-jsgl",
        path: '/department',
        children: [
            {
                fontMenuName: "部门和院系管理",
                pid: 3,
                id: "23",
                sort: 301,
                icon: "xueyuan1",
                path: '/department/departments',
            },
            {
                fontMenuName: "部门和院系信息管理",
                pid: 3,
                id: "24",
                sort: 301,
                icon: "yuanxiao",
                path: '/department/departmentsInformation',
            }
        ]
    },
    {
        id: "4",
        fontMenuName: "管理员管理",
        pid: 0,
        sort: 400,
        icon: "guanliyuan",
        path: '/admin',
        children: [
            {
                fontMenuName: "菜单管理",
                pid: 4,
                id: "6",
                sort: 401,
                icon: "caidan1",
                path: '/admin/menu',
            },
            {
                fontMenuName: "权限管理",
                pid: 4,
                id: "7",
                sort: 402,
                icon: "authority",
                path: '/admin/authority',
            },
            {
                fontMenuName: "角色管理",
                pid: 4,
                id: "8",
                sort: 403,
                icon: "jiaoseguanli",
                path: '/admin/role',
            },
            {
                fontMenuName: "用户管理",
                pid: 4,
                id: "9",
                sort: 404,
                icon: "user",
                path: '/admin/user',
            }
        ]
    },
    {
        id: "5",
        fontMenuName: "信息统计",
        pid: 0,
        sort: 500,
        icon: "tongji",
        path: '/inform',
        children: [
            {
                fontMenuName: "各院系年级成绩排名统计",
                pid: 5,
                id: "25",
                sort: 501,
                icon: "icon-test",
                path: '/inform/gradesRaking',
            },
            {
                fontMenuName: "各院系年终教师评估统计",
                pid: 5,
                id: "26",
                sort: 502,
                icon: "icon-test",
                path: '/inform/teacherAssessment',
            },
            {
                fontMenuName: "各院系取消学位信息统计",
                pid: 5,
                id: "27",
                sort: 503,
                icon: "icon-test",
                path: '/inform/cancelDegree',
            },
            {
                fontMenuName: "各院系等级考试成绩统计",
                pid: 5,
                id: "28",
                sort: 504,
                icon: "icon-test",
                path: '/inform/gradeExamination',
            },
            {
                fontMenuName: "各院系受处分信息统计",
                pid: 5,
                id: "29",
                sort: 505,
                icon: "icon-test",
                path: '/inform/punishment',
            },
            {
                fontMenuName: "各院系奖学金信息统计",
                pid: 5,
                id: "30",
                sort: 506,
                icon: "icon-test",
                path: '/inform/scholarship',
            }
        ]
    }
]