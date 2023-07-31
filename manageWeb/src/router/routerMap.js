export default [
    {
      path: '/',
      name: 'LayOut',
      component: () => import( '../views/LayOut.vue'),
      //重定向
      redirect:"/index",
      children:[
        {
          path:"/index",
          name:"index",
          component:()=>import("../views/index/HomeIndex")
        },
        {
          path:"/Staff/list",
          name:"StaffList",
          meta:{bread:["员工管理","员工列表"]},
          component:()=>import("../views/Staff/StaffList"),
        },
        {
          path:"/AddressBook",
          name:"AddressBook",
          meta:{bread:["通讯录"]},
          component:()=>import("../views/Staff/AddressBook"),
        },
        {
          path:"/Assets/in",
          name:"AssetsIn",
          meta:{bread:["资产管理","资产录入"]},
          component:()=>import("../views/Assets/AssetsIn"),
        },
        {
          path:"/Assets/list",
          name:"AssetsList",
          meta:{bread:["资产管理","资产列表"],keepAlive:true},
          component:()=>import("../views/Assets/AssetsList"),
        },
        {
          path:"/Assets/list/detail",
          name:"AssetsListDetail",
          meta:{bread:["资产管理","资产列表","资产详情"]},
          component:()=>import("../views/Assets/AssetsDetail"),
        },
        {
          path:"/performance/performanceList",
          name:"performanceList",
          meta:{bread:["绩效管理"]},
          component:()=>import("../views/performance/performanceList"),
        },
        {
          path:"/performance/performanceList/performanceDetail",
          name:"performanceDetail",
          meta:{bread:["绩效管理","个人季度绩效"]},
          component:()=>import("../views/performance/performanceDetail"),
        },
        {
          path:"/IT/data",
          name:"ITListIn",
          meta:{bread:["IT管理","IT数据"]},
          component:()=>import("../views/IT/ITData")
        },
        {
          path:"/reminder",
          name:"ReminderList",
          meta:{bread:["个人提醒"]},
          component:()=>import("../views/Reminder/ReminderList")
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( '../views/LoginPage.vue')
    },   
  ]