<template>
    <el-config-provider size="default" :locale="elementLocal">
        <el-watermark
            v-if="ready"
            class="el-watermark h-full w-full"
            :font="{
                fontFamily: 'SYR',
                textBaseline: 'top',
                color: 'rgba(0, 0, 0, 0.1)',
            }"
            :gap="[180, 180]"
            :content="content">
            <RouterView />
        </el-watermark>
    </el-config-provider>
</template>

<script setup lang="ts">
import { localStore } from '@/stores/locale'
import { getUserInfo } from './api/users'
import { usersStore } from '@/stores/usersStore'
import logoutFn from '@/utils/logout'
import { projectAuthStore } from '@/stores/project-auth.ts'

import { getHealth } from './api'
const projectAuth = projectAuthStore()

$loading.open()

const route = useRoute()
const usersStoreObj = usersStore()
const { userInfo, roleList, menuList, currGatewayIpSource } = storeToRefs(usersStoreObj)
const { elementLocal } = storeToRefs(localStore())

const ready = ref(false)
const isReq = ref(true) //用于判断是否是由后端重定向回来

const globalProperties = getCurrentInstance().appContext.config.globalProperties
const select = true

const content = ref('Simple Vue3 Admin')

onBeforeUnmount(() => {
    setStop()
})
const localFn = globalProperties.$t
globalProperties.$t = function (value, args) {
    //避免传入$t()中的参数为空,导致i18n报错
    if (typeof value === 'string') {
        return localFn(value, { ...args })
    }
}
window.$t = globalProperties.$t

window.$$t = function (value, args) {
    //避免传入$t()中的参数为空,导致i18n报错
    return computed(() => {
        if (typeof value === 'string') {
            return localFn(value, { ...args })
        }
        return
    })
}

/**
 * 项目权限通用设置方法
 * id:项目id
 * name:权限按钮名称
 * 使用方式示例:v-if="$auth(projectInstId,'add').value"
 */
globalProperties.$auth = function (id, name) {
    if (!id || !name) {
        return ref(true)
    }
    //检查store中是否已存在该项目下的权限列表,若不存在,store会自动请求后台数据
    projectAuth.check(id)

    //projectAuth.authMap[id]拿到后台数据时,会触发该computed
    return computed(() => {
        const authMap = projectAuth.authMap[id]
        if (!Array.isArray(authMap)) {
            return false
        }
        const auths = authMap.filter((item) => item.route === route.path).map((item) => item.auths)[0]
        return auths?.includes(name)
    })
}

const urlSearch = new URLSearchParams(window.location.search)
const token = urlSearch.get('lmsmpToken')
const tokenStatus = urlSearch.get('tokenStatus')

if (token) {
    isReq.value = false
    tokenCheck()
}

async function tokenCheck() {
    if (tokenStatus == 200) {
        sessionStorage.setItem('token', token)
        //在登录场景下，指定跳转到工作台（不影响oa-file-view等特殊页面）
        // sessionStorage.setItem('historyRouter', '/workbench/workbench')
        history.replaceState(null, null, location.pathname)
        init()
    } else {
        const modalRes = await ElMessageBox.confirm('该账号缺少用户名信息，请更换账号重新登录！', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'error',
        }).catch(() => false)
        logoutFn()
    }
}
if (isReq.value) {
    init()
}

function init() {
    $loading.open()

    getUserInfo()
        .then((res) => {
            userInfo.value = res.userInfo
            roleList.value = res.roleList
            menuList.value = res.menuList
            currGatewayIpSource.value = res.currGatewayIpSource
            ready.value = true
        })
        .finally(() => {
            $loading.close()
            // startHealth() //开启心跳检测
        })
}

function startHealth() {
    setTimeout(
        () => {
            getHealth()
            startHealth()
        },
        3 * 60 * 1000,
    )
}

function setStop() {
    if (!select) {
        document.body.setAttribute('data-select', 'none')
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault() // 禁用右键菜单
        })

        document.body.oncopy = function (e) {
            e.preventDefault() // 禁用复制操作
        }

        document.body.oncut = function (e) {
            e.preventDefault() // 禁用剪切操作
        }

        document.body.onselectstart = function (e) {
            e.preventDefault() // 阻止文本选取
        }

        // 尝试阻止F12键按下
        document.addEventListener(
            'keydown',
            function (e) {
                if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
                    // F12, Ctrl+Shift+I (Chrome DevTools), Ctrl+U (View Source)
                    e.preventDefault()
                }
            },
            false,
        )
    }
}
</script>
<style lang="scss">
@import '@/assets/styles/main.scss';

#app {
    height: 100%;

    > div > div:last-child {
        z-index: 9999 !important;
    }
}
</style>
