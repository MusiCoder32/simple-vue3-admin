import { createRouter, createWebHistory } from 'vue-router'
import NProgress from '../configs/npmrogress'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    // history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'root',
            component: () => import('../views/index.vue'),
        },
        {
            path: '/404',
            name: '404',
            component: () => import('../views/error/404.vue'),
        },
        {
            name: 'not-found',
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
})

let isTransitioning = false
let finishTimer = null

router.beforeEach((to, from) => {
    document.body.classList.remove('print') //防止异常操作导致print样式未及时清除
    //<---解决页面缓存导致的simple-ellipsis没有正常消失的问题
    const tooltip = document.getElementById('simply-ellipsis-tooltip')
    if (tooltip) {
        tooltip.classList.remove('has-ell-visibility')
    }
    // --->

    // 追踪重定向来源,若发生链式重定向（A → B → C），redirectedFrom始终指向最初触发重定向的路由
    // 此处用于在刷新等情形下，保留上一次携带的参数
    //路径中有中文时，会被自动编码，故需要使用decodeURIComponent转回中文
    if (to.redirectedFrom) {
        sessionStorage.setItem('historyRouter', decodeURIComponent(to.redirectedFrom.fullPath))
    } else if (to.meta.title) {
        sessionStorage.setItem('historyRouter', decodeURIComponent(to.fullPath))
    } else {
        sessionStorage.removeItem('historyRouter')
    }

    if (!isTransitioning) {
        isTransitioning = true
        NProgress.start()
    }
    if (finishTimer) {
        finishTimer = clearTimeout(finishTimer)
    }
})
router.afterEach(() => {
    finishTimer = setTimeout(() => {
        if (isTransitioning) {
            NProgress.done()
            isTransitioning = false
        }
    }, 100)
})

export default router
