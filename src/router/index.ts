/*
 * @Author: Czy
 * @Date: 2025-01-20 17:24:58
 * @FilePath: /travel-business/src/router/index.ts
 *
 */

import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout/index.vue'),
      children: [
        {
          path: '',
          name: 'Index',
          component: () => import('@/views/index/index.vue'),
          meta: { title: '差旅管家登录', isNoLoginPage: true },
        },
        {
          path: 'buyer-register',
          name: 'BuyerRegister',
          component: () => import('@/views/buyer-register/index.vue'),
          meta: { title: '买家注册', isNoLoginPage: true },
        },
        {
          path: 'hotel',
          meta: { title: '酒店' },
          children: [
            {
              path: '',
              name: 'Hotel',
              component: () => import('@/views/hotel/index.vue'),
              meta: { title: '酒店', navIsOpacity: true },
            },
            {
              path: 'hotel-list',
              name: 'HotelList',
              component: () => import('@/views/hotel-list/index.vue'),
              meta: { title: '酒店列表', navIsOpacity: false, keepAlive: true, initNoBackTop: true },
            },
            {
              path: 'hotel-detail',
              name: 'HotelDetail',
              component: () => import('@/views/hotel-detail/index.vue'),
              meta: { title: '酒店详情', navIsOpacity: true },
            },
          ],
        },
        {
          path: 'api-call-instructions',
          name: 'ApiCallInstructions',
          component: () => import('@/views/api-call-instructions/index.vue'),
          meta: { title: 'Api调用说明' },
        },
        {
          path: 'personal-center',
          name: 'PersonalCenter',
          component: () => import('@/views/management/personal-center/index.vue'),
          meta: { title: '个人中心' },
        },
        {
          path: 'order-center',
          name: 'OrderCenter',
          component: () => import('@/views/management/personal-center/index.vue'),
          meta: { title: '订单中心', keepAlive: true },
        },
        {
          path: 'hotel-order',
          name: 'HotelOrder',
          component: () => import('@/views/management/hotel-order/index.vue'),
          meta: { title: '酒店订单' },
        },
        {
          path: 'finance-reconciliation',
          name: 'FinanceReconciliation',
          component: () => import('@/views/management/personal-center/index.vue'),
          meta: { title: '财务对账' },
        },
        {
          path: 'enterprise-wallet',
          name: 'EnterpriseWallet',
          component: () => import('@/views/management/personal-center/index.vue'),
          meta: { title: '企业钱包' },
        },
        // {
        //   path: 'order-record',
        //   name: 'OrderRecord',
        //   component: () => import('@/views/finance-manage/order-record/index.vue'),
        //   meta: { title: '订单明细' },
        // },
      ],
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: () => import('@/views/privacy-policy/index.vue'),
      meta: { title: '隐私条款' },
    },
    {
      path: '/service-agreement',
      name: 'ServiceAgreement',
      component: () => import('@/views/service-agreement/index.vue'),
      meta: { title: '服务条款' },
    },
  ],
})

router.onError((error, to, from) => {
  // vue-router 在跳路由加载对应页面js文件失败时，错误信息是 Loading .. failed
  const pattern = /(Loading .*)|(TypeError: Failed)/g
  if (pattern.test(error)) {
    window.location.reload()
  }
})

// 全局前置守卫
// router.beforeEach((to, from, next) => {
//   //判断是否需要鉴权
//   if (to.meta.isAuth) {
//     // 验证用户权限
//     if (localStorage.getItem('token')) {
//       next() // 放行
//     } else {
//       alert('对不起，你没有权限访问该页面')
//       next('/login') // 重定向到登录页面
//     }
//   } else {
//     next() // 不需要鉴权，直接放行
//   }
// })
export default router
