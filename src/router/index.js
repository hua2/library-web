import Vue from 'vue'
import Router from 'vue-router'
import BasicLayout from '@/layout/BasicLayout'
import LoginLayout from '@/layout/LoginLayout'
import RegistLayout from '@/layout/RegistLayout'
import OtherLayout from '@/layout/OtherLayout'
import PersonalLayout from '@/layout/PersonalLayout'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: BasicLayout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () =>
            import(/* webpackChunkName: "home" */ '@/views/home/Index.vue')
        },
        {
          path: 'home/display',
          component: () =>
              import(/* webpackChunkName: "home_display" */ '@/views/home/Display.vue')
        },
        {
          path: 'home/details',
          component: () =>
              import(/* webpackChunkName: "home_details" */ '@/views/home/Details.vue')
        },
        {
          path: 'info/about',
          component: () =>
              import(/* webpackChunkName: "about" */ '@/views/info/About.vue')
        },
        {
          path: 'info/authorize',
          component: () =>
              import(/* webpackChunkName: "authorize" */ '@/views/info/Authorize.vue')
        }
      ]
    },
    {
      path: '/',
      component: OtherLayout,
      redirect: '/404',
      children: [
        {
          path: '404',
          component: () =>
              import(/* webpackChunkName: "404" */ '@/views/other/404.vue')
        }
      ]
    },
    {
      path: '/login',
      component: LoginLayout,
      redirect: '/login/index',
      children: [
        {
          path: 'index',
          component: () =>
              import(/* webpackChunkName: "login_index" */ '@/views/login/Index.vue')
        },
        {
          path: 'forget-pwd',
          component: () =>
              import(/* webpackChunkName: "login_forget_pwd" */ '@/views/login/ForgetPwd.vue')
        },
        {
          path: 'reset-pwd',
          component: () =>
              import(/* webpackChunkName: "login_reset_pwd" */ '@/views/login/ResetPwd.vue')
        }
      ]
    },
    {
      path: '/regist',
      component: RegistLayout,
      redirect: '/regist/index',
      children: [
        {
          path: 'index',
          component: () =>
              import(/* webpackChunkName: "regist_index" */ '@/views/regist/Index.vue')
        },
        {
          path: 'prompt',
          component: () =>
              import(/* webpackChunkName: "regist_prompt" */ '@/views/regist/Prompt.vue')
        }
      ]
    },
    {
      path: '/',
      component: PersonalLayout,
      // redirect: '/personal/index',
      children: [
        {
          path: 'personal/index',
          component: () =>
              import(/* webpackChunkName: "personal_account" */ '@/views/personal/Index.vue')
        },
        {
          path: 'personal/account',
          component: () =>
              import(/* webpackChunkName: "personal_account" */ '@/views/personal/Account.vue')
        },
        {
          path: 'personal/collect',
          component: () =>
              import(/* webpackChunkName: "personal_index" */ '@/views/personal/Collect.vue')
        },
        {
          path: 'personal/download',
          component: () =>
              import(/* webpackChunkName: "personal_download" */ '@/views/personal/Download.vue')
        },
        {
          path: 'personal/buy',
          component: () =>
              import(/* webpackChunkName: "personal_buy" */ '@/views/personal/Buy.vue')
        },
        {
          path: 'personal/updatePwd',
          component: () =>
              import(/* webpackChunkName: "personal_updatePwd" */ '@/views/personal/UpdatePwd.vue')
        },
        {
          path: 'personal/mobile',
          component: () =>
              import(/* webpackChunkName: "personal_mobile" */ '@/views/personal/Mobile.vue')
        },
        {
          path: 'attest/index',
          component: () =>
              import(/* webpackChunkName: "attest_index" */ '@/views/attest/Index.vue')
        },
        {
          path: 'attest/refuseStatus',
          component: () =>
              import(/* webpackChunkName: "attest_refuseStatus" */ '@/views/attest/RefuseStatus.vue')
        },
        {
          path: 'attest/underReview',
          component: () =>
              import(/* webpackChunkName: "attest_underReview" */ '@/views/attest/UnderReview.vue')
        },
        {
          path: 'publish/index',
          component: () =>
              import(/* webpackChunkName: "publish_index" */ '@/views/publish/Index.vue')
        },
        {
          path: 'publish/release',
          component: () =>
              import(/* webpackChunkName: "publish_release" */ '@/views/publish/Release.vue')
        },
        {
          path: 'personal/message',
          component: () =>
              import(/* webpackChunkName: "personal_message" */ '@/views/personal/Message.vue')
        },
        {
          path: 'personal/otherMessage',
          component: () =>
              import(/* webpackChunkName: "personal_otherMessage" */ '@/views/personal/OtherMessage.vue')
        }
      ]
    }
    // {
    //   path: '*', // 此处需特别注意至于最底部
    //   redirect: '/404'
    // }
  ]
})

const whiteList = [
  '/home',
  '/home/display',
  '/home/details',
  '/login/index',
  '/login/forget-pwd',
  '/login/reset-pwd',
  '/regist/index',
  '/info/about',
  '/info/authorize'
] // no redirect whitelist

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = to.meta.title || '能源图库'
  if (store.state.account.token) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login/index') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login/index?redirect=${to.fullPath}`) // 否则全部重定向到登录页
    }
  }
})
// router.afterEach(() => {
// const main = document.getElementsByTagName("body");
// if (main && main.length > 0) {
//   const child = main[0];
//   child.scrollIntoView(true);
// }
// });
export default router
